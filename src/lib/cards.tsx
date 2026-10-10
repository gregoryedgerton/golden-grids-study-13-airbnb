import type { ReactNode } from "react";
import { ExpandedCell, type ExpandGroup } from "./expand";
import { Fact as FactBox } from "./boxes";
import { Fit } from "./fit";
import { Icon, Imprint, Star } from "../icons";
import { photo, seen } from "../photos";
import { SOURCES, cited } from "../sources";
import { AMENITY, usd, type Fact, type Place, type Room, type Stay } from "../content";
import { toggleSaved, useSaved } from "./saved";
import { useBooking, quotes } from "./booking";

/**
 * What goes in a square. The reference's card is a rounded photograph with
 * four lines of 15px text under it, the same at every position in a row.
 * Here the same card takes whatever square the grid gives it, and its type
 * scales with that square (`--u` in styles.css is set from the square's
 * side, 10px + 1.7% of it, held between 12px and 22px): a card in an 850px
 * square reads at 22px, in a 340px square at about 16px, in the smallest at 12px. What a square cannot hold it leaves out whole, in three
 * steps: every line; then name, rating and price; then the photograph alone
 * with its price on a pill. The photograph is the control that opens the
 * square to the rest.
 */

export function Pic({ k, sizes = "(min-width: 1100px) 50vw, 100vw", eager }: { k: string; sizes?: string; eager?: boolean }) {
  const p = photo(k);
  seen.add(k);
  return <img src={p.src} srcSet={p.srcSet} sizes={sizes} alt={p.alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

export function Credit({ k }: { k: string }) {
  const p = photo(k);
  return <figcaption className="credit">Photograph: <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}. It stands in for the place described and does not show it.</figcaption>;
}

export function Heart({ id, name }: { id: string; name: string }) {
  const on = useSaved().includes(id);
  return (
    <button type="button" className={`heart${on ? " heart--on" : ""}`} aria-pressed={on} aria-label={`Save ${name}`} onClick={() => toggleSaved(id)}>
      <Icon name="heart" size={22} />
    </button>
  );
}

export const stayName = (s: Stay) => s.name ?? `${s.kind} in ${s.where}`;
const score = (r: number) => { const t = r.toFixed(2); return t.endsWith("0") ? t.slice(0, -1) : t; };
const ratingText = (s: Stay) => s.rating ? `${score(s.rating)} from ${s.reviews} reviews` : "New";
function Rating({ s }: { s: Stay }) {
  return s.rating
    ? <span className="card__rating"><Star /><span className="visually-hidden">Rated </span>{score(s.rating)}<span className="card__count"> ({s.reviews}<span className="visually-hidden"> reviews</span>)</span></span>
    : <span className="card__rating"><Star />New</span>;
}
function Price({ s }: { s: Stay }) {
  return (
    <p className="card__price">
      {s.was && <><s>{usd(s.was)}</s><span className="visually-hidden"> reduced to </span> </>}
      <strong>{s.from ? `From ${usd(s.total)}` : usd(s.total)}</strong> <span>for {s.nights} nights</span>
    </p>
  );
}

/** A stay: photograph, then what the square has room for. In a wide strip the stylesheet lays it on its side. */
export function StayCard({ s, x, slotKey, lit, onHover }: { s: Stay; x: ExpandGroup; slotKey: string; lit?: boolean; onHover?: (id: string | null) => void }) {
  const name = stayName(s);
  return (
    <>
      <article className={`card card--stay${lit ? " card--lit" : ""}`} id={`stay-${s.id}`} onMouseEnter={onHover ? () => onHover(s.id) : undefined} onMouseLeave={onHover ? () => onHover(null) : undefined}>
        <div className="card__media">
          <Pic k={s.photo} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {name}, {s.line}</span></button>
          {s.badge && <span className="card__badge">{s.badge}</span>}
          <span className="card__pill" aria-hidden="true">{usd(s.total)}</span>
          <Heart id={s.id} name={`${name}, ${s.line}`} />
        </div>
        <div className="card__text">
          <p className="card__head"><span className="card__title">{name}</span><Rating s={s} /></p>
          <p className="card__line">{s.line}</p>
          <p className="card__line card__line--more">{s.rooms}</p>
          <p className="card__line card__line--more">{s.dates}</p>
          <Price s={s} />
          {(s.note || s.freeCancel) && <p className="card__note card__line--more">{s.note ?? "Free cancellation"}</p>}
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={s.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><Credit k={s.photo} /></figure>
            <div className="detail">
              <p className="detail__kicker">{[s.area, ratingText(s), s.badge].filter(Boolean).join(" · ")}</p>
              <p className="detail__lead">{s.line}</p>
              <p>{s.long}</p>
              <p className="detail__rooms">{s.rooms} · sleeps {s.sleeps}</p>
              <ul className="amenities amenities--tight">{s.has.map((a) => <li key={a}><Icon name={AMENITY[a].icon} />{AMENITY[a].label}</li>)}</ul>
              <dl className="sum">
                <div><dt>{s.dates}, {s.nights} nights{s.from ? ", lowest room" : ""}</dt><dd>{s.was && <s>{usd(s.was)} </s>}<strong>{usd(s.total)}</strong></dd></div>
                <div><dt>Per night</dt><dd>{usd(Math.round(s.total / s.nights))}</dd></div>
              </dl>
              <p className="detail__actions">
                {s.href && <a className="btn btn--primary" href={s.href}>See the hotel</a>}
                <SaveButton id={s.id} />
              </p>
              <p className="note">The stay, its price and its rating are invented for this study. Nothing can be booked.</p>
            </div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

export function SaveButton({ id }: { id: string }) {
  const on = useSaved().includes(id);
  return <button type="button" className={`btn btn--quiet${on ? " btn--on" : ""}`} aria-pressed={on} onClick={() => toggleSaved(id)}><Icon name="heart" size={18} />{on ? "Saved" : "Save"}</button>;
}

/** A destination: photograph, name and a line. */
export function PlaceCard({ p, x, slotKey }: { p: Place; x: ExpandGroup; slotKey: string }) {
  return (
    <>
      <article className="card card--place">
        <div className="card__media">
          <Pic k={p.photo} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More: {p.name}</span></button>
          <span className="card__pill" aria-hidden="true">{p.name}</span>
        </div>
        <div className="card__text">
          <p className="card__head"><span className="card__title">{p.name}</span></p>
          <p className="card__line">{p.tag}</p>
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={p.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={p.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><PlaceCredit k={p.photo} /></figure>
            <div className="detail">
              <p className="detail__lead">{p.tag}</p>
              <p>{p.long}</p>
              {p.href
                ? <p className="detail__actions"><a className="btn btn--primary" href={p.href}>See stays in {p.name}</a></p>
                : <p className="note">The study holds stays for Provincetown only.</p>}
            </div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}
function PlaceCredit({ k }: { k: string }) {
  const p = photo(k);
  return <figcaption className="credit">Photograph: <a href={p.page}>{p.credit}</a>, {p.source}, {p.licence}.</figcaption>;
}

/** A room at the hotel. Once dates are checked in the booking card, it carries its price for those dates. */
export function RoomCard({ r, x, slotKey }: { r: Room; x: ExpandGroup; slotKey: string }) {
  const b = useBooking();
  const q = quotes(b)?.find((q) => q.room.id === r.id);
  return (
    <>
      <article className={`card card--room${q && !q.free ? " card--off" : ""}`}>
        <div className="card__media">
          <Pic k={r.photo} />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">More details: {r.name}</span></button>
          <span className="card__pill" aria-hidden="true">{r.name}</span>
        </div>
        <div className="card__text">
          <p className="card__head"><span className="card__title">{r.name}</span></p>
          <p className="card__line">{r.beds} · {r.guests} guests</p>
          <p className="card__price" aria-live="polite">{q ? (q.free ? <><strong>{usd(q.total)}</strong> <span>for these dates</span></> : <span>Not available for these dates</span>) : <span>Add dates for a price</span>}</p>
        </div>
      </article>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={r.name} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo"><Pic k={r.photo} sizes="(min-width: 1100px) 60vw, 100vw" /><Credit k={r.photo} /></figure>
            <div className="detail">
              <p className="detail__kicker">{r.beds} · {r.guests} guests</p>
              <p>{r.long}</p>
              <ul className="amenities amenities--tight">{r.has.map((a) => <li key={a}><Icon name="check" />{a}</li>)}</ul>
              <dl className="sum">
                <div><dt>Per night</dt><dd><strong>{usd(r.rate)}</strong></dd></div>
                {q && <div><dt>For the dates chosen</dt><dd>{q.free ? usd(q.total) : "Not available"}</dd></div>}
              </dl>
              <p className="detail__actions"><a className="btn btn--quiet" href="#book">{q ? "Change the dates" : "Add dates"}</a></p>
              <p className="note">The room and its rate are invented for this study. Nothing can be booked.</p>
            </div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** A photograph on its own (the hotel's gallery). */
export function PhotoCard({ k, title, x, slotKey, children }: { k: string; title: string; x: ExpandGroup; slotKey: string; children?: ReactNode }) {
  return (
    <>
      <figure className="card card--photo">
        <div className="card__media">
          <Pic k={k} eager />
          <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Open the photograph: {title}</span></button>
          {children}
        </div>
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={title} onClose={x.close} closeRef={x.closeRef}>
          <figure className="cell__photo cell__photo--full"><Pic k={k} sizes="100vw" /><Credit k={k} /></figure>
        </ExpandedCell>
      )}
    </>
  );
}

/** A figure as large type on a rounded tile, with its source in the foot. */
export function FactTile({ f, x, slotKey }: { f: Fact; x: ExpandGroup; slotKey: string }) {
  const src = f.source ? SOURCES[f.source] : undefined;
  if (f.source) cited.add(f.source);
  const title = f.label ? `${f.line}: ${f.label}` : f.line;
  return (
    <FactBox
      imprint={f.icon ? <Imprint name={f.icon} /> : undefined}
      label={f.label}
      fitClass="fit--display fit--num"
      max={150}
      tone={`${f.tone ?? "tile"}${(f.body?.length ?? 0) > 110 ? " box--wordy" : ""}`}
      spoken={f.spoken}
      source={src?.short}
      body={f.body ? <p>{f.body}</p> : undefined}
      link={f.href ? { href: f.href, label: f.cta ?? "See more", aria: `${f.cta ?? "See more"}: ${title}` } : undefined}
      expand={f.long ? { group: x, slotKey, title, full: <div className="cell__prose"><p>{f.body}</p><p>{f.long}</p></div>, related: src && !("ref" in src) ? [{ href: src.url, label: `Source: ${src.full}` }] : [] } : undefined}
    >
      {f.line}
    </FactBox>
  );
}

/** The collapsed strip of a skipped range: a figure and its label on one short line. */
export function FactStrip({ f }: { f: Fact }) {
  if (f.source) cited.add(f.source);
  const body = (
    <>
      {f.label && <p className="box__label">{f.short ?? f.label}</p>}
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={150}>{f.line}</Fit></div>
      {f.source && <span className="box__source">{SOURCES[f.source].short}</span>}
    </>
  );
  const cls = `box box--strip box--${f.tone ?? "tile"}`;
  return f.href ? <a className={cls} href={f.href} aria-label={`${f.line}: ${f.label}. ${f.cta ?? ""}`}>{body}</a> : <div className={cls} role="group" aria-label={`${f.spoken ?? f.line}: ${f.label}`}>{body}</div>;
}

/** A service: its name fitted to the tile, a line about it, its drawing behind. */
export function ServiceTile({ s }: { s: { name: string; icon: Parameters<typeof Imprint>[0]["name"]; body: string } }) {
  return (
    <FactBox imprint={<Imprint name={s.icon} />} fitClass="fit--title" max={96} tone="tile" body={<p>{s.body}</p>}>
      {s.name}
    </FactBox>
  );
}
