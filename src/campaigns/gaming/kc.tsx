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
