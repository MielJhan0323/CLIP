---
tags: [project, campaign, fomo, clipfarm, jorho]
date: 2026-11-14
---
# FOMO × ClipFarm: "Guess The Fake Millionaire (ft. Brez)" shorts (src/fomo/fomo.tsx)

User (2026-11-14): new campaign, read the brief (FOMO_Creator_Clipping_Brief.pdf), edit in Jorho v1, short form.
Source: Drive `1rsYS-1Vu_emgSBWQUAwZCt-q-138XEQ7` (the brief's link renders "emg" like "emq": the q-version 404s). 27 min 1080p, multi-cam game show,
saved as `public/fomo/fomo.mp4` (gitignored). Transcript in /home/user/dl/fomo (small.en full; medium.en for the clip ranges).

## Brief rules (all must hold or the clip isn't paid)
- ONLY footage from the current focus video; no outside footage (so no cut-outs). Approved creators: Insentos, Maurits, Orangie.
- **8-second rule:** every clip has ≥ 8 continuous seconds of the source and that footage is the point.
- What to clip: game moments (guesses, reveals, wrong calls), numbers said out loud, hot takes (money/crypto), banter.
- Edit: hook in 2 s (craziest line first, then rewind and let it play); BIG captions word by word, white text + black outline; zooms/cuts on beats, no dead air; 9:16 crop on whoever talks; every clip different.
- NO slop / no misrepresenting: the hook must match what happens, no invented net worths, made-up quotes or fabricated backstories, never edit a line to change its meaning, never frame FOMO or the creators negatively.
- Post caption must mention **@fomo**; on Instagram also tag @fomo on the post. Platforms: TikTok, IG Reels, YT Shorts. $2/1k views, $300 max, 40 %+ Tier-1 audience.

## Build
- `scripts/main_face_track.py`: main-face track for multi-cam sources (largest face every 200 ms, reset on scene cuts) → Jorho track with M = that face; all shots 'M'. The crop keeps the source's own burned-in captions (bottom) out of frame.
- Captions: `chunkWords(..., 180 ms, 11 chars)` (word by word, pairs only for very fast words), all white, `capSize: 78`. Unclear audio is CUT rather than guessed ("Ransom is cousin", "Temu Rasma", "FOMO Eyes").
- Punch-ins (`camFx`, 1 → 1.14) on the big lines, a flash at the rewind, quiet music, no SFX. `speechGain` 1.4–2.0 (the source mix is quiet) → −13.5…−14.6 LUFS.

| comp | out | moment (source) | hook | continuous source |
|---|---|---|---|---|
| FomoReveal | fomo_wrong_fake.mp4 (21.0 s) | the reveal 25:21–26:01: the panel picked #2, the real fake is Iron Man (#3), confirmed on frames | "Yes, I am!" | 17.4 s |
| FomoBowling | fomo_bowling_alley.mp4 (14.4 s) | 5:49–6:02 "dumbest thing you ever bought?" → bowling alley, lost the $100K deposit | "…and I lost 100k deposit, so that was pretty stupid" | 12.6 s |
| FomoLoss | fomo_400k_down.mp4 (18.7 s) | 4:44–5:03 down a $400K cost basis on a coin that's down 98 % ("if I name it, it'll dox me", "it's just tuition") | the $400K line | 8.45 s |
| FomoChainlink | fomo_chainlink_2026.mp4 (22.6 s) | 10:23–10:46 Chainlink as a long-term hold → "IQ check" → his oracle-data defence → "respect the thesis" | the IQ-check line | 10.0 s |
| FomoRansom | fomo_who_is_ransom.mp4 (23.0 s) | 9:36–10:04 "I love Ransom" → "Who the heck is Ransom?" → "No, no, Ansem… dogwifhat at 30 mil" | "This guy just said Ransom… who the heck is Ransom?" | 13.7 s |

Note: I did not put creator names on screen (I couldn't confirm which panelist is Insentos/Orangie). The clips centre on the game and the panel, not on Brez.

## Feedback round 1 (2026-11-14)
User: "keep the tracking for the interview because the camera keeps moving, also make sure the videos are hooking and have a purpose so the audience stays and watches".
- `main_face_track.py --static`: ONE locked framing per shot (median face of the shot), re-framing only on a source cut, so the crop no longer drifts with every head move.
  In the reveal's line-up shots the biggest face isn't the point, so those samples (25:44.8–25:49) are pinned on Iron Man (x 725, y 265).
- Purpose: after the hook a stakes pill "REAL MILLIONAIRE OR THE FAKE?" (reveal: "7 'MILLIONAIRES' · 1 IS FAKE"); the last 1.9 s pay it off with the
  TRUE answer from the show's reveal ("HULK/THANOS WASN'T THE FAKE ✅", reveal: "THE FAKE WAS IRON MAN 🎭"), so the viewer stays to find out.

## Feedback round 2 (2026-11-14)
User: "the last two clips are good (Chainlink, Ransom), but edit 3 clips that appeal to the general viewer, funny parts, not just the money/business talk" + "keep the spoilers away and stop covering the video with cards, keep the edit interesting though".
- **All cards removed** from every FOMO short (no stakes pill, no verdict card: "HULK WASN'T THE FAKE" spoiled the ending). Only the captions sit on the video.
- Kept it lively without overlays: a slow push-in across every segment (resets on each cut) plus snap punch-ins (×1.16) on the punchlines and the flash at the rewind.
- **Burned-in source captions = ground truth** for wording. Where whisper and the source disagree (whisper "45 minutes" vs the burned-in "35 minutes", "Can you stand next to him?"), the burned-in caption wins; unclear bits get no caption.
- Hooks must match what happens: the ice bath title is the panel's reaction "35 minutes in the ice bath?!" (he actually said sauna 12 min + ice ~2 min; the panel misheard).

| comp | out | moment | hook |
|---|---|---|---|
| FomoIceBath | fomo_ice_bath_35_minutes.mp4 (22.6 s) | 22:39–22:59 Iron Man's routine: ice bath → "That's some shit a LARPer would say" → "35 minutes?" → "No, like sauna 12 minutes, ice for like two" | "Oh, he thought he said 35 minutes. I'm like, dude, how are you here?" |
| FomoYoungMaurits | fomo_young_maurits.mp4 (19.3 s) | 19:06–19:23 "call him young Maurits" → Maurits stands back to back with the lookalike (WIDE shot for the height check) → "This is his little brother" → "what do you tell people you do?" | "Look, bro… this is his little brother" |
| FomoAvocado | fomo_avocado_farmer.mp4 (17.3 s) | 18:49–18:55 + 19:31–19:39 "do you tell dates you're in crypto?" → "avocado farmer, or kangaroo boxing, or sperm race" | the avocado line |
