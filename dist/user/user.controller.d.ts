import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UpdateuserDto } from './dto/update-user.dto';
import { LimituserDto } from './dto/limituser_update.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(userinfo: User): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: User;
    }>;
    updateUserinfo(userinfo: User, updateUser: UpdateuserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    Alluser(): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: {
            userCount: number;
            user: User[];
        };
    }>;
    limituser(body: LimituserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
