"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Work & Projects", href: "/#projects" },
  { name: "Services", href: "/#services" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Do not render public navbar on admin dashboard & portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 sm:px-6 lg:px-8 ${
          scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4 md:py-5"
        }`}
      >
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-3.5 sm:px-5 md:px-7 py-2 sm:py-2.5 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "glass-nav shadow-xl shadow-black/30"
              : "bg-white/90 dark:bg-[#080E15]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08]"
          }`}
        >
          {/* =========================================================================
              LEFT: ORIGINAL GRANDEUR NET LOGO (Preserving Exact Proportions)
              ========================================================================= */}
          <Link
            href="/"
            className="group flex items-center shrink-0 transition-opacity duration-200 hover:opacity-95"
            aria-label="Grandeur Net Home"
          >
            {/* Light Mode Logo (Original black outlines & text) */}
            <Image
              src="/images/grandeur-net-logo.png"
              alt="Grandeur Net - Digital Marketing & I.T Services"
              width={1044}
              height={285}
              priority
              className="h-auto w-[150px] sm:w-[175px] md:w-[195px] lg:w-[210px] object-contain light-logo"
            />
            {/* Dark Mode Logo (High contrast white outlines & subtitle, vibrant green) */}
            <Image
              src="/images/grandeur-net-logo-dark.png"
              alt="Grandeur Net - Digital Marketing & I.T Services"
              width={1044}
              height={285}
              priority
              className="h-auto w-[150px] sm:w-[175px] md:w-[195px] lg:w-[210px] object-contain dark-logo"
            />
          </Link>

          {/* =========================================================================
              CENTER: ELEGANT DESKTOP NAVIGATION
              ========================================================================= */}
          <nav
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden md:flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07] rounded-full p-1 backdrop-blur-md relative"
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredIdx === idx;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`relative px-3.5 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-[13px] font-medium rounded-full transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-[#00A980] dark:text-[#00D6A0] font-semibold"
                      : isHovered
                      ? "text-[#101820] dark:text-white"
                      : "text-[#586575] dark:text-[#A6B3C0]"
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Hover Pill Background */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-black/[0.05] dark:bg-white/[0.08] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Active Indicator Background */}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-[#00A980]/10 dark:bg-[#00D6A0]/10 rounded-full -z-10 border border-[#00A980]/20 dark:border-[#00D6A0]/25"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* =========================================================================
              RIGHT: START A PROJECT BUTTON + COMPACT THEME TOGGLE
              ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Primary CTA: "Start a Project" (Desktop / Tablet) */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex group relative items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#05090B] bg-gradient-to-r from-[#00D6A0] to-[#00BF8F] hover:from-[#10B981] hover:to-[#00D6A0] shadow-md shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="relative z-10 font-bold tracking-wide">Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </Link>

            {/* Small Elegant Theme Toggle (32px-36px) */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.1] dark:border-white/[0.09] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00A980] dark:hover:text-[#00D6A0] transition-all duration-200 focus:outline-none cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-slate-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.09] text-slate-800 dark:text-white hover:text-[#00D6A0] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER MENU (Clean, Premium, High Usability)
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#F7F9FC]/95 dark:bg-[#05090B]/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#586575] dark:text-[#A6B3C0] pb-3 border-b border-black/[0.08] dark:border-white/[0.08]">
                <span>Navigation</span>
                <span className="text-[#00A980] dark:text-[#00D6A0] font-semibold">
                  Grandeur Net
                </span>
              </div>

              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-bold text-[#101820] dark:text-slate-100 hover:text-[#00A980] dark:hover:text-[#00D6A0] transition-colors py-3.5 border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA Area */}
            <div className="space-y-4 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00D6A0] to-[#00BF8F] text-[#05090B] shadow-lg shadow-[#00D6A0]/20 flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-center text-[#586575] dark:text-[#A6B3C0] font-mono">
                Dehradun 248001, India
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
