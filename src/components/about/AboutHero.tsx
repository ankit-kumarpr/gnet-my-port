"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Activity,
  Terminal,
  Clock,
  Globe2,
  Hand,
  MapPin,
} from "lucide-react";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for 3D card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Parallax badge transforms
  const badgeOneX = useTransform(mouseXSpring, [-0.5, 0.5], ["-14px", "14px"]);
  const badgeOneY = useTransform(mouseYSpring, [-0.5, 0.5], ["-14px", "14px"]);

  const badgeTwoX = useTransform(mouseXSpring, [-0.5, 0.5], ["16px", "-16px"]);
  const badgeTwoY = useTransform(mouseYSpring, [-0.5, 0.5], ["16px", "-16px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Kinetic typography headline words
  const headlineWords = [
    "The",
    "Agency",
    "Built",
    "For",
    "Businesses",
    "That",
    "Outgrow",
    "Agencies.",
  ];

  return (
    <section className="relative pt-36 pb-20 px-4 sm:px-6 md:px-12 overflow-hidden bg-brand-dark select-none">
      {/* Background Ambience with Floating Orbs */}
      <div className="absolute top-10 left-1/3 w-[650px] h-[450px] bg-emerald-500/[0.06] rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-navy/70 rounded-full blur-[150px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Mission & Kinetic Storytelling */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-navy/90 border border-emerald-500/40 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                EST. 2017 // 8+ YEARS OF DIGITAL EXCELLENCE
              </span>
            </motion.div>

            {/* Kinetic Typography Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              <span className="flex flex-wrap">
                {headlineWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-2.5 ${
                      word === "Outgrow"
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200"
                        : word === "Agencies."
                        ? "text-emerald-400 underline decoration-emerald-500/40 underline-offset-8"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Highlighted Lead Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              Founded in 2017 at Bengali Kothi Chowk in Dehradun,{" "}
              <span className="text-white font-semibold">Grandeur Net</span> started as a focused group of creators and evolved into an elite engineering and growth partner serving high-growth brands across{" "}
              <span className="text-emerald-300 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                India, Australia, UAE, the UK, and the USA.
              </span>{" "}
              Zero outsourcing, zero junior handoffs — just experienced builders delivering measurable revenue ROI.
            </motion.p>

            {/* Quick Proof Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="p-3 rounded-2xl bg-[#0c1524]/90 border border-white/[0.08] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">8+ Years</div>
                  <div className="text-[10px] font-mono text-slate-400">Since 2017</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1524]/90 border border-white/[0.08] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400">250+ Projects</div>
                  <div className="text-[10px] font-mono text-slate-400">5 Countries</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1524]/90 border border-white/[0.08] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white">100% IP Ownership</div>
                  <div className="text-[10px] font-mono text-slate-400">No Lock-In</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <Link
                href="/#contact"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 text-brand-dark font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl shadow-emerald-500/25 flex items-center gap-2"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/#work"
                className="px-6 py-3.5 rounded-full bg-brand-navy/90 hover:bg-brand-navy border border-emerald-500/40 hover:border-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-102 flex items-center gap-2"
              >
                <span>View Shipped Work</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 3D Interactive Showcase with Hand Gesture Cursor */}
          <div className="lg:col-span-5 relative">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              className="relative perspective-1200 cursor-crosshair group"
            >
              {/* Dynamic Hand Gesture Cursor Follower Pill */}
              {isHovered && (
                <motion.div
                  className="pointer-events-none absolute z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/95 border border-emerald-400 text-emerald-300 text-[11px] font-mono font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)] backdrop-blur-md"
                  style={{
                    left: mousePos.x + 16,
                    top: mousePos.y + 16,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Hand className="w-3.5 h-3.5 animate-bounce" />
                  <span>3D Tilt Active</span>
                </motion.div>
              )}

              {/* Hand Gesture Hint Pill */}
              <div className="absolute -top-3.5 right-6 z-40 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1829] border border-emerald-500/60 text-emerald-400 text-[10px] font-mono font-bold shadow-md">
                <Hand className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Move Cursor to Tilt</span>
              </div>

              {/* The 3D Tilting Card */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative rounded-3xl bg-gradient-to-b from-[#0e1d2e] via-[#091522] to-[#050b14] border-2 border-emerald-500/40 p-6 sm:p-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.2)] overflow-hidden"
              >
                {/* Corner Cyber Reticles */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none" />

                {/* Animated Inner Cyber Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                {/* Card Interior Header */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-inner">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white tracking-wide">
                        GRANDEUR NET // HQ
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Dehradun, Uttarakhand</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Est. 2017
                  </span>
                </div>

                {/* Real Founder & Leadership Visual Showcase */}
                <div className="relative z-10 my-5 rounded-2xl overflow-hidden border border-white/10 group/img bg-slate-950">
                  <div className="relative h-56 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://grandeurnet.com/images/founder&ceo.jpeg"
                      alt="Grandeur Net Founder & CEO"
                      className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                    {/* Founder Badge Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-white tracking-wide">
                          Founder & CEO
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400">
                          Strategic Architecture & Growth
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-black/70 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                        Direct Lead
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Parallax Metric Badge 1: Top Right */}
                <motion.div
                  style={{ x: badgeOneX, y: badgeOneY }}
                  className="absolute top-16 -right-2 z-20 px-3.5 py-2 rounded-2xl bg-brand-navy/95 border border-emerald-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[11px] font-mono font-bold text-white leading-none">
                      8+ Years In Market
                    </div>
                    <div className="text-[9px] font-mono text-emerald-400 leading-none mt-0.5">
                      Since 2017
                    </div>
                  </div>
                </motion.div>

                {/* Floating Parallax Metric Badge 2: Bottom Left */}
                <motion.div
                  style={{ x: badgeTwoX, y: badgeTwoY }}
                  className="absolute bottom-16 -left-3 z-20 px-3.5 py-2 rounded-2xl bg-[#06111e]/95 border border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-2"
                >
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[11px] font-mono font-bold text-white leading-none">
                      250+ Deployments
                    </div>
                    <div className="text-[9px] font-mono text-cyan-300 leading-none mt-0.5">
                      India • US • UK • UAE • AU
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Spec Footer */}
                <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Stack: 15+ Core Platforms</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>In-House Craft</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
