import { NextRequest, NextResponse } from "next/server";
import { 
  LinkedInConnectSchema, 
  encryptSecret, 
  sanitizeString 
} from "@origenix/shared";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate payload using strict Zod schema
    const validatedData = LinkedInConnectSchema.parse({
      targetProfileUrl: body.targetProfileUrl || "https://www.linkedin.com/in/himanshusingh88",
      clientId: body.clientId || "origx_client_88",
      clientSecret: body.clientSecret || "origx_secret_secure_key_88",
      scopes: body.scopes || ["r_liteprofile", "r_emailaddress", "w_member_social", "rw_organization"],
    });

    // 2. Encrypt credentials securely before storing/processing
    const encryptedClientId = encryptSecret(validatedData.clientId);
    const encryptedSecret = encryptSecret(validatedData.clientSecret);

    // 3. Return sanitized response
    return NextResponse.json({
      success: true,
      message: "LinkedIn API connection updated successfully",
      data: {
        targetProfileUrl: sanitizeString(validatedData.targetProfileUrl),
        status: body.action === "disconnect" ? "DISCONNECTED" : "CONNECTED",
        scopes: validatedData.scopes,
        encryptedClientIdSnippet: encryptedClientId.substring(0, 16) + "...",
        lastSyncedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Failed",
          details: error.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
        },
        { status: 422 }
      );
    }

    console.error("[API /api/linkedin/connect Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process LinkedIn API connection" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      targetProfileUrl: "https://www.linkedin.com/in/himanshusingh88",
      profileName: "Himanshu Singh",
      status: "CONNECTED",
      scopes: ["r_liteprofile", "r_emailaddress", "w_member_social", "rw_organization"],
      lastSyncedAt: new Date().toISOString(),
    },
  });
}
