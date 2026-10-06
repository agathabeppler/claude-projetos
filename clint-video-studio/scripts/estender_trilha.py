"""Estende (ou corta) uma trilha para a duração do vídeo, emendando num ponto de mesmo ritmo, com fade de 1 s.
uso: python3 scripts/estender_trilha.py trilha.wav DURACAO_S saida.wav"""
import subprocess, sys, wave, numpy as np
src, dur, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]; SR = 48000
x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
NEED, X = int(dur * SR), SR
while len(x) < NEED:
    mono = x.mean(1); H = 480; e = np.sqrt(np.convolve(mono ** 2, np.ones(H) / H, "same")[::H]); on = np.maximum(np.diff(np.log(e + 1e-6)), 0)
    END = len(x) - 2 * SR; ke = END // H; Wn = 400; ref = on[ke - Wn:ke]; ref = (ref - ref.mean()) / (ref.std() + 1e-9)
    best = (-9, Wn)
    for k in range(Wn, max(Wn + 1, ke - 10 * 100)):
        s = on[k - Wn:k]; sd = s.std()
        if sd > 1e-6:
            c = np.dot(ref, (s - s.mean()) / sd) / Wn
            if c > best[0]: best = (c, k)
    s = best[1] * H; tail = x[s:]
    f = np.linspace(0, 1, X)[:, None]; x = np.concatenate([x[:END], x[END:END + X] * (1 - f) + tail[:X] * f, tail[X:]])
x = x[:NEED]; f = int(1.8 * SR); x[-f:] *= np.linspace(1, 0, f)[:, None]
w = wave.open(out, "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
print("ok:", out, f"{len(x)/SR:.1f}s")
