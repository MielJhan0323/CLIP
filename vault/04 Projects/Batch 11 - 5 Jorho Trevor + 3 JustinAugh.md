---
tags: [project, batch, jorho, justinaugh]
date: 2026-11-03
---
# Batch 11: 5 more Trevor clips in Jorho (normal) + 3 JustinAugh pulls

User ask (2026-11-03): "make 5 more trevor clips using jorho normal and 3 more justin augh break clips".

## Jorho (src/jorho/batch11.tsx): all moments never cut before
| comp | out | moment | assets | music |
|---|---|---|---|---|
| J11Rookie | j11_peyton_rookie_year.mp4 (20.5 s) | u4 20.5–51.5 s: Peyton got him through the rookie year | Peyton cut-out, head circle + TREVOR LAWRENCE + ding, *rookie year: 3-14* (red), *Peyton: 28 INTs as a rookie* | Experience (Einaudi) |
| J11Stapleton | j11_stapleton_foursome.mp4 (19.4 s) | t2 45–76 s: Tiger, then Chris Stapleton, shout-out to the parents | Tiger cut-out, 🎤 pop, head circle, *shout out the parents* | Lose You |
| J11GodGiven | j11_god_given.mp4 (16.7 s) | t3 opening: "is that accuracy God-given?" → worked on it since he was a kid | strobe + 🙏 on "God-given", *15 rollouts in a row*, head circle | Spooky phonk (fennecxx) |
| J11Closet | j11_closet.mp4 (20.7 s) | t4 36–66 s: gifting yourself is weird → kept game-worn stuff from big games in his closet | 🤔 + awkward ding on "kind of weird", *signs these for fans*, head circle, 🏆 | Monkeys Spinning Monkeys |
| J11Algo | j11_algorithm.mp4 (22.6 s) | t3 67–109 s: the Traveling Trevors were all over his Instagram algorithm | 📱 pop, *the algorithm knew*, awkward ding on "that's weird", head circle | Investigations |

Skipped: the t4 "1/1 NFL vs 1/1 Clemson" value bit. Grant says "$500 to a million" and it's unclear whether that means $500K, so no number goes on screen.

## JustinAugh (src/justinaugh/batch.tsx)
| comp | out | pull | hook | music |
|---|---|---|---|---|
| JaHunter | ja_hunter_purple_kaboom.mp4 (22.8 s) | Travis Hunter purple on-card Kaboom auto 1/1 from a "pick 3, choose 1", $10K+ (the f-word at 2.5 s is cut) | funny_scream | Montagem Uranium |
| JaCaleb | ja_caleb_two_papas.mp4 (19.3 s) | Caleb Williams Papa auto 1/1, $20–30K, release day, 30 min after their first Papa ("Chicago Bears" cut before the reveal) | cmon | Vem Pererê Reka |
| JaLebron… | pending | LeBron James Papa auto 1/1 (no comps), Bowman Sapphire | rip_table (planned) | amor-na-praia (planned) |

- New makeJa option `hostGain`: the Caleb stream screams at 0 dB RMS (the first render came out −7.3 LUFS), so `hostGain: 0.3` → −13.5 LUFS.
- Card stills cropped from the stream: `cards2/lebron_papa.png`, `caleb_papa.png`, `hunter_kaboom.png`.
