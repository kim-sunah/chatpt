import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum } from "class-validator";

export class LimituserDto {
    @IsString()
    email: string  

    @IsString()
    registration_information : string
}