// Série Método: os tempos das cenas foram escritos na narração ORIGINAL (speed 1). A narração final é gerada
// pelo HeyGen com speed 1,2 (voz natural; esticar o áudio deixava a voz robotizada), com outro ritmo.
// `mapa` converte um instante da narração original para a final por interpolação entre âncoras (mesma palavra nas duas).
export const criarMapa = (pares: [number, number][]) => {
  const conv = (s: number, a: 0 | 1, b: 0 | 1) => {
    if (s <= pares[0][a]) return pares[0][b] + (s - pares[0][a]);
    for (let i = 0; i < pares.length - 1; i++) {
      const p = pares[i];
      const q = pares[i + 1];
      if (s <= q[a]) return p[b] + ((s - p[a]) * (q[b] - p[b])) / (q[a] - p[a]);
    }
    const u = pares[pares.length - 1];
    return u[b] + (s - u[a]);
  };
  return {M: (s: number) => conv(s, 0, 1), inv: (s: number) => conv(s, 1, 0)};
};
