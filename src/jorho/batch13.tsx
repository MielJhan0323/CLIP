// BATCH 13 (2026-11-05): 5 Jorho v2 clips built to go viral, using everything learned:
// viral PRINCIPLES (not tools) from NBA GOAT + Redemptions, face-cam explainer layout only on picturable lines (cam stretches in
// between, cam SHRINKS into the corner), almost no SFX, chunked captions in output order, cuts snapped to real speech ends.
import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {Cam, type CamCfg, clamp, ease, pop, sfx, timeline, type TL} from '../e3/kit';
import {BOX_H, BOX_TOP, GREEN, chunkWords, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';
import {cam} from './batch10';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import entersWords from '../plans/data/u5_trevor_enters.words.json';
import entersTrack from '../plans/data/u5_trevor_enters.seats.json';

type Track = Spec['track'];
const BW = 1080;
const on = (o: number, a: number, b: number) => o >= a && o < b;
const caps = (raw: {text: string; startMs: number}[], tl: TL, fix: Record<string, string>, colors: Record<string, string>) =>
  chunkWords(wordsFrom(raw, tl, fix, colors), tl.total, tl.segOut);

// ---- face cam that the full cam SHRINKS into (top-left) during illustration windows, and grows back out of --------------------
const FC = 330, SH = 420;
const settle = (x: number) => { const c = 0.6; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; };
const FaceCam = ({o, base, wins}: {o: number; base: CamCfg; wins: [number, number][]}) => {
  const w = wins.find(([a, b]) => on(o, a, b));
  if (!w) return null;
  const pin = clamp01((o - w[0]) / SH), pout = clamp01((o - (w[1] - SH)) / SH);
  const t = settle(pin) - (pout > 0 ? 1 - (1 - pout) ** 3 : 0);
  const L = (a: number, b: number) => a + (b - a) * t;
  const cw = L(BW, FC), ch = L(BOX_H, FC);
  const cfg: CamCfg = {...base, box: [Math.round(cw), Math.round(ch)], baseH: L(640, 400), faceY: L(0.42, 0.45), who: () => 'M'};
  return <div style={{position: 'absolute', left: L(0, 36), top: L(0, 36), width: cw, height: ch, borderRadius: L(0, 30), overflow: 'hidden',
    border: `${Math.max(0, L(0, 7))}px solid white`, boxShadow: `0 12px 28px rgba(0,0,0,${0.5 * Math.min(1, t)})`, background: '#111'}}><Cam c={cfg} o={o} /></div>;
};
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
// an illustration panel: fills the box under the face cam, fades in behind the shrinking cam
const Panel = ({o, wins, bg, children}: {o: number; wins: [number, number][]; bg: string; children: (a: number) => ReactNode}) => {
  const w = wins.find(([a, b]) => on(o, a, b));
  return w ? <AbsoluteFill style={{background: bg, opacity: Math.min(ease(o, w[0], 120), 1 - ease(o, w[1] - 100, 100))}}>{children(w[0])}</AbsoluteFill> : null;
};
const label: CSSProperties = {fontFamily: MONT, fontWeight: 900, color: 'white'};
const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

// ======================= V1 · Clemson 1/1 vs NFL 1/1 (t4) — money: promise → payoff → bigger payoff =======================
const v1 = timeline([[72580, 75100], [66320, 70010], [70010, 72580], [75620, 82000]]); // ends on "Wow." (the source cuts off mid-sentence after it)
const V1 = {nfl: v1.out(72900), clem: v1.out(74420), two: v1.out(76240), pot: v1.out(77640), five: v1.out(78700), mil: v1.out(80420), wow: v1.out(81500)};
export const B13_CARDS_MS = v1.total;
const V1W: [number, number][] = [[0, v1.segOut[1]], [v1.segOut[3], v1.total - 700]];
const OneOfOne = ({o, at, x, title, sub, grad}: {o: number; at: number; x: number; title: string; sub: string; grad: string}) => o < at ? null :
  <div style={{position: 'absolute', left: x, top: 380 + (1 - ease(o, at, 300)) * 60, width: 400, height: 440, borderRadius: 22, background: grad, opacity: ease(o, at, 200),
    border: '6px solid rgba(255,255,255,0.85)', boxShadow: '0 18px 40px rgba(0,0,0,0.5)', overflow: 'hidden'}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.28) 45%, transparent 60%)',
      transform: `translateX(${((o - at) / 6) % 900 - 400}px)`}} />
    <div style={{...label, position: 'absolute', top: 26, width: '100%', textAlign: 'center', fontSize: 110, lineHeight: '110px', opacity: 0.95}}>16</div>
    <div style={{...label, position: 'absolute', top: 160, width: '100%', textAlign: 'center', fontSize: 60}}>{title}</div>
    <div style={{...label, position: 'absolute', top: 235, width: '100%', textAlign: 'center', fontSize: 26, fontWeight: 700, opacity: 0.8}}>{sub}</div>
    <div style={{position: 'absolute', right: 22, bottom: 22, background: 'rgba(0,0,0,0.6)', borderRadius: 12, padding: '6px 16px', ...label, fontSize: 40}}>1/1</div>
  </div>;
const V1_SPEC: Spec = {
  tl: v1, src: 'pod/t4_natty_ticket.mp4', track: ticketTrack as unknown as Track, top: 'His college 1/1 is worth $2K… his NFL 1/1?', wordY: 1420, wideX: 760,
  words: caps(ticketWords, v1, {}, {NFL: '#21F5E6', Clemson: '#F56600', '$2': '#58EE28', million: '#58EE28'}),
  shots: [[0, 'M'], [v1.segOut[1], 'M'], [v1.segOut[2], 'W'], [v1.total - 700, 'M']], strobes: [], tints: [], swish: [],
  music: {file: 'lose-you-adturnup.mp3', from: 12000, level: 0, dips: [[V1.pot, V1.five]]},
  inBox: (o) => <>
    <Panel o={o} wins={V1W} bg="radial-gradient(ellipse at 50% 40%, #1d2630, #0a0d10)">{() => <>
      <OneOfOne o={o} at={V1.nfl} x={80} title="NFL" sub="JAGUARS · 1 OF 1" grad="linear-gradient(160deg, #0b6e7a, #04323a 70%, #b8902e)" />
      <OneOfOne o={o} at={V1.clem} x={600} title="CLEMSON" sub="TIGERS · 1 OF 1" grad="linear-gradient(160deg, #F56600, #6b2a00 65%, #522D80)" />
      {o >= V1.two && <div style={{position: 'absolute', left: 600, top: 840, width: 400, textAlign: 'center', ...label, fontSize: 70, transform: `scale(${pop(o, V1.two, 9, 220)})`}}>
        $2,000</div>}
      {o >= V1.five && (() => {
        const p = ease(o, V1.five, V1.mil - V1.five + 200);
        const v = Math.exp(Math.log(500) + (Math.log(1_000_000) - Math.log(500)) * p);
        return <div style={{position: 'absolute', left: 30, top: 840, width: 500, textAlign: 'center', ...label, fontSize: p >= 1 ? 74 : 66, color: '#9BE600',
          textShadow: p >= 1 ? '0 0 26px rgba(155,230,0,0.6)' : undefined}}>{p >= 1 ? '$1,000,000?' : fmt(v)}</div>;
      })()}
    </>}</Panel>
    <FaceCam o={o} base={cam('pod/t4_natty_ticket.mp4', v1, ticketTrack as unknown as Track, 760)} wins={V1W} />
  </>,
  extraSfx: [],
};
export const B13Cards = () => <Jorho s={V1_SPEC} />;

// ======================= V2 · the card Grant kept 4 years (t2) — mystery → reveal → what's inside =======================
const v2 = timeline([[78500, 80590], [81940, 84040], [84040, 85650], [86040, 89460], [89920, 91320], [97520, 102900], [105600, 108390]]);
const V2 = {four: v2.out(83400), tiger: v2.out(86120), worn: v2.out(87580), patch: v2.out(88620), booklet: v2.out(90380), shirt: v2.out(100520), tag: v2.out(100980),
  glove: v2.out(101700), capw: v2.out(102220)};
export const B13_TIGER_MS = v2.total;
const V2W: [number, number][] = [[V2.tiger - 150, v2.segOut[5] - 0], [v2.segOut[5] + 900, v2.segOut[6]]];
const Swatch = ({o, at, x, y, name, bg}: {o: number; at: number; x: number; y: number; name: string; bg: string}) => o < at ? null :
  <div style={{position: 'absolute', left: x, top: y, width: 210, textAlign: 'center', transform: `scale(${pop(o, at, 9, 220)})`}}>
    <div style={{width: 170, height: 120, margin: '0 auto', borderRadius: 14, background: bg, border: '5px solid white', boxShadow: '0 8px 18px rgba(0,0,0,0.45)'}} />
    <div style={{...label, fontSize: 28, marginTop: 10}}>{name}</div></div>;
const V2_SPEC: Spec = {
  tl: v2, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: 'Grant gave Trevor a card he kept for 4 YEARS', wordY: 1400, wideX: 720,
  words: caps(golfWords, v2, {tigers: "Tiger's", '-5': ''}, {Tiger: '#F9FC35', "Tiger's": '#F9FC35', four: '#58EE28', years: '#58EE28', golfer: '#58EE28'}),
  shots: [[0, 'W'], [v2.segOut[1], 'W'], [v2.segOut[2], 'M'], [v2.segOut[6], 'M']], strobes: [], tints: [[V2.tiger, GREEN]], swish: [],
  music: {file: 'joyful-chess-slowed.mp3', from: 20062 - V2.tiger, level: 0, dips: [[v2.segOut[2], V2.tiger]]},
  inBox: (o) => <>
    <Panel o={o} wins={V2W} bg="radial-gradient(ellipse at 50% 40%, #2b2216, #0c0a07)">{(a) => {
      const exploded = a > V2.tiger + 500;
      return <>
        <div style={{position: 'absolute', left: exploded ? 330 : 300, top: exploded ? 330 : 280, width: exploded ? 420 : 480, height: exploded ? 600 : 640, borderRadius: 18,
          background: 'linear-gradient(160deg, #f4efe4, #d8ceb7)', border: '8px solid #b8902e', boxShadow: '0 20px 44px rgba(0,0,0,0.6)', overflow: 'hidden'}}>
          <Img src={staticFile('img/jorho/tiger.png')} style={{position: 'absolute', left: '50%', bottom: 150, height: '62%', transform: 'translateX(-50%)'}} />
          <div style={{position: 'absolute', bottom: 70, width: '100%', textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: exploded ? 38 : 50, color: '#1b1b1b'}}>TIGER WOODS</div>
          <div style={{position: 'absolute', bottom: 30, width: '100%', textAlign: 'center', fontFamily: MONT, fontWeight: 800, fontSize: exploded ? 20 : 26, color: '#7a5a12'}}>
            {o >= V2.patch || exploded ? 'GAME-WORN PATCH AUTO · BOOKLET' : o >= V2.worn ? 'GAME-WORN' : ''}</div>
        </div>
        {!exploded && <div style={{position: 'absolute', left: 280, top: 935, width: 520, textAlign: 'center', ...label, fontSize: 34, color: '#F9FC35', opacity: ease(o, V2.tiger + 300, 200)}}>
          IN GRANT'S PC FOR 4 YEARS</div>}
        {exploded && <>
          <Swatch o={o} at={V2.shirt} x={60} y={380} name="SHIRT" bg="repeating-linear-gradient(45deg, #b3121b 0 10px, #9a0f17 10px 20px)" />
          <Swatch o={o} at={V2.tag} x={810} y={380} name="LAUNDRY TAG" bg="linear-gradient(#fff, #e8e8e8)" />
          <Swatch o={o} at={V2.glove} x={60} y={700} name="GLOVE" bg="radial-gradient(circle at 30% 30%, #fff 0 3px, #eee 3px) 0 0/14px 14px, #eee" />
          <Swatch o={o} at={V2.capw} x={810} y={700} name="CAP" bg="repeating-linear-gradient(0deg, #111 0 8px, #1d1d1d 8px 16px)" />
        </>}
      </>;
    }}</Panel>
    <FaceCam o={o} base={cam('pod/t2_dream_golf_four.mp4', v2, golfTrack as unknown as Track, 720)} wins={V2W} />
  </>,
  extraSfx: [sfx('ding-2', V2.tiger, 0.18)],
};
export const B13Tiger = () => <Jorho s={V2_SPEC} />;

// ======================= V3 · rookie years: Trevor 3–14, Peyton 3–13 (u4) — story with a twist parallel =======================
const v3 = timeline([[20460, 22170], [25500, 29520], [38120, 46750], [47080, 50210], [50460, 53990]]);
const V3 = {during: v3.out(38260), notWell: v3.out(41360), challenges: v3.out(44700), indy: v3.out(46360), ints: v3.out(48740), rough: v3.out(51140)};
export const B13_ROOKIE_MS = v3.total;
const V3W: [number, number][] = [[V3.during - 100, V3.challenges - 300], [v3.segOut[3], v3.segOut[4]]];
const Season = ({o, at, y, who, year, w, l, color, extra}: {o: number; at: number; y: number; who: string; year: string; w: number; l: number; color: string; extra?: string}) => {
  if (o < at) return null;
  const n = w + l;
  const wins = new Set([2, 9, 13].slice(0, w).map((k) => Math.min(n - 1, k)));
  return <div style={{position: 'absolute', left: 60, top: y, width: 960, opacity: ease(o, at, 200)}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
      <div style={{...label, fontSize: 36}}>{who} <span style={{fontSize: 26, opacity: 0.7}}>ROOKIE YEAR · {year}</span></div>
      <div style={{...label, fontSize: 64, color: o >= at + n * 45 ? '#FF4D4D' : 'white'}}>{w}–{l}</div>
    </div>
    <div style={{display: 'flex', gap: 6, marginTop: 14}}>
      {Array.from({length: n}, (_, i) => <div key={i} style={{flex: 1, height: 56, borderRadius: 6, background: o < at + i * 45 ? 'rgba(255,255,255,0.12)' : wins.has(i) ? '#9BE600' : color}} />)}
    </div>
    {extra && <div style={{...label, fontSize: 34, color: '#F9FC35', marginTop: 16, opacity: ease(o, at + n * 45 + 200, 200)}}>{extra}</div>}
  </div>;
};
const V3_SPEC: Spec = {
  tl: v3, src: 'pod2/u4_peyton.mp4', track: peytonTrack as unknown as Track, top: "Trevor's rookie year: 3–14. Peyton's?", wordY: 1330, wideX: 700,
  words: caps(peytonWords, v3, {}, {Peyton: '#21F5E6', rookie: '#F9FC35', interceptions: '#FF4D4D', Indy: '#21F5E6'}),
  shots: [[0, 'W'], [v3.segOut[1], 'M'], [V3.challenges - 300, 'M'], [v3.segOut[4], 'M']], strobes: [], tints: [], swish: [],
  music: {file: 'interstellar-piano.mp3', from: 30000, level: 0},
  inBox: (o) => <>
    <Panel o={o} wins={V3W} bg="radial-gradient(ellipse at 50% 40%, #1b232c, #090c10)">{(a) => <>
      <Season o={o} at={a + 200} y={420} who="TREVOR" year="2021" w={3} l={14} color="#0b6e7a" />
      {a >= v3.segOut[3] && <Season o={o} at={a + 300} y={690} who="PEYTON" year="1998" w={3} l={13} color="#1f4fa3" extra="28 INTs — most in the NFL" />}
    </>}</Panel>
    <FaceCam o={o} base={cam('pod2/u4_peyton.mp4', v3, peytonTrack as unknown as Track, 700)} wins={V3W} />
  </>,
  extraSfx: [],
};
export const B13Rookie = () => <Jorho s={V3_SPEC} />;

// ======================= V4 · favorite artist (t2) — universal question, hidden answer, reveal =======================
const v4 = timeline([[53680, 54660], [56160, 58950], [60400, 62610], [65840, 68840], [68840, 71560], [71560, 76340]]);
const V4 = {fav: v4.out(60960), fav2: v4.out(65920), staple: v4.out(69020), chris: v4.out(70480), dad: v4.out(71680)};
export const B13_ARTIST_MS = v4.total;
const V4W: [number, number][] = [[v4.segOut[3], v4.segOut[5]]];
const NowPlaying = ({o, a, reveal}: {o: number; a: number; reveal: number}) => {
  const shown = o >= reveal;
  const prog = ((o - a) / 9000) % 1;
  return <div style={{position: 'absolute', left: 140, top: 300, width: 800, padding: 40, borderRadius: 40, background: 'rgba(28,28,30,0.96)', boxShadow: '0 20px 50px rgba(0,0,0,0.6)'}}>
    <div style={{width: 720, height: 420, borderRadius: 24, overflow: 'hidden', position: 'relative',
      background: shown ? 'linear-gradient(135deg, #5a3a1c, #2a1a0c 60%, #8a5a2a)' : 'linear-gradient(135deg, #333, #111)'}}>
      {!shown && <div style={{...label, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 180, opacity: 0.35}}>?</div>}
      {shown && <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(o, reveal, 10, 260)})`,
        fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 78, color: '#f1dfbf', letterSpacing: 4, textAlign: 'center', lineHeight: '86px'}}>CHRIS<br />STAPLETON</div>}
    </div>
    <div style={{marginTop: 26, fontFamily: MONT, fontWeight: 700, fontSize: 26, color: 'rgba(235,235,245,0.6)', letterSpacing: 2}}>TREVOR'S FAVORITE ARTIST</div>
    <div style={{...label, fontSize: 54, marginTop: 6, filter: shown ? undefined : 'blur(14px)'}}>{shown ? 'Chris Stapleton' : 'Hidden Artist'}</div>
    <div style={{height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.2)', marginTop: 26}}><div style={{width: `${prog * 100}%`, height: '100%', borderRadius: 5, background: 'white'}} /></div>
  </div>;
};
const V4_SPEC: Spec = {
  tl: v4, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: "Trevor Lawrence's favorite artist is…", wordY: 1360, wideX: 720,
  words: caps(golfWords, v4, {Cablepton: 'Stapleton'}, {Stapleton: '#F9FC35', Chris: '#F9FC35', artist: '#21F5E6', dad: '#58EE28', mom: '#58EE28'}),
  shots: [[0, 'M'], [v4.segOut[2], 'W'], [v4.segOut[3], 'M'], [v4.segOut[5], 'W'], [V4.dad + 1600, 'M']], strobes: [], tints: [[V4.staple, GREEN]], swish: [],
  music: {file: 'jorho-qkthr.mp3', from: 20000, level: 0, dips: [[V4.fav2, V4.staple]]},
  inBox: (o) => <>
    <Panel o={o} wins={V4W} bg="radial-gradient(ellipse at 50% 40%, #222, #070707)">{(a) => <NowPlaying o={o} a={a} reveal={V4.staple} />}</Panel>
    <FaceCam o={o} base={cam('pod/t2_dream_golf_four.mp4', v4, golfTrack as unknown as Track, 720)} wins={V4W} />
  </>,
  extraSfx: [sfx('ding-2', V4.staple, 0.18)],
};
export const B13Artist = () => <Jorho s={V4_SPEC} />;

const HEAD: [number, number, number][] = [[8800, 1400, 60], [9200, 1230, 90], [9600, 1210, 100], [10000, 1260, 80], [10400, 1295, 60], [10800, 1375, 80],
  [11200, 1380, 85], [11600, 1370, 110], [12000, 1260, 60], [12400, 1260, 65], [12800, 1295, 80], [13200, 1330, 70], [13800, 1330, 70]];
const headAt = (src: number): [number, number] => {
  if (src <= HEAD[0][0]) return [HEAD[0][1], HEAD[0][2]];
  for (let i = 1; i < HEAD.length; i++) if (src <= HEAD[i][0]) {
    const [t0, x0, y0] = HEAD[i - 1], [t1, x1, y1] = HEAD[i], u = (src - t0) / (t1 - t0);
    return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u];
  }
  return [HEAD[HEAD.length - 1][1], HEAD[HEAD.length - 1][2]];
};
// ======================= V5 · "All hail the king" (u5) — cold open on the deadpan "Boys.", escalating crown =======================
const v5 = timeline([[9760, 10500, 500], [0, 13760]]);
const kL = (src: number) => v5.segOut[1] + src;
const V5 = {k1: kL(1460), k2: kL(3960), k3: kL(6280), boys: kL(9840)};
export const B13_KING_MS = v5.total;
const V5_SPEC: Spec = {
  tl: v5, src: 'pod2/u5_trevor_enters.mp4', track: entersTrack as unknown as Track, top: 'How Backyard Breaks greets Trevor Lawrence', wordY: 1170, wideX: 960,
  words: chunkWords(v5.segs.flatMap((s, i) => wordsFrom(entersWords, timeline([[s[0], s[1]]]), {}, {king: '#F9FC35', Boys: '#58EE28'})
    .map((w) => ({...w, at: w.at + v5.segOut[i]}))), v5.total, v5.segOut),
  shots: [[0, 'W']], strobes: [], tints: [[V5.k3, 'rgba(255,200,40,1)']], swish: [],
  music: {file: 'montagem-alquimia.mp3', from: 0, level: 0}, speechGain: 0.6,
  overlay: (o) => {
    const src = o < v5.segOut[1] ? v5.segs[0][0] + Math.min(o, v5.segs[0][1] - v5.segs[0][0] - 1) : o - v5.segOut[1];
    const head = headAt(src); // source px of Trevor's head top
    // W shot: crop x0 = 960 − 1083/2, k ≈ 0.997, y0 = 0 → frame coords
    const k = 1080 / 1083, hx = (head[0] - 418.5) * k, hy = BOX_TOP + head[1] * k;
    let x: number, y: number, size: number;
    if (o < v5.segOut[1]) { x = hx; y = hy; size = 150; } // cold open: already crowned
    else if (src < 8400) {
      if (src < 1460) return null;
      const step = src >= 6280 ? 3 : src >= 3960 ? 2 : 1;
      const at = v5.segOut[1] + [1460, 3960, 6280][step - 1];
      size = [120, 170, 230][step - 1] * interpolate(o - at, [0, 90, 180], [1.4, 0.95, 1], clamp);
      x = 975; y = 640 + Math.sin(o / 180) * 8; // waiting where the king walks in
    } else {
      const p = ease(o, v5.segOut[1] + 8400, 450);
      x = 975 + (hx - 975) * p; y = 640 + (hy - 640) * p; size = 230 + (150 - 230) * p;
    }
    return <Img src={staticFile('emoji-ios/1f451.png')} style={{position: 'absolute', left: x - size / 2, top: y - size * 0.82, width: size,
      filter: 'drop-shadow(0 0 18px rgba(255,210,60,0.7))'}} />;
  },
  extraSfx: [],
};
export const B13King = () => <Jorho s={V5_SPEC} />;
