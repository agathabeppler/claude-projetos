import React from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, Icon, Pop, Words, card, ramp, useSec, useSpring} from '../../ui';
import {XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';

// Peças da Etapa 3 · Evoluir (5 partes). Narração em blocos: b(k, s) = início do bloco k + s. PASTA: clipes já usados na Etapa 2.
export const O = [0, 47.808, 87.361, 143.058, 181.853, 223.6, 259.156];
export const b = (k: number, s: number) => O[k] + s;
export const PASTA = 'videos/2026-10-16-metodo-etapa2-implantar';
export const PASSOS = ['Duas lentes', 'Ciclo do parceiro', 'Manutenção', 'Rotinas', 'Entrega'];
export type P = {g0: number; dur: number};

export const Trilha: React.FC<{atual: number; at: number; small?: boolean}> = ({atual, at, small}) => {
  const s = small ? 0.66 : 0.92;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {PASSOS.map((p, i) => {
        const n = i + 1;
        const feito = n < atual;
        const agora = n === atual;
        return (
          <React.Fragment key={p}>
            {i > 0 && <div style={{width: 34 * s, height: 4, borderRadius: 4, background: n <= atual ? C.grad : '#E4E2EE'}} />}
            <Pop at={at + i * 0.05} pop y={14}>
              <div
                style={{
                  ...card({width: 236 * s, padding: `${16 * s}px 8px`, borderRadius: 22 * s, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 * s, boxSizing: 'border-box'}),
                  boxShadow: agora ? `0 0 0 5px rgba(109,93,246,0.4), ${C.shadowSm}` : C.shadowSm,
                  opacity: n > atual ? 0.55 : 1,
                  transform: `scale(${agora ? 1.06 : 1})`,
                }}
              >
                <div
                  style={{
                    width: 52 * s,
                    height: 52 * s,
                    borderRadius: 52,
                    background: feito ? C.green : agora ? C.grad : C.purpleTint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feito || agora ? '#fff' : C.purple,
                    fontWeight: 700,
                    fontSize: 24 * s,
                  }}
                >
                  {feito ? <Icon name="check" size={28 * s} color="#fff" stroke={3.2} /> : n}
                </div>
                <div style={{fontSize: 23 * s, fontWeight: 600, textAlign: 'center', whiteSpace: 'nowrap'}}>{p}</div>
              </div>
            </Pop>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const Capitulo: React.FC<{n: number; at: number}> = ({n, at}) => (
  <>
    <Abs x={0} y={330} w={1920}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pop at={at} pop y={16}>
          <div style={{padding: '12px 30px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 30, fontWeight: 700, letterSpacing: 1}}>PARTE {n} DE 5</div>
        </Pop>
      </div>
      <div style={{height: 26}} />
      <Words text={`[${PASSOS[n - 1]}]`} at={at + 0.15} size={124} />
    </Abs>
    <Abs x={960} y={760} center>
      <Trilha atual={n} at={at + 0.2} />
    </Abs>
  </>
);

export const Resumo: React.FC<{at: number; texto: string; n: number}> = ({at, texto, n}) => (
  <>
    <Abs x={960} y={500} center>
      <Pop at={at} y={50} s={0.9}>
        <div style={card({width: 1380, padding: '56px 70px', boxSizing: 'border-box', borderRadius: 40, textAlign: 'center'})}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 26}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 26px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 26, fontWeight: 700, letterSpacing: 2}}>
              <Icon name="check" size={24} color="#fff" stroke={3} /> RESUMINDO · PARTE {n}
            </div>
          </div>
          <Words text={texto} at={at + 0.5} size={62} stagger={0.09} />
        </div>
      </Pop>
    </Abs>
    <Abs x={960} y={880} center>
      <Trilha atual={n + 1} at={at + 0.3} small />
    </Abs>
  </>
);

/** Gravação de tela num cartão flutuante, com etiquetas que entram na palavra certa. */
const SC = 0.86;
const CW = 1920 * SC;
const CH = 1080 * SC;
export const TelaVideo: React.FC<{
  g0: number;
  dur: number;
  src: string;
  legenda: string;
  chips?: {at: number; t: string; icon?: string}[];
  zoom?: [number, number, number][]; // [t absoluto, cy 0–1, escala] (cx fixo no centro)
}> = ({g0, dur, src, legenda, chips = [], zoom}) => {
  const t = useSec();
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  let z = 1;
  let cy = 0.5;
  if (zoom && zoom.length) {
    const s = t + g0;
    let k = zoom[0];
    for (let i = 0; i < zoom.length - 1; i++) {
      if (s >= zoom[i][0] && s <= zoom[i + 1][0]) {
        const u = Easing.inOut(Easing.cubic)((s - zoom[i][0]) / (zoom[i + 1][0] - zoom[i][0]));
        k = [s, zoom[i][1] + (zoom[i + 1][1] - zoom[i][1]) * u, zoom[i][2] + (zoom[i + 1][2] - zoom[i][2]) * u];
      } else if (s > zoom[i + 1][0]) k = zoom[i + 1];
    }
    cy = Math.min(Math.max(k[1], 0.5 / k[2]), 1 - 0.5 / k[2]);
    z = k[2];
  }
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT, color: C.text}}>
      <div
        style={{
          width: CW,
          height: CH,
          borderRadius: 26,
          overflow: 'hidden',
          background: '#141416',
          boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 20px 50px -20px rgba(60,35,150,0.25)',
          transform: `translateY(${(1 - p) * 80 - 30}px) scale(${0.92 + 0.08 * p + outP * 0.02})`,
          opacity: pc * (1 - outP),
          filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', width: CW, height: CH, transformOrigin: '50% 0', transform: `scale(${z}) translateY(${(0.5 / z - cy) * CH}px)`}}>
          <OffthreadVideo src={staticFile(`${PASTA}/${src}`)} muted style={{width: CW, height: CH, objectFit: 'cover'}} />
        </div>
      </div>
      {chips.map((c, i) => {
        const a = ramp(t, c.at - g0, c.at - g0 + 0.3);
        const prox = chips[i + 1];
        const fora = prox ? ramp(t, prox.at - g0 - 0.15, prox.at - g0 + 0.1) : 0;
        return (
          <div key={i} style={{position: 'absolute', left: 0, right: 0, bottom: 70, display: 'flex', justifyContent: 'center', opacity: a * (1 - fora) * (1 - outP)}}>
            <div style={{transform: `translateY(${(1 - a) * 20}px)`, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 30px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 34, fontWeight: 700, boxShadow: '0 20px 40px -12px rgba(140,90,240,0.6)', whiteSpace: 'nowrap'}}>
              <XIcon name={c.icon ?? 'check'} size={32} color="#fff" stroke={2.6} /> {c.t}
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 14, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '6px 20px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 20, fontWeight: 600}}>
          <Icon name="doc" size={20} color={C.purple} /> {legenda}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Print estático (página pública) num cartão flutuante. */
export const TelaPrint: React.FC<{g0: number; dur: number; prints: [string, number][]; legenda: string}> = ({g0, dur, prints, legenda}) => {
  const t = useSec();
  const s = t + g0;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>
      <div
        style={{
          width: CW,
          height: CH,
          borderRadius: 26,
          overflow: 'hidden',
          background: '#141416',
          boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45)',
          transform: `translateY(${(1 - p) * 80}px) scale(${(0.92 + 0.08 * p) * (1 + 0.04 * (t / dur))})`,
          opacity: pc * (1 - outP),
          filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
          position: 'relative',
        }}
      >
        {prints.map(([f, de], i) => (
          <Img key={f} src={staticFile(`${PASTA}/${f}`)} style={{position: 'absolute', width: CW, height: CH, opacity: i === 0 ? 1 : ramp(s, de, de + 0.3)}} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600, color: C.text}}>
          <Icon name="doc" size={22} color={C.purple} /> {legenda}
        </div>
      </div>
    </AbsoluteFill>
  );
};
