---
tags: [index]
---
# START HERE

This repo is a **Remotion + Whisper Shorts editing setup**, and this `vault/` folder is its memory (open it in Obsidian, or just read the Markdown). A new session should read this file first, then follow the links.

## What the user wants
Edit podcast/streamer clips into viral vertical Shorts in a **meme / brainrot clipping style**, copying the references they gave and the patterns from researching 50 top Shorts. They give feedback on each version, so check the feedback log in the project note before editing again.

## User preferences
- **Always send a title + description with every video.** The description should be a short story or in-depth explanation (about 3–5 sentences, not too long), followed by tags that boost reach: 8–15 hashtags mixing broad (#shorts #nfl) and niche (#trevorlawrence #jaguars), plus a few plain keyword tags. (2026-10-26)
- **Always send the finished video file directly in chat** (SendUserFile) so they can download it.
- iOS emoji only; Ref A glow font; whoosh = `fast-whoosh.mp3`, ding = `ding-2.mp3`.
- Music: **podcasts** → one meme song looped, loud (`du-bist-gut-genug.mp3`). **Non-podcasts** → the user's slowed Brazilian phonk list, drop timed to the big reveal (see [[SFX and music library#Music for NON-podcast clips (user's phonk list)]]).
- **Blur (and/or beep) cards until they're revealed**: makes viewers curious who was pulled. Don't name the player in the banner/hook before the reveal.
- Red circle must **really track** the face: use `scripts/track.py` (OpenCV CSRT), never hand-guessed keyframes.
- Add small punch-in zooms on key words (1.1–1.18×), only the relevant part of the frame.
- Big reveal = **green screen flash + falling money (💵💸💰) + ka-ching**, and it has to be **shocking**: white flash, shake, zoom slam, "1 OF 1" stamp. Before it, **build suspense** (slow-mo, heartbeat, riser, trembling zoom, vignette, "WAIT FOR IT", music cut right before the drop).
- **AI narration** (ElevenLabs) on card pulls, **ONLY the "Alex - Young American Male" voice** (`yl2ZDV1MzN4HbQJbMihG`); see [[Card pull playbook#AI narration]].

- **Length: every Short 15–25 s** (30 s is too long, never under 15 s; go a bit over only if the moment really needs it). (2026-10-25)
- **Card edits: open with a hook clip from the user's hooks folder** (Drive `1DnNI_zX5q7eWpiDOP75SnCMDWNC5xYkI`, local `public/hooks/`). (2026-10-25)
- **Music variety: don't reuse one song for every video.** Rotate through the user's phonk list for card pulls. Podcast music by mood:
  - funny → Du bist gut genug;
  - wholesome → "Blue" (Yung Kai), edited as a **W speed edit** in our usual style;
  - serious → phonk. (2026-10-25)
- **Podcast captions stay in ONE fixed spot** (66% down the video box). Never move them per shot; covering a face sometimes is OK. (2026-10-25, replaces the earlier "under the faces" rule)
- **Podcast: motion-track the speakers**: the crop follows the face of whoever is talking, never random people in the background. `scripts/seat_track.py` only accepts faces near the seat and at seated head height. When people walk around, use wide shots instead. (2026-10-25)
- **Hook clips are ONLY for card pulls**, never in podcast videos. (2026-10-25)
- **W Speed edits:**
  - freeze the screen (`scripts/insert_freeze.py`) and put a **gray overlay** on it;
  - the "W TREVOR ❤️‍🩹" caption lands on Blue's **"I'd imagine we fell in love / under moonlight skies with you"** (song 55.7–65.4 s; the freeze starts on 59.9 s);
  - the narrated action text (*TREVOR WALKS IN*) gets a **keyboard typing SFX** (`sfx/keyboard-typing.mp3`). (2026-10-25)
- **Let the speaker finish the story before the video ends.** End cuts on a finished sentence, even if it runs a bit past 25 s. (2026-10-25)
- **ElevenLabs retries: don't wait long.** If a call is rate-limited, retry after a couple of minutes, not 15–30. On 2026-10-25 an immediate retry worked and two back-to-back calls went through. (2026-10-25)
- **Podcast clips:** use the Ref C layout (black bars, video box, plain top caption "Do you agree with this? 💀", cut-out photos of people mentioned) **on top of** our normal edit style. See [[Reference Shorts#Ref C: podcast layout (user: "for podcast style videos make it like this")]].

- **New card-pull style "justinaugh"** (2026-10-31): see [[JustinAugh style]]. **Keep flashing low**: zoom whips + fast-whoosh on cuts instead of white flashes (2026-10-31).
- **Intro voiceover option for Jorho** (2026-11-01): an Alex line at the start ("Trevor Lawrence explains why…") over an opening shot, speech ducked under it, VO captions (spec `vo`). Use it when the clip needs context in the first seconds.
- **Sticker accuracy** (2026-11-01): labels, arrows and callouts that point at a person must be **anchored to the tracked face** (`overlay(o, face)` → `face('L'|'M'|'R')` gives the face in frame px from the seat track + camera crop), never hand-placed coordinates. Arrow tip ≈ face + (70, −90) with `flip`; head labels ≈ 300 px above the face. Check each pointing sticker on a still before rendering.
- **Asset hive mind** (2026-11-02): references add OPTIONS, not a checklist. Every video picks 2–4 fitting assets from [[Asset hive mind]], no repeated combos, no signature asset (arrow callout, YouTube card, editor comment, cut-out pop) in more than ~2 of 5 videos per batch; log usage there each batch. Don't overuse the arrow.
- **Jorho PLAYBOOK** (2026-11-01, from the 3 top performers): follow [[Jorho style#🏆 Jorho PLAYBOOK (combined: gift ticket + these 2 + all feedback)]] for every new Jorho clip.
- **Jorho top performer = "He really got gifted himself" (gift_ticket)** (2026-11-01): paradox top line, one complete arc ≤ 17 s, 2–3 literal meme pops on trigger words, light look (white band + blurred fill), very few effects. Use that formula (adapted, not cloned) for next Jorho videos. See [[Jorho style#⭐ Top performer]].
- **Awkward SFX in some videos** (2026-11-01): on awkward pauses, cringe answers, silences or weird reveals use `ja-ding` (myinstants "awkward moment"), `crickets` (dead silence) or `taco-bell-bong` (awkward reveal). Jorho spec `awkward: [{at, sfx}]`. Only where a moment is really awkward; not every video.
- **"Fahhh" on roasts** (2026-11-01): put `fahhh.mp3` (myinstants) right after jokes made at someone, shots taken at other people, or crazy statements; ~1.5 s, under the voice (Jorho spec `fah: [ms]`). One per joke, not on every line.
- **Stop overusing the beep pause and Du bist gut genug** (2026-11-01): the beep is OFF by default (≈ 1 in 10 videos at most). Du bist was in 7 Jorho edits, so retire it for a while. Rotate the music: Jeopardy Think, Curb credits (stinger on an awkward punchline), Fluffing a Duck, Monkeys Spinning Monkeys, Blue, the lullaby, QKThr, phonk. Source new sounds from myinstants / SoundCloud when the pool feels repeated. Never use the same bed twice in a batch.
- **Beep pause only when it fits** (2026-11-01): a censor beep + freeze before a NAME or a real reveal word that builds suspense. Never by default, never in every video; it gets distracting and unfitting.
- **Scroll test** (2026-11-01): before rendering, watch the first 1–2 s as a Shorts scroller: would I stay or scroll? Open on the strongest/payoff moment (cold open), not a slow intro or a blurred card. Judge every beat the same way: does it keep me watching?
- **Emoji = real keyboard emoji only** (2026-11-01): iOS PNGs from `public/emoji-ios/` (Emojipedia Apple set) as images. Never type emoji into text (the browser font draws them and they look AI-generated/uncanny). Graphs, badges, notations are wanted; avoid assets that look uncanny.
- **Jorho v2** (2026-11-01): use the refs as a reference, but **don't make every edit look the same**; mix the graphics and sounds per clip, and source new generic edit SFX.
- **Music must never distract from the content: keep it ~14 dB under the voice, SFX modest** (2026-11-01).
- **Jorho music: rotate Du bist / Blue / the user's QKThr + lullaby tracks so songs don't repeat across a batch** (2026-11-01).
- **"Trevor Wallace clips" = the Trevor Lawrence Clips tab** of the sheet (2026-11-01).
- **Card pulls (stream clips from the Backyard Breaks sheet):** follow [[Card pull playbook]] (white banner hook, whip transitions, tracked red circle + arrow, card title stack with price).

## Map
- **Research**
  - [[Shorts analysis - 50 clips]]: the 50 Shorts, views, format, hook and edit notes for each
  - [[Hooks and retention]]: how they hook and keep viewers watching
  - [[Editing playbook]]: what SFX, effects and memes go when and where
  - [[Reference Shorts]]: Refs A–C (A = same show as their footage, C = podcast layout)
  - [[Card pull and clip refs D-G]]: SFX, red circle/arrow tracking, transitions (round 2 training)
- **Style guide**
  - [[Asset hive mind]]: every learned asset + when it fits + usage log; mix them per video
  - [[Caption style]]: font (Montserrat 800 + glow), keyword colors, iOS emoji
  - [[SFX and music library]]: every sound/music file, when to use it, licensing
  - [[Card pull playbook]]: template for card-pull stream clips
  - [[Edit3 kinetic storytelling compositing]]: **Edit3** (`src/E3Ant.tsx`): kinetic type + story graphics + text/photos behind the speaker; lessons from the 38% STW flop (no ad look, cold-open hook, sound design checklist)
  - [[Jorho v2 style]]: Jorho + explainer motion graphics; a toolbox, vary it per clip. **Approved reference edit: the PSA 10 celly v5** (cold open → YouTube card → typed action text → PSA scale → payoff loop)
  - [[Jorho style]]: copied from 4 Backyard Breaks Shorts: black bars, 💀 top line, one-word colored captions, punch-ins, exposure flash, meme cutouts
  - [[JustinAugh style]]: card pulls copied from 4 refs: VO hook over a scream clip, white cut flashes, yellow PiP, INSANE PULL reveal (`src/justinaugh/`)
  - [[Motion graphics podcast style]]: **preset Edit2** (`src/Edit2.tsx` + `src/plans/edit2/`), the motion-graphics podcast edit, plus research on 6 viral refs
- **Workflow**
  - [[Edit workflow]]: step by step, from Drive link to rendered MP4
  - [[Environment notes]]: cloud-box gotchas (blocked hosts, Chrome path, fonts)
- **Projects**
  - [[NBA GOAT pick]]: Trevor Lawrence podcast clip: seat map, verified timings, **feedback log**
  - [[Cooper Flagg Arrivals 1-1]]: card pull from the sheet
  - [[Batch 1 - 6 big pulls + 6 Trevor clips]]: 12 Shorts from the sheet, how the batch pipeline works, titles/descriptions
  - [[Batch 2 - 6 big pulls + 6 Trevor clips]]: hooks, mood music, face tracking
  - [[Batch 3 - Edit3 4 cards + 4 Trevor]]: Edit3 style on black bars + card pulls, titles/descriptions
  - [[Batch 7 - Jorho playbook 5 Trevor clips]]: NBA GOAT, Peyton, redemptions, golf/Jesus, Liam Coen in the Jorho playbook style
  - [[Batch 6 - JustinAugh 5 card pulls]]: Mahomes, Flagg, LeBron, Star Wars, Dart in JustinAugh style (`makeJa` factory)
  - [[Batch 5 - Jorho Trevor clips 2]]: 5 more Jorho Trevor clips (lefty, natty ticket, PSA 10 celly, Tiger gift, all hail the king)
  - [[Batch 4 - Jorho Trevor clips]]: 3 Trevor clips in Jorho style (ant autograph, wrong Josh Allen, Traveling Trevors)

## Quick start (new session)
1. Read [[NBA GOAT pick]] (feedback log) and [[Caption style]].
2. `npm install` (and `pip install faster-whisper` if transcribing).
3. Download footage one file at a time with `scripts/drive_dl.sh` (parallel Drive pulls get blocked).
4. Transcribe with `scripts/batch_transcribe.py`.
5. Write a plan:
   - card pull → `src/plans/card/<name>.ts` with `makeCardPlan`;
   - podcast → `src/plans/pod/<name>.ts` with `makePodPlan`.
   Copy an existing plan as the template.
6. Check stills (`scripts/stills.sh`), then render with `scripts/render_card.sh <name>` / `scripts/render_pod.sh <name>`.
7. Send the MP4s in chat, plus titles and descriptions (see [[Batch 1 - 6 big pulls + 6 Trevor clips#Titles + descriptions (sent to user)]]).

## Repo layout
| Path | What |
|---|---|
| `src/plans/pod/*.ts` | podcast edit plans (`make.ts` = `makePodPlan` factory: captions, shots, SFX, music from a short spec) |
| `src/plans/card/*.ts` | card-pull edit plans (`make.ts` = `makeCardPlan` factory: suspense, reveal, narration, banner) |
| `src/activePod.ts`, `src/activeCard.ts` | which plan renders; switch with `node scripts/use-plan.mjs pod\|card <name>` |
| `src/ShortEdit.tsx`, `src/CardPull.tsx` | the Remotion renderers (podcast layout / card-pull layout) |
| `scripts/drive_dl.sh`, `batch_transcribe.py`, `prep_narr.py`, `track.py`, `seat_motion.py`, `stills.sh`, `render_*.sh` | batch pipeline (see [[Batch 1 - 6 big pulls + 6 Trevor clips#How it was built (reuse this)]]) |
| `scripts/transcribe_words.py` | faster-whisper word timestamps → `public/words.json` |
| `scripts/speech_segments.py` | real speech on/off times from the audio (to fix whisper timing) |
| `public/emoji-ios/` | Apple emoji PNGs (160 px) |
| `public/sfx/`, `public/music/` | sound effects and royalty-free music |
| `vault/assets/research/` | contact sheets of the 50 analysed Shorts + the hashtag pool |
| `vault/assets/references/` | full-res frames of the two reference Shorts |
