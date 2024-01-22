import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { SwCreateDto } from './dto/swcreate-comment.dto';
import { SwUpdateDto } from './dto/swupdate-comment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Get('product/:productId/comment')
    async commentfind(@Param('productId') productId: number) {
        return this.commentService.commentfind(productId);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    async createComment(
        @Param('productId') productId: number,
        @Body() createCommentDto: SwCreateDto,
        @UserId() userId: number
    ) {
        return this.commentService.comment(createCommentDto, productId, userId);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Patch(':commentId')
    async commentUpdate(
        @Body() updateCommentDto: SwUpdateDto,
        @Param('commentId') commentId: number,
        @UserId() userId: number
    ) {
        return this.commentService.commentUpdate(userId, commentId, updateCommentDto);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    async commentDelete(@Param('commentId') commentId: number, @UserId() userId: number) {
        return this.commentService.commentDelete(userId, commentId);
    }
}
