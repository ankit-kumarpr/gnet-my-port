import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, recordAudit, verifyAdminRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { user } = await verifyAdminRequest(req);

  if (user) {
    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "ADMIN_LOGOUT",
      resourceType: "auth",
      req,
    });
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
