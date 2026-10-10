/** Where the facts come from. A square names its source by key; the credits list every source the page drew on. */
export const SOURCES = {
  ptown: { short: "Wikipedia", full: "Wikipedia, \"Provincetown, Massachusetts\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Provincetown,_Massachusetts" },
  monument: { short: "Wikipedia", full: "Wikipedia, \"Pilgrim Monument\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Pilgrim_Monument" },
  seashore: { short: "Wikipedia", full: "Wikipedia, \"Cape Cod National Seashore\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Cape_Cod_National_Seashore" },
  district: { short: "Wikipedia", full: "Wikipedia, \"Provincetown Historic District\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Provincetown_Historic_District" },
  capemay: { short: "Wikipedia", full: "Wikipedia, \"Cape May Historic District\" and \"Cape May, New Jersey\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Cape_May_Historic_District" },
  lights: { short: "Wikipedia", full: "Wikipedia, \"Race Point Light\" and \"Long Point Light\" (CC BY-SA 4.0), read October 9, 2026", url: "https://en.wikipedia.org/wiki/Race_Point_Light" },
  airbnb: { short: "airbnb.com", full: "Airbnb, search results for Provincetown and the home page, as shown on October 9, 2026", url: "https://www.airbnb.com/s/Provincetown--MA/homes" },
  osm: { short: "OpenStreetMap", full: "Map data © OpenStreetMap contributors, Open Database License, fetched October 9, 2026", url: "https://www.openstreetmap.org/copyright" },
} as const;
export type SourceKey = keyof typeof SOURCES;

/** Sources drawn on by the squares rendered on this page, for the credits. */
export const cited = new Set<SourceKey>();
