// BATCH 12 (2026-11-03): 4 more Trevor Lawrence clips in Jorho v2.
// User (2026-11-03): "make sure videos are pulling from the start and keep being engaging so that people stay to watch" →
// every clip COLD-OPENS on its payoff line with a graphic already moving, then a new beat (graphic / cut / emoji / typed text)
// roughly every 2–3 s; graphics take over the box for ≤3 s and hand back to the cam; the payoff repeats or pays off at the end.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, sfx, timeline} from '../e3/kit';
import {BOX_H, GREEN, HeadRing, MemePop, RED, STROBE_CUT} from './kit';
import {Jorho, type Spec} from './clips';
import {Layer, StatBadge, TypedAction} from './v2';
import {segWords} from './batch10';
import {dTrack} from './batch8';
import t6Words from '../plans/data/t6_davis_mills_joke.words.json';
import joshWords from '../plans/data/t5_ex_teammate.words.json';
import joshTrack from '../plans/data/t5_ex_teammate.seats.json';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
const BW = 1080;
const on = (o: number, a: number, b: number) => o >= a && o < b;
const io = (o: number, a: number, b: number, d = 180) => Math.min(ease(o, a, d), 1 - ease(o, b - d, d));
const Win = ({o, wins, children}: {o: number; wins: [number, number][]; children: (a: number) => ReactNode}) => {
  const w = wins.find(([a, b]) => on(o, a, b));
  return w ? <AbsoluteFill style={{opacity: io(o, w[0], w[1])}}>{children(w[0])}</AbsoluteFill> : null;
};
// hand-drawn stamp (✗ / ✓ style word in a box) that slams in
const Stamp = ({o, at, text, color, x, y, rot = -10}: {o: number; at: number; text: string; color: string; x: number; y: number; rot?: number}) => {
  if (o < at) return null;
  const s = interpolate(o - at, [0, 90, 160], [2.2, 0.92, 1], clamp);
  return <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${s})`, border: `7px solid ${color}`, color,
    background: 'rgba(255,255,255,0.93)', fontFamily: MONT, fontWeight: 900, fontSize: 44, padding: '2px 16px', borderRadius: 10, whiteSpace: 'nowrap'}}>{text}</div>;
};

// ================= 1 · Davis Mills neck roast (t6), cold open on "longer neck than Mike Glennon" =================
const d12 = timeline([[9160, 10800], [0, 9100], [9160, 12100], [14320, 16850]]);
const dL = (i: number, src: number) => d12.segOut[i] + src - d12.segs[i][0];
const D = {glennonCold: dL(0, 10380), red: dL(1, 3360), nashon: dL(1, 4400), adam: dL(1, 5140), davis: dL(1, 5820), ew: dL(1, 6940),
  neck: dL(2, 9940), glennon: dL(2, 10380), trevor: dL(2, 11940), oh: dL(3, 14320)};
export const B12_DAVIS_MS = d12.total;
const PackList = ({o, a, b, rows}: {o: number; a: number; b: number; rows: {t: string; at: number; hot?: boolean}[]}) => {
  if (!on(o, a, b)) return null;
  return <div style={{position: 'absolute', left: 60, top: 40, width: 440, opacity: io(o, a, b), background: 'rgba(14,14,16,0.88)', borderRadius: 18, padding: '18px 24px',
    fontFamily: MONT, boxShadow: '0 10px 24px rgba(0,0,0,0.4)'}}>
    <div style={{fontWeight: 800, fontSize: 26, letterSpacing: 3, color: 'rgba(255,255,255,0.6)', marginBottom: 8}}>IN THE PACK</div>
    {rows.map((r) => o >= r.at && <div key={r.t} style={{fontWeight: 800, fontSize: 40, lineHeight: '54px', color: r.hot ? '#FF4D4D' : 'white',
      transform: `translateX(${(1 - ease(o, r.at, 160)) * -30}px)`, opacity: ease(o, r.at, 160)}}>{r.t}</div>)}
  </div>;
};
// neck-o-meter: a measuring tape with two head markers; Davis Mills' marker shoots past Glennon's
const NeckMeter = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (!on(o, a, b)) return null;
  const g = ease(o, a + 150, 450), d = ease(o, a + 650, 650);
  const H = 640, X = 700, Y0 = 200;
  const mark = (p: number, label: string, color: string, img?: string, right?: boolean) => <div style={{position: 'absolute', left: right ? X + 74 : X - 380,
    top: Y0 + H - p * H - 34, width: right ? 300 : 360, display: 'flex', flexDirection: right ? 'row-reverse' : 'row', alignItems: 'center',
    justifyContent: 'flex-end', gap: 12, fontFamily: MONT, fontWeight: 900, fontSize: 34, color}}>
    {img && <Img src={staticFile(img)} style={{width: 68, height: 68, borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 10%', background: '#ddd'}} />}
    <span style={{WebkitTextStroke: '3px #111', paintOrder: 'stroke fill'}}>{label}</span><div style={{width: 40, height: 6, background: color}} /></div>;
  return <AbsoluteFill style={{opacity: io(o, a, b)}}>
    <div style={{position: 'absolute', left: X + 35, top: Y0 + H + 14, fontFamily: MONT, fontWeight: 900, fontSize: 30, color: 'white', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
      WebkitTextStroke: '3px #111', paintOrder: 'stroke fill'}}>NECK-O-METER</div>
    <div style={{position: 'absolute', left: X, top: Y0, width: 70, height: H, background: '#F2C230', border: '4px solid #111', borderRadius: 8}}>
      {Array.from({length: 17}, (_, i) => <div key={i} style={{position: 'absolute', left: 0, top: i * (H / 16) - 2, width: i % 4 === 0 ? 40 : 22, height: 4, background: '#111'}} />)}
    </div>
    {mark(0.55 * g, 'MIKE GLENNON', '#FFFFFF', 'cutouts/glennon.png')}
    {mark(0.97 * d, 'DAVIS MILLS', '#FF4D4D', undefined, true)}
  </AbsoluteFill>;
};
const B12_DAVIS: Spec = {
  tl: d12, src: 'pod/t6_davis_mills_joke.mp4', track: dTrack, top: "His neck is longer than Mike Glennon's?", wordY: 1300, wideX: 960,
  words: segWords(t6Words, d12, {}, {Davis: '#21F5E6', Mills: '#21F5E6', Ew: '#FF4D4D', Glennon: '#F9FC35', neck: '#F9FC35'}),
  shots: [[0, 'W'], [d12.segOut[1] + STROBE_CUT, 'W'], [D.davis, 'M'], [d12.segOut[2], 'W'], [D.trevor, 'M'], [D.oh, 'W']],
  strobes: [d12.segOut[1]], tints: [[D.glennonCold, RED], [D.ew, RED], [D.trevor, RED]], swish: [D.davis],
  capsOff: [[D.neck, D.trevor]], fah: [D.trevor + 100],
  music: {file: 'Fluffing_a_Duck.mp3', from: 20000, level: 0},
  overlay: (o) => <MemePop o={o} at={D.glennonCold} to={d12.segOut[1]} src="cutouts/glennon.png" x={600} y={1000} size={400} />,
  inBox: (o) => <Layer>
    <PackList o={o} a={D.red - 300} b={D.ew + 300} rows={[{t: 'Red Wave', at: D.red}, {t: 'Nashon', at: D.nashon}, {t: 'Adam', at: D.adam}, {t: 'Davis Mills', at: D.davis, hot: true}]} />
    <TypedAction o={o} a={D.ew} b={d12.segOut[2]} text="ew" color="#FF4D4D" glow="rgba(255,77,77,0.5)" />
    <NeckMeter o={o} a={D.neck - 300} b={D.trevor + 200} />
  </Layer>,
  extraSfx: [sfx('mg-click', D.red, 0.18), sfx('mg-click', D.nashon, 0.18), sfx('mg-click', D.adam, 0.18), sfx('mg-click', D.davis, 0.22),
    sfx('ja-ding', D.ew + 200, 0.25, 1200), sfx('mg-swoosh', D.neck - 300, 0.2), sfx('jv2-pop-button', D.neck + 350, 0.2)],
};
export const B12Davis = () => <Jorho s={B12_DAVIS} />;

// ================= 2 · The wrong Josh Allen (t5), cold open on "that's not rookie Josh Allen… the real Josh Hines-Allen" =================
const j12 = timeline([[19140, 23200], [1660, 4900], [10600, 16800], [17140, 19140], [23480, 25640]]);
const jL = (i: number, src: number) => j12.segOut[i] + src - j12.segs[i][0];
const J = {not: jL(0, 19380), real: jL(0, 22040), heinz: jL(0, 22800), gold: jL(1, 2020), prism: jL(1, 4100), noWay: jL(2, 11560), josh: jL(2, 12580),
  fire: jL(2, 16400), rookie: jL(3, 18500), changed: jL(4, 24840)};
export const B12_JOSH_MS = j12.total;
const TwoJosh = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (!on(o, a, b)) return null;
  const tile = (i: number, img: string, name: string, sub: string) => {
    const p = ease(o, a + i * 150, 260);
    return <div style={{position: 'absolute', left: 70 + i * 480, top: 40 + (1 - p) * 40, width: 460, height: 380, opacity: p, borderRadius: 20, overflow: 'hidden',
      background: i ? 'linear-gradient(#0f6e7c, #063a44)' : 'linear-gradient(#1a4fa0, #0b2350)', boxShadow: '0 12px 26px rgba(0,0,0,0.4)'}}>
      <Img src={staticFile(`img/jorho/${img}`)} style={{position: 'absolute', left: 0, right: 0, margin: '0 auto', bottom: 70, height: 300}} />
      <div style={{position: 'absolute', bottom: 0, width: '100%', height: 84, background: 'rgba(0,0,0,0.75)', textAlign: 'center', fontFamily: MONT}}>
        <div style={{fontWeight: 900, fontSize: 32, color: 'white', marginTop: 8}}>{name}</div>
        <div style={{fontWeight: 700, fontSize: 22, color: 'rgba(255,255,255,0.7)'}}>{sub}</div></div>
    </div>;
  };
  return <AbsoluteFill style={{opacity: 1 - ease(o, b - 180, 180)}}>
    {tile(0, 'josh_allen.png', 'JOSH ALLEN', 'Bills QB')}
    {tile(1, 'hines_allen.png', 'JOSH HINES-ALLEN', 'Jaguars edge rusher')}
    <Stamp o={o} at={J.not} text="NOT HIM" color="#E8132B" x={300} y={200} />
    <Stamp o={o} at={J.heinz} text="THE REAL ONE" color="#1E9E3A" x={780} y={200} rot={-8} />
  </AbsoluteFill>;
};
const NameChange = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (!on(o, a, b)) return null;
  const p = ease(o, a + 250, 500);
  return <div style={{position: 'absolute', left: 60, top: 50, width: 960, opacity: io(o, a, b), background: 'rgba(14,14,16,0.88)', borderRadius: 20, padding: '22px 30px',
    fontFamily: MONT, color: 'white', boxShadow: '0 10px 24px rgba(0,0,0,0.4)'}}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div><div style={{fontSize: 24, fontWeight: 700, opacity: 0.6}}>2019 ROOKIE CARD</div><div style={{fontSize: 40, fontWeight: 900}}>JOSH ALLEN</div></div>
      <div style={{flex: 1, height: 6, margin: '0 26px', background: 'rgba(255,255,255,0.2)', position: 'relative'}}>
        <div style={{width: `${p * 100}%`, height: '100%', background: '#9BE600'}} /></div>
      <div style={{opacity: ease(o, a + 650, 250)}}><div style={{fontSize: 24, fontWeight: 700, opacity: 0.6}}>2021</div><div style={{fontSize: 40, fontWeight: 900, color: '#9BE600'}}>JOSH HINES-ALLEN</div></div>
    </div>
  </div>;
};
const B12_JOSH: Spec = {
  tl: j12, src: 'pod/t5_ex_teammate.mp4', track: joshTrack as unknown as Track, top: 'They pulled Josh Allen… the WRONG Josh Allen', wordY: 1170, wideX: 820,
  words: segWords(joshWords, j12, {Heinz: 'Hines', prism: 'Prizm'}, {Josh: '#21F5E6', Allen: '#21F5E6', Hines: '#58EE28', gold: '#F9FC35'}),
  shots: [[0, 'W'], [j12.segOut[1] + STROBE_CUT, 'M'], [J.noWay + STROBE_CUT, 'W'], [j12.segOut[3], 'M'], [j12.segOut[4], 'W']],
  strobes: [j12.segOut[1], J.noWay], tints: [[J.gold, GREEN], [J.fire, GREEN], [J.changed, GREEN]], swish: [J.gold, J.fire],
  music: {file: 'funk-sigilo.mp3', from: 10000, level: 0},
  inBox: (o) => <Layer>
    <TwoJosh o={o} a={0} b={j12.segOut[1]} />
    <StatBadge o={o} a={J.prism - 400} b={j12.segOut[2]} big="GOLD" label="TRUE GOLD PRIZM" emoji="2728" x={640} y={40} />
    <TypedAction o={o} a={J.josh + 200} b={J.josh + 2000} text="wait… which Josh Allen?" />
    <NameChange o={o} a={j12.segOut[4] - 100} b={j12.total} />
  </Layer>,
  extraSfx: [sfx('mg-swoosh', 0, 0.18), sfx('jv2-smash-bros-hit', J.not, 0.2), sfx('ding-2', J.heinz, 0.2), sfx('jv2-pop-button', J.prism - 400, 0.2),
    sfx('keyboard-typing', J.josh + 200, 0.15, 1000), sfx('mg-swoosh', j12.segOut[4] - 100, 0.18)],
};
export const B12Josh = () => <Jorho s={B12_JOSH} />;

// ================= 3 · Natty ticket gift (t4), cold open on "a signed ticket from your national championship game" =================
const k12 = timeline([[21540, 25460], [9800, 11900], [12300, 17240], [18220, 20420], [25460, 30300], [32760, 36250]]);
const kL = (i: number, src: number) => k12.segOut[i] + src - k12.segs[i][0];
const K = {signed: kL(0, 22140), national: kL(0, 24120), gift: kL(1, 11460), weird: kL(2, 14680), gifting: kL(2, 15740), cool: kL(3, 18680),
  mvp: kL(4, 25680), signature: kL(4, 27360), sweet: kL(4, 29760), thank: kL(5, 33120), awesome: kL(5, 35740)};
export const B12_TICKET_MS = k12.total;
const SIG = 'M10 60 C30 20 40 70 55 40 C62 26 70 30 66 48 C64 60 80 34 92 42 C100 48 104 30 118 38 C130 46 140 26 160 34 L190 30';
const Ticket = ({o, a, b, drawAt}: {o: number; a: number; b: number; drawAt: number}) => {
  if (!on(o, a, b)) return null;
  const p = ease(o, a, 300), d = ease(o, drawAt, 700);
  return <div style={{position: 'absolute', left: 90, top: 70 + (1 - p) * 60, width: 900, height: 330, opacity: io(o, a, b), transform: `rotate(-3deg)`,
    background: 'linear-gradient(90deg, #F6EEDC 0 72%, #EADFC4 72% 100%)', borderRadius: 16, boxShadow: '0 16px 34px rgba(0,0,0,0.45)', fontFamily: MONT, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 650, height: 70, background: '#F56600'}} />
    <div style={{position: 'absolute', left: 30, top: 14, fontWeight: 900, fontSize: 34, color: 'white', letterSpacing: 1}}>CFP NATIONAL CHAMPIONSHIP</div>
    <div style={{position: 'absolute', left: 30, top: 92, fontWeight: 900, fontSize: 46, color: '#522D80'}}>CLEMSON vs ALABAMA</div>
    <div style={{position: 'absolute', left: 30, top: 154, fontWeight: 700, fontSize: 28, color: '#555'}}>LEVI'S STADIUM · JAN 7, 2019</div>
    <div style={{position: 'absolute', left: 30, top: 200, fontWeight: 700, fontSize: 22, color: '#888', letterSpacing: 2}}>SEC 118 · ROW 22 · SEAT 7</div>
    <div style={{position: 'absolute', left: 648, top: 0, bottom: 0, borderLeft: '4px dashed #b8a98a'}} />
    <div style={{position: 'absolute', left: 680, top: 40, fontWeight: 900, fontSize: 30, color: '#522D80', lineHeight: '34px'}}>ADMIT<br />ONE</div>
    <svg width={400} height={140} viewBox="0 0 200 70" style={{position: 'absolute', left: 250, top: 190}}>
      <path d={SIG} fill="none" stroke="#1a2b8c" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} /></svg>
  </div>;
};
const B12_TICKET: Spec = {
  tl: k12, src: 'pod/t4_natty_ticket.mp4', track: ticketTrack as unknown as Track, top: 'Grant gifted Trevor a ticket to his OWN natty', wordY: 1170, wideX: 760,
  words: segWords(ticketWords, k12, {}, {national: '#F9FC35', championship: '#F9FC35', MVP: '#58EE28', Clemson: '#F56600', gift: '#21F5E6'}),
  shots: [[0, 'W'], [k12.segOut[1] + STROBE_CUT, 'W'], [K.weird, 'M'], [k12.segOut[3], 'W'], [K.mvp, 'M'], [k12.segOut[5], 'M'], [K.awesome - 300, 'W']],
  strobes: [k12.segOut[1]], tints: [[K.national, GREEN], [K.gift, GREEN], [K.mvp, GREEN], [K.awesome, GREEN]], swish: [K.gift, K.awesome],
  music: {file: 'jorho-lullaby.mp3', from: 150000, level: 0},
  inBox: (o) => <Layer>
    <Ticket o={o} a={K.signed - 150} b={k12.segOut[1]} drawAt={K.signed + 300} />
    <TypedAction o={o} a={K.gifting} b={K.gifting + 1700} text="gifting Trevor… Trevor" />
    <StatBadge o={o} a={K.mvp - 100} b={K.signature} big="44–16" label="CLEMSON OVER ALABAMA · TREVOR = OFFENSIVE MVP" x={250} y={40} />
    <Ticket o={o} a={K.signature - 150} b={k12.segOut[5]} drawAt={K.signature + 100} />
  </Layer>,
  overlay: (o, face) => { const f = face('M'); return <HeadRing o={o} a={K.thank} b={K.thank + 1800} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; },
  extraSfx: [sfx('mg-swoosh', K.signed - 150, 0.2), sfx('pen-scribble', K.signed + 300, 0.3, 700), sfx('keyboard-typing', K.gifting, 0.15, 1000),
    sfx('jv2-pop-button', K.mvp - 100, 0.2), sfx('pen-scribble', K.signature + 100, 0.3, 700), sfx('ding-2', K.thank, 0.18)],
};
export const B12Ticket = () => <Jorho s={B12_TICKET} />;

// ================= 4 · Throws better going left (t3), cold open on "I throw it a little better moving left" =================
const l12 = timeline([[47900, 50550], [25720, 29000], [29140, 31250], [32100, 33250], [33860, 36200], [36500, 39600], [44820, 46300], [50840, 52700]]);
const L = {better: l12.out(48840), left: l12.out(49440), coaches: l12.out(26820), rollouts: l12.out(28220), right: l12.out(28900), most: l12.out(29560),
  hated: l12.out(32800), threw: l12.out(34440), left2: l12.out(36060), only: l12.out(38940), worked: l12.out(45000), best: l12.out(51080)};
export const B12_LEFTY_MS = l12.total;
const arrowPath = (dir: 1 | -1) => `M540 560 C ${540 + dir * 60} 520, ${540 + dir * 230} 470, ${540 + dir * 300} 360`;
const FieldBoard = ({o, a, b, rightAt, xAt, leftAt, rightLabel, leftLabel}: {o: number; a: number; b: number; rightAt?: number; xAt?: number; leftAt?: number;
  rightLabel?: string; leftLabel?: string}) => {
  if (!on(o, a, b)) return null;
  const rp = rightAt !== undefined ? ease(o, rightAt, 450) : 0, lp = leftAt !== undefined ? ease(o, leftAt, 450) : 0;
  const xp = xAt !== undefined ? ease(o, xAt, 220) : 0;
  const chalk = {fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return <AbsoluteFill style={{opacity: io(o, a, b), background: 'radial-gradient(ellipse at 50% 40%, #2f5d3a, #1c3a24)'}}>
    <svg width={BW} height={BOX_H} style={{position: 'absolute', inset: 0}}>
      {[160, 300, 440, 580, 720].map((y) => <line key={y} x1={60} x2={1020} y1={y} y2={y} stroke="rgba(255,255,255,0.22)" strokeWidth={4} />)}
      <circle cx={540} cy={600} r={38} stroke="white" strokeWidth={7} {...chalk} />
      <text x={540} y={612} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={30} fill="white">QB</text>
      {rp > 0 && <path d={arrowPath(1)} stroke="rgba(255,255,255,0.85)" strokeWidth={12} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - rp} {...chalk} />}
      {rp > 0.95 && <path d="M840 360 l-48 10 m48 -10 l-6 48" stroke="rgba(255,255,255,0.85)" strokeWidth={12} {...chalk} />}
      {lp > 0 && <path d={arrowPath(-1)} stroke="#9BE600" strokeWidth={14} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lp} {...chalk} />}
      {lp > 0.95 && <path d="M240 360 l48 10 m-48 -10 l6 48" stroke="#9BE600" strokeWidth={14} {...chalk} />}
      {xp > 0 && <g stroke="#FF3B30" strokeWidth={16} {...chalk}><path d="M760 330 L920 470" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.min(1, xp * 2)} />
        <path d="M920 330 L760 470" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, xp * 2 - 1)} /></g>}
    </svg>
    {rightLabel && rp > 0.6 && <div style={{position: 'absolute', right: 70, top: 250, fontFamily: MONT, fontWeight: 900, fontSize: 38, color: 'white', textAlign: 'right'}}>{rightLabel}</div>}
    {leftLabel && lp > 0.6 && <div style={{position: 'absolute', left: 70, top: 250, fontFamily: MONT, fontWeight: 900, fontSize: 38, color: '#9BE600'}}>{leftLabel}</div>}
  </AbsoluteFill>;
};
const LTCAM_TRACK = travTrack as unknown as Track;
const B12_LEFTY: Spec = {
  tl: l12, src: 'pod/t3_traveling_trevors.mp4', track: LTCAM_TRACK, top: 'Why Trevor throws BETTER going left', wordY: 1170, wideX: 715,
  words: segWords(travWords, l12, {uh: '', i: 'I'}, {left: '#58EE28', right: '#F9FC35', hated: '#FF4D4D', best: '#58EE28'}),
  shots: [[0, 'M'], [l12.segOut[1] + STROBE_CUT, 'W'], [L.hated - 300, 'M'], [L.only, 'M'], [l12.segOut[7], 'M']],
  strobes: [l12.segOut[1]], tints: [[L.left, GREEN], [L.hated, RED], [L.worked, GREEN], [L.best, GREEN]], swish: [L.worked],
  capsOff: [[L.rollouts - 300, L.right + 700], [L.hated - 100, L.left2 + 200]],
  music: {file: 'tak-tak.mp3', from: 30000, level: 0},
  inBox: (o) => <Layer>
    <FieldBoard o={o} a={250} b={l12.segOut[1]} leftAt={L.better} rightAt={300} leftLabel="BETTER" />
    <FieldBoard o={o} a={L.rollouts - 300} b={L.right + 700} rightAt={L.rollouts} rightLabel="COACHES: ROLL RIGHT" />
    <FieldBoard o={o} a={L.hated - 100} b={L.left2 + 200} rightAt={L.hated - 100} xAt={L.hated} leftAt={L.threw} leftLabel="WAY MORE" />
  </Layer>,
  overlay: (o, face) => { const f = face('M'); return <HeadRing o={o} a={L.best} b={l12.total} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; },
  extraSfx: [sfx('chalk-scratch', L.better, 0.25, 600), sfx('chalk-scratch', L.rollouts, 0.25, 600), sfx('jv2-smash-bros-hit', L.hated, 0.2),
    sfx('chalk-scratch', L.threw, 0.25, 700), sfx('ding-2', L.best, 0.18)],
};
export const B12Lefty = () => <Jorho s={B12_LEFTY} />;
