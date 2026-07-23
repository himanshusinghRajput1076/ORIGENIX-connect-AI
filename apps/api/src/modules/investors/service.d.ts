import * as schemas from './schemas';
import { z } from 'zod';
export declare class InvestorService {
    getInvestors(filters: z.infer<typeof schemas.InvestorFilterSchema>): Promise<never[]>;
    getInvestorById(id: string): Promise<never>;
}
