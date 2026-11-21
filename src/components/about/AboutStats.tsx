"use client";

import { motion } from "framer-motion";
import {
  Award,
  Activity,
  ShieldCheck,
  TrendingUp,
  Clock,
  Globe2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface StatItem {
  id: string;
  metric: string;
  label: string;
  sublabel: string;
  description: string;
  icon: any;
  progressPercent: number;
  badge: string;
  accent: string;
}

const STATS: StatItem[] = [
  {
    id: "years",
    metric: "8+",
    label: "Years in Market",
    sublabel: "Est. 2017 in Dehradun",
    description:
      "Continuous production delivery through technological shifts — from monolithic codebases to modern edge serverless, Next.js, and autonomous AI systems.",
    icon: Clock,
    progressPercent: 100,
    badge: "BATTLE-TESTED",
    accent: "#10b981",
  },
  {
    id: "projects",
    metric: "250+",
    label: "Projects Delivered",
    sublabel: "Across 5 Global Territories",
    description:
      "Successfully delivered digital systems across India, Australia, the UAE, the UK, and the USA with zero outsourcing and direct senior engineering.",
    icon: Globe2,
    progressPercent: 98,
    badge: "GLOBAL FOOTPRINT",
    accent: "#38bdf8",
  },
  {
    id: "delivery",
    metric: "99.4%",
    label: "Sprint Delivery Rate",
    sublabel: "On-Time Milestone Velocity",
    description:
      "Strict 14-day agile sprint cadences. We deliver functional staging deployments and weekly video demonstrations with zero scope creep.",
    icon: Activity,
    progressPercent: 99.4,
    badge: "ZERO DELAYS",
    accent: "#34d399",
  },
  {
    id: "retention",
    metric: "98.4%",
    label: "Client Retention Rate",
    sublabel: "Outcomes Over Output",
    description:
      "Over 9 out of 10 clients retain our engineering guild post-launch for ongoing platform enhancements, performance tuning, and technical scaling.",
    icon: ShieldCheck,
    progressPercent: 98.4,
    badge: "LONG-TERM TRUST",
    accent: "#a855f7",
  },
];

export default function AboutStats() {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-[#050912] relative overflow-hidden border-y border-white/[0.06] select-none">
      {/* Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/90 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Operational Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Numbers Built on <span className="text-emerald-400">Obsessive Craft</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-md">
            No vanity awards or inflated agency statistics. Every metric is backed by production telemetry and audited client performance.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0c1524]/95 via-[#080f1a]/95 to-[#050912]/95 border border-white/[0.08] hover:border-emerald-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.2)]"
              >
                {/* Tech Reticles */}
                <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />

                {/* Top badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-brand-navy border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-brand-dark transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-300 group-hover:text-emerald-300 group-hover:border-emerald-400/40 transition-colors">
                      {stat.badge}
                    </span>
                  </div>

                  {/* Big Kinetic Metric Number */}
                  <div className="text-4xl sm:text-5xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight mb-1">
                    {stat.metric}
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase font-mono mb-1">
                    {stat.label}
                  </h3>

                  <div className="text-[11px] font-mono text-emerald-400/90 font-semibold mb-3">
                    {stat.sublabel}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>

                {/* Progress Visualizer */}
                <div className="pt-5 mt-5 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-slate-500 uppercase">SLA Velocity</span>
                    <span className="text-emerald-400 font-bold">{stat.progressPercent}% Active</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.progressPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
