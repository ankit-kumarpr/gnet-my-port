"use client";

import { motion } from "framer-motion";

interface Service3DObjectProps {
  serviceId: string;
  isActive: boolean;
}

export default function Service3DObject({ serviceId, isActive }: Service3DObjectProps) {
  switch (serviceId) {
    case "web-development":
      return <WebDev3DObject isActive={isActive} />;
    case "ecommerce-development":
      return <Ecommerce3DObject isActive={isActive} />;
    case "application-development":
      return <AppDev3DObject isActive={isActive} />;
    case "software-development":
      return <SoftwareDev3DObject isActive={isActive} />;
    case "seo-digital-marketing":
      return <SeoMarketing3DObject isActive={isActive} />;
    case "uiux-branding":
      return <UiUx3DObject isActive={isActive} />;
    default:
      return <WebDev3DObject isActive={isActive} />;
  }
}

/* -------------------------------------------------------------------------- */
/* 1. WEB DEVELOPMENT: 3D Dimensional Code Symbol & Browser Interface         */
/* -------------------------------------------------------------------------- */
function WebDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      {/* Ambient Radial Backlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D6A0]/15 to-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating 3D Browser Chassis */}
      <motion.div
        animate={
          isActive
            ? {
                rotateY: [-8, 6, -8],
                rotateX: [6, -4, 6],
                y: [-4, 4, -4],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 sm:w-56 h-32 sm:h-36 rounded-xl bg-gradient-to-br from-[#0c1b26]/90 to-[#050a0f]/95 border border-white/15 p-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(0,214,160,0.12)] backdrop-blur-xl"
      >
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]/80" />
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]/80" />
            <span className="w-2 h-2 rounded-full bg-[#10B981]/80" />
          </div>
          <div className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-[9px] font-mono text-slate-300">
            next.config.ts
          </div>
        </div>

        {/* Sculptural 3D Code Symbol (< / >) */}
        <div className="relative h-16 sm:h-20 flex items-center justify-center">
          <motion.div
            style={{ transform: "translateZ(24px)" }}
            className="flex items-center gap-2 sm:gap-2.5 text-2xl sm:text-3xl font-black font-mono tracking-tighter text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="text-[#38BDF8]">&lt;</span>
            <span className="text-[#00D6A0] animate-pulse">/</span>
            <span className="text-[#38BDF8]">&gt;</span>
          </motion.div>

          {/* Floating Token Badges */}
          <motion.div
            style={{ transform: "translateZ(38px)" }}
            className="absolute -bottom-2 -left-2 px-2 py-0.5 rounded-full bg-[#00D6A0]/15 border border-[#00D6A0]/40 text-[9px] font-mono text-[#00D6A0] shadow-md backdrop-blur-md"
          >
            SSR • 99
          </motion.div>
          <motion.div
            style={{ transform: "translateZ(34px)" }}
            className="absolute -top-1 -right-2 px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-[9px] font-mono text-sky-300 shadow-md backdrop-blur-md"
          >
            v14.2
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. E-COMMERCE: Sculptural Glass Shopping Bag & Fast Commerce Interface     */
/* -------------------------------------------------------------------------- */
function Ecommerce3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/15 to-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [6, -8, 6],
                rotateX: [-4, 6, -4],
                y: [4, -4, 4],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-44 sm:w-48 h-36 sm:h-40 flex flex-col items-center justify-center"
      >
        {/* Sculptural Metallic Bag Handle */}
        <div className="w-14 sm:w-16 h-8 sm:h-9 rounded-t-full border-2 border-[#00D6A0] border-b-0 -mb-1 shadow-[0_0_12px_rgba(0,214,160,0.4)]" />

        {/* Translucent Glass Shopping Bag Body */}
        <div className="relative w-full h-28 sm:h-32 rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] border border-white/20 p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
          {/* Subtle Diagonal Specular Reflection Line */}
          <div className="absolute -top-12 -left-12 w-28 h-48 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

          {/* Bag Internal Card Specimen */}
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
            <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400 font-semibold">Storefront</span>
            <span className="text-[10px] font-mono font-bold text-white">$480.00</span>
          </div>

          {/* Floating Instant Checkout Badge */}
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="my-auto py-1.5 px-2.5 rounded-lg bg-[#00D6A0]/15 border border-[#00D6A0]/40 flex items-center justify-between text-[#00D6A0]"
          >
            <span className="text-[10px] font-mono font-bold">1-Click Checkout</span>
            <span className="w-2 h-2 rounded-full bg-[#00D6A0] animate-ping" />
          </motion.div>

          {/* Bottom Bar: Secure Payment Token */}
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>PCI Level 1</span>
            <span className="text-emerald-400 font-bold">+42% CVR</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. APPLICATION DEVELOPMENT: Premium 3D Mobile Device Interface            */
/* -------------------------------------------------------------------------- */
function AppDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [-10, 8, -10],
                rotateX: [6, -5, 6],
                y: [-5, 5, -5],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-36 sm:w-40 h-36 sm:h-40 rounded-[28px] bg-gradient-to-b from-[#0c1824] to-[#04080c] border-2 border-white/20 p-2 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9),0_0_25px_rgba(56,189,248,0.15)] flex flex-col justify-between"
      >
        {/* Dynamic Island Pill */}
        <div className="w-12 h-2.5 bg-black rounded-full mx-auto flex items-center justify-center gap-1">
          <span className="w-1 h-1 rounded-full bg-sky-400" />
        </div>

        {/* Mobile Screen Content */}
        <div className="space-y-1.5 px-1 py-1">
          <div className="h-10 rounded-xl bg-gradient-to-r from-sky-500/20 to-emerald-500/10 border border-white/10 p-1.5 flex flex-col justify-center">
            <span className="text-[8px] font-mono text-slate-400">FINTECH CORE</span>
            <span className="text-xs font-bold font-mono text-white">$142,850</span>
          </div>
          <div className="h-2 w-full bg-white/15 rounded" />
          <div className="h-2 w-3/4 bg-white/10 rounded" />
        </div>

        {/* Floating Biometric Badge */}
        <motion.div
          style={{ transform: "translateZ(26px)" }}
          className="absolute -right-3 top-6 px-2 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-[9px] font-mono text-sky-300 shadow-lg backdrop-blur-md"
        >
          60 FPS Fluid
        </motion.div>

        {/* Bottom Home Indicator */}
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-0.5" />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. SOFTWARE DEVELOPMENT: Interconnected Modular Architecture               */
/* -------------------------------------------------------------------------- */
function SoftwareDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateX: [12, 6, 12],
                rotateY: [-10, 10, -10],
                y: [4, -4, 4],
              }
            : { rotateX: 8, rotateY: 0, y: 0 }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 sm:w-52 h-32 sm:h-36 flex items-center justify-center"
      >
        {/* Central Core Hub */}
        <motion.div
          style={{ transform: "translateZ(25px)" }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1]/30 to-[#00D6A0]/20 border-2 border-[#00D6A0]/50 shadow-[0_0_25px_rgba(0,214,160,0.3)] flex flex-col items-center justify-center z-10 backdrop-blur-md"
        >
          <span className="text-[10px] font-mono font-bold text-white">API HUB</span>
          <span className="w-2 h-2 rounded-full bg-[#00D6A0] animate-ping mt-1" />
        </motion.div>

        {/* Orbiting Modular Microservice Nodes */}
        <motion.div
          style={{ transform: "translateZ(10px) translateX(-55px) translateY(-25px)" }}
          className="absolute p-1.5 rounded-lg bg-[#0c1524] border border-white/20 text-[9px] font-mono text-sky-300 shadow-md"
        >
          Auth/JWT
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(15px) translateX(55px) translateY(-25px)" }}
          className="absolute p-1.5 rounded-lg bg-[#0c1524] border border-white/20 text-[9px] font-mono text-indigo-300 shadow-md"
        >
          Kafka Bus
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(12px) translateX(-50px) translateY(30px)" }}
          className="absolute p-1.5 rounded-lg bg-[#0c1524] border border-white/20 text-[9px] font-mono text-emerald-300 shadow-md"
        >
          Postgres
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(18px) translateX(50px) translateY(30px)" }}
          className="absolute p-1.5 rounded-lg bg-[#0c1524] border border-white/20 text-[9px] font-mono text-amber-300 shadow-md"
        >
          AI Agent
        </motion.div>

        {/* Connecting Vector Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#00D6A0" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="25%" y1="80%" x2="50%" y2="50%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="75%" y1="80%" x2="50%" y2="50%" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SEO & MARKETING: Dimensional Analytics Visualization                     */
/* -------------------------------------------------------------------------- */
function SeoMarketing3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateX: [8, 4, 8],
                rotateY: [-8, 8, -8],
                y: [-3, 3, -3],
              }
            : { rotateX: 6, rotateY: 0, y: 0 }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 sm:w-54 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-[#07151b]/90 to-[#04090d]/95 border border-white/15 p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
          <span className="text-[9px] font-mono uppercase text-teal-400 font-bold">Search Visibility</span>
          <span className="text-[10px] font-mono font-bold text-[#00D6A0]">+320%</span>
        </div>

        {/* 3D Stepped Dimensional Histogram Bars */}
        <div className="flex items-end justify-between gap-2 h-16 px-1">
          <div className="w-6 h-6 rounded-t bg-gradient-to-t from-teal-500/40 to-teal-400/80 border border-teal-300/40" />
          <div className="w-6 h-9 rounded-t bg-gradient-to-t from-teal-500/50 to-teal-400/90 border border-teal-300/50" />
          <div className="w-6 h-12 rounded-t bg-gradient-to-t from-[#00D6A0]/60 to-[#00D6A0] border border-[#00D6A0]" />
          <div className="w-6 h-16 rounded-t bg-gradient-to-t from-[#00D6A0] to-emerald-300 border border-white shadow-[0_0_15px_rgba(0,214,160,0.4)]" />
        </div>

        {/* Floating Rank #1 Badge */}
        <motion.div
          style={{ transform: "translateZ(28px)" }}
          className="absolute -top-2.5 -right-2 px-2.5 py-0.5 rounded-full bg-[#00D6A0] text-[#050A0B] text-[9px] font-mono font-bold shadow-lg"
        >
          RANK #1
        </motion.div>

        <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 pt-1">
          <span>Q1 Baseline</span>
          <span className="text-white font-bold">1.8M Impressions</span>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. UI/UX & BRANDING: Elegant 3D Design Tool & Vector Pen Visual            */
/* -------------------------------------------------------------------------- */
function UiUx3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-44 sm:h-52 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EC4899]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [10, -10, 10],
                rotateX: [-5, 6, -5],
                y: [4, -4, 4],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-48 sm:w-52 h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-[#190c18]/90 to-[#0a0509]/95 border border-white/15 p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
          <span className="text-[9px] font-mono uppercase text-pink-400 font-bold">Design Tokens</span>
          <span className="text-[9px] font-mono text-slate-400">v2.8 Spec</span>
        </div>

        {/* Sculptural Vector Curve with Anchor Nodes */}
        <div className="relative h-14 flex items-center justify-center">
          <svg className="w-full h-12 overflow-visible">
            <path
              d="M 15 35 C 50 5, 110 5, 150 35"
              fill="none"
              stroke="#EC4899"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bezier control handles */}
            <circle cx="15" cy="35" r="4" fill="#00D6A0" stroke="white" strokeWidth="1.5" />
            <circle cx="82" cy="12" r="5" fill="#EC4899" stroke="white" strokeWidth="2" />
            <circle cx="150" cy="35" r="4" fill="#00D6A0" stroke="white" strokeWidth="1.5" />
          </svg>

          {/* Floating Pen Nib Glyph */}
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="absolute top-0 right-10 px-2 py-0.5 rounded bg-pink-500 text-white text-[8px] font-mono font-bold shadow-lg"
          >
            Vector Pen
          </motion.div>
        </div>

        {/* Color Palette Chips */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="w-5 h-2.5 rounded bg-[#00D6A0]" />
          <span className="w-5 h-2.5 rounded bg-[#EC4899]" />
          <span className="w-5 h-2.5 rounded bg-[#38BDF8]" />
          <span className="w-5 h-2.5 rounded bg-[#04080C] border border-white/30" />
          <span className="ml-auto text-[8px] font-mono text-slate-400">Tokens</span>
        </div>
      </motion.div>
    </div>
  );
}
