import React from 'react';
import {Abs, Balao, C, Celular, Chamada, Easing, Icon, IconTile, Pop, Scene, Sparkle, TelaPendente, Words, card, mk, ramp, useSec, type CenaProps} from './comum';
import {Avatar} from '../ui';
import type {LP} from './LPVideo';

// LP2 · Gestão do time de vendas — "visibilidade para cobrar certo" (narração 51,0 s)

const BALOES: [number, number, number, boolean][] = [
  [170, 250, 260, false],
  [1450, 210, 220, true],
  [240, 760, 240, true],
  [1400, 720, 280, false],
  [700, 860, 200, false],
  [1120, 880, 230, true],
];

// 0–3,55 s: você sabe o que o seu vendedor está falando com o lead agora?
const DorPergunta: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur} push={0.05}>
      {BALOES.map(([x, y, w, me], i) => (
        <Abs key={i} x={x} y={y}>
          <Pop at={L(0.3) + i * 0.15} y={20}>
            <Balao me={me} w={w} blur={5} />
          </Pop>
        </Abs>
      ))}
      <Abs x={260} y={400} w={1400}>
        <Words text="Você sabe o que o seu vendedor está falando com o lead [agora?]" at={L(0.0)} size={78} stagger={0.12} />
      </Abs>
    </Scene>
  );
};

// 3,55–11,75 s: WhatsApp pessoal, controle na cabeça do vendedor; se ele sai, leva a carteira
const DorCelular: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const sai = ramp(t, L(9.4), L(11.0), 0, 1, Easing.in(Easing.cubic));
  return (
    <Scene dur={dur}>
      <Abs x={170} y={330} w={820}>
        <Words text="O controle fica na [cabeça do vendedor]" at={L(6.04)} align="left" size={68} />
      </Abs>
      <Abs x={170} y={600} w={820}>
        <Pop at={L(9.12)} y={20}>
          <div style={{fontSize: 40, fontWeight: 500, color: C.red, display: 'flex', alignItems: 'center', gap: 16}}>
            <Icon name="x" size={36} color={C.red} stroke={2.6} /> Se ele sai, leva a carteira
          </div>
        </Pop>
      </Abs>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `translateX(${sai * 900}px)`, opacity: 1 - sai * 0.6}}>
        <Abs x={1330} y={560} center>
          <Pop at={L(3.68)} y={90}>
            <Celular w={390} h={780} titulo="WhatsApp pessoal">
              <Balao w={220} blur={4} />
              <Balao me w={180} blur={4} />
              <Balao w={250} blur={4} />
              <Balao me w={140} blur={4} />
              <Balao w={200} blur={4} />
            </Celular>
          </Pop>
        </Abs>
        {/* a carteira de contatos vai junto com o celular */}
        {[0, 1, 2, 3, 4].map((i) => (
          <Abs key={i} x={1560 + (i % 2) * 70} y={240 + i * 120}>
            <Pop at={L(10.16) + i * 0.06} pop>
              <Avatar size={70} initials={['RS', 'MA', 'JP', 'LC', 'BT'][i]} hue={[330, 200, 20, 160, 260][i]} ring />
            </Pop>
          </Abs>
        ))}
      </div>
    </Scene>
  );
};

// 11,75–17,75 s: gestão comercial não é cobrar mais. É ter visibilidade para cobrar certo.
const Virada: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={360} w={1920}>
        <Words text="Gestão comercial não é cobrar mais" at={L(12.16)} out={L(14.75)} size={78} color={C.muted} />
      </Abs>
      <Abs x={260} y={400} w={1400}>
        <Words text="É ter [visibilidade] para cobrar certo" at={L(14.88)} size={96} />
      </Abs>
      <Sparkle x={560} y={350} at={L(15.4)} />
      <Sparkle x={1390} y={640} at={L(15.6)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

const Pratica: React.FC<CenaProps> = (p) => (
  <TelaPendente
    {...p}
    itens={[
      [18.1, 'WhatsApp e Instagram oficiais no CRM'],
      [22.6, 'Número da empresa, não do vendedor'],
      [25.5, 'Distribuição automática de leads'],
      [29.4, 'IA analisando as conversas'],
      [33.6, 'Aura: quem demorou mais para responder?'],
      [38.8, 'Próxima tarefa em cada negócio'],
    ]}
  />
);

// 41,8–46,25 s: o vendedor sabe o que é esperado. O gestor sabe onde agir.
const FechaPapeis: React.FC<CenaProps> = ({g0, dur}) => {
  const L = mk(g0);
  const papeis: [string, string, string, string, number][] = [
    ['user', 'Vendedor', 'sabe o que é esperado', C.purple, 42.2],
    ['chart', 'Gestor', 'sabe onde agir', C.pink, 44.36],
  ];
  return (
    <Scene dur={dur}>
      <Abs x={960} y={540} center>
        <div style={{display: 'flex', gap: 60}}>
          {papeis.map(([ic, quem, oque, cor, at]) => (
            <Pop key={quem} at={L(at) - 0.1} y={50} pop>
              <div style={card({width: 600, padding: 48, borderRadius: 36, boxSizing: 'border-box'})}>
                <IconTile name={ic} size={92} color={cor} tint={cor === C.pink ? '#FDEAF3' : C.purpleTint} />
                <div style={{fontSize: 50, fontWeight: 600, marginTop: 30}}>{quem}</div>
                <div style={{fontSize: 36, color: C.muted, marginTop: 6}}>{oque}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

const FechaChamada: React.FC<CenaProps> = (p) => (
  <Chamada {...p} titulo="Leve essa [visibilidade] para toda a sua carteira" tTitulo={46.4} tSeja={49.52} tClint={50.36} />
);

export const LP2: LP = {
  id: 'LP2',
  dur: 51.6,
  audio: 'lps/lp2.wav',
  blocos: [
    [0, 3.55, DorPergunta],
    [3.55, 11.75, DorCelular],
    [11.75, 17.75, Virada],
    [17.75, 41.8, Pratica],
    [41.8, 46.25, FechaPapeis],
    [46.25, 51.6, FechaChamada],
  ],
};
