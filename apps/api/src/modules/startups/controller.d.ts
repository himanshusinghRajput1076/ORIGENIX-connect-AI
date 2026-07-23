import { Request, Response } from 'express';
export declare class StartupController {
    getStartups(req: Request, res: Response): Promise<void>;
    getStartupById(req: Request, res: Response): Promise<void>;
    updateMetrics(req: Request, res: Response): Promise<void>;
}
