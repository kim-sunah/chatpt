import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import {Livecast} from '../entities/livecast.entity'
import {LiveComment} from '../entities/live-comment.entity'

@Injectable()
export class LivecastService {
	constructor(
        @InjectRepository(Livecast)
        private readonly livecastRepository: Repository<Livecast>
    ) {}
	
	
}
