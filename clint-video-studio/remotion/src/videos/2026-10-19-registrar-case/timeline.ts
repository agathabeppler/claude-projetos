import React from 'react';
import {Abertura, Final, ListaIndicacoes, TelaPendente, Validacao} from './cenas';

// Linha do tempo do vídeo, em SEGUNDOS da narração final.
// Projeto: videos/2026-10-19-registrar-case.
//
// PROVISÓRIO: a narração ainda não foi gerada (Agatha decidiu esperar o modal "Registrar case" entrar no ar
// para gravar as telas reais). Os tempos abaixo são ESTIMADOS (~2,7 palavras/s) a partir do roteiro aprovado
// (entrada/roteiro_v1.txt). Quando a narração existir, troque B pelos inícios reais de cada bloco.
// Dentro das cenas os tempos são relativos ao início do bloco, então basta atualizar B.
//
// Blocos: 1 gancho · 2 lista de indicações · 3–9 TELA (passo 4 › cliente › antes › depois › opcionais ›
// divulgação › Enviar para validação) · 10 validação pelo time · 11 final.
import type {Cena, Zoom} from '../../projeto/timeline';

export const B = {b1: 0, b2: 5.9, b3: 14.3, b10: 70.1, b11: 79.0, fim: 85.0};

export const FPS = 30;
export const DURACAO_S = B.fim;
export const VIDEO_TELAS = 'videos/2026-10-19-registrar-case/telas.mp4';

// Entra quando a gravação existir (e sai a TelaPendente das CENAS).
export const TELAS: {de: number; ate: number; zoom?: Zoom[]}[] = [];

export const CENAS: [number, number, Cena][] = [
  [B.b1, B.b2, Abertura],
  [B.b2, B.b3, ListaIndicacoes],
  [B.b3, B.b10, TelaPendente],
  [B.b10, B.b11, Validacao],
  [B.b11, B.fim, Final],
];
