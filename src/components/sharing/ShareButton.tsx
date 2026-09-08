"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, MessageCircle, Link as LinkIcon } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/components/ui/ToastProvider";
import Drawer from "@/components/ui/Drawer";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const { show } = useToast();

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(window.location.href);
    show(ok ? "청첩장 링크가 복사되었습니다" : "복사에 실패했어요. 잠시 후 다시 시도해 주세요");
    setOpen(false);
  };

  const handleKakaoShare = () => {
    // Wire up the Kakao JS SDK (Kakao.Share.sendDefault) once an app key + domain are registered.
    show("카카오톡 공유 연동은 준비 중입니다");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="청첩장 공유"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        whileTap={{ scale: 0.92 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-stone-700 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:bg-white"
      >
        <Share2 size={18} strokeWidth={1.75} />
      </motion.button>

      <Drawer open={open} onClose={() => setOpen(false)} title="청첩장 공유하기">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleKakaoShare}
            className="flex items-center gap-3 rounded-xl bg-[#FEE500] px-4 py-3.5 text-sm font-medium text-[#3C1E1E] transition-transform active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            카카오톡으로 공유
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3.5 text-sm text-stone-600 transition-colors hover:bg-stone-50"
          >
            <LinkIcon size={18} />
            링크 복사
          </button>
        </div>
      </Drawer>
    </>
  );
}
