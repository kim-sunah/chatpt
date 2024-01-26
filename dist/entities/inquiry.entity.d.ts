import { InquiryStatus } from '../enum/InquiryStatus';
import { Product } from './product.entity';
import { User } from './user.entity';
import { InquiryReply } from './inquiry-reply.entity';
export declare class Inquiry {
    id: number;
    user_id: number;
    product_id: number;
    seller_id: number;
    body: string;
    status: InquiryStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    replies: InquiryReply[];
    user: User;
    product?: Product | null;
}
