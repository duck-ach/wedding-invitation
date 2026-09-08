"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Copy, MapPin, Navigation2, Car, Compass } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/components/ui/ToastProvider";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import AccordionItem from "@/components/ui/AccordionItem";

function NavLinkButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1.5 rounded-xl border border-stone-100 py-3 text-stone-500 transition-colors hover:bg-stone-50"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </a>
  );
}

export default function DirectionsSection() {
  const { venue } = invitationData;
  const { show } = useToast();

  const handleCopyAddress = async () => {
    const ok = await copyToClipboard(venue.address);
    show(ok ? "주소가 복사되었습니다" : "복사에 실패했어요. 직접 입력해 주세요");
  };

  return (
    <section className="px-6 py-16">
      <div className="flex flex-col items-center px-2 text-center">
        <SectionEyebrow>LOCATION</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">오시는 길</h2>
        <p className="mt-3 text-sm text-stone-600">
          {venue.name} {venue.hallName}
        </p>
        <button
          type="button"
          onClick={handleCopyAddress}
          className="mt-1.5 flex items-center gap-1.5 text-[13px] text-stone-400 hover:text-rose-400"
        >
          <span>{venue.address}</span>
          <Copy size={13} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative mt-6 h-56 w-full overflow-hidden rounded-2xl border border-stone-100 bg-stone-50"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(#e7e5e4 1px, transparent 1px), linear-gradient(90deg, #e7e5e4 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <MapPin size={30} className="fill-rose-400 text-rose-500" strokeWidth={1.5} />
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="-mt-1.5 h-2 w-2 rounded-full bg-rose-400"
            />
          </motion.div>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-600 shadow-sm">
            {venue.name}
          </span>
        </div>
        <span className="absolute bottom-2 right-3 text-[10px] text-stone-400">
          실제 지도는 추후 연동 예정입니다
        </span>
      </motion.div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <NavLinkButton href={venue.naverMapUrl} label="네이버지도" icon={<Navigation2 size={18} />} />
        <NavLinkButton href={venue.kakaoMapUrl} label="카카오내비" icon={<Compass size={18} />} />
        <NavLinkButton href={venue.tmapUrl} label="T맵" icon={<Car size={18} />} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 overflow-hidden rounded-2xl border border-stone-100"
      >
        <AccordionItem title="지하철" defaultOpen>
          {venue.transportation.subway.map((line) => (
            <p key={line} className="text-[13px] leading-6 text-stone-500">
              {line}
            </p>
          ))}
        </AccordionItem>
        <AccordionItem title="버스">
          {venue.transportation.bus.map((line) => (
            <p key={line} className="text-[13px] leading-6 text-stone-500">
              {line}
            </p>
          ))}
        </AccordionItem>
        <AccordionItem title="자가용 및 주차">
          {venue.transportation.carAndParking.map((line) => (
            <p key={line} className="text-[13px] leading-6 text-stone-500">
              {line}
            </p>
          ))}
        </AccordionItem>
      </motion.div>
    </section>
  );
}
