import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {Background, ramp, useSec, useSpring} from '../../ui';
import {WF} from './warp';
import {Intro, Admin, Autorizar, Celular, Diferenca, Final, Gestor, Ninguem, Outro, Pedido, Valores} from './scenes';

export const TOTAL = 6012; // duração do vídeo novo da apresentadora (200,4 s)

// Frames de corte do vídeo-base antigo (30 fps), convertidos para a narração nova por WF.
const SCREENS_OLD: [number, number][] = [
  [61, 461],
  [870, 1139],
  [1247, 2001],
  [2127, 2670],
  [3018, 4183],
  [4371, 4772],
  [4891, 5079],
];
const SCENES_OLD: [number, number, React.FC<{g0: number; dur: number}>][] = [
  [0, 61, Intro],
  [461, 571, Diferenca],
  [571, 721, Celular],
  [721, 870, Ninguem],
  [1139, 1247, Admin],
  [2001, 2127, Autorizar],
  [2670, 3018, Pedido],
  [4183, 4371, Gestor],
  [4772, 4891, Valores],
  [5079, 5379, Final],
];
const OUTRO_START = 5880; // 196,0 s: "Faça hoje a sua primeira chamada…"
const SCREENS: [number, number][] = SCREENS_OLD.map(([a, b]) => [WF(a), WF(b)]);
const SCENES = [
  ...SCENES_OLD.map(([a, b, C]) => [a === 0 ? 0 : WF(a), C === Final ? OUTRO_START : WF(b), C] as const),
  [OUTRO_START, TOTAL, Outro] as const,
];

const S = 0.86;
const INSET = 3;
const CW = (1824 - INSET * 2) * S;
const CH = (1026 - INSET * 2) * S;

const ScreenWin: React.FC<{start: number; len: number}> = ({start, len}) => {
  const t = useSec();
  const dur = len / 30;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: CW,
          height: CH,
          borderRadius: 26,
          overflow: 'hidden',
          position: 'relative',
          background: '#141416',
          boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 20px 50px -20px rgba(60,35,150,0.25), 0 0 0 1px rgba(30,20,80,0.08)',
          transform: `translateY(${(1 - p) * 80}px) scale(${0.92 + 0.08 * p + outP * 0.02})`,
          opacity: pc * (1 - outP),
          filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile('base_retimed.mp4')}
          startFrom={start}
          muted
          style={{position: 'absolute', width: 1920 * S, height: 1080 * S, left: -(48 + INSET) * S, top: -(26 + INSET) * S, maxWidth: 'none'}}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {SCREENS.map(([a, b]) => (
      <Sequence key={a} from={a} durationInFrames={b - a}>
        <ScreenWin start={a} len={b - a} />
      </Sequence>
    ))}
    {SCENES.map(([a, b, Comp]) => (
      <Sequence key={a} from={a} durationInFrames={b - a}>
        <Comp g0={a / 30} dur={(b - a) / 30} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
