// ⚠ WRONG STYLE (user 2026-11-14: "the jorho v2 is for trevor lawrence… use justin augh for card pulls"): the 3 card-pull
// edits below (B14Murakami/Randy/Judge) are kept only for reference; the batch-14 Jorho v2 deliverables are the 3 TREVOR clips at the bottom.
// BATCH 14 (2026-11-14): 3 Jorho v2 edits of the NEW Backyard Breaks card pulls (Live Stream Clips tab, Nov 9–11).
// The sources are vertical streams (hosts on top, card cam below). Each is pre-cropped to a 1920×1080 canvas with the card cam
// (source y 620–1700) in the centre, so the Jorho box shows the card; the hosts come in as a small inset cam on the reaction beats.
// Viral principles (not tools): cold open on the strongest line, a guessing beat, the payoff, end on a finished reaction line.
// Fused restraint: 2–3 graphics per clip, at most one strobe, soft SFX, no cards covering the pull.
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, f, pop, sfx, timeline, type TL} from '../e3/kit';
import {GREEN, chunkWords, wordsFrom, type Word} from './kit';
import {Jorho, type Spec} from './clips';
import {StatBadge, TypedAction, YouTubeCard} from './v2';
import {cam} from './batch10';
import {ArticleHighlight} from './batch9';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';
import muraWords from '../plans/data/c12_murakami_1of1.words.json';
import randyWords from '../plans/data/c12_randy_free.words.json';
import judgeWords from '../plans/data/c12_judge_supernova.words.json';

type Track = Spec['track'];
const FLAT = {stepMs: 1000, fromMs: 0, M: Array(200).fill([960, 540])} as unknown as Track; // fixed framing: the card cam
const BW = 1080;
const caps = (raw: {text: string; startMs: number}[], tl: TL, fix: Record<string, string>, col: Record<string, string>): Word[] =>
  chunkWords(tl.segs.flatMap((s, i) => wordsFrom(raw, timeline([[s[0], s[1]]]), fix, col).map((w) => ({...w, at: w.at + tl.segOut[i]}))), tl.total, tl.segOut, 200, 13);

// hosts inset: the stream's top strip (source 1080×530) in a rounded card, top-right of the box, only on the reaction beats
const HostCam = ({o, tl, src, wins}: {o: number; tl: TL; src: string; wins: [number, number][]}) => {
  const w = wins.find(([a, b]) => o >= a - 1 && o < b + 200);
  if (!w) return null;
  const s = Math.min(pop(o, w[0], 13, 240), 1 - ease(o, w[1], 200));
  const W = 470, H = Math.round((W * 530) / 1080), k = W / 1080;
  return <div style={{position: 'absolute', right: 26, top: 26, width: W, height: H, borderRadius: 22, overflow: 'hidden', border: '5px solid white',
    boxShadow: '0 12px 28px rgba(0,0,0,0.55)', transform: `scale(${s})`, transformOrigin: '100% 0'}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1080 * k, height: 1920 * k}}>
      {tl.segs.map(([a, b], i) => <Sequence key={i} from={f(tl.segOut[i])} durationInFrames={f(tl.segOut[i] + b - a) - f(tl.segOut[i])} layout="none">
        <OffthreadVideo src={staticFile(src)} muted trimBefore={f(a)} style={{width: '100%', height: '100%'}} />
      </Sequence>)}
    </div>
  </div>;
};
const base = (tl: TL, src: string, top: string, words: Word[], music: string, from: number): Spec => ({
  tl, src, track: FLAT, top, words, wordY: 1330, wideX: 960, capSize: 66, shots: [[0, 'W']], strobes: [], tints: [], swish: [],
  music: {file: music, from, level: 0},
});

// ---- 1 · Murakami 1/1 auto: he CALLED it -------------------------------------------------------------------------------------
// cold open "who do you think you are?" → "it's a 1 of 1… we are sweating" → "fat checklist, could literally be anybody" (checklist
// of the rookies he lists flicks by) → "I called Murakami though, right?" (MURAKAMI circled) → "1 of 1 auto on release day" (1/1 badge,
// one strobe) → "they gotta study your brain".
const mu = timeline([[83940, 87450], [41700, 45180], [46040, 48760], [63280, 67400], [69540, 73300], [90700, 92820]]);
export const B14_MURA_MS = mu.total;
const MU = (i: number, src: number) => mu.segOut[i] + src - mu.segs[i][0];
const NAMES = ['BAZZANA', 'SALSTROM', 'ROMAN', 'TOLLE', 'PARKER', 'MURAKAMI', 'McCONNELL', 'WEATHERHOLT', 'MISIOROWSKI', 'CAGLIANONE'];
const Checklist = ({o, a, b, called}: {o: number; a: number; b: number; called: number}) => {
  if (o < a || o >= b) return null;
  const p = Math.min(ease(o, a, 180), 1 - ease(o, b - 180, 180));
  const isCalled = o >= called;
  const top = isCalled ? 5 : Math.floor((o - a) / 90) % NAMES.length; // flicks every 90 ms, then locks on MURAKAMI
  const ring = interpolate(o - called, [0, 420], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 40, top: 40, width: 430, opacity: p, background: 'rgba(250,250,247,0.96)', borderRadius: 18, padding: '18px 26px',
    boxShadow: '0 14px 30px rgba(0,0,0,0.45)', fontFamily: MONT}}>
    <div style={{fontWeight: 900, fontSize: 26, letterSpacing: 3, color: '#777', marginBottom: 8}}>CHECKLIST · 1/1 AUTO</div>
    {[-1, 0, 1].map((d) => {
      const n = NAMES[(top + d + NAMES.length) % NAMES.length];
      const hit = d === 0;
      return <div key={d} style={{position: 'relative', fontWeight: 900, fontSize: hit ? 50 : 34, lineHeight: hit ? '66px' : '46px', color: hit ? '#111' : '#bbb'}}>
        {n}
        {hit && isCalled && <svg width={420} height={84} style={{position: 'absolute', left: -22, top: -10, overflow: 'visible'}}>
          <ellipse cx={200} cy={40} rx={196} ry={38} fill="none" stroke="#E8261F" strokeWidth={6} strokeLinecap="round"
            strokeDasharray={1300} strokeDashoffset={1300 * (1 - ring)} transform="rotate(-2 200 40)" />
        </svg>}
      </div>;
    })}
  </div>;
};
const MURA: Spec = {
  ...base(mu, 'c12/murakami_1of1.mp4', 'He called this 1 of 1 before they even saw it', caps(muraWords, mu,
    {Morikami: 'Murakami', '101': '1/1', '101.': '1/1', diffy: 'diffy'}, {Morikami: '#F9FC35', '101': '#58EE28', '101.': '#58EE28', Auto: '#58EE28', sweating: '#FF4D4D', anybody: '#F9FC35', brain: '#21F5E6'}),
    'tak-tak.mp3', 6000),
  speechGain: 1.45, strobes: [MU(4, 69540)], tints: [[MU(4, 69540) + 120, GREEN]],
  inBox: (o) => <>
    <HostCam o={o} tl={mu} src="c12/murakami_1of1_v.mp4" wins={[[0, mu.segOut[1]], [mu.segOut[5], mu.total]]} />
    <TypedAction o={o} a={MU(1, 41700) + 100} b={mu.segOut[2]} text="it's a 1 of 1" y={60} />
    <Checklist o={o} a={mu.segOut[2]} b={mu.segOut[4]} called={MU(3, 63700)} />
    <StatBadge o={o} a={MU(4, 70100)} b={mu.segOut[5]} big="1/1" label="AUTO · RELEASE DAY" x={40} y={40} />
  </>,
  extraSfx: [sfx('pen-scribble', MU(3, 63700), 0.25, 500), sfx('ding-2', MU(4, 70100), 0.22)],
};
export const B14Murakami = () => <Jorho s={MURA} />;

// ---- 2 · Randy Johnson patch auto from the FREE spot -----------------------------------------------------------------------------
// cold open "on the free spot" → "300? who 300? 300 home runs, 300 hits… 300 WIN CLUB" (the guess) → "Randy Johnson!… on the free
// spot… that's electric" → "Randy Johnson to 10, 300 win club. God bless the lair".
const ra = timeline([[30400, 31810], [18820, 27090], [27660, 34420], [43200, 50010]]);
export const B14_RANDY_MS = ra.total;
const RA = (i: number, src: number) => ra.segOut[i] + src - ra.segs[i][0];
const FreeTag = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const s = pop(o, a, 9, 230) * (1 - ease(o, b - 160, 160));
  return <div style={{position: 'absolute', left: 50, top: 60, transform: `scale(${s}) rotate(-8deg)`, transformOrigin: '30% 50%', display: 'flex', alignItems: 'center'}}>
    <div style={{width: 0, height: 0, borderTop: '58px solid transparent', borderBottom: '58px solid transparent', borderRight: '46px solid #58EE28'}} />
    <div style={{background: '#58EE28', height: 116, padding: '0 34px 0 18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: '0 14px 14px 0'}}>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 64, lineHeight: '64px', color: '#0b2a05'}}>$0</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: '#0b2a05'}}>FREE SPOT</div>
    </div>
  </div>;
};
const RANDY: Spec = {
  ...base(ra, 'c12/randy_free.mp4', 'The FREE spot hit a 300-win legend', caps(randyWords, ra,
    {Linnie: '', slats: '', 'slats!': '', singles: '', Singles: ''}, {free: '#58EE28', 'spot,': '#58EE28', 'spot!': '#58EE28', '300?': '#F9FC35', '300': '#F9FC35', win: '#F9FC35', club: '#F9FC35', 'club.': '#F9FC35', Randy: '#21F5E6', Johnson: '#21F5E6', 'Johnson,': '#21F5E6', electric: '#F9FC35', lair: '#21F5E6'}),
    'joyful-chess-slowed.mp3', 4000),
  strobes: [RA(2, 27700)], tints: [[RA(2, 27700) + 120, GREEN]],
  inBox: (o) => <>
    <HostCam o={o} tl={ra} src="c12/randy_free_v.mp4" wins={[[RA(2, 29000), RA(2, 31800)], [RA(3, 46400), ra.total]]} />
    <FreeTag o={o} a={150} b={ra.segOut[1]} />
    <TypedAction o={o} a={RA(1, 21000)} b={RA(1, 25300)} text="who has 300?" y={60} color="#F9FC35" glow="rgba(249,252,53,0.5)" />
    <StatBadge o={o} a={RA(1, 25400)} b={ra.segOut[2]} big="300" label="WIN CLUB" x={50} y={40} />
    <FreeTag o={o} a={RA(2, 30500)} b={RA(2, 34000)} />
    <StatBadge o={o} a={RA(3, 43900)} b={RA(3, 46300)} big="/10" label="PATCH AUTO" x={50} y={40} />
  </>,
  extraSfx: [sfx('cha-ching', 200, 0.18), sfx('keyboard-typing', RA(1, 21000), 0.12, 600), sfx('ding-2', RA(1, 25400), 0.22)],
};
export const B14Randy = () => <Jorho s={RANDY} />;

// ---- 3 · Aaron Judge Supernova: one of only two, on the last spot ---------------------------------------------------------------
// cold open "and Aaron Judge is one of them" → "look how hard it is to hit golds" → "no way, that's one of them! oh my gosh" (one strobe)
// → "you don't need the gold" → "only two players in this set have a Supernova live, and Aaron Judge is one of them. And that was the
// last spot. The stars are aligning."
const ju = timeline([[70500, 72550], [48400, 51650], [51700, 55150], [59380, 63300], [65159, 76700]]);
export const B14_JUDGE_MS = ju.total;
const JU = (i: number, src: number) => ju.segOut[i] + src - ju.segs[i][0];
const TwoSlots = ({o, a, b, fill}: {o: number; a: number; b: number; fill: number}) => {
  if (o < a || o >= b) return null;
  const p = Math.min(ease(o, a, 200), 1 - ease(o, b - 180, 180));
  const box = (txt: string, lit: boolean, at: number) => <div style={{width: 400, height: 120, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: lit ? '#F9FC35' : 'rgba(14,14,18,0.85)', border: `4px solid ${lit ? '#F9FC35' : 'rgba(255,255,255,0.5)'}`, transform: `scale(${lit ? pop(o, at, 9, 260) : 1})`,
    fontFamily: MONT, fontWeight: 900, fontSize: lit ? 50 : 64, color: lit ? '#111' : 'rgba(255,255,255,0.6)'}}>{txt}</div>;
  return <div style={{position: 'absolute', top: 40, width: BW, opacity: p, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 42, letterSpacing: 2, color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.8)'}}>SUPERNOVA AUTOS IN THIS SET</div>
    <div style={{display: 'flex', gap: 22}}>{box(o >= fill ? 'AARON JUDGE' : '?', o >= fill, fill)}{box('?', false, 0)}</div>
  </div>;
};
const Stars = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{Array.from({length: 14}, (_, i) => {
    const t = (o - a - i * 90) / 1200;
    if (t < 0) return null;
    const x = (i * 263) % 980 + 30, y = (i * 151) % 520 + 30;
    const s = Math.max(0, Math.sin(Math.min(1, t) * Math.PI)) * (0.6 + ((i * 7) % 5) / 6);
    return <div key={i} style={{position: 'absolute', left: x, top: y, fontSize: 70, transform: `scale(${s}) rotate(${t * 90}deg)`, color: '#FFE66D',
      textShadow: '0 0 18px rgba(255,230,109,0.9)'}}>✦</div>;
  })}</AbsoluteFill>;
};
const JUDGE: Spec = {
  ...base(ju, 'c12/judge_supernova.mp4', 'Only 2 players have this card… and it hit on the LAST spot', caps(judgeWords, ju,
    {erin: 'Aaron', judges: "Judge's", "gold's": 'golds', bugs: '', day: ''}, {erin: '#F9FC35', judges: '#F9FC35', supernova: '#21F5E6', two: '#F9FC35', last: '#FF4D4D', 'spot': '#FF4D4D', gold: '#F9FC35', "gold's": '#F9FC35', stars: '#F9FC35'}),
    'eclipser.mp3', 30000),
  strobes: [JU(2, 52400)], tints: [[JU(2, 52400) + 120, GREEN]],
  inBox: (o) => <>
    <HostCam o={o} tl={ju} src="c12/judge_supernova_v.mp4" wins={[[JU(2, 53300), ju.segOut[3]]]} />
    <TypedAction o={o} a={JU(1, 48900)} b={ju.segOut[2]} text="no golds yet" y={60} />
    <TwoSlots o={o} a={JU(4, 66500)} b={JU(4, 73000)} fill={JU(4, 71100)} />
    <TypedAction o={o} a={JU(4, 72900)} b={JU(4, 74400)} text="on the last spot" y={60} color="#FF4D4D" glow="rgba(255,77,77,0.55)" />
    <Stars o={o} a={JU(4, 74300)} b={ju.total} />
  </>,
  extraSfx: [sfx('keyboard-typing', JU(1, 48900), 0.12, 500), sfx('ding-2', JU(4, 71100), 0.22), sfx('mg-shimmer', JU(4, 74300), 0.2)],
};
export const B14Judge = () => <Jorho s={JUDGE} />;

// =====================================================================================================================================
// BATCH 14 · the 3 real Jorho v2 deliverables: TREVOR LAWRENCE (National Treasures rip, b3/v_nt_rip.mp4, moments never cut before:
// 0–15 s patch talk, 16–46 s how to sweat a card, 55–74 s Marino top 10). Grant (L) teaches, Trevor (M, black cap) listens/answers.
const NT = 'b3/v_nt_rip.mp4';
const NTK = ntTrack as unknown as Track;
const ntCaps = (tl: TL, fix: Record<string, string>, col: Record<string, string>) => caps(ntWords, tl, fix, col);
const Emo = ({code, size}: {code: string; size: number}) => <Img src={staticFile(`emoji-ios/${code}.png`)} style={{width: size, height: size}} />;

// ---- T1 · "a $15,000 patch vs a napkin" --------------------------------------------------------------------------------------
// cold open "that's like a napkin, right?" → "a really nice patch, you could be looking at 15,000 plus" → Jaguars face → napkin → two
// colour, way nicer → covers it, like a Nike swoosh. Graphic: a 3-step PATCH TIERS ladder that fills as he names each kind.
const pa = timeline([[7420, 9260], [600, 15570]]);
export const B14_PATCH_MS = pa.total;
const PA = (i: number, src: number) => pa.segOut[i] + src - pa.segs[i][0];
const Tiers = ({o, a, b, at}: {o: number; a: number; b: number; at: [number, number, number]}) => {
  if (o < a || o >= b) return null;
  const p = Math.min(ease(o, a, 200), 1 - ease(o, b - 180, 180));
  const rows: [string, string, string][] = [['NAPKIN', '1 colour', '#9aa0a6'], ['2-COLOUR', 'way nicer', '#21F5E6'], ['LOGO PATCH', '$15,000+', '#58EE28']];
  return <div style={{position: 'absolute', right: 30, top: 30, opacity: p, background: 'rgba(12,12,16,0.86)', borderRadius: 22, padding: '16px 24px', width: 620,
    boxShadow: '0 14px 30px rgba(0,0,0,0.45)', transform: 'scale(1.15)', transformOrigin: '100% 0'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: '#bbb', marginBottom: 10}}>PATCH TIERS</div>
    {rows.map(([n, d, c], i) => {
      const lit = o >= at[i];
      return <div key={n} style={{display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0', opacity: lit ? 1 : 0.28, transform: `scale(${lit ? pop(o, at[i], 10, 240) : 1})`, transformOrigin: '0 50%'}}>
        <div style={{width: 20, height: 46, borderRadius: 6, background: c}} />
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 34, color: 'white', flex: 1, whiteSpace: 'nowrap'}}>{n}</div>
        <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 28, color: c, whiteSpace: 'nowrap'}}>{d}</div>
      </div>;
    })}
  </div>;
};
const PATCH: Spec = {
  tl: pa, src: NT, track: NTK, top: 'A $15,000 patch vs a napkin', wordY: 1300, wideX: 900, capSize: 66,
  words: ntCaps(pa, {',000': '', ',000,': ''}, {'15': '#58EE28', 'plus.': '#58EE28', jaguars: '#21F5E6', 'napkin,': '#9aa0a6', two: '#21F5E6', color: '#21F5E6', nicer: '#21F5E6', swoosh: '#58EE28', 'swoosh.': '#58EE28', Nike: '#58EE28'}),
  shots: [[0, 'W']], strobes: [], tints: [[PA(1, 2700), GREEN]], swish: [pa.segOut[1]],
  music: {file: 'lose-you-adturnup.mp3', from: 20000, level: 0},
  inBox: (o) => <>
    <TypedAction o={o} a={PA(1, 2600)} b={PA(1, 4100)} text="$15,000+" y={60} color="#58EE28" glow="rgba(88,238,40,0.55)" />
    <Tiers o={o} a={PA(1, 7400)} b={pa.total} at={[PA(1, 8100), PA(1, 9800), PA(1, 13500)]} />
  </>,
  extraSfx: [sfx('cha-ching', PA(1, 2700), 0.16), ...[PA(1, 8100), PA(1, 9800), PA(1, 13500)].map((t) => sfx('jv2-pop-button', t, 0.16))],
};
export const B14Patch = () => <Jorho s={PATCH} />;

// ---- T2 · "how to sweat a card" ------------------------------------------------------------------------------------------------
// cold open "if we hit a Trevor here, we go electric" → "you can't risk your hands on this… sweat it like this" → don't look at the back
// → don't touch the corners → one at a time, just slide. Graphic: a 3-rule checklist that ticks as he says each rule; one strobe on
// "electric" in the cold open.
const sw = timeline([[29100, 32240], [15960, 24170], [33560, 46070]]);
export const B14_SWEAT_MS = sw.total;
const SW = (i: number, src: number) => sw.segOut[i] + src - sw.segs[i][0];
const Rules = ({o, a, b, at}: {o: number; a: number; b: number; at: number[]}) => {
  if (o < a || o >= b) return null;
  const p = Math.min(ease(o, a, 200), 1 - ease(o, b - 180, 180));
  const rows = ["DON'T LOOK AT THE BACK", "DON'T TOUCH THE CORNERS", 'ONE AT A TIME · SLIDE'];
  return <div style={{position: 'absolute', left: 40, top: 40, opacity: p, background: 'rgba(250,250,247,0.96)', borderRadius: 20, padding: '16px 24px', width: 640,
    boxShadow: '0 14px 30px rgba(0,0,0,0.45)', transform: 'scale(1.2)', transformOrigin: '0 0'}}>
    <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: '#777', marginBottom: 8}}>HOW TO SWEAT A CARD</div>
    {rows.map((r, i) => {
      const lit = o >= at[i];
      return <div key={r} style={{display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0', opacity: lit ? 1 : 0.35}}>
        <div style={{width: 46, height: 46, transform: `scale(${lit ? pop(o, at[i], 9, 260) : 1})`}}>{lit ? <Emo code="2705" size={46} /> : <div style={{width: 40, height: 40, border: '4px solid #bbb', borderRadius: 8}} />}</div>
        <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 32, color: '#111'}}>{r}</div>
      </div>;
    })}
  </div>;
};
const SWEAT: Spec = {
  tl: sw, src: NT, track: NTK, top: 'Grant teaches Trevor how to sweat a card', wordY: 1300, wideX: 900, capSize: 66,
  words: ntCaps(sw, {}, {Trevor: '#21F5E6', electric: '#F9FC35', 'electric.': '#F9FC35', sweat: '#F9FC35', back: '#FF4D4D', 'back.': '#FF4D4D', corners: '#FF4D4D', 'corners.': '#FF4D4D', slide: '#58EE28', 'slide.': '#58EE28', hands: '#FF4D4D'}),
  shots: [[0, 'W']], strobes: [SW(0, 31700)], tints: [], swish: [sw.segOut[1]],
  music: {file: 'Investigations.mp3', from: 10000, level: 0},
  inBox: (o) => <>
    <TypedAction o={o} a={SW(1, 17400)} b={SW(1, 19900)} text="you can't risk your hands" y={60} color="#FF4D4D" glow="rgba(255,77,77,0.5)" />
    <Rules o={o} a={sw.segOut[2]} b={sw.total} at={[SW(2, 35600), SW(2, 40500), SW(2, 43800)]} />
  </>,
  extraSfx: [sfx('keyboard-typing', SW(1, 17400), 0.12, 600), ...[SW(2, 35600), SW(2, 40500), SW(2, 43800)].map((t) => sfx('ding-2', t, 0.16))],
};
export const B14Sweat = () => <Jorho s={SWEAT} />;

// ---- T3 · "is Dan Marino top 10?" ---------------------------------------------------------------------------------------------
// cold open "he could sling it, he could rip it" → the rip ("come on, Trevor… Sean Alexander… my God… Dan Marino") → "where is he
// all time for you? top 10?" (YouTube watch-page card frames the question) → "I mean, gotta be" (TOP 10 ✅) → "he could sling it,
// he could rip it" → laugh.
const ma = timeline([[66940, 69200], [55460, 73630]]);
export const B14_MARINO_MS = ma.total;
const MA = (i: number, src: number) => ma.segOut[i] + src - ma.segs[i][0];
const MARINO: Spec = {
  tl: ma, src: NT, track: NTK, top: 'Grant asked Trevor where Dan Marino ranks all-time', wordY: 1300, wideX: 900, capSize: 66,
  words: ntCaps(ma, {}, {Dan: '#21F5E6', 'Marino.': '#21F5E6', Top: '#F9FC35', '10?': '#F9FC35', sling: '#58EE28', rip: '#58EE28', God: '#FF4D4D', 'God.': '#FF4D4D'}),
  shots: [[0, 'W'], [MA(1, 63000), 'M'], [MA(1, 66900), 'W']], strobes: [MA(1, 62100)], tints: [[MA(1, 62100) + 120, GREEN]], swish: [ma.segOut[1]],
  capsOff: [[MA(1, 62800), MA(1, 64700)]],
  music: {file: 'midnight-club.mp3', from: 12000, level: 0},
  inBox: (o) => <>
    <YouTubeCard o={o} a={MA(1, 62800)} b={MA(1, 64900)} title="Is Dan Marino a top 10 QB of all time?" cam={cam(NT, ma, NTK, 900)} startAt={62800} dur={ma.total} />
    <StatBadge o={o} a={MA(1, 65400)} b={MA(1, 68600)} big="TOP 10" label="ALL-TIME QB" x={40} y={40} emoji="2705" />
  </>,
  extraSfx: [sfx('mg-click', MA(1, 62800), 0.2), sfx('ding-2', MA(1, 65400), 0.2)],
};
export const B14Marino = () => <Jorho s={MARINO} />;

// ---- T4 · "guess who's on the redemption" — the NBA GOAT engine with different tools (user 2026-11-14: "use the same thing we did
// with nba goat but not completely the same"). NBA GOAT: YouTube question card → paper-animator word lock + echo → whoosh → thinking +
// head reel → strobe/ring/ding reveal → stat sheet + hand-drawn marker box. HERE: mystery-card "?" opener → "TRUE RPA" lock on the
// newspaper animator + echo on a freeze → fast-whoosh → name-guess reel (only names said: Trevor, Davis Mills, Fields) →
// a 0.55 s silent freeze before the name → strobe + green ring on "Justin Fields" + ding → hand-drawn red strike through $20,000 → $500?
const rd = timeline([[92400, 94620], [95600, 98660, 500], [111000, 115700], [119360, 121300, 550], [121300, 124300], [124400, 132870]]);
export const B14_RPA_MS = rd.total;
const RD = (i: number, src: number) => rd.segOut[i] + src - rd.segs[i][0];
const MysteryCard = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const s = pop(o, a, 10, 230) * (1 - ease(o, b - 160, 160));
  const wob = Math.sin((o - a) / 90) * 3;
  return <div style={{position: 'absolute', right: 60, top: 50, width: 250, height: 350, transform: `scale(${s}) rotate(${6 + wob}deg)`, borderRadius: 18,
    background: 'linear-gradient(135deg, #C9A227, #FFF1A8 45%, #B8860B)', border: '6px solid white', boxShadow: '0 16px 34px rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 190, color: 'rgba(20,20,20,0.85)'}}>?</div>;
};
const EchoAudio = ({at, from, to}: {at: number; from: number; to: number}) => <>{[[0, 0.55], [260, 0.3], [520, 0.15]].map(([d, v], i) =>
  <Sequence key={i} from={f(at + d)} durationInFrames={f(to - from + 200)} layout="none">
    <Audio src={staticFile(NT)} trimBefore={f(from)} volume={v} />
  </Sequence>)}</>;
const GuessReel = ({o, a, b}: {o: number; a: number; b: number}) => {
  if (o < a || o >= b) return null;
  const names: [string, number][] = [['TREVOR?', a], ['DAVIS MILLS?', RD(2, 112500)], ['FIELDS?', RD(2, 113900)]];
  const cur = [...names].reverse().find(([, t]) => o >= t) ?? names[0];
  const s = pop(o, a, 12, 240) * (1 - ease(o, b - 150, 150));
  return <div style={{position: 'absolute', left: 0, top: 60, width: BW, display: 'flex', justifyContent: 'center', transform: `scale(${s})`}}>
    <div style={{background: 'rgba(12,12,16,0.88)', borderRadius: 60, padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 18, boxShadow: '0 12px 28px rgba(0,0,0,0.5)'}}>
      <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 30, color: '#aaa', letterSpacing: 2}}>GUESS:</div>
      <div key={cur[0]} style={{fontFamily: MONT, fontWeight: 900, fontSize: 58, color: 'white', transform: `translateY(${(1 - ease(o, cur[1], 160)) * 30}px)`,
        opacity: ease(o, cur[1], 160)}}>{cur[0]}</div>
    </div>
  </div>;
};
const StrikePrice = ({o, a, b, strikeAt, newAt}: {o: number; a: number; b: number; strikeAt: number; newAt: number}) => {
  if (o < a || o >= b) return null;
  const s = pop(o, a, 11, 230);
  const d = interpolate(o - strikeAt, [0, 380], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 50, top: 50, transform: `scale(${1.35 * s}) rotate(-3deg)`, transformOrigin: "0 0"}}>
    <div style={{background: 'rgba(250,250,247,0.97)', borderRadius: 18, padding: '16px 30px', boxShadow: '0 14px 30px rgba(0,0,0,0.45)', position: 'relative'}}>
      <div style={{fontFamily: MONT, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: '#777'}}>JUSTIN FIELDS TRUE RPA · 2021</div>
      <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 96, color: '#111', lineHeight: '110px', position: 'relative', display: 'inline-block'}}>$20,000
        <svg width={440} height={110} viewBox="0 0 440 110" style={{position: 'absolute', left: -10, top: 0, overflow: 'visible'}}>
          <path d="M6 70 C120 52 260 44 432 34" fill="none" stroke="#E8261F" strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
          <path d="M12 40 C140 56 270 64 428 76" fill="none" stroke="#E8261F" strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1}
            strokeDashoffset={1 - interpolate(o - strikeAt - 250, [0, 380], [0, 1], clamp)} />
        </svg>
      </div>
      {o >= newAt && <div style={{fontFamily: MONT, fontWeight: 900, fontSize: 70, color: '#E8261F', transform: `scale(${pop(o, newAt, 9, 260)})`, transformOrigin: '0 50%'}}>NOW: $200–500?</div>}
    </div>
  </div>;
};
// user 2026-11-14: "do the newspaper thing" → the NBA GOAT paper animator (word locked in the centre, a new page every 100 ms),
// with hobby-article text instead of the GOAT-debate text.
const RPA_TXT = {
  left: ['the chase card is the', 'nothing beats a', 'collectors hunt the', 'the holy grail:', 'every box could hold a', 'inside the market for the', 'why everyone wants the', 'pulling a'],
  right: ['to 10 with a patch', 'is the chase', 'prices explode', 'on release day', 'rookie patch auto', 'that changes everything', 'the hobby goes wild', 'at the break'],
  fill: 'Every rookie class has one card collectors chase above all others: a patch, an autograph and a serial number on the same card. Breakers rip box after box for it, prices swing with every snap, and the redemption card at the bottom of a pack can be worth more than everything above it. ',
};
const RPA: Spec = {
  tl: rd, src: NT, track: NTK, top: "Guess who's on the $20,000 redemption", wordY: 1300, wideX: 900, capSize: 66,
  words: ntCaps(rd, {fields: 'Fields', 'fields?': 'Fields?'}, {redemption: '#F9FC35', 'redemption.': '#F9FC35', true: '#F9FC35', RPA: '#F9FC35', Davis: '#21F5E6', 'Mills.': '#21F5E6',
    'fields?': '#21F5E6', Justin: '#58EE28', 'Fields.': '#58EE28', '$20': '#58EE28', ',000.': '#58EE28', '500': '#FF4D4D', 'bucks,': '#FF4D4D'}),
  shots: [[0, 'W']], strobes: [RD(4, 122100)], tints: [[RD(4, 122100) + 120, GREEN]], swish: [],
  capsOff: [[RD(1, 96900), rd.segOut[2]]],
  music: {file: 'Jeopardy_Think.mp3', from: 0, level: 0, dips: [[rd.segOut[3], RD(4, 122100)]], until: RD(4, 122100)},
  inBox: (o) => <>
    <MysteryCard o={o} a={100} b={rd.segOut[1] + 900} />
    <ArticleHighlight o={o} a={RD(1, 96900)} b={rd.segOut[2]} word="TRUE RPA" txt={RPA_TXT} />
    <GuessReel o={o} a={RD(2, 111400)} b={rd.segOut[3] + 300} />
    <StrikePrice o={o} a={RD(5, 127600)} b={rd.total} strikeAt={RD(5, 128700)} newAt={RD(5, 131400)} />
  </>,
  overlay: () => <EchoAudio at={RD(1, 98100)} from={96900} to={98100} />,
  extraSfx: [sfx('mg-swoosh', 120, 0.2), sfx('film-roll', RD(1, 96900), 0.2, rd.segOut[2] - RD(1, 96900)), sfx('fast-whoosh', rd.segOut[2] - 220, 0.3),
    sfx('ding-2', RD(4, 122100), 0.25), sfx('pen-scribble', RD(5, 128700), 0.3, 700)],
};
export const B14Rpa = () => <Jorho s={RPA} />;
