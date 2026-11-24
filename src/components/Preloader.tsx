"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Disable preloader on admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    // Check if already visited in this session
    const hasVisited = sessionStorage.getItem("grandeur_visited");
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("grandeur_visited", "true");
          }, 400);
          return 100;
        }
        // Organic acceleration
        const increment = prev < 70 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 4) + 1;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-brand-dark p-8 md:p-16 text-white"
        >
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-brand-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
              Grandeur Net
            </span>
            <span>Digital Engineering</span>
          </div>

          {/* Center Brand Identity */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black tracking-tight"
            >
              GRANDEUR<span className="text-brand-green">.</span>
            </motion.h1>
            <p className="text-sm text-brand-muted tracking-widest uppercase">
              Architecting Digital Dominance
            </p>
          </div>

          {/* Bottom Progress Bar & Counter */}
          <div className="w-full max-w-md space-y-3">
            <div className="flex justify-between items-baseline text-sm font-mono">
              <span className="text-brand-muted">Loading Experience</span>
              <span className="text-2xl font-bold text-brand-green">{progress}%</span>
            </div>
            <div className="w-full h-1 bg-brand-navy rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-green to-brand-green-light"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
