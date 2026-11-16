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
import {applyHi, AutoHook, EmojiPop, type Hi} from '../../jorho/hi';
import {speechDips} from './neon';
import calWords from '../../plans/data/r3born_ep2_cal.words.json';
import obWords from '../../plans/data/r3born_ep2_ob.words.json';
import poleWords from '../../plans/data/r3born_ep2_pole.words.json';
import restWords from '../../plans/data/r3born_ep2_rest.words.json';
import moreWords from '../../plans/data/r3born_ep2_more.words.json';
import fiveWords from '../../plans/data/r3born_ep2_five.words.json';
import {HC} from '../../jorho/hi';

type Raw = {text: string; startMs: number; endMs: number}[];
const SRC = 'neon/r3born_ep2.mp4';
const CENSOR: [RegExp, string][] = [[/^fuck/i, 'F*ck'], [/^shit/i, 'Sh*t'], [/^bitch/i, 'B*tch']];
const TINT = {red: 'rgba(255,40,40,0.7)', green: 'rgba(80,255,60,0.6)'};
const CW = (1080 * 1080) / BOX_H; // source width of a full-height crop in the band

type Cfg = {raw: Raw; segs: [number, number, number?][]; title: string; keys: [sec: number, x: number][]; arrow: [ms: number, x: number, y: number];
  flash?: [number, 'red' | 'green']; hi?: Hi; snap?: boolean; hookEmoji?: string; music: string; from: number; musicGain?: number; gain?: number; sfx?: (out: (s: number) => number) => Sfx[]};

const make = (c: Cfg) => {
  const raw = c.raw.map((w) => ({...w, text: CENSOR.reduce((t, [re, r]) => (re.test(t) ? t.replace(re, r) : t), w.text)}))
    .filter((w, i, a) => i === 0 || !(w.startMs === a[i - 1].startMs && w.text.toLowerCase() === a[i - 1].text.toLowerCase())); // dedupe merged transcripts
  const segs = tighten(c.segs as never, raw);
  const last = segs[segs.length - 1];
  const after = [...raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  segs[segs.length - 1] = [last[0], Math.max(last[1], Math.min(last[1] + 300, after - 60)), last[2] ?? 0];
  const tl = timeline(segs);
  const hookN = tighten([c.segs[0]] as never, raw).length;
  const out = (src: number) => {
    for (let i = hookN; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    return -1;
  };
  const words = applyHi(wordsFrom(raw, tl), c.hi);
  const beats = words.filter((w) => Array.isArray(c.hi?.[w.text.toLowerCase().replace(/^[^a-z0-9$*]+|[^a-z0-9%*]+$/g, '')])).map((w) => w.at).filter((t, i, a) => i === 0 || t - a[i - 1] > 700);
  const beatK = (o: number) => beats.reduce((k, t) => (o >= t && o < t + 260 ? Math.max(k, 1 - (o - t) / 260) : k), 0);
  const dips = speechDips(raw, tl);
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  // crop centre x per source ms: hold a key, ease 350 ms into the next one (a slide only where the shot changes)
  const ks = [...c.keys].sort((a, b) => a[0] - b[0]);
  const xAt = (src: number) => {
    const s = src / 1000;
    let i = ks.findIndex(([t]) => t > s); if (i < 0) i = ks.length; const prev = ks[Math.max(0, i - 1)];
    const nxt = ks[i]; if (!nxt) return prev[1];
    const win = c.snap ? 0.04 : 0.35; // snap = the source cuts every second → jump with the cut, no slide
    const t = Math.min(1, Math.max(0, (s - (nxt[0] - win)) / win));
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
    ...beats.filter((t) => t > 400).map((t) => sfx('jv2-pop-button', t, 0.07, 300)),
  ];
  const mg = c.musicGain ?? 1;
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const whip = 0; // 2026-11-16: crisp first frame
    return <Frame o={o} top={c.title} over={<>
      {o >= tl.segOut[hookN] && <OneWord o={o} words={words} y={1000} size={c.hi ? 66 : 60} />}
      <EmojiPop o={o} words={words} hi={c.hi} y={1000} />
      {arrowO >= 0 && o >= arrowO && o < arrowO + 1300 && <Arrow o={o - arrowO} x={ax} y={ay} />}
      <SpeechTrack src={SRC} tl={tl} gain={1.05 * (c.gain ?? 1)} />
      <Music file={c.music} songFrom={c.from} level={(t) => {
        const dk = dips.some(([x, y]) => t >= x && t < y) ? 0.55 : 1;
        return 0.22 * mg * dk * Math.min(1, t / 300) * Math.min(1, (tl.total - t) / 400) * (t >= end ? 2 : 1);
      }} />
      <SfxTrack list={list} />
    </>}>
      <AbsoluteFill style={{transform: `translateX(${-whip * 120}px) scale(${(1 + whip * 0.08) * (1 + beatK(o) * 0.045)})`, filter: whip ? `blur(${whip * 10}px)` : undefined}}><Cam c={cam} o={o} /></AbsoluteFill>
      <AutoHook o={o} end={tl.segOut[hookN]} text={c.title} emoji={c.hookEmoji} top={240} />
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

// ---- BATCH 5 (2026-11-15): "5 high virality neon clips, maybe add color on the captions / highlight different words and emojis" ----
// fresh moments (never cut before), same video-reference look + key-word colours / iOS emoji pops, one flash each
const {green: G, yellow: Y, cyan: C, red: R, orange: O, pink: P} = HC;
const REST = restWords as Raw;
const FART_RAW = [...(fiveWords as Raw).filter((w) => w.startMs < 158000), ...(moreWords as Raw).filter((w) => w.startMs >= 158000 && w.startMs < 176000)]
  .sort((a, b) => a.startMs - b.startMs).filter((w, i, a) => i === 0 || w.startMs - a[i - 1].startMs > 150 || w.text !== a[i - 1].text);
export const REF_JOKE = make({hookEmoji: '1f631', raw: REST, title: "Are these 'women's exercises' a joke? N3on found out",
  segs: [[7200, 8700], [0, 4900], [7200, 8700], [11800, 14500], [19200, 23500]], snap: true,
  keys: [[0, 960], [3, 1040], [7, 960], [8, 800], [11.8, 960], [13, 1050], [19, 900], [20, 1100], [21, 960], [23, 960]],
  arrow: [3300, 1040, 230], flash: [2500, 'red'], music: 'pixy-legacy.mp3', from: 0, musicGain: 0.5,
  hi: {pilates: Y, pole: Y, dancing: Y, aerial: Y, yoga: Y, insane: [R, '1f631'], joke: [R, '1f602'], pants: [O, '1f633'], sarah: P, safari: P, calories: [G, '1f525'], fitness: C, bands: C, special: P}});
export const REF_SLIP = make({hookEmoji: '1f633', raw: REST, title: "N3on's slip of the tongue at pole class",
  segs: [[264900, 266600], [264000, 268000], [269500, 270500], [274800, 277200], [277700, 279800], [280700, 285500]],
  keys: [[264, 1100]], arrow: [264300, 880, 230], flash: [264900, 'red'], music: 'Sneaky_Snitch.mp3', from: 0, musicGain: 0.8,
  hi: {strip: [R, '1f633'], sorry: [Y, '1f62c'], pole: C, dancing: C, amazing: G, flexible: G, strength: G, camaraderie: C, everything: [Y, '1f92f'], intrigued: [O, '1f914'], interested: O, tough: [R, '1f480']}});
export const REF_DOWN100 = make({hookEmoji: '1f4c9', raw: REST, title: 'N3on is down 100 calories… so now it\'s aerial silks',
  segs: [[508200, 511000], [464100, 468900], [484100, 487700], [506500, 516200]],
  keys: [[464, 640], [465.8, 541], [470, 960], [484, 914], [486, 1200], [488, 500], [506, 1000], [507.4, 1250], [512, 560], [515.5, 1000]],
  arrow: [508300, 1536, 150], flash: [506800, 'red'], music: 'kai-cenat-suspense.mp3', from: 0, musicGain: 1.1,
  hi: {aerial: C, silks: C, 'f*ck': R, idea: [Y, '1f914'], hundred: [R, '1f4c9'], calories: R, burn: G, smoked: [R, '1f480'], cirque: C, soleil: C, flippin: Y, splitting: Y}});
export const REF_FART = make({hookEmoji: '1f922', raw: FART_RAW, title: 'Did N3on just fart in Pilates?', snap: true,
  segs: [[165600, 166900], [152600, 160600], [163800, 170000]],
  keys: [[152, 1000], [153, 920], [156, 1110], [157, 1260], [158, 770], [159, 560], [160, 770], [161, 1300], [162, 960], [163, 920], [164, 1230], [165, 1400], [166, 920], [167, 845], [168, 1000], [169, 450], [170, 614]],
  arrow: [157500, 1267, 600], flash: [166600, 'red'], music: 'Fluffing_a_Duck.mp3', from: 0, musicGain: 0.8,
  hi: {abs: [R, '1f525'], fire: R, baby: Y, inhale: C, exhale: C, lift: C, fart: [O, '1f922'], 'sh*t': R, nope: [R, '1f480'], five: Y, four: Y}});
export const REF_HARD = make({hookEmoji: '1f62d', raw: REST, title: 'Aerial silks humbled them FAST', snap: true,
  segs: [[536000, 537400], [522000, 537600]],
  keys: [[522, 1000], [524, 1150], [529, 700], [530, 600], [531, 1000], [532, 920], [533, 850], [534, 660], [535, 730], [536, 1000], [537, 620], [538, 920]],
  arrow: [531200, 998, 260], flash: [537000, 'red'], music: 'zelda-ocarina.mp3', from: 0, musicGain: 0.9,
  hi: {backbend: C, arch: C, hips: Y, rock: C, wrap: C, god: [Y, '1f631'], hard: [R, '1f62d'], seriously: R}});
export const RefJoke = REF_JOKE.Comp, RefSlip = REF_SLIP.Comp, RefDown100 = REF_DOWN100.Comp, RefFart = REF_FART.Comp, RefHard = REF_HARD.Comp;
