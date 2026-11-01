// "JustinAugh" card-pull style (vault/02 Style Guide/JustinAugh style.md), measured from 4 reference Shorts (1080x1920, 30 fps):
// - hook: green-screen hook clip + voiceover hook line, one-word glow captions, white banner (black Montserrat Black + colour keywords + iOS emoji)
// - frame 0 + every cut: white cut flash (100 % on the cut frame, gone in ~6 frames) over EVERYTHING, camera-flash SFX
// - hook → stream: strobe burst (2-3 triangle pulses 6 frames apart, the cut sits between pulses)
// - stream: host cam PiP with a yellow border over the card cam, red circle + red arrow on the reaction
// - reveal: white held 4 frames + slow fade, blurred background, sharp card, "INSANE PULL 🔥🔥", glowing green price, 😱, money rain
import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {FPS, W, clamp, f, type TL} from '../e3/kit';

export const JA = {cyan: '#06FCF9', yellow: '#F2FA04', green: '#3DFF2E', white: '#FFFFFF', bGreen: '#00AB01', bRed: '#FA0001', bBlue: '#0283E4',
  price: '#02D204', red: '#FF0000'};
const fr = (o: number) => Math.round((o * FPS) / 1000);

// ---- white flashes (opacity of a white layer on top of everything) ----------------------------------------------
const CUT = [0.55, 0.35, 0.2, 0.08]; // v2: softer, frame 0 only
const PULSE = [0.45, 0.75, 1, 0.75, 0.3];
const REVEAL = [0.5, 0.85, 0.85, 0.6, 0.38, 0.2, 0.08]; // v2: shorter, never full white
export type Flash = {at: number; kind: 'cut' | 'burst' | 'reveal'};
export const flashLevel = (o: number, list: Flash[]) => Math.max(0, ...list.map(({at, kind}) => {
  const k = fr(o) - fr(at);
  if (kind === 'cut') return CUT[k] ?? 0;
  if (kind === 'reveal') return REVEAL[k] ?? 0;
  return Math.max(...[0, 6, 12].map((s) => PULSE[k - s + 2] ?? 0)); // centred on at, at+200, at+400
}));
export const WhiteFlash = ({o, list}: {o: number; list: Flash[]}) => {
  const a = flashLevel(o, list);
  return a > 0 ? <AbsoluteFill style={{background: 'white', opacity: a}} /> : null;
};

// ---- text ---------------------------------------------------------------------------------------------------------
const emojiImg = (code: string, size: number) => <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size, verticalAlign: `-${size * 0.14}px`, marginLeft: 4}} />;
// banner: white box, black Montserrat Black, keywords in colour ("JUST" green, "1/1" red …), iOS emoji at the end
export type Part = [string, string?];
export const Banner = ({lines, emoji = [], top, rounded}: {lines: Part[][]; emoji?: string[]; top: number; rounded?: boolean}) => (
  <div style={{position: 'absolute', top, left: 64, width: W - 128, background: 'white', borderRadius: rounded ? 22 : 0, padding: '18px 10px',
    textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 62, lineHeight: '72px', color: 'black'}}>
    {lines.map((l, i) => <div key={i}>{l.map(([t, c], j) => <span key={j} style={{color: c ?? 'black', WebkitTextStroke: c === JA.yellow ? '3px black' : undefined,
      paintOrder: 'stroke fill'}}>{t}</span>)}{i === lines.length - 1 && emoji.map((e) => <span key={e}>{emojiImg(e, 62)}</span>)}</div>)}
  </div>
);
export type Word = {text: string; at: number; color?: string};
const PAL = [JA.cyan, JA.yellow, JA.green, JA.white];
// one word at a time, uppercase, neon glow + hard drop shadow, 3-frame pop
export const OneWord = ({o, words, y}: {o: number; words: Word[]; y: number}) => {
  let i = -1;
  words.forEach((w, j) => { if (o >= w.at) i = j; });
  if (i < 0 || o > words[i].at + 900 || o >= (words[i + 1]?.at ?? Infinity)) return null;
  const w = words[i];
  const c = w.color ?? PAL[i % PAL.length];
  const s = interpolate(fr(o) - fr(w.at), [0, 3], [1.18, 1], clamp);
  return <div style={{position: 'absolute', top: y - 50, width: W, textAlign: 'center', transform: `scale(${s})`}}>
    <span style={{fontFamily: MONT, fontWeight: 800, fontSize: 80, color: c, textTransform: 'uppercase',
      textShadow: `0 0 14px ${c}AA, 0 0 30px ${c}66, 5px 5px 0 rgba(0,0,0,0.55)`}}>{w.text}</span>
  </div>;
};

// ---- red circle + arrow (tracked) ------------------------------------------------------------------------------------
export type Pt = {at: number; x: number; y: number};
const lerp = (pts: Pt[], o: number) => {
  const i = pts.findIndex((p) => p.at > o);
  if (i <= 0) return i === 0 ? pts[0] : pts[pts.length - 1];
  const a = pts[i - 1], b = pts[i], t = (o - a.at) / (b.at - a.at);
  return {at: o, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t};
};
export const RedCircle = ({o, pts, from, to, r}: {o: number; pts: Pt[]; from: number; to: number; r: number}) => {
  if (o < from || o > to) return null;
  const p = lerp(pts, o);
  const draw = interpolate(o - from, [0, 200], [0, 1], clamp);
  const jab = 14 * Math.abs(Math.sin((o - from) / 160));
  const C = 2 * Math.PI * r;
  return <svg width={W} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <circle cx={p.x} cy={p.y} r={r} fill="none" stroke={JA.red} strokeWidth={12} strokeDasharray={C} strokeDashoffset={C * (1 - draw)} transform={`rotate(-90 ${p.x} ${p.y})`} />
    <g transform={`translate(${p.x - r * 0.75 - 40 - jab} ${p.y + r * 0.75 + 40 + jab}) rotate(-45)`} style={{filter: 'drop-shadow(3px 4px 3px rgba(0,0,0,0.5))'}}>
      <polygon points="0,-16 70,-16 70,-38 120,0 70,38 70,16 0,16" fill={JA.red} />
    </g>
  </svg>;
};

// ---- footage ----------------------------------------------------------------------------------------------------------
// one source played through a timeline, drawn as a box (sx,sy,sw,sh of the source → x,y,w,h on screen)
export const Footage = ({src, tl, at = 0, crop, box, style, muted = true}: {src: string; tl: TL; at?: number; crop: [number, number, number, number];
  box: [number, number, number, number]; style?: CSSProperties; muted?: boolean}) => {
  const [sx, sy, sw, sh] = crop; const [x, y, w, h] = box; const k = w / sw;
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', ...style}}>
    <div style={{position: 'absolute', left: -sx * k, top: -sy * k, transform: `scale(${k})`, transformOrigin: '0 0'}}>
      {tl.segs.map(([a, b], i) => <Sequence key={i} from={f(at + tl.segOut[i])} durationInFrames={f(tl.segOut[i] + b - a) - f(tl.segOut[i])} layout="none">
        <OffthreadVideo src={staticFile(src)} muted={muted} trimBefore={f(a)} />
      </Sequence>)}
    </div>
  </div>;
};
export const PipFrame = ({children, box}: {children: ReactNode; box: [number, number, number, number]}) => (
  <div style={{position: 'absolute', left: box[0] - 8, top: box[1] - 8, width: box[2] + 16, height: box[3] + 16, border: `8px solid ${JA.yellow}`,
    borderRadius: 22, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}}>{children}</div>
);

// ---- reveal card ------------------------------------------------------------------------------------------------------
export const Reveal = ({o, at, until, card, price}: {o: number; at: number; until: number; card: string; price: string}) => {
  if (o < at || o >= until) return null;
  const k = o - at;
  const s = interpolate(k, [0, 260], [1.25, 1], clamp);
  return <AbsoluteFill>
    <div style={{position: 'absolute', top: 470, width: W, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 104, transform: `scale(${s})`,
      textShadow: '0 0 18px rgba(255,255,255,0.45), 6px 6px 0 rgba(0,0,0,0.5)'}}>
      <span style={{color: 'white'}}>INSANE </span><span style={{color: JA.red, textShadow: '0 0 18px rgba(255,0,0,0.6), 6px 6px 0 rgba(0,0,0,0.5)'}}>PULL</span>
      <div style={{marginTop: -6}}>{emojiImg('1f525', 92)}{emojiImg('1f525', 92)}</div>
    </div>
    <div style={{position: 'absolute', left: 0, top: 720, width: W, height: 680, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `scale(${s})`}}>
      <Img src={staticFile(card)} style={{maxWidth: 680, maxHeight: 680, boxShadow: '0 20px 60px rgba(0,0,0,0.6)', borderRadius: 10}} /></div>
    <div style={{position: 'absolute', top: 1440, width: W, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 112, color: JA.price,
      WebkitTextStroke: '4px #0A6B0A', paintOrder: 'stroke fill', textShadow: `0 0 22px ${JA.price}, 0 0 44px ${JA.price}99`, opacity: k > 120 ? 1 : 0}}>{price}</div>
    {k > 200 && <Img src={staticFile('emoji-ios/1f631.png')} style={{position: 'absolute', left: (W - 230) / 2, top: 1590, width: 230,
      transform: `scale(${interpolate(k, [200, 340], [0.4, 1], clamp)})`, filter: 'drop-shadow(0 0 20px rgba(255,200,0,0.7))'}} />}
  </AbsoluteFill>;
};
const BILLS = Array.from({length: 22}, (_, i) => ({x: (i * 137 + (i % 4) * 263) % 1000, d: (i * 631) % 2000, s: 70 + ((i * 37) % 60), e: i % 3 ? '1f4b5' : '1f4b8', r: (i * 53) % 360}));
export const MoneyRain = ({o, from, to}: {o: number; from: number; to: number}) => {
  if (o < from || o > to) return null;
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{BILLS.map((b, i) => {
    const y = ((o - from + b.d) * 1.1) % 2200 - 200;
    return <Img key={i} src={staticFile(`emoji-ios/${b.e}.png`)} style={{position: 'absolute', left: b.x, top: y, width: b.s, transform: `rotate(${b.r + (o - from) / 6}deg)`, opacity: 0.9}} />;
  })}</AbsoluteFill>;
};

// ---- zoom whips (v2, user 2026-10-31: "reduce the flashing, add the fast zooming with the whoosh") ------------------
// last 150 ms before a cut: push in 1 → 1.3 with blur; first 220 ms after: land from 1.35 → 1 with blur (fast-whoosh peak on the cut)
// punches: [at, ms, scale] quick snap-ins on key words
export const zoomStyle = (o: number, cuts: number[], punches: [number, number, number][] = []) => {
  let s = 1, b = 0;
  for (const c of cuts) {
    if (o >= c - 150 && o < c) { const p = (o - c + 150) / 150; s *= 1 + 0.3 * p * p; b = Math.max(b, 16 * p); }
    if (o >= c && o < c + 220) { const p = 1 - (1 - (o - c) / 220) ** 3; s *= 1.35 - 0.35 * p; b = Math.max(b, 18 * (1 - p)); }
  }
  for (const [a, d, k] of punches) {
    if (o >= a && o < a + d) { const t = o - a; s *= 1 + (k - 1) * Math.min(1, t / 70) * Math.min(1, (a + d - o) / 160); }
  }
  return {transform: s !== 1 ? `scale(${s})` : undefined, filter: b > 0.5 ? `blur(${b}px)` : undefined};
};
