import React from 'react';
import {AbsoluteFill, Easing, Sequence} from 'remotion';
import {C} from '../../theme';
import {Abs, Background, Cursor, Eyebrow, Grad, Icon, IconTile, Logo, Pop, POP, Scene, Sparkle, Toggle, Words, card, ramp, useSec, useSpring} from '../../ui';

// Vídeo tutorial do próprio kit (~57 s). Tempos das palavras em projetos/2026-10-06-tutorial-video-studio/entrada/narracao.palavras.txt
export const TUTORIAL_DUR = 51.4;

const mk = (g0: number) => (s: number) => s - g0;

// ---------- peças locais ----------
const Chip: React.FC<{icon: React.ReactNode; text: string; tint?: string}> = ({icon, text, tint = C.purpleTint}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 24px 12px 12px',
      borderRadius: 99,
      background: '#fff',
      boxShadow: C.shadowSm,
      border: `1px solid ${C.line}`,
      fontSize: 26,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}
  >
    <div style={{width: 42, height: 42, borderRadius: 42, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    {text}
  </div>
);

const Svg: React.FC<{d: React.ReactNode; size?: number; color?: string; stroke?: number}> = ({d, size = 28, color = C.purple, stroke = 2}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const FOLDER = <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
const WINDOW = (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </>
);
const PLUG = <path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5" />;
const FILM = (
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </>
);
const WAVE = <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0" />;
const PEN = <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />;

const ClaudeWindow: React.FC<{w: number; h: number; children: React.ReactNode}> = ({w, h, children}) => (
  <div style={card({width: w, height: h, borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column'})}>
    <div style={{height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', borderBottom: `1px solid ${C.line}`, background: '#F7F6FB'}}>
      {['#FF6159', '#FFBD2E', '#28C941'].map((c) => (
        <div key={c} style={{width: 14, height: 14, borderRadius: 14, background: c}} />
      ))}
      <div style={{marginLeft: 16, fontSize: 19, color: C.muted, fontWeight: 500}}>Claude Code · clint-video-studio</div>
    </div>
    <div style={{flex: 1, position: 'relative', padding: 28}}>{children}</div>
  </div>
);

const typed = (t: number, a: number, b: number, text: string) => text.slice(0, Math.round(ramp(t, a, b, 0, text.length, Easing.linear)));
const Caret: React.FC = () => {
  const t = useSec();
  return <span style={{display: 'inline-block', width: 3, height: '1em', background: C.purple, marginLeft: 3, verticalAlign: '-0.15em', opacity: Math.floor(t * 2.5) % 2 ? 0 : 1}} />;
};

// ============ 1. Abertura ============
const Abertura: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const segs: [string, number][] = [['c', 2], ['t', 7], ['c', 4], ['c', 5], ['t', 10], ['c', 4], ['t', 14], ['c', 6], ['t', 9], ['c', 5], ['v', 4]];
  const tot = segs.reduce((a, s) => a + s[1], 0);
  const fill = ramp(t, L(1.6), L(3.9), 0, 1, Easing.inOut(Easing.cubic));
  let acc = 0;
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={250} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 28}}>
          <Pop at={L(0.25)} pop y={14}>
            <Eyebrow>Novidade para o time</Eyebrow>
          </Pop>
        </div>
        <Words text="Clint [Video Studio]" at={L(0.5)} size={104} stagger={0.12} />
      </Abs>
      <Abs x={960} y={700} center>
        <Pop at={L(1.4)} y={30}>
          <div style={{width: 1100, height: 70, borderRadius: 16, background: C.line, display: 'flex', gap: 4, padding: 4, boxSizing: 'border-box', overflow: 'hidden'}}>
            {segs.map(([k, d], i) => {
              const start = acc / tot;
              acc += d;
              const on = ramp(fill, start, start + 0.12);
              const bg = k === 't' ? '#2B2838' : k === 'c' ? '#B9AFFF' : '#0F0D18';
              return <div key={i} style={{flex: d, borderRadius: 10, background: bg, opacity: on, transform: `scaleY(${0.4 + 0.6 * on})`}} />;
            })}
          </div>
        </Pop>
      </Abs>
      <Abs x={960} y={800} center>
        <div style={{display: 'flex', gap: 28, fontSize: 22, color: C.muted, opacity: ramp(t, L(2.2), L(2.6))}}>
          <span>■ telas</span>
          <span style={{color: '#8C80F5'}}>■ animações</span>
          <span>■ vinheta</span>
        </div>
      </Abs>
      <Abs x={1360} y={110}>
        <Pop at={L(3.8)} pop x={-20} y={0}>
          <Chip icon={<Svg d={PEN} size={22} />} text="com o Claude" />
        </Pop>
      </Abs>
      <Sparkle x={500} y={260} at={L(0.9)} />
      <Sparkle x={1450} y={430} at={L(1.1)} size={22} color="#B7A8FF" />
    </Scene>
  );
};

// ============ 2. Prepare o computador ============
const Passo: React.FC<{n: number; at: number; icon: React.ReactNode; titulo: string; sub: React.ReactNode}> = ({n, at, icon, titulo, sub}) => (
  <Pop at={at} y={60}>
    <div style={card({width: 470, height: 360, borderRadius: 30, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative'})}>
      <div style={{position: 'absolute', top: 26, right: 30, fontSize: 22, fontWeight: 600, color: C.faint}}>{n}/3</div>
      <div style={{width: 84, height: 84, borderRadius: 24, background: C.purpleTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      <div style={{fontSize: 36, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15}}>{titulo}</div>
      <div style={{fontSize: 23, color: C.muted}}>{sub}</div>
    </div>
  </Pop>
);

const Setup: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const ok = useSpring(L(14.55), POP);
  return (
    <Scene dur={dur}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Prepare o computador [uma vez]" at={L(5.0)} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 44}}>
          <Passo n={1} at={L(8.6)} icon={<Svg d={FOLDER} size={42} />} titulo="Baixe a pasta" sub={<>clint-video-studio<br />do Drive do time</>} />
          <Passo n={2} at={L(11.45)} icon={<Svg d={WINDOW} size={42} />} titulo="Abra no Claude Code" sub="Aba Code › escolher pasta" />
          <Pop at={L(13.3)} y={60}>
            <div style={card({width: 470, height: 360, borderRadius: 30, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative'})}>
              <div style={{position: 'absolute', top: 26, right: 30, fontSize: 22, fontWeight: 600, color: C.faint}}>3/3</div>
              <div style={{fontSize: 36, fontWeight: 600, letterSpacing: -0.6}}>Peça ao Claude</div>
              <div style={{alignSelf: 'flex-end', background: C.purpleTint, color: C.purpleDeep, borderRadius: 20, borderBottomRightRadius: 6, padding: '16px 22px', fontSize: 30, fontWeight: 500, minHeight: 40}}>
                {typed(t, L(13.75), L(14.3), 'rode o setup')}
                {t < L(14.5) && <Caret />}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.green, fontWeight: 600, opacity: Math.min(ok, 1), transform: `scale(${0.8 + 0.2 * Math.min(ok, 1.1)})`, transformOrigin: 'left center', marginTop: 'auto'}}>
                <div style={{width: 38, height: 38, borderRadius: 38, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="check" size={22} color="#fff" stroke={3.4} />
                </div>
                Tudo instalado
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};


// ============ 2. Para começar (abrir a pasta · o Claude prepara · login) ============
const Comeco: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const prog = ramp(t, L(10.7), L(12.6), 0, 1, Easing.inOut(Easing.quad));
  const pronto = useSpring(L(12.7), POP);
  const login = useSpring(L(14.6), POP);
  return (
    <Scene dur={dur}>
      <Abs x={0} y={130} w={1920}>
        <Words text="Para [começar]" at={L(4.9)} />
      </Abs>
      <Abs x={960} y={600} center>
        <div style={{display: 'flex', gap: 44}}>
          <Passo n={1} at={L(5.85)} icon={<Svg d={FOLDER} size={42} />} titulo="Abra a pasta no Claude Code" sub="clint-video-studio" />
          <Pop at={L(9.3)} y={60}>
            <div style={card({width: 470, height: 360, borderRadius: 30, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative'})}>
              <div style={{position: 'absolute', top: 26, right: 30, fontSize: 22, fontWeight: 600, color: C.faint}}>2/3</div>
              <div style={{width: 84, height: 84, borderRadius: 24, background: C.purpleTint, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Svg d={WINDOW} size={42} />
              </div>
              <div style={{fontSize: 36, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15}}>O Claude prepara o computador</div>
              <div style={{height: 14, borderRadius: 14, background: '#EEEDF4', overflow: 'hidden', marginTop: 'auto'}}>
                <div style={{height: '100%', width: `${prog * 100}%`, borderRadius: 14, background: C.grad}} />
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 600, color: pronto > 0.1 ? C.green : C.muted}}>
                {pronto > 0.1 ? (
                  <>
                    <div style={{width: 30, height: 30, borderRadius: 30, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(pronto, 1.1)})`}}>
                      <Icon name="check" size={18} color="#fff" stroke={3.4} />
                    </div>
                    Tudo pronto
                  </>
                ) : (
                  'Preparando… (só na 1ª vez)'
                )}
              </div>
            </div>
          </Pop>
          <Pop at={L(13.45)} y={60}>
            <div style={card({width: 470, height: 360, borderRadius: 30, padding: 36, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative'})}>
              <div style={{position: 'absolute', top: 26, right: 30, fontSize: 22, fontWeight: 600, color: C.faint}}>3/3</div>
              <div style={{width: 84, height: 84, borderRadius: 24, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={44} color="#fff" iconOnly />
              </div>
              <div style={{fontSize: 36, fontWeight: 600, letterSpacing: -0.6, lineHeight: 1.15}}>Login na Clint</div>
              <div style={{fontSize: 23, color: C.muted}}>Só quando o Claude pedir</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 600, color: C.green, marginTop: 'auto', opacity: Math.min(login, 1)}}>
                <div style={{width: 30, height: 30, borderRadius: 30, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.min(login, 1.1)})`}}>
                  <Icon name="check" size={18} color="#fff" stroke={3.4} />
                </div>
                Conectado
              </div>
            </div>
          </Pop>
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 3. Conecte o HeyGen (não usada no tutorial atual) ============
const HeyGen: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const on = useSpring(L(16.05), {damping: 18, stiffness: 200, mass: 0.6});
  return (
    <Scene dur={dur}>
      <Abs x={0} y={140} w={1920}>
        <Words text="Conecte o [HeyGen]" at={L(15.0)} />
      </Abs>
      <Abs x={860} y={560} center>
        <Pop at={L(15.1)} y={50}>
          <div style={card({width: 760, padding: 36, borderRadius: 30, boxSizing: 'border-box'})}>
            <div style={{fontSize: 22, color: C.muted, marginBottom: 22}}>Configurações › Conectores</div>
            {[
              {n: 'HeyGen', d: 'Narração e trilhas', main: true},
              {n: 'Google Drive', d: 'Arquivos', main: false},
            ].map((r) => (
              <div key={r.n} style={{display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderTop: `1px solid ${C.line}`, opacity: r.main ? 1 : 0.45}}>
                <IconTile name={r.main ? 'mic' : 'doc'} size={60} />
                <div style={{flex: 1}}>
                  <div style={{fontSize: 30, fontWeight: 600}}>{r.n}</div>
                  <div style={{fontSize: 21, color: C.muted}}>{r.d}</div>
                </div>
                <Toggle on={r.main ? on : 0} />
              </div>
            ))}
          </div>
        </Pop>
      </Abs>
      <Abs x={1300} y={420}>
        <Pop at={L(16.4)} pop x={-30} y={0}>
          <Chip icon={<Icon name="mic" size={22} color={C.purple} />} text="Narração" />
        </Pop>
      </Abs>
      <Abs x={1300} y={540}>
        <Pop at={L(16.7)} pop x={-30} y={0}>
          <Chip icon={<Svg d={WAVE} size={22} />} text="Trilhas" />
        </Pop>
      </Abs>
      <Cursor pts={[{t: L(15.3), x: 1500, y: 950}, {t: L(15.95), x: 1135, y: 545}, {t: L(18.0), x: 1150, y: 570}]} clicks={[L(16.0)]} />
    </Scene>
  );
};

// ============ 4. /video-lancamento ============
const Comando: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const cmd = typed(t, L(17.85), L(19.5), '/video-lancamento');
  const ideia = typed(t, L(20.05), L(21.4), ' Quero um vídeo da nova função de ligação por WhatsApp…');
  const pop = useSpring(L(18.1));
  const popOut = useSpring(L(19.8));
  const chips = [
    {at: L(21.9), t: 'Qual funcionalidade', i: 'smartphone'},
    {at: L(23.1), t: 'Para quem é', i: 'users'},
    {at: L(24.6), t: 'O que precisa aprender', i: 'book'},
  ];
  return (
    <Scene dur={dur} push={0.03}>
      <Abs x={0} y={95} w={1920}>
        <Words text="Digite [/video-lancamento]" at={L(16.0)} />
      </Abs>
      <Abs x={170} y={240}>
        <Pop at={L(16.1)} y={60}>
          <ClaudeWindow w={1080} h={680}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 16, color: C.muted, fontSize: 22}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div style={{width: 34, height: 34, borderRadius: 10, background: '#D97757'}} />
                O que vamos criar hoje?
              </div>
            </div>
            {/* autocompletar */}
            <div
              style={{
                position: 'absolute',
                left: 28,
                right: 28,
                bottom: 150,
                opacity: Math.min(pop, 1) * (1 - Math.min(popOut, 1)),
                transform: `translateY(${(1 - pop) * 14}px)`,
                background: '#fff',
                border: `1px solid ${C.line}`,
                borderRadius: 16,
                boxShadow: C.shadowSm,
                padding: 10,
              }}
            >
              {[
                {k: '/video-lancamento', d: 'Vídeo de lançamento Clint', on: true},
                {k: '/gif-produto', d: 'GIF curto de produto', on: false},
              ].map((r) => (
                <div key={r.k} style={{display: 'flex', gap: 18, alignItems: 'baseline', padding: '12px 16px', borderRadius: 10, background: r.on ? C.purpleTint : 'transparent'}}>
                  <span style={{fontFamily: 'Menlo, monospace', fontSize: 24, color: r.on ? C.purpleDeep : C.text, fontWeight: 600}}>{r.k}</span>
                  <span style={{fontSize: 21, color: C.muted}}>{r.d}</span>
                </div>
              ))}
            </div>
            {/* campo de texto */}
            <div style={{position: 'absolute', left: 28, right: 28, bottom: 28, minHeight: 104, borderRadius: 18, border: `2px solid ${C.purple}`, padding: '20px 24px', boxSizing: 'border-box', fontSize: 27, lineHeight: 1.45}}>
              <span style={{fontFamily: 'Menlo, monospace', color: C.purpleDeep, fontWeight: 600, fontSize: 25}}>{cmd}</span>
              <span>{ideia}</span>
              <Caret />
            </div>
          </ClaudeWindow>
        </Pop>
      </Abs>
      {chips.map((c, i) => (
        <Abs key={i} x={1290} y={380 + i * 130}>
          <Pop at={c.at} pop x={-40} y={0}>
            <Chip icon={<Icon name={c.i} size={22} color={C.purple} />} text={c.t} />
          </Pop>
        </Abs>
      ))}
    </Scene>
  );
};

// ============ 5. O Claude produz ============
const Producao: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const linha = ramp(t, L(27.3), L(28.6));
  const sync = ['palavra', 'por', 'palavra'];
  const syncAt = [L(33.18), L(33.74), L(33.98)];
  const Etapa: React.FC<{at: number; titulo: string; children: React.ReactNode}> = ({at, titulo, children}) => (
    <Pop at={at} y={60}>
      <div style={card({width: 380, height: 360, borderRadius: 30, padding: 30, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 18})}>
        <div style={{fontSize: 30, fontWeight: 600}}>{titulo}</div>
        <div style={{flex: 1, position: 'relative'}}>{children}</div>
      </div>
    </Pop>
  );
  return (
    <Scene dur={dur}>
      <Abs x={0} y={110} w={1920}>
        <Words text="O Claude cuida da [produção]" at={L(26.1)} />
      </Abs>
      <Abs x={960} y={540} center>
        <div style={{display: 'flex', gap: 30}}>
          <Etapa at={L(27.1)} titulo="Roteiro">
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              {[1, 0.8, 0.95, 0.6, 0.85].map((w, i) => (
                <div key={i} style={{height: 14, borderRadius: 14, background: '#EEEDF4', overflow: 'hidden'}}>
                  <div style={{height: '100%', width: `${100 * w * ramp(linha, i / 5, (i + 1) / 5)}%`, background: '#CFC8FF', borderRadius: 14}} />
                </div>
              ))}
            </div>
          </Etapa>
          <Etapa at={L(28.25)} titulo="Narração">
            <div style={{display: 'flex', alignItems: 'center', gap: 5, height: '100%'}}>
              {Array.from({length: 22}).map((_, i) => {
                const a = t > L(28.5) ? 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7 + t * 6)) : 0.1;
                return <div key={i} style={{flex: 1, height: `${a * 100}%`, borderRadius: 6, background: i % 5 === 0 ? C.purple : '#CFC8FF'}} />;
              })}
            </div>
          </Etapa>
          <Etapa at={L(29.6)} titulo="Telas da Clint">
            <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: '#16141F', overflow: 'hidden'}}>
              <div style={{position: 'absolute', top: 12, left: 14, display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 16, fontWeight: 600}}>
                <div style={{width: 12, height: 12, borderRadius: 12, background: C.red, opacity: Math.floor(t * 2) % 2 ? 0.35 : 1}} />
                REC
              </div>
              <div style={{position: 'absolute', left: 14, right: 14, top: 44, bottom: 14, display: 'flex', gap: 10}}>
                <div style={{width: 60, borderRadius: 8, background: 'rgba(255,255,255,0.07)'}} />
                <div style={{flex: 1, borderRadius: 8, background: 'rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: 10, padding: 12}}>
                  {[0.8, 0.55, 0.7, 0.4].map((w, i) => (
                    <div key={i} style={{height: 12, width: `${w * 100}%`, borderRadius: 12, background: 'rgba(143,132,247,0.4)'}} />
                  ))}
                </div>
              </div>
            </div>
          </Etapa>
          <Etapa at={L(31.3)} titulo="Animações">
            <div style={{position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(160deg,#F3EFFF,#FDEBF4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontSize: 26, fontWeight: 600, display: 'flex', gap: 7}}>
                {['Uma', 'diferença', 'grande'].map((w, i) => (
                  <Pop key={i} at={L(31.6) + i * 0.22} y={12} s={1} blur={6}>
                    {i === 2 ? <Grad>{w}</Grad> : w}
                  </Pop>
                ))}
              </div>
            </div>
          </Etapa>
        </div>
      </Abs>
      <Abs x={960} y={870} center>
        <Pop at={L(32.1)} y={20}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 600}}>
            <span style={{color: C.muted, fontWeight: 500, fontSize: 24}}>sincronizadas</span>
            {sync.map((w, i) => {
              const hit = t >= syncAt[i];
              return (
                <span key={i} style={{padding: '6px 18px', borderRadius: 12, background: hit ? C.purple : '#EEEDF4', color: hit ? '#fff' : C.muted, transform: `scale(${hit ? 1.06 : 1})`}}>
                  {w}
                </span>
              );
            })}
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ 6. Você só aprova ============
const Aprova: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const itens = [
    {k: 'Roteiro', d: 'O que o vídeo vai dizer', at: L(36.0)},
    {k: 'Prévias', d: 'Como as cenas vão ficar', at: L(36.75)},
  ];
  return (
    <Scene dur={dur}>
      <Abs x={0} y={170} w={1920}>
        <Words text="Você só [aprova]" at={L(34.8)} />
      </Abs>
      <Abs x={960} y={580} center>
        <Pop at={L(35.1)} y={60}>
          <div style={card({width: 760, padding: 40, borderRadius: 32, boxSizing: 'border-box'})}>
            {itens.map((it, k) => {
              const p = Math.min(Math.max((t - it.at) / 0.25, 0), 1);
              return (
                <div key={it.k} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '22px 0', borderTop: k ? `1px solid ${C.line}` : 'none'}}>
                  <div style={{width: 56, height: 56, borderRadius: 16, border: `3px solid ${p > 0.5 ? C.green : '#D3D1DE'}`, background: p > 0.5 ? C.green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
                    <div style={{transform: `scale(${p})`}}>
                      <Icon name="check" size={32} color="#fff" stroke={3.4} />
                    </div>
                  </div>
                  <div>
                    <div style={{fontSize: 38, fontWeight: 600, color: p > 0.5 ? C.text : C.muted}}>{it.k}</div>
                    <div style={{fontSize: 23, color: C.muted}}>{it.d}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ 7. Trilha, vinheta e checagens ============
const Entrega: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const segs: [string, number][] = [['c', 2], ['t', 7], ['c', 4], ['t', 10], ['c', 6], ['t', 9], ['c', 5]];
  const tot = segs.reduce((a, s) => a + s[1], 0);
  const vin = useSpring(L(39.7), POP);
  const file = useSpring(L(43.5), POP);
  let acc = 0;
  return (
    <Scene dur={dur}>
      <Abs x={0} y={120} w={1920}>
        <Words text="Pronto para [publicar]" at={L(37.6)} />
      </Abs>
      <Abs x={260} y={330}>
        <Pop at={L(37.8)} y={40}>
          <div style={{display: 'flex', gap: 10, alignItems: 'stretch'}}>
            <div style={{width: 1180, height: 74, borderRadius: 14, background: C.line, display: 'flex', gap: 4, padding: 4, boxSizing: 'border-box'}}>
              {segs.map(([k, d], i) => {
                acc += d;
                return <div key={i} style={{flex: d, borderRadius: 10, background: k === 't' ? '#2B2838' : '#B9AFFF'}} />;
              })}
            </div>
            <div style={{width: 200, height: 74, borderRadius: 14, background: '#0F0D18', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.min(vin, 1), transform: `translateX(${(1 - Math.min(vin, 1)) * 60}px)`}}>
              <Logo height={28} color="#fff" />
            </div>
          </div>
        </Pop>
      </Abs>
      {/* camada da trilha */}
      <Abs x={260} y={420}>
        <div style={{width: 1180 * ramp(t, L(38.9), L(39.5), 0, 1), height: 44, borderRadius: 12, background: 'linear-gradient(90deg,#FFE0EE,#EFE9FF)', display: 'flex', alignItems: 'center', gap: 4, padding: '0 10px', overflow: 'hidden', boxSizing: 'border-box'}}>
          {Array.from({length: 90}).map((_, i) => (
            <div key={i} style={{width: 6, flexShrink: 0, height: `${30 + 50 * Math.abs(Math.sin(i * 0.9))}%`, borderRadius: 4, background: '#E79BC2'}} />
          ))}
        </div>
      </Abs>
      <Abs x={260} y={480}>
        <div style={{fontSize: 22, color: C.muted, opacity: ramp(t, L(39.1), L(39.5))}}>trilha</div>
      </Abs>
      <Abs x={260} y={590}>
        <div style={{display: 'flex', gap: 22}}>
          {[
            {k: 'Sincronia', at: L(40.95)},
            {k: 'Volume', at: L(41.7)},
            {k: 'Qualidade', at: L(42.45)},
          ].map((c) => (
            <Pop key={c.k} at={c.at} pop y={20}>
              <Chip icon={<Icon name="check" size={22} color={C.green} stroke={3} />} text={c.k} tint={C.greenTint} />
            </Pop>
          ))}
        </div>
      </Abs>
      <Abs x={1240} y={590}>
        <div style={{opacity: Math.min(file, 1), transform: `scale(${0.8 + 0.2 * Math.min(file, 1.1)})`, transformOrigin: 'left top'}}>
          <div style={card({display: 'flex', alignItems: 'center', gap: 18, padding: '18px 26px 18px 18px', borderRadius: 22})}>
            <div style={{width: 64, height: 64, borderRadius: 16, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Svg d={FILM} size={32} color="#fff" />
            </div>
            <div>
              <div style={{fontSize: 26, fontWeight: 600}}>Seu vídeo.mp4</div>
              <div style={{fontSize: 20, color: C.green, fontWeight: 600}}>Pronto</div>
            </div>
          </div>
        </div>
      </Abs>
    </Scene>
  );
};

// ============ 8. GIF ============
const Gif: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const ring = (k: number) => (((t * 0.9 + k / 3) % 1) + 1) % 1;
  return (
    <Scene dur={dur}>
      <Abs x={190} y={400} w={800}>
        <Words text="Só um [GIF?]" at={L(44.95)} align="left" size={84} />
        <div style={{height: 34}} />
        <Pop at={L(46.5)} y={20}>
          <div style={{display: 'inline-flex', fontFamily: 'Menlo, monospace', fontSize: 40, fontWeight: 600, color: C.purpleDeep, background: C.purpleTint, padding: '14px 28px', borderRadius: 18}}>
            {typed(t, L(46.86), L(47.6), '/gif-produto')}
            <Caret />
          </div>
        </Pop>
      </Abs>
      <Abs x={1340} y={560} center>
        <Pop at={L(45.1)} y={80}>
          <div style={{width: 400, height: 560, borderRadius: 40, background: 'linear-gradient(180deg,#CBC9F7,#F8DDF4)', padding: 26, boxSizing: 'border-box', boxShadow: C.shadow}}>
            <div style={{width: '100%', height: '100%', borderRadius: 30, background: '#1B1B20', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, boxSizing: 'border-box'}}>
              <div style={{color: '#fff', fontSize: 18, opacity: 0.9}}>Ligação de voz do WhatsApp</div>
              <div style={{position: 'relative', marginTop: 60, width: 130, height: 130}}>
                {[0, 1, 2].map((k) => {
                  const u = ring(k);
                  return <div key={k} style={{position: 'absolute', left: -60 * u, top: -60 * u, width: 130 + 120 * u, height: 130 + 120 * u, borderRadius: '50%', border: `3px solid rgba(91,229,132,${0.6 * (1 - u)})`}} />;
                })}
                <div style={{width: 130, height: 130, borderRadius: 130, background: 'linear-gradient(150deg,#3BE07C,#1FA855)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="phone" size={60} color="#fff" />
                </div>
              </div>
              <div style={{color: '#fff', fontSize: 26, marginTop: 40}}>Maurício</div>
              <div style={{color: '#9A9AA3', fontSize: 20, marginTop: 6}}>Chamando…</div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={1560} y={300}>
        <Pop at={L(45.9)} pop y={10}>
          <div style={{padding: '8px 18px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 22, fontWeight: 600, color: C.purpleDeep}}>loop · 260×346</div>
        </Pop>
      </Abs>
    </Scene>
  );
};

// ============ 9. Chamada final ============
const Final: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = mk(g0);
  const t = useSec();
  const dark = ramp(t, dur - 0.45, dur, 0, 1, Easing.in(Easing.quad));
  return (
    <Scene dur={dur + 1} push={0.04}>
      <Abs x={960} y={430} center>
        <Pop at={L(48.8)} y={50}>
          <div style={card({width: 760, borderRadius: 26, overflow: 'hidden'})}>
            <div style={{height: 46, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px', background: '#F7F6FB', borderBottom: `1px solid ${C.line}`}}>
              {['#FF6159', '#FFBD2E', '#28C941'].map((c) => (
                <div key={c} style={{width: 12, height: 12, borderRadius: 12, background: c}} />
              ))}
              <div style={{marginLeft: 12, fontSize: 17, color: C.muted}}>guia.html</div>
            </div>
            <div style={{padding: '34px 40px', display: 'flex', flexDirection: 'column', gap: 14}}>
              <div style={{fontSize: 18, fontWeight: 600, color: C.purple, letterSpacing: 1.5}}>KIT DO TIME · CLAUDE CODE</div>
              <div style={{fontSize: 52, fontWeight: 700, letterSpacing: -1.5}}>
                Clint <Grad>Video Studio</Grad>
              </div>
              <div style={{display: 'flex', gap: 10, marginTop: 6}}>
                {['Setup', 'Passo a passo', 'Pedidos prontos'].map((x) => (
                  <div key={x} style={{fontSize: 18, padding: '6px 14px', borderRadius: 99, background: C.purpleTint, color: C.purpleDeep, fontWeight: 500}}>{x}</div>
                ))}
              </div>
            </div>
          </div>
        </Pop>
      </Abs>
      <Abs x={0} y={760} w={1920}>
        <Words text="Faça hoje o seu [primeiro vídeo]" at={L(48.86)} stagger={0.08} />
      </Abs>
      <Abs x={960} y={960} center>
        <Pop at={L(50.3)} y={14}>
          <Logo height={44} />
        </Pop>
      </Abs>
      <Sparkle x={540} y={300} at={L(49.6)} />
      <Sparkle x={1400} y={260} at={L(49.8)} size={22} color="#B7A8FF" />
      <AbsoluteFill style={{background: '#000', opacity: dark}} />
    </Scene>
  );
};

const CENAS: [number, number, React.FC<{g0: number; dur: number}>][] = [
  [0, 4.8, Abertura],
  [4.8, 15.9, Comeco],
  [15.9, 26.0, Comando],
  [26.0, 34.7, Producao],
  [34.7, 37.5, Aprova],
  [37.5, 44.8, Entrega],
  [44.8, 48.7, Gif],
  [48.7, TUTORIAL_DUR, Final],
];

export const TutorialStudio: React.FC = () => (
  <AbsoluteFill>
    <Background />
    {CENAS.map(([a, b, Cena]) => (
      <Sequence key={a} from={Math.round(a * 30)} durationInFrames={Math.round(b * 30) - Math.round(a * 30)}>
        <Cena g0={a} dur={b - a} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
