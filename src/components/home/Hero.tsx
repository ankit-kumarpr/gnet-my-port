"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import TechGlobe from "./TechGlobe";
import { ArrowUpRight } from "lucide-react";

/* Interactive Rolling Number Counter with Viewport Trigger */
function AnimatedCounter({
  value,
  duration = 1.8,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const [displayVal, setDisplayVal] = useState(0);
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animId: number;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
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
  }, [isInView, numericTarget, duration]);

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: "100+",
    label: "Projects Delivered",
    subtext: "Enterprise & High-Growth",
  },
  {
    value: "50+",
    label: "Happy Clients",
    subtext: "Global Brands & Founders",
  },
  {
    value: "8+",
    label: "Industries Served",
    subtext: "Fintech, Proptech, AI",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    subtext: "5-Star Delivery Rating",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-14 sm:pb-16 md:pb-20 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#04080C]">
      {/* =========================================================================
          CONTINUOUS DEEP OBSIDIAN & MIDNIGHT NAVY ATMOSPHERIC BACKDROP
          ========================================================================= */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0E2337]/35 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00D6A0]/[0.06] rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-[#05231c]/25 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle architectural coordinate grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-[0.14]" />

      {/* =========================================================================
          MAIN HERO VIEWPORT CONTAINER (FULL-WIDTH SEAMLESS CANVAS)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto flex-1 flex flex-col justify-between">

        {/* 2-COLUMN HERO COMPOSITION: Headline & CTA on Left, 3D Globe on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 items-center">

          {/* LEFT COLUMN: Clean Editorial Headline, Description & Primary CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Cinematic Headline with Emerald Emphasis */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-extrabold sm:font-black tracking-[-0.035em] text-white leading-[1.08] max-w-2xl"
            >
              <span className="block">We Build Digital Products</span>
              <span className="block mt-1 sm:mt-2">
                That Drive{" "}
                <span className="text-[#00D6A0] drop-shadow-[0_0_28px_rgba(0,214,160,0.35)]">
                  Conversions
                </span>
              </span>
              <span className="block mt-1 sm:mt-2">
                &amp; Grow{" "}
                <span className="text-[#00D6A0] drop-shadow-[0_0_28px_rgba(0,214,160,0.35)]">
                  Revenue.
                </span>
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-7 text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-xl leading-relaxed font-normal"
            >
              From custom headless e-commerce to full-stack platforms and automated cloud systems,
              our 20-member dedicated engineering team architects digital dominance for ambitious brands.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-9 flex items-center w-full sm:w-auto"
            >
              <Link
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#050A0B] bg-[#00D6A0] hover:bg-[#10B981] transition-all duration-300 shadow-[0_4px_24px_rgba(0,214,160,0.3)] hover:shadow-[0_8px_32px_rgba(0,214,160,0.45)] hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                <span className="font-mono font-bold tracking-widest text-[11px] sm:text-xs">
                  EXPLORE OUR WORK
                </span>
                <div className="w-5 h-5 rounded-full bg-[#050A0B]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#050A0B] stroke-[2.5]" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D Holographic Planetary Tech Globe */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full py-4 sm:py-6 lg:py-0 overflow-visible">
            <TechGlobe />
          </div>

        </div>

        {/* =========================================================================
            EDITORIAL HORIZONTAL STATISTICS STRIP (SEAMLESS, CARDLESS, REFINED)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 lg:pt-14 border-t border-white/[0.08] w-full"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-0">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="group relative flex flex-col justify-start lg:px-8 xl:px-12 lg:first:pl-0 lg:last:pr-0 lg:border-r lg:border-white/[0.08] lg:last:border-r-0 cursor-default"
              >
                {/* Large Numerical Typography with Smooth Count-Up & Emerald Hover Highlight */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black font-mono tracking-tight text-white group-hover:text-[#00D6A0] transition-colors duration-300">
                  <AnimatedCounter value={stat.value} duration={1.6 + idx * 0.15} />
                </div>

                {/* Descriptive Metric Label */}
                <div className="text-xs sm:text-sm md:text-base font-semibold text-slate-200 mt-2 sm:mt-2.5 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Supporting Metadata Subtext */}
                <div className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5 sm:mt-1">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
