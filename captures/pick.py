#!/usr/bin/env python3
"""Download the chosen photographs and record where each came from.

    python3 captures/pick.py [key ...]

Reads captures/picks.json (key -> which candidate, and its alt text), fetches
each file at a width that leaves at least 1200px on its short side, writes
public/assets/s13-<key>-1600.jpg and -800.jpg (the name is the long side cap,
not the exact width), and writes src/photos.json: author, licence, the page
the photograph is published on, and the alt text. The alt text is the only
place a picture is described.
"""
import json, io, sys, math, time, urllib.parse, urllib.request, re, html
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).parent.parent
FIND = ROOT / "captures" / "find"; OUT = ROOT / "public" / "assets"; OUT.mkdir(parents=True, exist_ok=True)
UA = {"User-Agent": "golden-grids-study/1.0 (https://github.com/gregoryedgerton; layout study photo research)"}
def get(url, raw=False, ua=UA):
    with urllib.request.urlopen(urllib.request.Request(url, headers=ua), timeout=90) as r: b = r.read()
    return b if raw else json.loads(b)
def strip(s): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()
def commons_info(title, width):
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action": "query", "format": "json", "titles": "File:" + title, "prop": "imageinfo", "iiprop": "url|extmetadata|size", "iiurlwidth": width})
    ii = next(iter(get(u)["query"]["pages"].values()))["imageinfo"][0]; m = ii["extmetadata"]
    return {"credit": strip(m.get("Artist", {}).get("value", "")), "licence": strip(m.get("LicenseShortName", {}).get("value", "")), "page": ii["descriptionurl"], "w": ii["width"], "h": ii["height"], "url": ii.get("thumburl") or ii["url"], "title": title}
def width_for(w, h): return int(min(w, max(1600, math.ceil(1200 * w / h)), 2600))

picks = json.loads((ROOT / "captures" / "picks.json").read_text())
unsplash = json.loads((FIND / "unsplash.json").read_text())
meta_path = ROOT / "src" / "photos.json"
meta = json.loads(meta_path.read_text()) if meta_path.exists() else {}
meta = {k: v for k, v in meta.items() if k in picks}
for key in (sys.argv[1:] or list(picks)):
    p = picks[key]; src = p["from"]
    if (OUT / f"s13-{key}-1600.jpg").exists() and key in meta and not sys.argv[1:]: continue
    if src[0] == "unsplash":
        it = unsplash[src[1]][src[2]]; W = width_for(it["w"], it["h"])
        url = f"{it['raw']}?w={W}&q=80&fm=jpg&fit=max"
        m = {"credit": it["user"], "licence": "Unsplash License", "page": f"https://unsplash.com/photos/{it['slug']}", "source": "Unsplash", "profile": f"https://unsplash.com/@{it['un']}"}
        data = get(url, raw=True, ua={"User-Agent": "Mozilla/5.0"})
    else:
        title = src[1] if src[0] == "commons-title" else json.loads((FIND / f"{src[1]}.json").read_text())[src[2]]["title"]
        probe = commons_info(title, 1600); W = width_for(probe["w"], probe["h"])
        info = commons_info(title, W) if W != 1600 else probe
        m = {"credit": info["credit"], "licence": info["licence"], "page": info["page"], "source": "Wikimedia Commons", "title": title}
        data = get(info["url"], raw=True); time.sleep(1.5)
    im = Image.open(io.BytesIO(data)).convert("RGB")
    # Commons serves thumbnails at fixed steps, some far larger than asked for: bring the short side back to 1280.
    if min(im.size) > 1300:
        f = 1280 / min(im.size); im = im.resize((round(im.width * f), round(im.height * f)), Image.LANCZOS)
    im.save(OUT / f"s13-{key}-1600.jpg", quality=80, optimize=True, progressive=True)
    half = im.resize((im.width // 2, im.height // 2), Image.LANCZOS); half.save(OUT / f"s13-{key}-800.jpg", quality=78, optimize=True, progressive=True)
    meta[key] = {**m, "alt": p["alt"], "w": im.width, "h": im.height}
    if "pos" in p: meta[key]["pos"] = p["pos"]
    print(key, im.size, m["credit"][:30], "|", m["licence"])
for k in meta: meta[k]["alt"] = picks[k]["alt"]
meta_path.write_text(json.dumps({k: meta[k] for k in picks if k in meta}, indent=1, ensure_ascii=False) + "\n")
