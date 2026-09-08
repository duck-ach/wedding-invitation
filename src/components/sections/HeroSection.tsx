"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  imageUrl: string;
  imageAlt: string;
  groomNameEn: string;
  brideNameEn: string;
  dateDisplay: string;
  timeDisplay: string;
  /** Gates the entrance animation — stays hidden until the opening overlay is dismissed */
  revealed: boolean;
}

export default function HeroSection({
  imageUrl,
  imageAlt,
  groomNameEn,
  brideNameEn,
  dateDisplay,
  timeDisplay,
  revealed,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[100dvh] max-h-[860px] min-h-[560px] w-full items-end overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 1.08 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full flex-col items-center gap-5 px-8 pb-16 text-center text-white"
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.22, delayChildren: 0.7 } },
        }}
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-medium tracking-[0.35em] text-white/80"
        >
          WE ARE GETTING MARRIED
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-medium leading-tight tracking-wide"
        >
          {brideNameEn}
          <span className="mx-3 align-middle text-2xl font-normal text-white/70">&amp;</span>
          {groomNameEn}
        </motion.h1>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-1 text-sm text-white/90"
        >
          <span>{dateDisplay}</span>
          <span className="text-white/70">{timeDisplay}</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
