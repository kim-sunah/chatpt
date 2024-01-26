import { LivecastService } from './livecast.service';
export declare class LivecastController {
    private readonly livecastService;
    constructor(livecastService: LivecastService);
    createLivecast(): Promise<void>;
}
