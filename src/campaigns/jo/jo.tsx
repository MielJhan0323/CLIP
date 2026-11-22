// Jo Koy: Blue in the Face (Eclipse, 2026-11-22, vault/05 Campaigns/Jo Koy/Brief.md). IG Reels only. Original audio only (no music,
// no SFX, no AI voice). Positive about Jo, true, never cut his words to change the meaning. Strong language OK (his own words).
// Stand-up pieces: centre crop (Jo is centre stage). Variety interview: full-width layout so the Variety logo stays as it appears.
import {makeKit, type KitCfg} from '../kit/kit';
import w04 from '../../../public/jo/jo_04.words.json';
import w11 from '../../../public/jo/jo_11.words.json';
import w12 from '../../../public/jo/jo_12.words.json';
import w07 from '../../../public/jo/jo_07.words.json';
import wV from '../../../public/jo/jo_vtitle.words.json'; // 480–525 s of the Variety interview, cut out (seeking 8 min in failed)
const P = (n: string) => `jo/jo_${n}.mp4`;
import f04 from '../../../public/jo/jo_04.facex.json';
import f11 from '../../../public/jo/jo_11.facex.json';
import f12 from '../../../public/jo/jo_12.facex.json';
import f07 from '../../../public/jo/jo_07.facex.json';
const faceX = {[P('04')]: f04, [P('11')]: f11, [P('12')]: f12, [P('07')]: f07} as Record<string, [number, number][]>;
// 2026-11-22 v2 (user ref: Comedy AEPP "How Fluffy found his LOST SON", structure only, no AI images / caption animations):
// full-screen tight crop on Jo, moody grade + vignette, NO on-screen hook text (the first line is the hook), small plain centred captions.
const base: Partial<KitCfg> = {noSfx: true, capY: 960, capSize: 64, hl: '#3DFF7A', zoom: 1.15, zoomY: 32, vignette: true, faceX,
  grade: 'saturate(0.82) contrast(1.08) brightness(0.94)'};
const mk = (n: string, w: unknown, hook: string, segs: [number, number][], extra: Partial<KitCfg> = {}) =>
  makeKit({...base, ...extra, hook: extra.wide ? hook : '', words: {[P(n)]: w as never}, segs: segs.map(([a, b]) => [P(n), a, b])} as KitCfg);
// 1 · "Do it, Joseph" → Mom takes it right back
export const JO_JOSEPH = mk('04', w04, 'MOM SAID "[DO IT, JOSEPH]"… THEN THIS', [[28.2, 30.3], [19.3, 23.0], [42.2, 50.4], [72.4, 78.1], [96.4, 106.9]]);
// 2 · Fred and the Dodgers game: "I can't go" → the portable machine
export const JO_FRED = mk('11', w11, '[FRED] COULDN\'T GO TO THE GAME…', [[140.4, 141.9], [154.2, 156.3], [156.4, 170.6], [184.4, 192.0], [208.2, 213.1]], {fix: {fred: 'Fred'}});
// 3 · the title line: "I was Dodger blue in the face"
export const JO_BLUE = mk('12', w12, 'WHERE "[BLUE IN THE FACE]" CAME FROM', [[205.7, 210.4], [52.8, 57.6], [82.7, 93.1], [129.9, 133.4], [194.0, 201.4], [205.7, 210.4]], {fix: {fred: 'Fred'}});
// 4 · Kingston the runaway: "It's a deer, asshole"
export const JO_DEER = mk('07', w07, 'HIS DOG CAME BACK WITH [A STORY]', [[272.1, 279.9], [286.9, 291.7], [320.8, 324.0], [341.7, 352.5]], {fix: {joe: 'Jo,'}});
// 5 · Variety: how he named the special
export const JO_TITLE = mk('vtitle', wV, 'HOW JO KOY NAMED [BLUE IN THE FACE]', [[26.0, 30.0], [11.2, 17.0], [18.1, 25.9], [30.3, 38.3]], {wide: 1.0, zoom: 1, hookTop: 300, capY: 1430});
export const JoJoseph = JO_JOSEPH.Comp, JoFred = JO_FRED.Comp, JoBlue = JO_BLUE.Comp, JoDeer = JO_DEER.Comp, JoTitle = JO_TITLE.Comp;
