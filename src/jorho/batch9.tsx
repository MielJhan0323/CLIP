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
  const H = 180;
    const sIn = pop(o, spin, 12, 260), sOut = 1 - ease(o, OUT, 250);
  if (sOut < 0.04) return null;
  // minimized (user 2026-11-03): no machine, lights or JACKPOT sign; just a small round head reel + the name under it
  const R = 200;
  return <div style={{position: 'absolute', left: (1080 - 300) / 2, top: 1500, width: 300, height: 300, transform: `scale(${sIn * sOut})`, transformOrigin: '50% 30%'}}>
    <div style={{position: 'absolute', left: 50, top: 0, width: R, height: R, borderRadius: '50%', overflow: 'hidden', background: '#f2f2f2',
      border: `6px solid ${landed ? '#E8132B' : 'white'}`, boxShadow: '0 6px 20px rgba(0,0,0,0.5)'}}>
      {[-1, 0, 1].map((d) => {
        const i = i0 + d;
        const y = (R - H) / 2 + (d - frac) * H;
        return <Img key={d} src={staticFile(`img/heads/${head(i)}.png`)} style={{position: 'absolute', left: (R - H) / 2 - 6, top: y - 6, width: H, height: H,
          filter: !landed && p < 0.9 ? `blur(${(1 - p) * 4}px)` : undefined}} />;
      })}
    </div>
    {landed && <div style={{position: 'absolute', top: R + 14, width: 300, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 38,
      color: '#E8132B', WebkitTextStroke: '3px #111', paintOrder: 'stroke fill'}}>DELLAVEDOVA</div>}
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
// v2 (user 2026-11-03, "like paper animator"): the highlighted word stays locked in the CENTER while the page around it
// switches every 3 frames through different papers / articles (paper colour, font, surrounding text, angle, size).
const PAPERS = ['#f4f1ea', '#ebe3cf', '#dcd8cc', '#fbfaf6', '#e6dcc0', '#d9d2bf'];
const FONTS = [['Playfair Display', 800], ['Georgia, serif', 700], ['Courier Prime', 700], ['Oswald', 700], ['Archivo Black', 400], ['Cinzel', 700], ['Anton', 400]] as const;
const LEFT = ['asked to name his', 'the debate over the', 'who is the real', 'crowning the', 'still no consensus on the', 'the case for the', 'forget everything about the', 'ranking every'];
const RIGHT = ['nobody saw coming', 'has never ended', 'of all time', 'is back on', 'debate rages on', 'remains unsettled', 'was not who you think', 'goes viral'];
const FILL = 'For decades the argument has gone on in gyms, group chats and barbershops across the country, and every season adds another chapter to it. Rings, MVPs, scoring titles and longevity all get thrown in, yet nobody ever agrees on who belongs at the very top. ';
const PaperPage = ({n, word}: {n: number; word: string}) => {
  const [font, weight] = FONTS[(n * 3) % FONTS.length];
  const wide = /Courier|Cinzel|Archivo/.test(font);
  const size = [74, 92, 64, 110, 84][n % 5] * (wide ? 0.72 : 1);
  const rot = ((n * 37) % 13) - 6;
  const sc = 1 + ((n * 17) % 5) * 0.06;
  const line = (k: number) => <div key={k} style={{fontFamily: (FONTS[(n + k) % FONTS.length][0]), fontWeight: 500, fontSize: size * 0.62, lineHeight: 1.35,
    whiteSpace: 'nowrap', color: '#2b2b2b', opacity: 0.9, marginLeft: -((n * 53 + k * 97) % 400)}}>{FILL.repeat(2)}</div>;
  return <AbsoluteFill style={{background: PAPERS[n % PAPERS.length], overflow: 'hidden'}}>
    <AbsoluteFill style={{transform: `rotate(${rot}deg) scale(${sc})`, transformOrigin: '50% 50%'}}>
      <div style={{position: 'absolute', left: -200, right: -200, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6}}>
        {[0, 1, 2, 3].map(line)}
        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', columnGap: size * 0.25, margin: '10px 0'}}>
          <span style={{justifySelf: 'end', whiteSpace: 'nowrap', fontFamily: font, fontWeight: weight, fontSize: size, color: '#1a1a1a'}}>{LEFT[n % LEFT.length]}</span>
          <span style={{position: 'relative', whiteSpace: 'nowrap', fontFamily: font, fontWeight: weight, fontSize: size * 1.12, color: '#111', padding: '0 0.15em'}}>
            <span style={{position: 'absolute', inset: '8% -2% 2% -2%', background: '#FFE34D', transform: `rotate(${-rot * 0.2 - 1}deg)`, borderRadius: 4, zIndex: -1}} />
            <span style={{position: 'relative'}}>{word}</span></span>
          <span style={{justifySelf: 'start', whiteSpace: 'nowrap', fontFamily: font, fontWeight: weight, fontSize: size, color: '#1a1a1a'}}>{RIGHT[(n * 5) % RIGHT.length]}</span>
        </div>
        {[4, 5, 6, 7].map(line)}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
const ArticleHighlight = ({o, a, b, word}: {o: number; a: number; b: number; word: string}) => {
  if (o < a || o >= b) return null;
  const n = Math.floor((o - a) / 100); // new page every 3 frames
  const fade = Math.min(1, (o - a) / 60, (b - o) / 60);
  // whoosh exit (user 2026-11-03): last 200 ms the page whips left with a zoom + motion blur into the next shot
  const w = Math.max(0, 1 - (b - o) / 200) ** 2;
  return <AbsoluteFill style={{opacity: fade, transform: `translateX(${-w * 700}px) scale(${1 + w * 0.5})`, filter: w > 0 ? `blur(${w * 14}px)` : undefined}}>
    <AbsoluteFill style={{isolation: 'isolate'}}><PaperPage n={n} word={word} /></AbsoluteFill>
    {/* shallow focus: soften top and bottom, keep the centre line crisp */}
    <AbsoluteFill style={{backdropFilter: 'blur(5px)', WebkitMaskImage: 'linear-gradient(black 0%, transparent 38%, transparent 62%, black 100%)',
      maskImage: 'linear-gradient(black 0%, transparent 38%, transparent 62%, black 100%)'}} />
    <Grain frame={Math.floor(o / 33)} opacity={0.14} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(25,18,8,0.45) 100%)'}} />
  </AbsoluteFill>;
};

// GOAT stats table v2 (user 2026-11-03, "less AI"): plain broadcast-style stat sheet. Same-size head photos, row labels on the
// left, white numbers on thin dividers, no glows / neon / count-up. The red box is a hand-drawn marker stroke that DRAWS around
// the whole Dellavedova column (pen-scribble sound) instead of popping in.
const COLX = [310, 570, 830]; // column centres
const markerPath = (x0: number, y0: number, x1: number, y1: number) => {
  // slightly uneven rectangle that overshoots where it closes, like a real marker
  const j = (k: number) => Math.sin(k * 12.9898) * 7;
  return `M ${x0 + 14} ${y0 + j(1)} C ${x0 + 120} ${y0 - 6}, ${x1 - 90} ${y0 + 5}, ${x1 + j(2)} ${y0 + 6}`
    + ` C ${x1 + 6} ${y0 + 200}, ${x1 - 5} ${y1 - 220}, ${x1 + j(3)} ${y1}`
    + ` C ${x1 - 90} ${y1 + 7}, ${x0 + 100} ${y1 - 4}, ${x0 + j(4)} ${y1 + 3}`
    + ` C ${x0 - 6} ${y1 - 200}, ${x0 + 6} ${y0 + 220}, ${x0 - 4} ${y0 + 30} L ${x0 + 40} ${y0 - 10}`;
};
const GoatTable = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const fade = Math.min(ease(o, a, 200), 1 - ease(o, b - 200, 200));
  const cols = [{img: 'jordan', name: 'JORDAN', mvp: 5, ring: 6}, {img: 'lebron', name: 'LEBRON', mvp: 4, ring: 4},
    {img: 'delly1', name: 'DELLAVEDOVA', mvp: 0, ring: 1, hot: true}];
  const rows = [['MVPs', 'mvp', 520], ['RINGS', 'ring', 690]] as const;
  const draw = ease(o, MARK(a), 450);
  return <AbsoluteFill style={{background: 'rgba(10,10,12,0.8)', opacity: fade}}>
    {rows.map(([lab, , y]) => <div key={lab}>
      <div style={{position: 'absolute', left: 50, top: y + 30, fontFamily: MONT, fontWeight: 700, fontSize: 34, letterSpacing: 2, color: 'rgba(255,255,255,0.55)'}}>{lab}</div>
      <div style={{position: 'absolute', left: 40, right: 40, top: y - 12, height: 2, background: 'rgba(255,255,255,0.16)'}} />
    </div>)}
    {cols.map((c, i) => {
      const t = a + 250 + i * 380;
      const p = ease(o, t, 260);
      return <div key={c.name} style={{position: 'absolute', left: COLX[i] - 130, top: 150, width: 260, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 30}px)`}}>
        <Img src={staticFile(`img/heads/${c.img}.png`)} style={{width: 210, height: 210, borderRadius: '50%', objectFit: 'cover', background: '#2a2a2e'}} />
        <div style={{fontFamily: MONT, fontWeight: 800, fontSize: c.hot ? 30 : 36, color: 'white', marginTop: 16, letterSpacing: 1}}>{c.name}</div>
        {rows.map(([lab, k, y]) => <div key={lab} style={{position: 'absolute', top: y - 150, width: 260, fontFamily: MONT, fontWeight: 800, fontSize: 96, lineHeight: '110px',
          color: c.hot && c[k] === 0 ? '#FF3B30' : 'white'}}>{c[k]}</div>)}
      </div>;
    })}
    {draw > 0 && <svg width={1080} height={BOX_H} style={{position: 'absolute', left: 0, top: 0}}>
      <path d={markerPath(COLX[2] - 150, 120, COLX[2] + 150, 830)} fill="none" stroke="#FF2B2B" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
    </svg>}
  </AbsoluteFill>;
};
const MARK = (a: number) => a + 250 + 2 * 380 + 450;

const b9 = timeline([[0, 1800], [2250, 3600], [4350, 7450], [7450, 10500], [12950, 13980], [13980, 15000], [15000, 17400], [17450, 18760]]);
const G9 = {nba: b9.out(2960) - 80, nbaEnd: b9.out(5450), goat: b9.out(3260), quiet: b9.segOut[3], gotta: b9.segOut[4], name: b9.segOut[5], delly: b9.out(14350), laugh: b9.segOut[6], tension: b9.segOut[7]};
const CAM: CamCfg = {src: 'pod/nba_goat.mp4', tl: b9, track: gTrack, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX: 960, who: () => 'W'};
const NBA_V2: Spec = {
  tl: b9, src: 'pod/nba_goat.mp4', track: gTrack, top: "Trevor's NBA GOAT is better than LeBron?", wordY: 1420, wideX: 960,
  words: wordsFrom(NG_RAW.filter(([, t]) => t < 4400 || t >= 5450).map(([text, startMs]) => ({text, startMs})), b9, {}, {NBA: '#F9FC35', GOAT: '#58EE28', Matthew: '#21F5E6', Dellavedova: '#21F5E6'}),
  shots: [[0, 'W'], [b9.segOut[1], 'L'], [b9.segOut[2], 'M'], [b9.out(5560), 'L'], [G9.quiet, 'M'], [G9.name + STROBE_CUT, 'M'], [G9.laugh, 'W'], [G9.tension, 'R']],
  strobes: [G9.name], tints: [[G9.delly + 400, RED]], swish: [],
  fah: [b9.out(14950)],
  capsOff: [[150, 2500], [G9.nba, G9.nbaEnd], [G9.laugh + 100, G9.tension]],
  mute: [[b9.out(2940) - 10, G9.nbaEnd + 20]], // NBA GOAT part = only Grant's echo (user 2026-11-03)
  overlay: (o) => <SlotBox o={o} spin={G9.quiet} land={G9.name} />,
  music: {file: 'midnight-club.mp3', from: 0, level: 0, until: G9.gotta}, // drop at 2.7 s lands as the YouTube card ends
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={2500} title="Who is Trevor Lawrence's NBA GOAT?" cam={CAM} startAt={0} dur={b9.total} />
    <ArticleHighlight o={o} a={G9.nba} b={G9.nbaEnd} word="NBA GOAT" />
    <TypedAction o={o} a={G9.quiet + 200} b={G9.gotta} text="thinking…" />
    <GoatTable o={o} a={G9.laugh + 100} b={b9.total} />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.25), sfx('mg-swoosh', 420, 0.2), sfx('film-roll', G9.nba, 0.18, G9.nbaEnd - G9.nba), sfx('nba-goat-echo', b9.out(2940), 0.95, G9.nbaEnd - b9.out(2940) + 150), sfx('fast-whoosh', G9.nbaEnd, 0.35), sfx('slot-spin', G9.quiet, 0.5, G9.name - G9.quiet), sfx('ding-2', G9.name, 0.3),
    ...[0, 1, 2].map((i) => sfx('mg-click', G9.laugh + 350 + i * 380, 0.22)), sfx('pen-scribble', MARK(G9.laugh + 100), 0.4, 500), sfx('error', MARK(G9.laugh + 100) + 450, 0.18)],
};
export const B9NbaGoatV2 = () => <Jorho s={NBA_V2} />;
export const B9_NBA_V2_MS = b9.total;
