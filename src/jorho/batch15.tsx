// BATCH 15 (2026-11-14): 5 Jorho v2 TREVOR clips ("edit me 5 jorho v2"). Every Trevor moment has been cut before, so these are fresh
// RE-CUTS with new hooks (the 500K-view light edit proved a re-cut of a used moment can win). House rules as of today:
// VIRAL_WARM grade · cold open on the strongest line · end ON the payoff · calm (1–2 graphics, no flash) · music ~20 dB under the voice
// · SFX layer (record scratch on the cold-open cut, short whooshes, 1–2 meme SFX / awkward ding) snapped into speech gaps · label Trevor once.
import type {ReactNode} from 'react';
import {Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, pop, sfx, timeline, type TL} from '../e3/kit';
import {HeadRing, chunkWords, wordsFrom, type Word} from './kit';
import {Jorho, VIRAL_WARM, type Spec} from './clips';
import {StatBadge, TypedAction} from './v2';
import {speechDips} from '../campaigns/neon_clip/neon';
import peytonWords from '../plans/data/u4_peyton.words.json';
import peytonTrack from '../plans/data/u4_peyton.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
type Meme = [file: string, at: number, vol?: number, maxMs?: number];
const T = (x: unknown) => x as Track;
const at = (tl: TL) => (i: number, src: number) => tl.segOut[i] + src - tl.segs[i][0];
const inGap = (t: number, dips: [number, number][]) => { const w = dips.find(([a, b]) => t >= a && t < b); return w ? w[1] : t; };
const caps = (raw: Raw, tl: TL, fix: Record<string, string>, keys: Record<string, string>): Word[] =>
  chunkWords(tl.segs.flatMap((s, i) => wordsFrom(raw, timeline([[s[0], s[1]]]), fix, {}).map((w) => ({...w, at: w.at + tl.segOut[i],
    color: keys[w.text.replace(/[^A-Za-z0-9']/g, '')] ?? '#FFFFFF'}))), tl.total, tl.segOut, 180, 13);
const Emo = ({code, size}: {code: string; size: number}) => <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size}} />;

const v2 = (o: {tl: TL; src: string; track: Track; raw: Raw; top: string; wideX: number; keys: Record<string, string>; fix?: Record<string, string>;
  music: string; from: number; label: [number, number]; fah?: number; memes?: Meme[]; inBox?: (o: number) => ReactNode; gain?: number}): Spec => {
  const dips = speechDips(o.raw, o.tl);
  return {
    tl: o.tl, src: o.src, track: o.track, top: o.top, wordY: 1300, wideX: o.wideX, capSize: 66, grade: VIRAL_WARM, speechGain: o.gain,
    words: caps(o.raw, o.tl, o.fix ?? {}, o.keys), shots: [[0, 'W']], strobes: [], tints: [], swish: [],
    fah: o.fah !== undefined ? [o.fah + 40] : [], fahVol: 1.2,
    music: {file: o.music, from: o.from, level: 0, gain: 1, floor: 0.4, ramp: 150, dips},
    inBox: o.inBox,
    // label the celebrity ONCE, early, for casual scrollers (viral formula #3)
    overlay: (t, face) => { const f = face('M'); return <HeadRing o={t} a={o.label[0]} b={o.label[1]} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; },
    extraSfx: [sfx('record-scratch', o.tl.segOut[1] - 60, 0.2, 450),
      ...o.tl.segOut.slice(2).map((t) => sfx('fast-whoosh', t - 120, 0.14, 450)),
      ...(o.memes ?? []).map(([fl, t, v, m]) => sfx(fl, inGap(t, dips), v ?? 0.26, m ?? 900))],
  };
};

// ---- V1 · Peyton Manning called Trevor about his SIGNATURE (u4 1–20 s) -----------------------------------------------------------
// cold open "he's like, you know, it's a big deal to have a nice signature" → "ironically Peyton Manning did… he called me about something
// one time" (incoming-call card) → "you guys actually have a real relationship" → "we text throughout the season and check in, he's great".
const p1 = timeline([[6700, 9630], [1020, 11350], [11400, 14820], [14900, 20220]]);
const P1 = at(p1);
export const B15_SIG_MS = p1.total;
const CallCard = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const s = pop(o, a, 12, 230) * (1 - ease(o, b - 160, 160));
  return <div style={{position: 'absolute', left: 0, top: 50, width: 1080, display: 'flex', justifyContent: 'center', transform: `scale(${s})`}}>
    <div style={{background: 'rgba(28,28,30,0.92)', borderRadius: 34, padding: '18px 30px', display: 'flex', alignItems: 'center', gap: 22, boxShadow: '0 14px 30px rgba(0,0,0,0.5)'}}>
      <div style={{width: 84, height: 84, borderRadius: '50%', background: '#2b5ea8', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MONT, fontWeight: 900, fontSize: 36, color: 'white'}}>PM</div>
      <div><div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: 'white'}}>Peyton Manning</div>
        <div style={{fontFamily: MONT, fontWeight: 700, fontSize: 26, color: '#aaa'}}>incoming call…</div></div>
      <div style={{width: 76, height: 76, borderRadius: '50%', background: '#34C759', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `rotate(${Math.sin((o - a) / 60) * 12}deg)`}}><Emo code="1f4de" size={46} /></div>
    </div>
  </div>;
};
const SIG = v2({tl: p1, src: 'pod2/u4_peyton.mp4', track: T(peytonTrack), raw: peytonWords as Raw, top: 'Peyton Manning called Trevor about THIS', wideX: 700,
  keys: {Peyton: '#21F5E6', Manning: '#21F5E6', signature: '#F9FC35', big: '#F9FC35', deal: '#F9FC35', relationship: '#58EE28', text: '#58EE28'},
  music: 'experience-einaudi.mp3', from: 30000, label: [p1.segOut[1] + 200, p1.segOut[1] + 2200],
  memes: [['ja-ding', P1(2, 14450), 0.26, 1000]],
  inBox: (o) => <CallCard o={o} a={P1(1, 4100)} b={P1(1, 6700)} />});
export const B15Signature = () => <Jorho s={SIG} />;

// ---- V2 · who Trevor called when his rookie year went wrong (u4 20–50 s) ---------------------------------------------------------
// cold open "he had the league in interceptions too" (28 INTs badge) → "do you have a guy you look up to?… he was one of them, my rookie
// year…" → "during my rookie season I talked to him when it was not going well… he had some challenges early in his career in Indy".
const p2 = timeline([[47200, 50210], [20460, 29520], [37600, 46750]]);
const P2 = at(p2);
export const B15_ROOKIE_MS = p2.total;
const ROOKIE = v2({tl: p2, src: 'pod2/u4_peyton.mp4', track: T(peytonTrack), raw: peytonWords as Raw, top: 'Who Trevor called when his rookie year went wrong', wideX: 700,
  keys: {interceptions: '#FF4D4D', rookie: '#F9FC35', well: '#FF4D4D', challenges: '#FF4D4D', Indy: '#21F5E6', perspective: '#58EE28'},
  music: 'interstellar-piano.mp3', from: 20000, label: [p2.segOut[1] + 200, p2.segOut[1] + 2200],
  memes: [['ja-ding', P2(1, 26300), 0.24, 1000]],
  inBox: (o) => <>
    <StatBadge o={o} a={300} b={p2.segOut[1]} big="28 INTs" label="PEYTON'S ROOKIE YEAR · MOST IN THE NFL" x={40} y={40} />
    <TypedAction o={o} a={P2(2, 40700)} b={P2(2, 43000)} text="rookie year: 3-14" y={60} color="#FF4D4D" glow="rgba(255,77,77,0.5)" />
  </>});
export const B15Rookie = () => <Jorho s={ROOKIE} />;

// ---- V3 · "his auto looks like an ant" (t1 9–27 s) -------------------------------------------------------------------------------
// cold open "his auto looks like an ant" → "some hobby players have no respect… Anthony Richardson's, no disrespect… just an A and an R and
// it's like this big… that's no respect" (freeze + fahhh) → "not to mention it's so consistent… he's got a goated pen" (payoff).
const a3 = timeline([[15000, 16410], [9220, 20190, 900], [20440, 27350]]);
const A3 = at(a3);
export const B15_ANT_MS = a3.total;
const ANT = v2({tl: a3, src: 'pod/t1_tiger_auto_pen.mp4', track: T(antTrack), raw: antWords as Raw, top: 'His autograph looks like an ant', wideX: 760,
  keys: {ant: '#FF4D4D', respect: '#FF4D4D', Anthony: '#21F5E6', "Richardson's": '#21F5E6', goaded: '#58EE28', pen: '#58EE28', consistent: '#58EE28', beautiful: '#58EE28'},
  fix: {goaded: 'goated'}, music: 'Sneaky_Snitch.mp3', from: 12000, label: [a3.segOut[2] + 200, a3.segOut[2] + 2200], fah: A3(1, 20190),
  memes: [['vine-boom', a3.segOut[1] - 250, 0.26]],
  inBox: (o) => <TypedAction o={o} a={A3(1, 20190)} b={A3(1, 20190) + 1400} text="no disrespect" y={60} color="#FF4D4D" glow="rgba(255,77,77,0.5)" />});
export const B15Ant = () => <Jorho s={ANT} />;

// ---- V4 · Trevor has to learn HUNDREDS of plays (u1) -----------------------------------------------------------------------------
// cold open "which is hundreds of plays" → "how much does the playbook change week to week?" → "you're installing your entire offense…
// runs, pass concepts, play action, screens… everything" (counter) → "we might add a couple new plays, give or take 8 to 10 a week".
const b4 = timeline([[16800, 18380], [0, 4300], [14300, 24360], [48740, 54910]]);
const B4 = at(b4);
export const B15_PLAYBOOK_MS = b4.total;
const Counter = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const p = interpolate(o, [a, a + 2600], [0, 1], {...clamp, easing: (x) => 1 - (1 - x) ** 3});
  const done = p >= 1;
  return <div style={{position: 'absolute', left: 40, top: 40, opacity: 1 - ease(o, b - 160, 160), background: 'rgba(12,12,16,0.86)', borderRadius: 22, padding: '16px 28px',
    boxShadow: '0 14px 30px rgba(0,0,0,0.45)'}}>
    <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: '#bbb'}}>PLAYS INSTALLED</div>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 92, lineHeight: '100px', color: done ? '#58EE28' : 'white'}}>{done ? 'HUNDREDS' : Math.round(p * 300)}</div>
  </div>;
};
const PLAYBOOK = v2({tl: b4, src: 'pod2/u1_playbook.mp4', track: T(pbTrack), raw: pbWords as Raw, top: 'Trevor has to learn HUNDREDS of plays', wideX: 700,
  keys: {hundreds: '#F9FC35', plays: '#F9FC35', everything: '#58EE28', eight: '#58EE28', ten: '#58EE28', playbook: '#21F5E6'},
  music: 'Investigations.mp3', from: 5000, label: [b4.segOut[2] + 200, b4.segOut[2] + 2200],
  memes: [['ja-ding', B4(2, 23900), 0.24, 1000]],
  inBox: (o) => <>
    <Counter o={o} a={B4(2, 14600)} b={b4.segOut[3]} />
    <StatBadge o={o} a={B4(3, 52500)} b={b4.total} big="+8–10" label="NEW PLAYS A WEEK" x={40} y={40} />
  </>});
export const B15Playbook = () => <Jorho s={PLAYBOOK} />;

// ---- V5 · "coaches only want you to roll right" (t3 24–53 s) ---------------------------------------------------------------------
// cold open "I throw it a little better moving left than right" → kid coaches only do rollouts to your right… "I just hated that" (ding)
// → "so I threw way more going to my left… I don't want to be the guy that can only throw to his right" → "you're the best quarterback
// I've ever seen in my life" (payoff reaction).
const r5 = timeline([[47840, 50800], [24100, 33670], [33900, 39840], [50760, 52890]]);
const R5 = at(r5);
export const B15_LEFT_MS = r5.total;
const LEFT = v2({tl: r5, src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, top: "Why Trevor throws better going LEFT", wideX: 715,
  keys: {left: '#58EE28', right: '#FF4D4D', 'right.': '#FF4D4D', hated: '#FF4D4D', rollouts: '#F9FC35', best: '#58EE28', quarterback: '#58EE28'},
  music: 'joyful-chess-slowed.mp3', from: 8000, label: [r5.segOut[1] + 200, r5.segOut[1] + 2200],
  memes: [['ja-ding', R5(1, 33300), 0.26, 1000], ['anime-wow', r5.total - 1300, 0.2, 1200]],
  inBox: (o) => <TypedAction o={o} a={R5(1, 27000)} b={R5(1, 29100)} text="every coach: roll right" y={60} />});
export const B15Left = () => <Jorho s={LEFT} />;
