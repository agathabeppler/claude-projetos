import React from 'react';
import {Abs, C, Chamada, Celular, Chip, ClintTile, Easing, Icon, IconTile, Pop, Scene, Sparkle, TelaPendente, Words, card, mk, ramp, useSec, type CenaProps} from './comum';
import {Balao} from './comum';
import type {LP} from './LPVideo';

// LP1 · Ferramenta ruim ou cara — "ferramenta cara é a que ninguém usa" (narração 61,8 s)

const FERRAMENTAS = [
  {nome: 'CRM', icon: 'users', preco: 890, at: 0.0},
  {nome: 'WhatsApp', icon: 'message', preco: 450, at: 1.76},
  {nome: 'Automação', icon: 'clock', preco: 620, at: 3.36},
  {nome: 'Conector', icon: 'history', preco: 380, at: 6.72},
];
const POS = [
  [250, 300],
  [1110, 250],
  [330, 640],
  [1150, 600],
];

const Ferramenta: React.FC<{nome: string; icon: string; preco: number; cinza?: number}> = ({nome, icon, preco, cinza = 0}) => (
  <div style={card({width: 460, padding: 30, borderRadius: 28, display: 'flex', alignItems: 'center', gap: 22, boxSizing: 'border-box', filter: `grayscale(${cinza})`, opacity: 1 - 0.45 * cinza})}>
    <IconTile name={icon} size={76} />
    <div style={{flex: 1}}>
      <div style={{fontSize: 32, fontWeight: 600}}>{nome}</div>
      <div style={{fontSize: 20, color: C.muted}}>licença mensal</div>
    </div>
    <div style={{fontSize: 30, fontWeight: 600, color: C.red, whiteSpace: 'nowrap'}}>R$ {preco}</div>
  </div>
);

// 0–8,8 s: CRM, WhatsApp, Automação, Conector… e a fatura subindo
const DorFerramentas: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  let total = 0;
  FERRAMENTAS.forEach((f) => {
    total += f.preco * ramp(t, L(f.at) + 0.1, L(f.at) + 0.7, 0, 1, Easing.out(Easing.cubic));
  });
  return (
    <Scene dur={dur} push={0.04}>
      {FERRAMENTAS.map((f, i) => (
        <Abs key={f.nome} x={POS[i][0]} y={POS[i][1]}>
          <Pop at={L(f.at)} y={40} pop>
            <Ferramenta {...f} />
          </Pop>
        </Abs>
      ))}
      <Abs x={960} y={930} center>
        <Pop at={L(0.3)} y={30}>
          <div style={card({padding: '22px 40px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 22, whiteSpace: 'nowrap'})}>
            <Icon name="doc" size={34} color={C.muted} />
            <div style={{fontSize: 30, color: C.muted, fontWeight: 500}}>Fatura do mês</div>
            <div style={{fontSize: 44, fontWeight: 700, color: C.red, fontVariantNumeric: 'tabular-nums', width: 210, textAlign: 'right'}}>R$ {Math.round(total).toLocaleString('pt-BR')}</div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// 8,8–14,8 s: no fim, o time volta para o WhatsApp do celular e o lead que custou caro se perde
const DorCelular: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const perde = ramp(t, L(13.7), L(14.5), 0, 1, Easing.in(Easing.cubic));
  return (
    <Scene dur={dur}>
      <Abs x={170} y={360} w={820}>
        <Words text="O time volta para o [celular]" at={L(9.56)} align="left" size={70} />
      </Abs>
      {/* ferramentas abandonadas ao fundo */}
      {FERRAMENTAS.slice(0, 3).map((f, i) => (
        <Abs key={f.nome} x={170 + i * 40} y={600 + i * 90}>
          <Pop at={L(8.8) + i * 0.08} y={20}>
            <div style={{transform: 'scale(0.75)', transformOrigin: '0 0'}}>
              <Ferramenta {...f} cinza={1} />
            </div>
          </Pop>
        </Abs>
      ))}
      <Abs x={1320} y={560} center>
        <Pop at={L(10.4)} y={90}>
          <Celular w={390} h={780} titulo="WhatsApp pessoal">
            <Balao w={220} />
            <Balao me w={180} />
            <Balao w={250} />
            <Balao me w={140} />
            <Balao w={200} />
          </Celular>
        </Pop>
      </Abs>
      {/* o lead que custou caro, saindo de cena */}
      <Abs x={1560} y={250}>
        <Pop at={L(12.3)} x={-40} y={0} pop>
          <div
            style={{
              ...card({padding: '18px 26px', borderRadius: 24, display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap'}),
              opacity: 1 - perde,
              transform: `translate(${perde * 120}px, ${perde * 260}px) rotate(${perde * 14}deg)`,
              filter: `blur(${perde * 8}px)`,
            }}
          >
            <IconTile name="user" size={54} color={C.pink} tint="#FDEAF3" />
            <div>
              <div style={{fontSize: 24, fontWeight: 600}}>Lead do anúncio</div>
              <div style={{fontSize: 19, color: C.red, fontWeight: 500}}>custou R$ 38</div>
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// 14,8–20,4 s: o problema nunca foi não ter CRM. Foi a escolha da ferramenta.
const ViradaFrase: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur}>
      <Abs x={0} y={360} w={1920}>
        <Words text="O problema nunca foi não ter CRM" at={L(15.35)} out={L(18.25)} size={80} color={C.muted} />
      </Abs>
      <Abs x={0} y={440} w={1920}>
        <Words text="Foi a [escolha] da ferramenta" at={L(18.4)} size={96} />
      </Abs>
    </Scene>
  );
};

// 20,4–29,3 s: a Clint junta tudo num lugar só
const ViradaJunta: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const junta = ramp(t, L(21.2), L(22.4), 0, 1, Easing.inOut(Easing.cubic));
  const itens: [string, string, number][] = [
    ['users', 'CRM', 23.2],
    ['message', 'WhatsApp e Instagram oficiais', 24.48],
    ['clock', 'Automações', 26.48],
    ['mic', 'Agentes de IA', 27.52],
  ];
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Tudo num [lugar só]" at={L(20.6)} size={72} />
      </Abs>
      {/* cartões soltos voando para o centro */}
      {FERRAMENTAS.map((f, i) => {
        const [x, y] = POS[i];
        return (
          <div
            key={f.nome}
            style={{
              position: 'absolute',
              left: x + (730 - x) * junta,
              top: y + 30 + (520 - y) * junta,
              opacity: 1 - junta,
              transform: `scale(${0.8 - 0.4 * junta})`,
            }}
          >
            <Ferramenta {...f} />
          </div>
        );
      })}
      <Abs x={960} y={640} center>
        <Pop at={L(21.9)} y={40} pop>
          <div style={card({width: 1080, padding: 52, borderRadius: 40, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, marginBottom: 30}}>
              <ClintTile size={84} />
              <div style={{fontSize: 44, fontWeight: 600}}>Clint</div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
              {itens.map(([ic, txt, at]) => (
                <Pop key={txt} at={L(at)} y={16} pop>
                  <Chip icon={ic} text={txt} size={30} />
                </Pop>
              ))}
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={500} y={420} at={L(22.2)} />
      <Sparkle x={1420} y={860} at={L(22.4)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

const Pratica: React.FC<CenaProps> = (p) => (
  <TelaPendente
    {...p}
    itens={[
      [29.5, 'Funil com cada lead na sua etapa'],
      [33.0, 'Conversa do WhatsApp dentro do card'],
      [35.8, 'Arrastar o card para outra etapa'],
      [39.9, 'Automação: 1ª mensagem + tarefa'],
      [45.5, 'Importar planilha sem perder dados'],
    ]}
  />
);

// 49,8–56,6 s: menos licenças, menos integrações frágeis, time que usa desde o primeiro dia
const FechaBeneficios: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const itens: [string, string, string, string, number][] = [
    ['doc', 'Menos licenças', C.purple, C.purpleTint, 50.29],
    ['shield', 'Menos integrações frágeis', C.purple, C.purpleTint, 51.44],
    ['users', 'Time usando desde o 1º dia', C.green, C.greenTint, 53.44],
  ];
  return (
    <Scene dur={dur}>
      <Abs x={960} y={540} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 34, alignItems: 'center'}}>
          {itens.map(([ic, txt, cor, tint, at]) => (
            <Pop key={txt} at={L(at)} y={30} pop>
              <Chip icon={ic} text={txt} color={cor} tint={tint} size={44} />
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

const FechaChamada: React.FC<CenaProps> = (p) => (
  <Chamada {...p} titulo="Leve para o seu cliente a ferramenta que o [time adota]" tTitulo={56.8} tSeja={60.16} tClint={61.12} />
);

export const LP1: LP = {
  id: 'LP1',
  dur: 62.4,
  audio: 'lps/lp1.wav',
  blocos: [
    [0, 8.75, DorFerramentas],
    [8.75, 14.8, DorCelular],
    [14.8, 20.45, ViradaFrase],
    [20.45, 29.3, ViradaJunta],
    [29.3, 49.8, Pratica],
    [49.8, 56.6, FechaBeneficios],
    [56.6, 62.4, FechaChamada],
  ],
};
