import React from 'react';
import {AbsoluteFill, Easing} from 'remotion';
import {C} from '../../theme';
import {Abs, Avatar, Cursor, Grad, Icon, IconTile, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';

// Vídeo "Como registrar um case de sucesso" (Programa de Parceiros).
// Tempos dentro de cada cena = segundos desde o início do bloco (estimados; ajustar quando houver narração).
// Dados sempre fictícios.

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

const LogoTile: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <Logo height={size * 0.52} color="#fff" iconOnly />
  </div>
);

/** Iniciais num quadradinho, como no seletor de clientes do design. */
const Ini: React.FC<{t: string; size?: number; hue?: number}> = ({t, size = 64, hue = 260}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.26,
      background: `hsl(${hue} 80% 95%)`,
      color: `hsl(${hue} 55% 48%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.36,
      fontWeight: 600,
      flexShrink: 0,
    }}
  >
    {t}
  </div>
);

const Check: React.FC<{text: string; at: number}> = ({text, at}) => (
  <Pop at={at} y={14} blur={6}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, fontWeight: 500}}>
      <div style={{width: 40, height: 40, borderRadius: 40, background: C.greenTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="check" size={22} color={C.green} stroke={2.8} />
      </div>
      {text}
    </div>
  </Pop>
);

// ============ 1. Gancho: "Seu cliente teve resultado com a Clint? Agora isso pode virar indicações para você." ============
export const Abertura: React.FC<P> = ({dur}) => {
  const t = useSec();
  const bars = [0.28, 0.4, 0.36, 0.58, 0.74, 0.96];
  const arrow = ramp(t, 3.0, 3.6);
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Seu cliente teve [resultado?]" at={0.05} size={84} stagger={0.09} />
      </Abs>
      {/* conta do cliente com resultado subindo */}
      <Abs x={620} y={610} center>
        <Pop at={0.4} y={60}>
          <div style={card({width: 600, padding: 40, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <Ini t="CV" size={76} hue={330} />
              <div>
                <div style={{fontSize: 34, fontWeight: 600, letterSpacing: -0.5}}>Clínica Vida</div>
                <div style={{fontSize: 22, color: C.muted}}>Cliente indicado por você</div>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, height: 190, marginTop: 34}}>
              {bars.map((h, i) => {
                const g = ramp(t, 1.0 + i * 0.14, 1.6 + i * 0.14, 0, 1, Easing.out(Easing.cubic));
                return <div key={i} style={{flex: 1, height: 190 * h * g, borderRadius: 12, background: i === bars.length - 1 ? C.grad : '#E9E6FB'}} />;
              })}
            </div>
          </div>
        </Pop>
      </Abs>
      {/* seta */}
      <Abs x={1010} y={610} center>
        <div style={{opacity: arrow, transform: `translateX(${(1 - arrow) * -30}px)`, fontSize: 80, fontWeight: 600, color: C.purple}}>→</div>
      </Abs>
      {/* vira indicações */}
      <Abs x={1390} y={610} center>
        <Pop at={3.3} pop s={0.6} y={20}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
            <IconTile name="users" size={150} />
            <div style={{fontSize: 52, fontWeight: 600, letterSpacing: -1, whiteSpace: 'nowrap'}}>
              <Grad>indicações</Grad> para você
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={860} y={420} at={2.0} />
      <Sparkle x={1580} y={420} at={3.6} size={30} />
      <Sparkle x={1200} y={800} at={3.8} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 2. "Com um case validado, você entra na lista de indicações da Clint. E a Clint dá preferência aos parceiros mais ativos." ============
const PARCEIROS = [
  {n: 'Agência Maré', ini: 'AM', hue: 200, at: 3.0},
  {n: 'Lucas Prado Digital', ini: 'LP', hue: 30, at: 3.15},
  {n: 'Studio Ponto', ini: 'SP', hue: 150, at: 3.3},
];
const ROW_H = 118;
export const ListaIndicacoes: React.FC<P> = ({dur}) => {
  const t = useSec();
  // "preferência aos parceiros mais ativos" (~5,6 s): o parceiro sobe para o topo
  const up = ramp(t, 5.9, 6.8, 0, 1, Easing.inOut(Easing.cubic));
  const youY = (1 - up) * 3 * ROW_H;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Case validado: você entra na [lista de indicações]" at={0.05} out={5.3} size={70} stagger={0.07} />
      </Abs>
      <Abs x={0} y={120} w={1920}>
        <Words text="Preferência para os [mais ativos]" at={5.45} size={70} stagger={0.08} />
      </Abs>
      <Abs x={960} y={640} center>
        <Pop at={0.5} y={50}>
          <div style={card({width: 900, padding: '34px 40px', boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22}}>
              <LogoTile size={54} />
              <div style={{fontSize: 30, fontWeight: 600}}>Lista de indicações da Clint</div>
            </div>
            <div style={{position: 'relative', height: ROW_H * 4}}>
              {PARCEIROS.map((p, i) => (
                <div key={p.n} style={{position: 'absolute', left: 0, right: 0, top: (i + up) * ROW_H, height: ROW_H}}>
                  <Pop at={p.at - 2.2} y={12} blur={6}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, height: ROW_H - 18, padding: '0 20px', borderRadius: 18, background: '#F8F7FC'}}>
                      <Ini t={p.ini} size={58} hue={p.hue} />
                      <div style={{fontSize: 27, fontWeight: 500, flex: 1, color: C.muted}}>{p.n}</div>
                    </div>
                  </Pop>
                </div>
              ))}
              {/* você */}
              <div style={{position: 'absolute', left: 0, right: 0, top: youY, height: ROW_H}}>
                <Pop at={1.7} x={-60} y={0} pop>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      height: ROW_H - 18,
                      padding: '0 20px',
                      borderRadius: 18,
                      background: '#fff',
                      boxShadow: `0 0 0 3px rgba(109,93,246,0.35), ${C.shadowSm}`,
                    }}
                  >
                    <Avatar size={58} initials="RS" />
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 27, fontWeight: 600}}>Você</div>
                      <div style={{fontSize: 20, color: C.muted}}>Rafaela Silva Consultoria</div>
                    </div>
                    <Pop at={2.3} pop s={0.5} y={0}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.greenTint, color: C.green, fontSize: 20, fontWeight: 600}}>
                        <Icon name="check" size={18} color={C.green} stroke={3} /> Case validado
                      </div>
                    </Pop>
                    <div style={{width: 12}} />
                    <Pop at={6.4} pop s={0.5} y={0}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 20, fontWeight: 600}}>
                        <Icon name="chart" size={18} color="#fff" stroke={2.6} /> Mais ativo
                      </div>
                    </Pop>
                  </div>
                </Pop>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1440} y={330} at={6.6} size={30} />
      <Sparkle x={470} y={360} at={6.8} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 3–9. Lugar das telas (provisório até gravar o modal real) ============
export const TelaPendente: React.FC<P> = ({dur}) => (
  <Scene dur={dur} push={0}>
    <Abs x={960} y={540} center>
      <div style={card({width: 1500, height: 820, borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, border: '3px dashed #D9D5F5', boxShadow: 'none', background: 'rgba(255,255,255,0.7)'})}>
        <IconTile name="smartphone" size={96} />
        <div style={{fontSize: 40, fontWeight: 600}}>Gravação da tela real entra aqui</div>
        <div style={{fontSize: 26, color: C.muted, textAlign: 'center', lineHeight: 1.5}}>
          Passo 4 › escolher o cliente › Como era antes › O que mudou com a Clint
          <br />
          número e vídeo (opcionais) › autorização de divulgação › Enviar para validação
        </div>
      </div>
    </Abs>
  </Scene>
);

// ============ 10. "O time Clint confere na conta do cliente se ele está pagando e usando a Clint de verdade, e te responde pelo WhatsApp." ============
export const Validacao: React.FC<P> = ({dur}) => {
  const t = useSec();
  const lupa = ramp(t, 1.4, 4.6, 0, 1, Easing.inOut(Easing.sin));
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={120} w={1920}>
        <Words text="O time Clint [confere]" at={0.05} size={76} stagger={0.09} />
      </Abs>
      {/* conta do cliente */}
      <Abs x={660} y={610} center>
        <Pop at={0.6} y={50}>
          <div style={card({width: 660, padding: 44, boxSizing: 'border-box', position: 'relative'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36}}>
              <Ini t="EN" size={76} hue={210} />
              <div>
                <div style={{fontSize: 34, fontWeight: 600}}>Escola Norte</div>
                <div style={{fontSize: 22, color: C.muted}}>Conta do cliente</div>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
              <Check text="Está pagando" at={2.6} />
              <Check text="Usa a Clint de verdade" at={3.9} />
            </div>
            {/* lupa passando */}
            <div style={{position: 'absolute', left: 380 + 120 * Math.sin(lupa * Math.PI * 2), top: 70 + 160 * lupa, opacity: ramp(t, 1.2, 1.5) * (1 - ramp(t, 4.6, 5.0))}}>
              <div style={{width: 130, height: 130, borderRadius: 130, background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(1px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: C.shadowSm}}>
                <Icon name="search" size={110} color={C.purple} stroke={1.6} />
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      {/* resposta pelo WhatsApp */}
      <Abs x={1380} y={610} center>
        <Pop at={5.6} y={50} pop>
          <div style={card({width: 560, padding: 0, overflow: 'hidden'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '22px 28px', background: '#F4EFE8'}}>
              <LogoTile size={56} />
              <div>
                <div style={{fontSize: 26, fontWeight: 600}}>Clint · Parceiros</div>
                <div style={{fontSize: 19, color: C.muted, display: 'flex', alignItems: 'center', gap: 8}}>
                  <div style={{width: 10, height: 10, borderRadius: 10, background: '#25D366'}} /> WhatsApp
                </div>
              </div>
            </div>
            <div style={{padding: 28, background: '#F4EFE8'}}>
              <Pop at={6.3} y={14} blur={4}>
                <div style={{maxWidth: 440, background: '#fff', borderRadius: 18, borderTopLeftRadius: 4, padding: '16px 20px', fontSize: 24, lineHeight: 1.45, boxShadow: '0 1px 1.5px rgba(0,0,0,0.08)'}}>
                  Oi, Rafaela! Seu case da Escola Norte foi <b>validado</b>.
                  <div style={{fontSize: 16, color: '#8A8F98', textAlign: 'right', marginTop: 4}}>10:42</div>
                </div>
              </Pop>
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1600} y={380} at={6.4} size={28} />
    </Scene>
  );
};

// ============ 11. "Case validado, você entra na lista de indicações da Clint. Registre seu primeiro case hoje." ============
export const Final: React.FC<P> = ({dur}) => {
  const t = useSec();
  const click = 4.05;
  const morph = useSpring(click + 0.1, {damping: 200, stiffness: 160, mass: 0.8});
  const pressed = t > click && t < click + 0.25 ? Math.sin(((t - click) / 0.25) * Math.PI) : 0;
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  const seal = useSpring(0.15, POP);
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Você na [lista de indicações]" at={0.1} out={2.75} size={80} stagger={0.08} />
      </Abs>
      <Abs x={0} y={170} w={1920}>
        <Words text="Registre seu [primeiro case] hoje" at={2.85} size={80} stagger={0.08} />
      </Abs>
      {/* selo "case validado" → botão "Registrar case" */}
      <Abs x={960} y={580} center>
        <div style={{opacity: 1 - ramp(t, 2.6, 2.9), transform: `scale(${seal})`}}>
          <div style={card({padding: '30px 50px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'})}>
            <div style={{width: 76, height: 76, borderRadius: 76, background: C.greenTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="check" size={42} color={C.green} stroke={3} />
            </div>
            <div style={{fontSize: 44, fontWeight: 600}}>Case validado</div>
          </div>
        </div>
      </Abs>
      <Abs x={960} y={580} center>
        <Pop at={2.9} y={40} pop>
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
            Registrar case de sucesso <span style={{fontSize: 44}}>→</span>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={580} center>
        <div style={{opacity: Math.min(morph, 1), transform: `scale(${0.85 + 0.15 * morph})`}}>
          <div style={card({padding: '30px 50px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'})}>
            <LogoTile size={90} />
            <div>
              <div style={{fontSize: 36, fontWeight: 600}}>Case enviado para validação</div>
              <div style={{fontSize: 24, color: C.muted}}>Avisamos pelo WhatsApp</div>
            </div>
          </div>
        </div>
      </Abs>
      <Abs x={960} y={950} center>
        <Pop at={4.6} y={16}>
          <Logo height={46} />
        </Pop>
      </Abs>
      <Sparkle x={560} y={470} at={0.4} />
      <Sparkle x={1380} y={430} at={4.3} size={22} color="#B7A8FF" />
      <Sparkle x={1420} y={700} at={4.4} size={30} />
      <Cursor
        pts={[
          {t: 3.0, x: 1560, y: 980},
          {t: 3.85, x: 1180, y: 600},
          {t: 4.7, x: 1220, y: 660},
        ]}
        clicks={[click]}
        hide={4.6}
      />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
