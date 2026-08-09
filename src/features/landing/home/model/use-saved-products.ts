"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "technocrat:saved-products";
const CHANGE_EVENT = "technocrat:saved-products-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Save-for-later, held in localStorage.
 *
 * The backend has no wishlist yet, so this is deliberately device-local: the
 * heart on a product card really persists across reloads, and swaps for a
 * customer-scoped list the day the API exists. Nothing else reads it yet — the
 * saved-items surface lands with the account section.
 *
 * The custom event keeps every mounted card in sync (a `storage` event only
 * fires in *other* tabs, so without it two cards for the same product on one
 * page would disagree).
 */
export function useSavedProducts() {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSaved(read());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggleSaved = useCallback((productId: string) => {
    const current = read();
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or a full quota: the toggle still updates this session.
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
    setSaved(next);
  }, []);

  const isSaved = useCallback(
    (productId: string) => saved.includes(productId),
    [saved],
  );

  return { saved, isSaved, toggleSaved };
}
