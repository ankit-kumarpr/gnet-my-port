import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Activity,
  Zap,
  Workflow,
  Compass,
  Code2,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  getDynamicProjectBySlug,
  getPublishedProjects,
  getAllDynamicProjectSlugs,
} from "@/lib/projects";
import TechIcon from "@/components/TechIcon";

// Allow revalidation so newly published projects in admin appear dynamically
export const revalidate = 60;
export const dynamicParams = true;

const ProjectUnifiedGallery = dynamic(
  () => import("@/components/project/ProjectUnifiedGallery"),
  { ssr: true }
);

// Pre-render static paths for all projects
export async function generateStaticParams() {
  const slugs = await getAllDynamicProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getDynamicProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found — Grandeur Net",
    };
  }

  return {
    title: `${project.title} — Case Study | Grandeur Net`,
    description: `${project.shortDescription} Estimated delivery: ${project.duration}, Category: ${project.categoryLabel}.`,
    openGraph: {
      title: `${project.title} | Grandeur Net Case Study`,
      description: project.shortDescription,
    },
  };
}

// Feature icons lookup map for editorial visual rhythm
const FEATURE_ICONS = [Cpu, Zap, Layers, ShieldCheck, Activity, Sparkles];

// Role mapping helper for technologies in production stack
const TECH_ROLES: Record<string, string> = {
  nextjs: "Full-Stack Framework & Edge SSR",
  react: "Client Component Architecture",
  threejs: "WebGL 3D Rendering & Shaders",
  typescript: "Strict Type Safety & Invariants",
  tailwind: "Design System & Responsive Layouts",
  shopify: "E-Commerce Engine & Headless APIs",
  stripe: "PCI-Compliant Checkout & Payouts",
  postgresql: "Relational Data Modeling & ACID",
  redis: "Distributed Cache & Ephemeral Locks",
  nodejs: "High-Throughput Asynchronous Runtime",
  docker: "Containerized Microservices",
  aws: "Serverless Compute & Object Storage",
  supabase: "Realtime Database & Row-Level Security",
  graphql: "Optimized Client Data Ingestion",
  python: "Algorithmic Pipelines & AI Agents",
  mongodb: "Flexible Document Persistence",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [project, allProjects] = await Promise.all([
    getDynamicProjectBySlug(params.slug),
    getPublishedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  // Prev / Next Project Navigation
  const list = allProjects.length > 0 ? allProjects : [project];
  const currentIndex = list.findIndex((p) => p.id === project.id);
  const nextProject = list[(currentIndex + 1) % list.length];
  const prevProject =
    list[(currentIndex - 1 + list.length) % list.length];

  return (
    <div className="min-h-screen bg-[#050A0B] text-[#F5F8FA] selection:bg-[#00D6A0] selection:text-[#050A0B]">
      {/* Background Subtle Emerald & Cyan Ambient Glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full blur-[220px] pointer-events-none opacity-15"
        style={{ backgroundColor: project.accentColor || "#00D6A0" }}
      />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] rounded-full blur-[240px] pointer-events-none bg-[#38BDF8]/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24 space-y-16 sm:space-y-24">
        {/* ================================================================== */}
        {/* SECTION 1: PROJECT INTRODUCTION & EDITORIAL HEADER                 */}
        {/* ================================================================== */}
        <header className="space-y-6 sm:space-y-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-[#A5B2C0] hover:text-[#00D6A0] transition-colors"
              >
                Home
              </Link>
              <span className="text-white/30">/</span>
              <Link
                href="/#projects"
                className="text-[#A5B2C0] hover:text-[#00D6A0] transition-colors"
              >
                Projects
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[#00D6A0] font-medium truncate max-w-[200px] sm:max-w-none">
                {project.title}
              </span>
            </div>

            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A5B2C0] hover:text-[#00D6A0] transition-colors bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-[#00D6A0]/40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>
          </nav>

          {/* Confident Editorial Headline & Metadata */}
          <div className="space-y-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#0C1721] border border-[#00D6A0]/40 text-[#00D6A0] text-xs font-mono font-medium">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[#A5B2C0]">
                Client: <span className="text-[#F5F8FA]">{project.client}</span>
              </span>
              <span className="text-xs font-mono text-white/20 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-[#A5B2C0] hidden sm:inline">
                Deployment: <span className="text-[#F5F8FA]">{project.duration}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F5F8FA] tracking-tight leading-[1.08]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-[#A5B2C0] leading-relaxed pt-1 max-w-3xl">
              {project.shortDescription}
            </p>
          </div>
        </header>

        {/* ================================================================== */}
        {/* SECTION 2: UNIFIED HERO IMAGE + INTERACTIVE GALLERY                */}
        {/* (Single showcase component directly beneath introduction)          */}
        {/* ================================================================== */}
        <section aria-label="Project Visual Gallery">
          <ProjectUnifiedGallery
            primaryImage={project.image}
            gallery={project.gallery || []}
            projectTitle={project.title}
            categoryLabel={project.categoryLabel}
            accentColor={project.accentColor}
            liveUrl={project.liveUrl}
          />
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: ENGINEERING CONTEXT & BUSINESS SOLUTION (ASYMMETRICAL)   */}
        {/* ================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/[0.08]">
          {/* Primary Column: Editorial Narrative & Engineering Decisions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>CASE STUDY OVERVIEW</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Engineering Context & Business Solution
            </h2>

            <p className="text-sm sm:text-base text-[#A5B2C0] leading-relaxed">
              {project.overview}
            </p>

            {/* Strategic Mission & Business Impact Highlight Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] text-sm text-[#A5B2C0] leading-relaxed space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D6A0] uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Strategic Mission & Value Created</span>
              </div>
              <p>
                {project.description.lead}{" "}
                <strong className="text-[#00D6A0] font-semibold">
                  {project.description.highlight}
                </strong>{" "}
                {project.description.tail}
              </p>
            </div>

            {/* Client Testimonial (if available in project data) */}
            {project.clientQuote && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0C1721] to-[#070D14] border-l-2 border-[#00D6A0] border-y border-r border-white/[0.08] space-y-3">
                <p className="text-sm italic text-[#F5F8FA]/90 leading-relaxed">
                  &ldquo;{project.clientQuote.text}&rdquo;
                </p>
                <div className="text-xs font-mono text-[#A5B2C0]">
                  <span className="font-bold text-[#F5F8FA]">
                    {project.clientQuote.author}
                  </span>{" "}
                  — {project.clientQuote.role}
                </div>
              </div>
            )}
          </div>

          {/* Secondary Column: Sticky Project Specifications (5 cols) */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] p-6 space-y-5 shadow-lg lg:sticky lg:top-24">
              <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A5B2C0] font-bold">
                  Project Specifications
                </span>
                <span className="text-[10px] font-mono text-[#00D6A0] bg-[#00D6A0]/10 px-2 py-0.5 rounded border border-[#00D6A0]/30 font-bold">
                  VERIFIED
                </span>
              </div>

              {/* Estimated Value */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A5B2C0]">
                  <CreditCard className="w-3.5 h-3.5 text-[#00D6A0]" />
                  <span>Estimated Project Value</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#F5F8FA] tracking-tight">
                  {project.estimatedCost}
                </div>
                <div className="text-[11px] font-mono text-[#A5B2C0]/70">
                  Transparent milestone-based delivery
                </div>
              </div>

              {/* Timeline & Sprints */}
              <div className="space-y-1 pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A5B2C0]">
                  <Clock className="w-3.5 h-3.5 text-[#00D6A0]" />
                  <span>Development Duration</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#00D6A0]">
                  {project.duration}
                </div>
                <div className="text-[11px] font-mono text-[#A5B2C0]/70">
                  Shipped across {project.sprints} focused sprints
                </div>
              </div>

              {/* Industry / Category */}
              <div className="space-y-1 pt-3 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-[#A5B2C0]">
                  Industry & Category
                </div>
                <div className="text-sm font-semibold text-[#F5F8FA]">
                  {project.projectType}
                </div>
              </div>

              {/* Live Status / URL */}
              {project.liveUrl && (
                <div className="space-y-1 pt-3 border-t border-white/[0.06]">
                  <div className="text-xs font-mono text-[#A5B2C0]">
                    Live Deployment
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00D6A0] hover:underline"
                  >
                    <span>{project.liveUrl.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Verified Deliverables */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/[0.06]">
                  <div className="text-xs font-mono text-[#A5B2C0] font-medium">
                    Verified Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {project.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#F5F8FA]/90"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6A0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: INTERFACE ARCHITECTURE & CORE SYSTEMS                   */}
        {/* (Distinct visual deep dives with unique non-duplicated assets)     */}
        {/* ================================================================== */}
        {project.visualShowcases && project.visualShowcases.length > 0 && (
          <section className="space-y-12 pt-8 border-t border-white/[0.08]">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
                <span>CORE SYSTEMS BREAKDOWN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
                Interface Architecture & Core Systems
              </h2>
              <p className="text-sm text-[#A5B2C0]">
                Explore how high-performance visual design and reliable engineering mechanisms combine to solve complex user workflows.
              </p>
            </div>

            {/* Alternating Editorial Compositions */}
            <div className="space-y-16 sm:space-y-20">
              {project.visualShowcases.map((showcase, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Visual Asset (7 cols) */}
                    <div
                      className={`lg:col-span-7 ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070D14] border border-white/[0.08] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={showcase.image}
                          alt={showcase.title}
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A0B]/70 via-transparent to-transparent pointer-events-none" />

                        {/* Top subtle category pill */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-[#050A0B]/85 text-[#00D6A0] border border-[#00D6A0]/30 backdrop-blur-md">
                            {showcase.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Explanation (5 cols) */}
                    <div
                      className={`lg:col-span-5 space-y-4 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C1721] border border-white/[0.08] text-xs font-mono text-[#A5B2C0]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
                        <span>System Capability 0{index + 1}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#F5F8FA] tracking-tight">
                        {showcase.title}
                      </h3>

                      <p className="text-sm text-[#A5B2C0] leading-relaxed">
                        {showcase.description}
                      </p>

                      {/* Technical Highlights Badges */}
                      {showcase.highlights && showcase.highlights.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {showcase.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-[#0C1721] border border-white/[0.08] text-xs font-mono text-[#F5F8FA] font-medium"
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================== */}
        {/* SECTION 5: SOPHISTICATED TECHNOLOGY STACK                          */}
        {/* (Non-generic layout displaying tech icon, name, and role)          */}
        {/* ================================================================== */}
        <section className="space-y-6 pt-8 border-t border-white/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>STACK & INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Technologies Used
            </h2>
            <p className="text-sm text-[#A5B2C0]">
              Carefully chosen frameworks, databases, and APIs configured for high throughput, sub-second responses, and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.techStack.map((tech) => {
              const role =
                TECH_ROLES[tech.toLowerCase()] || "Core Production Infrastructure";
              return (
                <div
                  key={tech}
                  className="p-4 sm:p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#070D14] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-[#00D6A0]/40 transition-colors">
                    <TechIcon name={tech} size={20} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="text-sm font-mono font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors capitalize truncate">
                      {tech}
                    </div>
                    <div className="text-xs text-[#A5B2C0] leading-snug">
                      {role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 6: KEY PROJECT FEATURES (EDITORIAL HIGHLIGHTS & ROWS)      */}
        {/* ================================================================== */}
        <section className="space-y-6 pt-8 border-t border-white/[0.08]">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>ENGINEERING SOLUTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Key Project Features
            </h2>
            <p className="text-sm text-[#A5B2C0]">
              Architectural decisions and user experience breakthroughs engineered specifically for this product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {project.features.map((feature, idx) => {
              const IconComponent = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-2.5 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00D6A0]/10 border border-[#00D6A0]/30 text-[#00D6A0] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A5B2C0] leading-relaxed pl-11">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 7: DEVELOPMENT PROCESS (EXECUTION ROADMAP)                 */}
        {/* ================================================================== */}
        <section className="space-y-6 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
                <span>EXECUTION ROADMAP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
                Development Process
              </h2>
            </div>
            <div className="text-xs font-mono text-[#00D6A0] bg-[#0C1721] px-3.5 py-1.5 rounded-full border border-[#00D6A0]/30 w-fit">
              Completed in {project.duration} ({project.sprints} Sprints)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.processSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#00D6A0]">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-[#A5B2C0]/70 uppercase tracking-wider">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F5F8FA] leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-[#A5B2C0] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 8: PREV / NEXT PROJECT DIRECTIONAL NAVIGATION              */}
        {/* ================================================================== */}
        <div className="pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.id}`}
            className="group p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#070D14] flex items-center justify-center text-[#A5B2C0] group-hover:text-[#00D6A0] transition-colors shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase text-[#A5B2C0]/70">
                  Previous Project
                </div>
                <div className="text-sm font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors truncate">
                  {prevProject.title}
                </div>
              </div>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="group p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-center justify-between"
          >
            <div className="min-w-0 text-left sm:text-right">
              <div className="text-[10px] font-mono uppercase text-[#A5B2C0]/70">
                Next Project
              </div>
              <div className="text-sm font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors truncate">
                {nextProject.title}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#00D6A0]/10 text-[#00D6A0] flex items-center justify-center group-hover:bg-[#00D6A0] group-hover:text-[#050A0B] transition-all shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* ================================================================== */}
        {/* SECTION 9: CLOSING CALL TO ACTION                                  */}
        {/* ================================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0C1721] via-[#070D14] to-[#0C1721] border border-[#00D6A0]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase font-bold text-[#00D6A0] tracking-wider">
              Start Your Project
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
              Have a Product Worth Building?
            </h3>
            <p className="text-xs sm:text-sm text-[#A5B2C0] max-w-lg leading-relaxed">
              Let&apos;s turn your next big idea into a reliable, thoughtfully engineered digital experience.
            </p>
          </div>

          <Link
            href="/#contact"
            className="px-6 py-3.5 rounded-full bg-[#00D6A0] hover:bg-[#72E3C0] text-[#050A0B] font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 shadow-lg shadow-[#00D6A0]/25 cursor-pointer"
          >
            <span>Discuss Your Product</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
