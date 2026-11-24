import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";

const categoryUpdateSchema = z.object({
  label: z.string().min(2).max(50),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().default(""),
  displayOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) return NextResponse.json({ error }, { status: 401 });

  try {
    const { id } = params;
    const body = await req.json();
    const result = categoryUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const existing = await Category.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
    });

    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const { label, slug, description, displayOrder, isActive } = result.data;

    // Check collision
    const collision = await Category.findOne({
      _id: { $ne: existing._id },
      slug,
    });

    if (collision) {
      return NextResponse.json({ error: `Slug "${slug}" already in use.` }, { status: 409 });
    }

    const updated = await Category.findByIdAndUpdate(
      existing._id,
      { label, slug, id: slug, description, displayOrder, isActive },
      { new: true }
    );

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "CATEGORY_UPDATE",
      resourceType: "category",
      resourceId: existing._id.toString(),
      details: { label, slug },
      req,
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) return NextResponse.json({ error }, { status: 401 });

  try {
    const { id } = params;
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ error: "Database not connected." }, { status: 503 });

    const existing = await Category.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id }, { slug: id }],
    });

    if (!existing) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await Category.findByIdAndDelete(existing._id);

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "CATEGORY_DELETE",
      resourceType: "category",
      resourceId: existing._id.toString(),
      details: { label: existing.label, slug: existing.slug },
      req,
    });

    return NextResponse.json({ success: true, message: `Category "${existing.label}" deleted.` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete category" }, { status: 500 });
  }
}
