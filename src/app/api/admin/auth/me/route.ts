import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";

export async function GET(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);

  if (!user) {
    return NextResponse.json({ authenticated: false, error }, { status: 401 });
  }

  // If using demo admin
  if (user.adminId === "demo-admin") {
    return NextResponse.json({
      authenticated: true,
      user: {
        id: "demo-admin",
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }

  await connectToDatabase();
  const dbUser = await AdminUser.findById(user.adminId).select("-passwordHash");

  if (!dbUser || !dbUser.isActive) {
    return NextResponse.json({ authenticated: false, error: "Account inactive or removed" }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: dbUser._id.toString(),
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      lastLogin: dbUser.lastLogin,
    },
  });
}
