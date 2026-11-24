"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, Project, ProjectCategory } from "@/data/projects";

const CATEGORIES: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "web-app", label: "Web Applications" },
  { id: "saas", label: "Software & SaaS" },
  { id: "proptech", label: "PropTech" },
  { id: "ai", label: "AI & Automation" },
];

/* -------------------------------------------------------------------------- */
/* CINEMATIC EDITORIAL PROJECT ITEM COMPONENT                                 */
/* -------------------------------------------------------------------------- */
interface ProjectItemProps {
  project: Project;
  index: number;
}

function ProjectItem({ project, index }: ProjectItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive pointer-based parallax for the image
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const imageX = useTransform(smoothMouseX, [0, 1], [-6, 6]);
  const imageY = useTransform(smoothMouseY, [0, 1], [-6, 6]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    setMousePos({ x: Math.round(x * 100), y: Math.round(y * 100) });
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full cursor-pointer"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D6A0] rounded-2xl"
      >
        {/* ===================================================================
            1. LARGE EXPANSIVE PROJECT PREVIEW IMAGE CANVAS (DOMINANT VISUAL)
            =================================================================== */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-[16/10] sm:aspect-[16/10.5] rounded-2xl overflow-hidden bg-[#070D14] border border-white/[0.08] group-hover:border-[#00D6A0]/40 transition-colors duration-500 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.85)] group-hover:shadow-[0_25px_50px_-15px_rgba(0,214,160,0.22)]"
        >
          {/* Subtle Pointer-following Spotlight Lighting Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle 260px at ${mousePos.x}% ${mousePos.y}%, rgba(0, 214, 160, 0.16), transparent 75%)`,
            }}
          />

          {/* Parallax Image Wrapper with Smooth 1.00 -> 1.035 Scale */}
          <motion.div
            style={{ x: imageX, y: imageY }}
            className="w-[104%] h-[104%] -ml-[2%] -mt-[2%] relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.035] transition-transform duration-700 ease-[0.16,1,0.3,1]"
              loading="lazy"
            />
          </motion.div>

          {/* Cinematic Dark Gradient Vignette for Depth and Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04080C]/80 via-transparent to-black/15 pointer-events-none z-5" />

          {/* Minimal Editorial Index Badge (Top Right) */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider text-slate-300 bg-[#050A0B]/70 backdrop-blur-md border border-white/[0.12] uppercase">
              {project.categoryLabel || project.category}
            </span>
          </div>
        </div>

        {/* ===================================================================
            2. EDITORIAL TYPOGRAPHY & PROJECT SPECIFICATIONS (NO BOXED CARDS)
            =================================================================== */}
        <div className="pt-5 sm:pt-6 flex-1 flex flex-col justify-between space-y-3.5">
          <div className="space-y-2">
            {/* Client / Project Domain Eyebrow */}
            <div className="text-[11px] font-mono tracking-widest text-[#00D6A0] uppercase font-semibold">
              {project.client}
            </div>

            {/* Project Title: Prominent, Bold, White Typography */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#00D6A0] transition-colors duration-300 leading-snug">
              {project.title}
            </h3>

            {/* Project Description: Clean, Restrained, Non-truncated Line Flow */}
            <p className="text-sm sm:text-[14.5px] text-[#94A3B8] font-normal leading-relaxed line-clamp-3">
              {project.shortDescription}
            </p>
          </div>

          {/* Minimal Explore Project Interaction */}
          <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-white group-hover:text-[#00D6A0] transition-colors duration-300">
            <span>Explore Case Study</span>
            <div className="w-5 h-5 rounded-full bg-white/[0.06] group-hover:bg-[#00D6A0]/15 flex items-center justify-center transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00D6A0] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SELECTED PROJECTS SHOWCASE SECTION (EDITORIAL 3-COLUMN LAYOUT)        */
/* -------------------------------------------------------------------------- */
interface SelectedProjectsProps {
  initialProjects?: Project[];
}

export default function SelectedProjects({
  initialProjects = PROJECTS,
}: SelectedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const projectsToDisplay =
    initialProjects && initialProjects.length > 0 ? initialProjects : PROJECTS;

  const filteredProjects =
    activeCategory === "all"
      ? projectsToDisplay
      : projectsToDisplay.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#04080C] relative overflow-hidden">
      {/* =========================================================================
          ATMOSPHERIC DEEP OBSIDIAN & MIDNIGHT NAVY AMBIENT LIGHTING
          ========================================================================= */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0E2337]/30 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-[500px] h-[500px] bg-[#00D6A0]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle architectural coordinate grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-[0.10]" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 relative z-10">

        {/* =======================================================================
            EDITORIAL SECTION MASTHEAD / HEADING
            ======================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow */}
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00D6A0] flex items-center gap-2.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0] animate-pulse" />
              <span>SELECTED WORK / 2026 ARCHIVE</span>
            </div>

            {/* Main Editorial Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.035em] leading-[1.06]">
              Selected Work.{" "}
              <span className="text-[#00D6A0] drop-shadow-[0_0_30px_rgba(0,214,160,0.35)]">
                Real Impact.
              </span>
            </h2>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-lg lg:text-right">
            Explore thoughtfully engineered digital flagships, high-throughput cloud architectures, and autonomous platforms built for high-growth global enterprises.
          </p>
        </div>

        {/* =======================================================================
            MINIMAL HORIZONTAL CATEGORY FILTER NAVIGATION
            ======================================================================= */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-mono whitespace-nowrap rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#050A0B] bg-[#00D6A0] font-bold shadow-[0_4px_18px_rgba(0,214,160,0.3)]"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =======================================================================
            3-COLUMN EDITORIAL PROJECT SHOWCASE (TABLET: 2-COL, MOBILE: 1-COL)
            ======================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-10 xl:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
