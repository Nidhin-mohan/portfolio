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
      "Designed and built the Billing & Invoicing module from scratch — proforma invoices, tax invoices with separate B2B and B2C treatment, split billing, bill merging, activity-based and restaurant billing: eight document types over one data model, plus a multi-settlement payment workflow, data model through to PDF",
      "Redesigned room occupancy and pricing from a fixed model into a per-hotel configurable one — per-guest rates, extra-bed pricing, and rate behaviour shaped to how OTAs expect to receive it",
      "Built the OTA integration surface across Booking.com, Expedia, Agoda, Goibibo and six more — pushing rates and inventory over third-party XML and REST APIs and consuming booking webhooks, where the failure mode is a room sold twice",
      "Batched the OTA sync job's per-record lookups and moved to the bulk multi-date endpoints — 401 MongoDB queries per cycle down to 5, and a 60-day inventory update from 60 HTTP calls to 1 per channel",
      "Moved business logic out of controllers and resolvers into a shared service layer when a mobile client joined the product, so REST and GraphQL stopped carrying two drifting copies of the same rules",
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
      "Tuned slow report and list queries with MongoDB aggregation pipelines, and cut re-render cost on the heaviest React screens with memoization",
      "Fixed production issues across separate client deployments, where the same bug could present differently depending on a tenant's configuration",
      "Shipped through Azure DevOps pipelines — staging first, production after",
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
            {experiences.length} roles, most recent first.
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
