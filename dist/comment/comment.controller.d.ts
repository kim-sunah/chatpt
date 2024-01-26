import { CommentService } from './comment.service';
import { SwCreateDto } from './dto/swcreate-comment.dto';
import { SwUpdateDto } from './dto/swupdate-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    commentfind(productId: number): Promise<import("../entities/comment.entity").Comment[]>;
    createComment(productId: number, createCommentDto: SwCreateDto, userId: number): Promise<import("../entities/comment.entity").Comment>;
    commentUpdate(updateCommentDto: SwUpdateDto, commentId: number, userId: number): Promise<import("../entities/comment.entity").Comment>;
    commentDelete(commentId: number, userId: number): Promise<void>;
}
