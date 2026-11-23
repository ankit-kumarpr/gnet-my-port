"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import TechGlobe from "./TechGlobe";
import {
  ArrowUpRight,
  Zap,
  Play,
  X,
  Code2,
  Users,
  Layers,
  BarChart3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* Interactive Rolling Number Counter */
function AnimatedCounter({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const [displayVal, setDisplayVal] = useState(0);
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let startTime: number | null = null;
    let animId: number;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayVal(Math.round(ease * numericTarget));

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setDisplayVal(numericTarget);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [numericTarget, duration]);

  return (
    <span>
      {displayVal}
      {suffix}
    </span>
  );
}

/* Grouped lines matching exact typography and line-breaks from reference 2.webp */
const HEADLINE_LINES = [
  [
    { text: "We", highlight: false },
    { text: "Build", highlight: false },
    { text: "Digital", highlight: false },
  ],
  [
    { text: "Products", highlight: false },
    { text: "That", highlight: false },
    { text: "Drive", highlight: true },
  ],
  [
    { text: "Conversions", highlight: true },
    { text: "&", highlight: false },
    { text: "Grow", highlight: false },
  ],
  [
    { text: "Revenue.", highlight: false },
  ],
];

const STATS = [
  {
    icon: Code2,
    value: "100+",
    label: "Projects Delivered",
    tag: "SYS // 01",
    subtext: "Enterprise & High-Growth",
    trend: "+34% YoY",
    glowColor: "rgba(16, 185, 129, 0.4)",
    borderColor: "group-hover:border-brand-green/60",
    gradient: "from-brand-green to-emerald-400",
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    tag: "SYS // 02",
    subtext: "Global Brands & Founders",
    trend: "100% Retained",
    glowColor: "rgba(52, 211, 153, 0.4)",
    borderColor: "group-hover:border-emerald-400/60",
    gradient: "from-emerald-400 to-teal-300",
  },
  {
    icon: Layers,
    value: "8+",
    label: "Industries Served",
    tag: "SYS // 03",
    subtext: "Fintech, Proptech, AI",
    trend: "Multi-Domain",
    glowColor: "rgba(45, 212, 191, 0.4)",
    borderColor: "group-hover:border-teal-400/60",
    gradient: "from-teal-300 to-cyan-400",
  },
  {
    icon: BarChart3,
    value: "98%",
    label: "Client Satisfaction",
    tag: "SYS // 04",
    subtext: "5-Star Delivery Rating",
    trend: "Top 1% Tier",
    glowColor: "rgba(56, 189, 248, 0.4)",
    borderColor: "group-hover:border-cyan-400/60",
    gradient: "from-cyan-400 to-emerald-300",
  },
];

export default function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-32 sm:pt-36 pb-16 md:pb-20 px-4 sm:px-6 md:px-12 overflow-hidden bg-brand-dark">
      {/* Background Lighting Gradients with Continuous Floating Drift */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-brand-green/[0.08] rounded-full blur-[170px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-brand-navy/70 rounded-full blur-[150px] pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-emerald-950/40 rounded-full blur-[130px] pointer-events-none animate-glow-pulse" />

      {/* Decorative Cyber Blueprint Coordinate Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      {/* Ambient Floating Micro-particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-brand-green/60 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute top-2/3 right-1/5 w-2 h-2 rounded-full bg-emerald-400/50 animate-pulse" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-cyan-400/60 animate-ping" style={{ animationDuration: "5s" }} />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-brand-green/70 animate-pulse" style={{ animationDuration: "2.5s" }} />
      </div>

      {/* Main Hero Container with Futuristic HUD Framing */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* HUD Frame Outer Box */}
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl glass-card border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] hud-corner transition-all duration-500 hover:border-brand-green/30">

          {/* 2-COLUMN HERO BODY: Text on Left, Tech Globe on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* LEFT COLUMN: Kinetic Headline, Subtitle & Buttons */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Status Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full badge-gradient text-xs font-mono text-brand-green font-semibold mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Zap className="w-3.5 h-3.5 text-brand-green animate-bounce" />
                <span>REVENUE-DRIVEN DIGITAL ENGINEERING</span>
              </motion.div>

              {/* Kinetic Typography Headline with Word-by-Word Flash Reveal */}
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[64px] font-black tracking-tight text-white leading-[1.08] max-w-2xl flex flex-col gap-1 sm:gap-2">
                {(() => {
                  let wordCounter = 0;
                  return HEADLINE_LINES.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-3.5">
                      {line.map((item) => {
                        const currentDelay = 0.12 + wordCounter * 0.11;
                        wordCounter++;

                        return (
                          <motion.span
                            key={item.text}
                            initial={{
                              opacity: 0,
                              y: 16,
                              scale: 0.88,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            transition={{
                              delay: currentDelay,
                              duration: 0.45,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`inline-block ${
                              item.highlight
                                ? "text-brand-green text-shimmer drop-shadow-[0_0_35px_rgba(16,185,129,0.7)] font-black"
                                : "text-white"
                            } hover:scale-105 transition-transform duration-200 cursor-default`}
                          >
                            {item.text}
                          </motion.span>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
              >
                From custom headless e-commerce to full-stack platforms and automated cloud systems,
                our 20-member dedicated engineering team architects digital dominance for ambitious brands.
              </motion.p>

              {/* CTA Button Group with Luminous Soundwave & Cyber Micro-interactions */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
              >
                {/* Primary Button: Explore Our Work with Glowing Outer Aura */}
                <Link
                  href="#projects"
                  className="group relative px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-green via-brand-green-light to-emerald-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 overflow-hidden"
                >
                  {/* Subtle Expanding Radar Ring */}
                  <span className="absolute -inset-1 rounded-full bg-brand-green/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <span className="relative z-10 font-black tracking-widest text-[11px]">EXPLORE OUR WORK</span>
                  <div className="relative z-10 w-5 h-5 rounded-full bg-brand-dark/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-dark stroke-[3]" />
                  </div>

                  {/* Sweep Shimmer Sheen */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                </Link>

                {/* Secondary Button: Watch Showreel with Radar Play Pulse */}
                <button
                  onClick={() => setShowreelOpen(true)}
                  className="group relative px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-brand-surface/60 hover:bg-brand-surface-light border border-white/[0.12] hover:border-brand-green/60 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 backdrop-blur-xl shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                >
                  <div className="relative w-7 h-7 rounded-full bg-brand-green/15 border border-brand-green/60 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-brand-dark transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5 transition-transform duration-300 group-hover:scale-110" />
                    {/* Animated Sonar Pulse Ring */}
                    <span className="absolute inset-0 rounded-full border border-brand-green animate-ping opacity-60" style={{ animationDuration: "2.5s" }} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-slate-200 group-hover:text-white transition-colors tracking-wide text-xs">
                      WATCH SHOWREEL
                    </span>
                    <span className="text-[10px] font-mono text-brand-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                      01:20 4K
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Holographic 3D Interactive Tech Globe */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <TechGlobe />
            </div>

          </div>

          {/* =========================================================================
              BOTTOM STATS BAR: HIGH-TECH ANIMATED HUD TELEMETRY CARDS
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`group relative p-5 rounded-2xl bg-gradient-to-b from-[#071722]/90 via-[#041018]/95 to-[#02070c]/98 border border-white/[0.08] ${stat.borderColor} transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] overflow-hidden cursor-default`}
                >
                  {/* Radial Background Spotlight on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${stat.glowColor} 0%, transparent 70%)`,
                    }}
                  />

                  {/* High-Tech Corner HUD Reticle Accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 group-hover:border-brand-green transition-colors duration-300 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 group-hover:border-brand-green transition-colors duration-300 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 group-hover:border-brand-green transition-colors duration-300 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 group-hover:border-brand-green transition-colors duration-300 pointer-events-none" />

                  {/* Top Bar inside Card: Tag & Trend Pill */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 group-hover:text-brand-green transition-colors font-semibold">
                      {stat.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-navy/80 border border-brand-green/30 text-[9px] font-mono font-bold text-brand-green">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                      {stat.trend}
                    </span>
                  </div>

                  {/* Main Metric Body: Icon + Rolling Number Counter */}
                  <div className="relative z-10 flex items-center gap-4">
                    {/* Glowing Icon Container with Rotating Border Accent */}
                    <div className="relative w-12 h-12 rounded-xl bg-brand-navy/90 border border-brand-green/40 flex items-center justify-center text-brand-green shrink-0 shadow-lg group-hover:border-brand-green group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      {/* Subtle Icon Glow Ring */}
                      <span className="absolute inset-0 rounded-xl bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="flex flex-col">
                      <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-brand-green-light group-hover:to-brand-green transition-all duration-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <AnimatedCounter value={stat.value} duration={1.6 + idx * 0.2} />
                      </div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors font-bold mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Animated Telemetry Pulse Line */}
                  <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[10px] font-sans text-slate-400 group-hover:text-slate-300 transition-colors">
                      {stat.subtext}
                    </span>
                    <div className="w-12 h-1 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} animate-pulse`}
                        style={{ width: `${80 + idx * 5}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* =========================================
          INTERACTIVE SHOWREEL MODAL
          ========================================= */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowreelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl glass-card border border-brand-green/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(16,185,129,0.3)] overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Grandeur Net // 2026 Production Engineering Showreel
                  </span>
                </div>
                <button
                  onClick={() => setShowreelOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Showreel Cinematic Screen Preview */}
              <div className="relative aspect-video rounded-2xl bg-brand-dark/90 border border-white/[0.06] overflow-hidden flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center text-brand-green mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Architecting Digital Dominance
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                  Preview high-velocity e-commerce stores, custom AI workflows, and enterprise full-stack deployments engineered in Dehradun Labs.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs font-mono text-brand-green">
                  <span className="px-3 py-1 rounded-full bg-brand-navy border border-brand-green/30">
                    4K Ultra HD
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-navy border border-brand-green/30">
                    Duration: 01:20
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
