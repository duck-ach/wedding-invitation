"use client";

import { motion } from "framer-motion";

interface RevealLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  /** Delay before the first line starts revealing, in seconds */
  startDelay?: number;
  /** Gap between each line's reveal, in seconds */
  stagger?: number;
}

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function RevealLines({
  lines,
  className,
  lineClassName,
  startDelay = 0,
  stagger = 0.18,
}: RevealLinesProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delayChildren: startDelay, staggerChildren: stagger }}
    >
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} className="h-3" aria-hidden />
        ) : (
          <motion.p
            key={i}
            variants={lineVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={lineClassName}
          >
            {line}
          </motion.p>
        )
      )}
    </motion.div>
  );
}
