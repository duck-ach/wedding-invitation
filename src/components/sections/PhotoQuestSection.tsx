"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function PhotoQuestSection() {
  const { photoMissions } = invitationData;

  return (
    <section className="bg-stone-50/60 py-16">
      <div className="flex flex-col items-center px-6 text-center">
        <SectionEyebrow>PHOTO QUEST</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">사진 미션</h2>
        <p className="mt-2 px-4 text-[13px] leading-5 text-stone-400">
          필름 카메라로 미션을 완성하고 신랑 신부에게 사진을 전달해 주세요
        </p>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
        {photoMissions.map((mission, i) => (
          <motion.div
            key={mission}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex w-[210px] shrink-0 snap-center flex-col items-center gap-4 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-[10px] font-medium tracking-widest text-stone-400">MISSION</span>
              <span className="font-display text-lg text-stone-700">0{i + 1}</span>
            </div>

            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-stone-800">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-stone-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-900">
                  <Camera size={20} className="text-stone-400" strokeWidth={1.5} />
                </div>
              </div>
              <span className="absolute -right-1 -top-1 h-4 w-8 rounded-sm bg-stone-300" />
            </div>

            <p className="text-center text-[13px] leading-5 text-stone-600">{mission}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {photoMissions.map((mission) => (
          <span key={mission} className="h-1.5 w-1.5 rounded-full bg-stone-300" />
        ))}
      </div>
    </section>
  );
}
