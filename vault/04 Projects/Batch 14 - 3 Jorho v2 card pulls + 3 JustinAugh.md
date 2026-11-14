---
tags: [project, batch, jorho-v2, justinaugh, cards]
date: 2026-11-14
---
# Batch 14: 3 Jorho v2 + 3 JustinAugh from the NEW card pulls

User (2026-11-14): "just edit me some 3 jorho v2 and 3 card pulling justin augh with the new clips of card pulling".
Source: the sheet's **🎬 Live Stream Clips** tab, rows dated 2026.11.3–11.13 (the Trevor tab had nothing new).

## ⚠ Correction (user 2026-11-14): "the jorho v2 is for trevor lawrence… use justin augh for card pulls"
The 3 card-pull Jorho v2 edits below were the WRONG style (kept for reference only). The real Jorho v2 deliverables are the 3 Trevor clips:

| comp | out | moment (b3/v_nt_rip.mp4, never cut before) | graphics | music |
|---|---|---|---|---|
| B14Patch | b14_v2_trevor_patch_tiers.mp4 (16.8 s) | 0–15 s: "a really nice patch, 15,000 plus… Jaguars face… that's like a napkin… two colour, way nicer… a Nike swoosh" (cold open "that's like a napkin") | *$15,000+* typed, PATCH TIERS ladder (napkin → 2-colour → logo patch $15,000+) | Lose You |
| B14Sweat | b14_v2_trevor_sweat_a_card.mp4 (23.9 s) | 16–46 s: "you can't risk your hands… sweat it like this… don't look at the back… not touching the corners… one at a time, slide" (cold open "if we hit a Trevor here, we go electric", strobe) | *you can't risk your hands*, HOW TO SWEAT A CARD checklist ticking ✅ | Investigations |
| B14Marino | b14_v2_trevor_marino_top10.mp4 (20.4 s) | 55–74 s: the rip → Dan Marino → "where is he all-time for you? top 10?" → "I mean, gotta be" → "he could sling it, he could rip it" | YouTube watch-page card on the question, TOP 10 ✅ badge, strobe on Marino | Midnight Club |

| B14Rpa | b14_v2_trevor_guess_the_redemption.mp4 (24.4 s) | 92–133 s: "it's a redemption… I don't think Trevor's a redemption" → "true RPA gold" → "if I had to guess… Davis Mills? With Fields?" → slide → "Justin Fields. Oh my God" → "2021… $20,000. What is it now? 200, 500 bucks maybe" | **NBA GOAT engine, different tools** (user: "same thing we did with nba goat but not completely the same"): mystery-card ? opener (not a YouTube card), TRUE RPA locked on the NBA GOAT newspaper animator (hobby-article text; user: "do the newspaper thing") + 3-tap echo on a freeze, fast-whoosh out, GUESS: chip cycling only the names said (not a head reel), 0.55 s silent freeze before the name, strobe + ding + green tint on Justin Fields, hand-drawn double red strike through $20,000 → NOW: $200–500? (not a stat sheet) | Jeopardy Think (stops at the reveal) |

## (wrong style) card pulls in Jorho v2 (`src/jorho/batch14.tsx`)
Vertical stream sources are pre-cropped to a 1920×1080 canvas with the card cam (source y 620–1700) centred (`public/c12/<name>.mp4`),
so the Jorho box shows the card; the hosts come in as a small rounded inset cam (top-right) on reaction beats (`<name>_v.mp4`).

| comp | out | pull | beats / graphics | music |
|---|---|---|---|---|
| B14Murakami | b14_v2_murakami_called_it.mp4 (19.7 s) | Munetaka Murakami 1/1 auto (redemption), Museum, release day | cold open "who do you think you are?" → *it's a 1 of 1* → flicking CHECKLIST of the rookies he names → locks + red ring on MURAKAMI at "I called Murakami" → 1/1 AUTO · RELEASE DAY badge + strobe → "they gotta study your brain" | tak-tak |
| B14Randy | b14_v2_randy_free_spot.mp4 (23.3 s) | Randy Johnson patch auto /10 from the FREE spot | cold open "on the free spot" + green $0 FREE SPOT tag → *who has 300?* → 300 WIN CLUB badge → "Randy Johnson!" strobe → /10 PATCH AUTO → "God bless the lair" | joyful chess (slowed) |
| B14Judge | b14_v2_judge_supernova.mp4 (24.2 s) | Aaron Judge Supernova auto, last spot of the break | cold open "and Aaron Judge is one of them" → *no golds yet* → "no way, that's one of them" strobe → "SUPERNOVA AUTOS IN THIS SET" 2 slots, Judge fills one → *on the last spot* (red) → stars on "the stars are aligning" | eclipser |

No prices on screen (the sheet says N/A for all of these). Unclear words left uncaptioned ("singles and slabs").

## JustinAugh: BLOCKED (ElevenLabs credits)
Picked: Shohei Ohtani 1/1 booklet auto ("at the buzzer"), Derek Jeter + Aaron Judge dual on-card auto Ruby /5 ("in the same box" as the gold book),
Vladimir Guerrero Jr. Ruby patch auto /5 Written in History. Raw files in `/home/user/dl/c12/` (not in the repo).
The Alex narration can't be generated: the ElevenLabs account is out of credits (10 left, 286 needed per narration).
Scripts ready (eleven_v4, voice yl2ZDV1MzN4HbQJbMihG, 1 take):
- Ohtani: "Backyard Breaks was ripping Topps Museum Collection baseball. / They begged for a one of one booklet. Could it really happen? / Then a booklet showed up. / Shohei Ohtani, one of one booklet auto, at the buzzer! / Would you keep it or sell it?"
- Jeter/Judge: "… / They already pulled a giant gold book. Could the same box hit again? / Then a dual auto showed up. / Derek Jeter and Aaron Judge, dual on-card auto, Ruby to five, in the same box! / Would you keep it or sell it?"
- Vladdy: "… / They had seen one Written in History in ten cases. Who would this one be? / Then they read the name. / Vladimir Guerrero Junior, Ruby patch auto to five, Written in History! / Would you keep it or sell it?"
Skipped: Ichiro silver ink (14 s clip, too short), Nolan Ryan patch auto (the file has no audio).
