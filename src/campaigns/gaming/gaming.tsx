// GAMING style (2026-11-19, vault/02 Style Guide/Gaming/Gaming style.md): vertical STACK — streamer facecam on top, gameplay below,
// one seam line where they meet (typed in at the start, stays), key-word captions on the gameplay, game audio only, tight loop ending.
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS} from '../../e3/kit';
import {MONT} from '../../e3/bars';
import {OneWord, type Word} from '../../jorho/kit';
import {applyHi, EmojiPop, type Hi} from '../../jorho/hi';
import {Img} from 'remotion';

type Raw = {text: string; startMs: number; endMs: number}[];
const SRC_W = 1280, SRC_H = 720; // 720p downloads
const TOP_H = 760; // facecam panel height
const BOT_H = 1920 - TOP_H; // gameplay panel height
export type GameCfg = {file: string; cam: [x: number, y: number, w: number, h: number]; gameX?: number; a: number; b: number;
  seam: string; emoji?: string; hi?: Hi; raw: Raw};

// one source video shown through a crop window: (sx, sy, sw, sh) of the source → (0, 0, w, h) of the panel
const Crop = ({file, a, sx, sy, sw, sh, w, h, muted}: {file: string; a: number; sx: number; sy: number; sw: number; sh: number; w: number; h: number; muted?: boolean}) => {
  const k = Math.max(w / sw, h / sh);
  return <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -sx * k + (w - sw * k) / 2, top: -sy * k + (h - sh * k) / 2, width: SRC_W * k, height: SRC_H * k}}>
      <OffthreadVideo src={staticFile(file)} trimBefore={Math.round((a / 1000) * FPS)} muted={muted} style={{width: '100%', height: '100%'}} />
    </div>
  </div>;
};

const Seam = ({o, text, emoji}: {o: number; text: string; emoji?: string}) => {
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
  const [cx, cy, cw, ch] = c.cam;
  const gw = (BOT_H / SRC_H) > 0 ? (1080 * SRC_H) / BOT_H : SRC_W; // source width that fills the gameplay panel at full height
  const gx = Math.min(Math.max((c.gameX ?? 760) - gw / 2, 0), SRC_W - gw);
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    return <AbsoluteFill style={{background: '#000'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: TOP_H, overflow: 'hidden'}}>
        <Crop file={c.file} a={c.a} sx={cx} sy={cy} sw={cw} sh={ch} w={1080} h={TOP_H} muted />
      </div>
      <div style={{position: 'absolute', left: 0, top: TOP_H, width: 1080, height: BOT_H, overflow: 'hidden'}}>
        <Crop file={c.file} a={c.a} sx={gx} sy={0} sw={gw} sh={SRC_H} w={1080} h={BOT_H} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: TOP_H - 3, height: 6, background: '#000'}} />
      <Seam o={o} text={c.seam} emoji={c.emoji} />
      <OneWord o={o} words={words} y={1640} size={62} />
      <EmojiPop o={o} words={words} hi={c.hi} y={1640} />
    </AbsoluteFill>;
  };
  return {Comp, total};
};
void Sequence;
