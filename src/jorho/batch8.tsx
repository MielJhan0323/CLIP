// BATCH 8 (2026-11-02): 4 Jorho + 3 Jorho v2 Trevor clips. Each picks its own 2–4 assets from vault/02 Style Guide/Asset hive mind.md.
import t6Words from '../plans/data/t6_davis_mills_joke.words.json';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';
import rgWords from '../plans/data/v_rogers_realm.words.json';
import rgTrack from '../plans/data/v_rogers_realm.seats.json';
import lrWords from '../plans/data/v_lair.words.json';
import lrTrack from '../plans/data/v_lair.seats.json';
import pbWords from '../plans/data/u1_playbook.words.json';
import pbTrack from '../plans/data/u1_playbook.seats.json';
import psWords from '../plans/data/v_presnap.words.json';
import psTrack from '../plans/data/v_presnap.seats.json';
import rdWords from '../plans/data/u3_redemptions.words.json';
import rdTrack from '../plans/data/u3_redemptions.seats.json';
import {sfx, timeline, type CamCfg, type Track} from '../e3/kit';
import {Asterisk, BOX_H, GREEN, HeadRing, MemePop, RED, STROBE_CUT, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';
import {GradeScale, Layer, PercentBars, QuestionCard, StatBadge, TypedAction, ValueGraph, YouTubeCard} from './v2';

const T = (x: unknown) => x as Track;
const camOf = (src: string, tl: ReturnType<typeof timeline>, track: Track, wideX = 760): CamCfg =>
  ({src, tl, track, grade: 'contrast(1.06) saturate(1.05)', box: [1080, BOX_H], baseH: 640, faceY: 0.42, wideX, who: () => 'W'});

// ---- J1 · Davis Mills roast (black): Glennon cut-out + fahhh + red tint ---------------------------------------------------
const dTrack = T({stepMs: 1000, fromMs: 0, L: Array(18).fill([700, 400]), M: Array(18).fill([990, 485]), R: Array(18).fill([1455, 515])});
const d1 = timeline([[0, 16800]]);
const D1 = {davis: 5820, ew: 6940, neck: 9940, glennon: 10380, trevor: 11940, oh: 14320};
const DAVIS: Spec = {
  tl: d1, src: 'pod/t6_davis_mills_joke.mp4', track: dTrack, top: 'Davis Mills got roasted for his neck', wordY: 1300, wideX: 960,
  words: wordsFrom(t6Words, d1, {Nashon: 'Nashon'}, {Davis: '#21F5E6', Mills: '#21F5E6', Ew: '#FF4D4D', Glennon: '#F9FC35', neck: '#F9FC35'}),
  shots: [[0, 'W'], [D1.davis, 'M'], [9160, 'W'], [D1.glennon + STROBE_CUT, 'M'], [D1.oh, 'W']],
  strobes: [D1.glennon], tints: [[D1.ew, RED], [D1.trevor, RED]], swish: [D1.davis],
  fah: [10800],
  music: {file: 'Fluffing_a_Duck.mp3', from: 0, level: 0},
  overlay: (o) => <MemePop o={o} at={D1.glennon + STROBE_CUT} to={13200} src="cutouts/glennon.png" x={600} y={1000} size={420} />,
};
export const B8Davis = () => <Jorho s={DAVIS} />;
export const B8_DAVIS_MS = d1.total;

// ---- J2 · National Treasures rip (black): cold open "Come on, Trevor!" + 🙏 → no Trevor → "Dan Marino" taco-bell bong + 1 comment ----
const n1 = timeline([[55500, 58100], [27400, 32000], [50040, 51500], [53400, 54000], [57240, 60000], [62000, 68100]]);
const nOut = (i: number, src: number) => n1.segOut[i] + src - n1.segs[i][0];
const N1 = {come: nOut(0, 55540), trevorHere: nOut(1, 29880), electric: nOut(1, 31680), come2: nOut(4, 57280), marino: nOut(5, 62060), sling: nOut(5, 67560)};
const NT: Spec = {
  tl: n1, src: 'b3/v_nt_rip.mp4', track: T(ntTrack), top: 'Trevor ripped packs hoping to pull himself', wordY: 1300, wideX: 760,
  words: (() => { const base = timeline([[27400, 32000], [50040, 51500], [53400, 54000], [57240, 60000], [62000, 68100]]); const off = n1.segOut[1];
    const cold = timeline([[55500, 58100]]);
    return [...wordsFrom(ntWords, cold, {}, {Trevor: '#21F5E6'}), ...wordsFrom(ntWords, base, {}, {Trevor: '#21F5E6', electric: '#F9FC35', Marino: '#FF4D4D'}).map((w) => ({...w, at: w.at + off}))]; })(),
  shots: [[0, 'M'], [n1.segOut[1], 'W'], [n1.segOut[2], 'M'], [n1.segOut[4], 'W'], [N1.marino + STROBE_CUT, 'M']],
  strobes: [N1.marino], tints: [[N1.electric, GREEN], [N1.marino + STROBE_CUT, RED]], swish: [N1.electric],
  awkward: [{at: N1.marino + 300, sfx: 'taco-bell-bong'}],
  music: {file: 'tak-tak.mp3', from: 2000, level: 0},
  overlay: (o) => <>
    <MemePop o={o} at={N1.come} to={n1.segOut[1]} src="emoji-ios/1f64f.png" x={660} y={1000} size={300} />
    <Asterisk o={o} a={N1.marino + 500} b={n1.total} text="still no trevor" y={520} />
  </>,
};
export const B8NatTreasures = () => <Jorho s={NT} />;
export const B8_NT_MS = n1.total;

// ---- J3 · Rogers' Realm (light): 🥊 + boxing bell on "we should box him", green tint on the names ---------------------------
const r1 = timeline([[0, 6150], [9240, 16800], [17500, 20400]]);
const R1 = {jags: r1.out(2260), realm: r1.out(11260), box: r1.out(14720), realm2: r1.out(18300)};
const ROGERS: Spec = {
  tl: r1, src: 'b3/v_rogers_realm.mp4', track: T(rgTrack), top: "Trevor's superfans vs Rodgers' superfans", wordY: 1290, wideX: 760, light: true,
  words: wordsFrom(rgWords, r1, {}, {Rogers: '#F9FC35', realm: '#F9FC35', Traveling: '#21F5E6', Trevor: '#21F5E6', box: '#FF4D4D'}),
  shots: [[0, 'W'], [r1.segOut[1], 'M'], [R1.box, 'W'], [r1.segOut[2], 'M']],
  strobes: [R1.box], tints: [[R1.realm, GREEN], [R1.realm2, GREEN]], swish: [R1.realm],
  extraSfx: [sfx('boxing-bell', R1.box, 0.3)],
  music: {file: 'funk-do-balkan.mp3', from: 11900 - R1.box, level: 0},
  overlay: (o) => <MemePop o={o} at={R1.box} to={R1.box + 1900} src="emoji-ios/1f94a.png" x={390} y={1480} size={300} />,
};
export const B8Rogers = () => <Jorho s={ROGERS} />;
export const B8_ROGERS_MS = r1.total;

// ---- J4 · Back to the Lair (light): tracked head circle + label + ding on his "Yeah", 🤝 on "always welcome" -------------------
const l1 = timeline([[0, 3200], [3600, 9300], [9800, 15000], [15400, 17500], [18200, 19100]]);
const L1 = {lair: l1.out(6840), yeah: l1.segOut[2] + 60, chill: l1.out(13560), welcome: l1.out(15780)};
const LAIR: Spec = {
  tl: l1, src: 'b3/v_lair.mp4', track: T(lrTrack), top: "Trevor's off-season plan? Ripping packs", wordY: 1290, wideX: 760, light: true,
  words: wordsFrom(lrWords, l1, {layer: 'Lair'}, {Lair: '#21F5E6', Florida: '#58EE28', awesome: '#58EE28', welcome: '#F9FC35'}),
  shots: [[0, 'W'], [l1.segOut[1], 'L'], [L1.yeah, 'M'], [l1.segOut[3], 'M'], [l1.segOut[4], 'W']],
  strobes: [L1.yeah], tints: [[L1.lair, GREEN], [L1.welcome, GREEN]], swish: [L1.lair],
  extraSfx: [sfx('ding-2', L1.yeah + 300, 0.3)],
  music: {file: 'jorho-qkthr.mp3', from: 28003 - L1.yeah, level: 0},
  overlay: (o, face) => <>
    {(() => { const f = face('M'); return <HeadRing o={o} a={L1.yeah + 300} b={L1.yeah + 2400} x={f.x} y={f.y} k={f.k} label="TREVOR LAWRENCE" />; })()}
    <MemePop o={o} at={L1.welcome} to={l1.total} src="emoji-ios/1f91d.png" x={390} y={1480} size={300} />
  </>,
};
export const B8Lair = () => <Jorho s={LAIR} />;
export const B8_LAIR_MS = l1.total;

// ---- V1 · Playbook (Jorho v2): YouTube card question → 300+ badge → "8–10 new plays a week" grade scale ---------------------
const p1 = timeline([[14280, 18300], [20100, 24360], [36780, 45070], [48700, 54900]]);
const P1 = {hundreds: p1.out(17000), inventory: p1.out(39060), thisWeek: p1.out(42500), eight: p1.out(52580)};
const PLAYBOOK: Spec = {
  tl: p1, src: 'pod2/u1_playbook.mp4', track: T(pbTrack), top: 'An NFL playbook has hundreds of plays', wordY: 1300, wideX: 760,
  words: wordsFrom(pbWords, p1, {}, {hundreds: '#F9FC35', inventory: '#21F5E6', eight: '#58EE28', ten: '#58EE28'}),
  shots: [[0, 'M'], [p1.segOut[1], 'M'], [p1.segOut[2], 'W'], [p1.segOut[3], 'M']],
  strobes: [P1.hundreds], tints: [[P1.hundreds + STROBE_CUT, GREEN]], swish: [P1.hundreds],
  capsOff: [[150, 2600]],
  music: {file: 'lose-you-adturnup.mp3', from: 12000, level: 0},
  inBox: (o) => <Layer>
    <YouTubeCard o={o} a={0} b={2600} title="How big is an NFL playbook actually?" cam={camOf('pod2/u1_playbook.mp4', p1, T(pbTrack))} startAt={0} dur={p1.total} />
    <StatBadge o={o} a={P1.hundreds + STROBE_CUT} b={p1.segOut[2]} big="300+" label="PLAYS INSTALLED" x={300} />
    <GradeScale o={o} a={P1.eight - 1600} b={p1.total} title="NEW PLAYS THIS WEEK" label="8–10" />
  </Layer>,
  extraSfx: [sfx('mg-click', 200, 0.25), sfx('mg-swoosh', 420, 0.2), ...Array.from({length: 10}, (_, i) => sfx('mg-click', P1.eight - 1350 + i * 110, 0.18))],
};
export const B8Playbook = () => <Jorho s={PLAYBOOK} />;
export const B8_PLAYBOOK_MS = p1.total;

// ---- V2 · Pre-snap reads (Jorho v2): question card → % bars (50–65 % / 15 %) → typed action text ---------------------------
const s1 = timeline([[0, 5600], [9740, 10500], [13160, 18200], [18880, 23000], [28200, 34600]]);
const S1 = {sixtyFive: s1.out(17040), goes: s1.out(18880), fifteen: s1.out(29340), tricks: s1.out(31620)};
const PRESNAP: Spec = {
  tl: s1, src: 'b3/v_presnap.mp4', track: T(psTrack), top: 'How often an NFL QB knows who’s open', wordY: 1300, wideX: 760,
  words: wordsFrom(psWords, s1, {'-stamps': 'snaps', pre: 'pre-'}, {'65': '#58EE28', '15': '#FF4D4D', open: '#58EE28', tricks: '#FF4D4D'}),
  shots: [[0, 'W'], [s1.segOut[1], 'M'], [s1.segOut[3], 'M'], [s1.segOut[4], 'M']],
  strobes: [S1.sixtyFive], tints: [[S1.fifteen, RED]], swish: [S1.sixtyFive],
  capsOff: [[150, 2400], [S1.sixtyFive + 300, S1.sixtyFive + 2600], [S1.fifteen, S1.fifteen + 2400]],
  music: {file: 'interstellar-piano.mp3', from: 10000, level: 0},
  inBox: (o) => <Layer>
    <QuestionCard o={o} a={0} b={2400} q="How often do you KNOW who's open pre-snap?" cam={camOf('b3/v_presnap.mp4', s1, T(psTrack))} />
    <PercentBars o={o} a={S1.sixtyFive + 300} b={S1.sixtyFive + 2600} title="PRE-SNAP READ" rows={[{label: 'KNOWS WHO’S OPEN', pct: 65, at: S1.sixtyFive + 500, color: '#58EE28'}]} />
    <PercentBars o={o} a={S1.fifteen} b={S1.fifteen + 2400} title="AFTER THE SNAP" rows={[{label: 'KNOWS WHO’S OPEN', pct: 65, at: S1.fifteen, color: '#58EE28'},
      {label: 'DEFENSE TRICKS HIM', pct: 15, at: S1.fifteen + 400, color: '#FF2B2B'}]} />
    <TypedAction o={o} a={S1.goes} b={S1.goes + 2200} text="ball goes somewhere else" />
  </Layer>,
  extraSfx: [sfx('keyboard-typing', 300, 0.15, 1400), sfx('mg-swoosh', S1.sixtyFive + 300, 0.2), sfx('keyboard-typing', S1.goes, 0.15, 1100)],
};
export const B8Presnap = () => <Jorho s={PRESNAP} />;
export const B8_PRESNAP_MS = s1.total;

// ---- V3 · Redemptions (Jorho v2): value graph $20,000 → $500 + typed action text --------------------------------------------
const q1 = timeline([[0, 1780], [1780, 2900], [2900, 6000], [7000, 9600], [24100, 27900], [28950, 33700]]);
const Q1 = {k20: q1.out(1140), d500: q1.out(4240), maybe: q1.out(5520), dislike: q1.out(25940), sale: q1.out(32460)};
const REDEEM_V2: Spec = {
  tl: q1, src: 'pod2/u3_redemptions.mp4', track: T(rdTrack), top: 'Watch a $20,000 card lose 97% of its value', wordY: 1300, wideX: 700,
  words: wordsFrom(rdWords, q1, {'20': '$20,000', '000': '', '200': '$200?', '500': '$500'}, {'$20,000': '#58EE28', '$500': '#FF4D4D', redeem: '#21F5E6'}),
  shots: [[0, 'W'], [q1.segOut[2], 'M'], [q1.segOut[3], 'R'], [q1.segOut[4], 'W'], [q1.segOut[5], 'M']],
  strobes: [Q1.d500], tints: [[Q1.k20, GREEN], [Q1.d500 + STROBE_CUT, RED]], swish: [Q1.k20],
  capsOff: [[Q1.k20, Q1.maybe + 600]],
  music: {file: 'funk-sigilo.mp3', from: 36900 - Q1.d500, level: 0},
  inBox: (o) => <Layer>
    <ValueGraph o={o} a={Q1.k20} b={Q1.maybe + 600} from={20000} to={500} fromLabel="$20,000" toLabel="$500" dropAt={Q1.d500} />
    <TypedAction o={o} a={Q1.dislike} b={q1.segOut[5] + 600} text="the hobby hates redemptions" />
  </Layer>,
  extraSfx: [sfx('mg-swoosh', Q1.k20, 0.2), sfx('error', Q1.d500 + 400, 0.18), sfx('keyboard-typing', Q1.dislike, 0.15, 1300)],
};
export const B8RedeemV2 = () => <Jorho s={REDEEM_V2} />;
export const B8_REDEEM_V2_MS = q1.total;
