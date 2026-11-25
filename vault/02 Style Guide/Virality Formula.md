# Virality Formula (living doc, started 2026-11-20)

**Read this before every edit.** Every new edit is logged at the bottom with its choices; when stats come in, fill the
`views / eng` columns and update the weights. The goal: a formula that raises the chance a Short blows up.
Sources: user feedback across sessions, reference Shorts the user sent, campaign briefs, chat-log + transcript analysis.

## 1. The formula (score each candidate clip before editing; edit only ≥ 7/10)

| # | Factor | Points | How to check |
|---|---|---|---|
| 1 | **The key action is ON SCREEN in the first 1–2 s** (the hit, the fail, the payoff), not just hook text | 2 | first 60 frames |
| 2 | **Strong emotion from the streamer**: shock, grief/mourning, panic, laughing fit | 2 | facecam + voice |
| 3 | **One of the proven moment types** (see §2) | 2 | |
| 4 | **Chat exploded** (reaction rate ≥ 7× the local average, or F / RIP / LMAO spam) | 1 | chat log |
| 5 | **Self-contained story** in 12–22 s: setup → moment → reaction → button line | 1 | |
| 6 | **Clear swear or meme-able line** (KreekCraft only, briefs permitting) | 1 | transcript |
| 7 | **Loopable end** (ends on the punchline / reaction, flows back into frame 0) | 1 | |

## 2. Proven moment types (ranked by what the user / references say blows up)
1. **Accidental kill + mourning** (hits a dog, a bird, a gator → "I didn't see him… I'm so sorry"). Ref: Kreek "SADDEST MOMENT in GTA 6!" (youtube.com/shorts/aWOeLHVXTsw).
2. **Clear swearing bursts** ("oh fuck fuck fuck… shit… god damn it"). User 2026-11-20: "clips of kreekcraft swearing clearly seem to blow up".
3. **Relationship / story talk with a twist** ("I would never cheat on my wife with Lucia… Lucia is not real… with that being said…"). Ref: Kreek "Doing WHAT With Lucia?!" (youtube.com/shorts/9fnp4itHQaA).
4. **Chaos / fail with a big reaction** (granny chase, bird strike, crocodile bet, stream almost banned).
5. Avoid: giveaway admin, menus, slow walking with no talk, sexual content (campaigns reject it), anything the streamer hid.

## 3. How to FIND moments in a long VOD (fast → slow)
1. **Chat log** (TwitchDownloaderCLI `chatdownload --id <vod> -o chat.json`, user runs it on their Mac, uploads to Drive):
   drop `!command` giveaway spam first, then count reaction words per 15 s (lol/lmao/kekw/omg/wtf/nah/💀/😭) vs the 20-min local mean;
   also keyword spikes: "RIP", "F", "dog", "killed", "NOOO". Chat lags the action by 5–15 s.
2. **Full transcript** of the VOD audio (audio_only HLS → opus per hour → faster-whisper base.en): grep for
   mourning ("didn't see him", "he's dead", "so sorry", "rip"), swears, story names (Lucia, Jason, girlfriend, wife).
   Cutscene NPC dialogue also contains swears → always read the context to keep only the streamer's own voice.
3. **Loudness peaks** (first pass only; finds shouting, misses talk-driven gold).
4. Screenshot sheets (1 frame / 2–3 s) to confirm what's on screen before downloading HQ.

## 4. Edit recipe (Gaming stack, src/campaigns/gaming/story.tsx)
- **Source quality**: always the Twitch `chunked` rendition (1440p60) → downscale to 1080p30, keyframe every 1 s (Remotion chokes on 1440p60 long-GOP). Facecam is a small corner, so source resolution matters most.
- Layout: facecam top (760 px), gameplay bottom, **gameplay centred** (gameX 640), campaign logo the whole clip when required.
- **Cut into a story** from several pieces (`segs`), every cut lands with a small punch-in + whoosh.
- **Pans + zooms** (`game` / `face` keyframes): push in on the hit, start tight on the result and pull back, punch his face on the key lines.
- Captions: centred (y 960), big, one word at a time, coloured key words. Hook typed on the seam (frame 0 shows it).
- Sound: meme SFX loud (0.65): fahhh / vine boom / awkward (with yellow flash) / boowomp / aww / suspense. Music clearly audible (~0.3), ducks to 60 % under speech.
- Sad part: **grey + rain overlay** (`rain: [from, to]`) with sad piano (experience-einaudi).
- Flashes: red = fail, green = win, yellow = awkward. Red also shakes.
- Finish: **light only** (`GAME=1 scripts/finish_4k.sh`: small gamma lift + sharpen, no saturation/contrast push, no glow). User: "chill out on the filters".
- If the streamer hid the screen: blurred freeze of the last frame behind his overlay, never reveal what he hid.

## 5. Campaign rules that limit the formula
- KreekCraft: official logo whole clip, caption "Watch KreekCraft on YouTube and Twitch" + #GTA6 #KreekCraft #GrandTheftAutoVI, ≤ 5 near-identical posts, swearing allowed.
- SEGA: NO added music/SFX, NO AI voice, only official prices on screen, #Ad first hashtag. → visual-only edits.
- Kitsch: product on screen every clip, Nic in a good light, no raw reposts, never guess the "special someone".

## 6. Edit log (fill views / engagement when known; that is what tunes the weights)
| Date | Clip | Type | Action in 1–2 s | Emotion | Chat spike | Swear | Pans/zooms | Rain | Length | Score | Views | Eng % |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11-19 | kc_scooter (granny) | chaos | partial | panic | yes | yes ("drop, bitch") | no | no | 22 s | 7 | | |
| 11-19 | kc_seaplane (bird) | kill | yes | shock | n/a | no | no | no | 19 s | 7 | | |
| 11-19 | kc_swamp (croc bet) | chaos | no | relief | yes | yes ("oh shit") | no | no | 19 s | 6 | | |
| 11-19 | kc_alert (stream) | chaos | no | panic | yes | no | no | no | 23 s | 6 | | |
| 11-19 | kc_countdown | hype | no | hype | yes | no | no | no | 19 s | 5 | | |
| 11-20 | kc_atv (gator) | kill | partial | shock | yes | no | no | no | 18 s | 6 | | |
| 11-20 | kc_tiktok | talk | no | amused | yes | no | no | no | 22 s | 5 | | |
| 11-20 | kc_banned | talk | no | dread | yes | no | no | no | 15 s | 5 | | |
| 11-20 | kc_steal | fail | no | annoyed | yes | no | no | no | 20 s | 4 | | |
| 11-20 | kc_dog | kill + mourn | **yes** | grief | yes (RIP spam) | no | **yes** | **yes** | 19 s | 9 | | |
| 11-20 | kc_shark | chaos + kill + swears | yes (shark panic) | panic → triumph | n/a | **yes** (heavy) | yes | no | 22.5 s | 9 | | |
| 11-20 | kc_dog2 (another dog) | kill + mourn (sequel) | yes (hit ~1.3 s) | grief → absurd ("dolphins… I hit a dog") | yes | no | yes | yes | 21 s | 9 | | |
| 11-20 | kc_lucia (wife vs Lucia) | story talk | speech only (pre-game screen) | playful | yes ("shoe store" spam) | no | face punches | no | 24 s | 7 | | |
| 11-20 | kc_shoe (11-hour callback) | callback / chat meme | payoff first (cold open) | hype | yes | yes ("shit") | yes | no | 16 s | 7 | | |
| 11-20 | kc_donate (viewer won't stop) | stream culture | speech only | disbelief | yes (F spam) | no | face punches | no | 20 s | 6 | | |

### Lessons from batch 3 (2026-11-20)
- The full transcript finds the best stuff (sequels, callbacks, talk) that loudness never finds. Always run it on a new VOD.
- **Sequels work**: same moment type twice (dog → another dog) — post the second one ~1-2 days after the first.
- **Cold open with the payoff** when the setup is slow (shoe store): payoff 0-3 s → flashback → payoff again.
- Pre-game / menu screens make a weak bottom panel → keep those clips talk-driven with face punch-ins, or skip them.
- Many swears in GTA come from NPC cutscenes — keep only the streamer's own voice (check context in the transcript).
| 11-20 | kc_narr v2 (screen narration) | caught lacking | yes | panic | yes (OMG x7) | no | 1 steady focus | no | 19.5 s | 8 | | |
| 11-20 | kc_bath (not a gooner) | refuses to look | speech | flustered | — | no | face only | no (blur) | ~30 s | 8 | | |
| 11-20 | kc_club (gooner game) | refuses to look | quote cold open | flustered | — | no | face only | no (blur) | 30 s | 8 | | |
| 11-20 | kc_dudes (worst day) | talk twist | speech | despair (comic) | — | no | face | short rain | 21 s | 7 | | |
| 11-20 | kc_nakedw (shoe store) | talk twist | speech | deadpan | — | no | face | no | 21 s | 7 | | |
| 11-20 | kc_wife (didn't mean it) | caught lacking | speech | panic | yes (x10) | no | face | no | 24 s | 8 | | |
| 11-20 | kc_banned2 (YT + Twitter) | stream drama | speech | disbelief | — | no | face | no | 28 s | 6 | | |

### Lessons from batch 5 (2026-11-20, user feedback on the narration clip: "no context, no centre or focus, over stim, no purpose")
- **Every clip = one topic + a context beat first + a payoff.** If a viewer can't say what it's about in 5 words, recut it.
- **Calm > busy**: 1–2 effects max, a steady camera holding ONE focus, music ~0.2. Over-stimulation reads as AI/spam.
- **Running bits beat one-offs**: his "don't look / I ain't getting banned" moments recur all stream → a series (bath, club, worst day, shoe store). "Gooner" works as a trigger word **because he says it himself**.
- **Rank moments by chat reaction rate (reaction words per 30 s ÷ local mean)**, not audio loudness (stream audio is normalised, peaks are flat).
- Nudity the stream showed → blur the gameplay panel (`censor`), never reveal it.

## STANDING RULE (user, 2026-11-25): every video = HOOK → STAY → ENGAGE
1. **HOOK**: frame 0 = the strongest line / reaction (cold open) + an on-screen top line a scroller gets in 1 s.
2. **STAY**: hold the payoff until the end; one diagram mid-clip; punch-ins on reactions; a thin progress bar (BYB `cta` adds it).
3. **ENGAGE**: last ~2.8 s = the clip's own comment question + LIKE / SUBSCRIBE (BYB: `cta: '…'` in batch17 `make`).
4. **BYB on-screen text voice** (user examples): "Bro could've bought 20 PS5 Pros with this card 💀", "Bro's card value got robbed like GTA 6 💀".
   Relate money/cards to PS5 / GTA 6, Gen-Z "Bro…" tone, always true numbers (PS5 Pro US $749.99). Jo Koy stays as is (user: "they are fine").
