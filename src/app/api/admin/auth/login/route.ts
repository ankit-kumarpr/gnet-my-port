import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { AdminUser } from "@/models/AdminUser";
import {
  comparePassword,
  generateToken,
  COOKIE_NAME,
  recordAudit,
  ensureDefaultAdmin,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const db = await connectToDatabase();

    if (!db) {
      // In local development or when MongoDB is not yet configured, allow demo admin if credentials match
      const allowedPasswords = [
        process.env.INITIAL_ADMIN_PASSWORD,
        process.env.DEFAULT_ADMIN_PASSWORD,
        "GrandeurAdmin2026!",
        "GrandeurNet@2026!",
      ].filter(Boolean);

      if (
        email === "admin@grandeurnet.com" &&
        allowedPasswords.includes(password)
      ) {
        const token = generateToken({
          adminId: "demo-admin",
          email: "admin@grandeurnet.com",
          role: "superadmin",
          name: "Grandeur Demo Administrator",
        });

        const response = NextResponse.json({
          success: true,
          user: {
            id: "demo-admin",
            name: "Grandeur Demo Administrator",
            email: "admin@grandeurnet.com",
            role: "superadmin",
          },
        });

        response.cookies.set(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
      }

      return NextResponse.json(
        { error: "Database connection unavailable. Please check MONGODB_URI." },
        { status: 503 }
      );
    }

    // Automatically ensure default admin is initialized if zero admins exist
    await ensureDefaultAdmin();

    const admin = await AdminUser.findOne({ email });

    if (!admin) {
      await recordAudit({
        action: "ADMIN_LOGIN_FAILED_UNKNOWN_USER",
        resourceType: "auth",
        details: { attemptedEmail: email },
        req,
      });

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check account lockout
    if (admin.lockUntil && admin.lockUntil > new Date()) {
      const waitMinutes = Math.ceil((admin.lockUntil.getTime() - Date.now()) / (1000 * 60));
      return NextResponse.json(
        {
          error: `Account is temporarily locked due to multiple failed attempts. Try again in ${waitMinutes} minutes.`,
        },
        { status: 423 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { error: "This administrator account has been deactivated." },
        { status: 403 }
      );
    }

    // Verify password
    const isMatch = await comparePassword(password, admin.passwordHash);

    if (!isMatch) {
      const attempts = (admin.failedLoginAttempts || 0) + 1;
      let lockUntil: Date | undefined = undefined;

      // Lock account for 15 minutes after 5 consecutive failures
      if (attempts >= 5) {
        lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await AdminUser.findByIdAndUpdate(admin._id, {
        failedLoginAttempts: attempts,
        ...(lockUntil ? { lockUntil } : {}),
      });

      await recordAudit({
        adminId: admin._id.toString(),
        adminEmail: admin.email,
        action: "ADMIN_LOGIN_FAILED_BAD_PASSWORD",
        resourceType: "auth",
        details: { attempts },
        req,
      });

      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Reset failed attempts on success and update last login
    await AdminUser.findByIdAndUpdate(admin._id, {
      failedLoginAttempts: 0,
      lockUntil: null,
      lastLogin: new Date(),
    });

    const token = generateToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    await recordAudit({
      adminId: admin._id.toString(),
      adminEmail: admin.email,
      action: "ADMIN_LOGIN_SUCCESS",
      resourceType: "auth",
      details: { role: admin.role },
      req,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
