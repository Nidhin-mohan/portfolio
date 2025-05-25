"use client";

import Link from "next/link";
import { Code, Github, Linkedin } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <div className="mr-2 h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/60 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background dark:bg-background">
              <Code className="h-4 w-4 text-primary" />
            </div>
          </div>
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Nidhin.dev
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Projects", "About", "Skills", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="group relative text-sm font-medium transition-colors"
            >
              {item}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </nav>

        {/* Right Side Icons & Theme */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="https://github.com/Nidhin-mohan"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-background/50 transition-colors hover:bg-primary/10"
            >
              <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">GitHub</span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/nidhinm/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-background/50 transition-colors hover:bg-primary/10"
            >
              <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
