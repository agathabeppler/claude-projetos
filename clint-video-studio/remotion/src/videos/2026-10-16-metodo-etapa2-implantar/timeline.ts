// Método · Etapa 2 · Implantar (videos/2026-10-16-metodo-etapa2-implantar). Tempos = narração final (entrada/narracao.wav),
// b(k, s) = início do bloco k + s. Gravações: da Agatha (Aura, automação, agente, teste) e do vídeo oficial da Aura (YouTube).
import type {Cena, Zoom} from '../../projeto/timeline';
import * as c from './cenas';
import {b} from './comum';

export const FPS = 30;
export const DURACAO_S = b(7, 14.0);
export const VIDEO_TELAS = 'telas.mp4';
export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [0, 9.45, c.Abertura],
  [9.45, 19.8, c.Mapa],
  [19.8, b(1, 0), c.Resultado],
  // 1 · kick-off
  [b(1, 0), b(1, 1.8), c.Cap1],
  [b(1, 1.8), b(1, 10.8), c.KickOff],
  [b(1, 10.8), b(1, 19.05), c.TresPessoas],
  [b(1, 19.05), b(1, 30.1), c.Pedir],
  [b(1, 30.1), b(1, 38.95), c.ApiOficial],
  [b(1, 38.95), b(1, 49.2), c.Manual],
  [b(1, 49.2), b(2, 0), c.Resumo1],
  // 2 · configuração
  [b(2, 0), b(2, 2.3), c.Cap2],
  [b(2, 2.3), b(2, 9.2), c.QuemMonta],
  [b(2, 9.2), b(2, 12.0), c.TelaAura],
  [b(2, 12.0), b(2, 14.3), c.TelaFunil],
  [b(2, 14.3), b(2, 16.3), c.TelaAutomacao],
  [b(2, 16.3), b(2, 18.6), c.TelaAgente],
  [b(2, 18.6), b(2, 28.0), c.AuraVsAgente],
  [b(2, 28.0), b(2, 38.4), c.Revisar],
  [b(2, 38.4), b(2, 45.2), c.Testar],
  [b(2, 45.2), b(2, 52.6), c.Conectar],
  [b(2, 52.6), b(3, 0), c.Resumo2],
  // 3 · operação no ar
  [b(3, 0), b(3, 2.0), c.Cap3],
  [b(3, 2.0), b(3, 8.3), c.NoAr],
  [b(3, 8.3), b(3, 12.0), c.Teste1],
  [b(3, 12.0), b(3, 16.1), c.Teste2],
  [b(3, 16.1), b(3, 23.4), c.Teste3],
  [b(3, 23.4), b(3, 34.7), c.Campanha],
  [b(3, 34.7), b(3, 41.4), c.Atraso],
  [b(3, 41.4), b(4, 0), c.Resumo3],
  // 4 · playbook
  [b(4, 0), b(4, 1.7), c.Cap4],
  [b(4, 1.7), b(4, 21.4), c.Playbook],
  [b(4, 21.4), b(5, 0), c.Resumo4],
  // 5 · treinamento e rotinas
  [b(5, 0), b(5, 2.9), c.Cap5],
  [b(5, 2.9), b(5, 20.2), c.Treino],
  [b(5, 20.2), b(5, 41.6), c.Rotinas],
  [b(5, 41.6), b(6, 0), c.Resumo5],
  // 6 · campanha de ativação
  [b(6, 0), b(6, 2.6), c.Cap6],
  [b(6, 2.6), b(6, 19.95), c.Ativacao],
  [b(6, 19.95), b(6, 35.1), c.Checagens],
  [b(6, 35.1), b(7, 0), c.Resumo6],
  // fechamento
  [b(7, 0), DURACAO_S, c.Fim],
];
