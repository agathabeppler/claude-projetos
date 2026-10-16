// Método · Etapa 1 · Vender (videos/2026-10-16-metodo-etapa1-vender). Tempos em segundos da narração final (entrada/narracao.wav),
// montada por juntar_narracao.sh: b(k, s) = início do bloco k + s.
import type {Cena, Zoom} from '../../projeto/timeline';
import {Abertura, Cap1, Exemplo, Exemplo1, Finge, Mapa, PorQue, Resumo1, Seis, TelaRegistro, b} from './cenas';
import {Blocos, Cap2, Cap3, Cap4, Cap5, Caro, Contrato, CustoHora, Dores, DuasPartes, Fechar, Fim, Investiga, Margem, Ordem, Ouvimos, Quando, Resumo2, Resumo3, Resumo4, TelaCalc, Unico} from './cenas2';

export const FPS = 30;
export const DURACAO_S = b(6, 13.85);
export const VIDEO_TELAS = 'telas.mp4';

export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  // abertura
  [0, 9.9, Abertura],
  [9.9, 18.2, Mapa],
  [18.2, b(1, 0), Exemplo],
  // passo 1 · cliente oculto
  [b(1, 0), b(1, 2.25), Cap1],
  [b(1, 2.25), b(1, 11.1), Finge],
  [b(1, 11.1), b(1, 17.4), PorQue],
  [b(1, 17.4), b(1, 34.0), Seis],
  [b(1, 34.0), b(1, 42.95), Exemplo1],
  [b(1, 42.95), b(1, 47.3), TelaRegistro],
  [b(1, 47.3), b(2, 0), Resumo1],
  // passo 2 · diagnóstico
  [b(2, 0), b(2, 2.4), Cap2],
  [b(2, 2.4), b(2, 10.75), Investiga],
  [b(2, 10.75), b(2, 48.55), Blocos],
  [b(2, 48.55), b(2, 57.0), Unico],
  [b(2, 57.0), b(3, 0), Resumo2],
  // passo 3 · preço
  [b(3, 0), b(3, 1.75), Cap3],
  [b(3, 1.75), b(3, 7.6), Quando],
  [b(3, 7.6), b(3, 24.8), CustoHora],
  [b(3, 24.8), b(3, 42.75), Margem],
  [b(3, 42.75), b(3, 46.5), TelaCalc],
  [b(3, 46.5), b(4, 0), Resumo3],
  // passo 4 · proposta
  [b(4, 0), b(4, 2.2), Cap4],
  [b(4, 2.2), b(4, 10.6), Ordem],
  [b(4, 10.6), b(4, 21.25), Ouvimos],
  [b(4, 21.25), b(4, 26.0), Dores],
  [b(4, 26.0), b(4, 37.0), DuasPartes],
  [b(4, 37.0), b(4, 43.3), Fechar],
  [b(4, 43.3), b(4, 48.1), Caro],
  [b(4, 48.1), b(5, 0), Resumo4],
  // passo 5 · contrato
  [b(5, 0), b(5, 1.8), Cap5],
  [b(5, 1.8), b(6, 0), Contrato],
  // fechamento
  [b(6, 0), DURACAO_S, Fim],
];
