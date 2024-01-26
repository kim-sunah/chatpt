import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateuserDto } from './dto/update-user.dto';
import { Product } from 'src/entities/product.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly productRepositoy;
    constructor(userRepository: Repository<User>, productRepositoy: Repository<Product>);
    getUserInfo(id: number): Promise<User>;
    updateUserinfo(id: number, updateUser: UpdateuserDto): Promise<void>;
    limituser(id: number): Promise<import("typeorm").UpdateResult>;
}
