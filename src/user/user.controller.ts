import {
    Controller,
    Get,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
<<<<<<< HEAD

@ApiTags('회원')
=======
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/auth/decorators/userinfo.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateuserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('회원')
@UseGuards(JwtAuthGuard)
>>>>>>> ea95193c84da8cbfa57f74b021706c9b989e0494
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
