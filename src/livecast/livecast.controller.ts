import { Controller } from '@nestjs/common';
import {LivecastService} from './livecast.service'

@Controller('livecast')
export class LivecastController {
	constructor(private readonly livecastService: LivecastService) {}
	
	// 라이브 등록
	async createLivecast(){
	}
}
