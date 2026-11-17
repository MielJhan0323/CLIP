// KEY-WORD HIGHLIGHTS (user 2026-11-15: "maybe add color on the captions" / "highlight different words and emojis"):
// every caption word is white EXCEPT the key words of the clip, each in its own colour; some key words also pop an iOS emoji above
// the caption while the word is on screen.
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {pop} from '../e3/kit';
import type {Word} from './kit';

export type Hi = Record<string, string | [color: string, emoji: string]>; // bare lowercase word → colour | [colour, iOS emoji code]
export const HC = {green: '#58EE28', yellow: '#F9FC35', cyan: '#21F5E6', red: '#FF4D4D', pink: '#FF4FD8', orange: '#FF9F1C'};
const key = (t: string) => t.toLowerCase().replace(/^[^a-z0-9$*]+|[^a-z0-9%*]+$/g, '');
export const applyHi = (words: Word[], hi?: Hi): Word[] => (hi ? words.map((w) => {
  const h = hi[key(w.text)];
  return {...w, color: h ? (typeof h === 'string' ? h : h[0]) : '#FFFFFF'};
}) : words);
// user 2026-11-16: "some emojis appear glitchy" → each emoji holds a steady 900 ms from its word (not the word's own length), and a
// new emoji can only start ≥ 1200 ms after the previous one — no flicker on/off between quick key words
export const emojiTimes = (words: Word[], hi?: Hi) => {
  const out: {at: number; code: string}[] = [];
  if (!hi) return out;
  for (const w of words) { const h = hi[key(w.text)]; if (Array.isArray(h) && (!out.length || w.at - out[out.length - 1].at >= 1200)) out.push({at: w.at, code: h[1]}); }
  return out;
};
export const EmojiPop = ({o, words, hi, y}: {o: number; words: Word[]; hi?: Hi; y: number}) => {
  const e = emojiTimes(words, hi).find((x) => o >= x.at && o < x.at + 900);
  if (!e) return null;
  const fade = Math.min(1, (e.at + 900 - o) / 120);
  return <div style={{position: 'absolute', left: 0, right: 0, top: y - 190, display: 'flex', justifyContent: 'center', opacity: fade}}>
    <Img src={staticFile(`emoji-ios/${e.code}.png`)} style={{width: 110, height: 110, transform: `scale(${Math.min(1, pop(o, e.at, 14, 220))})`}} />
  </div>;
};

// AUTO HOOK (user 2026-11-16: "make sure the edits always have a hook … high retention"): when a clip has no custom hook graphic, the
// cold open gets the title punched in word-by-word over the dimmed footage + an emoji pop, so nothing ever opens on plain footage.
export const AutoHook = ({o, end, text, emoji = '1f480', top = 330}: {o: number; end: number; text: string; emoji?: string; top?: number}) => {
  // 2026-11-17 "the on screen text should type out in the beginning": typewriter over the cold open (key words keep their colours),
  // ≤ 45 ms per character and finished by ~60 % of the hook; a cursor blinks while typing; emoji pops once the line is done
  if (o >= end) return null;
  const plain = text.replace(/[[\]]/g, '');
  const per = Math.min(45, (end * 0.6) / Math.max(1, plain.length));
  const n = Math.min(plain.length, Math.floor(o / per));
  const typing = n < plain.length;
  const fade = Math.min(1, (end - o) / 160);
  // walk the [bracketed] parts, keeping only the first n visible characters
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  const cols = ['#F9FC35', '#58EE28', '#21F5E6'];
  let left = n, k = 0;
  const shown = parts.map((p, i) => {
    const hl = p.startsWith('['), body = hl ? p.slice(1, -1) : p, col = hl ? cols[k++ % cols.length] : undefined;
    const t = body.slice(0, Math.max(0, left)); left -= body.length;
    return t ? <span key={i} style={{color: col}}>{t}</span> : null;
  });
  return <AbsoluteFill style={{background: 'rgba(0,0,0,0.3)', opacity: fade}}>
    <div style={{position: 'absolute', left: 60, right: 60, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 72, lineHeight: '86px', color: 'white',
      WebkitTextStroke: '6px #111', paintOrder: 'stroke fill', textTransform: 'uppercase'}}>{shown}
      {typing && Math.floor(o / 260) % 2 === 0 && <span style={{color: 'white'}}>|</span>}</div>
    {!typing && <div style={{position: 'absolute', left: 0, right: 0, top: top + 300, display: 'flex', justifyContent: 'center'}}>
      <Img src={staticFile(`emoji-ios/${emoji}.png`)} style={{width: 130, height: 130, transform: `scale(${Math.min(1, pop(o, plain.length * per, 12, 260))})`}} /></div>}
  </AbsoluteFill>;
};
export const hookTypeMs = (text: string, end: number) => Math.min(text.replace(/[[\]]/g, '').length * 45, end * 0.6);
