import { useSyncExternalStore } from "react";
import { ROOMS, type Room } from "../content";

/**
 * The booking card's state, shared with the room squares so that choosing
 * dates prices every room on the page. It is the study's own arithmetic: a
 * nightly rate times the nights, and an availability that is worked out from
 * the dates so the same dates always give the same answer. Nothing is sent
 * and nothing can be booked.
 */
export interface Booking { checkIn: string; checkOut: string; guests: number; checked: boolean }
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const today = () => iso(new Date());
export const plusDays = (from: string, n: number) => { const d = new Date(`${from}T12:00:00`); d.setDate(d.getDate() + n); return iso(d); };

const example = typeof location !== "undefined" && new URLSearchParams(location.search).has("example");
let state: Booking = example ? { checkIn: plusDays(today(), 9), checkOut: plusDays(today(), 14), guests: 2, checked: true } : { checkIn: "", checkOut: "", guests: 1, checked: false };
const listeners = new Set<() => void>();
export function setBooking(patch: Partial<Booking>) { state = { ...state, ...patch }; listeners.forEach((l) => l()); }
export function useBooking(): Booking {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

export function nights(b: Booking): number {
  if (!b.checkIn || !b.checkOut) return 0;
  return Math.round((new Date(`${b.checkOut}T12:00:00`).getTime() - new Date(`${b.checkIn}T12:00:00`).getTime()) / 86400000);
}
/** Why the dates cannot be checked, or null when they can. */
export function problem(b: Booking): string | null {
  if (!b.checkIn || !b.checkOut) return "Choose a check-in and a checkout date.";
  if (b.checkIn < today()) return "Check-in cannot be in the past.";
  if (nights(b) < 1) return "Checkout must be after check-in.";
  if (nights(b) > 28) return "The study prices stays of up to 28 nights.";
  return null;
}
/** A room is taken on about one set of dates in four, decided by the dates and the room, so the answer is repeatable. */
export function available(room: Room, b: Booking): boolean {
  let h = 0;
  for (const c of `${room.id}${b.checkIn}${b.checkOut}`) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 !== 0 && room.guests >= b.guests;
}
export interface Quote { room: Room; free: boolean; total: number }
export function quotes(b: Booking): Quote[] | null {
  if (!b.checked || problem(b)) return null;
  const n = nights(b);
  return ROOMS.map((room) => ({ room, free: available(room, b), total: room.rate * n }));
}
