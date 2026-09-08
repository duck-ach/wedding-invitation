"use client";

import { useEffect, useState } from "react";
import { invitationData } from "@/config/invitationData";
import { useAudio } from "@/components/audio/AudioProvider";
import HeroSection from "@/components/sections/HeroSection";
import OpeningOverlay from "@/components/opening/OpeningOverlay";
import GreetingSection from "@/components/sections/GreetingSection";
import CalendarSection from "@/components/sections/CalendarSection";
import ContactSection from "@/components/sections/ContactSection";
import AccountsSection from "@/components/sections/AccountsSection";
import GallerySection from "@/components/sections/GallerySection";
import DirectionsSection from "@/components/sections/DirectionsSection";
import ProfileSection from "@/components/sections/ProfileSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import PhotoQuestSection from "@/components/sections/PhotoQuestSection";
import VisitorCounter from "@/components/ui/VisitorCounter";

export default function HomeExperience() {
  const [isOpened, setIsOpened] = useState(false);
  const { couple, wedding } = invitationData;
  const { play } = useAudio();

  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    play();
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="relative">
        <HeroSection
          revealed={isOpened}
          imageUrl={couple.heroImageUrl}
          imageAlt={couple.heroImageAlt}
          groomNameEn={couple.groom.nameEn}
          brideNameEn={couple.bride.nameEn}
          dateDisplay={wedding.dateDisplay}
          timeDisplay={wedding.timeDisplay}
        />
        <OpeningOverlay open={isOpened} onOpen={handleOpen} />
      </div>

      <GreetingSection />
      <CalendarSection />
      <GallerySection />
      <ProfileSection />
      <ContactSection />
      <DirectionsSection />
      <AccountsSection />
      <GuestbookSection />
      <PhotoQuestSection />

      <footer className="flex flex-col items-center gap-4 border-t border-stone-100 px-8 py-10 text-center">
        <VisitorCounter />
        <p className="text-xs tracking-wide text-stone-400">
          {couple.groom.name} · {couple.bride.name}
        </p>
      </footer>
    </main>
  );
}
