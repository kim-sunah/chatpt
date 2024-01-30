import { LiveStatus } from '../enum/LiveStatus';
export declare class Livecast {
    id: number;
    host_id: number;
    product_id: number;
    status: LiveStatus;
    url: string;
    start_time: Date;
    end_time: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
