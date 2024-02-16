import { IsString, IsEmail , IsMobilePhone , IsStrongPassword , IsNotEmpty, IsEnum, IsOptional } from "class-validator";

import { IsEqualTo } from "../decorators/match.decorator";



export class KakaoLoginDto {
    
    @IsString()
    Email : string

    @IsString()
    Nickname : string

    @IsString()
    profile_image : string

    
    // @IsMobilePhone()
    // @IsNotEmpty({message : "폰번호를 입력해주세요"})
    // phone : string

}