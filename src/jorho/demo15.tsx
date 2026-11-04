// DEMO 15 (2026-11-04): "throws better going left" (t3) again. User: Demo14 "not even entertaining… scratch some of that, and
// when he mentions something illustratable make the illustration the main screen and his face a face cam in the top left".
// → explainer layout: when a line can be pictured, an ANIMATED ILLUSTRATION fills the box and Trevor shrinks into a face cam
// (top-left, rounded, white border); otherwise the normal cam. No VHS / flips / moving type.
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {MONT} from '../e3/bars';
import {Cam, ease, pop, timeline} from '../e3/kit';
import {BOX_H, GREEN, wordsFrom} from './kit';
import {Jorho, type Spec} from './clips';
import {cam} from './batch10';
import travWords from '../plans/data/t3_traveling_trevors.words.json';
import travTrack from '../plans/data/t3_traveling_trevors.seats.json';

type Track = Spec['track'];
const t15 = timeline([[48000, 50600], [16200, 18900], [21140, 23720], [25720, 29000], [29140, 31250], [32100, 33250], [33860, 36200], [44820, 46300],
  [50840, 52700]]);
const Z = {left: t15.out(49440), right: t15.out(49920), coaches: t15.out(26820), rollouts: t15.out(28220), most: t15.out(29560), hated: t15.segOut[5],
  threw: t15.out(34440), worked: t15.out(45000), best: t15.segOut[8]};
export const DEMO15_MS = t15.total;
const A: [number, number] = [0, t15.segOut[1]]; // hook: left vs right on the move
const B: [number, number] = [Z.coaches - 200, Z.most + 900]; // coaches' play sheet: roll right, roll right… (shorter: cam before/after)
const C: [number, number] = [t15.segOut[6], t15.segOut[7] + 700]; // he reps going left
const K: [number, number] = [t15.segOut[1], t15.segOut[2]]; // since he was a kid: career timeline
const ILLUS = [A, B, C]; // user 2026-11-04: not everything illustrated, leave cam stretches between (K unused)

// ---- face cam: Trevor (seat M) in a rounded square, top-left ----------------------------------------------------------
const FC = 330;
const faceCfg = {...cam('pod/t3_traveling_trevors.mp4', t15, travTrack as unknown as Track, 715), box: [FC, FC] as [number, number], baseH: 400, faceY: 0.45,
  who: () => 'M' as const};
// the full cam SHRINKS into the face-cam corner (top-left) when an illustration starts and grows back when it ends.
// user: "don't make the animation for the webcam elastic, or only a little, make it shrink to that size at that axis".
const SH = 420;
const backOut = (x: number) => { const c = 0.6; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2; }; // a very slight settle
const FaceCam = ({o}: {o: number}) => {
  const w = ILLUS.find(([a, b]) => o >= a && o < b);
  if (!w) return null;
  const pin = Math.min(1, Math.max(0, (o - w[0]) / SH)), pout = Math.min(1, Math.max(0, (o - (w[1] - SH)) / SH));
  const t = backOut(pin) - (pout > 0 ? 1 - (1 - pout) ** 3 : 0); // 0 = full box, 1 = face-cam
  const lerp = (a: number, b: number) => a + (b - a) * t;
  const x = lerp(0, 36), y = lerp(0, 36), cw = lerp(1080, FC), ch = lerp(BOX_H, FC);
  const cfg = {...faceCfg, box: [Math.round(cw), Math.round(ch)] as [number, number], baseH: lerp(640, 400), faceY: lerp(0.42, 0.45)};
  return <div style={{position: 'absolute', left: x, top: y, width: cw, height: ch, borderRadius: lerp(0, 30), overflow: 'hidden',
    border: `${Math.max(0, lerp(0, 7))}px solid white`, boxShadow: `0 12px 28px rgba(0,0,0,${0.5 * Math.min(1, t)})`, background: '#111'}}>
    <Cam c={cfg} o={o} />
  </div>;
};

// ---- turf field (top-down) with a QB token that rolls out and throws --------------------------------------------------
const W = 1080, H = BOX_H, LOS = 700;
const Turf = () => <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, #2f7d38 0 90px, #2b7334 90px 180px)'}}>
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
    {[100, 280, 460, 640, 820, 1000].map((y) => <line key={y} x1={0} x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.55)" strokeWidth={5} />)}
    {[190, 370, 550, 730, 910].map((y) => [60, 1020].map((x) => <line key={`${x}${y}`} x1={x - 14} x2={x + 14} y1={y} y2={y} stroke="rgba(255,255,255,0.45)" strokeWidth={4} />))}
    <line x1={0} x2={W} y1={LOS} y2={LOS} stroke="#5ab0ff" strokeWidth={7} />
    {[360, 450, 540, 630, 720].map((x) => <circle key={x} cx={x} cy={LOS + 48} r={36} fill="#d9d9d9" stroke="#333" strokeWidth={5} />)}
    {[300, 540, 780].map((x) => <g key={x} stroke="#E8132B" strokeWidth={10} strokeLinecap="round"><line x1={x - 26} y1={LOS - 150 - 26} x2={x + 26} y2={LOS - 150 + 26} /><line x1={x + 26} y1={LOS - 150 - 26} x2={x - 26} y2={LOS - 150 + 26} /></g>)}
  </svg>
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, transparent 55%, rgba(0,0,0,0.35) 100%)'}} />
</AbsoluteFill>;
// one rollout + throw: QB from the pocket to (dir) side, ball arcs to a receiver; `clean` = tight spiral (green) or wobbly (yellow, short)
const Rollout = ({o, t0, dir, clean}: {o: number; t0: number; dir: 1 | -1; clean: boolean}) => {
  if (o < t0) return null;
  const run = ease(o, t0, 650), thr = ease(o, t0 + 600, 520);
  const qx = 540 + dir * 290 * run, qy = 900 - 30 * run;
  const rx = 540 + dir * 390, ry = 430;
  const bx = qx + (rx - qx) * thr, lift = Math.sin(thr * Math.PI) * 120, by = qy + (ry - qy) * thr - lift;
  const wob = clean ? 0 : Math.sin(thr * 30) * 18;
  const col = clean ? '#9BE600' : '#FFD84D';
  const path = `M${qx} ${qy} Q ${(qx + rx) / 2} ${(qy + ry) / 2 - 240} ${rx} ${ry}`;
  return <svg width={W} height={H} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
    <path d={`M540 900 L${qx} ${qy}`} stroke="rgba(255,255,255,0.6)" strokeWidth={6} strokeDasharray="14 12" fill="none" />
    {thr > 0 && clean && <path d={path} stroke={col} strokeWidth={26} strokeDasharray={`${thr} 1`} fill="none" pathLength={1} opacity={0.35}
      style={{filter: 'blur(8px)'}} />}
    {thr > 0 && <path d={path} stroke={col} strokeWidth={clean ? 9 : 6} strokeDasharray={`${thr} 1`} fill="none" pathLength={1}
      opacity={clean ? 0.95 : 0.7} />}
    <circle cx={rx} cy={ry} r={42 * (thr >= 1 ? pop(o, t0 + 1120, 8, 220) : 1)} fill={thr >= 1 && clean ? '#9BE600' : 'white'} stroke="#111" strokeWidth={5} />
    <text x={rx} y={ry + 10} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={32} fill="#111">WR</text>
    <circle cx={qx} cy={qy} r={54} fill="#006778" stroke="white" strokeWidth={7} />
    <text x={qx} y={qy + 13} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={48} fill="white">16</text>
    {thr > 0 && thr < 1 && <ellipse cx={bx + wob} cy={by} rx={24} ry={15} fill="#8B4513" stroke="white" strokeWidth={3} transform={`rotate(${clean ? -30 : wob * 4} ${bx + wob} ${by})`} />}
    {thr >= 1 && <text x={rx} y={ry - 50} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={56} fill={col} stroke="#111" strokeWidth={5}
      paintOrder="stroke">{clean ? '✓' : '~'}</text>}
  </svg>;
};
const Pill = ({o, at, text, color, x, y}: {o: number; at: number; text: string; color: string; x: number; y: number}) => o < at ? null :
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pop(o, at, 9, 220)})`, transformOrigin: '50% 50%', background: 'rgba(10,10,12,0.85)',
    border: `4px solid ${color}`, borderRadius: 40, padding: '10px 24px', fontFamily: MONT, fontWeight: 900, fontSize: 34, color, whiteSpace: 'nowrap'}}>{text}</div>;

const IllusA = ({o}: {o: number}) => {
  if (o < A[0] || o >= A[1]) return null;
  const leftDone = o >= 1500;
  return <AbsoluteFill style={{opacity: 1 - ease(o, A[1] - 140, 140), transform: `scale(${1 + 0.06 * (o - A[0]) / (A[1] - A[0])})`}}>
    <Turf />
    {!leftDone && <Rollout o={o} t0={0} dir={-1} clean />}
    {leftDone && <Rollout o={o} t0={1500} dir={1} clean={false} />}
    <Pill o={o} at={80} text="MOVING LEFT" color="#9BE600" x={leftDone ? -400 : 420} y={950} />
    <Pill o={o} at={1550} text="MOVING RIGHT" color="#FFD84D" x={410} y={950} />
  </AbsoluteFill>;
};
// since he was a kid: a career line that fills as he talks, each stop lighting up; the green "going left" band runs the whole way
const STOPS = [{t: 'YOUTH', s: 'AGE 8', e: '1f3c8'}, {t: 'HIGH SCHOOL', s: 'CARTERSVILLE', e: '1f3eb'}, {t: 'CLEMSON', s: 'NATTY', e: '1f3c6'}, {t: 'JAGUARS', s: 'NFL', e: '1f406'}];
const IllusK = ({o}: {o: number}) => {
  if (o < K[0] || o >= K[1]) return null;
  const p = ease(o, K[0] + 150, K[1] - K[0] - 600);
  const X0 = 140, X1 = 940, Yl = 640;
  return <AbsoluteFill style={{opacity: Math.min(ease(o, K[0], 160), 1 - ease(o, K[1] - 140, 140)), background: 'radial-gradient(ellipse at 50% 45%, #1f2a33, #0d1216)'}}>
    <div style={{position: 'absolute', left: 400, top: 120, fontFamily: MONT, fontWeight: 900, fontSize: 50, color: 'white'}}>SINCE HE WAS A KID</div>
    <div style={{position: 'absolute', left: X0, top: Yl - 6, width: X1 - X0, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.15)'}} />
    <div style={{position: 'absolute', left: X0, top: Yl - 6, width: (X1 - X0) * p, height: 12, borderRadius: 6, background: '#9BE600'}} />
    <div style={{position: 'absolute', left: X0, top: Yl + 40, width: (X1 - X0) * p, overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: MONT, fontWeight: 900,
      fontSize: 30, letterSpacing: 3, color: '#9BE600'}}>← WORKING ON GOING LEFT ← WORKING ON GOING LEFT</div>
    {STOPS.map((st, i) => {
      const x = X0 + ((X1 - X0) * i) / (STOPS.length - 1), lit = p >= i / (STOPS.length - 1) - 0.001;
      return <div key={st.t} style={{position: 'absolute', left: x - 90, top: Yl - 225, width: 180, textAlign: 'center', fontFamily: MONT, opacity: lit ? 1 : 0.35,
        transform: `scale(${lit ? 1.05 : 0.9})`}}>
        <div style={{fontSize: 64}}><Img src={staticFile(`emoji-ios/${st.e}.png`)} style={{width: 70, height: 70}} /></div>
        <div style={{fontWeight: 900, fontSize: 28, color: 'white', marginTop: 6}}>{st.t}</div>
        <div style={{fontWeight: 700, fontSize: 20, color: 'rgba(255,255,255,0.6)'}}>{st.s}</div>
        <div style={{width: 26, height: 26, borderRadius: 13, margin: '14px auto 0', background: lit ? '#9BE600' : '#555', border: '4px solid white'}} />
      </div>;
    })}
  </AbsoluteFill>;
};
// youth play sheet: every play is ROLL RIGHT
const IllusB = ({o}: {o: number}) => {
  if (o < B[0] || o >= B[1]) return null;
  const p = Math.min(ease(o, B[0], 200), 1 - ease(o, B[1] - 160, 160));
  const rows = [B[0] + 150, Z.coaches + 200, Z.coaches + 700, Z.rollouts, Z.rollouts + 450, Z.most, Z.most + 500];
  return <AbsoluteFill style={{opacity: p, background: '#E9E4D6'}}>
    <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, transparent 0 58px, rgba(70,110,200,0.25) 58px 60px)'}} />
    <div style={{position: 'absolute', left: 400, top: 60, fontFamily: '"Comic Sans MS", "Segoe Print", cursive', fontWeight: 700, fontSize: 64, color: '#1b2a6b'}}>
      YOUTH PLAYBOOK</div>
    {rows.map((t, i) => o >= t && <div key={i} style={{position: 'absolute', left: i % 2 ? 560 : 50, top: 400 + Math.floor(i / 2) * 165, width: 500, height: 140,
      display: 'flex', alignItems: 'center', gap: 18, transform: `scale(${pop(o, t, 9, 200)})`, fontFamily: '"Comic Sans MS", "Segoe Print", cursive', color: '#1b2a6b'}}>
      <svg width={150} height={110} style={{transform: 'scale(1.25)'}}><circle cx={40} cy={80} r={12} fill="none" stroke="#1b2a6b" strokeWidth={5} />
        <path d="M52 78 Q 100 70 132 30" stroke="#C0392B" strokeWidth={6} fill="none" /><path d="M132 30 l-20 4 m20 -4 l-4 20" stroke="#C0392B" strokeWidth={6} fill="none" /></svg>
      <div><div style={{fontSize: 30, opacity: 0.7}}>PLAY {i + 1}</div><div style={{fontSize: 46, fontWeight: 700, color: '#C0392B', whiteSpace: 'nowrap'}}>ROLL RIGHT</div></div>
    </div>)}
  </AbsoluteFill>;
};
// he reps going left: QB rolls left on a loop, the rep counter speeds up
const IllusC = ({o}: {o: number}) => {
  if (o < C[0] || o >= C[1]) return null;
  const T = 900;
  const k = Math.floor((o - C[0]) / T);
  const reps = Math.min(999, Math.round(((o - C[0]) / (C[1] - C[0])) ** 3 * 999));
  return <AbsoluteFill style={{opacity: Math.min(ease(o, C[0], 160), 1 - ease(o, C[1] - 140, 140)), transform: `scale(${1 + 0.08 * (o - C[0]) / (C[1] - C[0])})`}}>
    <Turf />
    <Rollout key={k} o={o} t0={C[0] + k * T} dir={-1} clean />
    <div style={{position: 'absolute', right: 50, top: 50, background: 'rgba(10,10,12,0.85)', borderRadius: 22, padding: '14px 28px', textAlign: 'center', fontFamily: MONT}}>
      <div style={{fontWeight: 800, fontSize: 24, letterSpacing: 2, color: 'rgba(255,255,255,0.7)'}}>REPS GOING LEFT</div>
      <div style={{fontWeight: 900, fontSize: 84, lineHeight: '90px', color: '#9BE600'}}>{reps >= 999 ? '999+' : reps}</div>
    </div>
  </AbsoluteFill>;
};

const DEMO: Spec = {
  tl: t15, src: 'pod/t3_traveling_trevors.mp4', track: travTrack as unknown as Track, top: "He's right-handed… but BETTER going left?", wordY: 1170, wideX: 715,
  words: wordsFrom(travWords, t15, {uh: '', i: 'I'}, {left: '#58EE28', right: '#F9FC35', hated: '#FF4D4D', best: '#58EE28', kid: '#F9FC35'}),
  shots: [[0, 'M'], [t15.segOut[2], 'W'], [B[0] - 900, 'M'], [B[1], 'M'], [C[1], 'M'], [Z.best, 'W']],
  strobes: [], tints: [[Z.best + 300, GREEN]], swish: [],
  music: {file: 'acido-iii.mp3', from: 20000, level: 0},
  inBox: (o) => <>
    <IllusA o={o} />
    <IllusB o={o} />
    <IllusC o={o} />
    <FaceCam o={o} />
  </>,
  extraSfx: [], // user 2026-11-04: "chill out on the sound effects"
};
export const Demo15 = () => <Jorho s={DEMO} />;
