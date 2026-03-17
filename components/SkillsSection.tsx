"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "./animated-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Server,
  Database,
  Cloud,
  Code,
  Wrench,
  Layout,
} from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Core Engineering",
    icon: Code,
    description: "The fundamentals I use every day",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "REST API Design",
      "GraphQL",
    ],
  },
  {
    title: "Backend Systems",
    icon: Server,
    description: "Where I spend most of my time",
    skills: [
      "API Architecture",
      "GraphQL Schema Design",
      "Authentication (JWT, RBAC)",
      "Cron Jobs & Background Workers",
      "Error Handling Patterns",
      "Concurrency Control",
      "Data Validation (Zod)",
      "Webhook Integration",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    description: "Schema design, query optimization, data modeling",
    skills: [
      "MongoDB",
      "Mongoose ODM",
      "Aggregation Pipelines",
      "Index Optimization",
      "Schema Design Patterns",
      "Data Migration",
      "MongoDB Atlas",
      "Redis (basics)",
    ],
  },
  {
    title: "Infrastructure & DevOps",
    icon: Cloud,
    description: "Shipping code that runs reliably",
    skills: [
      "AWS (EC2, S3)",
      "Docker",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Azure (App Services)",
      "Vercel",
      "Environment Management",
      "Logging & Monitoring",
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    description: "Building interfaces that serve the system",
    skills: [
      "React Patterns",
      "Server-Side Rendering",
      "Tailwind CSS",
      "Framer Motion",
      "State Management (Zustand, Context)",
      "Accessibility",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    title: "Tools & Practices",
    icon: Wrench,
    description: "Process that makes engineering sustainable",
    skills: [
      "Git (branching strategies)",
      "Code Review",
      "Jest & Testing Library",
      "Postman / API Testing",
      "Technical Writing",
      "Documentation",
      "Debugging & Profiling",
      "Agile / Scrum",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70" />
      <div className="container relative px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <div className="space-y-2">
            <AnimatedText
              text="Skills & Expertise"
              className="text-3xl sm:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="Organized by engineering domain — not a flat list of logos."
              className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="h-full"
              >
                <Card className="h-full border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/25 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {category.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-background/50 text-xs hover:bg-primary/10 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
