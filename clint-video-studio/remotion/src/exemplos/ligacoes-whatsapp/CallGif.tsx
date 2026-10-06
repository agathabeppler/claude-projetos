import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// GIF 260x346 desenhado em 870x1158 (3,346x) e reduzido na exportação.
export const GIF_W = 870;
export const GIF_H = 1158;
export const GIF_FPS = 25;
export const GIF_DUR = 5.6;

const T = {iconClick: 0.8, menu: 0.9, hover: 1.35, waClick: 1.6, toPhone: 1.8, answer: 3.9, loop: 5.15};
const FONT = "Poppins, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const PHONE_FONT = "Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const C = {screen: '#1B1B20', white: '#FFFFFF', grey: '#9A9AA3', green: '#25D366', red: '#F0453A', accent: '#8F84F7', panel: '#141416'};
const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const BG = 'linear-gradient(180deg, #CBC9F7 0%, #E4E1FA 30%, #F4F1FB 55%, #F7E6F7 80%, #F8DDF4 100%)';

// ---------- ícones (traço estilo lucide) ----------
const I: Record<string, React.ReactNode> = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />,
  clockPlus: (
    <>
      <path d="M21 12a9 9 0 1 1-6-8.5" />
      <path d="M12 7v5l3 2M19 2v6M16 5h6" />
    </>
  ),
  note: <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5zM15 3v6h6" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  plus: <path d="M12 5v14M5 12h14" />,
  wa: (
    <path d="M3 21l1.7-4.6A8.5 8.5 0 1 1 8 19.6zM9 9.5c0 3 2.5 5.5 5.5 5.5l1.5-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" />
  ),
};
const Ico: React.FC<{n: string; s: number; c: string; w?: number}> = ({n, s, c, w = 2}) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    {I[n]}
  </svg>
);

const WhatsAppIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 6.9L3.2 29l6.5-1.7c1.9 1 4.1 1.6 6.3 1.6 7.2 0 13-5.7 13-12.8C29 8.7 23.2 3 16 3z" stroke="#5BE584" strokeWidth={2.4} strokeLinejoin="round" />
    <path
      d="M11.6 9.6c.3 0 .6 0 .8.5l1.2 2.8c.1.3.1.6-.1.8l-.9 1c-.2.2-.2.5 0 .8.6 1 1.4 1.9 2.3 2.6.8.6 1.5 1 2.3 1.3.3.1.6 0 .8-.2l1-1.2c.2-.3.5-.3.8-.2l2.7 1.3c.3.1.5.4.5.7 0 .8-.3 1.9-1.4 2.5-1 .6-2.4.7-4.3 0-2.4-.9-4.6-2.6-6.1-4.8-1-1.4-1.6-2.9-1.6-4.2 0-1.4.6-2.4 1.2-3 .3-.4.6-.5.8-.5z"
      fill="#5BE584"
    />
  </svg>
);

const PhoneGlyph: React.FC<{size: number; rotate?: number}> = ({size, rotate = 0}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" style={{transform: `rotate(${rotate}deg)`}}>
    <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
  </svg>
);

const Cursor: React.FC<{x: number; y: number; press: number; opacity: number}> = ({x, y, press, opacity}) => (
  <svg
    width={58}
    height={72}
    viewBox="0 0 26 32"
    style={{position: 'absolute', left: x - 5, top: y - 3, opacity, transform: `scale(${1 - 0.18 * press})`, transformOrigin: '5px 3px', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))'}}
  >
    <path d="M3 2 L3 26 L9.5 19.8 L14 29.5 L18.2 27.6 L13.8 18.2 L22.5 18.2 Z" fill="#111" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
  </svg>
);

// ---------- cena 1: painel do contato na Clint ----------
const CARD = {x: 40, y: 254, w: 790, h: 650};
const ICON_Y = 250;
const ICON_X0 = 62;
const ICON_GAP = 122;
const MENU = {x: 34, y: 352, w: 660, rowH: 112};

const Panel: React.FC<{menu: number; hover: number; iconPress: number; rowPress: number}> = ({menu, hover, iconPress, rowPress}) => (
  <div
    style={{
      position: 'absolute',
      left: CARD.x,
      top: CARD.y,
      width: CARD.w,
      height: CARD.h,
      borderRadius: 34,
      background: C.panel,
      overflow: 'hidden',
      boxShadow: '0 40px 80px -30px rgba(60,40,140,0.45), 0 0 0 1.5px rgba(255,255,255,0.06)',
      fontFamily: FONT,
    }}
  >
    {/* cabeçalho do contato */}
    <div style={{position: 'absolute', left: 50, top: 46, width: 136, height: 136}}>
      <Img src={staticFile('avatar_contato_gif.png')} style={{width: '100%', height: '100%'}} />
    </div>
    <div style={{position: 'absolute', left: 222, top: 52, color: '#E9E9EE', fontSize: 40, fontWeight: 600, letterSpacing: -0.5}}>Maurício Andrade</div>
    <div style={{position: 'absolute', left: 222, top: 120, display: 'flex', alignItems: 'center', gap: 34}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '6px 18px 6px 26px', borderRadius: 40, background: '#26262C', color: '#B9AEFF', fontSize: 33}}>
        cliente <Ico n="x" s={34} c="#B9AEFF" w={2.4} />
      </div>
      <Ico n="plus" s={38} c="#D0D0D6" w={2.4} />
    </div>
    {/* ícones de ação */}
    {['phone', 'calendar', 'mail', 'bell', 'clockPlus', 'note'].map((n, i) => (
      <div
        key={n}
        style={{
          position: 'absolute',
          left: ICON_X0 + i * ICON_GAP - 18,
          top: ICON_Y - 18,
          width: 84,
          height: 84,
          borderRadius: 20,
          background: i === 0 ? `rgba(143,132,247,${0.18 * menu})` : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: i === 0 ? `scale(${1 - 0.1 * iconPress})` : undefined,
        }}
      >
        <Ico n={n} s={48} c={C.accent} />
      </div>
    ))}
    <div style={{position: 'absolute', left: 0, right: 0, top: 368, height: 2, background: '#26262C'}} />
    {/* menu suspenso */}
    <div
      style={{
        position: 'absolute',
        left: MENU.x,
        top: MENU.y,
        width: MENU.w,
        padding: 16,
        boxSizing: 'border-box',
        borderRadius: 22,
        background: '#1D1D21',
        border: '2px solid #34343B',
        boxShadow: '0 24px 50px -10px rgba(0,0,0,0.6)',
        opacity: Math.min(menu, 1),
        transform: `translateY(${(1 - menu) * -18}px) scale(${0.96 + 0.04 * menu})`,
        transformOrigin: '60px 0',
      }}
    >
      {[
        {icon: <Ico n="phone" s={44} c="#A6A6AE" />, text: 'Chamar pelo telefone', on: 0},
        {icon: <Ico n="wa" s={46} c={hover > 0.5 ? '#B4A9FF' : '#A6A6AE'} />, text: 'Chamar pelo WhatsApp', on: hover},
      ].map((r, i) => (
        <div
          key={i}
          style={{
            height: MENU.rowH,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            padding: '0 28px',
            background: `rgba(77,66,160,${0.42 * r.on})`,
            color: r.on > 0.5 ? '#B4A9FF' : '#A6A6AE',
            fontSize: 37,
            transform: i === 1 ? `scale(${1 - 0.03 * rowPress})` : undefined,
          }}
        >
          {r.icon}
          {r.text}
        </div>
      ))}
    </div>
  </div>
);

// ---------- cena 2: celular tocando ----------
const PhoneScene: React.FC<{t: number; ans: boolean; secs: number}> = ({t, ans, secs}) => {
  const dots = '.'.repeat(1 + (Math.floor(t * 3) % 3));
  return (
    <div style={{position: 'absolute', left: 65, top: 182, width: 735, height: 1200}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 100, background: 'linear-gradient(180deg, #605D72 0%, #6E6577 100%)', boxShadow: '0 30px 60px -20px rgba(60,40,120,0.35)'}} />
      <div style={{position: 'absolute', left: 33, top: 33, right: 33, height: 1200, borderRadius: 66, background: C.screen, overflow: 'hidden', fontFamily: PHONE_FONT}}>
        <div style={{position: 'absolute', left: -98, top: -215, width: GIF_W, height: GIF_H}}>
          <div style={{position: 'absolute', left: 0, right: 0, top: 338, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30}}>
            <WhatsAppIcon size={62} />
            <div style={{color: C.white, fontSize: 27}}>Ligação de voz do WhatsApp</div>
          </div>
          {!ans &&
            [0, 1, 2].map((k) => {
              const u = ((t * 0.85 + k / 3) % 1 + 1) % 1;
              return (
                <div
                  key={k}
                  style={{
                    position: 'absolute',
                    left: 433 - 103 - 120 * u,
                    top: 708 - 103 - 120 * u,
                    width: 206 + 240 * u,
                    height: 206 + 240 * u,
                    borderRadius: '50%',
                    border: `3px solid rgba(91,229,132,${0.55 * (1 - u)})`,
                  }}
                />
              );
            })}
          <div style={{position: 'absolute', left: 433 - 103, top: 708 - 103, width: 206, height: 206, transform: `scale(${ans ? 1 : 1 + 0.03 * Math.sin(t * 7)})`}}>
            <Img src={staticFile('avatar_contato_gif.png')} style={{width: '100%', height: '100%'}} />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 838, textAlign: 'center', color: C.white, fontSize: 38}}>Maurício</div>
          <div style={{position: 'absolute', left: 0, right: 0, top: 912, textAlign: 'center', color: C.grey, fontSize: 31, fontVariantNumeric: 'tabular-nums'}}>
            {ans ? `00:0${secs}` : `Chamando${dots}`}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 433 - 52,
              top: 1000,
              width: 104,
              height: 104,
              borderRadius: 104,
              background: C.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px -8px rgba(240,69,58,0.55)',
            }}
          >
            <PhoneGlyph size={44} rotate={135} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CallGif: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const sp = (at: number, cfg = {damping: 200, stiffness: 140}) => spring({frame: f - Math.round(at * fps), fps, config: cfg});

  const pulse = (at: number, d = 0.26) => (t > at && t < at + d ? Math.sin(((t - at) / d) * Math.PI) : 0);
  const menu = sp(T.menu, {damping: 18, stiffness: 190});
  const hover = interpolate(t, [T.hover, T.hover + 0.12], [0, 1], CLAMP);

  // cursor: entra -> ícone de telefone -> "Chamar pelo WhatsApp"
  const ease = Easing.bezier(0.55, 0, 0.25, 1);
  const iconPt = {x: CARD.x + ICON_X0 + 24, y: CARD.y + ICON_Y + 26};
  const waPt = {x: CARD.x + MENU.x + 380, y: CARD.y + MENU.y + 16 + MENU.rowH * 1.5};
  let cx = interpolate(t, [0.1, 0.7], [700, iconPt.x], {...CLAMP, easing: ease});
  let cy = interpolate(t, [0.1, 0.7], [1080, iconPt.y], {...CLAMP, easing: ease});
  if (t > 1.0) {
    cx = interpolate(t, [1.0, 1.45], [iconPt.x, waPt.x], {...CLAMP, easing: ease});
    cy = interpolate(t, [1.0, 1.45], [iconPt.y, waPt.y], {...CLAMP, easing: ease});
  }
  const iconPress = pulse(T.iconClick);
  const rowPress = pulse(T.waClick);
  const cursorOp = interpolate(t, [0.05, 0.25, T.toPhone - 0.05, T.toPhone + 0.1], [0, 1, 1, 0], CLAMP);

  // transição painel -> celular
  const out = interpolate(t, [T.toPhone, T.toPhone + 0.3], [0, 1], {...CLAMP, easing: Easing.in(Easing.cubic)});
  const phoneIn = sp(T.toPhone + 0.12, {damping: 20, stiffness: 120});
  const tp = t - (T.toPhone + 0.12);
  const ans = t >= T.answer;
  const secs = ans ? 1 + Math.floor(t - T.answer) : 0;
  const buzz = (a: number, b: number) => (t > a && t < b ? Math.sin(t * 95) * 4 * Math.sin(((t - a) / (b - a)) * Math.PI) : 0);
  const shake = buzz(2.25, 2.85) + buzz(3.15, 3.75);

  // loop: volta suave ao primeiro quadro
  const loopBack = interpolate(t, [T.loop, GIF_DUR], [0, 1], {...CLAMP, easing: Easing.inOut(Easing.cubic)});

  return (
    <AbsoluteFill style={{background: BG}}>
      {out < 1 && (
        <div style={{position: 'absolute', inset: 0, opacity: 1 - out, filter: `blur(${out * 10}px)`, transform: `scale(${1 - 0.05 * out})`}}>
          <Panel menu={menu} hover={hover} iconPress={iconPress} rowPress={rowPress} />
        </div>
      )}
      {t > T.toPhone && (
        <div style={{position: 'absolute', inset: 0, opacity: Math.min(phoneIn, 1), transform: `translate(${shake}px, ${(1 - phoneIn) * 260}px)`}}>
          <PhoneScene t={tp} ans={ans} secs={secs} />
        </div>
      )}
      <Cursor x={cx} y={cy} press={Math.max(iconPress, rowPress)} opacity={cursorOp} />
      {loopBack > 0 && (
        <AbsoluteFill style={{background: BG, opacity: loopBack}}>
          <Panel menu={0} hover={0} iconPress={0} rowPress={0} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
