import { CreateuserDto } from './dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { KakaoLoginDto } from './dtos/kakao-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly mailerService;
    private readonly cacheManager;
    [x: string]: any;
    constructor(userRepository: Repository<User>, jwtService: JwtService, mailerService: MailerService, cacheManager: Cache);
    signUp({ Email, Password, Gender, phone, Emailauthentication }: CreateuserDto): Promise<User>;
    signIn({ Email, Password }: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
    Emailauthentication(email: string, sixDigitNumber: string): Promise<{
        sucess: string;
    }>;
    kakosignUp({ Email, Nickname }: KakaoLoginDto): Promise<User>;
    kakaosignIn(Email: string): Promise<{
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
    createAccessToken(id: number): Promise<string>;
    createRefreshToken(): Promise<string>;
    verifyAccessToken(accessToken: string): Promise<{
        success: boolean;
        id: any;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        id: any;
    }>;
    verifyRefreshToken(refreshToken: string): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
    naverlogin(email: string, gender: string, phone: string, name: string): Promise<User | {
        email: string;
    }>;
    naversignin(email: string): Promise<{
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
}
