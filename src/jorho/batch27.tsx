// BATCH 27 (2026-11-22, "6 more byb clips, prioritize quality, virality and funniness or relatability"): the batch 26 recipe
// (cold-open hook line, speaker close-ups + gentle push-in, audible music (a different song each), real cut-outs, riser → wow on the
// reveal, vine boom / fahhh on the punchline, ONE Jorho v2 diagram ≤ 3.5 s in the body), on the funniest moments not in batch 26.
import {AbsoluteFill} from 'remotion';
import {sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import {Foursome, Ticket, Slab, Top10} from './batch20';
import {DT, Rw, keep} from './batch26';
import golfW from '../plans/data/t2_dream_golf_four.words.json';
import golfT from '../plans/data/t2_dream_golf_four.seats.json';
import tkW from '../plans/data/t4_natty_ticket.words.json';
import tkT from '../plans/data/t4_natty_ticket.seats.json';
import travW from '../plans/data/t3_traveling_trevors.words.json';
import travT from '../plans/data/t3_traveling_trevors.seats.json';
import cellyW from '../plans/data/u2_psa10_celly.words.json';
import cellyT from '../plans/data/u2_psa10_celly.seats.json';
import ntW from '../plans/data/v_nt_rip.words.json';
import ntT from '../plans/data/v_nt_rip.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const R = (x: unknown) => x as Raw;
const {green: G, yellow: Y, cyan: C, red: RD} = HC;
const V3 = {push: true, musicGain: 1.8, musicFloor: 0.6};

// diagrams
const B_WHACK = (o: number, at: (s: number) => number) => <><DT t="TREVOR'S REVIEW" />
  <Rw o={o} at={at(92000)} i={0} label={'VIDEO 1: "WHACKED"'} ok={false} /><Rw o={o} at={at(97580)} i={1} label={'VIDEO 2: "PRETTY FUNNY"'} ok hl /></>;
const B_FIELDS = (o: number, at: (s: number) => number) => <><DT t="JUSTIN FIELDS TRUE RPA" />
  <Rw o={o} at={at(128400)} i={0} label="2021: $20,000" ok /><Rw o={o} at={at(131440)} i={1} label="NOW: ~$500" ok={false} hl /></>;
// the slab sits under the corner camera, so nudge it down/left
const B_SLAB = (o: number, at: (s: number) => number) => <AbsoluteFill style={{transform: 'translate(-70px, 130px) scale(0.92)'}}><Slab o={o} a={at(22500)} /></AbsoluteFill>;
const B_TOP10 = (o: number, at: (s: number) => number) => <AbsoluteFill style={{transform: 'translateY(40px) scale(0.95)'}}><Top10 o={o} checkAt={at(65560)} /></AbsoluteFill>;

const JESUS = make({hookText: 'HIS DREAM FOURSOME HAS [JESUS]', src: 'pod/t2_dream_golf_four.mp4', track: T(golfT), raw: R(golfW), wideX: 720, top: "Trevor put [Jesus] in his dream golf group",
  segs: [[32600, 34100], [11280, 13800], [32240, 37400], [47100, 54200]], hookSeat: 'M', music: 'zelda-fairy-spring.mp3', from: 0, arrowAt: 32300,
  shots: [[11280, 'L'], [16860, 'W'], [32200, 'M', 1.06], [34780, 'L'], [47100, 'M'], [51000, 'M', 1.08]],
  hi: {jesus: [Y, '1f64f'], tiger: [C, '26f3'], goat: [G, '1f410'], dream: C, golf: C, humans: Y, anybody: Y, unbelievable: G},
  cutout: {src: 52800, file: 'img/jorho/tiger.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(33460) - 2000, 0.3, 2100), sfx('g-anime-wow-sound-effect', at(33460), 0.4, 1800), sfx('bass-boosted-vine-boom', at(36500), 0.32, 1200), sfx('g-ding-sfx', at(48000), 0.25, 1200)],
  boards: [{a: 47100, b: 50500, render: (o, at) => <Foursome o={o} jesusAt={-1} tigerAt={at(48000)} />}], v3: V3});

const GIFT = make({hookText: 'HE GIFTED TREVOR… [TREVOR]', src: 'pod/t4_natty_ticket.mp4', track: T(tkT), raw: R(tkW), wideX: 960, top: "Bro gifted Trevor a ticket to his OWN [natty]",
  segs: [[14360, 17300], [9800, 12000], [22140, 29100], [30480, 33300], [38140, 42100]], hookSeat: 'M', music: 'Sneaky_Snitch.mp3', from: 0, arrowAt: 25600,
  shots: [[9800, 'L'], [21540, 'L'], [24400, 'M'], [30480, 'M', 1.08], [32300, 'W'], [38140, 'L', 1.06]],
  hi: {gift: [G, '1f381'], gifting: G, weird: [RD, '1f62c'], ticket: [Y, '1f39f'], championship: Y, national: Y, mvp: C, signature: [C, '270d'], me: Y, auto: Y, thank: G},
  sfx: (at) => [sfx('g-akward-sfx', 900, 0.38, 1500), sfx('g-riser-sfx', at(31860) - 2000, 0.3, 2100), sfx('g-anime-wow-sound-effect', at(31860), 0.38, 1800), sfx('g-fahhh-sfx', at(41800), 0.35, 1800)],
  boards: [{a: 24400, b: 27900, render: (o, at) => <Ticket o={o} a={at(24450)} signAt={at(27200)} />}], v3: V3});

const WHACK = make({hookText: '"THESE GUYS ARE [WHACKED]"', src: 'pod/t3_traveling_trevors.mp4', track: T(travT), raw: R(travW), wideX: 960, top: "Trevor's honest review of the [Traveling Trevors]",
  segs: [[81300, 83400], [59500, 62800], [79640, 83400], [91660, 93700], [97140, 98200]], hookSeat: 'M', music: 'Monkeys_Spinning_Monkeys.mp3', from: 0, arrowAt: 64400, flash: [83080, 'red'],
  shots: [[59500, 'L'], [64300, 'M'], [77860, 'M'], [82600, 'M', 1.1], [91660, 'M'], [96000, 'W']],
  hi: {whacked: [RD, '1f92f'], videos: Y, follow: C, funny: [G, '1f602'], playing: Y, second: C, first: C, trevers: C, algorithm: Y},
  sfx: (at) => [sfx('g-riser-sfx', at(83080) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(83080), 0.36, 1200), sfx('g-ding-sfx', at(98060), 0.28, 1200)],
  boards: [{a: 91660, b: 98200, render: B_WHACK}], v3: V3});

const CELLY = make({hookText: 'THE [PSA 10] CELLY', src: 'pod2/u2_psa10_celly.mp4', track: T(cellyT), raw: R(cellyW), wideX: 960, top: "Bro pitched Trevor a [PSA 10] touchdown celly",
  segs: [[26200, 28300], [4460, 8600], [12960, 15200], [20840, 29000], [30000, 32300]], hookSeat: 'M', music: 'funk-do-balkan.mp3', from: 0, arrowAt: 4500, flash: [31920, 'green'],
  shots: [[3960, 'L'], [8400, 'M'], [12960, 'M', 1.06], [20840, 'L'], [26200, 'M', 1.1], [30000, 'M']],
  hi: {celly: [Y, '1f3c8'], selly: [Y, '1f3c8'], touchdown: G, choreographed: [RD, '1f62c'], choreograph: RD, psa: C, '1010': G, '10': [G, '1f51f'], best: G, easy: G, collectors: C, yo: G},
  sfx: (at) => [sfx('g-akward-sfx', at(13720), 0.35, 1500), sfx('g-riser-sfx', at(27580) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(27580), 0.34, 1200), sfx('g-anime-wow-sound-effect', at(31920), 0.36, 1800)],
  boards: [{a: 22400, b: 25700, render: B_SLAB}], v3: V3});

const FIELDS = make({hookText: '$20,000 → [$500]', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: keep(ntW, [[129300, 131400]]), wideX: 900, top: "The card that went from [$20,000] to [$500]",
  segs: [[122120, 123700], [103080, 105400], [119440, 132600]], hookSeat: 'W', music: 'Jeopardy_Think.mp3', from: 0, arrowAt: 120400, flash: [131440, 'red'],
  shots: [[103080, 'W'], [119440, 'M'], [122120, 'M', 1.1], [124480, 'W'], [129300, 'M', 1.06]],
  hi: {fields: [C, '1f62e'], justin: C, rpa: Y, chase: Y, '20000': [G, '1f4b0'], '500': [RD, '1f4c9'], bucks: RD, god: Y},
  fix: {'000': '$20,000.', '20': ''},
  cutout: {src: 122300, file: 'img/jorho/fields.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(122120) - 2000, 0.3, 2100), sfx('g-anime-wow-sound-effect', at(122120), 0.4, 1800), sfx('g-sudden-suspense-sound-effect', at(129300), 0.3, 1400), sfx('g-fahhh-sfx', at(131600), 0.36, 1800)],
  boards: [{a: 128300, b: 131800, render: B_FIELDS}], v3: V3});

const EW = make({hookText: '[EW]… PUT IT AWAY', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: R(ntW), wideX: 900, top: "Trevor saw ONE card and said '[Ew]'",
  segs: [[78180, 80400], [62060, 70900], [73380, 83400]], hookSeat: 'M', music: 'Curb_Credits.mp3', from: 20000, arrowAt: 62400, flash: [78180, 'red'],
  shots: [[62060, 'L'], [65200, 'M'], [67000, 'L'], [69700, 'M', 1.06], [73380, 'W'], [77100, 'M', 1.1], [80300, 'W']],
  hi: {ew: [RD, '1f922'], show: RD, away: [RD, '1f648'], marino: C, dan: C, rip: [G, '1f525'], sling: G, top: Y, '10': Y},
  sfx: (at) => [sfx('g-riser-sfx', at(78180) - 2000, 0.3, 2100), sfx('bass-boosted-vine-boom', at(78180), 0.36, 1200), sfx('g-fahhh-sfx', at(82200), 0.34, 1800)],
  boards: [{a: 64800, b: 68300, render: B_TOP10}], v3: V3});

const C6 = {Jesus: JESUS, Gift: GIFT, Whack: WHACK, Celly: CELLY, Fields: FIELDS, Ew: EW};
export const B27Jesus = () => <Jorho s={JESUS.spec} />, B27Gift = () => <Jorho s={GIFT.spec} />, B27Whack = () => <Jorho s={WHACK.spec} />,
  B27Celly = () => <Jorho s={CELLY.spec} />, B27Fields = () => <Jorho s={FIELDS.spec} />, B27Ew = () => <Jorho s={EW.spec} />;
export const B27_MS = Object.fromEntries(Object.entries(C6).map(([k, v]) => [k, v.total])) as Record<keyof typeof C6, number>;
