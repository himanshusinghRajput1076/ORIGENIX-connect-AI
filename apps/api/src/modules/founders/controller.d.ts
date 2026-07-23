import { Request, Response } from 'express';
export declare class FounderController {
    getFounders(req: Request, res: Response): Promise<void>;
    getFounderById(req: Request, res: Response): Promise<void>;
}
