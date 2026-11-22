"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  CreditCard,
  CheckCircle2,
  X,
  ExternalLink,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PROJECTS, Project, TechItem } from "@/data/projects";

const FILTER_TABS = [
  { id: "all", label: "All Engineering" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "web-app", label: "Web Applications" },
  { id: "proptech", label: "PropTech" },
  { id: "ai", label: "AI & Automation" },
];

/* -------------------------------------------------------------------------- */
/* PROJECT CARD WITH 3D DEPTH, TOP IMAGE (55-65%), TECH ICONS & HOVER ACCENT  */
/* -------------------------------------------------------------------------- */
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (p: Project) => void;
}

const ProjectCardItem = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCardItem(
  { project, index, onOpenModal },
  ref
) {
  const cardRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  // Subtle 3D perspective mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    damping: 25,
    stiffness: 220,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    damping: 25,
    stiffness: 220,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-3xl bg-[#0D1927]/90 border border-white/[0.09] hover:border-[#00C995]/50 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_-10px_rgba(0,201,149,0.18)] transition-all duration-400 p-5 sm:p-6 flex flex-col justify-between overflow-hidden cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      {/* Background radial gradient shift on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1728]/40 via-transparent to-[#05090C]/80 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#00C995]/[0.06] group-hover:bg-[#00C995]/[0.14] blur-[80px] transition-all pointer-events-none" />

      {/* 1. Large Project Cover Image (55-65% visual weight) */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-white/[0.08] bg-[#080F18] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1927]/90 via-[#0D1927]/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#05090C]/80 backdrop-blur-md border border-white/[0.12] text-[10px] font-mono uppercase font-bold text-[#00E5A0]">
            {project.categoryLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#05090C]/80 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-[#A7B5C5]">
            {project.deliveryDays}
          </span>
        </div>

        {/* View Case Study quick trigger */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#05090C]/85 border border-[#00C995]/40 text-[#00E5A0] text-[11px] font-mono font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg">
          <span>Explore Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2. Project Information Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Client Brand Indicator */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00C995] font-semibold">
              {project.client}
            </span>
            <span className="text-[10px] font-mono text-[#A7B5C5]/70">
              {project.highlights.uptime} UPTIME
            </span>
          </div>

          {/* Project Title */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#00E5A0] transition-colors">
              {project.title}
            </h3>

            {/* Smooth Arrow Interaction */}
            <div className="w-9 h-9 rounded-xl bg-white/[0.06] group-hover:bg-[#00C995] group-hover:text-[#05090C] text-white flex items-center justify-center shrink-0 border border-white/[0.08] group-hover:border-[#00C995] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-[#A7B5C5] leading-relaxed line-clamp-2">
            {project.description.lead} {project.description.highlight} {project.description.tail}
          </p>
        </div>

        {/* 3. Technology Icons & Metric Indicator at Bottom */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          {/* Tech Stack Pods */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.technologies.slice(0, 4).map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  title={tech.name}
                  className="px-2.5 py-1 rounded-lg bg-[#080F18] border border-white/[0.08] flex items-center gap-1.5 text-white/90 text-xs font-mono hover:border-[#00C995]/50 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[#00C995]" />
                  <span className="text-[11px] text-slate-300 font-medium">{tech.name}</span>
                </div>
              );
            })}
          </div>

          {/* Milestone Status Pill */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#00E5A0] shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C995]" />
            <span>{project.metrics.value}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------------------------------------------------- */
/* CASE STUDY MODAL LIGHTBOX                                                  */
/* -------------------------------------------------------------------------- */
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#080F18] border border-white/[0.12] shadow-2xl p-6 sm:p-8 text-white space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center transition-colors border border-white/[0.1] z-20 cursor-pointer"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-12">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0B1728] border border-[#00C995]/40 text-[#00E5A0] text-xs font-mono font-bold uppercase">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-[#A7B5C5]">
              // Client: {project.client}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Image Banner */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/[0.1]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080F18] via-transparent to-transparent" />
        </div>

        {/* Narrative & Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00C995] font-bold">
              Engineering Architecture & Solution
            </h4>
            <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
              {project.description.lead}{" "}
              <strong className="text-white font-semibold">
                {project.description.highlight}
              </strong>{" "}
              {project.description.tail}
            </p>

            {/* Client Quote if available */}
            {project.clientQuote && (
              <blockquote className="p-4 rounded-xl bg-[#0B1728]/70 border-l-2 border-[#00C995] text-xs sm:text-sm text-slate-300 italic">
                &ldquo;{project.clientQuote.text}&rdquo;
                <div className="mt-2 text-xs font-mono not-italic text-[#00E5A0]">
                  — {project.clientQuote.author}, {project.clientQuote.role}
                </div>
              </blockquote>
            )}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1927] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#00C995]" />
              <span>Verified Metrics</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#A7B5C5]">Delivery Time</span>
                <span className="font-mono text-white">{project.deliveryDays}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#A7B5C5]">Speed Score</span>
                <span className="font-mono text-[#00E5A0]">{project.highlights.speedScore}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.06]">
                <span className="text-[#A7B5C5]">Load Latency</span>
                <span className="font-mono text-white">{project.highlights.loadTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#A7B5C5]">System SLA</span>
                <span className="font-mono text-white">{project.highlights.uptime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Deliverables */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#00C995] font-bold">
            Implementation Methodology ({project.processPhases.length} Phases)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.processPhases.map((phase, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#05090C] border border-white/[0.06] text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[#00E5A0] font-mono text-[11px]">
                  <span>{phase.phase}</span>
                  <span className="text-slate-400">{phase.days}</span>
                </div>
                <div className="font-semibold text-white">{phase.title}</div>
                <p className="text-[11px] text-[#A7B5C5] line-clamp-2">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer with Direct Page Link */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#A7B5C5]">
            Verified Grandeur Net Production Deployment
          </div>
          <Link
            href={`/projects/${project.id}`}
            className="px-5 py-2.5 rounded-xl bg-[#00C995] hover:bg-[#00E5A0] text-[#05090C] font-bold text-xs font-mono uppercase flex items-center gap-2 transition-colors"
          >
            <span>View Dedicated Case Study</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SECTION EXPORT                                                        */
/* -------------------------------------------------------------------------- */
export default function SelectedProjects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-[#05090C] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading & Supporting Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1728] border border-[#00C995]/30 text-[#00E5A0] text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#00C995]" />
              <span>// SELECTED PORTFOLIO WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Selected Work.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C995] to-[#00E5A0]">
                Real Impact.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
              Explore digital experiences, intelligent platforms and scalable systems engineered to solve real business challenges.
            </p>
          </div>

          {/* Filter Categories Bar */}
          <div className="flex items-center gap-1.5 flex-wrap p-1.5 rounded-2xl bg-[#080F18] border border-white/[0.08]">
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#00C995] text-[#05090C] font-bold shadow-md shadow-[#00C995]/20"
                      : "text-[#A7B5C5] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid (2-column layout with generous card breathing room) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                index={index}
                onOpenModal={setSelectedModalProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Lightbox */}
        <AnimatePresence>
          {selectedModalProject && (
            <CaseStudyModal
              project={selectedModalProject}
              onClose={() => setSelectedModalProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
