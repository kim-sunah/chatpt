import { IsInt, Min, Max } from 'class-validator'
import {Type} from 'class-transformer'

export class PageDto {
	@IsInt()
    @Type(() => Number)
    @Min(1)
    page: number = 1
	
	@IsInt()
	@Type(() => Number)
    @Min(5)
	@Max(100)
    pageSize: number = 5
}