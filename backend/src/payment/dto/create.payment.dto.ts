import { IsInt, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
    @IsInt()
    user_id: number;

    @IsInt()
    product_id: number;

    @IsString()
    pay_method_id?: string;

    @IsInt()
    @Min(1)
    count: number;

    @IsInt()
    mileage: number;
}
