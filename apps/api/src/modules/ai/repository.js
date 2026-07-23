"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRepository = void 0;
const database_1 = require("@origenix/database");
class AIRepository {
    static async saveAnalysis(data) {
        return database_1.prisma.aiAnalysis.create({
            data: {
                entityId: data.entityId,
                entityType: data.entityType,
                analysisType: data.analysisType,
                result: data.result,
                confidence: data.confidence,
            },
        });
    }
    static async getLatestAnalysis(entityId) {
        return database_1.prisma.aiAnalysis.findFirst({
            where: { entityId },
            orderBy: { generatedAt: "desc" },
        });
    }
}
exports.AIRepository = AIRepository;
