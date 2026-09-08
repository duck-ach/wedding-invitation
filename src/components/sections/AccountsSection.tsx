"use client";

import { motion } from "framer-motion";
import { Copy, Wallet } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import type { BankAccount } from "@/config/invitationData";
import { copyToClipboard } from "@/lib/clipboard";
import { useToast } from "@/components/ui/ToastProvider";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import AccordionItem from "@/components/ui/AccordionItem";

function AccountRow({ account }: { account: BankAccount }) {
  const { show } = useToast();

  const handleCopy = async () => {
    const ok = await copyToClipboard(account.accountNumber.replace(/-/g, ""));
    show(ok ? "계좌번호가 복사되었습니다" : "복사에 실패했어요. 직접 입력해 주세요");
  };

  const handleKakaoPay = () => {
    if (account.kakaoPayLink) {
      window.open(account.kakaoPayLink, "_blank", "noopener,noreferrer");
    } else {
      show("카카오페이 송금 연결은 준비 중입니다");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-stone-50 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-700">
          {account.bankName} <span className="text-stone-400">{account.holderName}</span>
        </p>
        <p className="mt-0.5 truncate text-[13px] tabular-nums text-stone-500">
          {account.accountNumber}
        </p>
      </div>
      <div className="flex shrink-0 gap-1.5">
        <button
          type="button"
          onClick={handleKakaoPay}
          aria-label="카카오페이로 송금"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEE500] text-[#3C1E1E] transition-transform active:scale-95"
        >
          <Wallet size={14} />
        </button>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="계좌번호 복사"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:bg-white active:scale-95"
        >
          <Copy size={14} />
        </button>
      </div>
    </div>
  );
}

export default function AccountsSection() {
  const { accounts } = invitationData;

  return (
    <section className="px-8 py-16">
      <div className="flex flex-col items-center text-center">
        <SectionEyebrow>GIFT</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl text-stone-800">마음 전하실 곳</h2>
        <p className="mt-3 text-[13px] leading-6 text-stone-400">
          참석이 어려우신 분들을 위해 계좌번호를 안내드립니다.
          <br />
          너그러운 마음으로 이해 부탁드립니다.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-8 overflow-hidden rounded-2xl border border-stone-100"
      >
        <AccordionItem title={accounts.groom.label} defaultOpen>
          {accounts.groom.accounts.map((account) => (
            <AccountRow key={account.accountNumber} account={account} />
          ))}
        </AccordionItem>
        <AccordionItem title={accounts.bride.label}>
          {accounts.bride.accounts.map((account) => (
            <AccountRow key={account.accountNumber} account={account} />
          ))}
        </AccordionItem>
      </motion.div>
    </section>
  );
}
