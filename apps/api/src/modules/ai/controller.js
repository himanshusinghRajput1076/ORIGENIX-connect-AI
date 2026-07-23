"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const schemas_1 = require("./schemas");
const service_1 = require("./service");
class AIController {
    static async analyze(req, res) {
        try {
            const validated = schemas_1.AnalyzeEntitySchema.parse(req.body);
            const data = await service_1.AIService.analyzeEntity(validated);
            return res.json({ success: true, data });
        }
        catch (error) {
            return res.status(400).json({ success: false, error: error.message || error });
        }
    }
    static match(req, res) {
        try {
            const validated = schemas_1.MatchComputeSchema.parse(req.body);
            const data = service_1.AIService.computeMatching(validated);
            return res.json({ success: true, data });
        }
        catch (error) {
            return res.status(400).json({ success: false, error: error.message || error });
        }
    }
    static outreach(req, res) {
        try {
            const validated = schemas_1.OutreachGenerateSchema.parse(req.body);
            const data = service_1.AIService.generateOutreach(validated);
            return res.json({ success: true, data });
        }
        catch (error) {
            return res.status(400).json({ success: false, error: error.message || error });
        }
    }
    static trends(_req, res) {
        const data = service_1.AIService.getSectorTrends();
        return res.json({ success: true, data });
    }
}
exports.AIController = AIController;
