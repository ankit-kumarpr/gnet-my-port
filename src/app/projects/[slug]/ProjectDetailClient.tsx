"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Quote,
  Check,
  Zap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Globe,
  Milestone,
} from "lucide-react";
import { Project, getProjectBySlug } from "@/data/projects";
import ProjectMockupImage from "@/components/ProjectMockupImage";

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const [activeTab, setActiveTab] = useState<"process" | "stack" | "results">("process");

  if (!project) return null;

  return (
    <div className="space-y-12">
      {/* 1. VISUAL MOCKUP WITH CIRCULAR TECH OVERLAY */}
      <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Interactive System Architecture
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Live Mockup & Tech Constellation
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Click &ldquo;Explore Stack&rdquo; to expand radial circular API nodes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ProjectMockupImage
            projectId={project.id}
            client={project.client}
            title={project.title}
            accentColor={project.accentColor}
            technologies={project.technologies}
            deliveryDays={project.deliveryDays}
          />
        </div>
      </div>

      {/* 2. TABBED DEEP DIVE CONTROLS */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("process")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "process"
                ? "bg-brand-green text-brand-dark shadow-md shadow-brand-green/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Delivery Roadmap ({project.processPhases.length} Phases)</span>
          </button>

          <button
            onClick={() => setActiveTab("stack")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "stack"
                ? "bg-brand-green text-brand-dark shadow-md shadow-brand-green/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Matrix ({project.technologies.length} Stacks)</span>
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "results"
                ? "bg-brand-green text-brand-dark shadow-md shadow-brand-green/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Milestones & Impact</span>
          </button>
        </div>
      </div>

      {/* TAB 1: STEP-BY-STEP DELIVERY ROADMAP */}
      {activeTab === "process" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Step-by-Step Delivery Process
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every milestone is planned, coded, audited, and deployed within our strict sprint timelines.
            </p>
          </div>

          <div className="space-y-4">
            {project.processPhases.map((phase, pIdx) => (
              <div
                key={phase.phase}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-brand-green/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-brand-green text-brand-dark font-mono text-sm font-black flex items-center justify-center shrink-0 shadow-md shadow-brand-green/20">
                      {pIdx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-brand-green uppercase font-bold tracking-wider">
                        {phase.phase}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white">
                        {phase.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30 shrink-0 self-start sm:self-auto">
                    {phase.days}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 pl-11 mb-5 leading-relaxed">
                  {phase.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pl-11 grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {phase.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 2: TECH MATRIX & ARCHITECTURE */}
      {activeTab === "stack" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Full Technology Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Modern frontend frameworks, distributed databases, real-time caches, and edge infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-brand-green/40 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors">
                        {tech.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        Verified Production Stack
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {tech.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* TAB 3: MILESTONES & CLIENT IMPACT */}
      {activeTab === "results" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Milestone checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Milestone className="w-5 h-5 text-brand-green" />
              <span>Verified Milestone Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.milestones.map((m) => (
                <div
                  key={m.name}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-bold text-white">{m.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-green font-semibold">
                    {m.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial Quote */}
          {project.clientQuote && (
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy/90 via-[#0a1828] to-brand-navy/90 border border-brand-green/30 relative overflow-hidden">
              <Quote className="w-12 h-12 text-brand-green/20 absolute top-4 right-6 pointer-events-none" />
              <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed mb-6 max-w-3xl">
                &ldquo;{project.clientQuote.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green text-brand-dark font-black font-mono flex items-center justify-center text-sm">
                  {project.clientQuote.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {project.clientQuote.author}
                  </div>
                  <div className="text-xs font-mono text-brand-green">
                    {project.clientQuote.role}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
