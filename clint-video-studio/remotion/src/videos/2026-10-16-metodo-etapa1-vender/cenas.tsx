import React from 'react';
import {AbsoluteFill, Easing, Img, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, ContactAvatar, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';
import {Badge, Bubble, Chip, MiniSlide, Tile, XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';

// Método · Etapa 1 · Vender (vídeo único da etapa, didático, exemplo da Clínica Sorriso).
// Narração = blocos HeyGen speed 1,1 (entrada/n0.wav, n1.wav, …) unidos por juntar_narracao.sh com 0,5 s entre eles.
// Tempos: b(k, s) = início do bloco k + s (s = tempo da palavra dentro do bloco, do HeyGen). Dentro da cena: L(t) = t - g0.
export const O = [0, 23.383, 75.214, 138.434, 191.022, 243.793, 275.666];
export const b = (k: number, s: number) => O[k] + s;
type P = {g0: number; dur: number};
const PASTA_01 = 'videos/2026-10-16-metodo-01-cliente-oculto';
const PASTA = 'videos/2026-10-16-metodo-etapa1-vender';

export const PASSOS = ['Cliente oculto', 'Diagnóstico', 'Preço', 'Proposta', 'Contrato'];
const ICONES = ['search', 'help', 'chart', 'doc', 'shield'];

// ---------- peças comuns ----------
export const Clinica: React.FC<{size?: number; sub?: string}> = ({size = 1, sub = 'exemplo fictício'}) => (
  <div style={card({padding: `${24 * size}px ${34 * size}px`, display: 'flex', alignItems: 'center', gap: 20 * size, borderRadius: 26 * size, whiteSpace: 'nowrap'})}>
    <div style={{width: 76 * size, height: 76 * size, borderRadius: 22 * size, background: 'linear-gradient(160deg, #7FE3D3 0%, #33B6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 * size}}>😁</div>
    <div>
      <div style={{fontSize: 36 * size, fontWeight: 700, letterSpacing: -0.8}}>Clínica Sorriso</div>
      <div style={{fontSize: 21 * size, color: C.muted}}>{sub}</div>
    </div>
  </div>
);

/** Abertura de capítulo: "Passo N" + título + trilha dos 5 passos com o atual aceso. */
export const Capitulo: React.FC<{n: number; at: number}> = ({n, at}) => (
  <>
    <Abs x={0} y={330} w={1920}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Pop at={at} pop y={16}>
          <div style={{padding: '12px 30px', borderRadius: 99, background: C.purpleTint, color: C.purple, fontSize: 30, fontWeight: 700, letterSpacing: 1}}>PASSO {n} DE 5</div>
        </Pop>
      </div>
      <div style={{height: 26}} />
      <Words text={`[${PASSOS[n - 1]}]`} at={at + 0.15} size={124} />
    </Abs>
    <Abs x={960} y={760} center>
      <Trilha atual={n} at={at + 0.2} />
    </Abs>
  </>
);

/** Trilha horizontal dos 5 passos (concluídos em verde, atual em gradiente). */
export const Trilha: React.FC<{atual: number; at: number; small?: boolean}> = ({atual, at, small}) => {
  const s = small ? 0.7 : 1;
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {PASSOS.map((p, i) => {
        const n = i + 1;
        const feito = n < atual;
        const agora = n === atual;
        return (
          <React.Fragment key={p}>
            {i > 0 && <div style={{width: 46 * s, height: 4, borderRadius: 4, background: n <= atual ? C.grad : '#E4E2EE'}} />}
            <Pop at={at + i * 0.06} pop y={14}>
              <div
                style={{
                  ...card({width: 210 * s, padding: `${18 * s}px 10px`, borderRadius: 22 * s, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 * s, boxSizing: 'border-box'}),
                  boxShadow: agora ? `0 0 0 5px rgba(109,93,246,0.4), ${C.shadowSm}` : C.shadowSm,
                  opacity: n > atual ? 0.55 : 1,
                  transform: `scale(${agora ? 1.06 : 1})`,
                }}
              >
                <div
                  style={{
                    width: 54 * s,
                    height: 54 * s,
                    borderRadius: 54,
                    background: feito ? C.green : agora ? C.grad : C.purpleTint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feito || agora ? '#fff' : C.purple,
                    fontWeight: 700,
                    fontSize: 24 * s,
                  }}
                >
                  {feito ? <Icon name="check" size={28 * s} color="#fff" stroke={3.2} /> : n}
                </div>
                <div style={{fontSize: 23 * s, fontWeight: 600, textAlign: 'center'}}>{p}</div>
              </div>
            </Pop>
          </React.Fragment>
        );
      })}
    </div>
  );
};

/** Cartão "Resumindo" que fecha cada passo. */
export const Resumo: React.FC<{at: number; texto: string; n: number}> = ({at, texto, n}) => (
  <>
    <Abs x={960} y={500} center>
      <Pop at={at} y={50} s={0.9}>
        <div style={card({width: 1380, padding: '56px 70px', boxSizing: 'border-box', borderRadius: 40, textAlign: 'center', position: 'relative'})}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 26}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, padding: '10px 26px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 26, fontWeight: 700, letterSpacing: 2}}>
              <Icon name="check" size={24} color="#fff" stroke={3} /> RESUMINDO · PASSO {n}
            </div>
          </div>
          <Words text={texto} at={at + 0.5} size={64} stagger={0.09} />
        </div>
      </Pop>
    </Abs>
    <Abs x={960} y={880} center>
      <Trilha atual={n + 1} at={at + 0.3} small />
    </Abs>
  </>
);

// ============ Abertura: para agências e consultores (0 – 9,9) ============
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={140} w={1920}>
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
      <Abs x={960} y={430} center>
        <div style={{display: 'flex', gap: 30}}>
          <Pop at={L(0.6)} pop y={30}>
            <Chip icon="users" text="Agência" size={40} />
          </Pop>
          <Pop at={L(1.5)} pop y={30}>
            <Chip icon="user" text="Consultor" size={40} />
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={L(2.7)} y={20}>
          <div style={{fontSize: 40, fontWeight: 500, color: C.muted, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 18}}>
            aplicando o Método <XIcon name="arrow" size={40} color={C.faint} /> nos <Grad>seus clientes</Grad>
          </div>
        </Pop>
      </Abs>
      <Abs x={0} y={720} w={1920}>
        <Words text="Etapa 1 · [Vender]" at={L(8.1)} size={92} />
      </Abs>
      <Sparkle x={1460} y={380} at={L(1.6)} />
      <Sparkle x={420} y={520} at={L(1.8)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ Mapa da etapa (9,9 – 18,2) ============
export const Mapa: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const linha = ramp(t, L(10.5), L(12.3), 0, 1);
  const quando = [14.25, 15.26, 16.2, 16.74, 17.61];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={260} y={220} w={1400}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Pop at={L(10.4)} pop>
            <Chip icon="message" text="Primeiro contato" size={30} />
          </Pop>
          <div style={{flex: 1, height: 6, margin: '0 26px', borderRadius: 6, background: '#E4E2EE', overflow: 'hidden'}}>
            <div style={{width: `${linha * 100}%`, height: '100%', background: C.grad}} />
          </div>
          <Pop at={L(11.9)} pop>
            <Chip icon="doc" text="Contrato assinado" color={C.green} tint={C.greenTint} size={30} />
          </Pop>
        </div>
      </Abs>
      <Abs x={0} y={420} w={1920}>
        <Words text="Em [cinco passos]" at={L(13.0)} size={70} />
      </Abs>
      <Abs x={960} y={700} center>
        <div style={{display: 'flex', gap: 22}}>
          {PASSOS.map((p, i) => (
            <Pop key={p} at={L(quando[i])} pop y={30}>
              <div style={card({width: 250, padding: '28px 14px', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box'})}>
                <div style={{width: 64, height: 64, borderRadius: 64, background: C.grad, color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                <XIcon name={ICONES[i]} size={40} color={C.purple} />
                <div style={{fontSize: 28, fontWeight: 600}}>{p}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

// ============ O exemplo: Clínica Sorriso (18,2 – O1) ============
export const Exemplo: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={250} w={1920}>
        <Words text="Vamos seguir um [exemplo]" at={L(19.2)} size={80} />
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={L(20.5)} pop y={40}>
          <Clinica size={1.5} />
        </Pop>
      </Abs>
      <Abs x={960} y={790} center>
        <Pop at={L(21.6)} y={20}>
          <Badge text="pode virar sua cliente" grad icon="star" size={30} />
        </Pop>
      </Abs>
      <Sparkle x={1380} y={500} at={L(20.8)} />
    </Scene>
  );
};

// ============ Passo 1: título (O1 – O1+2,2) ============
export const Cap1: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Capitulo n={1} at={L(b(1, 0))} />
    </Scene>
  );
};

// ============ Passo 1: você finge ser cliente (2,2 – 11,1) ============
export const Finge: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const vai = ramp(t, L(b(1, 6.1)), L(b(1, 8.9)), 0, 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Você finge ser [um cliente]" at={L(b(1, 3.6))} size={76} />
      </Abs>
      <Abs x={330} y={580} center>
        <Pop at={L(b(1, 2.4))} pop y={30}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
            <div style={{position: 'relative'}}>
              <ContactAvatar size={170} />
              <div style={{position: 'absolute', left: 18, top: 52, fontSize: 70}}>🕶️</div>
            </div>
            <div style={{fontSize: 30, fontWeight: 600, background: '#fff', padding: '8px 22px', borderRadius: 99, boxShadow: C.shadowSm}}>você, “disfarçado”</div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={430} center>
        <Pop at={L(b(1, 5.8))} x={-30} y={0}>
          <Chip img="whatsapp.svg" text="Manda mensagem no WhatsApp" size={30} />
        </Pop>
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={L(b(1, 7.4))} x={-30} y={0}>
          <Chip icon="doc" text="Preenche o formulário do site" size={30} />
        </Pop>
      </Abs>
      {/* linhas até a clínica */}
      <Abs x={1210} y={515}>
        <div style={{width: 160 * vai, height: 4, borderRadius: 4, background: C.grad}} />
      </Abs>
      <Abs x={1560} y={520} center>
        <Pop at={L(b(1, 4.9))} pop y={30}>
          <Clinica size={0.85} />
        </Pop>
      </Abs>
      <Abs x={0} y={820} w={1920}>
        <Pop at={L(b(1, 9.0))} y={14}>
          <div style={{textAlign: 'center', fontSize: 34, color: C.muted, fontWeight: 500}}>como qualquer pessoa interessada faria</div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ Passo 1: por quê? (11,1 – 17,4) ============
export const PorQue: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Por [quê?]" at={L(b(1, 11.2))} size={90} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{width: 1200, display: 'flex', flexDirection: 'column', gap: 34}}>
          <Pop at={L(b(1, 12.2))} x={-40} y={0}>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
              <ContactAvatar size={74} />
              <Bubble text="Como está o atendimento de vocês?" w={700} />
            </div>
            <div style={{fontSize: 22, color: C.muted, marginLeft: 92, marginTop: 8}}>você pergunta</div>
          </Pop>
          <Pop at={L(b(1, 15.0))} x={40} y={0}>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 18, justifyContent: 'flex-end'}}>
              <Bubble text="Está ótimo! 👍" me w={480} />
              <div style={{width: 74, height: 74, borderRadius: 22, background: 'linear-gradient(160deg, #7FE3D3 0%, #33B6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40}}>😁</div>
            </div>
            <div style={{fontSize: 22, color: C.muted, textAlign: 'right', marginRight: 92, marginTop: 8}}>o dono da clínica</div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={880} center>
        <Pop at={L(b(1, 16.3))} pop y={20}>
          <Badge text="Então você testa" grad icon="search" size={34} />
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ Passo 1: anote seis coisas (17,4 – 34,0) ============
const SEIS = [
  {at: 19.0, icon: 'clock', t: 'Quanto tempo demoraram para responder'},
  {at: 21.0, icon: 'message', t: 'Se responderam'},
  {at: 21.95, icon: 'calendar', t: 'Quantas mensagens até tentarem marcar'},
  {at: 24.85, icon: 'history', t: 'Se te chamaram de novo quando você sumiu'},
  {at: 27.0, icon: 'help', t: 'Se a conversa foi boa'},
  {at: 28.3, icon: 'search', t: 'Se o caminho funcionou (anúncio → formulário)'},
];
export const Seis: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={80} w={1920}>
        <Words text="Anote [seis coisas]" at={L(b(1, 17.45))} size={72} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: 1640}}>
          {SEIS.map((x, i) => (
            <Pop key={x.t} at={L(b(1, x.at))} pop y={24}>
              <div style={card({padding: '24px 28px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 22, boxSizing: 'border-box', height: 130})}>
                <div style={{width: 54, height: 54, borderRadius: 54, background: C.grad, color: '#fff', fontSize: 26, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
                <Tile name={x.icon} size={62} />
                <div style={{fontSize: 30, fontWeight: 600, lineHeight: 1.25}}>{x.t}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(b(1, 31.3))} pop y={20}>
          <Chip icon="camera" text="Tire print de tudo, com o horário aparecendo" size={32} />
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ Passo 1: o exemplo 09:12 → 11:47 (34,0 – 42,9) ============
export const Exemplo1: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const t = useSec();
  const min = Math.round(ramp(t, L(b(1, 39.4)), L(b(1, 40.9)), 0, 155, Easing.out(Easing.cubic)));
  const fmt = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}min`);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={90} w={1920}>
        <Words text="No [exemplo]" at={L(b(1, 34.06))} size={72} />
      </Abs>
      {/* conversa com a clínica */}
      <Abs x={170} y={250}>
        <Pop at={L(b(1, 34.6))} y={40}>
          <div style={card({width: 760, padding: 0, overflow: 'hidden', boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '20px 26px', background: '#075E54', color: '#fff'}}>
              <div style={{width: 56, height: 56, borderRadius: 56, background: 'linear-gradient(160deg, #7FE3D3 0%, #33B6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30}}>😁</div>
              <div style={{fontSize: 28, fontWeight: 600}}>Clínica Sorriso</div>
            </div>
            <div style={{background: '#EFEAE2', padding: 28, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 330}}>
              <Pop at={L(b(1, 35.0))} x={30} y={0}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Bubble text="Oi! Queria saber o valor da limpeza." me time="09:12" ticks w={480} />
                </div>
              </Pop>
              <Pop at={L(b(1, 37.6))} x={-30} y={0}>
                <Bubble text="Olá! Tudo bem? 😊" time="11:47" w={480} />
              </Pop>
            </div>
          </div>
        </Pop>
      </Abs>
      {/* tempo de espera */}
      <Abs x={1050} y={330}>
        <Pop at={L(b(1, 39.6))} y={30}>
          <div style={card({width: 700, padding: 44, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Tempo até a primeira resposta</div>
            <div style={{fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums'}}>
              <Grad>{fmt(min)}</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1050} y={700}>
        <Pop at={L(b(1, 41.1))} x={-30} y={0}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <XIcon name="arrow" size={50} color={C.faint} stroke={2.6} />
            <MiniSlide w={420} title="Sua proposta">
              <div style={{marginTop: 18, fontSize: 18, fontWeight: 600, color: C.red}}>2h 35min sem resposta</div>
            </MiniSlide>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ Passo 1: TELA do Registro (42,9 – 47,3) ============
const SC = 0.86;
const CW = 1920 * SC;
const CH = 1080 * SC;
export const TelaRegistro: React.FC<P> = ({g0, dur}) => {
  const t = useSec();
  const s = t + g0;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const t2 = b(1, 45.3);
  const z = 1 + 0.4 * ramp(s, t2 + 0.1, t2 + 1.1);
  const cy = 0.5 + 0.18 * ramp(s, t2 + 0.1, t2 + 1.1);
  const y = Math.min(Math.max(cy, 0.5 / z), 1 - 0.5 / z);
  const x = Math.min(Math.max(0.57, 0.5 / z), 1 - 0.5 / z);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT}}>
      <div
        style={{
          width: CW,
          height: CH,
          borderRadius: 26,
          overflow: 'hidden',
          background: '#141416',
          boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45), 0 20px 50px -20px rgba(60,35,150,0.25)',
          transform: `translateY(${(1 - p) * 80}px) scale(${0.92 + 0.08 * p + outP * 0.02})`,
          opacity: pc * (1 - outP),
          filter: `blur(${(1 - pc) * 14 + outP * 12}px)`,
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', width: CW, height: CH, transformOrigin: '0 0', transform: `scale(${z}) translate(${(0.5 / z - x) * CW}px, ${(0.5 / z - y) * CH}px)`}}>
          <Img src={staticFile(`${PASTA_01}/r1_topo.png`)} style={{position: 'absolute', width: CW, height: CH}} />
          <Img src={staticFile(`${PASTA_01}/r4_resumo.png`)} style={{position: 'absolute', width: CW, height: CH, opacity: ramp(s, t2, t2 + 0.3)}} />
          <div
            style={{
              position: 'absolute',
              left: (710 - 8) * SC,
              top: (678 - 8) * SC,
              width: (774 + 16) * SC,
              height: (116 + 16) * SC,
              borderRadius: 14,
              border: `4px solid ${C.pink}`,
              boxShadow: '0 0 0 6px rgba(242,127,181,0.25)',
              opacity: ramp(s, t2 + 1.0, t2 + 1.3),
            }}
          />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600}}>
          <Icon name="doc" size={22} color={C.purple} /> Materiais da etapa 1 · Registro do cliente oculto
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ Passo 1: resumindo (47,3 – fim do bloco) ============
export const Resumo1: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Resumo at={L(b(1, 47.4))} texto="Você chega com [provas,] e não com perguntas." n={1} />
    </Scene>
  );
};

