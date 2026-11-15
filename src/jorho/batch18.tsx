// BATCH 18 (2026-11-15): 3 BYB clips, "new and improved" = the client "video reference" doc (02 Style Guide/video reference (client)):
// restraint first — cuts only on a speaker change or a reaction (no timer punch-ins), zoom ≤ ×1.1 and only on a reaction, 1 flash max,
// SFX only on real events, letterboxed 500K look (black bars, white title, small one-word captions, *Trevor Lawrence* arrow once).
import {sfx} from '../e3/kit';
import {Jorho, type Spec} from './clips';
import {TypedAction} from './v2';
import {make} from './batch17';
import ntWords from '../plans/data/v_nt_rip.words.json';
import ntTrack from '../plans/data/v_nt_rip.seats.json';
import joshWords from '../plans/data/t5_ex_teammate.words.json';
import joshTrack from '../plans/data/t5_ex_teammate.seats.json';
import psWords from '../plans/data/v_presnap.words.json';
import psTrack from '../plans/data/v_presnap.seats.json';

type Track = Spec['track'];
type Raw = {text: string; startMs: number; endMs: number}[];
const T = (x: unknown) => x as Track;

// 1 · the Justin Fields true RPA: $20,000 in 2021 → ~$500 now (loss → red flash + shock, slow sad bed)
const FIELDS = make({src: 'b3/v_nt_rip.mp4', track: T(ntTrack), raw: ntWords as Raw, wideX: 900, top: 'Watching a $20,000 card turn into $500',
  segs: [[127320, 129440], [115840, 118060], [119440, 132700]], hookSeat: 'L', music: 'say-goodbye-lodoni.mp3', from: 0, arrowAt: 122200,
  shots: [[115840, 'L'], [122100, 'M'], [124480, 'L'], [131300, 'M', 1.08]],
  flash: [131440, 'red'],
  sfx: (at) => [sfx('g-shock-sfx', at(131440) - 40, 0.22, 900)]});
export const B18Fields = () => <Jorho s={FIELDS.spec} />;
export const B18_FIELDS_MS = FIELDS.total;

// 2 · "that's not rookie Josh Allen… that's the real Josh Heinz Allen" (good pull → one green flash + ding, then the joke lands clean)
const JOSH = make({src: 'pod/t5_ex_teammate.mp4', track: T(joshTrack), raw: joshWords as Raw, wideX: 960, top: "When it's not THAT Josh Allen",
  segs: [[21240, 23320], [10600, 14720], [15120, 20720], [21240, 25600]], hookSeat: 'M', music: 'joyful-chess-guide.mp3', from: 0, arrowAt: 15200,
  shots: [[10600, 'W'], [12580, 'M'], [17100, 'L'], [19140, 'M'], [21240, 'W'], [23480, 'M', 1.06]],
  flash: [12800, 'green'],
  sfx: (at) => [sfx('g-ding-sfx', at(12800) - 30, 0.2, 700)]});
export const B18Josh = () => <Jorho s={JOSH.spec} />;
export const B18_JOSH_MS = JOSH.total;

// 3 · how often an NFL QB KNOWS who's open pre-snap (no flash; one typed stat, the rest is just him talking)
const PRESNAP = make({src: 'b3/v_presnap.mp4', track: T(psTrack), raw: psWords as Raw, wideX: 960, top: "How often an NFL QB knows who's open",
  segs: [[16760, 18440], [0, 3480], [3660, 5760], [9740, 10440], [13160, 18440], [30680, 34940]], hookSeat: 'M', music: 'kai-cenat-suspense.mp3', from: 0,
  arrowAt: 9800,
  shots: [[0, 'L'], [3660, 'W'], [9740, 'M'], [16760, 'M', 1.08], [30680, 'W'], [33140, 'M']],
  inBox: (o, at) => <TypedAction o={o} a={at(16760)} b={at(18440)} text="50–65% of the time" y={60} color="#21F5E6" glow="rgba(33,245,230,0.5)" />,
  sfx: (at) => [sfx('keyboard-typing', at(16760), 0.1, 700)]});
export const B18Presnap = () => <Jorho s={PRESNAP.spec} />;
export const B18_PRESNAP_MS = PRESNAP.total;
