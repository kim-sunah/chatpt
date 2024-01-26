import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../auth/decorators/userinfo.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guards';
import { SwCreateDto } from './dto/swcreate-comment.dto';
import { SwUpdateDto } from './dto/swupdate-comment.dto';
import { error } from 'console';

@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Get('product/:productId/comment')
    async commentfind(@Param('productId') productId: number) {
        console.error('Error in commentfind:', error);
        return this.commentService.commentfind(productId);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    async createComment(
        @Param('productId') productId: number,
        @Body() createCommentDto: SwCreateDto,
        @UserInfo() userId: number
    ) {
        console.error('Error in createComment:', error);
        return this.commentService.comment(createCommentDto, productId, userId);
    }

    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Patch(':commentId')
    async commentUpdate(
        @Body() updateCommentDto: SwUpdateDto,
        @Param('commentId') commentId: number,
        @UserInfo() userId: number
    ) {
        console.error('Error in commentUpdate:', error);
        return this.commentService.commentUpdate(userId, commentId, updateCommentDto);
    }

    @ApiBearerAuth('accessoken')
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    async commentDelete(@Param('commentId') commentId: number, @UserInfo() userId: number) {
        console.error('Error in commentDelete:', error);
        return this.commentService.commentDelete(userId, commentId);
    }
}
