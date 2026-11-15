// BATCH 19 (2026-11-15): 3 Jorho v2 (Trevor Lawrence only). User: "make me some jorho v2 with the youtube thing and diagrams like the
// viral ones we did before" → each clip: cold open → YouTube watch-page card framing the QUESTION → one or two face-cam diagrams
// (batch-17 BoardShell) on the answer → back to him for the payoff. Kept restrained per the client video-reference doc: cuts on speaker
// changes, zoom ≤ ×1.08, ≤ 1 flash, SFX only on events, *Trevor Lawrence* arrow once.
import {AbsoluteFill, interpolate} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, pop, sfx} from '../e3/kit';
import {BOX_H} from './kit';
import {Jorho, type Spec} from './clips';
import {Field, make} from './batch17';
import psWords from '../plans/data/v_presnap.words.json';
import psTrack from '../plans/data/v_presnap.seats.json';
import coenWords from '../plans/data/u6_coen_duo.words.json';
import coenTrack from '../plans/data/u6_coen_duo.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const Title = ({text}: {text: string}) => <div style={{position: 'absolute', left: 50, top: 70, width: 640, fontFamily: MONT, fontWeight: 900, fontSize: 58, lineHeight: '66px', color: '#111'}}>{text}</div>; // clear of the face-cam (x ≥ 730, y ≤ 350)

// pre-snap read: two bars fill on his numbers (50–65 % "I know" / 15–25 % "coverage changes")
const ReadBars = ({o, knowAt, changeAt}: {o: number; knowAt: number; changeAt: number}) => {
  const bar = (label: string, range: string, lo: number, hi: number, at: number, col: string, y: number) => {
    const p = ease(o, at, 700);
    return <div style={{position: 'absolute', left: 60, top: y, width: 960, opacity: o >= at ? 1 : 0.25}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#111', marginBottom: 14}}>{label}</div>
      <div style={{position: 'relative', height: 90, borderRadius: 45, background: '#e2ddd2', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${hi * p}%`, background: col, opacity: 0.35}} />
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${lo * p}%`, background: col}} />
      </div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 70, color: col, WebkitTextStroke: '4px #111', paintOrder: 'stroke fill', marginTop: 10,
        transform: `scale(${o >= at ? pop(o, at + 500, 11, 240) : 0})`, transformOrigin: '0 50%'}}>{range}</div>
    </div>;
  };
  return <AbsoluteFill>
    <Title text="THE PRE-SNAP READ" />
    {bar('"I KNOW WHO\'S OPEN"', '50–65%', 50, 65, knowAt, '#2bb51c', 420)}
    {bar('COVERAGE CHANGES / TRICKS', '15–25%', 15, 25, changeAt, '#E8261F', 760)}
  </AbsoluteFill>;
};

// whole football life vs 1.5 years with this staff (his words, no invented numbers)
const LifeBars = ({o, lifeAt, coenAt, sysAt}: {o: number; lifeAt: number; coenAt: number; sysAt: number}) => {
  const lp = ease(o, lifeAt, 800), cp = ease(o, coenAt, 500);
  return <AbsoluteFill>
    <Title text="WHERE HE LEARNED MORE" />
    <div style={{position: 'absolute', left: 60, top: 420, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#555'}}>HIS WHOLE FOOTBALL LIFE BEFORE</div>
    <div style={{position: 'absolute', left: 60, top: 480, width: 900 * lp, height: 80, borderRadius: 40, background: '#9a9486'}} />
    <div style={{position: 'absolute', left: 60, top: 620, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#0b6b6b', opacity: o >= coenAt ? 1 : 0.25}}>1.5 YEARS WITH THIS STAFF</div>
    <div style={{position: 'absolute', left: 60, top: 680, width: 220 * cp, height: 80, borderRadius: 40, background: '#13a3a3', boxShadow: cp > 0.9 ? '0 0 30px rgba(19,163,163,0.8)' : undefined}} />
    {o >= coenAt + 400 && <div style={{position: 'absolute', left: 310, top: 680, height: 80, display: 'flex', alignItems: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 50,
      color: '#58EE28', WebkitTextStroke: '5px #111', paintOrder: 'stroke fill', transform: `scale(${pop(o, coenAt + 400, 10, 240)})`, transformOrigin: '0 50%'}}>= LEARNED MORE</div>}
    {o >= sysAt && <div style={{position: 'absolute', left: 60, top: 840, padding: '18px 30px', borderRadius: 20, background: '#111', color: 'white', fontFamily: MONT, fontWeight: 900,
      fontSize: 46, transform: `scale(${pop(o, sysAt, 11, 240)})`, transformOrigin: '0 50%'}}>WHY: A SYSTEM UNLIKE ANY HE'S HAD</div>}
  </AbsoluteFill>;
};

// God-given ⟷ worked on: a slider that starts in the middle and slides to "WORKED ON (SINCE A KID)"
const GiftSlider = ({o, a, workAt}: {o: number; a: number; workAt: number}) => {
  const x = interpolate(o, [a, a + 300, workAt, workAt + 700], [0.5, 0.5, 0.5, 0.88], clamp);
  return <AbsoluteFill>
    <Title text="THE ACCURACY" />
    <div style={{position: 'absolute', left: 80, right: 80, top: 520, height: 30, borderRadius: 15, background: 'linear-gradient(90deg, #f0c419, #2bb51c)'}} />
    <div style={{position: 'absolute', left: 80 + x * 920 - 45, top: 490, width: 90, height: 90, borderRadius: 45, background: 'white', border: '8px solid #111'}} />
    <div style={{position: 'absolute', left: 60, top: 620, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: '#b08900'}}>GOD-GIVEN</div>
    <div style={{position: 'absolute', right: 60, top: 620, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: '#1f8f12', textAlign: 'right'}}>WORKED ON</div>
    {o >= workAt + 500 && <div style={{position: 'absolute', right: 60, top: 690, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: '#111',
      transform: `scale(${pop(o, workAt + 500, 11, 240)})`, transformOrigin: '100% 50%'}}>SINCE HE WAS A KID</div>}
  </AbsoluteFill>;
};

// 1 · pre-snap: YouTube card on the question → bars on the answer → back to him for "you gotta move on"
const PRESNAP = make({src: 'b3/v_presnap.mp4', track: T(psTrack), raw: psWords as Raw, wideX: 960, top: "How often an NFL QB knows who's open",
  segs: [[16760, 18440], [0, 5760], [9740, 10440], [13160, 18440], [23160, 26640], [30680, 34940]], hookSeat: 'M', music: 'jorho-qkthr.mp3', from: 0, arrowAt: 9800,
  shots: [[0, 'L'], [3660, 'W'], [9740, 'M'], [30680, 'M', 1.06], [33140, 'W']],
  yt: {title: "How often does an NFL QB know who's open pre-snap?", a: 0, b: 5760},
  boards: [{a: 13160, b: 26640, render: (o, at) => <ReadBars o={o} knowAt={at(16760)} changeAt={at(24640)} />}],
  sfx: (at) => [sfx('ding-2', at(16760), 0.14), sfx('ding-2', at(24640), 0.12)]});
export const B19Presnap = () => <Jorho s={PRESNAP.spec} />;
export const B19_PRESNAP_MS = PRESNAP.total;

// 2 · Liam Coen: YouTube card on Grant's question → "yeah, definitely" → life-vs-1.5-years board
const COEN = make({src: 'pod2/u6_coen_duo.mp4', track: T(coenTrack), raw: coenWords as Raw, wideX: 690, top: '1.5 years with Coen > his whole football life?',
  segs: [[18320, 19400], [4720, 7900], [11440, 15100], [15980, 16300], [18320, 27850]], hookSeat: 'M', music: 'Investigations.mp3', from: 0, arrowAt: 18400,
  shots: [[4720, 'L'], [6600, 'W'], [11440, 'L'], [15980, 'W'], [18320, 'M'], [28000, 'M', 1.06]],
  yt: {title: 'Did Liam Coen teach Trevor more than his whole football life?', a: 4720, b: 7900},
  cutout: {src: 6650, file: 'img/jorho/coen.png'},
  boards: [{a: 19420, b: 27700, render: (o, at) => <LifeBars o={o} lifeAt={at(19500)} coenAt={at(21220)} sysAt={at(25580)} />}],
  sfx: (at) => [sfx('ding-2', at(21220), 0.14)]});
export const B19Coen = () => <Jorho s={COEN.spec} />;
export const B19_COEN_MS = COEN.total;

// 3 · God-given? YouTube card on the question → slider to WORKED ON → field: coaches roll right, he went left
const GIFT = make({src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, wideX: 960, top: "Is Trevor's accuracy God-given?",
  segs: [[34220, 36300], [4300, 10600], [11260, 12680], [16220, 18860], [26600, 31180], [32100, 36500]], hookSeat: 'M', music: 'midnight-club.mp3', from: 30000, arrowAt: 11300,
  shots: [[4300, 'L'], [8400, 'W'], [11260, 'M'], [16220, 'M', 1.06], [26600, 'M'], [32100, 'R'], [33860, 'M', 1.08]],
  yt: {title: "Is Trevor Lawrence's accuracy God-given or drilled?", a: 4300, b: 10600},
  boards: [{a: 11260, b: 18860, render: (o, at) => <GiftSlider o={o} a={at(11260)} workAt={at(16740)} />},
    {a: 26600, b: 36500, render: (o, at) => <Field o={o} rightAt={at(26820)} leftAt={at(34440)} />}],
  sfx: (at) => [sfx('ding-2', at(34440), 0.14)]});
export const B19Gift = () => <Jorho s={GIFT.spec} />;
export const B19_GIFT_MS = GIFT.total;
void BOX_H;
