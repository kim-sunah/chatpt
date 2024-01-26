import { Repository } from 'typeorm';
import { Livecast } from '../entities/livecast.entity';
export declare class LivecastService {
    private readonly livecastRepository;
    constructor(livecastRepository: Repository<Livecast>);
}
