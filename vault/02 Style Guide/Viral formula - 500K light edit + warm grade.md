---
tags: [style, retention, viral, grade]
date: 2026-11-14
---
# Viral formula #3: the 500K-view LIGHT edit ("20,000$ Card Loses Value because of this brutal mistake 💀")

User (2026-11-14): "this video got 500k views, it doesn't have to be mega edited, just add the filter this video has and analyze why it got viral".
Another editor's cut of the SAME u3 moment as [[Viral formula - Redemptions]] (15.2 s, 576×1024, −12.1 LUFS). Contact sheet: `assets/references/viral_500k_redemptions_light_sheet.jpg`.
Back to [[START HERE]] · [[Viral formula - NBA GOAT]].

## What's actually in it (very little)
| time | what | note |
|---|---|---|
| 0 s | starts **mid-sentence**: "This card, I promise you 20,000 bucks" | money in the first second, zero setup |
| 1–3 s | hard cuts to tight single-person crops (Grant's face/hand) on "What is it now? …500 bucks, maybe?" | a cut every 1–2 s, always onto the person talking |
| 3–5 s | red curved arrow + red italic label *Trevor Lawrence* pointing at him | tells casual scrollers WHO this is (the celebrity is the hook) |
| ~5.5 s | one meme cut-out (Jordan / LeBron / Jokić collage) on a line, < 1 s | the only "graphic" |
| 5–13 s | "why do you have to redeem it… players don't sign on time" | the explanation, plain cam |
| 13–15 s | laughter, "yeah yeah yeah" → loops back to "This card…" | ends on a reaction; the loop is seamless |

Captions: small, one word at a time, cyan/green/yellow, chest height. Top caption: 2 lines, white, Montserrat, 💀.
**(First pass was WRONG here: see the frame-by-frame breakdown below. It has a music bed, SFX hits, colour flashes and a whip intro.)**

## The filter ("viral warm") — measured vs our raw u3 footage
saturation ×2.07 · blue ×0.66 · green ×0.81 · red ×1.00 (= strong warm/orange shift) · blacks crushed (p5 0.037 → 0.008) · contrast ×1.15 · overall ×0.84 darker.
Ours: `VIRAL_WARM` in `src/jorho/clips.tsx` = `sepia(0.5) saturate(1.95) contrast(1.22) brightness(0.85)` (re-measured on a render: sat ×2.14, B ×0.69, R ×0.98; close match by eye). Use it with `grade: VIRAL_WARM` on any Jorho spec.

## Why it got 500K
1. **The title is a mystery, not a summary.** "…because of this brutal mistake" — the viewer has to watch to learn what the mistake is (it's the redemption / late signing). Money + "brutal mistake" + 💀 is a curiosity gap.
2. **$20,000 → $500 in the first 3 seconds.** Same as formula #2: concrete money and a loss, paid off immediately.
3. **Celebrity labelled for casual viewers.** The arrow + *Trevor Lawrence* label turns "guys looking at cards" into "an NFL QB reacting" for people who don't recognise him.
4. **Light edit = native feel.** Nothing that screams "edited clip/ad"; it looks like a moment, so people watch it like a moment. The warm, saturated, contrasty grade still makes it pop in the feed.
5. **Short + loops.** 15 s, ends on laughter that flows back into "This card…", so replays count.
6. **Constant motion without effects.** A hard cut to the speaker every 1–2 s keeps the eye busy instead of zooms/graphics.

## Rules taken from it
- Not every clip needs to be "mega edited": for strong moments, **grade + captions + a cut to the speaker + one label** is enough.
- **Add VIRAL_WARM** to clips that should pop (user 2026-11-14: "just add the filter").
- Title = **curiosity gap** ("because of this brutal mistake", "his only fear…"), not a description.
- **Label the celebrity once** (arrow + name) early, for people who don't know him.


## Frame-by-frame breakdown (2026-11-14, user: "analyze the camera panning, the sound effects, the stickers")
Measured, not guessed: every frame (4 fps) matched against our raw u3 footage (multi-scale template match → crop size/position), the
audio aligned against the source and subtracted (what's left = what the editor ADDED).

### Edit / pacing
- Source audio in order, with **dead-air trims only**: viral 2.6 s jumps 2.3 s ahead in the source (cuts the pause + Grant's "200…" → straight to
  "500 bucks, maybe?"), small trims again at ~11 s and ~13 s. Everything else is untouched.
- 15.2 s total; ends on the group laughing → loops into "This card…".

### Camera ("panning")
It's a **virtual camera on ONE wide shot**: locked crops with **hard punch-cuts between zoom levels**, ~every 1.2 s, always onto whoever talks.
| viral time | crop (zoom of the 1080p frame) | on |
|---|---|---|
| 0.0–0.9 | whip-blur intro frame → ~2.2× | Trevor |
| 1.0–2.1 | 1.6× | Grant (hands on head) |
| 2.25–2.9 | **1.24× wide** | both ("what is it now?") |
| 3.0–3.9 | 2.1–2.2× **with a slow ~100 px pan** | Grant ("500") |
| 3.75 / 4.0–4.6 | **red flash frame**, then 2.2× | Grant ("bucks… maybe") |
| 4.75 | **yellow-green flash frame** | transition |
| 4.75–5.9 | 1.4× + **red curved arrow + *Trevor Lawrence*** | Trevor |
| 6.0–7.4 | **punch-in 1.4× → 1.85× (same centre)** | Trevor ("why do you have to redeem it") |
| 7.5–8.6 | 1.65× | Grant ("because sometimes…") |
| 8.75–9.6 | **meme cut-out collage over the frame** (Jokić / Jordan / LeBron / Bird) | on "the players" |
| 9.75–11.1 | 2.0× | Grant ("do you sign on time?") |
| 11.25–13.4 | 1.45× (+ **green flash** at 12.5 on "see") | Trevor laughing |
| 13.5–15.2 | **1.12× widest two-shot** | the laugh / ending |
Rules: no drifting zooms; zoom level CHANGES on cuts (wide ↔ tight); one push-in on the key question; end on the widest shot.

### Sound (added on top of the source)
- **Music bed from the first cut (2.5 s) to the end**: upbeat, ~103 BPM, mid-heavy (52 % of energy 250–1000 Hz, little sub-bass), sits ~−13…−18 dB
  under the voice through the middle, then **swells LOUD (≈ −7 dB, louder than the voice) at 11.75 s for the laugh/ending**.
- SFX hits, each tied to a visual:
  - 0.05–0.2 s whoosh (high band +13 dB) → the whip-blur intro
  - 2.35 s impact (+9 dB) → the first cut / music drop-in
  - 4.25 s **bass boom** (+18 dB lows) → the red flash on "bucks"
  - 4.5–4.65 s whoosh → into the yellow flash / arrow sticker
  - 7.3–7.45 s hit → the cut back to Grant
  - 8.7–8.85 s **swoosh** (+17 dB highs) → the meme collage pops in
  - 11.1 / 11.6 s whooshes → the cut to Trevor laughing
  - 12.05 s **big bass boom** (+20 dB lows) + music swell → the laugh / green flash

### Stickers / text
- Top caption: 2 lines, white bold, 💀, curiosity gap ("…because of this brutal mistake").
- Captions: ONE word at a time, small, **cyan / green / yellow**, chest height.
- **Red curved arrow + red italic *Trevor Lawrence*** under/next to him for ~1.2 s, once.
- One **meme cut-out collage** (< 1 s) on a word that names a group ("the players").
- **Colour-flash frames** (full-frame red / yellow-green / green tint, 1–3 frames) on the punchy beats, each with a boom/whoosh.

### Why this combination works
Constant "camera" motion without real effects (every ~1.2 s the frame changes), money + loss in the first 3 s, the celebrity labelled for casual
scrollers, audio that never has dead air (trims + a bouncy bed), and an ending that gets LOUDER (music swell + laugh) instead of fading out → replays.
