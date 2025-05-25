import Link from "next/link"
import { Github, Mail} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SkillCard } from "@/components/skill-card"
import { AnimatedText } from "@/components/animated-text"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import ProjectsSection from "@/components/ProjectsSection"
import AboutSection from "@/components/AboutSection"
import SkillsSection from "@/components/SkillsSection"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
       <Hero />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
