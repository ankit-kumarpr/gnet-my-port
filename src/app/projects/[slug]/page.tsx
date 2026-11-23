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
} from "lucide-react";
import { PROJECTS, getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import TechIcon from "@/components/TechIcon";

// Pre-render static paths for all projects
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

// Dynamic SEO metadata
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found — Grandeur Net",
    };
  }

  return {
    title: `${project.title} — Case Study | Grandeur Net`,
    description: `${project.shortDescription} Estimated cost: ${project.estimatedCost}, Timeline: ${project.duration}.`,
    openGraph: {
      title: `${project.title} | Grandeur Net Case Study`,
      description: project.shortDescription,
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Prev / Next Project Navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-[#050A0B] text-[#F5F8FA] selection:bg-[#00D6A0] selection:text-[#050A0B]">
      {/* Top Ambient Light Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-15"
        style={{ backgroundColor: project.accentColor || "#00D6A0" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24 space-y-16 sm:space-y-20">
        {/* ------------------------------------------------------------------ */}
        {/* SECTION A: BREADCRUMB & HERO                                       */}
        {/* ------------------------------------------------------------------ */}
        <div className="space-y-8">
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

          {/* Project Title & Lead Summary */}
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#0C1721] border border-[#00D6A0]/40 text-[#00D6A0] text-xs font-mono font-medium">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono text-[#A5B2C0]">
                Client: {project.client}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F5F8FA] tracking-tight leading-[1.1]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-[#A5B2C0] leading-relaxed pt-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Primary High-Resolution Preview Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0C1721] border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} Showcase`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A0B]/60 via-transparent to-transparent pointer-events-none" />

            {/* Live Link Button Overlay if available */}
            {project.liveUrl && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#050A0B]/85 hover:bg-[#050A0B] border border-white/[0.15] hover:border-[#00D6A0]/60 text-[#F5F8FA] hover:text-[#00D6A0] text-xs font-mono font-medium backdrop-blur-md flex items-center gap-2 transition-all shadow-lg"
                >
                  <span>Visit Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION B & F: PROJECT OVERVIEW, ESTIMATED COST & TIMELINE         */}
        {/* ------------------------------------------------------------------ */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-white/[0.08]">
          {/* Narrative Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>PROJECT OVERVIEW</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Engineering Context & Solution
            </h2>

            <p className="text-sm sm:text-base text-[#A5B2C0] leading-relaxed">
              {project.overview}
            </p>

            <div className="p-4 rounded-xl bg-[#0C1721] border border-white/[0.06] text-sm text-[#A5B2C0] leading-relaxed">
              <span className="text-[#F5F8FA] font-medium">Core Objective: </span>
              {project.description.lead}{" "}
              <strong className="text-[#00D6A0] font-semibold">
                {project.description.highlight}
              </strong>{" "}
              {project.description.tail}
            </div>
          </div>

          {/* Project Cost & Timeline Metadata Box */}
          <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] p-6 space-y-5 h-fit shadow-md">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A5B2C0] font-bold pb-2 border-b border-white/[0.08]">
              Project Specifications
            </h3>

            {/* Estimated Cost */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A5B2C0]">
                <CreditCard className="w-3.5 h-3.5 text-[#00D6A0]" />
                <span>Estimated Cost</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#F5F8FA] tracking-tight">
                {project.estimatedCost}
              </div>
              <div className="text-[11px] font-mono text-[#A5B2C0]/70">
                Transparent milestone-based billing
              </div>
            </div>

            {/* Timeline / Duration */}
            <div className="space-y-1 pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A5B2C0]">
                <Clock className="w-3.5 h-3.5 text-[#00D6A0]" />
                <span>Timeline & Sprints</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#00D6A0]">
                {project.duration}
              </div>
              <div className="text-[11px] font-mono text-[#A5B2C0]/70">
                Shipped across {project.sprints} focused sprints
              </div>
            </div>

            {/* Client / Organization */}
            <div className="space-y-1 pt-3 border-t border-white/[0.06]">
              <div className="text-xs font-mono text-[#A5B2C0]">Industry / Type</div>
              <div className="text-sm font-semibold text-[#F5F8FA]">
                {project.projectType}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION C: TECHNOLOGIES USED                                       */}
        {/* ------------------------------------------------------------------ */}
        <section className="space-y-6 pt-4 border-t border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>STACK & TOOLS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Technologies Used
            </h2>
            <p className="text-sm text-[#A5B2C0]">
              Carefully chosen frameworks, databases, and APIs configured for high throughput, sub-second responses, and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className="p-4 rounded-xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#070D14] border border-white/[0.06] flex items-center justify-center shrink-0">
                  <TechIcon name={tech} size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors capitalize truncate">
                    {tech}
                  </div>
                  <div className="text-[10px] font-mono text-[#A5B2C0]/70 truncate">
                    Production Stack
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION D: PROJECT FEATURES & ARCHITECTURAL SOLUTIONS              */}
        {/* ------------------------------------------------------------------ */}
        <section className="space-y-6 pt-4 border-t border-white/[0.08]">
          <div className="space-y-2">
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
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-2 group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-[#00D6A0]/10 text-[#00D6A0] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A5B2C0] leading-relaxed pl-8.5">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION E: 4-STEP DEVELOPMENT PROCESS                              */}
        {/* ------------------------------------------------------------------ */}
        <section className="space-y-6 pt-4 border-t border-white/[0.08]">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
              <span>EXECUTION ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
              Development Process
            </h2>
            <p className="text-sm text-[#A5B2C0]">
              From technical discovery to global production cutover, every sprint follows a structured milestone delivery model.
            </p>
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

        {/* ------------------------------------------------------------------ */}
        {/* SECTION G: PREV / NEXT PROJECT NAVIGATION                          */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.id}`}
            className="group p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#070D14] flex items-center justify-center text-[#A5B2C0] group-hover:text-[#00D6A0] transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#A5B2C0]/70">
                  Previous Project
                </div>
                <div className="text-sm font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors">
                  {prevProject.title}
                </div>
              </div>
            </div>
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="group p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-center justify-between"
          >
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-[#A5B2C0]/70">
                Next Project
              </div>
              <div className="text-sm font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors">
                {nextProject.title}
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#00D6A0]/10 text-[#00D6A0] flex items-center justify-center group-hover:bg-[#00D6A0] group-hover:text-[#050A0B] transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* FINAL CALL TO ACTION                                               */}
        {/* ------------------------------------------------------------------ */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0C1721] via-[#070D14] to-[#0C1721] border border-[#00D6A0]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase font-bold text-[#00D6A0]">
              Start Your Project
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA]">
              Ready to Build Something Remarkable?
            </h3>
            <p className="text-xs sm:text-sm text-[#A5B2C0] max-w-lg">
              Let&apos;s evaluate your requirements, design an actionable roadmap, and deploy your product in focused sprints.
            </p>
          </div>

          <Link
            href="/#contact"
            className="px-6 py-3.5 rounded-full bg-[#00D6A0] hover:bg-[#72E3C0] text-[#050A0B] font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 shadow-lg shadow-[#00D6A0]/20"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
