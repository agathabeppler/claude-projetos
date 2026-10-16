// Método · Etapa 1 · Vender (videos/2026-10-16-metodo-etapa1-vender). Tempos em segundos da narração final (entrada/narracao.wav).
// PRÉVIA: por enquanto só a abertura e o passo 1 (blocos n0 e n1).
import type {Cena, Zoom} from '../../projeto/timeline';
import {Abertura, Cap1, Exemplo, Exemplo1, Finge, Mapa, PorQue, Resumo1, Seis, TelaRegistro, b} from './cenas';

export const FPS = 30;
export const DURACAO_S = b(1, 51.6);
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [0, 9.9, Abertura],
  [9.9, 18.2, Mapa],
  [18.2, b(1, 0), Exemplo],
  [b(1, 0), b(1, 2.25), Cap1],
  [b(1, 2.25), b(1, 11.1), Finge],
  [b(1, 11.1), b(1, 17.4), PorQue],
  [b(1, 17.4), b(1, 34.0), Seis],
  [b(1, 34.0), b(1, 42.95), Exemplo1],
  [b(1, 42.95), b(1, 47.3), TelaRegistro],
  [b(1, 47.3), DURACAO_S, Resumo1],
];
