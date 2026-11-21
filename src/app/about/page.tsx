import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import ClientHappinessSection from "@/components/about/ClientHappinessSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import TeamCultureSection from "@/components/about/TeamCultureSection";

export const metadata: Metadata = {
  title: "About Us — Grandeur Net | 8+ Years of Digital Excellence // Est. 2017",
  description:
    "Discover Grandeur Net's 8+ year journey since 2017 in Dehradun, 250+ shipped projects across 5 global territories (India, Australia, UAE, UK, USA), and our in-house guild with a 98.4% client retention rate.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* 1. Interactive 3D Hero with Hand Gesture Cursor */}
      <AboutHero />

      {/* 2. Key Telemetry & Performance Stats */}
      <AboutStats />

      {/* 3. The Client Happiness Blueprint & Verified Testimonials */}
      <ClientHappinessSection />

      {/* 4. The 6-Year Evolution Timeline (2018 - 2024+) */}
      <JourneyTimeline />

      {/* 5. In-House Engineering Guild & Dehradun HQ */}
      <TeamCultureSection />
    </div>
  );
}
