"""Monta o vídeo de telas (public/telas.mp4) na linha do tempo da narração.
uso: python3 scripts/montar_telas.py plano_telas.json remotion/public/telas.mp4

plano_telas.json:
{"duracao": 62.4,
 "trechos": [{"inicio": 4.9, "fim": 14.9, "arquivo": "projetos/<p>/entrada/telas/conversas.mp4", "de": 0.5, "ate": 11.0}, ...]}
- inicio/fim: segundos na narração em que a tela aparece.
- de/ate: pedaço da gravação usado. A velocidade é ajustada para caber (fique entre 0,7x e 1,5x; se passar disso, regrave ou corte).
Fora dos trechos fica preto (o vídeo final mostra animações ali). Saída 2560x1440, 30 fps, all-intra."""
import json, subprocess, sys
plano, out = json.load(open(sys.argv[1])), sys.argv[2]
D, W, H = float(plano["duracao"]), 2560, 1440
tr = sorted(plano["trechos"], key=lambda t: t["inicio"])
inputs, parts, t = [], [], 0.0
def black(d):
    parts.append(f"color=c=black:s={W}x{H}:r=30:d={d:.4f},format=yuv420p")
for x in tr:
    if x["inicio"] > t + 1e-3: black(x["inicio"] - t)
    i = len(inputs); inputs += ["-i", x["arquivo"]]
    src = x["ate"] - x["de"]; dst = x["fim"] - x["inicio"]; sp = src / dst
    if not 0.65 <= sp <= 1.6: print(f"atenção: {x['arquivo']} ficará {sp:.2f}x (ideal 0,7x–1,5x)")
    parts.append(f"[{i}:v]trim={x['de']}:{x['ate']},setpts=(PTS-STARTPTS)/{sp:.5f},fps=30,scale={W}:{H}:flags=lanczos,format=yuv420p,trim=duration={dst:.4f}")
    t = x["fim"]
if t < D - 1e-3: black(D - t)
fc = ";".join(f"{p}[s{k}]" if p.startswith("[") else f"{p}[s{k}]" for k, p in enumerate(parts))
fc += ";" + "".join(f"[s{k}]" for k in range(len(parts))) + f"concat=n={len(parts)}:v=1:a=0[v]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", fc, "-map", "[v]", "-c:v", "libx264", "-crf", "16", "-g", "1", "-pix_fmt", "yuv420p", "-t", f"{D:.3f}", out], check=True)
print("ok:", out)
