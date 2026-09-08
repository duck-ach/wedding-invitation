"use client";

import { useCallback, useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";
import type { GuestbookEntry } from "@/config/invitationData";

const STORAGE_KEY = "wedding_guestbook_entries";

export function useGuestbook(seed: GuestbookEntry[]) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(seed);

  useEffect(() => {
    // Deferred to a macrotask so this doesn't set state synchronously within the effect body.
    const id = setTimeout(() => setEntries(readJSON(STORAGE_KEY, seed)), 0);
    return () => clearTimeout(id);
    // Seed is only used as the initial fallback on first mount, not a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEntry = useCallback((entry: Omit<GuestbookEntry, "id" | "createdAtIso">) => {
    setEntries((prev) => {
      const next: GuestbookEntry[] = [
        {
          ...entry,
          id: `entry-${Date.now()}`,
          createdAtIso: new Date().toISOString(),
        },
        ...prev,
      ];
      writeJSON(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { entries, addEntry };
}
