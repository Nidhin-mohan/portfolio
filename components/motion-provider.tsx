"use client";

import { MotionConfig } from "framer-motion";
import type React from "react";

/**
 * Honors the user's OS-level "reduce motion" preference for all
 * framer-motion animations (the CSS animations are already guarded
 * by the prefers-reduced-motion media query in globals.css).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
