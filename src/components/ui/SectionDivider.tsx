"use client";

import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-3 text-rose-300"
    >
      <span className="h-px w-10 bg-rose-200" />
      <Flower2 size={16} strokeWidth={1.5} />
      <span className="h-px w-10 bg-rose-200" />
    </motion.div>
  );
}
