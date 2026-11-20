// GAMING style (2026-11-19, vault/02 Style Guide/Gaming/Gaming style.md): vertical STACK — streamer facecam on top, gameplay below,
// one seam line where they meet (typed in at the start, stays), key-word captions on the gameplay, game audio only, tight loop ending.
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS, Music, SfxTrack, sfx, pop} from '../../e3/kit';
import {MONT} from '../../e3/bars';
import {OneWord, type Word} from '../../jorho/kit';
import {applyHi, EmojiPop, type Hi} from '../../jorho/hi';
import {Img, Freeze} from 'remotion';

type Raw = {text: string; startMs: number; endMs: number}[];
// source size: 720p downloads by default; HQ (2026-11-20 "his camera is kinda low quality") = Twitch 'chunked' 1440p60 source
const SRC_W = 1280, SRC_H = 720;
export const TOP_H = 760; // facecam panel height
export const BOT_H = 1920 - TOP_H; // gameplay panel height
export type GameCfg = {file: string; src?: [w: number, h: number]; cam: [x: number, y: number, w: number, h: number]; gameX?: number; a: number; b: number;
  seam: string; emoji?: string; hi?: Hi; raw: Raw;
  // whop ai guideline effects (2026-11-19 "effects of the whop ai style, structure of gaming")
  logo?: string; // campaign logo overlay — visible the WHOLE clip (KreekCraft brief: clips without it are rejected)
  music?: string; musicFrom?: number; flash?: [word: string, color: 'green' | 'red' | 'yellow'];
  // extra meme hits (2026-11-19 "where are the flashes sound effects like akward ding and fahh"): [source sec, sfx file, tint?]
  // source went to a black "hidden" screen from this clip ms: show a blurred freeze of the last gameplay frame behind it (2026-11-19)
  blurFrom?: number; blurFreezeAt?: number;
  hits?: [sec: number, file: string, color?: 'green' | 'red' | 'yellow'][]};

// one source video shown through a crop window: (sx, sy, sw, sh) of the source → (0, 0, w, h) of the panel
export const Crop = ({file, a, sx, sy, sw, sh, w, h, muted, src = [SRC_W, SRC_H]}: {file: string; a: number; sx: number; sy: number; sw: number; sh: number; w: number; h: number; muted?: boolean; src?: [number, number]}) => {
  const k = Math.max(w / sw, h / sh);
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -sx * k + (w - sw * k) / 2, top: -sy * k + (h - sh * k) / 2, width: src[0] * k, height: src[1] * k}}>
      <OffthreadVideo src={staticFile(file)} trimBefore={Math.round((a / 1000) * FPS)} muted={muted} style={{width: '100%', height: '100%'}} />
    </div>
  </div>;
};

export const Seam = ({o, text, emoji}: {o: number; text: string; emoji?: string}) => {
  const plain = text.replace(/[[\]]/g, '');
  const n = Math.min(plain.length, Math.floor((o + 300) / 40)); // typed fast; frame 0 already shows the first letters
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  let left = n;
  return <div style={{position: 'absolute', left: 40, right: 40, top: TOP_H - 70, display: 'flex', justifyContent: 'center'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, lineHeight: '68px', color: 'white', textAlign: 'center', WebkitTextStroke: '6px #111',
      paintOrder: 'stroke fill', textShadow: '0 4px 12px rgba(0,0,0,0.7)'}}>
      {parts.map((p, i) => { const hl = p.startsWith('['); const body = hl ? p.slice(1, -1) : p; const t = body.slice(0, Math.max(0, left)); left -= body.length;
        return t ? <span key={i} style={{color: hl ? '#F9FC35' : 'white'}}>{t}</span> : null; })}
      {n >= plain.length && emoji && <Img src={staticFile(`emoji-ios/${emoji}.png`)} style={{width: 64, height: 64, marginLeft: 10, verticalAlign: '-10px'}} />}
    </div>
  </div>;
};

export const makeGaming = (c: GameCfg) => {
  const total = c.b - c.a;
  const words: Word[] = applyHi(c.raw.filter((w) => w.startMs >= c.a && w.startMs < c.b).sort((x, y) => x.startMs - y.startMs).map((w, i) => ({
    text: w.text.trim().replace(/^-+/, ''), at: w.startMs - c.a, end: Math.min(w.endMs - c.a + 180, total), color: ['#F9FC35', '#21F5E6', '#58EE28', '#FFFFFF'][i % 4]})), c.hi);
  const src: [number, number] = c.src ?? [1280, 720]; const sc = src[0] / 1280; // cam / gameX are given in 720p coordinates
  const [cx, cy, cw, ch] = c.cam.map((v) => v * sc);
  const gw = (1080 * src[1]) / BOT_H; // source width that fills the gameplay panel at full height
  const gx = Math.min(Math.max((c.gameX ?? 760) * sc - gw / 2, 0), src[0] - gw);
  // effects: emoji key-word beats (punch-zoom + pop), one green/red flash on a word (ding / shock), music bed under the voice, whoosh in
  const beats = words.filter((w) => Array.isArray(c.hi?.[w.text.toLowerCase().replace(/[^a-z0-9]/g, '')])).map((w) => w.at)
    .filter((t, i, a) => i === 0 || t - a[i - 1] > 900);
  const fw = c.flash ? words.find((w) => w.text.toLowerCase().includes(c.flash![0])) : undefined;
  const flashAt = fw ? fw.at : -1;
  const hits = (c.hits ?? []).map(([sec, file, color]) => ({at: sec * 1000 - c.a, file, color: color ?? (file.includes('akward') ? 'yellow' as const : undefined)})).filter((h) => h.at >= 0 && h.at < total);
  const flashes = [...(flashAt >= 0 ? [{at: flashAt, color: c.flash![1]}] : []), ...hits.filter((h) => h.color).map((h) => ({at: h.at, color: h.color!}))];
  const speaking = (t: number) => words.some((w) => t >= w.at - 100 && t < (w.end ?? w.at + 300));
  const list = [sfx('fast-whoosh', 0, 0.45, 400), ...beats.filter((t) => t > 300).map((t) => sfx('jv2-pop-button', t, 0.2, 300)),
    ...(flashAt >= 0 ? [c.flash![1] === 'green' ? sfx('g-ding-sfx', flashAt, 0.6, 700) : sfx('g-shock-sfx', flashAt, 0.6, 900)] : []),
    ...hits.map((h) => sfx(h.file, h.at, 0.65, 1600))];
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const shake = flashes.reduce((k, x) => (x.color === 'red' && o >= x.at && o < x.at + 350 ? 1 - (o - x.at) / 350 : k), 0);
    const beatK = [...beats, ...hits.map((h) => h.at)].reduce((k, t) => (o >= t && o < t + 260 ? Math.max(k, 1 - (o - t) / 260) : k), 0);
    const push = 1 + 0.06 * (o / total) + 0.04 * beatK; // slow push-in (guideline: slow zoom while idle) + punch on key words
    return <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: TOP_H, overflow: 'hidden'}}>
        <Crop src={src} file={c.file} a={c.a} sx={cx} sy={cy} sw={cw} sh={ch} w={1080} h={TOP_H} muted />
      </div>
      <div style={{position: 'absolute', left: 0, top: TOP_H, width: 1080, height: BOT_H, overflow: 'hidden', transform: `scale(${push + 0.05 * shake}) translate(${Math.sin(o / 17) * 14 * shake}px, ${Math.cos(o / 13) * 10 * shake}px)`}}>
        {c.blurFrom !== undefined && o >= c.blurFrom && <div style={{position: 'absolute', inset: -40, filter: 'blur(28px) brightness(0.8)'}}>
          <Freeze frame={Math.round(((c.blurFreezeAt ?? c.blurFrom - 400) / 1000) * FPS)}><Crop src={src} file={c.file} a={c.a} sx={gx} sy={0} sw={gw} sh={src[1]} w={1160} h={BOT_H + 80} muted /></Freeze></div>}
        <div style={{position: 'absolute', inset: 0, mixBlendMode: c.blurFrom !== undefined && o >= c.blurFrom ? 'screen' : 'normal'}}>
          <Crop src={src} file={c.file} a={c.a} sx={gx} sy={0} sw={gw} sh={src[1]} w={1080} h={BOT_H} /></div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: TOP_H - 3, height: 6, background: '#000'}} />
      {flashes.map((x, i) => o >= x.at && o < x.at + 500 && <AbsoluteFill key={i} style={{background: x.color === 'green' ? 'rgba(60,230,40,0.5)' : x.color === 'yellow' ? 'rgba(255,215,0,0.55)' : 'rgba(240,30,30,0.5)',
        mixBlendMode: 'color', opacity: Math.min(1, (o - x.at) / 60, (x.at + 500 - o) / 140)}} />)}
      <Seam o={o} text={c.seam} emoji={c.emoji} />
      <SfxTrack list={list} />
      {c.music && <Music file={c.music} songFrom={c.musicFrom ?? 0} level={(t) => 0.16 * (speaking(t) ? 0.5 : 1) * Math.min(1, t / 300) * Math.min(1, (total - t) / 400)} />}
      <OneWord o={o} words={words} y={960} size={72} />
      {!c.logo && <EmojiPop o={o} words={words} hi={c.hi} y={1640} />}
      {c.logo && <Img src={staticFile(c.logo)} style={{position: 'absolute', left: (1080 - 600) / 2, top: 1700, width: 600, height: 200, objectFit: 'contain'}} />}
    </AbsoluteFill>;
  };
  return {Comp, total};
};
void Sequence;
