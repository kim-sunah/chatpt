import { InquiryService } from './inquiry.service';
import { InquiryDto } from './dtos/inquiry.dto';
import { Id } from '../util/id';
export declare class InquiryController {
    private readonly inquiryService;
    constructor(inquiryService: InquiryService);
    getInquiries(): Promise<import("../entities/inquiry.entity").Inquiry[]>;
    getGeneralInquiry(): Promise<import("../entities/inquiry.entity").Inquiry[]>;
    getInquiryByProductId(param: Id): Promise<import("../entities/inquiry.entity").Inquiry[]>;
    getInquiryById(query: Id): Promise<import("../entities/inquiry.entity").Inquiry>;
    createGeneralInquiry(body: InquiryDto): Promise<{
        user_id: any;
        product_id: number;
        body: string;
    } & import("../entities/inquiry.entity").Inquiry>;
    createInquiry(body: InquiryDto, param: Id): Promise<{
        user_id: any;
        product_id: number;
        body: string;
    } & import("../entities/inquiry.entity").Inquiry>;
    getMyInquiries(): Promise<import("../entities/inquiry.entity").Inquiry[]>;
    replyInquiry(body: InquiryDto, param: Id): Promise<{
        user_id: any;
        inquiry_id: number;
        body: string;
    } & import("../entities/inquiry-reply.entity").InquiryReply>;
    getReplyByInquiryId(param: Id): Promise<import("../entities/inquiry-reply.entity").InquiryReply[]>;
    updateStatus(body: any, param: Id): Promise<import("typeorm").UpdateResult>;
    softDeleteInquiry(param: Id): Promise<import("typeorm").UpdateResult>;
}
