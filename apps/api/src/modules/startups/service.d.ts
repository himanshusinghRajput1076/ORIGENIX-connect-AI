import * as schemas from './schemas';
import { z } from 'zod';
export declare class StartupService {
    getStartups(): Promise<never[]>;
    getStartupById(id: string): Promise<never>;
    updateMetrics(id: string, data: z.infer<typeof schemas.StartupMetricsUpdateSchema>): Promise<null>;
}
