"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import type { GalleryPhoto } from "@/config/invitationData";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Lightbox from "@/components/ui/Lightbox";

const INITIAL_COUNT = 6;

function getSpanClass(indexInBlock: number): string {
  if (indexInBlock === 0) return "col-span-2 row-span-2";
  if (indexInBlock === 4) return "col-span-2";
  return "";
}

function GalleryTile({
  photo,
  spanClass,
  onClick,
}: {
  photo: GalleryPhoto;
  spanClass: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden rounded-sm bg-stone-100 ${spanClass}`}
    >
      <Image
        src={photo.thumbnailUrl}
        alt={photo.alt}
        fill
        sizes="(max-width: 480px) 33vw, 160px"
        className="object-cover"
      />
    </motion.button>
  );
}

export default function GallerySection() {
  const { gallery } = invitationData;
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible = gallery.slice(0, INITIAL_COUNT);
  const extra = gallery.slice(INITIAL_COUNT);

  return (
    <section className="px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <SectionEyebrow>ALBUM</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">웨딩 앨범</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mt-8 grid grid-cols-3 auto-rows-[110px] gap-1"
      >
        {visible.map((photo, i) => (
          <GalleryTile
            key={photo.id}
            photo={photo}
            spanClass={getSpanClass(i)}
            onClick={() => setLightboxIndex(gallery.indexOf(photo))}
          />
        ))}
      </motion.div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 grid grid-cols-3 auto-rows-[110px] gap-1">
              {extra.map((photo, i) => (
                <GalleryTile
                  key={photo.id}
                  photo={photo}
                  spanClass={getSpanClass(i)}
                  onClick={() => setLightboxIndex(gallery.indexOf(photo))}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {extra.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mx-auto mt-5 flex items-center gap-1 text-sm text-stone-500"
        >
          {expanded ? "접기" : "더보기"}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={16} />
          </motion.span>
        </button>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          photos={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </section>
  );
}
