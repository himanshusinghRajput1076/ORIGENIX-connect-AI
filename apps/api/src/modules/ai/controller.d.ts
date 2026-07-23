import { Request, Response } from "express";
export declare class AIController {
    static analyze(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static match(req: Request, res: Response): Response<any, Record<string, any>>;
    static outreach(req: Request, res: Response): Response<any, Record<string, any>>;
    static trends(_req: Request, res: Response): Response<any, Record<string, any>>;
}
