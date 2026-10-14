import React from 'react';
import {C} from '../theme';
import {Abs, Grad, Logo, Pop, Scene, Sparkle, Words, useSec, ramp} from '../ui';

// Cenas do projeto atual. Use os primitivos de ../ui (Scene, Pop, Words, Cursor, Icon, card...)
// e veja exemplos completos em ../exemplos/ligacoes-whatsapp/scenes.tsx.
// Para sincronizar com a fala: L(s) = s - g0, onde s é o instante da palavra na narração (s).

export const Abertura: React.FC<{g0: number; dur: number}> = ({g0, dur}) => {
  const L = (s: number) => s - g0;
  const t = useSec();
  return (
    <Scene dur={dur} push={0.05}>
      <Abs x={0} y={300} w={1920}>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
          <Pop at={L(0.15)} pop y={16}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 26px 10px 10px', borderRadius: 99, background: '#fff', boxShadow: C.shadowSm, fontSize: 28, fontWeight: 600}}>
              <div style={{width: 46, height: 46, borderRadius: 46, background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Logo height={24} color="#fff" iconOnly />
              </div>
              Novidade na <Grad>Clint</Grad>
            </div>
          </Pop>
        </div>
        <Words text="Título da [novidade]" at={L(0.4)} size={90} />
      </Abs>
      <Sparkle x={620} y={280} at={0.6} />
      <Sparkle x={1300} y={560} at={0.75} size={22} color="#B7A8FF" />
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center', opacity: ramp(t, 0.8, 1.2), fontSize: 26, color: C.muted}}>
        Troque esta cena pela abertura do seu vídeo
      </div>
    </Scene>
  );
};
