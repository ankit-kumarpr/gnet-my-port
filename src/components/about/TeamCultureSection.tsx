"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  MapPin,
  Globe2,
  Sparkles,
  ArrowRight,
  Terminal,
  Activity,
  CheckCircle2,
  Zap,
  Mail,
  Phone,
  Camera,
  Heart,
  Palette,
  Search,
  Video,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: string;
  image?: string;
  bio: string;
  skills: string[];
  badge: string;
  accent: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Founder & CEO",
    role: "Founder & Chief Executive Officer",
    discipline: "Strategic Direction & Architecture",
    image: "https://grandeurnet.com/images/founder&ceo.jpeg",
    bio: "Guiding Grandeur Net since 2017. Bridges business objectives with cutting-edge engineering, leading enterprise architectures and client partnerships across 5 global territories.",
    skills: ["System Architecture", "Growth Strategy", "Product Scaling", "Client Advisory"],
    badge: "FOUNDER",
    accent: "#10b981",
  },
  {
    id: "sushant",
    name: "Sushant",
    role: "Full-Stack Web Developer",
    discipline: "Core Platform & APIs",
    image: "https://grandeurnet.com/images/Sushant.jpeg",
    bio: "Master of Next.js App Router, TypeScript, and distributed Node.js backends. Dedicated to building sub-second interactive platforms with zero downtime and ironclad stability.",
    skills: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Sub-Second APIs"],
    badge: "LEAD DEV",
    accent: "#38bdf8",
  },
  {
    id: "uiux-lead",
    name: "UI/UX & Brand Director",
    role: "Lead Product Designer",
    discipline: "Visual Systems & Kinetic UX",
    bio: "Translates complex workflows into intuitive, high-converting digital products. Directs design token architectures, interactive Figma prototypes, and brand identity manuals.",
    skills: ["Figma Design Systems", "Wireframing", "Tactile Micro-Interactions", "CRO"],
    badge: "DESIGN LEAD",
    accent: "#fbbf24",
  },
  {
    id: "seo-specialist",
    name: "SEO Dominance Architect",
    role: "Senior SEO & Organic Growth Specialist",
    discipline: "Organic Visibility & Semantic Search",
    bio: "Engineers data-driven SEO funnels, programmatic content architectures, semantic schema markups, and Core Web Vitals optimization to capture top Google rankings.",
    skills: ["Technical SEO", "Semantic Schema", "Core Web Vitals", "Keyword Dominance"],
    badge: "SEARCH LEAD",
    accent: "#34d399",
  },
  {
    id: "video-motion",
    name: "Cinematic Video Producer",
    role: "Video Editor & 3D Motion Designer",
    discipline: "Commercial Media & Motion",
    bio: "Creates commercial-grade video edits, 3D motion typography, viral short-form social reels, and high-retention brand narratives that turn passive viewers into loyal clients.",
    skills: ["Premiere Pro", "After Effects", "3D Motion Graphics", "Sound Design"],
    badge: "MOTION LEAD",
    accent: "#a855f7",
  },
];

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag: string;
}

const CULTURE_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-3",
    url: "https://grandeurnet.com/images/3.jpg",
    title: "Sprint War Room Collaboration",
    caption: "Cross-functional teams debating architecture and refining micro-interactions in our Dehradun creative hub.",
    tag: "ENGINEERING",
  },
  {
    id: "photo-4",
    url: "https://grandeurnet.com/images/4.jpg",
    title: "Creative Concept Whiteboarding",
    caption: "Mapping out user flows, information architecture, and conversion funnels before writing a single line of code.",
    tag: "STRATEGY",
  },
  {
    id: "photo-5",
    url: "https://grandeurnet.com/images/5.jpg",
    title: "Milestone Celebration & Delivery",
    caption: "Celebrating successful enterprise launches and zero-downtime production deployments with the team.",
    tag: "MILESTONES",
  },
  {
    id: "photo-6",
    url: "https://grandeurnet.com/images/6.jpg",
    title: "Deep-Work Focus Sessions",
    caption: "Uninterrupted engineering flow state where complex algorithms, animations, and APIs are perfected.",
    tag: "FOCUS",
  },
];

export default function TeamCultureSection() {
  const [selectedImage, setSelectedImage] = useState<GalleryPhoto | null>(null);

  return (
    <section className="py-28 px-4 sm:px-6 md:px-12 bg-[#050912] relative overflow-hidden border-t border-white/[0.08] select-none">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[450px] bg-brand-green/[0.04] rounded-full blur-[160px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-brand-navy/60 rounded-full blur-[140px] pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-navy/90 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>In-House Guild // The Makers of Grandeur Net</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              The People Behind The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Code, Creativity & Growth
              </span>
            </h2>
          </div>

          <p className="text-sm text-slate-300 font-mono max-w-md">
            Zero third-party outsourcing or bait-and-switch account managers. Every client project is designed, coded, and deployed directly by our verified in-house team in Dehradun.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 1. CORE TEAM CARDS (FOUNDER, SUSHANT, DESIGN, SEO, VIDEO)          */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-[28px] bg-gradient-to-b from-[#0e1726]/95 via-[#080f1c]/95 to-[#040812]/95 border border-white/[0.08] hover:border-emerald-400/60 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] hover:shadow-[0_25px_60px_-10px_rgba(16,185,129,0.2)] transition-all duration-300"
            >
              {/* Corner Reticles */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-emerald-400/60 transition-colors pointer-events-none" />

              <div>
                {/* Photo or Discipline Icon Header */}
                <div className="relative mb-5 rounded-2xl overflow-hidden border border-white/10 group/img bg-slate-950">
                  {member.image ? (
                    <div className="relative h-56 w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover/img:scale-106 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                        {member.badge}
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#112033] to-[#07111c] relative">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 shadow-lg group-hover:scale-110 transition-transform">
                        {member.id === "uiux-lead" && <Palette className="w-7 h-7" />}
                        {member.id === "seo-specialist" && <Search className="w-7 h-7" />}
                        {member.id === "video-motion" && <Video className="w-7 h-7" />}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
                        {member.discipline}
                      </span>
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[9px] font-mono font-bold text-emerald-300">
                        {member.badge}
                      </div>
                    </div>
                  )}
                </div>

                {/* Name & Titles */}
                <div className="mb-3">
                  <h3 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-emerald-400 font-semibold mt-0.5">
                    {member.role}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
                  {member.bio}
                </p>
              </div>

              {/* Skills Arsenal */}
              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                  Core Competencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. CULTURE & STUDIO LIFE PHOTO GALLERY (3.jpg, 4.jpg, 5.jpg, 6.jpg) */}
        {/* ------------------------------------------------------------------ */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy/90 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                <Camera className="w-3.5 h-3.5" />
                <span>Inside Our Dehradun Studio // Real Moments</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Where Ideas Transform Into <span className="text-emerald-400">Shipped Products</span>
              </h3>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              Take a look inside our collaborative engineering sessions, whiteboard strategy sprints, and studio life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE_PHOTOS.map((photo, pIdx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedImage(photo)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/60 transition-all duration-300 bg-slate-950 cursor-pointer shadow-lg hover:shadow-[0_15px_35px_rgba(16,185,129,0.2)]"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/15 text-[9px] font-mono font-bold text-emerald-300 backdrop-blur-md">
                    {photo.tag}
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-xs font-mono font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {photo.title}
                    </h4>
                    <p className="text-[10px] text-slate-300 line-clamp-2 mt-1 font-normal">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. DEHRADUN HQ HEADQUARTERS & GLOBAL REACH SHOWCASE CARD           */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy/95 via-[#081524] to-brand-navy/95 border-2 border-emerald-500/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)] flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Tech Corner Reticles */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />

          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Headquarters & Production Labs // Dehradun, Uttarakhand</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Bengali Kothi Chowk, Haridwar Bypass Rd, Dehradun 248001
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              From our flagship engineering lab in Dehradun, we support enterprises across India, North America, the United Kingdom, the UAE, and Australia with high-velocity product execution.
            </p>

            {/* Direct Contact Info */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 91492 51680</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>info@grandeurnet.com</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sub-2 Hr SLA Response</span>
              </span>
            </div>
          </div>

          <Link
            href="/#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 text-brand-dark font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-xl shadow-emerald-500/30 shrink-0 flex items-center gap-2"
          >
            <span>Talk With Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal for Photo Gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#08111e] rounded-3xl border border-emerald-500/40 p-6 overflow-hidden shadow-2xl"
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-4 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white font-mono">
                    {selectedImage.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {selectedImage.caption}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
