import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Clock,
  Activity,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Quote,
  Milestone,
  Check,
  Server,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { PROJECTS, getProjectBySlug, getAllProjectSlugs, Project } from "@/data/projects";
import ProjectMockupImage from "@/components/ProjectMockupImage";
import ProjectDetailClient from "./ProjectDetailClient";

// Pre-render static params for all project slugs
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
    description: `${project.description.lead} ${project.description.highlight} ${project.description.tail}. Shipped in ${project.deliveryDays} by Grandeur Net.`,
    openGraph: {
      title: `${project.title} | Grandeur Net Case Study`,
      description: `Complete technical process and delivery roadmap for ${project.client}.`,
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

  // Find next project for seamless sequential navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-green selection:text-brand-dark">
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-24">
        {/* TOP NAVIGATION BREADCRUMB */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-brand-green transition-colors bg-white/[0.04] px-4 py-2 rounded-full border border-white/[0.08] hover:border-brand-green/40 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Case Study</span>
            <span className="text-slate-600">/</span>
            <span className="text-brand-green font-bold">{project.client}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Index {currentIndex + 1} of {PROJECTS.length}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy border border-brand-green/40 text-brand-green font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-radar" />
              <span>{project.client}</span>
            </div>

            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300 font-mono text-xs">
              {project.categoryLabel}
            </span>

            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              {project.deliveryDays} Sprints ({project.sprints} Sprints)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl">
            {project.title}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            <span>{project.description.lead} </span>
            <span className="text-brand-green font-bold">
              {project.description.highlight}
            </span>
            <span> {project.description.tail}</span>
          </p>

          {/* TELEMETRY METRIC PILLS */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase text-slate-400">Lighthouse Score</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{project.highlights.speedScore}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Mobile Core Vitals</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase text-slate-400">Load Latency</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{project.highlights.loadTime}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Edge CDN Delivery</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase text-slate-400">Uptime SLA</div>
              <div className="text-2xl font-black text-brand-green mt-1">{project.highlights.uptime}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Zero Incident Rate</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] font-mono uppercase text-slate-400">Key Business KPI</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1 truncate">{project.metrics.value}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">{project.metrics.label}</div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CLIENT WRAPPER WITH RADIAL TECH CONSTELLATION & TABS */}
        <ProjectDetailClient slug={params.slug} />

        {/* SEQUENTIAL NEXT / PREV PROJECT FOOTER */}
        <div className="mt-20 pt-12 border-t border-white/[0.1] grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/projects/${prevProject.id}`}
            className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-brand-green/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-brand-green transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500">Previous Case Study</div>
                <div className="text-base font-bold text-white group-hover:text-brand-green transition-colors">
                  {prevProject.title}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300">
              {prevProject.client}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.id}`}
            className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-brand-green/40 transition-all flex items-center justify-between"
          >
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500">Next Case Study</div>
              <div className="text-base font-bold text-white group-hover:text-brand-green transition-colors">
                {nextProject.title}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300">
                {nextProject.client}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-brand-dark transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* BOTTOM HIGH-CONVERSION CTA */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy via-[#071320] to-brand-navy border-2 border-brand-green/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.2)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-mono uppercase font-bold">
              <span>Ready for Similar Engineering Quality?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Launch Your Product in 2–4 Week Battle-Tested Sprints
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Talk directly with our senior full-stack architects. We audit your technical roadmap, establish sprint timelines, and guarantee on-time deployment.
            </p>
          </div>

          <Link
            href="/#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-green via-brand-green-light to-emerald-400 text-brand-dark font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-green/30 shrink-0 flex items-center gap-2"
          >
            <span>Book Technical Discovery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
