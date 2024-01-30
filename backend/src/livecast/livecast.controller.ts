import { Controller, Post, Query, Delete, Get, Param, UseGuards, Body } from '@nestjs/common';
import {LivecastService} from './livecast.service'
import { RoleGuard } from '../auth/guard/role.guard';
import { Role } from '../enum/Role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Id } from 'src/util/id'
import {ScheduleDto} from './dtos/schedule.dto'
import { PageDto } from '../product/dtos/page.dto'

@Controller('live')
export class LivecastController {
	constructor(private readonly livecastService: LivecastService) {}
	
	// 라이브 스케줄 등록
	@UseGuards(RoleGuard)
	@Roles(Role.Host)
	@Post(':id')
	async createLivecasts(@Param() param: Id, @Body() body: ScheduleDto){
		return await this.livecastService.createLivecasts(param.id, body.schedules)
	}
	
	// 라이브 스케줄 삭제
	@UseGuards(RoleGuard)
	@Roles(Role.Host)
	@Delete(':id')
	async softDeleteLivecast(@Param() param: Id){
		return await this.livecastService.softDeleteLivecast(param.id)
	}
	
	// 강의별 스케줄 목록
	@Get('product/:id')
	async getLivecastsByProduct(@Param() param: Id, @Query() query: PageDto){
		const { page, pageSize } = query
		return await this.livecastService.getLivecastsByProduct(param.id, page, pageSize)
	}
	
	// 호스트별 스케줄 목록
	@UseGuards(RoleGuard)
	@Roles(Role.Host)
	@Get('my')
	async getMyLivecasts(@Query() query: PageDto){
		const { page, pageSize } = query
		return await this.livecastService.getMyLivecasts(page, pageSize)
	}
}
