"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metricHighlight: string;
  projectRef: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Grandeur Net delivered what two previous agencies failed to accomplish in 8 months. Their direct-to-engineer model meant our custom furniture configurator launched 2 weeks ahead of schedule with flawless sub-second load times.",
    author: "Rajesh Malhotra",
    role: "Managing Director",
    company: "Kraftwood India",
    metricHighlight: "+185% Online Conversion Lift",
    projectRef: "Kraftwood Luxury E-Commerce",
  },
  {
    quote:
      "The transparency was unmatched. We could see tickets moving in Linear every single day. When we scaled our vehicle fleet to peak tourist season, their Next.js architecture handled 50,000+ daily searches without a hitch.",
    author: "Gaurav Thapa",
    role: "Chief Operating Officer",
    company: "GT Travels Mobility",
    metricHighlight: "99.98% System Uptime Across Peak Season",
    projectRef: "GT Travels Fleet Platform",
  },
  {
    quote:
      "Working with Grandeur Net felt like having an elite in-house CTO team in Dehradun. They don't just write code; they challenge your assumptions and optimize for real business profitability.",
    author: "Dr. A. K. Nautiyal",
    role: "Founder & Director",
    company: "Zenith Diagnostics",
    metricHighlight: "-65% Lab Report Delivery Time",
    projectRef: "Zenith Telehealth Platform",
  },
];

export default function AboutTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, currentIdx]);

  const activeReview = TESTIMONIALS[currentIdx];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0B1929] border-y border-slate-200 dark:border-white/[0.08] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>Client Endorsements</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#10243A] dark:text-white tracking-tight">
              What Founders Say About <span className="text-[#00A980] dark:text-[#00C99A]">Working With Us</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#071321] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00A980] dark:hover:text-[#00C99A] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#071321] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00A980] dark:hover:text-[#00C99A] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Display (One Main Testimonial Prominently) */}
        <div className="relative min-h-[320px] sm:min-h-[290px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 60) {
                  prevTestimonial();
                } else if (info.offset.x < -60) {
                  nextTestimonial();
                }
              }}
              className="w-full p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] shadow-sm relative"
            >
              {/* Rating Stars & Metric Tag */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 ml-2">
                    5.0 Verified Review
                  </span>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#00C99A]/10 text-[#00A980] dark:text-[#00C99A] border border-[#00C99A]/30">
                  {activeReview.metricHighlight}
                </span>
              </div>

              {/* Large Editorial Quote */}
              <blockquote className="text-lg sm:text-2xl font-medium text-[#10243A] dark:text-slate-100 leading-relaxed mb-8">
                &ldquo;{activeReview.quote}&rdquo;
              </blockquote>

              {/* Author & Verification Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/[0.08]">
                <div>
                  <div className="text-base sm:text-lg font-bold text-[#10243A] dark:text-white">
                    {activeReview.author}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-[#8999AD] font-medium">
                    {activeReview.role},{" "}
                    <span className="text-[#00A980] dark:text-[#00C99A] font-semibold">
                      {activeReview.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-[#00A980] dark:text-[#00C99A]" />
                  <span>Verified Engagement // {activeReview.projectRef}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIdx ? 1 : -1);
                setCurrentIdx(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIdx === idx
                  ? "w-8 bg-[#00C99A]"
                  : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
