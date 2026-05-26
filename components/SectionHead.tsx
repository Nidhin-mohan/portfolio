"use client";

import { motion } from "framer-motion";

interface SectionHeadProps {
  n: string;
  tag: string;
  meta?: string;
  title: string;
}

export default function SectionHead({ n, tag, meta, title }: SectionHeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="mb-7"
    >
      {/* number / tag bar */}
      <div className="flex items-stretch border-y-2 border-foreground">
        <span className="flex items-center bg-primary px-3 py-1.5 font-display text-xl leading-none text-primary-foreground">
          {n}
        </span>
        <span className="flex items-center border-l-2 border-foreground px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
          {tag}
        </span>
        {meta && (
          <span className="ml-auto hidden items-center px-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:flex">
            {meta}
          </span>
        )}
      </div>

      {/* big title */}
      <h2 className="mt-6 font-display text-5xl leading-[0.86] text-foreground md:text-7xl">
        {title}
      </h2>
    </motion.div>
  );
}
