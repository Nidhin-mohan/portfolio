"use client";

import { AnimatedText } from "./animated-text";
import { SkillCard } from "./skill-card";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70" />

      <div className="container relative px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-2">
            <AnimatedText
              text="Skills & Expertise"
              className="text-3xl sm:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="Technologies and tools I've mastered over my 3 years in full-stack development."
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 py-12">
          {skillCategories.map(({ title, skills }) => (
            <SkillCard key={title} title={title} skills={skills} />
          ))}
        </div>
      </div>
    </section>
  );
}

const skillCategories = [
  {
    title: "Front-End Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "ShadCN UI",
    ],
  },
  {
    title: "UI Frameworks & Animation",
    skills: ["Tailwind CSS", "Framer Motion", "React Icons", "Radix UI"],
  },
  {
    title: "State Management",
    skills: ["Context API", "Redux", "Zustand"],
  },
  {
    title: "Back-End Development",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "GraphQL",
      "REST APIs",
      "JWT Auth",
      "Cron Jobs",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      "AWS (S3, EC2)",
      "Azure (App Services, Functions)",
      "Azure DevOps",
      "MongoDB Atlas",
      "GitHub",
      "GitLab",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Vercel",
    ],
  },
  {
    title: "Dev Tools & Testing",
    skills: [
      "Git",
      "Postman",
      "Jest",
      "React Testing Library",
      "Console Debugging",
    ],
  },
  {
    title: "Design & UX",
    skills: [
      "Responsive Design",
      "Accessibility",
      "Figma",
      "UI/UX Best Practices",
    ],
  },
  {
    title: "Other Expertise",
    skills: [
      "Technical Writing",
      "Blogging (Hashnode)",
      "Performance Optimization",
      "Schema Design (MongoDB)",
      "Documentation",
    ],
  },
];

