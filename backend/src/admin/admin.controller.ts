import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'backend/src/auth/guard/jwt-auth.guards';

@Controller('admin')
// @UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

    @Post('/userinfo')
    async Allusercount(@Body("pages") page : string  ) {
        const {users , products, productCount, userCount} = await this.adminService.Allusercount(+page);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            productCount,
            users,
            userCount,
            products,
        };
    }

    @Get('/count')
    async count(@Body("pages") page : string  , ) {
        const {userCount , productCount} = await this.adminService.count(+page);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            userCount,
            productCount,
          
        };
    }

    @Get('/Alluser')
    async Recentlyuser() {
        const {users} = await this.adminService.RecentlyAlluser();
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            users,
        };
    }


    @Post('/productlist')
    async productlist(@Body("pages") page : string  ) {
        const { products, productCount} = await this.adminService.productlist(+page);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            productCount,
            products,
        };
    }


    @Post('/userlist')
    async userList(@Body("pages") page : string  ) {
        const { users, userCount} = await this.adminService.userList(+page);
        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 업데이트했습니다.',
            users,
            userCount,
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

}
