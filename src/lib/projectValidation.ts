import { z } from "zod";

export const projectFeatureSchema = z.object({
  title: z.string().min(1, "Feature title is required").max(120),
  description: z.string().min(1, "Feature description is required").max(500),
});

export const projectProcessStepSchema = z.object({
  step: z.string().min(1, "Step number is required"),
  phase: z.string().min(1, "Phase name is required"),
  title: z.string().min(1, "Step title is required"),
  description: z.string().min(1, "Step description is required"),
});

export const projectGalleryItemSchema = z.object({
  id: z.string().default(() => `item-${Date.now()}`),
  title: z.string().min(1, "Gallery title is required"),
  subtitle: z.string().default(""),
  image: z.string().url("Valid image URL is required"),
  tag: z.string().default("SYSTEM"),
  publicId: z.string().optional().default(""),
});

export const visualShowcaseItemSchema = z.object({
  title: z.string().min(1, "Showcase title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Valid image URL is required"),
  highlights: z.array(z.string()).default([]),
  publicId: z.string().optional().default(""),
});

export const projectInputSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(150),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase alphanumeric characters and dashes"),
  client: z.string().min(1, "Client name is required").max(100),
  category: z.string().min(1, "Category is required"),
  categoryLabel: z.string().min(1, "Category display label is required"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(350),
  projectType: z.string().min(1, "Project type is required").max(100),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  estimatedCost: z.string().min(1, "Estimated cost is required"),
  duration: z.string().min(1, "Duration is required"),
  deliveryDays: z.string().default(""),
  sprints: z.coerce.number().min(1).default(1),
  image: z.string().url("Cover image must be a valid URL"),
  imagePublicId: z.string().optional().default(""),
  accentColor: z.string().default("#00D6A0"),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["published", "draft"]).default("published"),
  featured: z.boolean().default(false),
  displayOrder: z.coerce.number().default(0),
  description: z.object({
    lead: z.string().default(""),
    highlight: z.string().default(""),
    tail: z.string().default(""),
  }),
  deliverables: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  features: z.array(projectFeatureSchema).default([]),
  processSteps: z.array(projectProcessStepSchema).default([]),
  gallery: z.array(projectGalleryItemSchema).default([]),
  visualShowcases: z.array(visualShowcaseItemSchema).default([]),
  metaTitle: z.string().optional().default(""),
  metaDescription: z.string().optional().default(""),
  ogImage: z.string().optional().default(""),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
