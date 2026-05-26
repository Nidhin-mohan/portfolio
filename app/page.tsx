import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import EngineeringPrinciples from "@/components/EngineeringPrinciples"
import SystemDesignSection from "@/components/SystemDesignSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <div className="scanlines relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-12">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <SkillsSection />
        <EngineeringPrinciples />
        <SystemDesignSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
