import { NextResponse } from "next/server";
import { 
  fetchLiveTrendingStartups, 
  fetchLiveInvestors,
  fetchLiveFounders,
  fetchLiveFundingNews 
} from "@origenix/shared";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const location = searchParams.get("location") || "India";
    const industry = searchParams.get("industry") || "all";
    const query = searchParams.get("query") || "";

    const [startups, investors, founders, fundingNews] = await Promise.all([
      fetchLiveTrendingStartups(),
      fetchLiveInvestors(location, industry),
      fetchLiveFounders(location, query),
      fetchLiveFundingNews(),
    ]);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      isRealTime: true,
      filters: { type, location, industry, query },
      data: {
        liveStartups: startups,
        liveInvestors: investors,
        liveFounders: founders,
        liveFundingNews: fundingNews,
      },
    });
  } catch (error: any) {
    console.error("[API /api/data/real-time Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch real-time public data signals" },
      { status: 500 }
    );
  }
}
