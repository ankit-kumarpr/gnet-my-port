import { connectToDatabase } from "@/lib/db";
import { Project as ProjectModel } from "@/models/Project";
import { PROJECTS as STATIC_PROJECTS, Project as StaticProject } from "@/data/projects";

/**
 * Fetch all published projects for the public portfolio showcase.
 * Connects to MongoDB Atlas if available, falling back gracefully to static projects.
 * Guarantees all returned project objects are 100% JSON serializable.
 */
export async function getPublishedProjects(): Promise<StaticProject[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const docs = await ProjectModel.find({ status: "published" })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();

      if (docs && docs.length > 0) {
        return docs.map(transformDocToProject);
      }
    }
  } catch (err) {
    console.error("Error fetching published projects from DB, using fallback:", err);
  }

  return STATIC_PROJECTS.map(transformDocToProject);
}

/**
 * Fetch a single project by its slug (or id) for the public case study page.
 * Gracefully falls back to static projects if database is unavailable or not found in DB.
 */
export async function getDynamicProjectBySlug(slug: string): Promise<StaticProject | undefined> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await ProjectModel.findOne({
        $or: [{ slug }, { id: slug }],
        status: "published",
      }).lean();

      if (doc) {
        return transformDocToProject(doc as any);
      }
    }
  } catch (err) {
    console.error(`Error querying project "${slug}" in DB, using fallback:`, err);
  }

  // Fallback to static data
  const staticFound = STATIC_PROJECTS.find((p) => p.id === slug || (p as any).slug === slug);
  return staticFound ? transformDocToProject(staticFound) : undefined;
}

/**
 * Get all slugs for static params generation and navigation
 */
export async function getAllDynamicProjectSlugs(): Promise<string[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const docs = await ProjectModel.find({ status: "published" }).select("slug id").lean();
      if (docs && docs.length > 0) {
        return docs.map((d: any) => d.slug || d.id);
      }
    }
  } catch (err) {
    console.error("Error fetching project slugs from DB:", err);
  }

  return STATIC_PROJECTS.map((p) => p.id);
}

/**
 * Normalizes MongoDB project document or static project to the public Project interface.
 * Strips non-serializable function handles (like Lucide icon components) so it can safely
 * cross Server Component to Client Component boundaries.
 */
function transformDocToProject(doc: any): StaticProject {
  const staticFallback = STATIC_PROJECTS.find((p) => p.id === (doc.id || doc.slug));

  return {
    id: doc.slug || doc.id || (doc._id ? doc._id.toString() : ""),
    title: doc.title,
    client: doc.client,
    image: doc.image,
    category: doc.category,
    categoryLabel: doc.categoryLabel,
    shortDescription: doc.shortDescription,
    projectType: doc.projectType,
    overview: doc.overview,
    estimatedCost: doc.estimatedCost,
    duration: doc.duration,
    deliveryDays: doc.deliveryDays || staticFallback?.deliveryDays || "",
    sprints: doc.sprints || staticFallback?.sprints || 1,
    accentColor: doc.accentColor || staticFallback?.accentColor || "#00D6A0",
    liveUrl: doc.liveUrl || staticFallback?.liveUrl || "",
    description: doc.description || staticFallback?.description || {
      lead: "",
      highlight: "",
      tail: "",
    },
    deliverables: doc.deliverables && doc.deliverables.length > 0
      ? doc.deliverables
      : staticFallback?.deliverables || [],
    techStack: doc.techStack && doc.techStack.length > 0
      ? doc.techStack
      : staticFallback?.techStack || [],
    features: doc.features && doc.features.length > 0
      ? doc.features
      : staticFallback?.features || [],
    processSteps: doc.processSteps && doc.processSteps.length > 0
      ? doc.processSteps
      : staticFallback?.processSteps || [],
    gallery: doc.gallery && doc.gallery.length > 0
      ? doc.gallery
      : staticFallback?.gallery || [],
    visualShowcases: doc.visualShowcases && doc.visualShowcases.length > 0
      ? doc.visualShowcases
      : staticFallback?.visualShowcases || [],
    highlights: (doc as any).highlights || staticFallback?.highlights || {
      speedScore: "99/100",
      loadTime: "240ms",
      uptime: "99.98%",
    },
    metrics: (doc as any).metrics || staticFallback?.metrics,
    milestones: (doc as any).milestones || staticFallback?.milestones || [],
    technologies: (doc.technologies || staticFallback?.technologies || []).map((t: any) => ({
      name: t.name,
      color: t.color,
      bgLight: t.bgLight,
      detail: t.detail,
    })),
    processPhases: (doc as any).processPhases || staticFallback?.processPhases || [],
  };
}
