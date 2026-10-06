import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from './theme';

const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const useSec = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return f / fps;
};

export const SMOOTH = {damping: 200, stiffness: 120, mass: 0.9};
export const POP = {damping: 16, stiffness: 170, mass: 0.75};

export const useSpring = (at: number, config = SMOOTH) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - Math.round(at * fps), fps, config});
};

export const ramp = (t: number, a: number, b: number, from = 0, to = 1, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [from, to], {...CLAMP, easing: ease});

/** Entrada com blur + leve subida (e saída opcional) — o "movimento" padrão do vídeo. */
export const Pop: React.FC<{
  at: number;
  out?: number;
  y?: number;
  x?: number;
  s?: number;
  blur?: number;
  pop?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({at, out, y = 28, x = 0, s = 0.94, blur = 12, pop, style, children}) => {
  const p = useSpring(at, pop ? POP : SMOOTH);
  const q = useSpring(out ?? 9999, {damping: 200, stiffness: 220, mass: 0.7});
  const pc = Math.min(p, 1);
  return (
    <div
      style={{
        opacity: pc * (1 - q),
        transform: `translate(${(1 - p) * x}px, ${(1 - p) * y - q * 14}px) scale(${s + (1 - s) * p - q * 0.04})`,
        filter: `blur(${(1 - pc) * blur + q * blur}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Wrapper de cena: entra com blur-dissolve, empurra a câmera devagar e sai com blur. */
export const Scene: React.FC<{dur: number; push?: number; children: React.ReactNode}> = ({dur, push = 0.035, children}) => {
  const t = useSec();
  const inP = ramp(t, 0, 0.42, 0, 1, Easing.out(Easing.cubic));
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const scale = 0.975 + 0.025 * inP + push * (t / dur) + outP * 0.02;
  return (
    <AbsoluteFill
      style={{
        opacity: inP * (1 - outP),
        filter: `blur(${(1 - inP) * 10 + outP * 12}px)`,
        transform: `scale(${scale})`,
        fontFamily: FONT,
        color: C.text,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Background: React.FC = () => {
  const t = useSec();
  const blobs = [
    {x: 180, y: 940, r: 760, c: 'rgba(255, 170, 212, 0.55)', ax: 90, ay: 50, sp: 0.17, ph: 0},
    {x: 1720, y: 960, r: 820, c: 'rgba(160, 145, 255, 0.55)', ax: 110, ay: 60, sp: 0.13, ph: 1.7},
    {x: 980, y: 1180, r: 700, c: 'rgba(255, 204, 172, 0.5)', ax: 160, ay: 40, sp: 0.11, ph: 3.1},
    {x: 1780, y: 110, r: 560, c: 'rgba(190, 180, 255, 0.38)', ax: 70, ay: 60, sp: 0.15, ph: 4.2},
    {x: 120, y: 120, r: 520, c: 'rgba(255, 210, 230, 0.4)', ax: 80, ay: 50, sp: 0.12, ph: 5.3},
  ];
  return (
    <AbsoluteFill style={{background: C.bg, overflow: 'hidden'}}>
      {blobs.map((b, i) => {
        const x = b.x + b.ax * Math.sin(t * b.sp * 2 * Math.PI * 0.5 + b.ph);
        const y = b.y + b.ay * Math.cos(t * b.sp * 2 * Math.PI * 0.4 + b.ph);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - b.r,
              top: y - b.r,
              width: b.r * 2,
              height: b.r * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle at center, ${b.c} 0%, transparent 66%)`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 55%)'}} />
    </AbsoluteFill>
  );
};

// ---------- tipografia ----------
export const Grad: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{background: C.grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: 6}}>
    {children}
  </span>
);

/** Revela palavra por palavra. Palavras entre [colchetes] ganham gradiente. */
export const Words: React.FC<{text: string; at: number; size?: number; weight?: number; color?: string; stagger?: number; out?: number; align?: 'left' | 'center'}> = ({
  text,
  at,
  size = 66,
  weight = 600,
  color = C.text,
  stagger = 0.065,
  out,
  align = 'center',
}) => {
  const tokens = text.split(' ');
  let grad = false;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        columnGap: size * 0.26,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: -size * 0.025,
        lineHeight: 1.18,
        color,
      }}
    >
      {tokens.map((tok, i) => {
        let w = tok;
        if (w.startsWith('[')) {
          grad = true;
          w = w.slice(1);
        }
        const isGrad = grad;
        if (w.endsWith(']')) {
          grad = false;
          w = w.slice(0, -1);
        }
        return (
          <Pop key={i} at={at + i * stagger} out={out} y={size * 0.35} s={1} blur={10}>
            {isGrad ? <Grad>{w}</Grad> : w}
          </Pop>
        );
      })}
    </div>
  );
};

export const Eyebrow: React.FC<{children: React.ReactNode; color?: string; tint?: string}> = ({children, color = C.purple, tint = C.purpleTint}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 22px',
      borderRadius: 99,
      background: tint,
      color,
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: 0.2,
    }}
  >
    <div style={{width: 9, height: 9, borderRadius: 9, background: color}} />
    {children}
  </div>
);

// ---------- superfícies ----------
export const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: '#fff',
  borderRadius: 28,
  boxShadow: C.shadow,
  border: `1px solid ${C.line}`,
  ...extra,
});

export const Abs: React.FC<{x: number; y: number; w?: number; h?: number; center?: boolean; style?: React.CSSProperties; children: React.ReactNode}> = ({
  x,
  y,
  w,
  h,
  center,
  style,
  children,
}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, transform: center ? 'translate(-50%, -50%)' : undefined, ...style}}>
    {children}
  </div>
);

// ---------- ícones (traço estilo lucide) ----------
const P: Record<string, React.ReactNode> = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  unlock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M16 3.1a4 4 0 0 1 0 7.8M22 21a7 7 0 0 0-4-6.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
    </>
  ),
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l4 2" />
    </>
  ),
  smartphone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </>
  ),
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chart: <path d="M3 3v18h18M7 16v-4M12 16V8M17 16v-7" />,
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
    </>
  ),
};

export const Icon: React.FC<{name: string; size?: number; color?: string; stroke?: number; style?: React.CSSProperties}> = ({
  name,
  size = 28,
  color = 'currentColor',
  stroke = 2,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {P[name]}
  </svg>
);

export const IconTile: React.FC<{name: string; size?: number; color?: string; tint?: string; radius?: number}> = ({
  name,
  size = 72,
  color = C.purple,
  tint = C.purpleTint,
  radius,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size * 0.28,
      background: tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Icon name={name} size={size * 0.46} color={color} />
  </div>
);

export const Sparkle: React.FC<{x: number; y: number; size?: number; at?: number; color?: string}> = ({x, y, size = 26, at = 0, color = '#F59BC6'}) => {
  const t = useSec();
  const p = useSpring(at, POP);
  const tw = 0.75 + 0.25 * Math.sin((t - at) * 3.2 + x);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{position: 'absolute', left: x, top: y, opacity: Math.min(p, 1) * 0.9, transform: `scale(${p * tw}) rotate(${t * 20}deg)`}}
    >
      <path d="M12 0c.6 5.6 2.4 7.6 12 12-9.6 4.4-11.4 6.4-12 12-.6-5.6-2.4-7.6-12-12C9.6 7.6 11.4 5.6 12 0z" fill={color} />
    </svg>
  );
};

export const Avatar: React.FC<{size?: number; img?: string; initials?: string; hue?: number; ring?: boolean; style?: React.CSSProperties}> = ({
  size = 64,
  img,
  initials,
  hue = 260,
  ring,
  style,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      background: img ? '#1d7f7c' : `linear-gradient(135deg, hsl(${hue} 85% 76%), hsl(${hue + 35} 80% 62%))`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 600,
      fontSize: size * 0.36,
      boxShadow: ring ? `0 0 0 ${size * 0.06}px #fff, 0 0 0 ${size * 0.1}px rgba(109,93,246,0.35)` : undefined,
      ...style,
    }}
  >
    {img ? <Img src={staticFile(img)} style={{width: '108%', height: '108%', objectFit: 'cover'}} /> : initials}
  </div>
);

/** Logo da Clint pintado via máscara (o SVG original é branco). iconOnly mostra só o símbolo. */
export const Logo: React.FC<{height: number; color?: string; iconOnly?: boolean}> = ({height, color = C.purple, iconOnly}) => {
  const full = (height * 86) / 26.4;
  return (
    <div style={{width: iconOnly ? height * 1.02 : full, height, overflow: 'hidden', flexShrink: 0}}>
      <div
        style={{
          width: full,
          height,
          background: color,
          WebkitMaskImage: `url(${staticFile('logo.svg')})`,
          WebkitMaskSize: '100% 100%',
          maskImage: `url(${staticFile('logo.svg')})`,
          maskSize: '100% 100%',
        }}
      />
    </div>
  );
};

export const Toggle: React.FC<{on: number}> = ({on}) => (
  <div
    style={{
      width: 76,
      height: 42,
      borderRadius: 42,
      padding: 4,
      background: interpolateColor(on),
      boxSizing: 'border-box',
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 34,
        background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        transform: `translateX(${on * 34}px)`,
      }}
    />
  </div>
);
const interpolateColor = (on: number) => {
  const a = [222, 220, 232];
  const b = [109, 93, 246];
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * Math.min(Math.max(on, 0), 1)));
  return `rgb(${m.join(',')})`;
};

export const Skeleton: React.FC<{w: number; h?: number; style?: React.CSSProperties}> = ({w, h = 14, style}) => {
  const t = useSec();
  const pos = ((t * 0.7) % 1) * 300 - 100;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: h,
        background: `linear-gradient(90deg, #EEEDF4 ${pos - 30}%, #F8F7FC ${pos}%, #EEEDF4 ${pos + 30}%)`,
        ...style,
      }}
    />
  );
};

// ---------- cursor ----------
type Pt = {t: number; x: number; y: number};
export const Cursor: React.FC<{pts: Pt[]; clicks?: number[]; hide?: number}> = ({pts, clicks = [], hide}) => {
  const t = useSec();
  let x = pts[0].x;
  let y = pts[0].y;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (t >= a.t && t <= b.t) {
      const u = Easing.bezier(0.55, 0, 0.25, 1)((t - a.t) / Math.max(b.t - a.t, 1e-3));
      x = a.x + (b.x - a.x) * u;
      y = a.y + (b.y - a.y) * u;
    } else if (t > b.t) {
      x = b.x;
      y = b.y;
    }
  }
  const op = ramp(t, pts[0].t - 0.25, pts[0].t, 0, 1) * (hide !== undefined ? ramp(t, hide, hide + 0.25, 1, 0) : 1);
  let sc = 1;
  const ripples: React.ReactNode[] = [];
  clicks.forEach((c, i) => {
    const d = t - c;
    if (d >= 0 && d < 0.28) sc = 1 - 0.16 * Math.sin((Math.PI * d) / 0.28);
    if (d >= 0 && d < 0.55) {
      const u = d / 0.55;
      ripples.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x - 8 - 34 * u,
            top: y - 8 - 34 * u,
            width: 16 + 68 * u,
            height: 16 + 68 * u,
            borderRadius: '50%',
            border: `3px solid rgba(109,93,246,${0.6 * (1 - u)})`,
            background: `rgba(109,93,246,${0.12 * (1 - u)})`,
          }}
        />,
      );
    }
  });
  return (
    <>
      {ripples}
      <svg
        width={34}
        height={42}
        viewBox="0 0 26 32"
        style={{
          position: 'absolute',
          left: x - 3,
          top: y - 2,
          opacity: op,
          transform: `scale(${sc})`,
          transformOrigin: '3px 2px',
          filter: 'drop-shadow(0 6px 10px rgba(20,10,60,0.3))',
        }}
      >
        <path d="M3 2 L3 26 L9.5 19.8 L14 29.5 L18.2 27.6 L13.8 18.2 L22.5 18.2 Z" fill="#111" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
      </svg>
    </>
  );
};

/** Avatar ilustrado do contato (sem rosto): gradiente pêssego com ícone de pessoa. */
export const ContactAvatar: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 64, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      background: 'linear-gradient(160deg, #FFC9A8 0%, #F59B7A 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    <Icon name="user" size={size * 0.5} color="#fff" stroke={2.2} />
  </div>
);
