// BATCH 11 (2026-11-03): 5 more Trevor Lawrence clips in Jorho (normal), all moments never cut before.
// Hive mind, 2–3 per clip, no repeated combo: cut-outs, asterisk labels, iOS emoji pops, head circle + TREVOR LAWRENCE (+ ding),
// awkward ding, strobes / tints. No beep, no arrow. Music ≈ 14 dB under the voice, a different bed per clip.
import {Asterisk, GREEN, HeadRing, MemePop, RED, STROBE_CUT, wordsFrom} from './kit';
import {sfx, timeline} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';

type Track = Spec['track'];
const ring = (a: number, b: number) => (o: number, face: (w: 'L' | 'M' | 'R') => {x: number; y: number; k: number}) => {
  const f = face('M'); return <HeadRing o={o} a={a} b={b} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />;
};

// ---- 1 · u4 later part: Peyton got him through the rookie year ----------------------------------------------------------------
const r11 = timeline([[20540, 21960], [25580, 29000], [30000, 33100], [38120, 46400], [47160, 51450]]);
const R = {one: r11.out(25780), routine: r11.out(31060), during: r11.segOut[3], notWell: r11.out(41360), challenges: r11.out(44700), ints: r11.out(48740)};
export const J11_ROOKIE_MS = r11.total;
const ROOKIE: Spec = {
  tl: r11, src: 'pod2/u4_peyton.mp4', track: peytonTrack as unknown as Track, top: 'Peyton Manning got Trevor through his rookie year', wordY: 1170, wideX: 700,
  words: wordsFrom(peytonWords, r11, {Indy: 'Indy'}, {Peyton: '#21F5E6', rookie: '#F9FC35', interceptions: '#F9FC35'}),
  shots: [[0, 'W'], [R.one + 1500, 'M'], [R.during + STROBE_CUT, 'M'], [R.ints, 'W'], [R.ints + 1500, 'M']],
  strobes: [R.during], tints: [[R.one, GREEN], [R.notWell, RED], [R.ints, RED]], swish: [R.one, R.challenges],
  cut: {file: 'peyton.png', from: R.one, to: R.one + 1450, x: 270, h: 640},
  music: {file: 'experience-einaudi.mp3', from: 20000, level: 0},
  overlay: (o, face) => <>
    {ring(R.routine - 600, R.routine + 1500)(o, face)}
    <Asterisk o={o} a={R.notWell} b={R.notWell + 2600} text="rookie year: 3-14" y={470} color="#FF5A4E" />
    <Asterisk o={o} a={R.ints} b={R.ints + 2400} text="Peyton: 28 INTs as a rookie" y={470} size={48} />
  </>,
  extraSfx: [sfx('ding-2', R.routine - 600, 0.16)],
};
export const J11Rookie = () => <Jorho s={ROOKIE} />;

// ---- 2 · t2 later part: Tiger, then Chris Stapleton, shout-out to the parents ----------------------------------------------------
const s11 = timeline([[45450, 48450], [50400, 52200], [56240, 58700], [60480, 62240], [65920, 76300]]);
const S = {tiger: s11.out(48000), artist: s11.out(61260), fav: s11.out(66120), staple: s11.out(69020), chris: s11.out(70480), dad: s11.out(71680)};
export const J11_STAPLETON_MS = s11.total;
const STAPLETON: Spec = {
  tl: s11, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: 'Trevor wants Chris Stapleton in his golf foursome', wordY: 1150, wideX: 720,
  words: wordsFrom(golfWords, s11, {Cablepton: 'Stapleton'}, {Tiger: '#21F5E6', Stapleton: '#F9FC35', Chris: '#F9FC35', goat: '#58EE28'}),
  shots: [[0, 'M'], [s11.segOut[2], 'W'], [S.fav, 'M'], [S.chris, 'W'], [S.dad + 2600, 'M']],
  strobes: [S.staple - 120], tints: [[S.tiger, GREEN], [S.staple, GREEN], [S.dad, GREEN]], swish: [S.tiger, S.dad],
  cut: {file: 'tiger.png', from: S.tiger, to: s11.segOut[2] - 100, x: 290, h: 640},
  music: {file: 'lose-you-adturnup.mp3', from: 15000, level: 0},
  overlay: (o, face) => <>
    <MemePop o={o} at={S.staple} to={S.staple + 1300} src="emoji-ios/1f3a4.png" x={780} y={620} size={210} />
    {ring(S.staple - 900, S.staple - 50)(o, face)}
    <Asterisk o={o} a={S.dad} b={S.dad + 3000} text="shout out the parents" y={470} />
  </>,
  extraSfx: [sfx('jv2-pop-button', S.staple, 0.22), sfx('ding-2', S.staple - 900, 0.16)],
};
export const J11Stapleton = () => <Jorho s={STAPLETON} />;

// ---- 3 · t3 opening: "is that accuracy God-given?" ------------------------------------------------------------------------------
const g11 = timeline([[1760, 15800], [16200, 18900]]);
const Gv = {incredible: g11.out(2760), god: g11.out(5440), fifteen: g11.out(8500), def: g11.out(11660), better: g11.out(15220), worked: g11.out(17120)};
export const J11_GOD_MS = g11.total;
const GODGIVEN: Spec = {
  tl: g11, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: 'Is Trevor\'s accuracy a gift from God?', wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, g11, {uh: '', i: 'I', '-given': 'given'}, {God: '#F9FC35', given: '#F9FC35', definitely: '#58EE28', worked: '#58EE28'}),
  shots: [[0, 'W'], [Gv.god + STROBE_CUT, 'W'], [Gv.def - 400, 'M']],
  strobes: [Gv.god], tints: [[Gv.incredible, GREEN], [Gv.god + 400, GREEN], [Gv.worked, GREEN]], swish: [Gv.incredible, Gv.worked],
  music: {file: 'spooky-phonk-fennecxx.mp3', from: 0, level: 0},
  overlay: (o, face) => <>
    <MemePop o={o} at={Gv.god + 100} to={Gv.god + 1400} src="emoji-ios/1f64f.png" x={780} y={620} size={210} />
    <Asterisk o={o} a={Gv.fifteen} b={Gv.fifteen + 2200} text="15 rollouts in a row" y={470} />
    {ring(Gv.def, Gv.def + 2000)(o, face)}
  </>,
  extraSfx: [sfx('ding-2', Gv.def, 0.16)],
};
export const J11GodGiven = () => <Jorho s={GODGIVEN} />;

// ---- 4 · t4 later part: gifting yourself is weird → what he actually keeps (game-worn, closet) ----------------------------------
const c11 = timeline([[36320, 42050], [43360, 47500], [51220, 53000], [53840, 55800], [59020, 66050]]);
const K = {own: c11.out(41140), weird: c11.out(42000), ton: c11.out(46380), house: c11.out(51340), college: c11.out(55760), big: c11.out(60300), closet: c11.out(61680)};
export const J11_CLOSET_MS = c11.total;
const CLOSET: Spec = {
  tl: c11, src: 'pod/t4_natty_ticket.mp4', track: ticketTrack as unknown as Track, top: 'What Trevor actually keeps from his career', wordY: 1170, wideX: 760,
  words: wordsFrom(ticketWords, c11, {war: 'worn'}, {auto: '#F9FC35', weird: '#F9FC35', college: '#21F5E6', closet: '#58EE28'}),
  shots: [[0, 'W'], [c11.segOut[1], 'M'], [K.house, 'W'], [c11.segOut[3], 'M']],
  strobes: [c11.segOut[3]], tints: [[K.weird, RED], [K.big, GREEN], [K.closet, GREEN]], swish: [K.big],
  awkward: [{at: K.weird + 350}],
  music: {file: 'Monkeys_Spinning_Monkeys.mp3', from: 10000, level: 0},
  overlay: (o, face) => <>
    <MemePop o={o} at={K.weird} to={K.weird + 1300} src="emoji-ios/1f914.png" x={780} y={620} size={200} />
    <Asterisk o={o} a={K.ton} b={K.ton + 1900} text="signs these for fans" y={470} />
    {ring(c11.segOut[3] + 300, c11.segOut[3] + 2300)(o, face)}
    <MemePop o={o} at={K.big} to={K.big + 1400} src="emoji-ios/1f3c6.png" x={780} y={620} size={200} />
  </>,
  extraSfx: [sfx('ding-2', c11.segOut[3] + 300, 0.16), sfx('jv2-pop-button', K.big, 0.2)],
};
export const J11Closet = () => <Jorho s={CLOSET} />;

// ---- 5 · t3: the Traveling Trevors were all over his Instagram algorithm --------------------------------------------------------
const a11 = timeline([[66880, 77400], [85600, 90700], [93300, 96700], [105500, 109100]]);
const Al = {algo: a11.out(70820), insta: a11.out(71420), weird: a11.out(75040), giggle: a11.out(75880), soMany: a11.out(89920), playing: a11.out(96180), pumped: a11.out(106580)};
export const J11_ALGO_MS = a11.total;
const ALGO: Spec = {
  tl: a11, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: "The Traveling Trevors took over Trevor's Instagram", wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, a11, {uh: '', i: 'I', instagram: 'Instagram', "y'all": "y'all"}, {algorithm: '#F9FC35', Instagram: '#21F5E6', weird: '#F9FC35', pumped: '#58EE28'}),
  shots: [[0, 'M'], [Al.weird - 1200, 'W'], [a11.segOut[1], 'M'], [a11.segOut[3], 'W']],
  strobes: [a11.segOut[1]], tints: [[Al.algo, GREEN], [Al.giggle, GREEN], [Al.pumped, GREEN]], swish: [Al.algo, Al.pumped],
  awkward: [{at: Al.weird + 300}],
  music: {file: 'Investigations.mp3', from: 6000, level: 0},
  overlay: (o, face) => <>
    <MemePop o={o} at={Al.insta} to={Al.insta + 1500} src="emoji-ios/1f4f1.png" x={780} y={620} size={200} />
    <Asterisk o={o} a={Al.algo} b={Al.algo + 2300} text="the algorithm knew" y={470} />
    {ring(Al.soMany - 800, Al.soMany + 1200)(o, face)}
  </>,
  extraSfx: [sfx('jv2-pop-button', Al.insta, 0.2), sfx('ding-2', Al.soMany - 800, 0.16)],
};
export const J11Algo = () => <Jorho s={ALGO} />;
