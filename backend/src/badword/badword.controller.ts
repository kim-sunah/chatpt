import { Controller } from '@nestjs/common'
import {BadwordService} from './badword.service'

@Controller('badword')
export class BadwordController {
	constructor(private readonly badwordService: BadwordService) {}
}
