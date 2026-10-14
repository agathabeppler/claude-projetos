import React from 'react';
import {AbsoluteFill, Easing, Img, staticFile} from 'remotion';
import {C} from '../theme';
import {Abs, Cursor, Grad, Icon, IconTile, Logo, Pop, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../ui';

// Peças compartilhadas pelos 5 vídeos das LPs de parceiros.
// Toda cena recebe g0 (início global, s) e dur; L(s) = s - g0 converte o tempo da narração para o tempo local.
export type CenaProps = {g0: number; dur: number};
export const mk = (g0: number) => (s: number) => s - g0;

export const Chip: React.FC<{icon: string; text: string; color?: string; tint?: string; size?: number}> = ({
  icon,
  text,
  color = C.purple,
  tint = C.purpleTint,
  size = 25,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.56,
      padding: `${size * 0.56}px ${size * 0.96}px ${size * 0.56}px ${size * 0.56}px`,
      borderRadius: 99,
      background: 'rgba(255,255,255,0.92)',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: size,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={{width: size * 1.6, height: size * 1.6, borderRadius: 99, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={size * 0.84} color={color} stroke={2.5} />
    </div>
    {text}
  </div>
);

export const Row: React.FC<{text: string; ok: boolean; at: number; size?: number}> = ({text, ok, at, size = 26}) => (
  <Pop at={at} y={14} blur={6}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: size, fontWeight: 500, color: ok ? C.text : C.muted}}>
      <div
        style={{
          width: size * 1.4,
          height: size * 1.4,
          borderRadius: 99,
          background: ok ? C.greenTint : C.redTint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={ok ? 'check' : 'x'} size={size * 0.78} color={ok ? C.green : C.red} stroke={2.6} />
      </div>
      {text}
    </div>
  </Pop>
);

/** Marca "oficial" (selo azul do WhatsApp/Meta) desenhada em SVG. */
export const Selo: React.FC<{size?: number}> = ({size = 40}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 1.5l2.4 1.8 3-.1.9 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.8-3-.1L12 22.5l-2.4-1.8-3 .1-.9-2.8-2.4-1.8 1-2.8-1-2.8 2.4-1.8.9-2.8 3 .1z"
      fill="#1D9BF0"
    />
    <path d="M8 12.2l2.6 2.6L16.2 9" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsIcon: React.FC<{size?: number}> = ({size = 40}) => <Img src={staticFile('whatsapp.svg')} style={{width: size, height: size}} />;

/** Logo da Clint num quadrado em gradiente. */
export const ClintTile: React.FC<{size?: number}> = ({size = 76}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Logo height={size * 0.52} color="#fff" iconOnly />
  </div>
);

/** Celular simples (moldura + topo de conversa), usado em várias dores. */
export const Celular: React.FC<{w?: number; h?: number; titulo?: string; children?: React.ReactNode; style?: React.CSSProperties}> = ({
  w = 400,
  h = 800,
  titulo = 'WhatsApp',
  children,
  style,
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 58,
      background: '#16142B',
      padding: 14,
      boxSizing: 'border-box',
      boxShadow: '0 60px 110px -40px rgba(40,25,110,0.55), 0 0 0 2px rgba(255,255,255,0.4) inset',
      ...style,
    }}
  >
    <div style={{width: '100%', height: '100%', borderRadius: 46, overflow: 'hidden', background: '#EFE7DE', display: 'flex', flexDirection: 'column', position: 'relative'}}>
      <div style={{height: 120, background: '#0F7A63', display: 'flex', alignItems: 'flex-end', padding: '0 26px 20px', boxSizing: 'border-box', gap: 16, color: '#fff'}}>
        <WhatsIcon size={42} />
        <div style={{fontSize: 26, fontWeight: 600}}>{titulo}</div>
      </div>
      <div style={{flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 14}}>{children}</div>
    </div>
  </div>
);

export const Balao: React.FC<{me?: boolean; w?: number; blur?: number; children?: React.ReactNode}> = ({me, w = 230, blur = 0, children}) => (
  <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start'}}>
    <div
      style={{
        width: children ? undefined : w,
        maxWidth: 300,
        minHeight: 26,
        background: me ? '#D9FDD3' : '#fff',
        borderRadius: 18,
        padding: '14px 18px',
        fontSize: 20,
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
    >
      {children ?? <div style={{height: 12, borderRadius: 12, background: me ? '#B8E6B0' : '#E4E2EC', width: '80%'}} />}
    </div>
  </div>
);

/**
 * Espaço reservado para uma gravação de tela da conta demo (ainda não gravada).
 * Aparece no storyboard no lugar exato da gravação, com o que ela vai mostrar em cada trecho.
 */
export const TelaPendente: React.FC<CenaProps & {itens: [number, string][]}> = ({g0, dur, itens}) => {
  const L = mk(g0);
  const t = useSec();
  const S = 0.86;
  const atual = itens.reduce((acc, [s], i) => (t >= L(s) ? i : acc), 0);
  return (
    <Scene dur={dur} push={0.015}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pop at={0} y={60}>
          <div
            style={{
              width: 1920 * S,
              height: 1080 * S,
              borderRadius: 26,
              background: 'linear-gradient(160deg, #23203A 0%, #16142B 100%)',
              boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 0 0 1px rgba(30,20,80,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 34,
              color: '#fff',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, letterSpacing: 2, color: '#B7A8FF', fontWeight: 600}}>
              <div style={{width: 14, height: 14, borderRadius: 14, background: C.red, opacity: 0.6 + 0.4 * Math.sin(t * 5)}} />
              GRAVAÇÃO DA CLINT (CONTA DEMO)
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start'}}>
              {itens.map(([s, txt], i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 22, fontSize: 40, fontWeight: i === atual ? 600 : 400, opacity: i === atual ? 1 : 0.38}}>
                  <div style={{width: 56, fontSize: 22, color: '#8F89B5', fontVariantNumeric: 'tabular-nums'}}>{s.toFixed(1)}s</div>
                  {txt}
                </div>
              ))}
            </div>
          </div>
        </Pop>
      </AbsoluteFill>
    </Scene>
  );
};

/** Botão final "Quero ser parceiro Clint": entra em "Seja", é clicado em "Clint" e a cena escurece para a vinheta. */
export const Chamada: React.FC<CenaProps & {titulo: string; tTitulo: number; tSeja: number; tClint: number; largura?: number}> = ({g0, dur, titulo, tTitulo, tSeja, tClint, largura = 1420}) => {
  const L = mk(g0);
  const t = useSec();
  const click = L(tClint) + 0.15;
  const pressed = t > click && t < click + 0.25 ? Math.sin(((t - click) / 0.25) * Math.PI) : 0;
  const glow = useSpring(click + 0.1);
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={(1920 - largura) / 2} y={200} w={largura}>
        <Words text={titulo} at={L(tTitulo)} size={72} stagger={0.06} />
      </Abs>
      {[0, 1, 2].map((k) => {
        const u = ((((t - click) * 0.6 + k / 3) % 1) + 1) % 1;
        const on = Math.min(glow, 1);
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 960 - 330 - 120 * u,
              top: 640 - 70 - 120 * u,
              width: 660 + 240 * u,
              height: 140 + 240 * u,
              borderRadius: 999,
              border: `3px solid rgba(168,108,242,${0.4 * (1 - u) * on})`,
            }}
          />
        );
      })}
      <Abs x={960} y={640} center>
        <Pop at={L(tSeja) - 0.1} y={50} pop>
          <div
            style={{
              transform: `scale(${1 - 0.06 * pressed})`,
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '34px 58px',
              borderRadius: 99,
              background: C.grad,
              boxShadow: '0 30px 60px -18px rgba(109,93,246,0.6)',
              color: '#fff',
              fontSize: 46,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <Logo height={44} color="#fff" iconOnly />
            Quero ser parceiro Clint
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={900} center>
        <Pop at={click + 0.25} y={16}>
          <Logo height={52} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={560} at={click + 0.1} />
      <Sparkle x={1360} y={520} at={click + 0.2} size={22} color="#B7A8FF" />
      <Sparkle x={1420} y={760} at={click + 0.3} size={30} />
      <Cursor
        pts={[
          {t: L(tSeja) + 0.1, x: 1560, y: 1000},
          {t: click - 0.05, x: 1120, y: 660},
          {t: click + 1.2, x: 1150, y: 700},
        ]}
        clicks={[click]}
        hide={click + 1}
      />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};

/** Vendas voltando para Meta (e Google): usado na LP3 e na LP4. */
export const Conversoes: React.FC<CenaProps & {titulo: string; tTitulo: number; tVenda: number; destinos: {nome: string; at: number}[]; tFrase?: number; frase?: string}> = ({
  g0,
  dur,
  titulo,
  tTitulo,
  tVenda,
  destinos,
  tFrase,
  frase,
}) => {
  const L = mk(g0);
  const t = useSec();
  const ys = destinos.length === 1 ? [600] : [470, 730];
  return (
    <Scene dur={dur}>
      <Abs x={0} y={130} w={1920}>
        <Words text={titulo} at={L(tTitulo)} size={66} />
      </Abs>
      <Abs x={520} y={600} center>
        <Pop at={L(tVenda) - 0.2} y={40} pop>
          <div style={card({width: 470, padding: 32, borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <ClintTile size={64} />
              <div>
                <div style={{fontSize: 28, fontWeight: 600}}>Venda fechada</div>
                <div style={{fontSize: 21, color: C.muted}}>Rafaela Silva · R$ 4.800</div>
              </div>
            </div>
            <div style={{marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 20, fontWeight: 600}}>
              <Icon name="check" size={18} color={C.green} stroke={3} /> Ganho
            </div>
          </div>
        </Pop>
      </Abs>
      {destinos.map((d, i) => {
        const y = ys[i];
        const u = ramp(t, L(d.at) - 0.5, L(d.at) + 0.3, 0, 1, Easing.inOut(Easing.cubic));
        const x0 = 770;
        const x1 = 1260;
        const dotX = x0 + (x1 - x0) * u;
        const dotY = 600 + (y - 600) * u;
        return (
          <React.Fragment key={d.nome}>
            <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
              <path d={`M${x0} 600 C ${x0 + 220} 600, ${x1 - 220} ${y}, ${x1} ${y}`} stroke="rgba(109,93,246,0.25)" strokeWidth={4} strokeDasharray="10 12" fill="none" opacity={ramp(t, L(d.at) - 0.8, L(d.at) - 0.4)} />
            </svg>
            <div
              style={{
                position: 'absolute',
                left: dotX - 18,
                top: dotY - 18,
                width: 36,
                height: 36,
                borderRadius: 36,
                background: C.grad,
                boxShadow: '0 0 0 8px rgba(168,108,242,0.18)',
                opacity: u > 0 && u < 1 ? 1 : 0,
              }}
            />
            <Abs x={x1 + 20} y={y - 60}>
              <Pop at={L(d.at) - 0.3} x={-30} y={0} pop>
                <div style={card({padding: '22px 34px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 18, whiteSpace: 'nowrap'})}>
                  <div style={{fontSize: 38, fontWeight: 700, color: d.nome === 'Meta' ? '#0866FF' : '#4285F4'}}>{d.nome}</div>
                  <Pop at={L(d.at) + 0.35} pop s={0.5} y={0}>
                    <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 19, fontWeight: 600}}>
                      <Icon name="check" size={16} color={C.green} stroke={3} /> +1 venda
                    </div>
                  </Pop>
                </div>
              </Pop>
            </Abs>
          </React.Fragment>
        );
      })}
      {frase && tFrase !== undefined && (
        <Abs x={0} y={900} w={1920}>
          <Words text={frase} at={L(tFrase)} size={44} weight={500} color={C.muted} stagger={0.05} />
        </Abs>
      )}
    </Scene>
  );
};

export {Abs, C, Cursor, Easing, Grad, Icon, IconTile, Logo, Pop, Scene, Sparkle, Words, card, ramp, useSec, useSpring, AbsoluteFill};
