import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateuserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { userInfo } from 'os';

@ApiTags('회원')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/Mypage')
  async getUserInfo(@UserInfo() userinfo: User) {
    console.log(userinfo);
    const user = await this.userService.getUserInfo(userinfo.id);
    return {
      statusCode: HttpStatus.OK,
      message: '회원 정보를 성공적으로 가져왔습니다.',
      user,
    };
  }
  @Post('MypageUpdate')
  async updateUserinfo(
    @UserInfo() userinfo: User,
    @Body() updateUser: UpdateuserDto
  ) {
    const updateuser = await this.userService.updateUserinfo(
      userinfo.id,
      updateUser
    );
    return {
      statusCode: HttpStatus.OK,
      updateuser,
    };
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @UserInfo() userinfo: User
  ) {
    await this.userService.upload(file.originalname, file.buffer, userinfo.id);
  }

  @Get('Allproduct')
  async Allproduct(@UserInfo() userinfo: User) {
    const productlist = await this.userService.Allproduct(+userinfo.id);

    return {
      statusCode: HttpStatus.OK,
      productlist,
    };
  }
  @Put('/limituser')
  async limituser(@Body('id') id: string) {
    await this.userService.limituser(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '회원 정보를 성공적으로 업데이트했습니다.',
    };
  }
}
