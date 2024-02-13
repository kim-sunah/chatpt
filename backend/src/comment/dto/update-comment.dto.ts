import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateCommentDto {
    @IsString()
    @ApiProperty({ description: '댓글' })
    @IsNotEmpty({ message: '수정할 댓글을 입력해주세요' })
    comment: string;
	
	@IsInt()
	@Min(1)
	@Max(5)
	rating: number
}
