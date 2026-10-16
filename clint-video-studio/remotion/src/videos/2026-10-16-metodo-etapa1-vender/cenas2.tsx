import React from 'react';
import {AbsoluteFill, Easing, Img, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, ContactAvatar, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';
import {Badge, Bubble, Chip, MiniSlide, Tile, XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';
import {Capitulo, Clinica, Resumo, Trilha, b} from './cenas';

// Método · Etapa 1 · Vender — passos 2 a 5 e fechamento. Mesmas regras de tempo de cenas.tsx: b(k, s).
type P = {g0: number; dur: number};
const PASTA = 'videos/2026-10-16-metodo-etapa1-vender';
const DONO = () => (
  <div style={{width: 74, height: 74, borderRadius: 22, background: 'linear-gradient(160deg, #7FE3D3 0%, #33B6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, flexShrink: 0}}>😁</div>
);

const Pergunta: React.FC<{at: number; text: string}> = ({at, text}) => (
  <Pop at={at} pop y={20}>
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 14, padding: '18px 28px', borderRadius: 20, background: '#F7F6FB', fontSize: 34, fontWeight: 500, whiteSpace: 'nowrap'}}>
      <XIcon name="help" size={32} color={C.purple} />
      {text}
    </div>
  </Pop>
);

/** Tela da página pública num cartão flutuante, com troca de prints, zoom e anel de destaque (coordenadas da página 1920x1080). */
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
const Tela: React.FC<{g0: number; dur: number; prints: [string, number][]; zoom: Z[]; aneis?: {at: number; x: number; y: number; w: number; h: number}[]; legenda: string}> = ({
  g0,
  dur,
  prints,
  zoom,
  aneis = [],
  legenda,
}) => {
  const t = useSec();
  const s = t + g0;
  const p = useSpring(0, {damping: 200, stiffness: 95, mass: 1});
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur, 0, 1, Easing.in(Easing.cubic));
  const [cx, cy, z] = zoomAt(zoom, s);
  const x = Math.min(Math.max(cx, 0.5 / z), 1 - 0.5 / z);
  const y = Math.min(Math.max(cy, 0.5 / z), 1 - 0.5 / z);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', fontFamily: FONT, color: C.text}}>
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
          {prints.map(([f, de], i) => (
            <Img key={f} src={staticFile(`${PASTA}/${f}`)} style={{position: 'absolute', width: CW, height: CH, opacity: i === 0 ? 1 : ramp(s, de, de + 0.3)}} />
          ))}
          {aneis.map((a, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (a.x - 8) * SC,
                top: (a.y - 8) * SC,
                width: (a.w + 16) * SC,
                height: (a.h + 16) * SC,
                borderRadius: 14,
                border: `4px solid ${C.pink}`,
                boxShadow: '0 0 0 6px rgba(242,127,181,0.25)',
                opacity: ramp(s, a.at, a.at + 0.3),
              }}
            />
          ))}
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: pc * (1 - outP)}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600}}>
          <Icon name="doc" size={22} color={C.purple} /> {legenda}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const capitulo = (n: number, k: number): React.FC<P> => ({g0, dur}) => (
  <Scene dur={dur} push={0.04}>
    <Capitulo n={n} at={b(k, 0) - g0} />
  </Scene>
);
export const Cap2 = capitulo(2, 2);
export const Cap3 = capitulo(3, 3);
export const Cap4 = capitulo(4, 4);
export const Cap5 = capitulo(5, 5);

// =================== PASSO 2 · DIAGNÓSTICO (bloco 2) ===================
export const Investiga: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const risca = ramp(tt, L(b(2, 8.0)), L(b(2, 8.6)), 0, 1);
  const win = Math.min(useSpring(L(b(2, 5.7))), 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="A primeira conversa com o [dono]" at={L(b(2, 2.5))} size={70} />
      </Abs>
      <Abs x={960} y={330} center>
        <Pop at={L(b(2, 3.8))} pop y={20}>
          <Clinica size={0.9} sub="o dono da clínica" />
        </Pop>
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 60}}>
          <Pop at={L(b(2, 5.6))} pop y={30}>
            <div style={{...card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'}), boxShadow: `0 0 0 ${5 * win}px rgba(31,180,90,0.35), ${C.shadow}`}}>
              <Tile name="search" size={80} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 46, fontWeight: 700}}>Você investiga</div>
            </div>
          </Pop>
          <Pop at={L(b(2, 6.6))} pop y={30}>
            <div style={{position: 'relative', opacity: 1 - 0.4 * risca}}>
              <div style={card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'})}>
                <Tile name="chart" size={80} color={C.muted} tint="#F1F0F5" />
                <div>
                  <div style={{fontSize: 46, fontWeight: 700, color: C.muted}}>Não apresenta</div>
                  <div style={{fontSize: 24, color: C.faint}}>nada de slide da sua agência</div>
                </div>
              </div>
              <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 6, borderRadius: 6, background: C.red, transformOrigin: 'left', transform: `scaleX(${risca})`}} />
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={850} center>
        <div style={{display: 'flex', gap: 24}}>
          <Pop at={L(b(2, 9.3))} pop>
            <Chip icon="help" text="Você pergunta" size={32} />
          </Pop>
          <Pop at={L(b(2, 10.1))} pop>
            <Chip icon="mic" text="e escuta" size={32} />
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

const BL = [
  {at: 14.4, fim: 20.35, t: 'O negócio e os números', icon: 'chart'},
  {at: 20.35, fim: 29.35, t: 'Onde a venda se perde', icon: 'search'},
  {at: 29.35, fim: 43.3, t: 'O que já existe', icon: 'doc'},
  {at: 43.3, fim: 48.55, t: 'A dor e a decisão', icon: 'users'},
];
const Aba: React.FC<{i: number; L: (t: number) => number}> = ({i, L}) => {
  const tt = useSec();
  const x = BL[i];
  const ativo = tt >= L(b(2, x.at)) && tt < L(b(2, x.fim));
  const feito = tt >= L(b(2, x.fim));
  return (
    <Pop at={L(b(2, 13.3)) + i * 0.1} pop y={20}>
      <div
        style={{
          ...card({width: 390, padding: '18px 22px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box'}),
          boxShadow: ativo ? `0 0 0 4px rgba(109,93,246,0.4), ${C.shadowSm}` : C.shadowSm,
          transform: `scale(${ativo ? 1.04 : 1})`,
        }}
      >
        <div style={{width: 52, height: 52, borderRadius: 52, flexShrink: 0, background: feito ? C.greenTint : ativo ? C.grad : C.purpleTint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: ativo ? '#fff' : C.purple}}>
          {feito ? <Icon name="check" size={26} color={C.green} stroke={3} /> : i + 1}
        </div>
        <div style={{fontSize: 26, fontWeight: 600, lineHeight: 1.2}}>{x.t}</div>
      </div>
    </Pop>
  );
};
const Painel: React.FC<{i: number; L: (t: number) => number; children: React.ReactNode}> = ({i, L, children}) => (
  <Abs x={960} y={640} center>
    <Pop at={L(b(2, BL[i].at)) + 0.1} out={L(b(2, BL[i].fim)) - 0.2} y={40}>
      <div style={card({width: 1640, minHeight: 420, padding: 50, boxSizing: 'border-box'})}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 34}}>
          <Tile name={BL[i].icon} size={70} />
          <div>
            <div style={{fontSize: 22, color: C.purple, fontWeight: 600, letterSpacing: 1}}>BLOCO {i + 1} DE 4</div>
            <div style={{fontSize: 42, fontWeight: 700}}>{BL[i].t}</div>
          </div>
        </div>
        {children}
      </div>
    </Pop>
  </Abs>
);

export const Blocos: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.015}>
      <Abs x={0} y={80} w={1920}>
        <Words text="O [Banco de perguntas] tem 4 blocos" at={L(b(2, 10.8))} size={62} stagger={0.05} />
      </Abs>
      <Abs x={960} y={230} center>
        <div style={{display: 'flex', gap: 18}}>
          {BL.map((_, i) => (
            <Aba key={i} i={i} L={L} />
          ))}
        </div>
      </Abs>
      <Painel i={0} L={L}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
          <Pergunta at={L(b(2, 16.7))} text="Quanto vocês vendem?" />
          <Pergunta at={L(b(2, 17.6))} text="Quantos contatos chegam por mês?" />
          <Pergunta at={L(b(2, 19.4))} text="Vocês batem a meta?" />
        </div>
      </Painel>
      <Painel i={1} L={L}>
        <div style={{display: 'flex', gap: 50, alignItems: 'flex-start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Pergunta at={L(b(2, 22.5))} text="De onde vêm os contatos?" />
            <Pergunta at={L(b(2, 24.1))} text="Quanto tempo para responder?" />
          </div>
          <div style={{display: 'flex', gap: 20}}>
            <Pop at={L(b(2, 26.2))} pop y={20}>
              <div style={{padding: '26px 32px', borderRadius: 22, background: '#F7F6FB', width: 300, boxSizing: 'border-box'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, color: C.muted, fontWeight: 600}}>
                  <span style={{fontSize: 28}}>😁</span> Ele diz
                </div>
                <div style={{fontSize: 58, fontWeight: 700, color: C.muted, marginTop: 6}}>10 min</div>
              </div>
            </Pop>
            <Pop at={L(b(2, 27.7))} pop y={20}>
              <div style={{padding: '26px 32px', borderRadius: 22, background: C.redTint, width: 360, boxSizing: 'border-box'}}>
                <div style={{fontSize: 24, color: C.red, fontWeight: 600}}>Você mediu</div>
                <div style={{fontSize: 58, fontWeight: 700, color: C.red, marginTop: 6}}>2h 35min</div>
              </div>
            </Pop>
          </div>
        </div>
      </Painel>
      <Painel i={2} L={L}>
        <div style={{display: 'flex', gap: 50, alignItems: 'flex-start'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <Pergunta at={L(b(2, 31.2))} text="Qual sistema vocês usam?" />
            <Pergunta at={L(b(2, 32.6))} text="Como está o WhatsApp?" />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            <Pop at={L(b(2, 34.1))} y={20}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600}}>
                <Chip img="whatsapp.svg" text="Agente de IA no WhatsApp" size={28} />
                <XIcon name="arrow" size={36} color={C.faint} />
                <Pop at={L(b(2, 38.9))} pop>
                  <div style={{padding: '14px 26px', borderRadius: 99, background: C.grad, color: '#fff', whiteSpace: 'nowrap'}}>precisa da API oficial</div>
                </Pop>
              </div>
            </Pop>
            <Pop at={L(b(2, 37.9))} y={10}>
              <div style={{fontSize: 24, color: C.muted, marginLeft: 6}}>API oficial = a versão oficial do WhatsApp para empresas</div>
            </Pop>
            <Pop at={L(b(2, 40.3))} pop y={20}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '22px 28px', borderRadius: 22, background: '#FFF6E5', border: '2px solid #F5C66B', width: 'fit-content'}}>
                <div style={{fontSize: 36}}>⚠️</div>
                <div>
                  <div style={{fontSize: 30, fontWeight: 700}}>Só descubra se ela já tem</div>
                  <Pop at={L(b(2, 41.9))} y={8}>
                    <div style={{fontSize: 26, color: C.muted, marginTop: 4}}>Não peça para mudar agora.</div>
                  </Pop>
                </div>
              </div>
            </Pop>
          </div>
        </div>
      </Painel>
      <Painel i={3} L={L}>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 20}}>
          <Pergunta at={L(b(2, 45.4))} text="Quem mais decide?" />
          <Pergunta at={L(b(2, 46.9))} text="Já existe dinheiro reservado para isso?" />
        </div>
      </Painel>
    </Scene>
  );
};

export const Unico: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const sobe = ramp(tt, L(b(2, 54.9)), L(b(2, 55.6)), 0, 1);
  const frase = '“Meu time demora demais para responder.”';
  return (
    <Scene dur={dur} push={0.025}>
      <Abs x={0} y={100} w={1920}>
        <Words text="A pergunta mais [importante]" at={L(b(2, 48.7))} out={L(b(2, 54.8))} size={74} />
      </Abs>
      <Abs x={960} y={470 - 280 * sobe} center>
        <div style={{transform: `scale(${1 - 0.4 * sobe})`}}>
          <Pop at={L(b(2, 50.6))} y={40}>
            <div style={card({width: 1400, padding: '50px 70px', boxSizing: 'border-box', borderRadius: 36, textAlign: 'center'})}>
              <Words text="Se você pudesse resolver um [único problema] em [30 dias,] qual seria?" at={L(b(2, 50.8))} size={62} stagger={0.12} />
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={640} center>
        <Pop at={L(b(2, 55.1))} y={40}>
          <div style={card({width: 1100, padding: 44, boxSizing: 'border-box', background: '#FFFDF6'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20}}>
              <Tile name="pen" size={60} color="#B98A12" tint="#FFF1CC" />
              <div style={{fontSize: 32, fontWeight: 700}}>Anote com as palavras dele</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <DONO />
              <div style={{fontSize: 40, fontStyle: 'italic', fontWeight: 500, color: '#3A3550'}}>
                {frase.slice(0, Math.round(ramp(tt, L(b(2, 55.5)), L(b(2, 56.8)), 0, frase.length, Easing.linear)))}
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo2: React.FC<P> = ({g0, dur}) => (
  <Scene dur={dur} push={0.03}>
    <Resumo at={b(2, 57.1) - g0} texto="Você sai sabendo o [tamanho do problema,] quem decide, e com a [próxima reunião] marcada." n={2} />
  </Scene>
);

// =================== PASSO 3 · PREÇO (bloco 3) ===================
export const Quando: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const risca = ramp(tt, L(b(3, 5.0)), L(b(3, 5.5)), 0, 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={330} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
          <Pop at={L(b(3, 1.9))} pop>
            <Chip icon="users" text="Reunião 1 · Diagnóstico" size={30} />
          </Pop>
          <Pop at={L(b(3, 2.4))} x={-20} y={0}>
            <div style={{padding: '16px 30px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 32, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 18px 36px -14px rgba(140,90,240,0.6)'}}>você monta o preço</div>
          </Pop>
          <Pop at={L(b(3, 3.5))} pop>
            <Chip icon="doc" text="Reunião 2 · Proposta" size={30} />
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={660} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 70}}>
          <Pop at={L(b(3, 4.6))} pop y={30}>
            <div style={{position: 'relative', opacity: 1 - 0.4 * risca}}>
              <div style={card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap'})}>
                <Tile name="doc" size={74} color={C.muted} tint="#F1F0F5" />
                <div style={{fontSize: 42, fontWeight: 700, color: C.muted}}>Tabela pronta</div>
              </div>
              <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 6, borderRadius: 6, background: C.red, transformOrigin: 'left', transform: `scaleX(${risca})`}} />
            </div>
          </Pop>
          <Pop at={L(b(3, 5.8))} pop y={30}>
            <div style={{...card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap'}), boxShadow: `0 0 0 5px rgba(31,180,90,0.35), ${C.shadow}`}}>
              <ContactAvatar size={74} />
              <div style={{fontSize: 42, fontWeight: 700}}>
                Quem define <Grad>é você</Grad>
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

const brl = (n: number) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
export const CustoHora: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const custos = [
    {at: 13.4, t: 'Salários', v: 7000},
    {at: 14.1, t: 'Ferramentas', v: 1500},
    {at: 14.9, t: 'Impostos', v: 2000},
    {at: 15.6, t: 'Comissão', v: 1500},
  ];
  const soma = custos.reduce((a, c) => a + (tt >= L(b(3, c.at)) ? c.v : 0), 0);
  const risca = ramp(tt, L(b(3, 21.9)), L(b(3, 22.4)), 0, 1);
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={90} w={1920}>
        <Words text="Quanto custa [uma hora] do seu trabalho?" at={L(b(3, 7.7))} size={66} stagger={0.06} />
      </Abs>
      {/* custos do mês */}
      <Abs x={150} y={250}>
        <Pop at={L(b(3, 10.9))} y={40}>
          <div style={card({width: 560, padding: 38, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600, marginBottom: 18}}>Tudo que sai do seu caixa no mês</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              {custos.map((c) => (
                <Pop key={c.t} at={L(b(3, c.at))} x={-20} y={0}>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 500, padding: '10px 16px', borderRadius: 14, background: '#F7F6FB'}}>
                    <span>{c.t}</span>
                    <span style={{fontWeight: 700}}>{brl(c.v)}</span>
                  </div>
                </Pop>
              ))}
            </div>
            <div style={{borderTop: `2px solid ${C.line}`, marginTop: 18, paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 34, fontWeight: 700}}>
              <span>Total</span>
              <Grad>{brl(soma)}</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={770} y={520}>
        <Pop at={L(b(3, 16.5))} pop>
          <div style={{fontSize: 110, fontWeight: 700, color: C.purple}}>÷</div>
        </Pop>
      </Abs>
      {/* horas reais */}
      <Abs x={900} y={330}>
        <Pop at={L(b(3, 17.3))} y={40}>
          <div style={card({width: 400, padding: 38, boxSizing: 'border-box', textAlign: 'center'})}>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Horas que você fatura</div>
            <div style={{fontSize: 96, fontWeight: 700, letterSpacing: -3, marginTop: 8}}>
              <Pop at={L(b(3, 20.1))} pop>
                <Grad>120 h</Grad>
              </Pop>
            </div>
            <Pop at={L(b(3, 21.6))} y={10}>
              <div style={{position: 'relative', display: 'inline-block', fontSize: 40, fontWeight: 700, color: C.faint}}>
                176 h
                <div style={{position: 'absolute', left: -6, right: -6, top: '52%', height: 4, background: C.red, transformOrigin: 'left', transform: `scaleX(${risca})`}} />
              </div>
            </Pop>
            <Pop at={L(b(3, 23.2))} y={10}>
              <div style={{fontSize: 22, color: C.muted, marginTop: 10}}>ninguém fatura o dia inteiro</div>
            </Pop>
          </div>
        </Pop>
      </Abs>
      {/* resultado */}
      <Abs x={1360} y={420}>
        <Pop at={L(b(3, 23.9))} pop y={30}>
          <div style={{...card({width: 420, padding: 38, boxSizing: 'border-box', textAlign: 'center'}), boxShadow: `0 0 0 5px rgba(109,93,246,0.35), ${C.shadow}`}}>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Sua hora custa</div>
            <div style={{fontSize: 88, fontWeight: 700, letterSpacing: -3}}>
              <Grad>R$ 100</Grad>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Margem: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const xis = useSpring(L(b(3, 34.4)), POP);
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={90} w={1920}>
        <Words text="O erro [mais comum] na margem" at={L(b(3, 26.8))} size={66} stagger={0.06} />
      </Abs>
      <Abs x={150} y={250}>
        <Pop at={L(b(3, 28.6))} y={40}>
          <div style={card({width: 760, padding: 44, boxSizing: 'border-box', background: '#FFF8F8'})}>
            <Badge text="Como quase todo mundo faz" size={24} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28, fontSize: 38, fontWeight: 500}}>
              <Pop at={L(b(3, 29.9))} x={-20} y={0}>
                <div>Sua hora custa <b>R$ 100</b></div>
              </Pop>
              <Pop at={L(b(3, 31.1))} x={-20} y={0}>
                <div>Você cobra <b>R$ 130</b></div>
              </Pop>
              <Pop at={L(b(3, 32.6))} x={-20} y={0}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  Lucro de <b style={{textDecoration: xis > 0.5 ? 'line-through' : 'none', color: xis > 0.5 ? C.faint : C.text}}>30%</b>?
                  <div style={{transform: `scale(${xis})`, width: 52, height: 52, borderRadius: 52, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="x" size={30} color="#fff" stroke={3.4} />
                  </div>
                </div>
              </Pop>
              <Pop at={L(b(3, 34.7))} pop y={10}>
                <div style={{fontSize: 46, fontWeight: 700, color: C.red}}>Lucro real: 23%</div>
              </Pop>
              <Pop at={L(b(3, 35.2))} y={8}>
                <div style={{fontSize: 24, color: C.muted}}>R$ 30 de lucro em R$ 130 = 23%</div>
              </Pop>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1010} y={250}>
        <Pop at={L(b(3, 35.7))} y={40}>
          <div style={{...card({width: 760, padding: 44, boxSizing: 'border-box', background: '#F6FFF9'}), boxShadow: `0 0 0 5px rgba(31,180,90,0.3), ${C.shadow}`}}>
            <Badge text="Para lucrar 30% de verdade" ok size={24} />
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28}}>
              <Pop at={L(b(3, 38.0))} x={-20} y={0}>
                <div style={{fontSize: 56, fontWeight: 700}}>R$ 100 ÷ 0,7</div>
              </Pop>
              <Pop at={L(b(3, 40.9))} pop y={10}>
                <div style={{fontSize: 96, fontWeight: 700, letterSpacing: -3, color: C.green}}>= R$ 143</div>
              </Pop>
              <Pop at={L(b(3, 41.6))} y={8}>
                <div style={{fontSize: 24, color: C.muted}}>R$ 43 de lucro em R$ 143 = 30%</div>
              </Pop>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const TelaCalc: React.FC<P> = ({g0, dur}) => (
  <Tela
    g0={g0}
    dur={dur}
    prints={[
      ['p1_calc.png', 0],
      ['p2_calc_preenchida.png', b(3, 44.2)],
    ]}
    zoom={[
      [b(3, 42.8), 0.55, 0.45, 1],
      [b(3, 43.5), 0.55, 0.45, 1],
      [b(3, 44.3), 0.57, 0.28, 1.45],
      [b(3, 45.2), 0.57, 0.28, 1.45],
      [b(3, 45.9), 0.57, 0.72, 1.4],
    ]}
    aneis={[
      {at: b(3, 44.5), x: 730, y: 260, w: 734, h: 43},
      {at: b(3, 45.8), x: 711, y: 723, w: 774, h: 147},
    ]}
    legenda="Página do Método · Calculadora de preço"
  />
);

export const Resumo3: React.FC<P> = ({g0, dur}) => (
  <Scene dur={dur} push={0.03}>
    <Resumo at={b(3, 46.6) - g0} texto="Descubra o [custo da sua hora,] e deixe a calculadora colocar a [margem certa.]" n={3} />
  </Scene>
);

// =================== PASSO 4 · PROPOSTA (bloco 4) ===================
export const Ordem: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const itens = [
    {at: 7.2, t: 'Problema', s: 'o que você encontrou', icon: 'search'},
    {at: 8.4, t: 'Solução', s: 'como você resolve', icon: 'check'},
    {at: 10.0, t: 'Preço', s: 'só no fim', icon: 'chart'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Agora sim, [você apresenta]" at={L(b(4, 3.6))} size={76} />
      </Abs>
      <Abs x={0} y={290} w={1920}>
        <Pop at={L(b(4, 5.6))} y={14}>
          <div style={{textAlign: 'center', fontSize: 36, color: C.muted, fontWeight: 500}}>mas a ordem importa:</div>
        </Pop>
      </Abs>
      <Abs x={960} y={620} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          {itens.map((x, i) => (
            <React.Fragment key={x.t}>
              {i > 0 && (
                <Pop at={L(b(4, x.at)) - 0.25} x={-20} y={0}>
                  <XIcon name="arrow" size={56} color={C.faint} stroke={2.6} />
                </Pop>
              )}
              <Pop at={L(b(4, x.at))} pop y={30}>
                <div style={card({width: 380, padding: '34px 30px', borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box'})}>
                  <div style={{width: 70, height: 70, borderRadius: 70, background: C.grad, color: '#fff', fontSize: 34, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                  <div style={{fontSize: 46, fontWeight: 700}}>{x.t}</div>
                  <div style={{fontSize: 24, color: C.muted}}>{x.s}</div>
                </div>
              </Pop>
            </React.Fragment>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

export const Ouvimos: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const glow = Math.min(useSpring(L(b(4, 19.7))), 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={90} w={1920}>
        <Words text="Comece mostrando [o que encontrou]" at={L(b(4, 10.7))} size={66} stagger={0.06} />
      </Abs>
      <Abs x={960} y={590} center>
        <Pop at={L(b(4, 12.3))} y={50} s={0.9}>
          <MiniSlide w={1240} glow={glow} title="O que ouvimos">
            <div style={{display: 'flex', gap: 40, marginTop: 34, alignItems: 'center'}}>
              <div style={{background: '#EFEAE2', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, width: 520}}>
                <Pop at={L(b(4, 13.2))} x={20} y={0}>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Bubble text="Queria saber o valor da limpeza." me time="09:12" ticks w={420} />
                  </div>
                </Pop>
                <Pop at={L(b(4, 15.3))} x={-20} y={0}>
                  <Bubble text="Olá! Tudo bem? 😊" time="11:47" w={420} />
                </Pop>
              </div>
              <Pop at={L(b(4, 16.9))} pop>
                <div>
                  <div style={{fontSize: 30, color: C.muted, fontWeight: 600}}>A clínica levou</div>
                  <div style={{fontSize: 96, fontWeight: 700, letterSpacing: -3, color: C.red}}>2h 35min</div>
                  <div style={{fontSize: 30, color: C.muted, fontWeight: 600}}>para responder</div>
                </div>
              </Pop>
            </div>
          </MiniSlide>
        </Pop>
      </Abs>
      <Abs x={1440} y={235} center>
        <div style={{transform: `scale(${useSpring(L(b(4, 19.8)), POP)})`}}>
          <Badge text="o slide mais importante" grad icon="star" size={28} />
        </div>
      </Abs>
    </Scene>
  );
};

export const Dores: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const pares = [
    {at: 22.3, d: '“Demoram para responder”', s: 'Agente de IA responde na hora'},
    {at: 23.3, d: '“Perco contato fora do horário”', s: 'Atendimento 24 horas'},
    {at: 24.2, d: '“Não sei de onde vem o paciente”', s: 'Origem de cada contato'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Cada problema dele, [uma solução]" at={L(b(4, 21.3))} size={68} stagger={0.06} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          {pares.map((x) => (
            <div key={x.d} style={{display: 'flex', alignItems: 'center', gap: 26}}>
              <Pop at={L(b(4, x.at))} x={-30} y={0}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, width: 680}}>
                  <DONO />
                  <div style={{...card({padding: '20px 26px', borderRadius: 22}), fontSize: 30, fontStyle: 'italic', fontWeight: 500}}>{x.d}</div>
                </div>
              </Pop>
              <Pop at={L(b(4, x.at)) + 0.3} x={-20} y={0}>
                <XIcon name="arrow" size={48} color={C.faint} stroke={2.6} />
              </Pop>
              <Pop at={L(b(4, x.at)) + 0.5} pop>
                <div style={{padding: '20px 30px', borderRadius: 22, background: C.greenTint, color: C.green, fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 12}}>
                  <Icon name="check" size={28} color={C.green} stroke={3} /> {x.s}
                </div>
              </Pop>
            </div>
          ))}
        </div>
      </Abs>
      <Abs x={0} y={930} w={1920}>
        <Pop at={L(b(4, 25.1))} y={10}>
          <div style={{textAlign: 'center', fontSize: 30, color: C.muted, fontWeight: 500}}>usando as palavras dele</div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const DuasPartes: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const piora = ramp(tt, L(b(4, 34.3)), L(b(4, 36.6)), 0, 1);
  const pts = [0, 1, 2, 3, 4, 5].map((i) => [40 + i * 110, 60 + i * i * 6 * piora + i * 8 * piora]);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={100} w={1920}>
        <Words text="A proposta tem [duas partes]" at={L(b(4, 26.1))} size={72} />
      </Abs>
      <Abs x={150} y={280}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
          <Pop at={L(b(4, 27.7))} x={-30} y={0}>
            <div style={card({width: 820, padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 26, boxSizing: 'border-box'})}>
              <Tile name="calendar" size={84} />
              <div>
                <div style={{fontSize: 44, fontWeight: 700}}>Implantação</div>
                <div style={{fontSize: 28, color: C.muted}}>montar tudo, uma vez</div>
              </div>
            </div>
          </Pop>
          <Pop at={L(b(4, 30.4))} x={-30} y={0}>
            <div style={card({width: 820, padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 26, boxSizing: 'border-box'})}>
              <Tile name="history" size={84} />
              <div>
                <div style={{fontSize: 44, fontWeight: 700}}>Evolução</div>
                <div style={{fontSize: 28, color: C.muted}}>o acompanhamento, todo mês</div>
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={1080} y={280}>
        <Pop at={L(b(4, 33.2))} y={40}>
          <div style={card({width: 690, padding: 40, boxSizing: 'border-box'})}>
            <div style={{fontSize: 30, fontWeight: 700}}>Sem acompanhamento…</div>
            <svg width={610} height={300} style={{marginTop: 20}}>
              <polyline points={pts.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={9} fill={C.red} />
              ))}
            </svg>
            <Pop at={L(b(4, 35.9))} y={10}>
              <div style={{fontSize: 34, fontWeight: 700, color: C.red}}>a operação piora com o tempo</div>
            </Pop>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Fechar: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const some = ramp(tt, L(b(4, 38.5)), L(b(4, 39.2)), 0, 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Indique [o pacote certo]" at={L(b(4, 37.1))} size={74} />
      </Abs>
      <Abs x={960} y={450} center>
        <div style={{display: 'flex', gap: 30, alignItems: 'center'}}>
          {['Básico', 'Recomendado', 'Completo'].map((n, i) => (
            <Pop key={n} at={L(b(4, 37.3)) + i * 0.1} pop y={20}>
              <div
                style={{
                  ...card({width: 300, padding: '30px 20px', borderRadius: 26, textAlign: 'center', boxSizing: 'border-box'}),
                  opacity: i === 1 ? 1 : 1 - 0.7 * some,
                  transform: `scale(${i === 1 ? 1 + 0.12 * some : 1 - 0.1 * some})`,
                  boxShadow: i === 1 ? `0 0 0 ${5 * some}px rgba(109,93,246,0.4), ${C.shadow}` : C.shadowSm,
                }}
              >
                <div style={{fontSize: 34, fontWeight: 700}}>{n}</div>
                {i === 1 && <div style={{marginTop: 12, opacity: some}}><Badge text="indicado" grad icon="star" size={22} /></div>}
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={790} center>
        <Pop at={L(b(4, 40.1))} pop y={30}>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
            <ContactAvatar size={74} />
            <Bubble text="Podemos começar na semana que vem?" w={760} />
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Caro: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={330} center>
        <Pop at={L(b(4, 43.4))} pop y={30}>
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
            <Bubble text="Hmm… está caro." me w={520} />
            <DONO />
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={640} center>
        <Pop at={L(b(4, 44.8))} y={40}>
          <div style={card({width: 1200, padding: '40px 50px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 30})}>
            <div style={{fontSize: 80}}>💸</div>
            <div>
              <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Lembre quanto ele perde hoje</div>
              <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.2}}>
                com <Grad>contatos sem resposta</Grad>
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo4: React.FC<P> = ({g0, dur}) => (
  <Scene dur={dur} push={0.03}>
    <Resumo at={b(4, 48.2) - g0} texto="Problema, solução, preço, e uma [pergunta para fechar.]" n={4} />
  </Scene>
);

// =================== PASSO 5 · CONTRATO (bloco 5) ===================
export const Contrato: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const itens = [
    {at: 5.8, t: 'O que você vai entregar, item por item'},
    {at: 8.0, t: 'Implantação e evolução separadas, com valor e prazo'},
    {at: 12.0, t: 'Tempo mínimo de evolução'},
    {at: 16.0, t: 'Custos de terceiros (Meta, IA, ligações) pagos pelo cliente'},
    {at: 21.7, t: 'O que o cliente precisa te entregar (acessos)'},
    {at: 24.3, t: 'O agente de IA é ferramenta: não garante vendas'},
  ];
  return (
    <Scene dur={dur} push={0.015}>
      <Abs x={0} y={70} w={1920}>
        <Words text="Confira se o contrato [tem tudo]" at={L(b(5, 4.5))} size={64} stagger={0.06} />
      </Abs>
      <Abs x={140} y={230}>
        <Pop at={L(b(5, 2.1))} x={-40} y={0}>
          <div style={card({width: 420, height: 560, padding: 40, boxSizing: 'border-box', position: 'relative'})}>
            <Tile name="doc" size={90} />
            <div style={{fontSize: 40, fontWeight: 700, marginTop: 24, lineHeight: 1.15}}>Modelo de contrato</div>
            <div style={{fontSize: 24, color: C.muted, marginTop: 8}}>pronto nos materiais</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12, marginTop: 34}}>
              {[0.9, 0.75, 0.85, 0.6, 0.8].map((w, i) => (
                <div key={i} style={{height: 12, width: `${w * 100}%`, borderRadius: 12, background: '#EEEDF4'}} />
              ))}
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={640} y={230}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          {itens.map((x) => {
            const c = useSpring(L(b(5, x.at)) + 0.25, POP);
            return (
              <Pop key={x.t} at={L(b(5, x.at))} x={-30} y={0}>
                <div style={card({width: 1140, padding: '20px 28px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 22, boxSizing: 'border-box'})}>
                  <div style={{width: 48, height: 48, borderRadius: 14, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${c})`}}>
                    <Icon name="check" size={30} color="#fff" stroke={3.4} />
                  </div>
                  <div style={{fontSize: 31, fontWeight: 600}}>{x.t}</div>
                </div>
              </Pop>
            );
          })}
        </div>
      </Abs>
      <Abs x={960} y={1000} center>
        <Pop at={L(b(5, 28.1))} pop y={20}>
          <Badge text="Antes do primeiro uso, mostre ao seu advogado" grad icon="shield" size={30} />
        </Pop>
      </Abs>
    </Scene>
  );
};

// =================== FECHAMENTO (bloco 6) ===================
export const Fim: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const dark = ramp(tt, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Contrato assinado: [etapa Vender concluída]" at={L(b(6, 0.1))} size={64} stagger={0.06} />
      </Abs>
      <Abs x={960} y={480} center>
        <Trilha atual={6} at={L(b(6, 4.5))} />
      </Abs>
      <Abs x={960} y={720} center>
        <Pop at={L(b(6, 8.3))} pop y={20}>
          <Chip icon="doc" text="Todos os materiais estão na página do Método" size={32} />
        </Pop>
      </Abs>
      <Abs x={960} y={870} center>
        <Pop at={L(b(6, 10.9))} pop y={20}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 36px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 38, fontWeight: 700, boxShadow: '0 20px 40px -14px rgba(140,90,240,0.6)'}}>
            Próximo vídeo: Etapa 2 · Implantar <XIcon name="arrow" size={36} color="#fff" stroke={2.6} />
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={1010} center>
        <Pop at={L(b(6, 12.0))} y={10}>
          <Logo height={40} />
        </Pop>
      </Abs>
      <Sparkle x={420} y={380} at={L(b(6, 8.0))} />
      <Sparkle x={1500} y={600} at={L(b(6, 8.2))} size={22} color="#B7A8FF" />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};
