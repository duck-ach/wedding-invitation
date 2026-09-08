"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { invitationData } from "@/config/invitationData";

interface OpeningOverlayProps {
  open: boolean;
  onOpen: () => void;
}

export default function OpeningOverlay({ open, onOpen }: OpeningOverlayProps) {
  const { groom, bride } = invitationData.couple;

  return (
    <AnimatePresence>
      {!open && (
        <div className="absolute inset-0 z-[70] overflow-hidden">
          <motion.div
            key="left"
            className="absolute inset-y-0 left-0 w-1/2 bg-stone-900"
            exit={{ x: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            key="right"
            className="absolute inset-y-0 right-0 w-1/2 bg-stone-900"
            exit={{ x: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          />

          <motion.button
            key="content"
            type="button"
            onClick={onOpen}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-8 text-center text-white/90"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25"
            >
              <Mail size={26} strokeWidth={1.4} />
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-[11px] tracking-[0.35em] text-white/60">INVITATION</p>
              <p className="font-display text-xl tracking-wide">
                {bride.nameEn} <Heart size={13} className="mx-1 inline fill-rose-300 text-rose-300" />{" "}
                {groom.nameEn}
              </p>
            </div>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs tracking-[0.2em] text-white/70"
            >
              탭하여 초대장 열기
            </motion.p>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
