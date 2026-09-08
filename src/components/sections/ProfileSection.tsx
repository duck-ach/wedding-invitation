"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { invitationData } from "@/config/invitationData";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ProfileSection() {
  const { profileFields, qna } = invitationData;

  return (
    <section className="bg-stone-50/60 px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <SectionEyebrow>ABOUT US</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">우리 두 사람</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-8 rounded-2xl bg-white p-5 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
      >
        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-2 gap-y-3 text-sm">
          <span />
          <span className="text-center text-xs font-medium tracking-wide text-rose-400">신랑</span>
          <span className="text-center text-xs font-medium tracking-wide text-sky-400">신부</span>
          {profileFields.map((field) => (
            <Fragment key={field.label}>
              <span className="whitespace-nowrap text-xs text-stone-400">{field.label}</span>
              <span className="text-center text-[13px] text-stone-700">{field.groomValue}</span>
              <span className="text-center text-[13px] text-stone-700">{field.brideValue}</span>
            </Fragment>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col gap-6">
        {qna.map((item, i) => {
          const tilt = i % 2 === 0 ? -1.5 : 1.5;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, rotate: tilt * 1.6 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-lg border border-stone-100 bg-white p-4 shadow-sm"
            >
              <span className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-1 bg-amber-100/80" />
              <p className="text-sm font-medium text-stone-700">Q. {item.question}</p>
              <div className="mt-3 flex flex-col gap-2">
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-[13px] leading-5 text-stone-600">
                  <span className="mr-1 font-medium text-rose-400">신랑</span>
                  {item.groomAnswer}
                </p>
                <p className="rounded-xl bg-sky-50 px-3 py-2 text-[13px] leading-5 text-stone-600">
                  <span className="mr-1 font-medium text-sky-400">신부</span>
                  {item.brideAnswer}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
