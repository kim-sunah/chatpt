import { Body, Controller, Get, HttpStatus, Param, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateuserDto } from './dto/update-user.dto';

@ApiTags('회원')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * 정보 조회
     * @param req
     * @returns
     */
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async getUserInfo(@Request() req) {
        const { id, accessToken, refreshToken } = req.user;

        console.log(req.user);

        const user = await this.userService.getUserInfo(id);

        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 가져왔습니다.',
            user,
            accessToken,
            refreshToken,
        };
    }
}
