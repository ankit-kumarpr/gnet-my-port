"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Database,
  Globe,
  Sparkles,
  CreditCard,
  Server,
  Zap,
  Terminal,
  Activity,
  Code2,
  Calendar,
  Check,
  ChevronRight,
  X,
  Maximize2,
  ShieldCheck,
} from "lucide-react";
import {
  PROJECTS,
  Project,
  TechItem,
  MilestoneItem,
  ProcessPhase,
} from "@/data/projects";

// Re-export for any consumers
export { PROJECTS };
export type { Project, TechItem, MilestoneItem, ProcessPhase };

const CATEGORIES = [
  { id: "all", label: "All Projects", icon: Sparkles, count: 6 },
  { id: "ecommerce", label: "E-Commerce", icon: CreditCard, count: 2 },
  { id: "web-app", label: "Web Applications", icon: Globe, count: 2 },
  { id: "proptech", label: "PropTech", icon: Layers, count: 1 },
  { id: "ai", label: "AI & Automation", icon: Cpu, count: 1 },
];

/* -------------------------------------------------------------------------- */
/* LUXURY 3D AUTOMOTIVE-STYLE PROJECT CARD WITH BACKGROUND IMAGE & TECH CIRCLE */
/* -------------------------------------------------------------------------- */
function ModernProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showCircularTech, setShowCircularTech] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [activeTechIdx, setActiveTechIdx] = useState(0);

  // Cycle tech icons one by one on display (0.3s transition)
  useEffect(() => {
    if (!project.technologies || project.technologies.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTechIdx((prev) => (prev + 1) % project.technologies.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [project.technologies]);

  const currentTech = project.technologies[activeTechIdx] || project.technologies[0];
  const CurrentTechIcon = currentTech ? currentTech.icon : Cpu;

  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 25,
    stiffness: 250,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 25,
    stiffness: 250,
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

  // Coordinates for radial circular tech nodes
  const radius = 92; // px radius
  const totalTech = project.technologies.length;

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-[32px] bg-gradient-to-b from-[#0c1424] via-[#070d18] to-[#040810] border border-white/[0.12] hover:border-emerald-500/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.08)] hover:shadow-[0_25px_60px_-10px_rgba(16,185,129,0.28)] transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Ambient Emerald Glow Bulb */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP SHOWCASE IMAGE (ABOVE TEXT CONTENT)                           */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-white/10 group/img bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.client} — ${project.title}`}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-all duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Category & Sprints Badges inside top of image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase font-bold text-emerald-400">
            {project.categoryLabel}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-semibold text-slate-300">
            {project.deliveryDays} Sprints
          </span>
        </div>

        {/* Interactive Tech Trigger on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCircularTech(!showCircularTech);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/80 hover:bg-emerald-500 hover:text-brand-dark text-emerald-300 border border-emerald-400/40 backdrop-blur-md text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Show Tech Orbit</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. TEXT CONTENT: CLIENT, TITLE, DESCRIPTION                          */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-col justify-between flex-1 space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            {project.client}
          </span>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
              <Link href={`/projects/${project.id}`}>
                {project.title}
              </Link>
            </h3>

            {/* Direct Link Arrow Button */}
            <Link
              href={`/projects/${project.id}`}
              className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-emerald-500 hover:text-brand-dark text-white flex items-center justify-center shrink-0 border border-white/15 hover:border-emerald-400 transition-all shadow-md group-hover:rotate-45"
              title="Open Project Details"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Formatted Description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span>{project.description.lead} </span>
            <span className="font-semibold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              {project.description.highlight}
            </span>
            <span> {project.description.tail}</span>
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. TECH DISPLAYED ONE-BY-ONE (NO NAMES, SMALL ICONS ONLY)          */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
              Tech:
            </span>

            {/* Cybernetic display pod showing small tech icon 1-by-1 with 0.3s transition */}
            <div
              onClick={() => setActiveTechIdx((prev) => (prev + 1) % project.technologies.length)}
              className="relative inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 backdrop-blur-md transition-colors cursor-pointer"
              title={`${currentTech?.name} — Click to switch`}
            >
              {/* Very small icon container */}
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTech?.name || activeTechIdx}
                    initial={{ opacity: 0, y: 6, scale: 0.75 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.75 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-emerald-400 flex items-center justify-center"
                  >
                    <CurrentTechIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mini sequence indicator dots */}
              <div className="flex items-center gap-1">
                {project.technologies.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === activeTechIdx
                        ? "w-3 bg-emerald-400 shadow-[0_0_8px_#10b981]"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 6. ANIMATED RADIAL CIRCULAR TECH CONSTELLATION OVERLAY                */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {showCircularTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCircularTech(false);
              }
            }}
            className="absolute inset-0 z-40 bg-[#040810]/95 backdrop-blur-xl rounded-[32px] flex items-center justify-center p-4 select-none"
          >
            {/* Close Cross Button Top-Right */}
            <button
              onClick={() => setShowCircularTech(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 shadow-md"
              aria-label="Close tech view"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Laser Orbit Track Lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* Outer Orbit Guide Circle */}
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="none"
                stroke="rgba(16, 185, 129, 0.35)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-spin-slow origin-center"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius + 20}
                fill="none"
                stroke="rgba(56, 189, 248, 0.15)"
                strokeWidth="1"
              />

              {/* Laser connecting lines from center hub to each orbiting node */}
              {project.technologies.map((_, idx) => {
                const angle = (idx * 2 * Math.PI) / totalTech - Math.PI / 2;
                return (
                  <line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${Math.cos(angle) * radius}px)`}
                    y2={`calc(50% + ${Math.sin(angle) * radius}px)`}
                    stroke="rgba(16, 185, 129, 0.55)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                );
              })}
            </svg>

            {/* Central Orbital Core Hub */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={() => setShowCircularTech(false)}
              className="relative z-20 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-brand-dark flex flex-col items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.9)] cursor-pointer group"
              title="Click to minimize"
            >
              <span className="text-[9px] font-mono uppercase font-black tracking-wider">
                CORE
              </span>
              <span className="text-sm font-black leading-none">STACK</span>
              <span className="text-[9px] font-mono text-emerald-950 font-bold mt-0.5">
                {totalTech} APIS
              </span>
            </motion.div>

            {/* Orbiting Radial Tech Nodes */}
            {project.technologies.map((tech, idx) => {
              const angle = (idx * 2 * Math.PI) / totalTech - Math.PI / 2;
              const posX = Math.cos(angle) * radius;
              const posY = Math.sin(angle) * radius;
              const Icon = tech.icon;
              const isSelected = selectedTech?.name === tech.name;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    x: posX,
                    y: posY,
                  }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  className="absolute z-30"
                  style={{
                    left: "calc(50% - 22px)",
                    top: "calc(50% - 22px)",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTech(isSelected ? null : tech);
                    }}
                    onMouseEnter={() => setSelectedTech(tech)}
                    className={`relative w-11 h-11 rounded-full bg-slate-900 border-2 transition-all duration-200 flex items-center justify-center shadow-lg group cursor-pointer ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-500 text-brand-dark scale-115 shadow-[0_0_25px_rgba(16,185,129,1)]"
                        : "border-emerald-500/60 text-white hover:border-emerald-400 hover:scale-110 shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                    }`}
                    aria-label={tech.name}
                  >
                    <Icon className="w-5 h-5" />

                    {/* Pulsing Aura Ring */}
                    <span className="absolute -inset-1 rounded-full border border-emerald-400/40 animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Node Label Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-12 whitespace-nowrap pointer-events-none z-40">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/95 text-white border border-emerald-500/50 font-mono text-[10px] font-bold shadow-xl">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom Floating Info Pill for Selected Node */}
            <div className="absolute bottom-4 left-6 right-6 z-40 text-center pointer-events-none">
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900/95 text-emerald-300 border border-emerald-500/50 font-mono text-xs font-semibold backdrop-blur-md shadow-xl">
                {selectedTech
                  ? `${selectedTech.name} — ${selectedTech.detail}`
                  : "Tap any orbiting circle to inspect architecture"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN FEATURED PROJECTS SECTION COMPONENT                                   */
/* -------------------------------------------------------------------------- */
export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 md:px-12 bg-brand-dark relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/3 right-0 w-[650px] h-[650px] bg-brand-green/[0.06] rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-brand-navy/60 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Kinetic Typography */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full badge-gradient border border-brand-green/30 text-xs font-mono tracking-widest uppercase text-brand-green font-semibold shadow-[0_0_25px_rgba(16,185,129,0.25)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-green animate-radar" />
            <span>SELECTED WORK & CASE STUDIES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.12]"
          >
            <span className="inline-block transition-transform duration-300 hover:scale-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Architected for
            </span>{" "}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-300 to-cyan-300 drop-shadow-[0_0_40px_rgba(16,185,129,0.55)] text-shimmer font-black transition-transform duration-300 hover:scale-[1.02]">
              Conversion & Market Dominance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
          >
            Explore our battle-tested flagship deployments. Real-world platforms built for sub-second speeds, high concurrent loads, and audited commercial revenue.
          </motion.p>

          {/* SINGLE-LINE FILTER CAPSULE */}
          <div className="w-full max-w-full overflow-x-auto py-3 scrollbar-none flex justify-center mt-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex flex-nowrap items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-brand-surface/90 border border-brand-green/30 backdrop-blur-xl shadow-2xl shrink-0"
            >
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-brand-dark font-black"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-green to-brand-green-light shadow-lg shadow-brand-green/30"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{cat.label}</span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-brand-dark/20 text-brand-dark font-bold"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* PROJECTS GRID: 2 COLUMNS ON DESKTOP */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ModernProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM METRICS CALLOUT STRIP */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-navy/90 via-[#071320] to-brand-navy/90 border border-brand-green/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-white font-bold text-lg flex items-center justify-center md:justify-start gap-2">
              <span>Ready for Similar High-Conversion Architecture?</span>
              <span className="w-2 h-2 rounded-full bg-brand-green animate-radar" />
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              We engineer and ship full-scale digital products in 2–4 week battle-tested sprints.
            </p>
          </div>

          <Link
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-brand-green hover:bg-brand-green-light text-brand-dark font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shrink-0 flex items-center gap-2 shadow-lg shadow-brand-green/25"
          >
            <span>Start Your Build</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
