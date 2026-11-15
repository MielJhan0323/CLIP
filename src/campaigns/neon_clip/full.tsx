// NEON FULL-SCREEN (2026-11-15). User: "now redo the videos you did before" in the style of the 3 Neon viral references
// (vault/05 Campaigns/Neon clip/references/external/Neon viral references.md) + the client Editing Guideline:
//  · FULL-SCREEN 9:16 footage (no bars), a white title box at the top (black text + iOS emoji)
//  · Anton uppercase captions, 1–2 words, colour per SPEAKER (N3on white, Sarah magenta, instructors yellow), swears censored,
//    leaving when the word ends
//  · *ACTION* labels (white Anton) in the gaps
//  · green / red flashes HELD ~0.5 s (green = win/hype, red = fail/roast)
//  · cut to whoever talks: full-height shot centred on the speaker ↔ a face punch-in, ~every 1.5 s
//  · a music bed the whole way (clearly there, voice on top), meme SFX in the gaps, the fahhh freeze
//  · a LOSS ends black-and-white with a slow push-in
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Cam, FPS, Music, SfxTrack, SpeechTrack, clamp, sfx, timeline, type CamCfg, type Sfx, type TL, type Track} from '../../e3/kit';
import {tighten} from '../../jorho/tighten';
import {speechDips} from './neon';
import moreWords from '../../plans/data/r3born_ep2_more.words.json';
import FR from '../../plans/data/r3born_ep2_full_frames.json'; // hand-picked speaker per shot, refined by YuNet every 0.25 s (scripts/refine_frames.py)

type Raw = {text: string; startMs: number; endMs: number}[];
const SRC = 'neon/r3born_ep2.mp4';
const ANTON = 'Anton, Impact, sans-serif';
const COL = {n3on: '#FFFFFF', sarah: '#FF4FD8', other: '#F9FC35'};
type Who = keyof typeof COL;
const CENSOR: Record<string, string> = {shit: 'SH*T', fuck: 'F*CK', fucking: 'F*CKING', bitch: 'B*TCH', ass: 'A**', ask: 'A**'};

type Cfg = {
  segs: [number, number, number?][]; title: string; emoji?: string;
  speakers: [number, number, Who][]; // source ranges → speaker (default N3on)
  labels: [number, string][]; // *ACTION* labels at source times
  flashes: [number, 'green' | 'red'][];
  fah?: number; lossEnd?: boolean; music: string; from: number; musicGain?: number; gain?: number;
  frames: [sec: number, x: number, y: number][]; // HAND-FRAMED crop centre per shot (source seconds, source px of the speaker's face)
  memes?: [string, number, number?, number?][];
};

type Cap = {text: string; at: number; end: number; color: string};
const build = (c: Cfg) => {
  const raw = moreWords as Raw;
  const segs = tighten(c.segs as never, raw);
  const last = segs[segs.length - 1];
  const after = [...raw].sort((x, y) => x.startMs - y.startMs).find((w) => w.startMs >= last[1])?.startMs ?? Infinity;
  const spokeEnd = last[1];
  segs[segs.length - 1] = [last[0], Math.max(last[1], Math.min(last[1] + 900, after - 60)), last[2] ?? 0];
  const tl = timeline(segs);
  const hookN = tighten([c.segs[0]] as never, raw).length;
  const out = (src: number, hook = false) => {
    for (let i = hook ? 0 : hookN; i < segs.length; i++) if (src >= segs[i][0] && src <= segs[i][1] + (segs[i][2] ?? 0)) return tl.segOut[i] + Math.min(src, segs[i][1]) - segs[i][0];
    return -1;
  };
  const who = (src: number): Who => c.speakers.find(([a, b]) => src >= a && src < b)?.[2] ?? 'n3on';
  // captions: 1–2 words, per-speaker colour, leave when said
  const words: Cap[] = [];
  segs.forEach(([a, b], i) => raw.filter((w) => w.startMs >= a && w.startMs < b).sort((x, y) => x.startMs - y.startMs).forEach((w) => {
    const bare = w.text.trim().replace(/^[-]+|[.,!?]+$/g, '');
    if (!bare) return;
    const t = CENSOR[bare.toLowerCase()] ?? bare.toUpperCase();
    const at = tl.segOut[i] + w.startMs - a;
    words.push({text: t, at, end: at + Math.max(260, w.endMs - w.startMs) + 180, color: COL[who(w.startMs)]});
  }));
  words.sort((x, y) => x.at - y.at);
  const caps: Cap[] = [];
  for (let k = 0; k < words.length; k++) { // pair very fast words of the same speaker
    const w = words[k], n = words[k + 1];
    if (n && n.color === w.color && n.at - w.at < 220 && (w.text + n.text).length <= 12) { caps.push({text: `${w.text} ${n.text}`, at: w.at, end: n.end, color: w.color}); k++; }
    else caps.push(w);
  }
  const dips = speechDips(raw, tl);
  // camera: full-height shot centred on the current speaker's face ↔ face punch-in, alternating every ~1.5 s
  // user 2026-11-15: "too many cuts, it's overstim" → no wide/face alternation; one steady full-height framing that only moves when the
  // speaker / source shot changes (the frames list), no extra punch-in cuts
  const shots: [number, 'wide' | 'face'][] = [[0, 'wide']];
  const shotAt = (o: number) => [...shots].reverse().find(([t]) => o >= t)?.[1] ?? 'wide';
  const end = tl.segOut[segs.length - 1] + spokeEnd - last[0];
  const lossFrom = c.lossEnd ? Math.max(0, end - 1500) : Infinity;
  return {tl, caps, out, dips, shots, shotAt, end, lossFrom, hookN};
};

const flashCol = {green: 'rgba(60,230,40,0.55)', red: 'rgba(240,30,30,0.55)'};
export const makeFull = (c: Cfg) => {
  const b = build(c);
  const {tl, caps, out, dips, shotAt, end, lossFrom} = b;
  const labels = c.labels.map(([s, t]) => [out(s), t] as const).filter(([t]) => t >= 0);
  const flashes = c.flashes.map(([s, col]) => [out(s), col] as const).filter(([t]) => t >= 0);
  const fahAt = c.fah !== undefined ? out(c.fah) : -1;
  // camera (user 2026-11-15: "what the actual f*** are the cameras even centered on"): the auto face tracker lost faces in profile and
  // on cuts (it sat on walls / knees), so every shot is HAND-FRAMED from contact sheets: c.frames gives the speaker's face per shot.
  // wide = full source height centred on that face; punch-in = 700 px crop with the face 40 % down
  const kf = [...c.frames].sort((a, z) => a[0] - z[0]);
  const lo = Math.min(...c.segs.map((g) => g[0])), hi = Math.max(...c.segs.map((g) => g[1]));
  const M: number[][] = [];
  for (let t = lo; t <= hi + 200; t += 100) { const k = [...kf].reverse().find(([sec]) => sec * 1000 <= t) ?? kf[0]; M.push([k[1], k[2], 300]); }
  const handTrack = {stepMs: 100, fromMs: lo, L: M, M, R: M} as unknown as Track;
  const cam = (o: number): CamCfg => {
    const face = shotAt(o) === 'face';
    return {src: SRC, tl, track: handTrack, grade: 'contrast(1.02)', box: [1080, 1920], baseH: 1080, zoom: () => (face ? 1080 / 700 : 1),
      faceY: face ? 0.4 : 0.32, wideX: 960, who: () => 'M'};
  };
  const sfxList: Sfx[] = [
    sfx('g-camera-flash', 0, 0.2, 500),
    ...b.shots.slice(2).filter(([t]) => dips.every(([x, y]) => t < x || t >= y)).map(([t]) => sfx('g-swoosh-sound-effects-1', t - 80, 0.12, 400)),
    ...flashes.map(([t, col]) => (col === 'green' ? sfx('g-ding-sfx', t, 0.16, 800) : sfx('g-shock-sfx', t, 0.14, 800))),
    ...labels.filter(([t]) => dips.every(([x, y]) => t < x || t >= y)).map(([t]) => sfx('g-typing-sfx', t, 0.08, 500)),
    ...(fahAt >= 0 ? [sfx('g-fahhh-sfx', fahAt + 40, 0.5, 1500)] : []),
    ...(c.memes ?? []).map(([fl, t, v, m]) => { const o = out(t); const w = dips.find(([x, y]) => o >= x && o < y); return sfx(fl, w ? w[1] : o, v ?? 0.28, m ?? 900); }),
    ...(c.lossEnd ? [sfx('g-akward-sfx', lossFrom, 0.24, 1500)] : [sfx('g-anime-wow-sound-effect', end + 60, 0.16, 1000)]),
  ];
  const mg = c.musicGain ?? 1;
  const Comp = () => {
    const o = (useCurrentFrame() * 1000) / FPS;
    const cfg = cam(o);
    const bw = o >= lossFrom ? interpolate(o - lossFrom, [0, 250], [0, 1], clamp) : 0;
    const push = o >= lossFrom ? interpolate(o - lossFrom, [0, 1500], [1, 1.14], clamp) : 1;
    const whip = o < 160 ? 1 - o / 160 : 0;
    const cap = caps.filter((w) => o >= w.at && o < w.end).pop();
    const lab = labels.find(([t]) => o >= t && o < t + 1100);
    return <AbsoluteFill style={{background: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${push * (1 + whip * 0.08)}) translateX(${-whip * 90}px)`, filter: `${bw ? `grayscale(${bw}) contrast(${1 + bw * 0.15})` : ''} ${whip ? `blur(${whip * 10}px)` : ''}`.trim() || undefined}}>
        <Cam c={cfg} o={o} />
      </AbsoluteFill>
      {flashes.map(([t, col], i) => (o >= t && o < t + 560 ? <AbsoluteFill key={i} style={{background: flashCol[col], mixBlendMode: 'color',
        opacity: interpolate(o - t, [0, 60, 380, 560], [0, 1, 1, 0], clamp)}} /> : null))}
      {o < 120 && <AbsoluteFill style={{background: 'white', opacity: 1 - o / 120}} />}
      {/* white title box (ref_arman) */}
      <div style={{position: 'absolute', top: 130, left: 40, right: 40, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: 'white', padding: '22px 34px', borderRadius: 8, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 66, fontWeight: 700, lineHeight: 1.12,
          color: '#111', textAlign: 'center', boxShadow: '0 6px 18px rgba(0,0,0,0.35)', maxWidth: 1000}}>
          {c.title}{c.emoji && <Img src={staticFile(`emoji-ios/${c.emoji}.png`)} style={{width: 66, height: 66, verticalAlign: '-12px', marginLeft: 10}} />}
        </div>
      </div>
      {/* captions (Anton, per speaker) or an *ACTION* label in the gaps */}
      {(cap || lab) && <div style={{position: 'absolute', top: 1180, left: 0, right: 0, textAlign: 'center'}}>
        <span style={{fontFamily: ANTON, fontSize: cap ? 112 : 96, letterSpacing: 1, color: cap ? cap.color : 'white', WebkitTextStroke: '9px #000', paintOrder: 'stroke fill',
          textShadow: '0 6px 14px rgba(0,0,0,0.6)', display: 'inline-block', transform: `scale(${interpolate(o - (cap ? cap.at : lab![0]), [0, 70, 140], [1.25, 0.96, 1], clamp)})`}}>
          {cap ? cap.text : `*${lab![1]}*`}</span>
      </div>}
      <SpeechTrack src={SRC} tl={tl} gain={1.05 * (c.gain ?? 1)} />
      <Music file={c.music} songFrom={c.from} level={(t) => {
        const dk = dips.some(([x, y]) => t >= x && t < y) ? 0.6 : 1; // voice on top, bed still clearly there (client guideline)
        return 0.32 * mg * dk * Math.min(1, t / 200) * Math.min(1, (tl.total - t) / 400) * (t >= end ? 1.6 : 1);
      }} />
      <SfxTrack list={sfxList} />
    </AbsoluteFill>;
  };
  return {Comp, total: tl.total};
};

// ---- the 5 redos (same moments as the feed edits) -------------------------------------------------------------------------------
export const FULL_PILATESQ = makeFull({frames: FR.FULL_PILATESQ as [number, number, number][],
  segs: [[80800, 83900], [61500, 66500], [78700, 84100, 1000], [90100, 94000]], title: 'N3on asked the Pilates instructor THIS', emoji: '1f480',
  speakers: [[64900, 66500, 'sarah'], [79800, 82750, 'other'], [83600, 84200, 'other'], [90900, 91600, 'other'], [91600, 92300, 'other'], [92300, 93500, 'sarah']],
  labels: [[66500, 'PILATES'], [84100, 'ASKED THE REAL QUESTION']], flashes: [[83100, 'red'], [93700, 'green']], fah: 84100,
  music: 'wtf-u-tryna-say.mp3', from: 0, memes: [['g-ceeday-huh-sound-effect-1', 66500, 0.3, 900]]});
export const FULL_TUCK = makeFull({frames: FR.FULL_TUCK as [number, number, number][],
  segs: [[568000, 569800], [543700, 547600], [549300, 558000], [566000, 570000, 1000], [573600, 574600]], title: 'Sarah vs N3on: who can hold it longer?', emoji: '23f1',
  speakers: [[543700, 570100, 'other']], labels: [[554700, 'TUCK HOLD'], [556000, 'SHAKING'], [570000, 'LOSES']], flashes: [[554700, 'green'], [568900, 'red']], fah: 570000, lossEnd: true,
  music: 'kai-cenat-suspense.mp3', from: 0, musicGain: 1.6, gain: 1.4, memes: [['g-sudden-suspense-sound-effect', 555000, 0.24, 1800]]});
export const FULL_SPIDER = makeFull({frames: FR.FULL_SPIDER as [number, number, number][],
  segs: [[716600, 718800], [602600, 608500], [617200, 622000], [706100, 708600], [712200, 718800]], title: 'N3on finally found something he is good at', emoji: '1f577',
  speakers: [[602600, 621300, 'other'], [706100, 708700, 'other'], [712200, 714700, 'sarah']], labels: [[602700, 'CLIMBS'], [619300, 'SPIDER-MAN'], [622000, 'PROUD']],
  flashes: [[619300, 'green'], [621400, 'green'], [714000, 'green']], music: 'joyful-chess-guide.mp3', from: 2000, gain: 1.15,
  memes: [['g-anime-wow-sound-effect', 622000, 0.28, 1200]]});
export const FULL_RESPECT = makeFull({frames: FR.FULL_RESPECT as [number, number, number][],
  segs: [[418100, 421700], [416100, 429700]], title: 'N3on gained a new respect for pole dancers', emoji: '1f91d',
  speakers: [], labels: [[421700, 'RESPECT']], flashes: [[423600, 'green']], music: 'ts-pmo.mp3', from: 0, musicGain: 1.5, gain: 1.45,
  memes: [['g-correct-sfx', 423600, 0.22, 900]]});
export const FULL_EXCITED = makeFull({frames: FR.FULL_EXCITED as [number, number, number][],
  segs: [[244500, 245700], [225000, 226200], [230000, 232800], [242400, 245700], [246600, 257700, 1000]], title: 'N3on was WAY too excited for this class', emoji: '1f929',
  speakers: [[225000, 226000, 'sarah'], [230000, 231900, 'sarah'], [242400, 245800, 'sarah'], [248900, 250000, 'other'], [250600, 250900, 'other'], [254200, 257300, 'other']],
  labels: [[245700, 'TOO EXCITED'], [257700, 'SHOCKED']], flashes: [[243300, 'green'], [256300, 'red'], [257400, 'green']], fah: 257700,
  music: 'say-goodbye-lodoni.mp3', from: 0, musicGain: 0.7, memes: [['g-rizz-sfx', 245800, 0.26, 1200]]});
export const FullPilatesQ = FULL_PILATESQ.Comp, FullTuck = FULL_TUCK.Comp, FullSpider = FULL_SPIDER.Comp, FullRespect = FULL_RESPECT.Comp, FullExcited = FULL_EXCITED.Comp;
