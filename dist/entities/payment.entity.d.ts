import { PayStatus } from '../enum/PayStatus';
export declare class Payment {
    id: number;
    user_id: number;
    product_id: number;
    pay_method_id: number;
    spending: number;
    count: number;
    mileage: number;
    status: PayStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
