"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { ProjectGalleryItem } from "@/data/projects";

interface ProjectImageShowcaseProps {
  gallery: ProjectGalleryItem[];
  projectTitle: string;
  accentColor?: string;
}

export default function ProjectImageShowcase({
  gallery,
  projectTitle,
  accentColor = "#00D6A0",
}: ProjectImageShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const total = gallery.length;
  const currentItem = gallery[selectedIndex] || gallery[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keep active thumbnail visible in horizontal slider
  useEffect(() => {
    if (!thumbnailsRef.current) return;
    const activeThumb = thumbnailsRef.current.children[selectedIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isFullscreen]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="space-y-4 sm:space-y-5 pt-4">
      {/* ------------------------------------------------------------------ */}
      {/* SECTION HEADER & CONTROLS                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#00D6A0] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] font-bold">
            Interactive Interface Showcase
          </span>
          <span className="text-xs font-mono text-[#A5B2C0]/60 hidden sm:inline">
            • {total} Verified Screenshots
          </span>
        </div>

        {/* Counter and Fullscreen Toggle */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-[#A5B2C0] bg-[#0C1721] px-2.5 py-1 rounded-md border border-white/[0.08]">
            <span className="text-[#00D6A0] font-bold">{String(selectedIndex + 1).padStart(2, "0")}</span>
            <span className="text-white/30 mx-1">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="w-8 h-8 rounded-lg bg-[#0C1721] hover:bg-[#132332] border border-white/[0.1] hover:border-[#00D6A0]/50 text-[#F5F8FA] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next screenshot"
              className="w-8 h-8 rounded-lg bg-[#0C1721] hover:bg-[#132332] border border-white/[0.1] hover:border-[#00D6A0]/50 text-[#F5F8FA] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN LARGE FEATURED IMAGE STAGE                                    */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070D14] border border-white/[0.1] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] group select-none transition-all ${
          isFullscreen ? "fixed inset-4 sm:inset-10 z-50 aspect-auto h-auto" : "aspect-[16/10] sm:aspect-[16/9]"
        }`}
      >
        {/* Browser Mockup Chrome Header */}
        <div className="absolute top-0 inset-x-0 z-20 h-9 sm:h-10 bg-[#050A0B]/85 backdrop-blur-md border-b border-white/[0.08] px-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block opacity-80" />
            <span className="ml-2 text-[11px] text-[#A5B2C0] truncate max-w-[200px] sm:max-w-none">
              preview://{projectTitle.toLowerCase().replace(/[^a-z0-9]/g, "")}/{currentItem.tag.toLowerCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#00D6A0]/10 text-[#00D6A0] border border-[#00D6A0]/30 hidden sm:inline-block">
              {currentItem.tag}
            </span>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded text-[#A5B2C0] hover:text-[#00D6A0] transition-colors cursor-pointer"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen Preview"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* AnimatePresence for Smooth Transition Between Screenshots */}
        <div className="relative w-full h-full pt-9 sm:pt-10 overflow-hidden bg-[#070D14]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentItem.id}
              custom={direction}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.image}
                alt={`${projectTitle} — ${currentItem.title}`}
                className="w-full h-full object-cover object-top sm:object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A0B]/90 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Quick Arrow Click Overlays (Left / Right) */}
          <button
            onClick={handlePrev}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#050A0B]/80 hover:bg-[#00D6A0] text-[#F5F8FA] hover:text-[#050A0B] border border-white/[0.15] hover:border-[#00D6A0] backdrop-blur-md flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#050A0B]/80 hover:bg-[#00D6A0] text-[#F5F8FA] hover:text-[#050A0B] border border-white/[0.15] hover:border-[#00D6A0] backdrop-blur-md flex items-center justify-center opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Floating Caption Ribbon at Bottom */}
          <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-[#050A0B] via-[#050A0B]/80 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 max-w-4xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00D6A0] bg-[#00D6A0]/15 px-2 py-0.5 rounded border border-[#00D6A0]/30 sm:hidden">
                    {currentItem.tag}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-[#F5F8FA] tracking-tight">
                    {currentItem.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A5B2C0] leading-relaxed line-clamp-2">
                  {currentItem.subtitle}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#A5B2C0]/70 shrink-0 hidden md:block">
                Click thumbnails below to switch views
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* THUMBNAIL SLIDER UNDERNEATH                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#A5B2C0]">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00D6A0]" />
            <span>Select Interface View:</span>
          </span>
          <span className="text-[11px] text-[#A5B2C0]/60 sm:hidden">
            Swipe to see all ({total})
          </span>
        </div>

        {/* Scrollable Thumbnails Track */}
        <div
          ref={thumbnailsRef}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 px-1 -mx-1 scroll-smooth snap-x snap-mandatory"
        >
          {gallery.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > selectedIndex ? 1 : -1);
                  setSelectedIndex(idx);
                }}
                className={`relative flex-shrink-0 w-36 sm:w-48 aspect-[16/10] rounded-xl overflow-hidden bg-[#0C1721] border transition-all duration-300 snap-center text-left cursor-pointer group/thumb ${
                  isActive
                    ? "border-[#00D6A0] shadow-[0_0_20px_rgba(0,214,160,0.35)] scale-[1.02]"
                    : "border-white/[0.08] hover:border-white/30 opacity-65 hover:opacity-100"
                }`}
                aria-label={`View screenshot ${idx + 1}: ${item.title}`}
              >
                {/* Thumbnail Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A0B]/90 via-[#050A0B]/30 to-transparent" />

                {/* Active Indicator Ring */}
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00D6A0] shadow-[0_0_8px_#00D6A0]" />
                )}

                {/* Thumbnail Label & Index */}
                <div className="absolute bottom-2 inset-x-2 space-y-0.5 pointer-events-none">
                  <div className="text-[9px] font-mono text-[#00D6A0] font-bold">
                    0{idx + 1} • {item.tag}
                  </div>
                  <div className="text-[11px] font-semibold text-[#F5F8FA] truncate leading-tight">
                    {item.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
