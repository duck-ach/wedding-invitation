"use client";

import { motion } from "framer-motion";
import { invitationData } from "@/config/invitationData";
import RevealLines from "@/components/motion/RevealLines";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import SectionDivider from "@/components/ui/SectionDivider";

export default function GreetingSection() {
  const { greeting } = invitationData;

  return (
    <section className="flex flex-col items-center px-8 py-20 text-center">
      <SectionEyebrow>{greeting.eyebrow}</SectionEyebrow>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 font-hand text-3xl text-stone-700"
      >
        {greeting.title}
      </motion.h2>

      <div className="mt-5">
        <SectionDivider />
      </div>

      <RevealLines
        lines={greeting.message}
        className="mt-8 flex flex-col gap-1.5"
        lineClassName="text-[15px] leading-7 text-stone-600"
        startDelay={0.2}
        stagger={0.12}
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 font-hand text-xl text-stone-500"
      >
        {greeting.signature}
      </motion.p>
    </section>
  );
}
