"""Baixa as prévias das faixas candidatas e ranqueia pela semelhança com a trilha de referência da Clint.
uso: python3 scripts/trilhas/ranquear.py candidatas.tsv pasta_saida [referencia.wav]
- Sem referencia.wav, usa o perfil salvo em scripts/trilhas/referencia.json ("Comida", GlowCity: a trilha aprovada pelo time).
- Gera pasta_saida/ranking.tsv (posição, distância, BPM, título, autor, id, arquivo da prévia) e imprime o top 12.
Escolha 4 opções entre as mais próximas que sejam DIFERENTES entre si (andamento, energia, instrumentos)."""
import json, os, subprocess, sys, urllib.request, numpy as np
cand, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
SR = 22050
def feats(p):
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-t", "60", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, np.float32)
    if len(x) < SR * 8: return None
    H, NF = 512, 2048; n = 1 + (len(x) - NF) // H; idx = np.arange(NF)[None, :] + H * np.arange(n)[:, None]
    S = np.abs(np.fft.rfft(x[idx] * np.hanning(NF), axis=1)); f = np.fft.rfftfreq(NF, 1 / SR)
    flux = np.maximum(np.diff(np.log(S + 1e-6), axis=0), 0).sum(1); flux -= flux.mean()
    ac = np.correlate(flux, flux, "full")[len(flux) - 1:]; bpm = 60 * (SR / H) / np.maximum(np.arange(len(ac)), 1); m = (bpm > 70) & (bpm < 180)
    band = lambda a, c: float(S[:, (f >= a) & (f < c)].sum() / S.sum())
    rms = np.sqrt(np.mean(x[idx] ** 2, axis=1))
    return dict(bpm=float(bpm[m][np.argmax(ac[m])]), cent=float(np.median((S * f).sum(1) / (S.sum(1) + 1e-9))), lo=band(0, 150), mid=band(150, 2000), hi=band(2000, 11000),
                dyn=float(20 * np.log10(np.percentile(rms, 90) / max(np.percentile(rms, 10), 1e-6))))
ref = feats(sys.argv[3]) if len(sys.argv) > 3 else json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "referencia.json")))
rows = [l.rstrip("\n").split("\t") for l in open(cand, encoding="utf-8") if l.strip()]
res = []
for i, (t, a, iid, url) in enumerate(rows, 1):
    p = os.path.join(out, f"{i:02d}.m4a")
    if not os.path.exists(p):
        try: urllib.request.urlretrieve(url, p)
        except Exception: continue
    fe = feats(p)
    if not fe: continue
    tb = min(abs(fe["bpm"] - ref["bpm"]), abs(fe["bpm"] / 2 - ref["bpm"]), abs(fe["bpm"] * 2 - ref["bpm"])) / ref["bpm"]
    d = 2 * tb + abs(np.log(fe["cent"] / ref["cent"])) + 3 * (abs(fe["lo"] - ref["lo"]) + abs(fe["mid"] - ref["mid"]) + abs(fe["hi"] - ref["hi"])) + abs(fe["dyn"] - ref["dyn"]) / 30
    res.append((d, fe["bpm"], t, a, iid, p))
res.sort()
with open(os.path.join(out, "ranking.tsv"), "w", encoding="utf-8") as f:
    for k, (d, b, t, a, iid, p) in enumerate(res, 1): f.write(f"{k}\t{d:.2f}\t{b:.0f}\t{t}\t{a}\t{iid}\t{p}\n")
print(f"referência: {ref['bpm']:.0f} BPM, brilho {ref['cent']:.0f} Hz")
for k, (d, b, t, a, iid, p) in enumerate(res[:12], 1): print(f"{k:2d}. dist {d:.2f} | {b:4.0f} BPM | {t} — {a}")
