"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import { getMonthMatrix, parseDatePart } from "@/lib/date";
import { useCountdown } from "@/hooks/useCountdown";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-stone-50 px-3 py-3.5">
      <div className="h-8 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="block font-display text-2xl tabular-nums text-stone-800"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] tracking-[0.2em] text-stone-400">{label}</span>
    </div>
  );
}

export default function CalendarSection() {
  const { wedding } = invitationData;
  const { year, month0, day } = parseDatePart(wedding.dateTimeIso);
  const weeks = getMonthMatrix(year, month0);
  const countdown = useCountdown(wedding.dateTimeIso);

  return (
    <section className="flex flex-col items-center bg-stone-50/60 px-8 py-16 text-center">
      <SectionEyebrow>SAVE THE DATE</SectionEyebrow>
      <h2 className="mt-3 font-display text-2xl text-stone-800">{wedding.dateDisplay}</h2>
      <p className="mt-1 text-sm text-stone-400">{wedding.timeDisplay}</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-8 w-full rounded-3xl border border-stone-100 bg-white p-5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
      >
        <p className="mb-4 text-sm font-medium text-stone-600">
          {year}년 {month0 + 1}월
        </p>
        <div className="grid grid-cols-7 gap-y-2 text-xs">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={
                i === 0
                  ? "text-rose-400"
                  : i === 6
                    ? "text-sky-400"
                    : "text-stone-400"
              }
            >
              {w}
            </div>
          ))}

          {weeks.flatMap((week, wi) =>
            week.map((cell, ci) => {
              const key = `${wi}-${ci}`;
              if (!cell) return <div key={key} />;

              const isWeddingDay = cell.date === day;

              if (!isWeddingDay) {
                return (
                  <div key={key} className="flex h-9 items-center justify-center text-stone-600">
                    {cell.date}
                  </div>
                );
              }

              return (
                <div key={key} className="relative flex h-9 items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-8 w-8 rounded-full bg-rose-100"
                  />
                  <span className="relative text-sm font-semibold text-rose-500">{cell.date}</span>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                    className="absolute -right-0.5 -top-0.5"
                  >
                    <Heart size={10} className="fill-rose-400 text-rose-400" />
                  </motion.span>
                </div>
              );
            })
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 w-full"
      >
        {countdown && !countdown.isPast ? (
          <>
            <p className="mb-3 text-xs tracking-[0.15em] text-stone-400">
              결혼식까지 D-{countdown.days}
            </p>
            <div className="grid grid-cols-4 gap-2">
              <CountdownUnit value={countdown.days} label="DAYS" />
              <CountdownUnit value={countdown.hours} label="HOURS" />
              <CountdownUnit value={countdown.minutes} label="MIN" />
              <CountdownUnit value={countdown.seconds} label="SEC" />
            </div>
          </>
        ) : countdown?.isPast ? (
          <p className="text-sm text-rose-400">저희 결혼식이 진행되었습니다 :)</p>
        ) : (
          <div className="h-[76px]" aria-hidden />
        )}
      </motion.div>
    </section>
  );
}
