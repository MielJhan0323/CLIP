// NEON CLIP (HardScope R3born Ep 2) — TRIAL of the fused style (user 2026-11-14: "fuse jorho v2 and v1, copy the nice editing
// style but leave out the excessive editing, try 1 trial edit").
//   from v1: black-bar headline, big word-by-word captions (white + yellow keywords, black outline), ONE strobe at the rewind,
//            ONE red tint on the panic beat
//   from v2: ONE typed action label (*first time on a pole*)
//   left out: SFX beds, drifting zooms, cards/overlays covering the shot, multiple graphics. One gentle punch-in only.
// Brief: Ep 2 footage only, hook in 2 s (wildest moment), cut BEFORE it resolves, big readable subtitles, ≥ 7 s, never mention FaZe,
// post tags @hardscope + #r3born.
import type {CSSProperties} from 'react';
import {interpolate} from 'remotion';
import {clamp, sfx, timeline, type TL} from '../../e3/kit';
import {RED, chunkWords, wordsFrom, type Word} from '../../jorho/kit';
import {Jorho, VIRAL_WARM, type Spec} from '../../jorho/clips';
import {TypedAction} from '../../jorho/v2';
import track from '../../plans/data/r3born_ep2.track.json';
import calWords from '../../plans/data/r3born_ep2_cal.words.json';
import poleWords from '../../plans/data/r3born_ep2_pole.words.json';
import obWords from '../../plans/data/r3born_ep2_ob.words.json';
import fiveWords from '../../plans/data/r3born_ep2_five.words.json';
import moreWords from '../../plans/data/r3born_ep2_more.words.json';
import {tighten} from '../../jorho/tighten';

type Track = Spec['track'];
const SRC = 'neon/r3born_ep2.mp4';
const KEY = '#F9FC35';
const caps = (raw: {text: string; startMs: number}[], tl: TL, fix: Record<string, string>, keys: string[]): Word[] =>
  chunkWords(tl.segs.flatMap((s, i) => wordsFrom(raw, timeline([[s[0], s[1]]]), fix).map((w) => ({...w, at: w.at + tl.segOut[i],
    color: keys.includes(w.text.replace(/[^A-Za-z']/g, '')) ? KEY : '#FFFFFF'}))), tl.total, tl.segOut, 180, 12);
const gentlePunch = (a: number, b: number) => (o: number): CSSProperties =>
  ({transform: `scale(${interpolate(o, [a, a + 350, b, b + 450], [1, 1.06, 1.06, 1], {...clamp, easing: (x) => x * x * (3 - 2 * x)})})`});

// pole dancing (Level 2): "Stop me! Stop me!" mid-spin → rewind to "my turn… why is it so hard to get up" → the spin → cut on "Stop me"
const p = timeline([[353300, 355500], [331300, 342060], [344900, 355500]]);
export const NEON_POLE_MS = p.total;
const STOP = p.segOut[2] + (353800 - 344900);
const POLE: Spec = {
  tl: p, src: SRC, track: track as unknown as Track, top: "N3on and Sarah Safari's first pole class", wordY: 1300, wideX: 960, capSize: 74,
  words: caps(poleWords, p, {manly: 'manhood', hood: '', hole: 'pole'}, ['Stop', 'pole', 'hard', 'manhood', 'spin']),
  shots: [[0, 'W'], [p.segOut[1], 'M'], [p.segOut[2], 'W']], strobes: [p.segOut[1]], tints: [[STOP, RED]], swish: [],
  camFx: gentlePunch(STOP - 100, p.total),
  music: {file: 'funk-do-balkan.mp3', from: 42000 - STOP, level: 0},
  inBox: (o) => <TypedAction o={o} a={p.segOut[1] + 400} b={p.segOut[1] + 2600} text="first time on a pole" y={70} />,
};
export const NeonPole = () => <Jorho s={POLE} />;

// ---- TRIAL 2 (user 2026-11-14 on trial 1: "kinda over stim, there's no hook and no focus") ---------------------------------------
// ONE subject, ONE moment: the first calorie check. Hook = "A hundred and three?! … that's impossible", hard cut back, it plays.
// Calmer: no strobe, no tint, no labels, no punch-in, no SFX; one steady WIDE two-shot so the episode's own calorie counter
// (bottom centre: 103 vs 161) stays in frame as the payoff; captions sit ABOVE it, numbers in yellow.
const c = timeline([[214600, 216840], [209200, 219300, 1100], [219500, 224090]]); // 1.1 s freeze after the roast = the fahhh's own beat
export const NEON_CAL_MS = c.total;
const FAH = c.segOut[1] + (219300 - 209200);
// user: "music and sfx too quiet" → "don't make them overlap the voice though": music swells only in the gaps and ducks (smooth
// 150 ms ramps) under every spoken window; the fahhh plays on the freeze-frame, where the speech track is silent.
export const speechDips = (raw: {startMs: number; endMs: number}[], tl: TL, gap = 450): [number, number][] => {
  const w = tl.segs.flatMap((sg, i) => raw.filter((x) => x.endMs > sg[0] && x.startMs < sg[1])
    .map((x) => [tl.segOut[i] + Math.max(x.startMs, sg[0]) - sg[0], tl.segOut[i] + Math.min(x.endMs, sg[1]) - sg[0] + 100] as [number, number]))
    .sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const x of w) { const l = out[out.length - 1]; if (l && x[0] - l[1] < gap) l[1] = Math.max(l[1], x[1]); else out.push([...x]); }
  return out;
};
const CAL: Spec = {
  tl: c, src: SRC, track: track as unknown as Track, top: 'N3on thinks his fitness tracker is broken', wordY: 1010, wideX: 960, capSize: 72,
  words: caps(calWords, c, {}, ['hundred', 'three', '161', '60', 'malfunction', 'impossible']),
  shots: [[0, 'W']], strobes: [FAH], tints: [], swish: [], // user: "add a flash on the fahh"
  // user: "add some text that type out": v2 typed action labels, one per beat, sitting above the shot
  inBox: (o) => <>
    <TypedAction o={o} a={150} b={2150} text="checks his calories" y={70} />
    <TypedAction o={o} a={c.out(212450)} b={c.out(213900)} text="blames the tracker" y={70} />
    <TypedAction o={o} a={FAH} b={FAH + 1500} text="gets roasted" y={70} color="#FF4D4D" glow="rgba(255,77,77,0.55)" />
  </>,
  fah: [FAH + 40], fahVol: 1.6, // fahhh on the roast "I think that's generous for you", over the freeze
  music: {file: 'Sneaky_Snitch.mp3', from: 12000, level: 0, gain: 4, floor: 0.5, ramp: 150, dips: speechDips(calWords, c)},
};
export const NeonCalories = () => <Jorho s={CAL} />;

// ---- NEON 3 (user 2026-11-14: "make one more, make it N3on being obnoxious") — built on the approved tracker clip (reference) ----
// Pole-class calorie check 7:14–7:37: he burns 50 vs Sarah's ~100 → "she crushed you" → "to be fair, we're doing women's exercises"
// → the episode's own "2 HOURS EARLIER" cutaway: "I used ChatGPT, they said men burn more calories than women" (freeze + flash + fahhh)
// → producer: "oh, so you're good" → "fourth-quarter comeback, I'm like LeBron James". Hook = the women's-exercises excuse.
// Audio stays with its own scene (the cutaway is the episode's edit; labelled *2 hours earlier* since the crop hides its badge).
const x = timeline([[442220, 444110], [434150, 445250], [448200, 453450, 1000], [453550, 457560]]);
export const NEON_OB_MS = x.total;
const XS = (i: number, src: number) => x.segOut[i] + src - x.segs[i][0];
const OB_FAH = XS(2, 453450);
const OB: Spec = {
  tl: x, src: SRC, track: track as unknown as Track, top: 'N3on has an excuse for everything', wordY: 1010, capSize: 72, // wideX: N3on stands camera-left; the cutaway is centred past the source's own badge (ours is typed)
  wideX: (t) => (t >= 450120 && t < 455200 ? 1200 : 840),
  words: caps(obWords, x, {Chad: 'Chat'}, ['crushed', "women's", 'exercises', 'woman', 'Chat', 'GPT', 'men', 'LeBron', 'James', 'comeback']),
  shots: [[0, 'W']], strobes: [OB_FAH], tints: [], swish: [],
  inBox: (o) => <>
    <TypedAction o={o} a={XS(1, 438900)} b={XS(1, 441300)} text="gets crushed" y={70} />
    <TypedAction o={o} a={XS(1, 442300)} b={XS(2, 450000)} text="makes excuses" y={70} />
    <TypedAction o={o} a={XS(2, 450150)} b={OB_FAH} text="2 hours earlier" y={70} />
    <TypedAction o={o} a={OB_FAH} b={OB_FAH + 1400} text="source: ChatGPT" y={70} color="#FF4D4D" glow="rgba(255,77,77,0.55)" />
  </>,
  capsOff: [[XS(3, 453550), XS(3, 455250)]], // the episode burns in "Producer: oh so you're good" here, so ours would double it
  fah: [OB_FAH + 40], fahVol: 1.6,
  music: {file: 'Fluffing_a_Duck.mp3', from: 0, level: 0, gain: 4, floor: 0.5, ramp: 150, dips: speechDips(obWords, x)},
};
export const NeonObnoxious = () => <Jorho s={OB} />;

// =====================================================================================================================================
// NEON BATCH 2 (user 2026-11-14: "make me 5 neon clips, make sure it's high virality" + "pull from online virals if you have to").
// All built on the approved tracker template (refs: vault/05 Campaigns/Neon clip/references): one funny moment each, the funniest line
// as the cold open, ONE freeze + flash + fahhh on the roast (never over a voice), 2–3 typed labels, steady wide framing, music loud in
// the gaps and ducked under every line. Viral formulas (from our viral breakdowns, not downloaded clips): cold open on the punchline,
// a dead-stop freeze before/after the roast, end on an open loop (the brief: cut before it resolves). The silks clip skips 684 s
// entirely (a slur is said there).
type Lbl = {at: number; to: number; text: string; red?: boolean; green?: boolean};
const LBL = (l: Lbl) => {
  const c = l.red ? ['#FF4D4D', 'rgba(255,77,77,0.55)'] : l.green ? ['#58EE28', 'rgba(88,238,40,0.55)'] : ['white', 'rgba(255,255,255,0.55)'];
  return (o: number) => <TypedAction key={l.text} o={o} a={l.at} b={l.to} text={l.text} y={70} color={c[0]} glow={c[1]} />;
};
// user 2026-11-14: "add sound effects, it's so dry" → every Neon clip gets: a record scratch on the cold-open → story cut, a short
// whoosh on every other cut, soft typing under each typed label, and 1–2 meme SFX that are SNAPPED INTO SPEECH GAPS (never on a voice);
// then "add awkward effect dings" → ja-ding after the awkward lines ("I can't.", "why are you shaking?", "I got sh*t"…), also gap-snapped.
type Meme = [file: string, at: number, vol?: number, maxMs?: number];
const inGap = (t: number, dips: [number, number][]) => { const w = dips.find(([a, b]) => t >= a && t < b); return w ? w[1] : t; };
const neon = (tl: TL, top: string, keys: string[], fix: Record<string, string>, fahAt: number, music: string, from: number, labels: Lbl[],
  wideX: number | ((src: number) => number) = 960, extra: Partial<Spec> = {}, memes: Meme[] = []): Spec => {
  const dips = speechDips(fiveWords, tl);
  const freezeCut = tl.segs.findIndex((g) => g[2]) + 1; // the cut right after the fahhh freeze already has the flash
  const sfxs = [
    sfx('record-scratch', tl.segOut[1] - 60, 0.22, 450),
    ...tl.segOut.slice(2).filter((_, k) => k + 2 !== freezeCut).map((t) => sfx('fast-whoosh', t - 120, 0.16, 450)),
    ...labels.filter((l) => l.red).slice(0, 1).filter((l) => inGap(l.at, dips) === l.at || l.at === fahAt).map((l) => sfx('keyboard-typing', l.at, 0.09, Math.min(l.to - l.at, l.text.length * 45 + 150))),
    ...memes.map(([f, t, v, m]) => sfx(f, inGap(t, dips), v ?? 0.28, m ?? 900)),
  ];
  return {
    tl, src: SRC, track: track as unknown as Track, top, wordY: 1010, wideX, capSize: 72, grade: VIRAL_WARM, // user: "add the filter this video has"
    // user 2026-11-14: "the clips are overstim, the sfx are good" → no flash, only the roast label; SFX layer kept
    words: caps(fiveWords, tl, fix, keys), shots: [[0, 'W']], strobes: [], tints: [], swish: [],
    inBox: (o) => <>{labels.filter((l) => l.red).slice(0, 1).map((l) => LBL(l)(o))}</>,
    fah: [fahAt + 40], fahVol: 1.6,
    // user 2026-11-14: "the music is too loud" → gain 4→2: under the voice = the standard −14 dB bed, +6 dB swell in the gaps
    // then "bg music is too loud" (again) → gain 1, floor 0.4: ~20 dB under the voice, only the standard bed level in the gaps
    music: {file: music, from, level: 0, gain: 1, floor: 0.4, ramp: 150, dips},
    extraSfx: sfxs,
    ...extra,
  };
};
const at = (tl: TL) => (i: number, src: number) => tl.segOut[i] + src - tl.segs[i][0];

// N4 · the bet: "if you lose, I'm gonna wax your armpit" → "I've worked out with you before… nothing impressive" (freeze + fahhh) →
// "Wait, what's skinny?… now I'm skinny fat". Cold open "I'm waxing your armpit, Neon."
const n4 = timeline([[43300, 44510], [35520, 44510], [51800, 56050, 1000], [56120, 59040]]);
const N4 = at(n4);
export const NEON_BET_MS = n4.total;
export const NeonBet = () => <Jorho s={neon(n4, 'The loser of this workout gets their armpit WAXED', ['armpit', 'fat', 'impressive', 'skinny', 'spicy', 'wax', 'waxing'],
  {Neon: 'N3on', fair: 'fat'}, N4(2, 56050), 'Monkeys_Spinning_Monkeys.mp3', 3000,
  [{at: N4(1, 35600), to: N4(1, 38300), text: 'the punishment'}, {at: N4(1, 40900), to: N4(1, 44400), text: 'loser gets waxed', red: true},
   {at: N4(2, 56050), to: N4(2, 56050) + 1500, text: 'gets roasted', red: true}], 1040, {},
  [['vine-boom', n4.segOut[1] - 300, 0.3], ['rizz-sound-effect', N4(1, 42900), 0.22, 1100], ['ja-ding', N4(1, 37650), 0.3, 1100], ['ja-ding', N4(3, 57400), 0.3, 1100]])} />;

// N5 · Pilates: cold open "my abs are on fire" → "me too" → "you're not even doing sh*t" (freeze + fahhh) → "I'm not following a word
// you're saying, I'm so lost" → "my legs are killing me… a little slower, girl" → "what is a lat?" → "a never-ending dream" →
// "respect to everyone who does this, this is literally impossible".
const n5 = timeline([[157220, 160570, 1000], [113240, 116390], [137920, 143660], [145800, 149520], [186500, 187800], [196540, 201829]]);
const N5 = at(n5);
export const NEON_PILATES_MS = n5.total;
export const NeonPilates = () => <Jorho s={neon(n5, 'N3on thought Pilates would be easy', ['abs', 'ending', 'fire', 'impossible', 'killing', 'lat', 'lost', 'never', 'slower'],
  {shit: 'sh*t', fuck: 'f***'}, N5(0, 160570), 'joyful-chess-slowed.mp3', 4000,
  [{at: N5(0, 160570), to: N5(0, 160570) + 1500, text: 'gets roasted', red: true}, {at: N5(1, 113300), to: N5(1, 116300), text: 'first Pilates class'},
   {at: N5(5, 196600), to: N5(5, 201700), text: 'humbled', green: true}], (t) => (t >= 156000 && t < 161000 ? 760 : 960),
  {music: {file: 'joyful-chess-slowed.mp3', from: 0, level: 0, gain: 0}},
  [['error', N5(1, 116000), 0.25], ['huh-cat', N5(3, 149100), 0.25, 700], ['spongebob-boowomp', N5(4, 187400), 0.25, 1100], ['ja-ding', N5(2, 143500), 0.3, 1100]])} />; // user: "for clip 2 make there be no sound" (no music; the class audio carries it)

// N6 · headstand: cold open "there's nothing back there to look at" (freeze + fahhh) → "headstand, handstand time" → "I don't trust her,
// move… I just don't want my butt crack to pop out" → "why are you shaking?" → "I trust the former stripper, not Sarah" → "I did it!"
const n6 = timeline([[385960, 389130, 1000], [359840, 361010], [382600, 389130], [392020, 395740], [399400, 402520], [409100, 412990]]);
const N6 = at(n6);
export const NEON_HEADSTAND_MS = n6.total;
export const NeonHeadstand = () => <Jorho s={neon(n6, "N3on's only fear during the headstand", ['trust', 'butt', 'crack', 'nothing', 'shaking', 'stripper'],
  {}, N6(0, 389130), 'funk-do-balkan.mp3', 42000,
  [{at: N6(0, 389130), to: N6(0, 389130) + 1500, text: 'violated', red: true}, {at: N6(3, 392100), to: N6(3, 395700), text: 'shaking'},
   {at: N6(5, 411800), to: n6.total, text: 'he did it', green: true}], 960, {},
  [['vine-boom', N6(2, 384800), 0.28], ['anime-wow', N6(5, 412600), 0.25, 1200], ['ja-ding', N6(3, 395300), 0.3, 1100], ['ja-ding', N6(4, 402200), 0.3, 1100]])} />;

// N7 · silks: cold open "you know I'm a scammer, I'm a cheater" (freeze + fahhh) → "I'm down 50… I gotta use the restroom, I'll be right
// back" → (back) "what are you doing?… you were running around a pool, are you trying to burn calories?" → "Sarah, don't touch me, I'm
// gonna sue you… check the calories, there's no way that burned 50 calories, gang". 683.6–684.1 (slur) is never used.
const n7 = timeline([[650540, 652670, 1000], [639720, 643960], [685100, 692600], [695200, 702090]]);
const N7 = at(n7);
export const NEON_BATHROOM_MS = n7.total;
export const NeonBathroom = () => <Jorho s={neon(n7, 'N3on took a "bathroom break" to win', ['calories', 'cheater', 'pole', 'restroom', 'scammer', 'sue'],
  {fuck: 'f***', shit: 'sh*t', pool: 'pole'}, N7(0, 652670), 'Investigations.mp3', 8000,
  [{at: N7(0, 652670), to: N7(0, 652670) + 1500, text: 'admits it', red: true}, {at: N7(1, 641100), to: N7(1, 643900), text: 'bathroom break'},
   {at: N7(2, 685100), to: N7(2, 689000), text: 'comes back "tired"'}], (t) => (t >= 685000 && t < 693000 ? 820 : 960), {},
  [['spongebob-boowomp', N7(1, 642000), 0.28, 1300], ['taco-bell-bong', N7(2, 689200), 0.22, 900], ['ja-ding', N7(1, 643800), 0.3, 1100], ['ja-ding', N7(3, 697300), 0.3, 1100]])} />;

// N8 · results: cold open "don't touch me, I'm gonna sue you" / "sue me, I got good lawyers" → "let's see who won" → "326 calories" →
// "dumbass… [389]… dumbass" (freeze + fahhh) → "I was gonna do eyebrow, but I can't, I'll do calf" → "oh, I'm so scared" → "three, two,
// one" — cut before the wax lands (brief: cut before it resolves).
// user 2026-11-14: "stop cutting off the video before the climax" → now runs through the wax: "3, 2, 1… what? AH! wow, this is really
// good wax" (the setup bits "let's see who won" / "I'll do calf" / "so scared" are dropped to stay ≤ 25 s).
const n8 = timeline([[753100, 756190], [726600, 737490, 1000], [757640, 766790]]);
const N8 = at(n8);
export const NEON_WAX_MS = n8.total;
export const NeonWax = () => <Jorho s={neon(n8, 'N3on lost the bet… time for the wax', ['Dumbass', 'Three', 'lawyers', 'one', 'sue', 'two', 'wax', 'Ah', 'follicle'],
  {fuck: 'f***', neon: 'N3on'}, N8(1, 737490), 'Sneaky_Snitch.mp3', 20000,
  [{at: N8(1, 737490), to: N8(1, 737490) + 1500, text: 'N3on lost', red: true}], 960, {speechGain: 1.25},
  [['ja-ding', N8(0, 756000), 0.3, 1100], ['heartbeat-loud', n8.segOut[2] - 900, 0.2, 900], ['vine-boom', N8(2, 763300), 0.3]])} />;

// =====================================================================================================================================
// NEON BATCH 3 (user 2026-11-14: "5 more n3on clips with insured virality… reflect in your output to ensure virality").
// Approved Neon template (batch 2: calm, warm grade, one roast label, one freeze + fahhh, gap SFX, low music, END ON THE CLIMAX) +
// the viral lessons that DON'T add stim: curiosity-gap titles, dead-air trims (pauses > 0.38 s cut, word tails kept), and the ending
// lands LOUD: music swells ×2.5 + a boom on a ~0.8 s reaction tail AFTER the last word (viral #3 ending), never over a voice.
type Raw = {text: string; startMs: number; endMs: number}[];
const neon3 = (segs0: [number, number, number?][], top: string, keys: string[], fix: Record<string, string>, fah: number | null, music: string, from: number,
  label: {src: number; text: string} | null, memes: [string, number, number?, number?][] = [], wideX: number | ((src: number) => number) = 960) => {
  const raw = moreWords as Raw;
  const segs = tighten(segs0 as never, raw);
  const last = segs[segs.length - 1];
  const after = [...raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  segs[segs.length - 1] = [last[0], Math.max(last[1], Math.min(last[1] + 800, after - 60)), last[2] ?? 0];
  const tl = timeline(segs);
  const hookN = tighten([segs0[0]] as never, raw).length;
  const out = (src: number) => { for (let i = hookN; i < segs.length; i++) if (src >= segs[i][0] && src < segs[i][1] + (segs[i][2] ?? 0)) return tl.segOut[i] + Math.min(src, segs[i][1]) - segs[i][0]; return 0; };
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  const dips = speechDips(raw, tl);
  const fahAt = fah !== null ? out(fah) : -1;
  return {total: tl.total, spec: {
    tl, src: SRC, track: track as unknown as Track, top, wordY: 1010, wideX, capSize: 72, grade: VIRAL_WARM,
    words: caps(raw, tl, fix, keys), shots: [[0, 'W']], strobes: [], tints: [], swish: [],
    inBox: (o: number) => (label ? <TypedAction o={o} a={out(label.src)} b={out(label.src) + 1500} text={label.text} y={70} color="#FF4D4D" glow="rgba(255,77,77,0.55)" /> : null),
    fah: fahAt >= 0 ? [fahAt + 40] : [], fahVol: 1.6,
    music: {file: music, from, level: 0, gain: 1, floor: 0.4, ramp: 150, dips, swell: [end, 2.5]},
    extraSfx: [sfx('record-scratch', tl.segOut[1] - 60, 0.2, 450),
      ...tl.segOut.slice(2).filter((t) => dips.every(([a, b]) => t < a || t >= b)).map((t) => sfx('fast-whoosh', t - 120, 0.12, 400)),
      ...(label ? [sfx('keyboard-typing', out(label.src), 0.09, label.text.length * 45 + 150)] : []),
      ...memes.map(([f, t, v, m]) => sfx(f, inGap(out(t), dips), v ?? 0.26, m ?? 900)),
      sfx('bass-boosted-vine-boom', end + 40, 0.16, 900)],
  } as Spec};
};

const N9 = neon3([[80800, 83900], [61500, 66500], [78700, 84100, 1000], [90100, 94000]], 'N3on asked the Pilates instructor THIS',
  ['kidding', 'Pilates', 'pilates', 'prison', 'straight', 'losing', 'easy', 'glasses'], {pilates: 'Pilates'}, 84100, 'Monkeys_Spinning_Monkeys.mp3', 2000,
  {src: 84100, text: 'asked the real question'}, [['ja-ding', 79500, 0.26, 1000], ['huh-cat', 66500, 0.22, 700]]);
export const NeonPilatesQ = () => <Jorho s={N9.spec} />;
export const NEON_PILATESQ_MS = N9.total;

const N10 = neon3([[568000, 569800], [543700, 547600], [549300, 558000], [566000, 570000, 1000], [573600, 574600]], 'Sarah vs N3on: who can hold it longer?',
  ['winner', 'tuck', 'longest', 'go', 'Really', 'dude', 'hands'], {}, 570000, 'Sneaky_Snitch.mp3', 20000,
  {src: 570000, text: 'lost again'}, [['ja-ding', 574700, 0.26, 1000], ['heartbeat-loud', 555000, 0.18, 2500]]);
N10.spec.speechGain = 1.4;
export const NeonTuck = () => <Jorho s={N10.spec} />;
export const NEON_TUCK_MS = N10.total;

const N11 = neon3([[716600, 718800], [602600, 608500], [617200, 622000], [706100, 708600], [712200, 718800]], 'N3on finally found something he is good at',
  ['spider', 'man', 'god', 'best', 'good', 'bad', 'fun'], {'-man': 'man', shit: 'sh*t'}, null, 'joyful-chess-slowed.mp3', 4000,
  {src: 713600, text: 'finally good at something'}, [['anime-wow', 622000, 0.24, 1200], ['ja-ding', 715200, 0.24, 1000]]);
N11.spec.speechGain = 1.15;
export const NeonSpider = () => <Jorho s={N11.spec} />;
export const NEON_SPIDER_MS = N11.total;

const N12 = neon3([[418100, 421700], [416100, 429700]], 'N3on gained a new respect for pole dancers',
  ['technique', 'hard', 'work', 'salute', 'respect', 'brother'], {ask: 'a**'}, null, 'experience-einaudi.mp3', 30000,
  {src: 423600, text: 'respect'}, [['ja-ding', 421700, 0.24, 1000]]);
N12.spec.speechGain = 1.45;
export const NeonRespect = () => <Jorho s={N12.spec} />;
export const NEON_RESPECT_MS = N12.total;

const N13 = neon3([[244500, 245700], [225000, 226200], [230000, 232800], [242400, 245700], [246600, 257700, 1000]], 'N3on was WAY too excited for this class',
  ['strippers', 'thrown', 'excited', 'Pilates', '17', 'years', 'stripper', 'Hell', 'yeah'], {}, 257700, 'funk-do-balkan.mp3', 42000,
  {src: 257700, text: 'way too excited'}, [['ja-ding', 232800, 0.26, 1000], ['vine-boom', 245800, 0.24]]);
export const NeonExcited = () => <Jorho s={N13.spec} />;
export const NEON_EXCITED_MS = N13.total;
