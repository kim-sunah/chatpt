import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateuserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signUp({ Email, Password,  phone, Nickname ,Gender}: CreateuserDto) {
        try{
            const existedUser = await this.userRepository.findOne({where : {Email : Email}});
            if (existedUser) {
                throw new BadRequestException('이미 사용중인 이메일입니다.');
            }
            const hashedPassword = await bcrypt.hashSync(Password, 12);
            return await this.userRepository.save({ Email, Password: hashedPassword,Nickname, phone , Gender});
        }

        catch(error){
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
        }
         

        
        
       

       
    }

    async validate({ email, password }: SignInDto) {
        const existedUser = await this.userRepository.findOne({
            where: { email },
            select: { id: true, password: true },
        });

        // 회원이 존재하지 않을 때
        if (!existedUser) {
            throw new UnauthorizedException('존재하지 않는 이메일입니다.');
        }

        // 비밀번호가 일치하지 않을 때
        const isPasswordMatched = await bcrypt.compareSync(
            password,
            existedUser.password,
        );

        if (!isPasswordMatched) {
            throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }

        return { id: existedUser.id };
    }

    async signIn(id: number) {
        // access token 생성
        const access_token = await this.createAccessToken(id);
        // refresh token 생성
        const refreshToken = await this.createRefreshToken();

        return { access_token, refreshToken };
    }

    // access token 만료기간 하루
    async createAccessToken(id: number) {
        return await this.jwtService.signAsync({ id }, { expiresIn: '1d' });
    }

    // refresh token 만료기간 2주
    async createRefreshToken() {
        return await this.jwtService.signAsync({}, { expiresIn: '14d' });
    }

    async verifyAccessToken(accessToken: string) {
        try {
            const payload = await this.jwtService.verify(accessToken);

            console.log(payload);

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
