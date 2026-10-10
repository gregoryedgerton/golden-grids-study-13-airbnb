# Layout study — Airbnb, second pass, as GIFcommit

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-13-airbnb/`](https://gregoryedgerton.github.io/golden-grids-study-13-airbnb/)

An unaffiliated layout study. It rebuilds three pages of
[airbnb.com](https://www.airbnb.com/) (the home page, the search results for
Provincetown, Massachusetts, and a hotel's listing) as stacked golden grids
under the GIFcommit brand. GIFcommit is not Airbnb. Every stay, price and
rating is invented, nothing can be booked, no form sends anything, and none of
the reference's sentences, photographs, icons or marks is reproduced. Built
with [Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

It is the second study of Airbnb in the series.
[Study 01](https://github.com/gregoryedgerton/golden-grids-study-01-airbnb)
is one listing page with generated photographs; this one is three pages, with
photographs under open licences, type that scales with its square, and the
reference's own edge treatment (rounded corners and white space, no outlines).

## Reference

Read on 2026-10-09 in a desktop browser at about 1,024px wide, signed out;
text and computed styles were taken from the pages and no screenshot is kept.

- **Home** ([airbnb.com](https://www.airbnb.com/)): a search bar (where, when,
  who), then rows of equal cards: destinations, services, and homes in two
  nearby towns, each card a rounded photograph over two to four lines; then
  link lists under tabs and a three-column footer.
- **Search** ([Provincetown](https://www.airbnb.com/s/Provincetown--MA/homes)):
  a compact search summary, a row of filter chips, a count ("over 1,000
  homes"), eighteen cards in a column and a map with a price on a pill for
  each, fifteen pages.
- **Listing** ([a hotel in Provincetown](https://www.airbnb.com/rooms/1758691142566618626)):
  a title, a mosaic of five photographs, in-page links, a description, three
  highlights, a list of rooms, a booking card that asks for dates before it
  shows a price, amenities, a map, an empty reviews section and house rules.

**Measured register:** ink `#222` on white, second lines `#6a6a6a`, hairline
`#ddd`, grey grounds `#f7f7f7` and `#f2f2f2`, the primary button's gradient
`#e61e4d → #e31c5f → #d70466`, 20px corners on photographs, 12px on buttons,
full pills on chips, `0 6px 16px rgba(0,0,0,.12)` under cards. Text is 14 to
16px at weight 400 to 500, headings 22 to 26px; a card's type is the same size
wherever the card sits. Figtree stands in for the reference's face. The
reference has one scheme on the web; dark is the study's.

## Approach

The reference sets each module as a row or a column of cards at one size, and
keeps its map and its booking card beside the page. The study sets each module
as one grid: the first card in the largest square, the rest in descending
squares, with one figure about the place set as large type among them. The
map is the largest square of the first results band, and the booking card is
a bar under the photographs.

Type follows the square. A card's text size is set from its square's side
(`10px + 1.7%` of it, held between 12 and 22px), so the same card reads at
22px in an 850px square and 12px in the smallest. What a square cannot hold
it leaves out whole, in steps: every line; then name, rating and price; then
the photograph alone with its price on a white pill, as the reference's map
does. Figures (`252 ft`, `1,000+`, `73%`) are fitted to their tile by
`lib/fit.tsx`, up to 150px.

Edges are the reference's: no cell is outlined. Photographs have rounded
corners that grow with the square (12 to 28px), tiles are flat grey, sand,
ink or the brand gradient, and the white between cards is the gutter.

## The pages

Three Vite entries, plain relative links, no router. `GridBand`
([`src/bands/bands.tsx`](src/bands/bands.tsx)) draws every band from cells;
`lib/plan.ts` chooses each grid. Sizes are the grid's width×height at 1440.
Below 1100px a band of five is dealt into two grids, and a skip grid that
would leave a square under 104px falls back to a plain one.

| Page | Band | Grid at 1440 | Cells |
| --- | --- | --- | --- |
| Home | Destinations for you | `from=3 to=6`, strip, 1364×839 | four places, a figure in the strip |
| | Popular homes in Provincetown | `from=2 to=5`, 1364×853 | four stays, the reference's count |
| | Find services near you | `from=3 to=6`, strip, 1364×839 | a count and four services, as type |
| | Homes in Cape May | `from=1 to=5`, 1364×853 | four stays, a figure |
| | Farther along the coast | `from=4 to=7`, strip, 1364×844 | five places |
| Search | Map and first stays | `from=1 to=5`, 1364×853 | the map, four stays |
| | three bands of four | `3–6` strip, `1–5`, `4–7` strip | four stays and a figure each |
| | the last two | `from=1 to=3`, 1364×909 | two stays, a figure |
| Listing | Photos | `from=1 to=5`, 1364×853 | five photographs |
| | Overview | `from=1 to=5`, 1364×853 | the description and four figures |
| | Choose your room | `from=3 to=5`, strip, 1364×853 | four rooms |
| | The other rooms | `from=1 to=4`, 1364×818 | three rooms, a figure |
| | Where you'll be | `from=1 to=4`, 1364×818 | the map, what is near, two figures |

Flat modules stay flat: the search bar, the filter chips, the link lists
under tabs, the booking bar, the description, amenities, house rules.

**What answers back.** Every photograph opens its square in place to the
rest of the stay, place or room, with one Close at the top right and Escape.
On the search page the chips filter the eighteen stays and the bands are
re-dealt from the new count; a pill on the map marks its stay and moves to
it; a heart saves a stay to a list kept in the browser tab. On the listing,
dates and guests in the booking bar price every room card, or mark it taken.
`stay.html?example` opens with dates already checked.

## Content and provenance

- **Places and figures are real.** Each figure names its source in its foot
  and in the page's disclosure: Wikipedia's articles on Provincetown, the
  Pilgrim Monument, Cape Cod National Seashore, the Provincetown and Cape May
  historic districts and the lights, read 2026-10-09; the count of homes and
  the list of ten services are the reference's own.
- **Stays, the hotel and its rooms are invented**, following the kinds of
  home and the fields on a card that the reference showed. The reference
  listing is a real hotel; "The Tideline" is not, and uses nothing of it.
- **Photographs** are in [`src/photos.json`](src/photos.json), each with its
  author, licence, page and alt text: Wikimedia Commons and Flickr under
  CC BY, CC BY-SA, CC0 or public domain for the places and house exteriors,
  and Unsplash under the Unsplash License (free to use, not a Creative Commons
  licence) for interiors and some of Provincetown's waterfront. Each is
  credited beside the photograph when it is opened and in the page's
  disclosure. They are real places, but none shows a stay offered here.
  [`captures/find.py`](captures/find.py) searched,
  [`captures/pick.py`](captures/pick.py) downloaded and recorded.
- **The map** is drawn by [`captures/map.py`](captures/map.py) from
  OpenStreetMap data (© OpenStreetMap contributors, ODbL): coastline,
  streets, wharves. Stays' positions on it are invented.
- **Icons** are the study's own drawings. **Text** is the study's own.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict.
Whether the layout suits the page is assessed separately, after every study
has been reviewed.

- **Band height.** Each grid is about 0.62 of its width tall, so at 1440 every
  band is about 850px. The home page is 6,850px tall at 1440 with five bands;
  the reference's home page shows five rows in about 2,500px.
- **Card sizes.** In a band of five at 1440 the squares are 853, 512, 341, 171
  and 171px. The two smallest show a photograph and a price pill and no other
  text; the full card is one tap away.
- **Tablet.** At 820 most bands of five become the same pair of grids (three
  squares, then two), so neighbouring bands share a shape.
- **Phone.** At 390 card text runs from 12 to 16px. The map stands alone as
  one 354px square; its pills overlap in the town center, as the reference's do.
- **Sorting.** The reference's list has one order. Here the order runs largest
  square to smallest within a band, and the first stay of each band is the
  largest card.
- **Filtering.** The grid is chosen from the count, so a filter changes the
  shape of the page as well as its length.
- **Booking.** The reference's card stays in view beside the page; the bar
  here scrolls away, and the in-page links carry a way back to it.
- **Availability** is arithmetic on the dates: about one room in four is
  taken, and on some dates that is three of the four largest.
- **Smallest type.** 12px, on cards in squares under about 120px and on map
  pills at 390. No fitted line is under 12px.
- **Accessibility.** `captures/scan.cjs` reports no overflow, no fitted line
  under 12px and no axe violations in Chrome and WebKit at 390, 820 and 1440,
  light and dark. No screen-reader user has tested it.
- **Not rebuilt.** Experiences and services pages, pagination, the price
  breakdown dialog, sign-in, and the reference's price-match note.

## Disclosure

Every page says it is a study in three places, all read from
[`src/study.json`](src/study.json): the page's metadata, a sticky notice at
the top, and "About this layout study", the last element on the page, which
lists the pages reviewed, what is real, what is invented and where each asset
comes from, with the page's own photograph credits and sources.

## Running it

```bash
npm install
npm run dev
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5173/ index search "stay?example"
```

Pushing to `main` deploys to GitHub Pages. Study tools: `?tools=1`
(`g` grid outlines, `n` band notes, `m` reduced motion).
