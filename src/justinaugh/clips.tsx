// JustinAugh demo: Shohei Ohtani Bowman's Best superfractor auto 1/1 ($80,000), stream clip public/cards2/ohtani_1of1.mp4
// (1080x1920: hosts cam y 0-520, burned banner, card cam from y 750). Narration = existing Alex take public/narr/ohtani_loud.mp3.
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import words from '../plans/data/b2_ohtani_1of1.words.json';
import narr from '../../public/narr/ohtani.json';
import {FPS, Music, SfxTrack, f, sfx, timeline} from '../e3/kit';
import {Banner, Footage, JA, MoneyRain, OneWord, PipFrame, RedCircle, Reveal, WhiteFlash, zoomStyle, type Flash, type Pt, type Word} from './kit';

const HOOK = 3600; // hooks/holy_scream.mp4 0-3600 with the voiceover hook line on top
const SRC = 'cards2/ohtani_1of1.mp4';
const tl = timeline([[5800, 9000], [9440, 10140], [11260, 12820], [13800, 21140], [30620, 32260]]);
const out = (src: number) => HOOK + tl.out(src);
export const JA_OHTANI_MS = HOOK + tl.total;
const REVEAL = out(15500);
const BACK = REVEAL + 2440; // reveal card holds 2.44 s, then back to the stream for the reaction
const CUTS = [HOOK + tl.segOut[1], HOOK + tl.segOut[2], HOOK + tl.segOut[3], HOOK + tl.segOut[4]];
const NARR_HYPE = REVEAL + 250; // line 3 of the take (file 6880-12100)
const FLASHES: Flash[] = [{at: 0, kind: 'cut'}, {at: REVEAL, kind: 'reveal'}]; // v2: only frame 0 + a soft reveal flash
const WHIPS = [HOOK, ...CUTS, REVEAL, BACK]; // every cut is a zoom whip + fast-whoosh
const PUNCH: [number, number, number][] = [[1720 - 140, 450, 1.15], [2660 - 140, 600, 1.2], [out(15480), 500, 1.18], [out(18860), 450, 1.15]];

const clean = (t: string) => t.trim().replace(/[.,!?]+$/g, '');
const FIX: Record<string, string> = {Shohey: 'SHOHEI', Otani: 'OHTANI', $80: '$80,000', ',000': '', Fractor: 'FRACTOR', Super: 'SUPER'};
const COL: Record<string, string> = {SHOHEI: JA.yellow, OHTANI: JA.yellow, '$80,000': JA.green, ONE: JA.cyan, PACK: JA.green};
const narrWords = (line: number, at0: number, file0: number): Word[] => narr[line].words.map((w) => {
  const t = FIX[clean(w.text)] ?? clean(w.text).toUpperCase();
  return {text: t, at: at0 + w.at - file0, color: COL[t]};
}).filter((w) => w.text);
const HOOK_WORDS = narrWords(0, 0, 140);
const HYPE_WORDS = narrWords(2, NARR_HYPE, 6880);
const NARR_END = NARR_HYPE + 12100 - 6880;
const hostWords: Word[] = (words as {text: string; startMs: number}[])
  .filter((w) => tl.segs.some(([a, b]) => w.startMs >= a && w.startMs < b) && !/guluck/i.test(w.text))
  .map((w) => ({text: clean(w.text), at: out(w.startMs)}))
  .filter((w) => w.text && !(w.at >= NARR_HYPE && w.at < NARR_END) && !(w.at >= REVEAL && w.at < BACK));
const CAPS = [...HOOK_WORDS, ...hostWords, ...HYPE_WORDS.filter((w) => w.at >= BACK)].sort((a, b) => a.at - b.at);

// red circle on the host losing it (source track from scripts/track.py, mapped into the PiP)
const PIP: [number, number, number, number] = [70, 330, 940, 453];
const K = PIP[2] / 1080;
const TRACK: Pt[] = [[17700, 710, 282], [18333, 704, 284], [18967, 700, 278], [19567, 688, 312], [20167, 668, 331], [20767, 690, 288], [21140, 735, 270]]
  .map(([s, x, y]) => ({at: out(s), x: PIP[0] + x * K, y: PIP[1] + y * K}));

const hostVol = (o: number) => (o >= NARR_HYPE && o < NARR_END ? 0.22 : 1);
const musicLvl = (o: number) => (o < REVEAL - 250 ? 0.1 : o < REVEAL ? 0 : o < BACK ? 0.3 : 0.13) * Math.min(1, (JA_OHTANI_MS - o) / 500);

export const JaOhtani = () => {
  const o = (useCurrentFrame() / FPS) * 1000;
  const blur = o >= out(13800) && o < REVEAL ? 26 : 0; // card is never seen before the reveal
  const inReveal = o >= REVEAL && o < BACK;
  const z = zoomStyle(o, WHIPS, PUNCH);
  return <AbsoluteFill style={{background: 'black'}}>
    <AbsoluteFill style={z}>
    {/* hook clip (720x1280 → full frame), its burned caption blurred out */}
    <Sequence durationInFrames={f(HOOK)}>
      <Footage src="hooks/holy_scream.mp4" tl={timeline([[0, HOOK]])} crop={[0, 0, 720, 1280]} box={[0, 0, 1080, 1920]} />
      <div style={{position: 'absolute', left: 60, top: 1380, width: 960, height: 270, backdropFilter: 'blur(26px)'}} />
    </Sequence>
    {/* stream: card cam fills the frame, hosts in a yellow PiP */}
    {o >= HOOK && <>
      <Footage src={SRC} tl={tl} at={HOOK} crop={[261, 750, 658, 1170]} box={[0, 0, 1080, 1920]}
        style={{filter: inReveal ? 'blur(30px) brightness(0.75)' : blur ? `blur(${blur}px)` : undefined, transform: inReveal ? 'scale(1.12)' : undefined}} />
      {!inReveal && <PipFrame box={PIP}><Footage src={SRC} tl={tl} at={HOOK} crop={[0, 0, 1080, 520]} box={[0, 0, PIP[2], PIP[3]]} /></PipFrame>}
    </>}
    </AbsoluteFill>
    <AbsoluteFill style={zoomStyle(o, [REVEAL])}><Reveal o={o} at={REVEAL} until={BACK} card="cards2/ohtani.png" price="80,000 USD" /></AbsoluteFill>
    <MoneyRain o={o} from={REVEAL} to={BACK} />
    {!inReveal && <RedCircle o={o} pts={TRACK} from={BACK} to={out(20900)} r={96} />}
    {!inReveal && <Banner top={100} lines={[[['THEY '], ['JUST ', JA.bGreen], ['PULLED AN']], [['$80,000 ', JA.bGreen], ['1/1', JA.bRed]]]} emoji={['1f92f', '1f633']} />}
    {!inReveal && <OneWord o={o} words={CAPS} y={o < HOOK ? 1000 : 1200} />}
    <WhiteFlash o={o} list={FLASHES} />
    {/* sound */}
    <Sequence durationInFrames={f(HOOK)}><Audio src={staticFile('hooks/holy_scream.mp4')} volume={0.3} /></Sequence>
    {tl.segs.map(([a, b], i) => <Sequence key={i} from={f(HOOK + tl.segOut[i])} durationInFrames={f(tl.segOut[i] + b - a) - f(tl.segOut[i])}>
      <Audio src={staticFile(SRC)} trimBefore={f(a)} volume={(fr) => hostVol(HOOK + tl.segOut[i] + (fr * 1000) / FPS)} />
    </Sequence>)}
    <Sequence durationInFrames={f(3620 - 140)}><Audio src={staticFile('narr/ohtani_loud.mp3')} trimBefore={f(140)} volume={1} /></Sequence>
    <Sequence from={f(NARR_HYPE)} durationInFrames={f(12100 - 6880)}><Audio src={staticFile('narr/ohtani_loud.mp3')} trimBefore={f(6880)} volume={1} /></Sequence>
    <Music file="funk-sigilo.mp3" songFrom={36900 - REVEAL} level={musicLvl} />
    <SfxTrack list={[
      sfx('ja-ding', 0, 0.5),
      ...WHIPS.map((t) => sfx('fast-whoosh', t, 0.55)),
      sfx('cinematic-suspense-riser', REVEAL, 0.3),
      sfx('jorho-flash', REVEAL, 0.7), sfx('cha-ching', REVEAL + 150, 0.5),
      sfx('ja-ding', BACK, 0.35),
    ]} />
  </AbsoluteFill>;
};
export const JA_INFO = {REVEAL, BACK, CUTS, total: JA_OHTANI_MS, interp: interpolate};
