import {IsInt, Min, ValidateIf} from 'class-validator'
import {Type} from 'class-transformer'

export class Id {
    @IsInt()
    @Type(() => Number)
    @Min(1)
    id: number	
}