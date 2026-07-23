import { NextRequest, NextResponse } from "next/server";
import { calculateMatchScore } from "@origenix/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.investor || !body.startup) {
      return NextResponse.json(
        { success: false, error: "Missing required investor or startup payload" },
        { status: 400 }
      );
    }

    const matchResult = calculateMatchScore({
      investor: {
        id: body.investor.id || "inv_1",
        name: body.investor.name || "Investor",
        industries: body.investor.industries || [],
        preferredStages: body.investor.preferredStages || [],
        investmentMin: body.investor.investmentMin,
        investmentMax: body.investor.investmentMax,
      },
      startup: {
        id: body.startup.id || "stg_1",
        name: body.startup.name || "Startup",
        industry: body.startup.industry || "General",
        stage: body.startup.stage || "Seed",
        targetRaiseAmount: body.startup.targetRaiseAmount,
        recentSignalScore: body.startup.recentSignalScore,
      },
    });

    return NextResponse.json({
      success: true,
      data: matchResult,
    });
  } catch (error: any) {
    console.error("[API /api/ai/matching Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate match score" },
      { status: 500 }
    );
  }
}
