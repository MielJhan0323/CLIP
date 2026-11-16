// BATCH 21 (2026-11-16): 3 BYB clips. User: "also byb make it what we've done with a little bit of podcast" → the batch-20 recipe
// (hook graphic over the cold open, diagram, key-word colours + emoji, beats, arrow/circle once) on 2 break-table moments + 1 podcast
// moment. Every moment chosen for a line that can open the clip ("choose clips that can hook the audience").
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {ease, pop, sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {make} from './batch17';
import {HC} from './hi';
import rgWords from '../plans/data/v_rogers_realm.words.json';
import rgTrack from '../plans/data/v_rogers_realm.seats.json';
import lrWords from '../plans/data/v_lair.words.json';
import lrTrack from '../plans/data/v_lair.seats.json';
import pyWords from '../plans/data/u4_peyton.words.json';
import pyTrack from '../plans/data/u4_peyton.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const {green: G, yellow: Y, cyan: C, red: R, orange: O} = HC;
const Over = ({o, a, b, children}: {o: number; a: number; b: number; children: ReactNode}) => (o < a || o >= b ? null :
  <AbsoluteFill style={{opacity: Math.min(a <= 0 ? 1 : ease(o, a, 200), 1 - ease(o, b - 200, 200)), background: 'rgba(8,10,14,0.66)'}}>{children}</AbsoluteFill>);
const Head = ({text, top = 110}: {text: string; top?: number}) => <div style={{position: 'absolute', left: 60, right: 60, top, fontFamily: MONT, fontWeight: 900, fontSize: 54, color: 'white', lineHeight: '62px'}}>{text}</div>;

// Traveling Trevors vs "Rodgers' realm": crowd-noise bars at the Eagles game, then the Steelers matchup card
const FanBars = ({o, a, vsAt}: {o: number; a: number; vsAt: number}) => {
  const bar = (y: number, d: number, w: number, label: string, col: string) => <div style={{position: 'absolute', left: 70, top: y}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 36, color: 'white', marginBottom: 10}}>{label}</div>
    <div style={{width: w * ease(o, a + d, 700), height: 70, borderRadius: 35, background: col, boxShadow: `0 0 18px ${col}`}} /></div>;
  return <>{o < vsAt ? <><Head text="LOUDEST AT THE EAGLES GAME" />
      {bar(280, 0, 900, 'THE OTHER TEAM', R)}{bar(470, 250, 520, 'JAGS FANS', C)}</>
    : <><Head text="NEXT: THE STEELERS GAME" />
      <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, transform: `scale(${pop(o, vsAt, 11, 240)})`}}>
        <div style={{width: 360, padding: '40px 0', borderRadius: 26, background: '#0b6b6b', textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 44, color: 'white'}}>TRAVELING<br />TREVORS</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 80, color: Y}}>VS</div>
        <div style={{width: 360, padding: '40px 0', borderRadius: 26, background: '#111', border: '6px solid #FFB612', textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#FFB612'}}>RODGERS'<br />REALM</div>
      </div></>}</>;
};
// Florida: Jacksonville → Fort Lauderdale ("the lair")
const FloridaMap = ({o, a}: {o: number; a: number}) => {
  const p = ease(o, a + 300, 900);
  return <><Head text="OFF-SEASON PLAN?" />
    <svg width={1080} height={1000} style={{position: 'absolute', left: 0, top: 120}}>
      <path d="M 300 120 L 520 120 L 540 160 L 640 170 L 700 260 L 760 420 L 800 560 L 820 700 L 780 820 L 720 840 L 660 760 L 600 640 L 560 520 L 500 420 L 470 300 L 380 230 L 290 200 Z"
        fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth={5} />
      <path d="M 600 180 Q 780 420 760 700" fill="none" stroke={Y} strokeWidth={10} strokeDasharray="22 16" pathLength={1} strokeDashoffset={0} opacity={p} />
      <circle cx={600} cy={180} r={22} fill={C} /><circle cx={760} cy={700} r={30 * Math.min(1, p * 1.5)} fill={G} />
    </svg>
    <div style={{position: 'absolute', left: 640, top: 270, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: C}}>JACKSONVILLE</div>
    {p > 0.7 && <div style={{position: 'absolute', left: 260, top: 780, fontFamily: MONT, fontWeight: 900, fontSize: 52, color: G, transform: `scale(${pop(o, a + 900, 10, 260)})`}}>
      FORT LAUDERDALE = THE LAIR <Img src={staticFile('emoji-ios/1f4cd.png')} style={{width: 56, height: 56, verticalAlign: '-8px'}} /></div>}
  </>;
};
// Peyton's signature advice card
const SigCard = ({o, a, signAt}: {o: number; a: number; signAt: number}) => {
  const p = ease(o, a, 400);
  return <><Head text="PEYTON MANNING'S ADVICE" />
    <div style={{position: 'absolute', left: 120, top: 260, width: 840, height: 460, borderRadius: 28, background: '#fbf8f1', transform: `rotate(${-2 + 2 * p}deg) translateY(${(1 - p) * 60}px)`,
      opacity: p, boxShadow: '0 18px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 46, color: '#111', textAlign: 'center', lineHeight: '56px'}}>"IT'S A BIG DEAL TO HAVE<br />A NICE SIGNATURE"</div>
      {o >= signAt && <div style={{fontFamily: '"Brush Script MT", cursive', fontSize: 110, color: '#1a3d8f', marginTop: 20, transform: `scale(${pop(o, signAt, 11, 240)}) rotate(-6deg)`}}>Trevor Lawrence</div>}
    </div>
    {o >= signAt + 500 && <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 56, color: G,
      transform: `scale(${pop(o, signAt + 500, 10, 260)})`}}>= THE GOATED PEN <Img src={staticFile('emoji-ios/270d.png')} style={{width: 60, height: 60, verticalAlign: '-8px'}} /></div>}
  </>;
};

// 1 · break table: the other team was louder at the Eagles game → "Traveling Trevor, Rodgers realm" for Steelers
const ROGERS = make({mark: 'circle', src: 'b3/v_rogers_realm.mp4', track: T(rgTrack), raw: rgWords as Raw, wideX: 760, top: 'The Traveling Trevors vs Rodgers\' realm',
  segs: [[17500, 20300], [0, 4300], [5300, 6000], [9200, 13400], [13500, 16800], [17500, 20300]], hookSeat: 'W', music: 'funk-abnormal.mp3', from: 0, arrowAt: 12900,
  shots: [[0, 'L'], [3800, 'M'], [5300, 'W'], [9200, 'L'], [12800, 'M', 1.06], [13500, 'R'], [17500, 'W']], flash: [12800, 'green'],
  fix: {Rogers: 'Rodgers'}, hi: {jags: C, eagles: [G, '1f4e3'], insane: [R, '1f92f'], nuts: R, steelers: Y, rodgers: [Y, '1f451'], realm: Y, traveling: C, trevor: C, box: [R, '1f94a'], happen: G},
  hook: (o) => <Over o={o} a={0} b={1e9}><FanBars o={o} a={-2000} vsAt={0} /></Over>, capsOff: [[1, 4300], [9200, 11400]],
  inBox: (o, at) => <><Over o={o} a={at(1)} b={at(4300)}><FanBars o={o} a={at(1)} vsAt={1e9} /></Over><Over o={o} a={at(9200)} b={at(11400)}><FanBars o={o} a={0} vsAt={at(9200)} /></Over></>,
  sfx: (at) => [sfx('mg-swoosh', at(1), 0.14, 500), sfx('mg-swoosh', at(9200), 0.14, 500)]});
// 2 · break table: would you come back to the lair in the off-season → "you guys are always welcome"
const LAIR = make({src: 'b3/v_lair.mp4', track: T(lrTrack), raw: lrWords as Raw, wideX: 760, top: 'Asked Trevor to come back to the lair',
  segs: [[14200, 16100], [3600, 5300], [5500, 9100], [10300, 13800], [14200, 17500], [17300, 19000]], hookSeat: 'M', music: 'joyful-chess-guide.mp3', from: 0, arrowAt: 14300,
  shots: [[3600, 'M'], [5500, 'L'], [9800, 'M'], [10300, 'L'], [14200, 'M'], [17300, 'W']], flash: [15400, 'green'],
  fix: {layer: 'lair'}, hi: {lair: [Y, '1f3dd-fe0f'], florida: O, fort: O, lauderdale: [O, '1f4cd'], rip: G, product: G, chill: [C, '1f60e'], awesome: [G, '1f525'], welcome: [G, '1f91d'], jacksonville: C, '100%': [G, '1f4af']},
  hook: (o) => <Over o={o} a={0} b={1e9}><FloridaMap o={o} a={-1000} /></Over>, capsOff: [[5500, 9100]],
  inBox: (o, at) => <Over o={o} a={at(5500)} b={at(9100)}><FloridaMap o={o} a={at(5500)} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(5500), 0.14, 500), sfx('ding-2', at(10600), 0.12)]});
// 3 · podcast: Peyton Manning told him a nice signature is a big deal
const SIG = make({src: 'pod2/u4_peyton.mp4', track: T(pyTrack), raw: pyWords as Raw, wideX: 960, top: 'Peyton Manning told Trevor THIS about autographs',
  segs: [[7700, 9900], [1100, 18900]], hookSeat: 'M', music: 'midnight-club.mp3', from: 30000, arrowAt: 2800,
  shots: [[1100, 'M'], [11300, 'L'], [13600, 'M'], [16500, 'M', 1.06]],
  hi: {peyton: [C, '1f410'], manning: C, signature: [Y, '270d'], 'signature.': Y, big: G, deal: G, nice: G, relationship: [C, '1f91d'], text: [Y, '1f4f1'], season: Y, cool: G},
  hook: (o) => <Over o={o} a={0} b={1e9}><SigCard o={o} a={0} signAt={500} /></Over>, capsOff: [[7700, 10300]],
  inBox: (o, at) => <Over o={o} a={at(7700)} b={at(10300)}><SigCard o={o} a={at(7700)} signAt={at(9000)} /></Over>,
  sfx: (at) => [sfx('ding-2', at(9000), 0.12)]});

export const B21Rogers = () => <Jorho s={ROGERS.spec} />, B21Lair = () => <Jorho s={LAIR.spec} />, B21Sig = () => <Jorho s={SIG.spec} />;
export const B21_MS = {Rogers: ROGERS.total, Lair: LAIR.total, Sig: SIG.total};
void R; void O;
