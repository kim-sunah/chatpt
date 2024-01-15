import { IsEmail, IsString } from "class-validator"
export class SignInDto {
    @IsEmail()
    Email : string 

    @IsString()
    Password : string
}