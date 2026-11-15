// KEY-WORD HIGHLIGHTS (user 2026-11-15: "maybe add color on the captions" / "highlight different words and emojis"):
// every caption word is white EXCEPT the key words of the clip, each in its own colour; some key words also pop an iOS emoji above
// the caption while the word is on screen.
import {Img, staticFile} from 'remotion';
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
