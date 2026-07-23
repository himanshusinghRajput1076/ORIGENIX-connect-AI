import * as schemas from './schemas';
import { z } from 'zod';
export declare class FounderService {
    getFounders(filters: z.infer<typeof schemas.FounderFilterSchema>): Promise<never[]>;
    getFounderById(id: string): Promise<never>;
}
