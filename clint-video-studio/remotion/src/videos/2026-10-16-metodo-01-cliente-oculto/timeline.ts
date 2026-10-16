// Série Método de Aceleração Comercial · 01 Cliente oculto (videos/2026-10-16-metodo-01-cliente-oculto).
// Narração de 114,6 s. Tudo é CENA: a "tela" do Registro do cliente oculto é feita com prints da página
// pública (remotion/public/videos/2026-10-16-metodo-01-cliente-oculto/r*.png), com zoom e cursor na cena TelaRegistro.
import type {Cena, Zoom} from '../../projeto/timeline';
import {Abertura, Canais, Erro, Final, Memoria, Seis, Slide, TelaRegistro} from './cenas';

export const FPS = 30;
export const DURACAO_S = 114.9;
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [0, 10.6, Abertura],
  [10.6, 26.5, Erro],
  [26.5, 37.4, Canais],
  [37.4, 82.3, Seis],
  [82.3, 88.9, Memoria],
  [88.9, 101.9, TelaRegistro],
  [101.9, 108.6, Slide],
  [108.6, DURACAO_S, Final],
];
