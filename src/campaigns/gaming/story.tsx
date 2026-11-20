// GAMING STORY cut (2026-11-20, refs: Kreek "SADDEST MOMENT in GTA 6!", "Doing WHAT With Lucia?!"):
// same stack as gaming.tsx (facecam top, gameplay bottom, seam hook, centred captions, logo), but the clip is CUT from several
// source pieces into a story, and the camera MOVES: keyframed pans + zooms on the gameplay and punch-ins on his face.
// User 2026-11-20: "use pans and zooms", "chill out on the filters" (light finish), swearing kept in captions.
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS, Music, SfxTrack, sfx} from '../../e3/kit';
import {OneWord, type Word} from '../../jorho/kit';
import {applyHi, type Hi} from '../../jorho/hi';
import {BOT_H, Crop, Seam, TOP_H} from './gaming';

type Raw = {text: string; startMs: number; endMs: number}[];
type Key = [srcSec: number, zoom: number, fx?: number, fy?: number]; // fx/fy = focus point in the panel, 0..1
export type StoryCfg = {file: string; src: [number, number]; cam: [number, number, number, number]; gameX?: number;
  segs: [from: number, to: number, file?: string, cam?: [number, number, number, number]][]; raws?: Record<string, Raw>; seam: string; emoji?: string; hi?: Hi; raw: Raw; logo?: string; music?: string; musicFrom?: number;
  hits?: [srcSec: number, sound: string, color?: 'green' | 'red' | 'yellow'][];
  game?: Key[]; face?: Key[];
  // sad part (user 2026-11-20 "grey overlay with the raining on screen ... when he mentions"): [fromSec, toSec] source seconds
  rain?: [number, number]; musicLevel?: number};
// procedural rain: deterministic streaks falling diagonally (no stock file needed, renders the same every time)
const DROPS = Array.from({length: 150}, (_, i) => ({x: (i * 7919) % 1180 - 50, off: (i * 104729) % 2200, v: 1.6 + ((i * 31) % 10) / 6, len: 40 + ((i * 17) % 50), w: 2 + (i % 3)}));
const Rain = ({o, k}: {o: number; k: number}) => <AbsoluteFill style={{opacity: k, pointerEvents: 'none'}}>
  <AbsoluteFill style={{background: 'rgba(55,62,72,0.28)'}} />
  {DROPS.map((d, i) => { const y = ((o * d.v + d.off) % 2200) - 150; return <div key={i} style={{position: 'absolute', left: d.x + y * 0.12, top: y, width: d.w, height: d.len,
    background: 'linear-gradient(rgba(220,230,240,0), rgba(220,230,240,0.55))', transform: 'rotate(-7deg)', borderRadius: 2}} />; })}
</AbsoluteFill>;
const f = (ms: number) => Math.round((ms / 1000) * FPS);
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

export const makeStory = (c: StoryCfg) => {
  const starts: number[] = []; let acc = 0;
  for (const [a, b] of c.segs) { starts.push(acc); acc += (b - a) * 1000; }
  const total = acc;
  // a source moment -> output ms; `file` picks which source (default: the main file)
  const at = (sec: number, file = c.file) => { const i = c.segs.findIndex(([a, b, fl]) => (fl ?? c.file) === file && sec >= a && sec < b); return i < 0 ? -1 : starts[i] + (sec - c.segs[i][0]) * 1000; };
  const rawOf = (fl: string) => (fl === c.file ? c.raw : c.raws?.[fl] ?? []);
  const words: Word[] = applyHi(c.segs.flatMap(([a, b, fl], i) => rawOf(fl ?? c.file).filter((w) => w.startMs / 1000 >= a && w.startMs / 1000 < b).map((w) => {
    const t = starts[i] + (w.startMs / 1000 - a) * 1000;
    return {text: w.text.trim().replace(/^-+/, ''), at: t, end: Math.min(t + (w.endMs - w.startMs) + 180, starts[i] + (b - a) * 1000), color: '#FFFFFF'}; }))
    .sort((x, y) => x.at - y.at).map((w, i) => ({...w, color: ['#F9FC35', '#21F5E6', '#58EE28', '#FFFFFF'][i % 4]})), c.hi);
  const hits = (c.hits ?? []).map(([s, sound, color]) => ({at: at(s), sound, color: color ?? (sound.includes('akward') ? 'yellow' as const : undefined)})).filter((h) => h.at >= 0);
  const keys = (k: Key[] = []) => k.map(([s, z, fx = 0.5, fy = 0.5]) => ({t: at(s), z, fx, fy})).filter((x) => x.t >= 0).sort((a, b) => a.t - b.t);
  const gk = keys(c.game), fk = keys(c.face);
  const cam = (k: ReturnType<typeof keys>, o: number) => { // eased interpolation between keyframes; z=1 centre before the first
    if (!k.length || o <= k[0].t) return k.length && o >= k[0].t ? k[0] : {z: 1, fx: 0.5, fy: 0.5};
    const j = k.findLastIndex((x) => x.t <= o); const A = k[j], B = k[j + 1];
    if (!B) return A; const p = ease(Math.min(1, (o - A.t) / Math.max(1, B.t - A.t)));
    return {z: A.z + (B.z - A.z) * p, fx: A.fx + (B.fx - A.fx) * p, fy: A.fy + (B.fy - A.fy) * p}; };
  const sc = c.src[0] / 1280; const camOf = (i: number) => (c.segs[i][3] ?? c.cam).map((v) => v * sc);
  const gw = (1080 * c.src[1]) / BOT_H; const gx = Math.min(Math.max((c.gameX ?? 640) * sc - gw / 2, 0), c.src[0] - gw);
  const speaking = (t: number) => words.some((w) => t >= w.at - 100 && t < (w.end ?? w.at + 300));
  const list = [sfx('fast-whoosh', 0, 0.45, 400), ...starts.slice(1).map((t) => sfx('mg-whoosh', t - 100, 0.3, 400)), ...hits.map((h) => sfx(h.sound, h.at, 0.65, 1800))];
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const si = starts.findLastIndex((t) => o >= t); const inSeg = o - starts[si];
    const hitK = hits.reduce((k, h) => (o >= h.at && o < h.at + 300 ? Math.max(k, 1 - (o - h.at) / 300) : k), 0);
    const cut = Math.max(0, 1 - inSeg / 220); // every cut lands with a small punch
    const g = cam(gk, o), fc = cam(fk, o);
    const rf = c.rain ? at(c.rain[0]) : -1, rt = c.rain ? at(c.rain[1] - 0.01) : -1;
    const rainK = rf >= 0 && rt >= 0 ? Math.max(0, Math.min(1, (o - rf) / 400, (rt - o) / 400)) : 0;
    const flash = hits.find((h) => h.color && o >= h.at && o < h.at + 500);
    const shake = flash?.color === 'red' ? Math.max(0, 1 - (o - flash.at) / 350) : 0;
    const panel = (top: number, h: number, z: number, fx: number, fy: number, child: (i: number) => React.ReactNode) =>
      <div style={{position: 'absolute', left: 0, top, width: 1080, height: h, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, transformOrigin: `${fx * 100}% ${fy * 100}%`,
          transform: `scale(${z}) translate(${Math.sin(o / 17) * 14 * shake}px, ${Math.cos(o / 13) * 10 * shake}px)`}}>
          {c.segs.map(([a, b], i) => <Sequence key={i} from={f(starts[i])} durationInFrames={Math.max(1, f(starts[i] + (b - a) * 1000) - f(starts[i]))}>{child(i)}</Sequence>)}
        </div>
      </div>;
    return <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{filter: rainK > 0 ? `grayscale(${0.9 * rainK}) brightness(${1 - 0.15 * rainK})` : undefined}}>
      {panel(0, TOP_H, fc.z + 0.04 * cut + 0.05 * hitK, fc.fx, fc.fy, (i) => { const [cx, cy, cw, ch] = camOf(i); return <Crop src={c.src} file={c.segs[i][2] ?? c.file} a={c.segs[i][0] * 1000} sx={cx} sy={cy} sw={cw} sh={ch} w={1080} h={TOP_H} muted />; })}
      {panel(TOP_H, BOT_H, g.z + 0.05 * cut + 0.06 * hitK + 0.05 * shake, g.fx, g.fy, (i) => <Crop src={c.src} file={c.segs[i][2] ?? c.file} a={c.segs[i][0] * 1000} sx={gx} sy={0} sw={gw} sh={c.src[1]} w={1080} h={BOT_H} />)}
      </AbsoluteFill>
      {rainK > 0 && <Rain o={o} k={rainK} />}
      <div style={{position: 'absolute', left: 0, right: 0, top: TOP_H - 3, height: 6, background: '#000'}} />
      {flash && <AbsoluteFill style={{background: flash.color === 'green' ? 'rgba(60,230,40,0.45)' : flash.color === 'yellow' ? 'rgba(255,215,0,0.5)' : 'rgba(240,30,30,0.45)',
        mixBlendMode: 'color', opacity: Math.min(1, (o - flash.at) / 60, (flash.at + 500 - o) / 140)}} />}
      <Seam o={o} text={c.seam} emoji={c.emoji} />
      <SfxTrack list={list} />
      {c.music && <Music file={c.music} songFrom={c.musicFrom ?? 0} level={(t) => (c.musicLevel ?? 0.14) * (speaking(t) ? 0.6 : 1) * Math.min(1, t / 300) * Math.min(1, (total - t) / 400)} />}
      <OneWord o={o} words={words} y={960} size={72} />
      {c.logo && <Img src={staticFile(c.logo)} style={{position: 'absolute', left: (1080 - 600) / 2, top: 1700, width: 600, height: 200, objectFit: 'contain'}} />}
    </AbsoluteFill>;
  };
  return {Comp, total};
};
