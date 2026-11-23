"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TechGlobe from "./TechGlobe";
import {
  ArrowUpRight,
  Zap,
  Code2,
  Users,
  Layers,
  BarChart3,
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

/* Grouped lines matching exact typography and line-breaks from reference */
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
    subtext: "Enterprise & High-Growth",
    trend: "+34% YoY",
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    subtext: "Global Brands & Founders",
    trend: "100% Retained",
  },
  {
    icon: Layers,
    value: "8+",
    label: "Industries Served",
    subtext: "Fintech, Proptech, AI",
    trend: "Multi-Domain",
  },
  {
    icon: BarChart3,
    value: "98%",
    label: "Client Satisfaction",
    subtext: "5-Star Delivery Rating",
    trend: "Top 1% Tier",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 overflow-hidden bg-brand-dark">
      {/* Background Lighting Gradients with Continuous Floating Drift */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-green/[0.07] rounded-full blur-[170px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-navy/70 rounded-full blur-[150px] pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-950/40 rounded-full blur-[130px] pointer-events-none animate-glow-pulse" />

      {/* Decorative Cyber Blueprint Coordinate Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

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
        <div className="relative p-5 sm:p-8 md:p-10 lg:p-12 rounded-3xl glass-card border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] hud-corner transition-all duration-500 hover:border-brand-green/30">

          {/* 2-COLUMN HERO BODY: Text on Left, Tech Globe on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-center">

            {/* LEFT COLUMN: Kinetic Headline, Subtitle & Primary CTA */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
              {/* Status Pill Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full badge-gradient text-[11px] sm:text-xs font-mono text-brand-green font-semibold mb-5 sm:mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Zap className="w-3.5 h-3.5 text-brand-green animate-bounce" />
                <span>REVENUE-DRIVEN DIGITAL ENGINEERING</span>
              </motion.div>

              {/* Kinetic Typography Headline with Word-by-Word Flash Reveal */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight text-white leading-[1.1] sm:leading-[1.08] max-w-2xl flex flex-col gap-1 sm:gap-1.5">
                {(() => {
                  let wordCounter = 0;
                  return HEADLINE_LINES.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-3.5">
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
                className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
              >
                From custom headless e-commerce to full-stack platforms and automated cloud systems,
                our 20-member dedicated engineering team architects digital dominance for ambitious brands.
              </motion.p>

              {/* Primary CTA: Explore Our Work (Showreel removed cleanly) */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-7 sm:mt-8 flex items-center w-full sm:w-auto"
              >
                <Link
                  href="#projects"
                  className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-green via-brand-green-light to-emerald-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 overflow-hidden"
                >
                  <span className="relative z-10 font-black tracking-widest text-[11px]">
                    EXPLORE OUR WORK
                  </span>
                  <div className="relative z-10 w-5 h-5 rounded-full bg-brand-dark/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-dark stroke-[3]" />
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Holographic 3D Interactive Tech Globe */}
            <div className="lg:col-span-5 flex items-center justify-center relative w-full overflow-visible py-4 sm:py-6 lg:py-0">
              <TechGlobe />
            </div>

          </div>

          {/* =========================================================================
              BOTTOM STATS: COMPACT, BALANCED 4-BLOCK HUD METRIC ROW
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 sm:mt-12 pt-7 sm:pt-8 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5"
          >
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-[#081420]/90 hover:bg-[#0B1B2A] border border-white/[0.08] hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-[0_12px_28px_-10px_rgba(0,214,160,0.18)] flex flex-col justify-between overflow-hidden cursor-default"
                >
                  {/* Subtle radial ambient highlight on card hover */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-green/10 blur-xl group-hover:bg-brand-green/20 transition-all duration-500 pointer-events-none"
                  />

                  {/* Top row: Icon + Trend Pill */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-brand-navy border border-brand-green/30 flex items-center justify-center text-brand-green shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-green bg-brand-green/[0.08] px-2 py-0.5 rounded-full border border-brand-green/20 font-semibold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
                      {stat.trend}
                    </span>
                  </div>

                  {/* Metric Value & Labels */}
                  <div className="space-y-0.5 relative z-10">
                    <div className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold font-mono text-white tracking-tight leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-green transition-all">
                      <AnimatedCounter value={stat.value} duration={1.5 + idx * 0.15} />
                    </div>
                    <div className="text-xs sm:text-[13px] font-semibold text-slate-200 group-hover:text-white transition-colors pt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal truncate">
                      {stat.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
