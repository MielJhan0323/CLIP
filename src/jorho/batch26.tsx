// BATCH 26 (2026-11-22): back to the batch 19–22 recipe (user: "everything was good why are we suddenly devolving"): no BYB scream
// cutaways, no stickers, no lime flash; + speaker close-ups with a gentle push-in, audible music, real background-removed cut-outs,
// 15–20 s, a different song per clip.
// Moments not used in batches 17–22 (2 from new sheet downloads), recut with the newest rules: the hook line lands in the first 1–3 s
// (cold open), one topic, calm (one flash max, steady emoji pops), Trevor marked once, ≥ 15 s, no piece < 1.3 s, tight loop end.
import type {ReactNode} from 'react';
import {AbsoluteFill} from 'remotion';
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
const keep = (x: unknown, spans: [number, number][]): Raw => [...(x as Raw), ...spans.flatMap(([a, b]) => Array.from({length: Math.ceil((b - a) / 300)}, (_, i) => ({text: '', startMs: a + i * 300, endMs: a + i * 300 + 280})))];
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

const PACKS = make({hookText: 'A [T-LAW] PACK?!', src: 'pod3/w2_backyard_packs.mp4', track: T(packsT), raw: R(packsW), wideX: 960, top: "Imagine pulling [YOURSELF] in every pack",
  segs: [[19200, 22100], [2600, 9400], [15700, 23100], [22700, 25800]], hookSeat: 'M', music: 'blue-yung-kai.mp3', from: 20000, arrowAt: 22800, 
  shots: [[0, 'L'], [19200, 'L', 1.05], [22700, 'M', 1.1], [25000, 'L']], fix: {backyardpacks: 'BackyardPacks'},
  hi: {pack: [Y, '1f4e6'], trevor: C, lawrence: C, weird: [RD, '1f62c'], card: Y, shipped: G, house: G},
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const GOAT = make({hookText: 'HIS NBA [GOAT] IS…', src: 'pod/nba_goat.mp4', track: T(goatT), raw: keep(goatW, [[7100, 13200]]), wideX: 960, top: "Bro is the first person to have a [Dellavedova] goat",
  segs: [[13200, 15100], [2200, 13200], [13200, 18300]], hookSeat: 'M', music: 'jorho-qkthr.mp3', from: 40000, arrowAt: 13300, flash: [15600, 'yellow'],
  shots: [[2200, 'L'], [4400, 'M'], [5700, 'L'], [7300, 'M', 1.04], [13200, 'M', 1.1], [15500, 'L'], [17200, 'M', 1.06]], fix: {delavedova: 'Dellavedova,'},
  hi: {goat: [Y, '1f410'], dellavedova: [G, '1f3c0'], no: RD, tension: [RD, '1f62c'], nba: C},
  cutout: {src: 13900, file: 'img/jorho/dellavedova.png', x: 640, y: 760, size: 460}, v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const ANT = make({hookText: 'HIS AUTO LOOKS LIKE AN [ANT]', src: 'pod/t1_tiger_auto_pen.mp4', track: T(antT), raw: R(antW), wideX: 760, top: "Grant said his autograph looks like an [ANT]",
  segs: [[15000, 16500], [6200, 8600], [9300, 14800], [15000, 20100]], hookSeat: 'R', music: 'Fluffing_a_Duck.mp3', from: 60000, arrowAt: 14700,
  shots: [[1100, 'L'], [6200, 'M', 1.06], [9300, 'R'], [15000, 'R', 1.1], [16600, 'M'], [18000, 'R']],
  hi: {ant: [RD, '1f41c'], respect: Y, richardson: C, anthony: C, disrespect: RD, big: Y},
  cutout: {src: 15900, file: 'img/jorho/richardson.png', x: 660, y: 780, size: 440}, v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const MILLS = make({hookText: '[EW]… DAVIS MILLS', src: 'pod/t6_davis_mills_joke.mp4', track: T(millsT), raw: keep(millsW, [[7000, 9200], [11900, 14300]]), wideX: 960, top: "The [longest neck] in the world",
  segs: [[5700, 7400], [2100, 16700]], hookSeat: 'L', music: 'Curb_Credits.mp3', from: 0, arrowAt: 11300, flash: [6900, 'red'],
  shots: [[2100, 'L'], [6900, 'L', 1.1], [9200, 'L'], [11200, 'M', 1.1], [13300, 'W']],
  hi: {ew: [RD, '1f922'], neck: [Y, '1f992'], glennon: C, mills: C, davis: C, trevor: G},
  v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});
const EXMATE = make({hookText: 'THE REAL [JOSH ALLEN]', src: 'pod/t5_ex_teammate.mp4', track: T(exT), raw: R(exW), wideX: 960, top: "He pulled his old teammate in [true gold]",
  segs: [[12600, 14400], [5400, 12500], [15100, 24400]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 0, arrowAt: 12700, flash: [12600, 'green'],
  shots: [[1700, 'M'], [6200, 'L'], [8000, 'R'], [11000, 'M'], [12500, 'L', 1.08], [17000, 'M', 1.1], [21000, 'L']],
  hi: {gold: [Y, '1f947'], allen: C, heinz: [G, '1f92f'], rookie: Y, fire: [RD, '1f525'], glove: Y}, sfx: (at) => [sfx('ding-2', at(12700), 0.1)],
  cutout: {src: 22300, file: 'img/jorho/hines_allen.png', x: 660, y: 780, size: 440}, v3: {push: true, musicGain: 1.8, musicFloor: 0.6}});

const C5 = {Packs: PACKS, Goat: GOAT, Ant: ANT, Mills: MILLS, Exmate: EXMATE};
export const B26Packs = () => <Jorho s={PACKS.spec} />, B26Goat = () => <Jorho s={GOAT.spec} />, B26Ant = () => <Jorho s={ANT.spec} />,
  B26Mills = () => <Jorho s={MILLS.spec} />, B26Exmate = () => <Jorho s={EXMATE.spec} />;
export const B26_MS = Object.fromEntries(Object.entries(C5).map(([k, v]) => [k, v.total])) as Record<keyof typeof C5, number>;
