"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionHead from "@/components/SectionHead";

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
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Hospitality PMS & Channel Manager",
    subtitle: "Integrated property management and OTA distribution platform",
    category: "Backend-Heavy",
    type: "Professional",
    problem:
      "Hotels need one system for inventory, bookings, and billing — that also keeps rates and availability in sync across 8+ OTA channels (Booking.com, Expedia, Agoda and more). Keeping that data consistent without overbooking is the core reliability problem.",
    whatIBuilt:
      "Backend work across the platform: a configurable per-hotel occupancy and pricing model, a Billing & Invoicing module covering 8 document types with a multi-settlement payment workflow, OTA and third-party integrations, and sales dashboards for revenue and payment trends.",
    hardPart:
      "The OTA sync had a severe N+1 query problem — 401 database queries per cycle. Invisible in dev with small data; a hard scaling ceiling in production. Profiling with realistic data found it, and batching lookups upfront collapsed it to 5 queries (−99%). Bulk multi-date calls cut a 60-day sync from 60 HTTP calls to 1 per channel.",
    stack: ["Node.js", "TypeScript", "GraphQL", "MongoDB", "Redis", "Docker", "AWS EC2/S3", "PM2"],
  },
  {
    title: "MoodMate",
    subtitle: "Mental wellness tracking platform",
    category: "Full-Stack",
    type: "Personal",
    problem:
      "Users needed a private way to log moods and see how they trend over time. Therapists needed their own view, with hard limits on which patient data they can see.",
    whatIBuilt:
      "MERN app with layered architecture (Controllers → Services → Repositories) and a generic BaseRepository pattern for reusable CRUD operations. Custom JWT-based RBAC with three roles (user, therapist, admin) — fine-grained control over therapist-patient data boundaries without a third-party auth service. Mood analytics built with MongoDB aggregation pipelines, keeping computation server-side. Full CI/CD pipeline with GitHub Actions: a Jest test suite gates every build, Docker images are pushed to AWS ECR, deployed to EC2 with static assets served via S3 and CloudFront.",
    hardPart:
      "Designing the mood data model to support both quick daily log entries and efficient trend queries across date ranges, without scanning the full collection. Settled on date-bucketed documents that MongoDB's aggregation framework can window over efficiently. Building the AWS deployment pipeline (ECR → EC2 → CloudFront) alone taught me most of what I now know about infrastructure.",
    stack: ["React", "Node.js", "MongoDB", "TypeScript", "Docker", "AWS ECR/EC2/S3/CloudFront", "GitHub Actions", "JWT"],
    repoUrl: "https://github.com/Nidhin-mohan/moodmate",
    liveUrl: "https://moodmate.dpdns.org",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full border-b-2 border-foreground py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHead n="01" tag="PROJECTS" meta={`${projects.length} SELECTED`} title="WHAT I BUILT" />
          <p className="mb-12 max-w-xl text-sm text-muted-foreground">
            For each project: the problem, what I built, and where it got hard.
          </p>

          {/* Project Cards */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-10">
            <Button
              asChild
              className="h-auto rounded-none border-2 border-foreground bg-background px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="https://github.com/Nidhin-mohan" target="_blank" rel="noreferrer">
                MORE ON GITHUB <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
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
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group border-2 border-foreground bg-card transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lime"
    >
      {/* Card header bar */}
      <div className="flex items-stretch border-b-2 border-foreground">
        <span className="flex items-center bg-foreground px-4 font-display text-2xl text-background md:text-3xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {project.category}
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                project.type === "Professional"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {project.type}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="h-1.5 w-1.5 animate-flicker rounded-none bg-primary-foreground" />
                LIVE →
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                CODE →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="border-b-2 border-foreground px-4 py-5 md:px-6">
        <h3 className="font-display text-3xl leading-[0.9] text-foreground md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.subtitle}</p>
      </div>

      {/* Content rows */}
      <div className="divide-y-2 divide-border">
        {(
          [
            ["PROBLEM", project.problem],
            ["WHAT I BUILT", project.whatIBuilt],
            ["THE HARD PART", project.hardPart],
          ] as const
        ).map(([label, body]) => (
          <div key={label} className="grid gap-2 px-4 py-5 md:grid-cols-[160px_1fr] md:gap-6 md:px-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              [ {label} ]
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 border-t-2 border-foreground px-4 py-4 md:px-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
