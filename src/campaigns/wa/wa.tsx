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
// 3 more (2026-11-20 "4 clips … high virality, actual focus"): one topic each, centred captions, typing hook, no SFX.
import wR from '../../../public/wa/RZA9x16.words.json';
import wM from '../../../public/wa/matthew.words.json';
const R9 = 'wa/RZA9x16.mp4', M = 'wa/matthew.mp4';
const waBase = {capY: 960, typeMs: 30, typeLead: 0, noSfx: true, hl: '#FF5A1F'} as const;
// the legend trailer: payoff line first, then the story. The narrator is not named (never imply The RZA wrote/voiced anything not shown).
export const WA_LEGEND = makeKit({...waBase, hook: 'ONLY ONE [PEANUT] CARRIED HIS NAME', emoji: '1f95c', words: {[R9]: wR as never}, fix: {"what's": 'WA-CHAA!', up: ''},
  segs: [[R9, 15.8, 18.8], [R9, 1.3, 5.4], [R9, 12.9, 15.6], [R9, 20.0, 28.2], [R9, 28.5, 37.5]]});
// the vinyl: The RZA shows it, then the animated zoetrope record spinning
export const WA_VINYL = makeKit({...waBase, hook: 'THESE PEANUTS COME WITH A [VINYL]', emoji: '1f95c', words: {[F]: wF as never}, fix: {watch: 'WA-CHAA,'},
  segs: [[Z, 8.0, 10.2], [F, 3.0, 7.6], [Z, 0.0, 6.0], [Z, 11.5, 18.0]]});
// a fan's first try (organic: his "click the link" lines are cut)
export const WA_MATTHEW = makeKit({...waBase, hook: '"SO FAR IT\'S [FINE]"', emoji: '1f336', words: {[M]: wM as never},
  segs: [[M, 24.7, 27.7], [M, 2.0, 6.3], [M, 10.7, 13.6], [M, 16.1, 24.6], [M, 54.1, 59.4], [M, 33.5, 37.3]]});
export const WaLegend = WA_LEGEND.Comp, WaVinyl = WA_VINYL.Comp, WaMatthew = WA_MATTHEW.Comp;
