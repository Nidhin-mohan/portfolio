"use client";

// import AnimatedText from "@/components/AnimatedText";
// import SkillCard from "@/components/SkillCard"; // Make sure you have this or create it
import { AnimatedText } from "./animated-text";
import { SkillCard } from "./skill-card";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
      <div className="container px-4 md:px-6 relative">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatedText
              text="Skills & Expertise"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="Technologies and tools I've mastered over my 3 years in full-stack development."
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        {/* Skill Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          <SkillCard
            title="Front-End Development"
            skills={[
              "HTML5",
              "CSS3",
              "JavaScript (ES6+)",
              "TypeScript",
              "React",
              "Next.js",
              "Vue.js",
            ]}
          />
          <SkillCard
            title="UI Frameworks & Libraries"
            skills={[
              "Tailwind CSS",
              "Material UI",
              "Bootstrap",
              "Chakra UI",
              "Framer Motion",
              "Three.js",
            ]}
          />
          <SkillCard
            title="State Management"
            skills={["Redux", "Context API", "Zustand", "Recoil", "MobX"]}
          />
          <SkillCard
            title="Testing"
            skills={[
              "Jest",
              "React Testing Library",
              "Cypress",
              "Playwright",
              "Storybook",
            ]}
          />
          <SkillCard
            title="Build Tools & DevOps"
            skills={[
              "Webpack",
              "Vite",
              "Docker",
              "CI/CD",
              "Git",
              "GitHub Actions",
            ]}
          />
          <SkillCard
            title="Design & UX"
            skills={[
              "Figma",
              "Adobe XD",
              "Responsive Design",
              "Accessibility",
              "UI/UX Principles",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
