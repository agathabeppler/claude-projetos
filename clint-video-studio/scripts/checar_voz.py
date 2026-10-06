"""Mede se sobrou voz de uma narração (referência) dentro de um áudio (ex.: trilha separada).
Compara o envelope da faixa de fala (300-3400 Hz) com o ritmo silábico da referência.
Resultado: ~0 (ou negativo) = limpo | >0,15 = voz audível. NÃO use correlação de forma de onda: ela não pega vazamento audível.
uso: python3 scripts/checar_voz.py audio_testado referencia_narracao"""
import subprocess, sys, numpy as np
SR, NF, HOP = 16000, 1024, 256
def load(p): return np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-vn", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32).copy()
def env(x):
    n = 1 + (len(x) - NF) // HOP; i = np.arange(NF)[None, :] + HOP * np.arange(n)[:, None]
    S = np.abs(np.fft.rfft(x[i] * np.hanning(NF), axis=1)) ** 2; f = np.fft.rfftfreq(NF, 1 / SR)
    return 10 * np.log10(S[:, (f > 300) & (f < 3400)].sum(1) + 1e-12)
m, r = env(load(sys.argv[1])), env(load(sys.argv[2])); n = min(len(m), len(r)); k = int(2 * SR / HOP)
hp = lambda v: v - np.convolve(v, np.ones(k) / k, "same")
c = float(np.corrcoef(hp(m[:n]), hp(r[:n]))[0, 1])
print(f"sobra de voz = {c:.3f}  ->  {'LIMPO' if c < 0.1 else 'VOZ AUDÍVEL: refaça a separação'}")
