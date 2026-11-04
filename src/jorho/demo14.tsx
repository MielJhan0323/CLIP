// DEMO 14 (2026-11-04): "throws better going left" (t3), built from the viral PRINCIPLES only, not the same tools
// (user: "don't make it similar… only copy which parts of the video need to be grasping"). No YouTube card / reel / scorecard /
// typed text / chalk board / cut-outs. Principles used:
// - hook = a claim that sounds wrong (a right-hander who's better going LEFT), first second, with a visual gag on the word
// - open loops chained: why? → coaches only roll right → he hated it → so he trained left → now it's his better side
// - contrast before the turn: a dead stop (freeze + record scratch + PAUSE) on "I just hated that"
// - ending on a reaction (a slow push-in on the over-the-top compliment), so it loops
// New visual language: mirror-flip whip on "left", a VHS home-video flashback for the childhood story, big moving type
// that travels in the direction he's describing.
import {AbsoluteFill, interpolate} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, sfx, timeline} from '../e3/kit';
import {GREEN, RED, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
const t14 = timeline([[48000, 50600], [16200, 18900], [21140, 23720], [25720, 29000], [29140, 31250], [32100, 33250, 600], [33860, 36200], [44820, 46300],
  [50840, 52700]]);
const Y = {left: t14.out(49440), right: t14.out(49920), kid: t14.segOut[2], rollouts: t14.out(28220), most: t14.out(29560), hated: t14.out(32800),
  freeze: t14.segOut[5] + 1150, back: t14.segOut[6], threw: t14.out(34440), left2: t14.out(36060), left3: t14.out(45520), best: t14.segOut[8]};
export const DEMO14_MS = t14.total;

const FLIPS: [number, number][] = [[Y.left, Y.right], [Y.left2 - 60, Y.left2 + 420], [Y.left3 - 60, Y.left3 + 420]];
const flipK = (o: number) => {
  for (const [a, b] of FLIPS) if (o >= a - 1 && o < b + 160) return interpolate(o, [a, a + 160, b, b + 160], [1, -1, -1, 1], clamp);
  return 1;
};
const VHS = (o: number) => o >= Y.kid && o < Y.back;
const camFx = (o: number) => {
  const k = flipK(o);
  const punch = o >= Y.freeze ? interpolate(o, [Y.freeze, Y.freeze + 90], [1, 1.22], clamp) : 1; // dead stop on "hated"
  const push = o >= Y.best ? interpolate(o, [Y.best, t14.total], [1, 1.16], clamp) : 1;
  const sc = (o < Y.back ? punch : 1) * push;
  return {transform: `scaleX(${k}) scale(${sc})`, filter: VHS(o) ? 'sepia(0.55) saturate(1.7) contrast(1.2) brightness(1.05) hue-rotate(-14deg) blur(1px)' : undefined};
};
// VHS overlay: scanlines, a rolling tracking band, PLAY ▶ → ❚❚ PAUSE on the freeze, and a date stamp
const VhsOverlay = ({o}: {o: number}) => {
  if (!VHS(o)) return null;
  const paused = o >= Y.freeze;
  const band = ((o - Y.kid) / 9) % 1300 - 200;
  const blink = Math.floor(o / 500) % 2 === 0;
  const t = {fontFamily: '"VCR OSD Mono", "Courier New", monospace', fontWeight: 700, fontSize: 52, color: 'white', textShadow: '3px 0 rgba(255,0,60,0.6), -3px 0 rgba(0,200,255,0.6)'};
  return <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 5px)'}} />
    {!paused && <div style={{position: 'absolute', left: 0, right: 0, top: band, height: 60, background: 'linear-gradient(transparent, rgba(255,255,255,0.12), transparent)',
      filter: 'blur(2px)'}} />}
    <div style={{position: 'absolute', left: 50, top: 40, ...t}}>{paused ? '❚❚ PAUSE' : (blink ? 'PLAY ▶' : 'PLAY')}</div>
    <div style={{position: 'absolute', right: 50, top: 40, ...t, fontSize: 40}}>SP 0:0{Math.floor((o - Y.kid) / 1000)}</div>
    <AbsoluteFill style={{boxShadow: 'inset 0 0 140px rgba(0,0,0,0.7)', background: 'rgba(255,140,60,0.08)'}} />
  </AbsoluteFill>;
};
// moving type: the word travels the way he's describing (→ for "roll right", ← for "going left"), repeated like a marquee
const Marquee = ({o, a, b, text, dir, color, y}: {o: number; a: number; b: number; text: string; dir: 1 | -1; color: string; y: number}) => {
  if (o < a || o >= b) return null;
  const x = ((o - a) / (b - a)) * 1400 * dir;
  const fade = Math.min(ease(o, a, 120), 1 - ease(o, b - 150, 150));
  return <div style={{position: 'absolute', top: y, left: -900 + x + (dir < 0 ? 900 : 0), whiteSpace: 'nowrap', opacity: fade, fontFamily: MONT, fontWeight: 900,
    fontStyle: 'italic', fontSize: 120, color, WebkitTextStroke: '6px #111', paintOrder: 'stroke fill', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
    transform: `skewX(${-12 * dir}deg)`}}>{Array(4).fill(text).join('   ')}</div>;
};
const DEMO: Spec = {
  tl: t14, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: "He's right-handed… but BETTER going left?", wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, t14, {uh: '', i: 'I'}, {left: '#58EE28', right: '#F9FC35', hated: '#FF4D4D', best: '#58EE28', kid: '#F9FC35'}),
  shots: [[0, 'M'], [t14.segOut[1], 'M'], [Y.kid, 'W'], [Y.rollouts - 1200, 'M'], [t14.segOut[4], 'M'], [Y.back, 'W'], [t14.segOut[7], 'M'], [Y.best, 'M']],
  strobes: [Y.back], tints: [[Y.left, GREEN], [Y.hated, RED], [Y.back + 300, GREEN], [Y.left3, GREEN]], swish: [Y.left2 - 60, Y.left3 - 60],
  camFx,
  music: {file: 'acido-iii.mp3', from: 20000, level: 0, dips: [[Y.hated - 400, Y.back]]},
  inBox: (o) => <>
    <VhsOverlay o={o} />
    <Marquee o={o} a={Y.rollouts - 100} b={t14.segOut[4] + 900} text="ROLL RIGHT →" dir={1} color="#F9FC35" y={110} />
    <Marquee o={o} a={Y.threw} b={Y.left2 + 400} text="← LEFT" dir={-1} color="#9BE600" y={110} />
  </>,
  extraSfx: [sfx('mg-swoosh', Y.left, 0.22), sfx('projector', Y.kid, 0.3, Y.freeze - Y.kid), sfx('record-scratch', Y.freeze, 0.3), sfx('mg-whoosh', Y.rollouts - 100, 0.18),
    sfx('mg-whoosh', Y.threw, 0.2)],
};
export const Demo14 = () => <Jorho s={DEMO} />;
