import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";

const DEFAULT_CATEGORIES = [
  { id: "ecommerce", slug: "ecommerce", label: "E-Commerce", displayOrder: 1, isActive: true },
  { id: "web-app", slug: "web-app", label: "Web Applications", displayOrder: 2, isActive: true },
  { id: "saas", slug: "saas", label: "Software & SaaS", displayOrder: 3, isActive: true },
  { id: "proptech", slug: "proptech", label: "PropTech", displayOrder: 4, isActive: true },
  { id: "ai", slug: "ai", label: "AI & Automation", displayOrder: 5, isActive: true },
];

const categorySchema = z.object({
  label: z.string().min(2, "Label must be at least 2 characters").max(50),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase alphanumeric characters and dashes"),
  description: z.string().optional().default(""),
  displayOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

export async function GET(req: NextRequest) {
  const { user } = await verifyAdminRequest(req);
  // Allow public or admin read
  const db = await connectToDatabase();

  if (!db) {
    return NextResponse.json({
      success: true,
      categories: DEFAULT_CATEGORIES,
      source: "defaults",
    });
  }

  // Ensure default categories exist if empty
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(DEFAULT_CATEGORIES);
  }

  const categories = await Category.find().sort({ displayOrder: 1, label: 1 }).lean();
  return NextResponse.json({ success: true, categories, source: "database" });
}

export async function POST(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ error: "Database not connected." }, { status: 503 });
    }

    const { label, slug, description, displayOrder, isActive } = result.data;
    const existing = await Category.findOne({ slug });

    if (existing) {
      return NextResponse.json(
        { error: `Category with slug "${slug}" already exists.` },
        { status: 409 }
      );
    }

    const category = await Category.create({
      id: slug,
      slug,
      label,
      description,
      displayOrder,
      isActive,
    });

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "CATEGORY_CREATE",
      resourceType: "category",
      resourceId: category._id.toString(),
      details: { label, slug },
      req,
    });

    return NextResponse.json({ success: true, category });
  } catch (err: any) {
    console.error("Create category error:", err);
    return NextResponse.json({ error: err.message || "Failed to create category" }, { status: 500 });
  }
}
