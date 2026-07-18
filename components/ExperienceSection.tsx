"use client";

import { motion } from "framer-motion";
import SectionHead from "@/components/SectionHead";

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
    role: "MERN Stack Developer",
    company: "PMS & Channel Manager Platform",
    period: "Mar 2025 – Present",
    type: "Full-time",
    bullets: [
      "Identified and resolved an N+1 query bottleneck in a cron-based OTA sync pipeline — reduced MongoDB queries from 401 to 5 per cycle (99% reduction), enabling 10x more OTA integrations without infrastructure changes",
      "Optimized OTA synchronization with bulk multi-date processing — collapsed a 60-day inventory update from 60 sequential HTTP calls to 1 per channel, reducing overbooking scenarios across connected distribution channels",
      "Integrated OTA distribution channels via third-party APIs and webhooks for real-time inventory, rate, and booking synchronization",
      "Designed and built a Billing & Invoicing Module supporting Proforma Invoices, Tax Invoices (B2B & B2C), split billing, and bill merging — covering activity-based and restaurant billing for hospitality workflows",
      "Redesigned the room occupancy and pricing model into a fully configurable per-hotel system — per-guest rates, extra-bed pricing, and OTA-aligned rate behavior",
      "Built sales reports and dashboards covering revenue, billing activity, and payment trends",
    ],
    stack: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "Redis", "AWS", "Docker", "PM2"],
  },
  {
    role: "Freelance Web Developer",
    company: "Independent clients",
    period: "Dec 2024 – Feb 2025",
    type: "Contract",
    bullets: [
      "Built a listing page and inventory-management dashboard for a truck rental platform",
      "Modularized an existing product application to improve scalability and maintainability, alongside bug fixes across live systems",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express.js"],
  },
  {
    role: "Associate Software Developer",
    company: "Enterprise Contract Management SaaS",
    period: "Mar 2023 – Dec 2024",
    type: "Full-time",
    bullets: [
      "Developed features across the contract lifecycle workflow including notification management, dynamic questionnaires, and external party collaboration — shipped to multiple enterprise client organizations",
      "Built a shared library of reusable React components with native TypeScript support, cutting code duplication by 30% and accelerating feature delivery across client versions",
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
    <section id="experience" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="02" tag="EXPERIENCE" meta="2023 — PRESENT" title="WHAT I'VE SHIPPED" />
          <p className="mb-12 max-w-xl text-sm text-muted-foreground">
            Three roles, most recent first.
          </p>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="border-2 border-foreground bg-card"
              >
                {/* header bar */}
                <div className="flex flex-col border-b-2 border-foreground sm:flex-row sm:items-stretch">
                  <span className="flex items-center bg-foreground px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-background">
                    {exp.period}
                  </span>
                  <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3">
                    <h3 className="font-display text-2xl leading-none text-foreground md:text-3xl">
                      {exp.role}
                    </h3>
                    <span className="hidden shrink-0 border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="border-b-2 border-border px-4 py-2.5 text-sm text-muted-foreground">
                  → {exp.company}
                </p>

                {/* bullets */}
                <ul className="divide-y divide-border">
                  {exp.bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="shrink-0 select-none font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* stack */}
                <div className="flex flex-wrap gap-1.5 border-t-2 border-foreground px-4 py-4">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
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
