"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Server,
  Database,
  GitBranch,
  Terminal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const techFocus = [
  { icon: Terminal, label: "TypeScript & Node.js" },
  { icon: Database, label: "MongoDB & GraphQL" },
  { icon: Server, label: "REST & API Design" },
  { icon: GitBranch, label: "CI/CD & Docker" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>Open to full-time roles</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                <span className="block text-foreground">Full-stack developer</span>
                <span className="block text-foreground">with a</span>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  backend focus.
                </span>
              </h1>
              <p className="max-w-[540px] text-muted-foreground text-lg leading-relaxed">
                3+ years building production web apps with the MERN stack.
                I spend most of my time in{" "}
                <strong className="text-foreground">Node.js</strong>,{" "}
                <strong className="text-foreground">MongoDB</strong>, and{" "}
                <strong className="text-foreground">GraphQL</strong> — designing
                schemas, writing APIs, and fixing the bugs nobody else wants to touch.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {techFocus.map(({ icon: Icon, label }) => (
                <Badge
                  key={label}
                  className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1.5 text-sm font-medium"
                  variant="outline"
                >
                  <Icon className="mr-1.5 h-3.5 w-3.5" />
                  {label}
                </Badge>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
              >
                <Link href="/#projects">
                  See My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-2 hover:border-primary/50 transition-all duration-300"
              >
                <Link href="/#contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side - Quick Stats */}
          <QuickStats />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
          <span className="sr-only">Scroll down</span>
        </Link>
      </div>
    </section>
  );
}

function QuickStats() {
  const stats = [
    { metric: "3+", label: "Years Experience", detail: "MERN stack, TypeScript-first" },
    { metric: "5+", label: "Production Apps", detail: "Startups & enterprise" },
    { metric: "GraphQL", label: "& REST APIs", detail: "Schema design, resolvers, caching" },
    { metric: "AWS", label: "& Docker", detail: "EC2, S3, CI/CD pipelines" },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="hidden lg:grid grid-cols-2 gap-4"
    >
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          className="p-6 rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
        >
          <div className="text-2xl font-bold text-primary mb-1">{item.metric}</div>
          <div className="text-sm font-semibold text-foreground mb-1">{item.label}</div>
          <div className="text-xs text-muted-foreground">{item.detail}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
