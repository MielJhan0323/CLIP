// BATCH 28 (2026-11-23, "give me 7 byb clips"): batch 26 recipe (cold-open hook, close-ups + push-in, a different song each,
// real cut-outs, riser → wow on reveals, vine boom / fahhh on punchlines, ONE Jorho v2 diagram ≤ 3.5 s), on the moments not in 26/27.
import {sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import {DT, Rw} from './batch26';
import travW from '../plans/data/t3_traveling_trevors.words.json';
import travT from '../plans/data/t3_traveling_trevors.seats.json';
import pyW from '../plans/data/u4_peyton.words.json';
import pyT from '../plans/data/u4_peyton.seats.json';
import rogW from '../plans/data/v_rogers_realm.words.json';
import rogT from '../plans/data/v_rogers_realm.seats.json';
import lairW from '../plans/data/v_lair.words.json';
import lairT from '../plans/data/v_lair.seats.json';
import tkW from '../plans/data/t4_natty_ticket.words.json';
import tkT from '../plans/data/t4_natty_ticket.seats.json';
import pbW from '../plans/data/u1_playbook.words.json';
import pbT from '../plans/data/u1_playbook.seats.json';
import coenW from '../plans/data/u6_coen_duo.words.json';
import coenT from '../plans/data/u6_coen_duo.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const R = (x: unknown) => x as Raw;
const {green: G, yellow: Y, cyan: C, red: RD} = HC;
const V3 = {push: true, musicGain: 1.8, musicFloor: 0.6};
type At = (s: number) => number;

const B_LEFT = (o: number, at: At) => <><DT t="ROLLOUTS" />
  <Rw o={o} at={at(34440)} i={0} label="COACHES: ROLL RIGHT" ok={false} /><Rw o={o} at={at(35540)} i={1} label="TREVOR: GOES LEFT" ok hl /></>;
const B_PEY = (o: number, at: At) => <><DT t="PEYTON EARLY ON" />
  <Rw o={o} at={at(48740)} i={0} label="LED THE LEAGUE IN INTs" ok={false} /><Rw o={o} at={at(50100)} i={1} label="STILL BECAME A LEGEND" ok hl /></>;
const B_ROG = (o: number, at: At) => <><DT t="STEELERS GAME" />
  <Rw o={o} at={at(11260)} i={0} label="TRAVELING TREVORS" ok /><Rw o={o} at={at(11640)} i={1} label="vs ROGERS REALM" hl /></>;
const B_LAIR = (o: number, at: At) => <><DT t="THE INVITE" />
  <Rw o={o} at={at(5020)} i={0} label="ENJOYED IT? HONESTLY DID" ok /><Rw o={o} at={at(6440)} i={1} label="COME BACK TO THE LAIR?" hl /></>;
const B_ONE = (o: number, at: At) => <><DT t="1-OF-1 VALUE" />
  <Rw o={o} at={at(76240)} i={0} label="CLEMSON: ~$2,000" ok /><Rw o={o} at={at(78700)} i={1} label="NFL: $500K – $1M" ok hl /></>;
const B_PB = (o: number, at: At) => <><DT t="THE PLAYBOOK" />
  <Rw o={o} at={at(49580)} i={0} label="INSTALLED: HUNDREDS" ok /><Rw o={o} at={at(52580)} i={1} label="NEW EACH WEEK: 8–10" ok hl /></>;
const B_COEN = (o: number, at: At) => <><DT t="BEFORE vs COEN" />
  <Rw o={o} at={at(30880)} i={0} label="DEFENSIVE RECOGNITION?" ok={false} /><Rw o={o} at={at(33200)} i={1} label="COEN: TAUGHT HIM MORE" ok hl /></>;

const LEFTY = make({hookText: 'HE THROWS BETTER GOING [LEFT]', src: 'pod/t3_traveling_trevors.mp4', track: T(travT), raw: R(travW), wideX: 960, top: "Why Trevor throws better rolling [left]",
  segs: [[48300, 50600], [6400, 10600], [26600, 29000], [33860, 39000], [47920, 50600], [50840, 52800]], hookSeat: 'M', music: 'joyful-chess-guide.mp3', from: 0, arrowAt: 11260,
  shots: [[4300, 'L'], [26600, 'M'], [33860, 'M', 1.06], [47920, 'M', 1.1], [50840, 'L'], [51800, 'W']],
  hi: {left: [G, '1f525'], right: RD, rollouts: Y, hated: RD, coaches: C, best: [Y, '1f410'], quarterback: Y, kid: C},
  sfx: (at) => [sfx('g-riser-sfx', at(48840) - 2000, 0.3, 2100), sfx('g-anime-wow-sound-effect', at(48840), 0.38, 1800), sfx('bass-boosted-vine-boom', at(51080), 0.36, 1200)],
  boards: [{a: 33860, b: 37400, render: B_LEFT}], v3: V3});

const PEYTON = make({hookText: 'WHO HE [CALLED]…', src: 'pod2/u4_peyton.mp4', track: T(pyT), raw: R(pyW), wideX: 960, top: "Who Trevor called when his [rookie year] went wrong",
  segs: [[38120, 41500], [20540, 22000], [25580, 26300], [38120, 46500], [47160, 51500]], hookSeat: 'M', music: 'interstellar-piano.mp3', from: 0, arrowAt: 38300,
  shots: [[20540, 'L'], [25580, 'M'], [38120, 'M', 1.06], [47160, 'L'], [48700, 'M', 1.1]],
  hi: {peyton: [C, '1f410'], rookie: Y, well: [RD, '1f972'], perspective: [G, '1f9e0'], challenges: RD, indy: C, interceptions: [RD, '1f62c']},
  cutout: {src: 25600, file: 'img/jorho/peyton.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(25700) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(25700), 0.36, 1800), sfx('g-akward-sfx', at(48740), 0.34, 1500)],
  boards: [{a: 47800, b: 51300, render: B_PEY}], v3: V3});

const ROGERS = make({hookText: '"WE SHOULD [BOX HIM]"', src: 'b3/v_rogers_realm.mp4', track: T(rogT), raw: R(rogW), wideX: 900, top: "Traveling Trevors vs [Rogers Realm] is coming",
  segs: [[12820, 15100], [0, 4300], [9200, 17500], [20620, 25700]], hookSeat: 'W', music: 'kai-cenat-suspense.mp3', from: 0, arrowAt: 12800,
  shots: [[0, 'W'], [9200, 'W'], [12800, 'M', 1.06], [15000, 'W'], [20620, 'L', 1.06]],
  hi: {rogers: RD, realm: RD, traveling: Y, trevor: Y, box: [RD, '1f94a'], insane: G, eagles: C, steelers: C, eyes: [Y, '1f440']},
  sfx: (at) => [sfx('g-riser-sfx', at(14720) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(14720), 0.36, 1200), sfx('g-akward-sfx', at(23120), 0.36, 1500)],
  boards: [{a: 9200, b: 12700, render: B_ROG}], v3: V3});

const COLTS = make({hookText: '"WE\'RE GOING TO THE [COLTS]"', src: 'b3/v_lair.mp4', track: T(lairT), raw: R(lairW), wideX: 900, top: "Trevor invited them to Jacksonville… then [this]",
  segs: [[19160, 20900], [3660, 9100], [9860, 11500], [12440, 14700], [15420, 19000], [19160, 20900]], hookSeat: 'M', music: 'Sneaky_Snitch.mp3', from: 30000, arrowAt: 14400, flash: [20620, 'red'],
  shots: [[3660, 'W'], [5000, 'M', 1.06], [9860, 'W'], [12440, 'W'], [14260, 'M', 1.06], [19160, 'W']],
  hi: {lair: [Y, '1f3e0'], golf: [G, '26f3'], welcome: C, jacksonville: C, awesome: G, florida: Y, colts: [RD, '1f62d'], lauderdale: Y},
  sfx: (at) => [sfx('g-riser-sfx', at(20620) - 2000, 0.3, 2100), sfx('g-fahhh-sfx', at(20620), 0.38, 1800)],
  boards: [{a: 3660, b: 7160, render: B_LAIR}], v3: V3});

const CLOSET = make({hookText: '$2K vs [$1 MILLION]', src: 'pod/t4_natty_ticket.mp4', track: T(tkT), raw: R(tkW), wideX: 960, top: "Why his NFL 1-of-1 could be worth [a million]",
  segs: [[78700, 81500], [50860, 53000], [59380, 64600], [71840, 81500]], hookSeat: 'L', music: 'midnight-club.mp3', from: 0, arrowAt: 59400,
  shots: [[50860, 'L'], [59380, 'M', 1.06], [71840, 'L'], [76200, 'L', 1.08], [79500, 'W']],
  hi: {closet: Y, jersey: C, college: C, nfl: G, clemson: [Y, '1f3c6'], million: [G, '1f4b0'], '2': Y, '000': Y, '500': G},
  sfx: (at) => [sfx('cha-ching', at(76240), 0.3, 900), sfx('g-riser-sfx', at(80420) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(80420), 0.38, 1800)],
  boards: [{a: 75600, b: 79100, render: B_ONE}], v3: V3});

const PLAYBOOK = make({hookText: '[HUNDREDS] OF PLAYS', src: 'pod2/u1_playbook.mp4', track: T(pbT), raw: R(pbW), wideX: 960, top: "How many plays Trevor has to [memorize]",
  segs: [[16780, 18000], [0, 2600], [14260, 23800], [49220, 54900]], hookSeat: 'M', music: 'Investigations.mp3', from: 0, arrowAt: 3300,
  shots: [[0, 'L'], [3300, 'W'], [14260, 'M'], [16800, 'M', 1.1], [49220, 'M', 1.06]],
  hi: {hundreds: [Y, '1f4da'], plays: Y, offense: C, runs: G, screens: G, eight: [G, '1f525'], ten: G, week: C},
  sfx: (at) => [sfx('g-riser-sfx', at(17000) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(17000), 0.36, 1800), sfx('g-ding-sfx', at(53980), 0.26, 1200)],
  boards: [{a: 49220, b: 54720, render: B_PB}], v3: V3});

const COEN = make({hookText: '[COEN] CHANGED EVERYTHING', src: 'pod2/u6_coen_duo.mp4', track: T(coenT), raw: R(coenW), wideX: 960, top: "Trevor says this coach taught him [more than anyone]",
  segs: [[19140, 23000], [5440, 8000], [10100, 16300], [30680, 37000]], hookSeat: 'M', music: 'eclipser.mp3', from: 0, arrowAt: 18400,
  shots: [[5440, 'L'], [10100, 'L'], [18320, 'M', 1.06], [30680, 'M', 1.08]],
  hi: {coen: [C, '1f9e0'], liam: C, warner: Y, staff: C, definitely: G, defensive: RD, recognition: RD, protections: Y},
  cutout: {src: 6700, file: 'img/jorho/coen.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(6700) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(6700), 0.36, 1800), sfx('g-ding-sfx', at(19140), 0.26, 1200)],
  boards: [{a: 30680, b: 34180, render: B_COEN}], v3: V3});

const C7 = {Lefty: LEFTY, Peyton: PEYTON, Rogers: ROGERS, Colts: COLTS, Closet: CLOSET, Playbook: PLAYBOOK, Coen: COEN};
export const B28Lefty = () => <Jorho s={LEFTY.spec} />, B28Peyton = () => <Jorho s={PEYTON.spec} />, B28Rogers = () => <Jorho s={ROGERS.spec} />,
  B28Colts = () => <Jorho s={COLTS.spec} />, B28Closet = () => <Jorho s={CLOSET.spec} />, B28Playbook = () => <Jorho s={PLAYBOOK.spec} />, B28Coen = () => <Jorho s={COEN.spec} />;
export const B28_MS = Object.fromEntries(Object.entries(C7).map(([k, v]) => [k, v.total])) as Record<keyof typeof C7, number>;
