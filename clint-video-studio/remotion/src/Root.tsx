import React from 'react';
import {Composition} from 'remotion';
import {Video, criarVideo} from './Video';
import {DURACAO_S, FPS} from './projeto/timeline';
import {CallGif, GIF_DUR, GIF_FPS, GIF_H, GIF_W} from './exemplos/ligacoes-whatsapp/CallGif';
import {TUTORIAL_DUR, TutorialStudio} from './exemplos/tutorial-studio/TutorialStudio';
import {LPComp, LPS} from './videos/2026-10-07-lps-parceiros';
import {FPS as LP_FPS} from './videos/2026-10-07-lps-parceiros/LPVideo';
import * as cadastroParceiros from './videos/2026-10-13-cadastro-parceiros/timeline';
import {CentralClientes, DURACAO_S as CC_DUR} from './videos/2026-10-13-central-clientes/Video';
import * as metodo01 from './videos/2026-10-16-metodo-01-cliente-oculto/timeline';
import * as metodo02 from './videos/2026-10-16-metodo-02-diagnostico/timeline';
import * as etapa1 from './videos/2026-10-16-metodo-etapa1-vender/timeline';
import * as etapa2 from './videos/2026-10-16-metodo-etapa2-implantar/timeline';
import * as etapa3 from './videos/2026-10-19-metodo-etapa3-evoluir/timeline';
import './theme';

const CadastroParceiros = criarVideo(cadastroParceiros);
const Metodo01 = criarVideo(metodo01);
const Metodo02 = criarVideo(metodo02);
const Etapa1 = criarVideo(etapa1);
const Etapa2 = criarVideo(etapa2);
const Etapa3 = criarVideo(etapa3);

export const Root: React.FC = () => (
  <>
    {/* Vídeo do projeto atual (edite src/projeto/timeline.ts e src/projeto/cenas.tsx) */}
    <Composition id="Video" component={Video} durationInFrames={Math.round(DURACAO_S * FPS)} fps={FPS} width={1920} height={1080} />
    {/* Vídeo "Cadastro no Programa de Parceiros" (videos/2026-10-13-cadastro-parceiros) */}
    <Composition id="CadastroParceiros" component={CadastroParceiros} durationInFrames={Math.round(cadastroParceiros.DURACAO_S * cadastroParceiros.FPS)} fps={cadastroParceiros.FPS} width={1920} height={1080} />
    {/* Série Método de Aceleração Comercial · 01 Cliente oculto (videos/2026-10-16-metodo-01-cliente-oculto) */}
    <Composition id="Metodo01ClienteOculto" component={Metodo01} durationInFrames={Math.round(metodo01.DURACAO_S * metodo01.FPS)} fps={metodo01.FPS} width={1920} height={1080} />
    {/* Série Método de Aceleração Comercial · 02 Diagnóstico comercial (videos/2026-10-16-metodo-02-diagnostico) */}
    <Composition id="Metodo02Diagnostico" component={Metodo02} durationInFrames={Math.round(metodo02.DURACAO_S * metodo02.FPS)} fps={metodo02.FPS} width={1920} height={1080} />
    {/* Método · Etapa 1 · Vender (videos/2026-10-16-metodo-etapa1-vender) */}
    <Composition id="Etapa1Vender" component={Etapa1} durationInFrames={Math.round(etapa1.DURACAO_S * etapa1.FPS)} fps={etapa1.FPS} width={1920} height={1080} />
    {/* Método · Etapa 2 · Implantar (videos/2026-10-16-metodo-etapa2-implantar) */}
    <Composition id="Etapa2Implantar" component={Etapa2} durationInFrames={Math.round(etapa2.DURACAO_S * etapa2.FPS)} fps={etapa2.FPS} width={1920} height={1080} />
    {/* Método · Etapa 3 · Evoluir (videos/2026-10-19-metodo-etapa3-evoluir) */}
    <Composition id="Etapa3Evoluir" component={Etapa3} durationInFrames={Math.round(etapa3.DURACAO_S * etapa3.FPS)} fps={etapa3.FPS} width={1920} height={1080} />
    {/* Vídeo "Central de Clientes" (videos/2026-10-13-central-clientes) */}
    <Composition id="CentralClientes" component={CentralClientes} durationInFrames={Math.round(CC_DUR * FPS)} fps={FPS} width={1920} height={1080} />
    {/* Exemplo de GIF de produto (260x346), desenhado em 3,346x e reduzido na exportação */}
    <Composition id="GifExemplo" component={CallGif} durationInFrames={Math.round(GIF_DUR * GIF_FPS)} fps={GIF_FPS} width={GIF_W} height={GIF_H} />
    {/* Vídeo tutorial do próprio kit */}
    <Composition id="TutorialStudio" component={TutorialStudio} durationInFrames={Math.round(TUTORIAL_DUR * 30)} fps={30} width={1920} height={1080} />
    {/* Vídeos das LPs do Programa de Parceiros (src/videos/2026-10-07-lps-parceiros/) */}
    {LPS.map((lp) => (
      <Composition key={lp.id} id={lp.id} component={LPComp} defaultProps={{id: lp.id}} durationInFrames={Math.round(lp.dur * LP_FPS)} fps={LP_FPS} width={1920} height={1080} />
    ))}
  </>
);
