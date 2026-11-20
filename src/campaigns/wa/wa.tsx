// Wa-Chaa x The RZA, Grandmaster Collection (Clipping Culture, 2026-11-20, vault/05 Campaigns/Wa-Chaa/Brief.md).
// Rules: footage only from the official Frame.io folder; tag @wachaaworldwide (TikTok/IG) / @WACHAAWorldwide (YT);
// never say The RZA wrote the track or call it an RZA song (OK: "The RZA recorded the intro"); music allowed but the original
// audio must stay clearly audible; no AI voices; no explicit content; no made-up facts.
import {makeKit} from '../kit/kit';
import wF from '../../../public/wa/RZAFinalHeat35Sec.words.json';
const F = 'wa/RZAFinalHeat35Sec.mp4', Z = 'wa/WACHAA_Zoetrope_Reel_9x16.mp4';
// Sample: The RZA's first taste of the Final Heat. Reaction first (hook), then the setup, the vinyl, the handful, the water.
export const WA_HEAT = makeKit({hook: 'THE RZA TRIES THE [FINAL HEAT] FOR THE FIRST TIME', emoji: '1f336', hl: '#FF5A1F',
  segs: [[F, 22.5, 25.4], [F, 3.0, 7.6], [Z, 4.0, 7.0], [F, 7.8, 12.2], [F, 12.5, 18.0], [F, 28.6, 30.4], [F, 31.6, 34.2]],
  words: {[F]: wF as never}, fix: {watch: 'WA-CHAA,'}, capY: 960, typeMs: 30, typeLead: 0, noSfx: true, // captions centred, hook visibly types out, no pop-up pills (user 2026-11-20: they look AI)
  hits: [[F, 22.7, 'g-sudden-suspense-sound-effect'], [F, 17.5, 'g-anime-wow-sound-effect'], [F, 33.7, 'ding']],});
export const WaHeat = WA_HEAT.Comp;
