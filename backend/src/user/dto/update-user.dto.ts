import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { IsEqualTo } from "src/auth/decorators/match.decorator";

export enum  Gender {
    Male,
    Female
}
export class UpdateuserDto {

    @IsEmail({}, {message : "이메일 형식에 맞게 입력해주세요"})
    @IsNotEmpty({message : "이메일을 입력해주세요"})
    Email : string


    @IsString()
    @IsNotEmpty({message : "패스워드를 입력해주세요"})
    @IsStrongPassword({},{message:'비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자를 포함해야합니다.'})
    Password : string


    @IsString()
    @IsEqualTo("Password")
    ConfirmPassword : string


    @IsMobilePhone()
    @IsNotEmpty({message : "폰번호를 입력해주세요"})
    phone : string

}