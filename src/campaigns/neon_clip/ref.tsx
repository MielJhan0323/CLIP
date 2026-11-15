// NEON in the client "video reference" style (2026-11-15; vault/02 Style Guide/video reference (client)/README.md).
// User: "give me 3 neon clips from the new editing style". Same look as the BYB refs:
//  · letterbox (black bars), white bold title + iOS 💀 in the top bar, the video band in the middle (Jorho Frame)
//  · small one-word captions (yellow / cyan / green / white), swears censored, gone when the word ends
//  · RESTRAINT: a full-height crop that only moves when the source shot changes (hand keys, eased slide), no punch-in timer,
//    max 1 colour flash, SFX only on real events, *N3on* red arrow once, warm grade, quiet bed that swells after the last word
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Cam, FPS, Music, SfxTrack, SpeechTrack, clamp, sfx, timeline, type CamCfg, type Sfx, type Track} from '../../e3/kit';
import {BOX_H, BOX_TOP, Frame, OneWord, wordsFrom} from '../../jorho/kit';
import {VIRAL_WARM} from '../../jorho/clips';
import {MONT} from '../../e3/bars';
import {tighten} from '../../jorho/tighten';
import {speechDips} from './neon';
import calWords from '../../plans/data/r3born_ep2_cal.words.json';
import obWords from '../../plans/data/r3born_ep2_ob.words.json';
import poleWords from '../../plans/data/r3born_ep2_pole.words.json';

type Raw = {text: string; startMs: number; endMs: number}[];
const SRC = 'neon/r3born_ep2.mp4';
const CENSOR: [RegExp, string][] = [[/^fuck/i, 'F*ck'], [/^shit/i, 'Sh*t'], [/^bitch/i, 'B*tch']];
const TINT = {red: 'rgba(255,40,40,0.7)', green: 'rgba(80,255,60,0.6)'};
const CW = (1080 * 1080) / BOX_H; // source width of a full-height crop in the band

type Cfg = {raw: Raw; segs: [number, number, number?][]; title: string; keys: [sec: number, x: number][]; arrow: [ms: number, x: number, y: number];
  flash?: [number, 'red' | 'green']; music: string; from: number; musicGain?: number; gain?: number; sfx?: (out: (s: number) => number) => Sfx[]};

const make = (c: Cfg) => {
  const raw = c.raw.map((w) => ({...w, text: CENSOR.reduce((t, [re, r]) => (re.test(t) ? t.replace(re, r) : t), w.text)}))
    .filter((w, i, a) => i === 0 || !(w.startMs === a[i - 1].startMs && w.text.toLowerCase() === a[i - 1].text.toLowerCase())); // dedupe merged transcripts
  const segs = tighten(c.segs as never, raw);
  const last = segs[segs.length - 1];
  const after = [...raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  segs[segs.length - 1] = [last[0], Math.max(last[1], Math.min(last[1] + 900, after - 60)), last[2] ?? 0];
  const tl = timeline(segs);
  const hookN = tighten([c.segs[0]] as never, raw).length;
  const out = (src: number) => {
    for (let i = hookN; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    return -1;
  };
  const words = wordsFrom(raw, tl);
  const dips = speechDips(raw, tl);
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  // crop centre x per source ms: hold a key, ease 350 ms into the next one (a slide only where the shot changes)
  const ks = [...c.keys].sort((a, b) => a[0] - b[0]);
  const xAt = (src: number) => {
    const s = src / 1000;
    let i = ks.findIndex(([t]) => t > s); if (i < 0) i = ks.length; const prev = ks[Math.max(0, i - 1)];
    const nxt = ks[i]; if (!nxt) return prev[1];
    const t = Math.min(1, Math.max(0, (s - (nxt[0] - 0.35)) / 0.35));
    return prev[1] + (nxt[1] - prev[1]) * (t * t * (3 - 2 * t));
  };
  const lo = Math.min(...c.segs.map((g) => g[0])), hi = Math.max(...c.segs.map((g) => g[1])) + 1500;
  const M: number[][] = [];
  for (let t = lo; t <= hi; t += 50) M.push([xAt(t), 540, 300]);
  const track = {stepMs: 50, fromMs: lo, L: M, M, R: M} as unknown as Track;
  const cam: CamCfg = {src: SRC, tl, track, grade: VIRAL_WARM, box: [1080, BOX_H], baseH: 1080, faceY: 0.5, wideX: 960, who: () => 'M'};
  const arrowO = out(c.arrow[0]);
  // arrow target in band px: map the source face through the crop at that moment
  const ax = (() => { const cx = Math.min(Math.max(xAt(c.arrow[0]), CW / 2), 1920 - CW / 2); return (c.arrow[1] - (cx - CW / 2)) * (1080 / CW); })();
  const ay = BOX_TOP + c.arrow[2] * (BOX_H / 1080);
  const flashO = c.flash ? out(c.flash[0]) : -1;
  const list: Sfx[] = [
    sfx('fast-whoosh', 0, 0.18, 400),
    sfx('mg-swoosh', arrowO, 0.14, 500),
    ...(flashO >= 0 ? [c.flash![1] === 'green' ? sfx('g-ding-sfx', flashO - 30, 0.18, 700) : sfx('g-shock-sfx', flashO - 40, 0.2, 900)] : []),
    ...(c.sfx?.(out) ?? []),
    sfx('bass-boosted-vine-boom', end + 40, 0.14, 900),
  ];
  const mg = c.musicGain ?? 1;
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const whip = o < 180 ? 1 - o / 180 : 0;
    return <Frame o={o} top={c.title} over={<>
      <OneWord o={o} words={words} y={1000} size={60} />
      {arrowO >= 0 && o >= arrowO && o < arrowO + 1300 && <Arrow o={o - arrowO} x={ax} y={ay} />}
      <SpeechTrack src={SRC} tl={tl} gain={1.05 * (c.gain ?? 1)} />
      <Music file={c.music} songFrom={c.from} level={(t) => {
        const dk = dips.some(([x, y]) => t >= x && t < y) ? 0.55 : 1;
        return 0.22 * mg * dk * Math.min(1, t / 300) * Math.min(1, (tl.total - t) / 400) * (t >= end ? 2 : 1);
      }} />
      <SfxTrack list={list} />
    </>}>
      <AbsoluteFill style={{transform: `translateX(${-whip * 120}px) scale(${1 + whip * 0.08})`, filter: whip ? `blur(${whip * 10}px)` : undefined}}><Cam c={cam} o={o} /></AbsoluteFill>
      {flashO >= 0 && o >= flashO && o < flashO + 450 && <AbsoluteFill style={{background: TINT[c.flash![1]], mixBlendMode: 'color',
        opacity: interpolate(o - flashO, [0, 60, 300, 450], [0, 1, 1, 0], clamp)}} />}
    </Frame>;
  };
  return {Comp, total: tl.total};
};

// red curved arrow + red italic *N3on* (the reference sticker), drawn once
const Arrow = ({o, x, y}: {o: number; x: number; y: number}) => {
  const p = interpolate(o, [0, 220], [0, 1], clamp), fade = interpolate(o, [1100, 1300], [1, 0], clamp);
  const ax = Math.min(Math.max(x - 240, 40), 760), ay = Math.min(y + 170, 1330);
  return <div style={{position: 'absolute', inset: 0, opacity: fade, pointerEvents: 'none'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d={`M ${ax + 40} ${ay + 120} C ${ax - 40} ${ay + 40}, ${ax + 40} ${ay - 60}, ${x - 60} ${y + 50}`} fill="none" stroke="#E8261F" strokeWidth={14}
        strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: 'drop-shadow(0 0 2px white)'}} />
    </svg>
    <div style={{position: 'absolute', left: ax - 60, top: ay + 130, fontFamily: MONT, fontWeight: 900, fontStyle: 'italic', fontSize: 52, color: '#E8261F',
      WebkitTextStroke: '6px white', paintOrder: 'stroke fill', opacity: p, whiteSpace: 'nowrap'}}>*N3on*</div>
  </div>;
};

// 1 · 103 vs 161 calories — "Oh, I'm close!" "You're not close." (roast → one red flash)
export const REF_CLOSE = make({raw: calWords as Raw, title: "N3on thinks 103 calories is close to 161",
  segs: [[220980, 222480], [209480, 224000]],
  keys: [[209.0, 1000], [210.0, 1020], [217.0, 940], [221.8, 640], [223.9, 1030]],
  arrow: [213400, 1215, 175], flash: [221700, 'red'], music: 'joyful-chess-guide.mp3', from: 0, musicGain: 0.8});
// 2 · pole-class calories → "women's exercises" → the ChatGPT excuse → "I'm like LeBron James"
export const REF_CHATGPT = make({raw: obWords as Raw, title: 'N3on lost to Sarah again… so he asked ChatGPT',
  segs: [[436700, 437300], [431640, 441840], [442300, 445150], [450280, 454060], [455140, 458000]],
  keys: [[431.5, 980], [431.9, 680], [434.9, 875], [435.9, 620], [438.9, 1070], [440.9, 640], [450.55, 800], [455.5, 520]],
  arrow: [436800, 330, 170], flash: [436960, 'red'], music: 'wtf-u-tryna-say.mp3', from: 0, musicGain: 0.6});
// 3 · the pole: "why is it so hard to get up this stupid pole" → the spin → "whoa, stop me, stop me"
export const REF_POLE = make({raw: poleWords as Raw, title: 'N3on tried pole dancing for the first time',
  segs: [[353820, 354600], [327980, 328760], [334480, 337120], [338960, 340880], [344980, 351920], [353420, 355120]],
  keys: [[327.9, 650], [330, 780], [333, 880], [335, 700], [337, 850], [340, 650], [341, 930], [349, 700], [350, 950], [352.5, 1450], [355.6, 1000]],
  arrow: [334600, 850, 230], flash: [353420, 'green'], music: 'kai-cenat-suspense.mp3', from: 0, musicGain: 1.2});
export const RefClose = REF_CLOSE.Comp, RefChatgpt = REF_CHATGPT.Comp, RefPole = REF_POLE.Comp;
