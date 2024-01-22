import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/enum/Role";
import { IsEqualTo } from "../decorators/match.decorator";

export class CreateuserDto {


    @IsEmail({}, {message : "존재하지 않는 이메일"})
    @IsNotEmpty({message : "이메일을 입력해주세요"})
    Email : string

    @IsString()
    @IsNotEmpty({message : "패스워드를 입력해주세요"})
   
    Password : string

    @IsString()
    @IsEqualTo("Password")
    ConfirmPassword : string

    @IsString()
    Gender : string

    @IsMobilePhone()
    @IsNotEmpty({message : "폰번호를 입력해주세요"})
    phone : string

    @IsString()
    @IsNotEmpty({message : "인증번호를 입력해주세요"})
    Emailauthentication : string

}