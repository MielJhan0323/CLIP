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

// ---- batch 2 (2026-11-22, "5 jo koy clips … topics that relate to the general audience"): first job, lying to Mom, Mom fighting
// for you, teeth insecurity, adopt-don't-shop. Same comedy-clip look (face-tracked crop, no hook text, plain captions, original audio).
import w03 from '../../../public/jo/jo_03.words.json';
import w05 from '../../../public/jo/jo_05.words.json';
import f03 from '../../../public/jo/jo_03.facex.json';
import f05 from '../../../public/jo/jo_05.facex.json';
faceX[P('03')] = f03 as [number, number][]; faceX[P('05')] = f05 as [number, number][];
// 1 · first job: fired from McDonald's for stealing nuggets (cold open = the confession)
export const JO_NUGGETS = mk('05', w05, '', [[0.73, 7.41], [12.81, 23.6], [43.19, 54.6], [70.31, 74.29], [81.53, 87.79]]);
// 2 · cold open "Are you telling me the truth?" → lying to Mom about why he got fired → her cross-examination → "get in the goddamn car"
export const JO_LIE = mk('05', w05, '', [[193.95, 197.9], [139.19, 149.95], [152.83, 167.19], [171.53, 174.63], [177.83, 185.43], [193.95, 201.05], [208.17, 216.2]]);
// 3 · part 2: Mom storms into McDonald's to defend him… and comes out knowing the truth
export const JO_MOM = mk('05', w05, '', [[210.05, 216.2], [242.37, 247.81], [254.27, 263.39], [266.09, 274.5], [297.81, 311.99]]);
// 4 · teeth insecurity: covering his smile on stage → the $100,000 dentist quote
export const JO_TEETH = mk('03', w03, '', [[9.01, 22.93], [35.95, 39.55], [185.89, 200.27], [230.71, 238.55], [242.47, 253.39]]);
// 5 · adopt, don't shop
export const JO_SHELTER = mk('07', w07, '', [[1.17, 10.49], [22.27, 50.5]], {fix: {joe: 'Jo,'}});
export const JoNuggets = JO_NUGGETS.Comp, JoLie = JO_LIE.Comp, JoMom = JO_MOM.Comp, JoTeeth = JO_TEETH.Comp, JoShelter = JO_SHELTER.Comp;

// ---- batch 3 (2026-11-22, "5 more that everyone can relate and laugh and comment to"): comment-bait topics
// (first paycheck, the shelter's disclaimer, "what mix is your dog", first big check, Mom's hard love).
import {makeKit as mkKit} from '../kit/kit';
// 1 · first job at 15½: Mom signs the waiver ("take advantage of my son, where do I sign") → $3.85/hr math → $6 a day
export const JO_PAY = mk('04', w04, '', [[240.45, 244.4], [233.5, 244.4], [246.7, 287.55]]);
// 2 · "a bit of a runaway": the shelter lady's disclaimer AFTER the papers are signed → 12 years of prison breaks
export const JO_RUNAWAY = mk('07', w07, '', [[194.23, 198.15], [167.63, 173.85], [177.87, 190.21], [194.23, 213.6], [215.69, 228.7]], {fix: {joe: 'Jo,'}});
// 3 · "what do you mean, a mix?": describing his shelter dog (low rider, lion's mane)
export const JO_MIX = mk('07', w07, '', [[75.75, 81.0], [86.45, 88.81], [99.69, 130.8]], {fix: {joe: 'Jo,'}});
// 4 · first big check: "a bacon western cheeseburger every day, I'm good for 100,000 days"
export const JO_BURGER = mk('03', w03, '', [[108.19, 118.9], [91.4, 136.33]]);
// 5 · Mom's hard love: "I can always count on my mom to destroy that idea" → "don't floss, get a good job and buy your teeth"
export const JO_HARDLOVE = mkKit({...base, hook: '', words: {[P('03')]: w03 as never, [P('04')]: w04 as never},
  segs: [[P('03'), 275.25, 282.53], [P('04'), 139.55, 164.21]]} as KitCfg);
export const JoPay = JO_PAY.Comp, JoRunaway = JO_RUNAWAY.Comp, JoMix = JO_MIX.Comp, JoBurger = JO_BURGER.Comp, JoHardlove = JO_HARDLOVE.Comp;

// ---- batch 4 (2026-11-24, "10 jo koy clips, relatively simple … that the general audience can relate to, even someone random just
// scrolling by"): short single-idea cuts (17–45 s), the relatable line first, no setup a stranger would need.
export const JO_S = {
  Nug: mk('05', w05, '', [[0.73, 7.41], [12.63, 23.81], [43.19, 54.69]]), // stole nuggets at his first job
  Lie: mk('05', w05, '', [[152.59, 166.96], [171.27, 174.63], [193.95, 201.21]]), // the fastest lie to Mom + her cross-exam
  Car: mk('05', w05, '', [[266.09, 274.57], [297.81, 311.99]]), // Mom walks into McDonald's… "get out of the car"
  Cher: mk('03', w03, '', [[8.81, 22.93], [35.73, 39.55]]), // covering his teeth when he laughed
  Vicks: mk('03', w03, '', [[185.73, 201.13], [230.71, 238.55]]), // the dentist's reaction + the quote
  Oprah: mk('03', w03, '', [[42.31, 57.45], [60.69, 64.43]]), // "you get a tooth, you get a tooth"
  Gucci: mk('07', w07, '', [[5.47, 10.49], [12.15, 34.19]], {fix: {joe: 'Jo,'}}), // stop buying name-brand dogs
  Prison: mk('07', w07, '', [[218.0, 262.6]], {fix: {joe: 'Jo,'}}), // the dog that escapes every day
  Six: mk('04', w04, '', [[255.95, 287.55]]), // $3.85 an hour → $6 a day
  Floss: mk('04', w04, '', [[139.55, 164.0]]), // "don't floss, get a good job and buy your teeth"
};
export const JoS = Object.fromEntries(Object.entries(JO_S).map(([k, v]) => [k, v.Comp])) as Record<keyof typeof JO_S, (typeof JO_S)[keyof typeof JO_S]["Comp"]>;
