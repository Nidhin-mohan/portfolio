"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Code,
  Database,
  Zap,
  Award,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroAnimation } from "./hero-animation";
import { FloatingShapes } from "./floating-shapes";

const techBadges = [
  { icon: Zap, label: "React & Next.js" },
  { icon: Code, label: "TypeScript & Node.js" },
  { icon: Database, label: "MongoDB & SQL" },
  { icon: Code, label: "REST & GraphQL" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <HeroAnimation />
      </div>
      <FloatingShapes />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            {/* Availability Banner */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Currently open for freelance & full-time roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="block">Building Scalable</span>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Full-Stack Solutions
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                I'm a Full-Stack Developer with 3 years of experience creating
                fast, reliable, and scalable web applications using modern
                technologies.
              </p>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-3">
              {techBadges.map(({ icon: Icon, label }) => (
                <Badge
                  key={label}
                  className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1 text-sm"
                  variant="outline"
                >
                  <Icon className="mr-1 h-3 w-3" />
                  {label}
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
              >
                <Link href="/#projects">
                  See My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-2 hover:border-primary/50 transition-all duration-300"
              >
                <Link href="/#contact">Let's Connect</Link>
              </Button>
            </div>
          </div>
              <ExperienceCard />
          {/* Experience Card (Right Side)
          <div className="relative hidden lg:block">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="relative z-10 aspect-square rounded-2xl border-2 border-primary/10 bg-background/50 p-6 backdrop-blur-sm shadow-xl flex flex-col justify-center items-center text-center space-y-4">
              <div className="text-5xl font-bold text-primary">3+</div>
              <div className="text-lg text-muted-foreground">
                Years of Experience
              </div>
              <p className="text-sm max-w-[250px] text-muted-foreground">
                Delivering clean code, scalable systems, and engaging user
                experiences from frontend to backend.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Down Indicator */}
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



 function ExperienceCard() {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative hidden lg:flex items-center justify-center"
    >
      {/* Background Glows */}
      <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-96 h-96 p-8 rounded-3xl backdrop-blur-xl border border-primary/10 bg-background/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center space-y-5 transition-all">
        {/* Icon */}
        <div className="flex items-center justify-center bg-primary/10 text-primary rounded-full p-4">
          <Award className="h-8 w-8" />
        </div>

        {/* Big Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-6xl font-extrabold text-primary"
        >
          3+
        </motion.div>

        {/* Label */}
        <div className="text-lg font-semibold text-muted-foreground tracking-wide uppercase">
          Years of Experience
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground max-w-[280px] leading-relaxed">
          Delivering performant full-stack apps, responsive UIs, and seamless
          experiences — from concept to production.
        </p>

        {/* Tagline */}
        <motion.span
          className="text-sm text-primary/80 font-medium tracking-tight mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Always learning. Always shipping.
        </motion.span>
      </div>
    </motion.div>
  );
}
