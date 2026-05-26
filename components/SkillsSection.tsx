"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Server, Database, Cloud, Code, Wrench, Layout } from "lucide-react";
import SectionHead from "@/components/SectionHead";

interface SkillCategory {
  title: string;
  icon: ComponentType<{ className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core Engineering",
    icon: Code,
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "Express.js",
      "React.js",
      "Next.js",
      "REST API Design",
      "GraphQL",
    ],
  },
  {
    title: "Backend Systems",
    icon: Server,
    skills: [
      "API Architecture",
      "GraphQL Schema Design",
      "JWT / RBAC",
      "BullMQ",
      "Redis",
      "Cron Jobs",
      "Webhooks",
      "Concurrency Control",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      "MongoDB",
      "Mongoose",
      "Aggregation Pipelines",
      "Index Optimization",
      "Schema Design",
      "Data Migration",
      "MongoDB Atlas",
      "Query Performance",
    ],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    skills: [
      "AWS (EC2, S3, ECR)",
      "Docker",
      "GitHub Actions",
      "Azure DevOps",
      "CI/CD",
      "CloudFront",
      "PM2",
      "Vercel",
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React Patterns",
      "Redux",
      "Material UI (MUI)",
      "Tailwind CSS",
      "Server-Side Rendering",
      "Zustand / Context",
      "Responsive Design",
      "Accessibility",
    ],
  },
  {
    title: "Tools & Practices",
    icon: Wrench,
    skills: [
      "Git",
      "Code Review",
      "Jest & Testing Library",
      "Postman",
      "Zod",
      "Documentation",
      "Debugging",
      "Agile / Scrum",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="04" tag="SKILLS" meta={`${skillCategories.length} DOMAINS`} title="THE TOOLKIT" />
          <p className="mb-12 max-w-xl text-sm text-muted-foreground">
            Organized by domain — not a flat wall of logos.
          </p>

          {/* Skills rows */}
          <div className="border-2 border-foreground">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`flex flex-col sm:flex-row ${
                    index !== skillCategories.length - 1 ? "border-b-2 border-foreground" : ""
                  }`}
                >
                  <div className="flex shrink-0 items-center gap-2.5 border-b-2 border-foreground bg-muted px-4 py-3 sm:w-60 sm:border-b-0 sm:border-r-2">
                    <span className="font-display text-xl leading-none text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 text-foreground" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-foreground">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-wrap content-center gap-1.5 px-4 py-3">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="cursor-default border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-foreground hover:bg-primary hover:text-primary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
