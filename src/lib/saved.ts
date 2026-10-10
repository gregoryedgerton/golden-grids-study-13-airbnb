import { useSyncExternalStore } from "react";

/**
 * Saved stays. The reference keeps a wishlist on an account; the study has no
 * account, so the list lives in this tab's session storage and goes when the
 * tab closes. Nothing is sent anywhere.
 */
const KEY = "gg13-saved";
let ids: string[] = [];
try { ids = JSON.parse(sessionStorage.getItem(KEY) ?? "[]"); } catch { ids = []; }
const listeners = new Set<() => void>();
const emit = () => { try { sessionStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* private window: keep it in memory */ } listeners.forEach((l) => l()); };

export function toggleSaved(id: string) { ids = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]; emit(); }
export function useSaved(): string[] {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => ids, () => ids);
}
