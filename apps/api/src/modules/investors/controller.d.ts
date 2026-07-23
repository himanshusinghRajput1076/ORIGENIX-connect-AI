import { Request, Response } from 'express';
export declare class InvestorController {
    getInvestors(req: Request, res: Response): Promise<void>;
    getInvestorById(req: Request, res: Response): Promise<void>;
}
