import { IsString, IsInt, Min, IsNotEmpty, IsEnum, IsOptional, IsDateString, Max } from 'class-validator'
import { Category } from 'src/enum/Category'

export class CreateProductDto {
	@IsNotEmpty()
    @IsString()
    name : string
	
	@IsOptional()
	@IsEnum(Category)
	category: Category
	
	@IsOptional()
	@IsString()
	body: string
	
	@IsOptional()
	@IsString()
	intro: string
	
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
	
	@IsInt()
	@Min(1)
	@Max(127)
	weekday: number
	
	// start_at
	// end_at
}