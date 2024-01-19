import {Body,Controller,Get,HttpCode,HttpStatus,Post,Request,UseGuards,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from './dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';
import { UserInfo } from './decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    @Post('/signup')
    async signUp(@Body() createuserDto : CreateuserDto) {
        const user = await this.authService.signUp(createuserDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }

 
    @HttpCode(HttpStatus.OK)
  
    @Post('/sign-in')
    async signIn(@Body() signInDto: SignInDto) {
        const { accessToken, refreshToken } =  await this.authService.signIn(signInDto);
        console.log(accessToken, refreshToken)
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

