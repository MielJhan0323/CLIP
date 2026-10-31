---
tags: [style, card-pull, justinaugh]
date: 2026-10-31
---
# JustinAugh style (card pulls)

User (2026-10-31): new card-pull style called **justinaugh**. Refs: Drive folder `1cK3c4cmen36eYm6MJTE_F-3hJ416M5_l` (1025(2) Bulls mascot / Gus Williams→Jordan, 1025(3) superfractor for free, BYBB gameworn logoman, GOD PACK pokemon). Hooks: Drive `1DnNI_zX5q7eWpiDOP75SnCMDWNC5xYkI` → `public/hooks/` (22 clips).
Measured at full res (1080x1920, 30 fps): scene detection, per-frame luma, Demucs stems, whisper, spectral fingerprints against ~5,300 myinstants sounds.

## Structure (15–22 s)
1. **Hook (0–~3.5 s):** green-screen hook clip, full frame. A **voiceover hook line** is said over it ("This moment was so legendary, the Chicago Bulls mascot had to celebrate", "This guy just got a superfractor for free?"); the hook clip's own scream comes through after / under it. We use Alex for the line (card-pull rule). Some refs show the card **blurred** under the hook.
2. **Strobe burst into the stream** (see transitions).
3. **Stream:** card cam fills the frame, **host cam as a PiP with a yellow border** (#F2FA04, rounded) on top. A **red circle** (~12 px, pure red) on whoever reacts + a **chunky red arrow** from the lower left, jabbing. Sometimes a 0.5–1 s cut back to a hook-clip scream mid-pull.
4. **Reveal:** white reveal flash → blurred, zoomed stream behind the **sharp card**, **"INSANE PULL"** (white + red) with **🔥🔥** above, price in **glowing green** ("3-5K USD", "8,000 USD", "15,000 USD+", or "+??? USD" for pokemon) and a big **😱** under it, falling money bills.
5. Back to the stream for the reaction; end on a finished sentence (god pack ends on a meme video with a double-exposure crossfade).

## Text
- **Banner** (whole video): white box, **Montserrat Black uppercase**, black text with keyword colours: green `#00AB01` (JUST / FREE / PULLED), red `#FA0001` (GOAT / SUPERFRACTOR / CHICAGO BULLS MASCOT), yellow `#F2FA04` with a black stroke, blue `#0283E4`. iOS emoji at the end (🤯😳 / 🥺). Square corners for the hook banner, rounded for a second banner lower down. Sits top (y≈100) or lower-middle.
- **Captions:** ONE word at a time, uppercase Montserrat 800, ~80 px, centre of the frame. Colours cycle cyan `#06FCF9` / yellow `#F2FA04` / green / white with a **neon glow** + hard dark drop shadow (no outline). Small pop (3 frames). They follow the voiceover in the hook, then the hosts.
- Price: Montserrat Black, green `#02D204`, darker green stroke, strong green glow.

## Transitions (per-frame luma)
| kind | where | curve (white layer opacity per frame) |
|---|---|---|
| **cut flash** | frame 0 + almost every cut | 1 on the cut frame → .8 .62 .45 .3 .17 .07 (gone in ~6 frames) |
| **strobe burst** | hook → stream | 2–3 triangle pulses (.45 .75 1 .75 .3) 6 frames apart; the cut is inside a pulse |
| **reveal flash** | the reveal | .6, then white held 4 frames, then .85 … .05 over ~8 frames; the price appears inside the white |
The white layer is drawn **over everything** (banner and captions wash out too). BYBB adds a zoom-blur + chromatic smear into the reveal flash.

## Sound (myinstants, identified)
| sound | file | where | proof |
|---|---|---|---|
| intro ding | `awkward-moment.mp3` → `sfx/ja-ding.mp3` | frame 0 in 2 refs, some cut flashes | partials 732/7653/1038 Hz = ref 731/7655/1040, mel corr 0.82 |
| cut-flash hit | `camera-flash-sound-effect.mp3` (= `jorho-flash`) | white cut flashes + strobe pulses | mel corr 0.79 |
| BYBB 11 s ding | `ding-1.mp3` | one ref | 2642 + 6869 Hz |
| reveal shine (6.9/3.9/10.5 kHz) | **not found** on myinstants (best "sonic ring", 2 of 3 partials) | price reveals | we use `cha-ching` there |
Music is a quiet bed (~−30 dB, ~15 dB under voices); couldn't be identified (chroma not decisive). We use the phonk rotation with the drop on the reveal. No bass-boosted vine boom.

## Code
- `src/justinaugh/kit.tsx`: `WhiteFlash` (`cut` / `burst` / `reveal`), `Banner`, `OneWord`, `RedCircle` (tracked + arrow), `Footage` (crop a source through a timeline), `PipFrame`, `Reveal`, `MoneyRain`.
- `src/justinaugh/clips.tsx`: demo `JaOhtani` (Ohtani superfractor auto 1/1, $80K; hook `holy_scream`; Alex lines 1 + 3 of `narr/ohtani_loud.mp3`; Funk Sigilo drop on the reveal) → `out/justinaugh_ohtani.mp4` (18.0 s).
- New clip = copy `JaOhtani`: set hook file, stream segments, reveal ms, card still, price, banner, host track (`scripts/track.py`), narration ranges, music.
