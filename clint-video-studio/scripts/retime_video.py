"""Reajusta o ritmo de um vídeo (ex.: gravações de tela) para uma narração nova, usando warp.json.
uso: python3 scripts/retime_video.py entrada.mp4 warp.json DUR_NOVA saida.mp4 [fps=30]
Saída all-intra (-g 1), o que deixa o Remotion rápido e estável ao buscar quadros."""
import json, subprocess, sys, numpy as np
src, wp, dur, out = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
FPS = int(sys.argv[5]) if len(sys.argv) > 5 else 30
w = json.load(open(wp)); old, new = np.array(w["old"]), np.array(w["new"])
probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-count_packets", "-show_entries", "stream=nb_read_packets,width,height", "-of", "csv=p=0", src], capture_output=True, text=True).stdout.strip().split(",")
Wd, Hd, NSRC = int(probe[0]), int(probe[1]), int(probe[2])
N = int(round(dur * FPS)); idx = np.clip(np.round(np.interp(np.arange(N) / FPS, new, old) * FPS).astype(int), 0, NSRC - 1)
fs = Wd * Hd * 3
dec = subprocess.Popen(["ffmpeg", "-v", "error", "-i", src, "-f", "rawvideo", "-pix_fmt", "rgb24", "-r", str(FPS), "-"], stdout=subprocess.PIPE)
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{Wd}x{Hd}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "fast", "-crf", "14", "-g", "1", "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
cur, frame = -1, None
for k in range(N):
    while cur < idx[k]:
        b = dec.stdout.read(fs)
        if len(b) < fs: break
        frame, cur = b, cur + 1
    enc.stdin.write(frame)
enc.stdin.close(); enc.wait(); dec.kill(); print("ok:", out, N, "quadros")
