"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TechNode {
  id: string;
  name: string;
  category: string;
  color: string;
  bgGlow: string;
  icon: (props: { className?: string }) => JSX.Element;
  baseAngle: number;
}

/* Custom sharp SVG tech icons */
const TechIcons = {
  React: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 115.3 100" fill="currentColor">
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(30 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(90 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(150 57.65 50)" />
      <circle cx="57.65" cy="50" r="9" fill="#38bdf8" />
    </svg>
  ),
  Nextjs: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="88" fill="#000000" stroke="#ffffff" strokeWidth="4" />
      <path d="M149.5 157.5L69.1 54H54V126H66.1V69.4L140 164.8C143.3 162.6 146.5 160.2 149.5 157.5Z" fill="white" />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  ),
  Nodejs: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2.5L28 9.5V22.5L16 29.5L4 22.5V9.5L16 2.5Z" stroke="#22c55e" strokeWidth="2.5" fill="#052e16" />
      <path d="M12 11V21M12 14C12.8 12.8 14.5 12 16.5 12C18.8 12 20 13.5 20 15.5V21" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  TypeScript: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0284c7" />
      <path d="M7 11H17M12 11V23M18 19.5C18.5 21.2 20 22 22 22C24 22 25.5 21 25.5 19.2C25.5 16.8 23 16.2 20.8 15.6C18.5 15 18 13.5 18 12.2C18 10.4 19.8 9 22 9C24 9 25.2 9.8 25.8 11.2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Python: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M15.8 3C10.5 3 11 5.3 11 5.3L11.1 7.7H16V9.2H9.2C7 9.2 5 10.5 5 13.5C5 16.5 6.3 17.5 8 17.5H9.5V15.2C9.5 12.8 11.5 12.8 11.5 12.8H16.2C18.5 12.8 18.5 10.8 18.5 10.8V5.3C18.5 5.3 18.8 3 15.8 3ZM13.8 4.8C14.3 4.8 14.8 5.2 14.8 5.8C14.8 6.3 14.3 6.8 13.8 6.8C13.2 6.8 12.8 6.3 12.8 5.8C12.8 5.2 13.2 4.8 13.8 4.8Z" fill="#38bdf8" />
      <path d="M16.2 29C21.5 29 21 26.7 21 26.7L20.9 24.3H16V22.8H22.8C25 22.8 27 21.5 27 18.5C27 15.5 25.7 14.5 24 14.5H22.5V16.8C22.5 19.2 20.5 19.2 20.5 19.2H15.8C13.5 19.2 13.5 21.2 13.5 21.2V26.7C13.5 26.7 13.2 29 16.2 29ZM18.2 27.2C17.7 27.2 17.2 26.8 17.2 26.2C17.2 25.7 17.7 25.2 18.2 25.2C18.8 25.2 19.2 25.7 19.2 26.2C19.2 26.8 18.8 27.2 18.2 27.2Z" fill="#fbbf24" />
    </svg>
  ),
  MongoDB: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2C16 2 8 9.5 8 16.5C8 22.5 13 26.5 15.5 29.5L16 30L16.5 29.5C19 26.5 24 22.5 24 16.5C24 9.5 16 2 16 2Z" fill="#10b981" />
      <path d="M16 2V30C16 30 15 27 15 24.5C15 17 16 11 16 2Z" fill="#34d399" />
    </svg>
  ),
  PostgreSQL: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 4C9.5 4 6 8.5 6 15C6 21.5 9 25 12 26.5C12.5 26.8 13.5 27.5 14 28H18C18.5 27.5 19.5 26.8 20 26.5C23 25 26 21.5 26 15C26 8.5 22.5 4 16 4Z" stroke="#38bdf8" strokeWidth="2" fill="#082f49" />
      <path d="M11 14C11 14 13 16 16 16C19 16 21 14 21 14M16 16V22" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  AWS: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M6 20C11.5 24 20.5 24 26 19" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 18L26.5 19L24.5 22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="5" y="15" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">aws</text>
    </svg>
  ),
  Docker: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M5 16H8V19H5V16ZM9 16H12V19H9V16ZM13 16H16V19H13V16ZM9 12H12V15H9V12ZM13 12H16V15H13V12ZM17 12H20V15H17V12ZM13 8H16V11H13V8ZM17 8H20V11H17V8Z" fill="#38bdf8" />
      <path d="M28 17C27.5 15.5 26 15 25 15C24.5 13.5 23.5 13 23.5 13L22 17H3C3 17 3.5 24 11 24C18.5 24 24 22 26 19C28 19 28.5 18 28 17Z" stroke="#38bdf8" strokeWidth="1.5" fill="#0369a1" fillOpacity="0.4" />
    </svg>
  ),
  Cloud: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#047857" fillOpacity="0.3" stroke="#34d399" />
    </svg>
  ),
};

const TECH_NODES: TechNode[] = [
  { id: "react", name: "React", category: "Frontend Engine", color: "text-sky-400", bgGlow: "rgba(56, 189, 248, 0.4)", icon: TechIcons.React, baseAngle: 270 },
  { id: "nodejs", name: "Node.js", category: "Async Runtime", color: "text-emerald-400", bgGlow: "rgba(34, 197, 94, 0.4)", icon: TechIcons.Nodejs, baseAngle: 306 },
  { id: "python", name: "Python", category: "AI & Automation", color: "text-amber-400", bgGlow: "rgba(251, 191, 36, 0.4)", icon: TechIcons.Python, baseAngle: 342 },
  { id: "aws", name: "AWS", category: "Cloud Infrastructure", color: "text-amber-500", bgGlow: "rgba(245, 158, 11, 0.4)", icon: TechIcons.AWS, baseAngle: 18 },
  { id: "docker", name: "Docker", category: "Containerization", color: "text-cyan-400", bgGlow: "rgba(34, 211, 238, 0.4)", icon: TechIcons.Docker, baseAngle: 54 },
  { id: "cloud", name: "Cloud", category: "Global CDN Edge", color: "text-white", bgGlow: "rgba(255, 255, 255, 0.35)", icon: TechIcons.Cloud, baseAngle: 90 },
  { id: "postgres", name: "PostgreSQL", category: "Relational Vault", color: "text-sky-400", bgGlow: "rgba(56, 189, 248, 0.4)", icon: TechIcons.PostgreSQL, baseAngle: 126 },
  { id: "mongodb", name: "MongoDB", category: "Document Store", color: "text-emerald-400", bgGlow: "rgba(16, 185, 129, 0.4)", icon: TechIcons.MongoDB, baseAngle: 162 },
  { id: "typescript", name: "TypeScript", category: "Type-Safe Core", color: "text-blue-400", bgGlow: "rgba(2, 132, 199, 0.4)", icon: TechIcons.TypeScript, baseAngle: 198 },
  { id: "nextjs", name: "Next.js", category: "Edge Framework", color: "text-white", bgGlow: "rgba(255, 255, 255, 0.4)", icon: TechIcons.Nextjs, baseAngle: 234 },
];

export default function TechGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [containerSize, setContainerSize] = useState(480);

  // Measure container width to scale orbits and elements dynamically
  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const measured = Math.min(rect.width, rect.height || rect.width);
      if (measured > 0) {
        setContainerSize(measured);
      }
    }
  }, []);

  useEffect(() => {
    updateSize();
    const observer = new ResizeObserver(() => updateSize());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  // Scaled dimensions ensuring icons NEVER exceed the container bounds:
  // Orbit radius is calibrated to 35% of container size (max 175px)
  const orbitRadius = Math.max(100, Math.min(containerSize * 0.35, 175));
  const globeSize = Math.max(115, Math.min(containerSize * 0.38, 195));
  const cardScale = Math.max(0.68, Math.min(containerSize / 460, 0.95));

  // Parallax spring tracking on mouse hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  // Continuous planetary revolution
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Base speed: 12 deg/sec. Accelerated when globe hovered: 36 deg/sec. Slowed on node hover: 4 deg/sec.
      const speed = hoveredNode ? 4 : isGlobeHovered ? 36 : 12;
      setRotationAngle((prev) => (prev + speed * delta) % 360);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isGlobeHovered, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsGlobeHovered(false);
    setHoveredNode(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsGlobeHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[520px] aspect-square mx-auto flex items-center justify-center select-none overflow-visible"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Background Atmospheric Deep-Space Nebula Glow */}
        <div
          className="absolute rounded-full bg-brand-green/[0.15] blur-[90px] sm:blur-[110px] pointer-events-none animate-pulse"
          style={{ width: globeSize * 1.8, height: globeSize * 1.8 }}
        />
        <div
          className="absolute rounded-full bg-cyan-500/[0.12] blur-[70px] pointer-events-none"
          style={{ width: globeSize * 1.4, height: globeSize * 1.4 }}
        />

        {/* =========================================================================
            3D LUMINOUS SWEEPING ORBITAL TRAJECTORY SVG LINES
            ========================================================================= */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="-250 -250 500 500"
        >
          <defs>
            <linearGradient id="orbitCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="tiltedArcGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
              <stop offset="30%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="tiltedArcGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#065f46" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
            </linearGradient>

            <filter id="orbitGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Main Circular Orbital Guide */}
          <circle
            cx="0"
            cy="0"
            r={orbitRadius}
            fill="none"
            stroke="url(#orbitCircleGrad)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            className="opacity-60"
          />

          {/* Tilted Elliptical Orbital Arc 1 (Tilted -24 deg) */}
          <g transform="rotate(-24)">
            <ellipse
              cx="0"
              cy="0"
              rx={orbitRadius * 1.16}
              ry={orbitRadius * 0.42}
              fill="none"
              stroke="url(#tiltedArcGrad1)"
              strokeWidth="1.8"
              filter="url(#orbitGlow)"
              className="opacity-70"
            />
          </g>

          {/* Tilted Elliptical Orbital Arc 2 (Tilted +36 deg) */}
          <g transform="rotate(36)">
            <ellipse
              cx="0"
              cy="0"
              rx={orbitRadius * 1.08}
              ry={orbitRadius * 0.36}
              fill="none"
              stroke="url(#tiltedArcGrad2)"
              strokeWidth="1.4"
              strokeDasharray="6 6"
              className="opacity-50"
            />
          </g>
        </svg>

        {/* =========================================================================
            CENTRAL 3D PLANETARY GLOBE WITH GRANDEUR NET 'G' MONOGRAM
            ========================================================================= */}
        <div
          className="relative rounded-full flex items-center justify-center transition-all duration-300 z-15"
          style={{
            width: `${globeSize}px`,
            height: `${globeSize}px`,
            background:
              "radial-gradient(circle at 30% 22%, #10b981 0%, #0d9488 22%, #064e3b 50%, #022c22 75%, #01161a 90%, #01080e 100%)",
            boxShadow:
              "0 0 50px rgba(16, 185, 129, 0.45), inset -14px -18px 30px rgba(1, 8, 14, 0.95), inset 10px 10px 18px rgba(255, 255, 255, 0.35)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Planetary Atmospheric Rim Lighting */}
          <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-full border border-emerald-400/40 shadow-[0_0_30px_rgba(16,185,129,0.45)] pointer-events-none" />

          {/* Specular Highlight Arc */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(52,211,153,0.1) 28%, transparent 55%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          {/* Rotating Subtle Architectural Grid Coordinates */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-50"
            style={{
              transform: `rotate(${rotationAngle * 0.4}deg)`,
              transition: "transform 0.08s linear",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <ellipse cx="50" cy="50" rx="47" ry="16" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="47" ry="32" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.5" />
              <ellipse cx="50" cy="50" rx="47" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="1" opacity="0.7" />
              <ellipse cx="50" cy="50" rx="16" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="32" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.5" />
              <line x1="50" y1="3" x2="50" y2="97" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
              <line x1="3" y1="50" x2="97" y2="50" stroke="#6ee7b7" strokeWidth="0.7" opacity="0.6" />
            </svg>
          </div>

          {/* Central Glowing 'G' Monogram Emblem */}
          <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: isGlobeHovered ? [1, 1.05, 1] : [1, 1.02, 1],
              }}
              transition={{ duration: isGlobeHovered ? 1.6 : 3, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-300 via-brand-green to-emerald-950 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.7)] border border-emerald-200/70"
              style={{
                width: `${Math.round(globeSize * 0.42)}px`,
                height: `${Math.round(globeSize * 0.42)}px`,
              }}
            >
              <span
                className="font-black italic tracking-tighter text-[#050A0B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                style={{ fontSize: `${Math.round(globeSize * 0.22)}px` }}
              >
                G
              </span>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            ORBITING 10 TECHNOLOGY BADGE CARDS
            ========================================================================= */}
        {TECH_NODES.map((tech) => {
          const isHovered = hoveredNode === tech.id;
          const Icon = tech.icon;

          const currentDeg = (tech.baseAngle + rotationAngle) % 360;
          const rad = (currentDeg * Math.PI) / 180;

          const x = Math.cos(rad) * orbitRadius;
          const y = Math.sin(rad) * orbitRadius;

          return (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredNode(tech.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute cursor-pointer transition-transform duration-100 group"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) scale(${cardScale * (isHovered ? 1.12 : 1)})`,
                zIndex: isHovered ? 40 : 25,
              }}
            >
              {/* Radial Glowing Aura on Hover */}
              {isHovered && (
                <div
                  className="absolute inset-[-8px] rounded-xl blur-md pointer-events-none transition-opacity duration-300"
                  style={{ background: tech.bgGlow }}
                />
              )}

              {/* Glossy Tech Badge Card */}
              <div
                className={`relative px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border backdrop-blur-md shadow-xl ${
                  isHovered
                    ? "bg-[#07131d]/98 border-[#00D6A0] shadow-[0_0_20px_rgba(0,214,160,0.4)]"
                    : "bg-[#06111a]/90 border-white/[0.10] hover:border-[#00D6A0]/50 shadow-[0_6px_16px_rgba(0,0,0,0.7)]"
                }`}
                style={{
                  minWidth: "52px",
                }}
              >
                <div className={`transition-transform duration-300 group-hover:scale-110 ${tech.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white tracking-tight group-hover:text-[#00D6A0] transition-colors">
                  {tech.name}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
