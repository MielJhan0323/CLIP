// BATCH 30 (2026-11-25) — BYB card-clip REMAKES with the new standing rule: HOOK → make viewers STAY (payoff at the end, progress bar)
// → ENGAGE (end card: the clip's own comment question + LIKE / SUBSCRIBE). On-screen text in the user's YouTube Shorts voice, tied to
// PS5 / GTA 6 (user examples: "Bro could've bought 20 PS5 Pros with this card 💀", "Bro's card value got robbed like GTA 6 💀").
// Numbers are real: PS5 Pro US price $749.99 → $20,000 ≈ 26 PS5 Pros; ~$500 is less than one; $1M ≈ 1,300.
// Same cuts as batches 26–28, new top line, new hook, new song, end card. (The top line already ends with a 💀 emoji.)
import {Jorho} from './clips';
import {make, type Cfg} from './batch17';
import {DT, Rw, PACKS_C, ANT_C, EXMATE_C} from './batch26';
import {GIFT_C, CELLY_C, FIELDS_C, EW_C} from './batch27';
import {CLOSET_C} from './batch28';

type At = (s: number) => number;
const B_PS5 = (o: number, at: At) => <><DT t="$20,000 = ?" />
  <Rw o={o} at={at(129150)} i={0} label="2021: 26 PS5 PROS" ok /><Rw o={o} at={at(129450)} i={1} label="NOW: NOT EVEN 1 PS5 PRO" ok={false} hl /></>;

const re = (c: Cfg, x: Partial<Cfg>) => make({...c, ...x});
const FIELDS = re(FIELDS_C, {top: "Bro could've bought [26 PS5 Pros] with this card", hookText: 'ROBBED LIKE [GTA 6]', music: 'spooky-phonk-fennecxx.mp3',
  cta: 'Would you have sold at $20K?', boards: [{a: 129100, b: 132600, render: B_PS5}]});
const PACKS = re(PACKS_C, {top: 'POV: every pack you rip is just [Trevor]', hookText: 'EVERY CARD IS [TREVOR]', music: 'montagem-pegadora.mp3', cta: 'Would you rip a Trevor-only pack?'});
const EXMATE = re(EXMATE_C, {top: "Pulling your old teammate hits harder than a [GTA 6] trailer", hookText: 'HE PULLED HIS [EX-TEAMMATE]', music: 'funk-sigilo.mp3', cta: 'Tag your old teammate'});
const ANT = re(ANT_C, {top: "Bro's autograph has lower resolution than a [PS1] game", hookText: 'AUTO THE SIZE OF AN [ANT]', music: 'wtf-u-tryna-say.mp3', cta: 'Rate his autograph 1 to 10'});
const GIFT = re(GIFT_C, {top: 'Gifting Trevor himself is like gifting [GTA 6] to Rockstar', hookText: 'THE GIFT WAS… [HIMSELF]', music: 'ts-pmo.mp3', cta: 'Would you gift a player their own card?'});
const CELLY = re(CELLY_C, {top: 'This celly would go harder than the [GTA 6] trailer', hookText: '10… 10… [10!]', music: 'montagem-uranium.mp3', cta: 'Should Trevor do this celly?'});
const EW = re(EW_C, {top: "Trevor looked at this card like it's a [PS4] in 2026", hookText: 'HE SAID [EW]', music: 'spooky-phonk-fennecxx-spooky.mp3', cta: 'Guess whose card it was'});
const CLOSET = re(CLOSET_C, {top: 'This 1 card could buy [1,300 PS5 Pros]', hookText: '1 CARD = [1,300 PS5s]', music: 'tipo-insta-buzeira.mp3', cta: 'Sell it or keep it forever?'});

const C8 = {Fields: FIELDS, Packs: PACKS, Exmate: EXMATE, Ant: ANT, Gift: GIFT, Celly: CELLY, Ew: EW, Closet: CLOSET};
export const B30 = Object.fromEntries(Object.entries(C8).map(([k, v]) => [k, () => <Jorho s={v.spec} />])) as Record<keyof typeof C8, () => React.ReactElement>;
export const B30_MS = Object.fromEntries(Object.entries(C8).map(([k, v]) => [k, v.total])) as Record<keyof typeof C8, number>;
