// BATCH 9 (2026-11-03): NBA GOAT pick in Jorho v2 (explainer graphics). Assets picked for this clip only:
// YouTube card question, typed *thinking…*, GOAT stats table (Jordan / LeBron / Dellavedova), fahhh. No arrow, no beep, no Jeopardy/Curb.
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {type CamCfg} from '../e3/kit';
import {clamp, ease, pop, sfx, timeline} from '../e3/kit';
import {BOX_H, GREEN, RED, STROBE_CUT, wordsFrom} from './kit';
import {Jorho, NG_RAW, gTrack, type Spec} from './clips';
import {Layer, TypedAction, YouTubeCard} from './v2';

// Jackpot slot machine in the bottom bar: idle '? ? ?' from the question, reels spin GOAT candidates while he thinks,
// decelerate and land on DELLAVEDOVA on the name (user 2026-11-03), lights blink after the hit
const REEL = ['JORDAN', 'LEBRON', 'KOBE', 'CURRY', 'MAGIC', 'BIRD', 'SHAQ', 'KAREEM', 'DUNCAN', 'WILT', 'HAKEEM', 'GIANNIS'];
const SlotBox = ({o, show, spin, land}: {o: number; show: number; spin: number; land: number}) => {
  if (o < show) return null;
  const K = 46; // items scrolled before landing; item K = DELLAVEDOVA
  const p = o < spin ? 0 : Math.min(1, (o - spin) / (land - spin));
  const idx = o < spin ? -1 : (1 - (1 - p) ** 3) * K;
  // DELLAVEDOVA only appears in the window at the moment it lands (no peeking while the reel slows)
  const name = (i: number) => (i >= K && o >= land ? 'DELLAVEDOVA' : i < 0 ? '? ? ?' : REEL[((i % REEL.length) + REEL.length) % REEL.length]);
  const i0 = Math.floor(idx), frac = idx - i0;
  const landed = o >= land;
  const H = 110;
  const blink = landed && Math.floor((o - land) / 180) % 2 === 0;
  const s = pop(o, show, 12, 240);
  return <div style={{position: 'absolute', left: 150, top: 1528, width: 780, height: 330, transform: `scale(${s})`, transformOrigin: '50% 100%'}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 34, background: 'linear-gradient(#5a0f0f, #2a0606)', border: '8px solid #F5C84C',
      boxShadow: `0 0 ${landed ? 50 : 18}px ${landed ? 'rgba(255,215,60,0.8)' : 'rgba(0,0,0,0.6)'}`}} />
    <div style={{position: 'absolute', top: 14, width: 780, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46, letterSpacing: 6,
      color: blink ? '#FFFFFF' : '#F5C84C', textShadow: '0 0 14px rgba(245,200,76,0.8)'}}>JACKPOT</div>
    {Array.from({length: 14}, (_, i) => <div key={i} style={{position: 'absolute', top: 30 + (i % 2) * 6, left: i < 7 ? 26 + i * 18 : 780 - 26 - (i - 7) * 18 - 12, width: 12, height: 12,
      borderRadius: 6, background: (landed ? blink : Math.floor(o / 120 + i) % 2 === 0) ? '#FFE14D' : '#6b3b00'}} />)}
    <div style={{position: 'absolute', left: 50, top: 92, width: 680, height: H * 1.6, borderRadius: 18, background: 'white', overflow: 'hidden',
      boxShadow: 'inset 0 16px 20px rgba(0,0,0,0.35), inset 0 -16px 20px rgba(0,0,0,0.35)'}}>
      {[-1, 0, 1].map((d) => {
        const i = i0 + d;
        const y = (H * 1.6 - H) / 2 + (d - frac) * H;
        return <div key={d} style={{position: 'absolute', top: y, width: 680, height: H, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: MONT, fontWeight: 900, fontSize: name(i).length > 8 ? 62 : 76, color: name(i) === 'DELLAVEDOVA' && landed ? '#E8132B' : '#111',
          filter: !landed && o >= spin && p < 0.92 ? `blur(${(1 - p) * 3}px)` : undefined}}>{name(i)}</div>;
      })}
      <div style={{position: 'absolute', top: (H * 1.6 - 6) / 2, left: 0, width: 680, height: 6, background: 'rgba(232,19,43,0.35)'}} />
    </div>
  </div>;
};

// GOAT stats table: three cut-outs, MVPs + rings count up per column; a 0 shows in red
const GoatTable = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const fade = Math.min(ease(o, a, 200), 1 - ease(o, b - 200, 200));
  const cols = [{img: 'cutouts/jordan.png', name: 'JORDAN', mvp: 5, ring: 6}, {img: 'cutouts/lebron.png', name: 'LEBRON', mvp: 4, ring: 4},
    {img: 'cutouts/delly1.png', name: 'DELLAVEDOVA', mvp: 0, ring: 1, hot: true}];
  return <AbsoluteFill style={{background: 'rgba(8,10,14,0.72)', opacity: fade}}>
    <div style={{position: 'absolute', top: 60, width: 1080, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 60, color: 'white'}}>GOAT CHECK</div>
    {cols.map((c, i) => {
      const t = a + 250 + i * 380;
      const p = ease(o, t, 500);
      const s = pop(o, t, 11, 260);
      const x = 60 + i * 330;
      return <div key={c.name} style={{position: 'absolute', left: x, top: 170, width: 300, textAlign: 'center', opacity: o >= t ? 1 : 0, transform: `scale(${0.85 + 0.15 * s})`}}>
        <div style={{height: 360, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
          <Img src={staticFile(c.img)} style={{maxHeight: 360, maxWidth: 290, filter: c.hot ? 'drop-shadow(0 0 22px rgba(255,60,60,0.6))' : 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))'}} /></div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: c.hot ? 34 : 40, color: c.hot ? '#FFE14D' : 'white', marginTop: 14}}>{c.name}</div>
        {[['MVPs', c.mvp], ['RINGS', c.ring]].map(([lab, v]) => <div key={lab as string} style={{marginTop: 18, fontFamily: MONT, fontWeight: 900, fontSize: 78, lineHeight: '80px',
          color: c.hot && v === 0 ? '#FF2B2B' : '#9BE600'}}>{Math.round((v as number) * p)}<div style={{fontSize: 24, fontWeight: 800, color: 'rgba(255,255,255,0.75)'}}>{lab}</div></div>)}
      </div>;
    })}
    {o >= a + 250 + 2 * 380 + 500 && <div style={{position: 'absolute', left: 60 + 2 * 330 - 10, top: 150, width: 320, height: 760, border: '7px solid #FF2B2B', borderRadius: 26,
      opacity: interpolate(o - (a + 1260), [0, 160], [0, 1], clamp)}} />}
  </AbsoluteFill>;
};

const b9 = timeline([[0, 1800], [2250, 3600], [4350, 7450], [7450, 10500], [12950, 13980], [13980, 15000], [15000, 17400], [17450, 18760]]);
const G9 = {goat: b9.out(3260), quiet: b9.segOut[3], gotta: b9.segOut[4], name: b9.segOut[5], delly: b9.out(14350), laugh: b9.segOut[6], tension: b9.segOut[7]};
const CAM: CamCfg = {src: 'pod/nba_goat.mp4', tl: b9, track: gTrack, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX: 960, who: () => 'W'};
const NBA_V2: Spec = {
  tl: b9, src: 'pod/nba_goat.mp4', track: gTrack, top: 'His NBA GOAT has 0 MVPs', wordY: 1420, wideX: 960,
  words: wordsFrom(NG_RAW.map(([text, startMs]) => ({text, startMs})), b9, {}, {NBA: '#F9FC35', GOAT: '#58EE28', Matthew: '#21F5E6', Dellavedova: '#21F5E6'}),
  shots: [[0, 'W'], [b9.segOut[1], 'L'], [b9.segOut[2], 'M'], [b9.out(5560), 'L'], [G9.quiet, 'M'], [G9.name + STROBE_CUT, 'M'], [G9.laugh, 'W'], [G9.tension, 'R']],
  strobes: [G9.name], tints: [[G9.goat, GREEN], [G9.delly + 400, RED]], swish: [G9.goat],
  fah: [b9.out(14950)],
  capsOff: [[150, 2500], [G9.laugh + 100, G9.tension]],
  overlay: (o) => <SlotBox o={o} show={G9.goat} spin={G9.quiet} land={G9.name} />,
  music: {file: 'midnight-club.mp3', from: 0, level: 0, until: G9.gotta}, // drop at 2.7 s lands as the YouTube card ends
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={2500} title="Who is Trevor Lawrence's NBA GOAT?" cam={CAM} startAt={0} dur={b9.total} />
    <TypedAction o={o} a={G9.quiet + 200} b={G9.gotta} text="thinking…" />
    <GoatTable o={o} a={G9.laugh + 100} b={b9.total} />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.25), sfx('mg-swoosh', 420, 0.2), sfx('slot-spin', G9.quiet, 0.5, G9.name - G9.quiet), sfx('slot-jackpot', G9.name, 0.32),
    ...[0, 1, 2].map((i) => sfx('mg-click', G9.laugh + 350 + i * 380, 0.22)), sfx('error', G9.laugh + 1260, 0.18)],
};
export const B9NbaGoatV2 = () => <Jorho s={NBA_V2} />;
export const B9_NBA_V2_MS = b9.total;
