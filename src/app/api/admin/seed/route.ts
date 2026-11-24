import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project as ProjectModel } from "@/models/Project";
import { Category as CategoryModel } from "@/models/Category";
import { PROJECTS as STATIC_PROJECTS } from "@/data/projects";
import { verifyAdminRequest, recordAudit } from "@/lib/auth";

const DEFAULT_CATEGORIES = [
  { id: "ecommerce", slug: "ecommerce", label: "E-Commerce", displayOrder: 1, isActive: true },
  { id: "web-app", slug: "web-app", label: "Web Applications", displayOrder: 2, isActive: true },
  { id: "saas", slug: "saas", label: "Software & SaaS", displayOrder: 3, isActive: true },
  { id: "proptech", slug: "proptech", label: "PropTech", displayOrder: 4, isActive: true },
  { id: "ai", slug: "ai", label: "AI & Automation", displayOrder: 5, isActive: true },
];

export async function POST(req: NextRequest) {
  const { user, error } = await verifyAdminRequest(req);
  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  const db = await connectToDatabase();
  if (!db) {
    return NextResponse.json(
      { error: "MongoDB Atlas is not connected. Please configure MONGODB_URI." },
      { status: 503 }
    );
  }

  try {
    // 1. Seed Categories if empty
    let categoriesInserted = 0;
    for (const cat of DEFAULT_CATEGORIES) {
      const exists = await CategoryModel.findOne({ slug: cat.slug });
      if (!exists) {
        await CategoryModel.create(cat);
        categoriesInserted++;
      }
    }

    // 2. Seed Projects from src/data/projects.ts
    let projectsInserted = 0;
    let projectsUpdated = 0;

    for (let i = 0; i < STATIC_PROJECTS.length; i++) {
      const staticP = STATIC_PROJECTS[i];
      const slug = staticP.id;

      const projectData = {
        id: slug,
        slug,
        title: staticP.title,
        client: staticP.client,
        category: staticP.category,
        categoryLabel: staticP.categoryLabel,
        shortDescription: staticP.shortDescription,
        projectType: staticP.projectType,
        overview: staticP.overview,
        estimatedCost: staticP.estimatedCost,
        duration: staticP.duration,
        deliveryDays: staticP.deliveryDays || "",
        sprints: staticP.sprints || 1,
        image: staticP.image,
        imagePublicId: "",
        accentColor: staticP.accentColor || "#00D6A0",
        liveUrl: staticP.liveUrl || "",
        status: "published" as const,
        featured: i < 3,
        displayOrder: i + 1,
        description: staticP.description || { lead: "", highlight: "", tail: "" },
        deliverables: staticP.deliverables || [],
        techStack: staticP.techStack || [],
        features: staticP.features || [],
        processSteps: staticP.processSteps || [],
        gallery: staticP.gallery || [],
        visualShowcases: staticP.visualShowcases || [],
        metaTitle: `${staticP.title} — Case Study | Grandeur Net`,
        metaDescription: staticP.shortDescription,
        ogImage: staticP.image,
      };

      const existing = await ProjectModel.findOne({ $or: [{ slug }, { id: slug }] });

      if (!existing) {
        await ProjectModel.create(projectData);
        projectsInserted++;
      } else {
        await ProjectModel.findByIdAndUpdate(existing._id, projectData);
        projectsUpdated++;
      }
    }

    await recordAudit({
      adminId: user.adminId,
      adminEmail: user.email,
      action: "DATABASE_SEED",
      resourceType: "system",
      details: {
        projectsInserted,
        projectsUpdated,
        categoriesInserted,
        totalStatic: STATIC_PROJECTS.length,
      },
      req,
    });

    return NextResponse.json({
      success: true,
      message: `Database seeded successfully. Inserted: ${projectsInserted}, Updated: ${projectsUpdated}, Categories: ${categoriesInserted}.`,
      stats: {
        projectsInserted,
        projectsUpdated,
        categoriesInserted,
        total: STATIC_PROJECTS.length,
      },
    });
  } catch (err: any) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { error: "Failed to seed database.", message: err.message },
      { status: 500 }
    );
  }
}
