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
- **No loud one-off SFX** (2026-11-02): after rendering, scan for loudness spikes > 9 dB over the median (the taco-bell bong was one); keep stingers soft. And a clip needs a real payoff; if the moment fizzles, pick a stronger moment and cold-open on it.
- **Card pulls: blur only the card, only when needed** (2026-11-02): the chase card area while it's visible before its reveal, and the bg behind the end reveal card. Never the whole stream.
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

- (2026-11-03) **Pull from the first second and stay engaging the whole way**: cold-open every clip on its payoff line with a graphic already moving, then add a new beat (graphic, cut, emoji, typed text, stamp) about every 2–3 s. Graphics take over for 3 s at most and hand back to the cam. No dead stretches; the payoff lands again at the end.

- (2026-11-04) **The NBA GOAT clip went viral → use its formula** ([[Viral formula - NBA GOAT]]): a universal question with a surprising answer; a provocative caption that hides the answer; the viewer guesses during a quiet thinking beat; reveal at 60–70 % as the loudest hit; a proof/second-laugh graphic; end on the reaction so it loops; ≤18 s. Pick clips with that shape first.

- (2026-11-04) **The redemptions clip went even MORE viral** ([[Viral formula - Redemptions]]): a title that promises a concrete, visual event with a number; the number in the first second; pay the promise off early with a big visual (graph crash), then chain new open loops (why → answer → twist); near-silent micro-pauses before every key number; end on an unanswered question. Each clip uses one engine: delayed reveal (NBA GOAT) or promise → payoff → new loop (Redemptions).

- (2026-11-04) **Copy the PRINCIPLES of a viral clip, never its tools.** User: "you're making it too similar… only copy which parts need to be grasping". From a reference, take the *job* each part does (hook claim, open loop, guessing, dead stop before the turn, reaction ending) and build it with a different visual language for that clip. Don't reuse the YouTube card, guessing reel, scorecard, typed text, chalk board etc. back to back. Example: Demo14 (lefty).

- (2026-11-04) **Face-cam explainer layout.** User on Demo14: "not even entertaining… when he mentions something illustratable make the illustration the main screen and his face a face cam in the top left". When a line can be pictured (a play, a list, a number, a place), an **animated illustration fills the box** and Trevor sits in a **rounded face cam in the top-left** (white border); otherwise the normal cam. Skip gimmicks (VHS, flips, moving type) that don't add meaning. Example: Demo15.

- (2026-11-04) **Chill on SFX.** User on Demo15: "chill out on the sound effects". Explainer / face-cam clips get no per-beat SFX (no whoosh per throw, no pen scribble per row, no transition swooshes); the style's opening ting and the music carry it. At most 1–2 SFX on the real punchline. Engagement comes from the visuals moving (push-ins, glowing trails, things popping), not from sounds.

- (2026-11-04) **Face-cam rules.** Don't illustrate everything: about half the runtime stays on the normal cam, with illustrations only on the 2–3 most picturable lines. The face-cam transition is the full cam **shrinking into the top-left corner** (size + position, ~0.4 s ease-out with only a very slight settle) and growing back the same way. No elastic pop-in. Example: Demo15 v3.

- (2026-11-05) **Captions must not flicker.** User: "fix the subtitles because it's glitching out". Fast talk produced 1–3-frame words (24 of 103 under 0.12 s). Wrap caption lists in `chunkWords(words, tl.total, tl.segOut)` (src/jorho/kit.tsx): it groups 1–3 words so every caption stays up for at least about 0.25 s, never across a cut/sentence. Use it on every new clip. Also (same day): `wordsFrom` now sorts captions by output time. With a cold open (a later line placed first) the list used to be in source order, and OneWord then dropped captions for whole stretches (Demo14/Demo15). Clips built with `segWords` were never affected.

- (2026-11-05) **No clipped words at cuts.** User: "his sentences are cut off before every cut". Segment ends were set at the last word's START time. Before rendering, run `python3 scripts/snap_segments.py <video> <words.json> '<segs>'`: it moves each end to where the speech actually decays (+120 ms) without touching the next word, and starts 80 ms before the first word. Then check the render with a speech-to-text pass.

- (2026-11-14) **Paid campaigns live in categories**: see [[Campaigns]] (`vault/05 Campaigns/`). **FOMO clip** = the FOMO/ClipFarm Guess-The-Fake-Millionaire work; **Neon clip** = HardScope R3born (N3on). Read the category's brief note before cutting; each has its own tags/hashtags and banned topics (Neon: NEVER mention FaZe, no politics, #r3born + @hardscope).
- (2026-11-14) **Louder music/SFX must never sit on the voice**: music swells in the gaps and ducks smoothly under every spoken window (`music.dips` from word timings + `floor`/`ramp`, see `speechDips` in `neon.tsx`); a meme SFX like the fahhh gets its OWN beat (a ~1.1 s freeze `hold` after the line), never played over talking.
- (2026-11-14) **Neon music level:** user "the music is too loud" on neon batch 2 (gain 4). Use `gain: 2, floor: 0.5` → the bed sits at the standard ~14 dB under the voice while anyone talks and only swells ~6 dB in the gaps.
- (2026-11-14) **Music is optional.** User: "there doesn't have to be sound in every clip, just the ones that are too quiet". Only add music where the source is quiet/dead; if the scene already has room sound/energy (e.g. the Pilates class), leave music out.
- (2026-11-14) **Don't leave clips dry.** User on Neon batch 2: "add sound effects, it's so dry" + "add awkward effect dings". Default SFX layer: record scratch on the cold-open cut, short whooshes on cuts, soft typing on typed labels, 1–2 meme SFX + `ja-ding` after awkward lines, ALL snapped into speech gaps (`inGap` in `neon.tsx`) so nothing sits on a voice.
- (2026-11-14) **Show the climax; keep it calm; music low.** User on Neon batch 2: "stop cutting off the video before the climax", "bg music is too loud", "the clips are overstim but the sfx are good". → Clips END ON THE PAYOFF (the wax lands, not "3, 2, 1"; this overrides the brief's "cut before it resolves" for our edits). Music `gain: 1, floor: 0.4` (~20 dB under the voice). No flash on the freeze, ONE typed label (the roast), keep the gap-snapped SFX layer.
- (2026-11-14) **Light edits are allowed + the viral warm grade.** User on a 500K-view clip: "it doesn't have to be mega edited, just add the filter this video has". See [[Viral formula - 500K light edit + warm grade]]; use `grade: VIRAL_WARM` (Jorho spec). Curiosity-gap titles, label the celebrity once, cut to the speaker every 1–2 s.
- (2026-11-14) **JustinAugh is discontinued** (user: "discontinue the justin augh"). Card pulls are not being made for now.
- (2026-11-14) **Jorho v2 = the 500K style** (`src/jorho/batch16.tsx` `make()`): dead-air trims, virtual camera (locked crops, punch-cuts between zoom levels every ~1.4 s on the speaker, wide first body shot, wide ending), whip-blur first frame, 2–4 colour-flash frames (soft boom, never masking the word), red arrow + *Trevor Lawrence* once, one meme cut-out where someone is named, small one-word captions, VIRAL_WARM, bed from the first cut that swells after the last word. Measured breakdown: [[Viral formula - 500K light edit + warm grade]].
- (2026-11-15) **Don't clone the recipe; use real angles; cap zoom; diagram the plays.** User on batch 16: "the recipe is too replicated, some don't use angle changes, too much zoom / wrong centre, add diagrams like v2 when he talks about plays". → Plan cuts per clip between speaker / listener reaction / wide (L Grant, M Trevor, R Bugsy), zoom ≤ ×1.12 on the speaker crop, a v2 diagram (corner face-cam) whenever football is explained, and a different graphic/SFX/flash mix per clip (`src/jorho/batch17.tsx`).
- (2026-11-15) **Neon: calm = boring.** User: "the neon clips are hella boring, give me something you'd see on the feed". New Neon default = `neonFeed()` (wide ↔ face punch every ~1.5 s, whip intro, 2–3 flashes, emoji pops, *N3on* arrow, meme SFX in gaps, fahhh freeze, warm grade, loud ending). The calm batch-2 template is superseded for new clips.
- (2026-11-15) ⭐ **SOURCE OF TRUTH FOR EDITING STYLE = the "whop ai" Drive** (`drive.google.com/drive/folders/1Sf4n4Ve2tKlpiLiYoCbkFxcQIYEY1B0L`). User: "from now on reference the whop ai drive for editing style". It holds the Editing Guideline + the resource kit (summarised in [[Editing Guideline (client)]], assets in `public/sfx/g-*`, `public/guide/*`, `public/music/*`). When older notes in this vault disagree with it, the whop ai drive wins. Re-check the drive for new files before each new batch.
- (2026-11-15) **CLIENT EDITING GUIDELINE — follow it on every clip:** [[Editing Guideline (client)]]. Key rules: speech clearly audible + music still noticeable (vocal songs 10–12 dB under); image pop-ups centred + BIG: good/pro picture = GREEN flash + cash + ding, meme picture = RED flash + fah + shocked; cut to whoever talks; idle/thinking = slow zoom + suspense sfx; something changes at least every 3 s; finish with sharpening, noise reduction, colour/contrast, resolution enhancement. **Captions must disappear when the word ends** (fixed globally 2026-11-15: `Word.end` in `src/jorho/kit.tsx`). Client assets: `public/sfx/g-*.mp3`, `public/guide/img/*`, `public/guide/ov/*` (green flash, money falling, few moments later), songs `public/music/{wtf-u-tryna-say,ts-pmo,kai-cenat-suspense,joyful-chess-guide,say-goodbye-lodoni,pixy-legacy,zelda-*}.mp3` (+ 38-track library in `public/music/bg/`, not in git).
- (2026-11-15) **Neon viral references** (user: "add these as neon ref"): [[Neon viral references]] — full-screen 9:16 (no bars), Anton captions with per-speaker colours, *ACTION* labels, green/red flashes held ~0.5 s, cuts on the speaker, music bed throughout, B&W push-in for a defeat. Match these for Neon from now on.
- (2026-11-15) **Frame EVERY shot on the speaker by hand when the tracker can't be trusted.** User: "what the actual f*** are the cameras even centered on". The auto face tracker failed on profiles / cuts / lying-down shots (walls, knees). Full-screen 9:16 crops are only 600 px wide, so: build a contact sheet with a pixel ruler every 0.7 s, set a crop keyframe [source sec, face x, face y] per shot on whoever is TALKING (`frames:` in `src/campaigns/neon_clip/full.tsx`), then check the render's contact sheet before sending.
- (2026-11-15) **"4K" finish on every export** (user explained the CapCut 4K preset): `scripts/finish_4k.sh out.mp4` = light denoise → clarity (local contrast) → saturation/contrast → S-curve (deeper shadows, brighter highlights) → 18 % soft-light glow → heavy edge sharpening. Not real 4K; it's the phone-screen look. Keep the in-render grade neutral (`contrast(1.02)`) so it doesn't stack.
- (2026-11-15) **Neon: no cut spam, faces always framed.** User: "some shots aren't on their face, just the bg; too many cuts, it's overstim". → No wide/face alternation: one steady full-height framing that moves only when the speaker / source shot changes. Crops = hand-picked speaker per shot refined by YuNet every 0.25 s (`scripts/refine_frames.py`), then QC every render with `scripts/qc_face_center.py` (lists frames with no centred face; only source camera whips / graphics may remain). Pilates-question + Spider-Man full versions cancelled by the user.
- (2026-11-15) Title box on full-screen Neon clips: bigger (user: "make the captions bigger on the top") → now a FULL-WIDTH white banner touching the top + both sides, 70 px serif bold (user: "make the caption fill out the sides and the top").
- (2026-11-14) **Every campaign creation goes in its category's reference folder**: after each render, copy the `.mp4` + `_sheet.jpg` into `vault/05 Campaigns/<category>/references/` and add a row to that folder's `References.md` (status: approved / liked / rejected + why). Approved ones are the template for the next clip. Neon's first approved reference: the tracker-broken clip.
- (2026-11-14) **FOMO clips follow the external references** ([[External FOMO references]]): spot-the-fake game headline, contestant by contestant, item cut-out + green price on real flex claims, coloured keyword captions, red FAKE stamp only on someone accused in the clip. Still: no spoilers, nothing covering faces, no invented numbers.
- (2026-11-14) **Style = content type.** User: "the jorho v2 is for trevor lawrence… use justin augh for card pulls". **Jorho / Jorho v2 = Trevor Lawrence podcast clips ONLY. Card pulls (Live Stream Clips tab) = JustinAugh ONLY.** Never put a card pull in Jorho v2 (batch 14's B14Murakami/Randy/Judge were the wrong style).

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
  - [[Batch 8 - 3 JustinAugh + 4 Jorho + 3 Jorho v2]]: Kon/Clark/Cade pulls; Davis Mills, Nat Treasures, Rogers' Realm, Lair; v2 playbook, pre-snap, redemptions
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
- (2026-11-03) Highlight boxes and circles should **draw themselves on** (marker stroke), not just appear, and must fit around everything they mark. Stat displays should look like a plain broadcast graphic: no glows, neon or template count-ups, and use the same kind of photo for every player.

- 2026-11-15: DEFAULT STYLE = client doc "video reference" (whop ai drive / video references) → see 02 Style Guide/video reference (client)/README.md. Restraint first: no over-edit, no template zooms/SFX spam, human feel. Look = letterboxed 500K Backyard Breaks recipe (black bars, white bold title top, small 1-word captions, red arrow *Name*). Overrides other styles unless the user says otherwise.
- 2026-11-15: MIX THE JORHO v2 FORMATS — not every clip gets the YouTube card + face-cam board. The PROVEN VIRAL one is b8_v2_redemptions
  ("Watch a $20,000 card lose 97% of its value"): the graphic is drawn OVER the dimmed footage (ValueGraph), green→red tint on the key
  number, a typed *action* line, no YouTube card. In a batch use different formats per clip (overlay graph / YouTube card + board /
  plain with arrow), never the same recipe on all of them. (src/jorho/batch19.tsx shows all three side by side.)
- 2026-11-15: EVERY CLIP (Jorho v2 + Neon) — (1) the first ~2 s must HOOK: open on the diagram / graphic over the cold-open line
  (`hook` in batch17 make); (2) effects start to end, tied to words: every emoji key word = small punch-zoom + soft pop;
  (3) diagrams in MOST clips (not all); (4) Trevor marked once with the red *Trevor Lawrence* arrow OR circle (`mark: 'circle'`);
  (5) captions white with KEY WORDS colour-highlighted + iOS emoji pops (`hi` map, src/jorho/hi.tsx). User said: don't ask, just do it.
