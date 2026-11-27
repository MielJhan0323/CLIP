// BATCH 31 (2026-11-27, "make me 10 more byb edits"): BYB card moments, standing rule HOOK → STAY → ENGAGE (cold-open payoff,
// held reveal, progress bar, end card with the clip's own comment question + LIKE/SUBSCRIBE). PS5/GTA lines only where they fit
// (user 2026-11-25): only the $15K patch (= 20 PS5 Pros at $749.99). New songs per clip, all in the loudness table.
import {AbsoluteFill} from 'remotion';
import {sfx} from '../e3/kit';
import {Jorho} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import {Top10} from './batch20';
import {DT, Rw, keep, B_NAME} from './batch26';
import {B_ONE} from './batch28';
import ntW from '../plans/data/v_nt_rip.words.json';
import ntT from '../plans/data/v_nt_rip.seats.json';
import redW from '../plans/data/u3_redemptions.words.json';
import redT from '../plans/data/u3_redemptions.seats.json';
import antW from '../plans/data/t1_tiger_auto_pen.words.json';
import antT from '../plans/data/t1_tiger_auto_pen.seats.json';
import golfW from '../plans/data/t2_dream_golf_four.words.json';
import golfT from '../plans/data/t2_dream_golf_four.seats.json';
import tkW from '../plans/data/t4_natty_ticket.words.json';
import tkT from '../plans/data/t4_natty_ticket.seats.json';
import exW from '../plans/data/t5_ex_teammate.words.json';
import exT from '../plans/data/t5_ex_teammate.seats.json';

type Track = Parameters<typeof make>[0]['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const R = (x: unknown) => x as Raw;
const {green: G, yellow: Y, cyan: C, red: RD} = HC;
const V3 = {push: true, musicGain: 1.8, musicFloor: 0.6};
type At = (s: number) => number;

const B_PATCH = (o: number, at: At) => <><DT t="SAME CARD?" />
  <Rw o={o} at={at(9300)} i={0} label="NICE PATCH: $15,000+" ok /><Rw o={o} at={at(10460)} i={1} label={'PLAIN PATCH: "A NAPKIN"'} ok={false} hl /></>;
const B_RIP = (o: number, at: At) => <><DT t="RIP LIKE A PRO" />
  <Rw o={o} at={at(36840)} i={0} label="DON'T LOOK AT THE BACK" ok /><Rw o={o} at={at(39200)} i={1} label="DON'T TOUCH THE CORNERS" ok hl /></>;
const B_RPA = (o: number, at: At) => <><DT t="THE CHASE CARD" />
  <Rw o={o} at={at(95600)} i={0} label="ROOKIE" ok /><Rw o={o} at={at(96080)} i={1} label="PATCH" ok /><Rw o={o} at={at(96760)} i={2} label="TRUE RPA GOLD" ok hl /></>;
const B_RED = (o: number, at: At) => <><DT t="WHY A REDEMPTION?" />
  <Rw o={o} at={at(17440)} i={0} label="PLAYER SIGNS LATE" ok={false} /><Rw o={o} at={at(19940)} i={1} label="YOU GET AN IOU CARD" ok={false} hl /></>;
const B_SIG = (o: number, at: At) => <><DT t="AUTOGRAPH CHECK" />
  <Rw o={o} at={at(22460)} i={0} label="SAME EVERY TIME" ok /><Rw o={o} at={at(24080)} i={1} label="BEAUTIFUL SIGNATURES" ok hl /></>;
const B_TIGER = (o: number, at: At) => <><DT t="WHAT'S INSIDE" />
  <Rw o={o} at={at(99840)} i={0} label="GAME-WORN SHIRT" ok /><Rw o={o} at={at(100980)} i={1} label="LAUNDRY TAG" ok />
  <Rw o={o} at={at(101700)} i={2} label="GLOVE" ok /><Rw o={o} at={at(102060)} i={3} label="CAP" ok hl /></>;
const B_TOP = (o: number, at: At) => <AbsoluteFill style={{transform: 'translateY(40px) scale(0.95)'}}><Top10 o={o} checkAt={at(65560)} /></AbsoluteFill>;
const B_PS5 = (o: number, at: At) => <><DT t="$20,000 = ?" />
  <Rw o={o} at={at(129150)} i={0} label="2021: 26 PS5 PROS" ok /><Rw o={o} at={at(129450)} i={1} label="NOW: NOT EVEN 1" ok={false} hl /></>;

const PATCH = make({hookText: '$15K OR A [NAPKIN]?', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: R(ntW), wideX: 900, top: 'One patch = [20 PS5 Pros]. The other is a napkin',
  segs: [[7500, 9000], [0, 7300], [7500, 11900], [12800, 15400]], hookSeat: 'W', music: 'funk-abnormal.mp3', from: 0, arrowAt: 7700, flash: [8500, 'red'],
  shots: [[0, 'W'], [2700, 'M', 1.08], [7500, 'W'], [8500, 'M', 1.12], [12800, 'W']],
  hi: {napkin: [RD, '1f62c'], patch: Y, '15': G, '000': G, jaguars: C, swoosh: C, nicer: G},
  sfx: (at) => [sfx('cha-ching', at(2740), 0.3, 900), sfx('g-akward-sfx', at(8500), 0.34, 1500), sfx('g-ding-sfx', at(11520), 0.26, 1200)],
  boards: [{a: 9300, b: 12800, render: B_PATCH}], v3: V3, cta: 'Which patch would you rather pull?'});

const RIP = make({hookText: 'WE GO [ELECTRIC]', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: R(ntW), wideX: 900, top: 'How you open a box with [NO mistakes]',
  segs: [[29060, 31900], [16040, 19900], [20960, 23700], [36840, 41100], [42020, 45800]], hookSeat: 'W', music: 'acido-iii.mp3', from: 0, arrowAt: 30100,
  shots: [[16040, 'W'], [20960, 'M', 1.06], [29060, 'W'], [33640, 'M', 1.08], [36840, 'W'], [42020, 'M', 1.06]],
  hi: {electric: [Y, '1f525'], trevor: C, hands: RD, sweat: Y, corners: [RD, '1f6ab'], slide: G, back: RD, treasures: Y},
  sfx: (at) => [sfx('g-sudden-suspense-sound-effect', at(20960), 0.28, 1400), sfx('g-ding-sfx', at(41020), 0.26, 1200), sfx('g-anime-wow-sound-effect', at(44120), 0.3, 1800)],
  boards: [{a: 36840, b: 40340, render: B_RIP}], v3: V3, cta: 'Do you sweat your cards like this?'});

const RPA = make({hookText: 'TRUE RPA [GOLD]', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: R(ntW), wideX: 900, top: 'The card everyone chases… wait for [the name]',
  segs: [[96700, 98000], [88360, 90400], [91280, 94200], [95580, 98000], [103080, 105400], [112020, 114100], [119440, 123600]], hookSeat: 'W', music: 'kai-cenat-suspense.mp3', from: 0, arrowAt: 91300, flash: [122120, 'yellow'],
  shots: [[88360, 'W'], [91280, 'M'], [95580, 'M', 1.08], [103080, 'W'], [112020, 'M'], [119440, 'M', 1.1]],
  hi: {rpa: [Y, '1f3c6'], gold: Y, redemption: RD, woodson: C, chase: G, mills: C, fields: [C, '1f62e'], justin: C, god: Y},
  cutout: {src: 122300, file: 'img/jorho/fields.png', x: 640, y: 760, size: 500, dur: 1300},
  sfx: (at) => [sfx('g-riser-sound-effect-free', at(122120) - 5300, 0.3, 5400), sfx('g-anime-wow-sound-effect', at(122120), 0.4, 1800)],
  boards: [{a: 95580, b: 98000, render: B_RPA}], v3: V3, cta: 'Who did you think it was?'});

const REDEEM = make({hookText: 'THE HOBBY [HATES] THIS', src: 'pod2/u3_redemptions.mp4', track: T(redT), raw: R(redW), wideX: 700, top: 'Why your big hit shows up as an [IOU]',
  segs: [[24180, 27000], [8080, 13000], [17160, 23900], [28120, 33800]], hookSeat: 'M', music: 'midnight-club.mp3', from: 0, arrowAt: 13300, flash: [32460, 'green'],
  shots: [[8080, 'L'], [11300, 'M'], [17160, 'L'], [21000, 'M', 1.06], [28120, 'L'], [31280, 'M', 1.1]],
  hi: {redeem: Y, time: RD, dislike: [RD, '1f620'], hobby: Y, expensive: [G, '1f4b0'], sale: G, ever: G, packed: Y},
  sfx: (at) => [sfx('g-sudden-suspense-sound-effect', at(17160), 0.28, 1400), sfx('g-riser-sfx', at(31920) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(31920), 0.38, 1800)],
  boards: [{a: 17160, b: 20660, render: B_RED}], v3: V3, cta: 'Ever waited months on a redemption?'});

const PEN = make({hookText: 'THE [GOATED] PEN', src: 'pod/t1_tiger_auto_pen.mp4', track: T(antT), raw: R(antW), wideX: 760, top: 'Peyton Manning gave Trevor this [signature] advice',
  segs: [[25500, 27200], [20520, 25000], [27900, 29400], [30960, 39600]], hookSeat: 'M', music: 'zelda-ocarina.mp3', from: 0, arrowAt: 25600,
  shots: [[20520, 'L'], [25500, 'M', 1.06], [27900, 'M'], [30960, 'M', 1.08], [36000, 'M', 1.1]],
  hi: {goaded: [Y, '1f525'], goated: [Y, '1f525'], pen: Y, peyton: [C, '1f410'], manning: C, signature: G, consistent: G, beautiful: G, deal: Y},
  cutout: {src: 31360, file: 'img/jorho/peyton.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(31360) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(31360), 0.38, 1800), sfx('g-ding-sfx', at(38900), 0.26, 1200)],
  boards: [{a: 22460, b: 25000, render: B_SIG}], v3: V3, fix: {goaded: 'goated'}, cta: "Rate Trevor's signature 1 to 10"});

const TIGER = make({hookText: '"THAT\'S FOR [ME]?"', src: 'pod/t2_dream_golf_four.mp4', track: T(golfT), raw: R(golfW), wideX: 720, top: "He gave Trevor a card with Tiger's [actual shirt] in it",
  segs: [[105600, 106700], [82020, 90700], [97600, 102700], [103860, 108000]], hookSeat: 'M', music: 'joyful-chess-guide.mp3', from: 0, arrowAt: 105700, flash: [91060, 'green'],
  shots: [[79580, 'L'], [84080, 'L', 1.06], [91060, 'M', 1.1], [97600, 'L'], [103860, 'W'], [105600, 'M', 1.1]],
  hi: {tiger: [C, '26f3'], tigers: [C, '26f3'], worn: Y, patch: Y, auto: G, shirt: Y, glove: Y, cap: Y, golfer: [G, '1f525'], wow: G},
  cutout: {src: 86200, file: 'img/jorho/tiger.png', x: 640, y: 760, size: 500, dur: 1600},
  sfx: (at) => [sfx('g-anime-wow-sound-effect', at(86120), 0.38, 1800), sfx('cha-ching', at(91060), 0.28, 900), sfx('g-ding-sfx', at(107800), 0.26, 1200)],
  boards: [{a: 99600, b: 103100, render: B_TIGER}], v3: V3, cta: 'Would you give this card away?'});

const FLIP = make({hookText: 'BOUGHT FOR 10, NOW [20]', src: 'pod/t4_natty_ticket.mp4', track: T(tkT), raw: R(tkW), wideX: 960, top: 'Cards are basically [stocks] now',
  segs: [[2860, 4400], [700, 6100], [70060, 81500]], hookSeat: 'L', music: 'du-bist-gut-genug.mp3', from: 0, arrowAt: 1400, flash: [80420, 'green'],
  shots: [[700, 'L'], [2860, 'L', 1.08], [70060, 'L'], [74000, 'M'], [76200, 'L', 1.08], [79500, 'W']],
  hi: {hold: Y, '20': G, '10': Y, nfl: G, clemson: [Y, '1f3c6'], million: [G, '1f4b0'], hobby: C, '500': G},
  sfx: (at) => [sfx('cha-ching', at(4300), 0.3, 900), sfx('g-riser-sfx', at(80420) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(80420), 0.38, 1800)],
  boards: [{a: 76000, b: 79500, render: B_ONE}], v3: V3, cta: "What's your best card flip?"});

const JOSH = make({hookText: 'THE [OTHER] JOSH ALLEN', src: 'pod/t5_ex_teammate.mp4', track: T(exT), raw: R(exW), wideX: 960, top: "He pulled Josh Allen… but not [THAT] Josh Allen",
  segs: [[22360, 25500], [1660, 6000], [12580, 25500]], hookSeat: 'M', music: 'acido_1e6rXyW.mp3', from: 0, arrowAt: 12700, flash: [12580, 'yellow'],
  shots: [[1660, 'M'], [12580, 'L', 1.06], [16100, 'M'], [19140, 'L'], [22360, 'M', 1.1]],
  hi: {gold: [Y, '1f947'], allen: C, heinz: [G, '1f92f'], rookie: Y, fire: [RD, '1f525'], name: Y, real: G, prism: Y},
  cutout: {src: 22800, file: 'img/jorho/hines_allen.png', x: 660, y: 780, size: 480, dur: 1600},
  sfx: (at) => [sfx('g-riser-sfx', at(22360) - 2000, 0.28, 2100), sfx('g-anime-wow-sound-effect', at(22800), 0.38, 1800), sfx('g-akward-sfx', at(25000), 0.3, 1500)],
  boards: [{a: 19140, b: 22300, render: B_NAME}], v3: V3, cta: 'Did you know he changed his name?'});

const MARINO = make({hookText: 'HE COULD [RIP IT]', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: keep(ntW, [[70900, 73380]]), wideX: 900, top: 'Trevor pulled Dan Marino and could not stop [hyping] him',
  segs: [[67020, 71000], [53440, 60000], [62060, 74000]], hookSeat: 'M', music: 'montagem-alquimia.mp3', from: 0, arrowAt: 62400, flash: [62060, 'green'],
  shots: [[53440, 'W'], [56080, 'M', 1.06], [62060, 'L'], [65200, 'M'], [67000, 'L'], [69700, 'M', 1.1]],
  hi: {marino: [C, '1f410'], dan: C, rip: [G, '1f525'], sling: G, top: Y, '10': Y, god: Y, atwater: C, alexander: C, parsons: C},
  sfx: (at) => [sfx('g-ding-sfx', at(62060), 0.26, 1200), sfx('bass-boosted-vine-boom', at(70480), 0.3, 1200)],
  boards: [{a: 64800, b: 68300, render: B_TOP}], v3: V3, cta: 'Is Marino top 10 all time?'});

const FIELDS = make({hookText: '"WHAT IS IT [NOW]?"', src: 'b3/v_nt_rip.mp4', track: T(ntT), raw: keep(ntW, [[129300, 131400]]), wideX: 900, top: "Bro could've bought [26 PS5 Pros] with this card",
  segs: [[128660, 132600], [119440, 123700], [124480, 132600]], hookSeat: 'M', music: 'pixy-legacy.mp3', from: 0, arrowAt: 119500, flash: [131440, 'red'],
  shots: [[119440, 'W'], [122120, 'M', 1.1], [124480, 'W'], [128660, 'M', 1.06], [131000, 'M', 1.12]],
  hi: {fields: [C, '1f62e'], justin: C, '20000': [G, '1f4b0'], '500': [RD, '1f4c9'], bucks: RD, god: Y, now: RD},
  fix: {'000': '$20,000.', '20': ''},
  cutout: {src: 122300, file: 'img/jorho/fields.png', x: 640, y: 760, size: 500, dur: 1500},
  sfx: (at) => [sfx('g-anime-wow-sound-effect', at(122120), 0.38, 1800), sfx('g-sudden-suspense-sound-effect', at(129300), 0.3, 1400), sfx('g-fahhh-sfx', at(131600), 0.36, 1800)],
  boards: [{a: 129100, b: 132600, render: B_PS5}], v3: V3, cta: 'Sell at $20K or hold?'});

const C10 = {Patch: PATCH, Rip: RIP, Rpa: RPA, Redeem: REDEEM, Pen: PEN, Tiger: TIGER, Flip: FLIP, Josh: JOSH, Marino: MARINO, Fields: FIELDS};
export const B31 = Object.fromEntries(Object.entries(C10).map(([k, v]) => [k, () => <Jorho s={v.spec} />])) as Record<keyof typeof C10, () => React.ReactElement>;
export const B31_MS = Object.fromEntries(Object.entries(C10).map(([k, v]) => [k, v.total])) as Record<keyof typeof C10, number>;
