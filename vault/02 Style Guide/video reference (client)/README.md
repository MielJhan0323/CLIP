# Client "video reference" doc (whop ai drive → video references) — 2026-11-15
DEFAULT EDITING STYLE from now on unless the user says otherwise.

Doc = instruction: learn the CLIENT'S OWN editing decisions from the ref videos; copy HOW they edit, not content.
Priorities: 1 editing decisions, 2 pacing/rhythm, 3 captions/type, 4 effects/transitions, 5 audio, 6 human personality.
Hard rules: do NOT over-edit; no generic viral templates; no predictable zoom every few s; no excess SFX;
no forced excitement; leaving a moment untouched is a valid choice; feel human (natural imperfection, restraint).

Refs: 41 YouTube Shorts, all Backyard Breaks channels (mostly Trevor Lawrence at the break table) — list in references_list.txt.
YouTube can't be downloaded → only thumbnails analysed (thumbs_sheet.jpg). Seen in thumbnails:
- Letterbox: black top & bottom, 16:9-ish video band in the middle (no blur bg, no full-screen crop).
- Title in top black bar: white bold sans, 2 lines, centred, ends with 💀/😭 emoji.
- Small one-word captions in the middle of the video (cyan / green, black outline).
- Red curved arrow + red *Trevor Lawrence* label (white outline), green tint flash, money-falling overlay,
  NBA player cut-out collage on GOAT picks, @bbreaks_pullz watermark.
= the same recipe as "Viral formula - 500K light edit + warm grade.md" → that note is the detailed spec.
To learn pacing/audio exactly, the client needs to put the mp4s in the Drive (YouTube is blocked).

## 2026-11-22 — v3 TEMPLATE (user: batch 23 edits were "very lack luster, use the whop ai g drive video references to find viral template")
Studied the 41 reference Shorts' preview frames (hq1-3, YouTube itself is bot-checked) + the Drive's EDITING RESOURCES. The template:
1. **Meme / POV titles**, not descriptions: "Bro is the first person to have a white NBA goat", "The longest neck in the world",
   "POV: Gifting a $15,000 card to an NFL star", "He gave away his only 20,000$ card and started tweaking" (TopText adds the 💀).
2. **Frame 0 = lime (#8BE612) colour flash + the red curved arrow + red *Trevor Lawrence* label** (not mid-clip).
3. **Full-band cutaways on the punchline (~1–1.4 s):** player photos (Drive "Trevor Lawrence images": Dellavedova, NBA GOAT collage)
   and the Drive BYB scream clips (public/byb/memes, 23 card-pull Shorts; peak scream second in src/jorho/byb_meme_peaks.json).
4. **The client's sticker PNGs** (public/byb/stk: skull, crying, laugh, think, rizz, heart, circle, circle_arrow) instead of only iOS emoji.
5. **Money-fall overlay** (public/byb/ov, screen-blended) on money moments; green flash clips also there.
Code: `v3` option on batch17 `make()` → {arrowStart, green, cuts[{src,dur,file,from}], stickers[[src,file]], money[src]}. First use: src/jorho/batch24.tsx.
