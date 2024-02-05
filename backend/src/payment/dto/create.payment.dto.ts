import { IsInt, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
    @IsInt()
    user_id: number;

    @IsInt()
    product_id: number;

    @IsInt()
    pay_method_id?: number = 0;

    @IsInt()
    mileage: number;
}