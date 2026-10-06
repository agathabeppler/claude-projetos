import warp from './warp.json';

// Mapa de tempo usado neste exemplo: narração antiga (s) -> narração nova (s).
const OLD: number[] = warp.old;
const NEW: number[] = warp.new;

export const W = (s: number): number => {
  if (s <= OLD[0]) return NEW[0] + (s - OLD[0]);
  const last = OLD.length - 1;
  if (s >= OLD[last]) return NEW[last] + (s - OLD[last]);
  let lo = 0;
  let hi = last;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (OLD[mid] <= s) lo = mid;
    else hi = mid;
  }
  return NEW[lo] + ((NEW[hi] - NEW[lo]) * (s - OLD[lo])) / (OLD[hi] - OLD[lo]);
};

export const WF = (f: number): number => Math.round(W(f / 30) * 30);
