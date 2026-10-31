---
tags: [project, batch, jorho, podcast]
date: 2026-10-31
---
# Batch 4: Trevor Lawrence clips in Jorho style

User ask (2026-10-31): "choose trevorlawrence clips and edit it with the jorho style". Sheet tab Trevor Lawrence Clips (`gid=1029565171`).
Picked clips that had no Jorho version yet (Peyton, Golf, Redeem, Coen already exist). Skipped t6 Davis Mills because a Jorho reference video already did that joke.

| comp | out | clip | top line | beep before | cut-outs | music (strobe on beat) |
|---|---|---|---|---|---|---|
| JorhoAnt | jorho_ant_auto.mp4 (19.8 s) | t1: Anthony Richardson's auto "looks like an ant" → "he's got a goated pen" | Bro said his autograph looks like an ant | "Anthony Richardson" | richardson.png | Du bist full, beat 42051 on the name strobe |
| JorhoJosh | jorho_wrong_josh_allen.mp4 (17.5 s) | t5: "Josh Allen, true gold" → it's Josh Hines-Allen before the name change | Pulled Josh Allen but it's the wrong Josh Allen | "Josh Allen" | josh_allen.png (Bills) → hines_allen.png | Du bist full, beat 83336 (after the song's quiet dip) |
| JorhoTrav | jorho_traveling_trevors.mp4 (21.0 s) | t3: Trevor on the Traveling Trevors, "these guys are whacked" → "we need more Jags fans" | Trevor's first thoughts on the Traveling Trevors | "whacked" | none | Blue, beat 37245 on the "whacked" strobe |

## Notes
- Whisper drifted ~0.5 s around t3 57–58 s; re-transcribed with faster-whisper small.en on a numpy array. Trevor says "Jags", not "Jax".
- Cut points checked against a 40 ms RMS envelope (`/tmp/env.py` idea: print dB around each cut) and moved into real gaps.
- Wide shots only show ~1083 px of the 1920 frame, so centre them on two people (wideX ≈ 715–820), never on all three.

## Feedback log
- (waiting)
