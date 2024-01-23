import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query, Req, Request, Res, Session, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';

import { User } from 'src/entities/user.entity';
import {  Response } from 'express';
import { KakaoLoginDto } from './dtos/kakao-user.dto';


@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('/signup',)
    async signUp(@Body() createuserDto: CreateuserDto,) {
        


        const user = await this.authService.signUp(createuserDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }
    @Post('/sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        const { accessToken, refreshToken , authority} = await this.authService.signIn(signInDto);
 
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority
        };
    }

    @Post("/Email_authentication")
    async Emailauthentication(@Body("Email") email: string) {

        let randomFraction = Math.random();

        // 0에서 999999까지의 정수로 변환
        let randomNumber = Math.floor(randomFraction * 1000000);

        // 6자리로 만들기 위해 문자열로 변환하고 앞에 0 추가
        let sixDigitNumber = randomNumber.toString().padStart(6, '0')

        return this.authService.Emailauthentication(email, sixDigitNumber)

    }

    
    @Post("naver")
    async naverlogin(@Body("code") code: string){
        const client_id = process.env.client_id
        const client_secret = process.env.client_secret
        try {
            const response = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=9kgsGTfH4j7IyAkg `, {
              method: "POST",
              headers: {"Content-Type": "application/json"}
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const resData = await response.json();
    
            const responseData = await fetch(`https://openapi.naver.com/v1/nid/me`, {
                method: "GET",
                headers: {"Authorization": "Bearer " + resData.access_token}
              });
          
              if (!responseData.ok) {
                throw new Error(`HTTP error! Status: ${responseData.status}`);
              }
              const userData = await responseData.json();
             
            const naveruser = await this.authService.naverlogin(userData.response.email , userData.response.gender, userData.response.mobile, userData.response.name)
           
            return {
                statusCode: HttpStatus.OK,
                message: '로그인에 성공했습니다.',
                naveruser
               
            };
          } catch (err) {
            console.log(err);
            return null; // 또는 적절한 오류 처리를 수행할 수 있습니다.
          }
     }

     @Post("naversignin")
     async naversignin(@Body("email") email : string){
        const { accessToken, refreshToken, authority } = await this.authService.naversignin(email)
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority
        };

     }
    @Post('kakaosingup')
    async postKakaoInfo(@Body() kakaoLoginDto : KakaoLoginDto) {
        console.log(kakaoLoginDto);
  
        const kakao = await this.authService.kakosignUp(kakaoLoginDto)
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            kakao,
        };
       
    }
    @Post('kakaosingin')
    async getKakaoInfo(@Body() kakaoLoginDto : KakaoLoginDto) {
        console.log(kakaoLoginDto);
  
        const { accessToken, refreshToken ,authority} = await this.authService.kakaosignIn(kakaoLoginDto.Email)
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
            authority
        };
       
    }

    
   
  
  
}

