import { IsString} from "class-validator";





export class googleLoginDto {
    
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