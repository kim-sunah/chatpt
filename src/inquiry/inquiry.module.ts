import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Inquiry} from '../entities/inquiry.entity'
import {InquiryReply} from '../entities/inquiry-reply.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Inquiry,InquiryReply])],
    controllers: [InquiryController],
    providers: [InquiryService]
})
export class InquiryModule {}
