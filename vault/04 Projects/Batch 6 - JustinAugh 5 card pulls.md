---
tags: [project, batch, card-pull, justinaugh]
date: 2026-11-01
---
# Batch 6: 5 Backyard Breaks card pulls in JustinAugh style

User ask (2026-11-01): "edit me some byb card pulling clips using justin augh style" → "make 5". Built with the factory `makeJa()` in `src/justinaugh/batch.tsx` (same recipe as JaOhtani v2: zoom whips + fast-whoosh on cuts, low flashing, yellow PiP, blurred card, soft reveal flash, INSANE PULL card, red circle on the reaction).
Reused the verified reveal times, cuts, card stills and **existing Alex narration takes** from batch 2/1 (no new ElevenLabs credits): line 1 = hook voiceover, the price line = hype over the reaction.

| comp | out | card | hook clip | banner (no names) | music (drop on reveal, LUFS-based gain) |
|---|---|---|---|---|---|
| JaMahomes | ja_mahomes_kaboom.mp4 (17.2 s) | Mahomes Green Kaboom auto 1/1, $100K | thats_the_goat | THEY SAID RECORD THIS / A $100,000 1/1 🤯😳 | Montagem Uranium 37.0 s |
| JaFlagg | ja_flagg_papa.mp4 (22.2 s) | Cooper Flagg Papa auto 1/1, $100K+ | rise_up | ONE PACK. ONE SHOT / AT A $100,000 ROOKIE 😮🔥 | Funk Abnormal 43.7 s |
| JaLebron | ja_lebron_logoman.mp4 (19.9 s) | LeBron James Logoman, $350K | the_greatest_player | THIS PRODUCT HAS ONE / $350,000 CHASE CARD 👀😳 | Acido III 64.2 s |
| JaStarwars | ja_starwars_triple.mp4 (21.1 s) | Obi-Wan / Anakin / Padme triple auto 1/1, $12K+ | trip_mind_boggling | A TRIPLE AUTO 1/1 / FROM FAR, FAR AWAY 🌌🤯 | Amor Na Praia 13.5 s |
| JaDart | ja_dart_papa.mp4 (18.9 s) | Jaxson Dart Papa auto 1/1, $200K+ | no_way_he_did_it | RELEASE DAY PAID OFF / $200,000 ROOKIE 1/1 🤯😳 | Vem Pere Reka 63.5 s |

## Notes
- Music: bed −28 LUFS before the reveal, a short lift to −22 for the reveal card, then −27 (voice ≈ −13.5 LUFS).
- Bug fixed: a `blurFrom` inside a cut region used to map to output 0 (blurred from the start) → now starts at the next kept segment.
- Dart narration has 5 lines (older format); used "Then, this card slid out." as the hook line (line 1 was a weak hook).
- Disk filled up mid-batch from Remotion bundles in /tmp (see [[Environment notes]]).

## Feedback log
- (waiting)
