import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateRefundDto {
    @IsInt()
    @Min(1)
    amount: number;

    @IsString()
    @IsOptional()
    body?: string;
}
