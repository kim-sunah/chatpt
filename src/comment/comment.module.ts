import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Comment } from '../entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User, Product])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}
