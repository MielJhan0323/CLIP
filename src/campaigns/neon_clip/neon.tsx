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
import {clamp, timeline, type TL} from '../../e3/kit';
import {RED, chunkWords, wordsFrom, type Word} from '../../jorho/kit';
import {Jorho, type Spec} from '../../jorho/clips';
import {TypedAction} from '../../jorho/v2';
import track from '../../plans/data/r3born_ep2.track.json';
import calWords from '../../plans/data/r3born_ep2_cal.words.json';
import poleWords from '../../plans/data/r3born_ep2_pole.words.json';

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
const speechDips = (raw: {startMs: number; endMs: number}[], tl: TL, gap = 450): [number, number][] => {
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
