import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import OurApproachSection from "@/components/about/OurApproachSection";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import EditorialTeamSection from "@/components/about/EditorialTeamSection";
import CompanyLocationSection from "@/components/about/CompanyLocationSection";

export const metadata: Metadata = {
  title: "About Us — Grandeur Net | Digital Engineering Agency // Est. 2017",
  description:
    "Founded in 2017, Grandeur Net is a digital engineering company based in Dehradun, building scalable digital experiences, intelligent platforms, and growth-focused technology solutions for ambitious businesses.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#071321] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* 1. Hero Section — About Grandeur Net */}
      <AboutHero />

      {/* 2. Company Achievements & Numbers (Statistics) */}
      <AboutStats />

      {/* 3. Our Approach — Interactive 6-Step Accordion */}
      <OurApproachSection />

      {/* 4. Client Reviews — Premium Testimonial Slider */}
      <AboutTestimonials />

      {/* 5. Company Journey & Milestones (Visual Timeline) */}
      <JourneyTimeline />

      {/* 6. Our Team — Premium Editorial Team Showcase & Studio Work */}
      <EditorialTeamSection />

      {/* 7. Company Location & Contact Presentation */}
      <CompanyLocationSection />
    </div>
  );
}
