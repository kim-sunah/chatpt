import { Repository } from 'typeorm';
import { Inquiry } from '../entities/inquiry.entity';
import { InquiryReply } from '../entities/inquiry-reply.entity';
import { Product } from '../entities/product.entity';
import { Request } from 'express';
export declare class InquiryService {
    private readonly inquiryRepository;
    private readonly inquiryReplyRepository;
    private readonly productRepository;
    private readonly req;
    constructor(inquiryRepository: Repository<Inquiry>, inquiryReplyRepository: Repository<InquiryReply>, productRepository: Repository<Product>, req: Request);
    getInquiries(): Promise<Inquiry[]>;
    getInquiryByProductId(product_id: number): Promise<Inquiry[]>;
    getInquiryById(id: number): Promise<Inquiry>;
    createInquiry(body: string, product_id?: number | undefined): Promise<{
        user_id: any;
        product_id: number;
        body: string;
    } & Inquiry>;
    getMyInquiries(): Promise<Inquiry[]>;
    replyInquiry(body: string, inquiry_id: number): Promise<{
        user_id: any;
        inquiry_id: number;
        body: string;
    } & InquiryReply>;
    getReplyByInquiryId(inquiry_id: number): Promise<InquiryReply[]>;
    updateStatus(status: number, id: number): Promise<import("typeorm").UpdateResult>;
    softDeleteInquiry(id: number): Promise<import("typeorm").UpdateResult>;
}
