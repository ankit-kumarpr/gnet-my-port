"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Palette,
  ArrowUpRight,
  Code2,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  icon: any;
  description: string;
  technologies: string[];
  gradientStyle: string;
  accent: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    num: "01",
    title: "Web Development",
    category: "Modern Web Architectures",
    icon: Globe,
    description:
      "Enterprise-grade web applications, headless architectures, and sub-second platforms engineered for high throughput and Core Web Vitals perfection.",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    gradientStyle: "from-[#081726] via-[#0B1A2D] to-[#060D17]",
    accent: "#00C995",
  },
  {
    id: "app-development",
    num: "02",
    title: "Application Development",
    category: "Cross-Platform & Native",
    icon: Smartphone,
    description:
      "High-performance iOS, Android, and cross-platform native experiences backed by resilient real-time APIs, offline-first sync, and smooth 60fps rendering.",
    technologies: ["React Native", "APIs", "Scalable Architecture", "Offline Sync"],
    gradientStyle: "from-[#0A1B24] via-[#091E22] to-[#050E12]",
    accent: "#38bdf8",
  },
  {
    id: "ecommerce-engineering",
    num: "03",
    title: "E-Commerce Engineering",
    category: "High-Conversion Flagships",
    icon: ShoppingBag,
    description:
      "High-converting headless commerce solutions, custom checkout funnels, multi-currency payment integrations, and automated inventory sync pipelines.",
    technologies: ["WooCommerce", "Shopify", "Headless Commerce", "PCI Gateways"],
    gradientStyle: "from-[#111A24] via-[#101F20] to-[#070D12]",
    accent: "#34d399",
  },
  {
    id: "ai-automation",
    num: "04",
    title: "AI & Automation",
    category: "Autonomous Systems",
    icon: Cpu,
    description:
      "Custom generative AI integrations, domain-tuned LLM agents, semantic vector databases, and robotic process automation that eliminate manual workloads.",
    technologies: ["Python", "AI Integrations", "Intelligent Workflows", "Vector DBs"],
    gradientStyle: "from-[#0E1528] via-[#0C192E] to-[#060C16]",
    accent: "#818cf8",
  },
  {
    id: "digital-marketing",
    num: "05",
    title: "Digital Marketing",
    category: "Performance & Visibility",
    icon: TrendingUp,
    description:
      "Data-driven technical SEO, ROI-focused performance acquisition campaigns, attribution telemetry, and conversion rate optimization (CRO) that scales revenue.",
    technologies: ["Technical SEO", "Performance Marketing", "Attribution Analytics", "CRO"],
    gradientStyle: "from-[#0B1E22] via-[#08181A] to-[#040E0F]",
    accent: "#f59e0b",
  },
  {
    id: "uiux-design",
    num: "06",
    title: "UI/UX & Creative Design",
    category: "Product Experience Systems",
    icon: Palette,
    description:
      "Bespoke design systems, editorial visual identities, interactive micro-animations, and user journey prototypes built with uncompromising aesthetic precision.",
    technologies: ["Figma", "Design Systems", "Interaction Design", "Motion 3D"],
    gradientStyle: "from-[#171226] via-[#120F24] to-[#070512]",
    accent: "#ec4899",
  },
];

/* 3D Floating Interactive Service Card */
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 24,
    stiffness: 240,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 24,
    stiffness: 240,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative rounded-3xl bg-gradient-to-br ${service.gradientStyle} border border-white/[0.09] hover:border-[#00C995]/50 p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(0,201,149,0.15)]`}
    >
      {/* Decorative ambient corner glow */}
      <div
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-[70px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
        style={{ backgroundColor: service.accent }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Top Header: Number and Icon */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform"
            style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#A7B5C5] uppercase block">
              {service.category}
            </span>
            <span className="text-xs font-mono font-bold text-white/90">
              PHASE // {service.num}
            </span>
          </div>
        </div>

        <Link
          href="#contact"
          className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-[#00C995] group-hover:text-[#05090C] text-white flex items-center justify-center transition-all border border-white/[0.08] group-hover:border-[#00C995]"
          title="Inquire about this capability"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 space-y-3 mb-6">
        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#A7B5C5] leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom Technology Badges */}
      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 flex-wrap">
        {service.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-md bg-[#05090C]/80 border border-white/[0.07] text-[11px] font-mono text-slate-300 group-hover:border-white/[0.15] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#05090C] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading & Description */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1728] border border-[#00C995]/30 text-[#00E5A0] text-xs font-mono font-medium">
            <Zap className="w-3.5 h-3.5 text-[#00C995]" />
            <span>// CORE ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Technology That Moves{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C995] to-[#00E5A0]">
              Business Forward.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A7B5C5] leading-relaxed">
            From digital experiences to enterprise-grade platforms, we engineer solutions built around performance, scalability and long-term growth.
          </p>
        </div>

        {/* 6 High-Depth Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
