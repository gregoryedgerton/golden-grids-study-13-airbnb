#!/usr/bin/env python3
"""Find candidate photographs under open licences and lay them out on a contact sheet.

    python3 captures/find.py <name> <commons|openverse> "<query>" [count]

Writes captures/find/<name>.json (the candidates, with author, licence and page)
and captures/find/<name>.jpg (a numbered sheet). Nothing here is shipped; the
photographs that were chosen are recorded in src/photos.json by pick.py.
"""
import sys, json, re, html, io, urllib.parse, urllib.request, concurrent.futures as cf
from pathlib import Path
from PIL import Image, ImageDraw

UA = {"User-Agent": "golden-grids-study/1.0 (https://github.com/gregoryedgerton; layout study photo research)"}
HERE = Path(__file__).parent / "find"

def get(url, raw=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
        b = r.read()
    return b if raw else json.loads(b)

def strip(s): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()

def commons(q, n):
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search", "gsrsearch": f"filetype:bitmap {q}", "gsrnamespace": 6, "gsrlimit": n,
        "prop": "imageinfo", "iiprop": "url|extmetadata|size", "iiurlwidth": 480})
    out = []
    pages = sorted(get(u).get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in pages:
        ii = p["imageinfo"][0]; m = ii.get("extmetadata", {})
        lic = strip(m.get("LicenseShortName", {}).get("value", ""))
        out.append({"title": p["title"][5:], "credit": strip(m.get("Artist", {}).get("value", ""))[:80], "licence": lic,
                    "page": ii["descriptionurl"], "thumb": ii.get("thumburl"), "w": ii["width"], "h": ii["height"], "source": "Wikimedia Commons",
                    "desc": strip(m.get("ImageDescription", {}).get("value", ""))[:160]})
    return out

def openverse(q, n):
    u = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({"q": q, "license": "by,by-sa,cc0,pdm", "page_size": min(n, 20), "mature": "false"})
    out = []
    for r in get(u).get("results", []):
        lic = {"cc0": "CC0", "pdm": "Public domain"}.get(r["license"], f"CC {r['license'].upper()} {r.get('license_version') or ''}".strip())
        out.append({"title": r.get("title") or "", "credit": r.get("creator") or "", "licence": lic, "page": r["foreign_landing_url"],
                    "thumb": r.get("thumbnail") or r["url"], "full": r["url"], "w": r.get("width") or 0, "h": r.get("height") or 0,
                    "source": {"flickr": "Flickr", "wikimedia": "Wikimedia Commons"}.get(r["source"], r["source"]), "desc": ""})
    return out

def sheet(name, items):
    def load(it):
        try: return Image.open(io.BytesIO(get(it["thumb"], raw=True))).convert("RGB")
        except Exception as e: return None
    with cf.ThreadPoolExecutor(2) as ex: imgs = list(ex.map(load, items))
    cols, cw, ch = 5, 300, 225
    rows = max(1, (len(items) + cols - 1) // cols)
    S = Image.new("RGB", (cols * cw, rows * (ch + 22)), "white"); d = ImageDraw.Draw(S)
    for i, (it, im) in enumerate(zip(items, imgs)):
        x, y = (i % cols) * cw, (i // cols) * (ch + 22)
        if im:
            im.thumbnail((cw - 4, ch)); S.paste(im, (x + 2, y))
        d.text((x + 4, y + ch + 4), f"{i} {it['licence'][:12]} {it['w']}x{it['h']} {it['title'][:22]}".encode("ascii", "ignore").decode(), fill="black")
    S.save(HERE / f"{name}.jpg", quality=80)

if __name__ == "__main__":
    name, src, q = sys.argv[1:4]; n = int(sys.argv[4]) if len(sys.argv) > 4 else 20
    items = (commons if src == "commons" else openverse)(q, n)
    HERE.mkdir(exist_ok=True)
    (HERE / f"{name}.json").write_text(json.dumps(items, indent=1))
    sheet(name, items)
    print(name, len(items))
