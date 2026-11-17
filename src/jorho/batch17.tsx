// BATCH 17 (2026-11-15): redo of batch-16 clips 2, 4, 5, 7, 8, 9, 10. User: "the recipe is too replicated, some don't really use angle
// changes, some have too much zoom or the wrong centre focus; when he talks about plays add diagrams like in v2".
// Fixes vs batch 16:
//  · REAL angle changes, hand-planned per clip: speaker ↔ listener reaction ↔ wide (seats: L = Grant, M = Trevor, R = Bugsy)
//  · zoom capped at ×1.12 on top of the normal speaker crop (batch 16 stacked ×1.4 on an already tight crop → ~2.4×), always centred on
//    the seat's tracked face
//  · v2 DIAGRAMS: the cam shrinks to a corner face-cam while a diagram takes the box (playbook mind-map + inventory grid, rollout field,
//    rookie-year comparison); other clips get their own graphic (scorecard, ticket, top-10 check, sweat checklist)
//  · each clip its own mix: 0–1 colour flash, its own SFX set, its own music; kept from the 500K recipe: dead-air trims, warm grade,
//    one-word captions, *Trevor Lawrence* arrow once, bed from the first cut swelling on a reaction tail after the last word
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {Cam, clamp, ease, pop, sfx, timeline, type CamCfg, type Seg, type Sfx, type TL} from '../e3/kit';
import {BOX_H, HeadRing, MemePop, wordsFrom} from './kit';
import {Jorho, VIRAL_WARM, type Spec} from './clips';
import {TypedAction, YouTubeCard} from './v2';
import {speechDips} from '../campaigns/neon_clip/neon';
import {tighten} from './tighten';
import {applyHi, AutoHook, EmojiPop, hookTypeMs, type Hi} from './hi';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
type Seat = 'L' | 'M' | 'R' | 'W';
const T = (x: unknown) => x as Track;
const BW = 1080;
const Emo = ({code, size}: {code: string; size: number}) => <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size}} />;

type Board = {a: number; b: number; render: (o: number, at: (src: number) => number) => ReactNode}; // a/b in SOURCE ms
type Cfg = {
  src: string; track: Track; raw: Raw; segs: Seg[]; top: string; wideX: number; music: string; from: number;
  shots: [src: number, seat: Seat, zoom?: number][]; // the camera plan, in source time (applies in the body; the cold open uses its first entry)
  hookSeat: Seat; arrowAt: number; flash?: [src: number, color: 'red' | 'yellow' | 'green']; boards?: Board[];
  overlay?: (o: number, at: (src: number) => number) => ReactNode; inBox?: (o: number, at: (src: number) => number) => ReactNode;
  sfx?: (at: (src: number) => number) => Sfx[]; cutout?: {src: number; file: string; x?: number; y?: number; size?: number};
  fix?: Record<string, string>; // caption spelling fixes (transcript → correct name)
  mark?: 'arrow' | 'circle'; // how Trevor is pointed out once (user: "the arrow or circle with trevor lawrence")
  hookText?: string; // short summary typed over the cold open (user 2026-11-17: "on screen text should be summarized and typed out")
  hi?: Hi; // key-word colours (+ iOS emoji); all other caption words white
  hook?: (o: number, end: number) => ReactNode; // a graphic over the cold open (end = output ms where the body starts)
  capsOff?: [number, number][]; // source ranges where captions hide (an overlay graphic owns the box)
  yt?: {title: string; a: number; b: number}; // YouTube watch-page card framing the question (source ms)
};
const TINT = {red: 'rgba(255,40,40,0.75)', yellow: 'rgba(240,255,60,0.7)', green: 'rgba(80,255,60,0.65)'};

// hook graphics start HOOK_LEAD ms into their animation → frame 0 already shows the full hook (Shorts feed shows frame 0)
const HOOK_LEAD = 600;
// user 2026-11-16: "don't put diagrams directly in the start, keep it semi simple" → the cold open is the footage + the punched-in title
// (AutoHook); `hook` diagrams are ignored, diagrams live in the body only
const DIAGRAM_HOOKS = false;
export const make = (c: Cfg) => {
  const segs = tighten(c.segs, c.raw);
  const last = segs[segs.length - 1];
  const after = [...c.raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  // reviewer 2026-11-17: "runs ~0.9 s past the last word" → end 350 ms after the last spoken word (tight loop), never past the seg end
  const lastWordEnd = Math.max(...c.raw.filter((w) => w.startMs >= last[0] && w.startMs < last[1]).map((w) => w.endMs), last[0] + 500);
  segs[segs.length - 1] = [last[0], Math.min(Math.max(last[1], Math.min(last[1] + 300, after - 60)), lastWordEnd + 350), last[2] ?? 0];
  void spokeEnd;
  const tl: TL = timeline(segs);
  const hookN = tighten([c.segs[0]], c.raw).length;
  const at = (src: number) => { // body-first source→output
    for (let i = hookN; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    for (let i = 0; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    // a source time inside a trimmed gap → the next kept piece
    for (let i = hookN; i < segs.length; i++) if (segs[i][0] > src) return tl.segOut[i];
    return tl.total;
  };
  // camera plan → output shots (+ a zoom per shot, max 1.12)
  const plan = [...c.shots].sort((x, y) => x[0] - y[0]);
  const shots: [number, 'L' | 'M' | 'R' | 'W'][] = [[0, c.hookSeat]];
  const zooms: [number, number][] = [[0, 1]];
  for (let i = hookN; i < segs.length; i++) {
    const [a, b] = segs[i];
    const cur = [...plan].reverse().find(([s]) => s <= a) ?? plan[0];
    shots.push([tl.segOut[i], cur[1]]); zooms.push([tl.segOut[i], cur[2] ?? 1]);
    plan.filter(([s]) => s > a && s < b).forEach(([s, seat, z]) => { shots.push([tl.segOut[i] + s - a, seat]); zooms.push([tl.segOut[i] + s - a, z ?? 1]); });
  }
  shots.sort((x, y) => x[0] - y[0]); zooms.sort((x, y) => x[0] - y[0]);
  // reviewer 2026-11-17: "0.1–0.4 s flash shots" → an angle must hold ≥ 1.3 s; drop changes that come sooner (except at segment cuts)
  const segStarts = new Set(tl.segOut.map((x) => Math.round(x)));
  // a segment cut always wins: a planned angle change that lands < 1.3 s before it is dropped (it left 0.25 s slivers, review r2)
  for (const arr of [shots, zooms] as [number, unknown][][]) {
    const kept: [number, unknown][] = [];
    for (const it of arr) {
      const isSeg = segStarts.has(Math.round(it[0]));
      const prev = kept[kept.length - 1];
      if (!prev || it[0] - prev[0] >= 1300) kept.push(it);
      else if (isSeg && !segStarts.has(Math.round(prev[0])) && kept.length > 1) kept[kept.length - 1] = it;
      else if (isSeg) kept.push(it);
    }
    arr.splice(0, arr.length, ...kept);
  }
  const zoomAt = (o: number) => Math.min(1.12, [...zooms].reverse().find(([t]) => o >= t)?.[1] ?? 1);
  let beats: number[] = [];
  const dips = speechDips(c.raw, tl);
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  const boards = (c.boards ?? []).map((bd) => ({...bd, oa: at(bd.a), ob: Math.min(at(bd.b), at(bd.a) + 3500)})); // boards ≤ 3.5 s (reviewer: diagrams covered the speaker 7–8 s)
  const flashO = c.flash ? at(c.flash[0]) : -1;
  const arrow = at(c.arrowAt);
  const camCfg: CamCfg = {src: c.src, tl, track: c.track, grade: VIRAL_WARM, box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX: c.wideX, who: () => 'M'};
  const capsOffList: [number, number][] = [[at(c.arrowAt), at(c.arrowAt) + 1300], ...boards.map((bd) => [bd.oa, bd.ob] as [number, number]), ...(c.capsOff ?? []).map(([a, b]) => [at(a), at(b)] as [number, number]), [0, tl.segOut[hookN]] as [number, number]];
  const capWords = applyHi(wordsFrom(c.raw, tl, {goaded: 'goated', fields: 'Fields', ...(c.fix ?? {})}), c.hi);
  beats = capWords.filter((w) => { const h = c.hi?.[w.text.toLowerCase().replace(/^[^a-z0-9$*]+|[^a-z0-9%*]+$/g, '')]; return Array.isArray(h); }).map((w) => w.at)
    .filter((t, i, a) => i === 0 || t - a[i - 1] > 700);
  const beatK = (o: number) => beats.reduce((k, t) => (o >= t && o < t + 260 ? Math.max(k, 1 - (o - t) / 260) : k), 0);
  const spec: Spec = {
    tl, src: c.src, track: c.track, top: c.top, wordY: 1230, /* below faces, on the hoodie (review r2: captions sat on chins) */ wideX: c.wideX, capSize: 60, grade: VIRAL_WARM,
    words: capWords, shots, strobes: [], tints: [], swish: [],
    capsOff: capsOffList, // v2: captions off while a diagram owns the box
    camFx: (o) => {
      const whip = 0; // 2026-11-16: crisp first frame
      return {transform: `translateX(${-whip * 140}px) scale(${zoomAt(o) * (1 + whip * 0.1) * (1 + beatK(o) * 0.045)})`, transformOrigin: '50% 42%', filter: whip ? `blur(${whip * 12}px)` : undefined};
    },
    inBox: (o) => <>
      {boards.map((bd, i) => (o >= bd.oa && o < bd.ob ? <BoardShell key={i} o={o} a={bd.oa} b={bd.ob} cam={camCfg}>{bd.render(o, at)}</BoardShell> : null))}
      {c.inBox?.(o, at)}
      {o < tl.segOut[hookN] && (DIAGRAM_HOOKS && c.hook ? c.hook(o + HOOK_LEAD, tl.segOut[hookN] + HOOK_LEAD) : <AutoHook o={o + HOOK_LEAD} end={tl.segOut[hookN] + HOOK_LEAD} text={c.hookText ?? c.top} top={70} />)}
      {c.yt && <YouTubeCard o={o} a={at(c.yt.a)} b={at(c.yt.b)} title={c.yt.title} cam={camCfg} startAt={c.yt.a} dur={tl.total + 20000} />}
      {flashO >= 0 && o >= flashO && o < flashO + 190 && <AbsoluteFill style={{background: TINT[c.flash![1]], mixBlendMode: 'color',
        opacity: interpolate(o - flashO, [0, 70, 190], [1, 1, 0], clamp)}} />}
    </>,
    overlay: (o, face) => {
      const f = face('M');
      return <>
        {o >= arrow && o < arrow + 1300 && !boards.some((bd) => o >= bd.oa && o < bd.ob) && (c.mark === 'circle' ? <HeadRing o={o} a={arrow} b={arrow + 1500} x={f.x} y={f.y} k={1.25} label="Trevor Lawrence" /> : <ArrowName o={o - arrow} x={f.x} y={f.y} />)}
        {c.cutout && <MemePop o={o} at={at(c.cutout.src)} to={at(c.cutout.src) + 900} src={c.cutout.file} x={c.cutout.x ?? 560} y={c.cutout.y ?? 820} size={c.cutout.size ?? 440} />}
        {c.overlay?.(o, at)}
        {!boards.some((bd) => o >= bd.oa && o < bd.ob) && !capsOffList.some(([x, y]) => o >= x && o < y) && <EmojiPop o={o} words={capWords} hi={c.hi} y={1230} />}
      </>;
    },
    music: {file: c.music, from: c.from, level: 0, gain: 1, floor: 0.55, ramp: 150, dips, start: tl.segOut[1], swell: [end, 3]},
    extraSfx: [
      sfx('keyboard-typing', 0, 0.12, Math.max(300, hookTypeMs(c.hookText ?? c.top, tl.segOut[hookN] + HOOK_LEAD) - HOOK_LEAD)),
      sfx('record-scratch', tl.segOut[1] - 60, 0.16, 450),
      ...(flashO >= 0 ? [sfx('bass-boosted-vine-boom', flashO - 60, 0.07, 450)] : []),
      sfx('mg-swoosh', arrow, 0.16, 500),
      ...boards.flatMap((bd) => [sfx('mg-swoosh2', bd.oa, 0.18, 500), sfx('mg-whoosh', bd.ob - 250, 0.14, 500)]),
      ...(c.cutout ? [sfx('jv2-pop-button', at(c.cutout.src), 0.18)] : []),
      ...(c.sfx?.(at) ?? []),
      ...beats.filter((t) => t > 400).map((t) => sfx('jv2-pop-button', t, 0.07, 300)),
    ],
  };
  return {spec, total: tl.total};
};

// the full cam shrinks into a corner face-cam (top-right) while a diagram owns the box, then grows back (no elastic: a light settle)
const SH = 1, FC = 320; // boards cut in/out hard — the growing picture-in-picture read as a glitch (review r2)
const BoardShell = ({o, a, b, cam, children}: {o: number; a: number; b: number; cam: CamCfg; children: ReactNode}) => {
  const pin = Math.min(1, Math.max(0, (o - a) / SH)), pout = Math.min(1, Math.max(0, (o - (b - SH)) / SH));
  const t = (1 - (1 - pin) ** 3) - (pout > 0 ? 1 - (1 - pout) ** 3 : 0);
  const lerp = (x: number, y: number) => x + (y - x) * t;
  const cw = lerp(1080, FC), ch = lerp(BOX_H, FC);
  const cfg: CamCfg = {...cam, box: [Math.round(cw), Math.round(ch)], baseH: lerp(640, 420), faceY: lerp(0.42, 0.45)};
  return <AbsoluteFill>
    <AbsoluteFill style={{opacity: t, background: '#f4f1ea'}}>{children}</AbsoluteFill>
    <div style={{position: 'absolute', right: lerp(0, 30), top: lerp(0, 30), width: cw, height: ch, borderRadius: lerp(0, 28), overflow: 'hidden',
      border: `${Math.max(0, lerp(0, 7))}px solid white`, boxShadow: `0 12px 28px rgba(0,0,0,${0.45 * t})`, background: '#111'}}>
      <Cam c={cfg} o={o} />
    </div>
  </AbsoluteFill>;
};

const ArrowName = ({o, x, y}: {o: number; x: number; y: number}) => {
  const p = interpolate(o, [0, 220], [0, 1], clamp), fade = interpolate(o, [1100, 1300], [1, 0], clamp);
  const ax = Math.min(Math.max(x - 260, 30), 700), ay = y + 150;
  return <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, opacity: fade, pointerEvents: 'none'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d={`M ${ax + 40} ${ay + 150} C ${ax - 40} ${ay + 60}, ${ax + 40} ${ay - 40}, ${x - 70} ${y + 40}`} fill="none" stroke="#E8261F" strokeWidth={14}
        strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {p > 0.95 && <path d={`M ${x - 112} ${y + 30} L ${x - 66} ${y + 42} L ${x - 92} ${y + 82}`} fill="none" stroke="#E8261F" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
    <div style={{position: 'absolute', left: ax - 120, top: ay + 160, fontFamily: MONT, fontWeight: 900, fontStyle: 'italic', fontSize: 50, color: '#E8261F',
      WebkitTextStroke: '6px white', paintOrder: 'stroke fill', opacity: p, whiteSpace: 'nowrap'}}>*Trevor Lawrence*</div>
  </div>;
};

// ---------- diagram pieces ---------------------------------------------------------------------------------------------------------
const Title = ({text, color = '#111'}: {text: string; color?: string}) =>
  <div style={{position: 'absolute', left: 50, top: 70, fontFamily: MONT, fontWeight: 900, fontSize: 64, color, letterSpacing: 1}}>{text}</div>;
// mind-map: centre node + branches that pop in on their words
const MindMap = ({o, center, items}: {o: number; center: string; items: {t: string; at: number}[]}) => {
  const cx = 540, cy = 620;
  const pos = [[285, 380], [795, 380], [285, 860], [795, 860]];
  return <AbsoluteFill>
    <Title text="THE PLAYBOOK" />
    <svg width={BW} height={BOX_H} style={{position: 'absolute', inset: 0}}>
      {items.map((it, i) => { const [x, y] = pos[i % 4]; const p = interpolate(o - it.at, [0, 260], [0, 1], clamp);
        return <line key={i} x1={cx} y1={cy} x2={cx + (x - cx) * p} y2={cy + (y - cy) * p} stroke="#2a2a2a" strokeWidth={7} strokeLinecap="round" />; })}
    </svg>
    <div style={{position: 'absolute', left: cx - 200, top: cy - 62, width: 400, height: 124, borderRadius: 62, background: '#111', color: 'white', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 50}}>{center}</div>
    {items.map((it, i) => { const [x, y] = pos[i % 4]; if (o < it.at) return null;
      return <div key={i} style={{position: 'absolute', left: x - 200, top: y - 55, width: 400, height: 110, borderRadius: 20, background: 'white', border: '6px solid #111',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#111', transform: `scale(${pop(o, it.at, 11, 240)})`}}>{it.t}</div>; })}
  </AbsoluteFill>;
};
// whole inventory as a dot grid; a handful light up green as "this week"
const Inventory = ({o, lightAt}: {o: number; lightAt: number}) => {
  const cols = 20, rows = 15, pick = new Set([7, 33, 58, 91, 124, 150, 187, 213, 240, 266]);
  return <AbsoluteFill>
    <Title text="WHOLE PLAYBOOK" />
    <div style={{position: 'absolute', left: 70, top: 220, display: 'grid', gridTemplateColumns: `repeat(${cols}, 40px)`, gap: 8}}>
      {Array.from({length: cols * rows}, (_, i) => { const lit = pick.has(i) && o >= lightAt + [...pick].indexOf(i) * 80;
        return <div key={i} style={{width: 40, height: 40, borderRadius: '50%', background: lit ? '#58EE28' : '#cfc9bb', transform: `scale(${lit ? pop(o, lightAt + [...pick].indexOf(i) * 80, 9, 260) : 1})`}} />; })}
    </div>
    {o >= lightAt + 600 && <div style={{position: 'absolute', left: 70, top: 900, fontFamily: MONT, fontWeight: 900, fontSize: 60, color: '#1f8f12', transform: `scale(${pop(o, lightAt + 600, 11, 240)})`, transformOrigin: '0 50%'}}>THIS WEEK: 8–10 NEW</div>}
  </AbsoluteFill>;
};
// top-down field: rollouts to the right (coaches) in red, then to the left (him) in green
export const Field = ({o, rightAt, leftAt}: {o: number; rightAt: number; leftAt: number}) => {
  const W = 1080, H = BOX_H, LOS = 640;
  const arc = (dir: 1 | -1, t0: number, col: string, k: number) => {
    const p = interpolate(o - t0, [0, 600], [0, 1], clamp);
    if (p <= 0) return null;
    const x0 = 540, y0 = 860 + k * 6, x1 = 540 + dir * 330, y1 = 780;
    return <g key={`${dir}${k}`}>
      <path d={`M ${x0} ${y0} Q ${x0 + dir * 180} ${y0 + 40} ${x1} ${y1}`} fill="none" stroke={col} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      {p > 0.98 && <circle cx={x1} cy={y1} r={16} fill={col} />}
    </g>;
  };
  return <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, #2f7d38 0 90px, #2b7334 90px 180px)'}}>
    <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
      <line x1={0} x2={W} y1={LOS} y2={LOS} stroke="#5ab0ff" strokeWidth={7} />
      {[360, 450, 540, 630, 720].map((x) => <circle key={x} cx={x} cy={LOS + 48} r={34} fill="#d9d9d9" stroke="#333" strokeWidth={5} />)}
      <circle cx={540} cy={860} r={30} fill="#111" stroke="white" strokeWidth={5} />
      {[0, 1, 2].map((k) => arc(1, rightAt + k * 350, '#FF4D4D', k))}
      {arc(-1, leftAt, '#58EE28', 0)}
    </svg>
    <div style={{position: 'absolute', right: 40, top: 360, fontFamily: MONT, fontWeight: 900, fontSize: 54, color: '#FF4D4D', WebkitTextStroke: '5px #111', paintOrder: 'stroke fill',
      opacity: o >= rightAt ? 1 : 0}}>COACHES: ROLL RIGHT</div>
    <div style={{position: 'absolute', left: 40, top: 960, fontFamily: MONT, fontWeight: 900, fontSize: 60, color: '#58EE28', WebkitTextStroke: '5px #111', paintOrder: 'stroke fill',
      opacity: o >= leftAt ? 1 : 0, transform: `scale(${o >= leftAt ? pop(o, leftAt, 10, 240) : 1})`, transformOrigin: '0 50%'}}>HIM: GO LEFT</div>
  </AbsoluteFill>;
};
// two rookie seasons side by side
const RookieCompare = ({o, a}: {o: number; a: number}) => {
  const col = (name: string, yr: string, rec: string, extra: string, d: number, accent: string) =>
    <div style={{width: 440, borderRadius: 26, background: 'white', border: `6px solid ${accent}`, padding: '26px 24px', opacity: ease(o, a + d, 220), transform: `translateY(${(1 - ease(o, a + d, 260)) * 40}px)`}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#111'}}>{name}</div>
      <div style={{fontFamily: MONT, fontWeight: 700, fontSize: 30, color: '#666', marginBottom: 14}}>ROOKIE YEAR · {yr}</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 96, color: '#E8261F', lineHeight: '100px'}}>{rec}</div>
      <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 30, color: '#333', marginTop: 10}}>{extra}</div>
    </div>;
  return <AbsoluteFill>
    <Title text="SAME START" />
    <div style={{position: 'absolute', left: 60, top: 420, display: 'flex', gap: 40}}>
      {col('PEYTON', '1998', '3-13', '28 INTs (most in the NFL)', 0, '#1c4fa1')}
      {col('TREVOR', '2021', '3-14', 'called Peyton for perspective', 350, '#0b6b6b')}
    </div>
  </AbsoluteFill>;
};

// ---------- the 7 redone clips ------------------------------------------------------------------------------------------------------
// #2 rookie-year call (u4): Grant (L) asks → Trevor (M) answers, cutaways to Bugsy (R) and wide; diagram = both rookie seasons
const ROOKIE = make({src: 'pod2/u4_peyton.mp4', track: T(peytonTrack), raw: peytonWords as Raw, wideX: 960, top: 'Who Trevor called when his rookie year went wrong',
  segs: [[47200, 50210], [20460, 29520], [37600, 46750]], hookSeat: 'W', music: 'Fluffing_a_Duck.mp3', from: 0, arrowAt: 25600,
  shots: [[20460, 'L'], [22800, 'M'], [24600, 'L'], [25600, 'M'], [27600, 'R'], [28500, 'M', 1.1], [37600, 'W'], [39300, 'M'], [41200, 'M', 1.12]],
  cutout: {src: 26000, file: 'cutouts/peyton.png'}, flash: [40900, 'red'],
  boards: [{a: 43700, b: 46750, render: (o, at) => <RookieCompare o={o} a={at(43700)} />}]});
export const B17Rookie = () => <Jorho s={ROOKIE.spec} />;
export const B17_ROOKIE_MS = ROOKIE.total;

// #4 playbook (u1): question from Grant (L) → Trevor; diagrams = THE OFFENSE mind-map on "runs, pass concepts, play action, screens",
// then the whole playbook as dots with 8–10 lighting up as "this week"
const PLAYBOOK = make({src: 'pod2/u1_playbook.mp4', track: T(pbTrack), raw: pbWords as Raw, wideX: 960, top: 'Trevor has to learn HUNDREDS of plays',
  segs: [[16800, 18380], [0, 4300], [14300, 24360], [48740, 54910]], hookSeat: 'M', music: 'blue-yung-kai.mp3', from: 30000, arrowAt: 3300,
  shots: [[0, 'L'], [2600, 'M'], [3300, 'W'], [14300, 'M'], [16200, 'R'], [16800, 'M', 1.1], [48740, 'M']],
  boards: [
    {a: 18300, b: 24360, render: (o, at) => <MindMap o={o} center="THE OFFENSE" items={[{t: 'RUNS', at: at(19000)}, {t: 'PASS CONCEPTS', at: at(20400)}, {t: 'PLAY ACTION', at: at(21800)}, {t: 'SCREENS', at: at(22500)}]} />},
    {a: 49900, b: 54910, render: (o, at) => <Inventory o={o} lightAt={at(52500)} />}],
  sfx: (at) => [sfx('jv2-pop-button', at(19000), 0.16), sfx('jv2-pop-button', at(20400), 0.16), sfx('jv2-pop-button', at(21800), 0.16), sfx('jv2-pop-button', at(22500), 0.16), sfx('ding-2', at(52500), 0.18)]});
export const B17Playbook = () => <Jorho s={PLAYBOOK.spec} />;
export const B17_PLAYBOOK_MS = PLAYBOOK.total;

// #5 better going left (t3): Trevor (M) story, reaction cutaways to Grant (L) / Bugsy (R); diagram = rollouts right (coaches) vs left (him);
// the compliment is Grant's → L, then Trevor's reaction wide
const LEFT = make({src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, wideX: 960, top: 'Why Trevor throws better going LEFT',
  segs: [[47840, 50800], [24100, 33670], [33900, 39840], [50760, 52890]], hookSeat: 'M', music: 'lose-you-adturnup.mp3', from: 20000, arrowAt: 24200,
  shots: [[24100, 'M'], [32300, 'R'], [33100, 'M', 1.1], [37800, 'L'], [38600, 'M'], [50760, 'L'], [52300, 'W']],
  flash: [32800, 'red'],
  boards: [{a: 26000, b: 31800, render: (o, at) => <Field o={o} rightAt={at(27000)} leftAt={at(31000)} />}, {a: 33900, b: 36500, render: (o, at) => <Field o={o} rightAt={at(33900) - 3000} leftAt={at(34600)} />}]});
export const B17Left = () => <Jorho s={LEFT.spec} />;
export const B17_LEFT_MS = LEFT.total;

// #7 natty ticket gift (t4): Grant (L) talks the whole way, cut to Trevor (M) listening and wide; graphic = the ticket card + MVP line
const Ticket = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const p = ease(o, a, 320), out = 1 - ease(o, b - 200, 200);
  return <div style={{position: 'absolute', left: 90, top: 60 + (1 - p) * 80, width: 900, height: 300, opacity: Math.min(p, out), transform: 'rotate(-3deg)',
    background: 'linear-gradient(90deg, #F6EEDC 0 72%, #EADFC4 72% 100%)', borderRadius: 16, boxShadow: '0 16px 34px rgba(0,0,0,0.45)', fontFamily: MONT, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 650, height: 64, background: '#F56600'}} />
    <div style={{position: 'absolute', left: 28, top: 12, fontWeight: 900, fontSize: 32, color: 'white'}}>NATIONAL CHAMPIONSHIP</div>
    <div style={{position: 'absolute', left: 28, top: 86, fontWeight: 900, fontSize: 44, color: '#522D80'}}>CLEMSON vs ALABAMA</div>
    <div style={{position: 'absolute', left: 28, top: 146, fontWeight: 700, fontSize: 26, color: '#555'}}>SIGNED · MVP: TREVOR LAWRENCE</div>
    <div style={{position: 'absolute', left: 648, top: 0, bottom: 0, borderLeft: '4px dashed #b8a98a'}} />
    <div style={{position: 'absolute', left: 680, top: 40, fontWeight: 900, fontSize: 30, color: '#522D80', lineHeight: '34px'}}>ADMIT<br />ONE</div>
  </div>;
};
const GIFT = make({src: 'pod/t4_natty_ticket.mp4', track: T(ticketTrack), raw: ticketWords as Raw, wideX: 960, top: 'Grant gifted Trevor a ticket to his OWN natty',
  segs: [[27160, 29500], [9800, 17400], [21540, 33300]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 150000, arrowAt: 9900,
  shots: [[9800, 'W'], [11000, 'L'], [13700, 'M'], [14300, 'L'], [15700, 'M', 1.1], [21540, 'L'], [23900, 'M'], [26000, 'L', 1.1], [29400, 'M'], [30400, 'W']],
  flash: [29760, 'green'],
  inBox: (o, at) => <><Ticket o={o} a={at(22400)} b={at(29300)} /><TypedAction o={o} a={at(15500)} b={at(17300)} text="gifting Trevor… Trevor" y={60} /></>,
  sfx: (at) => [sfx('paper-tear', at(22400), 0.16, 600), sfx('keyboard-typing', at(15500), 0.1, 900), sfx('ding-2', at(29760), 0.18)]});
export const B17Gift = () => <Jorho s={GIFT.spec} />;
export const B17_GIFT_MS = GIFT.total;

// #8 Jesus first pick (t2): Grant (L) asks, Trevor (M) thinks (tight), Bugsy (R) laughs at "Jesus"; graphic = dream foursome card
const Foursome = ({o, a, b, jesusAt}: {o: number; a: number; b: number; jesusAt: number}) => {
  if (o < a || o >= b) return null;
  const p = ease(o, a, 260), out = 1 - ease(o, b - 180, 180);
  const row = (n: number, txt: string, lit: boolean, at: number, emoji?: string) => <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 70, borderBottom: '3px solid #ddd'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: '#999', width: 36}}>{n}</div>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: lit ? '#111' : '#bbb', transform: `scale(${lit ? pop(o, at, 10, 260) : 1})`, transformOrigin: '0 50%', display: 'flex', alignItems: 'center', gap: 12}}>
      {txt}{emoji && lit && <Emo code={emoji} size={50} />}</div>
  </div>;
  return <div style={{position: 'absolute', left: 50, top: 50, width: 520, background: 'white', borderRadius: 22, padding: '18px 26px', opacity: Math.min(p, out),
    boxShadow: '0 14px 30px rgba(0,0,0,0.4)'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: '#1f8f12', marginBottom: 6}}>DREAM FOURSOME</div>
    {row(1, 'TREVOR', true, a)}{row(2, o >= jesusAt ? 'JESUS' : '???', o >= jesusAt, jesusAt, '1f64f')}{row(3, '???', false, 0)}{row(4, '???', false, 0)}
  </div>;
};
const JESUS = make({src: 'pod/t2_dream_golf_four.mp4', track: T(golfTrack), raw: golfWords as Raw, wideX: 960, top: "Trevor's FIRST pick for his dream golf foursome",
  segs: [[32240, 34350], [11280, 19850], [23760, 28620], [32240, 37700]], hookSeat: 'M', music: 'midnight-club.mp3', from: 30000, arrowAt: 23800,
  shots: [[11280, 'L'], [13900, 'M'], [16800, 'L'], [19000, 'W'], [23760, 'M'], [26500, 'M', 1.12], [33400, 'R'], [34700, 'L'], [35800, 'W']],
  flash: [33500, 'yellow'],
  inBox: (o, at) => <><Foursome o={o} a={at(12300)} b={at(37600)} jesusAt={at(33500)} /><TypedAction o={o} a={at(26500)} b={at(28600)} text="thinking…" y={500} /></>,
  sfx: (at) => [sfx('keyboard-typing', at(26500), 0.1, 700), sfx('ding-2', at(33500), 0.2), sfx('jv2-pop-button', at(12300), 0.14)]});
export const B17Jesus = () => <Jorho s={JESUS.spec} />;
export const B17_JESUS_MS = JESUS.total;

// #9 Marino top 10 (NT rip): wide before the track starts (<60 s), Grant (L, standing) shows the card, Trevor (M) answers, Bugsy (R) laughs;
// graphic = "ALL-TIME TOP 10 QB?" with Marino's row ticking ✅ on "gotta be"
const Top10 = ({o, a, b, tick}: {o: number; a: number; b: number; tick: number}) => {
  if (o < a || o >= b) return null;
  const p = ease(o, a, 240), out = 1 - ease(o, b - 180, 180);
  return <div style={{position: 'absolute', left: 50, top: 50, width: 560, background: 'rgba(12,12,16,0.9)', borderRadius: 22, padding: '20px 26px', opacity: Math.min(p, out)}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: '#bbb'}}>ALL-TIME TOP 10 QB?</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 10}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, color: 'white'}}>DAN MARINO</div>
      {o >= tick && <div style={{transform: `scale(${pop(o, tick, 9, 260)})`}}><Emo code="2705" size={70} /></div>}
    </div>
  </div>;
};
const MARINO = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Is Dan Marino a top 10 QB? Trevor answered',
  segs: [[66940, 69200], [55460, 73630]], hookSeat: 'M', music: 'tak-tak.mp3', from: 2000, arrowAt: 55600,
  shots: [[55460, 'W'], [60200, 'L'], [62800, 'M'], [64600, 'M', 1.1], [66900, 'R'], [68400, 'M'], [70300, 'W']],
  flash: [62100, 'yellow'],
  inBox: (o, at) => <Top10 o={o} a={at(62900)} b={at(69500)} tick={at(65500)} />,
  sfx: (at) => [sfx('jv2-pop-button', at(62900), 0.16), sfx('ding-2', at(65500), 0.2)]});
export const B17Marino = () => <Jorho s={MARINO.spec} />;
export const B17_MARINO_MS = MARINO.total;

// #10 sweat a card (NT rip): Grant (L) demonstrates — the cam STAYS full (the demo is the point), checklist ticks top-left;
// cutaways to Trevor (M) watching and the wide
const Rules = ({o, a, b, at3}: {o: number; a: number; b: number; at3: number[]}) => {
  if (o < a || o >= b) return null;
  const p = Math.min(ease(o, a, 200), 1 - ease(o, b - 180, 180));
  const rows = ["DON'T LOOK AT THE BACK", "DON'T TOUCH THE CORNERS", 'ONE AT A TIME · SLIDE'];
  return <div style={{position: 'absolute', left: 36, top: 36, opacity: p, background: 'rgba(250,250,247,0.96)', borderRadius: 20, padding: '14px 22px', width: 640,
    boxShadow: '0 14px 30px rgba(0,0,0,0.45)', transform: 'scale(1.15)', transformOrigin: '0 0'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: '#777', marginBottom: 6}}>HOW TO SWEAT A CARD</div>
    {rows.map((r, i) => <div key={r} style={{display: 'flex', alignItems: 'center', gap: 14, margin: '6px 0', opacity: o >= at3[i] ? 1 : 0.35}}>
      <div style={{width: 44, height: 44}}>{o >= at3[i] ? <div style={{transform: `scale(${pop(o, at3[i], 9, 260)})`}}><Emo code="2705" size={44} /></div> : <div style={{width: 38, height: 38, border: '4px solid #bbb', borderRadius: 8}} />}</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 30, color: '#111'}}>{r}</div></div>)}
  </div>;
};
const SWEAT = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Grant teaches Trevor how to sweat a card',
  segs: [[29100, 32240], [15960, 24170], [33560, 46070]], hookSeat: 'W', music: 'Investigations.mp3', from: 10000, arrowAt: 16000,
  shots: [[15960, 'W'], [33560, 'W'], [36200, 'M'], [37400, 'W'], [41000, 'M'], [42300, 'W', 1.08]],
  flash: [31900, 'yellow'],
  inBox: (o, at) => <><Rules o={o} a={at(34600)} b={at(46000)} at3={[at(35600), at(40500), at(43800)]} /><TypedAction o={o} a={at(17400)} b={at(19900)} text="you can't risk your hands" y={60} color="#FF4D4D" glow="rgba(255,77,77,0.5)" /></>,
  sfx: (at) => [sfx('ding-2', at(35600), 0.14), sfx('ding-2', at(40500), 0.14), sfx('ding-2', at(43800), 0.14), sfx('keyboard-typing', at(17400), 0.1, 800)]});
export const B17Sweat = () => <Jorho s={SWEAT.spec} />;
export const B17_SWEAT_MS = SWEAT.total;
