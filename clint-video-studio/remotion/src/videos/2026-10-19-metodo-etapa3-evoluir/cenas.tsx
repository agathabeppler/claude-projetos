import React from 'react';
import {AbsoluteFill, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';
import {Badge, Bubble, Chip, Tile, XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';
import {Clinica} from '../2026-10-16-metodo-etapa1-vender/cenas';
import {Capitulo, P, PASSOS, Resumo, TelaVideo, Trilha, b} from './comum';

// Método · Etapa 3 · Evoluir. Tempos: b(k, s) = início do bloco k da narração + s (palavras do HeyGen).

const AuraTile: React.FC<{size?: number}> = ({size = 80}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: 'linear-gradient(135deg, #F27FB5 0%, #A86CF2 50%, #6D5DF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
      <path d="M12 0c.6 5.6 2.4 7.6 12 12-9.6 4.4-11.4 6.4-12 12-.6-5.6-2.4-7.6-12-12C9.6 7.6 11.4 5.6 12 0z" fill="#fff" />
    </svg>
  </div>
);

const Linha: React.FC<{at: number; t: string; icon: string; sub?: string; w?: number; ok?: boolean; ativo?: number}> = ({at, t, icon, sub, w = 900, ok, ativo = 0}) => {
  const c = useSpring(at + 0.25, POP);
  return (
    <Pop at={at} x={-30} y={0}>
      <div
        style={{
          ...card({width: w, padding: '18px 26px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 20, boxSizing: 'border-box'}),
          boxShadow: ativo > 0 ? `0 0 0 ${4 * ativo}px rgba(109,93,246,0.35), ${C.shadowSm}` : C.shadowSm,
        }}
      >
        <Tile name={icon} size={58} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 31, fontWeight: 600}}>{t}</div>
          {sub && <div style={{fontSize: 23, color: C.muted, marginTop: 2}}>{sub}</div>}
        </div>
        {ok && (
          <div style={{width: 44, height: 44, borderRadius: 44, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${c})`}}>
            <Icon name="check" size={26} color="#fff" stroke={3.2} />
          </div>
        )}
      </div>
    </Pop>
  );
};

const capitulo = (n: number, k: number): React.FC<P> => ({g0, dur}) => (
  <Scene dur={dur} push={0.04}>
    <Capitulo n={n} at={b(k, 0) - g0} />
  </Scene>
);
export const Cap1 = capitulo(1, 1);
export const Cap2 = capitulo(2, 2);
export const Cap3 = capitulo(3, 3);
export const Cap4 = capitulo(4, 4);
export const Cap5 = capitulo(5, 5);
const resumo = (n: number, k: number, at: number, texto: string): React.FC<P> => ({g0, dur}) => (
  <Scene dur={dur} push={0.03}>
    <Resumo at={b(k, at) - g0} texto={texto} n={n} />
  </Scene>
);

/** Ciclo de três setas: analisar → ajustar → melhorar. */
const Ciclo3: React.FC<{at: [number, number, number]; r?: number}> = ({at, r = 230}) => {
  const t = useSec();
  const itens = [
    {t: 'Analisar', icon: 'search', a: -90},
    {t: 'Ajustar', icon: 'pen', a: 30},
    {t: 'Melhorar', icon: 'chart', a: 150},
  ];
  const giro = ramp(t, at[0], at[2] + 0.6, 0, 1);
  return (
    <div style={{position: 'relative', width: r * 2 + 260, height: r * 2 + 160}}>
      <svg width={r * 2 + 260} height={r * 2 + 160} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="gc" x1="0" x2="1">
            <stop offset="0%" stopColor="#6D5DF6" />
            <stop offset="100%" stopColor="#F27FB5" />
          </linearGradient>
        </defs>
        <circle cx={r + 130} cy={r + 80} r={r} fill="none" stroke="#E4E2EE" strokeWidth={6} />
        <circle cx={r + 130} cy={r + 80} r={r} fill="none" stroke="url(#gc)" strokeWidth={8} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * r * giro} 9999`} transform={`rotate(-90 ${r + 130} ${r + 80})`} />
      </svg>
      {itens.map((it, i) => {
        const x = r + 130 + r * Math.cos((it.a * Math.PI) / 180);
        const y = r + 80 + r * Math.sin((it.a * Math.PI) / 180);
        return (
          <div key={it.t} style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)'}}>
            <Pop at={at[i]} pop y={20}>
              <div style={card({padding: '16px 26px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 14, whiteSpace: 'nowrap'})}>
                <Tile name={it.icon} size={54} />
                <div style={{fontSize: 34, fontWeight: 700}}>{it.t}</div>
              </div>
            </Pop>
          </div>
        );
      })}
    </div>
  );
};

// =================== ABERTURA (bloco 0) ===================
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={150} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pop at={L(0.1)} pop y={16}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 28px 10px 10px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 28, fontWeight: 600}}>
              <div style={{width: 48, height: 48, borderRadius: 48, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={24} color="#fff" iconOnly />
              </div>
              Método de Aceleração <Grad>Comercial</Grad>
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={0} y={270} w={1920}>
        <Words text="Etapa 3 · [Evoluir]" at={L(3.5)} size={110} />
      </Abs>
      <Abs x={960} y={720} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <Pop at={L(4.6)} pop y={30}>
            <Clinica size={1.05} sub="operação no ar" />
          </Pop>
          <Pop at={L(6.9)} pop y={20}>
            <Badge text="No ar" ok size={30} />
          </Pop>
          <Pop at={L(8.2)} pop y={20}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '16px 30px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 34, fontWeight: 700, boxShadow: '0 20px 40px -14px rgba(140,90,240,0.6)'}}>
              Agora: acelerar <XIcon name="arrow" size={32} color="#fff" stroke={2.6} />
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1480} y={300} at={L(3.8)} />
    </Scene>
  );
};

export const Ciclo: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={1360} y={180} center>
        <Pop at={L(9.3)} pop y={16}>
          <Chip icon="calendar" text="7 dias depois do treinamento" size={30} />
        </Pop>
      </Abs>
      <Abs x={1360} y={590} center>
        <Ciclo3 at={[L(12.6), L(13.35), L(14.2)]} r={210} />
      </Abs>
      <Abs x={80} y={300} w={760}>
        <Words text="Um ciclo que [se repete]" at={L(11.4)} size={70} align="left" />
      </Abs>
      <Abs x={80} y={560} w={760}>
        <Pop at={L(15.8)} y={20}>
          <div style={card({padding: '26px 30px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 18, width: 640, boxSizing: 'border-box'})}>
            <Tile name="history" size={64} color={C.green} tint={C.greenTint} />
            <div style={{fontSize: 34, fontWeight: 700, lineHeight: 1.2}}>
              É o que sustenta a sua <Grad>recorrência</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Mapa: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const quando = [18.7, 19.75, 21.1, 22.45, 24.0];
  const icones = ['search', 'history', 'smartphone', 'calendar', 'chart'];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={250} w={1920}>
        <Words text="Em [cinco partes]" at={L(17.3)} size={76} />
      </Abs>
      <Abs x={960} y={640} center>
        <div style={{display: 'flex', gap: 20}}>
          {PASSOS.map((p, i) => (
            <Pop key={p} at={L(quando[i])} pop y={30}>
              <div style={card({width: 300, padding: '30px 18px', borderRadius: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box'})}>
                <div style={{fontSize: 22, fontWeight: 700, color: C.purple, letterSpacing: 1}}>PARTE {i + 1}</div>
                <Tile name={icones[i]} size={76} />
                <div style={{fontSize: 30, fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap'}}>{p}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

export const Frequencia: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const fr = [
    {t: 'Semanal', at: 28.45, d: 30.8, sub: 'Time grande ou operação nova', icon: 'clock'},
    {t: 'Quinzenal', at: 29.2, d: 33.6, sub: 'A maioria dos casos', icon: 'calendar', top: true},
    {t: 'Mensal', at: 30.15, d: 37.0, sub: 'Operação madura', icon: 'chart'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Você vende [a frequência]" at={L(26.3)} size={72} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 34, alignItems: 'flex-start'}}>
          {fr.map((f) => {
            const d = ramp(t, L(f.d), L(f.d) + 0.4);
            return (
              <Pop key={f.t} at={L(f.at)} pop y={30}>
                <div style={{position: 'relative'}}>
                  <div
                    style={{
                      ...card({width: 440, padding: '36px 30px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, boxSizing: 'border-box'}),
                      boxShadow: d > 0 ? `0 0 0 ${5 * d}px rgba(109,93,246,0.35), ${C.shadow}` : C.shadow,
                    }}
                  >
                    <Tile name={f.icon} size={84} />
                    <div style={{fontSize: 46, fontWeight: 700}}>{f.t}</div>
                    <div style={{fontSize: 27, color: C.muted, textAlign: 'center', opacity: d, minHeight: 40}}>{f.sub}</div>
                  </div>
                  {f.top && (
                    <div style={{position: 'absolute', left: 0, right: 0, top: -26, display: 'flex', justifyContent: 'center'}}>
                      <Pop at={L(36.2)} pop y={12}>
                        <div style={{padding: '8px 22px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap'}}>A mais vendida</div>
                      </Pop>
                    </div>
                  )}
                </div>
              </Pop>
            );
          })}
        </div>
      </Abs>
    </Scene>
  );
};

export const PrimeiroCiclo: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={130} w={1920}>
        <Words text="O primeiro ciclo é [o mais curto]" at={L(38.8)} size={68} />
      </Abs>
      <Abs x={960} y={290} center>
        <Pop at={L(41.3)} pop y={16}>
          <Chip icon="message" text="Com as conversas reais da 1ª semana" size={30} />
        </Pop>
      </Abs>
      <Abs x={960} y={640} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <Linha at={L(43.4)} t="Revise o agente" icon="smartphone" ok />
          <Linha at={L(44.5)} t="Ajuste o que apareceu" icon="pen" ok />
          <Linha at={L(45.9)} t="Tire as dúvidas do time" icon="help" ok />
        </div>
      </Abs>
    </Scene>
  );
};

// =================== PARTE 1 · AS DUAS LENTES (bloco 1) ===================
const Lente: React.FC<{at: number; titulo: string; tag: string; itens: [number, string][]; cor: string; tint: string; icon: string}> = ({at, titulo, tag, itens, cor, tint, icon}) => (
  <Pop at={at} y={40}>
    <div style={card({width: 760, padding: '34px 38px', borderRadius: 32, boxSizing: 'border-box'})}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24}}>
        <Tile name={icon} size={70} color={cor} tint={tint} />
        <div style={{flex: 1}}>
          <div style={{fontSize: 40, fontWeight: 700}}>{titulo}</div>
          <div style={{fontSize: 26, color: cor, fontWeight: 600}}>{tag}</div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        {itens.map(([a, t]) => (
          <Pop key={t} at={a} x={-20} y={0}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderRadius: 18, background: tint, fontSize: 29, fontWeight: 600}}>
              <XIcon name="check" size={26} color={cor} stroke={3} /> {t}
            </div>
          </Pop>
        ))}
      </div>
    </div>
  </Pop>
);

export const DuasLentes: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={80} w={1920}>
        <Words text="Olhe a operação de [dois jeitos]" at={L(b(1, 2.1))} size={62} />
      </Abs>
      <Abs x={960} y={590} center>
        <div style={{display: 'flex', gap: 50}}>
          <Lente
            at={L(b(1, 5.6))}
            titulo="Lente do número"
            tag="O QUE está acontecendo"
            icon="chart"
            cor={C.purple}
            tint={C.purpleTint}
            itens={[
              [L(b(1, 8.4)), 'Tempo de resposta'],
              [L(b(1, 9.75)), 'Conversão por etapa do funil'],
              [L(b(1, 11.8)), 'Follow-ups feitos × esquecidos'],
            ]}
          />
          <Lente
            at={L(b(1, 14.3))}
            titulo="Lente da qualidade"
            tag="POR QUE está acontecendo"
            icon="message"
            cor="#D2508E"
            tint="#FDEAF3"
            itens={[
              [L(b(1, 17.6)), 'Segue o roteiro?'],
              [L(b(1, 19.1)), 'Contorna as objeções?'],
              [L(b(1, 20.7)), 'O tom é humano?'],
            ]}
          />
        </div>
      </Abs>
    </Scene>
  );
};

export const ExemploLentes: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const etapas: [string, number][] = [
    ['Novos contatos', 100],
    ['Em conversa', 78],
    ['Avaliação marcada', 22],
  ];
  const cresce = ramp(t, L(b(1, 23.0)), L(b(1, 24.4)));
  const trava = ramp(t, L(b(1, 25.9)), L(b(1, 26.4)));
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={120} center>
        <Pop at={L(b(1, 21.8))} pop y={20}>
          <Clinica size={0.85} sub="poucas avaliações marcadas" />
        </Pop>
      </Abs>
      <Abs x={110} y={300} w={800}>
        <Pop at={L(b(1, 24.8))} y={30}>
          <div style={card({width: 800, padding: '30px 36px', borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700, color: C.purple, marginBottom: 20}}>
              <XIcon name="chart" size={28} color={C.purple} /> NÚMERO · onde trava
            </div>
            {etapas.map(([n, v], i) => (
              <div key={n} style={{marginBottom: 18}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, fontWeight: 600, marginBottom: 8}}>
                  <span>{n}</span>
                  <span style={{color: i === 2 ? C.red : C.muted}}>{Math.round(v * cresce)}</span>
                </div>
                <div style={{height: 22, borderRadius: 22, background: '#F0EEF7'}}>
                  <div style={{width: `${v * cresce}%`, height: 22, borderRadius: 22, background: i === 2 ? C.red : C.grad, boxShadow: i === 2 ? `0 0 0 ${5 * trava}px rgba(239,78,78,0.25)` : undefined}} />
                </div>
              </div>
            ))}
          </div>
        </Pop>
      </Abs>
      <Abs x={1000} y={300} w={810}>
        <Pop at={L(b(1, 26.8))} y={30}>
          <div style={card({width: 810, padding: '30px 36px', borderRadius: 30, boxSizing: 'border-box', background: '#F7F5FC'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700, color: '#D2508E', marginBottom: 20}}>
              <XIcon name="message" size={28} color="#D2508E" /> QUALIDADE · o motivo
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              <Pop at={L(b(1, 28.0))} y={14}>
                <Bubble text="Oi! Queria clarear os dentes 😊" w={560} />
              </Pop>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Pop at={L(b(1, 29.6))} y={14}>
                  <Bubble text="O clareamento custa R$ 900." me w={560} ticks />
                </Pop>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={930} center>
        <Pop at={L(b(1, 30.3))} pop y={20}>
          <Badge text="Mandou o preço antes de entender o paciente" size={32} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo1 = resumo(1, 1, 32.6, 'O número mostra [o quê.] A qualidade mostra [o porquê.]');

// =================== PARTE 2 · O CICLO DO PARCEIRO (bloco 2) ===================
const PASSOS8 = ['Puxar os números', 'Analisar as conversas', 'Avaliar cada pessoa', 'Mapear objeções', 'Ajustar agente e roteiro', 'Rodar a campanha', 'Cruzar com marketing', 'Levar ao cliente'];
const ICONES8 = ['chart', 'message', 'users', 'thought', 'pen', 'megaphone', 'globe', 'doc'];
const QUANDO8 = [4.3, 12.1, 22.35, 25.8, 29.3, 35.8, 41.55, 47.0];

export const AuraNumeros: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const barras: [string, number, number][] = [
    ['Instagram', 0.55, 0.72],
    ['WhatsApp', 0.8, 0.7],
    ['Site', 0.3, 0.42],
  ];
  const sobe = ramp(t, L(b(2, 7.4)), L(b(2, 8.8)));
  const comp = ramp(t, L(b(2, 9.4)), L(b(2, 10.4)));
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={70} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pop at={L(b(2, 4.3))} pop y={16}>
            <div style={{padding: '12px 30px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 30, fontWeight: 700}}>1 · Puxe os números</div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={590} center>
        <Pop at={L(b(2, 5.8))} y={40}>
          <div style={card({width: 1300, padding: '34px 40px', borderRadius: 34, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 22}}>
              <Bubble text="Aura, compare os agendamentos deste mês com o mês passado, por canal e por pessoa." me w={820} />
            </div>
            <Pop at={L(b(2, 7.0))} y={16}>
              <div style={{display: 'flex', gap: 22, alignItems: 'flex-start'}}>
                <AuraTile size={64} />
                <div style={{flex: 1, background: '#F7F5FC', borderRadius: 26, padding: '24px 30px'}}>
                  <div style={{fontSize: 27, fontWeight: 600, marginBottom: 18}}>Pronto! Agendamentos por canal:</div>
                  {barras.map(([n, a, m]) => (
                    <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14}}>
                      <div style={{width: 160, fontSize: 25, fontWeight: 600}}>{n}</div>
                      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 6}}>
                        <div style={{height: 18, borderRadius: 18, width: `${m * 100 * sobe}%`, background: C.grad}} />
                        <div style={{height: 18, borderRadius: 18, width: `${a * 100 * sobe}%`, background: '#D7D3E8', opacity: comp}} />
                      </div>
                    </div>
                  ))}
                  <div style={{display: 'flex', gap: 24, fontSize: 22, color: C.muted, marginTop: 6}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <span style={{width: 18, height: 18, borderRadius: 6, background: C.grad}} /> este mês
                    </span>
                    <span style={{display: 'flex', alignItems: 'center', gap: 8, opacity: comp}}>
                      <span style={{width: 18, height: 18, borderRadius: 6, background: '#D7D3E8'}} /> ciclo anterior
                    </span>
                  </div>
                </div>
              </div>
            </Pop>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={990} center>
        <Pop at={L(b(2, 9.4))} pop y={20}>
          <Badge text="Compare com o ciclo anterior, não só com a meta" grad size={30} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const AnaliseConversas: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const canais: [string, string, number][] = [
    ['WhatsApp', 'message', 16.7],
    ['Instagram', 'camera', 17.5],
    ['Ligações', 'phone', 18.4],
    ['Reuniões', 'users', 19.5],
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={70} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Pop at={L(b(2, 12.1))} pop y={16}>
            <div style={{padding: '12px 30px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 30, fontWeight: 700}}>2 · Analise as conversas</div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={250} center>
        <Pop at={L(b(2, 14.2))} pop y={20}>
          <div style={card({padding: '18px 32px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 16})}>
            <Tile name="search" size={60} />
            <div style={{fontSize: 38, fontWeight: 700}}>
              App <Grad>Análise Comercial</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={460} center>
        <div style={{display: 'flex', gap: 22}}>
          {canais.map(([n, ic, a]) => (
            <Pop key={n} at={L(b(2, a))} pop y={20}>
              <Chip icon={ic} text={n} size={30} />
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={740} center>
        <Pop at={L(b(2, 20.3))} y={30}>
          <div style={card({width: 1100, padding: '28px 36px', borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, fontWeight: 700, color: C.muted, marginBottom: 16, letterSpacing: 1}}>ONDE A CONVERSA TRAVA</div>
            {[
              ['Preço antes da avaliação', 46],
              ['Paciente some depois do orçamento', 31],
              ['Dúvida sobre convênio', 18],
            ].map(([t, v], i) => (
              <Pop key={t as string} at={L(b(2, 20.7)) + i * 0.25} x={-20} y={0}>
                <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '12px 0'}}>
                  <div style={{flex: 1, fontSize: 30, fontWeight: 600}}>{t}</div>
                  <div style={{width: 300, height: 18, borderRadius: 18, background: '#F0EEF7'}}>
                    <div style={{width: `${(v as number) * 2}%`, height: 18, borderRadius: 18, background: C.grad}} />
                  </div>
                  <div style={{width: 70, textAlign: 'right', fontSize: 26, fontWeight: 700, color: C.purple}}>{v}%</div>
                </div>
              </Pop>
            ))}
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const OitoPassos: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const s = t + g0;
  let atual = 0;
  QUANDO8.forEach((q, i) => {
    if (s >= b(2, q) - 0.1) atual = i;
  });
  const detalhe: Record<number, [number, string][]> = {
    2: [[22.35, 'Número e qualidade, pessoa a pessoa']],
    3: [[25.8, 'O que mais travou a venda no período']],
    4: [[29.3, 'Agente, sequências de contato e roteiro do time']],
    5: [[38.3, 'Ex.: pacientes que não voltam há 6 meses']],
    6: [[43.6, 'Anúncio que traz paciente que fecha × anúncio que só traz volume']],
    7: [[47.0, 'Comparativo, plano de ação e metas']],
  };
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={70} w={1920}>
        <Words text="O ciclo do parceiro: [8 passos]" at={L(b(2, 22.2))} size={60} />
      </Abs>
      <Abs x={960} y={470} center>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 400px)', gap: 22}}>
          {PASSOS8.map((p, i) => {
            const ini = Math.max(L(b(2, QUANDO8[i])), i < 2 ? 0 : 0);
            const feito = i < atual;
            const agora = i === atual;
            const a = i < 2 ? 1 : ramp(t, ini - 0.05, ini + 0.35);
            return (
              <div
                key={p}
                style={{
                  ...card({padding: '24px 22px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box', height: 130}),
                  opacity: 0.4 + 0.6 * a,
                  transform: `scale(${agora ? 1.05 : 1})`,
                  boxShadow: agora ? `0 0 0 5px rgba(109,93,246,0.4), ${C.shadow}` : C.shadowSm,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 58,
                    flexShrink: 0,
                    background: feito ? C.green : agora ? C.grad : C.purpleTint,
                    color: feito || agora ? '#fff' : C.purple,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    fontWeight: 700,
                  }}
                >
                  {feito ? <Icon name="check" size={30} color="#fff" stroke={3.2} /> : i + 1}
                </div>
                <div style={{flex: 1}}>
                  <XIcon name={ICONES8[i]} size={26} color={C.purple} />
                  <div style={{fontSize: 27, fontWeight: 700, lineHeight: 1.15}}>{p}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Abs>
      <Abs x={960} y={850} center>
        {Object.entries(detalhe).map(([k, linhas]) =>
          linhas.map(([a, txt]) => {
            const i = Number(k);
            const fim = i < 7 ? b(2, QUANDO8[i + 1]) - 0.15 : 1e9;
            const op = ramp(s, b(2, a), b(2, a) + 0.3) * (1 - ramp(s, fim - 0.25, fim));
            return (
              <div key={txt} style={{position: 'absolute', left: '50%', top: 0, transform: `translate(-50%, ${(1 - op) * 16}px)`, opacity: op, whiteSpace: 'nowrap'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '18px 34px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 34, fontWeight: 700, boxShadow: '0 20px 40px -12px rgba(140,90,240,0.6)'}}>
                  <XIcon name={ICONES8[i]} size={32} color="#fff" stroke={2.6} /> {txt}
                </div>
              </div>
            );
          }),
        )}
      </Abs>
    </Scene>
  );
};

export const Resumo2 = resumo(2, 2, 49.6, 'No semanal, a [versão curta.] No mensal, os [oito passos.]');

// =================== PARTE 3 · MANUTENÇÃO DO AGENTE (bloco 3) ===================
export const Recorrencia: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={430} center>
        <div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
          <Pop at={L(b(3, 2.3))} pop y={30}>
            <div style={card({width: 560, padding: '36px 34px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, boxSizing: 'border-box'})}>
              <Tile name="clock" size={84} />
              <div style={{fontSize: 40, fontWeight: 700}}>Criar o agente</div>
              <div style={{fontSize: 30, color: C.muted}}>é rápido</div>
            </div>
          </Pop>
          <Pop at={L(b(3, 3.75))} pop y={30}>
            <div style={card({width: 560, padding: '36px 34px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, boxSizing: 'border-box', boxShadow: `0 0 0 5px rgba(109,93,246,0.35), ${C.shadow}`})}>
              <Tile name="history" size={84} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 40, fontWeight: 700}}>Mantê-lo bom</div>
              <div style={{fontSize: 30, color: C.muted}}>é o trabalho contínuo</div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={800} center>
        <Pop at={L(b(3, 6.2))} pop y={20}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '18px 36px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 38, fontWeight: 700, boxShadow: '0 20px 40px -14px rgba(140,90,240,0.6)'}}>
            É o que justifica a recorrência
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const TelaBase: React.FC<P> = ({g0, dur}) => (
  <TelaVideo
    g0={g0}
    dur={dur}
    src="g6_config.mp4"
    legenda="Configuração do agente na Clint"
    chips={[
      {at: b(3, 8.75), t: 'Base de conhecimento: perguntas novas', icon: 'book'},
      {at: b(3, 11.45), t: 'Corrija o que mudou, como um preço', icon: 'pen'},
    ]}
  />
);

export const Frentes: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={110} w={1920}>
        <Words text="A cada ciclo, [no agente]" at={L(b(3, 13.4))} size={66} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <Linha at={L(b(3, 13.45))} t="Base de conhecimento atualizada" sub="perguntas novas e o que mudou" icon="book" ok w={1100} />
          <Linha at={L(b(3, 14.0))} t="Tom e hora de passar para uma pessoa" sub="nem cedo, nem tarde demais" icon="users" ok w={1100} />
          <Linha at={L(b(3, 18.9))} t="Objeções novas ensinadas" sub="as que a análise mapeou" icon="thought" ok w={1100} />
          <Linha at={L(b(3, 21.1))} t="Sequências de contato reequilibradas" sub="onde as respostas acontecem" icon="message" ok w={1100} />
        </div>
      </Abs>
    </Scene>
  );
};

export const Convenio: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const ensina = ramp(t, L(b(3, 30.0)), L(b(3, 30.5)));
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={110} y={170} w={820}>
        <Pop at={L(b(3, 23.6))} y={30}>
          <div style={card({width: 820, padding: '30px 34px', borderRadius: 32, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22}}>
              <Tile name="smartphone" size={56} />
              <div style={{fontSize: 30, fontWeight: 700}}>Agente da Clínica Sorriso</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
              <Pop at={L(b(3, 25.4))} y={14}>
                <Bubble text="Vocês aceitam convênio?" w={560} />
              </Pop>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Pop at={L(b(3, 28.6))} y={14}>
                  <div style={{opacity: 1 - 0.5 * ensina}}>
                    <Bubble text="Hmm, não tenho essa informação…" me w={560} />
                  </div>
                </Pop>
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Pop at={L(b(3, 30.6))} y={14}>
                  <Bubble text="Sim! Atendemos os principais convênios. Quer marcar sua avaliação?" me w={600} ticks />
                </Pop>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1010} y={250} w={800}>
        <Pop at={L(b(3, 30.0))} pop y={30}>
          <div style={card({width: 800, padding: '28px 32px', borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700, color: C.purple, marginBottom: 16}}>
              <XIcon name="book" size={28} color={C.purple} /> BASE DE CONHECIMENTO
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 18, background: C.greenTint, fontSize: 28, fontWeight: 600}}>
              <XIcon name="check" size={26} color={C.green} stroke={3} /> Novo: convênios aceitos
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1010} y={560} w={800}>
        <Pop at={L(b(3, 31.2))} pop y={30}>
          <div style={card({width: 800, padding: '24px 32px', borderRadius: 30, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18})}>
            <Tile name="shield" size={64} color={C.green} tint={C.greenTint} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 30, fontWeight: 700}}>Número do WhatsApp</div>
              <div style={{fontSize: 24, color: C.muted}}>de olho o tempo todo</div>
            </div>
            <Badge text="Saudável" ok size={24} />
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo3 = resumo(3, 3, 34.4, 'Quanto mais curto o ciclo, [mais rápido] o agente melhora.');

// =================== PARTE 4 · AS ROTINAS DO CLIENTE (bloco 4) ===================
export const QuemFaz: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={200} w={1920}>
        <Words text="As [5 rotinas] que você colocou na agenda" at={L(b(4, 2.4))} size={62} stagger={0.05} />
      </Abs>
      <Abs x={960} y={620} center>
        <div style={{display: 'flex', gap: 40}}>
          <Pop at={L(b(4, 5.75))} pop y={30}>
            <div style={card({width: 520, padding: '36px 30px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box'})}>
              <Tile name="users" size={84} />
              <div style={{fontSize: 28, color: C.muted, fontWeight: 600}}>QUEM FAZ</div>
              <div style={{fontSize: 40, fontWeight: 700}}>O time do cliente</div>
            </div>
          </Pop>
          <Pop at={L(b(4, 7.55))} pop y={30}>
            <div style={card({width: 520, padding: '36px 30px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box', boxShadow: `0 0 0 5px rgba(109,93,246,0.35), ${C.shadow}`})}>
              <Tile name="check" size={84} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 28, color: C.muted, fontWeight: 600}}>QUEM COBRA</div>
              <div style={{fontSize: 40, fontWeight: 700}}>
                <Grad>Você</Grad>, a cada ciclo
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

export const Rotinas: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const s = t + g0;
  const rot = [
    {at: 9.4, t: 'Reunião diária', q: '10 a 15 min · número de ontem, meta do dia, o que trava', icon: 'clock'},
    {at: 14.65, t: 'Reunião semanal', q: 'o que melhorou, o que piorou, o que ajustar', icon: 'calendar'},
    {at: 18.1, t: 'Carrapato', q: 'acompanha a ligação real do outro, só escutando', icon: 'phone'},
    {at: 22.95, t: 'Roleplay', q: 'treino simulado: um é o paciente, o outro o vendedor', icon: 'users'},
    {at: 30.45, t: 'Conversa individual', q: 'metas, retorno e plano de melhoria com prazo', icon: 'user'},
  ];
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={70} w={1920}>
        <Words text="As [rotinas] do cliente" at={L(b(4, 9.4))} size={60} />
      </Abs>
      <Abs x={960} y={580} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {rot.map((r, i) => {
            const fim = i < 4 ? b(4, rot[i + 1].at) : 1e9;
            const ativo = ramp(s, b(4, r.at), b(4, r.at) + 0.3) * (1 - ramp(s, fim - 0.1, fim + 0.2));
            return <Linha key={r.t} at={L(b(4, r.at))} t={r.t} sub={r.q} icon={r.icon} w={1240} ativo={ativo} />;
          })}
        </div>
      </Abs>
    </Scene>
  );
};

export const Resumo4 = resumo(4, 4, 34.9, 'Sem alguém cobrando, a operação [morre em duas semanas.]');

// =================== PARTE 5 · A REUNIÃO DE ENTREGA (bloco 5) ===================
export const Entrega: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="O ciclo só termina com [decisão tomada]" at={L(b(5, 2.2))} size={64} />
      </Abs>
      <Abs x={960} y={290} center>
        <Pop at={L(b(5, 7.3))} pop y={16}>
          <Chip icon="doc" text="Antes da reunião, prepare" size={30} />
        </Pop>
      </Abs>
      <Abs x={960} y={640} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          <Linha at={L(b(5, 8.65))} t="Os números do período" icon="chart" ok />
          <Linha at={L(b(5, 9.75))} t="A avaliação do ciclo anterior" icon="history" ok />
          <Linha at={L(b(5, 12.25))} t="A análise das conversas" icon="message" ok />
        </div>
      </Abs>
    </Scene>
  );
};

export const Reuniao: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const sobe = ramp(t, L(b(5, 14.8)), L(b(5, 16.2)));
  const ind: [string, number, number][] = [
    ['Tempo de resposta', 0.45, 0.85],
    ['Avaliações marcadas', 0.4, 0.7],
    ['Follow-ups no prazo', 0.55, 0.9],
  ];
  const plano: [number, string, string, string][] = [
    [25.2, 'Revisar o roteiro de preços', 'Gestor da clínica', 'sexta'],
    [28.65, 'Ensinar ao agente: convênio', 'Você', 'sexta'],
  ];
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={90} y={90} w={820}>
        <Pop at={L(b(5, 14.4))} y={30}>
          <div style={card({width: 820, padding: '30px 34px', borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, fontWeight: 700, color: C.purple, letterSpacing: 1, marginBottom: 20}}>COMPARATIVO · NA TELA</div>
            {ind.map(([n, a, m]) => (
              <div key={n} style={{marginBottom: 18}}>
                <div style={{fontSize: 26, fontWeight: 600, marginBottom: 8}}>{n}</div>
                <div style={{height: 16, borderRadius: 16, width: `${a * 100 * sobe}%`, background: '#D7D3E8', marginBottom: 6}} />
                <div style={{height: 16, borderRadius: 16, width: `${m * 100 * sobe}%`, background: C.grad}} />
              </div>
            ))}
            <div style={{display: 'flex', gap: 24, fontSize: 21, color: C.muted}}>
              <span>▬ ciclo anterior</span>
              <span style={{color: C.purple}}>▬ este ciclo</span>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={110} w={870}>
        <Pop at={L(b(5, 17.6))} pop y={20}>
          <div style={card({padding: '20px 28px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 16, width: 870, boxSizing: 'border-box'})}>
            <Tile name="thought" size={58} color="#D2508E" tint="#FDEAF3" />
            <div style={{fontSize: 30, fontWeight: 600}}>O que o cliente percebeu?</div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={290} w={870}>
        <Pop at={L(b(5, 19.8))} y={30}>
          <div style={card({width: 870, padding: '28px 30px', borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, fontWeight: 700, color: C.purple, letterSpacing: 1, marginBottom: 16}}>PLANO DE AÇÃO</div>
            <div style={{display: 'grid', gridTemplateColumns: '1.6fr 1fr 0.6fr', gap: 10, fontSize: 21, color: C.muted, fontWeight: 600, padding: '0 6px 8px'}}>
              <span>Tarefa</span>
              <span>Responsável</span>
              <span>Prazo</span>
            </div>
            {plano.map(([a, tarefa, quem, prazo]) => (
              <Pop key={tarefa} at={L(b(5, a))} x={-20} y={0}>
                <div style={{display: 'grid', gridTemplateColumns: '1.6fr 1fr 0.6fr', gap: 10, alignItems: 'center', padding: '16px 6px', borderTop: `1px solid ${C.line}`, fontSize: 25, fontWeight: 600}}>
                  <span>{tarefa}</span>
                  <span style={{color: C.purple}}>{quem}</span>
                  <span>{prazo}</span>
                </div>
              </Pop>
            ))}
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={950} center>
        <Pop at={L(b(5, 22.6))} pop y={20}>
          <Badge text="Cada tarefa com responsável e prazo" grad size={30} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo5 = resumo(5, 5, 31.25, 'Não termine sem o [próximo ciclo marcado.]');

// =================== FECHAMENTO (bloco 6) ===================
export const Fim: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const dark = ramp(tt, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  const etapas: [string, number][] = [
    ['Vender', 15.0],
    ['Implantar', 15.75],
    ['Evoluir', 16.7],
  ];
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Você [fecha o método]" at={L(b(6, 0.7))} size={70} />
      </Abs>
      <Abs x={960} y={360} center>
        <Trilha atual={6} at={L(b(6, 3.3))} />
      </Abs>
      <Abs x={960} y={560} center>
        <Pop at={L(b(6, 10.4))} pop y={20}>
          <div style={card({padding: '20px 34px', borderRadius: 26, display: 'flex', alignItems: 'center', gap: 16})}>
            <Tile name="history" size={58} color={C.green} tint={C.greenTint} />
            <div style={{fontSize: 34, fontWeight: 700}}>
              A cada ciclo, a operação melhora e <Grad>o contrato se renova</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={770} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          {etapas.map(([e, a], i) => (
            <React.Fragment key={e}>
              {i > 0 && (
                <Pop at={L(b(6, a)) - 0.1} pop y={0}>
                  <XIcon name="arrow" size={40} color={C.purple} stroke={2.6} />
                </Pop>
              )}
              <Pop at={L(b(6, a))} pop y={24}>
                <div style={{padding: '18px 36px', borderRadius: 99, background: i === 2 ? C.grad : '#fff', color: i === 2 ? '#fff' : C.text, boxShadow: C.shadowSm, fontSize: 40, fontWeight: 700}}>{e}</div>
              </Pop>
            </React.Fragment>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(b(6, 17.4))} y={10}>
          <Logo height={40} />
        </Pop>
      </Abs>
      <Sparkle x={1500} y={700} at={L(b(6, 16.9))} />
      <AbsoluteFill style={{background: '#000', opacity: dark, fontFamily: FONT}} />
    </Scene>
  );
};
