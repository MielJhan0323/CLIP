// BATCH 22 (2026-11-16): 5 new BYB clips. User: "give me 5 new neon and byb clips" + "on the caption at the top add some diff color words
// to highlight the important words" → [bracketed] title words are coloured (jorho/kit.tsx TopText). Full current recipe: hook graphic on
// frame 0, diagram in 4 of 5, key-word colours + steady emoji pops, arrow/circle once, ≥ 15 s, no piece < 1.3 s, tight loop ending.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {ease, pop, sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import tkWords from '../plans/data/t4_natty_ticket.words.json';
import tkTrack from '../plans/data/t4_natty_ticket.seats.json';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip_wig.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const {green: G, yellow: Y, cyan: C, red: R, orange: O} = HC;
const Over = ({o, a, b, children}: {o: number; a: number; b: number; children: ReactNode}) => (o < a || o >= b ? null :
  <AbsoluteFill style={{opacity: Math.min(a <= 0 ? 1 : ease(o, a, 200), 1 - ease(o, b - 200, 200)), background: 'rgba(8,10,14,0.66)'}}>{children}</AbsoluteFill>);
const Head = ({text}: {text: string}) => <div style={{position: 'absolute', left: 60, right: 60, top: 100, fontFamily: MONT, fontWeight: 900, fontSize: 52, color: 'white', lineHeight: '60px'}}>{text}</div>;
const Emo = ({code, size = 64}: {code: string; size?: number}) => <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size, verticalAlign: '-10px'}} />;
const Row = ({o, at, y, label, done, col = G}: {o: number; at: number; y: number; label: string; done: boolean; col?: string}) => (o < at ? null :
  <div style={{position: 'absolute', left: 80, right: 80, top: y, height: 110, borderRadius: 24, background: 'rgba(255,255,255,0.1)', border: `5px solid ${done ? col : R}`, display: 'flex',
    alignItems: 'center', gap: 26, padding: '0 30px', transform: `scale(${Math.min(1, pop(o, at, 12, 240))})`}}>
    <Emo code={done ? '2705' : '274c'} size={64} /><span style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: 'white'}}>{label}</span></div>);

// 1 · the Tiger gift card + everything in the patch
const TigerCard = ({o, a, itemsAt}: {o: number; a: number; itemsAt: number[]}) => {
  const p = ease(o, a, 450);
  const items = ['SHIRT', 'LAUNDRY TAG', 'GLOVE', 'CAP'];
  return <><Head text="THE GIFT" />
    <div style={{position: 'absolute', left: 300, top: 200, width: 480, height: 640, borderRadius: 22, background: 'linear-gradient(150deg, #1c1c1c, #3a2a10)', border: '8px solid #d4a017',
      transform: `scale(${0.85 + 0.15 * p}) rotate(${-3 * (1 - p)}deg)`, opacity: p, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', color: 'white', fontFamily: MONT, gap: 14}}>
      <Emo code="26f3" size={120} />
      <div style={{fontWeight: 900, fontSize: 56, color: '#d4a017'}}>TIGER WOODS</div>
      <div style={{fontWeight: 800, fontSize: 30, letterSpacing: 2}}>GAME-WORN PATCH AUTO</div>
      <div style={{fontWeight: 900, fontSize: 40, padding: '8px 22px', borderRadius: 12, background: '#c8102e'}}>9.5 · BOOKLET</div>
    </div>
    {items.map((t, i) => (o >= itemsAt[i] ? <div key={t} style={{position: 'absolute', left: i % 2 ? 640 : 60, top: 880 + Math.floor(i / 2) * 0, fontFamily: MONT, fontWeight: 900, fontSize: 40,
      color: Y, transform: `translateY(${i >= 2 ? 70 : 0}px) scale(${Math.min(1, pop(o, itemsAt[i], 11, 260))})`}}>+ {t}</div> : null))}
  </>;
};
// 2 · Trevor's keepsakes: college jersey ✅ · NFL game-worn ✅ (a couple) · natty ticket ❌ → ✅ (now)
const Closet = ({o, a, ticketAt}: {o: number; a: number; ticketAt: number}) => <><Head text="TREVOR'S KEEPSAKES" />
  <Row o={o} at={a} y={260} label="COLLEGE JERSEY" done />
  <Row o={o} at={a + 350} y={410} label="NFL GAME-WORN (A COUPLE)" done />
  <Row o={o} at={a + 700} y={560} label="NATTY TICKET" done={o >= ticketAt} />
  {o >= ticketAt && <div style={{position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 56, color: G,
    transform: `scale(${Math.min(1, pop(o, ticketAt, 10, 260))})`}}>UNTIL NOW <Emo code="1f39f" /></div>}</>;
// 4 · signature consistency: the same auto three times, all ✅
const SigStack = ({o, a}: {o: number; a: number}) => <><Head text="SAME SIGNATURE. EVERY TIME." />
  {[0, 1, 2].map((i) => (o >= a + i * 250 ? <div key={i} style={{position: 'absolute', left: 120, right: 120, top: 250 + i * 190, height: 150, borderRadius: 20, background: '#fbf8f1',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', transform: `scale(${Math.min(1, pop(o, a + i * 250, 12, 240))})`}}>
    <span style={{fontFamily: '"Brush Script MT", cursive', fontSize: 90, color: '#1a3d8f'}}>Trevor Lawrence</span><Emo code="2705" size={70} /></div> : null))}
  {o >= a + 900 && <div style={{position: 'absolute', left: 0, right: 0, top: 850, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 60, color: G,
    transform: `scale(${Math.min(1, pop(o, a + 900, 10, 260))})`}}>= GOATED PEN <Emo code="270d" /></div>}</>;
// 5 · the weekly cycle
const WeekCycle = ({o, at}: {o: number; at: number[]}) => {
  const steps = [['WATCH THE DEFENSE', '1f440'], ['COACHES GAME-PLAN', '1f4da'], ['PICK WHAT TO ATTACK', '1f3af'], ['THIS WEEK\'S PLAYS', '1f3c8']];
  return <><Head text="HOW A GAME WEEK WORKS" />
    {steps.map(([t, e], i) => (o >= at[i] ? <div key={t} style={{position: 'absolute', left: 90, right: 90, top: 230 + i * 175, height: 140, borderRadius: 26,
      background: i === 3 ? 'rgba(88,238,40,0.18)' : 'rgba(255,255,255,0.1)', border: `5px solid ${[C, Y, R, G][i]}`, display: 'flex', alignItems: 'center', gap: 26, padding: '0 30px',
      transform: `scale(${Math.min(1, pop(o, at[i], 12, 240))})`}}>
      <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 54, color: [C, Y, R, G][i]}}>{i + 1}</span><Emo code={e} size={70} />
      <span style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, color: 'white'}}>{t}</span></div> : null))}</>;
};

const TIGER = make({mark: 'circle', src: 'pod/t2_dream_golf_four.mp4', track: T(golfTrack), raw: golfWords as Raw, wideX: 720, top: 'Grant gifted Trevor a [Tiger Woods] game-worn [patch auto]',
  segs: [[86100, 90000], [76800, 79400], [82000, 90600], [97600, 102600]], hookSeat: 'M', music: 'midnight-club.mp3', from: 30000, arrowAt: 88700,
  shots: [[76800, 'L'], [86100, 'W'], [88600, 'M'], [97600, 'L'], [100500, 'M', 1.06]], flash: [88800, 'green'],
  hi: {tiger: [O, '26f3'], exquisite: [G, '1f48e'], game: Y, worn: Y, patch: Y, auto: C, booklet: C, gifts: [G, '1f381'], shirt: Y, glove: Y, cap: Y, years: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><TigerCard o={o} a={-500} itemsAt={[1e9, 1e9, 1e9, 1e9]} /></Over>, capsOff: [[97600, 102600]],
  inBox: (o, at) => <Over o={o} a={at(97600)} b={at(102600)}><TigerCard o={o} a={at(97600) - 600} itemsAt={[at(100500), at(100900), at(101700), at(102100)]} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(97600), 0.14, 500), sfx('ding-2', at(100500), 0.1), sfx('ding-2', at(102100), 0.1)]});

const CLOSET = make({src: 'pod/t4_natty_ticket.mp4', track: T(tkTrack), raw: tkWords as Raw, wideX: 960, top: "Trevor never kept his [national championship] ticket… until [now]",
  segs: [[66400, 68800], [37700, 42100], [50800, 61700], [66400, 69700]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 150000, arrowAt: 53900,
  shots: [[37700, 'L'], [42300, 'M'], [50800, 'L'], [53800, 'M'], [66400, 'M', 1.06]],
  hi: {gifting: [G, '1f381'], weird: [R, '1f62c'], jerseys: Y, jersey: Y, college: C, nfl: C, closet: [Y, '1f3c8'], ticket: [Y, '1f39f'], championship: Y, sweet: [G, '1f525'], games: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><Closet o={o} a={-1000} ticketAt={300} /></Over>, capsOff: [[53800, 61700]],
  inBox: (o, at) => <Over o={o} a={at(53800)} b={at(61700)}><Closet o={o} a={at(55000)} ticketAt={1e9} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(53800), 0.14, 500), sfx('ding-2', at(55100), 0.1), sfx('ding-2', at(57200), 0.1)]});

const DONTSHOW = make({mark: 'circle', src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: "'[Ew]… don't show that, man' – the worst pull",
  segs: [[79100, 82400], [73800, 90400]], hookSeat: 'W', music: 'Curb_Credits.mp3', from: 0, arrowAt: 83600,
  shots: [[73800, 'W'], [77100, 'M'], [79100, 'W'], [83500, 'M', 1.06], [86400, 'W'], [89800, 'M']], flash: [78100, 'red'],
  hi: {ew: [R, '1f922'], show: R, away: [R, '1f648'], redemption: [C, '1f914'], cool: [G, '1f60e'], rod: Y, woodson: Y, okay: Y, no: R}});

const PEN = make({src: 'pod/t1_tiger_auto_pen.mp4', track: T(antTrack), raw: antWords as Raw, wideX: 760, top: "Why Trevor Lawrence has a [goated pen]",
  segs: [[25500, 27400], [1100, 8600], [20500, 27400], [27900, 32300]], hookSeat: 'L', music: 'blue-yung-kai.mp3', from: 30000, arrowAt: 6300,
  shots: [[1100, 'L'], [6200, 'M'], [8200, 'L'], [20500, 'L'], [23500, 'M', 1.06], [27900, 'L']],
  hi: {goated: [G, '1f525'], pen: G, signature: [Y, '270d'], signatures: Y, sick: G, consistent: [C, '2705'], beautiful: [G, '2728'], peyton: [C, '1f410'], manning: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><SigStack o={o} a={-900} /></Over>, capsOff: [[20500, 24900]],
  inBox: (o, at) => <Over o={o} a={at(20500)} b={at(24900)}><SigStack o={o} a={at(20700)} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(20500), 0.14, 500)]});

const PLAN = make({mark: 'circle', src: 'pod2/u1_playbook.mp4', track: T(pbTrack), raw: pbWords as Raw, wideX: 960, top: 'How an NFL [game plan] actually gets made',
  segs: [[41700, 43000], [24400, 36000], [36800, 43000]], hookSeat: 'M', music: 'Investigations.mp3', from: 0, arrowAt: 24500,
  shots: [[24400, 'M'], [29300, 'M', 1.06], [36800, 'W'], [39500, 'M']],
  hi: {training: Y, camp: Y, defense: [R, '1f6e1'], coaches: C, game: C, plan: [C, '1f4da'], attack: [R, '1f3af'], inventory: Y, plays: C, week: G, watching: [Y, '1f440']},
  hook: (o) => <Over o={o} a={0} b={1e9}><WeekCycle o={o} at={[-900, -700, -500, -300]} /></Over>, capsOff: [[29300, 43000]],
  inBox: (o, at) => <Over o={o} a={at(29300)} b={at(43000) + 300}><WeekCycle o={o} at={[at(29300), at(30600), at(34000), at(41700)]} /></Over>,
  sfx: (at) => [sfx('ding-2', at(30600), 0.1), sfx('ding-2', at(34000), 0.1), sfx('ding-2', at(41700), 0.12)]});

export const B22Tiger = () => <Jorho s={TIGER.spec} />, B22Closet = () => <Jorho s={CLOSET.spec} />, B22Dontshow = () => <Jorho s={DONTSHOW.spec} />,
  B22Pen = () => <Jorho s={PEN.spec} />, B22Plan = () => <Jorho s={PLAN.spec} />;
export const B22_MS = {Tiger: TIGER.total, Closet: CLOSET.total, Dontshow: DONTSHOW.total, Pen: PEN.total, Plan: PLAN.total};
void O;
