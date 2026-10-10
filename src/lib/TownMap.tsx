import { LAND, MAJOR, MINOR, PIERS, ROUTE6, SAND, WATER, WOOD, project, MAP } from "../map";
import { cited } from "../sources";

/**
 * Provincetown, drawn from OpenStreetMap data (`captures/map.py` makes
 * `src/map.ts`). The reference shows a Google map with a price on a white
 * pill for each stay; this is the study's own drawing of the same ground
 * with the same pills. A pill is a button: choosing one marks its stay in
 * the list and moves to it. Labels and pills are HTML over the drawing, so
 * their type keeps its size whatever square the map is given.
 */
export interface Pin { id: string; lat: number; lon: number; label: string; name: string }
const PLACES: { lat: number; lon: number; text: string; kind?: "water" | "town" | "spot" }[] = [
  { lat: 42.0578, lon: -70.1935, text: "Provincetown", kind: "town" },
  { lat: 42.0425, lon: -70.176, text: "Provincetown Harbor", kind: "water" },
  { lat: 42.031, lon: -70.207, text: "Cape Cod Bay", kind: "water" },
  { lat: 42.0685, lon: -70.196, text: "Province Lands" },
  { lat: 42.0338, lon: -70.1672, text: "Long Point Light", kind: "spot" },
  { lat: 42.0524, lon: -70.1886, text: "Pilgrim Monument", kind: "spot" },
  { lat: 42.0492, lon: -70.1822, text: "MacMillan Pier", kind: "spot" },
  { lat: 42.0465, lon: -70.2165, text: "Herring Cove" },
];

export function TownMap({ pins, lit, onPick, center = [42.0502, -70.1762], span = 0.064, label }: {
  pins: Pin[]; lit?: string | null; onPick?: (id: string) => void; center?: [number, number]; span?: number; label: string;
}) {
  cited.add("osm");
  const size = span * MAP.cos * MAP.k;
  const [cx, cy] = project(center[0], center[1]);
  const x0 = cx - size / 2, y0 = cy - size / 2;
  const at = (lat: number, lon: number) => { const [x, y] = project(lat, lon); return { left: `${((x - x0) / size) * 100}%`, top: `${((y - y0) / size) * 100}%` }; };
  const inside = (lat: number, lon: number) => { const [x, y] = project(lat, lon); return x > x0 + size * 0.04 && x < x0 + size * 0.96 && y > y0 + size * 0.04 && y < y0 + size * 0.96; };
  return (
    <div className="map" role="group" aria-label={label}>
      <div className="map__square">
        <svg className="map__svg" viewBox={`${x0.toFixed(1)} ${y0.toFixed(1)} ${size.toFixed(1)} ${size.toFixed(1)}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <rect className="map__sea" x={x0} y={y0} width={size} height={size} />
          <path className="map__land" d={LAND} />
          <path className="map__sand" d={SAND} />
          <path className="map__wood" d={WOOD} />
          <path className="map__sea" d={WATER} />
          <path className="map__pier" d={PIERS} />
          <path className="map__minor" d={MINOR} />
          <path className="map__route" d={ROUTE6} />
          <path className="map__major" d={MAJOR} />
        </svg>
        {PLACES.filter((p) => inside(p.lat, p.lon)).map((p) => <span key={p.text} className={`map__label${p.kind ? ` map__label--${p.kind}` : ""}`} style={at(p.lat, p.lon)} aria-hidden="true">{p.text}</span>)}
        {pins.map((p) => onPick
          ? <button key={p.id} type="button" className={`map__pin${lit === p.id ? " map__pin--lit" : ""}`} style={at(p.lat, p.lon)} onClick={() => onPick(p.id)} aria-label={`${p.name}, ${p.label}: show in the list`}>{p.label}</button>
          : <span key={p.id} className="map__pin map__pin--lit map__pin--here" style={at(p.lat, p.lon)}>{p.label}</span>)}
      </div>
      <a className="map__credit" href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>
    </div>
  );
}
