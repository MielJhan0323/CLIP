// dead-air trims (viral #3): split each segment where speech pauses > maxGap; each cut keeps ~250 ms after the last word.
import type {Seg} from '../e3/kit';
type Raw = {text: string; startMs: number; endMs: number}[];
export const tighten = (segs: Seg[], raw: Raw, maxGap = 380): Seg[] => {
  const all = [...raw].sort((x, y) => x.startMs - y.startMs);
  const nextStart = (ms: number) => all.find((w) => w.startMs > ms)?.startMs ?? Infinity;
  // a cut keeps ~250 ms after the last word's end (word end-times run early → the last syllable got clipped), never into the next word
  const tail = (w: Raw[number]) => Math.min(w.endMs + 250, nextStart(w.startMs) - 60);
  return segs.flatMap(([a, b, hold]) => {
    const ws = all.filter((w) => w.startMs >= a && w.startMs < b);
    const out: Seg[] = [];
    let s0 = a;
    for (let k = 0; k + 1 < ws.length; k++) {
      if (ws[k + 1].startMs - ws[k].endMs > maxGap) { out.push([s0, tail(ws[k])]); s0 = Math.max(s0, ws[k + 1].startMs - 90); }
    }
    const end = ws.length ? Math.max(b, tail(ws[ws.length - 1])) : b;
    out.push(hold ? [s0, end, hold] : [s0, end]);
    return out.filter(([x, y]) => y - x > 120);
  });
};

