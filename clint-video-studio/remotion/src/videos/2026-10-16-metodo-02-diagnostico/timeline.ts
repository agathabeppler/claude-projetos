// Série Método de Aceleração Comercial · 02 Diagnóstico comercial (videos/2026-10-16-metodo-02-diagnostico).
// Tempos abaixo na narração original (125,9 s); divididos por K (narração acelerada 1,2x, 104,9 s).
// A "tela" do Banco de perguntas é feita com prints da página pública (cena TelaBanco).
import type {Cena, Zoom} from '../../projeto/timeline';
import {Abertura, Blocos, Checklist, Final, K, NaoTudo, Saidas, TelaBanco, Unico, Vocabulario} from './cenas';

const c = (x: number) => Math.round((x / K) * 100) / 100;
export const FPS = 30;
export const DURACAO_S = c(126.4);
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [c(0), c(9.0), Abertura],
  [c(9.0), c(18.6), Saidas],
  [c(18.6), c(31.4), Vocabulario],
  [c(31.4), c(74.4), Blocos],
  [c(74.4), c(82.5), NaoTudo],
  [c(82.5), c(100.2), Unico],
  [c(100.2), c(115.7), Checklist],
  [c(115.7), c(122.0), TelaBanco],
  [c(122.0), DURACAO_S, Final],
];
