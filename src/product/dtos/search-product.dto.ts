import { IsNotEmpty, IsString, IsInt, Min, IsOptional, MinLength, MaxLength, IsArray, ArrayMinSize, ArrayMaxSize, IsEnum } from 'class-validator'
import { Category } from '../../enum/Category'
import { IsNotLessThan } from '../../util/is-not-less-than.decorator'

export class SearchProductDto {
	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(5)
	@IsNotEmpty({each: true})
	@IsString({each: true})
	@MinLength(2,{each: true})
	@MaxLength(20,{each: true})
	key: string[]
	
	@IsArray()
	@ArrayMinSize(0)
	@ArrayMaxSize(5)
	@IsNotEmpty({each: true})
	@IsString({each: true})
	@MinLength(2,{each: true})
	@MaxLength(20,{each: true})
	antiKey: string[]
	
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