import {makeKit} from './kit';
const M = 'kit/kit_main.mp4', B = 'kit/kit_bts1.mp4';
// 1) "Saint Nic tax": sister's gift reveal -> he takes the Kitsch Curl Cream (brief: recommended moment)
export const KIT_TAX = makeKit({hook: 'HE REALLY STOLE THE [KITSCH] CURL CREAM', emoji: '1f62d',
  segs: [[M, 33.07, 35.58], [M, 15.97, 21.7], [M, 27.28, 33.07], [M, 43.59, 47.6]],
  hits: [[M, 34.8, 'g-studio-audience-awwww-sound-fx', 'green'], [M, 18.12, 'g-akward-sfx'], [M, 21.06, 'ding'], [M, 46.34, 'cha-ching', 'green']],
  pills: [[M, 33.1, 2300, 'KITSCH GIFT SET'], [M, 29.4, 2200, 'KITSCH HOLIDAY SET'], [M, 45.8, 1750, 'KITSCH CURL CREAM']]});
// 2) The big drop for Mom
export const KIT_MOM = makeKit({hook: 'MOM GOT THE [BIG] KITSCH DROP', emoji: '1f381',
  segs: [[B, 4.0, 7.0], [M, 3.29, 12.39], [M, 35.58, 43.59]],
  hits: [[B, 4.3, 'cha-ching'], [M, 36.32, 'g-anime-wow-sound-effect'], [M, 40.65, 'slot-jackpot', 'green'], [M, 42.2, 'crowd-cheer', 'green']],
  pills: [[B, 4.2, 2500, 'KITSCH GIFTS'], [M, 40.7, 2700, 'KITSCH HOLIDAY SETS']]});
// 3) Cliffhanger: who is the last gift for? (never name or guess)
export const KIT_LAST = makeKit({hook: "WHO IS SAINT NIC'S [LAST] GIFT FOR?", emoji: '1f440',
  segs: [[M, 48.84, 50.55], [M, 19.39, 27.28], [M, 61.06, 66.07], [M, 66.19, 68.83]],
  hits: [[M, 49.1, 'g-sudden-suspense-sound-effect'], [M, 21.06, 'g-akward-sfx'], [M, 25.9, 'cha-ching', 'green'], [M, 64.1, 'g-studio-audience-awwww-sound-fx', 'green'], [M, 68.0, 'ding']],
  pills: [[M, 48.9, 1600, 'KITSCH GIFT BAG'], [M, 22.7, 2300, 'KITSCH x SAINT NIC']]});
export const KitTax = KIT_TAX.Comp, KitMom = KIT_MOM.Comp, KitLast = KIT_LAST.Comp;
