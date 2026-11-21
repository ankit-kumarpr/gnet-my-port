"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TechNode {
  id: string;
  name: string;
  category: string;
  color: string;
  bgGlow: string;
  icon: (props: { className?: string }) => JSX.Element;
  baseAngle: number; // degrees around the circular orbit (0 = right, 90 = bottom, 180 = left, 270 = top)
}

/* Custom sharp SVG tech icons */
const TechIcons = {
  React: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 115.3 100" fill="currentColor">
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(30 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(90 57.65 50)" />
      <ellipse cx="57.65" cy="50" rx="16.5" ry="46" fill="none" stroke="#38bdf8" strokeWidth="4.5" transform="rotate(150 57.65 50)" />
      <circle cx="57.65" cy="50" r="9" fill="#38bdf8" />
    </svg>
  ),
  Nextjs: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="88" fill="#000000" stroke="#ffffff" strokeWidth="4" />
      <path d="M149.5 157.5L69.1 54H54V126H66.1V69.4L140 164.8C143.3 162.6 146.5 160.2 149.5 157.5Z" fill="white" />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </svg>
  ),
  Nodejs: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2.5L28 9.5V22.5L16 29.5L4 22.5V9.5L16 2.5Z" stroke="#22c55e" strokeWidth="2.5" fill="#052e16" />
      <path d="M12 11V21M12 14C12.8 12.8 14.5 12 16.5 12C18.8 12 20 13.5 20 15.5V21" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  TypeScript: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#0284c7" />
      <path d="M7 11H17M12 11V23M18 19.5C18.5 21.2 20 22 22 22C24 22 25.5 21 25.5 19.2C25.5 16.8 23 16.2 20.8 15.6C18.5 15 18 13.5 18 12.2C18 10.4 19.8 9 22 9C24 9 25.2 9.8 25.8 11.2" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Python: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M15.8 3C10.5 3 11 5.3 11 5.3L11.1 7.7H16V9.2H9.2C7 9.2 5 10.5 5 13.5C5 16.5 6.3 17.5 8 17.5H9.5V15.2C9.5 12.8 11.5 12.8 11.5 12.8H16.2C18.5 12.8 18.5 10.8 18.5 10.8V5.3C18.5 5.3 18.8 3 15.8 3ZM13.8 4.8C14.3 4.8 14.8 5.2 14.8 5.8C14.8 6.3 14.3 6.8 13.8 6.8C13.2 6.8 12.8 6.3 12.8 5.8C12.8 5.2 13.2 4.8 13.8 4.8Z" fill="#38bdf8" />
      <path d="M16.2 29C21.5 29 21 26.7 21 26.7L20.9 24.3H16V22.8H22.8C25 22.8 27 21.5 27 18.5C27 15.5 25.7 14.5 24 14.5H22.5V16.8C22.5 19.2 20.5 19.2 20.5 19.2H15.8C13.5 19.2 13.5 21.2 13.5 21.2V26.7C13.5 26.7 13.2 29 16.2 29ZM18.2 27.2C17.7 27.2 17.2 26.8 17.2 26.2C17.2 25.7 17.7 25.2 18.2 25.2C18.8 25.2 19.2 25.7 19.2 26.2C19.2 26.8 18.8 27.2 18.2 27.2Z" fill="#fbbf24" />
    </svg>
  ),
  MongoDB: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 2C16 2 8 9.5 8 16.5C8 22.5 13 26.5 15.5 29.5L16 30L16.5 29.5C19 26.5 24 22.5 24 16.5C24 9.5 16 2 16 2Z" fill="#10b981" />
      <path d="M16 2V30C16 30 15 27 15 24.5C15 17 16 11 16 2Z" fill="#34d399" />
    </svg>
  ),
  PostgreSQL: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M16 4C9.5 4 6 8.5 6 15C6 21.5 9 25 12 26.5C12.5 26.8 13.5 27.5 14 28H18C18.5 27.5 19.5 26.8 20 26.5C23 25 26 21.5 26 15C26 8.5 22.5 4 16 4Z" stroke="#38bdf8" strokeWidth="2" fill="#082f49" />
      <path d="M11 14C11 14 13 16 16 16C19 16 21 14 21 14M16 16V22" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  AWS: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M6 20C11.5 24 20.5 24 26 19" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 18L26.5 19L24.5 22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="5" y="15" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif">aws</text>
    </svg>
  ),
  Docker: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <path d="M5 16H8V19H5V16ZM9 16H12V19H9V16ZM13 16H16V19H13V16ZM9 12H12V15H9V12ZM13 12H16V15H13V12ZM17 12H20V15H17V12ZM13 8H16V11H13V8ZM17 8H20V11H17V8Z" fill="#38bdf8" />
      <path d="M28 17C27.5 15.5 26 15 25 15C24.5 13.5 23.5 13 23.5 13L22 17H3C3 17 3.5 24 11 24C18.5 24 24 22 26 19C28 19 28.5 18 28 17Z" stroke="#38bdf8" strokeWidth="1.5" fill="#0369a1" fillOpacity="0.4" />
    </svg>
  ),
  Cloud: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#047857" fillOpacity="0.3" stroke="#34d399" />
    </svg>
  ),
};

/* The 10 Technology Nodes arranged in the exact order shown in the user's reference image 2.webp:
   Clockwise starting from 12 o'clock:
   1. React (270° = 12 o'clock)
   2. Node.js (306° = ~1:12)
   3. Python (342° = ~2:24)
   4. AWS (18° = ~3:36)
   5. Docker (54° = ~4:48)
   6. Cloud (90° = ~6:00, bottom)
   7. PostgreSQL (126° = ~7:12)
   8. MongoDB (162° = ~8:24)
   9. TypeScript (198° = ~9:36)
   10. Next.js (234° = ~10:48)
*/
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

  // Orbit radius (pixels from center)
  const orbitRadiusX = 195;
  const orbitRadiusY = 190;

  // Parallax spring tracking on mouse hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);

  // Silky 60fps continuous planetary revolution & interactive hover acceleration
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Base speed: 12 deg/sec. When globe is hovered: 45 deg/sec (acceleration). When hovering a specific node: 4 deg/sec
      const speed = hoveredNode ? 4 : isGlobeHovered ? 45 : 12;
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
      className="relative w-full max-w-[560px] aspect-square mx-auto flex items-center justify-center select-none"
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
        <div className="absolute w-[380px] h-[380px] rounded-full bg-brand-green/[0.18] blur-[110px] pointer-events-none animate-pulse" />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/[0.15] blur-[85px] pointer-events-none" />

        {/* Ambient Omega Space Constellation Micro-particles */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-brand-green/80 animate-ping" style={{ animationDuration: "3.5s" }} />
          <span className="absolute top-[25%] right-[16%] w-1 h-1 rounded-full bg-cyan-400/90 animate-pulse" style={{ animationDuration: "2s" }} />
          <span className="absolute bottom-[22%] left-[14%] w-1.5 h-1.5 rounded-full bg-emerald-300/70 animate-ping" style={{ animationDuration: "4s" }} />
          <span className="absolute bottom-[16%] right-[22%] w-1 h-1 rounded-full bg-teal-400/90 animate-pulse" style={{ animationDuration: "2.8s" }} />
          <span className="absolute top-[50%] left-[8%] w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDuration: "3s" }} />
          <span className="absolute top-[45%] right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-300/60 animate-ping" style={{ animationDuration: "4.5s" }} />
        </div>

        {/* =========================================================================
            3D LUMINOUS SWEEPING ORBITAL TRAJECTORY LINES (Omega Space Sustainability)
            ========================================================================= */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          viewBox="-280 -280 560 560"
        >
          <defs>
            <linearGradient id="orbitCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="tiltedArcGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
              <stop offset="25%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="tiltedArcGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#065f46" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
            </linearGradient>

            <filter id="orbitGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <radialGradient id="planetCoronaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="85%" stopColor="#34d399" stopOpacity="0.4" />
              <stop offset="97%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Main Circular Orbital Guide Connecting the 10 Badges */}
          <circle
            cx="0"
            cy="0"
            r={orbitRadiusX}
            fill="none"
            stroke="url(#orbitCircleGrad)"
            strokeWidth="1.6"
            strokeDasharray="4 6"
            className="opacity-70"
          />

          {/* Omega Space Sweeping Tilted Elliptical Orbital Arc 1 (Tilted -24 deg) */}
          <g transform="rotate(-24)">
            <ellipse
              cx="0"
              cy="0"
              rx="235"
              ry="78"
              fill="none"
              stroke="url(#tiltedArcGrad1)"
              strokeWidth="2.5"
              filter="url(#orbitGlow)"
              className="opacity-85"
            />
            {/* Satellite Beacon traveling on Arc 1 */}
            <circle
              cx={Math.cos((rotationAngle * 1.5 * Math.PI) / 180) * 235}
              cy={Math.sin((rotationAngle * 1.5 * Math.PI) / 180) * 78}
              r="3.5"
              fill="#38bdf8"
              filter="url(#orbitGlow)"
              className="animate-pulse"
            />
          </g>

          {/* Omega Space Sweeping Tilted Elliptical Orbital Arc 2 (Tilted +36 deg) */}
          <g transform="rotate(36)">
            <ellipse
              cx="0"
              cy="0"
              rx="220"
              ry="65"
              fill="none"
              stroke="url(#tiltedArcGrad2)"
              strokeWidth="1.8"
              strokeDasharray="8 6"
              className="opacity-60"
            />
            {/* Satellite Beacon traveling on Arc 2 */}
            <circle
              cx={Math.cos((-rotationAngle * 1.2 * Math.PI) / 180) * 220}
              cy={Math.sin((-rotationAngle * 1.2 * Math.PI) / 180) * 65}
              r="3"
              fill="#34d399"
              filter="url(#orbitGlow)"
            />
          </g>

          {/* Beacons along the main orbital badge track */}
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const bx = Math.cos(rad) * orbitRadiusX;
            const by = Math.sin(rad) * orbitRadiusY;
            return (
              <circle
                key={deg}
                cx={bx}
                cy={by}
                r="2.2"
                fill="#34d399"
                className="opacity-60"
              />
            );
          })}
        </svg>

        {/* =========================================================================
            CENTRAL 3D PLANETARY GLOBE (Omega Space Planet + Grandeur Net Monogram)
            ========================================================================= */}
        <div
          className="relative w-[218px] h-[218px] rounded-full flex items-center justify-center transition-transform duration-500 z-15"
          style={{
            background:
              "radial-gradient(circle at 32% 24%, #10b981 0%, #0d9488 20%, #064e3b 45%, #022c22 70%, #03141c 90%, #01080e 100%)",
            boxShadow:
              "0 0 70px rgba(16, 185, 129, 0.6), inset -20px -25px 40px rgba(1, 8, 14, 0.95), inset 15px 15px 25px rgba(255, 255, 255, 0.45)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Planetary Atmospheric Rim Glow (Omega Space Cyan/Emerald Corona) */}
          <div className="absolute inset-[-12px] rounded-full border-2 border-emerald-400/60 shadow-[0_0_50px_rgba(16,185,129,0.7),0_0_20px_rgba(56,189,248,0.5)] animate-pulse pointer-events-none" />

          {/* Atmospheric Crescent Light Shading */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(52,211,153,0.15) 30%, transparent 60%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* 3D Rotating Meridians, Continents & City Light Constellations */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none opacity-70"
            style={{
              transform: `rotate(${rotationAngle * 0.45}deg)`,
              transition: "transform 0.08s linear",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Latitude parallels */}
              <ellipse cx="50" cy="50" rx="47" ry="15" fill="none" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.75" />
              <ellipse cx="50" cy="50" rx="47" ry="30" fill="none" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.65" />
              <ellipse cx="50" cy="50" rx="47" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.85" />
              {/* Longitude meridians */}
              <ellipse cx="50" cy="50" rx="15" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.75" />
              <ellipse cx="50" cy="50" rx="30" ry="47" fill="none" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.65" />
              <line x1="50" y1="3" x2="50" y2="97" stroke="#6ee7b7" strokeWidth="0.75" opacity="0.7" />
              <line x1="3" y1="50" x2="97" y2="50" stroke="#6ee7b7" strokeWidth="0.75" opacity="0.7" />

              {/* Nocturnal Continent City-Light Clusters (Omega Space Aesthetic) */}
              {/* North America / Europe Cluster */}
              <circle cx="34" cy="32" r="1.8" fill="#34d399" className="animate-ping" style={{ animationDuration: "3s" }} />
              <circle cx="38" cy="28" r="1.4" fill="#38bdf8" />
              <circle cx="42" cy="35" r="1.6" fill="#facc15" />
              <circle cx="46" cy="30" r="1.3" fill="#34d399" />
              {/* Asia / India (Dehradun Labs node) */}
              <circle cx="66" cy="40" r="2.2" fill="#10b981" className="animate-ping" style={{ animationDuration: "2s" }} />
              <circle cx="68" cy="42" r="1.5" fill="#facc15" />
              <circle cx="72" cy="46" r="1.4" fill="#38bdf8" />
              {/* Southern Hemisphere Cluster */}
              <circle cx="52" cy="68" r="1.6" fill="#a7f3d0" />
              <circle cx="58" cy="72" r="1.3" fill="#38bdf8" />
              <circle cx="32" cy="62" r="1.4" fill="#34d399" />

              {/* Data Transmission Arc between Global Labs */}
              <path
                d="M34,32 Q50,22 66,40"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <path
                d="M66,40 Q60,56 52,68"
                fill="none"
                stroke="#34d399"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Large Iconic Glowing Green "G" Emblem matching 2.webp */}
          <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: isGlobeHovered ? [1, 1.08, 1] : [1, 1.04, 1],
              }}
              transition={{ duration: isGlobeHovered ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-300 via-brand-green to-emerald-950 flex items-center justify-center shadow-[0_0_55px_rgba(16,185,129,0.95)] border-2 border-emerald-200/80"
            >
              <span className="text-5xl font-black italic tracking-tighter text-brand-dark drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                G
              </span>
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            ORBITING 10 TECHNOLOGY BADGE CARDS (Matching 2.webp in Exact Clockwise Order)
            ========================================================================= */}
        {TECH_NODES.map((tech) => {
          const isHovered = hoveredNode === tech.id;
          const Icon = tech.icon;

          // Continuous orbital revolution angle
          const currentDeg = (tech.baseAngle + rotationAngle) % 360;
          const rad = (currentDeg * Math.PI) / 180;

          // Trigonometric coordinates
          const x = Math.cos(rad) * orbitRadiusX;
          const y = Math.sin(rad) * orbitRadiusY;

          return (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredNode(tech.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute cursor-pointer transition-transform duration-100 group"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.18 : 1})`,
                zIndex: isHovered ? 40 : 25,
              }}
            >
              {/* Radial Glowing Aura on Hover */}
              {isHovered && (
                <div
                  className="absolute inset-[-14px] rounded-2xl blur-md pointer-events-none transition-opacity duration-300"
                  style={{ background: tech.bgGlow }}
                />
              )}

              {/* Connecting Laser Beam to Central Globe when Hovered */}
              {isHovered && (
                <svg
                  className="absolute pointer-events-none z-[-1] overflow-visible"
                  style={{
                    left: 0,
                    top: 0,
                  }}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={-x}
                    y2={-y}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className="animate-pulse"
                  />
                </svg>
              )}

              {/* Glossy Tech Badge Card (Square rounded-2xl card matching 2.webp) */}
              <div
                className={`relative px-3 py-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border backdrop-blur-md shadow-2xl ${
                  isHovered
                    ? "bg-[#07131d]/98 border-brand-green shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-105"
                    : "bg-[#06111a]/90 border-white/[0.12] hover:border-brand-green/60 shadow-[0_8px_20px_rgba(0,0,0,0.7)]"
                }`}
                style={{
                  minWidth: "64px",
                }}
              >
                <div className={`transition-transform duration-300 group-hover:scale-110 ${tech.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-white tracking-tight group-hover:text-brand-green transition-colors">
                  {tech.name}
                </span>

                {/* Micro Tooltip on Hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-7 whitespace-nowrap px-2.5 py-0.5 rounded-md bg-brand-navy border border-brand-green/60 text-[9px] font-mono font-semibold text-brand-green shadow-xl pointer-events-none z-50"
                  >
                    {tech.category}
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
