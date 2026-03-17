"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedText } from "./animated-text";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

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
    <section
      id="projects"
      className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70" />
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <AnimatedText
              text="Projects"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="What I built, why, and what was hard about it."
              className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            asChild
            className="rounded-full border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
          >
            <Link
              href="https://github.com/Nidhin-mohan"
              target="_blank"
              rel="noreferrer"
            >
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-sm p-6 md:p-8 hover:border-primary/25 transition-colors"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <Badge variant="outline" className="mb-2 text-xs font-mono">
            {project.category}
          </Badge>
          <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {project.repoUrl && (
            <Button size="sm" variant="outline" asChild className="rounded-full">
              <Link href={project.repoUrl} target="_blank" rel="noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" />
                Code
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button size="sm" asChild className="rounded-full">
              <Link href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Demo
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Problem */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground mb-1">The Problem</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
      </div>

      {/* What I Built */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground mb-1">What I Built</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.whatIBuilt}</p>
      </div>

      {/* Hard Part */}
      <div className="mb-5">
        <h4 className="text-sm font-semibold text-foreground mb-1">The Hard Part</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.hardPart}</p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-primary/10">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="bg-secondary/50 text-xs font-mono">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.article>
  );
}
