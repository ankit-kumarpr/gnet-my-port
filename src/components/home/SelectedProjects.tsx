"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
/* STREAMLINED 3-COLUMN MINIMAL PROJECT CARD                                  */
/* -------------------------------------------------------------------------- */
const ProjectCard = forwardRef<HTMLDivElement, { project: Project; index: number }>(
  ({ project, index }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
        className="h-full"
      >
      <Link
        href={`/projects/${project.id}`}
        className="group flex flex-col h-full rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 p-4 sm:p-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_40px_-15px_rgba(0,214,160,0.18)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        {/* 1. Project Image at the top (16:10 aspect ratio) */}
        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#070D14] border border-white/[0.06] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1721]/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2. Project Name, 3. Short Description, 4. Explore Project Link */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors leading-snug">
              {project.title}
            </h3>

            <p className="text-sm text-[#A5B2C0] leading-relaxed line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-medium text-[#00D6A0] group-hover:text-[#72E3C0] transition-colors">
            <span>Explore Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

/* -------------------------------------------------------------------------- */
/* MAIN SELECTED PROJECTS SECTION (3-COLUMN BALANCED GRID)                    */
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
    <section id="projects" className="py-20 md:py-28 px-6 md:px-12 bg-[#050A0B] relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header: Eyebrow, Heading, Description */}
        <div className="space-y-3.5 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>SELECTED WORK / 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F5F8FA] tracking-tight leading-tight">
            Selected Work.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D6A0] to-[#72E3C0]">
              Real Impact.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#A5B2C0] leading-relaxed">
            Explore thoughtfully engineered digital experiences, scalable platforms and creative solutions built to solve real business challenges.
          </p>
        </div>

        {/* Minimal Horizontal Filter Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 border-b border-white/[0.06]">
          {CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 py-2 text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
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

        {/* Balanced 3-Column Desktop, 2-Column Tablet, 1-Column Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
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
