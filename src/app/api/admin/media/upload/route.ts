import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "grandeur-net/projects";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate MIME type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file format. Allowed types: JPEG, PNG, WebP, AVIF, SVG" },
        { status: 400 }
      );
    }

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 10MB maximum limit" },
        { status: 400 }
      );
    }

    // Convert to buffer data URL
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await uploadToCloudinary(dataUri, folder);

    if (!uploaded) {
      return NextResponse.json(
        { error: "Failed to upload asset to Cloudinary. Check API credentials." },
        { status: 500 }
      );
    }

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "MEDIA_UPLOADED",
      resourceType: "media",
      resourceId: uploaded.public_id,
      details: { url: uploaded.secure_url, format: uploaded.format },
      req,
    });

    return NextResponse.json({
      success: true,
      asset: uploaded,
    });
  } catch (err) {
    console.error("Media upload handler error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during media processing" },
      { status: 500 }
    );
  }
}
