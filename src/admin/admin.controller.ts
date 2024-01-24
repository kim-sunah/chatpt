import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guards';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    @Post('/userinfo')
    async Alluser(@Body("pages") page : string  , ) {
        const {userCount, user , productCount, product} = await this.adminService.Alluser(+page);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            userCount,
            user,
            productCount,
            product,
        };
    }

    // @Post("/productlist")
    // async Allproduct(@Body("pages") page : string){
    //   const product = await this.adminService.Allproduct(+page)
    //   return {
    //     statusCode: HttpStatus.OK,
    //     message: '회원 정보를 성공적으로 업데이트했습니다.',
    //     product,
    // };
    // }


    @Put('/limituser')
    async limituser(@Body("id") id: string) {
        await this.adminService.limituser(+id);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
        };
    }


    @Post("/search")
    async adminusersearch("")

}
