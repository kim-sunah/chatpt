import { User } from './user.entity';
import { Inquiry } from './inquiry.entity';
import { Role } from '../enum/Role';
export declare class InquiryReply {
    id: number;
    user_id: number;
    inquiry_id: number;
    role: Role;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    inquiry: Inquiry;
}
