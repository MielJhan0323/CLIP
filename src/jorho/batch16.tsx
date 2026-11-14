// BATCH 16 (2026-11-14): the 5 batch-15 Trevor clips REMADE in the 500K-view style (user: "analyze the reference video with 500k views…
// the camera panning, the sound effects, the stickers" → "then remake the 5 clips, discontinue the Justin Augh").
// Breakdown: vault/02 Style Guide/Viral formula - 500K light edit + warm grade.md. What is copied (the principles, measured):
//  · dead-air trims inside lines (pauses > 0.38 s cut out) so the audio never sags
//  · a VIRTUAL CAMERA: locked crops, hard punch-cuts between zoom levels (~every 1.3 s), always on whoever talks, one wide shot early,
//    the ending on the widest shot; a whip-blur first frame
//  · colour-flash frames (red / yellow / green tint, ~2 frames) on the punchy words, each with a bass boom
//  · a red curved arrow + red italic *Trevor Lawrence* once; one meme cut-out where a person is named
//  · small one-word captions (yellow / cyan / green / white) at chest height; VIRAL_WARM grade
//  · an upbeat bed that starts at the first cut, stays under the voice, and SWELLS on the ending
import {AbsoluteFill} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, sfx, timeline, type Seg, type TL} from '../e3/kit';
import {MemePop, wordsFrom} from './kit';
import {Jorho, VIRAL_WARM, type Spec} from './clips';
import {speechDips} from '../campaigns/neon_clip/neon';
import {interpolate} from 'remotion';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';
import t6Words from '../plans/data/t6_davis_mills_joke.words.json';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';
import {dTrack} from './batch8';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
type Seat = 'L' | 'M' | 'W';
const T = (x: unknown) => x as Track;

// split each segment wherever the speech pauses longer than maxGap (keeps a short tail / lead-in), holds stay on the last piece
const tighten = (segs: Seg[], raw: Raw, maxGap = 380): Seg[] => {
  const all = [...raw].sort((x, y) => x.startMs - y.startMs);
  const nextStart = (ms: number) => all.find((w) => w.startMs > ms)?.startMs ?? Infinity;
  // a cut keeps ~250 ms after the last word's end (word end-times run early → the last syllable got clipped), never into the next word
  const tail = (w: Raw[number]) => Math.min(w.endMs + 250, nextStart(w.startMs) - 60);
  return segs.flatMap(([a, b, hold]) => {
    const ws = all.filter((w) => w.startMs >= a && w.startMs < b);
    const out: Seg[] = [];
    let s0 = a;
    for (let k = 0; k + 1 < ws.length; k++) {
      if (ws[k + 1].startMs - ws[k].endMs > maxGap) { out.push([s0, tail(ws[k])]); s0 = Math.max(s0, ws[k + 1].startMs - 90); }
    }
    const end = ws.length ? Math.max(b, tail(ws[ws.length - 1])) : b;
    out.push(hold ? [s0, end, hold] : [s0, end]);
    return out.filter(([x, y]) => y - x > 120);
  });
};

type Flash = [src: number, color: 'red' | 'yellow' | 'green', inBody?: boolean]; // inBody: a repeated line, flash it in the body (default: the cold open)
type Cfg = {src: string; track: Track; raw: Raw; segs: Seg[]; top: string; wideX: number; grant: [number, number][]; music: string; from: number;
  flashes: Flash[]; arrowAt: number; cutout?: {src: number; file: string; x?: number; y?: number; size?: number}; fah?: number; hookPieces?: number};
const TINT = {red: 'rgba(255,40,40,0.75)', yellow: 'rgba(240,255,60,0.7)', green: 'rgba(80,255,60,0.65)'};

const make = (c: Cfg) => {
  const segs = tighten(c.segs, c.raw);
  // ending room: run the last shot ~0.8 s past the last word (the reaction) so the music swell + boom land AFTER the voice (viral #3 ending)
  const lastSeg = segs[segs.length - 1];
  const after = [...c.raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= lastSeg[1])?.startMs ?? Infinity;
  const spokeEnd = lastSeg[1];
  segs[segs.length - 1] = [lastSeg[0], Math.max(lastSeg[1], Math.min(lastSeg[1] + 800, after - 60)), lastSeg[2] ?? 0];
  const tl = timeline(segs);
  // source time → output time, preferring the body (the cold open repeats a later line)
  const hookN = c.hookPieces ?? tighten([c.segs[0]], c.raw).length;
  const out = (src: number, body = true) => {
    for (let i = body ? hookN : 0; i < segs.length; i++) if (src >= segs[i][0] && src < segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    for (let i = 0; i < segs.length; i++) if (src >= segs[i][0] && src < segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    return 0;
  };
  const who = (src: number): Seat => (c.grant.some(([a, b]) => src >= a && src < b) ? 'L' : 'M');
  // virtual camera: a shot per piece (longer pieces get a punch-in cut half-way), zoom alternates 1.0 / 1.28 on the same seat,
  // the first body piece is the WIDE shot (arrow sticker there), the last piece is wide
  const shots: [number, Seat][] = [];
  const zooms: [number, number][] = [];
  let z = 0;
  segs.forEach(([a, b], i) => {
    const o0 = tl.segOut[i];
    const seat: Seat = i === hookN || i === segs.length - 1 ? 'W' : who(a + 50);
    shots.push([o0, seat]); zooms.push([o0, seat === 'W' ? 1 : (z++ % 2 ? 1.4 : 1)]);
    // punch-cut every ~1.4 s inside long pieces (viral #3: the framing changes about every 1.2 s), alternating tight / medium
    if (seat !== 'W') for (let t = 1400; t < b - a - 600; t += 1400) { shots.push([o0 + t, who(a + t)]); zooms.push([o0 + t, z++ % 2 ? 1.4 : 1]); }
  });
  const zoomAt = (o: number) => [...zooms].reverse().find(([t]) => o >= t)?.[1] ?? 1;
  const flashes = c.flashes.map(([s, col, body]) => [out(s, body ?? !(s >= c.segs[0][0] && s < c.segs[0][1])), col] as const);
  const dips = speechDips(c.raw, tl);
  const lastWord = tl.segOut[segs.length - 1] + spokeEnd - lastSeg[0]; // end of the last spoken word (incl. its 250 ms tail)
  const arrow = out(c.arrowAt);
  const spec: Spec = {
    tl, src: c.src, track: c.track, top: c.top, wordY: 1000, wideX: c.wideX, capSize: 60, grade: VIRAL_WARM,
    words: wordsFrom(c.raw, tl, {goaded: 'goated'}), // one word at a time, default yellow/cyan/green/white palette
    shots, strobes: [], tints: [], swish: [],
    fah: c.fah !== undefined ? [out(c.fah) + 40] : [], fahVol: 1.1,
    camFx: (o) => {
      const whip = o < 200 ? 1 - o / 200 : 0; // whip-blur first frames
      return {transform: `translateX(${-whip * 160}px) scale(${zoomAt(o) * (1 + whip * 0.12)})`, transformOrigin: '50% 42%', filter: whip ? `blur(${whip * 14}px)` : undefined};
    },
    inBox: (o) => <>{flashes.map(([t, col], i) => (o >= t && o < t + 190 ? <AbsoluteFill key={i} style={{background: TINT[col], mixBlendMode: 'color',
      opacity: interpolate(o - t, [0, 70, 190], [1, 1, 0], clamp)}} /> : null))}</>,
    overlay: (o, face) => {
      const f = face('M');
      const show = o >= arrow && o < arrow + 1300;
      return <>
        {show && <ArrowName o={o - arrow} x={f.x} y={f.y} />}
        {c.cutout && <MemePop o={o} at={out(c.cutout.src)} to={out(c.cutout.src) + 900} src={c.cutout.file} x={c.cutout.x ?? 560} y={c.cutout.y ?? 820} size={c.cutout.size ?? 440} />}
      </>;
    },
    music: {file: c.music, from: c.from, level: 0, gain: 1, floor: 0.55, ramp: 150, dips, start: tl.segOut[1], swell: [lastWord, 3]},
    extraSfx: [
      sfx('fast-whoosh', 0, 0.22, 400),
      sfx('jv2-smash-bros-hit', tl.segOut[1], 0.18, 500),
      ...flashes.map(([t]) => sfx('bass-boosted-vine-boom', t - 60, 0.07, 450)), // soft: a loud boom masked the punch word (QC 2026-11-14)
      sfx('mg-swoosh', arrow, 0.18, 500),
      ...(c.cutout ? [sfx('mg-swoosh', out(c.cutout.src), 0.2, 500)] : []),
      ...shots.slice(1).filter(([t]) => dips.every(([a, b]) => t < a || t >= b)).map(([t]) => sfx('fast-whoosh', t - 80, 0.1, 300)),
      sfx('bass-boosted-vine-boom', lastWord + 40, 0.16, 900),
    ],
  };
  return {spec, total: tl.total};
};

// red curved arrow pointing at Trevor + red italic name (viral #3 sticker)
const ArrowName = ({o, x, y}: {o: number; x: number; y: number}) => {
  const p = interpolate(o, [0, 220], [0, 1], clamp), fade = interpolate(o, [1100, 1300], [1, 0], clamp);
  const ax = Math.min(Math.max(x - 260, 30), 700), ay = y + 150;
  return <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, opacity: fade, pointerEvents: 'none'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d={`M ${ax + 40} ${ay + 150} C ${ax - 40} ${ay + 60}, ${ax + 40} ${ay - 40}, ${x - 70} ${y + 40}`} fill="none" stroke="#E8261F" strokeWidth={14}
        strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: 'drop-shadow(0 0 2px white)'}} />
      {p > 0.95 && <path d={`M ${x - 112} ${y + 30} L ${x - 66} ${y + 42} L ${x - 92} ${y + 82}`} fill="none" stroke="#E8261F" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
    <div style={{position: 'absolute', left: ax - 120, top: ay + 160, fontFamily: MONT, fontWeight: 900, fontStyle: 'italic', fontSize: 50, color: '#E8261F',
      WebkitTextStroke: '6px white', paintOrder: 'stroke fill', opacity: p, whiteSpace: 'nowrap'}}>*Trevor Lawrence*</div>
  </div>;
};

// ---- the 5 remakes (same moments as batch 15, re-cut in the 500K style) ------------------------------------------------------------
const SIG = make({src: 'pod2/u4_peyton.mp4', track: T(peytonTrack), raw: peytonWords as Raw, wideX: 700, top: 'Peyton Manning called Trevor about THIS',
  segs: [[6700, 9630], [1020, 11350], [11400, 14820], [14900, 20220]], grant: [[11400, 13700]],
  music: 'Monkeys_Spinning_Monkeys.mp3', from: 0, arrowAt: 1100, cutout: {src: 1700, file: 'cutouts/peyton.png'},
  flashes: [[9000, 'yellow'], [9000, 'yellow', true], [12500, 'green']]});
export const B16Signature = () => <Jorho s={SIG.spec} />;
export const B16_SIG_MS = SIG.total;

const ROOKIE = make({src: 'pod2/u4_peyton.mp4', track: T(peytonTrack), raw: peytonWords as Raw, wideX: 700, top: 'Who Trevor called when his rookie year went wrong',
  segs: [[47200, 50210], [20460, 29520], [37600, 46750]], grant: [[20460, 25500], [47200, 49800]],
  music: 'Fluffing_a_Duck.mp3', from: 0, arrowAt: 25600, cutout: {src: 25600, file: 'cutouts/peyton.png'},
  flashes: [[48700, 'red'], [40900, 'red'], [44700, 'red']]});
export const B16Rookie = () => <Jorho s={ROOKIE.spec} />;
export const B16_ROOKIE_MS = ROOKIE.total;

const ANT = make({src: 'pod/t1_tiger_auto_pen.mp4', track: T(antTrack), raw: antWords as Raw, wideX: 760, top: 'His autograph looks like an ant',
  segs: [[15000, 16410], [9220, 20190, 900], [20440, 27350]], grant: [[9220, 14600], [15000, 27350]],
  music: 'Sneaky_Snitch.mp3', from: 12000, arrowAt: 9300, cutout: {src: 12800, file: 'cutouts/richardson.png'}, fah: 20100,
  flashes: [[16100, 'red'], [16100, 'red', true], [27150, 'green']]});
export const B16Ant = () => <Jorho s={ANT.spec} />;
export const B16_ANT_MS = ANT.total;

const PLAYBOOK = make({src: 'pod2/u1_playbook.mp4', track: T(pbTrack), raw: pbWords as Raw, wideX: 700, top: 'Trevor has to learn HUNDREDS of plays',
  segs: [[16800, 18380], [0, 4300], [14300, 24360], [48740, 54910]], grant: [[0, 3200]],
  music: 'blue-yung-kai.mp3', from: 30000, arrowAt: 3300,
  flashes: [[17000, 'yellow'], [17000, 'yellow', true], [23500, 'green'], [52600, 'green']]});
export const B16Playbook = () => <Jorho s={PLAYBOOK.spec} />;
export const B16_PLAYBOOK_MS = PLAYBOOK.total;

const LEFT = make({src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, wideX: 715, top: 'Why Trevor throws better going LEFT',
  segs: [[47840, 50800], [24100, 33670], [33900, 39840], [50760, 52890]], grant: [[50760, 52890]],
  music: 'lose-you-adturnup.mp3', from: 20000, arrowAt: 24200,
  flashes: [[49300, 'green'], [32800, 'red'], [36100, 'green'], [51100, 'yellow']]});
export const B16Left = () => <Jorho s={LEFT.spec} />;
export const B16_LEFT_MS = LEFT.total;

// ---- 6–10: five more Trevor moments in the same 500K style (user: "make me 10 jorho v2 with the viral references") ---------------
const DAVIS = make({src: 'pod/t6_davis_mills_joke.mp4', track: dTrack, raw: t6Words as Raw, wideX: 960, top: "Trevor's reaction to the Davis Mills card",
  segs: [[9160, 12000], [2060, 16800]], grant: [[2060, 6800], [9160, 12100], [15900, 16800]],
  music: 'Fluffing_a_Duck.mp3', from: 6000, arrowAt: 6900, cutout: {src: 10400, file: 'cutouts/glennon.png'},
  flashes: [[10600, 'yellow'], [6940, 'red'], [10600, 'yellow', true]]});
export const B16Davis = () => <Jorho s={DAVIS.spec} />;
export const B16_DAVIS_MS = DAVIS.total;

const GIFT = make({src: 'pod/t4_natty_ticket.mp4', track: T(ticketTrack), raw: ticketWords as Raw, wideX: 760, top: 'Grant gifted Trevor a ticket to his OWN natty',
  segs: [[27160, 29500], [9800, 17400], [21540, 33300]], grant: [[9800, 29420], [30480, 32100]],
  music: 'jorho-lullaby.mp3', from: 150000, arrowAt: 9900,
  flashes: [[27400, 'yellow'], [24200, 'yellow'], [29760, 'green']]});
export const B16Gift = () => <Jorho s={GIFT.spec} />;
export const B16_GIFT_MS = GIFT.total;

const JESUS = make({src: 'pod/t2_dream_golf_four.mp4', track: T(golfTrack), raw: golfWords as Raw, wideX: 720, top: "Trevor's FIRST pick for his dream golf foursome",
  segs: [[32240, 34350], [11280, 19850], [23760, 28620], [32240, 37700]], grant: [[11280, 24900], [34780, 37700]],
  music: 'midnight-club.mp3', from: 30000, arrowAt: 23800, cutout: {src: 33500, file: 'emoji-ios/1f64f.png', size: 300, x: 640, y: 860},
  flashes: [[33500, 'yellow'], [33500, 'yellow', true], [36600, 'green']]});
export const B16Jesus = () => <Jorho s={JESUS.spec} />;
export const B16_JESUS_MS = JESUS.total;

const MARINO = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Is Dan Marino a top 10 QB? Trevor answered',
  segs: [[66940, 69200], [55460, 73630]], grant: [[55460, 64900]],
  music: 'tak-tak.mp3', from: 2000, arrowAt: 55600,
  flashes: [[67600, 'yellow'], [62100, 'yellow'], [65600, 'green']]});
export const B16Marino = () => <Jorho s={MARINO.spec} />;
export const B16_MARINO_MS = MARINO.total;

const SWEAT = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Grant teaches Trevor how to sweat a card',
  segs: [[29100, 32240], [15960, 24170], [33560, 46070]], grant: [[15960, 46100]],
  music: 'Investigations.mp3', from: 10000, arrowAt: 16000,
  flashes: [[31900, 'yellow'], [18700, 'red'], [44100, 'green']]});
export const B16Sweat = () => <Jorho s={SWEAT.spec} />;
export const B16_SWEAT_MS = SWEAT.total;
