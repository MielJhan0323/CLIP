import {makeGaming} from './gaming';
import {HC} from '../../jorho/hi';
const {yellow: Y, cyan: C, green: G, red: R} = HC;
const CAM: [number, number, number, number] = [15, 100, 330, 232];
import w_scooter from '../../../public/gaming/kc_scooter.words.json';
import w_seaplane from '../../../public/gaming/kc_seaplane.words.json';
import w_swamp from '../../../public/gaming/kc_swamp.words.json';
import w_alert from '../../../public/gaming/kc_alert.words.json';
import w_countdown from '../../../public/gaming/kc_countdown.words.json';
import w_t1132 from '../../../public/gaming/kc_t1132.words.json';
import w_t0338 from '../../../public/gaming/kc_t0338.words.json';
import w_t1224 from '../../../public/gaming/kc_t1224.words.json';
import w_t1158 from '../../../public/gaming/kc_t1158.words.json';
export const KC_SCOOTER = makeGaming({hits: [[64.0,'bass-boosted-vine-boom'],[66.0,'g-sudden-suspense-sound-effect'],[76.5,'g-fahhh-sfx','red']], logo: 'gaming/kreekcraft_overlay.png', flash: ['granny', 'red'], music: 'kai-cenat-suspense.mp3', src: [1920, 1080], file: 'gaming/kc_scooter_hq.mp4', cam: CAM, a: 61260, b: 83730, seam: "[GRANNY] IS AFTER ME", emoji: '1f631', hi: {granny: [Y, '1f475'], drop: R, god: C, accelerate: G}, raw: w_scooter as never});
export const KC_SEAPLANE = makeGaming({hits: [[66.2,'g-sudden-suspense-sound-effect'],[73.7,'bass-boosted-vine-boom'],[77.3,'g-fahhh-sfx','red']], logo: 'gaming/kreekcraft_overlay.png', flash: ['bird', 'red'], music: 'wtf-u-tryna-say.mp3', src: [1920, 1080], file: 'gaming/kc_seaplane_hq.mp4', cam: CAM, a: 65770, b: 85000, seam: "HE HIT A [BIRD] MID-FLIGHT", emoji: '1f62d', hi: {bird: [Y, '1f426'], crashed: R, shoot: C}, raw: w_seaplane as never});
export const KC_SWAMP = makeGaming({hits: [[64.2,'bruh'],[71.1,'g-akward-sfx'],[73.2,'g-fahhh-sfx','red']], logo: 'gaming/kreekcraft_overlay.png', flash: ['eaten', 'green'], music: 'kai-cenat-suspense.mp3', src: [1920, 1080], file: 'gaming/kc_swamp_hq.mp4', cam: CAM, a: 62860, b: 82000, seam: "\"I DIDN'T GET [EATEN]\"", emoji: '1f631', hi: {eaten: [R, '1f631'], chances: Y, doing: C}, raw: w_swamp as never});
export const KC_ALERT = makeGaming({blurFrom: 6150, blurFreezeAt: 5600, hits: [[64.8,'g-sudden-suspense-sound-effect'],[75.8,'g-fahhh-sfx','red'],[80.4,'g-akward-sfx']], logo: 'gaming/kreekcraft_overlay.png', flash: ['cooked', 'red'], music: 'ts-pmo.mp3', src: [1920, 1080], file: 'gaming/kc_alert_hq.mp4', cam: CAM, a: 58540, b: 81810, seam: "THERE GOES MY [STREAM]", emoji: '1f480', hi: {cooked: [R, '1f480'], stream: Y, gone: R, dream: C}, raw: w_alert as never});
export const KC_COUNTDOWN = makeGaming({hits: [[67.0,'g-akward-sfx'],[69.8,'g-riser-sfx'],[77.2,'g-anime-wow-sound-effect','green']], logo: 'gaming/kreekcraft_overlay.png', flash: ['giveaway', 'green'], music: 'pixy-legacy.mp3', src: [1920, 1080], file: 'gaming/kc_countdown_hq.mp4', cam: CAM, a: 66680, b: 86000, seam: "GTA 6 IN [1 MINUTE]", emoji: '1f525', hi: {giveaway: [G, '1f381'], minute: Y, zero: R, joking: C}, raw: w_countdown as never});
export const KcScooter = KC_SCOOTER.Comp, KcSeaplane = KC_SEAPLANE.Comp, KcSwamp = KC_SWAMP.Comp, KcAlert = KC_ALERT.Comp, KcCountdown = KC_COUNTDOWN.Comp;
// chat-spike batch (2026-11-19, from kc_chat.json): swamp ATV, TikTok restriction, club ban fear, car steal blocked
export const KC_ATV = makeGaming({logo: 'gaming/kreekcraft_overlay.png', cam: CAM, src: [1920, 1080], file: 'gaming/kc_t1132_hq.mp4', a: 55500, b: 73770, seam: "\"DID Y'ALL SEE [THAT]?\"", emoji: '1f40a', flash: ['god', 'red'], music: 'kai-cenat-suspense.mp3',
  hits: [[57.6,'g-sudden-suspense-sound-effect'],[69.5,'bass-boosted-vine-boom'],[71.2,'g-fahhh-sfx']], hi: {see: Y, that: [R, '1f40a'], god: C}, raw: w_t1132 as never});
export const KC_TIKTOK = makeGaming({logo: 'gaming/kreekcraft_overlay.png', cam: CAM, src: [1920, 1080], file: 'gaming/kc_t0338_hq.mp4', a: 59000, b: 80850, seam: "TIKTOK [RESTRICTED] HIS STREAM", emoji: '1f480', flash: ['restricted', 'red'], music: 'wtf-u-tryna-say.mp3',
  hits: [[63.8,'g-ceeday-huh-sound-effect-1'],[71.0,'bruh'],[78.1,'g-akward-sfx']], hi: {tiktok: C, restricted: [R, '1f6ab'], uncomfortable: Y, crazy: G}, raw: w_t0338 as never});
export const KC_BANNED = makeGaming({logo: 'gaming/kreekcraft_overlay.png', cam: CAM, src: [1920, 1080], file: 'gaming/kc_t1224_hq.mp4', a: 77300, b: 92700, seam: "\"MY STREAM'S ABOUT TO GET [BANNED]\"", emoji: '1f62d', flash: ['banned', 'red'], music: 'ts-pmo.mp3',
  hits: [[78.8,'g-sudden-suspense-sound-effect'],[89.1,'g-studio-audience-awwww-sound-fx']], hi: {banned: [R, '1f6ab'], subscribe: Y, idea: C, nice: G}, raw: w_t1224 as never});
export const KC_STEAL = makeGaming({logo: 'gaming/kreekcraft_overlay.png', cam: CAM, src: [1920, 1080], file: 'gaming/kc_t1158_hq.mp4', a: 37600, b: 57890, seam: "GTA 6 WON'T LET HIM [STEAL] IT", emoji: '1f697', flash: ['won', 'red'], music: 'kai-cenat-suspense.mp3',
  hits: [[44.4,'error'],[48.3,'bruh'],[52.0,'g-akward-sfx']], hi: {steal: [Y, '1f697'], back: C, car: G}, raw: w_t1158 as never});
export const KcAtv = KC_ATV.Comp, KcTiktok = KC_TIKTOK.Comp, KcBanned = KC_BANNED.Comp, KcSteal = KC_STEAL.Comp;
// story cuts with pans + zooms (2026-11-20, ref Kreek "SADDEST MOMENT in GTA 6!"): src/campaigns/gaming/story.tsx
import {makeStory} from './story';
import w_dog from '../../../public/gaming/kc_dog_hq.words.json';
export const KC_DOG = makeStory({logo: 'gaming/kreekcraft_overlay.png', cam: CAM, src: [1920, 1080], file: 'gaming/kc_dog_hq.mp4', raw: w_dog as never,
  seam: "HE DIDN'T SEE THE [DOG]", emoji: '1f62d', music: 'experience-einaudi.mp3', musicLevel: 0.3, rain: [98.8, 112.3], hi: {dog: R, dead: R, sorry: C, see: Y},
  segs: [[41.8, 44.3], [70.8, 76.5], [98.8, 102.0], [107.4, 112.3], [162.1, 164.4]],
  game: [[41.8, 1.1, 0.5, 0.5], [42.8, 1.55, 0.45, 0.55], [44.2, 1.65, 0.45, 0.55], [70.8, 1.75, 0.5, 0.5], [76.4, 1.3, 0.5, 0.5], [98.8, 1.0], [101.9, 1.2], [107.4, 1.15], [112.2, 1.4, 0.5, 0.45], [162.1, 1.0], [164.3, 1.3]],
  face: [[41.8, 1.0, 0.5, 0.45], [42.9, 1.0, 0.5, 0.45], [43.3, 1.3, 0.5, 0.45], [44.2, 1.3, 0.5, 0.45], [70.8, 1.0, 0.5, 0.45], [101.2, 1.05, 0.5, 0.45], [101.6, 1.3, 0.5, 0.45], [107.4, 1.0, 0.5, 0.45], [110.0, 1.05, 0.5, 0.45], [110.4, 1.3, 0.5, 0.45], [162.1, 1.0, 0.5, 0.45]],
  hits: [[42.9, 'g-sudden-suspense-sound-effect', 'red'], [101.5, 'spongebob-boowomp'], [110.2, 'g-studio-audience-awwww-sound-fx']]});
export const KcDog = KC_DOG.Comp;
// batch 3 (2026-11-20): found with the full-stream transcript + chat log; story cuts, pans/zooms, hook ACTION in 1-2 s.
import w_lucia from '../../../public/gaming/kc_lucia_hq.words.json';
import w_jlucia from '../../../public/gaming/kc_jlucia_hq.words.json';
import w_shark from '../../../public/gaming/kc_shark_hq.words.json';
import w_dog2 from '../../../public/gaming/kc_dog2_hq.words.json';
import w_shoe from '../../../public/gaming/kc_shoe_hq.words.json';
import w_donate from '../../../public/gaming/kc_donate_hq.words.json';
const PRE: [number, number, number, number] = [0, 75, 280, 285]; // facecam box on the pre-game "playable in" screen
const LOGO = 'gaming/kreekcraft_overlay.png', HQ: [number, number] = [1920, 1080];
const LU = 'gaming/kc_lucia_hq.mp4', JL = 'gaming/kc_jlucia_hq.mp4';
export const KC_LUCIA = makeStory({logo: LOGO, src: HQ, cam: PRE, file: LU, raw: w_lucia as never, raws: {[JL]: w_jlucia as never},
  seam: '"LUCIA IS NOT [REAL]"', emoji: '1f440', music: 'Sneaky_Snitch.mp3', musicLevel: 0.25, hi: {lucia: Y, wife: C, cheat: R, cheating: R, girlfriend: G, real: R},
  segs: [[24.4, 29.1], [31.1, 33.4], [34.9, 40.8], [43.5, 45.1], [52.6, 57.1], [51.2, 56.5, JL, CAM]],
  game: [[24.4, 1.0], [57.0, 1.25]],
  face: [[24.4, 1.0], [27.6, 1.0], [27.9, 1.25], [31.1, 1.0], [43.5, 1.0], [44.5, 1.0], [44.8, 1.3], [52.6, 1.0], [55.3, 1.0], [55.7, 1.3]],
  hits: [[27.9, 'g-akward-sfx'], [44.6, 'g-sudden-suspense-sound-effect'], [55.6, 'bass-boosted-vine-boom']]});
export const KC_SHARK = makeStory({logo: LOGO, src: HQ, cam: CAM, file: 'gaming/kc_shark_hq.mp4', raw: w_shark as never,
  seam: "HE'S GONNA GET EATEN BY A [SHARK]", emoji: '1f988', music: 'kai-cenat-suspense.mp3', musicLevel: 0.3, hi: {shark: R, bleeding: R, got: G, shit: Y, fucking: Y},
  segs: [[26.0, 32.9], [48.6, 53.4], [59.8, 65.8], [67.5, 72.3]],
  game: [[26.0, 1.0], [32.8, 1.35], [48.6, 1.2], [53.3, 1.0], [59.8, 1.1], [64.9, 1.5], [67.5, 1.3], [72.2, 1.0]],
  face: [[26.0, 1.0], [64.6, 1.0], [64.9, 1.35], [67.5, 1.0], [71.5, 1.0], [71.8, 1.3]],
  hits: [[29.0, 'g-sudden-suspense-sound-effect', 'red'], [49.7, 'bass-boosted-vine-boom'], [64.9, 'g-anime-wow-sound-effect', 'green'], [71.7, 'g-fahhh-sfx']]});
export const KC_DOG2 = makeStory({logo: LOGO, src: HQ, cam: CAM, file: 'gaming/kc_dog2_hq.mp4', raw: w_dog2 as never,
  seam: 'HE HIT [ANOTHER] DOG', emoji: '1f62d', music: 'experience-einaudi.mp3', musicLevel: 0.3, rain: [58.6, 75.5], hi: {dog: R, sorry: C, mean: Y},
  segs: [[44.6, 48.6], [58.6, 62.2], [71.0, 75.5], [91.9, 95.8], [100.4, 105.5]],
  game: [[44.6, 1.0], [46.0, 1.5, 0.5, 0.6], [48.5, 1.6, 0.5, 0.6], [58.6, 1.0], [75.4, 1.25], [91.9, 1.0], [95.7, 1.15], [100.4, 1.0], [104.4, 1.2], [104.7, 1.5]],
  face: [[44.6, 1.0], [46.1, 1.0], [46.4, 1.3], [58.6, 1.0], [74.0, 1.0], [74.3, 1.3], [91.9, 1.0], [92.2, 1.3], [100.4, 1.0], [104.5, 1.0], [104.8, 1.35]],
  hits: [[45.9, 'g-sudden-suspense-sound-effect', 'red'], [74.1, 'g-studio-audience-awwww-sound-fx'], [92.2, 'spongebob-boowomp'], [104.7, 'g-akward-sfx']]});
export const KC_SHOE = makeStory({logo: LOGO, src: HQ, cam: CAM, file: 'gaming/kc_shoe_hq.mp4', raw: w_shoe as never, raws: {[LU]: w_lucia as never, [JL]: w_jlucia as never},
  seam: 'CHAT WANTED THE [SHOE STORE] FOR 11 HOURS', emoji: '1f460', music: 'pixy-legacy.mp3', musicLevel: 0.28, hi: {shoe: Y, store: Y, god: C, lucia: G},
  segs: [[16.8, 20.1], [72.0, 75.7, LU, PRE], [30.8, 35.6, JL, CAM], [20.2, 24.7]],
  game: [[16.8, 1.0], [20.0, 1.3], [20.2, 1.0], [24.6, 1.35]],
  face: [[16.8, 1.25], [20.0, 1.0], [20.2, 1.2], [24.0, 1.2], [24.2, 1.4]],
  hits: [[17.0, 'g-anime-wow-sound-effect', 'green'], [24.1, 'bass-boosted-vine-boom']]});
export const KC_DONATE = makeStory({logo: LOGO, src: HQ, cam: PRE, file: 'gaming/kc_donate_hq.mp4', raw: w_donate as never,
  seam: "HE WON'T STOP [DONATING]", emoji: '1f4b8', music: 'wtf-u-tryna-say.mp3', musicLevel: 0.25, hi: {donating: G, parents: R, kill: R, over: C, gta: Y},
  segs: [[14.8, 18.6], [23.6, 30.0], [45.4, 53.3], [85.9, 88.1]],
  game: [[14.8, 1.0], [88.0, 1.2]],
  face: [[14.8, 1.0], [47.0, 1.0], [47.3, 1.3], [49.5, 1.0], [50.2, 1.0], [50.5, 1.35], [85.9, 1.0], [87.0, 1.0], [87.3, 1.35]],
  hits: [[15.0, 'g-sudden-suspense-sound-effect'], [26.2, 'cha-ching', 'green'], [50.3, 'spongebob-boowomp'], [87.1, 'g-fahhh-sfx']]});
export const KcLucia = KC_LUCIA.Comp, KcShark = KC_SHARK.Comp, KcDog2 = KC_DOG2.Comp, KcShoe = KC_SHOE.Comp, KcDonate = KC_DONATE.Comp;
// batch 4 (2026-11-20 "more engaging and hype, catch Kreek lacking / screaming / laughing"): picked by chat-reaction rate (OMG x7).
import w_narr from '../../../public/gaming/kc_narr_hq.words.json';
export const KC_NARR = makeStory({logo: LOGO, src: HQ, cam: PRE, gameX: 1280 /* right side: chat + the narration toggle */, file: 'gaming/kc_narr_hq.mp4', raw: w_narr as never,
  seam: 'GTA 6 TURNED ON [SCREEN NARRATION]', emoji: '1f62d', music: 'tak-tak.mp3', musicLevel: 0.32, hi: {no: R, narration: Y, god: C, off: R},
  segs: [[40.4, 48.0], [49.3, 56.1], [57.9, 63.0]],
  game: [[40.4, 1.0, 0.7, 0.9], [42.4, 1.0, 0.7, 0.9], [42.8, 2.0, 0.72, 0.955], [47.9, 1.8, 0.72, 0.955], [49.3, 1.0, 0.7, 0.5], [51.4, 1.0, 0.7, 0.5], [51.8, 2.0, 0.72, 0.955], [56.0, 1.8, 0.72, 0.955], [57.9, 1.0], [63.0, 1.2]],
  face: [[40.4, 1.0], [43.4, 1.0], [43.6, 1.3], [45.4, 1.3], [45.6, 1.45], [48.0, 1.2], [49.3, 1.0], [52.5, 1.0], [52.7, 1.4], [56.0, 1.2], [57.9, 1.0], [58.0, 1.35], [63.0, 1.15]],
  hits: [[42.6, 'g-sudden-suspense-sound-effect', 'red'], [45.5, 'bruh'], [52.6, 'g-fahhh-sfx', 'red'], [55.6, 'bass-boosted-vine-boom'], [58.1, 'g-akward-sfx']]});
export const KcNarr = KC_NARR.Comp;
