"use client";

// import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import { AnimatedText } from "./animated-text";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-small-primary/5 opacity-30"></div>
      <div className="container px-4 md:px-6 relative">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatedText
              text="Get In Touch"
              className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            />
            <AnimatedText
              text="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-lg space-y-6 py-12">
          <form className="grid gap-6">
            {/* Name */}
            <div className="grid gap-3">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Name
              </label>
              <input
                id="name"
                className="flex h-10 w-full rounded-md border-2 border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/50 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-3">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="flex h-10 w-full rounded-md border-2 border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/50 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message */}
            <div className="grid gap-3">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none"
              >
                Message
              </label>
              <textarea
                id="message"
                className="flex min-h-[120px] w-full rounded-md border-2 border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary/50 transition-all duration-300"
                placeholder="Enter your message"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
            >
              Send Message
            </Button>
          </form>

          {/* Alternative Contact */}
          <div className="flex flex-col items-center space-y-2 text-center">
            <p className="text-muted-foreground">Or reach out directly via:</p>
            <div className="flex space-x-4">
              <Link
                href="mailto:nidhinmohannidhin@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
                <span>nidhinmohannidhin@gmail.com</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
