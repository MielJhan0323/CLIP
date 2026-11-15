// BATCH 20 (2026-11-15): 10 Trevor Lawrence clips. User: "10 trevor lawrence in jorho v2, some in jorho v2 hybrid with the new editing
// style, all high virality … maybe add color on the captions / highlight different words and emojis".
// FORMAT MIX (START HERE 2026-11-15: never the same recipe on a whole batch):
//  · O = viral-#8 OVERLAY (graph drawn over the dimmed footage, b8_v2_redemptions): PLAYBOOK, PATCH, PEYTON
//  · Y = YouTube question card + face-cam diagram board: GOLF, MARINO, TICKET
//  · H = HYBRID: the restrained video-reference style (letterbox, cuts on speaker change, ≤1 flash, arrow once) + ONE v2 touch
//        (cut-out / typed action / emoji): ANT, WHACKED, CELLY, NECK
// Every diagram clip OPENS on its diagram (user: "add the diagrams at the start so the video has a hook"). All captions: white with
// colour-highlighted key words, some with an iOS emoji pop.
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {ease, pop, sfx} from '../e3/kit';
import {BOX_H} from './kit';
import {Jorho, type Spec} from './clips';
import {TypedAction} from './v2';
import {make} from './batch17';
import {HC} from './hi';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';
import pyWords from '../plans/data/u4_peyton.words.json';
import pyTrack from '../plans/data/u4_peyton.seats.json';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';
import tkWords from '../plans/data/t4_natty_ticket.words.json';
import tkTrack from '../plans/data/t4_natty_ticket.seats.json';
import antWords from '../plans/data/t1_tiger_auto_pen.words.json';
import antTrack from '../plans/data/t1_tiger_auto_pen.seats.json';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';
import cellyWords from '../plans/data/u2_psa10_celly.words.json';
import cellyTrack from '../plans/data/u2_psa10_celly.seats.json';
import neckWords from '../plans/data/t6_davis_mills_joke.words.json';
import {dTrack as neckTrack} from './batch8';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;
const {green: G, yellow: Y, cyan: C, red: R, orange: O} = HC;

// ---------- overlay pieces (drawn over the dimmed footage) -------------------------------------------------------------------------
const Over = ({o, a, b, children}: {o: number; a: number; b: number; children: ReactNode}) => {
  if (o < a || o >= b) return null;
  return <AbsoluteFill style={{opacity: Math.min(ease(o, a, 220), 1 - ease(o, b - 220, 220)), background: 'rgba(8,10,14,0.64)'}}>{children}</AbsoluteFill>;
};
const Big = ({text, color, at, o, top, size = 84}: {text: string; color: string; at: number; o: number; top: number; size?: number}) => (o < at ? null :
  <div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: size, color,
    WebkitTextStroke: '5px #111', paintOrder: 'stroke fill', transform: `scale(${pop(o, at, 10, 260)})`}}>{text}</div>);
// the whole playbook as dots (fills in), then 8–10 light up green = this week
const PlayDots = ({o, fillAt, weekAt}: {o: number; fillAt: number; weekAt: number}) => {
  const cols = 18, rows = 12, pick = [5, 31, 52, 77, 99, 118, 140, 163, 181, 202];
  const n = Math.round(cols * rows * ease(o, fillAt, 700));
  return <>
    <div style={{position: 'absolute', left: 90, top: 240, display: 'grid', gridTemplateColumns: `repeat(${cols}, 40px)`, gap: 10}}>
      {Array.from({length: cols * rows}, (_, i) => { const lit = o >= weekAt && pick.includes(i);
        return <div key={i} style={{width: 40, height: 40, borderRadius: 20, background: lit ? G : i < n ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.12)',
          boxShadow: lit ? `0 0 14px ${G}` : undefined, transform: `scale(${lit ? pop(o, weekAt + pick.indexOf(i) * 50, 9, 260) : 1})`}} />; })}
    </div>
    <Big o={o} at={fillAt + 300} text="HUNDREDS OF PLAYS" color="white" top={110} size={64} />
    <Big o={o} at={weekAt + 500} text="8–10 NEW A WEEK" color={G} top={860} />
  </>;
};
// patch value ladder (his words): napkin → two-colour = way nicer → logo / nice patch = $15,000+
const PatchLadder = ({o, topAt, napkinAt, nicerAt}: {o: number; topAt: number; napkinAt: number; nicerAt: number}) => {
  const rung = (y: number, at: number, label: string, col: string) => (o < at ? null :
    <div style={{position: 'absolute', left: 110, top: y, width: 860, height: 120, borderRadius: 24, border: `6px solid ${col}`, background: 'rgba(0,0,0,0.35)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 50, color: col, transform: `scale(${pop(o, at, 11, 240)})`}}>{label}</div>);
  return <>
    <div style={{position: 'absolute', left: 60, top: 120, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: 'white'}}>WHAT THE PATCH IS WORTH</div>
    {rung(240, topAt, 'NICE PATCH → $15,000+', G)}
    {rung(470, nicerAt, 'TWO-COLOUR = WAY NICER', Y)}
    {rung(700, napkinAt, 'BASICALLY A NAPKIN', R)}
  </>;
};
// two calls to Peyton on a line
const CallLine = ({o, beforeAt, duringAt, whyAt}: {o: number; beforeAt: number; duringAt: number; whyAt: number}) => {
  const node = (x: number, at: number, top: string, sub: string, col: string) => (o < at ? null :
    <div style={{position: 'absolute', left: x - 200, top: 330, width: 400, textAlign: 'center', transform: `scale(${pop(o, at, 11, 240)})`}}>
      <div style={{width: 120, height: 120, margin: '0 auto', borderRadius: 60, background: col, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Img src={staticFile('emoji-ios/1f4de.png')} style={{width: 76, height: 76}} /></div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: col, marginTop: 18}}>{top}</div>
      <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 30, color: 'white', marginTop: 6}}>{sub}</div>
    </div>);
  return <>
    <div style={{position: 'absolute', left: 60, top: 120, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: 'white'}}>WHEN HE CALLED PEYTON</div>
    <div style={{position: 'absolute', left: 140, top: 388, width: 800 * ease(o, beforeAt, 600), height: 8, background: 'rgba(255,255,255,0.5)'}} />
    {node(290, beforeAt, 'BEFORE', 'his rookie year', C)}
    {node(790, duringAt, 'DURING', 'when it was not going well', R)}
    <Big o={o} at={whyAt} text="PEYTON STRUGGLED EARLY TOO" color={Y} top={760} size={50} />
  </>;
};
// ---------- boards (face-cam layout; also used opaque as the cold-open hook) -------------------------------------------------------
const Paper = ({children}: {children: ReactNode}) => <AbsoluteFill style={{background: '#f4f1ea'}}>{children}</AbsoluteFill>;
const BTitle = ({text}: {text: string}) => <div style={{position: 'absolute', left: 50, top: 70, width: 640, fontFamily: MONT, fontWeight: 900, fontSize: 56, lineHeight: '64px', color: '#111'}}>{text}</div>;
const Foursome = ({o, jesusAt, tigerAt}: {o: number; jesusAt: number; tigerAt: number}) => {
  const slot = (i: number, name: string, at: number, emo: string, col: string) => {
    const on = name && o >= at;
    return <div key={i} style={{width: 440, height: 250, borderRadius: 26, border: `6px ${on ? 'solid' : 'dashed'} ${on ? col : '#bbb'}`, background: on ? 'white' : 'transparent',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: on && o - at < 1500 ? `scale(${pop(o, at, 10, 240)})` : undefined}}>
      {on ? <><Img src={staticFile(`emoji-ios/${emo}.png`)} style={{width: 96, height: 96}} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 52, color: '#111', marginTop: 10}}>{name}</div></>
        : <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 90, color: '#bbb'}}>?</div>}
    </div>;
  };
  return <><BTitle text="DREAM GOLF FOURSOME" />
    <div style={{position: 'absolute', left: 60, top: 400, display: 'grid', gridTemplateColumns: '440px 440px', gap: 40}}>
      {slot(0, 'TREVOR', -5000, '1f3c8', '#0b6b6b')}{slot(1, 'JESUS', jesusAt, '1f64f', '#c99a00')}{slot(2, 'TIGER', tigerAt, '26f3', '#e07a00')}{slot(3, '', 0, '', '')}
    </div></>;
};
const Top10 = ({o, checkAt}: {o: number; checkAt: number}) => <><BTitle text="TOP 10 QBs OF ALL TIME?" />
  <div style={{position: 'absolute', left: 80, top: 330, width: 920}}>
    {Array.from({length: 10}, (_, i) => <div key={i} style={{height: 64, marginBottom: 12, borderRadius: 14, background: i === 6 && o >= checkAt ? '#d8f7cf' : '#e6e1d6',
      display: 'flex', alignItems: 'center', padding: '0 24px', fontFamily: MONT, fontWeight: 900, fontSize: 36, color: '#111'}}>
      <span style={{width: 70, color: '#888'}}>{i + 1}</span>
      {i === 6 && o >= checkAt && <span style={{transform: `scale(${pop(o, checkAt, 10, 260)})`, display: 'inline-flex', alignItems: 'center', gap: 16}}>DAN MARINO
        <Img src={staticFile('emoji-ios/2705.png')} style={{width: 50, height: 50}} /><span style={{fontSize: 28, color: '#1f8f12'}}>"GOTTA BE"</span></span>}
    </div>)}
  </div></>;
const Ticket = ({o, a, signAt}: {o: number; a: number; signAt: number}) => {
  const p = ease(o, a, 500);
  return <><BTitle text="THE GIFT" />
    <div style={{position: 'absolute', left: 90, top: 380, width: 900, height: 420, borderRadius: 30, background: 'linear-gradient(135deg, #f56600, #522d80)', transform: `rotate(${-4 + p * 2}deg) translateY(${(1 - p) * 80}px)`,
      opacity: p, boxShadow: '0 20px 40px rgba(0,0,0,0.3)', padding: 40, boxSizing: 'border-box', color: 'white', fontFamily: MONT}}>
      <div style={{fontWeight: 800, fontSize: 32, letterSpacing: 3}}>ADMIT ONE · CLEMSON</div>
      <div style={{fontWeight: 900, fontSize: 64, lineHeight: '72px', marginTop: 18}}>NATIONAL CHAMPIONSHIP GAME</div>
      <div style={{fontWeight: 900, fontSize: 40, marginTop: 20, color: '#ffd166'}}>MVP: TREVOR LAWRENCE</div>
      {o >= signAt && <div style={{position: 'absolute', right: 50, bottom: 40, fontFamily: '"Brush Script MT", cursive', fontSize: 80, color: '#fff',
        transform: `scale(${pop(o, signAt, 11, 240)}) rotate(-8deg)`}}>Trevor</div>}
    </div>
    {o >= signAt + 400 && <div style={{position: 'absolute', left: 90, top: 860, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: '#111'}}>A GIFT OF… HIMSELF <Img src={staticFile('emoji-ios/1f62d.png')} style={{width: 52, height: 52, verticalAlign: '-8px'}} /></div>}
  </>;
};

// ---------- hybrid diagrams (hook + one beat in the body) -----------------------------------------------------------------------
const AutoCompare = ({o, a}: {o: number; a: number}) => {
  const card = (x: number, d: number, who: string, sig: ReactNode, note: string, col: string) => <div style={{position: 'absolute', left: x, top: 260, width: 440, height: 560,
    borderRadius: 26, background: 'white', border: `6px solid ${col}`, opacity: ease(o, a + d, 220), transform: `translateY(${(1 - ease(o, a + d, 300)) * 40}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '30px 0', boxSizing: 'border-box'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: '#111'}}>{who}</div>
    <div style={{height: 220, display: 'flex', alignItems: 'center'}}>{sig}</div>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: col}}>{note}</div>
  </div>;
  return <>{card(60, 0, 'RICHARDSON AUTO', <span style={{fontFamily: '"Brush Script MT", cursive', fontSize: 34, color: '#1a3d8f'}}>A R</span>, 'ANT-SIZED', R)}
    {card(580, 350, 'TREVOR AUTO', <span style={{fontFamily: '"Brush Script MT", cursive', fontSize: 110, color: '#1a3d8f'}}>Trevor L.</span>, 'GOATED PEN', '#1f8f12')}
    {o >= a + 700 && <Img src={staticFile('emoji-ios/1f41c.png')} style={{position: 'absolute', left: 250, top: 600, width: 70, height: 70, transform: `scale(${pop(o, a + 700, 9, 260)})`}} />}</>;
};
const Slab = ({o, a}: {o: number; a: number}) => {
  const p = ease(o, a, 400);
  return <><div style={{position: 'absolute', left: 300, top: 150, width: 480, height: 760, borderRadius: 24, background: 'linear-gradient(160deg, #f8f8f8, #d9dde3)', border: '8px solid #c8102e',
    transform: `scale(${0.8 + 0.2 * p}) rotate(${-3 * (1 - p)}deg)`, opacity: p, boxShadow: '0 20px 50px rgba(0,0,0,0.45)'}}>
    <div style={{height: 150, background: '#c8102e', borderRadius: '14px 14px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', color: 'white', fontFamily: MONT}}>
      <div style={{fontWeight: 900, fontSize: 52}}>PSA</div><div style={{textAlign: 'right'}}><div style={{fontWeight: 800, fontSize: 26}}>GEM MT</div><div style={{fontWeight: 900, fontSize: 70, lineHeight: '70px'}}>10</div></div></div>
    <div style={{margin: '40px auto 0', width: 330, height: 460, borderRadius: 12, background: 'linear-gradient(135deg, #0b6b6b, #101820)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Img src={staticFile('emoji-ios/1f3c8.png')} style={{width: 150, height: 150}} /></div></div>
    {[0, 1, 2].map((i) => o >= a + 500 + i * 220 && <div key={i} style={{position: 'absolute', left: [70, 800, 430][i], top: [300, 420, 900][i], fontFamily: MONT, fontWeight: 900, fontSize: 90,
      color: G, WebkitTextStroke: '6px #111', paintOrder: 'stroke fill', transform: `scale(${pop(o, a + 500 + i * 220, 9, 260)}) rotate(${[-12, 10, -4][i]}deg)`}}>10!</div>)}</>;
};
const NeckChart = ({o, a}: {o: number; a: number}) => {
  const bar = (x: number, d: number, h: number, name: string, col: string) => {
    const p = ease(o, a + d, 600);
    return <div style={{position: 'absolute', left: x, bottom: BOX_H - 860, width: 300, textAlign: 'center'}}>
      <div style={{height: h * p, margin: '0 auto', width: 120, borderRadius: '60px 60px 0 0', background: col}} />
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 40, color: 'white', marginTop: 14}}>{name}</div></div>;
  };
  return <><div style={{position: 'absolute', left: 60, top: 110, fontFamily: MONT, fontWeight: 900, fontSize: 54, color: 'white'}}>NECK LENGTH <Img src={staticFile('emoji-ios/1f992.png')} style={{width: 60, height: 60, verticalAlign: '-8px'}} /></div>
    {bar(170, 0, 380, 'GLENNON', C)}{bar(600, 300, 560, 'DAVIS MILLS', R)}
    {o >= a + 900 && <div style={{position: 'absolute', left: 560, top: 180, fontFamily: MONT, fontWeight: 900, fontSize: 46, color: Y, transform: `scale(${pop(o, a + 900, 10, 260)})`}}>"LONGER"</div>}</>;
};
const ReactHook = ({o}: {o: number}) => <>
  <Big o={o} at={0} text="TREVOR WATCHED" color="white" top={260} size={70} />
  <Big o={o} at={250} text="OUR VIDEOS" color={Y} top={360} size={70} />
  <Big o={o} at={600} text="HIS REACTION:" color={R} top={700} size={70} />
  {o >= 800 && <div style={{position: 'absolute', left: 0, right: 0, top: 800, textAlign: 'center'}}><Img src={staticFile('emoji-ios/1f92f.png')} style={{width: 140, height: 140, transform: `scale(${pop(o, 800, 9, 260)})`}} /></div>}
</>;

// ================= O · OVERLAY FORMAT =============================================================================================
const PLAYBOOK = make({src: 'pod2/u1_playbook.mp4', track: T(pbTrack), raw: pbWords as Raw, wideX: 960, top: 'How many plays an NFL QB has to know',
  segs: [[51300, 54900], [0, 2600], [14200, 18000], [36800, 42800], [48800, 54900]], hookSeat: 'M', music: 'Jeopardy_Think.mp3', from: 0, arrowAt: 14300,
  shots: [[0, 'L'], [2600, 'W'], [14200, 'M'], [36800, 'M', 1.06], [48800, 'W'], [51000, 'M', 1.08]], flash: [52500, 'green'],
  hi: {playbook: [Y, '1f4da'], hundreds: [Y, '1f92f'], plays: C, inventory: C, entire: Y, eight: [G, '1f51f'], ten: G, week: G, new: G},
  hook: (o, end) => <Over o={o} a={0} b={end}><PlayDots o={o} fillAt={0} weekAt={500} /></Over>,
  capsOff: [[16800, 18000], [51300, 54900]],
  inBox: (o, at) => <><Over o={o} a={at(16800)} b={at(18000) + 300}><PlayDots o={o} fillAt={at(16800)} weekAt={1e9} /></Over>
    <Over o={o} a={at(51300)} b={at(54900) + 400}><PlayDots o={o} fillAt={at(51300) - 700} weekAt={at(52500)} /></Over></>,
  sfx: (at) => [sfx('mg-swoosh', at(16800), 0.16, 500), sfx('ding-2', at(52500), 0.14)]});

const PATCH = make({mark: 'circle', src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Why one patch makes a card worth $15,000+',
  segs: [[8100, 9200], [0, 14700]], hookSeat: 'W', music: 'funk-sigilo.mp3', from: 30000, arrowAt: 12400,
  shots: [[0, 'W'], [8100, 'W', 1.06], [12300, 'W']], flash: [2700, 'green'],
  hi: {'10': G, '000': G, '15': [G, '1f4b0'], plus: G, patch: Y, jaguars: C, napkin: [R, '1f62d'], nicer: [G, '1f525'], swoosh: C, nike: C},
  hook: (o, end) => <Over o={o} a={0} b={end}><PatchLadder o={o} topAt={0} nicerAt={-1} napkinAt={150} /></Over>,
  capsOff: [[2600, 11800]],
  inBox: (o, at) => <Over o={o} a={at(2600)} b={at(11800)}><PatchLadder o={o} topAt={at(2700)} napkinAt={at(8500)} nicerAt={at(10200)} /></Over>,
  sfx: (at) => [sfx('ding-2', at(2800), 0.12), sfx('error', at(8600), 0.12), sfx('ding-2', at(10300), 0.12)]});

const PEYTON = make({src: 'pod2/u4_peyton.mp4', track: T(pyTrack), raw: pyWords as Raw, wideX: 960, top: 'Who Trevor called when his rookie year went wrong',
  segs: [[40000, 41500], [20500, 26300], [26400, 29000], [37600, 46300]], hookSeat: 'M', music: 'interstellar-piano.mp3', from: 0, arrowAt: 22950,
  shots: [[20500, 'L'], [22900, 'M'], [26400, 'M'], [37600, 'M', 1.06]], cutout: {src: 25600, file: 'cutouts/peyton.png'},
  hi: {peyton: [C, '1f410'], rookie: Y, well: [R, '1f972'], perspective: [G, '1f9e0'], challenges: R, indy: C, talked: Y},
  hook: (o, end) => <Over o={o} a={0} b={end}><CallLine o={o} beforeAt={0} duringAt={300} whyAt={1e9} /></Over>,
  capsOff: [[37600, 46300]],
  inBox: (o, at) => <Over o={o} a={at(37600)} b={at(46300) + 300}><CallLine o={o} beforeAt={at(37700)} duringAt={at(40500)} whyAt={at(44400)} /></Over>,
  sfx: (at) => [sfx('ding-2', at(37700), 0.12), sfx('ding-2', at(40500), 0.12)]});

// ================= Y · YOUTUBE CARD + BOARD ======================================================================================
const GOLF = make({mark: 'circle', src: 'pod/t2_dream_golf_four.mp4', track: T(golfTrack), raw: golfWords as Raw, wideX: 720, top: "Trevor's dream golf foursome",
  segs: [[32600, 34100], [11280, 18300], [32200, 35500], [45400, 54200]], hookSeat: 'M', music: 'zelda-fairy-spring.mp3', from: 0, arrowAt: 32300,
  shots: [[11280, 'L'], [18000, 'W'], [32200, 'M'], [34780, 'L'], [45400, 'M'], [51000, 'M', 1.06]],
  yt: {title: "Who's in Trevor Lawrence's dream golf foursome?", a: 11280, b: 18300},
  hi: {jesus: [Y, '1f64f'], tiger: [O, '26f3'], goat: [G, '1f410'], dream: C, golf: C, humans: Y, anybody: Y},
  hook: (o) => <Paper><Foursome o={o} jesusAt={150} tigerAt={1e9} /></Paper>,
  boards: [{a: 45400, b: 54200, render: (o, at) => <Foursome o={o} jesusAt={-1} tigerAt={at(48000)} />}],
  sfx: (at) => [sfx('ding-2', at(48000), 0.14)]});

const MARINO = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Is Dan Marino a top 10 QB? Trevor answered',
  segs: [[65200, 65700], [55400, 73600]], hookSeat: 'M', music: 'tak-tak.mp3', from: 2000, arrowAt: 65300,
  shots: [[55400, 'W'], [62000, 'L'], [65200, 'M'], [67000, 'L'], [69700, 'M', 1.06]],
  yt: {title: 'Is Dan Marino a top 10 QB of all time?', a: 62000, b: 64900},
  hi: {marino: [C, '1f410'], top: Y, '10': [Y, '1f51f'], gotta: G, sling: O, rip: [R, '1f525'], trevor: C},
  hook: (o) => <Paper><Top10 o={o} checkAt={100} /></Paper>,
  boards: [{a: 65100, b: 67000, render: (o, at) => <Top10 o={o} checkAt={at(65300)} />}],
  sfx: (at) => [sfx('ding-2', at(65300), 0.14)]});

const TICKET = make({src: 'pod/t4_natty_ticket.mp4', track: T(tkTrack), raw: tkWords as Raw, wideX: 960, top: 'Grant gifted Trevor a ticket to his OWN natty',
  segs: [[15500, 17200], [9800, 17200], [21500, 33600]], hookSeat: 'M', music: 'jorho-lullaby.mp3', from: 150000, arrowAt: 15600,
  shots: [[9800, 'L'], [15500, 'M'], [17500, 'L'], [29400, 'M'], [30480, 'W'], [32300, 'M', 1.06]],
  yt: {title: 'What do you gift the guy who has everything?', a: 9800, b: 12400},
  hi: {gift: [G, '1f381'], gifting: G, ticket: [Y, '1f39f'], championship: Y, national: Y, mvp: C, signature: [C, '270d'], weird: [R, '1f62c'], thank: G},
  hook: (o) => <Paper><Ticket o={o} a={0} signAt={400} /></Paper>,
  boards: [{a: 21500, b: 29700, render: (o, at) => <Ticket o={o} a={at(21600)} signAt={at(27300)} />}],
  sfx: (at) => [sfx('ding-2', at(27300), 0.14)]});

// ================= H · HYBRID (restrained + one v2 touch) =======================================================================
const ANT = make({src: 'pod/t1_tiger_auto_pen.mp4', track: T(antTrack), raw: antWords as Raw, wideX: 760, top: 'Bro said his autograph looks like an ant',
  segs: [[15300, 16300], [10400, 24900]], hookSeat: 'L', music: 'Sneaky_Snitch.mp3', from: 0, arrowAt: 14700,
  shots: [[10400, 'L'], [14600, 'M'], [15000, 'L'], [19900, 'M'], [20500, 'W'], [23000, 'M', 1.06]], cutout: {src: 13000, file: 'cutouts/richardson.png'},
  hi: {ant: [R, '1f41c'], respect: Y, disrespect: R, beautiful: [G, '2728'], consistent: G, anthony: C, "richardson's": C, autos: Y, signatures: G},
  hook: (o) => <Over o={o} a={0} b={1e9}><AutoCompare o={o} a={0} /></Over>, capsOff: [[16300, 19900]],
  inBox: (o, at) => <Over o={o} a={at(16300)} b={at(19900)}><AutoCompare o={o} a={at(16300)} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(16300), 0.16, 500)]});

const WHACKED = make({mark: 'circle', src: 'pod/t3_traveling_trevors.mp4', track: T(travTrack), raw: travWords as Raw, wideX: 960, top: "Trevor's first reaction to the Traveling Trevors",
  segs: [[81300, 83500], [60100, 62800], [64300, 67200], [77500, 83500], [91600, 98600]], hookSeat: 'M', music: 'Monkeys_Spinning_Monkeys.mp3', from: 0, arrowAt: 64400,
  shots: [[60100, 'L'], [64300, 'M'], [77500, 'M'], [82900, 'R'], [91600, 'M'], [96000, 'W']], flash: [83000, 'red'],
  hi: {whacked: [R, '1f92f'], videos: Y, follow: C, funny: [G, '1f602'], playing: Y, second: C, first: C, trevers: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><ReactHook o={o} /></Over>,
  inBox: (o, at) => <TypedAction o={o} a={at(91600)} b={at(95000)} text="the second video hit different" />,
  sfx: (at) => [sfx('keyboard-typing', at(91600), 0.1, 900)]});

const CELLY = make({mark: 'circle', src: 'pod2/u2_psa10_celly.mp4', track: T(cellyTrack), raw: cellyWords as Raw, wideX: 960, top: 'Grant pitched Trevor a touchdown celly',
  segs: [[27500, 28200], [2300, 8500], [12900, 15000], [18800, 28200], [28600, 31700]], hookSeat: 'M', music: 'funk-do-balkan.mp3', from: 0, arrowAt: 8550,
  shots: [[2300, 'L'], [8400, 'M'], [12900, 'M', 1.06], [18800, 'L'], [27000, 'M']], flash: [27600, 'green'],
  hi: {celly: [Y, '1f3c8'], selly: [Y, '1f3c8'], touchdown: G, choreographed: [R, '1f62c'], choreograph: R, psa: C, '1010': G, '10': [G, '1f51f'], best: G, easy: G, collectors: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><Slab o={o} a={0} /></Over>, capsOff: [[22200, 25300]],
  inBox: (o, at) => <Over o={o} a={at(22200)} b={at(25300)}><Slab o={o} a={at(22200)} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(22200), 0.16, 500), sfx('ding-2', at(22700), 0.12)]});

const NECK = make({mark: 'circle', src: 'pod/t6_davis_mills_joke.mp4', track: T(neckTrack), raw: neckWords as Raw, wideX: 960, top: "Trevor's reaction to the Davis Mills card",
  segs: [[9100, 10600], [2000, 16000]], hookSeat: 'L', music: 'Curb_Credits.mp3', from: 0, arrowAt: 11300,
  shots: [[2000, 'W'], [5800, 'M'], [9100, 'L'], [11200, 'M', 1.08], [14300, 'W']], flash: [6900, 'red'], cutout: {src: 10300, file: 'cutouts/glennon.png'},
  hi: {davis: C, 'mills': [C, '1f633'], ew: [R, '1f922'], neck: [Y, '1f992'], glennon: Y, longer: Y, trevor: C},
  hook: (o) => <Over o={o} a={0} b={1e9}><NeckChart o={o} a={0} /></Over>, capsOff: [[12000, 14200]],
  inBox: (o, at) => <Over o={o} a={at(12000)} b={at(14200)}><NeckChart o={o} a={at(12000)} /></Over>,
  sfx: (at) => [sfx('mg-swoosh', at(12000), 0.16, 500)]});

export const B20Playbook = () => <Jorho s={PLAYBOOK.spec} />, B20Patch = () => <Jorho s={PATCH.spec} />, B20Peyton = () => <Jorho s={PEYTON.spec} />,
  B20Golf = () => <Jorho s={GOLF.spec} />, B20Marino = () => <Jorho s={MARINO.spec} />, B20Ticket = () => <Jorho s={TICKET.spec} />,
  B20Ant = () => <Jorho s={ANT.spec} />, B20Whacked = () => <Jorho s={WHACKED.spec} />, B20Celly = () => <Jorho s={CELLY.spec} />, B20Neck = () => <Jorho s={NECK.spec} />;
export const B20_MS = {Playbook: PLAYBOOK.total, Patch: PATCH.total, Peyton: PEYTON.total, Golf: GOLF.total, Marino: MARINO.total, Ticket: TICKET.total,
  Ant: ANT.total, Whacked: WHACKED.total, Celly: CELLY.total, Neck: NECK.total};
void BOX_H;
