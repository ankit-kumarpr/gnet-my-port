"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Camera,
  Palette,
  Search,
  Video,
  Award,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  image?: string;
  bio: string;
  expertise: string[];
  badge: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Founder & CEO",
    role: "Founder & Chief Executive Officer",
    discipline: "Strategic Direction & Architecture",
    image: "https://grandeurnet.com/images/founder&ceo.jpeg",
    bio: "Guiding Grandeur Net since 2017. Bridges commercial business objectives with cutting-edge software architecture, leading enterprise projects across India, North America, UAE, UK, and Australia.",
    expertise: [
      "System Architecture",
      "Commercial Growth Strategy",
      "High-Concurrency Platforms",
      "Enterprise Scaling",
    ],
    badge: "FOUNDER & CEO",
  },
  {
    id: "sushant",
    name: "Sushant",
    role: "Full-Stack Web Developer",
    discipline: "Core Platform & APIs",
    image: "https://grandeurnet.com/images/Sushant.jpeg",
    bio: "Senior developer dedicated to Next.js App Router, TypeScript, and distributed Node.js backends. Engineered real-time platforms with sub-second page performance, high reliability, and zero downtime.",
    expertise: [
      "Next.js 15 App Router",
      "TypeScript",
      "Distributed Node.js",
      "PostgreSQL",
      "Sub-Second APIs",
    ],
    badge: "LEAD DEVELOPER",
  },
  {
    id: "uiux-lead",
    name: "UI/UX & Brand Director",
    role: "Lead Product Designer",
    discipline: "Visual Systems & Kinetic UX",
    bio: "Transforms complex workflows into intuitive, high-converting digital products. Directs design token architectures, interactive Figma prototypes, and conversion rate optimization (CRO).",
    expertise: [
      "Figma Design Systems",
      "High-Conversion UX",
      "Micro-Interactions",
      "Wireframing & Prototyping",
      "CRO Optimization",
    ],
    badge: "DESIGN LEAD",
  },
  {
    id: "seo-specialist",
    name: "Senior SEO Architect",
    role: "Senior SEO & Organic Growth Specialist",
    discipline: "Organic Visibility & Semantic Search",
    bio: "Engineers data-driven SEO funnels, programmatic content architectures, semantic schema markups, and Core Web Vitals optimization to capture top Google search rankings.",
    expertise: [
      "Technical SEO Auditing",
      "Semantic Schema Markup",
      "Core Web Vitals",
      "Programmatic SEO",
      "Search Architecture",
    ],
    badge: "SEARCH LEAD",
  },
  {
    id: "video-motion",
    name: "Cinematic Video Producer",
    role: "Video Editor & 3D Motion Designer",
    discipline: "Commercial Media & Motion",
    bio: "Creates commercial-grade video edits, 3D motion typography, viral short-form brand narratives, and multimedia assets that elevate brand perception and digital presence.",
    expertise: [
      "Premiere Pro",
      "After Effects Motion",
      "3D Kinetic Typography",
      "Commercial Storytelling",
      "Sound Design",
    ],
    badge: "MOTION LEAD",
  },
];

interface StudioPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag: string;
}

const STUDIO_PHOTOS: StudioPhoto[] = [
  {
    id: "photo-3",
    url: "https://grandeurnet.com/images/3.jpg",
    title: "Sprint Collaboration",
    caption: "Cross-functional architecture debates in our Dehradun creative hub.",
    tag: "ENGINEERING",
  },
  {
    id: "photo-4",
    url: "https://grandeurnet.com/images/4.jpg",
    title: "Strategy Whiteboarding",
    caption: "Mapping user flows and conversion funnels before writing code.",
    tag: "STRATEGY",
  },
  {
    id: "photo-5",
    url: "https://grandeurnet.com/images/5.jpg",
    title: "Milestone Delivery",
    caption: "Celebrating production deployments with zero downtime.",
    tag: "DELIVERY",
  },
  {
    id: "photo-6",
    url: "https://grandeurnet.com/images/6.jpg",
    title: "Deep Focus State",
    caption: "Uninterrupted engineering flow where complex algorithms are perfected.",
    tag: "FOCUS",
  },
];

export default function EditorialTeamSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeMember = TEAM_MEMBERS[currentIdx];

  const nextMember = () => {
    setCurrentIdx((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const prevMember = () => {
    setCurrentIdx((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#0B1929] border-y border-slate-200 dark:border-white/[0.08] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>In-House Engineering Guild</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#10243A] dark:text-white tracking-tight">
              The People Behind The <span className="text-[#00A980] dark:text-[#00C99A]">Code & Craft</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-2">
              {currentIdx + 1} / {TEAM_MEMBERS.length}
            </span>
            <button
              onClick={prevMember}
              aria-label="Previous team member"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#071321] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00A980] dark:hover:text-[#00C99A] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMember}
              aria-label="Next team member"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#071321] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.1] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-[#00A980] dark:hover:text-[#00C99A] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            EDITORIAL TEAM SHOWCASE (Controlled Carousel / Split Presentation)
            ========================================================================= */}
        <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-slate-50 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT SIDE: Large Professional Portrait */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-200 dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.1] shadow-lg shadow-black/10"
                >
                  {activeMember.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeMember.image}
                      alt={activeMember.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-[#0E1D2E] dark:to-[#071321]">
                      <div className="w-20 h-20 rounded-2xl bg-white dark:bg-[#00C99A]/15 border border-slate-200 dark:border-[#00C99A]/30 flex items-center justify-center text-[#00A980] dark:text-[#00C99A] mb-4 shadow-sm">
                        {activeMember.id === "uiux-lead" && <Palette className="w-9 h-9" />}
                        {activeMember.id === "seo-specialist" && <Search className="w-9 h-9" />}
                        {activeMember.id === "video-motion" && <Video className="w-9 h-9" />}
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-center">
                        {activeMember.discipline}
                      </span>
                    </div>
                  )}

                  {/* Badge Overlay */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#071321]/90 backdrop-blur-md border border-slate-200 dark:border-white/[0.1] text-[10px] font-mono font-bold text-[#00A980] dark:text-[#00C99A]">
                    {activeMember.badge}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE: Member Information, Biography & Expertise */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00A980] dark:text-[#00C99A] font-bold">
                      {activeMember.discipline}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-[#10243A] dark:text-white tracking-tight mt-1">
                      {activeMember.name}
                    </h3>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                      {activeMember.role}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-[#8999AD] leading-relaxed font-normal">
                    {activeMember.bio}
                  </p>

                  <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-[#8999AD]">
                      Core Expertise & Responsibilities:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeMember.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-mono font-medium px-3 py-1.5 rounded-xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Indicator Pips for Fast Selection */}
              <div className="flex items-center gap-2 pt-8 mt-8 border-t border-slate-200 dark:border-white/[0.08]">
                {TEAM_MEMBERS.map((member, idx) => (
                  <button
                    key={member.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIdx === idx
                        ? "w-8 bg-[#00C99A]"
                        : "w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                    }`}
                    aria-label={`Select ${member.name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 9: OUR WORK & STUDIO CULTURE (Clean Editorial Moments)
            ========================================================================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#071321] border border-slate-200 dark:border-white/[0.08] text-[#00A980] dark:text-[#00C99A] font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>Inside Our Dehradun Studio</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#10243A] dark:text-white tracking-tight">
                Where Ideas Transform Into <span className="text-[#00A980] dark:text-[#00C99A]">Production Software</span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#8999AD] max-w-sm font-normal">
              A look into our collaborative war rooms, strategy whiteboards, and focused engineering culture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STUDIO_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#071321] shadow-sm"
              >
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-[#00C99A]">
                    {photo.tag}
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="text-xs font-bold leading-snug">{photo.title}</h4>
                    <p className="text-[10px] text-slate-300 line-clamp-2 mt-0.5">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
