import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    commentfind(productId: number): Promise<Comment[]>;
    comment(createCommentDto: CreateCommentDto, productId: number, userId: number): Promise<Comment>;
    commentUpdate(userId: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    commentDelete(userId: number, commentId: number): Promise<void>;
}
