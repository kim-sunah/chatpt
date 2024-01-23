import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import {Inquiry} from '../entities/inquiry.entity'
import {InquiryReply} from '../entities/inquiry-reply.entity'
import {AuthModule} from '../auth/auth.module'
import {User} from '../entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Inquiry,InquiryReply,User]),AuthModule],
    controllers: [InquiryController],
    providers: [InquiryService]
})
export class InquiryModule {}
