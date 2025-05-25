"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Code,
  Database,
  Layers,
  Monitor,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroAnimation } from "./hero-animation";
import { FloatingShapes } from "./floating-shapes";

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

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            {/* Availability Indicator */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
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
              <Badge
                className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1 text-sm"
                variant="outline"
              >
                <Zap className="mr-1 h-3 w-3" /> React & Next.js
              </Badge>
              <Badge
                className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1 text-sm"
                variant="outline"
              >
                <Code className="mr-1 h-3 w-3" /> TypeScript & Node.js
              </Badge>
              <Badge
                className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1 text-sm"
                variant="outline"
              >
                <Database className="mr-1 h-3 w-3" /> MongoDB & SQL
              </Badge>
              <Badge
                className="bg-background/50 backdrop-blur-sm border-primary/20 px-3 py-1 text-sm"
                variant="outline"
              >
                <Code className="mr-1 h-3 w-3" /> REST & GraphQL
              </Badge>
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

          {/* Right Visual Card (no image) */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>

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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
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

// export default Hero;
