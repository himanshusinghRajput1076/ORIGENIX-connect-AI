export declare class AIRepository {
    static saveAnalysis(data: {
        entityId: string;
        entityType: "COMPANY" | "INVESTOR" | "FOUNDER" | "STARTUP";
        analysisType: string;
        result: any;
        confidence: number;
    }): Promise<{
        result: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        companyId: string | null;
        entityId: string;
        entityType: import("@origenix/database").$Enums.EntityType;
        analysisType: string;
        confidence: number;
        generatedAt: Date;
    }>;
    static getLatestAnalysis(entityId: string): Promise<{
        result: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        companyId: string | null;
        entityId: string;
        entityType: import("@origenix/database").$Enums.EntityType;
        analysisType: string;
        confidence: number;
        generatedAt: Date;
    } | null>;
}
