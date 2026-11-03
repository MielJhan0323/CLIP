---
tags: [project]
status: v3 in progress
---
# Project: NBA GOAT pick (Backyard Breaks clip)

Back to [[START HERE]]

- Source: Google Drive file `1mTForun8TLZYBuwQgihxF00SlT2Gub9E` → `public/input.mp4` (1920×1080, 23.976 fps, 18.8 s).
- Output: `edited.mp4` (repo root), 1080×1920.
- Same show as [[Reference Shorts#Ref A — Backyard Breaks podcast clip (same show as the user's footage)|Ref A]].

## Who sits where (x in the 1920-wide frame)
| Seat | x | Role in this clip |
|---|---|---|
| Left (black KINGS KNEE tee, headband) | 370 | asks the question |
| Middle (brown hoodie, black cap) | 960 | answers "Matthew Dellavedova" |
| Right (black tee, headband) | 1490 | "I can feel the tension" |

## Real speech timing (audio-verified, source ms)
| Phrase | Start–end |
|---|---|
| Bring it up, but I want to ask you the question before | 20–1800 |
| Who is your NBA GOAT? | 2300–3560 |
| NBA GOAT? (middle, repeating) | 4400–5340 |
| Greatest of all time NBA player (left) | 5560–7400 |
| *silence / thinking / sigh* | 7400–13480 |
| Gotta be Matthew Dellavedova | 13480–14950 |
| *everyone laughs* | 14950–17400 |
| I can feel the tension | 17500–18700 |

## Feedback log
1. **v1:** generic captions. User: "You didn't copy the references editing style."
2. **v2:** stacked layout, flash, emoji, hook. User feedback:
   - use **iOS emojis** (v2 used Twemoji)
   - **captions weren't timed properly** (whisper.cpp timestamps were up to 2 s early → now audio-verified)
   - **add music**, **add SFX**
   - use **the same font as the reference (the glowing one)** and its **keyword colors**
   - before editing: research 50 meme/brainrot/clipping Shorts and save everything in this vault
3. **v3:** user: whoosh sound "not good" → swapped to `fast-whoosh.mp3`, peak lined up on the cut. **Always send the finished video file directly in chat.**
4. User: different ding → `ding-2.mp3`; **louder background music** → bed volume roughly doubled.
5. User: **more memey music** → Jeopardy think music under the question/silence, Curb Your Enthusiasm credits from the laugh to the end.
6. User: **only one bg song throughout, louder**, try the **Du bist gut genug** meme song → looped for the whole video.
7. User: **podcast layout like TpwR9FMWQg4** (black bars + plain top caption), but **keep our edit style** → added the box, "Do you agree with this? 💀", and Kobe/LeBron/Jordan + Dellavedova cut-outs. Dropped the hook title swap and the `*MATTHEW DELLAVEDOVA*` label (it overlapped the caption).
8. **v3 (first render):** see the edit plan in `src/edit.ts` and the summary below.

## v3 edit summary (16.0 s)
| Out time | Source | What happens |
|---|---|---|
| 0.0 | 0.0 | Stacked: wide top with **red circle** drawing around the middle guy, asker close-up below. Hook "WAIT FOR HIS NBA GOAT PICK…" (yellow glow). Whoosh. Music: Sneaky Snitch (ducked under speech). |
| 2.3 | 2.3 | Cut to asker. "WHO IS YOUR" → **NBA** (yellow) **GOAT?** (green) + 🐐, punch-in, ding. |
| 3.6 | 3.6 | Cut to middle guy reacting. |
| 4.4 | 4.4 | "NBA GOAT?" repeated in disbelief: tight punch-in + 😮 + **record scratch**. |
| 5.6 | 5.6 | Asker: **GREATEST** OF ALL TIME / **NBA** PLAYER 🏀. |
| 7.4 | 7.4 | Stacked again: `*THINKING...*` 🤔 + **crickets**, music up in the gap. |
| 8.9 | 8.9 | Tight on middle guy: `*SIGHS*` ⏳. |
| 9.7 | 12.5 | **Jump cut** (3 s of dead air removed) + whoosh. |
| 10.7 | 13.5 | **Music cuts to silence.** "GOTTA BE" → **MATTHEW** (yellow), punch-ins get tighter. |
| 11.6 | 14.4 | **DELLAVEDOVA** (green, big): **vine boom**, screen shake, green flash + bokeh, 💀 slams onto the table, `*MATTHEW DELLAVEDOVA*` label on the split; hook swaps to red "BRO REALLY SAID THAT 💀". |
| 12.15 | 14.95 | B&W punch on the asker laughing: camera shutter, then "AURA -10000" 💀 + error beep. Music: Monkeys Spinning Monkeys. |
| 12.9 | 15.7 | Wide shot over blurred fill, `*LAUGHS*`, floating 😂😭💀. |
| 14.65 | 17.45 | Right guy: "I CAN FEEL" / "THE **TENSION**" (red) 😬. |

Audio: dialogue at 0.85, music ducked under speech, SFX at their onsets, final `alimiter` pass (the source is mastered to 0 dBFS, so the mix clipped without it).

## Jorho version (2026-11-01): `JorhoNbaGoat` → `out/jorho_nba_goat.mp4` (15.2 s)
User: "edit the trevor's nba goat clip… using jorho style". Built with the top-performer formula:
- light look, paradox top line "His NBA GOAT has never been an All-Star 💀" (Dellavedova was never an All-Star; doesn't spoil the name);
- beep pause before the name (here it fits: a name reveal), Jorho strobe on "Matthew Dellavedova";
- crickets on the thinking silence (awkward), **fahhh** after "Dellavedova" (crazy statement), red tint + 💀 on the laugh;
- meme pops under the box: LeBron cut-out on "GOAT?" (the expected answer), Dellavedova cut-out on the reveal, 💀;
- Du bist 14 dB under; footage `public/pod/nba_goat.mp4` (Drive `1mTForun8TLZYBuwQgihxF00SlT2Gub9E`); static seat track L(440,488) M(980,460) R(1490,505).
- **v2 (user: remove the beep, stop overusing beep + Du bist):** no beep/hold; **Jeopardy Think** under the question + thinking silence with a hard stop before "Gotta be" (`music.until`); **Curb Your Enthusiasm credits** (`sfx/curb-credits.mp3`, starts 600 ms in) on the laugh; fahhh + crickets kept. 15.1 s → `out/jorho_nba_goat_v2.mp4`.

## Jorho v2 version (2026-11-03): `B9NbaGoatV2` → `out/b9_v2_nba_goat.mp4` (15.1 s)
Assets picked for this one (none of the earlier NBA GOAT edits' Jeopardy/Curb/arrow/crickets): YouTube card "Who is Trevor Lawrence's NBA GOAT?", typed *thinking…* on the silence, strobe on "Matthew", **GOAT CHECK table** (Jordan 5 MVPs / 6 rings, LeBron 4 / 4, Dellavedova **0** / 1 in red, counting up, `src/jorho/batch9.tsx`), fahhh after the name, Midnight Club bed (hard stop before "Gotta be"), title "His NBA GOAT has 0 MVPs 💀". No loudness spikes.
- **v2 of the Jorho v2 edit (user 2026-11-03):** "add a jackpot box spinning at the center bottom like we spun a wheel on the players, and the technical sound when he's thinking" → `SlotBox` in the bottom bar: idle `? ? ?` from the question, reels spin GOAT names (Jordan, LeBron, Kobe, Curry, Magic, Bird, Shaq, Kareem, Duncan, Wilt, Hakeem, Giannis) during the silence, slow down and land on DELLAVEDOVA exactly on "Matthew" (never peeks early), lights blink + glow after. Sounds (myinstants): `sfx/slot-spin.mp3` ("electric slot machine") under the thinking, `sfx/slot-jackpot.mp3` ("fnv jackpot") on the land. → `out/b9_v2_nba_goat_v2.mp4`.
