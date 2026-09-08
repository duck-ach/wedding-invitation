"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { invitationData } from "@/config/invitationData";
import { useVisitCount } from "@/hooks/useVisitCount";
import { useCountUp } from "@/hooks/useCountUp";

export default function VisitorCounter() {
  const count = useVisitCount(invitationData.visitorCountSeed);
  const [inView, setInView] = useState(false);
  const displayed = useCountUp(count ?? 0, inView && count !== null);

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.8 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 text-xs text-stone-500"
    >
      <Eye size={13} />
      <span>
        다녀가신 분{" "}
        <span className="font-medium tabular-nums text-stone-700">
          {count === null ? "–" : displayed.toLocaleString()}
        </span>
        명
      </span>
    </motion.div>
  );
}
