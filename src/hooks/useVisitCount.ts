"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

const STORAGE_KEY = "wedding_visit_count";

/**
 * A per-browser visit counter, not a true cross-device visitor count —
 * that would require a backend. Seeds from `visitorCountSeed` and increments
 * by one on every load, purely for the animated-badge effect.
 */
export function useVisitCount(seed: number) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Deferred to a macrotask so this doesn't set state synchronously within the effect body.
    const id = setTimeout(() => {
      const current = readJSON(STORAGE_KEY, seed);
      const next = current + 1;
      writeJSON(STORAGE_KEY, next);
      setCount(next);
    }, 0);
    return () => clearTimeout(id);
    // Runs once per mount to record this visit; seed is only the initial fallback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return count;
}
