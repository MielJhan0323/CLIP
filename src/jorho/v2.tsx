// Jorho v2 (vault/02 Style Guide/Jorho v2 style.md): the Jorho frame (bars, 💀 top line, one-word captions, strobes, tints, beep)
// + explainer motion graphics INSIDE the video box, copied from 3 reference edits:
// white "question card" opener, stat badges, grade/dot grids, stat bars, timelines, formation arrows, stickers, red strike-through,
// red circle on the key caption word. Mix each clip from these parts; don't use all of them every time.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import cellyWords from '../plans/data/u2_psa10_celly.words.json';
import cellyTrack from '../plans/data/u2_psa10_celly.seats.json';
import {MONT} from '../e3/bars';
import {Cam, clamp, ease, pop, sfx, timeline, type CamCfg, type TL, type Track} from '../e3/kit';
import {BOX_H, GREEN, RED, STROBE_CUT, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';

const BW = 1080;
export const V2 = {green: '#9BE600', dark: 'rgba(20,22,26,0.92)', ink: '#111', red: '#FF2B2B', paper: '#F3F3F1'};
const on = (o: number, a: number, b: number) => o >= a && o < b;
const fadeIO = (o: number, a: number, b: number, d = 180) => Math.min(ease(o, a, d), 1 - ease(o, b - d, d));

// white page with the cam in a rounded card (green corner brackets) and a typed question on top
export const QuestionCard = ({o, a, b, q, cam}: {o: number; a: number; b: number; q: string; cam: CamCfg}) => {
  if (!on(o, a, b)) return null;
  const p = fadeIO(o, a, b, 160);
  const shown = q.slice(0, Math.max(0, Math.ceil((o - a - 150) / 45)));
  const k = 0.72 + 0.04 * ease(o, a, b - a);
  const W = BW * k, Hh = BOX_H * k * 0.82;
  return <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, #FFFFFF, ${V2.paper})`, opacity: p}}>
    <div style={{position: 'absolute', top: 40, width: BW, textAlign: 'center', fontFamily: MONT, fontWeight: 700, fontSize: 50, color: V2.ink, padding: '0 70px', boxSizing: 'border-box'}}>
      {shown}<span style={{opacity: Math.floor(o / 260) % 2}}>|</span></div>
    <div style={{position: 'absolute', left: (BW - W) / 2, top: 200, width: W, height: Hh, borderRadius: 28, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.25)'}}>
      <div style={{position: 'absolute', left: -(BW - W) / 2, top: -110, width: BW, height: BOX_H}}><Cam c={cam} o={o} /></div>
    </div>
    {[[0, 0, 'Top', 'Left'], [1, 0, 'Top', 'Right'], [0, 1, 'Bottom', 'Left'], [1, 1, 'Bottom', 'Right']].map(([x, y, v, h], i) => (
      <div key={i} style={{position: 'absolute', width: 46, height: 46, borderColor: V2.green, borderStyle: 'solid', borderWidth: 0, left: (BW - W) / 2 - 14 + (x as number) * (W - 18), top: 186 + (y as number) * (Hh - 18),
        [`border${v}Width`]: 7, [`border${h}Width`]: 7, borderRadius: 8}} />))}
  </AbsoluteFill>;
};
// dark rounded badge, big number + small green label (top-right of the box)
export const StatBadge = ({o, a, b, big, label, x = 690, y = 40}: {o: number; a: number; b: number; big: string; label: string; x?: number; y?: number}) => {
  if (!on(o, a, b)) return null;
  const s = pop(o, a, 11, 260);
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s})`, transformOrigin: '50% 0', opacity: 1 - ease(o, b - 150, 150),
    background: V2.dark, borderRadius: 26, padding: '14px 30px', textAlign: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.35)'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 92, lineHeight: '96px', color: 'white'}}>{big}</div>
    <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: V2.green}}>{label}</div>
  </div>;
};
// row of grade dots 1..n that fill one by one; the last one lights green with a label
export const GradeScale = ({o, a, b, n = 10, label, title}: {o: number; a: number; b: number; n?: number; label: string; title: string}) => {
  if (!on(o, a, b)) return null;
  const p = fadeIO(o, a, b);
  return <AbsoluteFill style={{background: 'rgba(8,10,14,0.62)', opacity: p}}>
    <div style={{position: 'absolute', top: 120, width: BW, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 64, color: 'white'}}>{title}</div>
    {Array.from({length: n}, (_, i) => {
      const t = a + 250 + i * 110; const lit = o >= t; const last = i === n - 1;
      return <div key={i} style={{position: 'absolute', left: 95 + i * 92, top: 420, width: 70, height: 70, borderRadius: 35,
        border: `5px solid ${last && lit ? V2.green : 'rgba(255,255,255,0.8)'}`, background: lit ? (last ? V2.green : 'rgba(255,255,255,0.85)') : 'transparent',
        transform: `scale(${lit ? 0.85 + 0.15 * pop(o, t, 10, 300) * (last ? 1.25 : 1) : 0.85})`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MONT, fontWeight: 900, fontSize: 30, color: lit ? '#111' : 'white', boxShadow: last && lit ? `0 0 30px ${V2.green}` : undefined}}>{i + 1}</div>;
    })}
    {o >= a + 250 + (n - 1) * 110 && <div style={{position: 'absolute', left: 95 + (n - 1) * 92 - 60, top: 510, width: 190, textAlign: 'center', fontFamily: MONT,
      fontWeight: 900, fontSize: 30, color: V2.green, transform: `scale(${pop(o, a + 250 + (n - 1) * 110, 10, 260)})`}}>{label}</div>}
  </AbsoluteFill>;
};
// white tilted sticker label ("NOT A CELLY GUY")
export const Sticker = ({o, a, b, text, x, y, rot = -6}: {o: number; a: number; b: number; text: string; x: number; y: number; rot?: number}) => {
  if (!on(o, a, b)) return null;
  return <div style={{position: 'absolute', left: x, top: y, transform: `rotate(${rot}deg) scale(${pop(o, a, 9, 320)})`, opacity: 1 - ease(o, b - 120, 120),
    background: 'white', border: '5px solid #111', borderRadius: 10, padding: '6px 18px', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#111',
    boxShadow: '6px 6px 0 rgba(0,0,0,0.6)'}}>{text}</div>;
};
// condensed heading that gets a red strike-through drawn across it
export const Strike = ({o, a, b, text, y = 60}: {o: number; a: number; b: number; text: string; y?: number}) => {
  if (!on(o, a, b)) return null;
  const line = interpolate(o - a - 350, [0, 220], [0, 1], clamp);
  return <div style={{position: 'absolute', top: y, width: BW, textAlign: 'center', opacity: fadeIO(o, a, b, 140)}}>
    <span style={{position: 'relative', fontFamily: 'Oswald', fontWeight: 700, fontSize: 84, color: 'white', textShadow: '0 4px 14px rgba(0,0,0,0.7)'}}>{text}
      <span style={{position: 'absolute', left: -12, top: '52%', height: 12, width: `calc(${line * 100}% + 24px)`, background: V2.red, borderRadius: 6}} /></span>
  </div>;
};
// red hand-drawn ring around the caption word (caption sits at wordY on the full frame → box y = wordY - 417)
export const WordRing = ({o, a, b, y, w = 220}: {o: number; a: number; b: number; y: number; w?: number}) => {
  if (!on(o, a, b)) return null;
  const p = interpolate(o - a, [0, 180], [0, 1], clamp);
  const C = Math.PI * (w + 70);
  return <svg width={BW} height={BOX_H} style={{position: 'absolute', inset: 0}}>
    <ellipse cx={BW / 2} cy={y} rx={w / 2 + 10} ry={52} fill="none" stroke={V2.red} strokeWidth={8} strokeDasharray={C} strokeDashoffset={C * (1 - p)}
      transform={`rotate(-8 ${BW / 2} ${y})`} />
  </svg>;
};
export const Layer = ({children}: {children: ReactNode}) => <AbsoluteFill>{children}</AbsoluteFill>;

// ================= demo: u2 PSA 10 celly in Jorho v2 =================================================================
const yTl: TL = timeline([[3940, 8100], [8380, 9000], [9480, 11500], [16800, 18200], [20800, 22640, 480], [22640, 25400], [25480, 28200], [28600, 29700],
  [30700, 31500], [31900, 32600]]);
export const V2_CELLY_MS = yTl.total;
const Y = {celly: yTl.out(5200), maybe: yTl.segOut[1], easy: yTl.out(11060), point: yTl.out(18040), psa: yTl.segOut[5], best: yTl.out(24560),
  ten1: yTl.out(27580), ten2: yTl.out(27840), ten3: yTl.out(28000), its: yTl.segOut[7], like: yTl.segOut[8], yo: yTl.segOut[9]};
const CAM: CamCfg = {src: 'pod2/u2_psa10_celly.mp4', tl: yTl, track: cellyTrack as unknown as Track, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H],
  baseH: 640, faceY: 0.42, wideX: 760, who: () => 'W'};
const WORD_Y = 1170;
const CELLY_V2: Spec = {
  tl: yTl, src: 'pod2/u2_psa10_celly.mp4', track: cellyTrack as unknown as Track, top: 'Trevor finally got a touchdown celly fr', wordY: WORD_Y, wideX: 760,
  words: wordsFrom(cellyWords, yTl, {selly: 'celly', '1010': '10', tutti: 'TD'}, {celly: '#58EE28', PSA: '#21F5E6', '10': '#F9FC35', easy: '#58EE28'}),
  shots: [[0, 'W'], [Y.maybe, 'M'], [yTl.segOut[2], 'W'], [Y.psa + STROBE_CUT, 'M'], [Y.ten1 - 240 + STROBE_CUT, 'M'], [Y.its, 'W'], [Y.like, 'M']],
  strobes: [Y.psa, Y.ten1 - 240],
  beeps: [yTl.segOut[4] + 1840],
  tints: [[Y.celly, GREEN], [Y.maybe, RED], [Y.psa + STROBE_CUT, GREEN], [Y.yo, GREEN]],
  swish: [Y.celly, Y.yo],
  music: {file: 'eclipser.mp3', from: 15800 - Y.psa, level: 0},
  inBox: (o) => <Layer>
    <QuestionCard o={o} a={0} b={2300} q="Does Trevor even have a TD celly?" cam={CAM} />
    <Sticker o={o} a={Y.maybe} b={yTl.segOut[2]} text="NOT A CELLY GUY" x={90} y={70} />
    <StatBadge o={o} a={Y.point} b={Y.point + 1300} big="☝️" label="JUST A POINT" />
    <GradeScale o={o} a={Y.psa + 300} b={Y.psa + 2700} title="PSA GRADE" label="GEM MINT" />
    <StatBadge o={o} a={Y.ten1 - 240 + STROBE_CUT} b={Y.its} big="10·10·10" label="THE CELLY" x={300} />
    <WordRing o={o} a={Y.ten1} b={Y.ten3 + 500} y={WORD_Y - 417 + 6} w={120} />
    <Sticker o={o} a={Y.its} b={Y.like + 600} text="EASY ✅" x={640} y={80} rot={5} />
  </Layer>,
  extraSfx: [
    sfx('keyboard-typing', 150, 0.18, 1500),
    sfx('jv2-sudden-suspense-boom', 2300, 0.14), sfx('fast-whoosh', 2300, 0.3),
    sfx('jv2-pop-button', Y.maybe, 0.35), sfx('jv2-pop-button', Y.point, 0.3),
    ...Array.from({length: 10}, (_, i) => sfx('mg-click', Y.psa + 550 + i * 110, 0.22)),
    sfx('ding-2', Y.psa + 550 + 9 * 110, 0.25),
    sfx('jv2-smash-bros-hit', Y.ten1, 0.18), sfx('jv2-smash-bros-hit', Y.ten2, 0.16), sfx('jv2-smash-bros-hit', Y.ten3, 0.2),
    sfx('jv2-pop-button', Y.its, 0.3),
  ],
};
export const JorhoV2Celly = () => <Jorho s={CELLY_V2} />;
