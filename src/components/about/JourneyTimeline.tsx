"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Rocket,
  Code2,
  Globe,
  Cpu,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Milestone,
} from "lucide-react";

interface TimelineMilestone {
  year: string;
  badge: string;
  title: string;
  tagline: string;
  summary: string;
  achievements: string[];
  metrics: { label: string; value: string };
  icon: any;
  accent: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: "2017",
    badge: "INCEPTION // DEHRADUN LABS",
    title: "Founding & Core Engineering Inception",
    tagline: "Boutique Creative & Tech Studio",
    summary:
      "Grandeur Net was founded in 2017 at Bengali Kothi Chowk in Dehradun with a small, focused group of creators, designers, and problem-solvers. We set out to deliver digital experiences with obsessive craft, sub-second speeds, and direct builder collaboration.",
    achievements: [
      "Established foundational Dehradun engineering office on Haridwar Bypass Rd",
      "Delivered first 25 high-converting client websites and custom e-commerce builds",
      "Adopted strict sub-second performance budgets and direct-to-builder communication",
    ],
    metrics: { label: "Client Satisfaction", value: "100%" },
    icon: Rocket,
    accent: "#10b981",
  },
  {
    year: "2019-20",
    badge: "SCALE // MODERN ARCHITECTURES",
    title: "Headless Web & Microservices Transition",
    tagline: "High-Concurrency Node & Next.js",
    summary:
      "As digital demands expanded rapidly, we transitioned client platforms into modern decoupled headless architectures with Next.js, Redis caching, and PostgreSQL microservices — setting up our standard 14-day agile sprint delivery model.",
    achievements: [
      "Expanded engineering guild to 15+ in-house full-stack developers and designers",
      "Architected real-time fleet mobility software handling 50,000+ daily user searches",
      "Standardized 14-day agile sprint cadences with interactive staging URLs",
    ],
    metrics: { label: "Performance Gain", value: "+340%" },
    icon: Code2,
    accent: "#38bdf8",
  },
  {
    year: "2022-23",
    badge: "GLOBAL // 5 TERRITORIES",
    title: "International Expansion Across 5 Global Markets",
    tagline: "India, Australia, UAE, UK & USA",
    summary:
      "Our reputation for zero-downtime deliveries and direct senior engineering attracted clients worldwide. We expanded our active footprint across India, Australia, the UAE, the United Kingdom, and the United States.",
    achievements: [
      "Crossed 150+ successfully shipped digital web platforms and cloud apps",
      "Formed dedicated DevOps & Cloud Infrastructure division with AWS and edge networks",
      "Achieved audited 99.4% on-time sprint milestone completion rate",
    ],
    metrics: { label: "Global Footprint", value: "5 Countries" },
    icon: Globe,
    accent: "#a855f7",
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
    accent: "#34d399",
  },
];

export default function JourneyTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(3); // default to 2024+

  return (
    <section className="py-28 px-4 sm:px-6 md:px-12 bg-brand-dark relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/3 left-1/4 w-[750px] h-[400px] bg-brand-green/[0.04] rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-navy/60 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/90 border border-brand-green/40 text-brand-green font-mono text-[10px] font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Milestone className="w-3.5 h-3.5 text-brand-green" />
            <span>8+ Years of Digital Excellence // Est. 2017</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            From Dehradun Foothills to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-teal-300 to-emerald-200">
              5 Global Continents & Markets
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Over eight years of relentless technical iteration and craft. Here is how we grew from a boutique Dehradun studio into an elite product guild trusted by fast-growing brands across India, Australia, UAE, UK, and USA.
          </p>
        </div>

        {/* Interactive Year Selector Track */}
        <div className="relative mb-12">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-10 right-10 -translate-y-1/2 h-[2px] bg-white/[0.08] z-0">
            {/* Animated Laser Beam */}
            <motion.div
              className="h-full w-40 bg-gradient-to-r from-transparent via-brand-green to-transparent"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </div>

          {/* 4 Year Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            {MILESTONES.map((m, idx) => {
              const isSelected = selectedMilestone === idx;
              const Icon = m.icon;

              return (
                <button
                  key={m.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center cursor-pointer select-none ${
                    isSelected
                      ? "bg-gradient-to-b from-[#0f2133] to-[#071322] border-brand-green shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] scale-[1.03]"
                      : "bg-[#09111e]/90 border-white/[0.08] hover:border-brand-green/40 hover:bg-[#0c1626]"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected
                        ? "bg-brand-green text-brand-dark shadow-[0_0_20px_rgba(16,185,129,0.7)]"
                        : "bg-brand-navy border border-brand-green/30 text-brand-green"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`text-2xl font-black font-mono tracking-tight transition-colors ${
                      isSelected ? "text-brand-green" : "text-white"
                    }`}
                  >
                    {m.year}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 mt-1 truncate max-w-full font-semibold">
                    {m.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Interactive Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0e1d2e] via-[#091522] to-[#050b14] border-2 border-brand-green/40 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.15)] relative overflow-hidden"
          >
            {/* Tech Reticles */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-green" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-green" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-green" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-green" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Narrative & Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-mono text-[10px] font-bold border border-brand-green/30">
                    {MILESTONES[selectedMilestone].badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Grandeur Net Milestone Telemetry
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {MILESTONES[selectedMilestone].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {MILESTONES[selectedMilestone].summary}
                </p>

                {/* Achievements List */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Key Milestones Accomplished:
                  </div>
                  {MILESTONES[selectedMilestone].achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-green/10 border border-brand-green/40 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {ach}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Metric Highlight Box */}
              <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-brand-navy/90 border border-brand-green/30 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Milestone Benchmark
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-brand-green tracking-tight">
                    {MILESTONES[selectedMilestone].metrics.value}
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-300 mt-1">
                    {MILESTONES[selectedMilestone].metrics.label}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] text-xs font-mono text-slate-400">
                  <span>Audited via production telemetry and client balance sheets.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
