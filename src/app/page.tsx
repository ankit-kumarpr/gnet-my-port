import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero with conversion headline & metrics */}
      <Hero />

      {/* 2. Main Focus: Project Showcase & Case Studies */}
      <FeaturedProjects />

      {/* 3. Supporting Core Services */}
      <ServicesSection />

      {/* 4. Delivery Methodology & Process */}
      <ProcessSection />

      {/* 5. Direct Conversion & Contact Intake */}
      <ContactSection />
    </>
  );
}
