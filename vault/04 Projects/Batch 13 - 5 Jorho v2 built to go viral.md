---
tags: [project, batch, jorho-v2, viral]
date: 2026-11-05
---
# Batch 13: 5 Jorho v2 clips built to go viral (src/jorho/batch13.tsx)

User ask (2026-11-05): "generate 5 jorho v2 clips that you think will go viral". Built with everything learned: [[Viral formula - NBA GOAT]] + [[Viral formula - Redemptions]] (principles only, different visuals per clip), the face-cam explainer only on picturable lines (cam shrinks into the corner, cam stretches between), almost no SFX, `chunkWords` captions in output order, cuts snapped with `scripts/snap_segments.py`, and every render checked with speech-to-text.

| comp | out | engine | hook / title | main visual |
|---|---|---|---|---|
| B13Cards | b13_v2_college_vs_nfl_1of1.mp4 (15.2 s) | money: promise → payoff → bigger payoff | "His college 1/1 is worth $2K… his NFL 1/1?" cold open on "That's a 1/1 NFL, that's 1/1 Clemson" | two 1/1 cards (Jaguars teal / Clemson orange, #16, shine sweep); Clemson tag "$2,000", NFL tag counts $500 → **$1,000,000?** (log ticker); ends on "Wow." |
| B13Tiger | b13_v2_tiger_card_4_years.mp4 (18.8 s) | mystery → reveal → what's inside | "Grant gave Trevor a card he kept for 4 YEARS" (Tiger hidden until 5.9 s, music dips before it) | Tiger Woods game-worn patch auto booklet card ("in Grant's PC for 4 years") → **exploded view**: shirt, laundry tag, glove, cap swatches as he names them; ends "Yes, for you, because you're a golfer" |
| B13Rookie | b13_v2_rookie_3_14.mp4 (21.0 s) | story with a twist parallel | "Trevor's rookie year: 3–14. Peyton's?" | **season strips**: Trevor 2021 3–14 fills box by box; then Peyton 1998 **3–13 + 28 INTs (most in the NFL)** under it; ends "that's what we talk about, it being a team sport" |
| B13Artist | b13_v2_favorite_artist.mp4 (16.5 s) | universal question, hidden answer | "Trevor Lawrence's favorite artist is…" | **Now Playing card** with "?" art and a blurred name → CHRIS STAPLETON on the reveal (soft ding, music dip before) |
| B13King | b13_v2_all_hail_the_king.mp4 (15.0 s) | cold open on the payoff + escalation | "How Backyard Breaks greets Trevor Lawrence", opening on his deadpan "Boys." already crowned | 👑 waits where the king walks in, growing on each "All hail the king", then flies onto Trevor's head (hand-marked head keyframes: the tracker follows a host) and rides it through "Boys." |

Facts on screen (checked): 2021 Jaguars 3–14; 1998 Colts 3–13; Manning threw 28 INTs as a rookie, most in the NFL. "$500 to a million" is shown as said (a counter from $500 to "$1,000,000?").
New engine options: `Spec.speechGain` (the king chant was −9.9 LUFS → 0.6 → −14.3).
