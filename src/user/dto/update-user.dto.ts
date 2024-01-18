import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum } from "class-validator";


export enum  Gender {
    Male,
    Female
}
export class UpdateuserDto {

    @IsEmail({}, {message : "이메일 형식에 맞게 입력해주세요"})
    @IsNotEmpty({message : "이메일을 입력해주세요"})
    Email : string

    @IsNotEmpty({message : "닉네임을 입력해주세요"})
    @IsString()
    Nickname : string

    @IsMobilePhone()
    @IsNotEmpty({message : "폰번호를 입력해주세요"})
    phone : string

}