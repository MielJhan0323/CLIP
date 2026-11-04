// DEMO 13 (2026-11-04): "what I learned from the two viral clips" applied to one Jorho v2 edit (t2 dream golf foursome).
// Engine 1 (NBA GOAT): universal question, answer hidden to ~56 %, the viewer guesses while a reel spins legends, quiet
// before the reveal (music dip + 0.55 s silent hold), loud hit on the name. Engine 2 (Redemptions): the title is a bold
// claim that hides the answer, the payoff opens the next loop (Tiger), every pick becomes a visual (scorecard), and it
// ends on an OPEN QUESTION (*who's #4?*) with an empty slot, so people comment.
import {Img, interpolate, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {clamp, ease, pop, sfx, timeline} from '../e3/kit';
import {GREEN, MemePop, STROBE_CUT, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';
import {Layer, TypedAction, YouTubeCard} from './v2';
import {cam, Scorecard} from './batch10';
import golfWords from '../plans/data/t2_dream_golf_four.words.json';
import golfTrack from '../plans/data/t2_dream_golf_four.seats.json';

type Track = Spec['track'];
const t13 = timeline([[11250, 13900], [16820, 18500], [20500, 22500], [23700, 25400], [26450, 28250, 550], [32200, 34150], [34750, 35700],
  [35800, 36650], [45450, 48450], [50400, 52200], [52700, 54400]]);
const X = {football: t13.out(20620), basketball: t13.out(21160), artist: t13.out(22340), think: t13.segOut[3], hold: t13.segOut[4] + 1800,
  jesusLine: t13.segOut[5], jesus: t13.out(33460), there: t13.out(34000), like: t13.out(34780), unbeliev: t13.out(36500), tiger: t13.out(48000),
  goat: t13.out(51320), heIs: t13.out(52760), sick: t13.out(54160)};
export const DEMO13_MS = t13.total;
const CAM = cam('pod/t2_dream_golf_four.mp4', t13, golfTrack as unknown as Track, 720);

// category chips: what "could be anybody" means, popping in as he lists them
const Chips = ({o, a, b, items}: {o: number; a: number; b: number; items: {t: string; e: string; at: number}[]}) => {
  if (o < a || o >= b) return null;
  return <div style={{position: 'absolute', left: 0, top: 40, width: 1080, display: 'flex', justifyContent: 'center', gap: 22, opacity: 1 - ease(o, b - 160, 160)}}>
    {items.map((it) => o >= it.at && <div key={it.t} style={{display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(14,14,16,0.88)', borderRadius: 40,
      padding: '12px 26px', transform: `scale(${pop(o, it.at, 10, 220)})`, fontFamily: MONT, fontWeight: 900, fontSize: 36, color: 'white'}}>
      <Img src={staticFile(`emoji-ios/${it.e}.png`)} style={{width: 44, height: 44}} />{it.t}</div>)}
  </div>;
};
// guess reel: round window spinning legends while he thinks, decelerating through the silent hold, landing on 🙏 JESUS
const LEGENDS = ['img/heads/jordan.png', 'cutouts/tiger.png', 'img/heads/lebron.png', 'img/heads/kobe.png', 'img/heads/stephen_curry.png',
  'img/heads/magic_johnson.png', 'img/heads/shaquille_oneal.png', 'img/heads/larry_bird.png', 'img/heads/tim_duncan.png'];
const GuessReel = ({o, spin, land, out}: {o: number; spin: number; land: number; out: number}) => {
  if (o < spin || o >= out) return null;
  const K = 34, R = 290, H = 265;
  const p = Math.min(1, (o - spin) / (land - spin));
  const idx = (1 - (1 - p) ** 3) * K;
  const i0 = Math.floor(idx), frac = idx - i0;
  const landed = o >= land;
  const src = (i: number) => (i >= K && landed ? 'emoji-ios/1f64f.png' : LEGENDS[((i % LEGENDS.length) + LEGENDS.length) % LEGENDS.length]);
  const s = pop(o, spin, 12, 260) * (1 - ease(o, out - 220, 220));
  return <div style={{position: 'absolute', left: 1080 - R - 60, top: 150, width: R, transform: `scale(${s})`, transformOrigin: '50% 0'}}>
    <div style={{width: R, height: R, borderRadius: '50%', overflow: 'hidden', background: '#f2f2f2', border: `7px solid ${landed ? '#9BE600' : 'white'}`,
      boxShadow: '0 8px 22px rgba(0,0,0,0.5)', position: 'relative'}}>
      {[-1, 0, 1].map((d) => {
        const i = i0 + d;
        return <Img key={d} src={staticFile(src(i))} style={{position: 'absolute', left: (R - H) / 2 - 7, top: (R - H) / 2 - 7 + (d - frac) * H, width: H, height: H, objectFit: 'cover',
          objectPosition: '50% 15%', filter: !landed && p < 0.92 ? `blur(${(1 - p) * 4}px)` : undefined}} />;
      })}
    </div>
    <div style={{marginTop: 12, textAlign: 'center', fontFamily: MONT, fontWeight: 900, fontSize: 40, color: landed ? '#9BE600' : 'rgba(255,255,255,0.75)',
      WebkitTextStroke: '3px #111', paintOrder: 'stroke fill', transform: `scale(${landed ? interpolate(o - land, [0, 90, 180], [1.6, 0.95, 1], clamp) : 1})`}}>
      {landed ? 'JESUS' : '???'}</div>
  </div>;
};
const DEMO: Spec = {
  tl: t13, src: 'pod/t2_dream_golf_four.mp4', track: golfTrack as unknown as Track, top: "Trevor's FIRST pick for his dream foursome isn't Tiger", wordY: 1150, wideX: 720,
  words: wordsFrom(golfWords, t13, {for: 'four', '-time': 'time'}, {Jesus: '#9BE600', Tiger: '#21F5E6', goat: '#F9FC35', anybody: '#F9FC35'}),
  shots: [[0, 'W'], [t13.segOut[1], 'M'], [X.think, 'M'], [X.jesus + STROBE_CUT, 'M'], [X.like, 'W'], [t13.segOut[8], 'M'], [X.goat, 'W'], [X.heIs, 'M']],
  strobes: [X.jesus], tints: [[X.jesus + STROBE_CUT, GREEN], [X.tiger, GREEN]], swish: [t13.segOut[1], X.tiger],
  capsOff: [[150, t13.segOut[1]]], fah: [X.there + 250],
  music: {file: 'midnight-club.mp3', from: 30000, level: 0, dips: [[X.think, X.jesus]]},
  overlay: (o) => <MemePop o={o} at={X.tiger} to={t13.segOut[9] + 300} src="cutouts/tiger.png" x={600} y={980} size={400} />,
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={t13.segOut[1]} title="What's Trevor Lawrence's dream golf foursome?" cam={CAM} startAt={0} dur={t13.total} />
    <Chips o={o} a={X.football - 100} b={X.think + 200} items={[{t: 'FOOTBALL', e: '1f3c8', at: X.football}, {t: 'BASKETBALL', e: '1f3c0', at: X.basketball},
      {t: 'ARTIST', e: '1f3a4', at: X.artist}]} />
    <TypedAction o={o} a={X.think + 250} b={X.jesus} text="thinking…" y={60} />
    <GuessReel o={o} spin={X.think + 250} land={X.jesus} out={X.unbeliev + 200} />
    <Scorecard o={o} wins={[[t13.segOut[9] - 100, t13.total]]} rows={[{name: 'Trevor Lawrence', at: t13.segOut[9] + 50}, {name: 'Jesus', at: t13.segOut[9] + 600, emoji: '1f64f'},
      {name: 'Tiger Woods', at: X.goat + 200, emoji: '1f410'}, {name: '???', at: X.heIs + 300}]} />
    <TypedAction o={o} a={X.heIs + 700} b={t13.total} text="who's #4?" y={560} color="#F9FC35" glow="rgba(249,252,53,0.5)" />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.22), sfx('mg-swoosh', 420, 0.18), ...[X.football, X.basketball, X.artist].map((t) => sfx('jv2-pop-button', t, 0.18)),
    sfx('keyboard-typing', X.think + 250, 0.14, 700), sfx('slot-spin', X.think + 250, 0.35, X.hold - X.think - 300), sfx('ding-2', X.jesus, 0.25),
    sfx('pen-scribble', t13.segOut[9] + 50, 0.28, 600), sfx('pen-scribble', t13.segOut[9] + 600, 0.28, 400), sfx('pen-scribble', X.goat + 200, 0.28, 600),
    sfx('pen-scribble', X.heIs + 300, 0.28, 300), sfx('keyboard-typing', X.heIs + 700, 0.14, 500)],
};
export const Demo13 = () => <Jorho s={DEMO} />;
