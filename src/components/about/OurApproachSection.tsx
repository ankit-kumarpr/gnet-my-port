"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  FileCode,
  Layers,
  Terminal,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  Cpu,
  Activity,
  Code2,
} from "lucide-react";

interface ApproachStep {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  keyOutcomes: string[];
  previewType: "blueprint" | "sprint" | "design" | "code" | "testing" | "growth";
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    id: "goals",
    stepNumber: "01",
    title: "Understanding Business Goals",
    shortDesc: "Aligning software architecture with commercial revenue imperatives.",
    fullDesc:
      "We begin by uncovering commercial imperatives, unit economics, customer acquisition funnels, and technical constraints to align technology with bottom-line growth. Every decision is tied to measurable commercial ROI.",
    icon: Compass,
    keyOutcomes: [
      "Commercial KPI definition & conversion benchmarks",
      "Customer journey discovery & competitive moat mapping",
      "Technical specifications & third-party integration scope",
    ],
    previewType: "blueprint",
  },
  {
    id: "strategy",
    stepNumber: "02",
    title: "Strategic Planning",
    shortDesc: "Architecting software blueprints and transparent milestone roadmaps.",
    fullDesc:
      "We design the software blueprint, data schemas, API contracts, and milestone roadmaps. Our team establishes strict 14-day agile sprint cadences with interactive staging URLs so you have total predictability.",
    icon: Layers,
    keyOutcomes: [
      "14-Day agile sprint schedule with staging URLs",
      "Cloud infrastructure & security compliance plan",
      "Database schema architecture & edge API contracts",
    ],
    previewType: "sprint",
  },
  {
    id: "ux-design",
    stepNumber: "03",
    title: "User Experience & Design",
    shortDesc: "High-converting, tactile digital interfaces built in Figma.",
    fullDesc:
      "Crafting intuitive, tactile user journeys with modern typography, micro-interactions, and design systems in Figma. We focus on frictionless checkout funnels and engaging product experiences that convert.",
    icon: Sparkles,
    keyOutcomes: [
      "Comprehensive Figma design system with tokens & components",
      "Interactive high-fidelity clickable prototype for review",
      "Accessibility & multi-viewport responsive standards",
    ],
    previewType: "design",
  },
  {
    id: "engineering",
    stepNumber: "04",
    title: "Engineering & Development",
    shortDesc: "Next.js 15, TypeScript & serverless edge deployments.",
    fullDesc:
      "Clean, modular TypeScript codebases engineered on Next.js 15 App Router, distributed Node.js backends, and serverless edge databases. Zero outsourcing, zero junior handoffs — just experienced builders delivering clean code.",
    icon: Code2,
    keyOutcomes: [
      "Next.js 15 App Router with sub-second page loads",
      "Strict TypeScript type safety & automated CI/CD pipelines",
      "100% intellectual property & source code ownership",
    ],
    previewType: "code",
  },
  {
    id: "qa",
    stepNumber: "05",
    title: "Quality Assurance",
    shortDesc: "End-to-end automated tests & sub-second Core Web Vitals.",
    fullDesc:
      "Rigorous automated end-to-end testing, Core Web Vitals audits, security penetration checks, and cross-browser responsiveness tests before launch. We ensure your application thrives under peak concurrent user loads.",
    icon: ShieldCheck,
    keyOutcomes: [
      "100/100 Core Web Vitals performance benchmarks",
      "Automated end-to-end test suites across critical user paths",
      "Cross-browser, mobile & tablet accessibility validation",
    ],
    previewType: "testing",
  },
  {
    id: "improvement",
    stepNumber: "06",
    title: "Continuous Improvement",
    shortDesc: "60-Day post-launch hypercare & conversion optimization.",
    fullDesc:
      "Launch day is not goodbye. We stand behind our work with 60 days of guaranteed post-launch hypercare, resolving edge cases, tracking live user telemetry, and iterating on conversion rate optimizations (CRO).",
    icon: TrendingUp,
    keyOutcomes: [
      "60-Day contractual post-launch hypercare & warranty",
      "Real-time uptime monitoring & sub-second SLA alerts",
      "Ongoing engineering partnership for feature scaling",
    ],
    previewType: "growth",
  },
];

export default function OurApproachSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentStep = APPROACH_STEPS[activeIdx];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F3F6FA] dark:bg-[#071321] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>Our Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10243A] dark:text-white tracking-tight leading-tight">
            How We Keep Our Clients <br />
            <span className="text-[#00A980] dark:text-[#00C99A]">
              Profitable, Delighted & Long-Term
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed max-w-2xl font-normal">
            A disciplined, transparent, and battle-tested engineering process designed to eliminate
            agency friction, guarantee technical velocity, and maximize commercial returns.
          </p>
        </div>

        {/* Two-Column Interactive Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN: Interactive Vertical Accordion
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-3">
            {APPROACH_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeIdx === idx;

              return (
                <div
                  key={step.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "bg-white dark:bg-[#0B1929] border-[#00C99A]/50 shadow-md shadow-[#00C99A]/5"
                      : "bg-white/70 dark:bg-[#0B1929]/50 border-slate-200 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/[0.12]"
                  }`}
                >
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      {/* Step Number & Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#00C99A] text-[#05090B]"
                            : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-[#8999AD]"
                        }`}
                      >
                        {step.stepNumber}
                      </div>

                      {/* Title */}
                      <div>
                        <h3
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isActive
                              ? "text-[#10243A] dark:text-white"
                              : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-[#8999AD] line-clamp-1 mt-0.5">
                          {step.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 transition-transform duration-200 ${
                        isActive
                          ? "rotate-180 text-[#00A980] dark:text-[#00C99A]"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Mobile Expanded Drawer View */}
                  {isActive && (
                    <div className="px-5 pb-5 pt-1 lg:hidden border-t border-slate-100 dark:border-white/[0.05]">
                      <p className="text-xs text-slate-600 dark:text-[#8999AD] leading-relaxed mb-3">
                        {step.fullDesc}
                      </p>
                      <div className="space-y-1.5">
                        {step.keyOutcomes.map((outcome, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C99A] shrink-0" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Desktop Rich Preview Card (Smooth Transitions)
              ========================================================================= */}
          <div className="hidden lg:block lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-9 rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-xl shadow-slate-200/50 dark:shadow-black/40 flex flex-col justify-between min-h-[520px]"
              >
                <div>
                  {/* Step Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.08] mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00C99A] animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A980] dark:text-[#00C99A]">
                        PHASE {currentStep.stepNumber} EXECUTION
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-[#8999AD]">
                      Standard Operating Protocol
                    </span>
                  </div>

                  {/* Heading & Full Description */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#10243A] dark:text-white tracking-tight mb-3">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed mb-6 font-normal">
                    {currentStep.fullDesc}
                  </p>

                  {/* Key Outcomes Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-[#8999AD]">
                      Deliverables & Outcomes:
                    </div>
                    {currentStep.keyOutcomes.map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00C99A]/15 border border-[#00C99A]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00C99A]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bespoke Interactive Interface Preview Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08]">
                  {currentStep.previewType === "blueprint" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">KPI Benchmark</span>
                        <span className="text-[#00C99A] font-bold">+185% Target Conversion</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#10243A] dark:text-white">&lt;0.8s</div>
                          <div className="text-[10px] text-slate-400">Load Target</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#00C99A]">4.2x</div>
                          <div className="text-[10px] text-slate-400">LTV / CAC</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#10243A] dark:text-white">100%</div>
                          <div className="text-[10px] text-slate-400">IP Ownership</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.previewType === "sprint" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">14-Day Sprint Cadence</span>
                        <span className="text-[#00C99A] font-bold">Staging: online</span>
                      </div>
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <span className="text-slate-700 dark:text-slate-300">Sprint 1: Architecture & API Schema</span>
                          <span className="text-[#00C99A] font-bold">COMPLETE</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <span className="text-slate-700 dark:text-slate-300">Sprint 2: Core Workflows & Staging URL</span>
                          <span className="text-amber-500 font-bold">ACTIVE</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.previewType === "design" && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">Design System Tokens</span>
                        <span className="text-[#00C99A] font-bold">Figma Prototyped</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#00C99A] shrink-0" />
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-300">#00C99A</span>
                        </div>
                        <div className="flex-1 p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#071321] border border-white/20 shrink-0" />
                          <span className="text-xs font-mono text-slate-700 dark:text-slate-300">#071321</span>
                        </div>
                        <div className="flex-1 p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-center font-mono text-xs text-slate-700 dark:text-slate-300">
                          Sans / Heading
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.previewType === "code" && (
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-white/[0.06]">
                        <span>app/page.tsx — Next.js 15 App Router</span>
                        <span className="text-[#00C99A]">Edge 42ms</span>
                      </div>
                      <pre className="text-[11px] text-slate-700 dark:text-emerald-400/90 leading-tight overflow-x-auto">
                        <code>{`export default async function Page() {
  const data = await getEdgeData({ revalidate: 60 });
  return <GrandeurExperience payload={data} />;
}`}</code>
                      </pre>
                    </div>
                  )}

                  {currentStep.previewType === "testing" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">Google Lighthouse Score</span>
                        <span className="text-[#00C99A] font-bold">100 / 100 All Green</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#00C99A]">100</div>
                          <div className="text-[9px] text-slate-400">Perf</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#00C99A]">100</div>
                          <div className="text-[9px] text-slate-400">A11y</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#00C99A]">100</div>
                          <div className="text-[9px] text-slate-400">Practices</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08]">
                          <div className="font-bold text-[#00C99A]">100</div>
                          <div className="text-[9px] text-slate-400">SEO</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.previewType === "growth" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500 dark:text-slate-400">Post-Launch Warranty</span>
                        <span className="text-[#00C99A] font-bold">60 Days Active</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-xs">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-[#00C99A]" />
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            99.98% Monitored Uptime SLA
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">24/7 Alerts</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
