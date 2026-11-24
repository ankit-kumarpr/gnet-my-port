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
/* 1. WEB DEVELOPMENT: Sculptural 3D Glass Browser & Dimensional Code Glyph   */
/* -------------------------------------------------------------------------- */
function WebDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      {/* Subtle emerald ambient glow behind object */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D6A0]/15 to-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating 3D Browser Chassis */}
      <motion.div
        animate={
          isActive
            ? {
                rotateY: [-6, 6, -6],
                rotateX: [5, -4, 5],
                y: [-3, 3, -3],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-44 sm:w-52 h-28 sm:h-32 rounded-2xl bg-gradient-to-br from-[#0e1f2c]/90 to-[#04080c]/95 border border-white/[0.12] p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_30px_rgba(0,214,160,0.1)] backdrop-blur-xl flex flex-col justify-between"
      >
        {/* Top Minimalist Browser Dots */}
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-[#00D6A0]/60" />
          </div>
          <div className="w-16 h-1 rounded-full bg-white/[0.08]" />
        </div>

        {/* Sculptural Dimensional Code Symbol */}
        <div className="relative flex-1 flex items-center justify-center">
          <motion.div
            style={{ transform: "translateZ(26px)" }}
            className="flex items-center gap-2 sm:gap-3 text-3xl sm:text-4xl font-black font-mono tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
          >
            <span className="text-[#38BDF8]/90">&lt;</span>
            <span className="text-[#00D6A0] drop-shadow-[0_0_16px_rgba(0,214,160,0.6)]">/</span>
            <span className="text-[#38BDF8]/90">&gt;</span>
          </motion.div>
        </div>

        {/* Bottom subtle code lines */}
        <div className="space-y-1 pt-1 opacity-40">
          <div className="w-24 h-1 rounded-full bg-white/20" />
          <div className="w-16 h-1 rounded-full bg-[#00D6A0]/40" />
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. E-COMMERCE: Sculptural Translucent Glass Shopping Vessel                */
/* -------------------------------------------------------------------------- */
function Ecommerce3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/15 to-[#F59E0B]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [6, -6, 6],
                rotateX: [-4, 5, -4],
                y: [3, -3, 3],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-40 sm:w-44 h-32 sm:h-36 flex flex-col items-center justify-center"
      >
        {/* Sculptural Metallic Bag Handle */}
        <div className="w-14 sm:w-16 h-8 rounded-t-full border-2 border-[#00D6A0] border-b-0 -mb-1 shadow-[0_0_16px_rgba(0,214,160,0.35)]" />

        {/* Translucent Dark Glass Vessel */}
        <div className="relative w-full h-24 sm:h-28 rounded-2xl bg-gradient-to-b from-white/[0.10] to-white/[0.02] border border-white/[0.15] p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl flex flex-col justify-between overflow-hidden">
          {/* Subtle Diagonal Specular Reflection Line */}
          <div className="absolute -top-12 -left-12 w-28 h-48 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rotate-45 pointer-events-none" />

          {/* Floating Emerald Checkout Core */}
          <motion.div
            style={{ transform: "translateZ(26px)" }}
            className="my-auto mx-auto w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D6A0]/20 to-[#10B981]/40 border border-[#00D6A0]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,214,160,0.3)]"
          >
            <div className="w-4 h-4 rounded-full border-2 border-[#00D6A0] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            </div>
          </motion.div>

          {/* Bottom subtle tier lines */}
          <div className="flex items-center justify-between opacity-50 px-1">
            <div className="w-12 h-1 rounded-full bg-white/20" />
            <div className="w-6 h-1 rounded-full bg-[#00D6A0]/60" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. APPLICATION DEVELOPMENT: Sculptural 3D Mobile Device Chassis            */
/* -------------------------------------------------------------------------- */
function AppDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#38BDF8]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [-8, 8, -8],
                rotateX: [5, -4, 5],
                y: [-4, 4, -4],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-[24px] bg-gradient-to-b from-[#0c1824] to-[#04080c] border border-white/[0.15] p-2.5 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9),0_0_25px_rgba(56,189,248,0.15)] flex flex-col justify-between"
      >
        {/* Dynamic Island Notch */}
        <div className="w-10 h-2 bg-black rounded-full mx-auto flex items-center justify-center gap-1 border border-white/[0.08]">
          <span className="w-1 h-1 rounded-full bg-sky-400" />
        </div>

        {/* Mobile Screen Wireframe Layers */}
        <div className="space-y-2 px-1 py-1">
          <div className="h-8 rounded-xl bg-gradient-to-r from-sky-500/20 to-emerald-500/10 border border-white/[0.08] p-1.5 flex items-center justify-between">
            <div className="w-12 h-2 rounded bg-white/20" />
            <div className="w-4 h-4 rounded-full bg-[#00D6A0]/40" />
          </div>
          <div className="h-2 w-full bg-white/10 rounded" />
          <div className="h-2 w-3/4 bg-white/10 rounded" />
        </div>

        {/* Bottom Home Indicator */}
        <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-0.5" />
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. SOFTWARE DEVELOPMENT: Interconnected Modular Architecture & Nodes       */
/* -------------------------------------------------------------------------- */
function SoftwareDev3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateX: [10, 4, 10],
                rotateY: [-8, 8, -8],
                y: [3, -3, 3],
              }
            : { rotateX: 6, rotateY: 0, y: 0 }
        }
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-44 sm:w-48 h-28 sm:h-32 flex items-center justify-center"
      >
        {/* Central Hexagonal Core */}
        <motion.div
          style={{ transform: "translateZ(26px)" }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366F1]/30 to-[#00D6A0]/20 border border-[#00D6A0]/50 shadow-[0_0_30px_rgba(0,214,160,0.3)] flex items-center justify-center z-10 backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-lg border border-[#00D6A0] rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 rounded bg-[#00D6A0]" />
          </div>
        </motion.div>

        {/* Satellite Nodes */}
        <motion.div
          style={{ transform: "translateZ(12px) translateX(-48px) translateY(-20px)" }}
          className="absolute w-6 h-6 rounded-lg bg-[#0c1524] border border-white/20 flex items-center justify-center shadow-md"
        >
          <div className="w-2 h-2 rounded-full bg-sky-400" />
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(15px) translateX(48px) translateY(-20px)" }}
          className="absolute w-6 h-6 rounded-lg bg-[#0c1524] border border-white/20 flex items-center justify-center shadow-md"
        >
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(12px) translateX(-42px) translateY(24px)" }}
          className="absolute w-6 h-6 rounded-lg bg-[#0c1524] border border-white/20 flex items-center justify-center shadow-md"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </motion.div>

        <motion.div
          style={{ transform: "translateZ(18px) translateX(42px) translateY(24px)" }}
          className="absolute w-6 h-6 rounded-lg bg-[#0c1524] border border-white/20 flex items-center justify-center shadow-md"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400" />
        </motion.div>

        {/* Connecting Clean Geometric Vectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#00D6A0" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="30%" y1="75%" x2="50%" y2="50%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="70%" y1="75%" x2="50%" y2="50%" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SEO & MARKETING: Dimensional Stepped Histogram & Elevation Curve        */
/* -------------------------------------------------------------------------- */
function SeoMarketing3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateX: [6, 2, 6],
                rotateY: [-6, 6, -6],
                y: [-3, 3, -3],
              }
            : { rotateX: 4, rotateY: 0, y: 0 }
        }
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-44 sm:w-48 h-28 sm:h-32 rounded-2xl bg-gradient-to-br from-[#07151b]/90 to-[#04090d]/95 border border-white/[0.12] p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-[#00D6A0]" />
        </div>

        {/* 3D Stepped Histogram Pedestals */}
        <div className="flex items-end justify-between gap-2.5 h-14 px-2">
          <div className="w-5 h-5 rounded-t-md bg-gradient-to-t from-teal-500/30 to-teal-400/60 border border-teal-300/30" />
          <div className="w-5 h-8 rounded-t-md bg-gradient-to-t from-teal-500/40 to-teal-400/80 border border-teal-300/40" />
          <div className="w-5 h-11 rounded-t-md bg-gradient-to-t from-[#00D6A0]/50 to-[#00D6A0] border border-[#00D6A0]" />
          <div className="w-5 h-14 rounded-t-md bg-gradient-to-t from-[#00D6A0] to-emerald-300 border border-white shadow-[0_0_20px_rgba(0,214,160,0.5)]" />
        </div>

        <div className="flex items-center justify-between opacity-40 px-1 pt-1">
          <div className="w-16 h-1 rounded-full bg-white/20" />
          <div className="w-8 h-1 rounded-full bg-[#00D6A0]" />
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. UI/UX & BRANDING: Pure Sculptural Vector Curve & Palette Prisms         */
/* -------------------------------------------------------------------------- */
function UiUx3DObject({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-40 sm:h-44 flex items-center justify-center select-none perspective-[800px] overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#EC4899]/15 to-[#00D6A0]/10 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        animate={
          isActive
            ? {
                rotateY: [8, -8, 8],
                rotateX: [-4, 5, -4],
                y: [3, -3, 3],
              }
            : { rotateY: 0, rotateX: 0, y: 0 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-44 sm:w-48 h-28 sm:h-32 rounded-2xl bg-gradient-to-br from-[#190c18]/90 to-[#0a0509]/95 border border-white/[0.12] p-3 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-white/[0.08]">
          <div className="w-14 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
        </div>

        {/* Sculptural Vector Curve with Anchor Nodes */}
        <div className="relative h-12 flex items-center justify-center">
          <svg className="w-full h-10 overflow-visible">
            <path
              d="M 10 28 C 45 4, 95 4, 130 28"
              fill="none"
              stroke="#EC4899"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Minimalist anchor dots */}
            <circle cx="10" cy="28" r="3.5" fill="#00D6A0" stroke="white" strokeWidth="1.5" />
            <circle cx="70" cy="10" r="4.5" fill="#EC4899" stroke="white" strokeWidth="2" />
            <circle cx="130" cy="28" r="3.5" fill="#00D6A0" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Color Palette Chips */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="w-4 h-2 rounded-full bg-[#00D6A0]" />
          <span className="w-4 h-2 rounded-full bg-[#EC4899]" />
          <span className="w-4 h-2 rounded-full bg-[#38BDF8]" />
          <span className="w-4 h-2 rounded-full bg-white/30" />
        </div>
      </motion.div>
    </div>
  );
}
