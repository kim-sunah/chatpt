import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum } from "class-validator";
import { Gender } from "../../enum/Gender";
import { IsEqualTo } from "../decorator/match.decorator";


export class CreateuserDto {
    @IsEmail({}, {message : "이메일 형식에 맞게 입력해주세요"})
    @IsNotEmpty({message : "이메일을 입력해주세요"})
    Email : string

    @IsNotEmpty({message : "닉네임을 입력해주세요"})
    @IsString()
    Nickname : string

    @IsString()
    @IsNotEmpty({message : "패스워드를 입력해주세요"})
    @IsStrongPassword({},{message:'비밀번호는 영문 알파벳 대/소문자, 숫자, 특수문자를 포함해야합니다.'})
    Password : string

    @IsString()
    @IsEqualTo("Password")
    ConfirmPassword : string

    @IsEnum(Gender)
    Gender : string

    @IsMobilePhone()
    @IsNotEmpty({message : "폰번호를 입력해주세요"})
    phone : string
}