---
tags: [style, podcast, jorho]
date: 2026-10-31
---
# Jorho style (v2, measured from the real videos)

**Sources:** four Backyard Breaks Daily Trevor Lawrence Shorts that the user shared on Drive (360x640, 30 fps, about 15.1 s each). All are from the same wig session as our footage:
- `ref0` "Imagine being so popular people gift you your card";
- `ref1` "Imagine having an NBA Goat thats not LeBron fr";
- `ref2` "This player is elite ball knowledge!";
- `ref3` "Davis Mills be like: Why u bully meh".

**How it was measured:**
- per-frame pixel measurements (box edges, brightness, tint colour by linear fit);
- Demucs (htdemucs, two stems) to split voice from music+SFX;
- spectrograms, onset detection and band envelopes on the stems.

Every number below comes from that, not from eyeballing. YouTube itself is not downloadable from this box (bot check), so the user drops reference videos on Drive.

## Layout
- **Background:** black.
- **Video box:** y **417 → 1494** (1077 tall, vertically centred), full width, no border.
- **Top line:**
  - Montserrat **Bold 700**, ~58 px, line pitch 65 px, white, centred, max width about 900 px, no stroke or shadow;
  - its last line sits **3 px above the box** and moves with it;
  - sentence-case meme take ending in an iOS **💀** at about cap height ("…fr💀", "be like:", "Imagine…").
- **Bottom bar:** empty.

## Intro (identical in all 4, frames 0–24)
- The box opens like a mask from **700 → 1077 px tall**, centred. Measured top edge at frames 0, 3, … 24: 609, 573, 537, 504, 474, 450, 432, 420, 417.
- The top line rides on the box.
- The footage starts **blurred and blown out** (with a horizontal smear) and is clear by about frame 16–18.
- The first spoken word is already on screen at frame 0.
- **Beep pause is optional** (user, 2026-11-01): only when a name or reveal word really benefits from it.
- **Sound:** a 2642 Hz "ting" at frame 0 (pure tone, faint partial near 6.9 kHz, full level at once, decays about 35 dB over 1.3 s).

## Captions
- One word at a time, exactly on the word, staying until the next word.
- Montserrat 800, about 58 px, thin dark outline plus a soft dark shadow.
- **Colours** (measured): yellow **#F9FC35**, cyan **#21F5E6**, green **#58EE28**, white. They look random per word (repeats allowed).
- **Entry:** 2 frames of horizontal motion smear, then sharp. No pop, no scale bounce.
- **Height varies per video** (centre y 1100–1230), placed on the subject's chest/table line, fixed for the whole video.

## Effects (all land on music beats)
1. **White strobe:** an 11-frame preset. Brightness per frame relative to normal: +.6 +.45 +.7 +.85 +.85 +.85 **dip** +.95 +1 +1 +.95. Blown highlights (50–70 % of pixels clipped). **The shot changes on the dip frame (frame 6)**, so the strobe works as a transition. Sound: a loud, bright, short noise hit (spectral centroid 3.5–4.4 kHz, ~0.1–0.2 s, a little low end), peaking around −2 dBFS.
2. **Green tint:** rgb(**167,234,4**), normal blend at **62 %**. Envelope: 3 frames in (0.21 / 0.42 / 0.62), 3 held, 3 out. Used on names and hook words, in quick rhythm early in the video. Sound: a short swish (noise burst, ~0.25 s), and sometimes the ting again.
3. **Red tint:** rgb(**244,3,5**) at 62 %, same envelope. Used on laughs ("hahaha", "your"). **Silent.**
4. **Cut-out photo** (Dellavedova in ref1):
   - **Entry:** under a green tint. Frame 0 is huge with vertical streaks, then it settles over about 10 frames from 1.5× scale, blurred and washed in yellow, down to normal.
   - **Look:** a solid yellow-orange outline (~4 px). It stands on the bottom of the box over the hosts, and captions stay on top.
   - **Exit:** blinks on/off for about 8 frames while sliding right.
5. **Framing:** hard cuts between the wide shot and a tight one (~1.6×) on whoever reacts. No animated zooms.

## Sound mix
- Voice on top.
- **Music 14 dB under the voice, always** (user, 2026-11-01: "audio shouldn't distract from the content"). `musicGain()` in `clips.tsx` sets it per file from measured LUFS (voices ≈ −13.5 LUFS → music −27.5). Add new songs to `MUSIC_LUFS`.
- SFX lowered too: ting 0.38, flash 0.45, swish 0.3, beep 0.25.
- Background music **about 10 dB under the voice**, running the whole time. Two refs share one ~82 BPM track; the other two are ~123–129 BPM. The tracks are not in our library (chroma match failed), so we pick by tempo:
  - ~81 BPM → **Blue** (half-time);
  - ~125 BPM → **Du bist (full)**.
  - **User tracks (2026-11-01):** `jorho-qkthr.mp3` (user upload "QKThr", 87.5 s, ~63 BPM, slow; strong beat 28003) and `jorho-lullaby.mp3` (user upload, "Instant Sleep… 1Oneam Lullaby", first 180 s, ~83 BPM, calm; beat 59977). Both loudnormed to −14 LUFS → use level ≈ 0.42.
  - **Rotate: don't reuse one song across a batch** (user, 2026-11-01). Spread Du bist / Blue / QKThr / lullaby, and use different sections when one repeats.
- Edits snap to the beat: the main strobe lands on a beat (`songFrom = beat − strobeOut`).
- Sound effects come from myinstants.com, never self-made (user rule): `jorho-ting` = "proper ding" (peaks at 2642 Hz, the same as the refs), `jorho-flash` = "camera flash flash" (centroid ~3.7 kHz), `jorho-swish` = "swoosh sound effects". All are in `public/sfx/`, with leading silence trimmed.

## Code
- `src/jorho/kit.tsx`:
  - `Frame` (intro reveal + top line);
  - `wordsFrom` / `OneWord`;
  - `strobe()` + `STROBE_CUT`;
  - `Tints` with `GREEN` / `RED`;
  - `Cutout`.
- `src/jorho/clips.tsx`: a `Spec` per clip (timeline, shot list in output time, strobes, tints, swishes, cut-out, music) rendered by one `Jorho` component.
  - `JorhoPeyton`: u4, "Imagine having Peyton Manning on speed dial".
  - `JorhoGolf`: t2, "Trevor's dream golf foursome is undefeated".
  - `JorhoRedeem` (u3) and `JorhoCoen` (u6).
  - Batch 5 (2026-11-01): `JorhoLefty`, `JorhoTicket`, `JorhoCelly`, `JorhoTigerGift`, `JorhoEnters`. See [[Batch 5 - Jorho Trevor clips 2]].
  - Batch 4 (2026-10-31): `JorhoAnt` (t1), `JorhoJosh` (t5), `JorhoTrav` (t3). See [[Batch 4 - Jorho Trevor clips]].
- A spec can have `cuts: [...]` (several cut-outs), e.g. the wrong Josh Allen → the real Hines-Allen gag.
- Cut-outs go on the **right side of the box** (x ≈ 560–640, h 420–520), so they don't cover the speaker or the caption.
- Keep the top line to **2 lines with the 💀 on the last line**; a 3rd line holding only the 💀 looks broken.
- Cut-outs are made from Wikimedia photos with rembg `u2net_human_seg` and stored in `public/img/jorho/`.
- Wikimedia rate-limits hard: use a descriptive User-Agent and wait about 60 s between retries.
- v1 (made from thumbnails only) is superseded.

## SFX identified in the references (all on myinstants.com)
Method:
- 4-stem Demucs split;
- peak-constellation fingerprint plus windowed mel correlation of about 500 myinstants sounds against the drums/other stems;
- checks: pitch for tones, transient spacing for multi-hit sounds.

| sound | myinstants file | where in refs | proof |
|---|---|---|---|
| intro ting (also some green tints) | `proper-ding_IbfMQYw.mp3` → `jorho-ting` | frame 0 in all 4; ref0 8.0 s | tone exactly 2642 Hz, same line in the spectrogram |
| white strobe hit | `camera-flash-sound-effect.mp3` → `jorho-flash` | ref0 1.74, ref3 1.04, ref1 7.73 | 53-peak fingerprint, 40–55 % matched at the strobe frames |
| green tint / cut-out entry swoosh | `roblox-swoosh-hd.mp3` → `jorho-swish` | ref3 1.79 / 2.90 / 4.29, ref1 11.5, ref2 11.2 | mel correlation 0.81–0.85 exactly on the tints |
| suspense beep before a name | `04357.mp3` (1 kHz, 0.57 s) → `jorho-beep` | ref1 2.53–3.10 ("gotta be… [beep] who") | pure 1000 Hz tone, 0.57 s |
| red tint | none | | silent |

The beep goes on a **480 ms freeze-pause** right before the name drops (a timeline hold); the strobe/cut-out lands after it.


# ⭐ Top performer: "He really got gifted himself" (gift_ticket.mp4, user upload 2026-11-01)
User: "this clip did better than all the others. Find what made it work and copy it, or adapt it, for the next videos." Contact sheet: `assets/references/jorho_top_gift_ticket_sheet.jpg`.
Source: t4 natty ticket (same moment as our JorhoTicket). 16.9 s, 1080x1920.

## What it does (measured)
- **Layout ("light" look):** a blurred, zoomed copy of the video fills the whole frame. A **white band (y 191–474)** holds the top line in **black Montserrat caps**, "HE REALLY GOT GIFTED HIMSELF 😂🎟️". The video box sits at **y 475–1444**. No black bars.
- **Opening:** starts on the **first word of the story** ("So look, I actually brought you a gift…") with a white flash (1 → 0 over ~8 frames) and a ting. No pre-roll, no box-opening animation.
- **Captions:** one uppercase word at a time (yellow/green/cyan/white), at the lower part of the box.
- **Meme pop-ups, each on ONE trigger word, in the lower blur area:** a real **Santa cut-out + red arrow** on "gift"; a big **iOS 💀** on "gifting you… with you" (the absurd line); **falling real money** on "national championship".
- **Camera:** one punch-in to Trevor's face for his reaction ("two weeks ago"), one motion-blur whip on "but", two white cut flashes (9.8 s, 13.6 s). That's all.
- **Ending:** cuts right after Trevor's genuine "this is awesome": a finished line and a real emotion.
- **Audio:** soft ~83 BPM bed **15.7 dB under the voice**. Only 2 SFX (ting at 0, one hit on the money).

## Why it beat the others (our read)
1. **The top line is a paradox** ("got gifted HIMSELF"). The viewer can't resolve it without watching, and the clip resolves it in ~10 s.
2. **One complete arc in < 17 s:** setup ("I brought you a gift") → absurd twist ("it's you… gifting you with you") → payoff (signed natty MVP ticket) → genuine reaction. No filler.
3. **Wholesome + funny together:** a real emotional payoff, not just a joke.
4. **Jokes you can read instantly:** each meme visual literally illustrates the word being said (gift → Santa, weird → 💀, championship → money). No explaining needed.
5. **It looks native and clean:** the white band + blurred fill reads like a normal Short, not an "edit". Effects are rare, so each one lands.
6. **Short and quiet:** high completion, it loops, and the music never competes.

## Formula for the next Jorho videos (copy or paraphrase; don't clone)
- **Top line = a paradox / irony / "imagine" that the clip resolves.** Patterns:
  - "He really got ___ by himself"
  - "Bro got roasted by his own ___"
  - "Imagine ___ing yourself"
  - "Only Trevor could ___ his own ___"
  - "The one thing Trevor doesn't own is ___"
  Keep it ≤ 2 lines, caps, + 1–2 iOS emoji that fit (😂🎟️).
- **Cold start on the first word of the strongest story**; cut to a single arc of 15–18 s; end on the genuine reaction line.
- **2–3 `MemePop`s**, each on one trigger word, below the faces: real cut-out + red arrow / big iOS emoji (💀 for the absurd line) / money for value. No sticker boxes.
- **Restraint:** ≤ 1 punch-in (the reaction), ≤ 1 whip, ≤ 2 cut flashes, ≤ 3 SFX. Beep pause only if it truly fits.
- **Look:** use `light: true` (white band + blurred fill) for wholesome or gift moments; keep the black-bar look for roasts and hype, so the feed isn't all one look.
- **Music:** calm ~80–85 BPM bed (Blue / the lullaby / QKThr), 14–16 dB under the voice.

## Code
- `Frame` takes `light` (white band + blurred fill + white flash-in, measured above); set `light: true` on a Jorho `Spec`. Test comp `JorhoTicketLight` (layout check on the same source, not a deliverable).
- `MemePop` in `src/jorho/kit.tsx`: iOS emoji PNG or cut-out popped on one word.

## Demo of the formula (2026-11-01): `JorhoFormulaAnt` → `out/jorho_formula_ant_demo.mp4` (15.7 s)
t1 ant-autograph roast, adapted (not cloned): paradox top line "His autograph is smaller than an ant 💀"; light look; one arc from "Some hobby players have no respect" → "his auto looks like an ant… this big" → "he's got a goated pen"; meme pops under the box (Richardson cut-out on his name, 🐜 on "ant", 💀 on "no respect") via the new full-frame `overlay` on the spec; 1 strobe (on "ant"), 1 green tint, no beep; Du bist 14 dB under.

## Music & beep usage (2026-11-01, user: "you're overusing the beep pause and Du bist")
- Beep pause: off by default. Du bist: retired for now (it was in Ant, Wrong Josh Allen, Lefty v1, Celly v1, Enters, the formula demo, NBA GOAT v1).
- Spec supports `music.until` (hard stop before a punchline) and meme stingers through `extraSfx` (e.g. `curb-credits`).
- Mood picks: thinking/question → Jeopardy Think; awkward punchline → Curb credits stinger; goofy → Fluffing a Duck / Monkeys Spinning Monkeys; wholesome → Blue / lullaby / QKThr; hype → phonk. Gain comes from `MUSIC_LUFS` (add new files there).
