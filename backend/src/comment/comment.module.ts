import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Comment } from '../entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/entities/user.entity';
import {Payment} from '../entities/payment.entity'
import {AuthModule} from '../auth/auth.module'
import {BadwordModule} from '../badword/badword.module'

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User, Product,Payment]),AuthModule,BadwordModule],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
