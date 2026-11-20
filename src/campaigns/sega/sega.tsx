// SEGA Steam Black Friday Sale (Clipping Culture, 2026-11-20, vault/05 Campaigns/SEGA/Brief.md).
// Rules that shape this builder: ONLY official footage + official audio (no added music, NO added SFX, no AI voice),
// on-screen text must be true (only prices shown in the official video), no exaggerated hooks.
// So: the official music runs continuously underneath while the video is re-cut (biggest discounts first),
// typed hook in the empty top band, punch-in on every cut, a short white flash on each cut, true footer text at the end.
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from '../../e3/kit';
import {MONT} from '../../e3/bars';

type Seg = [from: number, to: number];
export type SegaCfg = {file: string; segs: Seg[]; audioFrom?: number; hook: string; footer?: [atMs: number, text: string]};
const f = (ms: number) => Math.round((ms / 1000) * FPS);

export const makeSega = (c: SegaCfg) => {
  const starts: number[] = [];
  let acc = 0;
  for (const [a, b] of c.segs) { starts.push(acc); acc += (b - a) * 1000; }
  const total = acc;
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const si = starts.findLastIndex((t) => o >= t);
    const inSeg = o - starts[si];
    const scale = 1 + 0.06 * Math.max(0, 1 - inSeg / 250) + 0.03 * (inSeg / ((c.segs[si][1] - c.segs[si][0]) * 1000));
    const flash = si > 0 ? Math.max(0, 1 - inSeg / 120) * 0.55 : 0;
    const plain = c.hook.replace(/[[\]]/g, '');
    const n = Math.min(plain.length, Math.floor((o + 450) / 36));
    let left = n;
    return <AbsoluteFill style={{background: '#211f1f'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        {c.segs.map(([a, b], i) => <Sequence key={i} from={f(starts[i])} durationInFrames={Math.max(1, f(starts[i] + (b - a) * 1000) - f(starts[i]))}>
          <OffthreadVideo src={staticFile(c.file)} trimBefore={Math.round(a * FPS)} muted style={{width: '100%', height: '100%'}} />
        </Sequence>)}
      </AbsoluteFill>
      <Audio src={staticFile(c.file)} trimBefore={Math.round((c.audioFrom ?? Math.max(0, 30 - total / 1000)) * FPS)} volume={(fr) => Math.min(1, (f(total) - fr) / 6)} />
      {flash > 0 && <AbsoluteFill style={{background: 'white', opacity: flash}} />}
      <div style={{position: 'absolute', left: 40, right: 40, top: 95, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 60, lineHeight: '70px', color: 'white', textAlign: 'center', WebkitTextStroke: '6px #0b0b2e',
          paintOrder: 'stroke fill', textShadow: '0 4px 14px rgba(0,0,0,0.6)'}}>
          {c.hook.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) => { const hl = p.startsWith('['); const body = hl ? p.slice(1, -1) : p; const t = body.slice(0, Math.max(0, left)); left -= body.length;
            return t ? <span key={i} style={{color: hl ? '#4CF27A' : 'white'}}>{t}</span> : null; })}
        </div>
      </div>
      {c.footer && o >= c.footer[0] && <div style={{position: 'absolute', left: 0, right: 0, top: 1690, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, color: '#111', background: '#4CF27A', padding: '12px 36px', borderRadius: 16,
          transform: `scale(${Math.min(1, 0.6 + (o - c.footer[0]) / 300)})`}}>{c.footer[1]}</div>
      </div>}
    </AbsoluteFill>;
  };
  return {Comp, total};
};

// Demo: biggest official discounts first, end card last. Prices are exactly the ones in the official video.
export const SEGA_DEMO = makeSega({file: 'sega/sega_set1.mp4', audioFrom: 12.7,
  hook: 'SEGA GAMES UP TO [85% OFF] ON STEAM',
  segs: [[27.0, 28.5], [19.7, 22.6], [9.05, 11.25], [6.1, 7.8], [12.1, 14.4], [16.4, 18.2], [23.6, 25.9], [27.4, 30.0]],
  footer: [14700, 'LIMITED TIME ONLY']});
export const SegaDemo = SEGA_DEMO.Comp;

// 5 more edits (2026-11-20 "give me more videos like 5"). Each one a different angle + on-screen text (brief: no same video twice).
// audioFrom omitted = the official music's last N seconds, so its ending lands on the end card.
const S1 = 'sega/sega_set1.mp4', S2 = 'sega/sega_set2.mp4';
const end = (t: number): [number, string] => [t, 'LIMITED TIME ONLY'];
const mk = (file: string, hook: string, segs: Seg[]) => { const tot = segs.reduce((a, [x, y]) => a + (y - x) * 1000, 0);
  return makeSega({file, hook, segs, footer: end(tot - (segs[segs.length - 1][1] - segs[segs.length - 1][0]) * 1000)}); };
export const SEGA_SONIC = mk(S1, '[SONIC] GAMES ARE ON SALE ON STEAM', [[27.0, 28.4], [6.1, 7.9], [15.3, 19.55], [27.2, 30.0]]);
export const SEGA_JRPG = mk(S1, '[JRPG] FANS, SEGA HAS DEALS ON STEAM', [[27.0, 28.4], [9.05, 11.95], [12.05, 15.2], [27.2, 30.0]]);
export const SEGA_STRAT = mk(S1, '[STRATEGY] FANS, CHECK THESE STEAM DEALS', [[27.0, 28.4], [19.65, 22.65], [22.75, 26.0], [27.2, 30.0]]);
export const SEGA_COUNT = mk(S1, 'SAVING THE [BIGGEST] SEGA DEAL FOR LAST', [[27.0, 28.4], [23.6, 25.4], [16.4, 18.2], [12.1, 13.9], [6.2, 7.9], [9.05, 10.85], [19.7, 22.6], [27.4, 30.0]]);
export const SEGA_INTRO = mk(S1, "SEGA'S BLACK FRIDAY SALE IS ON [STEAM]", [[0, 5.5], [6.3, 7.9], [9.05, 10.6], [12.1, 13.6], [16.4, 17.9], [19.7, 21.2], [23.6, 25.1], [27.2, 30.0]]);
export const SegaSonic = SEGA_SONIC.Comp, SegaJrpg = SEGA_JRPG.Comp, SegaStrat = SEGA_STRAT.Comp, SegaCount = SEGA_COUNT.Comp, SegaIntro = SEGA_INTRO.Comp;
