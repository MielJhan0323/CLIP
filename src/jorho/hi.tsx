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
export const EmojiPop = ({o, words, hi, y}: {o: number; words: Word[]; hi?: Hi; y: number}) => {
  if (!hi) return null;
  const w = [...words].reverse().find((x) => o >= x.at && o < (x.end ?? x.at + 900));
  const h = w && hi[key(w.text)];
  if (!w || !h || typeof h === 'string') return null;
  return <div style={{position: 'absolute', left: 0, right: 0, top: y - 190, display: 'flex', justifyContent: 'center'}}>
    <Img src={staticFile(`emoji-ios/${h[1]}.png`)} style={{width: 110, height: 110, transform: `scale(${pop(o, w.at, 10, 260)})`}} />
  </div>;
};

// AUTO HOOK (user 2026-11-16: "make sure the edits always have a hook … high retention"): when a clip has no custom hook graphic, the
// cold open gets the title punched in word-by-word over the dimmed footage + an emoji pop, so nothing ever opens on plain footage.
export const AutoHook = ({o, end, text, emoji = '1f480', top = 330}: {o: number; end: number; text: string; emoji?: string; top?: number}) => {
  if (o >= end) return null;
  const words = text.toUpperCase().split(' ');
  const step = Math.min(110, (end * 0.55) / Math.max(1, words.length));
  const fade = Math.min(1, (end - o) / 160);
  return <AbsoluteFill style={{background: 'rgba(0,0,0,0.5)', opacity: fade}}>
    <div style={{position: 'absolute', left: 50, right: 50, top, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 78, lineHeight: '90px', color: 'white',
      WebkitTextStroke: '6px #111', paintOrder: 'stroke fill'}}>
      {words.map((w, i) => (o >= i * step ? <span key={i} style={{display: 'inline-block', marginRight: 20, color: i === words.length - 1 ? '#F9FC35' : 'white',
        transform: `scale(${pop(o, i * step, 10, 300)})`}}>{w}</span> : null))}
    </div>
    {o >= words.length * step && <div style={{position: 'absolute', left: 0, right: 0, top: top + 330, display: 'flex', justifyContent: 'center'}}>
      <Img src={staticFile(`emoji-ios/${emoji}.png`)} style={{width: 150, height: 150, transform: `scale(${pop(o, words.length * step, 9, 260)})`}} /></div>}
  </AbsoluteFill>;
};
