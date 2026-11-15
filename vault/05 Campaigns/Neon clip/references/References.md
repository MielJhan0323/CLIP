---
tags: [campaign, neon-clip, references]
date: 2026-11-14
---
# Neon clip references (HardScope R3born)

Every Neon clip we make is copied here: the final render (`.mp4`) and its contact sheet. Back to [[R3born Ep2 brief]] · [[Campaigns]].
**Before cutting a new Neon clip, watch the ✅ references first and match them.**

## THE Neon template = batch 2 (user 2026-11-14: "make those videos a reference")
The 5 batch-2 clips (bet, pilates, headstand, bathroom, results/wax) after the redo are the house style for Neon:
- **One funny moment**, cold open on its funniest line, then the scene in order, and it **ends ON the climax/payoff** (never cut before it).
- **Viral warm grade** (`grade: VIRAL_WARM`), steady wide framing, big captions above the show's own graphics (white + yellow keywords).
- **Calm visuals:** one freeze + fahhh on the roast (no flash), ONE red typed label (the roast), nothing else on screen.
- **Sound:** music low (~20 dB under the voice, `gain: 1, floor: 0.4`) or none when the scene has its own energy (Pilates); SFX layer kept: record scratch on the cold-open cut, short whooshes, 1–2 meme SFX + awkward `ja-ding`s, **all snapped into speech gaps**.
- 15–25 s, finished sentence, @hardscope + #r3born, no FaZe.
Code: `neon()` builder in `src/campaigns/neon_clip/neon.tsx` (NeonBet / NeonPilates / NeonHeadstand / NeonBathroom / NeonWax).

| status | file | what it is | why |
|---|---|---|---|
| ✅ **APPROVED: first reference** (user 2026-11-14: "good, that's a good first reference") | `neon_trial2_tracker_broken.mp4` | NeonCalories, 18 s: "103?! … that's impossible" hook → calorie check → "malfunction" → roast + fahhh → "only 60 more than me" | One subject, one moment, funny. Fused v1+v2: black-bar headline, big captions (yellow numbers), steady WIDE two-shot keeping the show's calorie counter in frame, 3 typed labels (*checks his calories* / *blames the tracker* / red *gets roasted*), ONE flash + fahhh on a 1.1 s freeze after the roast, music loud in gaps and ducked under every spoken line. |
| ❌ rejected: what NOT to do | `neon_trial_first_pole_class.mp4` | NeonPole, 23.6 s pole class | User: "kinda over stim, there's no hook and no focus". Strobe + tint + punch + label + rewind all at once, two subjects, no clear hook. |
| 🆕 awaiting feedback | `neon_obnoxious_excuses.mp4` | NeonObnoxious, 23.3 s (user: "make one more, N3on being obnoxious"): hook "to be fair, we're doing women's exercises" → he burns 50 vs Sarah's 100, "she crushed you" → "you have the genes of a woman" → the episode's *2 hours earlier* cutaway "I used ChatGPT… men burn more calories than women" (freeze + flash + fahhh, red *source: ChatGPT*) → "fourth-quarter comeback, I'm like LeBron James" | Built on the approved tracker template: steady wide shot (shifted to N3on, camera-left), typed labels, one flash + fahhh on a freeze, ducked music (Fluffing a Duck). Our captions switch off where the episode burns in "Producer: oh so you're good". |
| ✅ **APPROVED reference (batch 2)** | `neon_bet_armpit_wax.mp4` (18.4 s) | NeonBet: cold open "I'm waxing your armpit, N3on" → the punishment bet → "nothing impressive" roast (freeze + flash + fahhh) → "now I'm skinny fat" | Monkeys Spinning Monkeys |
| ✅ **APPROVED reference (batch 2)** | `neon_pilates_easy.mp4` (23.6 s) | NeonPilates: cold open "my abs are on fire / you're not even doing sh*t" (freeze + fahhh) → "so lost" → "a little slower, girl" → "what is a lat?" → "respect… literally impossible" | joyful chess |
| ✅ **APPROVED reference (batch 2)** | `neon_headstand_fear.mp4` (22.6 s) | NeonHeadstand: cold open "I just don't want my butt crack to pop out / there's nothing back there to look at" (freeze + fahhh, *violated*) → headstand → "why are you shaking?" → "I trust the former stripper, not Sarah" → "I did it!" | funk do balkan |
| ✅ **APPROVED reference (batch 2)** | `neon_bathroom_break.mp4` (21.8 s) | NeonBathroom: cold open "you know I'm a scammer, I'm a cheater" (freeze + fahhh) → "I gotta use the restroom" → back "tired" → "running around a pole, trying to burn calories?" → "no way that burned 50 calories, gang". **683.6–684.1 s is never used (slur).** | Investigations |
| ✅ **APPROVED reference (batch 2)** | `neon_results_wax.mp4` (22.3 s) | NeonWax: cold open "don't touch me, I'm gonna sue you / sue me, I got good lawyers" → 326 vs 389 "dumbass" (freeze + fahhh, *N3on lost*) → "I'll do calf" → "I'm so scared" → "three, two, one" — now runs THROUGH the wax (climax shown, 23.9 s) | Sneaky Snitch |

- (2026-11-14) Batch 2 redone after feedback ("stop cutting before the climax", "music too loud", "overstim, sfx good"): no flash, 1 roast label, music ~20 dB under the voice, SFX + awkward dings kept, wax clip now ends on the wax itself (23.9 s).

## Batch 3 (2026-11-14, "5 more N3on clips with insured virality") — awaiting feedback
Approved template + the calm viral lessons: curiosity titles, dead-air trims, music swell + boom on a reaction tail AFTER the last word. Code: `neon3()`.
| file | moment | ends on |
|---|---|---|
| `neon_pilates_question.mp4` (18.9 s) | "invented by a man in prison… was he straight?" (freeze + fahhh) → "you think this is gonna be easy?" | "I'm not losing." |
| `neon_tuck_contest.mp4` (22.0 s) | "who can hold their tuck the longest, 3, 2, 1, go" (the show's timers) → "Sarah, you are the winner" (freeze + fahhh) | "Really, dude?" |
| `neon_spiderman_silks.mp4` (22.3 s) | silks: "wide, wide, legs… keep going, Spider-Man… oh my god" → "this is what you were best at all day" | "…little boop-de-doop sh*t" |
| `neon_new_respect.mp4` (17.8 s) | "you're not looking at the actual technique… this is hard work, salute to you" | "especially him right there, my brother" |
| `neon_too_excited.mp4` (21.9 s) | "throwing money at strippers? no money is gonna be thrown" → "more excited for this than Pilates" → "I have been a stripper" (freeze + fahhh) | "Hell yeah!" |

## Feed edits (2026-11-15) — user: batch 3 was "hella boring, give me something you'd see on the feed and stay to watch"
Web research (no N3on-specific breakdowns exist; general streamer-clip practice) agreed with our measured 500K edit: frequent pattern interrupts
(speaker punch-ins / angle changes, flash cuts, motion blur), no dead air, meme overlays + sound hits on punchlines, readable on mute.
`neonFeed()` in `neon.tsx`: WIDE ↔ FACE cut every ~1.5 s, whip-blur first frame, 2–3 colour flashes, iOS-emoji pops on key words, red *N3on*
arrow once, louder meme SFX (still in speech gaps), fahhh freeze, VIRAL_WARM, loud ending after the last word.
Files: `neon_feed_pilates_question`, `neon_feed_tuck_contest`, `neon_feed_spiderman_silks`, `neon_feed_new_respect`, `neon_feed_too_excited` (awaiting feedback;
these replace the batch-3 calm versions).

## External viral references (2026-11-15)
The user's "Neon Ref" folder: [[Neon viral references]] (`external/`). New Neon clips copy THESE: full-screen 9:16, Anton captions (per-speaker colours), *ACTION* labels, green/red flashes held ~0.5 s, cuts on the speaker, a loud-ish music bed, B&W push-in on a loss.
