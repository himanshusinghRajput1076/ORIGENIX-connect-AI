import { prisma } from "@origenix/database";

export class AIRepository {
  public static async saveAnalysis(data: {
    entityId: string;
    entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
    analysisType: string;
    result: any;
    confidence: number;
  }) {
    return prisma.aiAnalysis.create({
      data: {
        entityId: data.entityId,
        entityType: data.entityType,
        analysisType: data.analysisType,
        result: data.result,
        confidence: data.confidence,
      },
    });
  }

  public static async getLatestAnalysis(entityId: string) {
    return prisma.aiAnalysis.findFirst({
      where: { entityId },
      orderBy: { generatedAt: "desc" },
    });
  }
}
