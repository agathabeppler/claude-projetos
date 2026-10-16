import React from 'react';
import {AbsoluteFill, Easing, Img, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, ContactAvatar, Cursor, Grad, Icon, IconTile, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';

// Série Método de Aceleração Comercial · 01 Cliente oculto.
// Tempos = segundos da narração (videos/2026-10-16-metodo-01-cliente-oculto/entrada/narracao.palavras.txt).
// Dentro da cena: L(s) = M(s) - g0. Os tempos escritos aqui são da narração original (palavras.txt, speed 1);
// M converte para a narração final (entrada/narracao_final.wav, HeyGen speed 1,1, 102,0 s) por âncoras.
import {criarMapa} from '../metodo-tempo';
export const {M, inv} = criarMapa([
  [0, 0], [5.62, 4.67], [8.15, 6.97], [10.7, 9.43], [13.54, 11.99], [15.93, 14.14], [18.0, 15.99], [18.79, 16.58],
  [20.97, 18.52], [22.67, 19.84], [23.35, 20.34], [24.49, 21.42], [25.82, 22.55], [26.65, 23.25], [28.78, 25.19],
  [29.73, 25.92], [30.6, 26.54], [31.66, 27.35], [32.49, 28.01], [34.39, 29.45], [34.73, 29.73], [36.12, 30.85],
  [37.47, 31.98], [39.94, 34.01], [40.64, 34.67], [41.98, 36.01], [43.79, 37.89], [45.19, 38.9], [46.57, 40.22],
  [47.69, 41.08], [48.93, 41.94], [51.17, 43.64], [53.53, 45.22], [54.79, 46.32], [56.54, 47.91], [58.9, 50.15],
  [59.9, 50.84], [61.73, 52.56], [62.83, 53.6], [63.94, 54.54], [66.13, 56.39], [68.12, 57.78], [70.53, 59.88],
  [72.44, 61.59], [74.45, 63.56], [76.72, 65.45], [77.32, 65.98], [79.54, 67.96], [80.92, 69.11], [82.44, 70.48],
  [83.77, 71.94], [84.97, 73.24], [86.97, 75.12], [88.27, 76.47], [88.99, 77.19], [90.55, 78.7], [93.48, 81.72],
  [94.17, 82.38], [95.42, 83.59], [96.11, 84.23], [97.14, 85.28], [98.66, 86.76], [99.86, 87.79], [101.17, 88.97],
  [101.94, 89.69], [103.06, 90.87], [105.23, 92.91], [106.56, 94.19], [108.67, 96.07], [112.17, 99.68],
  [113.44, 100.89], [114.01, 101.37], [114.6, 101.96],
]);

type P = {g0: number; dur: number};
const PASTA = 'videos/2026-10-16-metodo-01-cliente-oculto';

// ícones extras (traço estilo lucide)
const EXTRA: Record<string, React.ReactNode> = {
  megaphone: <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  camera: (
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  pen: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
  thought: <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20.5l1.6-4.4A8.4 8.4 0 1 1 21 11.5z" />,
};
export const XIcon: React.FC<{name: string; size?: number; color?: string; stroke?: number}> = ({name, size = 28, color = 'currentColor', stroke = 2}) =>
  EXTRA[name] ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {EXTRA[name]}
    </svg>
  ) : (
    <Icon name={name} size={size} color={color} stroke={stroke} />
  );

export const Tile: React.FC<{name: string; size?: number; color?: string; tint?: string}> = ({name, size = 72, color = C.purple, tint = C.purpleTint}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.28, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <XIcon name={name} size={size * 0.46} color={color} />
  </div>
);

export const Chip: React.FC<{icon?: string; img?: string; text: string; color?: string; tint?: string; size?: number; style?: React.CSSProperties}> = ({
  icon,
  img,
  text,
  color = C.purple,
  tint = C.purpleTint,
  size = 28,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 28px 12px 12px',
      borderRadius: 99,
      background: '#fff',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: size,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    <div style={{width: size * 1.75, height: size * 1.75, borderRadius: 99, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {img ? <Img src={staticFile(img)} style={{width: size * 1.05, height: size * 1.05}} /> : <XIcon name={icon ?? 'check'} size={size * 0.85} color={color} stroke={2.4} />}
    </div>
    {text}
  </div>
);

export const Badge: React.FC<{text: string; ok?: boolean; grad?: boolean; size?: number; icon?: string}> = ({text, ok, grad, size = 24, icon}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 20px',
      borderRadius: 99,
      background: grad ? C.grad : ok ? C.greenTint : C.redTint,
      color: grad ? '#fff' : ok ? C.green : C.red,
      fontSize: size,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      boxShadow: grad ? '0 16px 34px -12px rgba(140,90,240,0.6)' : undefined,
    }}
  >
    <XIcon name={icon ?? (ok || grad ? 'check' : 'x')} size={size * 0.85} color={grad ? '#fff' : ok ? C.green : C.red} stroke={3} />
    {text}
  </div>
);

// balão de conversa
export const Bubble: React.FC<{text: string; me?: boolean; time?: string; w?: number; ticks?: boolean}> = ({text, me, time, w = 520, ticks}) => (
  <div
    style={{
      maxWidth: w,
      padding: '18px 24px 14px',
      borderRadius: 26,
      borderBottomRightRadius: me ? 8 : 26,
      borderBottomLeftRadius: me ? 26 : 8,
      background: me ? '#E7FFDB' : '#fff',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: 27,
      lineHeight: 1.35,
      fontWeight: 500,
    }}
  >
    {text}
    {time && (
      <div style={{fontSize: 19, color: C.muted, textAlign: 'right', marginTop: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6}}>
        {time}
        {ticks && <span style={{color: '#53BDEB', fontWeight: 700, letterSpacing: -4}}>✓✓</span>}
      </div>
    )}
  </div>
);

export const LogoTile: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Logo height={size * 0.52} color="#fff" iconOnly />
  </div>
);

// mini slide de proposta
export const MiniSlide: React.FC<{w: number; glow?: number; children?: React.ReactNode; title?: string}> = ({w, glow = 0, children, title = 'O que ouvimos'}) => (
  <div
    style={card({
      width: w,
      height: w * 0.5625,
      padding: w * 0.055,
      boxSizing: 'border-box',
      borderRadius: w * 0.035,
      position: 'relative',
      boxShadow: `0 0 0 ${5 * glow}px rgba(242,127,181,${0.45 * glow}), ${C.shadow}`,
    })}
  >
    <div style={{fontSize: w * 0.022, color: C.purple, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase'}}>Proposta comercial</div>
    <div style={{fontSize: w * 0.058, fontWeight: 700, letterSpacing: -w * 0.001, marginTop: w * 0.012}}>{title}</div>
    <div style={{height: w * 0.006, width: w * 0.12, borderRadius: 9, background: C.grad, marginTop: w * 0.02}} />
    {children}
  </div>
);

// ============ 1. Abertura (0 – 10,6 s) ============
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const glow = Math.min(useSpring(L(8.6)), 1) * (0.75 + 0.25 * Math.sin((t - L(8.6)) * 4));
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={120} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', gap: 18}}>
          <Pop at={L(0.15)} pop y={16}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 28px 10px 10px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 28, fontWeight: 600}}>
              <div style={{width: 48, height: 48, borderRadius: 48, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={24} color="#fff" iconOnly />
              </div>
              Método de Aceleração <Grad>Comercial</Grad>
            </div>
          </Pop>
          <Pop at={L(0.9)} pop y={16}>
            <div style={{display: 'flex', alignItems: 'center', height: 68, padding: '0 28px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 26, fontWeight: 600}}>
              Etapa 1 · Vender
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={0} y={250} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34}}>
          <Pop at={L(4.0)} pop s={0.6} y={10}>
            <div style={{fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1, color: C.purpleTint, WebkitTextStroke: `3px ${C.purple}`}}>01</div>
          </Pop>
          <Words text="Cliente [oculto]" at={L(4.3)} size={130} stagger={0.12} />
        </div>
      </Abs>
      {/* 1 hora → slide mais importante */}
      <Abs x={960} y={735} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 60}}>
          <Pop at={L(5.75)} pop y={20}>
            <div style={card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'})}>
              <Tile name="clock" size={86} />
              <div>
                <div style={{fontSize: 54, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1}}>1 hora</div>
                <div style={{fontSize: 23, color: C.muted, marginTop: 6}}>do seu tempo</div>
              </div>
            </div>
          </Pop>
          <Pop at={L(7.55)} x={-30} y={0}>
            <XIcon name="arrow" size={64} color={C.faint} stroke={2.6} />
          </Pop>
          <Pop at={L(7.9)} y={40}>
            <div style={{position: 'relative'}}>
              <MiniSlide w={520} glow={glow}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26}}>
                  {[0.9, 0.75, 0.82].map((w, i) => (
                    <div key={i} style={{height: 13, width: `${w * 100}%`, borderRadius: 13, background: '#EEEDF4'}} />
                  ))}
                </div>
              </MiniSlide>
              <div style={{position: 'absolute', right: -30, top: -30, transform: `scale(${useSpring(L(8.9), POP)})`}}>
                <Badge text="o mais importante" grad icon="star" size={24} />
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1500} y={240} at={L(4.6)} />
      <Sparkle x={380} y={560} at={L(4.8)} size={22} color="#B7A8FF" />
      <Sparkle x={1600} y={560} at={L(9.0)} size={30} />
    </Scene>
  );
};

// ============ 2. O erro mais comum + entrar no funil (10,6 – 26,5 s) ============
export const Erro: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const sai = L(18.0);
  const strike = ramp(t, L(17.5), L(17.95), 0, 1);
  const funil = [
    {label: 'Lead', w: 760},
    {label: 'Conversa', w: 610},
    {label: 'Agendamento', w: 460},
    {label: 'Venda', w: 310},
  ];
  const lupa = useSpring(L(23.3));
  const vaza = useSpring(L(25.6), POP);
  // queda do lead pelo funil (20,97 → 23,0)
  const desce = ramp(t, L(21.2), L(22.9), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <Scene dur={dur} push={0.03}>
      {/* parte A: perguntar */}
      <Abs x={0} y={130} w={1920}>
        <Words text="O erro mais [comum]" at={L(10.75)} out={sai} size={80} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{width: 1200, display: 'flex', flexDirection: 'column', gap: 40}}>
          <Pop at={L(13.5)} out={sai} x={-40} y={0}>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
              <LogoTile size={70} />
              <div style={{position: 'relative'}}>
                <Bubble text="E aí, como está a operação de vocês?" w={700} />
                <div style={{position: 'absolute', left: 20, right: 20, top: '46%', height: 5, borderRadius: 5, background: C.red, opacity: 0.8, transformOrigin: 'left', transform: `scaleX(${strike})`}} />
              </div>
            </div>
            <div style={{fontSize: 22, color: C.muted, marginLeft: 92, marginTop: 10}}>você, parceiro</div>
          </Pop>
          <Pop at={L(16.15)} out={sai} x={40} y={0}>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, justifyContent: 'flex-end'}}>
              <Bubble text="Tá tudo bem por aqui! 👍" me w={560} />
              <ContactAvatar size={70} />
            </div>
            <div style={{fontSize: 22, color: C.muted, textAlign: 'right', marginRight: 92, marginTop: 10}}>o gestor</div>
          </Pop>
        </div>
      </Abs>
      {/* parte B: entrar no funil como lead */}
      <Abs x={0} y={110} w={1920}>
        <Words text="Entre no funil [como lead]" at={L(18.8)} out={L(24.3)} size={76} stagger={0.06} />
      </Abs>
      <Abs x={0} y={110} w={1920}>
        <Words text="Mostre onde a venda [vaza]" at={L(24.4)} size={76} stagger={0.06} />
      </Abs>
      <Abs x={960} y={300}>
        {funil.map((f, i) => (
          <Abs key={f.label} x={-f.w / 2} y={i * 150}>
            <Pop at={L(19.3 + i * 0.12)} y={30}>
              <div
                style={{
                  width: f.w,
                  height: 118,
                  borderRadius: 26,
                  background: i === 3 ? C.grad : '#fff',
                  boxShadow: C.shadowSm,
                  border: `1px solid ${C.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 600,
                  color: i === 3 ? '#fff' : C.text,
                }}
              >
                {f.label}
              </div>
            </Pop>
          </Abs>
        ))}
        {/* você entrando como lead */}
        <Abs x={-470 + 60 * desce} y={-10 + 150 * 1.05 * desce}>
          <Pop at={L(20.6)} pop s={0.5}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <ContactAvatar size={74} style={{boxShadow: '0 0 0 5px #fff, 0 10px 24px -6px rgba(245,155,122,0.7)'}} />
              <div style={{fontSize: 24, fontWeight: 600, background: '#fff', padding: '6px 16px', borderRadius: 99, boxShadow: C.shadowSm}}>você</div>
            </div>
          </Pop>
        </Abs>
        {/* lupa e vazamento entre Conversa e Agendamento */}
        <Abs x={330 - 40 * lupa} y={180}>
          <div style={{opacity: Math.min(lupa, 1), transform: `scale(${0.6 + 0.4 * Math.min(lupa, 1)}) rotate(${-8 * (1 - lupa)}deg)`}}>
            <XIcon name="search" size={150} color={C.purple} stroke={2.2} />
          </div>
        </Abs>
        {[0, 1, 2].map((k) => {
          const ph = ((t - L(25.6) - k * 0.33) % 1 + 1) % 1;
          const vis = t > L(25.6) + k * 0.33 ? 1 : 0;
          return (
            <Abs key={k} x={-250} y={280 + ph * 160}>
              <div style={{width: 22, height: 30, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: C.pink, opacity: vis * (1 - ph) * Math.min(vaza, 1)}} />
            </Abs>
          );
        })}
        <Abs x={-640} y={330}>
          <div style={{transform: `scale(${vaza})`}}>
            <Badge text="a venda vaza aqui" />
          </div>
        </Abs>
      </Abs>
    </Scene>
  );
};

// ============ 3. Canais reais + print (26,5 – 37,4 s) ============
export const Canais: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const canais = [
    {at: 28.78, icon: 'megaphone', text: 'Anúncio', teste: false},
    {at: 29.73, icon: 'globe', text: 'Site', teste: false},
    {at: 30.6, icon: 'doc', text: 'Formulário', teste: true},
    {at: 31.66, img: 'whatsapp.svg', text: 'WhatsApp', teste: true},
  ];
  const flash = t > L(34.7) && t < L(35.1) ? Math.sin(((t - L(34.7)) / 0.4) * Math.PI) : 0;
  const hora = useSpring(L(36.12), POP);
  const subir = ramp(t, L(34.3), L(34.9), 0, 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Use os canais [reais] do cliente" at={L(26.65)} size={76} stagger={0.06} />
      </Abs>
      <Abs x={960} y={420 - 90 * subir} center>
        <div style={{display: 'flex', gap: 30}}>
          {canais.map((c) => {
            const on = useSpring(L(32.9 + (c.text === 'WhatsApp' ? 0.25 : 0)), POP);
            return (
              <Pop key={c.text} at={L(c.at)} pop y={26}>
                <div style={{position: 'relative'}}>
                  <Chip icon={c.icon} img={c.img} text={c.text} size={32} style={c.teste ? {boxShadow: `0 0 0 ${4 * Math.min(on, 1)}px rgba(31,180,90,0.45), ${C.shadowSm}`} : undefined} />
                  {c.teste && (
                    <div style={{position: 'absolute', right: -12, top: -16, transform: `scale(${on})`}}>
                      <div style={{width: 40, height: 40, borderRadius: 40, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px -4px rgba(31,180,90,0.6)'}}>
                        <Icon name="check" size={24} color="#fff" stroke={3.2} />
                      </div>
                    </div>
                  )}
                </div>
              </Pop>
            );
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 34}}>
          <Pop at={L(33.0)} y={16} out={L(34.3)}>
            <div style={{fontSize: 34, fontWeight: 600, color: C.muted}}>
              Teste pelo menos <Grad>dois</Grad>
            </div>
          </Pop>
        </div>
      </Abs>
      {/* print com horário */}
      <Abs x={960} y={700} center>
        <Pop at={L(34.6)} y={60} s={0.85}>
          <div style={card({width: 820, padding: 34, boxSizing: 'border-box', position: 'relative'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22}}>
              <Tile name="camera" size={56} />
              <div style={{fontSize: 27, fontWeight: 600}}>print_whatsapp.png</div>
            </div>
            <div style={{background: '#EFEAE2', borderRadius: 20, padding: 24, display: 'flex', justifyContent: 'flex-end'}}>
              <div
                style={{
                  maxWidth: 560,
                  padding: '16px 22px 12px',
                  borderRadius: 22,
                  borderBottomRightRadius: 6,
                  background: '#E7FFDB',
                  fontSize: 26,
                  fontWeight: 500,
                }}
              >
                Oi! Vi o anúncio e queria saber os valores.
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 6}}>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      padding: '2px 10px',
                      borderRadius: 10,
                      color: hora > 0.05 ? '#fff' : C.muted,
                      background: hora > 0.05 ? C.purple : 'transparent',
                      transform: `scale(${1 + 0.35 * Math.sin(Math.min(hora, 1) * Math.PI)})`,
                      display: 'inline-block',
                    }}
                  >
                    09:12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <AbsoluteFill style={{background: '#fff', opacity: flash * 0.85}} />
    </Scene>
  );
};

// ============ 4. As seis medições (37,4 – 82,3 s) ============
const ITENS = [
  {at: 39.94, fim: 45.19, icon: 'clock', titulo: 'Tempo até a 1ª resposta'},
  {at: 45.19, fim: 53.53, icon: 'message', titulo: 'Alguém respondeu?'},
  {at: 53.53, fim: 59.9, icon: 'calendar', titulo: 'Mensagens até agendar'},
  {at: 59.9, fim: 68.12, icon: 'history', titulo: 'Teve follow-up?'},
  {at: 68.12, fim: 74.71, icon: 'help', titulo: 'Qualidade da conversa'},
  {at: 74.71, fim: 82.3, icon: 'search', titulo: 'O caminho inteiro'},
];

const Linha: React.FC<{i: number; L: (s: number) => number}> = ({i, L}) => {
  const t = useSec();
  const it = ITENS[i];
  const ativo = t >= L(it.at) && t < L(it.fim);
  const feito = t >= L(it.fim);
  const a = useSpring(L(it.at));
  const b = useSpring(L(it.fim));
  const hi = ativo ? Math.min(a, 1) : feito ? 1 - Math.min(b, 1) : 0;
  return (
    <Pop at={L(it.at) - 0.1} x={-30} y={0}>
      <div
        style={{
          ...card({borderRadius: 22, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 18, width: 600, boxSizing: 'border-box'}),
          boxShadow: `0 0 0 ${4 * hi}px rgba(109,93,246,${0.35 * hi}), ${C.shadowSm}`,
          transform: `scale(${1 + 0.03 * hi})`,
          opacity: feito && !ativo ? 0.72 : 1,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 52,
            background: feito ? C.greenTint : ativo ? C.grad : C.purpleTint,
            color: feito ? C.green : ativo ? '#fff' : C.purple,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {feito ? <Icon name="check" size={26} color={C.green} stroke={3} /> : i + 1}
        </div>
        <div style={{fontSize: 29, fontWeight: 600}}>{it.titulo}</div>
      </div>
    </Pop>
  );
};

// cartão de detalhe à direita (entra no início do item, sai no fim)
const Detalhe: React.FC<{i: number; L: (s: number) => number; children: React.ReactNode}> = ({i, L, children}) => {
  const it = ITENS[i];
  return (
    <Abs x={1330} y={590} center>
      <Pop at={L(it.at) + 0.1} out={L(it.fim) - 0.2} y={40}>
        <div style={card({width: 900, minHeight: 560, padding: 50, boxSizing: 'border-box'})}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36}}>
            <Tile name={it.icon} size={70} />
            <div>
              <div style={{fontSize: 22, color: C.purple, fontWeight: 600, letterSpacing: 1}}>MEDIÇÃO {i + 1} DE 6</div>
              <div style={{fontSize: 38, fontWeight: 700, letterSpacing: -0.8}}>{it.titulo}</div>
            </div>
          </div>
          {children}
        </div>
      </Pop>
    </Abs>
  );
};

const Check: React.FC<{text: string; ok: boolean; at: number; size?: number}> = ({text, ok, at, size = 30}) => {
  const s = useSpring(at + 0.35, POP);
  return (
    <Pop at={at} y={14} blur={6}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: size, fontWeight: 500, padding: '18px 22px', borderRadius: 20, background: '#F7F6FB'}}>
        <div style={{flex: 1}}>{text}</div>
        <div style={{width: 50, height: 50, borderRadius: 50, background: ok ? C.greenTint : C.redTint, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${s})`}}>
          <Icon name={ok ? 'check' : 'x'} size={28} color={ok ? C.green : C.red} stroke={3} />
        </div>
      </div>
    </Pop>
  );
};

export const Seis: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  // 1. cronômetro 0 → 155 min
  const min = Math.round(ramp(t, L(41.0), L(42.7), 0, 155, Easing.out(Easing.cubic)));
  const fmt = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}min`);
  // 2. sem resposta: horas passando
  const horas = Math.round(ramp(t, L(48.9), L(50.2), 0, 48, Easing.out(Easing.cubic)));
  // 3. mensagens
  const nMsg = Math.floor(ramp(t, L(54.8), L(56.4), 0, 7.99, Easing.linear));
  return (
    <Scene dur={dur} push={0.015}>
      <Abs x={140} y={110}>
        <Words text="Meça [seis coisas]" at={L(37.5)} size={68} align="left" />
      </Abs>
      <Abs x={140} y={250}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          {ITENS.map((_, i) => (
            <Linha key={i} i={i} L={L} />
          ))}
        </div>
      </Abs>

      {/* 1 */}
      <Detalhe i={0} L={L}>
        <div style={{display: 'flex', gap: 24}}>
          <Pop at={L(40.6)} y={14}>
            <div style={{padding: '14px 22px', borderRadius: 18, background: '#F7F6FB', fontSize: 25}}>
              Você enviou <b>09:12</b>
            </div>
          </Pop>
          <Pop at={L(42.0)} y={14}>
            <div style={{padding: '14px 22px', borderRadius: 18, background: '#F7F6FB', fontSize: 25}}>
              Responderam <b>11:47</b>
            </div>
          </Pop>
        </div>
        <div style={{fontSize: 130, fontWeight: 700, letterSpacing: -5, marginTop: 30, fontVariantNumeric: 'tabular-nums', lineHeight: 1.05}}>
          <Grad>{fmt(min)}</Grad>
        </div>
        <div style={{marginTop: 26, transform: `scale(${useSpring(L(43.8), POP)})`, transformOrigin: 'left'}}>
          <Badge text="o número que mais choca o gestor" icon="star" />
        </div>
      </Detalhe>

      {/* 2 */}
      <Detalhe i={1} L={L}>
        <div style={{background: '#EFEAE2', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16}}>
          <Pop at={L(46.3)} x={30} y={0}>
            <Bubble text="Oi! Vi o anúncio e queria saber os valores." me time="09:12" ticks w={560} />
          </Pop>
          <Pop at={L(48.9)} y={10}>
            <div style={{alignSelf: 'center', padding: '8px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.85)', fontSize: 22, color: C.muted, fontWeight: 600}}>
              + {horas}h · nenhuma resposta
            </div>
          </Pop>
        </div>
        <div style={{display: 'flex', gap: 18, marginTop: 30, alignItems: 'center'}}>
          <div style={{transform: `scale(${useSpring(L(49.4), POP)})`}}>
            <Badge text="Ninguém respondeu" />
          </div>
          <div style={{transform: `scale(${useSpring(L(51.2), POP)})`}}>
            <Badge text="a prova mais forte" grad icon="star" />
          </div>
        </div>
      </Detalhe>

      {/* 3 */}
      <Detalhe i={2} L={L}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, minHeight: 150}}>
          {Array.from({length: 7}).map((_, k) => (
            <div
              key={k}
              style={{
                width: 100,
                height: 64,
                borderRadius: 18,
                background: k % 2 ? '#fff' : '#E7FFDB',
                border: `1px solid ${C.line}`,
                boxShadow: C.shadowSm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 600,
                color: C.muted,
                opacity: k < nMsg ? 1 : 0,
                transform: `translateY(${k < nMsg ? 0 : 14}px)`,
              }}
            >
              {k + 1}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 30}}>
          <Pop at={L(56.5)} pop>
            <Chip icon="calendar" text="“Vamos agendar?”" size={30} />
          </Pop>
          <Pop at={L(57.2)} y={10}>
            <div style={{fontSize: 30, fontWeight: 600, color: C.muted}}>
              na mensagem <Grad>7</Grad>
            </div>
          </Pop>
        </div>
      </Detalhe>

      {/* 4 */}
      <Detalhe i={3} L={L}>
        <div style={{background: '#EFEAE2', borderRadius: 22, padding: 26, display: 'flex', flexDirection: 'column', gap: 16}}>
          <Pop at={L(60.6)} x={-30} y={0}>
            <Bubble text="Te mando a tabela de preços?" time="11:47" w={520} />
          </Pop>
          <Pop at={L(61.8)} y={10}>
            <div style={{alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.85)', fontSize: 22, color: C.muted, fontWeight: 600, width: 'fit-content', marginLeft: 'auto'}}>
              <XIcon name="pen" size={20} color={C.muted} /> você parou de responder
            </div>
          </Pop>
        </div>
        <div style={{display: 'flex', gap: 16, marginTop: 26}}>
          {['Dia 1', 'Dia 2', 'Dia 3'].map((d, k) => (
            <Pop key={d} at={L(63.9 + k * 0.4)} y={14}>
              <div style={{width: 250, padding: '16px 18px', borderRadius: 18, background: '#F7F6FB', boxSizing: 'border-box'}}>
                <div style={{fontSize: 22, fontWeight: 600}}>{d}</div>
                <div style={{fontSize: 20, color: C.muted, marginTop: 4}}>nenhum retorno</div>
              </div>
            </Pop>
          ))}
        </div>
        <div style={{marginTop: 26, transform: `scale(${useSpring(L(66.2), POP)})`, transformOrigin: 'left'}}>
          <Badge text="Quase nunca volta" />
        </div>
      </Detalhe>

      {/* 5 */}
      <Detalhe i={4} L={L}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <Check text="Respondeu o que você perguntou?" ok={false} at={L(70.5)} />
          <Check text="Fez alguma pergunta de volta?" ok={false} at={L(72.4)} />
        </div>
        <Pop at={L(73.2)} y={10}>
          <div style={{fontSize: 24, color: C.muted, marginTop: 24}}>Anote como foi a conversa, com as suas palavras.</div>
        </Pop>
      </Detalhe>

      {/* 6 */}
      <Detalhe i={5} L={L}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 10}}>
          {[
            {at: 77.3, icon: 'megaphone', text: 'Anúncio', ok: true},
            {at: 79.5, icon: 'globe', text: 'Página', ok: true},
            {at: 80.9, icon: 'doc', text: 'Formulário', ok: false},
          ].map((p, k) => (
            <React.Fragment key={p.text}>
              {k > 0 && (
                <Pop at={L(p.at) - 0.25} x={-16} y={0}>
                  <XIcon name="arrow" size={40} color={C.faint} stroke={2.6} />
                </Pop>
              )}
              <Pop at={L(p.at)} pop y={20}>
                <div style={{width: 210, padding: '24px 10px', borderRadius: 22, background: '#F7F6FB', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
                  <Tile name={p.icon} size={70} />
                  <div style={{fontSize: 26, fontWeight: 600}}>{p.text}</div>
                  <div style={{transform: `scale(${useSpring(L(p.at) + 0.6, POP)})`}}>
                    <Badge text={p.ok ? 'ok' : 'falhou'} ok={p.ok} size={20} />
                  </div>
                </div>
              </Pop>
            </React.Fragment>
          ))}
        </div>
      </Detalhe>
    </Scene>
  );
};

// ============ 5. Memória × print (82,3 – 88,9 s) ============
export const Memoria: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const fato = useSpring(L(88.2), POP);
  const apaga = ramp(t, L(86.9), L(87.4), 1, 0.45);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Não confie na [memória]" at={L(82.45)} size={80} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
          <Pop at={L(83.8)} y={50}>
            <div style={{...card({width: 640, padding: 44, boxSizing: 'border-box'}), opacity: apaga}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30}}>
                <Tile name="thought" size={70} color={C.muted} tint="#F1F0F5" />
                <div style={{fontSize: 36, fontWeight: 600, color: C.muted}}>Sem print</div>
              </div>
              <Pop at={L(84.8)} y={12}>
                <div style={{fontSize: 27, padding: '16px 22px', borderRadius: 18, background: '#F7F6FB'}}>
                  Você: “Acho que demoraram muito.”
                </div>
              </Pop>
              <div style={{height: 16}} />
              <Pop at={L(85.6)} y={12}>
                <div style={{fontSize: 27, padding: '16px 22px', borderRadius: 18, background: '#F7F6FB'}}>
                  Gestor: “A gente responde rápido.”
                </div>
              </Pop>
              <div style={{marginTop: 26}}>
                <Pop at={L(86.1)} y={10}>
                  <div style={{fontSize: 26, fontWeight: 600, color: C.muted}}>opinião contra opinião</div>
                </Pop>
              </div>
            </div>
          </Pop>
          <Pop at={L(86.95)} y={50}>
            <div style={{position: 'relative'}}>
              <div style={card({width: 640, padding: 44, boxSizing: 'border-box'})}>
                <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30}}>
                  <Tile name="camera" size={70} />
                  <div style={{fontSize: 36, fontWeight: 600}}>Com print e horário</div>
                </div>
                <div style={{background: '#EFEAE2', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', gap: 12}}>
                  <div style={{alignSelf: 'flex-end'}}>
                    <Bubble text="Quero saber os valores." me time="09:12" ticks w={420} />
                  </div>
                  <div style={{alignSelf: 'flex-start'}}>
                    <Bubble text="Oi! Tudo bem?" time="11:47" w={420} />
                  </div>
                </div>
              </div>
              <div style={{position: 'absolute', right: -40, top: -40, transform: `scale(${fato}) rotate(${(1 - Math.min(fato, 1)) * -25 + 8}deg)`}}>
                <div style={{padding: '16px 34px', borderRadius: 18, background: C.green, color: '#fff', fontSize: 40, fontWeight: 700, letterSpacing: 2, boxShadow: '0 20px 40px -12px rgba(31,180,90,0.6)'}}>
                  FATO
                </div>
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1640} y={330} at={L(88.4)} />
    </Scene>
  );
};

// ============ 6. TELA: Registro do cliente oculto (88,9 – 101,9 s) ============
// Prints 2x (3840x2160) da página pública, preenchida com dados fictícios. Coordenadas em px da página (1920x1080).
const SC = 0.86;
const CW = 1920 * SC;
const CH = 1080 * SC;
type Z = [number, number, number, number]; // [s da narração, cx, cy, escala]
const zoomAt = (keys: Z[], t: number): [number, number, number] => {
  const ease = Easing.inOut(Easing.cubic);
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

export const TelaRegistro: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const s = inv(t + g0); // tempo na narração original
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  // sequência de prints: [arquivo, a partir de (s)]
  const prints: [string, number][] = [
    ['r1_topo.png', 0],
    ['r2_canal_vazio.png', 94.0],
    ['r3a_canal.png', 95.15],
    ['r3b_horarios.png', 96.75],
    ['r3c_completo.png', 98.0],
    ['r4_resumo.png', 98.9],
  ];
  const zoom: Z[] = [
    [88.9, 0.5, 0.5, 1],
    [93.2, 0.5, 0.5, 1],
    [94.0, 0.57, 0.3, 1.35],
    [96.0, 0.57, 0.3, 1.35],
    [96.9, 0.55, 0.3, 1.6],
    [98.6, 0.55, 0.3, 1.6],
    [99.2, 0.57, 0.68, 1.45],
    [101.9, 0.57, 0.68, 1.5],
  ];
  const [cx, cy, z] = zoomAt(zoom, s);
  const hx = 0.5 / z;
  const hy = 0.5 / z;
  const x = Math.min(Math.max(cx, hx), 1 - hx);
  const y = Math.min(Math.max(cy, hy), 1 - hy);
  // anel de destaque, em coordenadas da página
  const Anel: React.FC<{at: number; ate: number; bx: number; by: number; bw: number; bh: number}> = ({at, ate, bx, by, bw, bh}) => {
    const a = ramp(s, at, at + 0.3) * (1 - ramp(s, ate, ate + 0.3));
    const pulse = 1 + 0.03 * Math.sin((s - at) * 6);
    return (
      <div
        style={{
          position: 'absolute',
          left: (bx - 8) * SC,
          top: (by - 8) * SC,
          width: (bw + 16) * SC,
          height: (bh + 16) * SC,
          borderRadius: 14,
          border: `4px solid ${C.pink}`,
          boxShadow: '0 0 0 6px rgba(242,127,181,0.25)',
          opacity: a,
          transform: `scale(${pulse})`,
        }}
      />
    );
  };
  const pg = (px: number, py: number) => ({x: px * SC, y: py * SC});
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
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', width: CW, height: CH, transformOrigin: '0 0', transform: `scale(${z}) translate(${(0.5 / z - x) * CW}px, ${(0.5 / z - y) * CH}px)`}}>
          {prints.map(([f, de], i) => {
            const ate = i < prints.length - 1 ? prints[i + 1][1] : 999;
            const op = i === 0 ? 1 : ramp(s, de, de + 0.25);
            if (s > ate + 0.3) return null;
            return <Img key={f} src={staticFile(`${PASTA}/${f}`)} style={{position: 'absolute', left: 0, top: 0, width: CW, height: CH, opacity: op}} />;
          })}
          <Anel at={97.1} ate={98.5} bx={734} by={344} bw={130} bh={48} />
          <Anel at={99.8} ate={101.6} bx={710} by={678} bw={774} bh={116} />
          <Cursor
            pts={[
              {t: L(94.2), ...pg(1300, 560)},
              {t: L(94.85), ...pg(820, 157)},
              {t: L(95.9), ...pg(830, 160)},
              {t: L(96.5), ...pg(1300, 242)},
              {t: L(97.3), ...pg(900, 372)},
              {t: L(98.4), ...pg(905, 380)},
            ]}
            clicks={[L(95.0), L(96.6)]}
            hide={L(98.5)}
          />
        </div>
      </div>
      {/* legenda do material */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP), fontFamily: FONT}}>
        <Pop at={0.6} y={12}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600, color: C.text}}>
            <Icon name="doc" size={22} color={C.purple} /> Materiais da etapa 1 · Registro do cliente oculto
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

// ============ 7. Slide "O que ouvimos" (101,9 – 108,6 s) ============
export const Slide: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const glow = Math.min(useSpring(L(105.2)), 1);
  return (
    <Scene dur={dur} push={0.035}>
      <Abs x={0} y={95} w={1920}>
        <Words text="Vira o slide [“O que ouvimos”]" at={L(101.95)} size={70} stagger={0.06} />
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={L(102.3)} y={60} s={0.9}>
          <MiniSlide w={1180} glow={glow}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 40}}>
              <Pop at={L(102.7)} x={-30} y={0}>
                <div style={{display: 'flex', gap: 18, fontSize: 30, lineHeight: 1.4, fontWeight: 500}}>
                  <div style={{width: 14, height: 14, borderRadius: 14, background: C.purple, marginTop: 15, flexShrink: 0}} />
                  <div>
                    No WhatsApp, o lead esperou <b>2h 35min</b> até a primeira resposta, e não houve follow-up depois.
                  </div>
                </div>
              </Pop>
              <Pop at={L(103.4)} x={-30} y={0}>
                <div style={{display: 'flex', gap: 18, fontSize: 30, lineHeight: 1.4, fontWeight: 500}}>
                  <div style={{width: 14, height: 14, borderRadius: 14, background: C.purple, marginTop: 15, flexShrink: 0}} />
                  <div>
                    No formulário do site, <b>não houve resposta</b>.
                  </div>
                </div>
              </Pop>
            </div>
          </MiniSlide>
        </Pop>
      </Abs>
      <Abs x={1520} y={890} center>
        <Pop at={L(106.5)} pop y={20}>
          <Badge text="nenhum concorrente consegue copiar" grad icon="lock" size={28} />
        </Pop>
      </Abs>
      <Sparkle x={1560} y={300} at={L(105.4)} />
      <Sparkle x={330} y={860} at={L(105.6)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 8. Encerramento: trilha da etapa 1 (108,6 s – fim) ============
export const Final: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const passos = ['Cliente oculto', 'Diagnóstico', 'Preço', 'Proposta', 'Contrato'];
  const ok = useSpring(L(110.0), POP);
  const prox = useSpring(L(112.1));
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={190} w={1920}>
        <Words text="Etapa 1 · [Vender]" at={L(108.7)} size={84} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {passos.map((p, i) => {
            const isProx = i === 1;
            const g = isProx ? Math.min(prox, 1) : 0;
            return (
              <React.Fragment key={p}>
                {i > 0 && <div style={{width: 60, height: 4, borderRadius: 4, background: i === 1 ? C.grad : '#E4E2EE'}} />}
                <Pop at={L(108.9 + i * 0.12)} pop y={20}>
                  <div
                    style={{
                      ...card({width: 250, padding: '26px 16px', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, boxSizing: 'border-box'}),
                      boxShadow: `0 0 0 ${5 * g}px rgba(109,93,246,${0.4 * g}), ${C.shadowSm}`,
                      transform: `scale(${1 + 0.08 * g})`,
                      opacity: i > 1 ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 64,
                        background: i === 0 ? C.green : isProx ? C.grad : C.purpleTint,
                        color: i < 2 ? '#fff' : C.purple,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 700,
                        transform: i === 0 ? `scale(${0.85 + 0.15 * ok})` : undefined,
                      }}
                    >
                      {i === 0 && ok > 0.05 ? <Icon name="check" size={34} color="#fff" stroke={3.2} /> : `0${i + 1}`}
                    </div>
                    <div style={{fontSize: 26, fontWeight: 600, textAlign: 'center'}}>{p}</div>
                  </div>
                </Pop>
              </React.Fragment>
            );
          })}
        </div>
      </Abs>
      <Abs x={(1920 - 1310) / 2 + 125 + 310} y={760} center>
        <Pop at={L(113.4)} pop y={20}>
          <Badge text="Próximo vídeo" grad icon="arrow" size={28} />
        </Pop>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(113.8)} y={16}>
          <Logo height={46} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={420} at={L(110.1)} />
      <Sparkle x={980} y={700} at={L(112.3)} size={24} color="#B7A8FF" />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
