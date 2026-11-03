---
tags: [style, assets, rotation]
date: 2026-11-02
---
# Asset hive mind (pick per video, never all)

User (2026-11-02): "when I tell you to reference something I don't mean to redo it in every video, I mean to add that to the hive mind of things you can add to the video. Each video has an asset that you took and understood, and you should interchange those assets."

**Rules**
1. A reference adds options; it is not a checklist. **Each video uses 2–4 assets from this list, chosen because they fit THAT clip's moment.**
2. **No two videos in a batch share the same combination**, and no single "signature" asset (arrow callout, YouTube card, asterisk comment, cut-out pop) may appear in more than ~2 of 5 videos in a batch.
3. Rotate across batches too: check the usage log at the bottom before picking.
4. The base frame of the style (Jorho box, one-word captions, top line) is the style; everything below is optional seasoning.

## Hooks & openers
| asset | learned from | fits when | code |
|---|---|---|---|
| Contradiction/paradox top line | gift ticket, refs 6–7 | always (the title) | `top` |
| Cold open on the payoff, then the story | celly v5 | the punchline is visual/quotable | timeline order |
| Frame-0 asterisk label on the person/object | ref Tiger ("*20,000$ card*") | an object or a group needs naming | `Asterisk` |
| Split-screen of two faces + arrows | ref NBA GOAT | a question between two people | (to build) |
| YouTube watch-page card for the question | celly v4–v5 (Jorho v2) | an explainer/question beat | `YouTubeCard` (v2) |
| Intro voiceover "X explains…" | user request (lefty v4) | the clip needs context in the first 3 s | spec `vo` |
| Light look (white band + blur fill) | gift ticket | wholesome/gift moments | `light` |

## Identifying people
| asset | learned from | fits when | code |
|---|---|---|---|
| Curved red arrow + *TREVOR LAWRENCE* | ref NBA GOAT/Tiger | once in a while; when he isn't obvious | `CallOut` (face-anchored) |
| Real cut-out photo of the person named | Jorho refs, gift ticket | a name drop (Peyton, Tiger, Delly, Coen) | `MemePop` / `Cutout` |
| Red circle on a face | card-pull refs | a reaction in a busy frame | `RedCircle` (justinaugh) |
| **Tracked head circle + ding** (user 2026-11-02) | user feedback | identify Trevor instead of the arrow; draws on, follows his head, `ding-2` when it appears, **red *TREVOR LAWRENCE* label under the circle** (user 2026-11-02) | `HeadRing label=` + overlay `face()` (k = zoom) |

## Payoff & comedy
| asset | learned from | fits when | code |
|---|---|---|---|
| Big iOS emoji pop on the trigger word (💀 🐜 💸) | gift ticket | absurd line / object | `MemePop` |
| Editor comment *bros too rich to care* / *he was not joking* | ref Tiger/NBA | a reaction worth an opinion | `Asterisk` |
| *thinking* / *awkward* label on a pause | ref NBA GOAT | a real silence | `Asterisk` |
| Typed *action text* | celly v3 | describing an action/reaction | `TypedAction` (v2) |
| **Article highlight**: printed article close-up, tilted, shallow focus, key phrase yellow-highlighted, headline → paragraph shots (user ref STHOVgEWqf8) | NBA GOAT v2 | a big topic word ("NBA GOAT", a record, a claim) | `ArticleHighlight` (batch9.tsx) + `sfx/film-roll.mp3` |
| Jackpot slot machine reel spinning names, lands on the answer (user idea 2026-11-03) | NBA GOAT v2 | a "who will he pick?" pause; bottom bar; **only while he's thinking**, reel of player **heads** (`public/img/heads/`) | `SlotBox` (batch9.tsx) + `slot-spin` / `slot-jackpot` SFX |
| GOAT/stat comparison table (cut-outs + counting stats) (batch 9) | NBA GOAT v2 | comparing people by numbers | `GoatTable` (batch9.tsx) |
| Grade scale / stat badge / graphs | Jorho v2 refs | numbers, grades, stats | `GradeScale`, `StatBadge`, `PercentBars`, `ValueGraph` (batch 8) |
| Jorho strobe on the beat | Jorho refs | the single biggest moment | `strobes` |
| Green/red tints | Jorho refs | setup (green) / laugh or fail (red) | `tints` |
| Beep pause | Jorho ref | rare: a name reveal only (~1 in 10) | `beeps` |
| Punch-in / zoom whip | Trevor clips, JustinAugh v2 | a reaction face / scene change | `zoomStyle` |

## Sound
| asset | fits when |
|---|---|
| fahhh | roast / shot at someone / crazy statement |
| awkward-moment ding, crickets, Taco Bell bong | awkward pause, cringe, weird reveal |
| Curb credits sting | awkward punchline |
| ting / camera flash / swish | Jorho base hits |
| Music pool: Jeopardy Think, Joyful – Chess, Monkeys Spinning Monkeys, Fluffing a Duck, Blue, lullaby, QKThr, phonk (Du bist retired for now) | one bed per video, none repeated in a batch, 14 dB under |

## Usage log (update every batch)
| batch | video | assets used |
|---|---|---|
| 7 | NBA GOAT | callout, *frame-0 label*, *thinking* + crickets, Delly pop, fahhh, Curb, editor comment, Jeopardy |
| 7 | Peyton | callout, Peyton pop, *the signature* label, editor comment, light look, Blue |
| 7 | Redemptions | callout, *frame-0 label*, 💸 pop, fahhh, editor comment, Joyful Chess |
| 7 | Golf/Jesus | callout, *frame-0 label*, fahhh, editor comment, Tiger pop, Monkeys |
| 7 | Liam Coen | callout, Coen pop, editor comment, light look, lullaby |
| 7 (v2) | Peyton, Redemptions, Coen | arrow → **tracked head circle + ding-2** (user: "replace some of the arrows with circles tracking his head, add a ding") |
→ Batch 7 **overused the callout (5/5) and the editor comment (5/5)**: that's the mistake this note exists to stop. Next batch: callout in ≤ 1–2 videos, and lean on the unused assets (split-screen, cold open, YouTube card, typed action text, grade/stat graphics, voiceover, punch-ins).
| 8 | Davis Mills | cut-out pop, fahhh, red tints, strobe |
| 8 | Nat Treasures | cold open, 🙏 pop, taco-bell bong, 1 editor comment |
| 8 | Rogers' Realm | 🥊 pop + boxing bell, light look |
| 8 | Lair | head circle + label + ding, 🤝 pop, light look |
| 8 | v2 Playbook | YouTube card, stat badge, grade scale |
| 8 | v2 Pre-snap | question card, percent bars, typed action |
| 8 | v2 Redemptions | value graph, typed action, error blip |
→ Batch 8: arrow 0/7, head circle 1/7, editor comment 1/7, YouTube card 1/7 ✓.
| 9 | NBA GOAT v2 | YouTube card, typed *thinking…*, **jackpot slot box + spin/jackpot SFX**, GOAT stats table, fahhh, Midnight Club |
- **Paper-animator word lock** (2026-11-03, NBA GOAT v6): a key phrase highlighted yellow and fixed in the center while newspaper/article pages cut every 3 frames around it, with the film-roll SFX. Use it for a big "keyword" moment; don't run it longer than about 2 s.
- **Echo word moment** (2026-11-03, NBA GOAT v7): a question's key words replayed with an aecho tail while the clip's own speech is muted (`Spec.mute`), then a whip/zoom-blur exit with fast-whoosh into the next line. Pairs well with the paper-animator word lock.
