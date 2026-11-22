"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, X, ExternalLink, Sparkles } from "lucide-react";
import { PROJECTS, Project, ProjectCategory } from "@/data/projects";
import TechIcon from "@/components/TechIcon";

const CATEGORIES: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "web-app", label: "Web Applications" },
  { id: "saas", label: "Software & SaaS" },
  { id: "proptech", label: "PropTech" },
  { id: "ai", label: "AI & Automation" },
];

/* -------------------------------------------------------------------------- */
/* COMPACT 4-COLUMN PROJECT CARD WITH CLEAN MINIMAL DESIGN                    */
/* -------------------------------------------------------------------------- */
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (p: Project) => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(function ProjectCard(
  { project, index, onOpenModal },
  ref
) {
  const cardRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

  // Subtle 3D perspective tilt (disabled on mobile / touch)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 30,
    stiffness: 260,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    damping: 30,
    stiffness: 260,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onClick={() => onOpenModal(project)}
      className="group relative flex flex-col justify-between rounded-[18px] bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 p-3.5 sm:p-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_16px_36px_-10px_rgba(0,214,160,0.18)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none overflow-hidden"
    >
      {/* 1. Project Image at the TOP (consistent 16:10 aspect ratio) */}
      <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden mb-3.5 bg-[#070D14] border border-white/[0.06] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1721]/60 via-transparent to-transparent pointer-events-none" />

        {/* Subtle quick-view badge on hover */}
        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#050A0B]/85 border border-[#00D6A0]/40 text-[#72E3C0] text-[10px] font-mono backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
          <span>Explore</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      {/* 2. Project Title & 3. Short Description */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors leading-snug line-clamp-1">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#A5B2C0] group-hover:text-[#00D6A0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </div>

          <p className="mt-1.5 text-[13px] text-[#A5B2C0] leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* 4. Technology Brand Icons at the Bottom (3–5 small icons) */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.techStack.slice(0, 5).map((tech, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-lg bg-[#070D14] border border-white/[0.06] flex items-center justify-center hover:border-[#00D6A0]/40 transition-colors"
                title={tech}
              >
                <TechIcon name={tech} size={15} />
              </div>
            ))}
          </div>

          <span className="text-[10px] font-mono text-[#A5B2C0]/70 uppercase tracking-wider">
            {project.categoryLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------------------------------------------------- */
/* REFINED LIGHTBOX MODAL (PRESERVES CASE STUDY DEEP-DIVE CAPABILITY)         */
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
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0C1721] border border-white/[0.12] shadow-2xl p-6 sm:p-8 text-[#F5F8FA] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] flex items-center justify-center transition-colors border border-white/[0.08] z-20 cursor-pointer"
          aria-label="Close Case Study"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#070D14] border border-[#00D6A0]/40 text-[#00D6A0] text-[11px] font-mono uppercase font-semibold">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-[#A5B2C0]">
              // Client: {project.client}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight">
            {project.title}
          </h2>
        </div>

        {/* Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.08] bg-[#070D14]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project Description & Architecture */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            Engineering Overview
          </h4>
          <p className="text-sm text-[#A5B2C0] leading-relaxed">
            {project.description.lead}{" "}
            <strong className="text-[#F5F8FA] font-semibold">
              {project.description.highlight}
            </strong>{" "}
            {project.description.tail}
          </p>
        </div>

        {/* Technology Stack Icons */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#00D6A0] font-bold">
            Core Technologies
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            {project.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#070D14] border border-white/[0.08] flex items-center gap-2 text-xs font-mono text-[#F5F8FA]"
              >
                <TechIcon name={tech} size={16} />
                <span className="capitalize">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer with Dedicated Case Study Link */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#A5B2C0]">
            Grandeur Net Engineering Portfolio
          </span>
          <Link
            href={`/projects/${project.id}`}
            className="px-4 py-2 rounded-xl bg-[#00D6A0] hover:bg-[#72E3C0] text-[#050A0B] font-bold text-xs font-mono uppercase flex items-center gap-2 transition-colors"
          >
            <span>Full Case Study</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SELECTED PROJECTS SECTION                                             */
/* -------------------------------------------------------------------------- */
export default function SelectedProjects() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-24 px-6 md:px-12 bg-[#050A0B] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header: Eyebrow, Heading, Description */}
        <div className="space-y-3.5 max-w-2xl">
          {/* Eyebrow */}
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>SELECTED WORK / 2026</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F8FA] tracking-tight leading-tight">
            Selected Work.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D6A0] to-[#72E3C0]">
              Real Impact.
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#A5B2C0] leading-relaxed">
            Explore thoughtfully engineered digital experiences, scalable platforms and creative solutions built to solve real business challenges.
          </p>
        </div>

        {/* Clean Minimal Horizontal Filter Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 border-b border-white/[0.06]">
          {CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-3.5 py-2 text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#00D6A0] font-bold"
                    : "text-[#A5B2C0] hover:text-[#F5F8FA]"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute bottom-0 inset-x-2 h-[2px] bg-[#00D6A0]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Compact Balanced 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
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
