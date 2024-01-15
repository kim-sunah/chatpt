import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Livecast} from '../entities/livecast.entity'

@Injectable()
export class LivecastService {
	constructor(
        @InjectRepository(Livecast)
        private readonly livecastRepository: Repository<Livecast>
    ) {}
	
	
}
