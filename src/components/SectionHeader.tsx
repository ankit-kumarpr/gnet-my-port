"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlightedText,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "space-y-4 max-w-3xl",
        centered ? "mx-auto text-center" : "",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase badge-gradient text-brand-green font-semibold",
            centered ? "mx-auto" : ""
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-radar" />
          {badge}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
        {title}{" "}
        {highlightedText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-emerald-300 to-teal-200 drop-shadow-[0_0_25px_rgba(16,185,129,0.2)]">
            {highlightedText}
          </span>
        )}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
