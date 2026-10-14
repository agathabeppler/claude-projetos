import React from 'react';
import {AbsoluteFill, Easing} from 'remotion';
import {C} from '../../theme';
import {Abs, ContactAvatar, Cursor, Grad, Icon, IconTile, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';

// Vídeo "Cadastro no Programa de Parceiros (quem já é cliente)".
// Tempos = segundos da narração v2 (videos/2026-10-13-cadastro-parceiros/entrada/narracao.wav).
// Dentro da cena: L(s) = s - g0.

type P = {g0: number; dur: number};

const Chip: React.FC<{icon: string; text: string; color: string; tint: string; size?: number}> = ({icon, text, color, tint, size = 26}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 26px 12px 12px',
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

const Row: React.FC<{text: string; ok: boolean; at: number}> = ({text, ok, at}) => (
  <Pop at={at} y={14} blur={6}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 27, fontWeight: 500, color: ok ? C.text : C.muted}}>
      <div style={{width: 38, height: 38, borderRadius: 38, background: ok ? C.greenTint : C.redTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={ok ? 'check' : 'x'} size={20} color={ok ? C.green : C.red} stroke={2.8} />
      </div>
      {text}
    </div>
  </Pop>
);

const LogoTile: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Logo height={size * 0.52} color="#fff" iconOnly />
  </div>
);

// ============ 1. Abertura (0 – 7,1 s): "Já é cliente Clint? ... virar parceiro ... 30% de comissão recorrente" ============
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => s - g0;
  const t = useSec();
  const badge = useSpring(L(2.8), POP);
  const glow = Math.min(badge, 1);
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Já é cliente [Clint?]" at={L(0.0)} size={84} stagger={0.09} />
      </Abs>
      {/* conta do cliente */}
      <Abs x={760} y={600} center>
        <Pop at={L(0.35)} y={60}>
          <div
            style={card({
              width: 640,
              padding: 44,
              boxSizing: 'border-box',
              position: 'relative',
              boxShadow: `0 0 0 ${4 * glow}px rgba(109,93,246,${0.3 * glow}), ${C.shadow}`,
            })}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <LogoTile size={92} />
              <div>
                <div style={{fontSize: 36, fontWeight: 600, letterSpacing: -0.6}}>Sua conta Clint</div>
                <div style={{fontSize: 23, color: C.muted}}>Rafaela Silva Consultoria</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: 14, marginTop: 34}}>
              {['Negócios', 'Conversas', 'Automações'].map((x, i) => (
                <Pop key={x} at={L(0.6 + i * 0.1)} y={10} blur={4}>
                  <div style={{padding: '10px 20px', borderRadius: 99, background: '#F5F4FA', fontSize: 21, color: C.muted, fontWeight: 500}}>{x}</div>
                </Pop>
              ))}
            </div>
            {/* selo de parceiro */}
            <div
              style={{
                position: 'absolute',
                right: -36,
                top: -34,
                transform: `scale(${badge}) rotate(${(1 - Math.min(badge, 1)) * -25 + 6}deg)`,
                opacity: Math.min(badge * 1.5, 1),
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 28px',
                  borderRadius: 99,
                  background: C.grad,
                  color: '#fff',
                  fontSize: 30,
                  fontWeight: 600,
                  boxShadow: '0 20px 40px -12px rgba(140,90,240,0.6)',
                }}
              >
                <Icon name="shield" size={30} color="#fff" stroke={2.4} />
                Parceiro
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      {/* 30% recorrente */}
      <Abs x={1390} y={600} center>
        <Pop at={L(4.35)} pop s={0.6} y={20}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 190, fontWeight: 700, letterSpacing: -8, lineHeight: 1}}>
              <span style={{fontSize: 70, fontWeight: 600, color: C.muted, letterSpacing: -1, marginRight: 10}}>até</span>
              <Grad>{`${Math.round(ramp(t, L(4.4), L(5.3), 0, 30, Easing.out(Easing.cubic)))}%`}</Grad>
            </div>
          </div>
        </Pop>
        <div style={{height: 24}} />
        <Pop at={L(5.55)} y={16}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Chip icon="history" text="comissão recorrente" color={C.purple} tint={C.purpleTint} />
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1020} y={360} at={L(2.9)} />
      <Sparkle x={440} y={830} at={L(3.05)} size={22} color="#B7A8FF" />
      <Sparkle x={1640} y={420} at={L(4.6)} size={30} />
    </Scene>
  );
};

// ============ 2. Sem conta nova (7,1 – 13,33 s) ============
export const SemContaNova: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => s - g0;
  const strike = ramp(useSec(), L(10.0), L(10.5), 0, 1);
  const hi = useSpring(L(10.95));
  return (
    <Scene dur={dur}>
      <Abs x={0} y={140} w={1920}>
        <Words text="Sem [conta nova]" at={L(7.1)} out={L(10.55)} size={76} />
      </Abs>
      <Abs x={0} y={140} w={1920}>
        <Words text="Tudo na conta que você [já usa]" at={L(10.64)} size={76} stagger={0.06} />
      </Abs>
      <Abs x={960} y={610} center>
        <div style={{display: 'flex', gap: 70, alignItems: 'center'}}>
          <Pop at={L(7.3)} y={50}>
            <div style={card({width: 540, padding: 44, boxSizing: 'border-box', background: 'rgba(255,255,255,0.8)', position: 'relative', opacity: 1 - 0.35 * strike})}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
                <IconTile name="user" size={80} color={C.muted} tint="#F1F0F5" />
                <div>
                  <div style={{fontSize: 33, fontWeight: 600, letterSpacing: -0.6, color: C.muted}}>Criar outra conta</div>
                  <div style={{fontSize: 22, color: C.faint}}>e recomeçar tudo</div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                <Row ok={false} text="Novo cadastro" at={L(7.8)} />
                <Row ok={false} text="Teste do zero" at={L(9.5)} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 30,
                  top: '50%',
                  height: 5,
                  borderRadius: 5,
                  width: `${strike * 90}%`,
                  background: C.red,
                  opacity: 0.75,
                }}
              />
            </div>
          </Pop>
          <Pop at={L(10.7)} y={50}>
            <div
              style={card({
                width: 540,
                padding: 44,
                boxSizing: 'border-box',
                boxShadow: `0 0 0 ${4 * hi}px rgba(109,93,246,${0.35 * hi}), ${C.shadow}`,
                transform: `scale(${1 + 0.04 * hi})`,
              })}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
                <LogoTile size={80} />
                <div>
                  <div style={{fontSize: 33, fontWeight: 600, letterSpacing: -0.6}}>Sua conta Clint</div>
                  <div style={{fontSize: 22, color: C.muted}}>a mesma de sempre</div>
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                <Row ok text="Mesmo login" at={L(11.4)} />
                <Row ok text="Cadastro em minutos" at={L(11.75)} />
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1480} y={350} at={L(11.1)} />
      <Sparkle x={1500} y={850} at={L(11.3)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 4. Comissão a cada cliente (104,47 – 110,20 s) ============
const brl = (n: number) => 'R$ ' + n.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});

export const Comissao: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => s - g0;
  const t = useSec();
  const clientes = [
    {at: 105.0, nome: 'Maurício'},
    {at: 105.45, nome: 'Juliana'},
    {at: 105.9, nome: 'Carlos'},
  ];
  const valor = ramp(t, L(106.8), L(108.1), 0, 1840, Easing.out(Easing.cubic));
  const painel = useSpring(L(108.25));
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Cada cliente, uma [comissão]" at={L(104.5)} size={76} stagger={0.07} />
      </Abs>
      {/* link → clientes */}
      <Abs x={170} y={360}>
        <Pop at={L(104.6)} x={-30} y={0}>
          <Chip icon="message" text="Seu link de indicação" color={C.purple} tint={C.purpleTint} />
        </Pop>
        <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 40, marginLeft: 40}}>
          {clientes.map((c) => (
            <Pop key={c.nome} at={L(c.at)} x={-24} y={0}>
              <div style={card({width: 520, padding: '18px 24px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 18, boxSizing: 'border-box'})}>
                <ContactAvatar size={56} />
                <div style={{flex: 1, fontSize: 26, fontWeight: 600}}>{c.nome}</div>
                <Pop at={L(c.at + 0.3)} pop s={0.5} y={0}>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 20, fontWeight: 600}}>
                    <Icon name="check" size={18} color={C.green} stroke={3} /> Fechou
                  </div>
                </Pop>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      {/* painel */}
      <Abs x={1330} y={600} center>
        <Pop at={L(106.6)} y={50}>
          <div style={card({width: 600, padding: 40, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <IconTile name="chart" size={64} />
              <div style={{fontSize: 26, color: C.muted, fontWeight: 500}}>Comissão total</div>
            </div>
            <div style={{fontSize: 74, fontWeight: 700, letterSpacing: -2, marginTop: 18, fontVariantNumeric: 'tabular-nums'}}>
              <Grad>{brl(valor)}</Grad>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, height: 120, marginTop: 24, opacity: Math.min(painel, 1)}}>
              {[0.35, 0.5, 0.45, 0.7, 0.62, 0.9].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h * 100 * Math.min(Math.max(painel * 1.4 - i * 0.08, 0), 1)}%`,
                    borderRadius: 10,
                    background: i === 5 ? C.grad : C.purpleTint,
                  }}
                />
              ))}
            </div>
            <div style={{fontSize: 21, color: C.muted, marginTop: 14, opacity: Math.min(painel, 1)}}>Acompanhe tudo no Painel do afiliado</div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1600} y={300} at={L(107.0)} />
      <Sparkle x={1040} y={820} at={L(107.3)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 5. Encerramento (110,20 s – fim) ============
export const Final: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => s - g0;
  const t = useSec();
  const click = L(112.55);
  const morph = useSpring(click + 0.1, {damping: 200, stiffness: 160, mass: 0.8});
  const pressed = t > click && t < click + 0.25 ? Math.sin(((t - click) / 0.25) * Math.PI) : 0;
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Leva poucos [minutos]" at={L(110.25)} out={L(111.35)} size={84} />
      </Abs>
      <Abs x={0} y={170} w={1920}>
        <Words text="Faça seu [cadastro hoje]" at={L(111.45)} size={84} stagger={0.07} />
      </Abs>
      {/* botão → selo de parceiro */}
      <Abs x={960} y={580} center>
        <Pop at={L(110.5)} y={50} pop>
          <div
            style={{
              opacity: 1 - Math.min(morph, 1),
              transform: `scale(${(1 - 0.06 * pressed) * (1 - 0.15 * morph)})`,
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '34px 60px',
              borderRadius: 99,
              background: 'linear-gradient(95deg, #6D5DF6 0%, #8F6CF4 100%)',
              boxShadow: '0 30px 60px -18px rgba(109,93,246,0.6)',
              color: '#fff',
              fontSize: 48,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Quero ser parceiro <span style={{fontSize: 44}}>→</span>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={580} center>
        <div style={{opacity: Math.min(morph, 1), transform: `scale(${0.85 + 0.15 * morph})`}}>
          <div style={card({width: 760, padding: '30px 44px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 26, boxSizing: 'border-box', whiteSpace: 'nowrap'})}>
            <LogoTile size={104} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 36, fontWeight: 600}}>Parceiro Clint</div>
              <div style={{fontSize: 25, color: C.green, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 12, height: 12, borderRadius: 12, background: C.green}} /> Cadastro concluído
              </div>
            </div>
            <div style={{fontSize: 54, fontWeight: 700}}>
              <Grad>30%</Grad>
            </div>
          </div>
        </div>
      </Abs>
      <Abs x={960} y={790} center>
        <Pop at={L(112.85)} y={20}>
          <div style={{fontSize: 40, fontWeight: 500, color: C.muted, whiteSpace: 'nowrap'}}>
            e comece a ganhar com a <Grad>Clint</Grad>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={950} center>
        <Pop at={L(113.6)} y={16}>
          <Logo height={46} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={470} at={L(112.7)} />
      <Sparkle x={1380} y={430} at={L(112.85)} size={22} color="#B7A8FF" />
      <Sparkle x={1420} y={700} at={L(113.0)} size={30} />
      <Cursor
        pts={[
          {t: L(111.4), x: 1560, y: 980},
          {t: L(112.35), x: 1130, y: 600},
          {t: L(113.2), x: 1170, y: 660},
        ]}
        clicks={[click]}
        hide={L(113.0)}
      />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
