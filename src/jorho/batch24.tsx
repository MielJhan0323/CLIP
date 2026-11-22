// BATCH 24 (2026-11-22, v3 = client whop-ai Drive template; batch 23 was "lack luster"): 10 BYB (Trevor Lawrence x Backyard Breaks) clips. User: "give me 10 byb high virality clips, remember what we did before".
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
  segs: [[19200, 22100], [0, 10900], [15700, 23100], [22700, 27800]], hookSeat: 'W', music: 'du-bist-gut-genug.mp3', from: 20000, arrowAt: 22800, 
  shots: [[0, 'W'], [15700, 'W'], [22700, 'M', 1.06]], fix: {backyardpacks: 'BackyardPacks'},
  hi: {pack: [Y, '1f4e6'], trevor: C, lawrence: C, weird: [RD, '1f62c'], card: Y, shipped: G, house: G},
  v3: {arrowStart: true, green: true, cuts: [{src: 23000, dur: 1200, file: 'byb/memes/byb-trip__mind_boggling.mp4', from: 20.7}], stickers: [[26800, 'byb/stk/laugh.png']], money: [5000]}});
const REDEEM = make({hookText: '$20K → [$500]', src: 'pod2/u3_redemptions.mp4', track: T(redT), raw: R(redW), wideX: 960, top: "This $20,000 card is now worth [$500]",
  segs: [[1100, 5800], [7000, 16000], [17200, 27700]], hookSeat: 'W', music: 'Investigations.mp3', from: 0, arrowAt: 15000, 
  shots: [[1100, 'W'], [7000, 'L'], [13300, 'M', 1.06], [17200, 'L'], [24300, 'W']], 
  hi: {redeem: [C, '1f4e8'], dislike: [RD, '1f620'], hobby: Y, time: Y, players: C, sign: G},
  sfx: (at) => [sfx('ding-2', at(26000), 0.1)],
  v3: {arrowStart: true, green: true, cuts: [{src: 4300, dur: 1100, file: 'byb/memes/byb-it_burns.mp4', from: 22.3}], stickers: [[26000, 'byb/stk/crying.png']]}});
const GOAT = make({hookText: 'HIS NBA [GOAT] IS…', src: 'pod/nba_goat.mp4', track: T(goatT), raw: keep(goatW, [[7100, 13200]]), wideX: 960, top: "Bro is the first person to have a [Dellavedova] goat",
  segs: [[13200, 15100], [2200, 13200], [13200, 18300]], hookSeat: 'M', music: 'du-bist-gut-genug.mp3', from: 40000, arrowAt: 13300, flash: [15600, 'yellow'],
  shots: [[2200, 'W'], [13200, 'M', 1.06], [15500, 'W']], fix: {delavedova: 'Dellavedova,'},
  hi: {goat: [Y, '1f410'], dellavedova: [G, '1f3c0'], no: RD, tension: [RD, '1f62c'], nba: C},
  v3: {arrowStart: true, green: true, cuts: [{src: 5700, dur: 1300, file: 'byb/img/goats-goats.jpg'}, {src: 13800, dur: 1400, file: 'byb/img/delly-image_12.png'}, {src: 15600, dur: 1200, file: 'byb/memes/byb-cmon_thats_the_best_player_oat.mp4', from: 23.4}], stickers: [[16900, 'byb/stk/skull.png']]}});
const ANT = make({hookText: 'HIS AUTO LOOKS LIKE AN [ANT]', src: 'pod/t1_tiger_auto_pen.mp4', track: T(antT), raw: R(antW), wideX: 760, top: "Grant said his autograph looks like an [ANT]",
  segs: [[15000, 16500], [1100, 8600], [9300, 14800], [15000, 20100]], hookSeat: 'L', music: 'du-bist-gut-genug.mp3', from: 60000, arrowAt: 14700,
  shots: [[9300, 'L'], [14500, 'M', 1.06], [16500, 'L']],
  hi: {ant: [RD, '1f41c'], respect: Y, richardson: C, anthony: C, disrespect: RD, big: Y},
  v3: {arrowStart: true, green: true, cuts: [{src: 16300, dur: 1100, file: 'byb/memes/byb-rip_table.mp4', from: 8.9}], stickers: [[18000, 'byb/stk/laugh.png']]}});
const MILLS = make({hookText: '[EW]… DAVIS MILLS', src: 'pod/t6_davis_mills_joke.mp4', track: T(millsT), raw: keep(millsW, [[7000, 9200], [11900, 14300]]), wideX: 960, top: "The [longest neck] in the world",
  segs: [[5700, 7400], [2100, 16700]], hookSeat: 'W', music: 'Curb_Credits.mp3', from: 0, arrowAt: 11300, flash: [6900, 'red'],
  shots: [[2100, 'W'], [9200, 'L'], [11200, 'M', 1.06], [14200, 'W']],
  hi: {ew: [RD, '1f922'], neck: [Y, '1f992'], glennon: C, mills: C, davis: C, trevor: G},
  v3: {arrowStart: true, green: true, cuts: [{src: 7000, dur: 1100, file: 'byb/memes/byb-funny_scream.mp4', from: 52.3}], stickers: [[10600, 'byb/stk/skull.png']]}});
const EXMATE = make({hookText: 'THE REAL [JOSH ALLEN]', src: 'pod/t5_ex_teammate.mp4', track: T(exT), raw: R(exW), wideX: 960, top: "He pulled his old teammate in [true gold]",
  segs: [[12600, 14400], [1700, 12500], [15100, 25600]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 0, arrowAt: 12700, flash: [12600, 'green'],
  shots: [[1700, 'W'], [12500, 'M', 1.06], [19000, 'W']],
  hi: {gold: [Y, '1f947'], allen: C, heinz: [G, '1f92f'], rookie: Y, fire: [RD, '1f525'], glove: Y}, sfx: (at) => [sfx('ding-2', at(12700), 0.1)],
  v3: {arrowStart: true, green: true, cuts: [{src: 12900, dur: 1200, file: 'byb/memes/byb-no_way_he_did_it!.mp4', from: 30.8}], stickers: [[23000, 'byb/stk/laugh.png']]}});
const LAIR = make({hookText: 'TREVOR AT [THE LAIR]?', src: 'b3/v_lair.mp4', track: T(lairT), raw: R(lairW), wideX: 900, top: "Trevor Lawrence just agreed to come to [the Lair]",
  segs: [[14300, 16100], [3700, 17200], [17400, 19100]], hookSeat: 'M', music: 'blue-yung-kai.mp3', from: 0, arrowAt: 14400,
  shots: [[3700, 'W'], [9800, 'M', 1.06], [12300, 'W'], [14300, 'M', 1.06], [17400, 'W']],
  hi: {lair: [Y, '1f3e0'], golf: [G, '26f3'], welcome: C, jacksonville: C, awesome: G, florida: Y},
  v3: {arrowStart: true, green: true, cuts: [{src: 14700, dur: 1200, file: 'byb/memes/byb-oh_my_god!_our_first_one!.mp4', from: 5.6}], stickers: [[16200, 'byb/stk/rizz.png']]}});
const ROGERS = make({hookText: 'TRAVELING TREVORS vs [ROGERS REALM]', src: 'b3/v_rogers_realm.mp4', track: T(rogT), raw: R(rogW), wideX: 900, top: "Traveling Trevors vs [Rogers Realm] is coming",
  segs: [[17600, 20300], [0, 6100], [9200, 17500], [20600, 24600]], hookSeat: 'W', music: 'kai-cenat-suspense.mp3', from: 0, arrowAt: 12800,
  shots: [[0, 'W'], [12800, 'M', 1.06], [15000, 'W'], [20600, 'L']],
  hi: {rogers: RD, realm: RD, traveling: Y, trevor: Y, box: [RD, '1f94a'], insane: G, eagles: C, steelers: C},
  v3: {arrowStart: true, green: true, cuts: [{src: 18300, dur: 1200, file: 'byb/memes/byb-rise_up_and_bring_the_earth_down.mp4', from: 38.9}], stickers: [[15000, 'byb/stk/skull.png']]}});
const COEN = make({hookText: '[COEN] CHANGED EVERYTHING', src: 'pod2/u6_coen_duo.mp4', track: T(coenT), raw: R(coenW), wideX: 960, top: "Trevor says this coach changed [everything]",
  segs: [[18300, 22950], [4700, 17800], [22950, 30300]], hookSeat: 'M', music: 'Investigations.mp3', from: 0, arrowAt: 18400,
  shots: [[4700, 'L'], [18300, 'M', 1.06]],
  hi: {coen: [C, '1f9e0'], warner: Y, system: G, college: Y, staff: C, different: [G, '1f504']},
  v3: {arrowStart: true, green: true, stickers: [[9800, 'byb/stk/think.png'], [26500, 'byb/stk/heart.png']]}});
const CELLY = make({hookText: 'THE [PSA 10] CELLY', src: 'pod2/u2_psa10_celly.mp4', track: T(cellyT), raw: R(cellyW), wideX: 960, top: "Bro pitched Trevor a [PSA 10] touchdown celly",
  segs: [[22400, 25400], [4000, 8600], [12000, 15500], [19100, 30500]], hookSeat: 'L', music: 'pixy-legacy.mp3', from: 0, arrowAt: 12100, 
  shots: [[4000, 'L'], [12000, 'M', 1.06], [19100, 'L']],
  hi: {celly: [Y, '1f64c'], psa: G, touchdown: [C, '1f3c8'], choreographed: RD, collectors: Y, grade: G},
  v3: {arrowStart: true, green: true, cuts: [{src: 26000, dur: 1200, file: 'byb/memes/byb-scream_yessir.mp4', from: 11.8}], stickers: [[14600, 'byb/stk/laugh.png']]}});

const C10 = {Packs: PACKS, Redeem: REDEEM, Goat: GOAT, Ant: ANT, Mills: MILLS, Exmate: EXMATE, Lair: LAIR, Rogers: ROGERS, Coen: COEN, Celly: CELLY};
export const B24Packs = () => <Jorho s={PACKS.spec} />, B24Redeem = () => <Jorho s={REDEEM.spec} />, B24Goat = () => <Jorho s={GOAT.spec} />,
  B24Ant = () => <Jorho s={ANT.spec} />, B24Mills = () => <Jorho s={MILLS.spec} />, B24Exmate = () => <Jorho s={EXMATE.spec} />,
  B24Lair = () => <Jorho s={LAIR.spec} />, B24Rogers = () => <Jorho s={ROGERS.spec} />, B24Coen = () => <Jorho s={COEN.spec} />, B24Celly = () => <Jorho s={CELLY.spec} />;
export const B24_MS = Object.fromEntries(Object.entries(C10).map(([k, v]) => [k, v.total])) as Record<keyof typeof C10, number>;
