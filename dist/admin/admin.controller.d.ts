import { HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    Allusercount(page: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        productCount: number;
        users: import("../entities/user.entity").User[];
        userCount: number;
        products: import("../entities/product.entity").Product[];
    }>;
    count(page: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        userCount: number;
        productCount: number;
    }>;
    Recentlyuser(): Promise<{
        statusCode: HttpStatus;
        message: string;
        users: import("../entities/user.entity").User[];
    }>;
    productlist(page: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        productCount: number;
        products: import("../entities/product.entity").Product[];
    }>;
    userList(page: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        users: import("../entities/user.entity").User[];
        userCount: number;
    }>;
    limituser(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
