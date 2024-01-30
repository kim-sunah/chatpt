import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { User } from 'src/entities/user.entity';
import { KakaoLoginDto } from './dtos/kakao-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createuserDto: CreateuserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: User;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
    Emailauthentication(email: string): Promise<{
        sucess: string;
    }>;
    naverlogin(code: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        naveruser: User | {
            email: string;
        };
    }>;
    naversignin(email: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
    postKakaoInfo(kakaoLoginDto: KakaoLoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        kakao: User;
    }>;
    getKakaoInfo(kakaoLoginDto: KakaoLoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        accessToken: string;
        refreshToken: string;
        authority: import("../enum/Role").Role;
    }>;
}
