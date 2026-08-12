"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { name: "Projects", href: "/#projects" },
  { name: "Writing", href: "/writing" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Principles", href: "/#principles" },
  { name: "Contact", href: "/#contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: "0%",
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.2,
        duration: 0.3,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center border-l border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[86%] flex-col border-l-2 border-foreground bg-background p-6 sm:w-[55%]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-10 flex items-center justify-between border-b-2 border-foreground pb-4">
                <Link href="/" onClick={closeMenu} className="flex items-center">
                  <span className="flex h-7 w-7 items-center justify-center bg-primary text-[12px] font-bold leading-none text-primary-foreground">
                    NM
                  </span>
                  <span className="ml-2.5 text-xs font-bold uppercase tracking-[0.18em]">
                    NIDHIN<span className="text-muted-foreground">.DEV</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  className="inline-flex h-8 w-8 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col border-t-2 border-foreground">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex items-center gap-3 border-b-2 border-foreground py-4 font-display text-3xl text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:pl-3"
                    >
                      <span className="text-sm text-primary group-hover:text-primary-foreground">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Links */}
              <div className="mt-auto flex gap-0 pt-12">
                <Link
                  href="https://github.com/Nidhin-mohan"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-foreground text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={closeMenu}
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/nidhinm/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center border-2 border-l-0 border-foreground text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={closeMenu}
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
