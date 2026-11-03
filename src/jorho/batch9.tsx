// BATCH 9 (2026-11-03): NBA GOAT pick in Jorho v2 (explainer graphics). Assets picked for this clip only:
import type {ReactNode} from 'react';
// YouTube card question, typed *thinking…*, GOAT stats table (Jordan / LeBron / Dellavedova), fahhh. No arrow, no beep, no Jeopardy/Curb.
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {Grain} from '../e3/kit';
import {MONT} from '../e3/bars';
import {type CamCfg} from '../e3/kit';
import {clamp, ease, pop, sfx, timeline} from '../e3/kit';
import {BOX_H, GREEN, RED, STROBE_CUT, wordsFrom} from './kit';
import {Jorho, NG_RAW, gTrack, type Spec} from './clips';
import {Layer, TypedAction, YouTubeCard} from './v2';

// Jackpot slot machine in the bottom bar: idle '? ? ?' from the question, reels spin GOAT candidates while he thinks,
// decelerate and land on DELLAVEDOVA on the name (user 2026-11-03), lights blink after the hit
const REEL = ['jordan', 'lebron', 'kobe', 'stephen_curry', 'magic_johnson', 'larry_bird', 'shaquille_oneal', 'tim_duncan', 'giannis_antetokounmpo'];
// v2 (user 2026-11-03): only while he's thinking (pops in on the silence, out ~1.3 s after landing) and the reel spins player HEADS
const SlotBox = ({o, spin, land}: {o: number; spin: number; land: number}) => {
  const OUT = land + 1300;
  if (o < spin || o >= OUT + 250) return null;
  const K = 40; // heads scrolled before landing; item K = Dellavedova
  const p = Math.min(1, (o - spin) / (land - spin));
  const idx = (1 - (1 - p) ** 3) * K;
  const head = (i: number) => (i >= K && o >= land ? 'delly1' : REEL[((i % REEL.length) + REEL.length) % REEL.length]);
  const i0 = Math.floor(idx), frac = idx - i0;
  const landed = o >= land;
  const H = 170, WIN = 230;
  const blink = landed && Math.floor((o - land) / 160) % 2 === 0;
  const sIn = pop(o, spin, 12, 260), sOut = 1 - ease(o, OUT, 250);
  if (sOut < 0.04) return null;
  return <div style={{position: 'absolute', left: 240, top: 1514, width: 600, height: 380, transform: `scale(${sIn * sOut})`, transformOrigin: '50% 100%'}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: 34, background: 'linear-gradient(#5a0f0f, #2a0606)', border: '8px solid #F5C84C',
      boxShadow: `0 0 ${landed ? 50 : 18}px ${landed ? 'rgba(255,215,60,0.8)' : 'rgba(0,0,0,0.6)'}`}} />
    <div style={{position: 'absolute', top: 12, width: 600, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, letterSpacing: 6,
      color: blink ? '#FFFFFF' : '#F5C84C', textShadow: '0 0 14px rgba(245,200,76,0.8)'}}>JACKPOT</div>
    {Array.from({length: 12}, (_, i) => <div key={i} style={{position: 'absolute', top: 26, left: i < 6 ? 24 + i * 16 : 600 - 24 - (i - 6) * 16 - 11, width: 11, height: 11,
      borderRadius: 6, background: (landed ? blink : Math.floor(o / 110 + i) % 2 === 0) ? '#FFE14D' : '#6b3b00'}} />)}
    <div style={{position: 'absolute', left: (600 - 300) / 2, top: 70, width: 300, height: WIN, borderRadius: 20, background: 'linear-gradient(#ffffff, #e9e9e9)', overflow: 'hidden',
      boxShadow: 'inset 0 18px 22px rgba(0,0,0,0.35), inset 0 -18px 22px rgba(0,0,0,0.35)'}}>
      {[-1, 0, 1].map((d) => {
        const i = i0 + d;
        const y = (WIN - H) / 2 + (d - frac) * H;
        return <Img key={d} src={staticFile(`img/heads/${head(i)}.png`)} style={{position: 'absolute', left: (300 - H) / 2, top: y, width: H, height: H,
          filter: !landed && p < 0.9 ? `blur(${(1 - p) * 4}px)` : undefined}} />;
      })}
    </div>
    <div style={{position: 'absolute', top: 310, width: 600, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40,
      color: landed ? '#E8132B' : 'rgba(255,255,255,0.6)', textShadow: landed ? '0 0 16px rgba(232,19,43,0.6)' : undefined}}>{landed ? 'DELLAVEDOVA' : '? ? ?'}</div>
  </div>;
};

// Article highlight (user ref youtube.com/shorts/STHOVgEWqf8, 2026-11-03): a printed article close-up, tilted, shallow depth of field,
// camera pushing along the text, the key phrase marked with a yellow highlighter; 2 shots (headline → paragraph); old film-roll sound.
const BODY = ['For decades the debate has never really ended. Every generation picks a side, every barbershop has an opinion,',
  'and every new season adds another chapter. Rings, MVPs, scoring titles and longevity all get thrown into the argument.',
  'So when a star quarterback was asked to name his', '__KEY__', 'nobody expected the answer that followed. The room went quiet,',
  'the hosts leaned in, and for a few long seconds he simply thought about it. Then he said a name that nobody saw coming,',
  'and the internet has not stopped talking about it since. Some called it a joke, others called it the boldest take of the year.'];
const Mark = ({children, p}: {children: string; p: number}) => <span style={{position: 'relative', display: 'inline-block', padding: '0 0.12em'}}>
  <span style={{position: 'absolute', left: 0, top: '12%', height: '82%', width: `${p * 100}%`, background: '#FFE34D', opacity: 0.9, transform: 'rotate(-1deg)',
    borderRadius: 4, mixBlendMode: 'multiply'}} />
  <span style={{position: 'relative', fontWeight: 800}}>{children}</span></span>;
const Paper = ({children}: {children: ReactNode}) => <div style={{position: 'absolute', inset: 0, background: '#f3efe6',
  backgroundImage: 'linear-gradient(115deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 160px), linear-gradient(28deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 220px), radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.6), rgba(0,0,0,0.08))'}}>{children}</div>;
const ArticleShot = ({t, dur, kind, word}: {t: number; dur: number; kind: 'head' | 'para'; word: string}) => {
  const k = t / dur;
  const hl = interpolate(t, [140, 440], [0, 1], clamp);
  const page = kind === 'head'
    ? <div style={{position: 'absolute', left: 120, top: 260, width: 1700, fontFamily: 'Playfair Display', color: '#141414'}}>
        <div style={{fontFamily: 'Courier Prime', fontSize: 34, letterSpacing: 4, color: '#555', marginBottom: 18}}>SPORTS · OPINION</div>
        <div style={{fontWeight: 800, fontSize: 150, lineHeight: 1.02, whiteSpace: 'nowrap'}}>Who Is The <Mark p={hl}>{word}</Mark>?<br />The Debate Never Ends</div>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 44, lineHeight: 1.45, color: '#2a2a2a', marginTop: 40, width: 1500}}>{BODY.slice(0, 2).join(' ')}</div>
      </div>
    : <div style={{position: 'absolute', left: 140, top: 160, width: 1650, fontFamily: 'Georgia, serif', fontSize: 64, lineHeight: 1.5, color: '#1d1d1d'}}>
        {BODY.map((l, i) => l === '__KEY__' ? <Mark key={i} p={hl}>{word}</Mark> : <span key={i}>{l} </span>)}
      </div>;
  // camera: tilted page, push-in + drift; focus point on the marked phrase
  const cam = kind === 'head'
    ? {rx: 14, ry: 12, s: 0.8 + 0.08 * k, x: -330 - 50 * k, y: 30 - 20 * k, fx: 50, fy: 42}
    : {rx: 18, ry: 10, s: 1.35 + 0.12 * k, x: -960 + 80 * k, y: -70 - 40 * k, fx: 50, fy: 50};
  const layer = (blur: number, mask?: string) => <div style={{position: 'absolute', inset: 0, filter: blur ? `blur(${blur}px)` : undefined,
    WebkitMaskImage: mask, maskImage: mask}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 2000, height: 1600, transformOrigin: '0 0',
      transform: `perspective(1500px) translate(${cam.x}px, ${cam.y}px) scale(${cam.s}) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg)`}}>
      <Paper>{page}</Paper></div></div>;
  const focus = `radial-gradient(ellipse 46% 22% at ${cam.fx}% ${cam.fy}%, black 45%, transparent 100%)`;
  return <AbsoluteFill style={{background: '#cfc8b8', overflow: 'hidden'}}>
    {layer(9)}
    {layer(0, focus)}
  </AbsoluteFill>;
};
const ArticleHighlight = ({o, a, b, word}: {o: number; a: number; b: number; word: string}) => {
  if (o < a || o >= b) return null;
  const t = o - a, half = (b - a) * 0.46;
  const fade = Math.min(1, t / 90, (b - o) / 140);
  const cutFlash = interpolate(t - half, [0, 40, 160], [0, 0.7, 0], clamp);
  const flicker = 0.94 + 0.06 * Math.sin(o * 0.41) * Math.sin(o * 0.17);
  return <AbsoluteFill style={{opacity: fade}}>
    <AbsoluteFill style={{filter: `sepia(0.25) contrast(1.06) brightness(${flicker})`, transform: `translateY(${Math.sin(o * 0.05) * 2}px)`}}>
      {t < half ? <ArticleShot t={t} dur={half} kind="head" word={word} /> : <ArticleShot t={t - half} dur={b - a - half} kind="para" word={word} />}
    </AbsoluteFill>
    <Grain frame={Math.floor(o / 33)} opacity={0.16} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(25,18,8,0.55) 100%)'}} />
    <AbsoluteFill style={{background: 'white', opacity: cutFlash}} />
  </AbsoluteFill>;
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
const G9 = {nba: b9.out(2960) - 80, nbaEnd: b9.out(5340), goat: b9.out(3260), quiet: b9.segOut[3], gotta: b9.segOut[4], name: b9.segOut[5], delly: b9.out(14350), laugh: b9.segOut[6], tension: b9.segOut[7]};
const CAM: CamCfg = {src: 'pod/nba_goat.mp4', tl: b9, track: gTrack, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX: 960, who: () => 'W'};
const NBA_V2: Spec = {
  tl: b9, src: 'pod/nba_goat.mp4', track: gTrack, top: 'His NBA GOAT has 0 MVPs', wordY: 1420, wideX: 960,
  words: wordsFrom(NG_RAW.map(([text, startMs]) => ({text, startMs})), b9, {}, {NBA: '#F9FC35', GOAT: '#58EE28', Matthew: '#21F5E6', Dellavedova: '#21F5E6'}),
  shots: [[0, 'W'], [b9.segOut[1], 'L'], [b9.segOut[2], 'M'], [b9.out(5560), 'L'], [G9.quiet, 'M'], [G9.name + STROBE_CUT, 'M'], [G9.laugh, 'W'], [G9.tension, 'R']],
  strobes: [G9.name], tints: [[G9.delly + 400, RED]], swish: [G9.goat],
  fah: [b9.out(14950)],
  capsOff: [[150, 2500], [b9.out(2960) - 80, b9.out(5340)], [G9.laugh + 100, G9.tension]],
  overlay: (o) => <SlotBox o={o} spin={G9.quiet} land={G9.name} />,
  music: {file: 'midnight-club.mp3', from: 0, level: 0, until: G9.gotta}, // drop at 2.7 s lands as the YouTube card ends
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={2500} title="Who is Trevor Lawrence's NBA GOAT?" cam={CAM} startAt={0} dur={b9.total} />
    <ArticleHighlight o={o} a={G9.nba} b={G9.nbaEnd} word="NBA GOAT" />
    <TypedAction o={o} a={G9.quiet + 200} b={G9.gotta} text="thinking…" />
    <GoatTable o={o} a={G9.laugh + 100} b={b9.total} />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.25), sfx('mg-swoosh', 420, 0.2), sfx('film-roll', b9.out(2960) - 80, 0.35, b9.out(5340) - b9.out(2960) + 80), sfx('slot-spin', G9.quiet, 0.5, G9.name - G9.quiet), sfx('slot-jackpot', G9.name, 0.32),
    ...[0, 1, 2].map((i) => sfx('mg-click', G9.laugh + 350 + i * 380, 0.22)), sfx('error', G9.laugh + 1260, 0.18)],
};
export const B9NbaGoatV2 = () => <Jorho s={NBA_V2} />;
export const B9_NBA_V2_MS = b9.total;
