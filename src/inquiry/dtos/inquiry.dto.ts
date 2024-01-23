import { IsNotEmpty, IsString } from 'class-validator'

export class InquiryDto {
	@IsNotEmpty()
	@IsString()
	body: string
}