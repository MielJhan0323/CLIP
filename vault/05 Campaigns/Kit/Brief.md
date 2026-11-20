# Kit: Kitsch x Nic Vans "Saint Nic" (ClipFarm), added 2026-11-20

Source brief: Google Doc 115eJPoUVmSA6Tnc_Mfrksnp4ee6-eWz0hxpaCs4bcBY. Footage: the brief's Dropbox folder → public/kit/ (kit_main.mp4 = 69 s holiday ad, kit_bts1/2.mp4 = 12 s BTS product-drop promos).
Pay: $1.50 CPM, max $350 per clip, min payout $1.50.

## Must
- ONLY the provided footage. **No raw reposts**: cut it into a story with our own hook (raw = rejected).
- **A Kitsch product on screen in EVERY clip** (no Kitsch = no pay).
- **Nic always in a good light**: sweet, fun, kind. No mean edits, no Love Island drama.
- Never name or guess the "special someone" (the last gift).
- Caption tag: **@mykitsch** on Instagram + YouTube, **@kitsch** on TikTok. Own words, English, short; name Kitsch in some captions, not salesy.
- TikTok / IG Reels / YT Shorts only. Post up ≥ 30 days, likes visible, ≥ 0.50 % engagement, 40 %+ Tier 1 (US/UK/CA/AU).
- One person = one edit, crosspost once per platform. New posts need a new edit + caption + on-screen text. No spam, no boosting, no NSFW.
- Don't comment on / DM Nic or Kitsch.

## Story (from the brief)
Hook in 1–2 s → Nic as Santa → the Kitsch gift clearly on screen → end on a sweet / funny / mystery moment.
Recommended moments: Sister's gift reveal, Big drop for Mom, "Saint Nic tax" (takes the Curl Cream), Cliffhanger (last gift for a "special someone").
Products: Advent Calendar, Curl Cream, Set & Flow Headband (grey), Sweet & Silky Hair Set, holiday sets, scrunchies.

## Build
src/campaigns/kit/kit.tsx (`makeKit`): source segments cut into a story, typed hook on top, punch-in per shot, flashes + SFX,
"KITSCH …" product pill when a product is on screen. No extra word captions (the ad has burned-in subtitles).
Edits: KitTax, KitMom, KitLast (src/campaigns/kit/kits.tsx).
