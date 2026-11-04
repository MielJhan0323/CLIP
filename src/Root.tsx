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
  {E3_CLIPS.map(([id, C, ms]) => <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />)}
  {([['JorhoPeyton', JorhoPeyton, PEYTON_MS], ['JorhoGolf', JorhoGolf, GOLF_MS], ['JorhoRedeem', JorhoRedeem, REDEEM_MS], ['JorhoCoen', JorhoCoen, COEN_MS],
    ['JorhoAnt', JorhoAnt, ANT_MS], ['JorhoJosh', JorhoJosh, JOSH_MS], ['JorhoTrav', JorhoTrav, TRAV_MS],
    ['JorhoLefty', JorhoLefty, LEFTY_J_MS], ['JorhoTicket', JorhoTicket, TICKET_J_MS], ['JorhoCelly', JorhoCelly, CELLY_J_MS],
    ['JorhoTigerGift', JorhoTigerGift, TIGER_J_MS], ['JorhoEnters', JorhoEnters, ENTERS_J_MS], ['JorhoV2Celly', JorhoV2Celly, V2_CELLY_MS], ['JorhoTicketLight', JorhoTicketLight, TICKET_J_MS], ['JorhoFormulaAnt', JorhoFormulaAnt, FORMULA_MS], ['JorhoNbaGoat', JorhoNbaGoat, NBAGOAT_MS], ['JorhoPlaybookDemo', JorhoPlaybookDemo, PLAYBOOK_DEMO_MS], ['JorhoLeftyVO', JorhoLeftyVO, LEFTY_VO_MS],
    ['B7NbaGoat', B7NbaGoat, B7_NBA_MS], ['B7Peyton', B7Peyton, B7_PEYTON_MS], ['B7Redeem', B7Redeem, B7_REDEEM_MS], ['B7Golf', B7Golf, B7_GOLF_MS], ['B7Coen', B7Coen, B7_COEN_MS]] as const).map(([id, C, ms]) => (
    <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />))}
  </>
);
