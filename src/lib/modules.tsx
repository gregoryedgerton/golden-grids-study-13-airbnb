import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import { seen, photo } from "../photos";
import { SOURCES, cited, type SourceKey } from "../sources";
import { AMENITY, HOTEL, INSPIRATION, PAGES, PLACES, SUBNAV, usd, type AmenityKey } from "../content";
import { nights, problem, quotes, setBooking, today, plusDays, useBooking } from "./booking";
import { toggleSaved, useSaved } from "./saved";

/** Flat modules: bars, lists and forms. They are not grids because their content has no hierarchy to descend. */

/** A bar that sticks under the notice tells the page its height, so an opened square's head and in-page links clear it. */
function useBarHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--bar-h", `${Math.round(el.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => { ro.disconnect(); document.documentElement.style.removeProperty("--bar-h"); };
  }, []);
  return ref;
}

/** The home page's search: where, when, who. It leads to the one town the study holds, and sends nothing. */
export function SearchBar() {
  const [where, setWhere] = useState("provincetown");
  const [guests, setGuests] = useState(0);
  const ok = where === "provincetown";
  const href = `${PAGES.search}${guests ? `?guests=${guests}` : ""}`;
  return (
    <div className="wrap">
      <form className="searchbar" role="search" aria-label="Find a stay" onSubmit={(e) => { e.preventDefault(); if (ok) location.href = href; }}>
        <label className="searchbar__seg"><span>Where</span>
          <select value={where} onChange={(e) => setWhere(e.target.value)}>{Object.values(PLACES).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        </label>
        <div className="searchbar__seg"><span>When</span><strong>Any week</strong></div>
        <div className="searchbar__seg searchbar__seg--who"><span id="who">Who</span>
          <div className="stepper" role="group" aria-labelledby="who">
            <button type="button" onClick={() => setGuests(Math.max(0, guests - 1))} disabled={guests === 0} aria-label="Fewer guests">−</button>
            <output aria-live="polite">{guests ? `${guests} guest${guests > 1 ? "s" : ""}` : "Add guests"}</output>
            <button type="button" onClick={() => setGuests(Math.min(8, guests + 1))} disabled={guests === 8} aria-label="More guests">+</button>
          </div>
        </div>
        <button className="searchbar__go" type="submit" disabled={!ok} aria-label="Search"><Icon name="search" size={18} /><span>Search</span></button>
      </form>
      <p className="searchbar__note" role="status">{ok ? "The search opens the study's own list for Provincetown. Nothing is sent." : `The study holds stays for Provincetown only, so there is nothing to show for ${PLACES[where].name}.`}</p>
    </div>
  );
}

/** The results page's bar: what was searched, and the reference's filter chips, which work on the study's eighteen stays. */
export const CHIPS: AmenityKey[] = ["pets", "parking", "kitchen", "wifi", "washer", "ac", "heating"];
export function FilterBar({ on, toggle, savedOnly, setSavedOnly, cancel, setCancel, guests, clear }: {
  on: AmenityKey[]; toggle: (k: AmenityKey) => void; savedOnly: boolean; setSavedOnly: (b: boolean) => void; cancel: boolean; setCancel: (b: boolean) => void; guests: number; clear: () => void;
}) {
  const saved = useSaved();
  const any = on.length > 0 || savedOnly || cancel;
  const ref = useBarHeight<HTMLDivElement>();
  return (
    <div className="filterbar" ref={ref} role="search" aria-label="Search and filters">
      <div className="wrap filterbar__row">
        <a className="summary" href={PAGES.home}><Icon name="home" size={18} /><strong>Homes in Provincetown</strong><span>Any week</span><span>{guests ? `${guests} guest${guests > 1 ? "s" : ""}` : "Any guests"}</span></a>
        <div className="chips" role="group" aria-label="Filters" tabIndex={-1}>
          {CHIPS.map((k) => <button key={k} type="button" className="chip" aria-pressed={on.includes(k)} onClick={() => toggle(k)}>{AMENITY[k].chip}</button>)}
          <button type="button" className="chip" aria-pressed={cancel} onClick={() => setCancel(!cancel)}>Free cancellation</button>
          <button type="button" className="chip" aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}><Icon name="heart" size={14} />Saved{saved.length ? ` (${saved.length})` : ""}</button>
        </div>
        {any && <button type="button" className="textbtn" onClick={clear}>Clear all</button>}
      </div>
    </div>
  );
}

/** The reference's link lists under tabs, at the foot of its home page. */
export function Inspiration() {
  const tabs = Object.keys(INSPIRATION);
  const [tab, setTab] = useState(tabs[0]);
  const id = useId();
  return (
    <section className="flat" id="inspiration" aria-labelledby="inspiration-title">
      <div className="wrap">
        <h2 id="inspiration-title" className="band__title">Inspiration for future getaways</h2>
        <div className="tabs" role="tablist" aria-label="Kinds of getaway">
          {tabs.map((t) => <button key={t} role="tab" type="button" id={`${id}-${t}`} aria-selected={t === tab} aria-controls={`${id}-panel`} tabIndex={t === tab ? 0 : -1} onClick={() => setTab(t)}
            onKeyDown={(e) => { const i = tabs.indexOf(tab); const n = e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length] : e.key === "ArrowLeft" ? tabs[(i + tabs.length - 1) % tabs.length] : null; if (n) { setTab(n); document.getElementById(`${id}-${n}`)?.focus(); } }}>{t}</button>)}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tab}`}>
          <ul className="linklist">
            {INSPIRATION[tab].map(([place, kind]) => <li key={place}>{place === "Provincetown" ? <a href={PAGES.search}><strong>{place}</strong><span>{kind}</span></a> : <span><strong>{place}</strong><span>{kind}</span></span>}</li>)}
          </ul>
        </div>
        <p className="note">Only Provincetown leads anywhere: it is the one town the study holds.</p>
      </div>
    </section>
  );
}

/** The listing's title row: the name, and the two controls the reference puts beside it. */
export function TitleBar() {
  const on = useSaved().includes("tideline");
  const [copied, setCopied] = useState(false);
  useEffect(() => { if (!copied) return; const t = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(t); }, [copied]);
  return (
    <div className="wrap titlebar">
      <h1 className="title">{HOTEL.name}</h1>
      <div className="titlebar__actions">
        <button type="button" className="textbtn" onClick={() => { navigator.clipboard?.writeText(location.href).then(() => setCopied(true), () => setCopied(false)); }}><Icon name="share" size={16} /><span aria-live="polite">{copied ? "Link copied" : "Share"}</span></button>
        <button type="button" className={`textbtn${on ? " textbtn--on" : ""}`} aria-pressed={on} onClick={() => toggleSaved("tideline")}><Icon name="heart" size={16} />{on ? "Saved" : "Save"}</button>
      </div>
    </div>
  );
}

export function Subnav() {
  const ref = useBarHeight<HTMLElement>();
  return (
    <nav className="subnav" aria-label="On this page" ref={ref}>
      <div className="wrap"><ul>{SUBNAV.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ul></div>
    </nav>
  );
}

/** The booking bar. The reference keeps a card beside the page; here it is a bar under the photographs. Dates and guests in, a price for each room out; the study's own sums, and nothing sent. */
export function BookingCard() {
  const b = useBooking();
  const [err, setErr] = useState<string | null>(null);
  const q = quotes(b);
  const free = q?.filter((x) => x.free) ?? [];
  const n = nights(b);
  const check = () => { const p = problem(b); setErr(p); setBooking({ checked: !p }); };
  return (
    <section className="wrap bookwrap" aria-labelledby="book-title">
      <form className="book" id="book" onSubmit={(e) => { e.preventDefault(); check(); }}>
        <h2 id="book-title" className="book__title">{q ? (free.length ? `From ${usd(Math.min(...free.map((x) => x.total)))} for ${n} night${n > 1 ? "s" : ""}` : "No rooms for these dates") : "Add dates for prices"}</h2>
        <div className="book__fields">
          <label className="book__field"><span>Check-in</span><input type="date" value={b.checkIn} min={today()} onChange={(e) => { const v = e.target.value; setErr(null); setBooking({ checkIn: v, checked: false, ...(v && (!b.checkOut || b.checkOut <= v) ? { checkOut: plusDays(v, 5) } : {}) }); }} /></label>
          <label className="book__field"><span>Checkout</span><input type="date" value={b.checkOut} min={b.checkIn ? plusDays(b.checkIn, 1) : today()} onChange={(e) => { setErr(null); setBooking({ checkOut: e.target.value, checked: false }); }} /></label>
          <label className="book__field book__field--wide"><span>Guests</span><select value={b.guests} onChange={(e) => setBooking({ guests: Number(e.target.value), checked: false })}><option value={1}>1 guest</option><option value={2}>2 guests</option></select></label>
        </div>
        <button className="btn btn--primary book__go" type="submit">Check availability</button>
        <div className="book__result" role="status">
          {err && <p className="book__err">{err}</p>}
          {q && <p className="book__count">{free.length} of {q.length} rooms are free for {n} night{n > 1 ? "s" : ""}. Each room below now shows its price, or that it is taken.</p>}
          {!q && !err && <p className="book__hint">Each room below is priced once the dates are in.</p>}
        </div>
        <p className="note">The study's own sums. Nothing is sent and nothing can be booked.</p>
      </form>
    </section>
  );
}

export function About() {
  return (
    <section className="flat flat--cols" aria-labelledby="about-title">
      <div className="wrap flat__cols">
        <div className="prose">
          <h2 id="about-title" className="band__title">About {HOTEL.name}</h2>
          {HOTEL.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div id="amenities" className="prose">
          <h2 className="band__title">What this hotel offers</h2>
          <ul className="amenities">{HOTEL.amenities.map(([icon, label]) => <li key={label}><Icon name={icon} />{label}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="flat" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <h2 id="reviews-title" className="band__title">No reviews (yet)</h2>
        <p className="flat__lead">The hotel is new to the list and nobody has stayed. The study has not written reviews for it.</p>
      </div>
    </section>
  );
}

export function Know() {
  return (
    <section className="flat" id="know" aria-labelledby="know-title">
      <div className="wrap">
        <h2 id="know-title" className="band__title">Things to know</h2>
        <div className="know">
          {HOTEL.know.map((k) => (
            <div key={k.title}>
              <Icon name={k.icon} size={28} />
              <h3>{k.title}</h3>
              <ul>{k.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Explore() {
  return (
    <section className="flat" aria-labelledby="explore-title">
      <div className="wrap">
        <h2 id="explore-title" className="band__title">Explore other options in and around Provincetown</h2>
        <ul className="linklist">
          <li><a href={PAGES.search}><strong>Provincetown</strong><span>18 stays in this study</span></a></li>
          {Object.values(PLACES).filter((p) => p.id !== "provincetown").map((p) => <li key={p.id}><a href={`${PAGES.home}#destinations`}><strong>{p.name}</strong><span>{p.tag}</span></a></li>)}
        </ul>
      </div>
    </section>
  );
}

/** Every photograph and every source on the page, for the disclosure. Rendered after the page has drawn. */
export function Credits() {
  const [keys, setKeys] = useState<string[]>([]);
  const [src, setSrc] = useState<SourceKey[]>([]);
  useEffect(() => {
    const read = () => {
      const k = [...seen], s = [...cited];
      setKeys((old) => (old.join() === k.join() ? old : k));
      setSrc((old) => (old.join() === s.join() ? old : s));
    };
    read();
    const t = setInterval(read, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {keys.length > 0 && (
        <details>
          <summary>Photographs on this page ({keys.length})</summary>
          <ul>{keys.map((k) => { const p = photo(k); return <li key={k}>{p.alt}. <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.</li>; })}</ul>
        </details>
      )}
      {src.length > 0 && (
        <details>
          <summary>Sources for the figures and the map ({src.length})</summary>
          <ul>{src.map((k) => <li key={k}><a href={SOURCES[k].url}>{SOURCES[k].full}</a></li>)}</ul>
        </details>
      )}
    </>
  );
}
