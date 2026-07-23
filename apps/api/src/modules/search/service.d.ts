import * as schemas from './schemas';
import { z } from 'zod';
export declare class SearchService {
    globalSearch(params: z.infer<typeof schemas.GlobalSearchSchema>): Promise<{
        companies: never[];
        investors: never[];
        founders: never[];
        startups: never[];
    }>;
}
