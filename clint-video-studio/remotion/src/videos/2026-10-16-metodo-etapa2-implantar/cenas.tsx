import React from 'react';
import {AbsoluteFill, Easing, Img, OffthreadVideo, staticFile} from 'remotion';
import {C, FONT} from '../../theme';
import {Abs, ContactAvatar, Grad, Icon, Logo, Pop, POP, Scene, Sparkle, Words, card, ramp, useSec, useSpring} from '../../ui';
import {Badge, Bubble, Chip, Tile, XIcon} from '../2026-10-16-metodo-01-cliente-oculto/cenas';
import {Clinica} from '../2026-10-16-metodo-etapa1-vender/cenas';
import {Capitulo, P, PASSOS, PASTA, Resumo, TelaVideo, Trilha, b} from './comum';

// Método · Etapa 2 · Implantar. Tempos: b(k, s) = início do bloco k da narração + s (palavras do HeyGen).

const AuraTile: React.FC<{size?: number}> = ({size = 80}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: 'linear-gradient(135deg, #F27FB5 0%, #A86CF2 50%, #6D5DF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24">
      <path d="M12 0c.6 5.6 2.4 7.6 12 12-9.6 4.4-11.4 6.4-12 12-.6-5.6-2.4-7.6-12-12C9.6 7.6 11.4 5.6 12 0z" fill="#fff" />
    </svg>
  </div>
);

/** Trecho do vídeo oficial da Aura (já no visual da Clint): ocupa a tela toda, com etiqueta opcional. */
const VideoCheio: React.FC<{g0: number; dur: number; src: string; chip?: {at: number; t: string; icon?: string}}> = ({dur, src, chip, g0}) => {
  const t = useSec();
  const a = ramp(t, 0, 0.35) * (1 - ramp(t, dur - 0.3, dur));
  const c = chip ? ramp(t, chip.at - g0, chip.at - g0 + 0.3) : 0;
  return (
    <AbsoluteFill style={{opacity: a, fontFamily: FONT}}>
      <OffthreadVideo src={staticFile(`${PASTA}/${src}`)} muted style={{width: 1920, height: 1080}} />
      {chip && (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 60, display: 'flex', justifyContent: 'center', opacity: c}}>
          <div style={{transform: `translateY(${(1 - c) * 20}px)`, display: 'flex', alignItems: 'center', gap: 14, padding: '16px 30px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 34, fontWeight: 700, boxShadow: '0 20px 40px -12px rgba(140,90,240,0.6)'}}>
            <XIcon name={chip.icon ?? 'check'} size={32} color="#fff" stroke={2.6} /> {chip.t}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Item: React.FC<{at: number; t: string; icon: string; w?: number}> = ({at, t, icon, w = 760}) => {
  const c = useSpring(at + 0.25, POP);
  return (
    <Pop at={at} x={-30} y={0}>
      <div style={card({width: w, padding: '18px 26px', borderRadius: 22, display: 'flex', alignItems: 'center', gap: 20, boxSizing: 'border-box'})}>
        <Tile name={icon} size={58} />
        <div style={{fontSize: 31, fontWeight: 600, flex: 1}}>{t}</div>
        <div style={{width: 44, height: 44, borderRadius: 44, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${c})`}}>
          <Icon name="check" size={26} color="#fff" stroke={3.2} />
        </div>
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
export const Cap6 = capitulo(6, 6);
const resumo = (n: number, k: number, at: number, texto: string): React.FC<P> => ({g0, dur}) => (
  <Scene dur={dur} push={0.03}>
    <Resumo at={b(k, at) - g0} texto={texto} n={n} />
  </Scene>
);

// =================== ABERTURA (bloco 0) ===================
export const Abertura: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const linha = ramp(tt, L(7.6), L(8.8), 0, 1);
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
      <Abs x={0} y={260} w={1920}>
        <Words text="Etapa 2 · [Implantar]" at={L(2.9)} size={104} />
      </Abs>
      <Abs x={960} y={520} center>
        <Pop at={L(3.9)} pop y={20}>
          <Badge text="Contrato assinado" ok size={30} />
        </Pop>
      </Abs>
      <Abs x={960} y={740} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
          <Pop at={L(7.3)} pop y={30}>
            <Clinica size={1.05} sub="operação de vendas" />
          </Pop>
          <div style={{width: 160 * linha, height: 5, borderRadius: 5, background: C.grad}} />
          <Pop at={L(8.9)} pop y={30}>
            <div style={card({padding: '22px 34px', display: 'flex', alignItems: 'center', gap: 16, borderRadius: 26})}>
              <div style={{width: 78, height: 78, borderRadius: 22, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={40} color="#fff" iconOnly />
              </div>
              <div style={{fontSize: 38, fontWeight: 700}}>dentro da Clint</div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Sparkle x={1500} y={300} at={L(3.2)} />
    </Scene>
  );
};

export const Mapa: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const quando = [14.4, 15.15, 16.1, 17.11, 17.75, 18.55];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={250} center>
        <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
          {[1, 2, 3].map((r, i) => (
            <Pop key={r} at={L(9.8) + i * 0.15} pop y={20}>
              <Chip icon="users" text={`Reunião ${r}`} size={30} />
            </Pop>
          ))}
          <Pop at={L(11.8)} pop y={20}>
            <div style={{padding: '14px 28px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 30, fontWeight: 700, whiteSpace: 'nowrap'}}>+ seu trabalho entre elas</div>
          </Pop>
        </div>
      </Abs>
      <Abs x={0} y={400} w={1920}>
        <Words text="Em [seis passos]" at={L(13.2)} size={70} />
      </Abs>
      <Abs x={960} y={700} center>
        <div style={{display: 'flex', gap: 18}}>
          {PASSOS.map((p, i) => (
            <Pop key={p} at={L(quando[i])} pop y={30}>
              <div style={card({width: 250, padding: '28px 12px', borderRadius: 26, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, boxSizing: 'border-box'})}>
                <div style={{width: 62, height: 62, borderRadius: 62, background: C.grad, color: '#fff', fontSize: 30, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                <div style={{fontSize: 27, fontWeight: 600, whiteSpace: 'nowrap'}}>{p}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

export const Resultado: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={250} w={1920}>
        <Words text="No [final:]" at={L(19.85)} size={86} />
      </Abs>
      <Abs x={960} y={580} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          <Item at={L(20.4)} t="O time da clínica usando a Clint" icon="users" w={900} />
          <Item at={L(22.5)} t="A primeira campanha rodando" icon="message" w={900} />
        </div>
      </Abs>
    </Scene>
  );
};

// =================== PASSO 1 · KICK-OFF (bloco 1) ===================
export const KickOff: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const risca = ramp(tt, L(b(1, 6.5)), L(b(1, 7.2)), 0, 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="A 1ª reunião depois do contrato" at={L(b(1, 1.9))} size={68} stagger={0.05} />
      </Abs>
      <Abs x={960} y={290} center>
        <Pop at={L(b(1, 4.2))} pop y={20}>
          <Badge text="a mais importante da etapa" grad icon="star" size={30} />
        </Pop>
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 60, alignItems: 'center'}}>
          <Pop at={L(b(1, 6.0))} pop y={30}>
            <div style={{position: 'relative', opacity: 1 - 0.4 * risca}}>
              <div style={card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap'})}>
                <Tile name="smartphone" size={78} color={C.muted} tint="#F1F0F5" />
                <div style={{fontSize: 42, fontWeight: 700, color: C.muted}}>Mostrar a plataforma</div>
              </div>
              <div style={{position: 'absolute', left: 20, right: 20, top: '50%', height: 6, borderRadius: 6, background: C.red, transformOrigin: 'left', transform: `scaleX(${risca})`}} />
            </div>
          </Pop>
          <Pop at={L(b(1, 7.9))} pop y={30}>
            <div style={{...card({padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 20, whiteSpace: 'nowrap'}), boxShadow: `0 0 0 5px rgba(31,180,90,0.35), ${C.shadow}`}}>
              <Tile name="search" size={78} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 42, fontWeight: 700}}>Levantar tudo</div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

export const TresPessoas: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const pessoas = [
    {at: 12.4, t: 'Quem cuida do time de vendas', icon: 'users'},
    {at: 14.5, t: 'Quem cuida da parte técnica e dá os acessos', icon: 'lock'},
    {at: 16.5, t: 'Quem decide', icon: 'star'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Chame [três pessoas]" at={L(b(1, 10.9))} size={76} />
      </Abs>
      <Abs x={960} y={540} center>
        <div style={{display: 'flex', gap: 26}}>
          {pessoas.map((p) => (
            <Pop key={p.t} at={L(b(1, p.at))} pop y={30}>
              <div style={card({width: 470, height: 300, padding: 34, borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, boxSizing: 'border-box', textAlign: 'center'})}>
                <ContactAvatar size={96} />
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <XIcon name={p.icon} size={30} color={C.purple} />
                  <div style={{fontSize: 30, fontWeight: 600, lineHeight: 1.25}}>{p.t}</div>
                </div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={870} center>
        <Pop at={L(b(1, 17.3))} pop y={20}>
          <Badge text="Se faltar alguém, remarque" icon="calendar" size={32} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Pedir: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Peça [tudo de uma vez]" at={L(b(1, 19.1))} size={74} />
      </Abs>
      <Abs x={960} y={590} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Item at={L(b(1, 20.9))} t="A tabela de preços" icon="doc" w={980} />
          <Item at={L(b(1, 22.3))} t="As mensagens que o time usa hoje" icon="message" w={980} />
          <Item at={L(b(1, 24.3))} t="A lista de contatos antigos" icon="users" w={980} />
          <Item at={L(b(1, 26.0))} t="Os acessos aos sistemas" icon="lock" w={980} />
          <Item at={L(b(1, 27.9))} t="As perguntas que os pacientes mais fazem" icon="help" w={980} />
        </div>
      </Abs>
    </Scene>
  );
};

export const ApiOficial: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={960} y={330} center>
        <Pop at={L(b(1, 30.2))} pop y={30}>
          <div style={card({padding: '34px 50px', display: 'flex', alignItems: 'center', gap: 26, borderRadius: 30})}>
            <div style={{width: 96, height: 96, borderRadius: 28, background: '#E7FFDB', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Img src={staticFile('whatsapp.svg')} style={{width: 56, height: 56}} />
            </div>
            <div>
              <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Peça também</div>
              <div style={{fontSize: 50, fontWeight: 700, letterSpacing: -1}}>
                A <Grad>API oficial</Grad> do WhatsApp
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={540} center>
        <div style={{display: 'flex', gap: 22}}>
          <Pop at={L(b(1, 33.2))} pop>
            <Chip icon="user" text="com um responsável" size={30} />
          </Pop>
          <Pop at={L(b(1, 34.3))} pop>
            <Chip icon="calendar" text="e um prazo" size={30} />
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={720} center>
        <Pop at={L(b(1, 34.9))} y={20}>
          <div style={{fontSize: 40, fontWeight: 600, color: C.muted}}>
            Sem ela, <b style={{color: C.text}}>não tem agente no WhatsApp</b>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={860} center>
        <Pop at={L(b(1, 37.3))} pop y={20}>
          <Badge text="o maior risco de atraso da etapa" size={32} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Manual: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const perg = [
    {at: 42.2, t: 'Até quanto o vendedor pode dar de desconto?'},
    {at: 44.7, t: 'Contra quem a clínica mais perde?'},
    {at: 46.8, t: 'O que conta como paciente qualificado?'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Pergunte o que vai para o [manual do time]" at={L(b(1, 39.0))} size={64} stagger={0.05} />
      </Abs>
      <Abs x={960} y={580} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          {perg.map((p) => (
            <Pop key={p.t} at={L(b(1, p.at))} pop y={24}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '22px 32px', borderRadius: 22, background: '#fff', boxShadow: C.shadowSm, fontSize: 36, fontWeight: 500}}>
                <XIcon name="help" size={36} color={C.purple} />
                {p.t}
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

export const Resumo1 = resumo(1, 1, 49.3, 'Você sai com [acessos, materiais e respostas.] O que não perguntar aqui, faz falta depois.');

// =================== PASSO 2 · CONFIGURAÇÃO (bloco 2) ===================
export const QuemMonta: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={190} w={1920}>
        <Words text="Quem monta é a [Aura]" at={L(b(2, 5.4))} size={92} />
      </Abs>
      <Abs x={960} y={600} center>
        <Pop at={L(b(2, 6.5))} pop y={30}>
          <div style={card({padding: '36px 50px', display: 'flex', alignItems: 'center', gap: 28, borderRadius: 34})}>
            <AuraTile size={110} />
            <div>
              <div style={{fontSize: 56, fontWeight: 700}}>Aura</div>
              <div style={{fontSize: 30, color: C.muted}}>a inteligência artificial da Clint</div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Sparkle x={1400} y={480} at={L(b(2, 6.8))} />
      <Sparkle x={460} y={700} at={L(b(2, 7.0))} size={22} color="#B7A8FF" />
    </Scene>
  );
};

export const TelaAura: React.FC<P> = ({g0, dur}) => (
  <TelaVideo g0={g0} dur={dur} src="g1_aura.mp4" legenda="Clint · Pedir para a Aura" chips={[{at: b(2, 9.4), t: 'Você descreve a clínica', icon: 'message'}]} />
);

export const TelaFunil: React.FC<P> = ({g0, dur}) => {
  const t = useSec();
  const p = useSpring(0);
  const pc = Math.min(p, 1);
  const outP = ramp(t, dur - 0.3, dur);
  const destaque = Math.min(useSpring(b(2, 12.4) - g0), 1);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Ela cria o [funil de vendas]" at={b(2, 12.0) - g0} size={72} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{opacity: pc * (1 - outP), transform: `translateY(${(1 - p) * 40}px)`}}>
          <div style={{borderRadius: 28, overflow: 'hidden', background: '#1A1A1D', padding: '30px 40px', boxShadow: `0 0 0 ${5 * destaque}px rgba(242,127,181,0.45), 0 60px 120px -40px rgba(60,35,150,0.45)`}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18}}>
              <AuraTile size={44} />
              <div style={{color: '#fff', fontSize: 26, fontWeight: 600}}>Aura</div>
            </div>
            <Img src={staticFile(`${PASTA}/g4_funil_etapas.png`)} style={{width: 1400, display: 'block'}} />
          </div>
        </div>
      </Abs>
    </Scene>
  );
};

export const TelaAutomacao: React.FC<P> = ({g0, dur}) => (
  <TelaVideo g0={g0} dur={dur} src="g3_automacao.mp4" legenda="Clint · Automações" chips={[{at: b(2, 13.2), t: 'Sequências, indicadores e automações', icon: 'history'}]} />
);

export const TelaAgente: React.FC<P> = ({g0, dur}) => (
  <TelaVideo g0={g0} dur={dur} src="g9_agente.mp4" legenda="Clint · Criar agente com a Aura" chips={[{at: b(2, 16.5), t: 'E o agente de atendimento', icon: 'message'}]} />
);

export const AuraVsAgente: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const seta = ramp(tt, L(b(2, 26.2)), L(b(2, 27.0)), 0, 1);
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={100} w={1920}>
        <Words text="Não confunda" at={L(b(2, 17.8))} size={76} />
      </Abs>
      <Abs x={180} y={270}>
        <Pop at={L(b(2, 18.7))} y={40}>
          <div style={card({width: 700, padding: 44, boxSizing: 'border-box', borderRadius: 34})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <AuraTile size={84} />
              <div style={{fontSize: 48, fontWeight: 700}}>A Aura</div>
            </div>
            <div style={{fontSize: 34, marginTop: 26, lineHeight: 1.35}}>
              conversa com <b>você</b>,<br />dentro da Clint
            </div>
            <div style={{display: 'flex', gap: 12, marginTop: 24}}>
              <Chip icon="user" text="parceiro" size={24} />
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1040} y={270}>
        <Pop at={L(b(2, 21.3))} y={40}>
          <div style={card({width: 700, padding: 44, boxSizing: 'border-box', borderRadius: 34})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <Tile name="message" size={84} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 48, fontWeight: 700}}>O agente</div>
            </div>
            <div style={{fontSize: 34, marginTop: 26, lineHeight: 1.35}}>
              conversa com os <b>pacientes</b>,<br />no WhatsApp e no Instagram
            </div>
            <div style={{display: 'flex', gap: 12, marginTop: 24}}>
              <Chip img="whatsapp.svg" text="WhatsApp" size={24} />
              <Chip icon="smartphone" text="Instagram" size={24} />
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={860} center>
        <div style={{opacity: seta, transform: `translateY(${(1 - seta) * 20}px)`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 36px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 36, fontWeight: 700, boxShadow: '0 20px 40px -14px rgba(140,90,240,0.6)'}}>
            A Aura é quem cria o agente <XIcon name="arrow" size={34} color="#fff" stroke={2.6} />
          </div>
        </div>
      </Abs>
    </Scene>
  );
};

export const Revisar: React.FC<P> = ({g0, dur}) => (
  <TelaVideo
    g0={g0}
    dur={dur}
    src="g6_config.mp4"
    legenda="Clint · Configuração do agente"
    chips={[
      {at: b(2, 28.1), t: 'Seu papel: revisar', icon: 'search'},
      {at: b(2, 29.6), t: 'O funil tem os nomes que a clínica usa?', icon: 'help'},
      {at: b(2, 32.4), t: 'O agente sabe os preços e as perguntas frequentes?', icon: 'help'},
      {at: b(2, 35.4), t: 'Sabe a hora de passar para uma pessoa?', icon: 'help'},
    ]}
  />
);

export const Testar: React.FC<P> = ({g0, dur}) => (
  <TelaVideo
    g0={g0}
    dur={dur}
    src="g6_teste.mp4"
    legenda="Clint · Testar o agente"
    chips={[
      {at: b(2, 38.4), t: 'Teste com conversas de verdade', icon: 'message'},
      {at: b(2, 41.1), t: 'O paciente irritado', icon: 'user'},
      {at: b(2, 42.3), t: 'O que só quer saber o preço', icon: 'user'},
      {at: b(2, 43.9), t: 'O que não tem perfil', icon: 'user'},
    ]}
  />
);

export const Conectar: React.FC<P> = ({g0, dur}) => <VideoCheio g0={g0} dur={dur} src="yt_conexoes.mp4" chip={{at: b(2, 46.0), t: 'Depois, conecte o resto', icon: 'arrow'}} />;

export const Resumo2 = resumo(2, 2, 52.7, 'A [Aura monta,] e você [revisa e conecta.]');

// =================== PASSO 3 · OPERAÇÃO NO AR (bloco 3) ===================
export const NoAr: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.04}>
      <Abs x={0} y={250} w={1920}>
        <Words text="Reunião 2: agora sim, [você mostra]" at={L(b(3, 2.0))} size={76} stagger={0.06} />
      </Abs>
      <Abs x={960} y={620} center>
        <div style={{display: 'flex', gap: 26}}>
          <Pop at={L(b(3, 5.6))} pop>
            <Chip icon="check" text="tudo funcionando" color={C.green} tint={C.greenTint} size={34} />
          </Pop>
          <Pop at={L(b(3, 6.5))} pop>
            <Chip icon="users" text="testando ao vivo com o cliente" size={34} />
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

export const Teste1 = (({g0, dur}) => <VideoCheio g0={g0} dur={dur} src="yt_inbox.mp4" chip={{at: b(3, 8.4), t: '1 · Mande uma mensagem e veja chegar', icon: 'message'}} />) as React.FC<P>;
export const Teste2 = (({g0, dur}) => <VideoCheio g0={g0} dur={dur} src="yt_funil.mp4" chip={{at: b(3, 12.1), t: '2 · O contato cai no funil, com o vendedor certo', icon: 'users'}} />) as React.FC<P>;
export const Teste3 = (({g0, dur}) => <VideoCheio g0={g0} dur={dur} src="yt_agente.mp4" chip={{at: b(3, 16.2), t: '3 · Converse com o agente como paciente', icon: 'smartphone'}} />) as React.FC<P>;

export const Campanha: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const carimbo = useSpring(L(b(3, 33.9)), POP);
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={100} w={1920}>
        <Words text="Ajuste na hora, e apresente a [campanha]" at={L(b(3, 23.4))} size={64} stagger={0.05} />
      </Abs>
      <Abs x={960} y={580} center>
        <Pop at={L(b(3, 26.1))} y={40}>
          <div style={{...card({width: 1100, padding: 46, boxSizing: 'border-box', borderRadius: 34}), position: 'relative'}}>
            <div style={{fontSize: 24, color: C.purple, fontWeight: 600, letterSpacing: 1}}>CAMPANHA DE ATIVAÇÃO · CLÍNICA SORRISO</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24}}>
              {[
                {at: 28.1, k: 'Para quem vai', v: 'pacientes antigos e orçamentos não fechados'},
                {at: 29.0, k: 'O que diz', v: '“Faz tempo que você não vem! Que tal uma avaliação?”'},
                {at: 29.8, k: 'O que o agente faz', v: 'conversa com quem responder até marcar'},
              ].map((r) => (
                <Pop key={r.k} at={L(b(3, r.at))} x={-20} y={0}>
                  <div style={{display: 'flex', gap: 20, fontSize: 30, padding: '14px 20px', borderRadius: 16, background: '#F7F6FB'}}>
                    <b style={{width: 290, flexShrink: 0}}>{r.k}</b>
                    <span style={{color: C.muted}}>{r.v}</span>
                  </div>
                </Pop>
              ))}
            </div>
            <div style={{position: 'absolute', right: -30, top: -34, transform: `scale(${carimbo}) rotate(${(1 - Math.min(carimbo, 1)) * -20 + 6}deg)`}}>
              <div style={{padding: '14px 30px', borderRadius: 16, background: C.green, color: '#fff', fontSize: 34, fontWeight: 700, boxShadow: '0 18px 36px -12px rgba(31,180,90,0.6)'}}>APROVADA PELO CLIENTE</div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={930} center>
        <Pop at={L(b(3, 31.8))} y={14}>
          <div style={{fontSize: 30, color: C.muted, fontWeight: 500}}>sai no nome da clínica, então o cliente aprova aqui</div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Atraso: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={220} w={1920}>
        <Words text="E se a [API oficial] atrasar?" at={L(b(3, 34.8))} size={76} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center'}}>
          <Pop at={L(b(3, 36.9))} pop>
            <Badge text="A reunião acontece mesmo assim, com o que estiver pronto" ok icon="check" size={32} />
          </Pop>
          <Pop at={L(b(3, 40.0))} pop>
            <Chip icon="clock" text="O agente entra depois" size={34} />
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

export const Resumo3 = resumo(3, 3, 41.5, 'O cliente vê [tudo funcionando,] aprova a campanha, e a [3ª reunião] fica marcada.');

// =================== PASSO 4 · PLAYBOOK (bloco 4) ===================
export const Playbook: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const secoes = [
    {at: 10.3, t: 'Quem é a clínica e o que vende'},
    {at: 12.8, t: 'O paciente ideal'},
    {at: 14.0, t: 'Cada etapa do funil'},
    {at: 16.0, t: 'Quem faz o quê'},
    {at: 17.1, t: 'As mensagens prontas'},
    {at: 18.2, t: 'As respostas para as objeções'},
    {at: 20.4, t: 'As rotinas do time'},
  ];
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={90} w={1920}>
        <Words text="O [manual de vendas] da clínica" at={L(b(4, 1.9))} size={66} stagger={0.05} />
      </Abs>
      <Abs x={140} y={240}>
        <Pop at={L(b(4, 3.6))} x={-40} y={0}>
          <div style={{borderRadius: 26, overflow: 'hidden', width: 820, boxShadow: '0 60px 120px -40px rgba(60,35,150,0.45)'}}>
            <Img src={staticFile(`${PASTA}/pb1.png`)} style={{width: 820, display: 'block'}} />
          </div>
          <Pop at={L(b(4, 8.3))} y={14}>
            <div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, fontWeight: 600, color: C.muted}}>
              <Icon name="doc" size={26} color={C.purple} /> use o modelo dos materiais
            </div>
          </Pop>
        </Pop>
      </Abs>
      <Abs x={1040} y={240}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {secoes.map((s, i) => (
            <Pop key={s.t} at={L(b(4, s.at))} x={-30} y={0}>
              <div style={card({width: 740, padding: '16px 24px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 18, boxSizing: 'border-box'})}>
                <div style={{width: 46, height: 46, borderRadius: 46, background: C.grad, color: '#fff', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
                <div style={{fontSize: 30, fontWeight: 600}}>{s.t}</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
    </Scene>
  );
};

export const Resumo4 = resumo(4, 4, 21.5, 'O playbook é o que o time [consulta quando tiver dúvida.]');

// =================== PASSO 5 · TREINAMENTO E ROTINAS (bloco 5) ===================
export const Treino: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={100} w={1920}>
        <Words text="Reunião 3: cada um treina [o que faz]" at={L(b(5, 3.1))} size={64} stagger={0.05} />
      </Abs>
      <Abs x={960} y={380} center>
        <div style={{display: 'flex', gap: 30}}>
          <Pop at={L(b(5, 8.8))} pop y={30}>
            <div style={card({padding: '24px 34px', display: 'flex', alignItems: 'center', gap: 18, borderRadius: 26})}>
              <ContactAvatar size={70} />
              <div>
                <div style={{fontSize: 34, fontWeight: 700}}>Vendedor</div>
                <div style={{fontSize: 24, color: C.muted}}>no fluxo do vendedor</div>
              </div>
            </div>
          </Pop>
          <Pop at={L(b(5, 10.8))} pop y={30}>
            <div style={card({padding: '24px 34px', display: 'flex', alignItems: 'center', gap: 18, borderRadius: 26})}>
              <ContactAvatar size={70} style={{background: 'linear-gradient(160deg, #B7A8FF 0%, #6D5DF6 100%)'}} />
              <div>
                <div style={{fontSize: 34, fontWeight: 700}}>Gestor</div>
                <div style={{fontSize: 24, color: C.muted}}>no fluxo do gestor</div>
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
      <Abs x={0} y={540} w={1920}>
        <Pop at={L(b(5, 12.8))} y={14}>
          <div style={{textAlign: 'center', fontSize: 40, fontWeight: 700}}>
            É <Grad>nível botão</Grad>:
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={700} center>
        <div style={{display: 'flex', gap: 22}}>
          <Pop at={L(b(5, 13.8))} pop>
            <Chip icon="check" text="onde clica" size={30} />
          </Pop>
          <Pop at={L(b(5, 14.9))} pop>
            <Chip icon="search" text="onde consulta" size={30} />
          </Pop>
          <Pop at={L(b(5, 15.8))} pop>
            <Chip icon="chart" text="onde vê os números" size={30} />
          </Pop>
        </div>
      </Abs>
      <Abs x={960} y={880} center>
        <Pop at={L(b(5, 17.5))} pop y={20}>
          <Badge text="Cada um faz ao vivo, enquanto você corrige" grad icon="users" size={30} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Rotinas: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const rot = [
    {at: 27.4, t: 'Reunião diária', q: 'todo dia'},
    {at: 28.5, t: 'Reunião semanal', q: 'toda semana'},
    {at: 29.9, t: 'Acompanhamento de ligações', q: 'toda semana'},
    {at: 31.7, t: 'Treino simulado', q: 'toda semana'},
    {at: 33.1, t: 'Conversa individual', q: 'com cada pessoa'},
  ];
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={90} w={1920}>
        <Words text="Coloque [5 rotinas] na agenda" at={L(b(5, 22.3))} size={66} />
      </Abs>
      <Abs x={960} y={230} center>
        <Pop at={L(b(5, 21.0))} pop>
          <Chip icon="book" text="Playbook entregue" color={C.green} tint={C.greenTint} size={28} />
        </Pop>
      </Abs>
      <Abs x={960} y={590} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {rot.map((r) => (
            <Pop key={r.t} at={L(b(5, r.at))} x={-30} y={0}>
              <div style={card({width: 1100, padding: '18px 28px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 20, boxSizing: 'border-box'})}>
                <Tile name="calendar" size={56} />
                <div style={{fontSize: 32, fontWeight: 600, flex: 1}}>{r.t}</div>
                <div style={{fontSize: 24, color: C.muted, fontWeight: 500}}>{r.q} · dia, hora e responsável</div>
              </div>
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(b(5, 37.1))} pop y={20}>
          <Badge text="Sem rotinas, o time para de usar em 2 semanas" size={30} />
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Resumo5 = resumo(5, 5, 41.7, 'Cada um sabe [o que fazer,] e as rotinas estão [na agenda.]');

// =================== PASSO 6 · CAMPANHA DE ATIVAÇÃO (bloco 6) ===================
export const Ativacao: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const marcou = useSpring(L(b(6, 18.8)), POP);
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={90} w={1920}>
        <Words text="A primeira entrega que [dá resultado]" at={L(b(6, 2.7))} size={64} stagger={0.05} />
      </Abs>
      <Abs x={150} y={250}>
        <Pop at={L(b(6, 4.9))} y={40}>
          <div style={card({width: 640, padding: 38, boxSizing: 'border-box'})}>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>Quem já conhece a clínica, mas está parado</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20}}>
              <Pop at={L(b(6, 9.0))} x={-20} y={0}>
                <Chip icon="users" text="Quem já foi paciente" size={28} />
              </Pop>
              <Pop at={L(b(6, 10.5))} x={-20} y={0}>
                <Chip icon="doc" text="Pediu orçamento e não fechou" size={28} />
              </Pop>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={830} y={330}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Pop at={L(b(6, 12.9))} x={-20} y={0}>
            <Chip img="whatsapp.svg" text="WhatsApp" size={28} />
          </Pop>
          <Pop at={L(b(6, 13.8))} x={-20} y={0}>
            <Chip icon="message" text="SMS" size={28} />
          </Pop>
          <Pop at={L(b(6, 15.1))} x={-20} y={0}>
            <Chip icon="phone" text="Ligação de voz" size={28} />
          </Pop>
        </div>
      </Abs>
      <Abs x={1200} y={250}>
        <Pop at={L(b(6, 16.3))} y={40}>
          <div style={card({width: 580, padding: 30, boxSizing: 'border-box'})}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
              <Tile name="message" size={48} color={C.green} tint={C.greenTint} />
              <div style={{fontSize: 26, fontWeight: 700}}>O agente conversa</div>
            </div>
            <div style={{background: '#EFEAE2', borderRadius: 18, padding: 18, display: 'flex', flexDirection: 'column', gap: 10}}>
              <Bubble text="Oi! Faz tempo que você não vem 😊 Quer marcar uma avaliação?" w={460} />
              <div style={{alignSelf: 'flex-end'}}>
                <Bubble text="Quero sim! Sábado dá?" me w={340} />
              </div>
            </div>
            <div style={{marginTop: 16, transform: `scale(${marcou})`, transformOrigin: 'left'}}>
              <Badge text="Consulta marcada" ok size={26} />
            </div>
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

export const Checagens: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  return (
    <Scene dur={dur} push={0.02}>
      <Abs x={0} y={110} w={1920}>
        <Words text="Antes de disparar, [3 checagens]" at={L(b(6, 20.0))} size={66} />
      </Abs>
      <Abs x={960} y={560} center>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <Item at={L(b(6, 22.4))} t="O time já foi treinado (se vai receber conversas)" icon="users" w={1200} />
          <Item at={L(b(6, 26.6))} t="Lista de quem já falou com a clínica, nunca comprada" icon="doc" w={1200} />
          <Item at={L(b(6, 31.1))} t="Número saudável e empresa verificada na Meta" icon="shield" w={1200} />
        </div>
      </Abs>
    </Scene>
  );
};

export const Resumo6 = resumo(6, 6, 35.2, 'Usa contatos que a clínica [já tem,] e mostra resultado na [primeira semana.]');

// =================== FECHAMENTO (bloco 7) ===================
export const Fim: React.FC<P> = ({g0, dur}) => {
  const L = (t: number) => t - g0;
  const tt = useSec();
  const dark = ramp(tt, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={0} y={150} w={1920}>
        <Words text="Time usando a Clint, [campanha rodando]" at={L(b(7, 0.1))} size={62} stagger={0.05} />
      </Abs>
      <Abs x={960} y={480} center>
        <Trilha atual={7} at={L(b(7, 5.4))} />
      </Abs>
      <Abs x={960} y={760} center>
        <Pop at={L(b(7, 10.3))} pop y={20}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '18px 36px', borderRadius: 99, background: C.grad, color: '#fff', fontSize: 38, fontWeight: 700, boxShadow: '0 20px 40px -14px rgba(140,90,240,0.6)'}}>
            7 dias depois: Etapa 3 · Evoluir <XIcon name="arrow" size={36} color="#fff" stroke={2.6} />
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(b(7, 12.0))} y={10}>
          <Logo height={40} />
        </Pop>
      </Abs>
      <Sparkle x={400} y={380} at={L(b(7, 9.5))} />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};

