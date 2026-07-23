import { NextRequest, NextResponse } from "next/server";
import { generatePersonalizedOutreach } from "@origenix/ai";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Generate personalized outreach with strict Zod validation & sanitization
    const outreachResult = await generatePersonalizedOutreach(body);

    return NextResponse.json({
      success: true,
      data: outreachResult,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          details: error.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
        },
        { status: 422 }
      );
    }

    console.error("[API /api/ai/outreach Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        message: "An unexpected error occurred while generating outreach.",
      },
      { status: 500 }
    );
  }
}
