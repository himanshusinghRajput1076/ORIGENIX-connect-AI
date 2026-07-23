import { Request, Response } from 'express';
export declare class CRMController {
    getContacts(req: Request, res: Response): Promise<void>;
    updateContactStage(req: Request, res: Response): Promise<void>;
    addNote(req: Request, res: Response): Promise<void>;
    getNotes(req: Request, res: Response): Promise<void>;
}
