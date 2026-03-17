"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";
import { Badge } from "@/components/ui/badge";

interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
  stack: string[];
}

const experiences: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "Enterprise Product Team",
    period: "2022 – Present",
    type: "Full-time",
    bullets: [
      "Built a Channel Manager system that syncs room availability across booking platforms — handles 5,000+ sync operations daily with cron-based jobs and checkpoint recovery",
      "Migrated REST endpoints to GraphQL for a deeply nested booking/room/rate data model, reducing frontend round-trips by ~60%",
      "Designed MongoDB aggregation pipelines for availability reporting, replacing a manual Excel process that took ~4 hours per day",
      "Introduced TypeScript across the backend codebase, cutting down runtime type errors that were causing ~3 production bugs per month",
      "Implemented optimistic concurrency control for concurrent booking updates — stopped silent data overwrites from multiple OTA sources",
    ],
    stack: ["Node.js", "GraphQL", "MongoDB", "TypeScript", "Docker", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Startup / Contract",
    period: "2021 – 2022",
    type: "Contract",
    bullets: [
      "Built React applications for 3 client projects — responsive, accessible, all shipped on deadline",
      "Created a shared component library with Tailwind CSS that reduced UI dev time by ~40% across projects",
      "Integrated REST APIs and form validation with React Hook Form + Zod — zero client-reported form bugs after launch",
      "Set up CI/CD with GitHub Actions, taking deployments from a 30-minute manual process to a 3-minute automated pipeline",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Next.js", "GitHub Actions"],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20" />
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-12">
            <AnimatedText
              text="Experience"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <p className="max-w-[600px] text-muted-foreground text-lg">
              What I&apos;ve shipped and the impact it had — not just what was in my job description.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-primary/20"
              >
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span>{exp.company}</span>
                    <span className="text-primary/40">·</span>
                    <span className="text-sm">{exp.period}</span>
                    <Badge variant="outline" className="text-xs font-mono">
                      {exp.type}
                    </Badge>
                  </div>
                </div>

                <ul className="space-y-3 mb-4">
                  {exp.bullets.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/10"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
