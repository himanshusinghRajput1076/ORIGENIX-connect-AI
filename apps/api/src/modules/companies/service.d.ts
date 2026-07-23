import * as schemas from './schemas';
import { z } from 'zod';
export declare class CompanyService {
    getCompanies(filters: z.infer<typeof schemas.CompanyFilterSchema>): Promise<never[]>;
    getCompanyById(id: string): Promise<never>;
    createCompany(data: z.infer<typeof schemas.CompanyCreateSchema>): Promise<any>;
    updateCompany(id: string, data: z.infer<typeof schemas.CompanyUpdateSchema>): Promise<any>;
    deleteCompany(id: string): Promise<boolean>;
}
