import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";
import { projectInputSchema } from "@/lib/projectValidation";
import { PROJECTS } from "@/data/projects";

export async function GET(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));

  const db = await connectToDatabase();

  // If DB not connected, return in-memory static projects as preview
  if (!db) {
    let filtered = [...PROJECTS];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }
    if (category && category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      projects: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      source: "static_preview",
    });
  }

  // MongoDB query
  const query: Record<string, unknown> = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { client: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "all") {
    query.category = category;
  }

  if (status && (status === "published" || status === "draft")) {
    query.status = status;
  }

  const total = await Project.countDocuments(query);
  const projects = await Project.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({
    success: true,
    projects,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    source: "database",
  });
}

export async function POST(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = projectInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Please verify MONGODB_URI in environment." },
        { status: 503 }
      );
    }

    const data = result.data;
    const id = data.slug.toLowerCase().trim();

    // Check slug/id uniqueness
    const existing = await Project.findOne({
      $or: [{ id }, { slug: data.slug }],
    });

    if (existing) {
      return NextResponse.json(
        { error: `A project with slug or ID "${data.slug}" already exists.` },
        { status: 409 }
      );
    }

    const newProject = await Project.create({
      ...data,
      id,
    });

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "PROJECT_CREATE",
      resourceType: "project",
      resourceId: newProject._id.toString(),
      details: { title: newProject.title, slug: newProject.slug },
      req,
    });

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (err: any) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
