// JustinAugh batch (2026-11-01): 5 Backyard Breaks pulls built from one factory. Same recipe as JaOhtani v2:
// hook clip + Alex hook line → zoom whips + fast-whoosh on every cut → yellow-PiP stream with the card blurred → soft reveal flash,
// INSANE PULL card + green price + 😱 + money → back to the hosts with the tracked red circle; Alex hype line over the reaction.
// Music: a different phonk per pull, gain from measured LUFS (bed ≈ 14 dB under the voice, a short lift after the drop).
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {FPS, Music, SfxTrack, f, sfx, timeline, type Seg} from '../e3/kit';
import {Banner, Footage, JA, MoneyRain, OneWord, PipFrame, RedCircle, Reveal, WhiteFlash, zoomStyle, type Flash, type Part, type Pt, type Word} from './kit';
import mahomesWords from '../plans/data/b2_mahomes_kaboom.words.json';
import flaggWords from '../plans/data/b2_flagg_papa.words.json';
import lebronWords from '../plans/data/b2_lebron_logoman.words.json';
import swWords from '../plans/data/b2_starwars_triple.words.json';
import dartWords from '../plans/data/c3_dart.words.json';
import mahomesN from '../../public/narr/mahomes.json';
import flaggN from '../../public/narr/flagg2.json';
import lebronN from '../../public/narr/lebron2.json';
import swN from '../../public/narr/starwars.json';
import dartN from '../../public/narr/dart.json';
import mahomesN2 from '../../public/narr/mahomes_v2.json';
import flaggN2 from '../../public/narr/flagg2_v2.json';

type NLine = {file: number[]; words: {text: string; at: number}[]};
type Box = [number, number, number, number];
type Cfg = {
  src: string; hosts: Box; card: Box; cardCx: number; still: string; price: string; revealAt: number; segs: Seg[]; blurFrom: number;
  hook: {file: string; from: number; to: number; cover: Box}; words: {text: string; startMs: number}[];
  narr: {file: string; lines: NLine[]; hook: number; hype: number}; banner: Part[][]; emoji?: string[];
  music: {file: string; drop: number; lufs: number}; track: [number, number, number][]; ringR?: number;
};
const BED = -28, LIFT = -22; // music LUFS targets (voice ≈ −13.5)
const gain = (lufs: number, target: number) => Math.pow(10, (target - lufs) / 20);
const clean = (t: string) => t.trim().replace(/[.!?]+$/g, '');
const narrWords = (l: NLine, at0: number): Word[] => {
  const out: Word[] = [];
  l.words.forEach((w) => {
    const t = clean(w.text);
    if (t.startsWith('-') && out.length) { out[out.length - 1].text += t; return; } // "life" "-changing"
    if (t.startsWith(',') && out.length) { out[out.length - 1].text += t.replace(/,$/, ''); return; } // "$100" ",000" → "$100,000"
    const bare = t.replace(/,$/, '');
    out.push({text: ({flag: 'Flagg', Otani: 'Ohtani'} as Record<string, string>)[bare] ?? bare, at: at0 + w.at - l.file[0]});
  });
  return out.map((w) => ({...w, color: /^\$/.test(w.text) ? JA.green : /^(ONE|OF)$/i.test(w.text) ? JA.cyan : undefined}));
};

export const makeJa = (c: Cfg) => {
  const HOOK = c.hook.to - c.hook.from;
  const tl = timeline(c.segs);
  const out = (s: number) => HOOK + tl.out(s);
  const total = HOOK + tl.total;
  const REVEAL = out(c.revealAt);
  // blur starts at blurFrom, or at the first kept segment after it (a source time inside a cut maps to nothing)
  const bi = tl.segs.findIndex(([, b]) => b > c.blurFrom);
  const BLUR_AT = HOOK + (bi < 0 ? tl.total : tl.segOut[bi] + Math.max(0, c.blurFrom - tl.segs[bi][0]));
  const BACK = REVEAL + 2440;
  const CUTS = tl.segOut.slice(1).map((t) => HOOK + t).filter((t) => Math.abs(t - REVEAL) > 100);
  const WHIPS = [HOOK, ...CUTS, BACK];
  const hookL = c.narr.lines[c.narr.hook], hypeL = c.narr.lines[c.narr.hype];
  const HOOK_END = hookL.file[1] - hookL.file[0];
  const HYPE = REVEAL + 250, HYPE_END = HYPE + hypeL.file[1] - hypeL.file[0];
  const hostWords: Word[] = c.words.filter((w) => tl.segs.some(([a, b]) => w.startMs >= a && w.startMs < b))
    .map((w) => ({text: clean(w.text).replace(/,$/, ''), at: out(w.startMs)}))
    .filter((w) => w.text && w.at > HOOK_END + 100 && !(w.at >= REVEAL && w.at < BACK) && !(w.at >= HYPE && w.at < HYPE_END));
  const CAPS = [...narrWords(hookL, 0), ...hostWords, ...narrWords(hypeL, HYPE).filter((w) => w.at >= BACK)].sort((a, b) => a.at - b.at);
  const PIP: Box = [70, 330, 940, Math.round((940 * c.hosts[3]) / c.hosts[2])];
  const K = PIP[2] / c.hosts[2];
  const TRACK: Pt[] = c.track.map(([s, x, y]) => ({at: out(s), x: PIP[0] + (x - c.hosts[0]) * K, y: PIP[1] + (y - c.hosts[1]) * K}));
  const ringTo = TRACK.length ? Math.min(TRACK[TRACK.length - 1].at, total - 300) : 0;
  const sh = c.card[3], sw = Math.round(sh * 0.5625);
  const sx = Math.max(0, Math.min(1080 - sw, c.cardCx - sw / 2));
  const FLASHES: Flash[] = [{at: 0, kind: 'cut'}, {at: REVEAL, kind: 'reveal'}];
  const hc = c.hook.cover.map((v) => v * 1.5);
  const musicLvl = (o: number) => {
    const g = o < REVEAL - 250 ? gain(c.music.lufs, BED) : o < REVEAL ? 0 : o < BACK ? gain(c.music.lufs, LIFT) : gain(c.music.lufs, BED + 1);
    return g * Math.min(1, (total - o) / 500);
  };
  const hostVol = (o: number) => (o < HOOK_END ? 0.3 : o >= HYPE && o < HYPE_END ? 0.2 : 1);
  const C = () => {
    const o = (useCurrentFrame() / FPS) * 1000;
    const inReveal = o >= REVEAL && o < BACK;
    const blur = o >= BLUR_AT && o < REVEAL ? 26 : 0;
    return <AbsoluteFill style={{background: 'black'}}>
      <AbsoluteFill style={zoomStyle(o, WHIPS)}>
        <Sequence durationInFrames={f(HOOK)}>
          <Footage src={c.hook.file} tl={timeline([[c.hook.from, c.hook.to]])} crop={[0, 0, 720, 1280]} box={[0, 0, 1080, 1920]} />
          <div style={{position: 'absolute', left: hc[0], top: hc[1], width: hc[2], height: hc[3], backdropFilter: 'blur(26px)'}} />
        </Sequence>
        {o >= HOOK && <>
          <Footage src={c.src} tl={tl} at={HOOK} crop={[sx, c.card[1], sw, sh]} box={[0, 0, 1080, 1920]}
            style={{filter: inReveal ? 'blur(30px) brightness(0.75)' : blur ? `blur(${blur}px)` : undefined, transform: inReveal ? 'scale(1.12)' : undefined}} />
          {!inReveal && <PipFrame box={PIP}><Footage src={c.src} tl={tl} at={HOOK} crop={c.hosts} box={[0, 0, PIP[2], PIP[3]]} /></PipFrame>}
        </>}
      </AbsoluteFill>
      <AbsoluteFill style={zoomStyle(o, [REVEAL])}><Reveal o={o} at={REVEAL} until={BACK} card={c.still} price={c.price} /></AbsoluteFill>
      <MoneyRain o={o} from={REVEAL} to={BACK} />
      {!inReveal && TRACK.length > 0 && <RedCircle o={o} pts={TRACK} from={BACK} to={ringTo} r={(c.ringR ?? 100) * K} />}
      {!inReveal && <Banner top={100} lines={c.banner} emoji={c.emoji ?? ['1f92f', '1f633']} />}
      {!inReveal && <OneWord o={o} words={CAPS} y={o < HOOK ? 1000 : 1240} />}
      <WhiteFlash o={o} list={FLASHES} />
      <Sequence from={f(c.hook.from) * 0} durationInFrames={f(HOOK)}><Audio src={staticFile(c.hook.file)} trimBefore={f(c.hook.from)}
        volume={(fr) => ((fr * 1000) / FPS < HOOK_END ? 0.3 : 0.9)} /></Sequence>
      {tl.segs.map(([a, b], i) => <Sequence key={i} from={f(HOOK + tl.segOut[i])} durationInFrames={f(tl.segOut[i] + b - a) - f(tl.segOut[i])}>
        <Audio src={staticFile(c.src)} trimBefore={f(a)} volume={(fr) => hostVol(HOOK + tl.segOut[i] + (fr * 1000) / FPS)} />
      </Sequence>)}
      <Sequence durationInFrames={f(HOOK_END)}><Audio src={staticFile(c.narr.file)} trimBefore={f(hookL.file[0])} /></Sequence>
      <Sequence from={f(HYPE)} durationInFrames={f(HYPE_END - HYPE)}><Audio src={staticFile(c.narr.file)} trimBefore={f(hypeL.file[0])} /></Sequence>
      <Music file={c.music.file} songFrom={c.music.drop - REVEAL} level={musicLvl} />
      <SfxTrack list={[
        sfx('ja-ding', 0, 0.4),
        ...WHIPS.map((t) => sfx('fast-whoosh', t, 0.45)),
        sfx('cinematic-suspense-riser', REVEAL, 0.22),
        sfx('jorho-flash', REVEAL, 0.45), sfx('cha-ching', REVEAL + 150, 0.4),
        sfx('ja-ding', BACK, 0.3),
      ]} />
    </AbsoluteFill>;
  };
  return {C, total};
};

const G = JA.bGreen, R = JA.bRed;
export const JA_MAHOMES = makeJa({
  src: 'cards2/mahomes_kaboom.mp4', hosts: [0, 0, 1080, 500], card: [0, 530, 1080, 1390], cardCx: 560, still: 'cards2/mahomes.png', price: '100,000 USD',
  revealAt: 20400, segs: [[0, 2600], [16600, 19000], [19000, 20400], [20400, 26000], [33800, 36100]], blurFrom: 0,
  hook: {file: 'hooks/thats_the_goat.mp4', from: 0, to: 2900, cover: [20, 950, 680, 240]}, words: mahomesWords,
  narr: {file: 'narr/mahomes_v2_loud.mp3', lines: mahomesN2, hook: 0, hype: 1}, // v2 take: more enthusiastic (2026-11-01)
  banner: [[['THEY SAID '], ['RECORD THIS', G]], [['A ', undefined], ['$100,000 ', G], ['1/1', R]]],
  music: {file: 'montagem-uranium.mp3', drop: 37000, lufs: -3.2},
  track: [[24200, 844, 340], [24833, 888, 400], [25500, 880, 380], [25900, 870, 370]],
});
export const JA_FLAGG = makeJa({
  src: 'cards2/flagg_papa.mp4', hosts: [0, 0, 1080, 520], card: [0, 745, 1080, 1175], cardCx: 510, still: 'cards2/flagg.png', price: '100,000+ USD',
  revealAt: 48000, segs: [[29100, 36000], [46500, 48000], [48000, 56500], [101800, 104500]], blurFrom: 29100,
  hook: {file: 'hooks/rise_up_and_bring_the_earth_down.mp4', from: 0, to: 2600, cover: [20, 850, 690, 170]}, words: flaggWords,
  narr: {file: 'narr/flagg2_v2_loud.mp3', lines: flaggN2, hook: 0, hype: 1}, // v2 take: more enthusiastic (2026-11-01)
  banner: [[['ONE PACK. '], ['ONE SHOT', G]], [['AT A ', undefined], ['$100,000 ', G], ['ROOKIE', R]]], emoji: ['1f62e', '1f525'],
  music: {file: 'funk-abnormal.mp3', drop: 43700, lufs: -6.1}, track: [],
});
export const JA_LEBRON = makeJa({
  src: 'cards2/lebron_logoman.mp4', hosts: [0, 0, 1080, 486], card: [0, 700, 1080, 1220], cardCx: 720, still: 'cards2/lebron.png', price: '350,000 USD',
  revealAt: 23000, segs: [[12300, 16000], [20400, 21300], [21300, 23000], [23000, 29500], [47600, 51500]], blurFrom: 12300,
  hook: {file: 'hooks/the_greatest_player.mp4', from: 0, to: 3200, cover: [40, 940, 660, 190]}, words: lebronWords,
  narr: {file: 'narr/lebron2_loud.mp3', lines: lebronN, hook: 0, hype: 2},
  banner: [[['THIS PRODUCT HAS '], ['ONE', R]], [['$350,000 ', G], ['CHASE CARD', undefined]]], emoji: ['1f440', '1f633'],
  music: {file: 'acido-iii.mp3', drop: 64200, lufs: -7.6},
  track: [[24816, 798, 324], [25234, 788, 366], [26000, 800, 360], [27000, 790, 350], [28000, 795, 355]],
});
export const JA_STARWARS = makeJa({
  src: 'cards2/starwars_triple.mp4', hosts: [0, 0, 1080, 520], card: [0, 700, 1080, 1220], cardCx: 460, still: 'cards2/starwars.png', price: '12,000+ USD',
  revealAt: 59600, segs: [[48800, 52500], [53600, 55400], [57800, 59600], [59600, 70600]], blurFrom: 48800,
  hook: {file: 'hooks/trip_mind_boggling.mp4', from: 600, to: 3400, cover: [20, 860, 690, 110]}, words: swWords,
  narr: {file: 'narr/starwars_loud.mp3', lines: swN, hook: 0, hype: 2},
  banner: [[['A ', undefined], ['TRIPLE AUTO 1/1', R]], [['FROM ', undefined], ['FAR, FAR AWAY', G]]], emoji: ['1f30c', '1f92f'],
  music: {file: 'amor-na-praia.mp3', drop: 13500, lufs: -4.2},
  track: [[63200, 364, 306], [63633, 288, 245], [64400, 300, 270], [65400, 320, 280], [66500, 330, 285]],
});
export const JA_DART = makeJa({
  src: 'cards/c3_dart.mp4', hosts: [0, 0, 1080, 440], card: [0, 495, 1080, 1425], cardCx: 440, still: 'cards/dart.png', price: '200,000+ USD',
  revealAt: 40500, segs: [[12400, 16300], [18800, 22400], [39300, 40500], [40500, 42500], [91000, 96200]], blurFrom: 38000,
  hook: {file: 'hooks/no_way_he_did_it.mp4', from: 0, to: 3000, cover: [60, 930, 600, 160]}, words: dartWords,
  narr: {file: 'narr/dart_loud.mp3', lines: dartN, hook: 2, hype: 3},
  banner: [[['RELEASE DAY ', G], ['PAID OFF']], [['$200,000 ', G], ['ROOKIE ', undefined], ['1/1', R]]],
  music: {file: 'vem-pere-reka.mp3', drop: 63500, lufs: -8.8},
  track: [[91200, 762, 239], [91600, 716, 143], [92500, 700, 170], [93500, 710, 180], [95000, 720, 190]],
});
export const JaMahomes = JA_MAHOMES.C, JaFlagg = JA_FLAGG.C, JaLebron = JA_LEBRON.C, JaStarwars = JA_STARWARS.C, JaDart = JA_DART.C;
