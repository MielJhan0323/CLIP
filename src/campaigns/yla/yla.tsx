// YoungLA "Bodybuilders vs Models" fashion show (ClipFarm, 2026-11-20, vault/05 Campaigns/YoungLA/Brief.md).
// Organic, funny, ONE topic per clip; YoungLA clothes/logo visible; must not look like an ad; no tags. Wide interview layout.
import {makeKit, type KitCfg} from '../kit/kit';
import wY from '../../../public/yla/yla.words.json';
const Y = 'yla/yla.mp4';
const base: Partial<KitCfg> = {words: {[Y]: wY as never}, wide: 1.3, hookTop: 300, capY: 1430, typeMs: 30, typeLead: 0, noSfx: true, hl: '#F9FC35'};
const mk = (hook: string, segs: [number, number][], fix?: Record<string, string>) => makeKit({...base, hook, segs: segs.map(([a, b]) => [Y, a, b]), fix} as KitCfg);
export const YLA_AURA = mk('THE MOST [AURA] AT THE FASHION SHOW GOES TO…', [[847.4, 850.0], [824.5, 829.9], [838.5, 846.4], [850.8, 863.7], [865.2, 867.4]], {oral: 'aura'});
export const YLA_BANK = mk('HIS BANK ACCOUNT WAS AT [-$152,000]', [[763.9, 768.0], [753.0, 756.4], [769.6, 780.0]]);
export const YLA_JOHNNY = mk("[JOHNNY'S] AURA HITS DIFFERENT IN PERSON", [[415.3, 419.2], [420.4, 445.0]]);
export const YLA_CHECK = mk('WHAT WOULD YOU BUY WITH [$1,000,000]?', [[613.2, 614.6], [569.7, 572.6], [586.5, 591.1], [606.0, 613.0]]);
export const YLA_LATE = mk('SHOWED UP [3 HOURS LATE] TO THE FASHION SHOW', [[506.1, 519.7], [520.0, 525.1], [527.0, 529.1]], {aaron: 'Aaron'});
export const YLA_MARLIN = mk('A [BURBERRY] MODEL RATES THIS RUNWAY', [[284.0, 286.3], [265.0, 275.0], [276.6, 283.9]]);
export const YLA_JAY = mk("JAY CUTLER'S [FIRST] FASHION SHOW", [[1066.2, 1067.8], [1061.4, 1066.1], [1093.6, 1105.4], [1139.3, 1145.6]]);
export const YlaAura = YLA_AURA.Comp, YlaBank = YLA_BANK.Comp, YlaJohnny = YLA_JOHNNY.Comp, YlaCheck = YLA_CHECK.Comp, YlaLate = YLA_LATE.Comp, YlaMarlin = YLA_MARLIN.Comp, YlaJay = YLA_JAY.Comp;
