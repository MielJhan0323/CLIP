---
tags: [project, batch, jorho, jorho-v2, justinaugh]
date: 2026-11-02
---
# Batch 8: 3 JustinAugh card pulls + 4 Jorho + 3 Jorho v2

User ask (2026-11-02): "edit 3 card pulls using justin augh and 4 trevor clips using jorho and 3 jorho v2". First batch built with the [[Asset hive mind]]: each video picks its own 2–4 assets; no repeated combos; no beep anywhere; every bed different.

| comp | out | style / look | title | assets picked | music |
|---|---|---|---|---|---|
| B8Davis | b8_davis_mills.mp4 (16.8 s) | Jorho black | Davis Mills got roasted for his neck 💀 | Glennon cut-out, fahhh, red tints, strobe | Fluffing a Duck |
| B8NatTreasures | b8_national_treasures.mp4 (18.2 s) | Jorho black | Trevor ripped packs hoping to pull himself 💀 | **cold open** "Come on, Trevor!", 🙏 pop, taco-bell bong on "Dan Marino", 1 comment *still no trevor* | TAK TAK |
| B8Rogers | b8_rogers_realm.mp4 (16.6 s) | Jorho light | Trevor's superfans vs Rodgers' superfans 💀 | 🥊 pop + boxing bell on "we should box him", green tints | Funk do Balkan |
| B8Lair | b8_lair.mp4 (17.1 s) | Jorho light | Trevor's off-season plan? Ripping packs 💀 | **head circle + TREVOR LAWRENCE + ding** on his "Yeah", 🤝 on "always welcome" | QKThr |
| B8Playbook | b8_v2_playbook.mp4 (22.8 s) | Jorho v2 | An NFL playbook has hundreds of plays 💀 | YouTube card question, 300+ badge, 10-dot "new plays this week" scale | Lose You (ADTurnUp) |
| B8Presnap | b8_v2_presnap.mp4 (22.0 s) | Jorho v2 | How often an NFL QB knows who's open 💀 | question card, **PercentBars** 65 % / 15 %, typed *ball goes somewhere else* | Interstellar piano |
| B8RedeemV2 | b8_v2_redemptions.mp4 (17.2 s) | Jorho v2 | Watch a $20,000 card lose 97% of its value 💀 | **ValueGraph** $20,000 → $500 + error blip, typed *the hobby hates redemptions* | Funk Sigilo |
| JaKon | ja_kon_papa.mp4 (20.3 s) | JustinAugh | THEY ALREADY HIT ONE 1/1 / COULD THEY HIT TWO? 👀🤯 | hook costco_guys_boom, Alex "They already hit one Papa Auto. Could they do it again?" | Montagem Pegadora |
| JaClark | ja_clark_gold_vinyl.mp4 (23.3 s) | JustinAugh (720x1280 stream, `srcW`) | GOLD VINYL AUTO 1/1… BUT WHOSE NAME IS ON IT? 👀 | hook oh_my_god_our_first_one | Tipo Insta Buzeira |
| JaCade | ja_cade_logoman.mp4 (23.3 s) | JustinAugh, single camera (`hosts: null`, no PiP) | NATIONAL TREASURES… ONE LOGO CHANGED EVERYTHING 😮🔥 | hook this_product_is_unbelievable | Eclipser |

## Notes
- New v2 graphics: `PercentBars`, `ValueGraph` (src/jorho/v2.tsx). New file `src/jorho/batch8.tsx`.
- JustinAugh factory: `srcW` (non-1080 streams) and `hosts: null` (single camera, no PiP); narration name fixes (Cone Canoopal → Kon Knueppel, Otto → Auto).
- Disk filled again (long sources × bundle copies). Trimmed long sources to the parts used (stream copy, `-t` only so timings stay): u1_playbook 57 s, c6_cade 64 s, c3_dart 98 s, v_nt_rip 70 s, u6_coen 30 s, flagg_papa 106 s.
- Montagem Alquimia is only a 15 s myinstants loop (drop 3.92 s): it can't be used when the reveal is later than ~3.9 s into the edit.

## Feedback log
1. User: cards: don't blur the background all the time; only blur the chase card before its reveal, and the bg behind the end reveal → `blurBox` per pull (Kon [230,960,560,600] from 21.3 s, Clark [40,470,660,560] from 0, Cade [150,500,480,560] from 55.3 s) → `ja_*_v2.mp4`.
2. User: the Nat Treasures clip had "a random loud effect" (the taco-bell bong, ~9 dB over everything) and "the video itself is not that pulling" (no payoff, no Trevor card) → v2: **cold open on Trevor's "Ew. Don't show that, man… put it away"** (🤢 pop), title *Trevor saw this card and said put it away 💀*, then the story ("if we hit a Trevor we go electric" → pulls → "Come on… No."), payoff repeats at the end (strobe, 🤢) + one comment *which card was it?* (comment bait, the card is never shown). No bong; render has no loudness spikes. → `b8_national_treasures_v2.mp4` (21.3 s).
