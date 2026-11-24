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
  ShoppingBag,
  Smartphone,
  Cpu,
  TrendingUp,
  Palette,
  LucideIcon,
} from "lucide-react";
import Service3DObject from "./services/Service3DObject";

// Dynamically import Three.js backdrop for zero SSR overhead and low-power ambient illumination
const ServicesCanvasBackdrop = dynamic(
  () => import("./services/ServicesCanvasBackdrop"),
  { ssr: false }
);

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  tagline: string;
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
    tagline: "High-Performance Digital Flagships",
    description:
      "Engineered web experiences and custom cloud portals built with edge-rendered frameworks, sub-second load times, and conversion-focused architectures designed to scale globally.",
    capabilities: [
      "Next.js Edge SSR Architecture",
      "Enterprise Custom Web Portals",
      "99+ Core Web Vitals Guaranteed",
    ],
    icon: Globe,
    accentColor: "#00D6A0",
  },
  {
    id: "ecommerce-development",
    number: "02",
    title: "E-Commerce Development",
    shortLabel: "E-Commerce",
    tagline: "Headless Commerce Flagships",
    description:
      "Bespoke e-commerce architectures and frictionless 1-click checkout funnels built to maximize average order value, prevent cart abandonment, and easily handle high-traffic flash sales.",
    capabilities: [
      "Headless Shopify Plus & Commerce",
      "1-Click Multi-Currency Checkout",
      "ERP, WMS & Logistics Automations",
    ],
    icon: ShoppingBag,
    accentColor: "#10B981",
  },
  {
    id: "application-development",
    number: "03",
    title: "Application Development",
    shortLabel: "App Dev",
    tagline: "Native & Cross-Platform Mobile",
    description:
      "Fluid, 60fps mobile and multi-platform applications crafted with native performance, biometric authentication, offline synchronization, and frictionless user journeys.",
    capabilities: [
      "React Native & iOS/Android Core",
      "Biometric Security & Offline Cache",
      "Real-Time WebSockets & Push Engine",
    ],
    icon: Smartphone,
    accentColor: "#38BDF8",
  },
  {
    id: "software-development",
    number: "04",
    title: "Software Development",
    shortLabel: "Software",
    tagline: "Mission-Critical Systems & APIs",
    description:
      "Resilient business software and cloud-native systems that automate complex operational workflows, integrate legacy databases, and eliminate technical bottlenecks across your organization.",
    capabilities: [
      "Microservices & Event Mesh",
      "High-Throughput Distributed APIs",
      "Enterprise Security & ISO Standards",
    ],
    icon: Cpu,
    accentColor: "#6366F1",
  },
  {
    id: "seo-digital-marketing",
    number: "05",
    title: "SEO & Digital Marketing",
    shortLabel: "SEO & Growth",
    tagline: "Organic Revenue & Intent Capture",
    description:
      "Data-driven technical SEO, programmatic content systems, and conversion-rate optimization designed to dominate high-value commercial searches and compound organic revenue sustainably.",
    capabilities: [
      "Algorithmic Technical SEO Audits",
      "Commercial Keyword Rank #1",
      "Conversion Rate Optimization (CRO)",
    ],
    icon: TrendingUp,
    accentColor: "#14B8A6",
  },
  {
    id: "uiux-branding",
    number: "06",
    title: "UI/UX & Branding",
    shortLabel: "UI/UX",
    tagline: "Distinctive Design Systems & Identity",
    description:
      "World-class visual identities, tokenized design systems, and interactive product prototypes that establish category authority, elevate trust, and turn first-time visitors into brand advocates.",
    capabilities: [
      "Tokenized Multi-Brand Systems",
      "High-Fidelity Interactive Prototypes",
      "Distinctive Typography & Identity",
    ],
    icon: Palette,
    accentColor: "#EC4899",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeService = SERVICES_DATA[activeIndex];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SERVICES_DATA.length) % SERVICES_DATA.length);
  }, []);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation when section is in viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
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

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (deltaX > 40) {
      handleNext();
    } else if (deltaX < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Expertise & Services"
      className="py-24 sm:py-32 md:py-36 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#04080C] relative overflow-hidden select-none"
    >
      {/* =========================================================================
          DEEP OBSIDIAN CANVAS & AMBIENT RADIAL LIGHTING
          ========================================================================= */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0E2337]/35 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#00D6A0]/[0.05] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-[0.10]" />

      {/* Dynamic Three.js ambient particle backdrop */}
      <ServicesCanvasBackdrop activeIdx={activeIndex} />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14 relative z-10">

        {/* =======================================================================
            SECTION MASTHEAD
            Small label: OUR EXPERTISE
            Heading: Digital Engineering Services Built for Growth.
            Supporting description aligned to the right on desktop.
            ======================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl text-left">
            {/* Small Label */}
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00D6A0] flex items-center gap-2.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0] animate-pulse" />
              <span>OUR EXPERTISE</span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-white tracking-[-0.035em] leading-[1.1]">
              Digital Engineering Services{" "}
              <span className="block sm:inline text-[#00D6A0] drop-shadow-[0_0_30px_rgba(0,214,160,0.35)]">
                Built for Growth.
              </span>
            </h2>
          </div>

          {/* Supporting Description aligned to the right on desktop */}
          <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-lg lg:text-right">
            From intelligent software to high-performance digital experiences, we turn ambitious ideas into products that make a measurable difference.
          </p>
        </div>

        {/* =======================================================================
            CINEMATIC 3D PERSPECTIVE CAROUSEL STAGE
            Connected 6-service composition with center focus, controlled depth,
            subtle perspective rotation, and partially visible adjacent cards.
            ======================================================================= */}
        <div
          ref={carouselStageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[470px] sm:h-[500px] md:h-[520px] flex items-center justify-center overflow-visible perspective-[1200px]"
        >
          {SERVICES_DATA.map((service, index) => {
            // Calculate wrapped symmetric relative distance from active card
            let diff = index - activeIndex;
            if (diff < -3) diff += 6;
            if (diff > 2) diff -= 6;

            const isCenter = diff === 0;
            const isImmediateAdjacent = Math.abs(diff) === 1;
            const isOuter = Math.abs(diff) === 2;

            // Responsive offset calculations for 3D stage
            let xOffset = "0%";
            let zOffset = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (diff === 0) {
              xOffset = "0%";
              zOffset = 120;
              rotateY = 0;
              scale = 1.05;
              opacity = 1;
              zIndex = 30;
            } else if (diff === 1) {
              xOffset = "clamp(210px, 28vw, 340px)";
              zOffset = 25;
              rotateY = -18;
              scale = 0.86;
              opacity = 0.8;
              zIndex = 20;
            } else if (diff === -1) {
              xOffset = "-clamp(210px, 28vw, 340px)";
              zOffset = 25;
              rotateY = 18;
              scale = 0.86;
              opacity = 0.8;
              zIndex = 20;
            } else if (diff === 2) {
              xOffset = "clamp(390px, 50vw, 580px)";
              zOffset = -60;
              rotateY = -28;
              scale = 0.72;
              opacity = 0.42;
              zIndex = 10;
            } else if (diff === -2) {
              xOffset = "-clamp(390px, 50vw, 580px)";
              zOffset = -60;
              rotateY = 28;
              scale = 0.72;
              opacity = 0.42;
              zIndex = 10;
            } else {
              // Far back card (hidden on small viewports, subtle hint on ultra-wide)
              xOffset = diff > 0 ? "700px" : "-700px";
              zOffset = -140;
              rotateY = diff > 0 ? -36 : 36;
              scale = 0.6;
              opacity = 0.15;
              zIndex = 5;
            }

            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                onClick={() => handleSelect(index)}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: zIndex,
                }}
                className={`absolute top-0 bottom-0 my-auto w-[285px] sm:w-[320px] md:w-[340px] h-[430px] sm:h-[455px] md:h-[470px] rounded-3xl p-5 sm:p-6 cursor-pointer flex flex-col justify-between transition-colors duration-500 backdrop-blur-xl ${
                  isCenter
                    ? "bg-[#09131C]/95 border-2 border-[#00D6A0]/50 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(0,214,160,0.2)]"
                    : isImmediateAdjacent
                    ? "bg-[#070D14]/85 border border-white/15 hover:border-[#00D6A0]/30 hover:opacity-100 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85)]"
                    : "bg-[#050A0F]/70 border border-white/[0.08] shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                }`}
                aria-label={`Select ${service.title}`}
              >
                {/* Card Top: Number Index + Category Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCenter ? "bg-[#00D6A0]/20 text-[#00D6A0]" : "bg-white/[0.05] text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {service.number}.
                    </span>
                  </div>

                  {isCenter && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#00D6A0] bg-[#00D6A0]/15 border border-[#00D6A0]/30 uppercase tracking-wider">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Card Center: Dedicated 3D Sculptural Visual Object */}
                <div className="relative flex-1 flex items-center justify-center my-2 overflow-visible">
                  <Service3DObject serviceId={service.id} isActive={isCenter} />
                </div>

                {/* Card Bottom: Service Title, Tagline & Capabilities */}
                <div className="space-y-2 pt-2 border-t border-white/[0.08] text-left">
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                      isCenter ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] font-normal leading-relaxed line-clamp-2">
                    {service.tagline}
                  </p>

                  {/* Active Card Quick Action */}
                  {isCenter ? (
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#00D6A0] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Deploy
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#00D6A0] flex items-center justify-center shadow-md">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#050A0B] stroke-[2.5]" />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      Click to inspect &rarr;
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =======================================================================
            ACTIVE SERVICE DETAIL STRIP (Connected Client Info & Discussion CTA)
            ======================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-[#070D14]/90 border border-white/[0.08] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl"
          >
            {/* Left: Active Service Overview */}
            <div className="space-y-2 max-w-2xl text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-[#00D6A0]">
                  SERVICE {activeService.number} / 06
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {activeService.tagline}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {activeService.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {activeService.capabilities.map((cap, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#00D6A0]" />
                    <span>{cap}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Direct Discuss CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-[#050A0B] bg-[#00D6A0] hover:bg-[#10B981] transition-all duration-300 shadow-[0_4px_20px_rgba(0,214,160,0.3)] hover:shadow-[0_8px_30px_rgba(0,214,160,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="font-mono font-bold tracking-widest text-[11px]">
                  DISCUSS {activeService.shortLabel.toUpperCase()}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* =======================================================================
            COMPACT CAROUSEL CONTROLS: Progress Dots & Precision Glass Arrows
            ======================================================================= */}
        <div className="flex items-center justify-between pt-2">
          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-2">
            {SERVICES_DATA.map((service, dotIdx) => (
              <button
                key={service.id}
                onClick={() => handleSelect(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex
                    ? "w-8 bg-[#00D6A0] shadow-[0_0_10px_rgba(0,214,160,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to ${service.title}`}
              />
            ))}
          </div>

          {/* Quick Counter */}
          <div className="text-xs font-mono text-slate-400">
            <span className="text-white font-bold">{activeService.number}</span> / 06
          </div>

          {/* Compact Prev / Next Arrow Navigation Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] hover:border-[#00D6A0]/40 flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#00D6A0] hover:bg-[#10B981] text-[#050A0B] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_4px_16px_rgba(0,214,160,0.3)]"
              aria-label="Next Service"
            >
              <ChevronRight className="w-4 h-4 text-[#050A0B] stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
