// Jorho edits (v2 kit). Each clip: the ting on frame 0 under the intro reveal, a white strobe on the beat that
// carries a shot change, green tints with a swish on the names, a red tint on the laugh, one cut-out photo.
import type {ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import redeemWords from '../plans/data/u3_redemptions.words.json';
import redeemTrack from '../plans/data/u3_redemptions.seats.json';
import coenWords from '../plans/data/u6_coen_duo.words.json';
import coenTrack from '../plans/data/u6_coen_duo.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';
import joshWords from '../plans/data/t5_ex_teammate.words.json';
import joshTrack from '../plans/data/t5_ex_teammate.seats.json';
import cellyWords from '../plans/data/u2_psa10_celly.words.json';
import cellyTrack from '../plans/data/u2_psa10_celly.seats.json';
import ticketWords from '../plans/data/t4_natty_ticket.words.json';
import ticketTrack from '../plans/data/t4_natty_ticket.seats.json';
import entersWords from '../plans/data/u5_trevor_enters.words.json';
import entersTrack from '../plans/data/u5_trevor_enters.seats.json';
import {Cam, FPS, Music, SfxTrack, SpeechTrack, sfx, timeline, type CamCfg, type Seat, type Sfx, type TL, type Track} from '../e3/kit';
import {BOX_H, Cutout, Frame, GREEN, OneWord, RED, STROBE_CUT, Tints, strobe, wordsFrom, type Word} from './kit';

const GRADE = 'contrast(1.06) saturate(1.05)';
// Music sits a fixed 14 dB under the voice (voices measure ≈ −13.5 LUFS) so it never pulls focus (user, 2026-11-01).
// Gain per file from its measured loudness; the spec's `level` is ignored.
const MUSIC_LUFS: Record<string, number> = {'eclipser.mp3': -3.1, 'du-bist-full.mp3': -9.1, 'blue-yung-kai.mp3': -12.2, 'jorho-qkthr.mp3': -13.8, 'jorho-lullaby.mp3': -14.2};
const MUSIC_TARGET = -27.5;
const musicGain = (file: string) => Math.pow(10, (MUSIC_TARGET - (MUSIC_LUFS[file] ?? -12)) / 20);
const inAny = (s: number, spans: [number, number][]) => spans.some(([a, b]) => s >= a && s < b);
type Shot = [from: number, who: Seat]; // output time → framing (hard cuts only, like the refs)
const shotAt = (shots: Shot[], o: number) => shots.reduce<Seat>((w, [t, s]) => (o >= t ? s : w), 'W');

type Cut = {file: string; from: number; to: number; x: number; h: number};
export type Spec = {
  inBox?: (o: number) => ReactNode; extraSfx?: Sfx[]; capsOff?: [number, number][]; // Jorho v2: graphics inside the video box, extra sounds
  tl: TL; src: string; track: Track; top: string; words: Word[]; wordY: number; wideX: number; shots: Shot[];
  strobes: number[]; beeps?: number[]; tints: [number, string][]; swish: number[]; cut?: Cut; cuts?: Cut[];
  music: {file: string; from: number; level: number};
};
export const Jorho = ({s}: {s: Spec}) => {
  const frame = useCurrentFrame();
  const o = (frame / FPS) * 1000;
  // the shot list is in output time; Cam asks by source time, so keep a reverse lookup on the output clock
  const cam: CamCfg = {src: s.src, tl: s.tl, track: s.track, grade: GRADE, box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX: s.wideX,
    who: () => shotAt(s.shots, o)};
  return <Frame o={o} top={s.top}
    over={<>
      {!inAny(o, s.capsOff ?? []) && <OneWord o={o} words={s.words} y={s.wordY} />}
      <SpeechTrack src={s.src} tl={s.tl} />
      <Music file={s.music.file} songFrom={s.music.from} level={(t) => musicGain(s.music.file) * Math.min(1, (s.tl.total - t) / 400)} />
      <SfxTrack list={[
        sfx('jorho-ting', 0, 0.38),
        ...s.strobes.map((t) => sfx('jorho-flash', t, 0.45)),
        ...s.swish.map((t) => sfx('jorho-swish', t, 0.3)),
        ...(s.beeps ?? []).map((t) => sfx('jorho-beep', t, 0.25)),
        ...(s.extraSfx ?? []),
      ]} />
    </>}>
    <AbsoluteFill style={{filter: strobe(o, s.strobes) || undefined}}>
      <Cam c={cam} o={o} />
      {[...(s.cut ? [s.cut] : []), ...(s.cuts ?? [])].map((c) => <Cutout key={c.file} o={o} {...c} />)}
    </AbsoluteFill>
    {s.inBox?.(o)}
    <Tints o={o} list={s.tints} />
  </Frame>;
};

// ---- u4 · "Peyton Manning called me about my signature" --------------------------------------------------------
const pTl = timeline([[1000, 1620, 480], [1620, 2300], [2700, 7100], [7700, 9500], [11300, 13050], [13600, 14450], [14800, 19950]]);
export const PEYTON_MS = pTl.total;
const P = {peyton: pTl.out(1680), called: pTl.out(4440), nice: pTl.out(9040), real: pTl.out(12420), text: pTl.out(17640), great: pTl.out(19640)};
const PEYTON: Spec = {
  tl: pTl, src: 'pod2/u4_peyton.mp4', track: peytonTrack as unknown as Track, top: 'Imagine having Peyton Manning on speed dial', wordY: 1170, wideX: 700,
  words: wordsFrom(peytonWords, pTl, {}, {Peyton: '#21F5E6', Manning: '#21F5E6'}),
  shots: [[0, 'W'], [P.called + STROBE_CUT, 'M'], [pTl.segOut[3], 'W'], [pTl.segOut[4], 'L'], [pTl.segOut[5], 'W'], [pTl.segOut[6], 'M'], [P.text - 240 + STROBE_CUT, 'W']],
  strobes: [P.called, P.text - 240],
  beeps: [pTl.segOut[0] + 620],
  tints: [[P.peyton, GREEN], [P.nice, GREEN], [P.real, RED], [P.great, GREEN]],
  swish: [P.peyton, P.nice, P.great],
  cut: {file: 'peyton.png', from: P.peyton, to: P.called - 120, x: 270, h: 640},
  music: {file: 'blue-yung-kai.mp3', from: 37240 - P.called, level: 0.33},
};
export const JorhoPeyton = () => <Jorho s={PEYTON} />;

// ---- t2 · "dream golf foursome: throw Jesus in there … Tiger, the goat" ----------------------------------------
const gTl = timeline([[11250, 13900], [16820, 18500], [32200, 33440, 480], [33440, 34150], [34750, 35700], [45450, 48450], [50400, 54400]]);
export const GOLF_MS = gTl.total;
const G = {dream: gTl.out(12380), humans: gTl.out(17740), jesus: gTl.out(33460), like: gTl.out(34780), tiger: gTl.out(48000), world: gTl.out(52140),
  heIs: gTl.out(52760)};
const GOLF: Spec = {
  tl: gTl, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: "Trevor's dream golf foursome is undefeated", wordY: 1150, wideX: 720,
  words: wordsFrom(golfWords, gTl, {for: 'four', '-time': 'time'}, {Jesus: '#F9FC35', Tiger: '#21F5E6', goat: '#58EE28'}),
  shots: [[0, 'W'], [gTl.segOut[2], 'L'], [G.jesus + STROBE_CUT, 'M'], [gTl.segOut[5], 'W'], [G.heIs - 200 + STROBE_CUT, 'M']],
  strobes: [G.jesus, G.heIs - 200],
  beeps: [gTl.segOut[2] + 1240],
  tints: [[G.dream, GREEN], [G.humans, GREEN], [G.like, RED], [G.tiger, GREEN]],
  swish: [G.dream, G.humans, G.tiger],
  cut: {file: 'tiger.png', from: G.tiger, to: G.world + 250, x: 290, h: 640},
  music: {file: 'du-bist-full.mp3', from: 42050 - G.jesus, level: 0.32},
};
export const JorhoGolf = () => <Jorho s={GOLF} />;

// ---- u3 · "this card was $20,000… what is it now? 500 bucks maybe" ---------------------------------------------
const rTl = timeline([[0, 1780], [1780, 2900, 480], [2900, 6000], [7000, 9600], [27050, 27900], [28950, 33700]]);
export const REDEEM_MS = rTl.total;
const RD = {k20: rTl.out(1140), d200: rTl.segOut[2], maybe: rTl.out(5520), redeem: rTl.out(8840), sale: rTl.out(32460) - 200};
const REDEEM: Spec = {
  tl: rTl, src: 'pod2/u3_redemptions.mp4', track: redeemTrack as unknown as Track, top: 'Imagine your card going from $20,000 to $500', wordY: 1160, wideX: 700,
  words: wordsFrom(redeemWords, rTl, {'20': '$20,000', '000': '', '200': '$200?', '500': '$500'}, {'$20,000': '#58EE28', '$500': '#F9FC35', redeem: '#21F5E6'}),
  shots: [[0, 'W'], [RD.d200 + STROBE_CUT, 'M'], [rTl.segOut[3], 'R'], [rTl.segOut[4], 'M'], [rTl.segOut[5], 'W'], [RD.sale + STROBE_CUT, 'M']],
  strobes: [RD.d200, RD.sale],
  beeps: [rTl.segOut[1] + 1120],
  tints: [[RD.k20, GREEN], [RD.maybe, RED], [RD.redeem, GREEN]],
  swish: [RD.k20, RD.redeem],
  music: {file: 'du-bist-full.mp3', from: 42050 - RD.d200, level: 0.32},
};
export const JorhoRedeem = () => <Jorho s={REDEEM} />;

// ---- u6 · "Liam Coen has taught me more in this past year than my whole football life" ---------------------------
const cTl = timeline([[4700, 6500, 480], [6500, 7900], [11400, 17950], [18300, 23000]]);
export const COEN_MS = cTl.total;
const C = {liam: cTl.segOut[1], taught: cTl.out(7280), life: cTl.out(14800), why: cTl.out(17240), yeah: cTl.segOut[3], half: cTl.out(21680)};
const COEN: Spec = {
  tl: cTl, src: 'pod2/u6_coen_duo.mp4', track: coenTrack as unknown as Track, top: "Liam Coen really changed Trevor's whole game fr", wordY: 1160, wideX: 690,
  words: wordsFrom(coenWords, cTl, {Cohen: 'Coen'}, {Liam: '#21F5E6', Coen: '#21F5E6', definitely: '#58EE28'}),
  shots: [[0, 'W'], [C.liam + STROBE_CUT, 'L'], [cTl.segOut[2], 'W'], [C.yeah + STROBE_CUT, 'M']],
  strobes: [C.liam, C.yeah],
  beeps: [cTl.segOut[0] + 1800],
  tints: [[C.liam + STROBE_CUT, GREEN], [C.taught, GREEN], [C.life, GREEN], [C.why, RED], [C.half, GREEN]],
  swish: [C.liam + STROBE_CUT, C.taught, C.life, C.half],
  cut: {file: 'coen.png', from: C.liam + STROBE_CUT, to: C.life - 300, x: 250, h: 640},
  music: {file: 'blue-yung-kai.mp3', from: 37240 - C.yeah, level: 0.33},
};
export const JorhoCoen = () => <Jorho s={COEN} />;

// ---- t1 · "you have a goated pen … have you ever seen [beep] Anthony Richardson's? His auto looks like an ant" -------
const aTl = timeline([[3400, 4980], [9340, 12020], [12160, 12750, 480], [12750, 25260], [25500, 27400]]);
export const ANT_MS = aTl.total;
const A = {goated: aTl.out(3960), anthony: aTl.segOut[3], haveNt: aTl.out(14700), auto: aTl.out(14980), ant: aTl.out(16160),
  big: aTl.out(19020), mention: aTl.out(20640), consistent: aTl.out(21540), look: aTl.out(23860), goated2: aTl.out(26900)};
const ANT: Spec = {
  tl: aTl, src: 'pod/t1_tiger_auto_pen.mp4', track: antTrack as unknown as Track, top: 'Bro said his autograph looks like an ant', wordY: 1170, wideX: 760,
  words: wordsFrom(antWords, aTl, {goaded: 'goated', "Richardson's": 'Richardson'}, {Anthony: '#21F5E6', Richardson: '#21F5E6', ant: '#F9FC35', goated: '#58EE28'}),
  shots: [[0, 'W'], [aTl.segOut[1], 'M'], [A.anthony + STROBE_CUT, 'L'], [A.haveNt, 'M'], [A.auto, 'L'], [A.big + STROBE_CUT, 'W'], [A.mention, 'R'],
    [A.look, 'M'], [aTl.segOut[4], 'W']],
  strobes: [A.anthony, A.big],
  beeps: [aTl.segOut[2] + 590],
  tints: [[A.goated, GREEN], [A.anthony + STROBE_CUT, GREEN], [A.ant, RED], [A.consistent, GREEN], [A.goated2, GREEN]],
  swish: [A.goated, A.anthony + STROBE_CUT, A.consistent, A.goated2],
  cut: {file: 'richardson.png', from: A.anthony + STROBE_CUT, to: A.ant + 700, x: 610, h: 500},
  music: {file: 'du-bist-full.mp3', from: 42051 - A.anthony, level: 0.32},
};
export const JorhoAnt = () => <Jorho s={ANT} />;

// ---- t5 · "Josh Allen, true gold … that's not rookie Josh Allen, that is the real Josh Hines-Allen" ----------------
const jTl = timeline([[1660, 4900], [10600, 12520, 480], [12520, 16800], [18100, 25640]]);
export const JOSH_MS = jTl.total;
const J = {gold: jTl.out(2580), josh: jTl.segOut[2], fire: jTl.out(16400), rookie: jTl.out(18500), not: jTl.out(19380), real: jTl.out(22040),
  hines: jTl.out(22800), changed: jTl.out(24840)};
const JOSH: Spec = {
  tl: jTl, src: 'pod/t5_ex_teammate.mp4', track: joshTrack as unknown as Track, top: "Pulled Josh Allen but it's the wrong Josh Allen", wordY: 1170, wideX: 820,
  words: wordsFrom(joshWords, jTl, {Heinz: 'Hines'}, {Josh: '#21F5E6', Allen: '#21F5E6', Hines: '#58EE28', gold: '#F9FC35'}),
  shots: [[0, 'W'], [J.josh + STROBE_CUT, 'M'], [jTl.out(15120), 'W'], [jTl.segOut[3], 'M'], [J.real + STROBE_CUT, 'W'], [J.changed, 'M']],
  strobes: [J.josh, J.real],
  beeps: [jTl.segOut[1] + 1920],
  tints: [[J.gold, GREEN], [J.josh + STROBE_CUT, GREEN], [J.fire, GREEN], [J.not, RED], [J.hines, GREEN]],
  swish: [J.gold, J.josh + STROBE_CUT, J.fire, J.hines],
  cuts: [{file: 'josh_allen.png', from: J.josh + STROBE_CUT, to: J.not + 300, x: 640, h: 520},
    {file: 'hines_allen.png', from: J.hines, to: J.changed + 500, x: 560, h: 420}],
  music: {file: 'du-bist-full.mp3', from: 83336 - J.josh, level: 0.32},
};
export const JorhoJosh = () => <Jorho s={JOSH} />;

// ---- t3 · "everybody knows the Traveling Trevors… I was like these guys are [beep] whacked … we need more Jags fans" --
const tTl = timeline([[59480, 63040], [64360, 66720], [77860, 83040, 480], [83040, 84200], [91560, 92900], [96990, 98440], [99990, 105440]]);
export const TRAV_MS = tTl.total;
const T = {trav: tTl.out(60340), videos: tTl.out(65080), dude: tTl.out(81480), whacked: tTl.segOut[3], second: tTl.segOut[4], funny: tTl.out(97920),
  jags: tTl.out(100740), about: tTl.out(104100)};
const TRAV: Spec = {
  tl: tTl, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: "Trevor's first thoughts on the Traveling Trevors", wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, tTl, {uh: '', trevers: 'Trevors', traveling: 'Traveling', i: 'I', Jax: 'Jags', whacked: 'whacked'},
    {Traveling: '#21F5E6', Trevors: '#21F5E6', whacked: '#F9FC35', funny: '#58EE28', Jags: '#58EE28'})
    .filter((w) => !(w.at >= tTl.segOut[3] + 200 && w.at < tTl.segOut[4])), // no caption over the laugh
  shots: [[0, 'W'], [tTl.out(59800), 'L'], [tTl.segOut[1], 'M'], [tTl.segOut[2], 'W'], [T.dude, 'M'], [T.whacked + STROBE_CUT, 'W'], [T.second, 'M'],
    [T.jags + STROBE_CUT, 'W'], [T.about, 'M']],
  strobes: [T.whacked, T.jags],
  beeps: [tTl.segOut[2] + 5180],
  tints: [[T.trav, GREEN], [T.videos, GREEN], [T.whacked + 420, RED], [T.funny, GREEN], [T.jags + STROBE_CUT, GREEN]],
  swish: [T.trav, T.videos, T.funny, T.jags + STROBE_CUT],
  music: {file: 'blue-yung-kai.mp3', from: 37245 - T.whacked, level: 0.33},
};
export const JorhoTrav = () => <Jorho s={TRAV} />;

// ================= batch 5 (2026-11-01): 3 new clips + 2 new moments from clips used before =====================
// ---- t3 (first half) · "coaches only roll you right… so I threw way more going to my [beep] left" ----------------------
const lTl = timeline([[16200, 18900], [22400, 23760], [25700, 31260], [32050, 33300], [33820, 36040, 480], [36040, 36520], [44780, 46300],
  [46700, 50600], [50800, 52800]]);
export const LEFTY_J_MS = lTl.total;
const L = {kid: lTl.out(18080), right: lTl.out(28740), hated: lTl.out(32800), left: lTl.segOut[5], better: lTl.out(48840), best: lTl.segOut[8]};
const LEFTY: Spec = {
  tl: lTl, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: 'Trevor trained himself to throw better going left', wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, lTl, {}, {left: '#58EE28', right: '#F9FC35', hated: '#21F5E6', best: '#58EE28'}),
  shots: [[0, 'M'], [lTl.segOut[2], 'W'], [lTl.segOut[3], 'M'], [L.left + STROBE_CUT, 'W'], [lTl.segOut[6], 'M'], [L.best + STROBE_CUT, 'L']],
  strobes: [L.left, L.best],
  beeps: [lTl.segOut[4] + 2220],
  tints: [[L.kid, GREEN], [L.hated, RED], [L.left + STROBE_CUT, GREEN], [L.better, GREEN]],
  swish: [L.kid, L.left + STROBE_CUT, L.better],
  music: {file: 'jorho-qkthr.mp3', from: 28003 - L.left, level: 0.42}, // user track (2026-11-01)
};
export const JorhoLefty = () => <Jorho s={LEFTY} />;

// ---- t4 · "a signed ticket from your [beep] national championship game… that's for me?" ---------------------------------
const kTl = timeline([[9780, 11500], [12300, 13660], [14340, 17300], [21520, 23930, 480], [23930, 29000], [29400, 29800], [31800, 33300], [35500, 36100]]);
export const TICKET_J_MS = kTl.total;
const K2 = {gift: kTl.out(11260), weird: kTl.out(14680), national: kTl.segOut[4], mvp: kTl.out(25680), forMe: kTl.segOut[6], thank: kTl.out(33120),
  awesome: kTl.segOut[7]};
const TICKET: Spec = {
  tl: kTl, src: 'pod/t4_natty_ticket.mp4', track: ticketTrack as unknown as Track, top: 'Gifting Trevor a ticket to his own natty game', wordY: 1170, wideX: 760,
  words: wordsFrom(ticketWords, kTl, {}, {gift: '#58EE28', national: '#21F5E6', championship: '#21F5E6', MVP: '#F9FC35', Clemson: '#58EE28'}),
  shots: [[0, 'W'], [kTl.segOut[2], 'M'], [kTl.segOut[3], 'W'], [K2.national + STROBE_CUT, 'M'], [kTl.segOut[5], 'W'], [K2.forMe, 'M'], [K2.awesome - 240 + STROBE_CUT, 'W']],
  strobes: [K2.national, K2.awesome - 240],
  beeps: [kTl.segOut[3] + 2410],
  tints: [[K2.gift, GREEN], [K2.weird, RED], [K2.national + STROBE_CUT, GREEN], [K2.mvp, GREEN], [K2.thank, GREEN]],
  swish: [K2.gift, K2.national + STROBE_CUT, K2.mvp, K2.thank],
  music: {file: 'jorho-lullaby.mp3', from: 59977 - K2.national, level: 0.42}, // user track (2026-11-01)
};
export const JorhoTicket = () => <Jorho s={TICKET} />;

// ---- u2 · "you get a [beep] PSA 10… you point and go 10, 10, 10" -----------------------------------------------------
const yTl = timeline([[3940, 8100], [8380, 9000], [9480, 11500], [16800, 18200], [20800, 22640, 480], [22640, 25400], [25480, 28200], [28600, 29700],
  [30700, 31500], [31900, 32600]]);
export const CELLY_J_MS = yTl.total;
const Y = {celly: yTl.out(5200), maybe: yTl.segOut[1], psa: yTl.segOut[5], ten: yTl.out(27580), easy: yTl.out(28660), like: yTl.segOut[8], yo: yTl.segOut[9]};
const CELLY: Spec = {
  tl: yTl, src: 'pod2/u2_psa10_celly.mp4', track: cellyTrack as unknown as Track, top: "Trevor's new touchdown celly is a PSA 10 fr", wordY: 1170, wideX: 760,
  words: wordsFrom(cellyWords, yTl, {selly: 'celly', '1010': '10', tutti: 'TD'}, {celly: '#58EE28', touchdown: '#58EE28', PSA: '#21F5E6', '10': '#F9FC35'}),
  shots: [[0, 'W'], [Y.maybe, 'M'], [yTl.segOut[2], 'W'], [Y.psa + STROBE_CUT, 'M'], [yTl.segOut[6], 'W'], [Y.ten + STROBE_CUT, 'M'], [Y.like, 'W']],
  strobes: [Y.psa, Y.ten],
  beeps: [yTl.segOut[4] + 1840],
  tints: [[Y.celly, GREEN], [Y.maybe, RED], [Y.psa + STROBE_CUT, GREEN], [Y.easy, GREEN], [Y.yo, GREEN]],
  swish: [Y.celly, Y.psa + STROBE_CUT, Y.easy, Y.yo],
  music: {file: 'jorho-lullaby.mp3', from: 120465 - Y.psa, level: 0.42}, // user pick (2026-11-01); later section than JorhoTicket
};
export const JorhoCelly = () => <Jorho s={CELLY} />;

// ---- t2 (later) · "I've had this in my PC for four years… exquisite, [beep] Tiger, game-worn patch auto" -----------------
const gT = timeline([[76800, 81300], [82000, 86060, 480], [86060, 91400], [97560, 102940], [105580, 108300]]);
export const TIGER_J_MS = gT.total;
const TG = {gifts: gT.out(78900), four: gT.out(83400), tiger: gT.segOut[2], auto: gT.out(88880), wow: gT.out(102500), golfer: gT.out(107800)};
const TIGERGIFT: Spec = {
  tl: gT, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: 'Imagine getting this as a gift for being a golfer', wordY: 1150, wideX: 720,
  words: wordsFrom(golfWords, gT, {'-5': '9.5', '9': ''}, {Tiger: '#21F5E6', Game: '#58EE28', worn: '#58EE28', Auto: '#F9FC35', golfer: '#58EE28'}),
  shots: [[0, 'W'], [gT.segOut[1], 'L'], [TG.tiger + STROBE_CUT, 'M'], [gT.segOut[3], 'W'], [gT.segOut[4], 'M']],
  strobes: [TG.tiger, gT.segOut[4]],
  beeps: [gT.segOut[1] + 4060],
  tints: [[TG.gifts, GREEN], [TG.tiger + STROBE_CUT, GREEN], [TG.auto, GREEN], [TG.wow, GREEN], [TG.golfer + 300, RED]],
  swish: [TG.gifts, TG.tiger + STROBE_CUT, TG.auto, TG.wow],
  cut: {file: 'tiger.png', from: TG.tiger + STROBE_CUT, to: gT.segOut[3] - 200, x: 600, h: 520},
  music: {file: 'blue-yung-kai.mp3', from: 60209 - TG.tiger, level: 0.33},
};
export const JorhoTigerGift = () => <Jorho s={TIGERGIFT} />;

// ---- u5 · "All hail the king" ×3 … [beep] "Boys." (13.8 s source → freeze holds bring it to 15 s) ------------------------
const eTl = timeline([[0, 9800, 480], [9800, 13500, 1160]]);
export const ENTERS_J_MS = eTl.total;
const EN = {king1: eTl.out(1460), king2: eTl.out(3960), king3: eTl.out(6280), boys: eTl.segOut[1] + 40, here: eTl.out(12820)};
const ENTERS: Spec = {
  tl: eTl, src: 'pod2/u5_trevor_enters.mp4', track: entersTrack as unknown as Track, top: 'When Trevor Lawrence walks into your stream', wordY: 1170, wideX: 960,
  words: wordsFrom(entersWords, eTl, {}, {king: '#F9FC35', Boys: '#58EE28'}),
  shots: [[0, 'W'], [EN.king2 + STROBE_CUT, 'M'], [EN.king3, 'W'], [EN.boys + STROBE_CUT, 'M']],
  strobes: [EN.king2, EN.boys],
  beeps: [eTl.segOut[0] + 9800],
  tints: [[EN.king1, GREEN], [EN.king3, GREEN], [EN.boys + STROBE_CUT, GREEN], [EN.here, GREEN]],
  swish: [EN.king1, EN.king3, EN.boys + STROBE_CUT],
  music: {file: 'du-bist-full.mp3', from: 90093 - EN.king2, level: 0.32},
};
export const JorhoEnters = () => <Jorho s={ENTERS} />;
