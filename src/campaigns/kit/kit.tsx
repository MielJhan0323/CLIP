// KIT = Kitsch x Nic Vans "Saint Nic" campaign (2026-11-20, vault/05 Campaigns/Kit/Brief.md).
// Brief: ONLY the provided footage, must be cut into a story (no raw reposts), a Kitsch product on screen in every clip,
// Nic always shown sweet / fun / kind, never name or guess the "special someone".
// The source ad already has burned-in subtitles, so no extra word captions: typed hook on top, cuts, punch-ins, flashes,
// SFX, and a product call-out pill when a Kitsch product is on screen.
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, Img} from 'remotion';
import {FPS, SfxTrack, sfx, pop} from '../../e3/kit';
import {MONT} from '../../e3/bars';

type Seg = [file: string, from: number, to: number]; // seconds in the source file
type Hit = [file: string, srcSec: number, sound: string, color?: 'green' | 'red' | 'yellow']; // placed where that source moment lands
type Pill = [file: string, srcSec: number, durMs: number, text: string];
export type KitCfg = {segs: Seg[]; hook: string; emoji?: string; hits?: Hit[]; pills?: Pill[]};

const f = (ms: number) => Math.round((ms / 1000) * FPS);

export const makeKit = (c: KitCfg) => {
  const starts: number[] = [];
  let acc = 0;
  for (const [, a, b] of c.segs) { starts.push(acc); acc += (b - a) * 1000; }
  const total = acc;
  const at = (file: string, sec: number) => { // source moment -> output ms (first segment that contains it)
    const i = c.segs.findIndex(([fl, a, b]) => fl === file && sec >= a && sec < b);
    return i < 0 ? -1 : starts[i] + (sec - c.segs[i][1]) * 1000;
  };
  const hits = (c.hits ?? []).map(([fl, s, sound, color]) => ({at: at(fl, s), sound, color: color ?? (sound.includes('akward') ? 'yellow' as const : undefined)})).filter((h) => h.at >= 0);
  const pills = (c.pills ?? []).map(([fl, s, dur, text]) => ({at: at(fl, s), dur, text})).filter((p) => p.at >= 0);
  const list = [sfx('fast-whoosh', 0, 0.45, 400), ...starts.slice(1).map((t) => sfx('mg-whoosh', t - 120, 0.35, 450)),
    ...hits.map((h) => sfx(h.sound, h.at, 0.65, 1800)), ...pills.map((p) => sfx('jv2-pop-button', p.at, 0.3, 300))];

  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const si = starts.findLastIndex((t) => o >= t);
    const inSeg = o - starts[si];
    const segLen = (c.segs[si][2] - c.segs[si][1]) * 1000;
    const hitK = hits.reduce((k, h) => (o >= h.at && o < h.at + 300 ? Math.max(k, 1 - (o - h.at) / 300) : k), 0);
    // every new shot lands with a small punch-in, then a slow push; key moments punch harder
    const scale = 1 + 0.05 * Math.max(0, 1 - inSeg / 220) + 0.04 * (inSeg / Math.max(segLen, 1)) + 0.07 * hitK;
    const flash = hits.find((h) => h.color && o >= h.at && o < h.at + 500);
    const plain = c.hook.replace(/[[\]]/g, '');
    const n = Math.min(plain.length, Math.floor((o + 400) / 38));
    let left = n;
    return <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        {c.segs.map(([fl, a, b], i) => <Sequence key={i} from={f(starts[i])} durationInFrames={Math.max(1, f(starts[i] + (b - a) * 1000) - f(starts[i]))}>
          <OffthreadVideo src={staticFile(fl)} trimBefore={Math.round(a * FPS)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </Sequence>)}
      </AbsoluteFill>
      {flash && <AbsoluteFill style={{background: flash.color === 'green' ? 'rgba(60,230,40,0.45)' : flash.color === 'yellow' ? 'rgba(255,215,0,0.5)' : 'rgba(240,30,30,0.45)',
        mixBlendMode: 'color', opacity: Math.min(1, (o - flash.at) / 60, (flash.at + 500 - o) / 140)}} />}
      {/* typed hook, stays the whole clip */}
      <div style={{position: 'absolute', left: 50, right: 50, top: 150, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, lineHeight: '76px', color: 'white', textAlign: 'center', WebkitTextStroke: '7px #111',
          paintOrder: 'stroke fill', textShadow: '0 4px 14px rgba(0,0,0,0.6)'}}>
          {c.hook.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) => { const hl = p.startsWith('['); const body = hl ? p.slice(1, -1) : p; const t = body.slice(0, Math.max(0, left)); left -= body.length;
            return t ? <span key={i} style={{color: hl ? '#FF4FA3' : 'white'}}>{t}</span> : null; })}
          {n >= plain.length && c.emoji && <Img src={staticFile(`emoji-ios/${c.emoji}.png`)} style={{width: 70, height: 70, marginLeft: 12, verticalAlign: '-12px'}} />}
        </div>
      </div>
      {/* product call-out */}
      {pills.filter((p) => o >= p.at && o < p.at + p.dur).map((p, i) => { const k = pop(o, p.at); const out = Math.min(1, (p.at + p.dur - o) / 200);
        return <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 1560, display: 'flex', justifyContent: 'center', opacity: out}}>
          <div style={{transform: `scale(${k})`, background: 'white', color: '#111', fontFamily: MONT, fontWeight: 900, fontSize: 46, padding: '14px 34px', borderRadius: 60,
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)', border: '5px solid #FF4FA3'}}>{p.text}</div>
        </div>; })}
      <SfxTrack list={list} />
    </AbsoluteFill>;
  };
  return {Comp, total};
};
