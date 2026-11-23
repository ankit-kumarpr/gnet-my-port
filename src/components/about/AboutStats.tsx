"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2, Activity, ShieldCheck } from "lucide-react";

interface StatItem {
  id: string;
  targetNumber: number;
  suffix: string;
  decimals?: number;
  label: string;
  sublabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS: StatItem[] = [
  {
    id: "years",
    targetNumber: 8,
    suffix: "+",
    label: "Years in Market",
    sublabel: "Est. 2017 in Dehradun",
    description: "Continuous production delivery through technological shifts.",
    icon: Clock,
  },
  {
    id: "projects",
    targetNumber: 250,
    suffix: "+",
    label: "Shipped Projects",
    sublabel: "5 Global Territories",
    description: "Deployed across India, Australia, UAE, UK, and USA.",
    icon: Globe2,
  },
  {
    id: "velocity",
    targetNumber: 99.4,
    suffix: "%",
    decimals: 1,
    label: "Sprint Delivery Rate",
    sublabel: "14-Day Agile Sprints",
    description: "On-time milestone velocity with zero scope creep.",
    icon: Activity,
  },
  {
    id: "retention",
    targetNumber: 98.4,
    suffix: "%",
    decimals: 1,
    label: "Client Retention Rate",
    sublabel: "Long-Term Partnerships",
    description: "Partners retain our engineering guild post-launch.",
    icon: ShieldCheck,
  },
];

function StatCounter({
  target,
  suffix,
  decimals = 0,
}: {
  target: number;
  suffix: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Ease out expo curve for a high-end feel
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeOutProgress * target;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function AboutStats() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0B1929] border-y border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C99A] animate-pulse" />
              <span>Verified Operational Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#10243A] dark:text-white tracking-tight">
              Numbers Built on <span className="text-[#00A980] dark:text-[#00C99A]">Obsessive Craft</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8999AD] max-w-md font-normal leading-relaxed">
            Every metric reflects real production telemetry, audited sprint deliverables, and long-term commercial ROI.
          </p>
        </div>

        {/* Refined Horizontal Statistics Layout with Subtle Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/[0.08] border border-slate-200 dark:border-white/[0.08] rounded-2xl bg-slate-50/50 dark:bg-[#071321]/50 overflow-hidden shadow-sm">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Minimal Icon & Sublabel */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-200/60 dark:bg-white/[0.06] flex items-center justify-center text-[#00A980] dark:text-[#00C99A]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-[#8999AD] uppercase tracking-wider">
                      {stat.sublabel}
                    </span>
                  </div>

                  {/* Large Readable Kinetic Number */}
                  <div className="text-4xl sm:text-5xl font-black text-[#10243A] dark:text-white tracking-tight mb-2">
                    <StatCounter
                      target={stat.targetNumber}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </div>

                  {/* Stat Label */}
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wide mb-1.5">
                    {stat.label}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 dark:text-[#8999AD] leading-relaxed font-normal">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
