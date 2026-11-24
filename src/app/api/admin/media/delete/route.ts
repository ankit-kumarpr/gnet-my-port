import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";
import { deleteAssetByPublicId } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "publicId is required" }, { status: 400 });
    }

    const deleted = await deleteAssetByPublicId(publicId);

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "MEDIA_DELETED",
      resourceType: "media",
      resourceId: publicId,
      details: { success: deleted },
      req,
    });

    return NextResponse.json({ success: true, deleted });
  } catch (err) {
    console.error("Asset deletion error:", err);
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
