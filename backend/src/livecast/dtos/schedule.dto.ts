import { IsString, IsArray, IsNotEmpty, ArrayMinSize, IsDateString, ValidateNested } from 'class-validator'
import { IsNotLessThan } from '../../util/is-not-less-than.decorator'
import { Type } from 'class-transformer'

class Schedule{
	
    @IsString()
    name : string
	
	@IsDateString()
	@IsNotEmpty()
	start_time: string
	
	@IsDateString()
	@IsNotEmpty()
	@IsNotLessThan('start_time',{message:'end_time must not be sooner than end_time'})
	end_time: string
}

export class ScheduleDto{
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@IsArray()
	@Type(() => Schedule)
	schedules: Schedule[]
}