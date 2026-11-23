"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function AboutHero() {
  const headlineWords = [
    "The",
    "Agency",
    "Built",
    "For",
    "Businesses",
    "That",
    "Outgrow",
    "Agencies.",
  ];

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-white dark:bg-[#071321] text-[#10243A] dark:text-slate-100 transition-colors duration-300">
      {/* Ambient background accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#00C99A]/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-slate-100 dark:bg-[#0B1929] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Editorial Narrative, Headline & Primary CTAs
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#00A980] dark:bg-[#00C99A] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A980] dark:text-[#00C99A] font-bold">
                EST. 2017 // DEHRADUN LABS
              </span>
            </motion.div>

            {/* Kinetic Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-black tracking-tight leading-[1.08] text-[#10243A] dark:text-white">
              <span className="flex flex-wrap">
                {headlineWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + idx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-3 sm:mr-4 ${
                      word === "Outgrow"
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00A980] via-[#10B981] to-teal-500 dark:from-[#00C99A] dark:via-[#34D399] dark:to-teal-200"
                        : word === "Agencies."
                        ? "text-[#00A980] dark:text-[#00C99A]"
                        : "text-[#10243A] dark:text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Official Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-[#8999AD] leading-relaxed max-w-2xl font-normal"
            >
              Founded in 2017, Grandeur Net is a digital engineering company based in Dehradun,
              building scalable digital experiences, intelligent platforms, and growth-focused
              technology solutions for ambitious businesses.
            </motion.p>

            {/* Credibility Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-mono text-slate-600 dark:text-[#8999AD]"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A980] dark:text-[#00C99A]" />
                <span className="text-slate-800 dark:text-slate-200 font-semibold">100% In-House Builders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A980] dark:text-[#00C99A]" />
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Full IP & Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00A980] dark:text-[#00C99A]" />
                <span className="text-slate-800 dark:text-slate-200 font-semibold">5 Global Markets</span>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {/* Button 1: Explore Our Work */}
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#05090B] bg-gradient-to-r from-[#00C99A] to-[#00BF8F] hover:from-[#10B981] hover:to-[#00C99A] shadow-lg shadow-[#00C99A]/20 hover:shadow-[#00C99A]/35 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="font-bold">Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
              </Link>

              {/* Button 2: Start a Conversation */}
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-[#0B1929] dark:hover:bg-[#0E2238] border border-slate-300 dark:border-white/[0.12] hover:border-[#00A980] dark:hover:border-[#00C99A]/50 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <span>Start a Conversation</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A980] dark:bg-[#00C99A]" />
              </Link>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: High-Quality Founder Showcase with Refined Frame
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Sophisticated Image Frame Container */}
            <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-white/[0.08] dark:to-transparent border border-slate-200 dark:border-white/[0.08] shadow-xl shadow-slate-200/50 dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              {/* Inner Image Card */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-[#0B1929] aspect-[4/5] sm:aspect-[3/4] w-full">
                {/* Genuine Founder & CEO Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://grandeurnet.com/images/founder&ceo.jpeg"
                  alt="Grandeur Net Founder & CEO"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Corner Floating Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#071321]/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-xs font-mono text-slate-800 dark:text-slate-200 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#00A980] dark:text-[#00C99A]" />
                  <span>Dehradun, India</span>
                </div>

                {/* Bottom Founder Details Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#071321]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A980] dark:text-[#00C99A] font-bold">
                      Direct Leadership
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Est. 2017</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#10243A] dark:text-white tracking-tight">
                    Founder & CEO
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#8999AD] mt-0.5">
                    Strategic Architecture & Engineering Guild Lead
                  </p>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 z-30 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#00C99A]/40 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#00C99A]/15 border border-emerald-200 dark:border-[#00C99A]/40 flex items-center justify-center text-[#00A980] dark:text-[#00C99A]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#10243A] dark:text-white leading-none">
                    8+ Years in Market
                  </div>
                  <div className="text-[10px] font-mono text-[#00A980] dark:text-[#00C99A] leading-none mt-1">
                    250+ Deployments
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
