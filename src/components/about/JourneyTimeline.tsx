"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Code2,
  Globe,
  Cpu,
  CheckCircle2,
  Milestone,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface TimelineMilestone {
  year: string;
  badge: string;
  title: string;
  tagline: string;
  summary: string;
  achievements: string[];
  metrics: { label: string; value: string };
  icon: React.ComponentType<{ className?: string }>;
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: "2017",
    badge: "FOUNDING // DEHRADUN LABS",
    title: "Founding & Core Engineering Inception",
    tagline: "Boutique Creative & Tech Studio",
    summary:
      "Grandeur Net was founded in 2017 at Bengali Kothi Chowk in Dehradun with a small, focused group of creators and problem-solvers. We set out to deliver digital experiences with obsessive craft, sub-second speeds, and direct builder collaboration.",
    achievements: [
      "Established foundational Dehradun engineering office on Haridwar Bypass Rd",
      "Delivered first 25 high-converting client websites and custom e-commerce builds",
      "Adopted strict sub-second performance budgets and direct-to-builder communication",
    ],
    metrics: { label: "Client Satisfaction", value: "100%" },
    icon: Rocket,
  },
  {
    year: "2019-20",
    badge: "SCALE // MODERN ARCHITECTURES",
    title: "Headless Web & Microservices Transition",
    tagline: "High-Concurrency Node & Next.js",
    summary:
      "As digital demands expanded rapidly, we transitioned client platforms into modern decoupled headless architectures with Next.js, Redis caching, and PostgreSQL microservices — establishing our standard 14-day agile sprint delivery model.",
    achievements: [
      "Expanded engineering guild to 15+ in-house full-stack developers and designers",
      "Architected real-time fleet mobility software handling 50,000+ daily user searches",
      "Standardized 14-day agile sprint cadences with interactive staging URLs",
    ],
    metrics: { label: "Performance Gain", value: "+340%" },
    icon: Code2,
  },
  {
    year: "2022-23",
    badge: "GLOBAL // 5 TERRITORIES",
    title: "International Expansion Across 5 Global Markets",
    tagline: "India, Australia, UAE, UK & USA",
    summary:
      "Our reputation for zero-downtime deliveries and direct senior engineering attracted clients worldwide. We expanded our active client footprint across India, Australia, the UAE, the United Kingdom, and the United States.",
    achievements: [
      "Crossed 150+ successfully shipped digital web platforms and cloud apps",
      "Formed dedicated DevOps & Cloud Infrastructure division with AWS and edge networks",
      "Achieved audited 99.4% on-time sprint milestone completion rate",
    ],
    metrics: { label: "Global Footprint", value: "5 Markets" },
    icon: Globe,
  },
  {
    year: "2024-25+",
    badge: "FRONTIER // 250+ PROJECTS & AGENTIC AI",
    title: "AI Automations & Sub-Second Commerce Moats",
    tagline: "Next.js 15, Edge & Autonomous Workflows",
    summary:
      "Today, Grandeur Net represents an elite product guild with over 250+ shipped projects worldwide. We combine Next.js 15 App Router with autonomous AI agent workflows to give fast-moving brands an unbeatable competitive edge.",
    achievements: [
      "Surpassed 250+ projects shipped with 98.4% long-term client retention rate",
      "Deployed autonomous AI pipelines saving enterprise clients 40+ hours per week",
      "Generated over ₹45+ Cr in cumulative client GMV and transactions",
    ],
    metrics: { label: "Shipped Projects", value: "250+" },
    icon: Cpu,
  },
];

export default function JourneyTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(3); // Default to current milestone
  const activeMilestone = MILESTONES[selectedIdx];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F3F6FA] dark:bg-[#071321] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Milestone className="w-3.5 h-3.5" />
            <span>8+ Years of Digital Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#10243A] dark:text-white tracking-tight leading-tight">
            From Dehradun Foothills to <br />
            <span className="text-[#00A980] dark:text-[#00C99A]">
              5 Global Continents & Markets
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed max-w-2xl font-normal">
            Over eight years of disciplined technical execution and craft. How Grandeur Net evolved from a focused regional studio into an internationally trusted digital engineering team.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP TIMELINE: Horizontal Navigation Bar with Progress Line
            ========================================================================= */}
        <div className="hidden md:block relative mb-12">
          {/* Subtle Track Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-white/[0.08] z-0" />

          {/* 4 Milestone Buttons */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {MILESTONES.map((m, idx) => {
              const isSelected = selectedIdx === idx;
              const Icon = m.icon;

              return (
                <button
                  key={m.year}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white dark:bg-[#0B1929] border-[#00C99A] shadow-lg shadow-[#00C99A]/10 -translate-y-1"
                      : "bg-white/80 dark:bg-[#0B1929]/60 border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-2xl font-black font-mono tracking-tight transition-colors ${
                        isSelected ? "text-[#00A980] dark:text-[#00C99A]" : "text-[#10243A] dark:text-white"
                      }`}
                    >
                      {m.year}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#00C99A] text-[#05090B]"
                          : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-[#8999AD]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {m.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Showcase (Desktop) */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-sm"
            >
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left: Milestone Summary & Accomplishments */}
                <div className="col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#00C99A]/10 text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold border border-[#00C99A]/30">
                      {activeMilestone.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-[#8999AD]">
                      Milestone Telemetry
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#10243A] dark:text-white tracking-tight">
                    {activeMilestone.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed font-normal">
                    {activeMilestone.summary}
                  </p>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] space-y-2.5">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-[#8999AD]">
                      Key Accomplishments:
                    </div>
                    {activeMilestone.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#00C99A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Benchmark Highlight Box */}
                <div className="col-span-4 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between h-full min-h-[220px]">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-[#8999AD] mb-2 font-semibold">
                      Milestone Benchmark
                    </div>
                    <div className="text-4xl sm:text-5xl font-black font-mono text-[#00A980] dark:text-[#00C99A] tracking-tight">
                      {activeMilestone.metrics.value}
                    </div>
                    <div className="text-sm font-bold text-[#10243A] dark:text-white mt-1">
                      {activeMilestone.metrics.label}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-500 dark:text-slate-400">
                    Production verified and audited.
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================================
            MOBILE TIMELINE: Refined Vertical Timeline Flow
            ========================================================================= */}
        <div className="md:hidden space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200 dark:before:bg-white/[0.08]">
          {MILESTONES.map((m, idx) => {
            const Icon = m.icon;

            return (
              <div key={m.year} className="relative pl-12">
                {/* Year Node Pin */}
                <div className="absolute left-2.5 top-5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#00C99A] text-[#05090B] flex items-center justify-center font-mono text-xs font-bold shadow-md shadow-[#00C99A]/30">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black font-mono text-[#00A980] dark:text-[#00C99A]">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300">
                      {m.metrics.value}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#10243A] dark:text-white leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#8999AD] leading-relaxed">
                    {m.summary}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] space-y-2">
                    {m.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C99A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
