import { IsString, IsInt, Min, IsOptional, MinLength, MaxLength } from 'class-validator'
import { Category } from '../../enum/Category'

export class SearchProductDto {
	@IsOptional()
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	key: string
	
	@IsOptional()
	@IsInt()
	@Min(1)
	minSalePrice: string
	
	@IsOptional()
	@IsInt()
	@Min(1)
	maxSalePrice: string
	
	//@IsOptional()
	
}