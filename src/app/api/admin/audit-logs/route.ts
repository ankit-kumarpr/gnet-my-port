import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AuditLog } from "@/models/AuditLog";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "30", 10)));
  const action = searchParams.get("action");
  const resourceType = searchParams.get("resourceType");

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json({
      success: true,
      logs: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
    });
  }

  const query: Record<string, unknown> = {};
  if (action) query.action = action;
  if (resourceType) query.resourceType = resourceType;

  const total = await AuditLog.countDocuments(query);
  const logs = await AuditLog.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({
    success: true,
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
