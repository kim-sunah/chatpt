import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query, Req, Request, Res, Session, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';
import { UserInfo } from './decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import {  Response } from 'express';
import { KakaoLoginDto } from './dtos/kakao-user.dto';


@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }



    @Post('/signup',)
    async signUp(@Body() createuserDto: CreateuserDto,) {
        console.log("Asds")


        const user = await this.authService.signUp(createuserDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }
    @Post('/sign-in')
    async signIn(@Body() signInDto: SignInDto) {


        const { accessToken, refreshToken } = await this.authService.signIn(signInDto);
        console.log(accessToken, refreshToken)
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken
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
        const client_id = "iH61UrUrFwmW9V8Qjd0c"
        const client_secret = "CIf1lOZB1R"
        try {
            const response = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=9kgsGTfH4j7IyAkg `, {
              method: "POST",
              headers: {"Content-Type": "application/json"}
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const resData = await response.json();
            console.log(resData)
            return {access_token : resData.access_token, refresh_token : resData.refresh_token};
          } catch (err) {
            console.log(err);
            return null; // 또는 적절한 오류 처리를 수행할 수 있습니다.
          }
     
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
  
        const { accessToken, refreshToken } = await this.authService.kakaosignIn(kakaoLoginDto.Email)
        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken
        };
       
    }
   
  
    @Get('/userinfo')
    @UseGuards(AuthGuard("jwt"))
    getEmail(@UserInfo() user: User) {
        return { email: user.email };
    }
}

