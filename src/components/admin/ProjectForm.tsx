"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Image as ImageIcon,
  ExternalLink,
  Code2,
  HelpCircle,
} from "lucide-react";
import ImageUploader from "./ImageUploader";
import { ProjectInput } from "@/lib/projectValidation";

const COMMON_TECH_STACK = [
  "nextjs",
  "threejs",
  "shopify",
  "tailwind",
  "stripe",
  "postgresql",
  "nodejs",
  "typescript",
  "react",
  "redis",
  "mongodb",
  "docker",
  "aws",
  "graphql",
];

interface ProjectFormProps {
  initialData?: Partial<ProjectInput> & { _id?: string; id?: string };
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "overview" | "specs" | "stack" | "features" | "process" | "gallery" | "showcase" | "seo"
  >("basic");

  // Project state strictly aligned with src/app/projects/[slug]/page.tsx
  const [formData, setFormData] = useState<ProjectInput>({
    title: initialData?.title || "",
    slug: initialData?.slug || initialData?.id || "",
    client: initialData?.client || "",
    category: initialData?.category || "ecommerce",
    categoryLabel: initialData?.categoryLabel || "E-Commerce Flagship",
    shortDescription: initialData?.shortDescription || "",
    projectType: initialData?.projectType || "Custom Headless Storefront",
    overview: initialData?.overview || "",
    estimatedCost: initialData?.estimatedCost || "₹4,50,000 – ₹6,00,000",
    duration: initialData?.duration || "6 Weeks",
    deliveryDays: initialData?.deliveryDays || "42 Days",
    sprints: initialData?.sprints || 3,
    image: initialData?.image || "",
    imagePublicId: initialData?.imagePublicId || "",
    accentColor: initialData?.accentColor || "#00D6A0",
    liveUrl: initialData?.liveUrl || "",
    status: initialData?.status || "published",
    featured: initialData?.featured || false,
    displayOrder: initialData?.displayOrder || 0,
    description: {
      lead: initialData?.description?.lead || "",
      highlight: initialData?.description?.highlight || "",
      tail: initialData?.description?.tail || "",
    },
    deliverables: initialData?.deliverables || [
      "Custom Storefront UI Architecture",
      "Interactive 3D Experience",
      "Payment Gateway Integration",
    ],
    techStack: initialData?.techStack || ["nextjs", "threejs", "shopify", "tailwind", "stripe"],
    features: initialData?.features || [
      {
        title: "High-Performance Experience",
        description: "Optimized for sub-second interactions and seamless responsive performance.",
      },
    ],
    processSteps: initialData?.processSteps || [
      {
        step: "01",
        phase: "Discovery",
        title: "Architecture & Design",
        description: "Initial scoping, wireframes, and design token architecture.",
      },
      {
        step: "02",
        phase: "Development",
        title: "Sprint Implementation",
        description: "Core module development with continuous testing and validation.",
      },
    ],
    gallery: initialData?.gallery || [],
    visualShowcases: initialData?.visualShowcases || [],
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    ogImage: initialData?.ogImage || "",
  });

  const [newDeliverable, setNewDeliverable] = useState("");
  const [customTech, setCustomTech] = useState("");

  // Auto-generate slug from title if not manually edited in create mode
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!isEdit && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleTechToggle = (tech: string) => {
    setFormData((prev) => {
      const exists = prev.techStack.includes(tech);
      return {
        ...prev,
        techStack: exists
          ? prev.techStack.filter((t) => t !== tech)
          : [...prev.techStack, tech],
      };
    });
  };

  const handleAddCustomTech = () => {
    const trimmed = customTech.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (trimmed && !formData.techStack.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, trimmed],
      }));
      setCustomTech("");
    }
  };

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()],
      }));
      setNewDeliverable("");
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        { title: "New Feature", description: "Describe the engineering breakthrough..." },
      ],
    }));
  };

  const handleUpdateFeature = (index: number, key: "title" | "description", val: string) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, features: updated };
    });
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddProcessStep = () => {
    const nextStepNum = String(formData.processSteps.length + 1).padStart(2, "0");
    setFormData((prev) => ({
      ...prev,
      processSteps: [
        ...prev.processSteps,
        {
          step: nextStepNum,
          phase: "Execution",
          title: "New Development Milestone",
          description: "Detail the deliverables completed during this sprint phase.",
        },
      ],
    }));
  };

  const handleUpdateProcessStep = (
    index: number,
    key: "step" | "phase" | "title" | "description",
    val: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.processSteps];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, processSteps: updated };
    });
  };

  const handleRemoveProcessStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddGalleryItem = () => {
    setFormData((prev) => ({
      ...prev,
      gallery: [
        ...prev.gallery,
        {
          id: `item-${Date.now()}`,
          title: "Interactive Showcase View",
          subtitle: "High resolution system detail",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600",
          tag: "INTERFACE",
          publicId: "",
        },
      ],
    }));
  };

  const handleUpdateGalleryItem = (index: number, key: string, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.gallery];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, gallery: updated };
    });
  };

  const handleRemoveGalleryItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddVisualShowcase = () => {
    setFormData((prev) => ({
      ...prev,
      visualShowcases: [
        ...prev.visualShowcases,
        {
          title: "Interface Architecture",
          category: "SYSTEM COMPONENT",
          description: "High-performance interface design solving complex business workflows.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
          highlights: ["Sub-second latency", "Zero downtime deploy"],
          publicId: "",
        },
      ],
    }));
  };

  const handleUpdateVisualShowcase = (index: number, key: string, val: any) => {
    setFormData((prev) => {
      const updated = [...prev.visualShowcases];
      updated[index] = { ...updated[index], [key]: val };
      return { ...prev, visualShowcases: updated };
    });
  };

  const handleRemoveVisualShowcase = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      visualShowcases: prev.visualShowcases.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const targetId = initialData?._id || initialData?.id || initialData?.slug;
      const endpoint = isEdit ? `/api/admin/projects/${targetId}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "basic", label: "1. Basic & Hero" },
    { id: "overview", label: "2. Overview & Mission" },
    { id: "specs", label: "3. Specifications" },
    { id: "stack", label: "4. Tech Stack" },
    { id: "features", label: "5. Key Features" },
    { id: "process", label: "6. Process Steps" },
    { id: "gallery", label: "7. Gallery Slider" },
    { id: "showcase", label: "8. Visual Stories" },
    { id: "seo", label: "9. SEO Meta" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header / Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#A5B2C0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F5F8FA]">
              {isEdit ? `Edit Case Study: ${formData.title || "Project"}` : "Create New Project Case Study"}
            </h1>
            <p className="text-xs text-[#A5B2C0]">
              Fields strictly mapped to the public case study presentation page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-medium text-[#A5B2C0] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? "Saving..." : isEdit ? "Update Project" : "Publish Project"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
          <strong>Error saving project:</strong> {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 border-b border-white/[0.06]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#00D6A0] text-[#050A0B] font-bold"
                : "text-[#A5B2C0] hover:text-[#F5F8FA] hover:bg-white/[0.03]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BASIC & HERO */}
      {activeTab === "basic" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            1. Basic Information & Hero Visual
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Project Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Kraftwoods Luxury"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                URL Slug <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center rounded-xl bg-[#070D14] border border-white/[0.08] focus-within:border-[#00D6A0] px-3.5">
                <span className="text-xs font-mono text-[#A5B2C0]/50">/projects/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    }))
                  }
                  placeholder="kraftwoods"
                  className="w-full py-2.5 bg-transparent text-sm text-[#F5F8FA] outline-none font-mono"
                />
              </div>
            </div>

            {/* Client */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Client / Brand Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                placeholder="e.g. Kraftwoods India"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Category Slug <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const cat = e.target.value;
                  const labelMap: Record<string, string> = {
                    ecommerce: "E-Commerce Flagship",
                    "web-app": "Web Application",
                    saas: "Software & SaaS Platform",
                    proptech: "PropTech Architecture",
                    ai: "AI & Autonomous Systems",
                  };
                  setFormData((prev) => ({
                    ...prev,
                    category: cat,
                    categoryLabel: labelMap[cat] || prev.categoryLabel,
                  }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
              >
                <option value="ecommerce">ecommerce (E-Commerce)</option>
                <option value="web-app">web-app (Web Applications)</option>
                <option value="saas">saas (Software & SaaS)</option>
                <option value="proptech">proptech (PropTech)</option>
                <option value="ai">ai (AI & Automation)</option>
              </select>
            </div>

            {/* Category Label */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Category Display Label <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.categoryLabel}
                onChange={(e) => setFormData((prev) => ({ ...prev, categoryLabel: e.target.value }))}
                placeholder="e.g. E-Commerce Flagship"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            {/* Accent Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Hero Ambient Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.accentColor}
                  onChange={(e) => setFormData((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={formData.accentColor}
                  onChange={(e) => setFormData((prev) => ({ ...prev, accentColor: e.target.value }))}
                  placeholder="#00D6A0"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] font-mono outline-none"
                />
              </div>
            </div>

            {/* Live Demo URL */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Live Production Demo URL (Optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                placeholder="https://kraftwoods.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none font-mono"
              />
            </div>

            {/* Short Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Hero Short Description (Shown on Home and Case Study Hero) <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                placeholder="Bespoke digital architecture for high-end wooden luxury crafts..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            {/* Primary Cover Image */}
            <div className="md:col-span-2 pt-2">
              <ImageUploader
                label="Primary Hero Cover Image (16:9 Aspect Ratio)"
                value={formData.image}
                publicId={formData.imagePublicId}
                onChange={(url, publicId) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: url,
                    imagePublicId: publicId || "",
                  }))
                }
              />
            </div>

            {/* Status & Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Publication Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none font-mono"
              >
                <option value="published">Published (Visible Live)</option>
                <option value="draft">Draft (Admin Only)</option>
              </select>
            </div>

            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#F5F8FA]">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded text-[#00D6A0] bg-[#070D14] border-white/20"
                />
                <span>Featured Project</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#A5B2C0]">Display Order:</span>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                  className="w-16 px-2.5 py-1 rounded-lg bg-[#070D14] border border-white/[0.08] text-xs font-mono text-[#F5F8FA]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OVERVIEW & STRATEGIC MISSION */}
      {activeTab === "overview" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            2. Engineering Overview & Strategic Mission
          </h2>

          {/* Overview text */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-[#A5B2C0]">
              Engineering Context & Business Solution (Overview Paragraph) <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.overview}
              onChange={(e) => setFormData((prev) => ({ ...prev, overview: e.target.value }))}
              placeholder="Kraftwoods required an ultra-performant digital flagship capable of rendering custom wood grain variations in real-time..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
            />
          </div>

          {/* Strategic Mission Breakdown */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <div className="text-xs font-mono text-[#00D6A0] font-bold uppercase">
              Strategic Mission Block (Structured Paragraph)
            </div>
            <p className="text-xs text-[#A5B2C0]">
              Renders as: [Lead Text] <span className="text-[#00D6A0] font-bold">[Highlighted Text]</span> [Tail Text]
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-[#A5B2C0]">Lead Phrase</label>
                <input
                  type="text"
                  value={formData.description.lead}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: { ...prev.description, lead: e.target.value },
                    }))
                  }
                  placeholder="Engineered a decoupled headless architecture with"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#00D6A0]">Highlight Phrase (Green Emphasis)</label>
                <input
                  type="text"
                  value={formData.description.highlight}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: { ...prev.description, highlight: e.target.value },
                    }))
                  }
                  placeholder="real-time WebGL configurator and sub-80ms global cache"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-[#00D6A0]/40 text-sm text-[#F5F8FA] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#A5B2C0]">Tail Phrase</label>
                <input
                  type="text"
                  value={formData.description.tail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: { ...prev.description, tail: e.target.value },
                    }))
                  }
                  placeholder="delivering a 280% increase in qualified enterprise leads."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIFICATIONS */}
      {activeTab === "specs" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            3. Project Specifications & Deliverables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Estimated Project Value (INR) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.estimatedCost}
                onChange={(e) => setFormData((prev) => ({ ...prev, estimatedCost: e.target.value }))}
                placeholder="₹4,50,000 – ₹6,00,000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Development Duration <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="6 Weeks"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Sprints Count
              </label>
              <input
                type="number"
                min={1}
                value={formData.sprints}
                onChange={(e) => setFormData((prev) => ({ ...prev, sprints: parseInt(e.target.value) || 1 }))}
                placeholder="3"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                Project Type / Classification <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.projectType}
                onChange={(e) => setFormData((prev) => ({ ...prev, projectType: e.target.value }))}
                placeholder="Custom Headless Storefront"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
              />
            </div>
          </div>

          {/* Main Deliverables List */}
          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <label className="text-xs font-mono font-bold uppercase text-[#00D6A0]">
              Main Deliverables Checklist
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                placeholder="e.g. Next.js App Router Architecture, Stripe Integration..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#070D14] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-4 py-2 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold"
              >
                Add
              </button>
            </div>

            <div className="space-y-1.5 pt-2">
              {formData.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#070D14] border border-white/[0.06] text-xs text-[#F5F8FA]"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6A0]" />
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECH STACK */}
      {activeTab === "stack" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
              4. Technologies Used
            </h2>
            <p className="text-xs text-[#A5B2C0]">
              Technologies render as icons using the built-in TechIcon component. Click to toggle.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {COMMON_TECH_STACK.map((tech) => {
              const active = formData.techStack.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechToggle(tech)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                    active
                      ? "bg-[#00D6A0] text-[#050A0B] font-bold shadow-md shadow-[#00D6A0]/20"
                      : "bg-[#070D14] border border-white/[0.08] text-[#A5B2C0] hover:text-[#F5F8FA]"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {/* Custom Tech Tag Addition */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2">
            <label className="text-xs font-mono text-[#A5B2C0]">Add Custom Tech Slug</label>
            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                placeholder="e.g. kubernetes, rust, figma..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#070D14] border border-white/[0.08] text-xs font-mono text-[#F5F8FA] outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomTech}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-mono text-[#F5F8FA]"
              >
                Add Tech
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KEY FEATURES */}
      {activeTab === "features" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
                5. Key Project Features
              </h2>
              <p className="text-xs text-[#A5B2C0]">
                Displayed in the 2-column feature grid on the case study page.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3.5 py-1.5 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#070D14] border border-white/[0.08] space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00D6A0] font-bold">
                    Feature #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#A5B2C0]">Feature Title</label>
                  <input
                    type="text"
                    required
                    value={feat.title}
                    onChange={(e) => handleUpdateFeature(idx, "title", e.target.value)}
                    placeholder="e.g. Real-Time 3D Configurator"
                    className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#A5B2C0]">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={feat.description}
                    onChange={(e) => handleUpdateFeature(idx, "description", e.target.value)}
                    placeholder="Detail the technical capability..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#A5B2C0] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PROCESS STEPS */}
      {activeTab === "process" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
                6. Development Process Roadmap
              </h2>
              <p className="text-xs text-[#A5B2C0]">
                Displayed in the 4-step horizontal execution cards.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddProcessStep}
              className="px-3.5 py-1.5 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Step</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#070D14] border border-white/[0.08] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00D6A0] font-bold">
                    Step {step.step || idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProcessStep(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Step Number</label>
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => handleUpdateProcessStep(idx, "step", e.target.value)}
                      placeholder="01"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Phase Name</label>
                    <input
                      type="text"
                      value={step.phase}
                      onChange={(e) => handleUpdateProcessStep(idx, "phase", e.target.value)}
                      placeholder="Discovery"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleUpdateProcessStep(idx, "title", e.target.value)}
                      placeholder="Architecture & Design"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#A5B2C0]">Step Summary</label>
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => handleUpdateProcessStep(idx, "description", e.target.value)}
                    placeholder="Describe the activities and achievements..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#A5B2C0] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: INTERACTIVE GALLERY SLIDER */}
      {activeTab === "gallery" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
                7. Interactive Gallery Showcase
              </h2>
              <p className="text-xs text-[#A5B2C0]">
                Images rendered in the ProjectImageShowcase slider component.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddGalleryItem}
              className="px-3.5 py-1.5 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>

          <div className="space-y-5">
            {formData.gallery.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl bg-[#070D14] border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00D6A0] font-bold">
                    Gallery Slide #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryItem(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Slide Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleUpdateGalleryItem(idx, "title", e.target.value)}
                      placeholder="Interactive 3D Configurator"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Subtitle / Description</label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleUpdateGalleryItem(idx, "subtitle", e.target.value)}
                      placeholder="Real-time wood texture rendering"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Badge Tag</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => handleUpdateGalleryItem(idx, "tag", e.target.value)}
                      placeholder="SYSTEM"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] font-mono outline-none"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Slide Image"
                  value={item.image}
                  publicId={item.publicId}
                  onChange={(url, publicId) => {
                    handleUpdateGalleryItem(idx, "image", url);
                    handleUpdateGalleryItem(idx, "publicId", publicId || "");
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: VISUAL SHOWCASES (DEEP DIVE ARCHITECTURE) */}
      {activeTab === "showcase" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
                8. Visual Architecture Deep Dive Stories
              </h2>
              <p className="text-xs text-[#A5B2C0]">
                Alternating full-width editorial feature sections.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddVisualShowcase}
              className="px-3.5 py-1.5 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Deep Dive</span>
            </button>
          </div>

          <div className="space-y-6">
            {formData.visualShowcases.map((showcase, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#070D14] border border-white/[0.08] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#00D6A0] font-bold">
                    Deep Dive #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveVisualShowcase(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Showcase Title</label>
                    <input
                      type="text"
                      value={showcase.title}
                      onChange={(e) => handleUpdateVisualShowcase(idx, "title", e.target.value)}
                      placeholder="Interface Architecture"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#A5B2C0]">Category Pill</label>
                    <input
                      type="text"
                      value={showcase.category}
                      onChange={(e) => handleUpdateVisualShowcase(idx, "category", e.target.value)}
                      placeholder="SYSTEM COMPONENT"
                      className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#A5B2C0]">Description</label>
                  <textarea
                    rows={2}
                    value={showcase.description}
                    onChange={(e) => handleUpdateVisualShowcase(idx, "description", e.target.value)}
                    placeholder="Explore how high-performance design..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#A5B2C0] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#A5B2C0]">Highlights (Comma separated)</label>
                  <input
                    type="text"
                    value={showcase.highlights.join(", ")}
                    onChange={(e) =>
                      handleUpdateVisualShowcase(
                        idx,
                        "highlights",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    placeholder="Sub-second latency, Zero downtime deploy"
                    className="w-full px-3 py-2 rounded-lg bg-[#0C1721] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none font-mono"
                  />
                </div>

                <ImageUploader
                  label="Showcase Asset (16:10 Aspect Ratio)"
                  value={showcase.image}
                  publicId={showcase.publicId}
                  onChange={(url, publicId) => {
                    handleUpdateVisualShowcase(idx, "image", url);
                    handleUpdateVisualShowcase(idx, "publicId", publicId || "");
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: SEO METADATA */}
      {activeTab === "seo" && (
        <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            9. Search Engine Optimization (SEO) & OpenGraph
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A5B2C0]">Custom Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                placeholder={`${formData.title || "Project"} — Case Study | Grandeur Net`}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#A5B2C0]">Custom Meta Description</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                placeholder={formData.shortDescription || "Detailed project case study and technical breakdown."}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-sm text-[#F5F8FA] outline-none"
              />
            </div>

            <div className="pt-2">
              <ImageUploader
                label="OpenGraph Share Image (1200x630)"
                value={formData.ogImage || formData.image}
                onChange={(url) => setFormData((prev) => ({ ...prev, ogImage: url }))}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
