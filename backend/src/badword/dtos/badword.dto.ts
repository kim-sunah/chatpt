import { IsArray, IsString, IsNotEmpty } from 'class-validator'

export class BadwordDto {
	@IsArray()
	@IsNotEmpty({each: true})
	@IsString({each: true})
	badwords: string[]
}