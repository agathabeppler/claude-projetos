// Método · Etapa 3 · Evoluir (videos/2026-10-19-metodo-etapa3-evoluir). Tempos = narração final (entrada/narracao.wav),
// b(k, s) = início do bloco k + s. Tela: configuração do agente (gravação da Agatha, já usada na Etapa 2); o resto é animado.
import type {Cena, Zoom} from '../../projeto/timeline';
import * as c from './cenas';
import {b} from './comum';

export const FPS = 30;
export const DURACAO_S = b(6, 19.0);
export const VIDEO_TELAS = 'telas.mp4';
export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [0, 8.85, c.Abertura],
  [8.85, 17.3, c.Ciclo],
  [17.3, 25.3, c.Mapa],
  [25.3, 38.75, c.Frequencia],
  [38.75, b(1, 0), c.PrimeiroCiclo],
  // 1 · as duas lentes
  [b(1, 0), b(1, 2.0), c.Cap1],
  [b(1, 2.0), b(1, 21.7), c.DuasLentes],
  [b(1, 21.7), b(1, 32.5), c.ExemploLentes],
  [b(1, 32.5), b(2, 0), c.Resumo1],
  // 2 · o ciclo do parceiro
  [b(2, 0), b(2, 4.2), c.Cap2],
  [b(2, 4.2), b(2, 12.05), c.AuraNumeros],
  [b(2, 12.05), b(2, 22.2), c.AnaliseConversas],
  [b(2, 22.2), b(2, 49.5), c.OitoPassos],
  [b(2, 49.5), b(3, 0), c.Resumo2],
  // 3 · manutenção do agente
  [b(3, 0), b(3, 2.2), c.Cap3],
  [b(3, 2.2), b(3, 7.8), c.Recorrencia],
  [b(3, 7.8), b(3, 13.35), c.TelaBase],
  [b(3, 13.35), b(3, 23.5), c.Frentes],
  [b(3, 23.5), b(3, 34.3), c.Convenio],
  [b(3, 34.3), b(4, 0), c.Resumo3],
  // 4 · rotinas do cliente
  [b(4, 0), b(4, 2.3), c.Cap4],
  [b(4, 2.3), b(4, 9.3), c.QuemFaz],
  [b(4, 9.3), b(4, 34.8), c.Rotinas],
  [b(4, 34.8), b(5, 0), c.Resumo4],
  // 5 · reunião de entrega
  [b(5, 0), b(5, 2.1), c.Cap5],
  [b(5, 2.1), b(5, 14.2), c.Entrega],
  [b(5, 14.2), b(5, 31.15), c.Reuniao],
  [b(5, 31.15), b(6, 0), c.Resumo5],
  // fechamento
  [b(6, 0), DURACAO_S, c.Fim],
];
