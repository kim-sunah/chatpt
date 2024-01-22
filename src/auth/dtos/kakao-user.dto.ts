import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { Role } from "src/enum/Role";
import { IsEqualTo } from "../decorators/match.decorator";



export class KakaoLoginDto {
    
    @IsString()
    Email : string

    @IsString()
    Nickname : string
    
    // @IsMobilePhone()
    // @IsNotEmpty({message : "폰번호를 입력해주세요"})
    // phone : string

}