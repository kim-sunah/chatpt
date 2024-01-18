import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateuserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import passport from 'passport';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }
    async signUp({ Email, Password, Gender, Nickname, phone, authority }: CreateuserDto) {
        try {

            const existedUser = await this.userRepository.findOne({ where: { email: Email } });
            if (existedUser) {
                throw new BadRequestException('이미 사용중인 이메일입니다.');
            }
            // const exitnickname = await this.userRepository.findOne({ where: { nickname: Nickname } })
            // if (exitnickname) {
            //     throw new BadRequestException('이미 사용중인 닉네임입니다.');
            // }

            // const exitphone = await this.userRepository.findOne({ where: { phone: phone } })
            // if (exitphone) {
            //     throw new BadRequestException('이미 사용중인 번호입니다.');
            // }
            const hashedPassword = await bcrypt.hashSync(Password, 12);
            const user = this.userRepository.create({ email: Email, password: hashedPassword, nickname: Nickname, phone, gender: Gender, authority })
            return await this.userRepository.save(user) 
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.')
        }
    }

    async signIn({ Email, Password }: SignInDto) {
        const user = await this.userRepository.findOne({ where: { email: Email } })
        if (!user) {
            throw new UnauthorizedException("존재하지 않는 이메일입니다.")
        }
        if (!(await bcrypt.compare(Password, user.password))) {
            throw new UnauthorizedException("존재하지 않는 비밀번호입니다.")
        }

    
        // acess token 생성 
        const accessToken = await this.createAccessToken(+user.id);
        // refresh token 생성
        const refreshToken = await this.createRefreshToken();

        return { accessToken, refreshToken };
       
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }


    async createAccessToken(  id: number) {
        return await this.jwtService.signAsync({ id }, { expiresIn: '2m' });
    }

    // refresh token 만료기간 2주
    async createRefreshToken() {
        return await this.jwtService.signAsync({}, { expiresIn: '7d' });
    }

    
    async verifyAccessToken(accessToken: string) {
        try {
            
            const payload = await this.jwtService.verify(accessToken);
            return { success: true, id: payload.id };

        } catch (error) {
            const payload = await this.jwtService.verify(accessToken, {
                ignoreExpiration: true,
            });
            return { success: false, message: error.message, id: payload.id };
        }
    }
    async verifyRefreshToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verify(refreshToken);

            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


}
