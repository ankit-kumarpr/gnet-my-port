"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartHandshake,
  Users2,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";
import Link from "next/link";

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  bulletPoints: string[];
  clientBenefit: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Outcomes Over Output",
    subtitle: "Evaluated By Revenue, Leads & Commercial Growth",
    description:
      "We evaluate our success by what actually changes for your business — revenue growth, qualified leads, and customer retention — not by the volume of hours logged or meaningless deliverables produced.",
    icon: Zap,
    bulletPoints: [
      "KPI-driven sprint goals tied directly to conversion metrics",
      "Rigorous sub-second performance budgets for real business ROI",
      "Strategic technical advisory focused on bottom-line profitability",
    ],
    clientBenefit: "Tangible Commercial ROI",
  },
  {
    number: "02",
    title: "Radical Transparency",
    subtitle: "Real-Time Sprint Telemetry & Zero Hidden Markups",
    description:
      "No opaque reporting, no hidden markups, and zero surprises. You get real-time visibility into active sprint progress, transparent milestone velocity, and open communication across every deployment phase.",
    icon: Clock,
    bulletPoints: [
      "Direct Slack/Discord access to the senior engineers building your app",
      "Full access to live sprint tracking, commit logs, and roadmaps",
      "Weekly developer-recorded walkthrough videos demonstrating progress",
    ],
    clientBenefit: "100% Clarity & Predictability",
  },
  {
    number: "03",
    title: "You Own Everything (100% IP)",
    subtitle: "All Code, Assets & Infrastructure Belong to You",
    description:
      "All work, source code, design systems, and intellectual property produced during our engagement are 100% yours from day one. No proprietary platform lock-in, no hostage code, and zero complex handoff terms.",
    icon: Code2,
    bulletPoints: [
      "Clean TypeScript codebases deployed directly to your GitHub/Vercel/AWS",
      "Zero vendor lock-in with standard open-source industry tools",
      "Full architectural handover sessions and recorded team onboarding",
    ],
    clientBenefit: "Uncompromised Asset Ownership",
  },
  {
    number: "04",
    title: "Craft, Accelerated",
    subtitle: "Automated Workflows Free Senior Minds for Deep Solutions",
    description:
      "We embrace cutting-edge tooling and automated CI/CD pipelines to eliminate repetitive busywork — freeing our senior engineers and designers to focus on deep, nuanced creative and technical problem-solving.",
    icon: Sparkles,
    bulletPoints: [
      "Automated linting, testing, and edge deployments on every commit",
      "Strict 14-day agile sprint cadences with clickable staging URLs",
      "Zero junior handoffs — your project is guided by battle-tested builders",
    ],
    clientBenefit: "High-Velocity Engineering",
  },
  {
    number: "05",
    title: "60-Day Post-Launch Hypercare",
    subtitle: "Ongoing Performance, Security & Conversion Audits",
    description:
      "Launch day is not goodbye. We stand behind our deliverables with 60 days of guaranteed post-launch hypercare, resolving edge cases and continuously optimizing Core Web Vitals under real-world traffic.",
    icon: ShieldCheck,
    bulletPoints: [
      "99.98% production uptime SLA monitoring and alert triggers",
      "Real-user Core Web Vitals telemetry tracking under live load",
      "Priority patch warranty and security auditing for 60 full days",
    ],
    clientBenefit: "Zero Launch Anxiety & SLA Security",
  },
];

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metricHighlight: string;
  projectRef: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Grandeur Net delivered what two previous agencies failed to accomplish in 8 months. Their direct-to-engineer model meant our custom furniture configurator launched 2 weeks ahead of schedule with flawless sub-second load times.",
    author: "Rajesh Malhotra",
    role: "Managing Director",
    company: "Kraftwood India",
    metricHighlight: "+185% Online Conversion Lift",
    projectRef: "Kraftwood Luxury E-Commerce",
  },
  {
    quote:
      "The transparency was unmatched. We could see tickets moving in Linear every single day. When we scaled our vehicle fleet to peak tourist season, their Next.js architecture handled 50,000+ daily searches without a hitch.",
    author: "Gaurav Thapa",
    role: "Chief Operating Officer",
    company: "GT Travels Mobility",
    metricHighlight: "99.98% System Uptime Across Peak Season",
    projectRef: "GT Travels Fleet Platform",
  },
  {
    quote:
      "Working with Grandeur Net felt like having an elite in-house CTO team in Dehradun. They don't just write code; they challenge your assumptions and optimize for real business profitability.",
    author: "Dr. A. K. Nautiyal",
    role: "Founder & Director",
    company: "Zenith Diagnostics",
    metricHighlight: "-65% Lab Report Delivery Time",
    projectRef: "Zenith Telehealth Platform",
  },
];

export default function ClientHappinessSection() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-28 px-4 sm:px-6 md:px-12 bg-brand-surface relative overflow-hidden">
      {/* Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-brand-green/[0.04] rounded-full blur-[170px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-brand-navy/60 rounded-full blur-[150px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/90 border border-brand-green/40 text-brand-green font-mono text-[10px] font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-green" />
            <span>The Client Happiness Blueprint</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            How We Keep Our Clients <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-teal-300 to-emerald-200">
              Profitable, Delighted & Long-Term
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Our 98.4% client retention rate is not accidental. It is engineered through five strict operational principles that respect your time, capital, and commercial objectives.
          </p>
        </div>

        {/* 5 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Pillar Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;

              return (
                <button
                  key={pillar.number}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer select-none ${
                    isSelected
                      ? "bg-gradient-to-r from-[#0d1f30] to-[#071322] border-brand-green shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] scale-[1.02]"
                      : "bg-[#08101c]/80 border-white/[0.08] hover:border-white/[0.18] hover:bg-[#0c1626]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 truncate">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-green text-brand-dark"
                          : "bg-brand-navy border border-brand-green/30 text-brand-green"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          PILLAR {pillar.number}
                        </span>
                      </div>
                      <div
                        className={`text-sm font-bold truncate transition-colors ${
                          isSelected ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {pillar.title}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2 border transition-all ${
                      isSelected
                        ? "bg-brand-green border-brand-green text-brand-dark"
                        : "border-white/10 text-slate-500"
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Pillar Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-[#0e1d2e] via-[#091522] to-[#050b14] border-2 border-brand-green/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden"
              >
                {/* Tech Reticles */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-green" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-green" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-green" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-green" />

                {/* Header badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-radar" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-green">
                      PILLAR {PILLARS[activePillar].number} SPECIFICATION
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-green/10 text-emerald-300 border border-brand-green/30">
                    {PILLARS[activePillar].clientBenefit}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                  {PILLARS[activePillar].title}
                </h3>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-4">
                  {PILLARS[activePillar].subtitle}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {PILLARS[activePillar].description}
                </p>

                {/* Bullet Checklist */}
                <div className="space-y-3 pt-4 border-t border-white/[0.06] mb-8">
                  {PILLARS[activePillar].bulletPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-green/10 border border-brand-green/40 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Assurance Card */}
                <div className="p-4 rounded-2xl bg-brand-navy/80 border border-brand-green/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-brand-green shrink-0" />
                    <span className="text-xs font-mono text-slate-300">
                      Standard across all Grandeur Net client engagements with contractual SLA backing.
                    </span>
                  </div>

                  <Link
                    href="/#contact"
                    className="text-xs font-mono font-bold text-brand-green hover:underline whitespace-nowrap shrink-0 flex items-center gap-1"
                  >
                    <span>Request Discovery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* VERIFIED CLIENT VOICES CAROUSEL / HIGHLIGHT ROW */}
        <div className="mt-20 pt-16 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-brand-green font-bold flex items-center gap-1.5 mb-1">
                <Quote className="w-3.5 h-3.5 text-brand-green" />
                <span>Verified Client Endorsements</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                What Founders Say About <span className="text-brand-green">Working With Us</span>
              </h3>
            </div>

            {/* Testimonial Nav dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setActiveTestimonial(tIdx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === tIdx
                      ? "w-8 bg-brand-green shadow-[0_0_10px_#10b981]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Testimonial ${tIdx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  activeTestimonial === idx
                    ? "bg-gradient-to-b from-[#0d1e2e] to-[#071322] border-brand-green/70 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.25)]"
                    : "bg-[#09111e]/90 border-white/[0.08] hover:border-white/[0.18]"
                }`}
              >
                <div>
                  {/* Rating Stars & Metric Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-emerald-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                      {t.metricHighlight}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {t.role}, <span className="text-emerald-400 font-semibold">{t.company}</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase text-right">
                    Verified Partner
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
