import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProjectFeature {
  title: string;
  description: string;
}

export interface IProjectProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

export interface IProjectGalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  publicId?: string;
}

export interface IVisualShowcaseItem {
  title: string;
  category: string;
  description: string;
  image: string;
  highlights: string[];
  publicId?: string;
}

export interface IProjectDocument extends Document {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  categoryLabel: string;
  shortDescription: string;
  projectType: string;
  overview: string;
  estimatedCost: string;
  duration: string;
  deliveryDays: string;
  sprints: number;
  image: string;
  imagePublicId?: string;
  accentColor: string;
  liveUrl?: string;
  status: "published" | "draft";
  featured: boolean;
  displayOrder: number;
  description: {
    lead: string;
    highlight: string;
    tail: string;
  };
  deliverables: string[];
  techStack: string[];
  features: IProjectFeature[];
  processSteps: IProjectProcessStep[];
  gallery: IProjectGalleryItem[];
  visualShowcases: IVisualShowcaseItem[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    id: {
      type: String,
      required: [true, "Project identifier is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Project slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category slug is required"],
      trim: true,
      index: true,
    },
    categoryLabel: {
      type: String,
      required: [true, "Category display label is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Project overview is required"],
      trim: true,
    },
    estimatedCost: {
      type: String,
      required: [true, "Estimated cost is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
    deliveryDays: {
      type: String,
      default: "",
    },
    sprints: {
      type: Number,
      default: 1,
      min: 1,
    },
    image: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    accentColor: {
      type: String,
      default: "#00D6A0",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    description: {
      lead: { type: String, default: "" },
      highlight: { type: String, default: "" },
      tail: { type: String, default: "" },
    },
    deliverables: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    features: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    processSteps: [
      {
        step: { type: String, required: true },
        phase: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    gallery: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, default: "" },
        image: { type: String, required: true },
        tag: { type: String, default: "SYSTEM" },
        publicId: { type: String, default: "" },
      },
    ],
    visualShowcases: [
      {
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        highlights: { type: [String], default: [] },
        publicId: { type: String, default: "" },
      },
    ],
    metaTitle: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    ogImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during HMR
export const Project: Model<IProjectDocument> =
  mongoose.models.Project || mongoose.model<IProjectDocument>("Project", ProjectSchema);
