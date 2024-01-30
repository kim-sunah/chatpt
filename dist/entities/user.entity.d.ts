import { Role } from '../enum/Role';
import { Product } from './product.entity';
import { Inquiry } from './inquiry.entity';
import { InquiryReply } from './inquiry-reply.entity';
export declare class User {
    id: number;
    registration_information: string;
    email: string;
    password: string;
    nickname: string;
    mileage: number;
    gender: string;
    phone: string;
    authority: Role;
    limit: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    products: Product[];
    inquiries: Inquiry[];
    inquiryReplies: InquiryReply[];
}
