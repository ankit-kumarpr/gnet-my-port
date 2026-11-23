import Hero from "@/components/home/Hero";
import SelectedProjects from "@/components/home/SelectedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import ProjectContact from "@/components/home/ProjectContact";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Featured Projects */}
      <SelectedProjects />

      {/* 3. Technology & Services */}
      <ServicesSection />

      {/* 4. Engineering Process */}
      <EngineeringProcess />

      {/* 5. Project CTA & Contact */}
      <ProjectContact />
    </>
  );
}
