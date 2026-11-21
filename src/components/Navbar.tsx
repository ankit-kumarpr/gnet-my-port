"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, Activity } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Work & Projects", href: "/#projects" },
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 md:px-8 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-5 md:px-7 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? "glass-nav shadow-2xl shadow-black/80"
              : "bg-brand-surface/40 backdrop-blur-md border border-white/[0.06]"
          }`}
        >
          {/* Brand Logo with Animated Gradient Ring */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-brand-green to-emerald-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />
              <div className="relative w-9 h-9 rounded-xl bg-brand-dark border border-brand-green/40 flex items-center justify-center font-black text-lg text-white shadow-inner">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-green to-emerald-200">
                  G
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1 group-hover:text-slate-100 transition-colors">
                Grandeur <span className="text-brand-green font-black">Net</span>
              </span>
              <span className="text-[9px] tracking-widest text-brand-muted uppercase font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-radar" />
                Digital Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav with Floating Gliding Indicator */}
          <nav
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden lg:flex items-center gap-1 bg-brand-dark/70 border border-white/[0.08] rounded-full p-1.5 backdrop-blur-xl relative"
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredIdx === idx;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 z-10 flex items-center gap-1.5 ${
                    isActive
                      ? "text-brand-green"
                      : isHovered
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.name === "Work & Projects" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  )}

                  {/* Active / Hover Background Pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full -z-10 border border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-brand-green/10 rounded-full -z-10 border border-brand-green/30"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Live Availability + Magnetic Start Button */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-dark/60 border border-brand-border/60 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-radar" />
              <span>Available for Q4</span>
            </div>

            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-green via-brand-green-light to-emerald-400 hover:shadow-xl hover:shadow-brand-green/30 transition-all duration-300 hover:scale-[1.03] overflow-hidden"
            >
              <span className="relative z-10">Start Project</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {/* Shimmer sheen */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-brand-dark border border-brand-border text-white hover:text-brand-green transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-dark/95 lg:hidden pt-28 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-brand-muted pb-3 border-b border-white/[0.08]">
                <span>Navigation Menu</span>
                <span className="text-brand-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                  Live
                </span>
              </div>

              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-slate-200 hover:text-brand-green transition-colors py-3 border-b border-white/[0.05] flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full font-bold bg-gradient-to-r from-brand-green to-brand-green-light text-brand-dark shadow-lg shadow-brand-green/20 block"
              >
                Discuss Your Project →
              </Link>
              <div className="text-xs text-center text-slate-500 font-mono">
                Bengali Kothi Chowk, Haridwar Bypass Rd, Dehradun
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
