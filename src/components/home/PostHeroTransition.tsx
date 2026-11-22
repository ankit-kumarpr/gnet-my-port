"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, ShieldCheck, Zap, ArrowDown, Activity } from "lucide-react";

const TELEMETRY_NODES = [
  { label: "ENGINEERING GUILD", value: "DEHRADUN LABS", status: "ONLINE", icon: Terminal },
  { label: "CORE WEB VITALS", value: "99/100 P95", status: "VERIFIED", icon: Zap },
  { label: "DEPLOYMENT CYCLES", value: "14-DAY CADENCE", status: "AGILE", icon: Cpu },
  { label: "INTELLECTUAL PROPERTY", value: "100% CLIENT OWNED", status: "SECURE", icon: ShieldCheck },
];

export default function PostHeroTransition() {
  return (
    <section className="relative py-20 px-6 md:px-12 bg-[#05090C] overflow-hidden border-t border-white/[0.06]">
      {/* Fine technical background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b172815_1px,transparent_1px),linear-gradient(to_bottom,#0b172815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle green ambient light streak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[180px] bg-[#00C995]/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Technical Metadata Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16"
        >
          {TELEMETRY_NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-xl bg-[#080F18]/80 border border-white/[0.08] backdrop-blur-sm flex items-center justify-between gap-3 group hover:border-[#00C995]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#0B1728] border border-white/[0.06] flex items-center justify-center text-[#00C995] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono tracking-wider text-[#A7B5C5] uppercase truncate">
                      {node.label}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                      {node.value}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C995] animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-[#00C995] uppercase hidden sm:inline">
                    {node.status}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Editorial Section Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1728]/80 border border-[#00C995]/30 text-[#00E5A0] text-xs font-mono font-medium"
          >
            <Activity className="w-3.5 h-3.5 text-[#00C995]" />
            <span>// ARCHITECTURE & CRAFT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Engineering Ideas Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C995] to-[#00E5A0]">
              Digital Reality.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A7B5C5] leading-relaxed font-normal"
          >
            We combine engineering precision, thoughtful design and modern technology to build digital products that help ambitious businesses move forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex justify-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#A7B5C5] hover:text-[#00C995] transition-colors py-2 px-4 rounded-full border border-white/[0.08] hover:border-[#00C995]/40"
            >
              <span>DISCOVER SELECTED WORKS</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
