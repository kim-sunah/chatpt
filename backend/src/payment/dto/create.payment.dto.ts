import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
    @IsInt()
    user_id: number;

    @IsInt()
    product_id: number;

	@IsOptional()
    @IsString()
    method: string = 'MILEAGE';

    @IsInt()
    mileage: number;
}