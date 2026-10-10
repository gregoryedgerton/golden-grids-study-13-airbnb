#!/usr/bin/env python3
"""Contact sheets for the Unsplash candidates saved in find/u-all.json (search results read in a browser)."""
import json, io, sys, urllib.request, concurrent.futures as cf
from pathlib import Path
from PIL import Image, ImageDraw
HERE = Path(__file__).parent / "find"
raw = (HERE / "u-all.json").read_text()
data = json.loads(raw[raw.index("{"):raw.rindex("}") + 1])
(HERE / "unsplash.json").write_text(json.dumps(data, indent=1))
def load(it):
    try:
        with urllib.request.urlopen(urllib.request.Request(it["raw"] + "?w=300&h=225&fit=crop&q=60", headers={"User-Agent": "Mozilla/5.0"}), timeout=30) as r:
            return Image.open(io.BytesIO(r.read())).convert("RGB")
    except Exception as e: return None
keys = sys.argv[1:] or list(data)
for k in keys:
    items = data[k]
    if not items: continue
    with cf.ThreadPoolExecutor(8) as ex: imgs = list(ex.map(load, items))
    cols, cw, ch = 5, 300, 225; rows = (len(items) + cols - 1) // cols
    S = Image.new("RGB", (cols * cw, rows * (ch + 20)), "white"); d = ImageDraw.Draw(S)
    for i, (it, im) in enumerate(zip(items, imgs)):
        x, y = (i % cols) * cw, (i // cols) * (ch + 20)
        if im: S.paste(im, (x, y))
        d.text((x + 4, y + ch + 4), f"{k} {i} {it['w']}x{it['h']} {(it['user'] or '')[:18]}".encode("ascii", "ignore").decode(), fill="black")
    S.save(HERE / f"u-{k}.jpg", quality=78); print(k, len(items))
