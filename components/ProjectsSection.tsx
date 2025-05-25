"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "./animated-text";
import { ProjectCard } from "./project-card";


interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured online store with product listings, cart functionality, and secure checkout.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Dashboard UI",
    description:
      "An admin dashboard with data visualization, user management, and real-time analytics.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "D3.js", "Firebase", "Material UI"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Social Media App",
    description:
      "A responsive social platform with user profiles, posts, and real-time messaging.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "GraphQL", "AWS Amplify"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
  {
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create professional portfolios with minimal configuration.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70"></div>
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatedText
              text="Featured Projects"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="A selection of my recent work showcasing my skills and expertise."
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            asChild
            className="rounded-full border-2 hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
          >
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              View More on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
