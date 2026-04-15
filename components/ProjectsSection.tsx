"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface Project {
  title: string;
  subtitle: string;
  category: string;
  type: "Professional" | "Personal";
  problem: string;
  whatIBuilt: string;
  hardPart: string;
  stack: string[];
  repoUrl?: string;
}

const projects: Project[] = [
  {
    title: "Hospitality PMS & Channel Manager",
    subtitle: "Integrated property management and OTA distribution platform",
    category: "Backend-Heavy",
    type: "Professional",
    problem:
      "Hotels need a single system to manage their full operations — room inventory, bookings, billing — and simultaneously keep availability, rates, and reservations in sync across multiple OTA distribution channels (Simplotel, etc.) and third-party PMS integrations. Keeping this data consistent across systems without overbooking is the core reliability problem.",
    whatIBuilt:
      "Built the backend for a combined PMS and Channel Manager platform. On the PMS side: redesigned the room occupancy and pricing model to be fully configurable per hotel (replaced a hard-coded fixed-limit system), updated the booking engine to support dynamic occupancy rules and channel-aligned pricing, and built a Billing & Invoicing Module covering Proforma Invoices, Tax Invoices (B2B & B2C), split billing, bill merging, and activity-based restaurant billing. On the distribution side: integrated Simplotel and other OTAs via third-party APIs and webhooks, and wired up integrations with external PMS systems. Built sales reports and dashboards for revenue, billing, and payment trends.",
    hardPart:
      "The OTA sync pipeline had a severe N+1 query problem — 401 MongoDB queries per cron cycle. It looked fine in dev with small data, but in production it became a hard ceiling on how many OTAs we could support. Profiling with realistic data identified the pattern. Refactored to batch all lookups upfront: 401 queries collapsed to 5 (99% reduction), enabling 10x more OTA integrations without infrastructure changes. Also introduced bulk API calls, reducing external API traffic by ~96% per channel.",
    stack: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "Redis", "Docker", "AWS EC2/S3", "PM2"],
  },
  {
    title: "MoodMate",
    subtitle: "Mental wellness tracking platform",
    category: "Full-Stack",
    type: "Personal",
    problem:
      "Users needed a private way to track moods over time and understand patterns — not just log entries, but surface real trends. Therapists needed a separate view with different data access boundaries from regular users.",
    whatIBuilt:
      "MERN app with layered architecture (Controllers → Services → Repositories) and a generic BaseRepository pattern for reusable CRUD operations. Custom JWT-based RBAC with three roles (user, therapist, admin) — fine-grained control over therapist-patient data boundaries without a third-party auth service. Mood analytics built with MongoDB aggregation pipelines, keeping computation server-side. Full CI/CD pipeline with GitHub Actions: automated tests, Docker image builds pushed to AWS ECR, deployed to EC2 with static assets served via S3 and CloudFront.",
    hardPart:
      "Designing the mood data model to support both quick daily log entries and efficient trend queries across date ranges, without scanning the full collection. Settled on date-bucketed documents that MongoDB's aggregation framework can window over efficiently. Building the full AWS deployment pipeline (ECR → EC2 → CloudFront) end-to-end solo surfaced a lot of infrastructure knowledge I hadn't had before.",
    stack: ["React", "Node.js", "MongoDB", "TypeScript", "Docker", "AWS ECR/EC2/S3/CloudFront", "GitHub Actions", "JWT"],
    repoUrl: "https://github.com/Nidhin-mohan",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-20 md:py-28 bg-muted/20 relative">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-primary/60 mb-3">
            01 · Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            What I built
          </h2>
          <p className="text-muted-foreground">
            Problem, approach, and what was actually hard — not a list of features.
          </p>
        </div>

        {/* Project Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" asChild className="rounded-full">
            <Link href="https://github.com/Nidhin-mohan" target="_blank" rel="noreferrer">
              More on GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-xl border border-border bg-card p-6 md:p-8 hover:border-primary/30 transition-colors duration-300"
    >
      {/* Card header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-mono text-xs text-primary/40 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
              {project.category}
            </span>
            <span className={`font-mono text-xs rounded px-1.5 py-0.5 ${
              project.type === "Professional"
                ? "bg-primary/10 text-primary/70 border border-primary/20"
                : "bg-muted text-muted-foreground border border-border"
            }`}>
              {project.type}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {project.repoUrl && (
            <Button size="sm" variant="outline" asChild className="rounded-full h-8 text-xs">
              <Link href={project.repoUrl} target="_blank" rel="noreferrer">
                <GithubIcon className="mr-1.5 h-3 w-3" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-4 mb-6">
        <div>
          <span className="font-mono text-xs text-primary/50 uppercase tracking-wide">
            // problem
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">{project.problem}</p>
        </div>
        <div>
          <span className="font-mono text-xs text-primary/50 uppercase tracking-wide">
            // what i built
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">{project.whatIBuilt}</p>
        </div>
        <div>
          <span className="font-mono text-xs text-primary/50 uppercase tracking-wide">
            // the hard part
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">{project.hardPart}</p>
        </div>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
