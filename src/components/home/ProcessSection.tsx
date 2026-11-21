"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import {
  Compass,
  Layers,
  Terminal,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Code2,
  Sparkles,
  Milestone,
  Check,
  Activity,
  Zap,
  Cpu,
  Server,
  Globe,
  Gauge,
  Lock,
  Boxes,
  Workflow,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface StepDetail {
  number: string;
  stage: string;
  title: string;
  tagline: string;
  timeline: string;
  durationLabel: string;
  description: {
    lead: string;
    highlight: string;
    tail: string;
  };
  icon: any;
  progressPercent: number;
  cadence: string[];
  kpi: {
    label: string;
    value: string;
    sub: string;
  };
  deliverables: string[];
  qualityGate: string;
  accent: string;
  visualType: "blueprint" | "prototype" | "microservices" | "edge";
}

const STEPS: StepDetail[] = [
  {
    number: "01",
    stage: "STAGE 01",
    title: "Discovery & Unit Economics",
    tagline: "Architecture Modeling & Scope Lock",
    timeline: "Week 1",
    durationLabel: "7-Day Sprint",
    description: {
      lead: "We unpack your business revenue model, friction points, and competitor blindspots to",
      highlight: "define a high-conversion system architecture",
      tail: "with zero technical debt from day one.",
    },
    icon: Compass,
    progressPercent: 100,
    cadence: [
      "Days 01–02: Revenue & Friction Audit",
      "Days 03–05: PostgreSQL Schema & API Design",
      "Days 06–07: Scope Lock & Cost Guarantee",
    ],
    kpi: {
      label: "Architecture Lock",
      value: "100%",
      sub: "Zero Unplanned Scope Creep",
    },
    deliverables: [
      "Distributed data flow & schema locking diagrams",
      "PostgreSQL schema & REST/GraphQL API specs",
    ],
    qualityGate: "100% Architecture & Data Schema Lock",
    accent: "#10b981",
    visualType: "blueprint",
  },
  {
    number: "02",
    stage: "STAGE 02",
    title: "High-Fidelity Interactive Prototype",
    tagline: "Pixel-Perfect UX & Motion Systems",
    timeline: "Weeks 2 - 3",
    durationLabel: "14-Day Sprint",
    description: {
      lead: "Every screen, state transition, and tactile micro-interaction is mapped in Figma with",
      highlight: "pixel precision & 60fps motion specs",
      tail: "before a single line of production code is written.",
    },
    icon: Layers,
    progressPercent: 100,
    cadence: [
      "Days 08–12: Design Tokens & Mobile-First Wireframes",
      "Days 13–17: 60fps Micro-Interactions & Figma Prototype",
      "Days 18–21: Executive Review & Usability Sign-Off",
    ],
    kpi: {
      label: "Fidelity Benchmark",
      value: "60 FPS",
      sub: "Tactile Native Fluidity",
    },
    deliverables: [
      "Bespoke design system & responsive mobile UX",
      "60fps interactive Framer Motion prototype",
    ],
    qualityGate: "100% Client Visual Design & UX Approval",
    accent: "#38bdf8",
    visualType: "prototype",
  },
  {
    number: "03",
    stage: "STAGE 03",
    title: "Full-Stack Production Engineering",
    tagline: "High-Throughput Modular Microservices",
    timeline: "Weeks 4 - 6",
    durationLabel: "21-Day Sprint",
    description: {
      lead: "Engineered with Next.js 15, TypeScript, and clean modular APIs with automated test suites,",
      highlight: "strict type guarantees, and sub-100ms response targets",
      tail: "under peak concurrent load.",
    },
    icon: Terminal,
    progressPercent: 100,
    cadence: [
      "Days 22–28: Next.js 15 App Router & Server Actions",
      "Days 29–35: Redis Distributed Cache & Payment Webhooks",
      "Days 36–42: Automated End-to-End Stress Testing",
    ],
    kpi: {
      label: "API P95 Latency",
      value: "< 85ms",
      sub: "Sub-100ms Edge Response",
    },
    deliverables: [
      "Next.js 15 App Router & modular microservices",
      "Redis caching layer & payment webhook engines",
    ],
    qualityGate: "100% Automated CI/CD & Unit Tests Passing",
    accent: "#a855f7",
    visualType: "microservices",
  },
  {
    number: "04",
    stage: "STAGE 04",
    title: "Zero-Downtime Rollout & Scale",
    tagline: "Global Edge CDN & Production SLA",
    timeline: "Launch & Beyond",
    durationLabel: "Continuous Deploy",
    description: {
      lead: "Global Edge CDN delivery, automated backups, zero-downtime rolling deploys, and",
      highlight: "continuous conversion rate optimization (CRO)",
      tail: "with 99.98% uptime monitoring.",
    },
    icon: Rocket,
    progressPercent: 100,
    cadence: [
      "Days 43–45: Multi-Region CDN Routing & DNS Cutover",
      "Days 46–48: OWASP Security Penetration Testing",
      "Day 49+: 24/7 Production Telemetry & Handover",
    ],
    kpi: {
      label: "Production Uptime",
      value: "99.98%",
      sub: "Guaranteed SLA Reliability",
    },
    deliverables: [
      "Multi-region edge deployment with 99.98% SLA",
      "OWASP Top 10 security penetration audit pass",
    ],
    qualityGate: "99.98% Production SLA & Zero-Downtime Cutover",
    accent: "#34d399",
    visualType: "edge",
  },
];

/* -------------------------------------------------------------------------- */
/* HOLOGRAPHIC 3D MINI-VISUALIZERS FOR EACH SPRINT STAGE                      */
/* -------------------------------------------------------------------------- */
function StageVisualizer({
  type,
  accent,
  isHovered,
}: {
  type: "blueprint" | "prototype" | "microservices" | "edge";
  accent: string;
  isHovered: boolean;
}) {
  if (type === "blueprint") {
    return (
      <div className="relative w-full h-24 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-between px-4 py-2 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px] opacity-25" />

        {/* Node A (Client App) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Boxes className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1 font-semibold">Client UI</span>
        </div>

        {/* Animated Connecting Laser Beam */}
        <div className="relative z-10 flex-1 mx-2 flex items-center justify-center">
          <div className="w-full h-[2px] bg-emerald-500/20 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute h-full w-8 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10b981]"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
          <span className="absolute -top-3 text-[8px] font-mono text-emerald-400/80 font-bold uppercase tracking-wider">
            SCHEMA LOCK
          </span>
        </div>

        {/* Node B (GraphQL / API Gateway) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Workflow className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1 font-semibold">API Gate</span>
        </div>

        {/* Animated Connecting Laser Beam */}
        <div className="relative z-10 flex-1 mx-2 flex items-center justify-center">
          <div className="w-full h-[2px] bg-cyan-500/20 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute h-full w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#38bdf8]"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "linear" }}
            />
          </div>
        </div>

        {/* Node C (PostgreSQL Cluster) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Server className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono text-slate-400 mt-1 font-semibold">Postgres</span>
        </div>
      </div>
    );
  }

  if (type === "prototype") {
    return (
      <div className="relative w-full h-24 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-around px-3 py-2 select-none">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-cyan-500/5" />

        {/* Wireframe Mockup Pill 1 */}
        <motion.div
          animate={isHovered ? { y: [-2, 2, -2] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative z-10 w-20 h-16 rounded-xl bg-slate-900/90 border border-sky-400/40 p-2 flex flex-col justify-between shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="text-[8px] font-mono text-sky-400 font-bold">FIGMA</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-sky-400/30 rounded-full" />
            <div className="h-1.5 w-3/4 bg-sky-400/20 rounded-full" />
          </div>
        </motion.div>

        {/* Center Frame Rate Gauge */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 border-2 border-dashed border-sky-400 flex items-center justify-center animate-spin-slow">
            <Gauge className="w-5 h-5 text-sky-400" />
          </div>
          <span className="text-[9px] font-mono text-sky-300 font-bold mt-1">60 FPS UX</span>
        </div>

        {/* Wireframe Mockup Pill 2 */}
        <motion.div
          animate={isHovered ? { y: [2, -2, 2] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative z-10 w-20 h-16 rounded-xl bg-slate-900/90 border border-teal-400/40 p-2 flex flex-col justify-between shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-[8px] font-mono text-teal-400 font-bold">TOKENS</span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-teal-400/30 rounded-full" />
            <div className="h-1.5 w-2/3 bg-teal-400/20 rounded-full" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (type === "microservices") {
    return (
      <div className="relative w-full h-24 rounded-2xl bg-black/60 border border-white/10 overflow-hidden p-3 select-none flex flex-col justify-between font-mono text-[10px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-1 border-b border-white/10 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="text-[9px] text-purple-400 font-bold ml-1">nextjs-engine.ts</span>
          </div>
          <span className="text-[9px] text-emerald-400 font-bold">P95 &lt; 85ms</span>
        </div>

        {/* Code Execution Stream */}
        <div className="space-y-0.5 text-[9px] text-slate-300 leading-tight">
          <div className="flex items-center gap-1">
            <span className="text-purple-400 font-bold">✓</span>
            <span className="text-slate-400">Server Actions compiled:</span>
            <span className="text-white font-bold">0ms latency</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-400 font-bold">✓</span>
            <span className="text-slate-400">Redis cache connected:</span>
            <span className="text-emerald-300 font-bold">Hit Rate 98.4%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-cyan-400 font-bold">✓</span>
            <span className="text-slate-400">End-to-End Test Suite:</span>
            <span className="text-cyan-300 font-bold">42/42 Passed</span>
          </div>
        </div>
      </div>
    );
  }

  // Edge / Rollout
  return (
    <div className="relative w-full h-24 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-between px-4 py-2 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:14px_14px] opacity-20" />

      {/* Globe Radar */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)]">
          <Globe className="w-6 h-6 text-emerald-300" />
          {/* Sweeping Radar Scanner Line */}
          <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-50" />
        </div>

        <div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GLOBAL EDGE CDN</span>
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-0.5">
            Zero-Downtime Rollout
          </div>
        </div>
      </div>

      {/* SLA Telemetry Stamp */}
      <div className="relative z-10 text-right font-mono">
        <div className="text-lg font-black text-emerald-300 tracking-tight">99.98%</div>
        <div className="text-[9px] text-slate-400 uppercase font-semibold">Uptime SLA Lock</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3D INTERACTIVE PROCESS CARD COMPONENT WITH TILT PHYSICS                    */
/* -------------------------------------------------------------------------- */
function ProcessCard3D({
  step,
  index,
  isActive,
  onSelect,
}: {
  step: StepDetail;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // 3D Tilt Spring Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setGlarePos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setGlarePos({ x: 50, y: 50 });
  };

  const Icon = step.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-[32px] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none p-6 sm:p-7 min-h-[430px] sm:min-h-[450px] ${
        isActive
          ? "bg-gradient-to-b from-[#0e1d2e] via-[#091522] to-[#040912] border-2 border-emerald-400 shadow-[0_25px_65px_-15px_rgba(16,185,129,0.4),0_0_35px_rgba(16,185,129,0.2)]"
          : "bg-gradient-to-b from-[#0c1626]/95 via-[#08101a]/95 to-[#040810]/95 border border-white/10 hover:border-emerald-500/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(16,185,129,0.06)] hover:shadow-[0_25px_60px_-10px_rgba(16,185,129,0.22)]"
      }`}
    >
      {/* -------------------------------------------------------------------- */}
      {/* DYNAMIC SPECULAR GLARE FOLLOWING CURSOR IN 3D SPACE                  */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[32px] transition-opacity duration-300"
        style={{
          opacity: isHovered || isActive ? 0.9 : 0,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(16, 185, 129, 0.18) 0%, transparent 60%)`,
        }}
      />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none" />

      {/* Ambient Top Glow Orb */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[85px] pointer-events-none transition-opacity duration-500"
        style={{
          backgroundColor: step.accent,
          opacity: isActive ? 0.45 : isHovered ? 0.28 : 0.08,
        }}
      />

      {/* High-Tech Corner Brackets */}
      <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t-2 border-l-2 border-white/20 group-hover:border-emerald-400 transition-colors pointer-events-none" />
      <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 border-t-2 border-r-2 border-white/20 group-hover:border-emerald-400 transition-colors pointer-events-none" />
      <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 border-b-2 border-l-2 border-white/20 group-hover:border-emerald-400 transition-colors pointer-events-none" />
      <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b-2 border-r-2 border-white/20 group-hover:border-emerald-400 transition-colors pointer-events-none" />

      {/* -------------------------------------------------------------------- */}
      {/* 3D LAYERED CONTENT CONTAINER (translateZ for Real Spatial Depth)     */}
      {/* -------------------------------------------------------------------- */}
      <div
        className="relative z-10 flex flex-col justify-between h-full space-y-5"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* TOP STATUS BAR: STAGE PILL & DURATION BADGE */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-emerald-500/40 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                {step.stage}
              </span>
            </div>

            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {step.durationLabel}
            </span>
          </div>

          {/* 3D HOLOGRAPHIC NUMBER & GYROSCOPIC ICON HUB */}
          <div className="flex items-center justify-between pt-1">
            <div className="relative">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isActive
                    ? "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-brand-dark shadow-[0_0_30px_rgba(16,185,129,0.85)] scale-110 -rotate-3"
                    : "bg-slate-900 border border-white/15 text-emerald-400 group-hover:border-emerald-400/80 group-hover:scale-108 group-hover:text-white"
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping pointer-events-none" />
              )}
            </div>

            <div className="text-right">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white/10 group-hover:text-emerald-400/30 transition-colors">
                {step.number}
              </span>
              <div className="text-[10px] font-mono text-slate-400 font-semibold -mt-1">
                {step.timeline}
              </div>
            </div>
          </div>

          {/* TITLE & TAGLINE */}
          <div className="mt-4">
            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors leading-snug tracking-tight">
              {step.title}
            </h3>
            <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wide mt-1">
              {step.tagline}
            </div>
          </div>

          {/* INTERACTIVE HOLOGRAPHIC MINI-VISUALIZER IN 3D */}
          <div className="mt-4" style={{ transform: "translateZ(20px)" }}>
            <StageVisualizer
              type={step.visualType}
              accent={step.accent}
              isHovered={isHovered || isActive}
            />
          </div>

          {/* HIGHLIGHTED DESCRIPTION BOX */}
          <p className="mt-4 text-xs text-slate-300 leading-relaxed font-normal">
            <span>{step.description.lead} </span>
            <span className="font-semibold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              {step.description.highlight}
            </span>
            <span> {step.description.tail}</span>
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CONCISE 2-LINE SPRINT DELIVERABLES                                */}
        {/* ------------------------------------------------------------------ */}
        <div className="pt-3 border-t border-white/10 space-y-1.5">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Sprint Deliverables:</span>
          </div>
          {step.deliverables.map((del, dIdx) => (
            <div
              key={dIdx}
              className="flex items-center gap-2 text-[11px] font-medium text-slate-200"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
              <span className="truncate">{del}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PROCESS SECTION WITH 3D PIPELINE TRACK & SPRINT COCKPIT               */
/* -------------------------------------------------------------------------- */
export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0); // Stage 01 default or user toggle

  const currentStep = STEPS[activeStep];

  return (
    <section
      id="process"
      className="py-28 px-4 sm:px-6 md:px-12 bg-brand-dark relative overflow-hidden"
    >
      {/* Ambient Cyber Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-emerald-500/[0.06] rounded-full blur-[170px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 left-1/5 w-[500px] h-[500px] bg-brand-navy/70 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="Disciplined Execution Framework // 4-Stage 3D Pipeline"
          title="Predictable Delivery Through"
          highlightedText="Battle-Tested Sprints"
          description="A disciplined 4-stage engineering pipeline designed to eliminate guesswork, lock unit economics, and ship high-throughput digital products on schedule."
          centered
        />

        {/* ------------------------------------------------------------------ */}
        {/* TOP 3D INTERACTIVE PIPELINE CONDUCTOR (DESKTOP)                    */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-16 mb-12 hidden lg:block">
          <div className="relative flex items-center justify-between px-12 py-7 rounded-3xl bg-gradient-to-r from-[#06121d]/95 via-[#091827]/95 to-[#06121d]/95 border border-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            {/* Connecting Laser Rail */}
            <div className="absolute left-24 right-24 top-1/2 -translate-y-1/2 h-[3px] bg-white/10 z-0 overflow-hidden rounded-full">
              {/* Traveling Photon Pulse */}
              <motion.div
                className="h-full w-56 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981]"
                animate={{ x: ["-100%", "500%"] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
              />
            </div>

            {/* 4 Interactive Stage Nodes */}
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                        isSelected
                          ? "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-brand-dark shadow-[0_0_35px_rgba(16,185,129,0.9)] scale-115 rotate-3"
                          : "bg-slate-900 border border-white/15 text-slate-300 group-hover:border-emerald-400 group-hover:text-emerald-400 group-hover:scale-105"
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {isSelected && (
                      <span className="absolute -inset-1.5 rounded-2xl border-2 border-emerald-400 animate-pulse pointer-events-none" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-col items-center text-center">
                    <span
                      className={`font-mono text-xs font-black uppercase tracking-wider transition-colors ${
                        isSelected ? "text-emerald-400" : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {step.stage}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {step.durationLabel}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="pipelineIndicator"
                      className="absolute -bottom-2 w-14 h-1 bg-emerald-400 rounded-full shadow-[0_0_15px_#10b981]"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 4 STAGE PROCESS CARDS GRID IN 3D PERSPECTIVE                       */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => (
            <ProcessCard3D
              key={step.number}
              step={step}
              index={idx}
              isActive={activeStep === idx}
              onSelect={() => setActiveStep(idx)}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* INTERACTIVE SPRINT TELEMETRY COCKPIT (ACTIVE STAGE DEEP DIVE)      */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#071320] via-[#0b1f33] to-[#071320] border-2 border-emerald-500/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.18)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Active Stage Cadence Telemetry */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase border border-emerald-500/40">
                  Active Sprint Focus: {currentStep.stage}
                </span>
                <span className="text-slate-400 font-mono text-xs">
                  {currentStep.durationLabel} ({currentStep.timeline})
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentStep.title}
              </h3>

              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                <span>{currentStep.description.lead} </span>
                <strong className="text-emerald-300 font-semibold">{currentStep.description.highlight}</strong>
                <span> {currentStep.description.tail}</span>
              </p>

              {/* Day-by-Day Cadence Pills */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentStep.cadence.map((cadenceItem, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-xs font-mono text-slate-200 font-medium">
                      {cadenceItem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stage KPI Box & Discovery Action */}
            <div className="w-full lg:w-72 shrink-0 p-6 rounded-2xl bg-black/60 border border-emerald-500/30 flex flex-col justify-between space-y-4 shadow-inner">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Guaranteed Benchmark
                </span>
                <div className="text-3xl font-black text-emerald-400 mt-1 font-mono">
                  {currentStep.kpi.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {currentStep.kpi.sub}
                </div>
              </div>

              <Link
                href="#contact"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-dark font-mono text-xs font-black uppercase tracking-wider text-center transition-all duration-300 hover:scale-102 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <span>Initiate Stage {currentStep.number}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BOTTOM SPRINT ACCOUNTABILITY GUARANTEE                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-brand-navy/90 via-[#071320] to-brand-navy/90 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-black text-base sm:text-lg flex items-center gap-2">
                <span>100% Sprint Accountability & Bi-Weekly Demos</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar" />
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Every milestone is tracked live in Jira/Linear with clickable staging environments delivered every 2 weeks.
              </p>
            </div>
          </div>

          <Link
            href="#contact"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-brand-dark font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shrink-0 flex items-center gap-2 shadow-lg shadow-emerald-500/25"
          >
            <span>Lock Next Sprint Window</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
