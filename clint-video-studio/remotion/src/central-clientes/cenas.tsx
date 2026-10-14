import React from 'react';
import {AbsoluteFill, Easing} from 'remotion';
import {C} from '../theme';
import {W} from './timing';
import {Abs, ContactAvatar, Cursor, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../ui';

// Cenas do vídeo "Central de Clientes". L(s) = s - g0, com s = instante da palavra na narração.
type P = {g0: number; dur: number};

const Chip: React.FC<{icon: string; text: string; color: string; tint: string; size?: number}> = ({icon, text, color, tint, size = 24}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 22px 10px 10px',
      borderRadius: 99,
      background: '#fff',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: size,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={{width: size * 1.7, height: size * 1.7, borderRadius: 99, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={size * 0.85} color={color} stroke={2.6} />
    </div>
    {text}
  </div>
);

const LogoTile: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Logo height={size * 0.52} color="#fff" iconOnly />
  </div>
);

const Saude: React.FC<{n: number; label: string; color: string; tint: string}> = ({n, label, color, tint}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 99, background: tint, color, fontSize: 20, fontWeight: 600}}>
    <span style={{fontSize: 24, fontWeight: 700}}>{n}</span> {label}
  </div>
);

const ClienteCard: React.FC<{nome: string; saude: React.ReactNode; at: number; glow?: number}> = ({nome, saude, at, glow = 0}) => (
  <Pop at={at} y={40}>
    <div
      style={card({
        width: 540,
        padding: '22px 26px',
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        boxSizing: 'border-box',
        boxShadow: `0 0 0 ${4 * glow}px rgba(242,127,181,${0.4 * glow}), ${C.shadow}`,
      })}
    >
      <ContactAvatar size={58} />
      <div style={{flex: 1}}>
        <div style={{fontSize: 26, fontWeight: 600, whiteSpace: 'nowrap'}}>{nome}</div>
        <div style={{fontSize: 18, color: C.muted, whiteSpace: 'nowrap'}}>Entrou pelo seu link</div>
      </div>
      {saude}
    </div>
  </Pop>
);

// ============ 1. Abertura (0 – 6,74 s) ============
// "Você já indicou clientes para a Clint? (0–2,2) Agora dá para acompanhar (3,1) cada um deles de perto (3,7–5,0), direto da sua conta (5,1–6,3)."
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => W(s) - g0;
  const t = useSec();
  const clientes = [
    {nome: 'Clínica Bem Viver', y: 330, at: 0.9},
    {nome: 'Rafaela Silva', y: 540, at: 1.15},
    {nome: 'Studio Lume', y: 750, at: 1.4},
  ];
  const eye = useSpring(L(3.1), POP);
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Você indicou [clientes?]" at={L(0.0)} out={L(2.35)} size={80} stagger={0.08} />
      </Abs>
      <Abs x={0} y={110} w={1920}>
        <Words text="Acompanhe cada um [de perto]" at={L(2.45)} size={80} stagger={0.07} />
      </Abs>
      {/* parceiro */}
      <Abs x={560} y={540} center>
        <Pop at={L(0.3)} y={50}>
          <div style={card({width: 400, padding: 34, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 20})}>
            <LogoTile size={78} />
            <div>
              <div style={{fontSize: 30, fontWeight: 600}}>Sua conta</div>
              <div style={{fontSize: 20, color: C.muted}}>Parceiro Clint</div>
            </div>
          </div>
        </Pop>
      </Abs>
      {/* linhas parceiro → clientes */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {clientes.map((c, i) => {
          const u = ramp(t, L(c.at - 0.2), L(c.at + 0.4), 0, 1);
          const d = `M 760 540 C 900 540, 980 ${c.y}, 1110 ${c.y}`;
          return <path key={i} d={d} stroke="url(#gr)" strokeWidth={4} fill="none" strokeDasharray="600" strokeDashoffset={600 * (1 - u)} strokeLinecap="round" />;
        })}
        <defs>
          <linearGradient id="gr" x1="0" x2="1">
            <stop offset="0%" stopColor="#6D5DF6" />
            <stop offset="100%" stopColor="#F27FB5" />
          </linearGradient>
        </defs>
      </svg>
      {clientes.map((c, i) => (
        <Abs key={i} x={1100} y={c.y - 52}>
          <ClienteCard nome={c.nome} at={L(c.at)} saude={<span />} />
        </Abs>
      ))}
      {/* olho de "acompanhar" */}
      <Abs x={560} y={700} center>
        <div style={{transform: `scale(${eye})`, opacity: Math.min(eye, 1)}}>
          <Chip icon="chart" text="Tudo pela sua conta" color={C.purple} tint={C.purpleTint} />
        </div>
      </Abs>
      <Sparkle x={420} y={380} at={L(3.2)} />
      <Sparkle x={1600} y={880} at={L(3.4)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 2. Oportunidades (77,44 – 84,37 s) ============
// "Assim, você acompanha cada cliente (78,1–79,9), encontra oportunidades (80,0–81,6), e fortalece a sua comissão recorrente (81,8–84,0)."
export const Oportunidades: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => W(s) - g0;
  const t = useSec();
  const op = useSpring(L(80.0));
  const glow = Math.min(op, 1);
  const valor = ramp(t, L(82.3), L(83.9), 0, 2480, Easing.out(Easing.cubic));
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Cada cliente, uma [oportunidade]" at={L(77.5)} size={76} stagger={0.07} />
      </Abs>
      <Abs x={180} y={330}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          <ClienteCard nome="Clínica Bem Viver" at={L(78.1)} saude={<Saude n={92} label="Ótima" color={C.green} tint={C.greenTint} />} />
          <ClienteCard nome="Odonto Sorriso" at={L(78.4)} saude={<Saude n={78} label="Estável" color={C.purple} tint={C.purpleTint} />} />
          <ClienteCard nome="Studio Lume" at={L(78.7)} glow={glow} saude={<Saude n={41} label="Atenção" color="#D9822B" tint="#FFF1E3" />} />
        </div>
      </Abs>
      <Abs x={196} y={744}>
        <Pop at={L(80.1)} y={-16} pop>
          <Chip icon="help" text="Oportunidade: ativar um agente de IA" color="#E04F9C" tint="#FDE7F2" size={22} />
        </Pop>
      </Abs>
      <Abs x={1470} y={560} center>
        <Pop at={L(81.8)} y={50}>
          <div style={card({width: 520, padding: 40, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
              <div style={{width: 60, height: 60, borderRadius: 18, background: C.purpleTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="history" size={30} color={C.purple} />
              </div>
              <div style={{fontSize: 25, color: C.muted, fontWeight: 500}}>Comissão recorrente</div>
            </div>
            <div style={{fontSize: 70, fontWeight: 700, letterSpacing: -2, marginTop: 18, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
              <Grad>{'R$ ' + valor.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Grad>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, height: 110, marginTop: 22}}>
              {[0.3, 0.42, 0.5, 0.63, 0.78, 0.95].map((h, i) => (
                <div key={i} style={{flex: 1, height: `${h * 100 * ramp(t, L(82.0 + i * 0.12), L(82.6 + i * 0.12))}%`, borderRadius: 10, background: i === 5 ? C.grad : C.purpleTint}} />
              ))}
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1720} y={330} at={L(82.2)} />
      <Sparkle x={1180} y={820} at={L(82.4)} size={22} color="#B7A8FF" />
      <Sparkle x={650} y={680} at={L(80.2)} size={24} />
    </Scene>
  );
};

// ============ 3. Encerramento (84,37 s – fim) ============
// "Acesse a Central de Clientes (84,4–86,2) e acompanhe seus clientes hoje (86,2–88,2)."
export const Final: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => W(s) - g0;
  const t = useSec();
  const click = L(85.9);
  const morph = useSpring(click + 0.1, {damping: 200, stiffness: 160, mass: 0.8});
  const pressed = t > click && t < click + 0.25 ? Math.sin(((t - click) / 0.25) * Math.PI) : 0;
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Acompanhe seus clientes [hoje]" at={L(84.4)} size={82} stagger={0.07} />
      </Abs>
      <Abs x={960} y={570} center>
        <Pop at={L(84.6)} y={50} pop>
          <div
            style={{
              opacity: 1 - Math.min(morph, 1),
              transform: `scale(${(1 - 0.06 * pressed) * (1 - 0.15 * morph)})`,
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: '32px 56px',
              borderRadius: 99,
              background: 'linear-gradient(95deg, #6D5DF6 0%, #8F6CF4 100%)',
              boxShadow: '0 30px 60px -18px rgba(109,93,246,0.6)',
              color: '#fff',
              fontSize: 46,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <Icon name="users" size={48} color="#fff" stroke={2.2} />
            Central de Clientes
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={570} center>
        <div style={{opacity: Math.min(morph, 1), transform: `scale(${0.85 + 0.15 * morph})`}}>
          <div style={card({width: 780, padding: '28px 40px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 24, boxSizing: 'border-box', whiteSpace: 'nowrap'})}>
            <LogoTile size={96} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 34, fontWeight: 600}}>12 clientes indicados</div>
              <div style={{fontSize: 24, color: C.green, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 12, height: 12, borderRadius: 12, background: C.green}} /> 9 ativos
              </div>
            </div>
            <Icon name="chart" size={52} color={C.purple} />
          </div>
        </div>
      </Abs>
      <Abs x={960} y={900} center>
        <Pop at={L(87.0)} y={16}>
          <Logo height={46} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={470} at={L(86.1)} />
      <Sparkle x={1380} y={420} at={L(86.25)} size={22} color="#B7A8FF" />
      <Sparkle x={1420} y={690} at={L(86.4)} size={30} />
      <Cursor
        pts={[
          {t: L(84.9), x: 1560, y: 980},
          {t: L(85.7), x: 1120, y: 590},
          {t: L(86.6), x: 1160, y: 650},
        ]}
        clicks={[click]}
        hide={L(86.4)}
      />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
