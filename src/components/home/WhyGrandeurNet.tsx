"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Layers,
  HeartHandshake,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Terminal,
  Activity,
  Sparkles,
} from "lucide-react";

interface StrengthItem {
  title: string;
  category: string;
  description: string;
  icon: any;
  highlight: string;
}

const STRENGTHS: StrengthItem[] = [
  {
    title: "Engineering-First Mindset",
    category: "CRAFT & DISCIPLINE",
    description:
      "We build with strict TypeScript type safety, modular component architectures, and clean codebases engineered for zero technical debt and effortless team handover.",
    icon: Terminal,
    highlight: "Zero vendor lock-in",
  },
  {
    title: "Performance-Focused Development",
    category: "SPEED AS A FEATURE",
    description:
      "Every millisecond impacts conversion rates. We tune Core Web Vitals to 95+ scores, optimize client-side bundle sizes, and deploy distributed edge caching.",
    icon: Zap,
    highlight: "Sub-second load targets",
  },
  {
    title: "Scalable Architecture",
    category: "BUILT FOR GROWTH",
    description:
      "From serverless edge endpoints to distributed relational databases, our systems scale gracefully from first hundreds to millions of daily requests.",
    icon: Layers,
    highlight: "Microservices & Serverless",
  },
  {
    title: "User-Centered Design",
    category: "CONVERSION BY DESIGN",
    description:
      "We design interfaces that respect human cognitive load, crafting frictionless user journeys and high-converting checkout flows with aesthetic restraint.",
    icon: HeartHandshake,
    highlight: "High-retention UX",
  },
  {
    title: "Transparent Collaboration",
    category: "RADICAL VISIBILITY",
    description:
      "No communication barriers. You get direct access to your lead engineers via dedicated Slack channels, weekly live staging demos, and transparent sprint boards.",
    icon: ShieldCheck,
    highlight: "Direct builder access",
  },
  {
    title: "Long-Term Technical Support",
    category: "ENDURING RELIABILITY",
    description:
      "We do not disappear at launch. Every project is backed by proactive uptime monitoring, security patch management, and dedicated post-release hypercare.",
    icon: Headphones,
    highlight: "60-day post-launch care",
  },
];

export default function WhyGrandeurNet() {
  return (
    <section id="why-us" className="py-24 px-6 md:px-12 bg-[#05090C] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#00C995]/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Heading & Narrative Intro */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1728] border border-[#00C995]/30 text-[#00E5A0] text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#00C995]" />
            <span>// THE GRANDEUR NET DIFFERENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Built With Precision.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C995] to-[#00E5A0]">
              Driven By Possibility.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
            How our engineering-first culture delivers commercial advantages that outlast conventional agency cycles.
          </p>
        </div>

        {/* Editorial Split: Abstract 3D Architecture Visual + Core Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Abstract 3D Technical Architectural Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0D1927] to-[#080F18] border border-white/[0.1] p-8 overflow-hidden shadow-2xl">
              {/* Circuit Matrix Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#00C99518_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Glowing Ambient Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#00C995]/20 blur-[60px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Visual Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">
                      SYSTEM ARCHITECTURE // V4
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00E5A0]">ACTIVE NODE</span>
                </div>

                {/* 3D Isometric Geometric Layered Diagram */}
                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                  {/* Layer 1: Client Application Layer */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full p-4 rounded-xl bg-[#0B1728]/90 border border-[#00C995]/50 shadow-lg text-center relative"
                  >
                    <div className="text-[10px] font-mono text-[#00E5A0] uppercase">
                      LAYER 01 // EXPERIENCE
                    </div>
                    <div className="text-sm font-bold text-white">Next.js App Router & 60fps UI</div>
                  </motion.div>

                  {/* Vertical Connecting Connector */}
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#00C995] to-[#38bdf8]" />

                  {/* Layer 2: API & Service Fabric */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="w-[90%] p-4 rounded-xl bg-[#080F18]/90 border border-[#38bdf8]/40 shadow-lg text-center"
                  >
                    <div className="text-[10px] font-mono text-[#38bdf8] uppercase">
                      LAYER 02 // LOGIC FABRIC
                    </div>
                    <div className="text-sm font-bold text-white">Distributed REST & GraphQL Edge</div>
                  </motion.div>

                  {/* Vertical Connecting Connector */}
                  <div className="w-0.5 h-6 bg-gradient-to-b from-[#38bdf8] to-[#818cf8]" />

                  {/* Layer 3: Persistent Relational Ledger */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="w-[80%] p-4 rounded-xl bg-[#060B12]/95 border border-[#818cf8]/40 shadow-lg text-center"
                  >
                    <div className="text-[10px] font-mono text-[#818cf8] uppercase">
                      LAYER 03 // DATA STORE
                    </div>
                    <div className="text-sm font-bold text-white">PostgreSQL & Redis Cache</div>
                  </motion.div>
                </div>

                {/* Real-time Telemetry Status Bar */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08] text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#05090C] border border-white/[0.06]">
                    <div className="text-[#A7B5C5] text-[10px]">UPTIME SLA</div>
                    <div className="text-white font-bold text-sm">99.99%</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#05090C] border border-white/[0.06]">
                    <div className="text-[#A7B5C5] text-[10px]">P95 LATENCY</div>
                    <div className="text-[#00E5A0] font-bold text-sm">&lt; 120ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Core Editorial Strengths */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STRENGTHS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="p-5 sm:p-6 rounded-2xl bg-[#080F18]/80 border border-white/[0.08] hover:border-[#00C995]/40 transition-colors group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1728] border border-white/[0.08] flex items-center justify-center text-[#00C995] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#00E5A0] bg-[#00C995]/10 px-2 py-0.5 rounded border border-[#00C995]/20">
                      {item.highlight}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono tracking-wider text-[#A7B5C5] uppercase">
                    {item.category}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00E5A0] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A7B5C5] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
