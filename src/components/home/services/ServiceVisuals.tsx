"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  Database,
  Server,
  Code,
  Sliders,
  Maximize2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* 1. WEB DEVELOPMENT VISUAL: Sophisticated 3D Browser with Layered Viewports */
/* -------------------------------------------------------------------------- */
export function WebDevVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D6A0]/10 via-[#0e7490]/10 to-transparent rounded-2xl blur-2xl" />

      {/* Main 3D Desktop Browser Canvas */}
      <motion.div
        initial={{ rotateX: 6, rotateY: -8, z: 0 }}
        animate={{
          rotateX: [6, 4, 7, 6],
          rotateY: [-8, -5, -10, -8],
          y: [0, -6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[500px] rounded-xl bg-[#070D14]/90 border border-white/10 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(0,214,160,0.1)] backdrop-blur-xl overflow-hidden"
      >
        {/* Browser Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A121A] border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#050A0E] border border-white/[0.06] text-[11px] font-mono text-slate-400 w-3/5 max-w-[240px]">
            <Lock className="w-3 h-3 text-[#00D6A0]" />
            <span className="truncate text-slate-300">https://grandeur.engineering</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <Maximize2 className="w-3 h-3" />
          </div>
        </div>

        {/* Browser Viewport Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Mock Editorial Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D6A0] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Production Build v3.4</span>
            </div>
            <span className="text-[10px] font-mono text-[#00D6A0] bg-[#00D6A0]/10 px-2 py-0.5 rounded border border-[#00D6A0]/20">99/100 Speed</span>
          </div>

          {/* Hero Wireframe Blocks */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-white/20 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-white/10 rounded" />
          </div>

          {/* Responsive Layout Grid Specimen */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="h-20 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-2.5 flex flex-col justify-between">
              <div className="w-5 h-5 rounded bg-[#00D6A0]/20 flex items-center justify-center">
                <Globe className="w-3 h-3 text-[#00D6A0]" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-10 bg-white/20 rounded" />
                <div className="h-1 w-6 bg-[#00D6A0]/40 rounded" />
              </div>
            </div>
            <div className="h-20 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-2.5 flex flex-col justify-between">
              <div className="w-5 h-5 rounded bg-sky-500/20 flex items-center justify-center">
                <Zap className="w-3 h-3 text-sky-400" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-12 bg-white/20 rounded" />
                <div className="h-1 w-8 bg-sky-400/40 rounded" />
              </div>
            </div>
            <div className="h-20 rounded-lg bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] p-2.5 flex flex-col justify-between">
              <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
                <Layers className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-11 bg-white/20 rounded" />
                <div className="h-1 w-7 bg-emerald-400/40 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Layer 2: Mobile Viewport Projection (Depth offset) */}
        <motion.div
          style={{ transform: "translateZ(35px)" }}
          className="absolute -bottom-4 -right-3 w-40 sm:w-44 rounded-xl bg-[#09141F] border border-[#00D6A0]/30 shadow-[0_15px_30px_rgba(0,0,0,0.8)] p-3 space-y-2.5 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-[#00D6A0]">MOBILE ADAPTIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-white/25 rounded" />
            <div className="h-2 w-3/4 bg-white/15 rounded" />
            <div className="h-8 w-full bg-[#00D6A0]/15 rounded border border-[#00D6A0]/30 flex items-center justify-center text-[10px] font-mono text-[#00D6A0]">
              Fast SSR
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. APP DEVELOPMENT VISUAL: Floating Connected Multi-Screen Mobile Rig      */
/* -------------------------------------------------------------------------- */
export function AppDevVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-[#00D6A0]/10 to-transparent rounded-2xl blur-2xl" />

      <div className="relative flex items-center justify-center w-full max-w-[480px]">
        {/* Main Smartphone Chassis */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotateZ: [-2, 0, -2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-[200px] sm:w-[220px] h-[350px] sm:h-[370px] rounded-[32px] bg-[#070E16] border-2 border-white/20 p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.15)] flex flex-col"
        >
          {/* Dynamic Island Notch */}
          <div className="mx-auto w-20 h-4 bg-black rounded-full mb-3 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="w-1 h-1 rounded-full bg-slate-600" />
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-white">FinPulse App</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Native</span>
          </div>

          {/* App Live Balance Card */}
          <div className="rounded-xl bg-gradient-to-br from-sky-500/15 to-[#00D6A0]/10 border border-white/10 p-3 mb-2.5 space-y-1">
            <span className="text-[9px] font-mono text-slate-400">PORTFOLIO YIELD</span>
            <div className="text-lg font-bold font-mono text-white">$142,850.00</div>
            <div className="text-[10px] text-[#00D6A0] flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" /> +18.4% this quarter
            </div>
          </div>

          {/* Activity Rows */}
          <div className="space-y-2 flex-1 overflow-hidden px-1">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[10px] text-slate-200">Biometric Sync</span>
              </div>
              <span className="text-[9px] font-mono text-[#00D6A0]">Instant</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/[0.04]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-200">Offline Cache</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">Active</span>
            </div>
          </div>

          {/* Bottom Dock Bar */}
          <div className="mt-auto pt-2 border-t border-white/[0.08] flex justify-around text-slate-400">
            <span className="w-8 h-1 bg-white/30 rounded-full mx-auto" />
          </div>
        </motion.div>

        {/* Secondary Angled Companion Screen (Tablet / Companion Device) */}
        <motion.div
          animate={{
            y: [5, -5, 5],
            rotateZ: [5, 7, 5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 sm:right-4 z-10 w-[170px] sm:w-[190px] h-[290px] rounded-[24px] bg-[#0A1624]/90 border border-white/10 p-3 shadow-2xl backdrop-blur-md opacity-85"
        >
          <div className="text-[9px] font-mono text-sky-400 tracking-wider mb-2">CROSS-PLATFORM</div>
          <div className="h-12 rounded-lg bg-white/[0.05] border border-white/[0.06] p-2 mb-2 flex items-center justify-between">
            <span className="text-[10px] text-slate-300">iOS &amp; Android</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D6A0]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-white/15 rounded" />
            <div className="h-2 w-4/5 bg-white/10 rounded" />
            <div className="h-2 w-3/5 bg-sky-400/20 rounded" />
          </div>
          <div className="mt-8 p-2 rounded bg-sky-500/10 border border-sky-500/20 text-center">
            <span className="text-[10px] font-mono text-sky-300 font-semibold">60 FPS Fluid UI</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. E-COMMERCE VISUAL: Premium Storefront, Product Showcase & Fast Checkout */
/* -------------------------------------------------------------------------- */
export function EcommerceVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-amber-500/10 to-transparent rounded-2xl blur-2xl" />

      {/* Main Storefront Product Container */}
      <motion.div
        animate={{
          rotateX: [4, 2, 5, 4],
          rotateY: [-5, -2, -7, -5],
          y: [0, -6, 0],
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[480px] rounded-2xl bg-[#08111A]/90 border border-white/10 p-5 sm:p-6 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl space-y-4"
      >
        {/* Storefront Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00D6A0]/15 flex items-center justify-center text-[#00D6A0]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">LUMINA Headless Store</div>
              <div className="text-[10px] font-mono text-slate-400">High-Conversion Architecture</div>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-[#00D6A0] bg-[#00D6A0]/10 border border-[#00D6A0]/20">
            $2.4M ARR
          </span>
        </div>

        {/* Product Showcase Card */}
        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/[0.06]">
          {/* Product Thumbnail with Glow */}
          <div className="w-20 h-20 rounded-lg bg-[#04080C] border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00D6A0] to-amber-400 opacity-60 blur-md absolute" />
            <Sparkles className="w-8 h-8 text-white relative z-10 drop-shadow-md" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Limited Edition</span>
              <span className="text-xs font-bold text-white font-mono">$480.00</span>
            </div>
            <div className="text-sm font-semibold text-white truncate">Spatial Audio Studio Pro</div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="text-emerald-400 font-mono">In Stock</span>
              <span>•</span>
              <span>Global 1-Day Dispatch</span>
            </div>
          </div>
        </div>

        {/* Floating 1-Click Checkout Confirmation Badge */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-xl bg-[#050B10] border border-white/[0.08] space-y-1">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00D6A0]" /> 0.8s Checkout
            </div>
            <div className="text-sm font-bold text-white font-mono">+42% CVR</div>
          </div>

          <div className="p-3 rounded-xl bg-[#050B10] border border-white/[0.08] space-y-1">
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-400" /> Stripe &amp; Apple Pay
            </div>
            <div className="text-sm font-bold text-white font-mono">PCI Level 1</div>
          </div>
        </div>

        {/* Simulated CTA Button */}
        <div className="w-full py-2.5 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-bold font-mono tracking-wider uppercase text-center shadow-[0_4px_18px_rgba(0,214,160,0.3)]">
          Instant 1-Click Purchase Completed
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. SOFTWARE DEV VISUAL: Connected Microservices & System Architecture      */
/* -------------------------------------------------------------------------- */
export function SoftwareDevVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-[#00D6A0]/10 to-transparent rounded-2xl blur-2xl" />

      {/* Main Architecture Diagram Canvas */}
      <motion.div
        animate={{
          rotateX: [5, 2, 6, 5],
          rotateY: [4, 7, 3, 4],
          y: [0, -5, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[500px] rounded-2xl bg-[#070D15]/95 border border-white/10 p-5 sm:p-6 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl space-y-4"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00D6A0]" />
            <span className="text-xs font-mono font-bold text-white">CORE ARCHITECTURE / DISTRIBUTED MESH</span>
          </div>
          <span className="text-[10px] font-mono text-[#00D6A0] bg-[#00D6A0]/10 px-2 py-0.5 rounded border border-[#00D6A0]/20">
            99.999% SLA
          </span>
        </div>

        {/* Distributed Microservice Nodes in Grid */}
        <div className="grid grid-cols-2 gap-3 relative">
          {/* Central Connecting Pulse Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#00D6A0]/10 border border-[#00D6A0]/30 animate-ping" />
          </div>

          {/* Node 1: High-Throughput Edge API */}
          <div className="p-3 rounded-xl bg-[#04080E] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-1 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-sky-400 flex items-center gap-1">
                <Server className="w-3 h-3" /> API Gateway
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-mono font-semibold text-white">45k Req/sec</div>
            <div className="text-[9px] font-mono text-slate-400">Latency: 4.2ms</div>
          </div>

          {/* Node 2: Autonomous Queue Engine */}
          <div className="p-3 rounded-xl bg-[#04080E] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-1 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Event Broker
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </div>
            <div className="text-xs font-mono font-semibold text-white">Kafka Cluster</div>
            <div className="text-[9px] font-mono text-slate-400">Zero Msg Drop</div>
          </div>

          {/* Node 3: Encrypted Relational Vault */}
          <div className="p-3 rounded-xl bg-[#04080E] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-1 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#00D6A0] flex items-center gap-1">
                <Database className="w-3 h-3" /> Data Fabric
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            </div>
            <div className="text-xs font-mono font-semibold text-white">Postgres + Redis</div>
            <div className="text-[9px] font-mono text-slate-400">ACID Guaranteed</div>
          </div>

          {/* Node 4: AI & Pipeline Automation */}
          <div className="p-3 rounded-xl bg-[#04080E] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-colors space-y-1 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                <Code className="w-3 h-3" /> AI Pipeline
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <div className="text-xs font-mono font-semibold text-white">Autonomous Agents</div>
            <div className="text-[9px] font-mono text-slate-400">Vector Embeddings</div>
          </div>
        </div>

        {/* Live Command Stream Bar */}
        <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-[10px] text-slate-300 flex items-center justify-between">
          <span className="text-[#00D6A0]">&gt; system.status: optimal</span>
          <span className="text-slate-500">Auto-Scaling [ON]</span>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SEO & MARKETING VISUAL: Dynamic High-Growth Analytics & Search Engine   */
/* -------------------------------------------------------------------------- */
export function MarketingVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-[#00D6A0]/10 to-transparent rounded-2xl blur-2xl" />

      {/* Analytics Main Dashboard */}
      <motion.div
        animate={{
          rotateX: [4, 1, 5, 4],
          rotateY: [-4, -1, -6, -4],
          y: [0, -6, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[490px] rounded-2xl bg-[#070F16]/95 border border-white/10 p-5 sm:p-6 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl space-y-4"
      >
        {/* Metric Overview Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Search Visibility Engine</div>
              <div className="text-[10px] font-mono text-slate-400">Organic Growth Metrics</div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#00D6A0] bg-[#00D6A0]/10 px-2.5 py-1 rounded-full border border-[#00D6A0]/20">
            +320% Traffic
          </span>
        </div>

        {/* Dynamic Curved Growth Waveform Chart */}
        <div className="p-4 rounded-xl bg-[#04080C] border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">TOTAL ORGANIC IMPRESSIONS</span>
            <span className="text-white font-bold">1,840,290</span>
          </div>

          {/* SVG Area Chart */}
          <div className="w-full h-24 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="seoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D6A0" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00D6A0" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 Q50,65 90,50 T180,30 T250,15 T300,5 L300,80 L0,80 Z"
                fill="url(#seoGrad)"
              />
              <path
                d="M0,70 Q50,65 90,50 T180,30 T250,15 T300,5"
                fill="none"
                stroke="#00D6A0"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-2 right-4 flex items-center gap-1 px-2 py-0.5 rounded bg-[#00D6A0]/20 border border-[#00D6A0]/40 text-[9px] font-mono text-[#00D6A0]">
              <Activity className="w-2.5 h-2.5" /> High Intent Rank #1
            </div>
          </div>
        </div>

        {/* SERP Keyword Badges */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-[9px] font-mono text-slate-400">DOMAIN RATING</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">86/100</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-[9px] font-mono text-slate-400">TOP 3 KEYWORDS</div>
            <div className="text-sm font-bold font-mono text-[#00D6A0] mt-0.5">850+</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
            <div className="text-[9px] font-mono text-slate-400">AVG CONV ROI</div>
            <div className="text-sm font-bold font-mono text-white mt-0.5">5.4x</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. UI/UX & BRANDING VISUAL: Design System Tokens & Precision Artboard      */
/* -------------------------------------------------------------------------- */
export function DesignVisual() {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] flex items-center justify-center p-4 select-none perspective-[1200px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-[#00D6A0]/10 to-transparent rounded-2xl blur-2xl" />

      {/* Artboard Studio Frame */}
      <motion.div
        animate={{
          rotateX: [3, 1, 4, 3],
          rotateY: [-5, -2, -7, -5],
          y: [0, -6, 0],
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[490px] rounded-2xl bg-[#0A0E16]/95 border border-white/10 p-5 sm:p-6 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl space-y-4"
      >
        {/* Studio Workspace Header with Coordinate Rulers */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Grandeur Design System</div>
              <div className="text-[10px] font-mono text-slate-400">Tokens &amp; Component Spec v2.8</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
            Figma Sync
          </span>
        </div>

        {/* Color Palette Tokens Palette */}
        <div className="space-y-1.5">
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Brand Color Tokens</div>
          <div className="grid grid-cols-5 gap-2">
            <div className="space-y-1">
              <div className="h-9 rounded-lg bg-[#00D6A0] shadow-[0_2px_10px_rgba(0,214,160,0.3)]" />
              <div className="text-[9px] font-mono text-slate-300 truncate">#00D6A0</div>
            </div>
            <div className="space-y-1">
              <div className="h-9 rounded-lg bg-[#04080C] border border-white/20" />
              <div className="text-[9px] font-mono text-slate-300 truncate">#04080C</div>
            </div>
            <div className="space-y-1">
              <div className="h-9 rounded-lg bg-[#0E2337]" />
              <div className="text-[9px] font-mono text-slate-300 truncate">#0E2337</div>
            </div>
            <div className="space-y-1">
              <div className="h-9 rounded-lg bg-[#38BDF8]" />
              <div className="text-[9px] font-mono text-slate-300 truncate">#38BDF8</div>
            </div>
            <div className="space-y-1">
              <div className="h-9 rounded-lg bg-[#F8FAFC]" />
              <div className="text-[9px] font-mono text-slate-300 truncate">#F8FAFC</div>
            </div>
          </div>
        </div>

        {/* Component Specimen Artboard with Bounding Box Cursor */}
        <div className="p-3.5 rounded-xl bg-[#050A10] border border-dashed border-[#00D6A0]/40 relative overflow-hidden">
          {/* Simulated Designer Selection Cursor */}
          <div className="absolute top-2 right-6 flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500 text-white text-[9px] font-mono shadow-md z-20">
            <span>Staff Designer</span>
          </div>

          <div className="flex items-center justify-between pb-2">
            <span className="text-[10px] font-mono text-[#00D6A0]">BUTTON_SPEC / HOVER</span>
            <span className="text-[9px] font-mono text-slate-500">Auto-Layout: 12px 24px</span>
          </div>

          {/* Interactive Component Example */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-[#00D6A0] text-[#050A0B] text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
              <span>Primary</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-mono border border-white/15">
              Secondary
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Inter Display • 600 wt
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* RENDER MAP HELPER                                                          */
/* -------------------------------------------------------------------------- */
export function getServiceVisual(serviceId: string) {
  switch (serviceId) {
    case "web-development":
      return <WebDevVisual />;
    case "application-development":
      return <AppDevVisual />;
    case "ecommerce-development":
      return <EcommerceVisual />;
    case "software-development":
      return <SoftwareDevVisual />;
    case "seo-digital-marketing":
      return <MarketingVisual />;
    case "uiux-branding":
      return <DesignVisual />;
    default:
      return <WebDevVisual />;
  }
}
