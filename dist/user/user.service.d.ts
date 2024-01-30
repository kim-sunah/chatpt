import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUserInfo(id: number): Promise<User>;
    updateUserinfo(id: number, updateUser: UpdateuserDto): Promise<void>;
    Alluser(): Promise<{
        userCount: number;
        user: User[];
    }>;
    limituser(email: string, registration_information: string): Promise<import("typeorm").UpdateResult>;
}
