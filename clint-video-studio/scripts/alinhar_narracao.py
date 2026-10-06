"""Cria um mapa de tempo entre duas narrações do MESMO roteiro (ex.: troca de voz/avatar).
uso: python3 scripts/alinhar_narracao.py antiga.palavras.json nova.palavras.json DUR_ANTIGA DUR_NOVA saida_warp.json
O warp.json ({"old": [...], "new": [...]}) é usado por retime_video.py e pelas cenas (W(s))."""
import json, re, sys, difflib, numpy as np
a, b, d_old, d_new, out = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
def words(p):
    W = []
    for t in json.load(open(p))["transcription"]:
        w = re.sub(r"[^\wà-ú]", "", t["text"].strip().lower())
        if w: W.append((t["offsets"]["from"] / 1000, w))
    return W
o, n = words(a), words(b)
sm = difflib.SequenceMatcher(None, [w for _, w in o], [w for _, w in n], autojunk=False)
pairs = [(o[i + k][0], n[j + k][0]) for i, j, size in sm.get_matching_blocks() for k in range(size)]
keep = [pairs[0]]
for p in pairs[1:]:
    if p[0] > keep[-1][0] + 0.05 and p[1] > keep[-1][1] + 0.05: keep.append(p)
p = np.array(keep)
grid = np.arange(0, d_old + 1e-3, 0.25)
wts = lambda t: np.exp(-((p[:, 0] - t) / 2.0) ** 2)
d = np.array([np.sum(wts(t) * (p[:, 1] - p[:, 0])) / np.sum(wts(t)) for t in grid])
W = grid + d; W[0] = 0.0; W[-1] = d_new
for i in range(1, len(W)): W[i] = max(W[i], W[i - 1] + 0.25 * 0.75)
err = np.interp(p[:, 0], grid, W) - p[:, 1]; s = np.diff(W) / 0.25
print(f"palavras alinhadas: {len(p)}/{len(o)} | erro mediano {np.median(abs(err))*1000:.0f} ms | velocidade das telas {1/s.max():.2f}x a {1/s.min():.2f}x")
json.dump({"old": [round(x, 3) for x in grid], "new": [round(x, 4) for x in W]}, open(out, "w"))
