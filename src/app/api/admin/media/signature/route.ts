import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { generateSignedUploadParams } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "grandeur-net/projects";

  const params = generateSignedUploadParams(folder);

  if (!params) {
    return NextResponse.json(
      {
        error: "Cloudinary credentials not configured in environment variables.",
        configured: false,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    configured: true,
    ...params,
  });
}
