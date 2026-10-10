import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { About, BookingCard, Explore, Know, Reviews, Subnav, TitleBar } from "../lib/modules";
import { FactStrip, FactTile, PhotoCard, RoomCard } from "../lib/cards";
import { TownMap } from "../lib/TownMap";
import { Fit } from "../lib/fit";
import { useViewport } from "../lib/viewport";
import { FACTS, HOTEL, PAGES, REFERENCE, ROOMS, type Fact, type Room } from "../content";
import "../styles.css";

const fact = (f: Fact): Cell => (x, key, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} x={x} slotKey={key} />;
const room = (r: Room): Cell => (x, key) => <RoomCard r={r} x={x} slotKey={key} />;
const R = Object.fromEntries(ROOMS.map((r) => [r.id, r]));
const ALT = ["The sitting room", "A bedroom", "The roof deck", "The house from the street", "The lane beside the house"];

function App() {
  const v = useViewport();
  const gallery: Cell[] = HOTEL.gallery.map((k, i): Cell => (x, key) => <PhotoCard k={k} title={ALT[i]} x={x} slotKey={key} />);
  const intro: Cell = () => (
    <div className="box box--tile box--intro">
      <p className="box__label">{HOTEL.kind}</p>
      <div className="box__fit"><Fit as="p" className="fit--title" min={14} max={84}>{HOTEL.lead}</Fit></div>
      <div className="box__body"><Fit as="div" className="fit--body" min={13} max={32}><p>{HOTEL.intro}</p><p>{HOTEL.intro2}</p></Fit></div>
    </div>
  );
  const map: Cell = () => <TownMap label="Map of Provincetown showing where The Tideline is" center={[HOTEL.lat + 0.0035, HOTEL.lon + 0.004]} span={0.044} pins={[{ id: "tideline", lat: HOTEL.lat, lon: HOTEL.lon, label: HOTEL.name, name: HOTEL.name }]} />;
  const near: Cell = () => (
    <div className="box box--tile box--list">
      <p className="box__label">{HOTEL.address}</p>
      <div className="box__body"><Fit as="dl" className="fit--body near" min={12} max={22}>{HOTEL.near.map(([place, time]) => <div key={place}><dt>{place}</dt><dd>{time}</dd></div>)}</Fit></div>
    </div>
  );
  return (
    <Page current={PAGES.stay} source={REFERENCE.stay}>
      <TitleBar />
      <GridBand id="photos" title="Photos" quiet cells={gallery} variant={0} lead />
      <Subnav />
      <BookingCard />
      <GridBand id="overview" title={HOTEL.kind} quiet before={v === "mobile" ? <p className="intro-flat">{HOTEL.intro} {HOTEL.intro2}</p> : undefined} cells={[intro, fact(FACTS.monument), fact(FACTS.rooms), fact(HOTEL.highlights[0]), fact(HOTEL.highlights[1])]} variant={2} />
      <GridBand id="rooms" title="Choose your room" sub="Seven rooms on three floors. Choose dates above and each one shows its price."
        cells={[room(R.premium), room(R.deluxe), room(R.king)]} strip={room(R.garden)} from={3} variant={1} lead />
      <GridBand id="more-rooms" title="The other rooms" quiet cells={[room(R.queen), fact(FACTS.district), room(R.twin), room(R.shared)]} variant={3} />
      <About />
      <GridBand id="location" title="Where you'll be" sub={HOTEL.address} cells={[map, near, fact(FACTS.parkland), fact(FACTS.sea)]} variant={4} lead />
      <Reviews />
      <Know />
      <Explore />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
