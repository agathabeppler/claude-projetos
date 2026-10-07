import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {DURACAO_S, FPS} from './projeto/timeline';
import {CallGif, GIF_DUR, GIF_FPS, GIF_H, GIF_W} from './exemplos/ligacoes-whatsapp/CallGif';
import {TUTORIAL_DUR, TutorialStudio} from './exemplos/tutorial-studio/TutorialStudio';
import {LPS} from './lps';
import {FPS as LP_FPS} from './lps/LPVideo';
import {LPComp} from './lps';
import './theme';

export const Root: React.FC = () => (
  <>
    {/* Vídeo do projeto atual (edite src/projeto/timeline.ts e src/projeto/cenas.tsx) */}
    <Composition id="Video" component={Video} durationInFrames={Math.round(DURACAO_S * FPS)} fps={FPS} width={1920} height={1080} />
    {/* Exemplo de GIF de produto (260x346), desenhado em 3,346x e reduzido na exportação */}
    <Composition id="GifExemplo" component={CallGif} durationInFrames={Math.round(GIF_DUR * GIF_FPS)} fps={GIF_FPS} width={GIF_W} height={GIF_H} />
    {/* Vídeo tutorial do próprio kit */}
    <Composition id="TutorialStudio" component={TutorialStudio} durationInFrames={Math.round(TUTORIAL_DUR * 30)} fps={30} width={1920} height={1080} />
    {/* Vídeos das LPs do Programa de Parceiros (src/lps/) */}
    {LPS.map((lp) => (
      <Composition key={lp.id} id={lp.id} component={LPComp} defaultProps={{id: lp.id}} durationInFrames={Math.round(lp.dur * LP_FPS)} fps={LP_FPS} width={1920} height={1080} />
    ))}
  </>
);
