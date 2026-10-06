"""Recupera a MÚSICA de uma mixagem (voz + música) quando se tem a narração isolada.
Etapas: subtração por frequência (STFT) -> Demucs (remove o resto da voz) -> nivelamento de volume.
uso: python3 scripts/separar_musica.py mixagem.(mp4|wav) narracao_isolada.(mp4|wav) saida_musica.wav
Sempre confira depois com scripts/checar_voz.py. Prefira SEMPRE o arquivo original da trilha, se existir."""
import subprocess, sys, os, tempfile, wave, numpy as np
mixp, narp, out = sys.argv[1:4]; SR, NF, HOP = 48000, 2048, 512
def load(p): return np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-vn", "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32).reshape(-1, 2).copy()
def save(x, p):
    w = wave.open(p, "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
mix, nar = load(mixp), load(narp); L = min(len(mix), len(nar)); mix, nar = mix[:L], nar[:L]
win = np.hanning(NF).astype(np.float32)
def stft(x):
    n = 1 + (len(x) - NF) // HOP; i = np.arange(NF)[None, :] + HOP * np.arange(n)[:, None]; return np.fft.rfft(x[i] * win, axis=1)
def istft(X, n):
    fr = np.fft.irfft(X, n=NF, axis=1) * win; o = np.zeros(n, np.float32); ws = np.zeros(n, np.float32)
    for i in range(fr.shape[0]): s = i * HOP; o[s:s + NF] += fr[i]; ws[s:s + NF] += win ** 2
    return o / np.maximum(ws, 1e-6)
def sm(A, k):
    c = np.cumsum(np.pad(A, ((k // 2 + 1, k // 2), (0, 0)), mode="edge"), axis=0); return (c[k:] - c[:-k]) / k
music = np.zeros_like(mix)
for ch in range(2):
    M, N = stft(mix[:, ch]), stft(nar[:, ch]); num, den = sm(M * np.conj(N), 31), sm(np.abs(N) ** 2, 31) + 1e-9; G = num / den
    strong = den > np.percentile(den, 40, axis=0, keepdims=True); Gm = np.nan_to_num(np.median(np.where(strong, G, np.nan).real, axis=0))
    music[:, ch] = istft(M - np.where(strong, G, Gm[None, :]) * N, L)
tmp = tempfile.mkdtemp(); pre = os.path.join(tmp, "pre.wav"); save(music, pre)
import shutil; demucs = shutil.which("demucs") or "demucs"
subprocess.run([demucs, "-n", "htdemucs", "--two-stems", "vocals", "--shifts", "2", "-o", tmp, pre], check=True)
x = load(os.path.join(tmp, "htdemucs", "pre", "no_vocals.wav")); mono = x.mean(1)
def env(s, sec):
    k = int(sec * SR); c = np.cumsum(np.pad(s ** 2, (k // 2, k - k // 2), mode="edge")); return np.sqrt((c[k:] - c[:-k]) / k)[:len(s)] + 1e-9
for _ in range(2):
    g = np.clip(env(mono, 6.0) / env(mono, 0.5), 1.0, 10 ** (7 / 20)); k = int(0.25 * SR)
    g = np.convolve(np.pad(g, (k, k), mode="edge"), np.ones(k) / k, "same")[k:-k]; x = x * g[:, None]; mono = x.mean(1)
save(x, out); print("ok:", out)
