"use client";

import { motion } from "framer-motion";

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
      "Built a Channel Manager that syncs room availability across booking platforms — handles 5,000+ sync operations daily with cron-based jobs and checkpoint recovery",
      "Migrated REST endpoints to GraphQL for a deeply nested booking/room/rate data model, reducing frontend round-trips by ~60%",
      "Designed MongoDB aggregation pipelines for availability reporting, replacing a manual Excel process that took ~4 hours per day",
      "Introduced TypeScript across the backend codebase, cutting runtime type errors that caused ~3 production bugs per month",
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
    <section id="experience" className="w-full py-20 md:py-28 relative">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
              02 · Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              What I&apos;ve shipped
            </h2>
            <p className="text-muted-foreground">
              Impact and outcomes — not just job descriptions.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l border-border"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />

                {/* Role + company */}
                <div className="mb-4">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <span className="font-mono text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{exp.company}</span>
                    <span className="text-border">·</span>
                    <span className="font-mono text-xs">{exp.period}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-5">
                  {exp.bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-primary/50 select-none mt-0.5 shrink-0">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
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
