import { Request, Response } from 'express';
export declare class LinkedInController {
    connect(req: Request, res: Response): Promise<void>;
    sendMessage(req: Request, res: Response): Promise<void>;
    getProfile(req: Request, res: Response): Promise<void>;
}
