// FOMO × ClipFarm campaign (2026-11-14): 5 shorts from the focus video "Guess The Fake Millionaire (ft. Brez)" in Jorho v1.
// Brief rules applied: only focus-video footage (no cut-outs / outside images), each clip has ≥ 8 continuous source seconds that
// ARE the point, hook in 2 s (craziest line first, then a flash "rewind" and it plays), BIG word-by-word captions in white with a
// black outline, punch-ins on the big lines, 9:16 crop following the face on screen, every clip a different moment, nothing
// re-edited to change meaning (unclear audio is cut, not guessed), headline = what actually happens. Post captions must mention @fomo.
import type {CSSProperties} from 'react';
import {interpolate} from 'remotion';
import {clamp, timeline, type TL} from '../e3/kit';
import {chunkWords, wordsFrom, type Word} from '../jorho/kit';
import {Jorho, type Spec} from '../jorho/clips';
import track from '../plans/data/fomo_millionaire.track.json';
import cw from '../plans/data/fomo_clipwords.json';

type Track = Spec['track'];
const SRC = 'fomo/fomo.mp4';
const WHITE = '#FFFFFF';
// captions per segment (cold opens repeat source ranges), all white, word by word (pairs only when a word is < 0.18 s)
const caps = (raw: {text: string; startMs: number}[], tl: TL, fix: Record<string, string> = {}): Word[] =>
  chunkWords(tl.segs.flatMap((s, i) => wordsFrom(raw, timeline([[s[0], s[1]]]), fix).map((w) => ({...w, at: w.at + tl.segOut[i], color: WHITE}))),
    tl.total, tl.segOut, 180, 11);
// punch-ins on the beats: quick 1 → 1.14 scale, held for the line, eased back
const punch = (beats: [number, number][]) => (o: number): CSSProperties => {
  const b = beats.find(([a, e]) => o >= a - 1 && o < e + 200);
  if (!b) return {};
  const k = interpolate(o, [b[0], b[0] + 120, b[1], b[1] + 200], [1, 1.14, 1.14, 1], clamp);
  return {transform: `scale(${k})`};
};
const base = (tl: TL, top: string, words: Word[], music: string, beats: [number, number][], speechGain = 1): Spec => ({ speechGain,
  tl, src: SRC, track: track as unknown as Track, top, wordY: 1300, wideX: 960, words, capSize: 78,
  shots: [[0, 'M']], strobes: [tl.segOut[1]], tints: [], swish: [], camFx: punch(beats),
  music: {file: music, from: 15000, level: 0},
});

// 1 · the reveal: the panel picked #2, the real fake was Iron Man
const r = timeline([[1548800, 1550150], [1521600, 1523800], [1544000, 1561440]]);
export const FOMO_REVEAL_MS = r.total;
const REVEAL = base(r, 'They picked the WRONG fake millionaire', caps(cw.reveal, r), 'midnight-club.mp3',
  [[0, r.segOut[1]], [r.out(1548940), r.out(1550000)], [r.out(1558340), r.out(1561160)]]);
export const FomoReveal = () => <Jorho s={REVEAL} />;

// 2 · dumbest thing you ever bought: a bowling alley
const b = timeline([[357460, 359300], [349700, 362300]]);
export const FOMO_BOWLING_MS = b.total;
const BOWLING = base(b, '"Dumbest thing you ever bought?" A bowling alley', caps(cw.bowling, b), 'joyful-chess-slowed.mp3',
  [[0, b.segOut[1]], [b.segOut[1] + 3560, b.segOut[1] + 4600], [b.segOut[1] + 7900, b.segOut[1] + 9600]], 1.8);
export const FomoBowling = () => <Jorho s={BOWLING} />;

// 3 · down a 400k cost basis on a coin that's down 98%
const l = timeline([[290120, 294500], [284240, 290120], [294700, 303150]]);
export const FOMO_LOSS_MS = l.total;
const LOSS = base(l, 'Down $400K on a coin he "forgot to sell"', caps(cw.loss, l), 'interstellar-piano.mp3',
  [[0, l.segOut[1]], [l.segOut[2] + 900, l.segOut[2] + 2400], [l.segOut[2] + 6700, l.segOut[2] + 8200]], 2.0);
export const FomoLoss = () => <Jorho s={LOSS} />;

// 4 · Chainlink in 2026 = IQ check (hot take), then the contestant's defence
const c = timeline([[630800, 636000], [623360, 630750], [636000, 646010]]);
export const FOMO_CHAINLINK_MS = c.total;
const CHAINLINK = base(c, 'Still holding Chainlink in 2026?', caps(cw.chainlink, c), 'lose-you-adturnup.mp3',
  [[c.out(634520), c.out(635980)], [c.segOut[1] + 1500, c.segOut[1] + 2400], [c.out(645020), c.out(646000)]], 1.4);
export const FomoChainlink = () => <Jorho s={CHAINLINK} />;

// 5 · "I love Ransom" → "Who the heck is Ransom?" → "No, no, Ansem"
const n = timeline([[584000, 588000], [575940, 581250], [589900, 603560]]);
export const FOMO_RANSOM_MS = n.total;
const RANSOM = base(n, '"Who the heck is Ransom?"', caps(cw.ransom, n), 'jorho-qkthr.mp3',
  [[n.out(586780), n.out(588000)], [n.out(579120), n.out(581200)], [n.out(590920), n.out(593060)]], 1.6);
export const FomoRansom = () => <Jorho s={RANSOM} />;
