// Jorho v2 (vault/02 Style Guide/Jorho v2 style.md): the Jorho frame (bars, 💀 top line, one-word captions, strobes, tints, beep)
// + explainer motion graphics INSIDE the video box, copied from 3 reference edits:
// white "question card" opener, stat badges, grade/dot grids, stat bars, timelines, formation arrows, stickers, red strike-through,
// red circle on the key caption word. Mix each clip from these parts; don't use all of them every time.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import cellyWords from '../plans/data/u2_psa10_celly.words.json';
import cellyTrack from '../plans/data/u2_psa10_celly.seats.json';
import {MONT} from '../e3/bars';
import {Cam, SANS, clamp, ease, pop, sfx, timeline, type CamCfg, type TL, type Track} from '../e3/kit';
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
// YouTube-style watch page: the clip plays in a 16:9 player (red progress bar, scrubber, controls, time), the question is the video title,
// channel row with Subscribe, like/share pills. The cam shrinks from the full box into the player on entry.
const Ico = ({d, size = 34, fill = 'white'}: {d: string; size?: number; fill?: string}) => <svg width={size} height={size} viewBox="0 0 24 24"><path d={d} fill={fill} /></svg>;
const I = {pause: 'M6 5h4v14H6zM14 5h4v14h-4z', next: 'M6 6l8.5 6L6 18zM16 6h2v12h-2z', vol: 'M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z',
  cc: 'M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 7H9.5v-.5h-2v3h2V14H11v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1zm7 0h-1.5v-.5h-2v3h2V14H18v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1z',
  gear: 'M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7 7 0 0 0-1.7-1L15 3h-4l-.4 2.9a7 7 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7 7 0 0 0 1.7 1L11 21h4l.4-2.9a7 7 0 0 0 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z',
  full: 'M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3h-3v2h5v-5h-2z',
  like: 'M2 21h4V9H2zm20-11a2 2 0 0 0-2-2h-6.3l1-4.6v-.3a1.5 1.5 0 0 0-.4-1L13 1 6.6 7.6A2 2 0 0 0 6 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 1.8-1.2l3-7.1a2 2 0 0 0 .2-.7z',
  dislike: 'M15 3H6a2 2 0 0 0-1.8 1.2l-3 7.1a2 2 0 0 0-.2.7v2a2 2 0 0 0 2 2h6.3l-1 4.6v.3a1.5 1.5 0 0 0 .4 1L10 23l6.6-6.6A2 2 0 0 0 17 15V5a2 2 0 0 0-2-2zm4 0v12h4V3z',
  share: 'M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z'};
const mmss = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
export const YouTubeCard = ({o, a, b, title, cam, channel = 'Backyard Breaks', subs = '1.2M subscribers', views = '48K views  2 hours ago', likes = '12K', dur = 20000, startAt = 6000}: {
  o: number; a: number; b: number; title: string; cam: CamCfg; channel?: string; subs?: string; views?: string; likes?: string; dur?: number; startAt?: number}) => {
  if (!on(o, a, b)) return null;
  const inP = ease(o, a, 260), outP = ease(o, b - 200, 200);
  const PX = 40, PY = 96, PW = 1000, PH = 562;
  // player rect morphs from the full box to the 16:9 slot
  const m = Math.min(inP, 1 - outP); // shrink into the player on entry, expand back to full box ("fullscreen") on exit
  const lerp = (x: number, y: number) => x + (y - x) * m;
  const rx = lerp(0, PX), ry = lerp(0, PY), rw = lerp(BW, PW), rh = lerp(BOX_H, PH);
  const t = startAt + (o - a);
  const prog = t / dur;
  const playCam: CamCfg = {...cam, box: [PW, PH], baseH: 1080};
  const ui = Math.min(inP, 1 - outP);
  // title wipes in left→right while sliding (starts as the player settles), then the rows below rise in one after another
  const tw = ease(o, a + 220, 480, (v) => 1 - (1 - v) ** 3);
  const rise = (i: number) => {
    const p = ease(o, a + 520 + i * 110, 260);
    return {opacity: p, transform: `translateY(${(1 - p) * 26}px)`};
  };
  return <AbsoluteFill>
    <AbsoluteFill style={{background: '#FFFFFF', opacity: m}} />
    <div style={{position: 'absolute', left: rx, top: ry, width: rw, height: rh, borderRadius: lerp(0, 18), overflow: 'hidden', background: 'black'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${rw / PW})`, transformOrigin: '0 0', width: PW, height: PH}}><Cam c={playCam} o={o} /></div>
      {/* controls overlay */}
      <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: 120, background: 'linear-gradient(transparent, rgba(0,0,0,0.65))', opacity: ui}} />
      <div style={{position: 'absolute', left: 22, right: 22, bottom: 74, height: 6, background: 'rgba(255,255,255,0.3)', opacity: ui}}>
        <div style={{position: 'absolute', left: 0, top: 0, height: 6, width: `${Math.min(1, prog * 1.25) * 100}%`, background: 'rgba(255,255,255,0.45)'}} />
        <div style={{position: 'absolute', left: 0, top: 0, height: 6, width: `${prog * 100}%`, background: '#FF0000'}} />
        <div style={{position: 'absolute', left: `calc(${prog * 100}% - 9px)`, top: -6, width: 18, height: 18, borderRadius: 9, background: '#FF0000'}} />
      </div>
      <div style={{position: 'absolute', left: 22, right: 22, bottom: 14, height: 48, display: 'flex', alignItems: 'center', gap: 22, opacity: ui,
        fontFamily: SANS, fontWeight: 500, fontSize: 24, color: 'white'}}>
        <Ico d={I.pause} /><Ico d={I.next} /><Ico d={I.vol} /><span>{mmss(t)} / {mmss(dur)}</span>
        <span style={{flex: 1}} /><Ico d={I.cc} /><Ico d={I.gear} /><Ico d={I.full} />
      </div>
    </div>
    {/* title + meta + channel row */}
    <div style={{position: 'absolute', left: PX + 4, top: PY + PH + 26, width: PW - 8, opacity: ui, fontFamily: SANS, color: '#0F0F0F',
      }}>
      <div style={{fontWeight: 700, fontSize: 44, lineHeight: '54px', clipPath: `inset(-10px ${(1 - tw) * 100}% -10px 0)`,
        transform: `translateX(${(1 - tw) * -60}px)`}}>{title}</div>
      <div style={{fontWeight: 500, fontSize: 26, color: '#606060', marginTop: 8, ...rise(1)}}>{views}</div>
      <div style={{display: 'flex', alignItems: 'center', marginTop: 26, gap: 18, ...rise(2)}}>
        <div style={{width: 72, height: 72, borderRadius: 36, background: '#1C1C1C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 28}}>BB</div>
        <div style={{flex: 1}}>
          <div style={{fontWeight: 700, fontSize: 30}}>{channel}</div>
          <div style={{fontWeight: 500, fontSize: 22, color: '#606060'}}>{subs}</div>
        </div>
        <div style={{background: '#0F0F0F', color: 'white', borderRadius: 40, padding: '16px 30px', fontWeight: 600, fontSize: 26}}>Subscribe</div>
      </div>
      <div style={{display: 'flex', gap: 16, marginTop: 24, ...rise(3)}}>
        <div style={{display: 'flex', alignItems: 'center', background: '#F2F2F2', borderRadius: 40, padding: '10px 22px', gap: 12, fontWeight: 600, fontSize: 24}}>
          <Ico d={I.like} size={28} fill="#0F0F0F" />{likes}<span style={{width: 2, height: 30, background: '#CCC', margin: '0 8px'}} /><Ico d={I.dislike} size={28} fill="#0F0F0F" /></div>
        <div style={{display: 'flex', alignItems: 'center', background: '#F2F2F2', borderRadius: 40, padding: '10px 22px', gap: 10, fontWeight: 600, fontSize: 24}}>
          <Ico d={I.share} size={28} fill="#0F0F0F" />Share</div>
      </div>
    </div>
  </AbsoluteFill>;
};
// dark rounded badge, big number + small green label (top-right of the box)
// emoji = iOS codepoint PNG from public/emoji-ios (keyboard emoji, never a text glyph: those render with the browser font and look fake)
const Emo = ({code, size}: {code?: string; size: number}) => code ? <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size, verticalAlign: `-${size * 0.12}px`, marginLeft: 10}} /> : null;
export const StatBadge = ({o, a, b, big, label, x = 690, y = 40, emoji}: {o: number; a: number; b: number; big: string; label: string; x?: number; y?: number; emoji?: string}) => {
  if (!on(o, a, b)) return null;
  const s = pop(o, a, 11, 260);
  return <div style={{position: 'absolute', left: x, top: y, transform: `scale(${s})`, transformOrigin: '50% 0', opacity: 1 - ease(o, b - 150, 150),
    background: V2.dark, borderRadius: 26, padding: '14px 30px', textAlign: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.35)'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 92, lineHeight: '96px', color: 'white'}}>{big}<Emo code={emoji} size={78} /></div>
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
export const Sticker = ({o, a, b, text, x, y, rot = -6, emoji}: {o: number; a: number; b: number; text: string; x: number; y: number; rot?: number; emoji?: string}) => {
  if (!on(o, a, b)) return null;
  return <div style={{position: 'absolute', left: x, top: y, transform: `rotate(${rot}deg) scale(${pop(o, a, 9, 320)})`, opacity: 1 - ease(o, b - 120, 120),
    background: 'white', border: '5px solid #111', borderRadius: 10, padding: '6px 18px', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#111',
    boxShadow: '6px 6px 0 rgba(0,0,0,0.6)'}}>{text}<Emo code={emoji} size={42} /></div>;
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
// typed action text: *Not a celly guy*, italic, glowing, typed letter by letter (pair with keyboard-typing SFX)
export const TypedAction = ({o, a, b, text, y = 110, color = 'white', glow = 'rgba(255,255,255,0.55)'}: {o: number; a: number; b: number; text: string; y?: number; color?: string; glow?: string}) => {
  if (!on(o, a, b)) return null;
  const full = `*${text}*`;
  const n = Math.min(full.length, Math.ceil((o - a) / 45));
  return <div style={{position: 'absolute', top: y, width: BW, textAlign: 'center', opacity: 1 - ease(o, b - 140, 140), fontFamily: MONT, fontWeight: 800,
    fontStyle: 'italic', fontSize: 66, color, textShadow: `0 0 16px ${glow}, 0 4px 10px rgba(0,0,0,0.75)`}}>{full.slice(0, n)}</div>;
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
// v2.1 (user 2026-11-01): cold open on the payoff (scroll test), no beep pause (it didn't fit), no emoji inside graphics.
const COLD_SEG: [number, number] = [26300, 28250];
const STORY: [number, number][] = [[3940, 8100], [8380, 9000], [9480, 11500], [16800, 18200], [20800, 25400], [25480, 28200], [28600, 29700], [30700, 31500], [31900, 32600]];
const COLD = COLD_SEG[1] - COLD_SEG[0];
const yTl: TL = timeline([COLD_SEG, ...STORY]);
const sTl = timeline(STORY);
const at = (src: number) => COLD + sTl.out(src); // story time → output (the cold open repeats source 26.3–28.3 s)
export const V2_CELLY_MS = yTl.total;
const c0 = timeline([COLD_SEG]);
const Y = {cTen: c0.out(27580), cTen3: c0.out(28000), maybe: COLD + sTl.segOut[1], point: at(18040), psa: at(22660), ten1: COLD + sTl.segOut[5] + 27580 - 25480,
  ten3: COLD + sTl.segOut[5] + 28000 - 25480, its: COLD + sTl.segOut[6], like: COLD + sTl.segOut[7], yo: COLD + sTl.segOut[8], celly: at(5200)};
const CAM: CamCfg = {src: 'pod2/u2_psa10_celly.mp4', tl: yTl, track: cellyTrack as unknown as Track, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H],
  baseH: 640, faceY: 0.42, wideX: 760, who: () => 'W'};
const WORD_Y = 1170;
const FIX = {selly: 'celly', '1010': '10', tutti: 'TD'};
const COLS = {celly: '#58EE28', PSA: '#21F5E6', '10': '#F9FC35', easy: '#58EE28'};
const WORDS = [...wordsFrom(cellyWords, c0, FIX, COLS), ...wordsFrom(cellyWords, sTl, FIX, COLS).map((w) => ({...w, at: w.at + COLD}))];
const CELLY_V2: Spec = {
  tl: yTl, src: 'pod2/u2_psa10_celly.mp4', track: cellyTrack as unknown as Track, top: 'Trevor finally got a touchdown celly fr', wordY: WORD_Y, wideX: 760,
  words: WORDS,
  shots: [[0, 'M'], [COLD + STROBE_CUT - STROBE_CUT, 'W'], [Y.maybe, 'M'], [COLD + sTl.segOut[2], 'W'], [Y.psa, 'M'], [Y.ten1 - 240 + STROBE_CUT, 'M'], [Y.its, 'W'], [Y.like, 'M']],
  strobes: [COLD - STROBE_CUT, Y.ten1 - 240],
  tints: [[Y.cTen, GREEN], [Y.maybe, RED], [Y.psa, GREEN], [Y.yo, GREEN]],
  capsOff: [[COLD + 120, COLD + 2500]], // no captions over the YouTube card
  swish: [Y.cTen, Y.celly, Y.yo],
  music: {file: 'eclipser.mp3', from: 15800 - (COLD - STROBE_CUT), level: 0},
  inBox: (o) => <Layer>
    <StatBadge o={o} a={Y.cTen} b={COLD - 60} big="10·10·10" label="THE CELLY" x={300} />
    <WordRing o={o} a={Y.cTen} b={Y.cTen3 + 300} y={WORD_Y - 417 + 6} w={120} />
    <YouTubeCard o={o} a={COLD + 200} b={COLD + 2500} title="How did Trevor Lawrence get a TD celly?" cam={CAM} startAt={COLD + 200} dur={V2_CELLY_MS} />
    <TypedAction o={o} a={Y.maybe} b={COLD + sTl.segOut[2] + 1300} text="Not a celly guy" />
    <GradeScale o={o} a={Y.psa + 300} b={Y.psa + 2700} title="PSA GRADE" label="GEM MINT" />
    <StatBadge o={o} a={Y.ten1 - 240 + STROBE_CUT} b={Y.its} big="10·10·10" label="THE CELLY" x={300} />
    <WordRing o={o} a={Y.ten1} b={Y.ten3 + 500} y={WORD_Y - 417 + 6} w={120} />
    <Sticker o={o} a={Y.its} b={Y.like + 600} text="EASY" x={680} y={80} rot={5} emoji="2705" />
  </Layer>,
  extraSfx: [
    sfx('jv2-smash-bros-hit', Y.cTen, 0.16),
    sfx('mg-click', COLD + 200, 0.25), sfx('mg-swoosh', COLD + 420, 0.22),
    sfx('jv2-sudden-suspense-boom', COLD + 2500, 0.12), sfx('fast-whoosh', COLD + 2500, 0.28),
    sfx('keyboard-typing', Y.maybe, 0.2, 800),
    ...Array.from({length: 10}, (_, i) => sfx('mg-click', Y.psa + 550 + i * 110, 0.2)),
    sfx('ding-2', Y.psa + 550 + 9 * 110, 0.22),
    sfx('jv2-smash-bros-hit', Y.ten1, 0.16), sfx('jv2-smash-bros-hit', Y.ten3, 0.18),
    sfx('jv2-pop-button', Y.its, 0.28),
  ],
};
export const JorhoV2Celly = () => <Jorho s={CELLY_V2} />;
