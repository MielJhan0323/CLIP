---
tags: [project, batch, jorho-v2, trevor, viral]
date: 2026-11-14
---
# Batch 16: 10 Jorho v2 Trevor clips in the measured 500K-view style

User (2026-11-14): "analyze the reference video with 500k views… the camera panning, the sound effects, the stickers" → "remake the 5 clips,
discontinue the Justin Augh" → "make me 10 jorho v2 with the viral video references… ensure virality".
Breakdown: [[Viral formula - 500K light edit + warm grade]]. Code: `src/jorho/batch16.tsx` (`make()`), every clip built by the same recipe:
dead-air trims (pauses > 0.38 s cut, 250 ms word tails), virtual camera (punch-cuts between 1.0×/1.4× crops every ~1.4 s on the speaker,
wide first body shot, wide ending), whip-blur first frame, 2–4 colour-flash frames with a SOFT boom (a loud boom masked the punch word in QC),
red arrow + *Trevor Lawrence* once, one meme cut-out where someone is named, one-word captions, VIRAL_WARM, a bed from the first cut that
swells ×3 on a ~0.8 s reaction tail after the last word.

| # | comp | out | moment | cut-out | music |
|---|---|---|---|---|---|
| 1 | B16Signature | b16_v2_peyton_called_signature.mp4 (21.4 s) | Peyton called him about his signature | Peyton | Monkeys Spinning Monkeys |
| 2 | B16Rookie | b16_v2_rookie_year_call.mp4 (21.7 s) | who he called when his rookie year went wrong | Peyton | Fluffing a Duck |
| 3 | B16Ant | b16_v2_ant_autograph.mp4 (20.9 s) | "his auto looks like an ant" (freeze + fahhh) | Anthony Richardson | Sneaky Snitch |
| 4 | B16Playbook | b16_v2_hundreds_of_plays.mp4 (21.8 s) | hundreds of plays, 8–10 new a week | — | Blue (yung kai) |
| 5 | B16Left | b16_v2_better_going_left.mp4 (21.5 s) | coaches only roll right → better going left | — | Lose You |
| 6 | B16Davis | b16_v2_davis_mills_neck.mp4 (14.7 s) | "longer neck than Mike Glennon" | Mike Glennon | Fluffing a Duck |
| 7 | B16Gift | b16_v2_natty_ticket_gift.mp4 (21.7 s) | a signed ticket to his own natty | — | Jorho lullaby |
| 8 | B16Jesus | b16_v2_jesus_first_pick.mp4 (19.8 s) | dream foursome: "throw Jesus in there" | 🙏 | Midnight Club |
| 9 | B16Marino | b16_v2_marino_top10.mp4 (15.3 s) | is Dan Marino top 10? "gotta be" | — | tak-tak |
| 10 | B16Sweat | b16_v2_sweat_a_card.mp4 (23.6 s) | how to sweat a card | — | Investigations |

All are re-cuts of moments used before (no new Trevor footage); QC: words intact (medium.en spot checks), −12.1…−14.7 LUFS.

## Redo → batch 17 (2026-11-15): #2, 4, 5, 7, 8, 9, 10
User: "the recipe is too replicated, some don't really use angle changes, some have too much zoom or the wrong centre focus; when he talks
about plays add diagrams like in v2". `src/jorho/batch17.tsx`:
- hand-planned REAL angle changes per clip (seats: L = Grant, M = Trevor, R = Bugsy; speaker ↔ listener reaction ↔ wide)
- zoom capped at ×1.12 on top of the speaker crop (batch 16 stacked ×1.4 on an already ~1.7× crop)
- v2 diagrams with the cam shrinking into a corner face-cam: playbook = THE OFFENSE mind-map (runs / pass concepts / play action / screens)
  + WHOLE PLAYBOOK dot grid lighting 8–10 "this week"; left = top-down rollout field (coaches: roll right ×3 red → him: go left green);
  rookie = Peyton 1998 3-13 / 28 INTs vs Trevor 2021 3-14; captions off while a diagram owns the box
- own graphic per clip: ticket card (gift), dream-foursome card (Jesus), ALL-TIME TOP 10 QB? ✅ (Marino), sweat checklist (sweat, cam stays full)
- 0–1 colour flash per clip, per-clip SFX (pops on mind-map nodes, paper-tear on the ticket, dings on checks)
Outputs: b17_v2_rookie_year_call, b17_v2_hundreds_of_plays, b17_v2_better_going_left, b17_v2_natty_ticket_gift, b17_v2_jesus_first_pick,
b17_v2_marino_top10, b17_v2_sweat_a_card.
