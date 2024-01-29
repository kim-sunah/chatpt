import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Inquiry} from '../entities/inquiry.entity'
import {InquiryReply} from '../entities/inquiry-reply.entity'
import {AuthModule} from '../auth/auth.module'
import {User} from '../entities/user.entity'
import {Product} from '../entities/product.entity'
import {BadwordModule} from '../badword/badword.module'

@Module({
	imports: [TypeOrmModule.forFeature([Inquiry,InquiryReply,User,Product]),AuthModule,BadwordModule],
    controllers: [InquiryController],
    providers: [InquiryService]
})
export class InquiryModule {}
