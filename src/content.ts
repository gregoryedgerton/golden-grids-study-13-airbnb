import type { SourceKey } from "./sources";
import type { IconName } from "./icons";

/**
 * Every word and number on the three pages.
 *
 * What is real: the places, and the figures that carry a `source`.
 * What is invented: every stay, its price, rating, review count, dates and
 * amenities, the hotel and its rooms, and the services. They follow the
 * shape of what the reference showed on October 9, 2026 (the kinds of home,
 * the fields on a card, the length of a stay) and none of its wording.
 */

export const PAGES = { home: "index.html", search: "search.html", stay: "stay.html" } as const;

export const REFERENCE = {
  home: { label: "airbnb.com", url: "https://www.airbnb.com/" },
  search: { label: "airbnb.com/s/Provincetown--MA/homes", url: "https://www.airbnb.com/s/Provincetown--MA/homes" },
  stay: { label: "airbnb.com/rooms/1758691142566618626", url: "https://www.airbnb.com/rooms/1758691142566618626" },
} as const;

export const NAV: { label: string; href: string; icon: IconName }[] = [
  { label: "Homes", href: PAGES.home, icon: "home" },
  { label: "Provincetown", href: PAGES.search, icon: "pin" },
  { label: "The Tideline", href: PAGES.stay, icon: "bell" },
];

/* ---------- Facts: a number as large type, with its source ---------- */

export interface Fact {
  line: string; label?: string; short?: string; body?: string; long?: string; source?: SourceKey;
  tone?: "tile" | "rausch" | "ink" | "sand"; icon?: IconName; href?: string; cta?: string; spoken?: string;
}

export const FACTS = {
  homes: { line: "1,000+", label: "Homes in Provincetown", short: "Homes in town", body: "The reference's own count for the town on the day it was read. This study shows eighteen of that kind.", source: "airbnb", tone: "rausch", href: PAGES.search, cta: "See the eighteen" },
  sea: { line: "45 mi", label: "Boston to Provincetown", short: "From Boston", body: "By air or by sea across Cape Cod Bay. By road, round the whole arm of the Cape, it is 115 miles.", source: "ptown", tone: "tile", icon: "ferry" },
  monument: { line: "252 ft", label: "Pilgrim Monument", body: "Built between 1907 and 1910 for the Mayflower's first landfall in 1620. At 252 feet 7½ inches it is the tallest all-granite structure in the United States.", source: "monument", tone: "tile", icon: "tower", spoken: "252 feet" },
  residents: { line: "3,664", label: "Year-round residents", body: "The 2020 census count. In summer the town holds as many as 60,000 people.", source: "ptown", tone: "tile", icon: "guests" },
  summer: { line: "60,000", label: "People in summer", body: "The town's summer population at its height, against 3,664 residents counted in the 2020 census.", source: "ptown", tone: "ink", icon: "sun" },
  seashore: { line: "43,607", label: "Acres of National Seashore", short: "Acres of seashore", body: "Cape Cod National Seashore, created on August 7, 1961. About 4,500 of those acres, some 73% of Provincetown's land, lie inside the town.", source: "seashore", tone: "sand", icon: "dune" },
  parkland: { line: "73%", label: "Of the town is parkland", body: "About 4,500 acres of Provincetown's land belong to the National Park Service as part of Cape Cod National Seashore.", source: "ptown", tone: "sand", icon: "dune" },
  district: { line: "1,000+", label: "Buildings in the historic district", body: "The Provincetown Historic District covers about 300 acres along the harbor and spans more than 200 years of building.", source: "district", tone: "tile", icon: "home" },
  racepoint: { line: "1816", label: "Race Point Light first lit", body: "The third light on Cape Cod. The present 45-foot iron-plated tower replaced the first in 1876.", source: "lights", tone: "tile", icon: "lighthouse" },
  capemay: { line: "600+", label: "Buildings in Cape May's historic district", body: "The district covers 380 acres and is a National Historic Landmark for its concentration of late Victorian building: Stick, Shingle and Eclectic styles, many with gingerbread trim.", source: "capemay", tone: "tile", icon: "home" },
  services: { line: "10", label: "Kinds of service", body: "The reference's home page listed ten on the day it was read: car rentals, photography, chefs, massage, prepared meals, training, makeup, hair, spa treatments and catering.", source: "airbnb", tone: "rausch" },
  rooms: { line: "7", label: "Rooms at The Tideline", body: "Three suites with a king bed, three queen rooms, one of them with a shared bath, and a twin room under the eaves.", tone: "rausch", icon: "bed" },
} satisfies Record<string, Fact>;

/* ---------- Destinations ---------- */

export interface Place { id: string; name: string; tag: string; photo: string; long: string; href?: string }

export const PLACES: Record<string, Place> = {
  provincetown: { id: "provincetown", name: "Provincetown", tag: "At the tip of Cape Cod", photo: "d-provincetown", href: PAGES.search, long: "A harbor town at the very end of Cape Cod, with 3,664 year-round residents and as many as 60,000 people in summer. The Pilgrim Monument stands over a waterfront of shingled houses, wharves and galleries along Commercial Street." },
  boston: { id: "boston", name: "Boston", tag: "Harbor city, 45 miles by sea", photo: "d-boston", long: "The city across Cape Cod Bay from Provincetown: 45 miles by air or sea, 115 by road. The picture looks at the downtown towers from the South Boston waterfront." },
  capemay: { id: "capemay", name: "Cape May", tag: "Victorian beach town", photo: "d-capemay", long: "A resort at the southern point of New Jersey, where the Atlantic meets Delaware Bay. The whole city is a National Historic Landmark district of more than 600 buildings, and its lighthouse stands above the dunes at Cape May Point." },
  nyc: { id: "nyc", name: "New York City", tag: "The skyline from Brooklyn", photo: "d-nyc", long: "Lower Manhattan, seen across the East River from the old pier pilings at Brooklyn Bridge Park." },
  philadelphia: { id: "philadelphia", name: "Philadelphia", tag: "On the Schuylkill", photo: "d-philadelphia", long: "The Center City skyline along the Schuylkill River, seen from the South Street Bridge." },
  washington: { id: "washington", name: "Washington, D.C.", tag: "The Capitol and the Mall", photo: "d-washington", long: "The west front of the United States Capitol, at the head of the National Mall." },
  sanjuan: { id: "sanjuan", name: "San Juan", tag: "A walled old city", photo: "d-sanjuan", long: "The lighthouse on the walls of Castillo San Felipe del Morro, the fort at the mouth of San Juan Bay." },
  miami: { id: "miami", name: "Miami Beach", tag: "Lifeguard towers on the sand", photo: "d-miami", long: "One of the painted lifeguard stands on the beach at Miami Beach." },
  nashville: { id: "nashville", name: "Nashville", tag: "Above the trees from Fort Negley", photo: "d-nashville", long: "The downtown skyline seen from Fort Negley, south of the center." },
};

/* ---------- Stays ---------- */

export type AmenityKey = "pets" | "parking" | "kitchen" | "wifi" | "washer" | "ac" | "heating";
export const AMENITY: Record<AmenityKey, { label: string; chip: string; icon: IconName }> = {
  pets: { label: "Pets allowed", chip: "Allows pets", icon: "paw" },
  parking: { label: "Free parking on the premises", chip: "Free parking", icon: "car" },
  kitchen: { label: "Kitchen", chip: "Kitchen", icon: "pot" },
  wifi: { label: "Wifi", chip: "Wifi", icon: "wifi" },
  washer: { label: "Washer", chip: "Washer", icon: "washer" },
  ac: { label: "Air conditioning", chip: "Air conditioning", icon: "snow" },
  heating: { label: "Heating", chip: "Heating", icon: "flame" },
};

export interface Stay {
  id: string; kind: string; where: string; name?: string; line: string; long: string; photo: string;
  rating?: number; reviews?: number; badge?: "Guest favorite" | "Top guest favorite" | "Featured hotel" | "Superhost"; isNew?: boolean;
  rooms: string; sleeps: number; dates: string; nights: number; total: number; was?: number; note?: string;
  has: AmenityKey[]; freeCancel?: boolean; area?: string; lat?: number; lon?: number; href?: string; from?: boolean;
}

const P = "Provincetown";
export const STAYS: Stay[] = [
  { id: "tideline", kind: "Hotel", where: P, name: "The Tideline", line: "Seven rooms in the West End", long: "A seven-room guesthouse on a side street in the West End, a short walk from Commercial Street and about ten minutes on foot from the Pilgrim Monument. Rooms are priced once dates are chosen.", photo: "l-hotel", badge: "Featured hotel", isNew: true, rooms: "7 rooms · 1 or 2 beds each", sleeps: 2, dates: "Oct 11 – 16", nights: 5, total: 645, from: true, has: ["wifi", "ac", "heating", "parking"], area: "West End", lat: 42.0478, lon: -70.1912, href: PAGES.stay },
  { id: "apt-renovated", kind: "Apartment", where: P, line: "Renovated, two blocks from the harbor beach", long: "A second-floor apartment redone in white, with a corner bedroom that gets the morning sun and a second room with two single beds.", photo: "l-white-bedroom", rating: 4.93, reviews: 76, badge: "Guest favorite", rooms: "2 bedrooms · 3 beds · 1 bath", sleeps: 4, dates: "Oct 11 – 16", nights: 5, total: 1705, was: 1940, has: ["kitchen", "wifi", "washer", "ac", "heating"], area: "Town center", lat: 42.0527, lon: -70.1869 },
  { id: "condo-monument", kind: "Condo", where: P, line: "Top floor with harbor and monument views", long: "The top floor of a waterfront building. The living room opens to a balcony over the harbor; the monument is in the window on the town side.", photo: "l-monument-view", rating: 4.95, reviews: 388, badge: "Top guest favorite", rooms: "2 bedrooms · 2 beds · 1 bath", sleeps: 4, dates: "Nov 16 – 21", nights: 5, total: 830, was: 915, has: ["kitchen", "wifi", "ac", "heating", "parking"], area: "Town center", lat: 42.0512, lon: -70.1851 },
  { id: "apt-bay", kind: "Apartment", where: P, line: "Waterfront, bay views from the sofa", long: "One bedroom directly on the bay in the East End. Three windows run the length of the living room and take in nothing but water.", photo: "l-bay-window", rating: 5.0, reviews: 17, badge: "Top guest favorite", rooms: "1 bedroom · 2 beds · 1 bath", sleeps: 3, dates: "Nov 1 – 6", nights: 5, total: 1450, was: 1690, has: ["kitchen", "wifi", "ac", "heating"], area: "East End", lat: 42.0589, lon: -70.1722 },
  { id: "condo-water", kind: "Condo", where: P, line: "Water on three sides, from every room", long: "A glass-walled corner unit above the beach, with a round table for six in the window and three bedrooms behind it.", photo: "l-dining-sea", rating: 4.98, reviews: 169, badge: "Top guest favorite", rooms: "3 bedrooms · 4 beds · 2 baths", sleeps: 6, dates: "Nov 2 – 7", nights: 5, total: 3040, has: ["kitchen", "wifi", "washer", "ac", "heating", "parking"], area: "East End", lat: 42.0606, lon: -70.1668 },
  { id: "condo-commercial", kind: "Condo", where: P, line: "On Commercial Street, over the wharf", long: "Newly listed. Three bedrooms above a wharf in the middle of town, each with its own bath, with the harbor on one side and the street on the other.", photo: "l-wharf", isNew: true, rooms: "3 bedrooms · 3 beds · 3 baths", sleeps: 6, dates: "Oct 18 – 23", nights: 5, total: 4290, freeCancel: true, has: ["kitchen", "wifi", "washer", "ac", "heating"], area: "Town center", lat: 42.0498, lon: -70.1868 },
  { id: "condo-beachfront", kind: "Condo", where: P, line: "Beachfront, wide harbor views", long: "One bedroom at the level of the sand. At low tide the flats run out a long way and the boats sit on the bottom.", photo: "l-beachfront", rating: 4.99, reviews: 112, badge: "Top guest favorite", rooms: "1 bedroom · 1 queen bed · 1 bath", sleeps: 2, dates: "Oct 16 – 21", nights: 5, total: 2520, has: ["kitchen", "wifi", "heating", "pets"], area: "West End", lat: 42.0432, lon: -70.1921 },
  { id: "apt-green", kind: "Apartment", where: P, line: "Deep green rooms and a cook's kitchen", long: "Dark green cabinets, a butcher-block counter and a range with six burners. The bedroom is at the back, away from the street.", photo: "l-green-kitchen", rating: 5.0, reviews: 31, badge: "Top guest favorite", rooms: "1 bedroom · 1 king bed · 1 bath", sleeps: 2, dates: "Nov 4 – 9", nights: 5, total: 1580, has: ["kitchen", "wifi", "washer", "ac", "heating"], area: "West End", lat: 42.0463, lon: -70.1925 },
  { id: "apt-new", kind: "Apartment", where: P, line: "Newly built, a short walk to the beach", long: "A ground-floor apartment finished this year: a white kitchen that opens to the dining room, one bedroom and a parking space.", photo: "l-white-kitchen", rating: 4.77, reviews: 94, rooms: "1 bedroom · 1 queen bed · 1 bath", sleeps: 2, dates: "Oct 19 – 24", nights: 5, total: 1180, freeCancel: true, has: ["kitchen", "wifi", "ac", "heating", "parking"], area: "East End", lat: 42.0571, lon: -70.1793 },
  { id: "cottage-patio", kind: "Cottage", where: P, line: "Sunny cottage with a fenced garden", long: "A shingled cottage of one and a half storeys behind a white picket fence. The garden gets the sun from breakfast until late afternoon.", photo: "l-cottage", rating: 4.94, reviews: 151, badge: "Guest favorite", rooms: "1 bedroom · 2 beds · 1.5 baths", sleeps: 3, dates: "Nov 3 – 8", nights: 5, total: 805, has: ["kitchen", "wifi", "heating", "pets", "parking"], area: "East End", lat: 42.0556, lon: -70.1818 },
  { id: "condo-access", kind: "Condo", where: P, line: "Bay views and steps down to the beach", long: "A second-floor condo on the bay side with two bedrooms. A flight of wooden steps at the end of the walk goes down to the sand.", photo: "l-sea-window", rating: 4.91, reviews: 103, badge: "Guest favorite", rooms: "2 bedrooms · 4 beds · 1 bath", sleeps: 6, dates: "Oct 19 – 24", nights: 5, total: 2390, has: ["kitchen", "wifi", "ac", "heating"], area: "East End", lat: 42.0619, lon: -70.1601 },
  { id: "home-deck", kind: "Home", where: P, line: "Private deck, one block from the harbor", long: "A whole house with three bedrooms, each with its own bath, and an upper deck that looks over the roofs to the water.", photo: "l-deck-house", rating: 4.96, reviews: 22, badge: "Guest favorite", rooms: "3 bedrooms · 3 beds · 3 baths", sleeps: 6, dates: "Nov 1 – 6", nights: 5, total: 1890, was: 2120, note: "Extended stay discount", has: ["kitchen", "wifi", "washer", "ac", "heating", "parking", "pets"], area: "West End", lat: 42.0412, lon: -70.1948 },
  { id: "condo-1850s", kind: "Condo", where: P, line: "In an 1850s house near the harbor", long: "Half of the first floor of a Greek Revival house, with the original wide floorboards and two bedrooms with queen beds.", photo: "l-1850s", rating: 4.96, reviews: 229, badge: "Top guest favorite", rooms: "2 bedrooms · 2 queen beds · 1 bath", sleeps: 4, dates: "Oct 19 – 24", nights: 5, total: 1410, has: ["kitchen", "wifi", "ac", "heating"], area: "Town center", lat: 42.0538, lon: -70.1838 },
  { id: "loft-stove", kind: "Loft", where: P, line: "Wood stove and a deck, in the center", long: "One large white-boarded room with a wood stove, a sleeping corner and a small deck at the back, a few doors from Commercial Street.", photo: "l-loft", rating: 4.88, reviews: 36, badge: "Guest favorite", rooms: "Studio · 1 queen bed · 1 bath", sleeps: 2, dates: "Nov 8 – 13", nights: 5, total: 815, has: ["kitchen", "wifi", "heating"], area: "Town center", lat: 42.0546, lon: -70.1852 },
  { id: "home-fireplace", kind: "Home", where: P, line: "Quiet house with two fireplaces, near the ferry", long: "A beamed house set back from the street, with a working fireplace in the living room and another in the main bedroom. The ferry pier is five minutes on foot.", photo: "l-fireplace", rating: 4.96, reviews: 23, badge: "Top guest favorite", rooms: "3 bedrooms · 3 beds · 3 baths", sleeps: 6, dates: "Nov 1 – 6", nights: 5, total: 3480, has: ["kitchen", "wifi", "washer", "ac", "heating", "parking"], area: "Town center", lat: 42.0531, lon: -70.1822 },
  { id: "guesthouse", kind: "Guesthouse", where: P, line: "Carriage house behind a hedge", long: "A converted carriage house at the back of a garden in the East End, with two bedrooms under the roof and a parking space by the gate.", photo: "l-guesthouse", rating: 5.0, reviews: 10, badge: "Top guest favorite", rooms: "2 bedrooms · 2 beds · 1 bath", sleeps: 4, dates: "Oct 11 – 16", nights: 5, total: 1710, has: ["kitchen", "wifi", "heating", "parking"], area: "East End", lat: 42.0601, lon: -70.1741 },
  { id: "tiny-dunes", kind: "Tiny home", where: P, line: "Small bayside cottage by the dunes", long: "One of a row of small cottages at the water's edge at the far east end of the bay shore, with a bedroom, a sleeping porch and the beach at the door.", photo: "l-dune", rating: 4.87, reviews: 8, badge: "Superhost", rooms: "1 bedroom · 2 beds · 1 bath", sleeps: 3, dates: "Oct 17 – 22", nights: 5, total: 1385, was: 1680, freeCancel: true, has: ["kitchen", "wifi", "heating", "pets", "parking"], area: "East End", lat: 42.0641, lon: -70.1532 },
  { id: "home-hydrangea", kind: "Home", where: P, line: "Shingled house with a porch and a garden", long: "A grey shingled house under a big tree, with a covered porch, hydrangeas along the front and three bedrooms upstairs.", photo: "l-hydrangea", rating: 4.92, reviews: 64, badge: "Guest favorite", rooms: "3 bedrooms · 4 beds · 2 baths", sleeps: 7, dates: "Nov 9 – 14", nights: 5, total: 2260, has: ["kitchen", "wifi", "washer", "ac", "heating", "parking", "pets"], area: "West End", lat: 42.0389, lon: -70.1962 },
];
export const STAY: Record<string, Stay> = Object.fromEntries(STAYS.map((s) => [s.id, s]));

const CM = "Cape May";
export const CAPE_MAY: Stay[] = [
  { id: "cm-manor", kind: "Home", where: CM, line: "Three storeys and a wraparound porch", long: "A whole Victorian house two blocks from the beach, with a porch on three sides and a brick walk to the door.", photo: "cm-manor", rating: 5.0, reviews: 41, badge: "Guest favorite", rooms: "4 bedrooms · 5 beds · 3 baths", sleeps: 8, dates: "Oct 16 – 18", nights: 2, total: 598, has: ["kitchen", "wifi", "washer", "ac", "heating", "parking"] },
  { id: "cm-porch", kind: "Townhouse", where: CM, line: "Two tiers of porch on a quiet street", long: "Half of a double house with its own upper and lower porch, both trimmed in white fretwork.", photo: "cm-porch", rating: 4.97, reviews: 118, badge: "Guest favorite", rooms: "3 bedrooms · 4 beds · 2 baths", sleeps: 6, dates: "Oct 16 – 18", nights: 2, total: 660, has: ["kitchen", "wifi", "ac", "heating"] },
  { id: "cm-mansard", kind: "Home", where: CM, line: "Mansard tower, near the promenade", long: "A grey-green house with a tower room at the top of the stairs and a long front porch.", photo: "cm-mansard", rating: 4.9, reviews: 57, badge: "Guest favorite", rooms: "5 bedrooms · 6 beds · 3 baths", sleeps: 10, dates: "Oct 16 – 18", nights: 2, total: 805, has: ["kitchen", "wifi", "washer", "ac", "heating", "parking", "pets"] },
  { id: "cm-sewell", kind: "Home", where: CM, line: "Double porches over a wide lawn", long: "A broad two-storey house with a porch on each floor, facing a lawn on a corner lot.", photo: "cm-sewell", rating: 4.98, reviews: 86, badge: "Guest favorite", rooms: "4 bedrooms · 4 beds · 2 baths", sleeps: 8, dates: "Oct 16 – 18", nights: 2, total: 591, has: ["kitchen", "wifi", "ac", "heating", "parking"] },
];

/* ---------- Home page ---------- */

export const SERVICES: { name: string; icon: IconName; body: string }[] = [
  { name: "Chefs", icon: "knife", body: "A cook who shops in the morning and has dinner on the table at seven." },
  { name: "Photography", icon: "camera", body: "An hour with a photographer on the beach or along the wharves." },
  { name: "Massage", icon: "leaf", body: "A table set up in the living room or on the deck." },
  { name: "Prepared meals", icon: "box", body: "Dinner for the week, left in the refrigerator before arrival." },
];

export const INSPIRATION: Record<string, [string, string][]> = {
  Popular: [["Provincetown", "Vacation rentals"], ["Cape May", "House rentals"], ["Boston", "Apartment rentals"], ["New York City", "Apartment rentals"], ["Philadelphia", "Condo rentals"], ["Washington, D.C.", "Monthly rentals"], ["Nashville", "House rentals"], ["Miami Beach", "Condo rentals"]],
  Beach: [["Provincetown", "Beachfront rentals"], ["Cape May", "Beach houses"], ["Miami Beach", "Beachfront rentals"], ["San Juan", "Apartment rentals"], ["Ocean City", "Vacation rentals"], ["Myrtle Beach", "Condo rentals"], ["Fort Lauderdale", "House rentals"], ["Atlantic City", "Vacation rentals"]],
  "Arts & culture": [["Provincetown", "Cottage rentals"], ["Philadelphia", "Apartment rentals"], ["Washington, D.C.", "House rentals"], ["Boston", "Condo rentals"], ["New York City", "Loft rentals"], ["Nashville", "Apartment rentals"], ["San Juan", "House rentals"], ["Rome", "Apartment rentals"]],
  Outdoors: [["Pocono Mountains", "Cabin rentals"], ["Cape Cod", "Cottage rentals"], ["Cape May", "Vacation rentals"], ["Truro", "House rentals"], ["Wellfleet", "Cottage rentals"], ["Big Bear Lake", "Cabin rentals"], ["Broken Bow", "Cabin rentals"], ["Tampa", "House rentals"]],
};

/* ---------- The Tideline ---------- */

export interface Room { id: string; name: string; beds: string; guests: number; photo: string; rate: number; long: string; has: string[] }
export const ROOMS: Room[] = [
  { id: "premium", name: "Premium king suite", beds: "1 king bed", guests: 2, photo: "r-premium", rate: 245, long: "Two rooms at the front of the second floor: a sitting room with a sofa and a wall of the original brick, and a bedroom with a king bed behind it.", has: ["Sitting room", "Private bath", "Wifi", "TV", "Air conditioning"] },
  { id: "deluxe", name: "Deluxe king suite", beds: "1 king bed", guests: 2, photo: "r-deluxe", rate: 225, long: "The largest bedroom in the house, with a carved headboard, a reading chair by the window and a bath with a walk-in shower.", has: ["Private bath", "Wifi", "TV", "Air conditioning", "Hair dryer"] },
  { id: "king", name: "King suite", beds: "1 king bed", guests: 2, photo: "r-king", rate: 205, long: "A quiet room at the back with a king bed and a small sitting corner, away from the street.", has: ["Private bath", "Wifi", "TV", "Air conditioning"] },
  { id: "garden", name: "Garden queen", beds: "1 queen bed", guests: 2, photo: "r-garden", rate: 175, long: "A ground-floor room with blue panelling and a table by the window, opening to the side garden.", has: ["Private bath", "Garden door", "Wifi", "TV"] },
  { id: "queen", name: "Queen room", beds: "1 queen bed", guests: 2, photo: "r-queen", rate: 165, long: "A plain white room with a brass bed, a wooden floor and two windows over the lane.", has: ["Private bath", "Wifi", "TV", "Air conditioning"] },
  { id: "twin", name: "Twin under the eaves", beds: "2 twin beds", guests: 2, photo: "r-twin", rate: 149, long: "Two iron beds on the top floor on either side of a dormer window, with a desk between them.", has: ["Private bath", "Wifi", "Air conditioning"] },
  { id: "shared", name: "Economy queen, shared bath", beds: "1 queen bed", guests: 2, photo: "r-shared", rate: 129, long: "A small room under the roof with an iron bed and a dormer window. The bath is across the landing and is shared with one other room.", has: ["Shared bath", "Wifi", "Heating"] },
];

export const HOTEL = {
  name: "The Tideline",
  kind: "Hotel in Provincetown, Massachusetts",
  lead: "Seven rooms in the West End, a short walk from Commercial Street.",
  intro: "A guesthouse on a side street in the quiet end of town. The harbor is at the bottom of the lane, the bars and restaurants of Commercial Street are a few minutes along it, and the roof deck looks over both to the dunes.",
  intro2: "It suits two people who want to walk everywhere: there are seven rooms, no lift, and space behind the house for four cars.",
  about: [
    "The Tideline is a white clapboard house of three storeys with a cupola, in the part of Provincetown where the street narrows and the houses stand close to it. It has seven rooms: three suites with king beds on the first two floors, three queen rooms, and a twin room under the eaves.",
    "Downstairs there is a sitting room hung with prints, where coffee is out at any hour, and a side garden with chairs. The roof deck has loungers and a view over the harbor to Long Point in one direction and across the roofs to the dunes of the Province Lands in the other.",
    "Parking is limited to four cars behind the house and is free. Beach chairs and towels can be borrowed from the hall cupboard. There is no lift: every floor is reached by stairs.",
  ],
  gallery: ["l-hotel", "h-bed", "h-roof", "h-exterior", "h-lane"],
  amenities: [["cup", "Breakfast for purchase"], ["wifi", "Wifi"], ["tv", "TV"], ["dryer", "Hair dryer"], ["luggage", "Luggage drop-off"], ["bottle", "Toiletries"]] as [IconName, string][],
  know: [
    { icon: "check" as IconName, title: "Booking requirements", items: ["21 or older to book.", "Photo ID and a card at check-in.", "Every room is non-smoking."] },
    { icon: "key" as IconName, title: "House rules", items: ["Check-in after 3:00 PM.", "Checkout before 11:00 AM.", "No pets."] },
    { icon: "shield" as IconName, title: "Safety and property", items: ["Smoke alarm in every room.", "Carbon monoxide alarm on each floor.", "Stairs only; there is no lift."] },
  ],
  address: "West End, Provincetown, Massachusetts",
  lat: 42.0478, lon: -70.1912,
  highlights: [
    { line: "24/7", label: "Coffee in the sitting room", body: "Out at any hour, with beach chairs and towels to borrow from the hall cupboard.", tone: "tile", icon: "cup" },
    { line: "Roof", label: "A deck above the house", body: "Loungers, the harbor and the dunes.", tone: "sand", icon: "sun" },
  ] as Fact[],
  near: [["Commercial Street", "3 min walk"], ["Pilgrim Monument", "10 min walk"], ["Ferry pier", "12 min walk"], ["Herring Cove", "8 min by bike"]] as [string, string][],
};

export const SUBNAV: [string, string][] = [["Photos", "#photos"], ["Rooms", "#rooms"], ["Amenities", "#amenities"], ["Location", "#location"], ["Reviews", "#reviews"]];

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
