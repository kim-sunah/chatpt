import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateuserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { LimituserDto } from './dto/limituser_update.dto';

@ApiTags('회원')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
   
 
    @Get('/Mypage')
    async getUserInfo(@UserInfo() userinfo: User) {
        const user = await this.userService.getUserInfo(userinfo.id);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 가져왔습니다.',
            user,
        };
    }
    @Put("/MypageUpdate")
    async updateUserinfo(@UserInfo() userinfo : User, @Body() updateUser : UpdateuserDto){
        const user = await this.userService.updateUserinfo(userinfo.id, updateUser);

        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        };
    }

    @Get("/Alluser")
    async Alluser(){
        const user = await this.userService.Alluser();
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            user
        }; 
    }

    @Put("/limituser")
    async limituser(@Body() body : LimituserDto){
        await this.userService.limituser(body.email , body.registration_information);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        }; 
    }

    
}
