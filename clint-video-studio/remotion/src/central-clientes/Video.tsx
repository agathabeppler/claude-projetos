import React from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, staticFile} from 'remotion';
import {C, FONT} from '../theme';
import {Background, ramp, useSec, useSpring} from '../ui';
import {Abertura, Final, Oportunidades} from './cenas';
import {DURACAO_S as DUR, W} from './timing';

// Vídeo "Central de Clientes" (projetos/2026-10-13-central-clientes). Tempos = segundos da narração (88,45 s).
// A gravação da Agatha (1800x904) entra num cartão flutuante; trechos com dados de clientes usam quadros
// reescritos com dados fictícios (projetos/.../anonimizar.py → public/central/*.png).

export const FPS = 30;
export const DURACAO_S = DUR;
const SW = 1800;
const SH = 904;
const CW = 1920 * 0.86;
const CH = (CW * SH) / SW;
const CX0 = (1920 - CW) / 2;
const CY0 = (1080 - CH) / 2;

const TELA_DE = W(6.74);
const TELA_ATE = W(77.44);

type Seg = {de: number; ate: number; img?: string; video?: number};
// video = segundo da gravação no início do trecho
const SEGS_V1: Seg[] = [
  {de: 6.74, ate: 11.95, video: 0.25},
  {de: 11.95, ate: 37.03, img: 'lista_topo.png'},
  {de: 37.03, ate: 40.62, img: 'lista_rolada_info.png'},
  {de: 40.62, ate: 57.39, img: 'detalhes.png'},
  {de: 57.39, ate: 60.0, img: 'lista_topo.png'},
  {de: 60.0, ate: 71.18, img: 'pedir_acesso.png'},
  {de: 71.18, ate: 77.44, img: 'lista_rolada.png'},
];
const SEGS: Seg[] = SEGS_V1.map((sg) => ({...sg, de: W(sg.de), ate: W(sg.ate)}));

// [tempo, centro x 0–1, centro y 0–1, escala] (pontos na gravação de 1800x904)
type Z = [number, number, number, number];
const px = (x: number) => x / SW;
const py = (y: number) => y / SH;
const ZOOM_V1: Z[] = [
  [6.74, 0.5, 0.5, 1],
  [7.6, 0.5, 0.5, 1],
  [8.2, px(260), py(500), 1.7], // menu Mais
  [10.6, px(330), py(470), 1.7],
  [11.2, px(380), py(470), 2.0], // Central de Clientes
  [11.9, px(380), py(470), 2.0],
  [12.6, 0.5, 0.5, 1],
  [16.9, 0.5, 0.5, 1],
  [17.7, px(1000), py(170), 1.15], // certificado
  [19.6, px(1000), py(170), 1.15],
  [20.4, px(700), py(310), 2.4], // abas
  [25.7, px(700), py(310), 2.4],
  [26.5, 0.5, py(560), 1.15],
  [27.7, px(1180), py(560), 1.9], // atividade recente
  [34.6, px(1180), py(560), 1.9],
  [35.4, px(1360), py(560), 2.1], // status
  [36.5, px(1360), py(560), 2.1],
  [37.2, 0.5, 0.5, 1],
  [38.3, 0.5, 0.5, 1],
  [39.4, px(1600), py(470), 2.0], // ícone ⓘ
  [40.55, px(1600), py(470), 2.0],
  [40.75, 0.5, 0.5, 1.05], // modal abre
  [43.6, 0.5, 0.5, 1.05],
  [44.3, px(900), py(231), 3.0], // nota de saúde
  [47.2, px(900), py(231), 3.0],
  [48.6, px(900), py(330), 2.1], // usuários / origens
  [51.2, px(900), py(330), 2.1],
  [51.8, px(900), py(440), 2.1], // canais
  [52.8, px(900), py(440), 2.1],
  [53.4, px(900), py(560), 2.1], // agentes / campanhas
  [55.8, px(900), py(560), 2.1],
  [56.3, px(900), py(670), 2.1], // integrações
  [57.2, px(900), py(670), 2.1],
  [57.6, 0.5, 0.5, 1],
  [58.3, 0.5, 0.5, 1],
  [59.3, px(1600), py(80), 2.0], // Pedir acesso
  [60.0, px(1600), py(80), 2.0],
  [60.2, 0.5, py(452), 1.9], // modal
  [70.6, 0.5, py(452), 1.9],
  [71.4, 0.5, 0.5, 1],
  [72.2, 0.5, 0.5, 1],
  [73.2, px(1450), py(430), 2.2], // Acessar conta
  [77.4, px(1450), py(430), 2.2],
];
const ZOOM: Z[] = ZOOM_V1.map(([t, x, y, z]) => [W(t), x, y, z]);

const ease = Easing.inOut(Easing.cubic);
const zoomAt = (t: number): [number, number, number] => {
  if (t <= ZOOM[0][0]) return [ZOOM[0][1], ZOOM[0][2], ZOOM[0][3]];
  for (let i = 0; i < ZOOM.length - 1; i++) {
    const [ta, xa, ya, za] = ZOOM[i];
    const [tb, xb, yb, zb] = ZOOM[i + 1];
    if (t <= tb) {
      const u = ease(Math.min(Math.max((t - ta) / Math.max(tb - ta, 1e-3), 0), 1));
      return [xa + (xb - xa) * u, ya + (yb - ya) * u, za + (zb - za) * u];
    }
  }
  const k = ZOOM[ZOOM.length - 1];
  return [k[1], k[2], k[3]];
};
const clampC = (c: number, z: number) => Math.min(Math.max(c, 0.5 / z), 1 - 0.5 / z);

/** Ponto da gravação (px) → ponto da tela (1920x1080), considerando o zoom do instante g. */
const toScreen = (g: number, sx: number, sy: number) => {
  const [cx, cy, z] = zoomAt(g);
  const x = clampC(cx, z);
  const y = clampC(cy, z);
  return {X: CX0 + CW * (z * (sx / SW - x) + 0.5), Y: CY0 + CH * (z * (sy / SH - y) + 0.5)};
};

// cursor próprio (pontos na gravação) — só nos trechos de quadro parado
type CP = {t: number; x: number; y: number};
const CURSORES_V1: {de: number; ate: number; pts: CP[]; clicks: number[]; seta: boolean}[] = [
  {
    de: 37.03,
    ate: 40.62,
    pts: [
      {t: 37.03, x: 1739, y: 470},
      {t: 40.62, x: 1739, y: 470},
    ],
    clicks: [40.3],
    seta: false,
  },
  {
    de: 57.39,
    ate: 60.0,
    pts: [
      {t: 57.6, x: 1200, y: 560},
      {t: 59.45, x: 1712, y: 25},
      {t: 60.0, x: 1712, y: 25},
    ],
    clicks: [59.75],
    seta: true,
  },
  {
    de: 71.18,
    ate: 77.44,
    pts: [
      {t: 71.6, x: 1250, y: 640},
      {t: 73.5, x: 1560, y: 412},
      {t: 77.44, x: 1560, y: 412},
    ],
    clicks: [73.85],
    seta: true,
  },
];
const CURSORES = CURSORES_V1.map((c) => ({...c, de: W(c.de), ate: W(c.ate), pts: c.pts.map((q) => ({...q, t: W(q.t)})), clicks: c.clicks.map(W)}));

const CursorTela: React.FC<{g: number}> = ({g}) => {
  const c = CURSORES.find((k) => g >= k.de && g < k.ate);
  if (!c) return null;
  // na gravação rolada com ⓘ o cursor real já aparece no quadro: só desenha o clique
  const desenhaSeta = c.seta;
  let sx = c.pts[0].x;
  let sy = c.pts[0].y;
  for (let i = 0; i < c.pts.length - 1; i++) {
    const a = c.pts[i];
    const b = c.pts[i + 1];
    if (g >= a.t && g <= b.t) {
      const u = Easing.bezier(0.55, 0, 0.25, 1)((g - a.t) / Math.max(b.t - a.t, 1e-3));
      sx = a.x + (b.x - a.x) * u;
      sy = a.y + (b.y - a.y) * u;
    } else if (g > b.t) {
      sx = b.x;
      sy = b.y;
    }
  }
  const {X, Y} = toScreen(g, sx, sy);
  const op = ramp(g, c.pts[0].t - 0.2, c.pts[0].t, 0, 1);
  let sc = 1;
  const ripples: React.ReactNode[] = [];
  c.clicks.forEach((k, i) => {
    const d = g - k;
    if (d >= 0 && d < 0.28) sc = 1 - 0.16 * Math.sin((Math.PI * d) / 0.28);
    if (d >= 0 && d < 0.55) {
      const u = d / 0.55;
      ripples.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: X - 10 - 40 * u,
            top: Y - 10 - 40 * u,
            width: 20 + 80 * u,
            height: 20 + 80 * u,
            borderRadius: '50%',
            border: `3px solid rgba(109,93,246,${0.65 * (1 - u)})`,
            background: `rgba(109,93,246,${0.14 * (1 - u)})`,
          }}
        />,
      );
    }
  });
  return (
    <>
      {ripples}
      {desenhaSeta && (
        <svg
          width={30}
          height={37}
          viewBox="0 0 26 32"
          style={{position: 'absolute', left: X - 3, top: Y - 2, opacity: op, transform: `scale(${sc})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 4px 8px rgba(20,10,60,0.3))'}}
        >
          <path d="M3 2 L3 26 L9.5 19.8 L14 29.5 L18.2 27.6 L13.8 18.2 L22.5 18.2 Z" fill="#111" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
};

const EMAIL = 'contato@odontosorrisopleno.com.br';

/** Sobreposições em coordenadas da gravação (acompanham o zoom). */
const Sobreposicoes: React.FC<{g: number}> = ({g}) => {
  const out: React.ReactNode[] = [];
  if (g < W(11.95)) {
    // foto do usuário e widget do gravador no trecho em vídeo
    out.push(
      <div key="av" style={{position: 'absolute', left: 10, top: 862, width: 36, height: 34, background: '#fff'}}>
        <div style={{position: 'absolute', left: 2, top: 1, width: 32, height: 32, borderRadius: 32, background: '#C4B6FF', color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>AB</div>
      </div>,
      <div key="wg" style={{position: 'absolute', left: 1652, top: 482, width: 76, height: 338, background: '#fff'}} />,
    );
  }
  if (g >= W(60.0) && g < W(71.18)) {
    // e-mail sendo digitado no campo
    const n = Math.round(ramp(g, W(60.8), W(62.6), 0, EMAIL.length, Easing.linear));
    const blink = Math.floor(g * 2) % 2 === 0 || (g > W(60.8) && g < W(62.8));
    out.push(
      <div key="em" style={{position: 'absolute', left: 702, top: 418, width: 394, height: 27, background: '#fff', display: 'flex', alignItems: 'center', paddingLeft: 10, fontFamily: FONT, fontSize: 13, color: '#2A2838', boxSizing: 'border-box'}}>
        {n === 0 ? <span style={{color: '#A8A6B3'}}>nome@empresa.com.br</span> : EMAIL.slice(0, n)}
        <span style={{width: 1, height: 15, background: '#2A2838', marginLeft: 1, opacity: blink ? 1 : 0}} />
      </div>,
    );
  }
  return <>{out}</>;
};

const Gravacao: React.FC = () => {
  const t = useSec();
  const g = TELA_DE + t;
  const dur = TELA_ATE - TELA_DE;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const [cx, cy, z] = zoomAt(g);
  const x = clampC(cx, z);
  const y = clampC(cy, z);
  const s = CW / SW;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            width: CW,
            height: CH,
            borderRadius: 26,
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 20px 50px -20px rgba(60,35,150,0.25), 0 0 0 1px rgba(30,20,80,0.08)',
            transform: `translateY(${(1 - p) * 80}px) scale(${0.92 + 0.08 * p + outP * 0.02})`,
            opacity: pc * (1 - outP),
            filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
          }}
        >
          <div style={{width: CW, height: CH, transformOrigin: '0 0', transform: `scale(${z}) translate(${(0.5 / z - x) * CW}px, ${(0.5 / z - y) * CH}px)`}}>
            <div style={{width: SW, height: SH, transformOrigin: '0 0', transform: `scale(${s})`, position: 'relative'}}>
              {SEGS.map((sg, i) => {
                const fa = Math.round((sg.de - TELA_DE) * FPS);
                const fb = Math.round((sg.ate - TELA_DE) * FPS);
                return (
                  <Sequence key={i} from={fa} durationInFrames={fb - fa} layout="none">
                    {sg.img ? (
                      <Img src={staticFile(`central/${sg.img}`)} style={{position: 'absolute', left: 0, top: 0, width: SW, height: SH}} />
                    ) : (
                      <OffthreadVideo src={staticFile('central/gravacao.mp4')} startFrom={Math.round((sg.video ?? 0) * FPS)} muted style={{position: 'absolute', left: 0, top: 0, width: SW, height: SH}} />
                    )}
                  </Sequence>
                );
              })}
              <Sobreposicoes g={g} />
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: 1 - outP}}>
        <CursorTela g={g} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const CENAS: [number, number, React.FC<{g0: number; dur: number}>][] = [
  [0, TELA_DE, Abertura],
  [TELA_ATE, W(84.37), Oportunidades],
  [W(84.37), DURACAO_S, Final],
];

export const CentralClientes: React.FC = () => (
  <AbsoluteFill style={{fontFamily: FONT, color: C.text}}>
    <Background />
    <Sequence from={Math.round(TELA_DE * FPS)} durationInFrames={Math.round((TELA_ATE - TELA_DE) * FPS)}>
      <Gravacao />
    </Sequence>
    {CENAS.map(([a, b, Cena]) => (
      <Sequence key={a} from={Math.round(a * FPS)} durationInFrames={Math.round(b * FPS) - Math.round(a * FPS)}>
        <Cena g0={a} dur={b - a} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
