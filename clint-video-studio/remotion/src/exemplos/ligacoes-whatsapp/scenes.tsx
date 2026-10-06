import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useVideoConfig} from 'remotion';
import {C} from '../../theme';
import {W} from './warp';
import {
  Abs,
  Avatar,
  ContactAvatar,
  Cursor,
  Eyebrow,
  Grad,
  Icon,
  IconTile,
  Logo,
  Pop,
  POP,
  Scene,
  Skeleton,
  Sparkle,
  Toggle,
  Words,
  card,
  ramp,
  useSec,
  useSpring,
} from '../../ui';

// Cada cena recebe o instante global (s) em que começa; L() converte o tempo da narração para o tempo local.
// g0 = início da cena na narração NOVA; s = instante da palavra na narração antiga (convertido por W).
const mk = (g0: number) => (s: number) => W(s) - g0;

const Row: React.FC<{icon: string; text: string; ok: boolean; at: number}> = ({icon, text, ok, at}) => (
  <Pop at={at} y={14} blur={6}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, fontWeight: 500, color: ok ? C.text : C.muted}}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 36,
          background: ok ? C.greenTint : '#F1F0F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={20} color={ok ? C.green : C.faint} stroke={2.6} />
      </div>
      {text}
    </div>
  </Pop>
);


// ============ 0. Abertura: novidade, ligação por WhatsApp (0s) ============
export const Intro: React.FC<{g0: number; dur: number}> = ({dur}) => {
  const t = useSec();
  const ring = (k: number) => ((t * 0.9 + k / 3) % 1);
  const shake = t > 0.25 ? Math.sin(t * 38) * 9 * Math.max(0, Math.sin(t * Math.PI * 1.6)) : 0;
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={150} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pop at={0.25} pop y={16}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px 10px 10px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, border: `1px solid ${C.line}`, fontSize: 28, fontWeight: 600}}>
              <div style={{width: 46, height: 46, borderRadius: 46, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={24} color="#fff" iconOnly />
              </div>
              Novidade na <Grad>Clint</Grad>
            </div>
          </Pop>
        </div>
      </Abs>
      {[0, 1, 2].map((k) => {
        const u = ring(k);
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 960 - 110 - 170 * u,
              top: 500 - 110 - 170 * u,
              width: 220 + 340 * u,
              height: 220 + 340 * u,
              borderRadius: '50%',
              border: `3px solid rgba(37,211,102,${0.45 * (1 - u) * ramp(t, 0.1, 0.4)})`,
              background: `rgba(37,211,102,${0.06 * (1 - u) * ramp(t, 0.1, 0.4)})`,
            }}
          />
        );
      })}
      <Abs x={960} y={500} center>
        <Pop at={0.0} pop s={0.4} y={0} blur={14}>
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'linear-gradient(150deg, #3BE07C 0%, #1FA855 100%)',
              boxShadow: '0 30px 60px -16px rgba(31,168,85,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="phone" size={100} color="#fff" stroke={2} style={{transform: `rotate(${shake}deg)`}} />
          </div>
        </Pop>
      </Abs>
      <Abs x={1225} y={330}>
        <Pop at={0.55} x={-30} y={0}>
          <Chip icon="message" text="Direto da conversa" color={C.purple} tint={C.purpleTint} />
        </Pop>
      </Abs>
      <Abs x={360} y={560}>
        <Pop at={0.7} x={30} y={0}>
          <Chip icon="check" text="Mesmo número oficial" color={C.green} tint={C.greenTint} />
        </Pop>
      </Abs>
      <Abs x={0} y={760} w={1920}>
        <Words text="Ligações por [WhatsApp]" at={0.45} size={84} stagger={0.08} />
      </Abs>
      <Sparkle x={700} y={330} at={0.5} />
      <Sparkle x={1190} y={640} at={0.65} size={22} color="#B7A8FF" />
      <Sparkle x={1500} y={760} at={0.8} size={30} />
    </Scene>
  );
};

// ============ 1. Uma diferença grande (15.37s) ============
export const Diferenca: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const hiA = useSpring(L(17.55));
  const hiB = useSpring(L(18.35));
  const glow = (h: number) => `0 0 0 ${3 * h}px rgba(109,93,246,${0.35 * h}), ${C.shadow}`;
  return (
    <Scene dur={dur}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Uma diferença [grande]" at={0.05} />
      </Abs>
      <Abs x={960} y={620} center>
        <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
          <Pop at={L(15.85)} y={50}>
            <div style={card({width: 540, padding: 44, boxSizing: 'border-box', boxShadow: glow(hiA * (1 - hiB)), transform: `scale(${1 + 0.03 * hiA * (1 - hiB)})`})}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
                <div style={{width: 76, height: 76, borderRadius: 24, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Logo height={40} color="#fff" iconOnly />
                </div>
                <div>
                  <div style={{fontSize: 34, fontWeight: 600, letterSpacing: -0.6}}>Ligando pela Clint</div>
                  <div style={{fontSize: 22, color: C.muted}}>Tudo fica registrado</div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                <Row icon="check" ok text="Histórico do contato" at={L(16.05)} />
                <Row icon="check" ok text="Data e atendente" at={L(16.15)} />
                <Row icon="check" ok text="Duração da chamada" at={L(16.25)} />
              </div>
            </div>
          </Pop>
          <Pop at={L(16.45)} pop>
            <div style={{fontSize: 24, fontWeight: 600, color: C.faint}}>vs</div>
          </Pop>
          <Pop at={L(16.6)} y={50}>
            <div style={card({width: 540, padding: 44, boxSizing: 'border-box', background: 'rgba(255,255,255,0.78)', boxShadow: `0 0 0 ${3 * hiB}px rgba(239,78,78,${0.3 * hiB}), ${C.shadow}`, transform: `scale(${1 + 0.03 * hiB})`})}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
                <div style={{width: 76, height: 76, borderRadius: 24, background: '#F1F0F5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="smartphone" size={36} color={C.muted} />
                </div>
                <div>
                  <div style={{fontSize: 34, fontWeight: 600, letterSpacing: -0.6, color: C.muted}}>Ligando por fora</div>
                  <div style={{fontSize: 22, color: C.faint}}>Nada fica registrado</div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                <Row icon="x" ok={false} text="Sem histórico" at={L(16.8)} />
                <Row icon="x" ok={false} text="Sem data nem atendente" at={L(16.9)} />
                <Row icon="x" ok={false} text="Sem duração" at={L(17.0)} />
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 2. Pegou o celular — não deixa rastro (19.03s) ============
export const Celular: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const secs = Math.max(0, Math.floor(t - L(21.1)));
  const fade = ramp(t, L(23.2), L(23.9));
  const line = ramp(t, L(21.9), L(22.7));
  const brk = useSpring(L(23.15), POP);
  return (
    <Scene dur={dur}>
      <Abs x={0} y={120} w={1920}>
        <Words text="A conversa não deixa [rastro]" at={L(21.55)} />
      </Abs>
      {/* cartão de chamada do celular */}
      <Abs x={560} y={610} center>
        <Pop at={0.15} y={60}>
          <div style={{opacity: 1 - fade * 0.55, filter: `blur(${fade * 3}px) grayscale(${fade})`}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: 22}}>
              <Pop at={0.45} y={10}>
                <Eyebrow color={C.muted} tint="rgba(255,255,255,0.8)">
                  <Icon name="smartphone" size={22} color={C.muted} /> Celular pessoal
                </Eyebrow>
              </Pop>
            </div>
            <div style={card({width: 380, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 64, boxSizing: 'border-box', borderRadius: 40})}>
              <div style={{width: 130, height: 130, borderRadius: '50%', background: 'linear-gradient(160deg,#FFC9A8,#F59B7A)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="user" size={64} color="#fff" stroke={2.2} />
              </div>
              <div style={{fontSize: 30, fontWeight: 600, marginTop: 28}}>(11) 98765-4321</div>
              <div style={{fontSize: 22, color: C.muted, marginTop: 6}}>{t < L(21.1) ? 'Chamando…' : `00:0${Math.min(secs, 9)}`}</div>
              <div style={{marginTop: 'auto', marginBottom: 36, width: 300, height: 66, borderRadius: 66, background: '#ECEBF1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: 50, height: 50, borderRadius: 50, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="phone" size={24} color="#fff" style={{transform: 'rotate(135deg)'}} />
                </div>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      {/* conector tracejado que se rompe */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path
          d="M 770 640 C 900 560, 1020 720, 1150 640"
          fill="none"
          stroke={C.purple}
          strokeOpacity={0.45 * (1 - fade)}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          style={{clipPath: `inset(0 ${(1 - line) * 100}% 0 0)`}}
        />
      </svg>
      <Abs x={960} y={640} center>
        <div style={{transform: `scale(${brk})`, opacity: Math.min(brk, 1), width: 64, height: 64, borderRadius: 64, background: C.red, boxShadow: '0 10px 24px rgba(239,78,78,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="x" size={32} color="#fff" stroke={3} />
        </div>
      </Abs>
      {/* histórico vazio */}
      <Abs x={1360} y={640} center>
        <Pop at={L(21.6)} y={50}>
          <div style={card({width: 420, height: 500, padding: 36, boxSizing: 'border-box', borderRadius: 40})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 600}}>
              <IconTile name="history" size={52} />
              Histórico do contato
            </div>
            <div
              style={{
                marginTop: 34,
                height: 150,
                borderRadius: 22,
                border: `2.5px dashed ${C.faint}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                color: C.muted,
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              <Icon name="phone" size={30} color={C.faint} />
              Nenhuma ligação registrada
            </div>
            <div style={{marginTop: 34, display: 'flex', flexDirection: 'column', gap: 16, opacity: 0.7}}>
              <Skeleton w={300} />
              <Skeleton w={220} />
              <Skeleton w={260} />
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ 3. Ninguém sabe (24.03s) ============
const Question: React.FC<{icon: string; text: string; at: number}> = ({icon, text, at}) => {
  const t = useSec();
  const pulse = 1 + 0.06 * Math.sin((t - at) * 5);
  return (
    <Pop at={at} y={40} x={-30}>
      <div style={card({width: 940, height: 132, borderRadius: 30, display: 'flex', alignItems: 'center', padding: '0 34px', boxSizing: 'border-box', gap: 26})}>
        <IconTile name={icon} size={76} />
        <div style={{fontSize: 38, fontWeight: 600, letterSpacing: -0.8, flex: 1}}>{text}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginRight: 26}}>
          <Skeleton w={200} h={14} />
          <Skeleton w={140} h={14} />
        </div>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 54,
            background: 'linear-gradient(135deg,#FFE1EE,#EFE9FF)',
            color: C.pink,
            fontSize: 30,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pulse})`,
          }}
        >
          ?
        </div>
      </div>
    </Pop>
  );
};

export const Ninguem: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Ninguém [sabe…]" at={0.05} />
      </Abs>
      <Abs x={960} y={300} style={{transform: 'translateX(-50%)'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
          <Question icon="user" text="Quem ligou?" at={L(24.85)} />
          <Question icon="calendar" text="Quando foi?" at={L(26.05)} />
          <Question icon="phone" text="Se a pessoa atendeu?" at={L(26.85)} />
        </div>
      </Abs>
      <Cursor
        pts={[
          {t: L(25.2), x: 1560, y: 900},
          {t: L(25.8), x: 1330, y: 382},
          {t: L(26.6), x: 1310, y: 545},
          {t: L(27.4), x: 1320, y: 708},
          {t: L(28.6), x: 1290, y: 720},
        ]}
      />
    </Scene>
  );
};

// ============ 4. Quem libera é o administrador (37.97s) ============
export const Admin: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const on = useSpring(L(39.85), {damping: 18, stiffness: 200, mass: 0.6});
  const team = [
    {i: 'AN', h: 330},
    {i: 'BR', h: 200},
    {i: 'CA', h: 20},
    {i: 'DI', h: 160},
    {i: 'EL', h: 280},
  ];
  return (
    <Scene dur={dur}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Quem libera é o [administrador]" at={0.05} />
      </Abs>
      <Abs x={960} y={555} center>
        <Pop at={0.25} y={60}>
          <div style={card({width: 600, overflow: 'hidden', borderRadius: 34})}>
            <div style={{height: 120, background: 'linear-gradient(110deg,#FFD9E8 0%,#E6E0FF 55%,#FFE6D6 100%)'}} />
            <div style={{padding: '0 44px 40px', marginTop: -62}}>
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                <div style={{position: 'relative'}}>
                  <Avatar size={124} initials="AD" hue={255} ring />
                  <div style={{position: 'absolute', right: -6, bottom: 0, width: 44, height: 44, borderRadius: 44, background: C.purple, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="shield" size={22} color="#fff" stroke={2.4} />
                  </div>
                </div>
                <Pop at={L(39.25)} pop y={10}>
                  <Eyebrow>Administrador</Eyebrow>
                </Pop>
              </div>
              <div style={{fontSize: 36, fontWeight: 600, marginTop: 20, letterSpacing: -0.6}}>Admin da conta</div>
              <div style={{fontSize: 23, color: C.muted, marginTop: 2}}>Configurações do WhatsApp Oficial</div>
              <div
                style={{
                  marginTop: 30,
                  padding: '22px 26px',
                  borderRadius: 22,
                  background: '#F7F6FB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                }}
              >
                <IconTile name="phone" size={52} />
                <div style={{flex: 1, fontSize: 25, fontWeight: 500}}>Ligações pelo WhatsApp</div>
                <Toggle on={on} />
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={925} center>
        <div style={{display: 'flex', gap: 22, alignItems: 'center'}}>
          {team.map((m, k) => {
            const at = L(40.15) + k * 0.08;
            return (
              <Pop key={k} at={0.6 + k * 0.05} y={20}>
                <TeamDot initials={m.i} hue={m.h} at={at} />
              </Pop>
            );
          })}
        </div>
      </Abs>
      <Sparkle x={590} y={330} at={L(40.2)} />
      <Sparkle x={1310} y={300} at={L(40.35)} size={20} color="#B7A8FF" />
      <Sparkle x={1340} y={760} at={L(40.5)} size={30} />
      <Cursor
        pts={[
          {t: L(38.9), x: 1500, y: 980},
          {t: L(39.7), x: 1185, y: 795},
          {t: L(41.5), x: 1200, y: 830},
        ]}
        clicks={[L(39.8)]}
      />
    </Scene>
  );
};

const TeamDot: React.FC<{initials: string; hue: number; at: number}> = ({initials, hue, at}) => {
  const p = useSpring(at, POP);
  const pc = Math.min(p, 1);
  return (
    <div style={{position: 'relative'}}>
      <div style={{filter: `grayscale(${1 - pc})`, opacity: 0.45 + 0.55 * pc}}>
        <Avatar size={72} initials={initials} hue={hue} />
      </div>
      <div
        style={{
          position: 'absolute',
          right: -4,
          bottom: -2,
          width: 28,
          height: 28,
          borderRadius: 28,
          background: C.green,
          border: '3px solid #fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${p})`,
        }}
      >
        <Icon name="check" size={15} color="#fff" stroke={3.4} />
      </div>
    </div>
  );
};

// ============ 5. O contato precisa autorizar (66.70s) ============
const Chip: React.FC<{icon: string; text: string; color: string; tint: string}> = ({icon, text, color, tint}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 24px 14px 14px',
      borderRadius: 99,
      background: 'rgba(255,255,255,0.92)',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: 25,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={{width: 40, height: 40, borderRadius: 40, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={21} color={color} stroke={2.5} />
    </div>
    {text}
  </div>
);

export const Autorizar: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const ok = useSpring(L(69.3));
  const cx = 1300;
  const cy = 545;
  return (
    <Scene dur={dur}>
      <Abs x={190} y={370} w={700}>
        <Pop at={L(66.95)} y={14}>
          <Eyebrow>Antes da 1ª ligação</Eyebrow>
        </Pop>
        <div style={{height: 28}} />
        <Words text="O contato precisa [autorizar]" at={L(68.3)} align="left" size={72} />
      </Abs>
      {/* órbitas */}
      {[180, 280, 380].map((r, i) => {
        const pulse = 1 + 0.015 * Math.sin(t * 2 + i);
        return (
          <Pop key={r} at={0.1 + i * 0.1} s={0.7} y={0}>
            <div
              style={{
                position: 'absolute',
                left: cx - r,
                top: cy - r,
                width: r * 2,
                height: r * 2,
                borderRadius: '50%',
                border: `1.5px solid rgba(160,140,255,${0.45 - i * 0.1})`,
                background: i === 0 ? 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(240,236,255,0.5))' : 'transparent',
                transform: `scale(${pulse})`,
              }}
            />
          </Pop>
        );
      })}
      {[0, 1, 2].map((k) => {
        const a = t * 0.5 + (k * Math.PI * 2) / 3;
        const r = 280;
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: cx + r * Math.cos(a) - 9,
              top: cy + r * Math.sin(a) - 9,
              width: 18,
              height: 18,
              borderRadius: 18,
              border: `3px solid rgba(150,130,255,0.5)`,
              borderTopColor: 'transparent',
              transform: `rotate(${t * 360}deg)`,
              opacity: ramp(t, 0.4, 0.8),
            }}
          />
        );
      })}
      <Abs x={cx} y={cy} center>
        <Pop at={0.2} pop s={0.6}>
          <div style={{padding: 8, borderRadius: '50%', background: C.grad, boxShadow: '0 20px 50px -10px rgba(109,93,246,0.5)'}}>
            <div style={{padding: 6, borderRadius: '50%', background: '#fff'}}>
              <ContactAvatar size={176} />
            </div>
          </div>
        </Pop>
      </Abs>
      {/* chip de status: bloqueada -> liberada */}
      <Abs x={cx + 140} y={cy - 250}>
        <Pop at={0.55} x={-20} y={0}>
          <div style={{position: 'relative'}}>
            <div style={{opacity: Math.max(0, 1 - ok * 1.8)}}>
              <Chip icon="lock" text="Ligação bloqueada" color={C.muted} tint="#F1F0F5" />
            </div>
            <div style={{position: 'absolute', left: 0, top: 0, opacity: ok, transform: `scale(${0.9 + 0.1 * ok})`}}>
              <Chip icon="unlock" text="Ligação liberada" color={C.green} tint={C.greenTint} />
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={cx - 470} y={cy + 150}>
        <Pop at={L(68.45)} x={30} y={0}>
          <Chip icon="message" text="Pedido de permissão" color={C.purple} tint={C.purpleTint} />
        </Pop>
      </Abs>
      <Abs x={cx + 110} y={cy + 270}>
        <Pop at={L(69.35)} x={-30} y={0} pop>
          <Chip icon="check" text="Contato autorizou" color={C.green} tint={C.greenTint} />
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ celular (WhatsApp) ============
const PHONE_W = 430;
const PHONE_H = 870;
export const Phone: React.FC<{children: React.ReactNode; title?: string; sub?: string; logo?: boolean}> = ({children, title = 'Sua empresa', sub = 'Conta comercial', logo = true}) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: 64,
      background: '#fff',
      padding: 12,
      boxSizing: 'border-box',
      boxShadow: '0 60px 110px -40px rgba(70,45,160,0.45), 0 20px 40px -20px rgba(70,45,160,0.2), inset 0 0 0 1.5px rgba(30,20,80,0.08)',
    }}
  >
    <div style={{position: 'relative', width: '100%', height: '100%', borderRadius: 54, overflow: 'hidden', background: '#F4EFE8'}}>
      <div style={{height: 54}} />
      <div style={{position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 110, height: 32, borderRadius: 32, background: '#111'}} />
      <div style={{background: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
        <Icon name="chevronLeft" size={26} color="#1F7AE0" />
        {logo ? (
          <div style={{width: 46, height: 46, borderRadius: 46, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Logo height={24} color="#fff" iconOnly />
          </div>
        ) : (
          <ContactAvatar size={46} />
        )}
        <div>
          <div style={{fontSize: 21, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6}}>
            {title}
            {logo && (
              <div style={{width: 18, height: 18, borderRadius: 18, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="check" size={11} color="#fff" stroke={4} />
              </div>
            )}
          </div>
          <div style={{fontSize: 15, color: C.muted}}>{sub}</div>
        </div>
      </div>
      <div style={{padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 12}}>{children}</div>
    </div>
  </div>
);

const Bubble: React.FC<{me?: boolean; children: React.ReactNode; time?: string; w?: number}> = ({me, children, time = '14:32', w}) => (
  <div
    style={{
      alignSelf: me ? 'flex-end' : 'flex-start',
      maxWidth: w ?? 300,
      background: me ? '#D9FDD3' : '#fff',
      borderRadius: 18,
      borderTopLeftRadius: me ? 18 : 4,
      borderTopRightRadius: me ? 4 : 18,
      padding: '10px 14px 8px',
      fontSize: 18,
      lineHeight: 1.4,
      boxShadow: '0 1px 1.5px rgba(0,0,0,0.08)',
    }}
  >
    {children}
    <div style={{fontSize: 13, color: '#8A8F98', textAlign: 'right', marginTop: 2}}>{time}</div>
  </div>
);

// ============ 6. O pedido chega / ela escolhe (89.0s) ============
export const Pedido: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const sheet = useSpring(L(94.75), {damping: 200, stiffness: 110, mass: 1});
  const pick = useSpring(L(99.95), POP);
  const toast = useSpring(L(100.15), POP);
  const zoom = interpolate(t, [L(94.6), L(95.6)], [0.94, 1.02], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const opts = [
    {k: 'Permitir ligações', s: 'Sempre que precisarem', at: L(95.9)},
    {k: 'Permitir temporariamente', s: 'Por um período limitado', at: L(97.1)},
    {k: 'Agora não', s: '', at: L(99.25)},
  ];
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={190} y={380} w={760}>
        <Pop at={0.15} y={14} out={L(94.8)}>
          <Eyebrow>Pedido de permissão</Eyebrow>
        </Pop>
        <div style={{height: 28}} />
        <Words text="O pedido chega no [WhatsApp] do contato" at={L(89.3)} out={L(94.8)} align="left" size={68} />
      </Abs>
      <Abs x={190} y={380} w={900}>
        <Pop at={L(95.0)} y={14}>
          <Eyebrow color={C.green} tint={C.greenTint}>3 opções</Eyebrow>
        </Pop>
        <div style={{height: 28}} />
        <Words text="Ela escolhe [como prefere]" at={L(95.05)} align="left" size={68} />
      </Abs>
      <Abs x={1320} y={545} center>
        <Pop at={0.05} y={90}>
          <div style={{transform: `scale(${zoom})`}}>
            <Phone>
              <div style={{alignSelf: 'center', background: 'rgba(255,255,255,0.85)', borderRadius: 10, padding: '4px 12px', fontSize: 14, color: C.muted, marginBottom: 6}}>Hoje</div>
              <Pop at={L(89.55)} y={30} s={0.9} blur={4}>
                <div style={{width: 330, background: '#fff', borderRadius: 18, borderTopLeftRadius: 4, boxShadow: '0 1px 1.5px rgba(0,0,0,0.08)', overflow: 'hidden'}}>
                  <div style={{padding: '14px 16px 8px', fontSize: 18, lineHeight: 1.45}}>
                    <div style={{fontWeight: 600, marginBottom: 4}}>Podemos te ligar? 📞</div>
                    Olá! Podemos te ligar pelo WhatsApp? Assim conseguimos te atender por chamada de voz.
                    <div style={{fontSize: 13, color: '#8A8F98', textAlign: 'right', marginTop: 4}}>14:32</div>
                  </div>
                  <Pop at={L(90.5)} y={8} blur={4}>
                    <div
                      style={{
                        borderTop: '1px solid rgba(0,0,0,0.07)',
                        padding: '14px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        color: '#1F7AE0',
                        fontSize: 19,
                        fontWeight: 500,
                      }}
                    >
                      <Icon name="phone" size={20} color="#1F7AE0" /> Ver opções
                    </div>
                  </Pop>
                </div>
              </Pop>
              {/* bottom sheet */}
              <div style={{position: 'absolute', inset: 0, background: `rgba(10,10,20,${0.35 * Math.min(sheet, 1)})`, pointerEvents: 'none'}} />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 520,
                  background: '#fff',
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  transform: `translateY(${(1 - sheet) * 540}px)`,
                  padding: '16px 26px',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{width: 56, height: 6, borderRadius: 6, background: '#E3E2EA', margin: '0 auto 22px'}} />
                <div style={{fontSize: 23, fontWeight: 600, lineHeight: 1.3}}>Permitir que Sua empresa te ligue pelo WhatsApp?</div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 22}}>
                  {opts.map((o, i) => {
                    const sel = i === 0 ? Math.min(pick, 1) : 0;
                    return (
                      <Pop key={i} at={o.at} y={18} blur={5}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            padding: '16px 18px',
                            borderRadius: 18,
                            background: sel > 0 ? `rgba(31,180,90,${0.1 * sel})` : '#F7F6FB',
                            border: `2px solid ${sel > 0.5 ? C.green : 'transparent'}`,
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 28,
                              border: `2.5px solid ${sel > 0.5 ? C.green : '#C9C7D6'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxSizing: 'border-box',
                            }}
                          >
                            <div style={{width: 14, height: 14, borderRadius: 14, background: C.green, transform: `scale(${sel})`}} />
                          </div>
                          <div>
                            <div style={{fontSize: 20, fontWeight: 600}}>{o.k}</div>
                            {o.s && <div style={{fontSize: 15, color: C.muted}}>{o.s}</div>}
                          </div>
                        </div>
                      </Pop>
                    );
                  })}
                </div>
              </div>
              {/* toast */}
              <div
                style={{
                  position: 'absolute',
                  top: 70,
                  left: '50%',
                  transform: `translate(-50%, ${(1 - toast) * -40}px)`,
                  opacity: Math.min(toast, 1),
                  background: '#fff',
                  borderRadius: 99,
                  padding: '12px 22px 12px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 18,
                  fontWeight: 600,
                  boxShadow: C.shadowSm,
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{width: 32, height: 32, borderRadius: 32, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="check" size={18} color="#fff" stroke={3.4} />
                </div>
                Ligações permitidas
              </div>
            </Phone>
          </div>
        </Pop>
      </Abs>
      <Cursor
        pts={[
          {t: L(93.6), x: 1700, y: 900},
          {t: L(94.45), x: 1340, y: 432},
          {t: L(98.6), x: 1500, y: 760},
          {t: L(99.8), x: 1260, y: 640},
          {t: L(100.6), x: 1270, y: 650},
        ]}
        clicks={[L(94.55), L(99.9)]}
      />
    </Scene>
  );
};

// ============ 7. O gestor acompanha (139.43s) ============
export const Gestor: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const n = Math.round(248 * ramp(t, L(140.2), L(141.9), 0, 1, Easing.out(Easing.cubic)));
  const bars = [0.55, 0.72, 0.48, 0.86, 0.66, 0.95, 0.38];
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const team = [
    {n: 'Ana Costa', m: '6h 12min', v: 1, h: 330},
    {n: 'Bruno Lima', m: '5h 03min', v: 0.81, h: 200},
    {n: 'Carla Dias', m: '4h 25min', v: 0.7, h: 20},
  ];
  const strike = ramp(t, L(143.6), L(144.1));
  return (
    <Scene dur={dur}>
      <Abs x={0} y={100} w={1920}>
        <Words text="O gestor [acompanha]" at={0.05} />
      </Abs>
      <Abs x={0} y={195} w={1920}>
        <Words text="sem pedir relatório para ninguém" at={L(143.05)} size={34} weight={500} color={C.muted} stagger={0.05} />
      </Abs>
      <Abs x={960} y={640} center>
        <Pop at={0.25} y={70}>
          <div style={card({width: 1480, height: 560, borderRadius: 36, display: 'flex', padding: 48, boxSizing: 'border-box', gap: 48})}>
            {/* número */}
            <div style={{width: 360, display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.muted, fontWeight: 500}}>
                <Icon name="phone" size={24} color={C.purple} /> Ligações na semana
              </div>
              <div style={{fontSize: 150, fontWeight: 600, letterSpacing: -6, lineHeight: 1.1, marginTop: 16}}>
                <Grad>{n}</Grad>
              </div>
              <Pop at={L(141.6)} pop y={10}>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 22, fontWeight: 600}}>
                  ▲ 32% vs semana passada
                </div>
              </Pop>
              <div style={{marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 500}}>
                <Icon name="clock" size={26} color={C.muted} />
                <span>
                  15h 40min <span style={{color: C.muted}}>em chamada</span>
                </span>
              </div>
            </div>
            {/* barras */}
            <div style={{flex: 1, borderLeft: `1px solid ${C.line}`, borderRight: `1px solid ${C.line}`, padding: '0 40px', display: 'flex', alignItems: 'flex-end', gap: 22}}>
              {bars.map((b, i) => {
                const p = Math.min(useSpring(L(140.3) + i * 0.07, {damping: 20, stiffness: 120, mass: 0.8}), 1.05);
                return (
                  <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
                    <div
                      style={{
                        width: '100%',
                        height: 380 * b * p,
                        borderRadius: 16,
                        background: i === 5 ? C.grad : 'linear-gradient(180deg, #CFC8FF 0%, #E9E5FF 100%)',
                        backgroundSize: '100% 100%',
                      }}
                    />
                    <div style={{fontSize: 18, color: C.muted, fontWeight: 500}}>{days[i]}</div>
                  </div>
                );
              })}
            </div>
            {/* time */}
            <div style={{width: 380, display: 'flex', flexDirection: 'column', gap: 30}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.muted, fontWeight: 500}}>
                <Icon name="users" size={24} color={C.purple} /> Por atendente
              </div>
              {team.map((m, i) => (
                <Pop key={i} at={L(141.6) + i * 0.15} x={30} y={0}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                    <Avatar size={58} initials={m.n.split(' ').map((s) => s[0]).join('')} hue={m.h} />
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 21, fontWeight: 600}}>
                        {m.n}
                        <span style={{color: C.muted, fontWeight: 500}}>{m.m}</span>
                      </div>
                      <div style={{height: 10, borderRadius: 10, background: '#F0EEF8', marginTop: 10}}>
                        <div style={{height: 10, borderRadius: 10, width: `${100 * m.v * ramp(t, L(141.7) + i * 0.15, L(142.6) + i * 0.15)}%`, background: C.grad}} />
                      </div>
                    </div>
                  </div>
                </Pop>
              ))}
            </div>
          </div>
        </Pop>
      </Abs>
      {/* "relatório" descartado */}
      <Abs x={1490} y={300}>
        <Pop at={L(143.4)} pop y={20} out={L(145.1)}>
          <div style={{position: 'relative', transform: 'rotate(6deg)'}}>
            <div style={card({padding: '16px 24px 16px 16px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 500, opacity: 1 - strike * 0.4})}>
              <IconTile name="doc" size={46} color={C.muted} tint="#F1F0F5" />
              Relatório.xlsx
            </div>
            <div style={{position: 'absolute', left: 10, top: '50%', height: 4, borderRadius: 4, width: `${strike * 92}%`, background: C.red}} />
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ 8. Valores e detalhes (159.07s) ============
export const Valores: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const Tile: React.FC<{icon: React.ReactNode; title: string; sub: string; at: number}> = ({icon, title, sub, at}) => (
    <Pop at={at} y={60}>
      <div style={card({width: 400, height: 380, borderRadius: 34, padding: 40, boxSizing: 'border-box', display: 'flex', flexDirection: 'column'})}>
        {icon}
        <div style={{fontSize: 38, fontWeight: 600, marginTop: 30, letterSpacing: -0.8}}>{title}</div>
        <div style={{fontSize: 23, color: C.muted, marginTop: 4}}>{sub}</div>
        <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12}}>
          <Skeleton w={280} h={12} />
          <Skeleton w={200} h={12} />
        </div>
      </div>
    </Pop>
  );
  return (
    <Scene dur={dur}>
      <Abs x={0} y={120} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 26}}>
          <Pop at={0.05} y={12}>
            <Eyebrow>Antes de ativar</Eyebrow>
          </Pop>
        </div>
        <Words text="Veja [valores] e [detalhes]" at={L(159.8)} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 56}}>
          <Tile
            at={L(159.95)}
            title="Valores"
            sub="Custo por minuto"
            icon={
              <div style={{width: 84, height: 84, borderRadius: 26, background: C.grad, color: '#fff', fontSize: 32, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                R$
              </div>
            }
          />
          <Tile
            at={L(161.15)}
            title="Detalhes"
            sub="Como tudo funciona"
            icon={
              <div style={{width: 84, height: 84, borderRadius: 26, background: C.purpleTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="book" size={40} color={C.purple} />
              </div>
            }
          />
        </div>
      </Abs>
      <Abs x={960} y={905} center>
        <Pop at={L(162.35)} y={30}>
          <div
            style={{
              width: 620,
              height: 76,
              borderRadius: 76,
              background: '#fff',
              boxShadow: C.shadowSm,
              border: `1px solid ${C.line}`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '0 30px',
              boxSizing: 'border-box',
              fontSize: 24,
              color: C.muted,
            }}
          >
            <Icon name="help" size={28} color={C.purple} />
            <span style={{color: C.text, fontWeight: 500}}>Central de Ajuda</span>
            <div style={{marginLeft: 'auto'}}>
              <Icon name="search" size={26} color={C.muted} />
            </div>
          </div>
        </Pop>
      </Abs>
      <Cursor
        pts={[
          {t: L(162.3), x: 1420, y: 1000},
          {t: L(162.85), x: 1080, y: 915},
        ]}
        clicks={[L(162.9)]}
      />
    </Scene>
  );
};

// ============ 9. Encerramento (169.3s) ============
const FinalA: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const secs = Math.round(60 * ramp(t, L(170.4), L(171.5), 0, 1, Easing.inOut(Easing.quad)));
  const msgs = ['Oi! Conseguiu ver a proposta?', 'Ainda não…', 'Posso te explicar melhor?', 'Qual parte ficou confusa?', 'Te mando um áudio?', '…'];
  return (
    <Scene dur={dur}>
      <Abs x={190} y={380} w={820}>
        <Words text="Resolve em [1 minuto]" at={L(170.25)} align="left" size={76} />
        <div style={{height: 16}} />
        <Words text="o que trava por mensagem" at={L(171.6)} align="left" size={44} weight={500} color={C.muted} stagger={0.05} />
      </Abs>
      {/* conversa travada atrás */}
      <Abs x={1130} y={200} w={540}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {msgs.map((m, i) => (
            <Pop key={i} at={L(171.55) + i * 0.1} y={20} blur={6}>
              <div style={{display: 'flex', justifyContent: i % 2 ? 'flex-end' : 'flex-start', opacity: 0.55, filter: 'grayscale(1)'}}>
                <div style={{background: '#fff', borderRadius: 18, padding: '14px 20px', fontSize: 22, boxShadow: C.shadowSm, color: C.muted}}>{m}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      {/* chamada resolvendo */}
      <Abs x={1400} y={640} center style={{transform: 'translate(-50%, -50%) scale(1.3)'}}>
        <Pop at={L(170.2)} y={50} pop>
          <div style={card({width: 470, padding: 30, borderRadius: 32, display: 'flex', alignItems: 'center', gap: 22, boxSizing: 'border-box'})}>
            <ContactAvatar size={78} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 26, fontWeight: 600}}>Rafaela Silva</div>
              <div style={{fontSize: 21, color: C.green, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8}}>
                <Icon name="phone" size={18} color={C.green} /> Em chamada
              </div>
            </div>
            <div style={{fontSize: 34, fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>
              <Grad>{`${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`}</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

const FinalB: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur}>
      <Abs x={190} y={400} w={800}>
        <Words text="Na mesma [conversa]" at={0.05} align="left" size={76} />
        <div style={{height: 16}} />
        <Words text="que o cliente já conhece" at={L(175.35)} align="left" size={44} weight={500} color={C.muted} stagger={0.05} />
      </Abs>
      <Abs x={1320} y={560} center>
        <Pop at={0.05} y={80}>
          <Phone>
            <div style={{alignSelf: 'center', background: 'rgba(255,255,255,0.85)', borderRadius: 10, padding: '4px 12px', fontSize: 14, color: C.muted}}>Hoje</div>
            <Bubble time="14:20">Olá! Recebi a proposta, mas fiquei com algumas dúvidas.</Bubble>
            <Bubble me time="14:21">
              Claro! Posso te ligar agora para explicar?
            </Bubble>
            <Bubble time="14:21">Pode sim 👍</Bubble>
            <Pop at={L(174.85)} y={30} s={0.85} pop>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <div
                  style={{
                    background: '#D9FDD3',
                    borderRadius: 18,
                    borderTopRightRadius: 4,
                    padding: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    boxShadow: '0 0 0 4px rgba(109,93,246,0.25), 0 10px 30px -6px rgba(109,93,246,0.4)',
                  }}
                >
                  <div style={{width: 46, height: 46, borderRadius: 46, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="phone" size={22} color="#1FA855" />
                  </div>
                  <div>
                    <div style={{fontSize: 19, fontWeight: 600}}>Chamada de voz</div>
                    <div style={{fontSize: 15, color: '#667'}}>1 min · 14:22</div>
                  </div>
                </div>
              </div>
            </Pop>
            <Pop at={L(176.0)} y={20} blur={5}>
              <Bubble time="14:23">Agora entendi tudo, obrigada! 🙌</Bubble>
            </Pop>
          </Phone>
        </Pop>
      </Abs>
    </Scene>
  );
};

const FinalC: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Tudo [registrado] no contato" at={0.0} stagger={0.05} />
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={0.05} y={60}>
          <div style={card({width: 820, padding: 40, borderRadius: 34, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <ContactAvatar size={82} />
              <div>
                <div style={{fontSize: 32, fontWeight: 600}}>Rafaela Silva</div>
                <div style={{fontSize: 21, color: C.muted}}>Histórico do contato</div>
              </div>
            </div>
            <Pop at={L(177.5)} y={30} blur={6}>
              <div style={{marginTop: 30, padding: 24, borderRadius: 24, background: '#F7F6FB', display: 'flex', alignItems: 'center', gap: 20}}>
                <IconTile name="phone" size={62} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: 25, fontWeight: 600}}>Chamada de WhatsApp realizada</div>
                  <div style={{fontSize: 19, color: C.muted, marginTop: 2}}>Hoje, 14:22 · 1 min · por Rafaela Beck</div>
                </div>
                <Pop at={L(177.85)} pop s={0.5} y={0}>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 19, fontWeight: 600}}>
                    <Icon name="check" size={18} color={C.green} stroke={3} /> Atendida
                  </div>
                </Pop>
              </div>
            </Pop>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={855} center>
        <Pop at={L(178.35)} y={24} pop>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '12px 28px 12px 14px',
              borderRadius: 99,
              background: '#fff',
              boxShadow: C.shadowSm,
              border: `1px solid ${C.line}`,
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            <div style={{display: 'flex'}}>
              {[330, 200, 20, 160].map((h, i) => (
                <Avatar key={i} size={44} initials={['AN', 'BR', 'CA', 'DI'][i]} hue={h} style={{marginLeft: i ? -12 : 0, border: '3px solid #fff', fontSize: 15}} />
              ))}
            </div>
            Visível para todo o time
          </div>
        </Pop>
      </Abs>
      <Sparkle x={530} y={420} at={L(178.45)} />
      <Sparkle x={1370} y={380} at={L(178.6)} size={20} color="#B7A8FF" />
      <Sparkle x={1390} y={800} at={L(178.75)} size={28} />
    </Scene>
  );
};

export const Final: React.FC<{g0: number; dur: number}> = ({g0}) => {
  const {fps} = useVideoConfig();
  const parts: [number, number][] = (
    [
      [169.3, 173.2],
      [173.2, 177.0],
      [177.0, 179.3],
    ] as [number, number][]
  ).map(([a, b]) => [W(a), W(b)]);
  parts[2][1] = 196.0; // o encerramento (Outro) começa em 196,0 s na narração nova
  const F = (s: number) => Math.round((s - g0) * fps);
  return (
    <>
      <Sequence from={F(parts[0][0])} durationInFrames={F(parts[0][1]) - F(parts[0][0])}>
        <FinalA g0={parts[0][0]} dur={parts[0][1] - parts[0][0]} />
      </Sequence>
      <Sequence from={F(parts[1][0])} durationInFrames={F(parts[1][1]) - F(parts[1][0])}>
        <FinalB g0={parts[1][0]} dur={parts[1][1] - parts[1][0]} />
      </Sequence>
      <Sequence from={F(parts[2][0])} durationInFrames={F(parts[2][1]) - F(parts[2][0])}>
        <FinalC g0={parts[2][0]} dur={parts[2][1] - parts[2][0]} />
      </Sequence>
    </>
  );
};

// ============ sobreposições na apresentadora ============
export const IntroOverlay: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Poppins', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 110}}>
    <Pop at={0.15} y={30}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '16px 32px 16px 16px',
          borderRadius: 99,
          background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 20px 50px -10px rgba(20,10,60,0.35)',
          fontSize: 34,
          fontWeight: 600,
          color: C.text,
        }}
      >
        <div style={{width: 58, height: 58, borderRadius: 58, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Logo height={30} color="#fff" iconOnly />
        </div>
        Novidade na <Grad>Clint</Grad>
      </div>
    </Pop>
  </AbsoluteFill>
);

export const OutroOverlay: React.FC = () => (
  <AbsoluteFill style={{fontFamily: 'Poppins', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 100}}>
    <Pop at={0.25} y={40}>
      <div
        style={{
          padding: '26px 46px',
          borderRadius: 32,
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(18px)',
          boxShadow: '0 20px 50px -10px rgba(20,10,60,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <div style={{width: 72, height: 72, borderRadius: 22, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="phone" size={34} color="#fff" />
        </div>
        <Words text="Faça hoje sua [primeira chamada]" at={0.35} size={52} stagger={0.06} />
      </div>
    </Pop>
  </AbsoluteFill>
);

// ============ 10. Encerramento sem apresentadora (196,0s na narração nova) ============
// Tempos já na narração nova: "Faça" 196,11 · "primeira" 196,99 · "chamada" 197,98 · "sinta" 198,32 · "diferença" 198,71 · "atendimento" 199,46
export const Outro: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const N = (s: number) => s - g0;
  const t = useSec();
  const click = N(197.95);
  const morph = useSpring(click + 0.08, {damping: 200, stiffness: 160, mass: 0.8});
  const secs = Math.max(0, Math.floor(t - (click + 0.2)) + 1);
  const dark = ramp(t, dur - 0.4, dur, 0, 1, Easing.in(Easing.quad));
  const pressed = t > click && t < click + 0.25 ? Math.sin(((t - click) / 0.25) * Math.PI) : 0;
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Faça hoje sua [primeira chamada]" at={N(196.1)} out={N(198.15)} />
      </Abs>
      <Abs x={0} y={150} w={1920}>
        <Words text="e sinta a [diferença] no atendimento" at={N(198.28)} stagger={0.07} />
      </Abs>
      {/* ondas da chamada conectada */}
      {[0, 1, 2].map((k) => {
        const u = (((t - click) * 0.7 + k / 3) % 1 + 1) % 1;
        const on = Math.min(morph, 1);
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 960 - 330 - 140 * u,
              top: 575 - 90 - 140 * u,
              width: 660 + 280 * u,
              height: 180 + 280 * u,
              borderRadius: 999,
              border: `3px solid rgba(37,211,102,${0.4 * (1 - u) * on})`,
            }}
          />
        );
      })}
      {/* botão "Ligar pelo WhatsApp" */}
      <Abs x={960} y={575} center>
        <Pop at={N(196.3)} y={50} pop>
          <div
            style={{
              opacity: 1 - Math.min(morph, 1),
              transform: `scale(${(1 - 0.06 * pressed) * (1 - 0.15 * morph)})`,
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '34px 56px',
              borderRadius: 99,
              background: 'linear-gradient(150deg, #3BE07C 0%, #1FA855 100%)',
              boxShadow: '0 30px 60px -18px rgba(31,168,85,0.55)',
              color: '#fff',
              fontSize: 46,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <Icon name="phone" size={50} color="#fff" stroke={2.4} />
            Ligar pelo WhatsApp
          </div>
        </Pop>
      </Abs>
      {/* cartão de chamada conectada */}
      <Abs x={960} y={575} center>
        <div style={{opacity: Math.min(morph, 1), transform: `scale(${0.85 + 0.15 * morph})`}}>
          <div style={card({width: 740, padding: '30px 44px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 26, boxSizing: 'border-box', whiteSpace: 'nowrap'})}>
            <ContactAvatar size={110} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 36, fontWeight: 600}}>Rafaela Silva</div>
              <div style={{fontSize: 26, color: C.green, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 12, height: 12, borderRadius: 12, background: C.green}} /> Chamada conectada
              </div>
            </div>
            <div style={{fontSize: 46, fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>
              <Grad>{`00:0${Math.min(secs, 9)}`}</Grad>
            </div>
          </div>
        </div>
      </Abs>
      {/* selos */}
      <Abs x={330} y={790}>
        <Pop at={N(198.75)} x={30} y={0} pop>
          <Chip icon="check" text="Registrado no histórico" color={C.green} tint={C.greenTint} />
        </Pop>
      </Abs>
      <Abs x={1180} y={790}>
        <Pop at={N(199.0)} x={-30} y={0} pop>
          <Chip icon="clock" text="Atendimento na hora" color={C.purple} tint={C.purpleTint} />
        </Pop>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={N(199.45)} y={16}>
          <Logo height={48} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={470} at={N(198.8)} />
      <Sparkle x={1380} y={430} at={N(198.95)} size={22} color="#B7A8FF" />
      <Sparkle x={1430} y={700} at={N(199.1)} size={30} />
      <Cursor
        pts={[
          {t: N(196.75), x: 1560, y: 980},
          {t: N(197.75), x: 1100, y: 600},
          {t: N(198.6), x: 1130, y: 640},
        ]}
        clicks={[click]}
        hide={N(198.5)}
      />
      {/* escurece para emendar na vinheta */}
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
