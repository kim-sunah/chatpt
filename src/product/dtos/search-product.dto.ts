import { IsNotEmpty, IsString, IsInt, Min, IsOptional, MinLength, MaxLength, IsArray, ArrayMinSize, IsEnum } from 'class-validator'
import { Category } from '../../enum/Category'
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
	
	@IsArray()
	@ArrayMinSize(1)
	@IsEnum(Category,{each:true})
	categories: Category[]
}