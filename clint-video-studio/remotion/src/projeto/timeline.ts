import React from 'react';
import {Abertura, Comissao, Divisao30, Final, SemContaNova} from './cenas';

// Linha do tempo do vídeo, em SEGUNDOS da narração final.
// - TELAS: trechos com gravação de tela (lida de public/<VIDEO_TELAS>, montada por scripts/montar_telas.py
//   já na linha do tempo final). `zoom` destaca a informação importante:
//   [segundo dentro do trecho, centro x 0–1, centro y 0–1, escala]. Ex.: [[0,.5,.5,1],[2.2,.8,.2,2],[5,.8,.2,2],[5.8,.5,.5,1]]
// - CENAS: trechos com animação. Cada cena recebe g0 (início, s) e dur (s).
// Telas e cenas não se sobrepõem e juntas cobrem o vídeo inteiro.
//
// Projeto: projetos/2026-10-13-cadastro-parceiros (narração v2, 114,76 s).
// TELA A (13,33–64,09): conta 1 — LP, "Já sou cliente", Painel do afiliado, "Fazer cadastro", etapa 1 (logo obrigatório),
//   etapa 2 (dados bancários), termos, "Concluir cadastro", painel liberado.
// TELA B (75,94–104,47): conta 2 — "Seu link de indicação", 25% + 5%, "Criar novo link", "Copiar".
// Os zooms entram depois da gravação, quando os tempos de cada clique forem conhecidos.
export type Cena = React.FC<{g0: number; dur: number}>;
export type Zoom = [number, number, number, number];

export const FPS = 30;
export const DURACAO_S = 114.76;
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [
  {de: 13.33, ate: 64.09},
  {de: 75.94, ate: 104.47},
];

export const CENAS: [number, number, Cena][] = [
  [0, 7.1, Abertura],
  [7.1, 13.33, SemContaNova],
  [64.09, 75.94, Divisao30],
  [104.47, 110.2, Comissao],
  [110.2, DURACAO_S, Final],
];
