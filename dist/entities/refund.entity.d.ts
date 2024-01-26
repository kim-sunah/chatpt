import { Relation } from 'typeorm';
import { Payment } from './payment.entity';
export declare class Refund {
    id: number;
    payment_id: number;
    amount: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    payment: Relation<Payment>;
}
