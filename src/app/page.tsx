import Hero from "@/components/home/Hero";
import PostHeroTransition from "@/components/home/PostHeroTransition";
import SelectedProjects from "@/components/home/SelectedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import WhyGrandeurNet from "@/components/home/WhyGrandeurNet";
import ProjectContact from "@/components/home/ProjectContact";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: PRESERVED 100% UNTOUCHED (Central 3D Globe, G logo, Orbiting Tech, Headlines) */}
      <Hero />

      {/* 2. Section One: Transition from Hero — Engineering Ideas Into Digital Reality */}
      <PostHeroTransition />

      {/* 3. Section Two: Featured Projects — Selected Work. Real Impact. */}
      <SelectedProjects />

      {/* 4. Section Three: Technology & Services — Technology That Moves Business Forward */}
      <ServicesSection />

      {/* 5. Section Four: Engineering Process — From First Concept to Final Experience */}
      <EngineeringProcess />

      {/* 6. Section Five: Why Grandeur Net — Built With Precision. Driven By Possibility */}
      <WhyGrandeurNet />

      {/* 7. Section Six: Project CTA & Contact — Have an Idea Worth Building? */}
      <ProjectContact />
    </>
  );
}
