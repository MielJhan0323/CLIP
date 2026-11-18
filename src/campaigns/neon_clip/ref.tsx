// NEON in the client "video reference" style (2026-11-15; vault/02 Style Guide/video reference (client)/README.md).
// User: "give me 3 neon clips from the new editing style". Same look as the BYB refs:
//  · letterbox (black bars), white bold title + iOS 💀 in the top bar, the video band in the middle (Jorho Frame)
//  · small one-word captions (yellow / cyan / green / white), swears censored, gone when the word ends
//  · RESTRAINT: a full-height crop that only moves when the source shot changes (hand keys, eased slide), no punch-in timer,
//    max 1 colour flash, SFX only on real events, *N3on* red arrow once, warm grade, quiet bed that swells after the last word
import type {ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TypedAction} from '../../jorho/v2';
import {pop} from '../../e3/kit';
import {Cam, FPS, Music, SfxTrack, SpeechTrack, clamp, sfx, timeline, type CamCfg, type Sfx, type Track} from '../../e3/kit';
import {BOX_H, BOX_TOP, Frame, OneWord, wordsFrom} from '../../jorho/kit';
import {VIRAL_WARM} from '../../jorho/clips';
import {MONT} from '../../e3/bars';
import {tighten} from '../../jorho/tighten';
import {applyHi, AutoHook, EmojiPop, hookTypeMs, type Hi} from '../../jorho/hi';
import {speechDips} from './neon';
import calWords from '../../plans/data/r3born_ep2_cal.words.json';
import obWords from '../../plans/data/r3born_ep2_ob.words.json';
import poleWords from '../../plans/data/r3born_ep2_pole.words.json';
import restWords from '../../plans/data/r3born_ep2_rest.words.json';
import gapWords from '../../plans/data/r3born_ep2_gap.words.json';
import MICRO from '../../plans/data/r3born_ep2_micro.json';
const SKIP = (MICRO as {skip: number[][]}).skip, CUTS = (MICRO as {cuts: number[]}).cuts;
import moreWords from '../../plans/data/r3born_ep2_more.words.json';
import fiveWords from '../../plans/data/r3born_ep2_five.words.json';
import {HC} from '../../jorho/hi';

type Raw = {text: string; startMs: number; endMs: number}[];
const SRC = 'neon/r3born_ep2.mp4';
const CENSOR: [RegExp, string][] = [[/^Safari/, 'Saffari'], [/^fuck/i, 'F*ck'], [/^shit/i, 'Sh*t'], [/^bitch/i, 'B*tch']];
const TINT = {red: 'rgba(255,40,40,0.7)', green: 'rgba(80,255,60,0.6)'};
const CW = (1080 * 1080) / BOX_H; // source width of a full-height crop in the band

type Cfg = {raw: Raw; segs: [number, number, number?][]; title: string; keys: [sec: number, x: number][]; arrow: [ms: number, x: number, y: number];
  flash?: [number, 'red' | 'green']; hi?: Hi; snap?: boolean; hookEmoji?: string; hookText?: string; extra?: (o: number, out: (s: number) => number) => ReactNode; /* per-clip format element (card / typed action / burst) */ capsOff?: [number, number][]; /* source ranges with burned-in subtitles → our captions off */ music: string; from: number; musicGain?: number; gain?: number; sfx?: (out: (s: number) => number) => Sfx[]};

const make = (c: Cfg) => {
  const raw = c.raw.map((w) => ({...w, text: CENSOR.reduce((t, [re, r]) => (re.test(t) ? t.replace(re, r) : t), w.text)}))
    .filter((w, i, a) => i === 0 || !(w.startMs === a[i - 1].startMs && w.text.toLowerCase() === a[i - 1].text.toLowerCase())); // dedupe merged transcripts
  // reviewer 2026-11-17: the episode is cut with 0.1–0.3 s whip/flash transitions → skip every micro-shot (scripts/micro_shots.py)
  const noMicro = (sg: [number, number, number?]): [number, number, number?][] => {
    let out: [number, number, number?][] = [sg];
    for (const [a, b] of SKIP) out = out.flatMap(([x, y, h]) => (b <= x || a >= y ? [[x, y, h] as [number, number, number?]]
      : [...(a - x >= 400 ? [[x, a] as [number, number, number?]] : []), ...(y - b >= 400 ? [[b, y, h] as [number, number, number?]] : [])]));
    return out;
  };
  // …and snap every piece edge to a nearby source cut, so no 0.1–0.4 s sliver of the neighbouring shot survives
  const snap = (sg: [number, number, number?]): [number, number, number?] => {
    let [x, y, h] = sg;
    const inC = CUTS.find((c) => c > x && c < x + 450 && y - c >= 1000); if (inC !== undefined) x = inC;
    const outC = [...CUTS].reverse().find((c) => c < y && c > y - 450 && c - x >= 1000); if (outC !== undefined) y = outC;
    return [x, y, h];
  };
  const segs = (tighten(c.segs.flatMap(noMicro) as never, raw) as [number, number, number?][]).map(snap);
  const last = segs[segs.length - 1];
  const after = [...raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  const lastWordEnd = Math.max(...raw.filter((w) => w.startMs >= last[0] && w.startMs < last[1]).map((w) => w.endMs), last[0] + 500);
  segs[segs.length - 1] = [last[0], Math.min(Math.max(last[1], Math.min(last[1] + 300, after - 60)), lastWordEnd + 350), last[2] ?? 0]; // tight loop ending
  const tl = timeline(segs as never);
  const hookN = tighten(noMicro(c.segs[0]) as never, raw).length;
  const out = (src: number) => {
    for (let i = hookN; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1]) return tl.segOut[i] + src - segs[i][0];
    return -1;
  };
  const words = applyHi(wordsFrom(raw, tl), c.hi);
  const beats = words.filter((w) => Array.isArray(c.hi?.[w.text.toLowerCase().replace(/^[^a-z0-9$*]+|[^a-z0-9%*]+$/g, '')])).map((w) => w.at).filter((t, i, a) => i === 0 || t - a[i - 1] > 700);
  const dips = speechDips(raw, tl);
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  // crop centre x per source ms: hold a key, ease 350 ms into the next one (a slide only where the shot changes)
  // user 2026-11-16: "the camera for neon is too shaky and movy" → ignore small re-frames (< 250 px), only move on real shot changes
  const ks: [number, number][] = [];
  if (c.snap) ks.push([0, 960]); // source already cuts every ~1 s → a locked centre crop (fits both people) instead of chasing faces
  else for (const k of [...c.keys].sort((a, b) => a[0] - b[0])) if (!ks.length || Math.abs(k[1] - ks[ks.length - 1][1]) >= 250) ks.push(k);
  const xAt = (src: number) => {
    const s = src / 1000;
    let i = ks.findIndex(([t]) => t > s); if (i < 0) i = ks.length; const prev = ks[Math.max(0, i - 1)];
    const nxt = ks[i]; if (!nxt) return prev[1];
    const win = c.snap ? 0.04 : 0.6; // snap = the source cuts every second → jump with the cut, no slide
    const t = Math.min(1, Math.max(0, (s - (nxt[0] - win)) / win));
    return prev[1] + (nxt[1] - prev[1]) * (t * t * (3 - 2 * t));
  };
  const lo = Math.min(...c.segs.map((g) => g[0])), hi = Math.max(...c.segs.map((g) => g[1])) + 1500;
  const M: number[][] = [];
  for (let t = lo; t <= hi; t += 50) M.push([xAt(t), 540, 300]);
  const track = {stepMs: 50, fromMs: lo, L: M, M, R: M} as unknown as Track;
  const cam: CamCfg = {src: SRC, tl, track, grade: VIRAL_WARM, box: [1080, BOX_H], baseH: 1080, faceY: 0.5, wideX: 960, who: () => 'M'};
  const arrowO = c.arrow[0] < 0 ? -1 : out(c.arrow[0]); // -1 = no arrow (no clean N3on shot to point at)
  // arrow target in band px: map the source face through the crop at that moment
  const ax = (() => { const cx = Math.min(Math.max(xAt(c.arrow[0]), CW / 2), 1920 - CW / 2); return (c.arrow[1] - (cx - CW / 2)) * (1080 / CW); })();
  const ay = BOX_TOP + c.arrow[2] * (BOX_H / 1080);
  const flashO = c.flash ? out(c.flash[0]) : -1;
  const list: Sfx[] = [
    sfx('keyboard-typing', 0, 0.12, Math.max(300, hookTypeMs(c.hookText ?? c.title, tl.segOut[hookN] + 450) - 450)),
    sfx('mg-swoosh', arrowO, 0.14, 500),
    ...(flashO >= 0 ? [c.flash![1] === 'green' ? sfx('g-ding-sfx', flashO - 30, 0.18, 700) : sfx('g-shock-sfx', flashO - 40, 0.2, 900)] : []),
    ...(c.sfx?.(out) ?? []),
    ...beats.filter((t) => t > 400).map((t) => sfx('jv2-pop-button', t, 0.07, 300)),
  ];
  const srcOff = (o: number) => { const sr = tl.srcAt(Math.min(o, tl.total - 1)); return (c.capsOff ?? []).some(([a, b]) => sr >= a && sr < b); };
  const mg = c.musicGain ?? 1;
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const whip = 0; // 2026-11-16: crisp first frame
    return <Frame o={o} top={c.title} over={<>
      {o >= tl.segOut[hookN] && !srcOff(o) && <OneWord o={o} words={words} y={1000} size={c.hi ? 66 : 60} />}
      {o >= tl.segOut[hookN] && !srcOff(o) && <EmojiPop o={o} words={words} hi={c.hi} y={1000} />}
      {arrowO >= 0 && o >= arrowO && o < arrowO + 1300 && <Arrow o={o - arrowO} x={ax} y={ay} />}
      <SpeechTrack src={SRC} tl={tl} gain={1.05 * (c.gain ?? 1)} />
      <Music file={c.music} songFrom={c.from} level={(t) => {
        const dk = dips.some(([x, y]) => t >= x && t < y) ? 0.55 : 1;
        return 0.22 * mg * dk * Math.min(1, t / 300) * Math.min(1, (tl.total - t) / 400) * (t >= end ? 2 : 1);
      }} />
      <SfxTrack list={list} />
    </>}>
      <AbsoluteFill style={{transform: `translateX(${-whip * 120}px) scale(${(1 + whip * 0.08)})`, filter: whip ? `blur(${whip * 10}px)` : undefined}}><Cam c={cam} o={o} /></AbsoluteFill>
      <AutoHook o={o + 450} end={tl.segOut[hookN] + 450} text={c.hookText ?? c.title} emoji={c.hookEmoji} top={50} />
      {c.extra?.(o, out)}
      {flashO >= 0 && o >= flashO && o < flashO + 450 && <AbsoluteFill style={{background: TINT[c.flash![1]], mixBlendMode: 'color',
        opacity: interpolate(o - flashO, [0, 60, 300, 450], [0, 1, 1, 0], clamp)}} />}
    </Frame>;
  };
  return {Comp, total: tl.total};
};

// red curved arrow + red italic *N3on* (the reference sticker), drawn once
// user 2026-11-16: "arrow doesn't point at neon and overlaps his face" → the tip stops BESIDE the face (≈130 px off, chin height),
// coming from the side with more room; the label sits at the tail, never on the face
const Arrow = ({o, x, y}: {o: number; x: number; y: number}) => {
  const p = interpolate(o, [0, 220], [0, 1], clamp), fade = interpolate(o, [1100, 1300], [1, 0], clamp);
  const side = x > 540 ? -1 : 1; // come from the left when he's on the right half, else from the right
  const tx = x + side * 90, ty = y + 190; // just below the shoulder line, close to him (reviewer: tip drifted onto the next person) // tip: just under/beside the chin, never on the face
  const sx = Math.min(Math.max(tx + side * 150, 60), 1020), sy = Math.min(ty + 330, 1480); // tail below
  return <div style={{position: 'absolute', inset: 0, opacity: fade, pointerEvents: 'none'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      <path d={`M ${sx} ${sy} Q ${sx} ${ty + 20}, ${tx} ${ty}`} fill="none" stroke="#E8261F" strokeWidth={14}
        strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: 'drop-shadow(0 0 2px white)'}} />
      {p > 0.95 && <path d={`M ${tx - side * 6 + 30 * -side} ${ty - 26} L ${tx} ${ty} L ${tx - side * 34} ${ty + 22}`} fill="none" stroke="#E8261F" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
    <div style={{position: 'absolute', left: Math.min(Math.max(sx - 90, 20), 860), top: sy + 14, fontFamily: MONT, fontWeight: 900, fontStyle: 'italic', fontSize: 52, color: '#E8261F',
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
export const REF_JOKE = make({hookText: "WOMEN'S WORKOUTS A [JOKE]?", hookEmoji: '1f631', raw: REST, title: "N3on vs '[women's] workouts': Pilates, pole and silks",
  segs: [[7200, 8700], [0, 4900], [7200, 8700], [12900, 14500], [19200, 26300]], capsOff: [[12900, 27000]], snap: true,
  keys: [[0, 960], [3, 1040], [7, 960], [8, 800], [11.8, 960], [13, 1050], [19, 900], [20, 1100], [21, 960], [23, 960]],
  arrow: [3300, 960, 240], flash: [2500, 'red'], music: 'pixy-legacy.mp3', from: 0, musicGain: 0.5,
  hi: {pilates: Y, pole: Y, dancing: Y, aerial: Y, yoga: Y, insane: [R, '1f631'], joke: [R, '1f602'], pants: [O, '1f633'], sarah: P, safari: P, calories: [G, '1f525'], fitness: C, bands: C, special: P}});
export const REF_SLIP = make({hookText: "WAIT… [STRIP]?!", hookEmoji: '1f633', raw: REST, title: "N3on's [slip of the tongue] at pole class",
  segs: [[264000, 266600], [266700, 270800], [274800, 277200], [277700, 279800], [280700, 284050]],
  keys: [[264, 1100]], arrow: [264300, 900, 255], flash: [264900, 'red'], music: 'Sneaky_Snitch.mp3', from: 0, musicGain: 0.8,
  hi: {strip: [R, '1f633'], sorry: [Y, '1f62c'], pole: C, dancing: C, amazing: G, flexible: G, strength: G, camaraderie: C, everything: [Y, '1f92f'], intrigued: [O, '1f914'], interested: [O, '1f60f'], tough: [R, '1f480']}});
export const REF_DOWN100 = make({hookText: "DOWN [100] CALORIES", hookEmoji: '1f4c9', raw: REST, title: 'N3on is down [100 calories]… so now it\'s aerial silks',
  segs: [[508200, 511000], [464100, 468900], [484100, 487700], [506500, 511200]],
  keys: [[464, 640], [465.8, 541], [470, 960], [484, 914], [486, 1200], [488, 500], [506, 1000], [507.4, 1250], [512, 560], [515.5, 1000]],
  arrow: [-1, 0, 0], flash: [506800, 'red'], music: 'kai-cenat-suspense.mp3', from: 0, musicGain: 1.1,
  hi: {aerial: C, silks: C, 'f*ck': R, idea: [Y, '1f914'], hundred: [R, '1f4c9'], calories: R, burn: G, smoked: [R, '1f480'], cirque: C, soleil: C, flippin: Y, splitting: Y}});
export const REF_FART = make({hookText: "DID HE JUST [FART]?", hookEmoji: '1f922', raw: FART_RAW, title: 'Did N3on just [fart] in Pilates?', snap: true,
  segs: [[165600, 166900], [151100, 160600], [163800, 170000]],
  keys: [[152, 1000], [153, 920], [156, 1110], [157, 1260], [158, 770], [159, 560], [160, 770], [161, 1300], [162, 960], [163, 920], [164, 1230], [165, 1400], [166, 920], [167, 845], [168, 1000], [169, 450], [170, 614]],
  arrow: [-1, 0, 0], flash: [166600, 'red'], music: 'Fluffing_a_Duck.mp3', from: 0, musicGain: 0.8,
  hi: {abs: [R, '1f525'], fire: R, baby: Y, inhale: C, exhale: C, lift: C, fart: [O, '1f922'], 'sh*t': R, nope: [R, '1f480'], five: Y, four: Y}});
export const REF_HARD = make({hookText: "AERIAL SILKS [HUMBLED] THEM", hookEmoji: '1f62d', raw: REST, title: 'Aerial silks [humbled] them FAST', snap: true,
  segs: [[536000, 537400], [522000, 524500], [527200, 537600]],
  keys: [[522, 1000], [524, 1150], [529, 700], [530, 600], [531, 1000], [532, 920], [533, 850], [534, 660], [535, 730], [536, 1000], [537, 620], [538, 920]],
  arrow: [531200, 885, 120], flash: [537000, 'red'], music: 'zelda-ocarina.mp3', from: 0, musicGain: 0.9,
  hi: {backbend: C, arch: C, hips: Y, rock: C, wrap: C, god: [Y, '1f631'], hard: [R, '1f62d'], seriously: R}});
export const RefJoke = REF_JOKE.Comp, RefSlip = REF_SLIP.Comp, RefDown100 = REF_DOWN100.Comp, RefFart = REF_FART.Comp, RefHard = REF_HARD.Comp;

// ---- BATCH 6 (2026-11-16): "give me 5 new neon" — fresh moments, locked steady crop, title key words highlighted with [brackets],
// arrow only where N3on's face is clearly in shot (checked on a frame), every clip ≥ 15 s, no piece < 1.3 s
const GAP = gapWords as Raw;
const mergeRaw = (...lists: Raw[]) => lists.flat().sort((a, b) => a.startMs - b.startMs)
  .filter((w, i, a) => i === 0 || w.startMs - a[i - 1].startMs > 150 || w.text.toLowerCase() !== a[i - 1].text.toLowerCase());
const PIL = mergeRaw((fiveWords as Raw).filter((w) => w.startMs < 158000 || w.startMs >= 176000), (moreWords as Raw).filter((w) => w.startMs >= 158000 && w.startMs < 176000), GAP.filter((w) => w.startMs < 113000));
export const REF_SLOWER = make({hookText: "TOO FAST FOR [N3ON]", hookEmoji: '1f62d', raw: PIL, title: "N3on begged the Pilates teacher to go [slower]", snap: true,
  segs: [[141000, 143700], [120900, 143350]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [138400, 'red'], music: 'Monkeys_Spinning_Monkeys.mp3', from: 0, musicGain: 0.7,
  hi: {slide: C, push: C, small: Y, pulses: Y, right: R, legs: [R, '1f62d'], killing: R, million: [G, '1f60e'], smile: G, slower: [Y, '1f62e']}});
export const REF_DREAM = make({hookText: "PILATES = [NEVER-ENDING]", hookEmoji: '1f62e', raw: PIL, title: "N3on called Pilates a [never-ending] dream", snap: true,
  segs: [[186500, 188000], [170600, 180000], [181200, 182500], [185700, 191200]], capsOff: [[175800, 177100]], keys: [[0, 960]], arrow: [186600, 1400, 300], flash: [176400, 'red'], music: 'interstellar-piano.mp3', from: 0, musicGain: 0.8,
  hi: {ball: C, thigh: Y, muscles: Y, 'f*cking': R, hard: [R, '1f62d'], box: C, stop: R, hurry: R, dream: [P, '1f62e'], glad: [G, '1f64f'], over: G}});
export const REF_SQUATS = make({hookText: "WHY IS NO ONE [STRUGGLING]?", hookEmoji: '1f633', raw: mergeRaw(REST, poleWords as Raw), title: "N3on vs [pole squats]: 'why is no one struggling?'", snap: true,
  segs: [[311000, 312300], [298700, 302200], [310200, 312300], [318000, 320600], [327900, 329200], [331300, 333900]], capsOff: [[296000, 340000]], keys: [[0, 960]],
  arrow: [318700, 820, 400], music: 'Sneaky_Snitch.mp3', from: 0, musicGain: 0.8,
  hi: {pole: C, squats: [Y, '1f4aa'], baby: [P, '1f476'], steps: P, struggling: [R, '1f633'], hand: Y, turn: G, manly: [O, '1f633'], window: O}});
export const REF_WAX = make({hookText: "N3ON GOT [WAXED]", hookEmoji: '1f62d', raw: mergeRaw((fiveWords as Raw).filter((w) => w.startMs < 766000), REST.filter((w) => w.startMs >= 766000)),
  title: "N3on got his leg [waxed]", snap: true,
  segs: [[769100, 771000], [750500, 770950]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [763200, 'red'], music: 'say-goodbye-lodoni.mp3', from: 0, musicGain: 0.8,
  hi: {wax: [Y, '1f62c'], follicle: Y, touch: R, ow: [R, '1f62d'], hurt: R, subscribe: [G, '1f514'], suffer: [R, '1f480']}});
export const REF_SCAM = make({hookText: "N3ON THE [SCAMMER]", hookEmoji: '1f923', raw: fiveWords as Raw, title: "'I'm a [scammer], I'm a [cheater]' – N3on", snap: true,
  segs: [[650600, 652500], [652400, 676000]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [671000, 'green'], music: 'funk-do-balkan.mp3', from: 0, musicGain: 0.7,
  hi: {scammer: [R, '1f921'], cheater: R, knee: C, tail: C, ankle: C, got: G, 'b*tch': [Y, '1f525'], yeah: G}});
export const RefSlower = REF_SLOWER.Comp, RefDream = REF_DREAM.Comp, RefSquats = REF_SQUATS.Comp, RefWax = REF_WAX.Comp, RefScam = REF_SCAM.Comp;

// ---- BATCH 7 (2026-11-18): "5 viral neon clips, funny and capturing" — the episode's funniest moments (first cut in older styles)
// re-edited in the current recipe; steady locked crop, typed summary hook, key-word colours, tight loop endings
const EP = mergeRaw(fiveWords as Raw, (moreWords as Raw));
export const REF_BET = make({hookText: "LOSER GETS [WAXED]", hookEmoji: '1f62c', raw: EP, title: "The loser of this workout gets their armpit [waxed]", snap: true,
  segs: [[43300, 44510], [35520, 44510], [51800, 56050], [56120, 59040]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [43300, 'red'], music: 'kai-cenat-suspense.mp3', from: 0, musicGain: 0.8, capsOff: [[38800, 42200]],
  extra: (o, out) => <BetCard o={o} a={out(38800)} b={out(42200)} />,
  hi: {spicy: [O, '1f525'], wax: [Y, '1f62c'], waxing: Y, armpit: Y, skinny: C, fat: R, impressive: G, crips: R}});
export const REF_TRUST = make({hookText: "HIS ONLY [FEAR]", hookEmoji: '1f633', raw: EP, title: "N3on's only [fear] during the headstand", snap: true,
  segs: [[385960, 389130], [359840, 361300], [382600, 389130], [392020, 395740], [399400, 402520], [409100, 412990]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [386500, 'red'], music: 'Sneaky_Snitch.mp3', from: 0, musicGain: 0.8,
  extra: (o, out) => <TypedAction o={o} a={out(383000)} b={out(386000)} text="doesn't trust her" y={70} />,
  hi: {trust: [R, '1f928'], butt: [O, '1f633'], crack: O, nothing: Y, shaking: C, stripper: P, did: [G, '1f4aa']}});
export const REF_SUE = make({hookText: "\"DON'T TOUCH ME, I'LL [SUE]\"", hookEmoji: '1f62d', raw: EP, title: "N3on took a 'bathroom break' to [win]", snap: true,
  segs: [[692000, 694200], [639720, 643960], [685100, 692600], [695200, 702090]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [693500, 'red'], music: 'Curb_Credits.mp3', from: 0, musicGain: 0.8,
  extra: (o, out) => <TypedAction o={o} a={out(640000)} b={out(643800)} text='the "bathroom break"' y={70} color="#F9FC35" glow="rgba(249,252,53,0.5)" />,
  hi: {restroom: [C, '1f6bd'], calories: Y, sue: [R, '1f62d'], lost: R, pool: C, running: Y, burn: Y}});
export const REF_ASKED = make({hookText: "HE REALLY [ASKED] THAT", hookEmoji: '1f480', raw: EP, title: "N3on asked the Pilates instructor [THIS]", snap: true,
  segs: [[80800, 83900], [61500, 66500], [78700, 84100], [90100, 94000]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [83100, 'red'], music: 'wtf-u-tryna-say.mp3', from: 0, musicGain: 0.6,
  extra: (o, out) => <><TypedAction o={o} a={out(84100)} b={out(84100) + 3000} text="asked the real question" y={70} /><Burst o={o} at={out(83300)} c="1f914" /></>,
  hi: {pilates: Y, kidding: R, prison: [R, '1f480'], straight: C, glasses: [C, '1f913'], easy: G, losing: R}});
export const REF_EXCITED = make({hookText: "WAY TOO [EXCITED]", hookEmoji: '1f929', raw: EP, title: "N3on was WAY too [excited] for this class", snap: true,
  segs: [[244500, 245700], [224900, 226300], [230000, 232800], [242400, 245700], [246600, 257700]], keys: [[0, 960]], arrow: [-1, 0, 0], flash: [256300, 'green'], music: 'say-goodbye-lodoni.mp3', from: 0, musicGain: 0.7,
  extra: (o, out) => <Burst o={o} at={out(246700)} c="1f929" />,
  hi: {strippers: [P, '1f633'], stripper: P, excited: [Y, '1f929'], years: C, pilates: Y, hell: G, yeah: G}});
export const RefBet = REF_BET.Comp, RefTrust = REF_TRUST.Comp, RefSue = REF_SUE.Comp, RefAsked = REF_ASKED.Comp, RefExcited = REF_EXCITED.Comp;

// ---- batch-7 format pieces: each re-edit gets its OWN element so the 5 don't feel like one template (user: "like how you edit BYB") ----
const EmoI = ({c, z = 70}: {c: string; z?: number}) => <Img src={staticFile(`emoji-ios/${c}.png`)} style={{width: z, height: z, verticalAlign: '-12px'}} />;
const BetCard = ({o, a, b}: {o: number; a: number; b: number}) => (o < a || o >= b ? null :
  <AbsoluteFill style={{background: 'rgba(8,10,14,0.62)', opacity: Math.min(1, (o - a) / 150, (b - o) / 150)}}>
    <div style={{position: 'absolute', left: 70, right: 70, top: 230, borderRadius: 28, background: 'white', padding: '30px 40px', transform: `scale(${Math.min(1, pop(o, a, 12, 240))})`}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 56, color: '#111', marginBottom: 18}}>THE BET</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#E8261F', marginBottom: 14}}>LOSE → SPICY FOOD <EmoI c="1f336" /></div>
      {o >= a + 900 && <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 44, color: '#E8261F', transform: `scale(${Math.min(1, pop(o, a + 900, 12, 240))})`, transformOrigin: '0 50%'}}>LOSE → ARMPIT WAX <EmoI c="1fa92" /></div>}
    </div></AbsoluteFill>);
const Burst = ({o, at, c}: {o: number; at: number; c: string}) => (o < at || o > at + 1100 ? null : <>{[[180, 300], [760, 360], [470, 160], [300, 620], [700, 680]].map(([x, y], i) => (
  <Img key={i} src={staticFile(`emoji-ios/${c}.png`)} style={{position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120,
    opacity: Math.min(1, (at + 1100 - o) / 200), transform: `scale(${Math.min(1, pop(o, at + i * 70, 10, 260))}) rotate(${(i - 2) * 9}deg)`}} />))}</>);
