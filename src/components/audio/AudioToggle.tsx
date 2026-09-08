"use client";

import { motion } from "framer-motion";
import { Music2 } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";

const BAR_COUNT = 3;

export default function AudioToggle() {
  const { isPlaying, hasSource, toggle } = useAudio();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? "배경음악 정지" : "배경음악 재생"}
      aria-pressed={isPlaying}
      disabled={!hasSource}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: hasSource ? 1 : 0.4, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
      whileTap={{ scale: 0.92 }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-stone-700 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:bg-white disabled:cursor-not-allowed"
    >
      {isPlaying ? (
        <div className="flex h-4 items-end gap-[3px]">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-rose-400"
              animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      ) : (
        <Music2 size={18} strokeWidth={1.75} />
      )}
    </motion.button>
  );
}
