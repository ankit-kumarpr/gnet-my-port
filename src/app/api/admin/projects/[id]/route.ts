import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";
import { projectInputSchema } from "@/lib/projectValidation";
import { deleteAssetByPublicId } from "@/lib/cloudinary";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const { id } = params;
  const db = await connectToDatabase();

  if (!db) {
    const staticProject = getProjectBySlug(id) || PROJECTS.find((p) => p.id === id);
    if (!staticProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: staticProject, source: "static" });
  }

  const project = await Project.findOne({
    $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
  }).lean();

  if (!project) {
    // Fallback to static if not found in DB
    const staticProject = getProjectBySlug(id) || PROJECTS.find((p) => p.id === id);
    if (staticProject) {
      return NextResponse.json({ success: true, project: staticProject, source: "static" });
    }
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, project, source: "database" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const { id } = params;
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
        { error: "Database not connected. Please verify MONGODB_URI." },
        { status: 503 }
      );
    }

    const existing = await Project.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const data = result.data;

    // Check slug collision with other projects
    const slugCollision = await Project.findOne({
      _id: { $ne: existing._id },
      $or: [{ id: data.slug }, { slug: data.slug }],
    });

    if (slugCollision) {
      return NextResponse.json(
        { error: `Slug "${data.slug}" is already in use by another project.` },
        { status: 409 }
      );
    }

    // Asset cleanup if cover image was replaced
    if (
      existing.imagePublicId &&
      data.imagePublicId &&
      existing.imagePublicId !== data.imagePublicId
    ) {
      deleteAssetByPublicId(existing.imagePublicId).catch(console.error);
    }

    const oldStatus = existing.status;
    const updated = await Project.findByIdAndUpdate(
      existing._id,
      {
        ...data,
        id: data.slug,
      },
      { new: true, runValidators: true }
    );

    let action = "PROJECT_UPDATE";
    if (oldStatus !== data.status) {
      action = data.status === "published" ? "PROJECT_PUBLISH" : "PROJECT_UNPUBLISH";
    }

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action,
      resourceType: "project",
      resourceId: existing._id.toString(),
      details: { title: data.title, slug: data.slug, status: data.status },
      req,
    });

    return NextResponse.json({
      success: true,
      project: updated,
    });
  } catch (err: any) {
    console.error("Update project error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  // Restrict deletion to superadmin or admin
  if (user.role === "editor") {
    return NextResponse.json(
      { error: "Insufficient permissions to delete projects" },
      { status: 403 }
    );
  }

  try {
    const { id } = params;
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json(
        { error: "Database not connected. Please verify MONGODB_URI." },
        { status: 503 }
      );
    }

    const existing = await Project.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
    });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Cleanup images from Cloudinary in background
    if (existing.imagePublicId) {
      deleteAssetByPublicId(existing.imagePublicId).catch(console.error);
    }

    if (existing.gallery && existing.gallery.length > 0) {
      existing.gallery.forEach((item) => {
        if (item.publicId) deleteAssetByPublicId(item.publicId).catch(console.error);
      });
    }

    if (existing.visualShowcases && existing.visualShowcases.length > 0) {
      existing.visualShowcases.forEach((showcase) => {
        if (showcase.publicId) deleteAssetByPublicId(showcase.publicId).catch(console.error);
      });
    }

    await Project.findByIdAndDelete(existing._id);

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "PROJECT_DELETE",
      resourceType: "project",
      resourceId: existing._id.toString(),
      details: { title: existing.title, slug: existing.slug },
      req,
    });

    return NextResponse.json({
      success: true,
      message: `Project "${existing.title}" successfully deleted.`,
    });
  } catch (err: any) {
    console.error("Delete project error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
