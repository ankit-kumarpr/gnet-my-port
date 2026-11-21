"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  Globe,
  Smartphone,
  TrendingUp,
  Search,
  Video,
  Palette,
  ArrowUpRight,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FloatingService {
  id: string;
  num: string;
  title: string;
  category: string;
  icon: any;
  description: string;
  tags: string[];
  stat: string;
  statLabel: string;
  accentColor: string;
  floatDelay: number;
  floatDuration: number;
  depth: number;
}

const SERVICES: FloatingService[] = [
  {
    id: "web-dev",
    num: "01",
    title: "Web Development",
    category: "Full-Stack & Next.js",
    icon: Globe,
    description:
      "Ultra-fast web platforms, custom headless architecture, and interactive portals engineered for sub-second speeds and maximum conversions.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Node.js"],
    stat: "< 0.8s",
    statLabel: "Load Latency",
    accentColor: "#10b981",
    floatDelay: 0,
    floatDuration: 5.4,
    depth: 1.1,
  },
  {
    id: "app-dev",
    num: "02",
    title: "App Development",
    category: "iOS & Android",
    icon: Smartphone,
    description:
      "Native and cross-platform mobile apps with fluid 60fps animations, offline-first sync, real-time WebSockets, and intuitive touchscreen UX.",
    tags: ["React Native", "Flutter", "Swift", "WebSockets"],
    stat: "60 FPS",
    statLabel: "Fluid UX",
    accentColor: "#2dd4bf",
    floatDelay: 0.6,
    floatDuration: 6.2,
    depth: 0.9,
  },
  {
    id: "digital-marketing",
    num: "03",
    title: "Digital Marketing",
    category: "Performance & Growth",
    icon: TrendingUp,
    description:
      "Revenue-driven paid acquisition, multi-channel funnels, Meta & Google Ads optimization, and customer retention strategies that scale ROI.",
    tags: ["Meta Ads", "Google Ads", "Funnel CRO", "Analytics"],
    stat: "4.2x",
    statLabel: "Average ROAS",
    accentColor: "#34d399",
    floatDelay: 1.2,
    floatDuration: 5.8,
    depth: 1.2,
  },
  {
    id: "seo",
    num: "04",
    title: "SEO Dominance",
    category: "Organic Visibility",
    icon: Search,
    description:
      "Technical search engine optimization, semantic schema markup, Core Web Vitals tuning, and authority link acquisition for search dominance.",
    tags: ["Technical SEO", "Schema Markup", "Core Web Vitals", "Authority"],
    stat: "+240%",
    statLabel: "Organic Growth",
    accentColor: "#38bdf8",
    floatDelay: 0.4,
    floatDuration: 6.6,
    depth: 1.0,
  },
  {
    id: "video-editing",
    num: "05",
    title: "Video Editing & Motion",
    category: "Cinematic Media",
    icon: Video,
    description:
      "High-retention commercial edits, 3D motion graphics, viral short-form social reels, and cinematic brand storytelling that captivate audiences.",
    tags: ["Premiere Pro", "After Effects", "3D Motion", "Sound FX"],
    stat: "4K 60fps",
    statLabel: "Master Quality",
    accentColor: "#a855f7",
    floatDelay: 0.9,
    floatDuration: 5.2,
    depth: 1.15,
  },
  {
    id: "uiux-design",
    num: "06",
    title: "UI/UX & Branding",
    category: "Design Systems",
    icon: Palette,
    description:
      "Award-winning digital interfaces, design tokens, interactive Figma prototypes, and complete visual identity guidelines that elevate brands.",
    tags: ["Figma Systems", "Design Tokens", "Wireframing", "Prototypes"],
    stat: "Top 1%",
    statLabel: "Visual Craft",
    accentColor: "#fbbf24",
    floatDelay: 1.5,
    floatDuration: 6.0,
    depth: 0.85,
  },
];

/* -------------------------------------------------------------------------- */
/* 3D FLOATING SERVICE CARD WITH INTERACTIVE MOUSE TILT PHYSICS                */
/* -------------------------------------------------------------------------- */
function FloatingServiceCard({
  service,
  index,
  stageX,
  stageY,
}: {
  service: FloatingService;
  index: number;
  stageX: any;
  stageY: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Local card hover tilt tracking
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  const localRotateX = useSpring(
    useTransform(localMouseY, [-0.5, 0.5], [10, -10]),
    { damping: 25, stiffness: 260 }
  );
  const localRotateY = useSpring(
    useTransform(localMouseX, [-0.5, 0.5], [-10, 10]),
    { damping: 25, stiffness: 260 }
  );

  // Stage-wide parallax displacement
  const parallaxX = useTransform(stageX, [-0.5, 0.5], [-15 * service.depth, 15 * service.depth]);
  const parallaxY = useTransform(stageY, [-0.5, 0.5], [-15 * service.depth, 15 * service.depth]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    localMouseX.set(x);
    localMouseY.set(y);
  };

  const handleMouseLeave = () => {
    localMouseX.set(0);
    localMouseY.set(0);
    setIsHovered(false);
  };

  const Icon = service.icon;

  return (
    <motion.div
      style={{
        x: parallaxX,
        y: parallaxY,
      }}
      className="relative"
    >
      {/* Gentle Floating Motion Loop */}
      <motion.div
        animate={{
          y: [-7, 7, -7],
          rotate: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: service.floatDuration,
          delay: service.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.article
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: localRotateX,
            rotateY: localRotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative rounded-[28px] bg-gradient-to-b from-[#0c1524]/95 via-[#070e1a]/95 to-[#040812]/95 border border-white/[0.1] hover:border-emerald-400/60 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.06)] hover:shadow-[0_25px_60px_-10px_rgba(16,185,129,0.25)] transition-all duration-300 select-none min-h-[340px]"
        >
          {/* Ambient Color Glow Bulb */}
          <div
            className={`absolute -top-20 -right-20 w-52 h-52 rounded-full blur-[90px] pointer-events-none transition-opacity duration-500 ${
              isHovered ? "opacity-35" : "opacity-10"
            }`}
            style={{ backgroundColor: service.accentColor }}
          />

          {/* Cyber Grid Interior Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none" />

          {/* Floating Laser Border Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/0 group-hover:via-emerald-400/80 to-transparent transition-all duration-500" />

          {/* ------------------------------------------------------------------ */}
          {/* TOP BAR: DISCIPLINE NUMBER, CATEGORY PILL & STAT BADGE             */}
          {/* ------------------------------------------------------------------ */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                  // {service.num}
                </span>
                <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono font-medium text-slate-300">
                  {service.category}
                </span>
              </div>

              {/* High-Performance Stat Pill */}
              <div className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] font-bold text-emerald-300">
                  {service.stat}
                </span>
              </div>
            </div>

            {/* Service Icon & Main Title */}
            <div className="flex items-start gap-4 mb-3">
              <div
                className="w-12 h-12 rounded-2xl bg-black/60 border border-white/15 group-hover:border-emerald-400/60 flex items-center justify-center text-emerald-400 group-hover:scale-108 group-hover:bg-emerald-500 group-hover:text-brand-dark transition-all duration-300 shrink-0 shadow-lg"
                style={{ transform: "translateZ(25px)" }}
              >
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight leading-snug">
                  {service.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                  {service.statLabel}
                </span>
              </div>
            </div>

            {/* Concise Service Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5">
              {service.description}
            </p>
          </div>

          {/* ------------------------------------------------------------------ */}
          {/* BOTTOM ROW: TECH PILLS & DIRECT CONVERSION ARROW BUTTON           */}
          {/* ------------------------------------------------------------------ */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[10px] font-mono group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="#contact"
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-emerald-500 hover:text-brand-dark text-slate-300 hover:text-brand-dark flex items-center justify-center shrink-0 border border-white/10 hover:border-emerald-400 transition-all shadow-md group-hover:rotate-45"
              title={`Inquire about ${service.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.article>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SERVICES SECTION WITH 3D FLOATING STAGE & CURSOR PHYSICS              */
/* -------------------------------------------------------------------------- */
export default function ServicesSection() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Stage-wide cursor tracking for multi-layered depth physics
  const stageMouseX = useMotionValue(0);
  const stageMouseY = useMotionValue(0);

  const smoothStageX = useSpring(stageMouseX, { damping: 30, stiffness: 180 });
  const smoothStageY = useSpring(stageMouseY, { damping: 30, stiffness: 180 });

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stageMouseX.set(x);
    stageMouseY.set(y);
  };

  const handleStageMouseLeave = () => {
    stageMouseX.set(0);
    stageMouseY.set(0);
  };

  return (
    <section
      id="services"
      ref={stageRef}
      onMouseMove={handleStageMouseMove}
      onMouseLeave={handleStageMouseLeave}
      className="py-24 sm:py-28 px-4 sm:px-6 md:px-12 bg-brand-surface relative overflow-hidden select-none"
    >
      {/* Cosmic Floating Background Ambience */}
      <div className="absolute top-10 left-1/4 w-[650px] h-[650px] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-1/4 w-[550px] h-[550px] bg-brand-navy/70 rounded-full blur-[150px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Compact, High-Impact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeader
            badge="Services & Core Capabilities"
            title="Interactive Engineering &"
            highlightedText="Digital Growth Systems"
            description="High-velocity product execution across web, mobile, search, performance marketing, and cinematic media."
          />

          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-navy/90 border border-emerald-500/40 hover:border-emerald-400 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-all shadow-md group shrink-0"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3D Floating Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES.map((service, index) => (
            <FloatingServiceCard
              key={service.id}
              service={service}
              index={index}
              stageX={smoothStageX}
              stageY={smoothStageY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
