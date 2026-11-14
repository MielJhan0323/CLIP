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
**No music bed you notice, no SFX, no flashes, no typed labels, no graphs.**

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
