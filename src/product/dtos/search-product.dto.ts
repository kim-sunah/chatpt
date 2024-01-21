import { IsNotEmpty, IsString, IsInt, Min, Max, IsOptional, MinLength, MaxLength, IsArray, ArrayMinSize, ArrayMaxSize, IsEnum } from 'class-validator'
import {Type} from 'class-transformer'
import { IsNotLessThan } from '../../util/is-not-less-than.decorator'

export class SearchProductDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	key: string
	
	@IsOptional()
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	antiKey: string
	
	@IsInt()
	@Min(1)
	minSalePrice: number = 1
	
	@IsInt()
	@Min(1)
	@IsNotLessThan('minSalePrice',{message:'maxSalePrice must not be less than minSalePrice'})
	maxSalePrice: number = 4294967295
	
	@IsInt()
    @Type(() => Number)
    @Min(1)
	@Max(1023)
	categories: number = 1023
	
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