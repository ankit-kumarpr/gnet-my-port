"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Layers,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Workflow,
  Sparkles,
  Terminal,
} from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  summary: string;
  icon: any;
  deliverables: string[];
  checkpoint: string;
  techHighlights: string[];
}

const PHASES: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategy",
    tagline: "CLARITY BEFORE CODE",
    summary:
      "Understand business requirements, target users, commercial objectives and technical constraints to formulate an unambiguous product blueprint.",
    icon: Compass,
    deliverables: [
      "Technical requirement specification & architecture plan",
      "User journey mapping & friction point analysis",
      "System data modeling & third-party API assessment",
      "Sprint roadmap with guaranteed delivery timeline",
    ],
    checkpoint: "Architecture Sign-off & Fixed Scope Guarantee",
    techHighlights: ["User Journeys", "API Specs", "Risk Matrix", "SLA Baseline"],
  },
  {
    number: "02",
    title: "Design & Architecture",
    tagline: "FORM FOLLOWS CONVERSION",
    summary:
      "Define user journeys, visual design systems, technical microservices and development strategies that maximize user engagement and system throughput.",
    icon: Layers,
    deliverables: [
      "Figma high-fidelity interactive component library",
      "Database schema definitions & relation modeling",
      "State management & client/server caching strategy",
      "Accessibility & responsive mobile viewport testing",
    ],
    checkpoint: "Interactive Prototype Review & Design Lock",
    techHighlights: ["Design Tokens", "PostgreSQL Schemas", "Tailwind System", "60fps Flows"],
  },
  {
    number: "03",
    title: "Engineering & Development",
    tagline: "CRAFT ACCELERATED",
    summary:
      "Build responsive interfaces, scalable backend systems and integrated functionality under strict TypeScript safety and automated CI/CD pipelines.",
    icon: Code2,
    deliverables: [
      "Next.js App Router frontends with sub-second SSR",
      "REST & GraphQL APIs with automated type generation",
      "Payment gateway & webhook idempotent pipelines",
      "Continuous staging deployments with client preview",
    ],
    checkpoint: "Code Quality Audit & Unit/E2E Test Coverage",
    techHighlights: ["TypeScript 5", "Server Actions", "Edge Caching", "CI/CD Staging"],
  },
  {
    number: "04",
    title: "Launch & Optimization",
    tagline: "PRODUCTION EXCELLENCE",
    summary:
      "Test, deploy, monitor and continuously improve the digital experience with zero downtime cutovers, DNS hardening and 60-day post-launch hypercare.",
    icon: Rocket,
    deliverables: [
      "Stress testing simulating 10,000+ concurrent users",
      "Core Web Vitals performance tuning (95+ score target)",
      "Zero-downtime DNS cutover and SSL edge provisioning",
      "60-day post-launch telemetry & conversion monitoring",
    ],
    checkpoint: "Production Deployment & 100% IP Handover",
    techHighlights: ["Lighthouse 99", "Edge CDN", "Error Telemetry", "SLA Guarantee"],
  },
];

export default function EngineeringProcess() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = PHASES[activePhaseIndex];
  const ActiveIcon = activePhase.icon;

  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-[#080F18] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#00C995]/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#0B1728]/60 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Heading & Description */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1728] border border-[#00C995]/30 text-[#00E5A0] text-xs font-mono font-medium">
            <Workflow className="w-3.5 h-3.5 text-[#00C995]" />
            <span>// FOUR-PHASE AGILE METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            From First Concept to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C995] to-[#00E5A0]">
              Final Experience.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
            A transparent, structured approach that transforms complex ideas into reliable digital products.
          </p>
        </div>

        {/* Desktop Horizontal Timeline Navigation Bar */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative">
          {/* Continuous connecting horizontal track */}
          <div className="absolute top-7 left-12 right-12 h-[2px] bg-white/[0.08] -z-0" />
          <motion.div
            className="absolute top-7 left-12 h-[2px] bg-gradient-to-r from-[#00C995] to-[#00E5A0] -z-0"
            animate={{ width: `${(activePhaseIndex / (PHASES.length - 1)) * 88}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {PHASES.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            const isPast = activePhaseIndex > idx;
            const Icon = phase.icon;

            return (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className={`relative z-10 p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? "bg-[#0D1927] border-[#00C995] shadow-lg shadow-[#00C995]/15"
                    : isPast
                    ? "bg-[#080F18] border-[#00C995]/40 hover:border-white/20"
                    : "bg-[#080F18]/60 border-white/[0.07] hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-colors ${
                      isSelected
                        ? "bg-[#00C995] text-[#05090C]"
                        : isPast
                        ? "bg-[#00C995]/20 text-[#00E5A0]"
                        : "bg-white/[0.06] text-[#A7B5C5]"
                    }`}
                  >
                    {phase.number}
                  </div>
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? "text-[#00C995]" : "text-[#A7B5C5]/60"
                    }`}
                  />
                </div>
                <div className="text-[10px] font-mono tracking-wider text-[#A7B5C5] uppercase mb-1">
                  {phase.tagline}
                </div>
                <div
                  className={`text-sm font-bold tracking-tight ${
                    isSelected ? "text-white" : "text-slate-300"
                  }`}
                >
                  {phase.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Phase Selector Tabs */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PHASES.map((phase, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhaseIndex(idx)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap shrink-0 border transition-all cursor-pointer ${
                activePhaseIndex === idx
                  ? "bg-[#00C995] text-[#05090C] font-bold border-[#00C995]"
                  : "bg-[#0D1927] text-[#A7B5C5] border-white/[0.08]"
              }`}
            >
              {phase.number} · {phase.title}
            </button>
          ))}
        </div>

        {/* Phase Details Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.number}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-8 sm:p-10 rounded-3xl bg-[#0D1927] border border-white/[0.1] shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Phase Narrative & Quality Gate */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00C995]/15 text-[#00C995] flex items-center justify-center border border-[#00C995]/30">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5A0]">
                      PHASE {activePhase.number} // {activePhase.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activePhase.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
                  {activePhase.summary}
                </p>

                {/* Technical Highlights Badges */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {activePhase.techHighlights.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#05090C] border border-white/[0.08] text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Quality Checkpoint Guarantee */}
                <div className="p-4 rounded-xl bg-[#080F18] border border-[#00C995]/30 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#00C995] shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <span className="text-[#A7B5C5] font-mono block text-[10px] uppercase">
                      PHASE QUALITY GATEWAY
                    </span>
                    <span className="text-white font-semibold">{activePhase.checkpoint}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Deliverables Checklist */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080F18] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-white font-semibold pb-2 border-b border-white/[0.06]">
                  <span className="uppercase tracking-wider">Phase Deliverables</span>
                  <span className="text-[#00C995]">100% Verified</span>
                </div>

                <ul className="space-y-3">
                  {activePhase.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-[#00C995]/20 text-[#00C995] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
