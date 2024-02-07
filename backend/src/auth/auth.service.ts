import {
    BadRequestException,
    ConflictException,
    Inject,
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
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { KakaoLoginDto } from './dtos/kakao-user.dto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService, private readonly mailerService: MailerService, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    async signUp({ Email, Password, Gender, phone, nickname, Emailauthentication }: CreateuserDto) {
        const email_Emailauthentication = await this.cacheManager.get(Email);
        try {
            const existedUser = await this.userRepository.findOne({ where: { email: Email } });

            if (existedUser) {
                throw new BadRequestException([`This Email is already in ${existedUser.registration_information} use`]);
            }
            if (email_Emailauthentication !== Emailauthentication) {
                throw new BadRequestException(['Authentication number does not match']);
            }
            const hashedPassword = await bcrypt.hashSync(Password, 12);
            const user = this.userRepository.create({ email: Email, password: hashedPassword, registration_information: "SITE", nickname, phone, gender: Gender });
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
        }
    }

    async signIn({ Email, Password }: SignInDto) {
        const user = await this.userRepository.findOne({ where: { email: Email } });

        if (!user) {
            throw new UnauthorizedException('존재하지 않는 이메일입니다.');
        }
        if (!(await bcrypt.compare(Password, user.password))) {
            throw new UnauthorizedException('존재하지 않는 비밀번호입니다.');
        }
        const authority = user.authority;
        const limit = user.limit;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority, limit };
    }


    async kakosignUp({ Email, Nickname, profile_image }: KakaoLoginDto) {
        try {

            const KAKAO_USER = await this.userRepository.findOne({ where: { email: Email, registration_information: "KAKAO" } });
            if (KAKAO_USER) {
                return
            }
            const existedUser = await this.userRepository.findOne({ where: { email: Email } });
            if (existedUser) {
                throw new BadRequestException(`This Email is already in ${existedUser.registration_information} use`)
            }
            const user = this.userRepository.create({ email: Email, nickname: Nickname, registration_information: "KAKAO", profile_image: profile_image });
            return await this.userRepository.save(user);

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.');
        }
    }

    async kakaosignIn(Email: string) {
        const user = await this.userRepository.findOne({ where: { email: Email } });
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 이메일입니다.');
        }
        const authority = user.authority;
        const limit = user.limit;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority, limit };
    }

    async naversignup(email: string, gender: string, phone: string, name: string) {
        var USER_GENDER;
        const NAVER_USER = await this.userRepository.findOne({ where: { email: email, registration_information : "NAVER"}});
        if (NAVER_USER) {
            return
        }
        const user = await this.userRepository.findOne({ where: { email: email}});
        if (user) {
            throw new BadRequestException(`This Email is already in ${user.registration_information} use`)
        }
       
        if(gender === "M"){
            USER_GENDER = "Male"
        }
        else if(gender === "F"){
            USER_GENDER = "Female"
        }
        else if(gender === "U"){
            USER_GENDER = "UNKNOW"
        }
        const naveruser = this.userRepository.create({ registration_information: 'NAVER', email, nickname: name, phone, gender : USER_GENDER});
        return await this.userRepository.save(naveruser);
        
    }

    async naversignin(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email, registration_information: 'naver' } });
        if (!user) {
            throw new UnauthorizedException('존재하지 않는 이메일입니다.');
        }
        const authority = user.authority;
        const limit = user.limit;
        const accessToken = await this.createAccessToken(+user.id);
        const refreshToken = await this.createRefreshToken();
        return { accessToken, refreshToken, authority, limit };
    }



    async createAccessToken(id: number) {
        const payload = { id: id };
        return await this.jwtService.signAsync(payload, { expiresIn: '5m' });
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



    async Emailauthentication(email: string, sixDigitNumber: string) {
        this.mailerService
            .sendMail({
                to: email,
                from: 'chlxodud04@naver.com',
                subject: '이메일 인증번호',
                html: `<b>${sixDigitNumber}</b>`,
            })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                new ConflictException(error);
            });
        console.log(email);
        await this.cacheManager.set(email, sixDigitNumber, 60000);
        return { sucess: '이메일 인증' };
    }
}
