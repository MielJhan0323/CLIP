// BATCH 10 (2026-11-03): 5 Trevor Lawrence clips in Jorho v2 (graphics in the box). Built from reference #5 (NBA GOAT v8):
// plain broadcast-looking graphics, things draw/slide on, no beep, no glow/neon, 2–4 hive-mind assets per clip, different bed each.
import type {CSSProperties} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {type CamCfg, clamp, ease, pop, sfx, timeline, type TL} from '../e3/kit';
import {BOX_H, Cutout, GREEN, HeadRing, MemePop, RED, STROBE_CUT, wordsFrom, type Word} from './kit';
import {Jorho, type Spec} from './clips';
import {Layer, TypedAction, YouTubeCard} from './v2';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import coenWords from '../plans/data/u6_coen_duo.words.json';
import coenTrack from '../plans/data/u6_coen_duo.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number}[];
const BW = 1080;
const SANS = 'Helvetica, Arial, "Liberation Sans", sans-serif';
const on = (o: number, a: number, b: number) => o >= a && o < b;
const io = (o: number, a: number, b: number, d = 200) => Math.min(ease(o, a, d), 1 - ease(o, b - d, d));
// captions per segment (works when a cold open repeats a later line: tl.out() would map both copies to the first one)
export const segWords = (raw: Raw, tl: TL, fix: Record<string, string>, colors: Record<string, string>): Word[] =>
  tl.segs.flatMap((s, i) => wordsFrom(raw, timeline([[s[0], s[1]]]), fix, colors).map((w) => ({...w, at: w.at + tl.segOut[i]})));
export const cam = (src: string, tl: TL, track: Track, wideX: number): CamCfg =>
  ({src, tl, track, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX, who: () => 'W'});
const PHONE = 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z';
const Emo = ({code, size, style}: {code: string; size: number; style?: CSSProperties}) =>
  <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size, ...style}} />;

// ---- iOS incoming-call banner (slides down, buzzes while ringing) --------------------------------------------------------
const IncomingCall = ({o, a, b, name, photo}: {o: number; a: number; b: number; name: string; photo: string}) => {
  if (!on(o, a, b)) return null;
  const y = interpolate(o, [a, a + 260, b - 220, b], [-260, 36, 36, -260], clamp);
  const buzz = o < a + 1400 ? Math.sin((o - a) / 18) * 3 : 0;
  return <div style={{position: 'absolute', left: 36, top: y, width: 1008, height: 196, borderRadius: 48, background: 'rgba(28,28,30,0.94)',
    transform: `translateX(${buzz}px)`, boxShadow: '0 14px 30px rgba(0,0,0,0.4)', fontFamily: SANS}}>
    <div style={{position: 'absolute', left: 30, top: 34, width: 128, height: 128, borderRadius: '50%', overflow: 'hidden', background: '#8e8e93'}}>
      <Img src={staticFile(photo)} style={{width: '100%', height: '170%', objectFit: 'cover', objectPosition: '50% 0%'}} /></div>
    <div style={{position: 'absolute', left: 186, top: 52, fontSize: 30, color: 'rgba(235,235,245,0.6)'}}>mobile</div>
    <div style={{position: 'absolute', left: 186, top: 90, fontSize: 50, fontWeight: 600, color: 'white'}}>{name}</div>
    {[['#FF3B30', 135], ['#34C759', 0]].map(([c, rot], i) => <div key={i} style={{position: 'absolute', right: i ? 34 : 172, top: 44, width: 108, height: 108,
      borderRadius: '50%', background: c as string, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width={54} height={54} viewBox="0 0 24 24" style={{transform: `rotate(${rot}deg)`}}><path d={PHONE} fill="white" /></svg></div>)}
  </div>;
};
// ---- lock-screen notification stack: one "Messages" notification per date, dropping in one by one -----------------------
const NotifStack = ({o, a, b, name, photo, items}: {o: number; a: number; b: number; name: string; photo: string; items: {at: number; when: string}[]}) => {
  if (!on(o, a, b)) return null;
  return <AbsoluteFill style={{opacity: 1 - ease(o, b - 200, 200)}}>
    {items.map((it, i) => {
      if (o < it.at) return null;
      const p = ease(o, it.at, 260);
      const shown = items.filter((x) => o >= x.at).length;
      const d = shown - 1 - i; // 0 = newest; older ones tuck behind it like an iOS notification stack
      if (d > 2) return null;
      return <div key={i} style={{position: 'absolute', left: 60, top: 40 + d * 18 + (1 - p) * -60, width: 960, height: 132, borderRadius: 36, opacity: p * (1 - d * 0.3),
        transform: `scale(${1 - d * 0.05})`, transformOrigin: '50% 100%', zIndex: 10 - d,
        background: 'rgba(245,245,247,0.93)', boxShadow: '0 10px 24px rgba(0,0,0,0.3)', fontFamily: SANS, transition: 'none'}}>
        <div style={{position: 'absolute', left: 24, top: 22, width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', background: '#c7c7cc'}}>
          <Img src={staticFile(photo)} style={{width: '100%', height: '170%', objectFit: 'cover', objectPosition: '50% 0%'}} /></div>
        <div style={{position: 'absolute', left: 134, top: 26, fontSize: 34, fontWeight: 700, color: '#111'}}>{name}</div>
        <div style={{position: 'absolute', right: 30, top: 28, fontSize: 28, color: '#6e6e73'}}>{it.when}</div>
        <div style={{position: 'absolute', left: 134, top: 72, fontSize: 32, color: '#3a3a3c'}}>iMessage</div>
      </div>;
    })}
  </AbsoluteFill>;
};
// ---- golf scorecard: paper card, green header, names written in with a pen as they're said --------------------------------
export const Scorecard = ({o, wins, rows}: {o: number; wins: [number, number][]; rows: {name: string; at: number; emoji?: string}[]}) => {
  const w = wins.find(([a, b]) => on(o, a, b));
  if (!w) return null;
  const p = io(o, w[0], w[1], 180);
  return <div style={{position: 'absolute', left: 150, top: 24 - (1 - p) * 40, width: 780, opacity: p, background: '#F7F4EA', borderRadius: 10,
    boxShadow: '0 12px 28px rgba(0,0,0,0.35)', overflow: 'hidden', fontFamily: MONT}}>
    <div style={{display: 'flex', background: '#1E5B37', color: 'white', fontWeight: 800, fontSize: 24, letterSpacing: 2, padding: '9px 18px'}}>
      <div style={{flex: 1}}>DREAM FOURSOME</div>{[1, 2, 3, 4, 5, 6].map((h) => <div key={h} style={{width: 48, textAlign: 'center', opacity: 0.85}}>{h}</div>)}
    </div>
    {rows.map((r, i) => {
      const n = o < r.at ? 0 : Math.min(r.name.length, Math.ceil((o - r.at) / 55));
      return <div key={i} style={{display: 'flex', alignItems: 'center', height: 50, borderTop: '2px solid #CFC9B5', padding: '0 18px'}}>
        <div style={{width: 40, fontWeight: 700, fontSize: 26, color: '#7a7465'}}>{i + 1}</div>
        <div style={{flex: 1, fontFamily: '"Comic Sans MS", "Segoe Print", cursive', fontSize: 32, color: '#1b2a6b', whiteSpace: 'nowrap'}}>
          {r.name.slice(0, n)}{r.emoji && n === r.name.length && <Emo code={r.emoji} size={36} style={{marginLeft: 10, verticalAlign: '-5px'}} />}</div>
        {[1, 2, 3, 4, 5, 6].map((h) => <div key={h} style={{width: 48, height: 50, borderLeft: '2px solid #CFC9B5'}} />)}
      </div>;
    })}
  </div>;
};
// ---- years bars: plain broadcast bars, labels in years, a check that pops on the winner ----------------------------------------
const YearsBars = ({o, a, b, title, rows, checkAt}: {o: number; a: number; b: number; title: string; checkAt: number;
  rows: {label: string; val: string; pct: number; at: number; color: string}[]}) => {
  if (!on(o, a, b)) return null;
  return <AbsoluteFill style={{background: 'rgba(10,10,12,0.78)', opacity: io(o, a, b)}}>
    <div style={{position: 'absolute', top: 120, width: BW, textAlign: 'center', fontFamily: MONT, fontWeight: 800, fontSize: 52, color: 'white'}}>{title}</div>
    {rows.map((r, i) => {
      const p = ease(o, r.at, 600);
      return <div key={i} style={{position: 'absolute', left: 80, top: 290 + i * 200, width: BW - 160, opacity: o >= r.at ? 1 : 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: MONT, fontWeight: 700, fontSize: 34, color: 'rgba(255,255,255,0.85)', marginBottom: 14}}>
          <span>{r.label}{i === 0 && o >= checkAt && <Emo code="2705" size={46} style={{marginLeft: 14, verticalAlign: '-8px', transform: `scale(${pop(o, checkAt, 9, 240)})`}} />}</span>
          <span style={{color: 'white', fontWeight: 800}}>{r.val}</span></div>
        <div style={{height: 40, background: 'rgba(255,255,255,0.12)'}}><div style={{height: '100%', width: `${r.pct * p}%`, background: r.color}} /></div>
      </div>;
    })}
  </AbsoluteFill>;
};
// ---- magnifier: a signature line with a tiny "AR" scribble, then a lens slides over it and shows it big ---------------------
const AR = 'M10 52 L24 12 L36 52 M16 36 L32 36 M46 52 L46 14 C60 10 70 18 64 28 C60 34 52 34 47 33 L68 54';
const Magnifier = ({o, a, b, lensAt}: {o: number; a: number; b: number; lensAt: number}) => {
  if (!on(o, a, b)) return null;
  const draw = ease(o, a + 120, 420);
  const lp = ease(o, lensAt, 380);
  const lx = interpolate(lp, [0, 1], [900, 540]), ly = interpolate(lp, [0, 1], [520, 330]);
  return <AbsoluteFill style={{opacity: io(o, a, b, 160)}}>
    <div style={{position: 'absolute', left: 90, top: 150, width: 900, height: 360, background: '#FBFBF8', borderRadius: 8, boxShadow: '0 14px 30px rgba(0,0,0,0.4)'}}>
      <div style={{position: 'absolute', left: 50, top: 40, fontFamily: MONT, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: '#9a9a9a'}}>AUTHENTIC AUTOGRAPH</div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 250, height: 3, background: '#bbb'}} />
      <div style={{position: 'absolute', left: 60, top: 262, fontFamily: SANS, fontSize: 24, color: '#999'}}>X</div>
      <svg width={80} height={64} viewBox="0 0 80 64" style={{position: 'absolute', left: 420, top: 200, width: 40, height: 32}}>
        <path d={AR} fill="none" stroke="#1a2b8c" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} /></svg>
    </div>
    {o >= lensAt && <div style={{position: 'absolute', left: lx - 170, top: ly - 170, width: 340, height: 340}}>
      <div style={{position: 'absolute', left: 250, top: 250, width: 46, height: 190, background: '#2b2b2b', borderRadius: 18, transform: 'rotate(-45deg)', transformOrigin: '50% 0'}} />
      <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: '16px solid #2b2b2b', background: '#FBFBF8', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.5)'}}>
        <svg width={308} height={308} viewBox="-10 -14 100 92"><path d={AR} fill="none" stroke="#1a2b8c" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 45%)'}} />
      </div>
    </div>}
  </AbsoluteFill>;
};
// ---- two video tiles with verdict stamps (first video → second video) --------------------------------------------------------
const TwoVideos = ({o, a, b, tiles}: {o: number; a: number; b: number; tiles: {at: number; title: string; stamp: string; stampAt: number; color: string}[]}) => {
  if (!on(o, a, b)) return null;
  return <AbsoluteFill style={{opacity: 1 - ease(o, b - 200, 200)}}>
    {tiles.map((t, i) => {
      if (o < t.at) return null;
      const p = ease(o, t.at, 260);
      const sp = o >= t.stampAt ? interpolate(o - t.stampAt, [0, 90, 160], [2.2, 0.92, 1], clamp) : 0;
      return <div key={i} style={{position: 'absolute', left: 50 + i * 505, top: 40 + (1 - p) * 40, width: 475, opacity: p, fontFamily: SANS}}>
        <div style={{position: 'relative', width: 475, height: 267, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(135deg, #0b6e7a, #052c3a)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.4)'}}>
          <div style={{position: 'absolute', left: 24, top: 22, fontFamily: MONT, fontWeight: 900, fontSize: 40, lineHeight: '42px', color: 'white'}}>TRAVELING<br />TREVORS</div>
          <div style={{position: 'absolute', left: 197, top: 150, width: 82, height: 58, borderRadius: 16, background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '24px solid white', marginLeft: 6}} /></div>
          <div style={{position: 'absolute', right: 12, bottom: 12, background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: 24, fontWeight: 600, padding: '2px 8px', borderRadius: 6}}>0:5{8 - i * 3}</div>
          {sp > 0 && <div style={{position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) rotate(-10deg) scale(${sp})`, border: `7px solid ${t.color}`,
            color: t.color, background: 'rgba(255,255,255,0.92)', fontFamily: MONT, fontWeight: 900, fontSize: 46, padding: '4px 18px', borderRadius: 10, whiteSpace: 'nowrap'}}>{t.stamp}</div>}
        </div>
        <div style={{marginTop: 12, fontSize: 30, fontWeight: 700, color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.8)'}}>{t.title}</div>
      </div>;
    })}
  </AbsoluteFill>;
};

// ================= 1 · Peyton (u4): "Peyton called me about my signature … we text throughout the season" =================
const p10 = timeline([[1000, 2300], [2700, 7100], [7700, 9500], [11300, 13050], [13600, 14450], [14800, 19950]]);
const P = {peyton: p10.out(1680), called: p10.out(4440), nice: p10.out(9040), real: p10.out(12420), text: p10.out(17640), great: p10.out(19640)};
export const B10_PEYTON_MS = p10.total;
const B10_PEYTON: Spec = {
  tl: p10, src: 'pod2/u4_peyton.mp4', track: peytonTrack as unknown as Track, top: 'Peyton Manning called Trevor about his SIGNATURE?', wordY: 1170, wideX: 700,
  words: wordsFrom(peytonWords, p10, {}, {Peyton: '#21F5E6', Manning: '#21F5E6', signature: '#F9FC35'}),
  shots: [[0, 'W'], [P.called, 'M'], [p10.segOut[3], 'W'], [p10.segOut[4], 'L'], [p10.segOut[5], 'M'], [P.text - 240 + STROBE_CUT, 'W']],
  strobes: [P.text - 240], tints: [[P.peyton, GREEN], [P.nice, GREEN], [P.great, GREEN]], swish: [P.peyton, P.nice],
  cut: {file: 'peyton.png', from: P.peyton, to: P.called - 200, x: 270, h: 640},
  music: {file: 'interstellar-piano.mp3', from: 30000, level: 0},
  inBox: (o) => <Layer>
    <IncomingCall o={o} a={P.called - 150} b={P.called + 2500} name="Peyton Manning" photo="cutouts/peyton.png" />
    <NotifStack o={o} a={P.text - 300} b={p10.total} name="Peyton Manning" photo="cutouts/peyton.png"
      items={[{at: P.text - 300, when: 'Sep 14'}, {at: P.text + 300, when: 'Nov 9'}, {at: P.text + 900, when: 'Jan 4'}]} />
  </Layer>,
  extraSfx: [sfx('iphone-ring', P.called - 150, 0.2, 2300), ...[-300, 300, 900].map((d) => sfx('imessage-swoosh', P.text + d, 0.22, 900))],
};
export const B10Peyton = () => <Jorho s={B10_PEYTON} />;

// ================= 2 · Dream golf foursome (t2): "throw Jesus in there … Tiger, the goat" =================
const g10 = timeline([[11250, 13900], [16820, 18500], [20500, 22500], [32200, 34150], [34750, 35700], [45450, 48450], [50400, 54400]]);
const G = {dream: g10.out(12380), humans: g10.out(17740), artist: g10.out(22340), jesus: g10.out(33460), there: g10.out(34000), like: g10.out(34780),
  tiger: g10.out(48000), goat: g10.out(51320), heIs: g10.out(52760)};
export const B10_GOLF_MS = g10.total;
const GCAM = cam('pod/t2_dream_golf_four.mp4', g10, golfTrack as unknown as Track, 720);
const B10_GOLF: Spec = {
  tl: g10, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: 'Trevor put JESUS in his dream golf foursome', wordY: 1150, wideX: 720,
  words: wordsFrom(golfWords, g10, {for: 'four', '-time': 'time'}, {Jesus: '#F9FC35', Tiger: '#21F5E6', goat: '#58EE28'}),
  shots: [[0, 'W'], [g10.segOut[3], 'L'], [G.jesus + STROBE_CUT, 'M'], [g10.segOut[5], 'W'], [G.heIs - 200 + STROBE_CUT, 'M']],
  strobes: [G.jesus, G.heIs - 200], tints: [[G.humans, GREEN], [G.like, GREEN], [G.tiger, GREEN]], swish: [G.humans, G.tiger],
  capsOff: [[150, g10.segOut[1]]], fah: [G.there + 150],
  music: {file: 'joyful-chess-slowed.mp3', from: 20062 - g10.segOut[1], level: 0},
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={g10.segOut[1]} title="What's Trevor Lawrence's dream golf foursome?" cam={GCAM} startAt={0} dur={g10.total} />
    <Scorecard o={o} wins={[[g10.segOut[1] + 100, g10.segOut[3] - 200], [G.jesus - 250, G.like + 900], [G.tiger - 250, g10.total]]}
      rows={[{name: 'Trevor Lawrence', at: g10.segOut[1] + 250}, {name: 'Jesus', at: G.jesus, emoji: '1f64f'}, {name: 'Tiger Woods', at: G.tiger, emoji: '1f410'},
        {name: '', at: Infinity}]} />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.22), sfx('mg-swoosh', 420, 0.18), sfx('pen-scribble', g10.segOut[1] + 250, 0.3, 800), sfx('pen-scribble', G.jesus, 0.3, 500),
    sfx('pen-scribble', G.tiger, 0.3, 700), sfx('ding-2', G.heIs, 0.2)],
};
export const B10Golf = () => <Jorho s={B10_GOLF} />;

// ================= 3 · Coen (u6): "Liam Coen taught me more in a year than my whole football life" =================
const c10 = timeline([[4700, 7900], [11400, 17950], [18300, 23000], [23300, 27700]]);
const C = {liam: c10.out(6620), past: c10.out(12540), life: c10.out(14800), why: c10.out(17240), yeah: c10.out(18320), def: c10.out(19140),
  year: c10.out(21220), system: c10.out(25580)};
export const B10_COEN_MS = c10.total;
const B10_COEN: Spec = {
  tl: c10, src: 'pod2/u6_coen_duo.mp4', track: coenTrack as unknown as Track, top: 'Coen taught Trevor more than his WHOLE football life?', wordY: 1160, wideX: 690,
  words: wordsFrom(coenWords, c10, {Cohen: 'Coen'}, {Liam: '#21F5E6', Coen: '#21F5E6', definitely: '#58EE28'}),
  shots: [[0, 'W'], [C.liam + STROBE_CUT, 'L'], [C.yeah, 'M'], [c10.segOut[3], 'W'], [C.system + 600, 'M']],
  strobes: [C.liam], tints: [[C.def, GREEN], [C.system, GREEN]], swish: [C.liam + STROBE_CUT, C.def],
  cut: {file: 'coen.png', from: C.liam + STROBE_CUT, to: C.past - 100, x: 250, h: 640},
  music: {file: 'jorho-qkthr.mp3', from: 12000, level: 0},
  inBox: (o) => <Layer>
    <YearsBars o={o} a={C.past - 100} b={C.def + 1100} title="WHAT TAUGHT TREVOR MORE?" checkAt={C.def}
      rows={[{label: '1 year with Liam Coen', val: '1 YR', pct: 5, at: C.past, color: '#9BE600'},
        {label: 'His whole football life', val: '20+ YRS', pct: 100, at: C.life - 500, color: 'rgba(255,255,255,0.75)'}]} />
  </Layer>,
  overlay: (o, face) => { const f = face('M'); return <HeadRing o={o} a={C.year - 300} b={C.year + 1800} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; },
  extraSfx: [sfx('mg-swoosh', C.past - 100, 0.2), sfx('mg-click', C.past, 0.2), sfx('mg-click', C.life - 500, 0.2), sfx('ding-2', C.def, 0.22), sfx('ding-2', C.year - 300, 0.16)],
};
export const B10Coen = () => <Jorho s={B10_COEN} />;

// ================= 4 · Ant autograph (t1), cold open on "His auto looks like an ant" =================
const a10 = timeline([[14980, 16400], [3400, 4980], [9340, 12020], [12160, 25260], [25500, 27400]]);
const aL = (src: number) => a10.segOut[3] + src - 12160; // source → out inside the long segment (the cold open repeats 14980–16400)
const A = {antCold: 1180, goated: a10.segOut[1] + 560, respect: a10.segOut[2] + 1960, anthony: aL(12800), noDis: aL(13980), haveNt: aL(14700), auto: aL(14980),
  ant: aL(16160), aLetter: aL(17740), big: aL(19020), noResp: aL(19820), mention: aL(20880), consistent: aL(21540), look: aL(22560), goated2: a10.segOut[4] + 1400};
export const B10_ANT_MS = a10.total;
const B10_ANT: Spec = {
  tl: a10, src: 'pod/t1_tiger_auto_pen.mp4', track: antTrack as unknown as Track, top: "His autograph is so small you need a magnifier", wordY: 1170, wideX: 760,
  words: segWords(antWords, a10, {goaded: 'goated', "Richardson's": 'Richardson'}, {Anthony: '#21F5E6', Richardson: '#21F5E6', ant: '#F9FC35', goated: '#58EE28'}),
  shots: [[0, 'L'], [a10.segOut[1] + STROBE_CUT, 'W'], [a10.segOut[2], 'M'], [A.anthony + STROBE_CUT, 'L'], [A.haveNt, 'M'], [A.auto, 'L'], [A.big, 'W'],
    [A.mention, 'R'], [A.look, 'M'], [a10.segOut[4], 'W']],
  strobes: [a10.segOut[1], A.anthony], tints: [[A.antCold, RED], [A.goated, GREEN], [A.ant, RED], [A.consistent, GREEN], [A.goated2, GREEN]],
  swish: [A.goated, A.consistent], fah: [A.ant + 250],
  capsOff: [[A.aLetter, A.noResp + 300]],
  music: {file: 'Sneaky_Snitch.mp3', from: 8000, level: 0},
  overlay: (o) => <>
    <MemePop o={o} at={A.antCold} to={a10.segOut[1]} src="emoji-ios/1f41c.png" x={800} y={470} size={220} />
    <MemePop o={o} at={A.ant} to={A.ant + 1000} src="emoji-ios/1f41c.png" x={800} y={470} size={220} />
  </>,
  inBox: (o) => <Layer>
    <TypedAction o={o} a={A.noDis - 100} b={A.haveNt + 200} text="no disrespect" />
    <Magnifier o={o} a={A.aLetter - 200} b={A.noResp + 400} lensAt={A.big - 250} />
  </Layer>,
  extraSfx: [sfx('keyboard-typing', A.noDis - 100, 0.15, 700), sfx('pen-scribble', A.aLetter - 80, 0.3, 500), sfx('mg-swoosh', A.big - 250, 0.22)],
};
export const B10Ant = () => <Jorho s={B10_ANT} />;

// ================= 5 · Traveling Trevors (t3), cold open on "these guys are whacked" =================
const t10 = timeline([[82300, 83450], [59480, 63040], [64360, 66720], [77860, 84200], [91560, 92900], [96990, 98440], [99990, 105440]]);
const tL = (i: number, src: number) => t10.segOut[i] + src - t10.segs[i][0];
const T = {whackCold: 780, trav: tL(1, 60340), videos: tL(2, 65080), first: tL(3, 78320), dude: tL(3, 81480), whacked: tL(3, 83080), second: tL(4, 92240),
  funny: tL(5, 98060), jags: tL(6, 100740), about: tL(6, 104980)};
export const B10_TRAV_MS = t10.total;
const TCAM = cam('pod/t3_traveling_trevors.mp4', t10, travTrack as unknown as Track, 715);
const B10_TRAV: Spec = {
  tl: t10, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: 'Trevor thought the Traveling Trevors were WHACKED', wordY: 1170, wideX: 715,
  words: segWords(travWords, t10, {uh: '', trevers: 'Trevors', traveling: 'Traveling', i: 'I', Jax: 'Jags'},
    {Traveling: '#21F5E6', Trevors: '#21F5E6', whacked: '#F9FC35', funny: '#58EE28', Jags: '#58EE28'}),
  shots: [[0, 'M'], [t10.segOut[1] + STROBE_CUT, 'W'], [t10.segOut[3], 'W'], [T.dude, 'M'], [t10.segOut[4], 'M'], [T.jags, 'M'], [T.jags + 2300, 'W']],
  strobes: [t10.segOut[1]], tints: [[T.whackCold, RED], [T.whacked + 150, RED], [T.funny, GREEN], [T.jags, GREEN]], swish: [T.funny],
  capsOff: [[t10.segOut[1] + 150, t10.segOut[3]]], fah: [T.whacked + 300],
  music: {file: 'versatile.mp3', from: 30000, level: 0},
  overlay: (o, face) => { const f = face('M'); return <HeadRing o={o} a={T.jags + 100} b={T.jags + 2200} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; },
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={t10.segOut[1]} b={t10.segOut[3]} title="How much does Trevor know about the Traveling Trevors?" cam={TCAM} startAt={0} dur={t10.total} />
    <TwoVideos o={o} a={T.first - 200} b={T.funny + 1200} tiles={[{at: T.first - 200, title: 'Traveling Trevors #1', stamp: 'WHACKED', stampAt: T.whacked, color: '#E8132B'},
      {at: T.second - 150, title: 'Traveling Trevors #2', stamp: 'PRETTY FUNNY', stampAt: T.funny, color: '#1E9E3A'}]} />
  </Layer>,
  extraSfx: [sfx('mg-click', t10.segOut[1] + 200, 0.22), sfx('mg-swoosh', t10.segOut[1] + 420, 0.18), sfx('mg-click', T.first - 200, 0.2), sfx('mg-click', T.second - 150, 0.2),
    sfx('jv2-smash-bros-hit', T.whacked, 0.2), sfx('jv2-smash-bros-hit', T.funny, 0.2), sfx('ding-2', T.jags + 100, 0.16)],
};
export const B10Trav = () => <Jorho s={B10_TRAV} />;
