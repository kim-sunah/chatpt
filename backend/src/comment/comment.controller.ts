import { Body, Query, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../auth/decorators/userinfo.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guards';
import { SwCreateDto } from './dto/swcreate-comment.dto';
import { SwUpdateDto } from './dto/swupdate-comment.dto';
import { error } from 'console';
import { PageDto } from '../product/dtos/page.dto'
import { use } from 'passport';
import {Id} from '../util/id'

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

	// 강의별 리뷰 목록
    @ApiBearerAuth('accessToken')
    @Get('product/:productId')
    async commentfind(@Param('productId') productId: number, @Query() query: PageDto) {
		const { page, pageSize } = query
        //console.error('Error in commentfind:', error);
        return await this.commentService.commentfind(productId,page,pageSize);
    }
	
	// 강의별 리뷰 수, 평점 총합, 평균
	@Get('rating/:id')
	async getRating(@Param() param: Id){
		const {count,sum} = await this.commentService.getRating(param.id)
		return {count,sum,avg:(count!=='0'? sum/count:0)}
	}
	
	// 내가 쓴 리뷰 목록
	@ApiBearerAuth('accessToken')
	@UseGuards(JwtAuthGuard)
	@Get('my')
	async getMyComments(@Query() query: PageDto){
		const { page, pageSize } = query
        return await this.commentService.getMyComments(page,pageSize);
	}

    //강의에 맞는 리뷰 목록
    @ApiBearerAuth('accessToken')
	@UseGuards(JwtAuthGuard)
	@Get('my/:id')
	async getComments(@Param("id") param : string){
        return await this.commentService.getComments(+param);
	}

	
	// 리뷰 쓰기
    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Post(':productId')
    async createComment(
        @Param('productId') productId: number,
        @Body() createCommentDto: SwCreateDto,
        @UserInfo() userId: number
    ) {
        return await this.commentService.comment(createCommentDto, productId, userId['id']);
    }

	// 리뷰 수정
    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @Patch(':commentId')
    async commentUpdate(
        @Body() updateCommentDto: SwUpdateDto,
        @Param('commentId') commentId: number,
        @UserInfo() userId: number
    ) {
       
        console.error('Error in commentUpdate:', error);
       await this.commentService.commentUpdate(userId['id'], commentId, updateCommentDto);
        return {
            statusCode: HttpStatus.OK,

          };
    }

	// 리뷰 삭제
    @ApiBearerAuth('accessoken')
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    async commentDelete(@Param('commentId') commentId: number, @UserInfo() userId: number) {
        console.error('Error in commentDelete:', error);
        return await this.commentService.commentDelete(userId['id'], commentId);
    }
}
