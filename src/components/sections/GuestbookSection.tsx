"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import { useGuestbook } from "@/hooks/useGuestbook";
import { useToast } from "@/components/ui/ToastProvider";
import { formatDateLabel } from "@/lib/date";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function GuestbookSection() {
  const { entries, addEntry } = useGuestbook(invitationData.guestbookSeed);
  const { show } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [song, setSong] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      show("이름과 메시지를 입력해 주세요");
      return;
    }
    addEntry({ name: name.trim(), message: message.trim(), song: song.trim() || undefined });
    setName("");
    setMessage("");
    setSong("");
    show("따뜻한 메시지 감사합니다");
  };

  return (
    <section className="px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <SectionEyebrow>GUESTBOOK</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">축하 메시지</h2>
        <p className="mt-2 px-4 text-[13px] leading-5 text-stone-400">
          신혼여행 플레이리스트에 담을 노래도 함께 추천해 주세요
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-stone-100 p-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          maxLength={20}
          className="rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="축하 메시지를 남겨주세요"
          rows={3}
          maxLength={300}
          className="resize-none rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300"
        />
        <div className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2.5">
          <Music size={14} className="shrink-0 text-stone-400" />
          <input
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="추천 노래 (선택)"
            maxLength={60}
            className="w-full min-w-0 text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-1 rounded-full bg-stone-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          메시지 남기기
        </button>
      </motion.form>

      <div className="mt-6 flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-stone-50 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-stone-700">{entry.name}</p>
                <span className="text-[11px] text-stone-400">{formatDateLabel(entry.createdAtIso)}</span>
              </div>
              <p className="mt-1 text-[13px] leading-6 text-stone-600">{entry.message}</p>
              {entry.song && (
                <p className="mt-2 flex items-center gap-1 text-xs text-rose-400">
                  <Music size={12} />
                  {entry.song}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
