import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { GridBand, type Cell } from "../bands/bands";
import { Inspiration, SearchBar } from "../lib/modules";
import { FactStrip, FactTile, PlaceCard, ServiceTile, StayCard } from "../lib/cards";
import { CAPE_MAY, FACTS, PAGES, PLACES, REFERENCE, SERVICES, STAY, type Fact, type Place, type Stay } from "../content";
import "../styles.css";

const place = (p: Place): Cell => (x, key) => <PlaceCard p={p} x={x} slotKey={key} />;
const stay = (s: Stay): Cell => (x, key) => <StayCard s={s} x={x} slotKey={key} />;
const fact = (f: Fact): Cell => (x, key, flat) => flat ? <FactStrip f={f} /> : <FactTile f={f} x={x} slotKey={key} />;

function App() {
  const d = PLACES;
  return (
    <Page current={PAGES.home} source={REFERENCE.home} bar={<SearchBar />}>
      <h1 className="visually-hidden">GIFcommit: homes to stay in</h1>
      <GridBand id="destinations" title="Destinations for you" sub="Nine places, each a short trip from the last"
        cells={[place(d.provincetown), place(d.boston), place(d.capemay), place(d.nyc)]} strip={fact(FACTS.sea)} from={3} variant={0} lead />
      <GridBand id="homes" title="Popular homes in Provincetown" sub="The harbor town at the tip of Cape Cod" aside={{ href: PAGES.search, label: "See all" }}
        cells={[stay(STAY["cottage-patio"]), fact(FACTS.homes), stay(STAY["condo-monument"]), stay(STAY["apt-green"])]} strip={stay(STAY["loft-stove"])} from={2} variant={3} />
      <GridBand id="services" title="Find services near you" sub="Booked with a stay, and brought to the door"
        cells={[fact(FACTS.services), ...SERVICES.slice(0, 3).map((s): Cell => () => <ServiceTile s={s} />)]} strip={() => <ServiceTile s={SERVICES[3]} />} from={3} variant={2} />
      <GridBand id="cape-may" title="Homes in Cape May" sub="Victorian beach town in New Jersey"
        cells={[stay(CAPE_MAY[0]), fact(FACTS.capemay), stay(CAPE_MAY[1]), stay(CAPE_MAY[2]), stay(CAPE_MAY[3])]} variant={1} />
      <GridBand id="farther" title="Farther along the coast, and inland" sub="More of the places the reference offers a traveler on the East Coast"
        cells={[place(d.miami), place(d.washington), place(d.philadelphia), place(d.sanjuan)]} strip={place(d.nashville)} from={4} variant={5} />
      <Inspiration />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
