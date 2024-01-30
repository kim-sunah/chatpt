import { IsString, IsInt, Min, IsNotEmpty, IsEnum, IsOptional, IsDateString, Max } from 'class-validator'
import { Category } from 'src/enum/Category'
import { ProductStatus } from 'src/enum/ProductStatus'

export class CreateProductDto {
	@IsNotEmpty()
    @IsString()
    name : string
	
	@IsOptional()
	@IsEnum(Category)
	category: Category
	
	@IsOptional()
	@IsEnum(ProductStatus)
	status: ProductStatus
	
	@IsOptional()
	@IsString()
	body: string
	
	@IsInt()
	@Min(1)
	price: number
	
	@IsOptional()
	@IsInt()
	@Min(1)
	sale_price: number
	
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(100)
	capacity: number
	
	@IsDateString()
	@IsNotEmpty()
	start_on: string
	
	@IsDateString()
	@IsNotEmpty()
	end_on: string
}