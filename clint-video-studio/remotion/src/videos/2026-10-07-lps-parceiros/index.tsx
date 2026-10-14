import React from 'react';
import {LP1} from './lp1';
import {LP2} from './lp2';
import {LPVideo, type LP} from './LPVideo';

export const LPS: LP[] = [LP1, LP2];

// As props de uma composição viram JSON; por isso a composição recebe só o id e busca as cenas aqui.
export const LPComp: React.FC<{id: string}> = ({id}) => <LPVideo lp={LPS.find((l) => l.id === id)!} />;
