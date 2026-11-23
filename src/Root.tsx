import {Composition} from 'remotion';
import {CARD_OUT_MS, CardPull} from './CardPull';
import {SRC as POD_SRC} from './activePod';
import {FPS, OUT_MS, ShortEdit} from './ShortEdit';
import {MG_FPS, MG_OUT_MS, MotionPod} from './MotionPod';
import {E2_FPS, E2_OUT_MS, Edit2} from './Edit2';
import {CV_FPS, CV_OUT_MS, E2Coverage} from './E2Coverage';
import {E3_FPS, E3_OUT_MS, E3Ant} from './E3Ant';
import {E3_CLIPS} from './e3/clips';
import {B9NbaGoatV2, B9_NBA_V2_MS} from './jorho/batch9';
import {Demo13, DEMO13_MS} from './jorho/demo13';
import {Demo14, DEMO14_MS} from './jorho/demo14';
import {Demo15, DEMO15_MS} from './jorho/demo15';
import {FullPilatesQ, FullTuck, FullSpider, FullRespect, FullExcited, FULL_PILATESQ, FULL_TUCK, FULL_SPIDER, FULL_RESPECT, FULL_EXCITED} from './campaigns/neon_clip/full';
import {SegaDemo, SEGA_DEMO, SegaSonic, SEGA_SONIC, SegaJrpg, SEGA_JRPG, SegaStrat, SEGA_STRAT, SegaCount, SEGA_COUNT, SegaIntro, SEGA_INTRO} from './campaigns/sega/sega';
import {WaHeat, WA_HEAT, WaLegend, WA_LEGEND, WaVinyl, WA_VINYL, WaMatthew, WA_MATTHEW} from './campaigns/wa/wa';
import {YlaAura, YLA_AURA, YlaBank, YLA_BANK, YlaJohnny, YLA_JOHNNY, YlaCheck, YLA_CHECK, YlaLate, YLA_LATE, YlaMarlin, YLA_MARLIN, YlaJay, YLA_JAY} from './campaigns/yla/yla';
import {JoJoseph, JO_JOSEPH, JoFred, JO_FRED, JoBlue, JO_BLUE, JoDeer, JO_DEER, JoTitle, JO_TITLE, JoNuggets, JO_NUGGETS, JoLie, JO_LIE, JoMom, JO_MOM, JoTeeth, JO_TEETH, JoShelter, JO_SHELTER, JoPay, JO_PAY, JoRunaway, JO_RUNAWAY, JoMix, JO_MIX, JoBurger, JO_BURGER, JoHardlove, JO_HARDLOVE} from './campaigns/jo/jo';
import {KitTax, KIT_TAX, KitMom, KIT_MOM, KitLast, KIT_LAST} from './campaigns/kit/kits';
import {KcScooter, KC_SCOOTER, KcSeaplane, KC_SEAPLANE, KcSwamp, KC_SWAMP, KcAlert, KC_ALERT, KcCountdown, KC_COUNTDOWN, KcAtv, KC_ATV, KcTiktok, KC_TIKTOK, KcBanned, KC_BANNED, KcSteal, KC_STEAL, KcDog, KC_DOG, KcLucia, KC_LUCIA, KcShark, KC_SHARK, KcDog2, KC_DOG2, KcShoe, KC_SHOE, KcDonate, KC_DONATE, KcNarr, KC_NARR, KcRob, KC_ROB, KcBath, KC_BATH, KcClub, KC_CLUB, KcDudes, KC_DUDES, KcNakedw, KC_NAKEDW, KcWife, KC_WIFE, KcBanned2, KC_BANNED2} from './campaigns/gaming/kc';
import {RefBet, RefTrust, RefSue, RefAsked, RefExcited, REF_BET, REF_TRUST, REF_SUE, REF_ASKED, REF_EXCITED} from './campaigns/neon_clip/ref';
import {RefClose, RefChatgpt, RefPole, REF_CLOSE, REF_CHATGPT, REF_POLE} from './campaigns/neon_clip/ref';
import {RefSlower, RefDream, RefSquats, RefWax, RefScam, REF_SLOWER, REF_DREAM, REF_SQUATS, REF_WAX, REF_SCAM} from './campaigns/neon_clip/ref';
import {RefJoke, RefSlip, RefDown100, RefFart, RefHard, REF_JOKE, REF_SLIP, REF_DOWN100, REF_FART, REF_HARD} from './campaigns/neon_clip/ref';
import {B17Rookie, B17Playbook, B17Left, B17Gift, B17Jesus, B17Marino, B17Sweat, B17_ROOKIE_MS, B17_PLAYBOOK_MS, B17_LEFT_MS, B17_GIFT_MS, B17_JESUS_MS, B17_MARINO_MS, B17_SWEAT_MS} from './jorho/batch17';
import {B18Fields, B18Josh, B18Presnap, B18_FIELDS_MS, B18_JOSH_MS, B18_PRESNAP_MS} from './jorho/batch18';
import {B19Presnap, B19Coen, B19Gift, B19_PRESNAP_MS, B19_COEN_MS, B19_GIFT_MS} from './jorho/batch19';
import {B20Playbook, B20Patch, B20Peyton, B20Golf, B20Marino, B20Ticket, B20Ant, B20Whacked, B20Celly, B20Neck, B20_MS} from './jorho/batch20';
import {B21Rogers, B21Lair, B21Sig, B21_MS} from './jorho/batch21';
import {B26Packs, B26Goat, B26Ant, B26Mills, B26Exmate, B26_MS} from './jorho/batch26';
import {B28Lefty, B28Peyton, B28Rogers, B28Colts, B28Closet, B28Playbook, B28Coen, B28_MS} from './jorho/batch28';
import {B27Jesus, B27Gift, B27Whack, B27Celly, B27Fields, B27Ew, B27_MS} from './jorho/batch27';
import {B25Packs, B25Goat, B25Ant, B25Mills, B25Exmate, B25_MS} from './jorho/batch25';
import {B24Packs, B24Redeem, B24Goat, B24Ant, B24Mills, B24Exmate, B24Lair, B24Rogers, B24Coen, B24Celly, B24_MS} from './jorho/batch24';
import {B23Packs, B23Redeem, B23Goat, B23Ant, B23Mills, B23Exmate, B23Lair, B23Rogers, B23Coen, B23Celly, B23_MS} from './jorho/batch23';
import {B22Tiger, B22Closet, B22Dontshow, B22Pen, B22Plan, B22_MS} from './jorho/batch22';
import {B16Signature, B16Rookie, B16Ant, B16Playbook, B16Left, B16_SIG_MS, B16_ROOKIE_MS, B16_ANT_MS, B16_PLAYBOOK_MS, B16_LEFT_MS, B16Davis, B16Gift, B16Jesus, B16Marino, B16Sweat, B16_DAVIS_MS, B16_GIFT_MS, B16_JESUS_MS, B16_MARINO_MS, B16_SWEAT_MS} from './jorho/batch16';
import {B15Signature, B15Rookie, B15Ant, B15Playbook, B15Left, B15_SIG_MS, B15_ROOKIE_MS, B15_ANT_MS, B15_PLAYBOOK_MS, B15_LEFT_MS} from './jorho/batch15';
import {B14Judge, B14Murakami, B14Randy, B14_JUDGE_MS, B14_MURA_MS, B14_RANDY_MS, B14Patch, B14Sweat, B14Marino, B14_PATCH_MS, B14_SWEAT_MS, B14_MARINO_MS, B14Rpa, B14_RPA_MS} from './jorho/batch14';
import {NeonCalories, NeonObnoxious, NeonPole, NEON_CAL_MS, NEON_OB_MS, NEON_POLE_MS, NeonBet, NeonPilates, NeonHeadstand, NeonBathroom, NeonWax, NEON_BET_MS, NEON_PILATES_MS, NEON_HEADSTAND_MS, NEON_BATHROOM_MS, NEON_WAX_MS, NeonPilatesQ, NeonTuck, NeonSpider, NeonRespect, NeonExcited, NEON_PILATESQ_MS, NEON_TUCK_MS, NEON_SPIDER_MS, NEON_RESPECT_MS, NEON_EXCITED_MS, NeonFeedPilatesQ, NeonFeedTuck, NeonFeedSpider, NeonFeedRespect, NeonFeedExcited, NEON_F_PILATESQ_MS, NEON_F_TUCK_MS, NEON_F_SPIDER_MS, NEON_F_RESPECT_MS, NEON_F_EXCITED_MS} from './campaigns/neon_clip/neon';
import {FomoBowling, FomoChainlink, FomoLoss, FomoRansom, FomoReveal, FOMO_BOWLING_MS, FOMO_CHAINLINK_MS, FOMO_LOSS_MS, FOMO_RANSOM_MS, FOMO_REVEAL_MS, FomoIceBath, FomoYoungMaurits, FomoAvocado, FomoFlex, FOMO_FLEX_MS, FOMO_ICE_MS, FOMO_YOUNG_MS, FOMO_AVOCADO_MS} from './campaigns/fomo_clip/fomo';
import {B13Artist, B13Cards, B13King, B13Rookie, B13Tiger, B13_ARTIST_MS, B13_CARDS_MS, B13_KING_MS, B13_ROOKIE_MS, B13_TIGER_MS} from './jorho/batch13';
import {B12Davis, B12Josh, B12Lefty, B12Ticket, B12_DAVIS_MS, B12_JOSH_MS, B12_LEFTY_MS, B12_TICKET_MS} from './jorho/batch12';
import {J11Algo, J11Closet, J11GodGiven, J11Rookie, J11Stapleton, J11_ALGO_MS, J11_CLOSET_MS, J11_GOD_MS, J11_ROOKIE_MS, J11_STAPLETON_MS} from './jorho/batch11';
import {B10Ant, B10Coen, B10Golf, B10Peyton, B10Trav, B10_ANT_MS, B10_COEN_MS, B10_GOLF_MS, B10_PEYTON_MS, B10_TRAV_MS} from './jorho/batch10';
import {B8Davis, B8_DAVIS_MS, B8NatTreasures, B8_NT_MS, B8Rogers, B8_ROGERS_MS, B8Lair, B8_LAIR_MS, B8Playbook, B8_PLAYBOOK_MS, B8Presnap, B8_PRESNAP_MS, B8RedeemV2, B8_REDEEM_V2_MS} from './jorho/batch8';
import {JorhoV2Celly, V2_CELLY_MS} from './jorho/v2';
import {JA_OHTANI_MS, JaOhtani} from './justinaugh/clips';
import {JA_CADE, JA_CLARK, JA_DART, JA_FLAGG, JA_KON, JA_LEBRON, JA_MAHOMES, JA_STARWARS, JA_PURDY, JA_TLKABOOM, JA_HUNTER, JA_CALEB} from './justinaugh/batch';
import {CELLY_J_MS, ENTERS_J_MS, JorhoCelly, JorhoEnters, JorhoLefty, JorhoTicket, JorhoTicketLight, JorhoFormulaAnt, FORMULA_MS, JorhoNbaGoat, NBAGOAT_MS, JorhoPlaybookDemo, PLAYBOOK_DEMO_MS, JorhoLeftyVO, LEFTY_VO_MS, B7NbaGoat, B7_NBA_MS, B7Peyton, B7_PEYTON_MS, B7Redeem, B7_REDEEM_MS, B7Golf, B7_GOLF_MS, B7Coen, B7_COEN_MS, JorhoTigerGift, LEFTY_J_MS, TICKET_J_MS, TIGER_J_MS} from './jorho/clips';
import {ANT_MS, COEN_MS, GOLF_MS, JOSH_MS, JorhoAnt, JorhoCoen, JorhoGolf, JorhoJosh, JorhoPeyton, JorhoRedeem, JorhoTrav, PEYTON_MS, REDEEM_MS, TRAV_MS} from './jorho/clips';

export const RemotionRoot = () => (
  <>
  <Composition
    id="ShortEdit"
    component={ShortEdit}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((OUT_MS / 1000) * FPS)}
    defaultProps={{src: POD_SRC}}
  />
  <Composition
    id="CardPull"
    component={CardPull}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((CARD_OUT_MS / 1000) * FPS)}
  />
  <Composition
    id="MotionPod"
    component={MotionPod}
    fps={MG_FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((MG_OUT_MS / 1000) * MG_FPS)}
  />
  <Composition
    id="Edit2"
    component={Edit2}
    fps={E2_FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((E2_OUT_MS / 1000) * E2_FPS)}
  />
  <Composition
    id="E2Coverage"
    component={E2Coverage}
    fps={CV_FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((CV_OUT_MS / 1000) * CV_FPS)}
  />
  <Composition
    id="E3Ant"
    component={E3Ant}
    fps={E3_FPS}
    width={1080}
    height={1920}
    durationInFrames={Math.round((E3_OUT_MS / 1000) * E3_FPS)}
  />
  <Composition id="JaOhtani" component={JaOhtani} fps={30} width={1080} height={1920} durationInFrames={Math.round((JA_OHTANI_MS / 1000) * 30)} />
  {([['JaMahomes', JA_MAHOMES], ['JaFlagg', JA_FLAGG], ['JaLebron', JA_LEBRON], ['JaStarwars', JA_STARWARS], ['JaDart', JA_DART], ['JaKon', JA_KON], ['JaClark', JA_CLARK], ['JaCade', JA_CADE], ['JaPurdy', JA_PURDY], ['JaTlKaboom', JA_TLKABOOM], ['JaHunter', JA_HUNTER], ['JaCaleb', JA_CALEB]] as const).map(([id, j]) => (
    <Composition key={id} id={id} component={j.C} fps={30} width={1080} height={1920} durationInFrames={Math.round((j.total / 1000) * 30)} />))}
  {([['B8Davis', B8Davis, B8_DAVIS_MS], ['B8NatTreasures', B8NatTreasures, B8_NT_MS], ['B8Rogers', B8Rogers, B8_ROGERS_MS], ['B8Lair', B8Lair, B8_LAIR_MS],
    ['B8Playbook', B8Playbook, B8_PLAYBOOK_MS], ['B8Presnap', B8Presnap, B8_PRESNAP_MS], ['B8RedeemV2', B8RedeemV2, B8_REDEEM_V2_MS]] as const).map(([id, C, ms]) => (
    <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />))}
  <Composition id="B9NbaGoatV2" component={B9NbaGoatV2} fps={30} width={1080} height={1920} durationInFrames={Math.round((B9_NBA_V2_MS / 1000) * 30)} />
  <Composition id="B10Peyton" component={B10Peyton} fps={30} width={1080} height={1920} durationInFrames={Math.round((B10_PEYTON_MS / 1000) * 30)} />
  <Composition id="B10Golf" component={B10Golf} fps={30} width={1080} height={1920} durationInFrames={Math.round((B10_GOLF_MS / 1000) * 30)} />
  <Composition id="B10Coen" component={B10Coen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B10_COEN_MS / 1000) * 30)} />
  <Composition id="B10Ant" component={B10Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B10_ANT_MS / 1000) * 30)} />
  <Composition id="B10Trav" component={B10Trav} fps={30} width={1080} height={1920} durationInFrames={Math.round((B10_TRAV_MS / 1000) * 30)} />
  <Composition id="J11Rookie" component={J11Rookie} fps={30} width={1080} height={1920} durationInFrames={Math.round((J11_ROOKIE_MS / 1000) * 30)} />
  <Composition id="J11Stapleton" component={J11Stapleton} fps={30} width={1080} height={1920} durationInFrames={Math.round((J11_STAPLETON_MS / 1000) * 30)} />
  <Composition id="J11GodGiven" component={J11GodGiven} fps={30} width={1080} height={1920} durationInFrames={Math.round((J11_GOD_MS / 1000) * 30)} />
  <Composition id="J11Closet" component={J11Closet} fps={30} width={1080} height={1920} durationInFrames={Math.round((J11_CLOSET_MS / 1000) * 30)} />
  <Composition id="J11Algo" component={J11Algo} fps={30} width={1080} height={1920} durationInFrames={Math.round((J11_ALGO_MS / 1000) * 30)} />
  <Composition id="B12Davis" component={B12Davis} fps={30} width={1080} height={1920} durationInFrames={Math.round((B12_DAVIS_MS / 1000) * 30)} />
  <Composition id="B12Josh" component={B12Josh} fps={30} width={1080} height={1920} durationInFrames={Math.round((B12_JOSH_MS / 1000) * 30)} />
  <Composition id="B12Ticket" component={B12Ticket} fps={30} width={1080} height={1920} durationInFrames={Math.round((B12_TICKET_MS / 1000) * 30)} />
  <Composition id="B12Lefty" component={B12Lefty} fps={30} width={1080} height={1920} durationInFrames={Math.round((B12_LEFTY_MS / 1000) * 30)} />
  <Composition id="Demo13" component={Demo13} fps={30} width={1080} height={1920} durationInFrames={Math.round((DEMO13_MS / 1000) * 30)} />
  <Composition id="Demo14" component={Demo14} fps={30} width={1080} height={1920} durationInFrames={Math.round((DEMO14_MS / 1000) * 30)} />
  <Composition id="Demo15" component={Demo15} fps={30} width={1080} height={1920} durationInFrames={Math.round((DEMO15_MS / 1000) * 30)} />
  <Composition id="NeonPole" component={NeonPole} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_POLE_MS / 1000) * 30)} />
  <Composition id="NeonCalories" component={NeonCalories} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_CAL_MS / 1000) * 30)} />
  <Composition id="NeonObnoxious" component={NeonObnoxious} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_OB_MS / 1000) * 30)} />
  <Composition id="NeonBet" component={NeonBet} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_BET_MS / 1000) * 30)} />
  <Composition id="NeonPilates" component={NeonPilates} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_PILATES_MS / 1000) * 30)} />
  <Composition id="NeonHeadstand" component={NeonHeadstand} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_HEADSTAND_MS / 1000) * 30)} />
  <Composition id="NeonBathroom" component={NeonBathroom} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_BATHROOM_MS / 1000) * 30)} />
  <Composition id="NeonWax" component={NeonWax} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_WAX_MS / 1000) * 30)} />
  <Composition id="NeonPilatesQ" component={NeonPilatesQ} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_PILATESQ_MS / 1000) * 30)} />
  <Composition id="NeonTuck" component={NeonTuck} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_TUCK_MS / 1000) * 30)} />
  <Composition id="NeonSpider" component={NeonSpider} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_SPIDER_MS / 1000) * 30)} />
  <Composition id="NeonRespect" component={NeonRespect} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_RESPECT_MS / 1000) * 30)} />
  <Composition id="NeonExcited" component={NeonExcited} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_EXCITED_MS / 1000) * 30)} />
  <Composition id="NeonFeedPilatesQ" component={NeonFeedPilatesQ} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_F_PILATESQ_MS / 1000) * 30)} />
  <Composition id="NeonFeedTuck" component={NeonFeedTuck} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_F_TUCK_MS / 1000) * 30)} />
  <Composition id="NeonFeedSpider" component={NeonFeedSpider} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_F_SPIDER_MS / 1000) * 30)} />
  <Composition id="NeonFeedRespect" component={NeonFeedRespect} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_F_RESPECT_MS / 1000) * 30)} />
  <Composition id="NeonFeedExcited" component={NeonFeedExcited} fps={30} width={1080} height={1920} durationInFrames={Math.round((NEON_F_EXCITED_MS / 1000) * 30)} />
  <Composition id="FullPilatesQ" component={FullPilatesQ} fps={30} width={1080} height={1920} durationInFrames={Math.round((FULL_PILATESQ.total / 1000) * 30)} />
  <Composition id="FullTuck" component={FullTuck} fps={30} width={1080} height={1920} durationInFrames={Math.round((FULL_TUCK.total / 1000) * 30)} />
  <Composition id="RefClose" component={RefClose} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_CLOSE.total / 1000) * 30)} />
  <Composition id="RefChatgpt" component={RefChatgpt} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_CHATGPT.total / 1000) * 30)} />
  <Composition id="RefPole" component={RefPole} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_POLE.total / 1000) * 30)} />
  <Composition id="RefJoke" component={RefJoke} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_JOKE.total / 1000) * 30)} />
  <Composition id="RefSlip" component={RefSlip} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_SLIP.total / 1000) * 30)} />
  <Composition id="RefDown100" component={RefDown100} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_DOWN100.total / 1000) * 30)} />
  <Composition id="RefFart" component={RefFart} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_FART.total / 1000) * 30)} />
  <Composition id="RefHard" component={RefHard} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_HARD.total / 1000) * 30)} />
  <Composition id="RefSlower" component={RefSlower} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_SLOWER.total / 1000) * 30)} />
  <Composition id="RefDream" component={RefDream} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_DREAM.total / 1000) * 30)} />
  <Composition id="RefSquats" component={RefSquats} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_SQUATS.total / 1000) * 30)} />
  <Composition id="RefWax" component={RefWax} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_WAX.total / 1000) * 30)} />
  <Composition id="RefScam" component={RefScam} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_SCAM.total / 1000) * 30)} />
  <Composition id="RefBet" component={RefBet} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_BET.total / 1000) * 30)} />
  <Composition id="RefTrust" component={RefTrust} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_TRUST.total / 1000) * 30)} />
  <Composition id="RefSue" component={RefSue} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_SUE.total / 1000) * 30)} />
  <Composition id="RefAsked" component={RefAsked} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_ASKED.total / 1000) * 30)} />
  <Composition id="RefExcited" component={RefExcited} fps={30} width={1080} height={1920} durationInFrames={Math.round((REF_EXCITED.total / 1000) * 30)} />
  <Composition id="KcScooter" component={KcScooter} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_SCOOTER.total / 1000) * 30)} />
  <Composition id="KcSeaplane" component={KcSeaplane} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_SEAPLANE.total / 1000) * 30)} />
  <Composition id="KcSwamp" component={KcSwamp} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_SWAMP.total / 1000) * 30)} />
  <Composition id="KcAlert" component={KcAlert} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_ALERT.total / 1000) * 30)} />
  <Composition id="KcCountdown" component={KcCountdown} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_COUNTDOWN.total / 1000) * 30)} />
  <Composition id="JoJoseph" component={JoJoseph} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_JOSEPH.total / 1000) * 30)} />
  <Composition id="JoFred" component={JoFred} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_FRED.total / 1000) * 30)} />
  <Composition id="JoBlue" component={JoBlue} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_BLUE.total / 1000) * 30)} />
  <Composition id="JoDeer" component={JoDeer} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_DEER.total / 1000) * 30)} />
  <Composition id="JoNuggets" component={JoNuggets} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_NUGGETS.total / 1000) * 30)} />
  <Composition id="JoLie" component={JoLie} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_LIE.total / 1000) * 30)} />
  <Composition id="JoMom" component={JoMom} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_MOM.total / 1000) * 30)} />
  <Composition id="JoTeeth" component={JoTeeth} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_TEETH.total / 1000) * 30)} />
  <Composition id="JoShelter" component={JoShelter} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_SHELTER.total / 1000) * 30)} />
  <Composition id="JoPay" component={JoPay} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_PAY.total / 1000) * 30)} />
  <Composition id="JoRunaway" component={JoRunaway} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_RUNAWAY.total / 1000) * 30)} />
  <Composition id="JoMix" component={JoMix} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_MIX.total / 1000) * 30)} />
  <Composition id="JoBurger" component={JoBurger} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_BURGER.total / 1000) * 30)} />
  <Composition id="JoHardlove" component={JoHardlove} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_HARDLOVE.total / 1000) * 30)} />
  <Composition id="JoTitle" component={JoTitle} fps={30} width={1080} height={1920} durationInFrames={Math.round((JO_TITLE.total / 1000) * 30)} />
  <Composition id="YlaAura" component={YlaAura} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_AURA.total / 1000) * 30)} />
  <Composition id="YlaBank" component={YlaBank} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_BANK.total / 1000) * 30)} />
  <Composition id="YlaJohnny" component={YlaJohnny} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_JOHNNY.total / 1000) * 30)} />
  <Composition id="YlaCheck" component={YlaCheck} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_CHECK.total / 1000) * 30)} />
  <Composition id="YlaLate" component={YlaLate} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_LATE.total / 1000) * 30)} />
  <Composition id="YlaMarlin" component={YlaMarlin} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_MARLIN.total / 1000) * 30)} />
  <Composition id="YlaJay" component={YlaJay} fps={30} width={1080} height={1920} durationInFrames={Math.round((YLA_JAY.total / 1000) * 30)} />
  <Composition id="WaHeat" component={WaHeat} fps={30} width={1080} height={1920} durationInFrames={Math.round((WA_HEAT.total / 1000) * 30)} />
  <Composition id="WaLegend" component={WaLegend} fps={30} width={1080} height={1920} durationInFrames={Math.round((WA_LEGEND.total / 1000) * 30)} />
  <Composition id="WaVinyl" component={WaVinyl} fps={30} width={1080} height={1920} durationInFrames={Math.round((WA_VINYL.total / 1000) * 30)} />
  <Composition id="WaMatthew" component={WaMatthew} fps={30} width={1080} height={1920} durationInFrames={Math.round((WA_MATTHEW.total / 1000) * 30)} />
  <Composition id="KcDog" component={KcDog} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_DOG.total / 1000) * 30)} />
  <Composition id="KcRob" component={KcRob} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_ROB.total / 1000) * 30)} />
  <Composition id="KcBath" component={KcBath} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_BATH.total / 1000) * 30)} />
  <Composition id="KcClub" component={KcClub} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_CLUB.total / 1000) * 30)} />
  <Composition id="KcDudes" component={KcDudes} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_DUDES.total / 1000) * 30)} />
  <Composition id="KcNakedw" component={KcNakedw} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_NAKEDW.total / 1000) * 30)} />
  <Composition id="KcWife" component={KcWife} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_WIFE.total / 1000) * 30)} />
  <Composition id="KcBanned2" component={KcBanned2} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_BANNED2.total / 1000) * 30)} />
  <Composition id="KcNarr" component={KcNarr} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_NARR.total / 1000) * 30)} />
  <Composition id="KcLucia" component={KcLucia} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_LUCIA.total / 1000) * 30)} />
  <Composition id="KcShark" component={KcShark} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_SHARK.total / 1000) * 30)} />
  <Composition id="KcDog2" component={KcDog2} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_DOG2.total / 1000) * 30)} />
  <Composition id="KcShoe" component={KcShoe} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_SHOE.total / 1000) * 30)} />
  <Composition id="KcDonate" component={KcDonate} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_DONATE.total / 1000) * 30)} />
  <Composition id="SegaDemo" component={SegaDemo} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_DEMO.total / 1000) * 30)} />
  <Composition id="SegaSonic" component={SegaSonic} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_SONIC.total / 1000) * 30)} />
  <Composition id="SegaJrpg" component={SegaJrpg} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_JRPG.total / 1000) * 30)} />
  <Composition id="SegaStrat" component={SegaStrat} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_STRAT.total / 1000) * 30)} />
  <Composition id="SegaCount" component={SegaCount} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_COUNT.total / 1000) * 30)} />
  <Composition id="SegaIntro" component={SegaIntro} fps={30} width={1080} height={1920} durationInFrames={Math.round((SEGA_INTRO.total / 1000) * 30)} />
  <Composition id="KitTax" component={KitTax} fps={30} width={1080} height={1920} durationInFrames={Math.round((KIT_TAX.total / 1000) * 30)} />
  <Composition id="KitMom" component={KitMom} fps={30} width={1080} height={1920} durationInFrames={Math.round((KIT_MOM.total / 1000) * 30)} />
  <Composition id="KitLast" component={KitLast} fps={30} width={1080} height={1920} durationInFrames={Math.round((KIT_LAST.total / 1000) * 30)} />
  <Composition id="KcAtv" component={KcAtv} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_ATV.total / 1000) * 30)} />
  <Composition id="KcTiktok" component={KcTiktok} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_TIKTOK.total / 1000) * 30)} />
  <Composition id="KcBanned" component={KcBanned} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_BANNED.total / 1000) * 30)} />
  <Composition id="KcSteal" component={KcSteal} fps={30} width={1080} height={1920} durationInFrames={Math.round((KC_STEAL.total / 1000) * 30)} />
  <Composition id="FullSpider" component={FullSpider} fps={30} width={1080} height={1920} durationInFrames={Math.round((FULL_SPIDER.total / 1000) * 30)} />
  <Composition id="FullRespect" component={FullRespect} fps={30} width={1080} height={1920} durationInFrames={Math.round((FULL_RESPECT.total / 1000) * 30)} />
  <Composition id="FullExcited" component={FullExcited} fps={30} width={1080} height={1920} durationInFrames={Math.round((FULL_EXCITED.total / 1000) * 30)} />
  <Composition id="FomoReveal" component={FomoReveal} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_REVEAL_MS / 1000) * 30)} />
  <Composition id="FomoBowling" component={FomoBowling} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_BOWLING_MS / 1000) * 30)} />
  <Composition id="FomoLoss" component={FomoLoss} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_LOSS_MS / 1000) * 30)} />
  <Composition id="FomoChainlink" component={FomoChainlink} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_CHAINLINK_MS / 1000) * 30)} />
  <Composition id="FomoRansom" component={FomoRansom} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_RANSOM_MS / 1000) * 30)} />
  <Composition id="FomoIceBath" component={FomoIceBath} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_ICE_MS / 1000) * 30)} />
  <Composition id="FomoYoungMaurits" component={FomoYoungMaurits} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_YOUNG_MS / 1000) * 30)} />
  <Composition id="FomoAvocado" component={FomoAvocado} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_AVOCADO_MS / 1000) * 30)} />
  <Composition id="FomoFlex" component={FomoFlex} fps={30} width={1080} height={1920} durationInFrames={Math.round((FOMO_FLEX_MS / 1000) * 30)} />
  <Composition id="B14Murakami" component={B14Murakami} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_MURA_MS / 1000) * 30)} />
  <Composition id="B14Randy" component={B14Randy} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_RANDY_MS / 1000) * 30)} />
  <Composition id="B14Judge" component={B14Judge} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_JUDGE_MS / 1000) * 30)} />
  <Composition id="B14Patch" component={B14Patch} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_PATCH_MS / 1000) * 30)} />
  <Composition id="B14Sweat" component={B14Sweat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_SWEAT_MS / 1000) * 30)} />
  <Composition id="B14Marino" component={B14Marino} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_MARINO_MS / 1000) * 30)} />
  <Composition id="B14Rpa" component={B14Rpa} fps={30} width={1080} height={1920} durationInFrames={Math.round((B14_RPA_MS / 1000) * 30)} />
  <Composition id="B15Signature" component={B15Signature} fps={30} width={1080} height={1920} durationInFrames={Math.round((B15_SIG_MS / 1000) * 30)} />
  <Composition id="B15Rookie" component={B15Rookie} fps={30} width={1080} height={1920} durationInFrames={Math.round((B15_ROOKIE_MS / 1000) * 30)} />
  <Composition id="B15Ant" component={B15Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B15_ANT_MS / 1000) * 30)} />
  <Composition id="B15Playbook" component={B15Playbook} fps={30} width={1080} height={1920} durationInFrames={Math.round((B15_PLAYBOOK_MS / 1000) * 30)} />
  <Composition id="B15Left" component={B15Left} fps={30} width={1080} height={1920} durationInFrames={Math.round((B15_LEFT_MS / 1000) * 30)} />
  <Composition id="B16Signature" component={B16Signature} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_SIG_MS / 1000) * 30)} />
  <Composition id="B16Rookie" component={B16Rookie} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_ROOKIE_MS / 1000) * 30)} />
  <Composition id="B16Ant" component={B16Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_ANT_MS / 1000) * 30)} />
  <Composition id="B16Playbook" component={B16Playbook} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_PLAYBOOK_MS / 1000) * 30)} />
  <Composition id="B16Left" component={B16Left} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_LEFT_MS / 1000) * 30)} />
  <Composition id="B16Davis" component={B16Davis} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_DAVIS_MS / 1000) * 30)} />
  <Composition id="B16Gift" component={B16Gift} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_GIFT_MS / 1000) * 30)} />
  <Composition id="B16Jesus" component={B16Jesus} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_JESUS_MS / 1000) * 30)} />
  <Composition id="B16Marino" component={B16Marino} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_MARINO_MS / 1000) * 30)} />
  <Composition id="B16Sweat" component={B16Sweat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B16_SWEAT_MS / 1000) * 30)} />
  <Composition id="B17Rookie" component={B17Rookie} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_ROOKIE_MS / 1000) * 30)} />
  <Composition id="B17Playbook" component={B17Playbook} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_PLAYBOOK_MS / 1000) * 30)} />
  <Composition id="B17Left" component={B17Left} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_LEFT_MS / 1000) * 30)} />
  <Composition id="B17Gift" component={B17Gift} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_GIFT_MS / 1000) * 30)} />
  <Composition id="B17Jesus" component={B17Jesus} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_JESUS_MS / 1000) * 30)} />
  <Composition id="B17Marino" component={B17Marino} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_MARINO_MS / 1000) * 30)} />
  <Composition id="B17Sweat" component={B17Sweat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B17_SWEAT_MS / 1000) * 30)} />
  <Composition id="B18Fields" component={B18Fields} fps={30} width={1080} height={1920} durationInFrames={Math.round((B18_FIELDS_MS / 1000) * 30)} />
  <Composition id="B18Josh" component={B18Josh} fps={30} width={1080} height={1920} durationInFrames={Math.round((B18_JOSH_MS / 1000) * 30)} />
  <Composition id="B18Presnap" component={B18Presnap} fps={30} width={1080} height={1920} durationInFrames={Math.round((B18_PRESNAP_MS / 1000) * 30)} />
  <Composition id="B19Presnap" component={B19Presnap} fps={30} width={1080} height={1920} durationInFrames={Math.round((B19_PRESNAP_MS / 1000) * 30)} />
  <Composition id="B19Coen" component={B19Coen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B19_COEN_MS / 1000) * 30)} />
  <Composition id="B19Gift" component={B19Gift} fps={30} width={1080} height={1920} durationInFrames={Math.round((B19_GIFT_MS / 1000) * 30)} />
  <Composition id="B20Playbook" component={B20Playbook} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Playbook / 1000) * 30)} />
  <Composition id="B20Patch" component={B20Patch} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Patch / 1000) * 30)} />
  <Composition id="B20Peyton" component={B20Peyton} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Peyton / 1000) * 30)} />
  <Composition id="B20Golf" component={B20Golf} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Golf / 1000) * 30)} />
  <Composition id="B20Marino" component={B20Marino} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Marino / 1000) * 30)} />
  <Composition id="B20Ticket" component={B20Ticket} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Ticket / 1000) * 30)} />
  <Composition id="B20Ant" component={B20Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Ant / 1000) * 30)} />
  <Composition id="B20Whacked" component={B20Whacked} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Whacked / 1000) * 30)} />
  <Composition id="B20Celly" component={B20Celly} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Celly / 1000) * 30)} />
  <Composition id="B20Neck" component={B20Neck} fps={30} width={1080} height={1920} durationInFrames={Math.round((B20_MS.Neck / 1000) * 30)} />
  <Composition id="B21Rogers" component={B21Rogers} fps={30} width={1080} height={1920} durationInFrames={Math.round((B21_MS.Rogers / 1000) * 30)} />
  <Composition id="B21Lair" component={B21Lair} fps={30} width={1080} height={1920} durationInFrames={Math.round((B21_MS.Lair / 1000) * 30)} />
  <Composition id="B21Sig" component={B21Sig} fps={30} width={1080} height={1920} durationInFrames={Math.round((B21_MS.Sig / 1000) * 30)} />
  <Composition id="B28Lefty" component={B28Lefty} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Lefty / 1000) * 30)} />
  <Composition id="B28Peyton" component={B28Peyton} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Peyton / 1000) * 30)} />
  <Composition id="B28Rogers" component={B28Rogers} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Rogers / 1000) * 30)} />
  <Composition id="B28Colts" component={B28Colts} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Colts / 1000) * 30)} />
  <Composition id="B28Closet" component={B28Closet} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Closet / 1000) * 30)} />
  <Composition id="B28Playbook" component={B28Playbook} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Playbook / 1000) * 30)} />
  <Composition id="B28Coen" component={B28Coen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B28_MS.Coen / 1000) * 30)} />
  <Composition id="B27Jesus" component={B27Jesus} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Jesus / 1000) * 30)} />
  <Composition id="B27Gift" component={B27Gift} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Gift / 1000) * 30)} />
  <Composition id="B27Whack" component={B27Whack} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Whack / 1000) * 30)} />
  <Composition id="B27Celly" component={B27Celly} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Celly / 1000) * 30)} />
  <Composition id="B27Fields" component={B27Fields} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Fields / 1000) * 30)} />
  <Composition id="B27Ew" component={B27Ew} fps={30} width={1080} height={1920} durationInFrames={Math.round((B27_MS.Ew / 1000) * 30)} />
  <Composition id="B26Packs" component={B26Packs} fps={30} width={1080} height={1920} durationInFrames={Math.round((B26_MS.Packs / 1000) * 30)} />
  <Composition id="B26Goat" component={B26Goat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B26_MS.Goat / 1000) * 30)} />
  <Composition id="B26Ant" component={B26Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B26_MS.Ant / 1000) * 30)} />
  <Composition id="B26Mills" component={B26Mills} fps={30} width={1080} height={1920} durationInFrames={Math.round((B26_MS.Mills / 1000) * 30)} />
  <Composition id="B26Exmate" component={B26Exmate} fps={30} width={1080} height={1920} durationInFrames={Math.round((B26_MS.Exmate / 1000) * 30)} />
  <Composition id="B25Packs" component={B25Packs} fps={30} width={1080} height={1920} durationInFrames={Math.round((B25_MS.Packs / 1000) * 30)} />
  <Composition id="B25Goat" component={B25Goat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B25_MS.Goat / 1000) * 30)} />
  <Composition id="B25Ant" component={B25Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B25_MS.Ant / 1000) * 30)} />
  <Composition id="B25Mills" component={B25Mills} fps={30} width={1080} height={1920} durationInFrames={Math.round((B25_MS.Mills / 1000) * 30)} />
  <Composition id="B25Exmate" component={B25Exmate} fps={30} width={1080} height={1920} durationInFrames={Math.round((B25_MS.Exmate / 1000) * 30)} />
  <Composition id="B24Packs" component={B24Packs} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Packs / 1000) * 30)} />
  <Composition id="B24Redeem" component={B24Redeem} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Redeem / 1000) * 30)} />
  <Composition id="B24Goat" component={B24Goat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Goat / 1000) * 30)} />
  <Composition id="B24Ant" component={B24Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Ant / 1000) * 30)} />
  <Composition id="B24Mills" component={B24Mills} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Mills / 1000) * 30)} />
  <Composition id="B24Exmate" component={B24Exmate} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Exmate / 1000) * 30)} />
  <Composition id="B24Lair" component={B24Lair} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Lair / 1000) * 30)} />
  <Composition id="B24Rogers" component={B24Rogers} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Rogers / 1000) * 30)} />
  <Composition id="B24Coen" component={B24Coen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Coen / 1000) * 30)} />
  <Composition id="B24Celly" component={B24Celly} fps={30} width={1080} height={1920} durationInFrames={Math.round((B24_MS.Celly / 1000) * 30)} />
  <Composition id="B23Packs" component={B23Packs} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Packs / 1000) * 30)} />
  <Composition id="B23Redeem" component={B23Redeem} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Redeem / 1000) * 30)} />
  <Composition id="B23Goat" component={B23Goat} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Goat / 1000) * 30)} />
  <Composition id="B23Ant" component={B23Ant} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Ant / 1000) * 30)} />
  <Composition id="B23Mills" component={B23Mills} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Mills / 1000) * 30)} />
  <Composition id="B23Exmate" component={B23Exmate} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Exmate / 1000) * 30)} />
  <Composition id="B23Lair" component={B23Lair} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Lair / 1000) * 30)} />
  <Composition id="B23Rogers" component={B23Rogers} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Rogers / 1000) * 30)} />
  <Composition id="B23Coen" component={B23Coen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Coen / 1000) * 30)} />
  <Composition id="B23Celly" component={B23Celly} fps={30} width={1080} height={1920} durationInFrames={Math.round((B23_MS.Celly / 1000) * 30)} />
  <Composition id="B22Tiger" component={B22Tiger} fps={30} width={1080} height={1920} durationInFrames={Math.round((B22_MS.Tiger / 1000) * 30)} />
  <Composition id="B22Closet" component={B22Closet} fps={30} width={1080} height={1920} durationInFrames={Math.round((B22_MS.Closet / 1000) * 30)} />
  <Composition id="B22Dontshow" component={B22Dontshow} fps={30} width={1080} height={1920} durationInFrames={Math.round((B22_MS.Dontshow / 1000) * 30)} />
  <Composition id="B22Pen" component={B22Pen} fps={30} width={1080} height={1920} durationInFrames={Math.round((B22_MS.Pen / 1000) * 30)} />
  <Composition id="B22Plan" component={B22Plan} fps={30} width={1080} height={1920} durationInFrames={Math.round((B22_MS.Plan / 1000) * 30)} />
  <Composition id="B13Cards" component={B13Cards} fps={30} width={1080} height={1920} durationInFrames={Math.round((B13_CARDS_MS / 1000) * 30)} />
  <Composition id="B13Tiger" component={B13Tiger} fps={30} width={1080} height={1920} durationInFrames={Math.round((B13_TIGER_MS / 1000) * 30)} />
  <Composition id="B13Rookie" component={B13Rookie} fps={30} width={1080} height={1920} durationInFrames={Math.round((B13_ROOKIE_MS / 1000) * 30)} />
  <Composition id="B13Artist" component={B13Artist} fps={30} width={1080} height={1920} durationInFrames={Math.round((B13_ARTIST_MS / 1000) * 30)} />
  <Composition id="B13King" component={B13King} fps={30} width={1080} height={1920} durationInFrames={Math.round((B13_KING_MS / 1000) * 30)} />
  {E3_CLIPS.map(([id, C, ms]) => <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />)}
  {([['JorhoPeyton', JorhoPeyton, PEYTON_MS], ['JorhoGolf', JorhoGolf, GOLF_MS], ['JorhoRedeem', JorhoRedeem, REDEEM_MS], ['JorhoCoen', JorhoCoen, COEN_MS],
    ['JorhoAnt', JorhoAnt, ANT_MS], ['JorhoJosh', JorhoJosh, JOSH_MS], ['JorhoTrav', JorhoTrav, TRAV_MS],
    ['JorhoLefty', JorhoLefty, LEFTY_J_MS], ['JorhoTicket', JorhoTicket, TICKET_J_MS], ['JorhoCelly', JorhoCelly, CELLY_J_MS],
    ['JorhoTigerGift', JorhoTigerGift, TIGER_J_MS], ['JorhoEnters', JorhoEnters, ENTERS_J_MS], ['JorhoV2Celly', JorhoV2Celly, V2_CELLY_MS], ['JorhoTicketLight', JorhoTicketLight, TICKET_J_MS], ['JorhoFormulaAnt', JorhoFormulaAnt, FORMULA_MS], ['JorhoNbaGoat', JorhoNbaGoat, NBAGOAT_MS], ['JorhoPlaybookDemo', JorhoPlaybookDemo, PLAYBOOK_DEMO_MS], ['JorhoLeftyVO', JorhoLeftyVO, LEFTY_VO_MS],
    ['B7NbaGoat', B7NbaGoat, B7_NBA_MS], ['B7Peyton', B7Peyton, B7_PEYTON_MS], ['B7Redeem', B7Redeem, B7_REDEEM_MS], ['B7Golf', B7Golf, B7_GOLF_MS], ['B7Coen', B7Coen, B7_COEN_MS]] as const).map(([id, C, ms]) => (
    <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />))}
  </>
);
