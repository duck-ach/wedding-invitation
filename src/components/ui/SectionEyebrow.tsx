"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-[11px] font-medium tracking-[0.35em] text-rose-400"
    >
      {children}
    </motion.p>
  );
}
