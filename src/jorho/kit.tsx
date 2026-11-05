// "Jorho" style v2 (vault/02 Style Guide/Jorho style.md): measured frame by frame from the four reference videos
// (Backyard Breaks Daily Trevor Shorts, 30 fps). Every number below is a measurement, not a guess:
// - layout: black frame, video box y 417-1494 (centred), Montserrat Bold top line sitting right on the box, 💀 last
// - intro: the box opens from 700 to 1077 px tall over 24 frames while the footage clears from blown-out + blurred
// - captions: one word, Montserrat, yellow/cyan/green/white, 2-frame horizontal smear on entry, stays to the next word
// - white strobe: an 11-frame blow-out preset with a 1-frame dip where the shot changes
// - green (167,234,4) and red (244,3,5) tints at 62 % (3 frames in, 3 held, 3 out)
// - cut-out photo: lands huge + blurred + yellow-washed under a green tint, settles in 10 frames, leaves on a strobe
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {FPS, W, clamp, type TL} from '../e3/kit';

export const BOX_TOP = 417;
export const BOX_BOTTOM = 1494;
export const BOX_H = BOX_BOTTOM - BOX_TOP;
export const JORHO = {yellow: '#F9FC35', cyan: '#21F5E6', green: '#58EE28', white: '#FFFFFF'};
export const fr = (o: number) => Math.round((o * FPS) / 1000);
const msOf = (n: number) => (n * 1000) / FPS;

// ---- layout + intro reveal -----------------------------------------------------------------------------------
const INTRO_F = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const INTRO_TOP = [609, 573, 537, 504, 474, 450, 432, 420, BOX_TOP];
const INTRO_BOT = [1308, 1341, 1377, 1410, 1434, 1458, 1479, 1491, BOX_BOTTOM];
export const introFilter = (o: number) => {
  const f = fr(o);
  if (f > 18) return '';
  const blur = interpolate(f, [0, 6, 12, 18], [26, 14, 5, 0], clamp);
  const bright = interpolate(f, [0, 4, 10, 18], [1.9, 1.45, 1.15, 1], clamp);
  return `blur(${blur}px) brightness(${bright}) contrast(${2 - bright * 0.9 > 0.6 ? 2 - bright * 0.9 : 0.6})`;
};
// "light" look (from the top-performing gift_ticket edit, 2026-11-01): blurred copy of the video fills the frame, a white band
// y 191-474 holds the top line (black Montserrat caps + emoji), the video box sits at y 475-1444; opens on a white flash (no box reveal).
export const LIGHT = {band: [191, 474], box: [475, 1444]};
const FlashIn = ({o}: {o: number}) => {
  const k = [1, 0.85, 0.7, 0.55, 0.42, 0.3, 0.18, 0.08][fr(o)];
  return k ? <AbsoluteFill style={{background: 'white', opacity: k}} /> : null;
};
export const Frame = ({o, top, children, over, light}: {o: number; top: string; children: ReactNode; over?: ReactNode; light?: boolean}) => {
  if (light) {
    const bh = LIGHT.box[1] - LIGHT.box[0];
    return <AbsoluteFill style={{background: '#222'}}>
      <div style={{position: 'absolute', left: -200, top: 0, width: W + 400, height: 1920, overflow: 'hidden', filter: 'blur(38px) brightness(0.92) saturate(1.1)'}}>
        <div style={{position: 'absolute', left: 200, top: (1920 - BOX_H) / 2, width: W, height: BOX_H, transform: 'scale(1.8)', transformOrigin: '50% 50%'}}>{children}</div>
      </div>
      <div style={{position: 'absolute', left: 0, top: LIGHT.band[0], width: W, height: LIGHT.band[1] - LIGHT.band[0], background: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 60, lineHeight: '70px', color: '#111', textAlign: 'center', maxWidth: 940, textTransform: 'uppercase'}}>
          {top}<Img src={staticFile('emoji-ios/1f480.png')} style={{width: 56, height: 56, verticalAlign: '-8px', marginLeft: 6}} /></div>
      </div>
      <div style={{position: 'absolute', left: 0, top: LIGHT.box[0], width: W, height: bh, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: -(BOX_H - bh) / 2, width: W, height: BOX_H}}>{children}</div>
      </div>
      {over}
      <FlashIn o={o} />
    </AbsoluteFill>;
  }
  const f = fr(o);
  const t = interpolate(f, INTRO_F, INTRO_TOP, clamp);
  const b = interpolate(f, INTRO_F, INTRO_BOT, clamp);
  const smear = f < 16 ? interpolate(f, [0, 16], [70, 0], clamp) : 0;
  return <AbsoluteFill style={{background: 'black'}}>
    <div style={{position: 'absolute', left: 0, top: BOX_TOP, width: W, height: BOX_H, overflow: 'hidden', clipPath: `inset(${t - BOX_TOP}px 0 ${BOX_BOTTOM - b}px 0)`}}>
      <AbsoluteFill style={{transform: f < 19 ? `translateX(${smear}px) scale(1.12)` : undefined, filter: introFilter(o) || undefined}}>{children}</AbsoluteFill>
    </div>
    <div style={{position: 'absolute', left: 0, width: W, bottom: 1920 - t + 3, display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: MONT, fontWeight: 700, fontSize: 58, lineHeight: '65px', color: 'white', textAlign: 'center', maxWidth: 900}}>
        {top}<Img src={staticFile('emoji-ios/1f480.png')} style={{width: 50, height: 50, verticalAlign: '-6px', marginLeft: 4}} />
      </div>
    </div>
    {over}
  </AbsoluteFill>;
};

// ---- one-word captions ---------------------------------------------------------------------------------------
export type Word = {text: string; at: number; color: string};
const PAL = [JORHO.yellow, JORHO.cyan, JORHO.green, JORHO.white];
const hash = (s: string, i: number) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 9973, 7 + i * 13);
export const wordsFrom = (raw: {text: string; startMs: number}[], tl: TL, fix: Record<string, string> = {}, colors: Record<string, string> = {}): Word[] => {
  const out: Word[] = [];
  raw.forEach((w) => {
    if (!tl.segs.some(([x, y]) => w.startMs >= x && w.startMs < y)) return; // word was cut
    const bare = w.text.trim().replace(/^[-]+|[.,!?]+$/g, '');
    const text = fix[bare] ?? bare;
    if (!text) return;
    out.push({text, at: tl.out(w.startMs), color: colors[text] ?? PAL[hash(text, out.length) % PAL.length]});
  });
  // OUTPUT order, not source order: with a cold open (a later line placed first) source order breaks OneWord (2026-11-05 caption bug)
  return out.sort((a, b) => a.at - b.at);
};
// the word stays until the next one (or 1.2 s of silence); first 2 frames are a horizontal smear
export const OneWord = ({o, words, y}: {o: number; words: Word[]; y: number}) => {
  let i = -1;
  words.forEach((w, j) => { if (o >= w.at) i = j; });
  if (i < 0) return null;
  const w = words[i];
  if (o > (words[i + 1]?.at ?? Infinity) || o > w.at + 1200) return null;
  const k = fr(o) - fr(w.at);
  const smear = k < 2 ? {transform: `scaleX(${k === 0 ? 1.35 : 1.15})`, filter: `blur(${k === 0 ? 5 : 2.5}px)`, opacity: 0.85} : {};
  return <div style={{position: 'absolute', left: 0, width: W, top: y - 40, textAlign: 'center', ...smear}}>
    <span style={{fontFamily: MONT, fontWeight: 800, fontSize: 58, color: w.color, WebkitTextStroke: '5px #111', paintOrder: 'stroke fill',
      textShadow: '0 3px 8px rgba(0,0,0,0.7)'}}>{w.text}</span>
  </div>;
};

// ---- white strobe: 11-frame blow-out preset; put the shot change on frame 6 (the dip) ---------------------------
const STROBE = [0.6, 0.45, 0.7, 0.85, 0.85, 0.85, -0.15, 0.95, 1, 1, 0.95];
export const STROBE_CUT = msOf(6); // ms after the strobe starts where the next shot should begin
export const strobe = (o: number, at: number[]) => {
  const k = at.map((t) => STROBE[fr(o) - fr(t)]).find((x) => x !== undefined);
  if (k === undefined) return '';
  return k < 0 ? 'brightness(0.85)' : `brightness(${1 + 1.5 * k}) contrast(${1 + 0.55 * k}) saturate(${1 - 0.25 * k})`;
};

// ---- colour tints ---------------------------------------------------------------------------------------------
const TINT = [0.21, 0.42, 0.62, 0.62, 0.62, 0.53, 0.35, 0.17];
export const GREEN = 'rgb(167,234,4)';
export const RED = 'rgb(244,3,5)';
export const Tints = ({o, list}: {o: number; list: [number, string][]}) => {
  const hit = list.map(([t, c]) => [TINT[fr(o) - fr(t)], c] as const).find(([a]) => a !== undefined);
  return hit ? <AbsoluteFill style={{background: hit[1], opacity: hit[0], pointerEvents: 'none'}} /> : null;
};

// ---- cut-out photo ---------------------------------------------------------------------------------------------
// lands at 1.5x, blurred and yellow-washed, settles in 10 frames to a yellow-orange outline; exits on a strobe
const EXIT = [1, 0, 1, 0, 0, 1, 0, 0];
export const Cutout = ({o, file, from, to, x, h}: {o: number; file: string; from: number; to: number; x: number; h: number}) => {
  const k = fr(o) - fr(from);
  const e = fr(o) - fr(to);
  if (k < 0 || e >= EXIT.length || (e >= 0 && !EXIT[e])) return null;
  const p = interpolate(k, [0, 10], [0, 1], {...clamp, easing: (v) => 1 - (1 - v) ** 3});
  const slide = e >= 0 ? e * 18 : 0;
  const rim = '#FFB400';
  const outline = `drop-shadow(4px 0 0 ${rim}) drop-shadow(-4px 0 0 ${rim}) drop-shadow(0 4px 0 ${rim}) drop-shadow(0 -4px 0 ${rim})`;
  return <div style={{position: 'absolute', left: x + slide, bottom: 0, height: h, transform: `scale(${1.5 - 0.5 * p})`, transformOrigin: '50% 100%',
    filter: `${outline} blur(${(1 - p) * 10}px)`}}>
    <Img src={staticFile(`img/jorho/${file}`)} style={{height: '100%'}} />
    {p < 1 && <Img src={staticFile(`img/jorho/${file}`)} style={{position: 'absolute', left: 0, top: 0, height: '100%',
      filter: 'sepia(1) saturate(9) hue-rotate(8deg) brightness(1.5)', opacity: 1 - p}} />}
  </div>;
};

// ---- big meme pop (gift_ticket: 💀 on the absurd line, Santa on "gift") ---------------------------------------------
// iOS emoji PNG or a cut-out image, popped onto ONE trigger word in the lower part of the frame (not over faces)
export const MemePop = ({o, at, to, src, x = 340, y = 1480, size = 400}: {o: number; at: number; to: number; src: string; x?: number; y?: number; size?: number}) => {
  if (o < at || o >= to) return null;
  const k = fr(o) - fr(at);
  const s = interpolate(k, [0, 3, 6], [0.3, 1.12, 1], clamp);
  const out = interpolate(o, [to - 120, to], [1, 0], clamp);
  return <Img src={staticFile(src)} style={{position: 'absolute', left: x, top: y, width: size, transform: `scale(${s})`, opacity: out,
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.45))'}} />;
};

// ---- asterisk narration label (refs 2026-11-01: *thinking*, *impressed*, *bros too rich to care*, *20,000$ card*) -------
// editor's commentary / labels, lowercase in asterisks, bold + glow + dark outline; can sit over the speaker while one-word captions run
export const Asterisk = ({o, a, b, text, y, x, cx, color = '#FFFFFF', size = 54}: {o: number; a: number; b: number; text: string; y: number; x?: number; cx?: number; color?: string; size?: number}) => {
  if (o < a || o >= b) return null;
  const s = interpolate(fr(o) - fr(a), [0, 3, 5], [0.6, 1.08, 1], clamp);
  if (cx !== undefined) return <div style={{position: 'absolute', top: y, left: cx, transform: `translateX(-50%) scale(${s})`, whiteSpace: 'nowrap',
    opacity: interpolate(o, [b - 120, b], [1, 0], clamp)}}><span style={{fontFamily: MONT, fontWeight: 800, fontSize: size, color, WebkitTextStroke: '4px #111',
    paintOrder: 'stroke fill', textShadow: `0 0 16px ${color}88, 0 3px 8px rgba(0,0,0,0.7)`}}>*{text}*</span></div>; // centred on a tracked face
  return <div style={{position: 'absolute', top: y, left: x ?? 0, width: x === undefined ? W : undefined, textAlign: 'center', transform: `scale(${s})`,
    opacity: interpolate(o, [b - 120, b], [1, 0], clamp)}}>
    <span style={{fontFamily: MONT, fontWeight: 800, fontSize: size, color, WebkitTextStroke: '4px #111', paintOrder: 'stroke fill',
      textShadow: `0 0 16px ${color}88, 0 3px 8px rgba(0,0,0,0.7)`}}>*{text}*</span>
  </div>;
};
// curved hand-drawn red arrow + red "*TREVOR LAWRENCE*" label pointing at a person (who's who for non-fans; once per video)
export const CallOut = ({o, a, b, x, y, label, flip}: {o: number; a: number; b: number; x: number; y: number; label: string; flip?: boolean}) => {
  if (o < a || o >= b) return null;
  const p = interpolate(o - a, [0, 220], [0, 1], clamp);
  const d = flip ? 'M 230 260 C 120 250, 40 180, 60 40' : 'M 30 260 C 140 250, 220 180, 200 40';
  return <div style={{position: 'absolute', left: x - (flip ? 60 : 200), top: y, opacity: interpolate(o, [b - 120, b], [1, 0], clamp)}}>
    <svg width={260} height={280} style={{overflow: 'visible'}}>
      <path d={d} fill="none" stroke="#E8132B" strokeWidth={16} strokeLinecap="round" strokeDasharray={420} strokeDashoffset={420 * (1 - p)}
        style={{filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'}} />
      {p > 0.9 && <polygon points={flip ? '60,0 20,60 100,55' : '200,0 160,55 240,60'} fill="#E8132B" />}
    </svg>
    <div style={{position: 'absolute', top: 270, left: flip ? -40 : -180, width: 460, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 46,
      color: '#E8132B', WebkitTextStroke: '5px white', paintOrder: 'stroke fill', opacity: p}}>*{label}*</div>
  </div>;
};

// red ring that draws itself around a TRACKED head (face from the spec overlay: x, y, k = crop zoom), pair with ding-2
export const HeadRing = ({o, a, b, x, y, k, label}: {o: number; a: number; b: number; x: number; y: number; k: number; label?: string}) => {
  if (o < a || o >= b) return null;
  const r = 92 * k; // ≈ half a head in source px × crop zoom
  const p = interpolate(o - a, [0, 220], [0, 1], clamp);
  const C = 2 * Math.PI * r;
  return <svg width={W} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible', opacity: interpolate(o, [b - 150, b], [1, 0], clamp)}}>
    <circle cx={x} cy={y - 10 * k} r={r} fill="none" stroke="#FF1E1E" strokeWidth={11} strokeDasharray={C} strokeDashoffset={C * (1 - p)}
      transform={`rotate(-90 ${x} ${y - 10 * k})`} style={{filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.5))'}} />
    {label && p > 0.6 && <text x={x} y={y - 10 * k + r + 52} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={46} fill="#E8132B"
      stroke="white" strokeWidth={10} paintOrder="stroke" opacity={interpolate(p, [0.6, 1], [0, 1], clamp)}>*{label}*</text>}
  </svg>;
};

// ---- caption chunking (user 2026-11-05: "fix the subtitles because it's glitching out") ---------------------------------------
// Fast talk gives words that show for 1–3 frames (and the 2-frame smear on each makes them flicker). Group words into chunks of
// 1–3 words so every caption stays up ≥ minMs; a short leftover merges into its neighbour. Colour = the longest word's colour.
// `breaks` = output times where a new sentence/segment starts (e.g. tl.segOut): chunks never span one.
export const chunkWords = (words: Word[], total: number, breaks: number[] = [], minMs = 260, maxChars = 15): Word[] => {
  const ws = words.filter((w) => w.text).sort((a, b) => a.at - b.at);
  const split = (a: number, b: number) => breaks.some((x) => x > a && x <= b);
    const chunks: {parts: Word[]; at: number}[] = [];
  for (let i = 0; i < ws.length; i++) {
    const c = {parts: [ws[i]], at: ws[i].at};
    let end = i;
    while (end + 1 < ws.length && !split(ws[end].at, ws[end + 1].at) && (ws[end + 1].at - c.at) < minMs && c.parts.length < 3
      && c.parts.map((p) => p.text).join(' ').length + 1 + ws[end + 1].text.length <= maxChars) { end++; c.parts.push(ws[end]); }
    chunks.push(c); i = end;
  }
  // merge chunks still shorter than minMs into the previous one when it fits, else into the next
  const len = (k: number, arr: typeof chunks) => (k + 1 < arr.length ? arr[k + 1].at : total) - arr[k].at;
  for (let k = 0; k < chunks.length; k++) {
    if (len(k, chunks) >= minMs * 0.75 || chunks.length < 2) continue;
    const txt = (c: typeof chunks[number]) => c.parts.map((p) => p.text).join(' ');
    if (k > 0 && !split(chunks[k - 1].at, chunks[k].at) && txt(chunks[k - 1]).length + 1 + txt(chunks[k]).length <= maxChars + 4) { chunks[k - 1].parts.push(...chunks[k].parts); chunks.splice(k, 1); k--; }
    else if (k + 1 < chunks.length && !split(chunks[k].at, chunks[k + 1].at) && txt(chunks[k]).length + 1 + txt(chunks[k + 1]).length <= maxChars + 4) { chunks[k + 1].parts.unshift(...chunks[k].parts); chunks[k + 1].at = chunks[k].at; chunks.splice(k, 1); k--; }
  }
  return chunks.map((c) => {
    const key = c.parts.reduce((a, b) => (b.text.length > a.text.length ? b : a));
    return {text: c.parts.map((p) => p.text).join(' '), at: c.at, color: key.color};
  });
};
