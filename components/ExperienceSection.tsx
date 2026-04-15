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
    role: "Software Engineer",
    company: "PMS & Channel Manager Platform",
    period: "Mar 2025 – Present",
    type: "Full-time",
    bullets: [
      "Identified and resolved an N+1 query bottleneck in a cron-based OTA sync pipeline — reduced MongoDB queries from 401 to 5 per cycle (99% reduction), enabling 10x more OTA integrations without infrastructure changes",
      "Optimized OTA synchronization with bulk processing, reducing API traffic by ~96% per channel and reducing overbooking scenarios across connected distribution channels",
      "Integrated Simplotel OTA via third-party APIs and webhooks for real-time inventory, rate, and booking synchronization across multiple distribution channels",
      "Designed and built a Billing & Invoicing Module supporting Proforma Invoices, Tax Invoices (B2B & B2C), split billing, and bill merging — covering activity-based and restaurant billing for hospitality workflows",
      "Redesigned the room occupancy and pricing model — replaced a hard-coded fixed-limit system with fully configurable per-hotel occupancy, extra bed/person pricing, and OTA-aligned rate behavior",
      "Built sales reports and visual dashboards surfacing insights into revenue, billing activity, and payment trends",
    ],
    stack: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "Redis", "AWS", "Docker", "PM2"],
  },
  {
    role: "Associate Software Engineer",
    company: "Enterprise Contract Management SaaS",
    period: "Apr 2023 – Nov 2024",
    type: "Full-time",
    bullets: [
      "Developed features across the contract lifecycle workflow including notification management, dynamic questionnaires, and external party collaboration — shipped to multiple enterprise client organizations",
      "Moved report generation from frontend to backend using existing BullMQ-based background processing, reducing client-side load and improving scalability for bulk operations",
      "Improved query performance using MongoDB aggregation pipelines and optimized React frontend with hooks and memoization, improving maintainability across client versions",
      "Resolved critical production issues across different client deployments, maintaining application stability and uptime across enterprise customer instances",
      "Utilized CI/CD pipelines via Azure DevOps for staging deployments before production releases",
    ],
    stack: ["Node.js", "TypeScript", "MongoDB", "BullMQ", "React", "Azure DevOps", "MUI"],
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
