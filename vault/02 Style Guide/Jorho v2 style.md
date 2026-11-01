---
tags: [style, podcast, jorho, motion-graphics]
date: 2026-11-01
---
# Jorho v2 (Jorho + explainer motion graphics)

User (2026-11-01): new style "jorho v2" from 3 refs (Drive `1_hEYlNTagMTq2iCGWPRcIJYBS-bFO6bX`). **"Don't make every future edit similar"**: v2 is a toolbox, not a template. Pick the 3–5 graphics that fit what's being said, vary the music and SFX, and don't use the same opener every time.

The refs are edits of OUR clips (u1 playbook ×2, t3 throws-left), so they show what the client wants on top of Jorho:

| ref | look | graphics |
|---|---|---|
| jv2_0 (playbook, 22.7 s) | Jorho bars + 💀 top line + one-word captions | opener: cam in a rounded card on a white page, green corner brackets, question typed on top; white mind-map "THE OFFENSE" → RUNS / PASS CONCEPTS / PLAY ACTION; dot-grid "WHOLE INVENTORY" → "THIS WEEK: 10 PLAYS" in green with a pointer; dark stat badges "208+ / 300+ PLAYS INSTALLED", "8–10 NEW PLAYS A WEEK"; green tint; red ring around the key caption word |
| jv2_1 (playbook, 23.6 s) | full frame, NO bars, dark blue cinematic grade | condensed caps titles (Oswald-like) "INSTALLING / YOUR ENTIRE OFFENSE / HUNDREDS"; loading bar "INSTALLING OFFENSE… 100%"; blueprint play cards popping into a grid; "EVERYTHING." / "8–10" in orange; subtitles in a dark bottom pill with an orange keyword; week progress bar at the bottom |
| jv2_2 (throws left, 20.5 s) | Jorho bars | "HOW IS HE THIS ACCURATE?" + stat bars (ACCURACY 99 / VELOCITY 97); "GOD-GIVEN?" sticker; KID → HIGH SCHOOL → CLEMSON timeline; dimmed frame "ROLL RIGHT" / "GO LEFT" formation dots + arrow; red strike-through "THE ONE-WAY QB" |

Cuts: hard cuts (scdet 2–7 per clip), a Jorho strobe on 1–2 beats, a green tint on keywords. Graphic scenes take over the box for 1–3 s, then hand back to the cam.

## Audio
- Music in the refs is LOUD (only ~1.3–6 dB under the voice). **We keep our rule: music 14 dB under the voice** (user, 2026-11-01). The tracks couldn't be identified (chroma matching is not decisive); they are phonk/trap beds at 89–99 BPM.
- SFX at the scene changes fingerprint to generic **soft booms/impacts** (best: myinstants "sudden suspense boom" 0.90, "smash bros hit", "vine boom slow"), plus UI-style pops and clicks on graphics. No exact match because the music masks them.
- Our v2 pool (`public/sfx/`): `jv2-sudden-suspense-boom`, `jv2-smash-bros-hit`, `jv2-pop-button`, plus existing `mg-click`, `keyboard-typing`, `fast-whoosh`, `ding-2`, and the Jorho ting/flash/swish/beep. Keep them soft (0.14–0.35). Rotate: source new generic edit sounds from myinstants for new clips instead of reusing one set.

## Code
- `src/jorho/v2.tsx`: `QuestionCard`, `StatBadge`, `GradeScale`, `Sticker`, `Strike`, `WordRing`. Graphics render INSIDE the video box via the Jorho spec's `inBox(o)`; extra sounds via `extraSfx` (both added to `Spec` in `src/jorho/clips.tsx`).
- Still to build when a clip needs them: mind-map, dot-grid inventory, stat bars, timeline, formation arrows, the no-bars dark-blue variant (jv2_1).
- Demo `JorhoV2Celly` → `out/jorho_v2_psa10_celly.mp4` (u2 PSA 10 celly, Eclipser at −14 dB): typed question card → "NOT A CELLY GUY" sticker → "☝️ JUST A POINT" badge → PSA GRADE 1–10 scale lighting to a green 10 "GEM MINT" → "10·10·10 THE CELLY" badge + red ring on the caption → "EASY ✅".

## Feedback log
1. User (2026-11-01): beep pause only when convenient (removed from the celly demo); edit like a scroller deciding to stay or scroll; "generated" emoji looked AI → use real keyboard (iOS PNG) emoji only.
   - v2.1 demo (`out/jorho_v2_psa10_celly_v2.mp4`, 20.1 s): **cold open** on the payoff ("point and go… 10, 10, 10" + ring + 10·10·10 badge), strobe into the story, question card after, no beep, ☝️ / ✅ as iOS PNGs via the `emoji` prop on `StatBadge` / `Sticker`.
2. User (2026-11-01): remove the "1 MOVE / JUST POINT" badge; make "NOT A CELLY GUY" a typed `*Not a celly guy*` action text so it isn't AI-ish → `TypedAction` (italic Montserrat 800, glow, typed letter by letter + keyboard-typing). **Prefer typed action text over boxed stickers for reactions/labels.** v2.2 → `out/jorho_v2_psa10_celly_v3.mp4`.
