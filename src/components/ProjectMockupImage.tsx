"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Activity,
  ArrowUpRight,
  Eye,
  Layers,
  Cpu,
} from "lucide-react";
import { TechItem } from "@/data/projects";

interface ProjectMockupProps {
  projectId: string;
  client: string;
  title: string;
  image?: string;
  accentColor: string;
  technologies: TechItem[];
  deliveryDays: string;
}

export default function ProjectMockupImage({
  projectId,
  client,
  title,
  image,
  accentColor,
  technologies,
  deliveryDays,
}: ProjectMockupProps) {
  const [showCircularTech, setShowCircularTech] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  // Fallback high-res image if none passed
  const displayImage =
    image ||
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop";

  // Coordinates calculation for radial circle fan-out
  const radius = 86; // px radius for circular constellation
  const totalItems = technologies.length;

  return (
    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-md group/image select-none">
      {/* ---------------------------------------------------------------------- */}
      {/* 1. TOP BROWSER CHROME FRAME WITH GLASSMORPHISM                        */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute top-0 inset-x-0 z-20 h-7 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
          <span className="ml-2 text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
            grandeurnet.com/{projectId}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
            Verified Production
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. REAL PROJECT SHOWCASE IMAGE WITH HOVER ZOOM & OVERLAY              */}
      {/* ---------------------------------------------------------------------- */}
      <div
        onClick={() => setShowCircularTech(!showCircularTech)}
        className="relative w-full h-full pt-7 cursor-pointer overflow-hidden"
      >
        {/* Actual Project Visual Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImage}
          alt={`${client} — ${title}`}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover/image:scale-108 group-hover/image:brightness-95"
          loading="lazy"
        />

        {/* Ambient Gradient Overlays for Luxury Contrast */}
        <div className="absolute inset-0 pt-7 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 pt-7 bg-emerald-950/15 mix-blend-overlay pointer-events-none" />

        {/* Floating Quick Interactive Trigger Badge (Center or Bottom) */}
        {!showCircularTech && (
          <div className="absolute inset-0 pt-7 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-slate-900/90 text-white border border-emerald-400/50 backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center gap-2 pointer-events-auto cursor-pointer group-hover/image:border-emerald-300 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-spin-slow">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="text-xs font-mono font-bold tracking-wide">
                Click to Animate Tech Stack
              </span>
            </motion.div>
          </div>
        )}

        {/* Bottom Metadata Ribbon (Delivery Days & Client) */}
        {!showCircularTech && (
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 font-bold border border-white/10">
              {deliveryDays} Turnaround
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
              {totalItems} Microservices
            </span>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. INTERACTIVE CIRCULAR RADIAL TECH CONSTELLATION OVERLAY              */}
      {/* ---------------------------------------------------------------------- */}
      <AnimatePresence>
        {showCircularTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pt-7 z-30 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 select-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCircularTech(false);
              }
            }}
          >
            {/* Close Cross Button Top-Right */}
            <button
              onClick={() => setShowCircularTech(false)}
              className="absolute top-9 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-40"
              aria-label="Close tech view"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Glowing Laser Orbit Track Lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              {/* Outer Orbital Guide Circle */}
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="none"
                stroke="rgba(16, 185, 129, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-spin-slow origin-center"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius + 18}
                fill="none"
                stroke="rgba(56, 189, 248, 0.12)"
                strokeWidth="1"
              />

              {/* Laser connecting lines from center to each node */}
              {technologies.map((_, idx) => {
                const angle = (idx * 2 * Math.PI) / totalItems - Math.PI / 2;
                return (
                  <line
                    key={idx}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${Math.cos(angle) * radius}px)`}
                    y2={`calc(50% + ${Math.sin(angle) * radius}px)`}
                    stroke="rgba(16, 185, 129, 0.45)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                );
              })}
            </svg>

            {/* Central Orbital Hub */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={() => setShowCircularTech(false)}
              className="relative z-20 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-brand-dark flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.85)] cursor-pointer group"
              title="Click to minimize"
            >
              <span className="text-[8px] font-mono uppercase font-black tracking-wider">
                CORE
              </span>
              <span className="text-xs font-black leading-none">STACK</span>
              <span className="text-[8px] font-mono text-emerald-950 font-bold mt-0.5">
                {totalItems} APIS
              </span>
            </motion.div>

            {/* Orbiting Radial Tech Nodes */}
            {technologies.map((tech, idx) => {
              const angle = (idx * 2 * Math.PI) / totalItems - Math.PI / 2;
              const posX = Math.cos(angle) * radius;
              const posY = Math.sin(angle) * radius;
              const Icon = tech.icon;
              const isSelected = selectedTech?.name === tech.name;

              return (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    x: posX,
                    y: posY,
                  }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: idx * 0.04,
                  }}
                  className="absolute z-30"
                  style={{
                    left: "calc(50% - 20px)",
                    top: "calc(50% - 20px)",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTech(isSelected ? null : tech);
                    }}
                    onMouseEnter={() => setSelectedTech(tech)}
                    className={`relative w-10 h-10 rounded-full bg-slate-900 border-2 transition-all duration-200 flex items-center justify-center shadow-lg group cursor-pointer ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-500 text-brand-dark scale-115 shadow-[0_0_20px_rgba(16,185,129,0.9)]"
                        : "border-emerald-500/50 text-white hover:border-emerald-400 hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    }`}
                    aria-label={tech.name}
                  >
                    <Icon className="w-4 h-4" />

                    {/* Small Pulsing Ring */}
                    <span className="absolute -inset-1 rounded-full border border-emerald-400/40 animate-ping opacity-60 pointer-events-none" />
                  </button>

                  {/* Tooltip Pill */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-11 whitespace-nowrap pointer-events-none z-40">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/95 text-white border border-emerald-500/40 font-mono text-[9px] font-bold shadow-lg">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom Floating Info Pill for Selected Node */}
            <div className="absolute bottom-2 left-4 right-4 z-40 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-900/95 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-semibold backdrop-blur-md shadow-lg">
                {selectedTech
                  ? `${selectedTech.name} — ${selectedTech.detail}`
                  : "Tap any circular node to inspect architecture"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
