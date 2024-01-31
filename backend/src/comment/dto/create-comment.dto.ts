import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @ApiProperty({ description: '댓글' })
    @IsNotEmpty({ message: '댓글을 입력해주세요' })
    comment: string;
	
	@IsInt()
	@Min(1)
	@Max(10)
	rating: number
}
