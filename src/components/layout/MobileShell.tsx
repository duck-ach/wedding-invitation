import type { ReactNode } from "react";
import AudioToggle from "@/components/audio/AudioToggle";
import ShareButton from "@/components/sharing/ShareButton";

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-stone-100">
      {/* Ambient background — only visible around the card on wide viewports */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-stone-200/40 blur-3xl" />
      </div>

      {/* Mobile-constrained card */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col overflow-x-hidden bg-white sm:my-0 sm:shadow-[0_0_60px_rgba(0,0,0,0.08)]">
        {children}
      </div>

      {/* Floating controls layer — fixed to viewport but aligned to the 480px column */}
      <div className="pointer-events-none fixed inset-0 z-50 mx-auto max-w-[480px]">
        <div className="pointer-events-auto absolute bottom-6 right-5">
          <AudioToggle />
        </div>
        <div className="pointer-events-auto absolute bottom-6 left-5">
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
