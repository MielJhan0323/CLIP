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
