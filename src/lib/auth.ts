import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { connectToDatabase } from "./db";
import { AdminUser, IAdminUserDocument } from "@/models/AdminUser";
import { AuditLog } from "@/models/AuditLog";

export const COOKIE_NAME = "grandeur_admin_session";
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "grandeur_net_dev_secure_jwt_secret_2026";
const TOKEN_EXPIRY = "7d";

export interface SessionPayload {
  adminId: string;
  email: string;
  role: "superadmin" | "admin" | "editor";
  name: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch (err) {
    return null;
  }
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function verifyAdminRequest(
  req: NextRequest
): Promise<{ user: SessionPayload | null; error?: string }> {
  const tokenFromCookie = req.cookies.get(COOKIE_NAME)?.value;
  const authHeader = req.headers.get("Authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return { user: null, error: "Authentication required" };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return { user: null, error: "Invalid or expired session" };
  }

  return { user: payload };
}

export async function recordAudit(params: {
  adminId?: string;
  adminEmail?: string;
  action: string;
  resourceType: "project" | "category" | "auth" | "media" | "system";
  resourceId?: string;
  details?: Record<string, unknown>;
  req?: NextRequest;
}) {
  try {
    await connectToDatabase();
    const ip =
      params.req?.headers.get("x-forwarded-for")?.split(",")[0] ||
      params.req?.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = params.req?.headers.get("user-agent") || "unknown";

    await AuditLog.create({
      adminId: params.adminId || "",
      adminEmail: params.adminEmail || "",
      action: params.action,
      resourceType: params.resourceType,
      resourceId: params.resourceId || "",
      details: params.details || {},
      ipAddress: ip,
      userAgent: userAgent,
    });
  } catch (err) {
    console.error("Failed to write audit log:", err);
  }
}

// Initial bootstrap helper for creating the primary admin if none exists
export async function ensureDefaultAdmin(): Promise<IAdminUserDocument | null> {
  await connectToDatabase();
  const count = await AdminUser.countDocuments();
  if (count === 0) {
    const email = (process.env.INITIAL_ADMIN_EMAIL || process.env.DEFAULT_ADMIN_EMAIL || "admin@grandeurnet.com").toLowerCase().trim();
    const rawPassword = process.env.INITIAL_ADMIN_PASSWORD || process.env.DEFAULT_ADMIN_PASSWORD || "GrandeurAdmin2026!";
    const passwordHash = await hashPassword(rawPassword);

    const defaultAdmin = await AdminUser.create({
      name: "Grandeur Lead Admin",
      email,
      passwordHash,
      role: "superadmin",
      isActive: true,
    });

    console.log(`✅ Default admin created: ${email}`);
    return defaultAdmin;
  }
  return null;
}
