import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {Background} from '../ui';
import type {CenaProps} from './comum';

export type Bloco = [number, number, React.FC<CenaProps>];
export type LP = {id: string; dur: number; audio: string; blocos: Bloco[]};

export const FPS = 30;

/** Monta um vídeo de LP: fundo pastel + blocos (cenas e gravações) na linha do tempo da narração. */
export const LPVideo: React.FC<{lp: LP; comAudio?: boolean}> = ({lp, comAudio = true}) => (
  <AbsoluteFill>
    <Background />
    {lp.blocos.map(([a, b, Cena]) => {
      const fa = Math.round(a * FPS);
      const fb = Math.round(b * FPS);
      return (
        <Sequence key={`${lp.id}-${a}`} from={fa} durationInFrames={fb - fa}>
          <Cena g0={a} dur={b - a} />
        </Sequence>
      );
    })}
    {comAudio && <Audio src={staticFile(lp.audio)} />}
  </AbsoluteFill>
);
