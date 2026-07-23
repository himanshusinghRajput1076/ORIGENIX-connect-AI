import { Request, Response } from "express";
import { AnalyzeEntitySchema, MatchComputeSchema, OutreachGenerateSchema } from "./schemas";
import { AIService } from "./service";

export class AIController {
  public static async analyze(req: Request, res: Response) {
    try {
      const validated = AnalyzeEntitySchema.parse(req.body);
      const data = await AIService.analyzeEntity(validated);
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message || error });
    }
  }

  public static match(req: Request, res: Response) {
    try {
      const validated = MatchComputeSchema.parse(req.body);
      const data = AIService.computeMatching(validated);
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message || error });
    }
  }

  public static outreach(req: Request, res: Response) {
    try {
      const validated = OutreachGenerateSchema.parse(req.body);
      const data = AIService.generateOutreach(validated);
      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message || error });
    }
  }

  public static trends(_req: Request, res: Response) {
    const data = AIService.getSectorTrends();
    return res.json({ success: true, data });
  }
}
