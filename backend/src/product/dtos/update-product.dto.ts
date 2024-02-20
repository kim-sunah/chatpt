import { IsString, IsInt, Min, IsNotEmpty, IsEnum, IsOptional, Max, IsDateString } from 'class-validator'
import { Category } from 'src/enum/Category'
import { ProductStatus } from 'src/enum/ProductStatus'

export class UpdateProductDto {
	@IsOptional()
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
	
	@IsOptional()
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
	@Max(20)
	capacity: number
	
	@IsOptional()
	@IsDateString()
	@IsNotEmpty()
	start_on: string
	
	@IsOptional()
	@IsDateString()
	@IsNotEmpty()
	end_on: string
}
