"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0 bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 Nidhin Developer. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Nidhin-mohan"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/nidhinm"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          <Link
            href="mailto:alex@example.com"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
