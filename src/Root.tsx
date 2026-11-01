import {Composition} from 'remotion';
import {CARD_OUT_MS, CardPull} from './CardPull';
import {SRC as POD_SRC} from './activePod';
import {FPS, OUT_MS, ShortEdit} from './ShortEdit';
import {MG_FPS, MG_OUT_MS, MotionPod} from './MotionPod';
import {E2_FPS, E2_OUT_MS, Edit2} from './Edit2';
import {CV_FPS, CV_OUT_MS, E2Coverage} from './E2Coverage';
import {E3_FPS, E3_OUT_MS, E3Ant} from './E3Ant';
import {E3_CLIPS} from './e3/clips';
import {JorhoV2Celly, V2_CELLY_MS} from './jorho/v2';
import {JA_OHTANI_MS, JaOhtani} from './justinaugh/clips';
import {JA_DART, JA_FLAGG, JA_LEBRON, JA_MAHOMES, JA_STARWARS} from './justinaugh/batch';
import {CELLY_J_MS, ENTERS_J_MS, JorhoCelly, JorhoEnters, JorhoLefty, JorhoTicket, JorhoTicketLight, JorhoFormulaAnt, FORMULA_MS, JorhoTigerGift, LEFTY_J_MS, TICKET_J_MS, TIGER_J_MS} from './jorho/clips';
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
  {([['JaMahomes', JA_MAHOMES], ['JaFlagg', JA_FLAGG], ['JaLebron', JA_LEBRON], ['JaStarwars', JA_STARWARS], ['JaDart', JA_DART]] as const).map(([id, j]) => (
    <Composition key={id} id={id} component={j.C} fps={30} width={1080} height={1920} durationInFrames={Math.round((j.total / 1000) * 30)} />))}
  {E3_CLIPS.map(([id, C, ms]) => <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />)}
  {([['JorhoPeyton', JorhoPeyton, PEYTON_MS], ['JorhoGolf', JorhoGolf, GOLF_MS], ['JorhoRedeem', JorhoRedeem, REDEEM_MS], ['JorhoCoen', JorhoCoen, COEN_MS],
    ['JorhoAnt', JorhoAnt, ANT_MS], ['JorhoJosh', JorhoJosh, JOSH_MS], ['JorhoTrav', JorhoTrav, TRAV_MS],
    ['JorhoLefty', JorhoLefty, LEFTY_J_MS], ['JorhoTicket', JorhoTicket, TICKET_J_MS], ['JorhoCelly', JorhoCelly, CELLY_J_MS],
    ['JorhoTigerGift', JorhoTigerGift, TIGER_J_MS], ['JorhoEnters', JorhoEnters, ENTERS_J_MS], ['JorhoV2Celly', JorhoV2Celly, V2_CELLY_MS], ['JorhoTicketLight', JorhoTicketLight, TICKET_J_MS], ['JorhoFormulaAnt', JorhoFormulaAnt, FORMULA_MS]] as const).map(([id, C, ms]) => (
    <Composition key={id} id={id} component={C} fps={30} width={1080} height={1920} durationInFrames={Math.round((ms / 1000) * 30)} />))}
  </>
);
