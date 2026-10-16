// Série Método de Aceleração Comercial · 01 Cliente oculto (videos/2026-10-16-metodo-01-cliente-oculto).
// Narração de 114,6 s. Tudo é CENA: a "tela" do Registro do cliente oculto é feita com prints da página
// pública (remotion/public/videos/2026-10-16-metodo-01-cliente-oculto/r*.png), com zoom e cursor na cena TelaRegistro.
import type {Cena, Zoom} from '../../projeto/timeline';
import {Abertura, Canais, Erro, Final, K, Memoria, Seis, Slide, TelaRegistro} from './cenas';

export const FPS = 30;
// Tempos abaixo na narração original; divididos por K (narração acelerada 1,2x, 95,5 s).
const c = (x: number) => Math.round((x / K) * 100) / 100;
export const DURACAO_S = c(114.9);
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [c(0), c(10.6), Abertura],
  [c(10.6), c(26.5), Erro],
  [c(26.5), c(37.4), Canais],
  [c(37.4), c(82.3), Seis],
  [c(82.3), c(88.9), Memoria],
  [c(88.9), c(101.9), TelaRegistro],
  [c(101.9), c(108.6), Slide],
  [c(108.6), DURACAO_S, Final],
];
