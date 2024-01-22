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
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { KakaoLoginDto } from './dtos/kakao-user.dto';


@Injectable()
export class AuthService {
    [x: string]: any;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) { }
    async signUp({ Email, Password, Gender, phone,  Emailauthentication }: CreateuserDto) {
        const email_Emailauthentication = await this.cacheManager.get(Email)
    
        
        try {
            const existedUser = await this.userRepository.findOne({ where: { email: Email , registration_information : "site"} });
            if (existedUser) {
                throw new BadRequestException({message : "이미 사용중인 이메일입니다"});
            }
            if (email_Emailauthentication !== Emailauthentication) {
                throw new BadRequestException({message  :"인증번호가 일치하지 않습니다"})
            }

            // const exitphone = await this.userRepository.findOne({ where: { phone: phone } })
            // if (exitphone) {
            //     throw new BadRequestException('이미 사용중인 번호입니다.');
            // }

            const Nickname = Email.split("@")[0];
            console.log("xcx")

            const hashedPassword = await bcrypt.hashSync(Password, 12);
            const user = this.userRepository.create({registration_information:"site", email: Email, password: hashedPassword, nickname: Nickname, phone, gender: Gender})
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
        const user = await this.userRepository.findOne({ where: { email: Email ,registration_information : "site"} })
        
        if (!user) {
            throw new UnauthorizedException("존재하지 않는 이메일입니다.")
        }
        if (!(await bcrypt.compare(Password, user.password))) {
            throw new UnauthorizedException("존재하지 않는 비밀번호입니다.")
        }

   
        const accessToken = await this.createAccessToken(+user.id);
     
       
        const refreshToken = await this.createRefreshToken();

        return { accessToken, refreshToken };

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
            console.log(email)
        await this.cacheManager.set(email, sixDigitNumber,30000);
        return {sucess: "이메일 인증"}

    }

    async kakosignUp({ Email, Nickname}: KakaoLoginDto) {

        
        try {
            const existedUser = await this.userRepository.findOne({ where: { email: Email, registration_information :"Kakao"} });
            if (existedUser) {
                return 
            }
            else{
                const user = this.userRepository.create({registration_information:"Kakao", email: Email, nickname: Nickname,  })
                return await this.userRepository.save(user)
            }
    
           

        }
        catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('회원 가입 중 오류가 발생했습니다.')
        }
    }


    async kakaosignIn(Email : string) {
        console.log("asdasdas")
        const user = await this.userRepository.findOne({ where: { email: Email ,registration_information :"Kakao"} })
        if (!user) {
            throw new UnauthorizedException("존재하지 않는 이메일입니다.")
        }
    
        const accessToken = await this.createAccessToken(+user.id);
   
       
        const refreshToken = await this.createRefreshToken();

        return { accessToken, refreshToken };

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

    async naverlogin(email : string, gender : string, phone : string , name : string){
        const user = await this.userRepository.findOne({where : {email : email , registration_information : "naver"}})
    
        if(user){
            return{ email : user.email};
        }
        else{
            const naveruser = this.userRepository.create({registration_information:"naver", email, nickname: name, phone, gender})
            return await this.userRepository.save(naveruser)

        }
    }

    async naversignin(email : string){
        const user = await this.userRepository.findOne({ where: { email: email ,registration_information : "naver"} })
        console.log(user)
        
        if (!user) {
            throw new UnauthorizedException("존재하지 않는 이메일입니다.")
        }
   
    
        const accessToken = await this.createAccessToken(+user.id);
    
       
        const refreshToken = await this.createRefreshToken();

        return { accessToken, refreshToken };


    }




}
