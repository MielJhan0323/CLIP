// BATCH 19 (2026-11-15): 3 Jorho v2 (Trevor Lawrence only). User: "make me some jorho v2 with the youtube thing and diagrams like the
// viral ones we did before" → each clip: cold open → YouTube watch-page card framing the QUESTION → one or two face-cam diagrams
// (batch-17 BoardShell) on the answer → back to him for the payoff. Kept restrained per the client video-reference doc: cuts on speaker
// changes, zoom ≤ ×1.08, ≤ 1 flash, SFX only on events, *Trevor Lawrence* arrow once.
import type React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {TypedAction} from './v2';
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

// ---- the viral-#8 overlay format (b8_v2_redemptions: graph drawn OVER the dimmed footage, tint on the key number, typed *action*) ----
const Dim = ({children}: {children: React.ReactNode}) => <AbsoluteFill style={{background: 'rgba(8,10,14,0.64)'}}>{children}</AbsoluteFill>;
// two rings on the footage: "I know" 50–65 % (green) / coverage changes 15–25 % (red)
const ReadRings = ({o, a, b, knowAt, changeAt}: {o: number; a: number; b: number; knowAt: number; changeAt: number}) => {
  if (o < a || o >= b) return null;
  const fade = Math.min(ease(o, a, 250), 1 - ease(o, b - 250, 250));
  const ring = (cx: number, lo: number, hi: number, at: number, col: string, big: string, label: string) => {
    const p = ease(o, at, 800), R = 170, C = 2 * Math.PI * R;
    return <g key={label} opacity={o >= at ? 1 : 0.3}>
      <circle cx={cx} cy={470} r={R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={34} />
      <circle cx={cx} cy={470} r={R} fill="none" stroke={col} strokeOpacity={0.4} strokeWidth={34} strokeDasharray={`${C * (hi / 100) * p} ${C}`} transform={`rotate(-90 ${cx} 470)`} />
      <circle cx={cx} cy={470} r={R} fill="none" stroke={col} strokeWidth={34} strokeDasharray={`${C * (lo / 100) * p} ${C}`} transform={`rotate(-90 ${cx} 470)`} style={{filter: `drop-shadow(0 0 10px ${col})`}} />
      <text x={cx} y={490} textAnchor="middle" fontFamily={MONT} fontWeight={900} fontSize={66} fill={col}>{o >= at + 300 ? big : ''}</text>
      <text x={cx} y={720} textAnchor="middle" fontFamily={MONT} fontWeight={900} fontSize={38} fill="white">{label}</text>
    </g>;
  };
  return <AbsoluteFill style={{opacity: fade}}><Dim>
    <svg width={1080} height={BOX_H} style={{position: 'absolute', inset: 0}}>
      {ring(290, 50, 65, knowAt, '#58EE28', '50–65%', '"I KNOW"')}
      {ring(790, 15, 25, changeAt, '#FF4D4D', '15–25%', 'COVERAGE CHANGES')}
    </svg>
  </Dim></AbsoluteFill>;
};
// one line = his whole football life; the last sliver lights up teal = the 1.5 years with this staff → "LEARNED MORE HERE"
const LifeLine = ({o, a, b, coenAt}: {o: number; a: number; b: number; coenAt: number}) => {
  if (o < a || o >= b) return null;
  const fade = Math.min(ease(o, a, 250), 1 - ease(o, b - 250, 250));
  const lp = ease(o, a + 100, Math.min(900, b - a - 300)), cp = ease(o, coenAt, 450);
  return <AbsoluteFill style={{opacity: fade}}><Dim>
    <div style={{position: 'absolute', left: 90, top: 300, fontFamily: MONT, fontWeight: 900, fontSize: 40, color: 'rgba(255,255,255,0.8)'}}>HIS WHOLE FOOTBALL LIFE BEFORE</div>
    <div style={{position: 'absolute', left: 90, top: 380, width: 780 * lp, height: 26, borderRadius: 13, background: 'rgba(255,255,255,0.55)'}} />
    <div style={{position: 'absolute', left: 870, top: 368, width: 120 * cp, height: 50, borderRadius: 25, background: '#21F5E6', boxShadow: '0 0 26px #21F5E6'}} />
    {o >= coenAt && <div style={{position: 'absolute', right: 70, top: 450, fontFamily: MONT, fontWeight: 900, fontSize: 36, color: '#21F5E6', textAlign: 'right', opacity: cp}}>1.5 YEARS<br />WITH THIS STAFF</div>}
    {o >= coenAt + Math.min(600, (b - coenAt) / 2) && <div style={{position: 'absolute', left: 90, top: 640, fontFamily: MONT, fontWeight: 900, fontSize: 84, color: '#58EE28',
      transform: `scale(${pop(o, coenAt + Math.min(600, (b - coenAt) / 2), 10, 260)})`, transformOrigin: '0 50%'}}>LEARNED MORE HERE</div>}
  </Dim></AbsoluteFill>;
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

// 1 · pre-snap — VIRAL-#8 OVERLAY format: rings drawn over the dimmed footage on his numbers, green tint on "50 to 65", typed action
const PRESNAP = make({src: 'b3/v_presnap.mp4', track: T(psTrack), raw: psWords as Raw, wideX: 960, top: "How often an NFL QB knows who's open",
  segs: [[16760, 18440], [0, 5760], [9740, 10440], [13160, 18440], [23160, 26640], [30680, 34940]], hookSeat: 'M', music: 'jorho-qkthr.mp3', from: 0, arrowAt: 9800,
  shots: [[0, 'L'], [3660, 'W'], [9740, 'M'], [30680, 'M', 1.06], [33140, 'W']],
  flash: [16760, 'green'], capsOff: [[16400, 26640]],
  hook: (o, end) => <ReadRings o={o} a={0} b={end} knowAt={60} changeAt={700} />,
  inBox: (o, at) => <><ReadRings o={o} a={at(16300)} b={at(26640)} knowAt={at(16760)} changeAt={at(24640)} />
    <TypedAction o={o} a={at(30680)} b={at(34940) + 500} text="when the coverage changes" /></>,
  sfx: (at) => [sfx('mg-swoosh', at(16300), 0.16, 500), sfx('error', at(24900), 0.14), sfx('keyboard-typing', at(30680), 0.12, 1100)]});
export const B19Presnap = () => <Jorho s={PRESNAP.spec} />;
export const B19_PRESNAP_MS = PRESNAP.total;

// 2 · Liam Coen — OVERLAY format, its own mix: Coen cut-out pop on his name, life-line drawn over the footage, typed action
const COEN = make({src: 'pod2/u6_coen_duo.mp4', track: T(coenTrack), raw: coenWords as Raw, wideX: 690, top: '1.5 years with Coen > his whole football life?',
  segs: [[18320, 19400], [4720, 7900], [11440, 15100], [15980, 16300], [18320, 27850]], hookSeat: 'M', music: 'Investigations.mp3', from: 0, arrowAt: 18400,
  shots: [[4720, 'L'], [6600, 'W'], [11440, 'L'], [15980, 'W'], [18320, 'M'], [28000, 'M', 1.06]],
  cutout: {src: 6650, file: 'img/jorho/coen.png'}, capsOff: [[19500, 23000]],
  hook: (o, end) => <LifeLine o={o} a={0} b={end} coenAt={80} />,
  inBox: (o, at) => <><LifeLine o={o} a={at(19420)} b={at(23000)} coenAt={at(21220)} />
    <TypedAction o={o} a={at(25060)} b={at(27850) + 500} text="a whole new system" /></>,
  sfx: (at) => [sfx('mg-swoosh', at(19420), 0.16, 500), sfx('ding-2', at(21300), 0.14), sfx('keyboard-typing', at(25060), 0.12, 1000)]});
export const B19Coen = () => <Jorho s={COEN.spec} />;
export const B19_COEN_MS = COEN.total;

// 3 · God-given? YouTube card on the question → slider to WORKED ON → field: coaches roll right, he went left
const GIFT = make({src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, wideX: 960, top: "Is Trevor's accuracy God-given?",
  segs: [[34220, 36300], [4300, 10600], [11260, 12680], [16220, 18860], [26600, 31180], [32100, 36500]], hookSeat: 'M', music: 'midnight-club.mp3', from: 30000, arrowAt: 11300,
  shots: [[4300, 'L'], [8400, 'W'], [11260, 'M'], [16220, 'M', 1.06], [26600, 'M'], [32100, 'R'], [33860, 'M', 1.08]],
  yt: {title: "Is Trevor Lawrence's accuracy God-given or drilled?", a: 4300, b: 10600},
  hook: (o, end) => <AbsoluteFill style={{opacity: 1 - ease(o, end - 200, 200)}}><Field o={o} rightAt={0} leftAt={700} /></AbsoluteFill>,
  boards: [{a: 11260, b: 18860, render: (o, at) => <GiftSlider o={o} a={at(11260)} workAt={at(16740)} />},
    {a: 26600, b: 36500, render: (o, at) => <Field o={o} rightAt={at(26820)} leftAt={at(34440)} />}],
  sfx: (at) => [sfx('ding-2', at(34440), 0.14)]});
export const B19Gift = () => <Jorho s={GIFT.spec} />;
export const B19_GIFT_MS = GIFT.total;
void BOX_H;
