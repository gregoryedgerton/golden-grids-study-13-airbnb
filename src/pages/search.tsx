import { StrictMode, useCallback, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { FilterBar } from "../lib/modules";
import { FactStrip, FactTile, StayCard, stayName } from "../lib/cards";
import { TownMap } from "../lib/TownMap";
import { useSaved } from "../lib/saved";
import { useViewport } from "../lib/viewport";
import { FACTS, PAGES, REFERENCE, STAYS, usd, type AmenityKey, type Fact, type Stay } from "../content";
import "../styles.css";

/**
 * The list is dealt into bands of four. The reference sets its results in a
 * column of equal cards beside a map that stays in view; here the map is the
 * largest square of the first band and each band after it is its own grid,
 * with one figure about the town among its stays. Filtering changes the
 * count, so every band's grid is chosen from the count it is handed.
 */
const SHAPES: { from: number; variant: number; fact: Fact; strip?: boolean; lead?: boolean }[] = [
  { from: 3, variant: 1, fact: FACTS.homes, strip: true },
  { from: 1, variant: 2, fact: FACTS.monument },
  { from: 4, variant: 0, fact: FACTS.seashore, strip: true, lead: true },
  { from: 2, variant: 5, fact: FACTS.summer },
];
const TITLES = ["More stays in Provincetown", "Near the harbor and the monument", "Toward the dunes and the East End", "Still more in town"];

function App() {
  const q = useMemo(() => new URLSearchParams(location.search), []);
  const guests = Math.max(0, Math.min(8, Number(q.get("guests")) || 0));
  const [on, setOn] = useState<AmenityKey[]>([]);
  const [savedOnly, setSavedOnly] = useState(q.has("saved"));
  const [cancel, setCancel] = useState(false);
  const [lit, setLit] = useState<string | null>(null);
  const saved = useSaved();
  const list = STAYS.filter((s) => on.every((k) => s.has.includes(k)) && (!savedOnly || saved.includes(s.id)) && (!cancel || s.freeCancel) && s.sleeps >= guests);
  const pick = useCallback((id: string) => {
    setLit(id);
    const el = document.getElementById(`stay-${id}`);
    el?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    el?.querySelector<HTMLButtonElement>(".media__open")?.focus({ preventScroll: true });
  }, []);

  const stay = (s: Stay): Cell => (x, key) => <StayCard s={s} x={x} slotKey={key} lit={lit === s.id} onHover={setLit} />;
  const fact = (f: Fact): Cell => (x, key, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} x={x} slotKey={key} />;
  const map: Cell = () => <TownMap label={`Map of Provincetown with ${list.length} stays`} lit={lit} onPick={pick} pins={list.map((s) => ({ id: s.id, lat: s.lat!, lon: s.lon!, label: usd(s.total), name: stayName(s) }))} />;

  // The first band holds the map and up to four stays; the rest are dealt four at a time. On a phone the map
  // would be a third of the width beside its stays, too small to read a price on, so it stands alone as one square.
  const phone = useViewport() === "mobile";
  const first = phone ? [] : list.slice(0, 4);
  const rest: Stay[][] = [];
  for (let i = first.length; i < list.length; i += 4) rest.push(list.slice(i, i + 4));
  const count = `${list.length} ${list.length === 1 ? "stay" : "stays"} in Provincetown`;
  const clear = () => { setOn([]); setSavedOnly(false); setCancel(false); };

  return (
    <Page current={PAGES.search} source={REFERENCE.search}
      bar={<FilterBar on={on} toggle={(k) => setOn((v) => v.includes(k) ? v.filter((i) => i !== k) : [...v, k])} savedOnly={savedOnly} setSavedOnly={setSavedOnly} cancel={cancel} setCancel={setCancel} guests={guests} clear={clear} />}>
      <div className="wrap results">
        <h1 className="results__title" aria-live="polite">{count}</h1>
        <p className="results__sub"><span className="results__tag">Prices are for the whole stay</span>Every stay here is invented for the study; the reference listed over 1,000 homes for the town.</p>
      </div>
      <GridBand id="map" title="The map and the first stays" quiet lead variant={0} cells={[map, ...first.map(stay), ...(!phone && first.length < 2 ? [fact(FACTS.residents)] : [])]}
        after={list.length === 0 ? <p className="results__none">Nothing matches these filters. <button type="button" className="textbtn" onClick={clear}>Clear all</button></p> : undefined} />
      {rest.map((group, i) => {
        const shape = SHAPES[i % SHAPES.length];
        const cells = group.map(stay);
        // A full band of four takes the figure as its strip or its fifth square; a short one takes it as a square.
        if (group.length === 4 && shape.strip) return <GridBand key={i} id={`stays-${i + 2}`} title={TITLES[i % TITLES.length]} quiet cells={cells} strip={fact(shape.fact)} from={shape.from} variant={shape.variant} lead={shape.lead} />;
        const at = Math.min(1, cells.length);
        return <GridBand key={i} id={`stays-${i + 2}`} title={TITLES[i % TITLES.length]} quiet cells={[...cells.slice(0, at), fact(shape.fact), ...cells.slice(at)]} variant={shape.variant} />;
      })}
      <div className="wrap results__end"><p>{count}. The reference shows eighteen to a page across fifteen pages; the study stops at one.</p></div>
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
