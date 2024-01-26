import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { UpdateuserDto } from './dto/update-user.dto';
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
    limituser(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
