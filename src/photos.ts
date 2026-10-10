import meta from "./photos.json";

/**
 * Photographs are third parties': from Wikimedia Commons and Flickr under
 * Creative Commons licences or in the public domain, and from Unsplash under
 * the Unsplash License. None is Airbnb's or any host's, and none shows a place
 * that can be booked here. `photos.json` records each one's author, licence
 * and page, and its alt text, which is the only place a picture is described.
 */
export interface Photo { key: string; src: string; srcSet: string; alt: string; credit: string; licence: string; page: string; source: string; profile?: string; w: number; h: number }
type Meta = Record<string, { credit: string; licence: string; page: string; source: string; alt: string; profile?: string; w: number; h: number }>;

export function photo(key: string): Photo {
  const m = (meta as Meta)[key];
  if (!m) throw new Error(`photo "${key}" is not in photos.json`);
  const base = `${import.meta.env.BASE_URL}assets/s13-${key}`;
  return { key, src: `${base}-800.jpg`, srcSet: `${base}-800.jpg ${Math.round(m.w / 2)}w, ${base}-1600.jpg ${m.w}w`, alt: m.alt, credit: m.credit, licence: m.licence, page: m.page, source: m.source, profile: m.profile, w: m.w, h: m.h };
}

/** Photographs that have been drawn on this page, for the credits in the footer. */
export const seen = new Set<string>();
