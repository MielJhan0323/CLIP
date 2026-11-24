// BATCH 29 (2026-11-24, "10 trevor lawrence jorho v2 clips … not byb card pulls … doesn't matter if it's a used clip as long as the
// edit is new … make sure they're eye catching"): every clip gets a NEW cold open, NEW song, NEW hook text vs batches 17–28;
// eye-catchers: payoff/reaction line in frame 0 + colour flash or cut-out in the first seconds, punch-ins, one full-board diagram.
import {sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import {Foursome} from './batch20';
import {DT, Rw, keep, B_GOAT, B_NECK} from './batch26';
import {B_WHACK} from './batch27';
import {B_LEFT, B_PEY, B_ROG, B_COEN} from './batch28';
import goatW from '../plans/data/nba_goat.words.json';
import goatT from '../plans/data/nba_goat.seats.json';
import millsW from '../plans/data/t6_davis_mills_joke.words.json';
import millsT from '../plans/data/t6_davis_mills_joke.seats.json';
import golfW from '../plans/data/t2_dream_golf_four.words.json';
import golfT from '../plans/data/t2_dream_golf_four.seats.json';
import travW from '../plans/data/t3_traveling_trevors.words.json';
import travT from '../plans/data/t3_traveling_trevors.seats.json';
import pyW from '../plans/data/u4_peyton.words.json';
import pyT from '../plans/data/u4_peyton.seats.json';
import coenW from '../plans/data/u6_coen_duo.words.json';
import coenT from '../plans/data/u6_coen_duo.seats.json';
import pbW from '../plans/data/u1_playbook.words.json';
import pbT from '../plans/data/u1_playbook.seats.json';
import psW from '../plans/data/v_presnap.words.json';
import psT from '../plans/data/v_presnap.seats.json';
import rogW from '../plans/data/v_rogers_realm.words.json';
import rogT from '../plans/data/v_rogers_realm.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const R = (x: unknown) => x as Raw;
const {green: G, yellow: Y, cyan: C, red: RD} = HC;
const V3 = {push: true, musicGain: 1.8, musicFloor: 0.6};
type At = (s: number) => number;

const B_INV = (o: number, at: At) => <><DT t="THE PLAYBOOK" />
  <Rw o={o} at={at(37000)} i={0} label="WHOLE INVENTORY: HUNDREDS" ok /><Rw o={o} at={at(38700)} i={1} label="THIS WEEK: A GAME PLAN" ok hl /></>;
const B_PRE = (o: number, at: At) => <><DT t="BEFORE THE SNAP" />
  <Rw o={o} at={at(13800)} i={0} label="KNOWS WHO'S OPEN: 50 TO 65%" ok /><Rw o={o} at={at(15400)} i={1} label="DEFENSE TRICKS HIM: ~15%" ok={false} hl /></>;

const GOAT = make({hookText: 'NOT LEBRON. NOT [JORDAN].', src: 'pod/nba_goat.mp4', track: T(goatT), raw: keep(goatW, [[7100, 13200]]), wideX: 960, top: "Trevor's NBA GOAT is NOT who you think",
  segs: [[15500, 18400], [2180, 7100], [7100, 13200], [13240, 18400]], hookSeat: 'M', music: 'tak-tak.mp3', from: 0, arrowAt: 2400, flash: [15600, 'red'],
  shots: [[2180, 'L'], [4400, 'M'], [7100, 'M', 1.04], [10500, 'M', 1.08], [13240, 'M', 1.12], [15500, 'L'], [16900, 'M']],
  hi: {goat: [Y, '1f410'], dellavedova: [G, '1f3c0'], no: RD, tension: [RD, '1f62c'], nba: C, greatest: Y}, fix: {delavedova: 'Dellavedova,'},
  cutout: {src: 13900, file: 'img/jorho/dellavedova.png', x: 640, y: 760, size: 520, dur: 1600},
  sfx: (at) => [sfx('g-riser-sound-effect-free', at(13240) - 5300, 0.32, 5400), sfx('g-anime-wow-sound-effect', at(13900), 0.4, 1800), sfx('g-fahhh-sfx', at(15700), 0.36, 1800)],
  boards: [{a: 7800, b: 11300, render: B_GOAT}], v3: V3});

const MILLS = make({hookText: 'LONGER NECK THAN [GLENNON]?!', src: 'pod/t6_davis_mills_joke.mp4', track: T(millsT), raw: keep(millsW, [[7000, 9200], [11900, 14300]]), wideX: 960, top: "Trevor's QB room has a [giraffe] in it",
  segs: [[9160, 10800], [2060, 16700]], hookSeat: 'L', music: 'du-bist-full.mp3', from: 0, arrowAt: 11300, flash: [6940, 'yellow'],
  shots: [[2060, 'L'], [5800, 'L', 1.08], [6940, 'M', 1.12], [9160, 'L'], [11200, 'M', 1.1], [13300, 'W']],
  hi: {ew: [RD, '1f922'], neck: [Y, '1f992'], glennon: C, mills: C, davis: C, trevor: G, longer: Y},
  sfx: (at) => [sfx('g-akward-sfx', at(6940), 0.36, 1500), sfx('bass-boosted-vine-boom', at(9940), 0.36, 1200), sfx('g-fahhh-sfx', at(14400), 0.32, 1800)],
  boards: [{a: 10200, b: 13300, render: B_NECK}], v3: V3});

const JESUS = make({hookText: 'HIS DREAM FOURSOME IS [UNREAL]', src: 'pod/t2_dream_golf_four.mp4', track: T(golfT), raw: R(golfW), wideX: 720, top: "Trevor's dream golf group has [Jesus] AND [Tiger]",
  segs: [[11280, 13800], [16860, 19500], [32240, 37400], [45480, 54200]], hookSeat: 'M', music: 'amor-na-praia.mp3', from: 0, arrowAt: 32300, flash: [33460, 'yellow'],
  shots: [[11280, 'L'], [16860, 'W'], [32240, 'M', 1.08], [34780, 'L'], [45480, 'M'], [51000, 'M', 1.1]],
  hi: {jesus: [Y, '1f64f'], tiger: [C, '26f3'], goat: [G, '1f410'], dream: C, golf: C, humans: Y, anybody: Y, unbelievable: G},
  cutout: {src: 48100, file: 'img/jorho/tiger.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(33460) - 2000, 0.3, 2100), sfx('g-anime-wow-sound-effect', at(33460), 0.4, 1800), sfx('g-ding-sfx', at(48000), 0.26, 1200), sfx('bass-boosted-vine-boom', at(53060), 0.3, 1200)],
  boards: [{a: 33000, b: 36500, render: (o, at) => <Foursome o={o} jesusAt={at(33460)} tigerAt={1e9} />}], v3: V3});

const WHACK = make({hookText: 'TREVOR [FOLLOWS] THEM?!', src: 'pod/t3_traveling_trevors.mp4', track: T(travT), raw: R(travW), wideX: 960, top: "Trevor watches the [Traveling Trevors]",
  segs: [[64320, 66700], [59500, 62800], [77860, 83400], [91660, 93700], [97140, 98200]], hookSeat: 'M', music: 'vem-pere-reka.mp3', from: 0, arrowAt: 64400, flash: [83080, 'red'],
  shots: [[59500, 'L'], [64320, 'M', 1.08], [77860, 'M'], [82600, 'M', 1.12], [91660, 'M'], [97140, 'M', 1.06]],
  hi: {whacked: [RD, '1f92f'], videos: Y, follow: [C, '1f440'], funny: [G, '1f602'], second: C, first: C, trevers: C},
  sfx: (at) => [sfx('g-riser-sfx', at(83080) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(83080), 0.36, 1200), sfx('g-ding-sfx', at(98060), 0.28, 1200)],
  boards: [{a: 91660, b: 98200, render: B_WHACK}], v3: V3});

const LEFTY = make({hookText: '"BEST QB I\'VE [EVER SEEN]"', src: 'pod/t3_traveling_trevors.mp4', track: T(travT), raw: R(travW), wideX: 960, top: "The reason Trevor is [deadly] rolling left",
  segs: [[50840, 52800], [6400, 10600], [26600, 29000], [33860, 39000], [47920, 52800]], hookSeat: 'L', music: 'joyful-chess-slowed.mp3', from: 0, arrowAt: 11260, flash: [50840, 'green'],
  shots: [[6400, 'L'], [26600, 'M'], [33860, 'M', 1.08], [47920, 'M', 1.12], [50840, 'L', 1.06]],
  hi: {left: [G, '1f525'], right: RD, rollouts: Y, hated: [RD, '1f620'], coaches: C, best: [Y, '1f410'], quarterback: Y},
  sfx: (at) => [sfx('g-akward-sfx', at(32800), 0.3, 1500), sfx('g-anime-wow-sound-effect', at(48840), 0.38, 1800), sfx('bass-boosted-vine-boom', at(51080), 0.36, 1200)],
  boards: [{a: 33860, b: 37400, render: B_LEFT}], v3: V3});

const PEYTON = make({hookText: 'HIS [MENTOR] IS A LEGEND', src: 'pod2/u4_peyton.mp4', track: T(pyT), raw: R(pyW), wideX: 960, top: "The legend Trevor calls when things go [wrong]",
  segs: [[20540, 22000], [25580, 29000], [38120, 46500], [47160, 51500]], hookSeat: 'L', music: 'say-goodbye-lodoni.mp3', from: 0, arrowAt: 25700,
  shots: [[20540, 'L'], [25580, 'M', 1.08], [38120, 'M'], [41000, 'M', 1.1], [47160, 'L'], [48700, 'M', 1.12]],
  hi: {peyton: [C, '1f410'], rookie: Y, well: [RD, '1f972'], perspective: [G, '1f9e0'], challenges: RD, indy: C, interceptions: [RD, '1f62c'], season: Y},
  cutout: {src: 25700, file: 'img/jorho/peyton.png', x: 640, y: 760, size: 520, dur: 1700},
  sfx: (at) => [sfx('g-riser-sfx', at(25700) - 1400, 0.3, 1500), sfx('g-anime-wow-sound-effect', at(25700), 0.38, 1800), sfx('g-akward-sfx', at(48740), 0.32, 1500)],
  boards: [{a: 47800, b: 51300, render: B_PEY}], v3: V3});

const COEN = make({hookText: 'COLLEGE DIDN\'T [TEACH] HIM THIS', src: 'pod2/u6_coen_duo.mp4', track: T(coenT), raw: R(coenW), wideX: 960, top: "The coach who taught Trevor [more than anyone]",
  segs: [[27860, 30300], [5440, 8000], [10100, 16300], [18320, 19500], [30680, 37000]], hookSeat: 'M', music: 'versatile.mp3', from: 0, arrowAt: 18400,
  shots: [[5440, 'L'], [10100, 'L', 1.06], [18320, 'M', 1.08], [30680, 'M'], [33500, 'M', 1.1]],
  hi: {coen: [C, '1f9e0'], liam: C, warner: Y, college: Y, world: Y, definitely: G, defensive: RD, recognition: RD},
  cutout: {src: 6700, file: 'img/jorho/coen.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-anime-wow-sound-effect', at(6700), 0.36, 1800), sfx('g-ding-sfx', at(18320), 0.26, 1200), sfx('g-sudden-suspense-sound-effect', at(30680), 0.28, 1400)],
  boards: [{a: 31000, b: 34500, render: B_COEN}], v3: V3});

const PLAYBOOK = make({hookText: '[8 TO 10] NEW PLAYS A WEEK', src: 'pod2/u1_playbook.mp4', track: T(pbT), raw: R(pbW), wideX: 960, top: "What an NFL QB has to learn [every week]",
  segs: [[52080, 54900], [0, 2600], [14260, 22700], [36840, 42900]], hookSeat: 'M', music: 'acido.mp3', from: 0, arrowAt: 3300, flash: [52580, 'green'],
  shots: [[0, 'L'], [14260, 'M'], [16800, 'M', 1.1], [36840, 'M'], [39000, 'M', 1.08]],
  hi: {hundreds: [Y, '1f4da'], plays: Y, offense: C, runs: G, screens: G, eight: [G, '1f525'], ten: G, week: C, inventory: Y},
  sfx: (at) => [sfx('g-riser-sfx', at(17000) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(17000), 0.36, 1800), sfx('g-ding-sfx', at(42380), 0.26, 1200)],
  boards: [{a: 36840, b: 40340, render: B_INV}], v3: V3});

const PRESNAP = make({hookText: 'IT ENDS UP GOING [THERE]', src: 'b3/v_presnap.mp4', track: T(psT), raw: R(psW), wideX: 900, top: "How often Trevor knows who's open [before the snap]",
  segs: [[20440, 22900], [1720, 5600], [13160, 18200], [18880, 22900], [28260, 32300]], hookSeat: 'M', music: 'pixy-legacy.mp3', from: 0, arrowAt: 9800, flash: [22700, 'yellow'],
  shots: [[0, 'L'], [13160, 'M', 1.06], [18880, 'M'], [21000, 'M', 1.1], [28260, 'M']],
  hi: {open: [G, '1f440'], '50': Y, '65': Y, '70': Y, '15': RD, coverage: C, tricks: [RD, '1f92f'], there: RD, here: G},
  sfx: (at) => [sfx('g-sudden-suspense-sound-effect', at(1700), 0.28, 1400), sfx('g-akward-sfx', at(22700), 0.34, 1500), sfx('g-ding-sfx', at(13820), 0.26, 1200)],
  boards: [{a: 13160, b: 16660, render: B_PRE}], v3: V3});

const ROGERS = make({hookText: 'THEY GAVE HIM [THE EYES]', src: 'b3/v_rogers_realm.mp4', track: T(rogT), raw: R(rogW), wideX: 900, top: "Traveling Trevors vs [Rogers Realm] is happening",
  segs: [[22180, 25700], [0, 6100], [9200, 17500], [17580, 20300]], hookSeat: 'L', music: 'lose-you-adturnup.mp3', from: 0, arrowAt: 12800, flash: [14720, 'red'],
  shots: [[0, 'W'], [9200, 'W'], [12800, 'M', 1.08], [14720, 'W', 1.06], [17580, 'M']],
  hi: {rogers: RD, realm: RD, traveling: Y, trevor: Y, box: [RD, '1f94a'], insane: G, eagles: C, steelers: C, eyes: [Y, '1f440'], happen: G},
  sfx: (at) => [sfx('g-akward-sfx', 400, 0.32, 1500), sfx('g-riser-sfx', at(14720) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(14720), 0.36, 1200)],
  boards: [{a: 9200, b: 12700, render: B_ROG}], v3: V3});

const C10 = {Goat: GOAT, Mills: MILLS, Jesus: JESUS, Whack: WHACK, Lefty: LEFTY, Peyton: PEYTON, Coen: COEN, Playbook: PLAYBOOK, Presnap: PRESNAP, Rogers: ROGERS};
export const B29Goat = () => <Jorho s={GOAT.spec} />, B29Mills = () => <Jorho s={MILLS.spec} />, B29Jesus = () => <Jorho s={JESUS.spec} />,
  B29Whack = () => <Jorho s={WHACK.spec} />, B29Lefty = () => <Jorho s={LEFTY.spec} />, B29Peyton = () => <Jorho s={PEYTON.spec} />,
  B29Coen = () => <Jorho s={COEN.spec} />, B29Playbook = () => <Jorho s={PLAYBOOK.spec} />, B29Presnap = () => <Jorho s={PRESNAP.spec} />, B29Rogers = () => <Jorho s={ROGERS.spec} />;
export const B29_MS = Object.fromEntries(Object.entries(C10).map(([k, v]) => [k, v.total])) as Record<keyof typeof C10, number>;
