# Captures

No screenshot of the reference is kept: its pages carry hosts' photographs.

- `find.py`: searches Wikimedia Commons and Openverse for candidate photographs and lays them out on a numbered sheet (`find/*.jpg`, not committed; the candidate lists `find/*.json` are).
- `sheet_u.py`: the same sheets for Unsplash candidates (`find/unsplash.json`, search results read in a browser on 2026-10-09).
- `picks.json`, `pick.py`: which candidate each photograph is, and its alt text; `pick.py` downloads them to `public/assets/` and writes `src/photos.json` (author, licence, page).
- `osm/q.txt`, `osm/raw.json`, `map.py`: the Overpass query, its answer (© OpenStreetMap contributors, ODbL) and the script that turns it into `src/map.ts`.
- `study.cjs`: screenshots of the study; `study-*-1440.jpg` are the current ones.
- `scan.cjs`: overflow, fitted-line floor and axe, Chrome and WebKit, three widths, both schemes.

```bash
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5187/ index search "stay?example"
```
