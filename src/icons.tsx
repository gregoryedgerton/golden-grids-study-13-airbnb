/**
 * The study's own line icons, drawn on a 24-unit grid with a round 1.6-unit
 * stroke in the manner of the reference's amenity glyphs. None is copied
 * from the reference. `Icon` is inline and takes the text colour; `Imprint`
 * is the same drawing set large and faint behind a square's text.
 */
const PATHS = {
  home: "M3.5 11.5 12 4l8.5 7.5M5.5 10v9.5h13V10M10 19.5v-5h4v5",
  pin: "M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z",
  bell: "M4 17.5h16M5.5 17.5a6.5 6.5 0 0 1 13 0M12 8.5v2.5M10 8.5h4M3 20.5h18",
  ferry: "M3 15.5h18l-2.2 4.5H5.2L3 15.5zM6 15.5v-4h12v4M9 11.5V8h6v3.5M12 8V5M2.5 22c1.6 0 1.6-1 3.2-1s1.6 1 3.1 1 1.6-1 3.2-1 1.6 1 3.2 1 1.6-1 3.1-1 1.6 1 3.2 1",
  tower: "M9.5 21 10.5 8h3L14.5 21M8 21h8M10 8V5.5h4V8M9.5 5.5h5M12 5.5V3M10.4 12h3.2M10.2 16h3.6",
  guests: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20a7 7 0 0 1 14 0",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8",
  dune: "M2 19c3-6 6-9 9-9s4 3 6 3 3-1.500 5-4M2 19h20M15 6.500a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
  lighthouse: "M9 21 10.200 9h3.600L15 21M7 21h10M9.500 9h5M10.500 9V6h3v3M12 6V4M4 6.500l3.500 1M20 6.500l-3.500 1M9.700 14h4.600",
  bed: "M3 18v-7.500M3 14h18v4M21 14v-1.500a2.500 2.500 0 0 0-2.500-2.500H10v4M6.500 12.800a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3zM3 18v1.500M21 18v1.500",
  paw: "M12 20c-3 0-5-1.500-5-3.500 0-2.500 2.500-5 5-5s5 2.500 5 5c0 2-2 3.500-5 3.500zM6 10.500a1.600 2 0 1 0 0-4 1.600 2 0 0 0 0 4zM18 10.500a1.600 2 0 1 0 0-4 1.600 2 0 0 0 0 4zM9.800 7.500a1.500 2 0 1 0 0-4 1.500 2 0 0 0 0 4zM14.200 7.500a1.500 2 0 1 0 0-4 1.500 2 0 0 0 0 4z",
  car: "M4 16.500v-4l2-5h12l2 5v4M3 16.500h18M6 16.500V19M18 16.500V19M4.500 12.500h15M7.500 14.500h1M15.500 14.500h1",
  pot: "M4.500 10h15v6a4 4 0 0 1-4 4h-7a4 4 0 0 1-4-4v-6zM2.500 12h2M19.500 12h2M8 6.500c0-1 1-1 1-2M12 6.500c0-1 1-1 1-2M16 6.500c0-1 1-1 1-2",
  wifi: "M2.500 9.500a14 14 0 0 1 19 0M5.800 13a9 9 0 0 1 12.400 0M9 16.300a4.500 4.500 0 0 1 6 0M12 19.500h.01",
  washer: "M5 3.500h14v17H5v-17zM5 7.500h14M8 5.500h.01M11 5.500h.01M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  snow: "M12 2.500v19M3.800 7.200l16.400 9.600M3.800 16.800l16.400-9.600M9.500 4l2.500 2 2.500-2M9.500 20l2.500-2 2.500 2",
  flame: "M12 21c-3.500 0-6-2.500-6-6 0-3 2-4.500 3-7 .500 1.500 1.500 2.500 2.500 3 0-3 1-5.500 3-7.500 0 4 3.500 6 3.500 11 0 3.800-2.500 6.500-6 6.500z",
  knife: "M4 20 15.500 8.500M15.500 8.500 19 5c1.500 2.500 1 5.500-1 7.500l-2.500 2.500-3-3M6.500 5.500v5M4.500 5.500v3a2 2 0 0 0 4 0v-3M6.500 10.500V13",
  camera: "M3.500 8h3.500l1.500-2.500h7L17 8h3.500v11h-17V8zM12 16.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7z",
  leaf: "M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l8-8",
  box: "M3.500 8.500 12 4l8.500 4.500v8L12 21l-8.500-4.500v-8zM3.500 8.500 12 13l8.500-4.500M12 13v8",
  cup: "M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9zM16 10.500h1.500a2.500 2.500 0 0 1 0 5H16M8 3.500c0 1.200 1 1.200 1 2.500M12 3.500c0 1.200 1 1.200 1 2.500",
  tv: "M3.500 5.500h17v11h-17v-11zM8.500 20h7M12 16.500V20",
  dryer: "M4 9.500a5 5 0 0 1 5-5h9v10H9a5 5 0 0 1-5-5zM18 7.500h2.500v4H18M9 14.500 10.500 21h3L12 14.500M8.500 9.500h.01",
  luggage: "M6 7.500h12v12H6v-12zM9.500 7.500V4h5v3.500M9.500 11v5M14.500 11v5M8 19.500V21M16 19.500V21",
  bottle: "M9.500 3.500h5V7h-5V3.500zM8 21V11.500c0-1.500 1.500-2 1.500-4.500h5c0 2.500 1.500 3 1.500 4.500V21H8zM8 14h8",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.200l2.700 2.800L16 9.500",
  key: "M8 15.500a4.500 4.500 0 1 0 0-9 4.500 4.500 0 0 0 0 9zM11.500 13.500 20 22M16 18l2-2M18.500 20.500l2-2",
  shield: "M12 3 4.500 6v6c0 4.500 3 7.500 7.500 9 4.500-1.500 7.500-4.500 7.500-9V6L12 3zM12 3v18",
  heart: "M12 20.500s-8-5-8-10.800A4.200 4.200 0 0 1 12 7a4.200 4.200 0 0 1 8 2.700c0 5.800-8 10.800-8 10.800z",
  share: "M12 3.500v11M8 7.500l4-4 4 4M6 11.500H4.500v9h15v-9H18",
  search: "M10.500 17a6.500 6.500 0 1 0 0-13 6.500 6.500 0 0 0 0 13zM15.500 15.500 21 21",
  filters: "M3 7h9M16 7h5M3 17h5M12 17h9M14 9.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5zM10 19.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z",
  flag: "M5 21V4M5 4h12l-2 4 2 4H5",
  tag: "M3.500 12.500V4h8.500l8.500 8.500-8 8-9-8zM8 8.500h.01",
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={`icon${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** The drawing set large and faint behind a square's text; decorative, clipped by the box. */
export function Imprint({ name }: { name: IconName }) {
  return (
    <svg className="box__imprint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}

/** A filled star, for a rating. */
export function Star() {
  return <svg className="star" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false"><path fill="currentColor" d="m12 2.500 2.900 6.300 6.800.700-5.100 4.600 1.500 6.700L12 17.300l-6.100 3.500 1.500-6.700L2.300 9.500l6.800-.700L12 2.500z" /></svg>;
}
