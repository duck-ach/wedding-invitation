"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Users } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import type { Person } from "@/config/invitationData";
import { toTelHref, toSmsHref } from "@/lib/phone";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Drawer from "@/components/ui/Drawer";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-50 text-stone-500 transition-colors hover:bg-rose-50 hover:text-rose-500"
    >
      {children}
    </a>
  );
}

function ContactCard({ person }: { person: Person }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-stone-100 px-4 py-5">
      <div>
        <p className="text-[11px] tracking-[0.2em] text-stone-400">{person.relation}</p>
        <p className="mt-1 text-base font-medium text-stone-800">{person.name}</p>
      </div>
      <div className="flex gap-2">
        <IconLink href={toTelHref(person.phone)} label={`${person.name}에게 전화`}>
          <Phone size={16} />
        </IconLink>
        <IconLink href={toSmsHref(person.phone)} label={`${person.name}에게 문자`}>
          <MessageCircle size={16} />
        </IconLink>
      </div>
    </div>
  );
}

function FamilyContactRow({ person }: { person: Person }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-stone-700">{person.name}</p>
        <p className="text-xs text-stone-400">{person.relation}</p>
      </div>
      <div className="flex gap-2">
        <IconLink href={toTelHref(person.phone)} label={`${person.name}에게 전화`}>
          <Phone size={16} />
        </IconLink>
        <IconLink href={toSmsHref(person.phone)} label={`${person.name}에게 문자`}>
          <MessageCircle size={16} />
        </IconLink>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const { familyGroom, familyBride } = invitationData;

  return (
    <section className="px-8 py-16">
      <div className="flex flex-col items-center text-center">
        <SectionEyebrow>CONTACT</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">연락하기</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-8 grid grid-cols-2 gap-3"
      >
        <ContactCard person={familyGroom.self} />
        <ContactCard person={familyBride.self} />
      </motion.div>

      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-stone-200 py-3 text-sm text-stone-600 transition-colors hover:bg-stone-50"
      >
        <Users size={16} />
        혼주에게 연락하기
      </motion.button>

      <Drawer open={open} onClose={() => setOpen(false)} title="혼주에게 연락하기">
        <p className="mb-1 text-xs font-medium tracking-[0.15em] text-stone-400">
          {familyGroom.self.relation}측
        </p>
        <div className="divide-y divide-stone-50">
          <FamilyContactRow person={familyGroom.father} />
          <FamilyContactRow person={familyGroom.mother} />
        </div>

        <p className="mb-1 mt-4 text-xs font-medium tracking-[0.15em] text-stone-400">
          {familyBride.self.relation}측
        </p>
        <div className="divide-y divide-stone-50">
          <FamilyContactRow person={familyBride.father} />
          <FamilyContactRow person={familyBride.mother} />
        </div>
      </Drawer>
    </section>
  );
}
