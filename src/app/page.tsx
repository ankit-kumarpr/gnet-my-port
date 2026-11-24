import Hero from "@/components/home/Hero";
import SelectedProjects from "@/components/home/SelectedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import ProjectContact from "@/components/home/ProjectContact";
import { getPublishedProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Featured Projects */}
      <SelectedProjects initialProjects={projects} />

      {/* 3. Technology & Services */}
      <ServicesSection />

      {/* 4. Engineering Process */}
      <EngineeringProcess />

      {/* 5. Project CTA & Contact */}
      <ProjectContact />
    </>
  );
}
