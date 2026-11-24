import { NextRequest, NextResponse } from "next/server";
import { getPublishedProjects, getDynamicProjectBySlug } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (slug) {
      const project = await getDynamicProjectBySlug(slug);
      if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, project });
    }

    let projects = await getPublishedProjects();

    if (category && category !== "all") {
      projects = projects.filter((p) => p.category === category);
    }

    return NextResponse.json({
      success: true,
      projects,
      count: projects.length,
    });
  } catch (err: any) {
    console.error("Public projects API error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve projects", message: err.message },
      { status: 500 }
    );
  }
}
