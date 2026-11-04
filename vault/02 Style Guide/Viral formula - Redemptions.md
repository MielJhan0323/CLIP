---
tags: [style, retention, viral, jorho-v2]
date: 2026-11-04
---
# Viral formula #2: "Watch a $20,000 card lose 97% of its value" (went even more viral than NBA GOAT)

Back to [[START HERE]] · [[Viral formula - NBA GOAT]] · source edit: `out/b8_v2_redemptions.mp4` (`B8RedeemV2` in `src/jorho/batch8.tsx`, 17.2 s, u3_redemptions).

## Beat map
| time | beat | job |
|---|---|---|
| 0 s | starts **mid-sentence** on the number: "This card, I promise you… $20,000"; top caption "Watch a $20,000 card lose 97% of its value 💀" | a concrete, visual promise: you're about to *watch a crash happen* |
| 1.1 s | green flash, price line at $20,000 | the number becomes a picture |
| 1.8 s | "What is it now?" (after a ~0.5 s near-silent pause) | a question the viewer answers in their head |
| 2.9–4.2 s | "$200? …$500 bucks maybe": the line **crashes red** to $500, strobe, error sound (another silent beat before the number) | the promise is **paid off early (25 %)**, and it's satisfying |
| 6.0 s | Trevor: "Why do you have to redeem it?" | a **new open loop**: WHY did it crash? The athlete doesn't know either, so the viewer learns with him |
| 8.6 s | "people very much dislike that in the hobby", typed *the hobby hates redemptions* | insider knowledge pays off the why |
| 12.4 s | "this product we just ripped had **your most expensive sale ever**. Do you even know…" → ends | a **twist** (it's about HIS card) plus an **unanswered question** at the end → comments ("how much??") and replays |

## Why it beat NBA GOAT
1. **Money + loss.** A specific dollar amount and a dramatic % drop. Everyone feels "I'd be sick if that was my card"; you don't need to know sports *or* cards.
2. **The title promises an event you can watch.** "Watch a ___ lose 97 %" tells the viewer exactly what's coming and makes them want to see it. The graph delivers it visually.
3. **Number in the first second, no setup.** Starts mid-sentence on "$20,000".
4. **Micro-pauses before each number.** The audio dips almost to silence right before "What is it now?" and before "$500". Tiny bits of suspense, every 2 s.
5. **Early payoff, then a chain of open loops.** NBA GOAT holds ONE reveal until 68 %. This one pays the promise at 25 % and immediately opens the next question (why?), answers it (the hobby hates redemptions), then opens another (your most expensive sale ever?). The viewer never gets a moment of "OK, I've seen it".
6. **Learning-along.** Trevor is the one asking "why?". Viewers who don't know redemptions learn something, and collectors feel smart. Both kinds of viewer stay.
7. **Ends on an unanswered question.** "Do you even know…" leaves a gap: people comment the answer or rewatch. (It's a full question, not a chopped word, so it doesn't break the finished-sentence rule.)

## The combined rules (NBA GOAT + Redemptions)
- **Title = a concrete, visual promise with a number or a bold claim** ("Watch a $20K card lose 97 %", "His NBA GOAT has 0 MVPs"). Prefer money, rankings, GOATs, prices, before → after.
- **First second = the most loaded words** (a number, the question). Cut into the middle of the sentence.
- **Pick one engine per clip:**
  - **Delayed reveal** (NBA GOAT): hide the answer to 60–70 %, with a guessing beat before it.
  - **Promise → payoff → new loop** (Redemptions): pay the title off by about 25–30 % with a big visual (graph crash, stamp, meter), then chain why → answer → twist.
- **Put a micro-pause (0.3–0.6 s near-silence) before every key number or name.**
- **Visualize every number** (graph, meter, badge, table). Never leave a figure as words only.
- **Let the viewer learn along with Trevor** when the topic is hobby/insider stuff.
- **End on an open question or a reaction**, never on a wrap-up line. An unanswered question at the end drives comments.
- **15–18 s**, a new beat every 1.5–2.5 s.

## Clips in the library that fit engine #2 (promise → payoff → loops)
- **NFL 1/1 vs Clemson 1/1** (t4 72–83 s): "That's probably like $2,000. Compared to potentially $500… to a million." Value-comparison graph. (Only use it once the "$500 vs $500K" wording is clear: show "$2,000 vs up to $1,000,000".)
- **Tiger patch auto gift** (t2 77–108 s, JorhoTigerGift): any price talk there could become "Watch Trevor find out what this card is worth".
- **Card pulls (JustinAugh)**: the value reveal already works like this. Add a value graph or meter beat after the reveal ("sold for…") and end on "would you keep it or sell it?", which already is an open question.

## Demo built from both formulas (2026-11-04)
`Demo13` (`src/jorho/demo13.tsx`) → `out/demo13_viral_formula_foursome.mp4` (20.7 s), t2 dream golf foursome:
- **Title** "Trevor's FIRST pick for his dream foursome isn't Tiger 💀": a bold claim that hides the answer.
- **0–2.6 s** YouTube card with the question; **2.6–6.3 s** "all-time humans, could be anybody" + chips 🏈 FOOTBALL / 🏀 BASKETBALL / 🎤 ARTIST pop as he lists them.
- **6.3–11.6 s** *thinking…* + **guess reel** spinning legends (Jordan, Tiger, LeBron, Kobe…) with slot ticks; the music dips to −12 dB (`music.dips`, new Spec option) and a 0.55 s silent hold comes right before the line.
- **11.6 s (56 %)** "throw JESUS in there": reel lands on 🙏 JESUS, strobe, ding, green tint, then fahhh.
- **Next loop:** "obviously… Tiger", Tiger cut-out, "the goat in the golf world".
- **Visual proof:** scorecard writes Trevor Lawrence → Jesus 🙏 → Tiger Woods 🐐 → **???**
- **Ending on an open question:** *who's #4?* on "That'd be pretty sick". It loops and invites comments.
