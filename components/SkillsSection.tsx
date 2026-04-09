"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { Server, Database, Cloud, Code, Wrench, Layout } from "lucide-react";

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
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
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
      "Cron Jobs",
      "Error Handling",
      "Concurrency Control",
      "Zod",
      "Webhooks",
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
      "Redis (basics)",
    ],
  },
  {
    title: "Infrastructure",
    icon: Cloud,
    skills: [
      "AWS (EC2, S3)",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Azure App Services",
      "Vercel",
      "Env Management",
      "Logging & Monitoring",
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React Patterns",
      "Server-Side Rendering",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand / Context",
      "Accessibility",
      "Responsive Design",
      "Performance",
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
      "Technical Writing",
      "Documentation",
      "Debugging",
      "Agile / Scrum",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-20 md:py-28 bg-muted/20 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
              04 · Skills
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Expertise
            </h2>
            <p className="text-muted-foreground">
              Organized by domain — not a flat list of logos.
            </p>
          </div>

          {/* Skills rows */}
          <div className="divide-y divide-border">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex flex-col sm:flex-row gap-4 py-5"
                >
                  <div className="flex items-center gap-2 sm:w-44 shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs bg-background border border-border text-muted-foreground px-2.5 py-1 rounded hover:border-primary/40 hover:text-foreground transition-colors cursor-default"
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
