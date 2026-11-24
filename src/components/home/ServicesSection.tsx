"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Palette,
  LucideIcon,
} from "lucide-react";
import { getServiceVisual } from "./services/ServiceVisuals";

// Dynamically import Three.js backdrop for zero SSR overhead and client-only WebGL initialization
const ServicesCanvasBackdrop = dynamic(
  () => import("./services/ServicesCanvasBackdrop"),
  { ssr: false }
);

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  icon: LucideIcon;
  accentColor: string;
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    shortLabel: "Web Dev",
    eyebrow: "HIGH-PERFORMANCE DIGITAL FLAGSHIPS",
    description:
      "Engineered web experiences and custom cloud portals built with edge-rendered frameworks, sub-second load times, and conversion-focused architectures designed to scale globally.",
    capabilities: [
      "Headless & Edge Next.js Architecture",
      "Custom Enterprise Web Portals",
      "Sub-Second Core Web Vitals (99+)",
      "High-Conversion Design Engineering",
    ],
    icon: Globe,
    accentColor: "#00D6A0",
  },
  {
    id: "application-development",
    number: "02",
    title: "Application Development",
    shortLabel: "App Dev",
    eyebrow: "NATIVE & CROSS-PLATFORM APPS",
    description:
      "Fluid, 60fps mobile and multi-platform applications crafted with native performance, biometric authentication, offline synchronization, and frictionless user journeys.",
    capabilities: [
      "React Native & iOS/Android Systems",
      "Real-Time WebSockets & Push Notifications",
      "Biometric Security & Offline Cache",
      "Scalable Microservice API Backends",
    ],
    icon: Smartphone,
    accentColor: "#38BDF8",
  },
  {
    id: "ecommerce-development",
    number: "03",
    title: "E-Commerce Development",
    shortLabel: "E-Commerce",
    eyebrow: "HEADLESS COMMERCE FLAGSHIPS",
    description:
      "Bespoke e-commerce architectures and frictionless 1-click checkout funnels built to maximize average order value, prevent cart abandonment, and easily handle high-traffic flash sales.",
    capabilities: [
      "Custom Headless Shopify Plus & Commerce",
      "1-Click Multi-Currency Global Checkout",
      "ERP, Inventory & 3PL Logistics Sync",
      "Predictive Search & Algorithmic Merchandising",
    ],
    icon: ShoppingBag,
    accentColor: "#10B981",
  },
  {
    id: "software-development",
    number: "04",
    title: "Software Development",
    shortLabel: "Software",
    eyebrow: "MISSION-CRITICAL APPLICATION SYSTEMS",
    description:
      "Resilient business software and cloud-native systems that automate complex operational workflows, integrate legacy databases, and eliminate technical bottlenecks across your organization.",
    capabilities: [
      "Distributed Microservices & Event Architecture",
      "High-Throughput REST & GraphQL APIs",
      "Automated Workflow & AI Agent Workflows",
      "Enterprise SOC2 & ISO Security Standards",
    ],
    icon: Cpu,
    accentColor: "#6366F1",
  },
  {
    id: "seo-digital-marketing",
    number: "05",
    title: "SEO & Digital Marketing",
    shortLabel: "SEO & Growth",
    eyebrow: "HIGH-INTENT ORGANIC REVENUE ENGINE",
    description:
      "Data-driven technical SEO, programmatic content systems, and conversion-rate optimization designed to dominate high-value commercial searches and compound organic revenue sustainably.",
    capabilities: [
      "Technical Architecture & Algorithmic SEO",
      "Commercial Keyword Search Dominance",
      "Conversion Rate Optimization (CRO)",
      "Multi-Touch Attribution & Revenue Analytics",
    ],
    icon: TrendingUp,
    accentColor: "#14B8A6",
  },
  {
    id: "uiux-branding",
    number: "06",
    title: "UI/UX & Branding",
    shortLabel: "UI/UX",
    eyebrow: "DISTINCTIVE INTERFACES & DESIGN SYSTEMS",
    description:
      "World-class visual identities, tokenized design systems, and interactive product prototypes that establish category authority, elevate trust, and turn first-time visitors into brand advocates.",
    capabilities: [
      "Research-Backed UX Architecture",
      "Tokenized Multi-Platform Design Systems",
      "High-Fidelity Interactive Micro-Interactions",
      "Distinctive Typography & Brand Language",
    ],
    icon: Palette,
    accentColor: "#EC4899",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeService = SERVICES_DATA[activeIndex];

  // Navigate functions
  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length);
  }, []);

  const handleSelect = useCallback((index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  // Keyboard arrow navigation when in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only listen when section is in viewport
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold 45px
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services and Expertise"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="py-24 sm:py-32 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#04080C] relative overflow-hidden select-none"
    >
      {/* =========================================================================
          ATMOSPHERIC DEEP OBSIDIAN CANVAS & AMBIENT RADIAL LIGHTING
          ========================================================================= */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0E2337]/35 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#00D6A0]/[0.05] rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle architectural coordinate grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-[0.10]" />

      {/* Three.js interactive 3D particle & spline constellation backdrop */}
      <ServicesCanvasBackdrop activeIdx={activeIndex} />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">

        {/* =======================================================================
            SECTION MASTHEAD: Large Editorial Heading & High-End Copy
            ======================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            {/* Section Eyebrow */}
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00D6A0] flex items-center gap-2.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0] animate-pulse" />
              <span>02 / OUR EXPERTISE &amp; CAPABILITIES</span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-[-0.035em] leading-[1.08]">
              Digital Engineering.{" "}
              <span className="block mt-1 sm:mt-1.5 text-[#00D6A0] drop-shadow-[0_0_35px_rgba(0,214,160,0.35)]">
                Designed to Move Businesses Forward.
              </span>
            </h2>
          </div>

          {/* Supporting Statement */}
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-lg lg:text-right">
            From intelligent software to high-performance digital experiences, we turn ambitious ideas into products that make a measurable difference.
          </p>
        </div>

        {/* =======================================================================
            MINIMAL HORIZONTAL QUICK SELECTOR TABS
            ======================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-white/[0.06]">
          {SERVICES_DATA.map((service, idx) => {
            const isActive = idx === activeIndex;
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => handleSelect(idx)}
                className={`group relative px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-mono whitespace-nowrap rounded-full transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? "text-[#050A0B] bg-[#00D6A0] font-bold shadow-[0_4px_20px_rgba(0,214,160,0.35)]"
                    : "text-[#94A3B8] hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]"
                }`}
                aria-label={`Switch to ${service.title}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#050A0B]" : "text-[#00D6A0] group-hover:scale-110"} transition-transform duration-200`} />
                <span className="text-[11px] opacity-75">{service.number}.</span>
                <span>{service.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* =======================================================================
            MAIN INTERACTIVE 3D PERSPECTIVE SHOWCASE STAGE
            ======================================================================= */}
        <div className="relative min-h-[580px] lg:min-h-[520px] rounded-3xl bg-[#070D14]/80 border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden flex flex-col justify-between">

          {/* Atmospheric corner highlights */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
            style={{ backgroundColor: activeService.accentColor }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeService.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -direction * 40, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center flex-1"
            >
              {/* LEFT COLUMN: Clean Client-Focused Content, Capabilities & CTA */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8 z-10 text-left">
                {/* Meta Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-[#00D6A0] px-2.5 py-1 rounded bg-[#00D6A0]/10 border border-[#00D6A0]/20">
                      SERVICE {activeService.number} / 06
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                      {activeService.eyebrow}
                    </span>
                  </div>

                  {/* Large Warm White Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
                    {activeService.title}
                  </h3>
                </div>

                {/* Concise Client-Focused Description */}
                <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
                  {activeService.description}
                </p>

                {/* 4 Core Capabilities in 2x2 Grid */}
                <div className="space-y-2.5 pt-1">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Core Capabilities &amp; Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {activeService.capabilities.map((capability, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00D6A0] shrink-0" />
                        <span className="text-xs sm:text-[13px] text-slate-200 font-medium leading-snug">
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear 'Discuss This Service' CTA Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    href={`#contact`}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#050A0B] bg-[#00D6A0] hover:bg-[#10B981] transition-all duration-300 shadow-[0_4px_24px_rgba(0,214,160,0.3)] hover:shadow-[0_8px_32px_rgba(0,214,160,0.45)] hover:-translate-y-0.5 active:translate-y-0 text-center"
                  >
                    <span className="font-mono font-bold tracking-widest text-[11px] sm:text-xs">
                      DISCUSS {activeService.shortLabel.toUpperCase()}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#050A0B]/15 flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#050A0B] stroke-[2.5]" />
                    </div>
                  </Link>

                  <span className="text-xs font-mono text-slate-400 text-center sm:text-left">
                    Response within 24 hours guaranteed
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Dedicated Meaningful 3D Visual Representation */}
              <div className="lg:col-span-6 flex items-center justify-center relative w-full h-full min-h-[360px] sm:min-h-[420px]">
                {getServiceVisual(activeService.id)}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* =====================================================================
              BOTTOM REFINED INTERACTION & NAVIGATION CONTROLS
              ===================================================================== */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 z-20">
            {/* Scrubber Progress Track */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-mono font-bold text-white">
                {activeService.number}
              </span>
              <div className="h-1.5 w-32 sm:w-48 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#00D6A0] rounded-full"
                  animate={{
                    width: `${((activeIndex + 1) / SERVICES_DATA.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400">
                0{SERVICES_DATA.length}
              </span>
            </div>

            {/* Adjacent Indicators (Dots) */}
            <div className="hidden md:flex items-center gap-2">
              {SERVICES_DATA.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => handleSelect(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeIndex
                      ? "w-8 bg-[#00D6A0]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Next / Previous Arrow Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#00D6A0]/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#00D6A0] hover:bg-[#10B981] text-[#050A0B] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,214,160,0.35)]"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5 text-[#050A0B] stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
