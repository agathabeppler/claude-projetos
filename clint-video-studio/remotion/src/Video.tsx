import React from 'react';
import {AbsoluteFill, Easing, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {Background, ramp, useSec, useSpring} from './ui';
import {CENAS, FPS, TELAS, VIDEO_TELAS, type Zoom} from './projeto/timeline';

// Gravação de tela num cartão flutuante sobre o fundo pastel (entra com mola + blur, sai com blur).
const S = 0.86;
const CW = 1920 * S;
const CH = 1080 * S;
const ease = Easing.inOut(Easing.cubic);

/** Zoom suave: [segundo dentro do trecho, centro x 0–1, centro y 0–1, escala]. Entre as chaves, transição em ~0,8 s. */
const zoomAt = (keys: Zoom[] | undefined, t: number): [number, number, number] => {
  if (!keys || keys.length === 0) return [0.5, 0.5, 1];
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2], keys[0][3]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, xa, ya, za] = keys[i];
    const [tb, xb, yb, zb] = keys[i + 1];
    if (t <= tb) {
      const u = ease(Math.min(Math.max((t - ta) / Math.max(tb - ta, 1e-3), 0), 1));
      return [xa + (xb - xa) * u, ya + (yb - ya) * u, za + (zb - za) * u];
    }
  }
  const k = keys[keys.length - 1];
  return [k[1], k[2], k[3]];
};

const Tela: React.FC<{inicio: number; len: number; zoom?: Zoom[]}> = ({inicio, len, zoom}) => {
  const t = useSec();
  const dur = len / FPS;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const [cx, cy, z] = zoomAt(zoom, t);
  // mantém o ponto (cx, cy) no centro sem mostrar bordas
  const hx = 0.5 / z;
  const hy = 0.5 / z;
  const x = Math.min(Math.max(cx, hx), 1 - hx);
  const y = Math.min(Math.max(cy, hy), 1 - hy);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: CW,
          height: CH,
          borderRadius: 26,
          overflow: 'hidden',
          background: '#141416',
          boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 20px 50px -20px rgba(60,35,150,0.25), 0 0 0 1px rgba(30,20,80,0.08)',
          transform: `translateY(${(1 - p) * 80}px) scale(${0.92 + 0.08 * p + outP * 0.02})`,
          opacity: pc * (1 - outP),
          filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
        }}
      >
        <div style={{width: CW, height: CH, transformOrigin: '0 0', transform: `scale(${z}) translate(${(0.5 / z - x) * CW}px, ${(0.5 / z - y) * CH}px)`}}>
          <OffthreadVideo src={staticFile(VIDEO_TELAS)} startFrom={inicio} muted style={{width: CW, height: CH}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Video: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {TELAS.map(({de, ate, zoom}) => {
      const fa = Math.round(de * FPS);
      const fb = Math.round(ate * FPS);
      return (
        <Sequence key={`t${de}`} from={fa} durationInFrames={fb - fa}>
          <Tela inicio={fa} len={fb - fa} zoom={zoom} />
        </Sequence>
      );
    })}
    {CENAS.map(([a, b, Cena]) => {
      const fa = Math.round(a * FPS);
      const fb = Math.round(b * FPS);
      return (
        <Sequence key={`c${a}`} from={fa} durationInFrames={fb - fa}>
          <Cena g0={a} dur={b - a} />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
