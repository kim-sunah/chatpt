import { Controller, Body, Get, Post } from '@nestjs/common'
import {BadwordService} from './badword.service'
import {BadwordDto} from './dtos/badword.dto'

@Controller('badword')
export class BadwordController {
	constructor(private readonly badwordService: BadwordService) {}
	
	@Post('')
	async createBadword(@Body() body: BadwordDto){
		return await this.badwordService.createBadword(body.badwords)
	}
}
