import React from 'react';
import {AbsoluteFill, Easing, Img, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';
import {Badge, Bubble, Chip, MiniSlide, Tile, XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';

// Série Método de Aceleração Comercial · 02 Diagnóstico comercial.
// Tempos escritos = narração ORIGINAL (videos/2026-10-16-metodo-02-diagnostico/entrada/narracao.palavras.txt, speed 1).
// A narração final é a do HeyGen com speed 1,2 (entrada/narracao_v2.wav, 93,8 s): L(s) = M(s) - g0, M por âncoras.
import {criarMapa} from '../metodo-tempo';
export const {M, inv} = criarMapa([
  [0, 0], [2.94, 1.96], [6.75, 4.87], [8.07, 5.81], [9.07, 6.47], [10.01, 7.13], [11.65, 8.28], [12.11, 8.6],
  [13.35, 9.54], [14.94, 10.7], [16.64, 11.97], [17.75, 12.84], [18.62, 13.47], [19.74, 14.41], [21.53, 15.66],
  [23.23, 16.82], [24.22, 17.45], [26.17, 18.82], [27.36, 19.67], [28.69, 20.6], [29.68, 21.34], [31.52, 22.61],
  [32.77, 23.63], [33.99, 24.64], [35.15, 25.49], [36.89, 26.95], [37.72, 27.61], [38.93, 28.49], [41.17, 30.42],
  [42.82, 32.07], [44.55, 33.35], [45.24, 33.85], [47.28, 35.22], [49.67, 36.78], [50.54, 37.47], [52.22, 38.64],
  [53.81, 39.64], [55.13, 40.56], [56.69, 41.57], [58.88, 43.53], [59.97, 44.47], [61.12, 45.36], [61.75, 46.08],
  [63.34, 47.27], [65.76, 49.07], [66.88, 50.06], [68.09, 51.2], [69.9, 52.76], [71.31, 53.68], [73.65, 55.6],
  [74.57, 56.53], [76.23, 57.79], [77.22, 58.62], [78.19, 59.41], [79.41, 60.13], [81.43, 61.62], [82.73, 62.75],
  [85.78, 64.8], [87.03, 65.78], [88.16, 66.56], [89.47, 67.54], [90.22, 68.15], [91.71, 69.17], [93.5, 70.52],
  [95.57, 71.96], [96.82, 72.75], [98.3, 73.69], [99.34, 74.34], [100.36, 74.95], [101.75, 75.98], [103.3, 77.3],
  [105.0, 78.6], [107.52, 80.59], [109.52, 82.41], [112.07, 84.6], [114.82, 86.83], [115.98, 87.48], [117.92, 88.52],
  [118.65, 88.99], [119.37, 89.47], [121.21, 90.58], [122.25, 91.21], [123.53, 92.08], [125.29, 93.27], [125.94, 93.75],
]);
type P = {g0: number; dur: number};
const PASTA = 'videos/2026-10-16-metodo-02-diagnostico';

// selo da série (igual ao do vídeo 01)
const Selo: React.FC<{at: number}> = ({at}) => (
  <div style={{display: 'flex', justifyContent: 'center', gap: 18}}>
    <Pop at={at} pop y={16}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 28px 10px 10px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 28, fontWeight: 600}}>
        <div style={{width: 48, height: 48, borderRadius: 48, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Logo height={24} color="#fff" iconOnly />
        </div>
        Método de Aceleração <Grad>Comercial</Grad>
      </div>
    </Pop>
    <Pop at={at + 0.6} pop y={16}>
      <div style={{display: 'flex', alignItems: 'center', height: 68, padding: '0 28px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 26, fontWeight: 600}}>
        Etapa 1 · Vender
      </div>
    </Pop>
  </div>
);

// ============ 1. Abertura (0 – 9,0) ============
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const strike = ramp(t, L(7.85), L(8.3), 0, 1);
  const win = useSpring(L(6.8));
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={120} w={1920}>
        <Selo at={L(0.1)} />
      </Abs>
      <Abs x={0} y={250} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34}}>
          <Pop at={L(2.6)} pop s={0.6} y={10}>
            <div style={{fontSize: 140, fontWeight: 700, letterSpacing: -6, lineHeight: 1, color: C.purpleTint, WebkitTextStroke: `3px ${C.purple}`}}>02</div>
          </Pop>
          <Words text="Diagnóstico [comercial]" at={L(2.9)} size={112} stagger={0.12} />
        </div>
      </Abs>
      <Abs x={960} y={740} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 80}}>
          <Pop at={L(6.7)} pop y={30}>
            <div
              style={{
                ...card({padding: '34px 44px', display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap'}),
                boxShadow: `0 0 0 ${5 * Math.min(win, 1)}px rgba(31,180,90,0.35), ${C.shadow}`,
                transform: `scale(${1 + 0.05 * Math.min(win, 1)})`,
              }}
            >
              <Tile name="search" size={90} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 52, fontWeight: 700, letterSpacing: -1.5}}>Investigar</div>
            </div>
          </Pop>
          <Pop at={L(7.8)} pop y={30}>
            <div style={{position: 'relative', opacity: 1 - 0.4 * strike}}>
              <div style={card({padding: '34px 44px', display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap'})}>
                <Tile name="chart" size={90} color={C.muted} tint="#F1F0F5" />
                <div style={{fontSize: 52, fontWeight: 700, letterSpacing: -1.5, color: C.muted}}>Apresentar</div>
              </div>
              <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 6, borderRadius: 6, background: C.red, transformOrigin: 'left', transform: `scaleX(${strike})`}} />
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1560} y={250} at={L(3.4)} />
      <Sparkle x={330} y={560} at={L(3.6)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 2. Chega com o cliente oculto, sai com três coisas (9,0 – 18,6) ============
export const Saidas: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const saidas = [
    {at: 13.3, icon: 'chart', t: 'Problema', s: 'dimensionado'},
    {at: 14.9, icon: 'user', t: 'Decisor', s: 'identificado'},
    {at: 16.6, icon: 'calendar', t: 'Proposta', s: 'marcada'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Você sai com [três coisas]" at={L(11.6)} size={76} stagger={0.06} />
      </Abs>
      <Abs x={170} y={330}>
        <Pop at={L(9.5)} x={-40} y={0}>
          <div style={card({width: 470, padding: 30, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18}}>
              <Tile name="camera" size={54} />
              <div>
                <div style={{fontSize: 20, color: C.purple, fontWeight: 600, letterSpacing: 1}}>VOCÊ CHEGA COM</div>
                <div style={{fontSize: 28, fontWeight: 700}}>o cliente oculto</div>
              </div>
            </div>
            <div style={{background: '#EFEAE2', borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 10}}>
              <div style={{alignSelf: 'flex-end'}}>
                <Bubble text="Quero saber os valores." me time="09:12" ticks w={330} />
              </div>
              <div style={{alignSelf: 'flex-start'}}>
                <Bubble text="Oi! Tudo bem?" time="11:47" w={330} />
              </div>
            </div>
            <div style={{marginTop: 18}}>
              <Badge text="2h 35min sem resposta" size={22} />
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={720} y={560}>
        <Pop at={L(11.7)} x={-24} y={0}>
          <XIcon name="arrow" size={70} color={C.faint} stroke={2.6} />
        </Pop>
      </Abs>
      <Abs x={870} y={330}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          {saidas.map((x) => (
            <Pop key={x.t} at={L(x.at)} x={-30} y={0}>
              <div style={card({width: 820, padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 26, boxSizing: 'border-box', borderRadius: 26})}>
                <Tile name={x.icon} size={78} />
                <div style={{fontSize: 40, fontWeight: 700, letterSpacing: -1}}>
                  {x.t} <span style={{fontWeight: 500, color: C.muted}}>{x.s}</span>
                </div>
                <div style={{marginLeft: 'auto', width: 52, height: 52, borderRadius: 52, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${useSpring(L(x.at) + 0.4, POP)})`}}>
                  <Icon name="check" size={30} color="#fff" stroke={3.2} />
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 3. Vocabulário do segmento (18,6 – 31,4) ============
export const Vocabulario: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const linhas = [
    {at: 21.5, w: 23.2, icon: 'calendar', seg: 'Clínica', fala: '“no-show” é o inimigo'},
    {at: 24.2, w: 26.1, icon: 'book', seg: 'Educação', fala: 'tudo gira na “matrícula”'},
    {at: 27.3, w: 28.6, icon: 'doc', seg: 'Crédito', fala: '“lead” é proposta'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Adapte o [vocabulário]" at={L(19.7)} out={L(29.5)} size={80} />
      </Abs>
      <Abs x={0} y={120} w={1920}>
        <Words text="Fale a [língua do cliente]" at={L(29.65)} size={80} stagger={0.06} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          {linhas.map((x) => (
            <Pop key={x.seg} at={L(x.at)} y={30}>
              <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
                <div style={card({width: 420, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 22, boxSizing: 'border-box', borderRadius: 24})}>
                  <Tile name={x.icon} size={66} />
                  <div style={{fontSize: 38, fontWeight: 700}}>{x.seg}</div>
                </div>
                <Pop at={L(x.w) - 0.3} x={-24} y={0}>
                  <XIcon name="arrow" size={50} color={C.faint} stroke={2.6} />
                </Pop>
                <Pop at={L(x.w)} pop y={10}>
                  <div style={{padding: '22px 34px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 36, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: '0 18px 36px -14px rgba(140,90,240,0.6)'}}>{x.fala}</div>
                </Pop>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 4. Os quatro blocos (31,4 – 74,4) ============
const BLOCOS = [
  {at: 33.99, fim: 42.82, t: 'O negócio e o número', icon: 'chart'},
  {at: 42.82, fim: 52.22, t: 'Onde a venda vaza', icon: 'search'},
  {at: 52.22, fim: 68.09, t: 'O que já existe', icon: 'doc'},
  {at: 68.09, fim: 74.4, t: 'A dor e a decisão', icon: 'users'},
];

const Aba: React.FC<{i: number; L: (s: number) => number}> = ({i, L}) => {
  const t = useSec();
  const b = BLOCOS[i];
  const ativo = t >= L(b.at) && t < L(b.fim);
  const feito = t >= L(b.fim);
  const a = Math.min(useSpring(L(b.at)), 1);
  const z = Math.min(useSpring(L(b.fim)), 1);
  const hi = ativo ? a : feito ? 1 - z : 0;
  return (
    <Pop at={L(32.7) + i * 0.12} pop y={20}>
      <div
        style={{
          ...card({width: 390, padding: '18px 22px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box'}),
          boxShadow: `0 0 0 ${4 * hi}px rgba(109,93,246,${0.38 * hi}), ${C.shadowSm}`,
          transform: `scale(${1 + 0.04 * hi})`,
          opacity: ativo || feito ? 1 : 0.7,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 52,
            flexShrink: 0,
            background: feito ? C.greenTint : ativo ? C.grad : C.purpleTint,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 700,
            color: ativo ? '#fff' : C.purple,
          }}
        >
          {feito ? <Icon name="check" size={26} color={C.green} stroke={3} /> : i + 1}
        </div>
        <div style={{fontSize: 26, fontWeight: 600, lineHeight: 1.2}}>{b.t}</div>
      </div>
    </Pop>
  );
};

const Painel: React.FC<{i: number; L: (s: number) => number; children: React.ReactNode}> = ({i, L, children}) => {
  const b = BLOCOS[i];
  return (
    <Abs x={960} y={680} center>
      <Pop at={L(b.at) + 0.1} out={L(b.fim) - 0.2} y={40}>
        <div style={card({width: 1640, minHeight: 380, padding: 50, boxSizing: 'border-box'})}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
            <Tile name={b.icon} size={70} />
            <div>
              <div style={{fontSize: 22, color: C.purple, fontWeight: 600, letterSpacing: 1}}>BLOCO {i + 1}</div>
              <div style={{fontSize: 40, fontWeight: 700, letterSpacing: -0.8}}>{b.t}</div>
            </div>
          </div>
          {children}
        </div>
      </Pop>
    </Abs>
  );
};

const Pergunta: React.FC<{at: number; text: string; hi?: number}> = ({at, text, hi = 0}) => (
  <Pop at={at} pop y={20}>
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding: '18px 28px',
        borderRadius: 20,
        background: '#F7F6FB',
        fontSize: 32,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        boxShadow: hi ? `0 0 0 ${4 * hi}px rgba(109,93,246,0.45)` : undefined,
      }}
    >
      <XIcon name="help" size={30} color={C.purple} />
      {text}
    </div>
  </Pop>
);

export const Blocos: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const api = Math.min(useSpring(L(61.7)), 1);
  return (
    <Scene dur={dur} push={0.015}>
      <Abs x={0} y={70} w={1920}>
        <Words text="As perguntas em [quatro blocos]" at={L(31.5)} size={62} stagger={0.05} />
      </Abs>
      <Abs x={960} y={225} center>
        <div style={{display: 'flex', gap: 18}}>
          {BLOCOS.map((_, i) => (
            <Aba key={i} i={i} L={L} />
          ))}
        </div>
      </Abs>

      <Painel i={0} L={L}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
          <Pergunta at={L(36.9)} text="Qual o ticket médio?" />
          <Pergunta at={L(37.7)} text="E o ciclo de venda?" />
          <Pergunta at={L(38.9)} text="Quantos leads chegam por mês?" />
          <Pergunta at={L(41.2)} text="Vocês têm batido a meta?" />
        </div>
      </Painel>

      <Painel i={1} L={L}>
        <div style={{display: 'flex', gap: 50, alignItems: 'flex-start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Pergunta at={L(45.2)} text="De onde vêm os leads?" />
            <Pergunta at={L(47.3)} text="Em quanto tempo o time responde?" />
          </div>
          <Pop at={L(49.6)} y={30}>
            <div style={{display: 'flex', gap: 20}}>
              <div style={{padding: '24px 30px', borderRadius: 22, background: '#F7F6FB', width: 300, boxSizing: 'border-box'}}>
                <div style={{fontSize: 22, color: C.muted, fontWeight: 600}}>O gestor diz</div>
                <div style={{fontSize: 52, fontWeight: 700, color: C.muted, marginTop: 6}}>10 min</div>
              </div>
              <div style={{padding: '24px 30px', borderRadius: 22, background: C.redTint, width: 340, boxSizing: 'border-box', transform: `scale(${0.9 + 0.1 * Math.min(useSpring(L(50.5), POP), 1)})`}}>
                <div style={{fontSize: 22, color: C.red, fontWeight: 600}}>Você mediu</div>
                <div style={{fontSize: 52, fontWeight: 700, color: C.red, marginTop: 6}}>2h 35min</div>
              </div>
            </div>
          </Pop>
        </div>
      </Painel>

      <Painel i={2} L={L}>
        <div style={{display: 'flex', gap: 50, alignItems: 'flex-start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Pergunta at={L(55.1)} text="Qual CRM vocês usam?" />
            <Pergunta at={L(56.7)} text="O time usa de verdade?" />
            <Pergunta at={L(58.8)} text="Como está o WhatsApp?" />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            <Pop at={L(59.3)} y={20}>
              <div style={{display: 'flex', gap: 14}}>
                {['Número comum', 'Business', 'API oficial'].map((o, k) => (
                  <div
                    key={o}
                    style={{
                      padding: '16px 24px',
                      borderRadius: 99,
                      fontSize: 28,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      background: k === 2 ? `rgba(109,93,246,${0.12 + 0.88 * api})` : '#F7F6FB',
                      color: k === 2 && api > 0.5 ? '#fff' : C.text,
                      transform: k === 2 ? `scale(${1 + 0.08 * api})` : undefined,
                    }}
                  >
                    {o}
                  </div>
                ))}
              </div>
            </Pop>
            <Pop at={L(61.1)} y={14}>
              <div style={{fontSize: 28, color: C.muted, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 12}}>
                <Chip img="whatsapp.svg" text="o agente de WhatsApp exige" size={26} />
                <Grad>API oficial</Grad>
              </div>
            </Pop>
            <Pop at={L(63.3)} pop y={20}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 28px', borderRadius: 22, background: '#FFF6E5', border: '2px solid #F5C66B', width: 'fit-content'}}>
                <div style={{fontSize: 36}}>⚠️</div>
                <div>
                  <div style={{fontSize: 30, fontWeight: 700}}>Não peça migração agora</div>
                  <Pop at={L(66.8)} y={8}>
                    <div style={{fontSize: 26, color: C.muted, marginTop: 4}}>Ele ainda não comprou. Só descubra como está.</div>
                  </Pop>
                </div>
              </div>
            </Pop>
          </div>
        </div>
      </Painel>

      <Painel i={3} L={L}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
          <Pergunta at={L(70.6)} text="Além de você, quem participa da decisão?" />
          <Pergunta at={L(72.9)} text="Já existe orçamento para isso?" />
        </div>
      </Painel>
    </Scene>
  );
};

// ============ 5. Não pergunte tudo (74,4 – 82,5) ============
export const NaoTudo: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const corta = ramp(t, L(76.2), L(77.0), 0, 1);
  const lista = [
    {txt: 'Quantos leads por mês?', fica: true},
    {txt: 'Qual o tom de voz do agente?', fica: false},
    {txt: 'Quais etapas o funil vai ter?', fica: false},
    {txt: 'Qual o ticket médio?', fica: true},
    {txt: 'Qual regra de distribuição de leads?', fica: false},
    {txt: 'Quem decide e qual o orçamento?', fica: true},
    {txt: 'Quais motivos de perda usar?', fica: false},
  ];
  const tag = useSpring(L(80.1));
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Não pergunte [tudo]" at={L(74.6)} size={80} />
      </Abs>
      <Abs x={260} y={260}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {lista.map((q, k) => (
            <Pop key={q.txt} at={L(74.8) + k * 0.08} x={-20} y={0}>
              <div
                style={{
                  ...card({width: 760, padding: '16px 24px', borderRadius: 18, display: 'flex', alignItems: 'center', gap: 14, boxSizing: 'border-box'}),
                  opacity: q.fica ? 1 : 1 - 0.75 * corta,
                  transform: `translateX(${q.fica ? 0 : -30 * corta}px)`,
                  boxShadow: q.fica ? `0 0 0 ${4 * corta}px rgba(31,180,90,0.35), ${C.shadowSm}` : C.shadowSm,
                  position: 'relative',
                }}
              >
                <XIcon name="help" size={26} color={q.fica ? C.purple : C.faint} />
                <div style={{fontSize: 28, fontWeight: 500, color: q.fica ? C.text : C.muted}}>{q.txt}</div>
                {!q.fica && <div style={{position: 'absolute', left: 60, right: 30, top: '50%', height: 3, background: C.faint, transformOrigin: 'left', transform: `scaleX(${corta})`}} />}
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={1120} y={330}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          <Pop at={L(77.2)} pop y={20}>
            <Badge text="dimensionar" ok size={34} />
          </Pop>
          <Pop at={L(78.2)} pop y={20}>
            <Badge text="precificar" ok size={34} />
          </Pop>
        </div>
      </Abs>
      <Abs x={1120} y={640}>
        <div style={{opacity: Math.min(tag, 1), transform: `translateX(${(1 - Math.min(tag, 1)) * -60}px)`}}>
          <div style={card({padding: '24px 30px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 20, width: 600, boxSizing: 'border-box'})}>
            <Tile name="calendar" size={64} color={C.muted} tint="#F1F0F5" />
            <div>
              <div style={{fontSize: 28, fontWeight: 600}}>Detalhe de funil</div>
              <div style={{fontSize: 24, color: C.muted, display: 'flex', alignItems: 'center', gap: 8}}>
                fica para a <Grad>Etapa 2 · Implantar</Grad>
              </div>
            </div>
          </div>
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 6. A pergunta do problema único (82,5 – 100,2) ============
export const Unico: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const sobe = ramp(t, L(89.9), L(90.6), 0, 1);
  const glow = Math.min(useSpring(L(97.4)), 1);
  const frase = '“Meu time demora demais para responder quem chega pelo anúncio.”';
  return (
    <Scene dur={dur} push={0.025}>
      <Abs x={0} y={110} w={1920}>
        <Words text="A pergunta mais [valiosa]" at={L(82.7)} out={L(89.8)} size={74} />
      </Abs>
      {/* a pergunta: grande no centro, depois sobe e encolhe */}
      <Abs x={960} y={480 - 290 * sobe} center>
        <div style={{transform: `scale(${1 - 0.42 * sobe})`}}>
          <Pop at={L(85.6)} y={40}>
            <div style={card({width: 1400, padding: '50px 70px', boxSizing: 'border-box', borderRadius: 36, textAlign: 'center'})}>
              <Words text="Se pudesse resolver um [único problema] em [30 dias,] qual seria?" at={L(85.8)} size={64} stagger={0.13} />
            </div>
          </Pop>
        </div>
      </Abs>
      {/* caderno com a resposta literal */}
      <Abs x={140} y={430}>
        <Pop at={L(90.2)} x={-40} y={0}>
          <div style={card({width: 720, padding: 40, boxSizing: 'border-box', background: '#FFFDF6'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20}}>
              <Tile name="pen" size={56} color="#B98A12" tint="#FFF1CC" />
              <div style={{fontSize: 28, fontWeight: 700}}>Anote com as palavras dele</div>
            </div>
            <div style={{fontSize: 34, lineHeight: 1.4, fontWeight: 500, fontStyle: 'italic', color: '#3A3550'}}>
              {frase.slice(0, Math.round(ramp(t, L(90.8), L(92.5), 0, frase.length, Easing.linear)))}
            </div>
            <Pop at={L(93.5)} y={10}>
              <div style={{marginTop: 22}}>
                <Badge text="a implantação começa por aqui" ok icon="arrow" size={24} />
              </div>
            </Pop>
          </div>
        </Pop>
      </Abs>
      {/* o slide repete a frase */}
      <Abs x={1010} y={430}>
        <Pop at={L(95.5)} y={40}>
          <MiniSlide w={760} glow={glow} title="O que ouvimos">
            <div style={{fontSize: 28, lineHeight: 1.4, fontWeight: 600, marginTop: 30, color: C.text}}>
              <Pop at={L(96.8)} y={10}>{frase}</Pop>
            </div>
          </MiniSlide>
        </Pop>
        <div style={{position: 'absolute', right: -20, bottom: -36, transform: `scale(${useSpring(L(99.0), POP)})`}}>
          <Badge text="venda meio fechada" grad icon="star" size={26} />
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 7. Checklist de saída (100,2 – 115,7) ============
export const Checklist: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const itens = [
    {at: 103.3, txt: 'O problema, nas palavras dele'},
    {at: 105.0, txt: 'Volume, ticket e tamanho do time'},
    {at: 107.5, txt: 'Quem decide e se tem orçamento'},
    {at: 109.5, txt: 'Situação do WhatsApp e do CRM'},
    {at: 112.0, txt: 'Proposta marcada, com os decisores'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Antes de [encerrar]" at={L(100.4)} size={80} />
      </Abs>
      <Abs x={960} y={610} center>
        <Pop at={L(101.0)} y={40}>
          <div style={card({width: 1100, padding: '40px 50px', boxSizing: 'border-box'})}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
              {itens.map((x) => {
                const c = useSpring(L(x.at), POP);
                return (
                  <div key={x.txt} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '14px 10px'}}>
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        border: `3px solid ${c > 0.05 ? C.green : '#D9D6E6'}`,
                        background: c > 0.05 ? C.green : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{transform: `scale(${c})`}}>
                        <Icon name="check" size={32} color="#fff" stroke={3.4} />
                      </div>
                    </div>
                    <div style={{fontSize: 36, fontWeight: 600, color: c > 0.05 ? C.text : C.muted}}>{x.txt}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1540} y={300} at={L(112.5)} />
    </Scene>
  );
};

// ============ 8. TELA: Banco de perguntas (115,7 – 122,0) ============
const SC = 0.86;
const CW = 1920 * SC;
const CH = 1080 * SC;
type Z = [number, number, number, number];
const zoomAt = (keys: Z[], s: number): [number, number, number] => {
  const ease = Easing.inOut(Easing.cubic);
  if (s <= keys[0][0]) return [keys[0][1], keys[0][2], keys[0][3]];
  for (let i = 0; i < keys.length - 1; i++) {
    const [ta, xa, ya, za] = keys[i];
    const [tb, xb, yb, zb] = keys[i + 1];
    if (s <= tb) {
      const u = ease(Math.min(Math.max((s - ta) / Math.max(tb - ta, 1e-3), 0), 1));
      return [xa + (xb - xa) * u, ya + (yb - ya) * u, za + (zb - za) * u];
    }
  }
  const k = keys[keys.length - 1];
  return [k[1], k[2], k[3]];
};

export const TelaBanco: React.FC<P> = ({g0, dur}) => {
  const t = useSec();
  const s = inv(t + g0);
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const prints: [string, number][] = [
    ['b1_topo.png', 0],
    ['b_visao.png', 117.7],
    ['b_unico.png', 119.3],
  ];
  const zoom: Z[] = [
    [115.7, 0.5, 0.5, 1],
    [117.4, 0.5, 0.5, 1],
    [118.0, 0.56, 0.45, 1.25],
    [119.2, 0.56, 0.45, 1.25],
    [119.8, 0.57, 0.72, 1.45],
    [122.0, 0.57, 0.72, 1.5],
  ];
  const [cx, cy, z] = zoomAt(zoom, s);
  const hx = 0.5 / z;
  const hy = 0.5 / z;
  const x = Math.min(Math.max(cx, hx), 1 - hx);
  const y = Math.min(Math.max(cy, hy), 1 - hy);
  const anel = ramp(s, 119.8, 120.2);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>
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
            if (s > ate + 0.3) return null;
            return <Img key={f} src={staticFile(`${PASTA}/${f}`)} style={{position: 'absolute', left: 0, top: 0, width: CW, height: CH, opacity: i === 0 ? 1 : ramp(s, de, de + 0.25)}} />;
          })}
          <div
            style={{
              position: 'absolute',
              left: (709 - 8) * SC,
              top: (696 - 8) * SC,
              width: (776 + 16) * SC,
              height: (180 + 16) * SC,
              borderRadius: 14,
              border: `4px solid ${C.pink}`,
              boxShadow: '0 0 0 6px rgba(242,127,181,0.25)',
              opacity: anel,
            }}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP)}}>
        <Pop at={0.6} y={12}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600, color: C.text}}>
            <Icon name="doc" size={22} color={C.purple} /> Materiais da etapa 1 · Banco de perguntas
          </div>
        </Pop>
      </div>
    </AbsoluteFill>
  );
};

// ============ 9. Encerramento (122,0 – fim) ============
export const Final: React.FC<P> = ({g0, dur}) => {
  const L = (s: number) => M(s) - g0;
  const t = useSec();
  const passos = ['Cliente oculto', 'Diagnóstico', 'Preço', 'Proposta', 'Contrato'];
  const ok = useSpring(L(122.4), POP);
  const prox = useSpring(L(125.2));
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={190} w={1920}>
        <Words text="Próximo: [Preço]" at={L(122.2)} size={84} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {passos.map((p, i) => {
            const isProx = i === 2;
            const g = isProx ? Math.min(prox, 1) : 0;
            return (
              <React.Fragment key={p}>
                {i > 0 && <div style={{width: 60, height: 4, borderRadius: 4, background: i <= 2 ? C.grad : '#E4E2EE'}} />}
                <Pop at={L(122.0) + i * 0.08} pop y={20}>
                  <div
                    style={{
                      ...card({width: 250, padding: '26px 16px', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, boxSizing: 'border-box'}),
                      boxShadow: `0 0 0 ${5 * g}px rgba(109,93,246,${0.4 * g}), ${C.shadowSm}`,
                      transform: `scale(${1 + 0.08 * g})`,
                      opacity: i > 2 ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 64,
                        background: i < 2 ? C.green : isProx ? C.grad : C.purpleTint,
                        color: i <= 2 ? '#fff' : C.purple,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 700,
                        transform: i === 1 ? `scale(${0.85 + 0.15 * ok})` : undefined,
                      }}
                    >
                      {i < 2 ? <Icon name="check" size={34} color="#fff" stroke={3.2} /> : `0${i + 1}`}
                    </div>
                    <div style={{fontSize: 26, fontWeight: 600, textAlign: 'center'}}>{p}</div>
                  </div>
                </Pop>
              </React.Fragment>
            );
          })}
        </div>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(123.0)} y={16}>
          <Logo height={46} />
        </Pop>
      </Abs>
      <Sparkle x={1080} y={420} at={L(125.3)} />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};

