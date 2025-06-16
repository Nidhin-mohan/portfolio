"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

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

  const menuItems = [
    { name: "Projects", href: "/#projects" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: "0%",
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-black/60"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              // className="absolute right-0 top-0 h-full w-[80%] sm:w-[60%] bg-background text-foreground shadow-lg p-6 flex flex-col"
              className="absolute right-0 top-0 h-full w-[80%] sm:w-[60%] bg-white dark:bg-slate-800 text-foreground shadow-xl p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={closeMenu}>
                  <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Nidhin.dev
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col gap-6 mt-4">
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
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer Links */}
              <div className="mt-auto pt-12 flex justify-center gap-6">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
