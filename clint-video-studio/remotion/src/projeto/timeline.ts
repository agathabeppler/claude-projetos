import React from 'react';
import {Abertura} from './cenas';

// Linha do tempo do vídeo, em SEGUNDOS da narração final.
// - TELAS: trechos com gravação de tela (lida de public/<VIDEO_TELAS>, montada por scripts/montar_telas.py
//   já na linha do tempo final). `zoom` destaca a informação importante:
//   [segundo dentro do trecho, centro x 0–1, centro y 0–1, escala]. Ex.: [[0,.5,.5,1],[2.2,.8,.2,2],[5,.8,.2,2],[5.8,.5,.5,1]]
// - CENAS: trechos com animação. Cada cena recebe g0 (início, s) e dur (s).
// Telas e cenas não se sobrepõem e juntas cobrem o vídeo inteiro.
export type Cena = React.FC<{g0: number; dur: number}>;
export type Zoom = [number, number, number, number];

export const FPS = 30;
export const DURACAO_S = 2.5;
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [[0, 2.5, Abertura]];
