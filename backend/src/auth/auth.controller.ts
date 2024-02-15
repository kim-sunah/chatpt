import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Request,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';

import { User } from 'src/entities/user.entity';
import { Response } from 'express';
import { KakaoLoginDto } from './dtos/kakao-user.dto';
import { MessageService } from 'src/message/message.service';

import { googleLoginDto } from './dtos/google-user.dto';


@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {}

  @Post('/signup')
  async signUp(@Body() createuserDto: CreateuserDto) {
    const user = await this.authService.signUp(createuserDto);

    this.messageService.newMessage(5, user.id);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
      user,
    };
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const { accessToken, refreshToken, authority, limit } =
      await this.authService.signIn(signInDto);
    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      accessToken,
      refreshToken,
      authority,
      limit,
    };
  }

  @Post('/Email_authentication')
  async Emailauthentication(@Body('Email') email: string) {
    let randomFraction = Math.random();
    let randomNumber = Math.floor(randomFraction * 1000000);
    let sixDigitNumber = randomNumber.toString().padStart(6, '0');
    return this.authService.Emailauthentication(email, sixDigitNumber);
  }

  @Post('naversignup')
  async naversignup(@Body('code') code: string) {
    try {
      const response = await fetch(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}&state=9kgsGTfH4j7IyAkg  `,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const resData = await response.json();
      const responseData = await fetch(`https://openapi.naver.com/v1/nid/me`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + resData.access_token },
      });

      if (!responseData.ok) {
        throw new Error(`HTTP error! Status: ${responseData.status}`);
      }
      const userData = await responseData.json();
      await this.authService.naversignup(
        userData.response.email,
        userData.response.gender,
        userData.response.mobile,
        userData.response.name
      );
      const { accessToken, refreshToken, authority, limit } =
        await this.authService.naversignin(userData.response.email);
      return {
        statusCode: HttpStatus.OK,
        message: '로그인에 성공했습니다.',
        accessToken,
        refreshToken,
        authority,
        limit,
      };
    } catch (err) {
      return err; // 또는 적절한 오류 처리를 수행할 수 있습니다.
    }
  }
  @Post('kakaosignup')
  async postKakaoInfo(@Body() kakaoLoginDto: KakaoLoginDto) {
    const userinfo = await this.authService.kakosignUp(kakaoLoginDto);
    const { accessToken, refreshToken, authority, limit } = await this.authService.kakaosignIn(kakaoLoginDto.Email);
    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      accessToken,
      refreshToken,
      authority,
      limit,
    };
  }

  @Post("googlesignup")
  async googlesignup(@Body() googleLoginDto : googleLoginDto) {
    await this.authService.googlesignup(googleLoginDto)
    const { accessToken, refreshToken, authority, limit } = await this.authService.googlesignin(googleLoginDto.Email);
    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      accessToken,
      refreshToken,
      authority,
      limit,
    };
  }
}
