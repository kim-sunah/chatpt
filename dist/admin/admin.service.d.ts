import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
export declare class AdminService {
    private readonly userRepository;
    private readonly productRepositoy;
    constructor(userRepository: Repository<User>, productRepositoy: Repository<Product>);
    Allusercount(page: number): Promise<{
        users: User[];
        products: Product[];
        productCount: number;
        userCount: number;
    }>;
    count(page: number): Promise<{
        userCount: number;
        productCount: number;
    }>;
    RecentlyAlluser(): Promise<{
        users: User[];
    }>;
    productlist(page: number): Promise<{
        products: Product[];
        productCount: number;
    }>;
    userList(page: number): Promise<{
        users: User[];
        userCount: number;
    }>;
    limituser(id: number): Promise<import("typeorm").UpdateResult>;
}
