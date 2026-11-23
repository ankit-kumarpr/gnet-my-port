"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingBag,
  Code2,
  TrendingUp,
  Palette,
  LucideIcon,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const SERVICES: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites and scalable web platforms built for performance and growth.",
    icon: Globe,
  },
  {
    id: "application-development",
    title: "Application Development",
    description:
      "Modern mobile and cross-platform applications with seamless experiences.",
    icon: Smartphone,
  },
  {
    id: "ecommerce-development",
    title: "E-Commerce Development",
    description:
      "High-converting online stores with secure payments and smooth checkout.",
    icon: ShoppingBag,
  },
  {
    id: "software-development",
    title: "Software Development",
    description:
      "Custom business software and intelligent digital solutions.",
    icon: Code2,
  },
  {
    id: "seo-digital-marketing",
    title: "SEO & Digital Marketing",
    description:
      "Data-driven strategies to improve visibility and business growth.",
    icon: TrendingUp,
  },
  {
    id: "uiux-branding",
    title: "UI/UX & Branding",
    description:
      "Thoughtful interfaces and distinctive digital brand experiences.",
    icon: Palette,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-24 px-6 md:px-8 bg-[#050A0B] relative">
      <div className="max-w-[1150px] mx-auto space-y-10 sm:space-y-12">
        {/* Section Heading & Supporting Text */}
        <div className="space-y-3 max-w-2xl text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#F5F8FA] tracking-tight leading-tight">
            Our Expertise
          </h2>
          <p className="text-sm sm:text-base text-[#A5B2C0] leading-relaxed">
            We combine technology, creativity and engineering to build digital experiences that help businesses grow.
          </p>
        </div>

        {/* Clean, Compact 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between rounded-[16px] bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 p-5 sm:p-[22px] min-h-[150px] sm:min-h-[165px] transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_28px_-10px_rgba(0,214,160,0.12)] cursor-default select-none"
              >
                <div>
                  {/* Small, Recognizable Service Icon */}
                  <div className="w-9 h-9 rounded-lg bg-[#070D14] border border-white/[0.06] flex items-center justify-center text-[#00D6A0] mb-3.5 group-hover:scale-105 group-hover:border-[#00D6A0]/30 transition-all duration-200">
                    <Icon className="w-[22px] h-[22px]" strokeWidth={1.85} />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Short Description (max 2 lines) */}
                <p className="mt-2 text-[13px] sm:text-[13.5px] text-[#A5B2C0] leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
