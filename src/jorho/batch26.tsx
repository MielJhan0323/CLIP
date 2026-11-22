// BATCH 26 (2026-11-22): back to the batch 19–22 recipe (user: "everything was good why are we suddenly devolving"): no BYB scream
// cutaways, no stickers, no lime flash; + speaker close-ups with a gentle push-in, audible music, real background-removed cut-outs,
// 15–20 s, a different song per clip.
// Moments not used in batches 17–22 (2 from new sheet downloads), recut with the newest rules: the hook line lands in the first 1–3 s
// (cold open), one topic, calm (one flash max, steady emoji pops), Trevor marked once, ≥ 15 s, no piece < 1.3 s, tight loop end.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {ease, pop, sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import packsW from '../plans/data/w2_backyard_packs.words.json';
import packsT from '../plans/data/w2_backyard_packs.seats.json';
import redW from '../plans/data/u3_redemptions.words.json';
import redT from '../plans/data/u3_redemptions.seats.json';
import goatW from '../plans/data/nba_goat.words.json';
import goatT from '../plans/data/nba_goat.seats.json';
import antW from '../plans/data/t1_tiger_auto_pen.words.json';
import antT from '../plans/data/t1_tiger_auto_pen.seats.json';
import millsW from '../plans/data/t6_davis_mills_joke.words.json';
import millsT from '../plans/data/t6_davis_mills_joke.seats.json';
import exW from '../plans/data/t5_ex_teammate.words.json';
import exT from '../plans/data/t5_ex_teammate.seats.json';
import lairW from '../plans/data/v_lair.words.json';
import lairT from '../plans/data/v_lair.seats.json';
import rogW from '../plans/data/v_rogers_realm.words.json';
import rogT from '../plans/data/v_rogers_realm.seats.json';
import coenW from '../plans/data/u6_coen_duo.words.json';
import coenT from '../plans/data/u6_coen_duo.seats.json';
import cellyW from '../plans/data/u2_psa10_celly.words.json';
import cellyT from '../plans/data/u2_psa10_celly.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const R = (x: unknown) => x as Raw;
// keep reaction pauses (laughs, suspense) that the dead-air trimmer would cut: silent filler "words" every 300 ms (no caption text)
export const keep = (x: unknown, spans: [number, number][]): Raw => [...(x as Raw), ...spans.flatMap(([a, b]) => Array.from({length: Math.ceil((b - a) / 300)}, (_, i) => ({text: '', startMs: a + i * 300, endMs: a + i * 300 + 280})))];
const {green: G, yellow: Y, cyan: C, red: RD} = HC;

// one diagram (≤ 3.5 s): the redemption price drop
const Drop = ({o, a}: {o: number; a: number}) => {
  const p = ease(o, a, 400);
  return <AbsoluteFill style={{background: 'rgba(8,10,14,0.66)', opacity: Math.min(p, 1 - ease(o, a + 3300, 200))}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 130, color: G}}>$20,000</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 90, color: 'white', opacity: ease(o, a + 600, 300)}}>↓</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 130, color: RD,
      transform: `scale(${Math.min(1, pop(o, a + 1100, 11, 240))})`, opacity: o >= a + 1100 ? 1 : 0}}>~$500</div>
  </AbsoluteFill>;
};
const inDrop = (o: number, at: (s: number) => number): ReactNode => <Drop o={o} a={at(1100)} />;


// ---- one Jorho v2 diagram per clip (user 2026-11-22: "they need the diagrams that make jorho v2 shine, not too much"): ≤ 3.5 s, body only
export const DT = ({t}: {t: string}) => <div style={{position: 'absolute', left: 50, top: 70, fontFamily: MONT, fontWeight: 900, fontSize: 60, color: '#111'}}>{t}</div>;
export const Rw = ({o, at, i, label, ok, hl, img}: {o: number; at: number; i: number; label: string; ok?: boolean; hl?: boolean; img?: string}) => (o < at ? null :
  <div style={{position: 'absolute', left: 70, right: 70, top: 385 + i * 165, height: 135, borderRadius: 24, background: hl ? '#dff7c8' : 'white', border: `5px solid ${hl ? '#3aa30f' : '#222'}`,
    display: 'flex', alignItems: 'center', gap: 24, padding: '0 30px', fontFamily: MONT, fontWeight: 900, fontSize: 46, color: '#111', transform: `scale(${Math.min(1, pop(o, at, 12, 240))})`}}>
    <span style={{color: '#888'}}>{i + 1}</span>{img && <Img src={staticFile(img)} style={{height: 158, width: 170, objectFit: 'contain', objectPosition: '50% 100%', alignSelf: 'flex-end', marginTop: -28, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'}} />}<span style={{flex: 1}}>{label}</span>{ok !== undefined && <Img src={staticFile(`emoji-ios/${ok ? '2705' : '274c'}.png`)} style={{width: 66, height: 66}} />}</div>);
const Bar = ({o, at, i, label, w, emoji}: {o: number; at: number; i: number; label: string; w: number; emoji: string}) => { const p = Math.min(1, Math.max(0, (o - at) / 700));
  return o < at ? null : <div style={{position: 'absolute', left: 70, top: 260 + i * 260}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#111'}}>{label}</div>
    <div style={{marginTop: 14, height: 90, width: 120 + (w - 120) * (1 - (1 - p) ** 3), borderRadius: 18, background: i ? '#E8261F' : '#2b6fe0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14}}>
      <Img src={staticFile(`emoji-ios/${emoji}.png`)} style={{width: 70, height: 70}} /></div></div>; };
const B_GOAT = (o: number, at: (s: number) => number) => <><DT t="THE NBA GOAT LIST" />
  <Rw o={o} at={at(5700)} i={0} label="MICHAEL JORDAN" img="img/jorho/jordan.png" /><Rw o={o} at={at(6300)} i={1} label="LEBRON JAMES" img="img/jorho/lebron.png" /><Rw o={o} at={at(6900)} i={2} label="KOBE BRYANT" img="img/jorho/kobe.png" />
  <Rw o={o} at={at(7600)} i={3} label="??? (TREVOR'S PICK)" hl /></>;
const B_PACK = (o: number, at: (s: number) => number) => <><DT t="A T-LAW PACK" />
  <Rw o={o} at={at(3600)} i={0} label="RIP IT ONLINE" ok /><Rw o={o} at={at(5600)} i={1} label="SHIPPED TO YOUR HOUSE" ok /><Rw o={o} at={at(6600)} i={2} label="EVERY CARD = TREVOR" hl /></>;
const B_ANT = (o: number, at: (s: number) => number) => <><DT t="AUTOGRAPH CHECK" />
  <Rw o={o} at={at(17300)} i={0} label="TREVOR: FULL SIGNATURE" ok /><Rw o={o} at={at(17900)} i={1} label={"RICHARDSON: \"A\" + \"R\""} ok={false} hl /></>;
// neck chart v2 (user 2026-11-22: "a graph with x y regular graph and the indicator is their heads and a stretched out neck")
const NeckCol = ({o, at, x, h, head, name, cx = 0.5}: {o: number; at: number; x: number; h: number; head: string; name: string; cx?: number}) => {
  const p = Math.min(1, Math.max(0, (o - at) / 900)), e = 1 - (1 - p) ** 3, nh = 40 + (h - 40) * e, base = 930;
  return o < at ? null : <>
    <div style={{position: 'absolute', left: x - 34, top: base - nh, width: 68, height: nh, borderRadius: 34,
      background: 'linear-gradient(90deg, #c98d64, #f0c19a 45%, #c98d64)', boxShadow: 'inset 0 0 0 3px rgba(0,0,0,0.12)'}} />
    <Img src={staticFile(head)} style={{position: 'absolute', left: x - cx * 260, top: base - nh - 215, width: 260, height: 260, objectFit: 'contain',
      filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))'}} />
    <div style={{position: 'absolute', left: x - 180, width: 360, top: base + 20, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 36, color: '#111'}}>{name}</div></>;
};
const B_NECK = (o: number, at: (s: number) => number) => <><DT t="NECK LENGTH" />
  <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}}>
    <line x1={130} y1={930} x2={1000} y2={930} stroke="#111" strokeWidth={8} strokeLinecap="round" />
    <line x1={130} y1={930} x2={130} y2={170} stroke="#111" strokeWidth={8} strokeLinecap="round" />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={120} y1={930 - (i + 1) * 180} x2={1000} y2={930 - (i + 1) * 180} stroke="#bbb" strokeWidth={3} strokeDasharray="12 12" />)}
    <polygon points="130,150 112,185 148,185" fill="#111" /><polygon points="1020,930 985,912 985,948" fill="#111" />
  </svg>
  <div style={{position: 'absolute', left: 40, top: 560, transform: 'rotate(-90deg)', transformOrigin: 'left top', fontFamily: MONT, fontWeight: 900, fontSize: 30, color: '#555'}}>NECK LENGTH →</div>
  <NeckCol o={o} at={at(10300)} x={300} h={230} cx={0.48} head="img/jorho/glennon_head.png" name="MIKE GLENNON" />
  <NeckCol o={o} at={at(10700)} x={640} h={540} cx={0.72} head="img/jorho/mills_head.png" name="DAVIS MILLS" /></>;
const B_NAME = (o: number, at: (s: number) => number) => <><DT t="SAME GUY?" />
  <Rw o={o} at={at(19300)} i={0} label="JOSH ALLEN (BILLS QB)" ok={false} /><Rw o={o} at={at(20800)} i={1} label="JOSH HINES-ALLEN (JAGS)" ok hl /></>;

const PACKS = make({hookText: 'A [T-LAW] PACK?!', src: 'pod3/w2_backyard_packs.mp4', track: T(packsT), raw: R(packsW), wideX: 960, top: "Imagine pulling [YOURSELF] in every pack",
  segs: [[19200, 22100], [2600, 9400], [15700, 23100], [22700, 25800]], hookSeat: 'M', music: 'blue-yung-kai.mp3', from: 20000, arrowAt: 22800, 
  shots: [[0, 'L'], [19200, 'L', 1.05], [22700, 'M', 1.1], [25000, 'L']], fix: {backyardpacks: 'BackyardPacks'},
  hi: {pack: [Y, '1f4e6'], trevor: C, lawrence: C, weird: [RD, '1f62c'], card: Y, shipped: G, house: G},
  sfx: (at) => [sfx('g-riser-sfx', at(20800) - 2000, 0.32, 2100), sfx('g-anime-wow-sound-effect', at(20800), 0.4, 1800), sfx('g-akward-sfx', at(23000), 0.4, 1500), sfx('cha-ching', at(5300), 0.3, 900)],
  boards: [{a: 3400, b: 6900, render: B_PACK}],
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const GOAT = make({hookText: 'HIS NBA [GOAT] IS…', src: 'pod/nba_goat.mp4', track: T(goatT), raw: keep(goatW, [[7100, 13200]]), wideX: 960, top: "Bro is the first person to have a [Dellavedova] goat",
  segs: [[13200, 15100], [2200, 13200], [13200, 18300]], hookSeat: 'M', music: 'jorho-qkthr.mp3', from: 40000, arrowAt: 4500, flash: [15600, 'yellow'],
  shots: [[2200, 'L'], [4400, 'M'], [5700, 'L'], [7300, 'M', 1.04], [13200, 'M', 1.1], [15500, 'L'], [17200, 'M', 1.06]], fix: {delavedova: 'Dellavedova,'},
  hi: {goat: [Y, '1f410'], dellavedova: [G, '1f3c0'], no: RD, tension: [RD, '1f62c'], nba: C},
  cutout: {src: 13900, file: 'img/jorho/dellavedova.png', x: 640, y: 760, size: 520, dur: 1600}, sfx: (at) => [sfx('g-riser-sound-effect-free', at(13200) - 5300, 0.32, 5400), sfx('g-sudden-suspense-sound-effect', at(2400), 0.3, 1400), sfx('g-anime-wow-sound-effect', at(13850), 0.4, 1800), sfx('g-fahhh-sfx', at(15700), 0.35, 1800)],
  boards: [{a: 5600, b: 9000, render: B_GOAT}],
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const ANT = make({hookText: 'HIS AUTO LOOKS LIKE AN [ANT]', src: 'pod/t1_tiger_auto_pen.mp4', track: T(antT), raw: R(antW), wideX: 760, top: "Grant said his autograph looks like an [ANT]",
  segs: [[15000, 16500], [6200, 8600], [9300, 14800], [15000, 20100]], hookSeat: 'R', music: 'Fluffing_a_Duck.mp3', from: 60000, arrowAt: 14700,
  shots: [[1100, 'L'], [6200, 'M', 1.06], [9300, 'R'], [15000, 'R', 1.1], [16600, 'M'], [18000, 'R']],
  hi: {ant: [RD, '1f41c'], respect: Y, richardson: C, anthony: C, disrespect: RD, big: Y},
  cutout: {src: 15900, file: 'img/jorho/richardson.png', x: 660, y: 780, size: 480, dur: 1600}, sfx: (at) => [sfx('g-sudden-suspense-sound-effect', at(12800), 0.32, 1400), sfx('bass-boosted-vine-boom', at(16200), 0.35, 1200), sfx('g-fahhh-sfx', at(19900), 0.35, 1800)],
  boards: [{a: 17200, b: 20100, render: B_ANT}],
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const MILLS = make({hookText: '[EW]… DAVIS MILLS', src: 'pod/t6_davis_mills_joke.mp4', track: T(millsT), raw: keep(millsW, [[7000, 9200], [11900, 14300]]), wideX: 960, top: "The [longest neck] in the world",
  segs: [[5700, 7400], [2100, 16700]], hookSeat: 'L', music: 'Curb_Credits.mp3', from: 0, arrowAt: 11300, flash: [6900, 'red'],
  shots: [[2100, 'L'], [6900, 'L', 1.1], [9200, 'L'], [11200, 'M', 1.1], [13300, 'W']],
  hi: {ew: [RD, '1f922'], neck: [Y, '1f992'], glennon: C, mills: C, davis: C, trevor: G},
  sfx: (at) => [sfx('g-riser-sfx', at(5800) - 2000, 0.3, 2100), sfx('g-fahhh-sfx', at(10600), 0.38, 1800), sfx('bruh', at(15000), 0.3, 1200)],
  boards: [{a: 10200, b: 13300, render: B_NECK}],
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const EXMATE = make({hookText: 'THE REAL [JOSH ALLEN]', src: 'pod/t5_ex_teammate.mp4', track: T(exT), raw: R(exW), wideX: 960, top: "He pulled his old teammate in [true gold]",
  segs: [[12600, 14400], [5400, 12500], [15100, 24400]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 0, arrowAt: 12700, flash: [12600, 'green'],
  shots: [[1700, 'M'], [6200, 'L'], [8000, 'R'], [11000, 'M'], [12500, 'L', 1.08], [17000, 'M', 1.1], [21000, 'L']],
  hi: {gold: [Y, '1f947'], allen: C, heinz: [G, '1f92f'], rookie: Y, fire: [RD, '1f525'], glove: Y},
  cutout: {src: 22300, file: 'img/jorho/hines_allen.png', x: 660, y: 780, size: 480, dur: 1600}, sfx: (at) => [sfx('g-riser-sound-effect-free', at(12600) - 5300, 0.3, 5400), sfx('g-anime-wow-sound-effect', at(12700), 0.4, 1800), sfx('g-ding-sfx', at(12700), 0.25, 1200), sfx('g-akward-sfx', at(22000), 0.38, 1500)],
  boards: [{a: 19200, b: 22200, render: B_NAME}],
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});

const C5 = {Packs: PACKS, Goat: GOAT, Ant: ANT, Mills: MILLS, Exmate: EXMATE};
export const B26Packs = () => <Jorho s={PACKS.spec} />, B26Goat = () => <Jorho s={GOAT.spec} />, B26Ant = () => <Jorho s={ANT.spec} />,
  B26Mills = () => <Jorho s={MILLS.spec} />, B26Exmate = () => <Jorho s={EXMATE.spec} />;
export const B26_MS = Object.fromEntries(Object.entries(C5).map(([k, v]) => [k, v.total])) as Record<keyof typeof C5, number>;
