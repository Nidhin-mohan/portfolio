"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

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
  problem: string;
  whatIBuilt: string;
  hardPart: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const projects: Project[] = [
  {
    title: "Channel Manager",
    subtitle: "Multi-tenant booking sync system",
    category: "Backend-Heavy",
    problem:
      "Hotels needed to keep room availability in sync across multiple booking platforms. Stale data meant double-bookings and lost revenue.",
    whatIBuilt:
      "GraphQL API with MongoDB as the primary store. Cron-based sync jobs that poll external OTAs and reconcile availability. Multi-tenant data isolation through compound indexes. Chose embedded documents for rate plans (read-heavy) but references for bookings (write-heavy) to match access patterns.",
    hardPart:
      "Race conditions during concurrent booking updates from multiple sources. Used MongoDB's version field for optimistic concurrency — if two updates conflict, the later one retries instead of silently overwriting. Also had to make sync jobs idempotent so a failure mid-run could resume from a checkpoint.",
    stack: ["Node.js", "GraphQL", "MongoDB", "TypeScript", "Docker", "Cron Jobs"],
    repoUrl: "https://github.com/Nidhin-mohan",
  },
  {
    title: "MoodMate",
    subtitle: "Mental wellness tracking platform",
    category: "Full-Stack",
    problem:
      "Users needed a private way to track moods over time and understand patterns — not just log entries, but see trends.",
    whatIBuilt:
      "MERN app with role-based access (user, therapist, admin). Custom RBAC instead of third-party auth because I needed fine-grained control over therapist-patient data boundaries. Mood analytics built with MongoDB aggregation pipelines — keeps computation server-side. Blog module with sanitized markdown.",
    hardPart:
      "Designing the mood data model to support both quick daily entries and efficient trend queries. Settled on date-bucketed documents that MongoDB's aggregation framework can window over without scanning the entire collection.",
    stack: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "JWT", "AWS S3"],
    repoUrl: "https://github.com/Nidhin-mohan",
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Online store with real payment processing",
    category: "Full-Stack",
    problem:
      "Needed a working e-commerce system — not a demo with fake checkout, but real Stripe integration, inventory tracking, and an admin panel.",
    whatIBuilt:
      "Next.js frontend with SSR for product pages (SEO). Node.js API handling cart, orders, and Stripe webhooks. Used webhooks for payment confirmation instead of client-side callbacks — eliminates bugs where a browser closes mid-payment. Server-side cart state tied to sessions, not localStorage.",
    hardPart:
      "Inventory race conditions during high traffic. Implemented a reservation system: adding to cart creates a time-limited hold, checkout atomically decrements stock with a 'stock > 0' condition in MongoDB. Simple, but it works.",
    stack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Node.js", "Tailwind CSS"],
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
          {project.demoUrl && (
            <Button size="sm" asChild className="rounded-full h-8 text-xs">
              <Link href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1.5 h-3 w-3" />
                Demo
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
