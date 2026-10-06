"""Lista os cortes de cena de um vídeo (em segundos e quadros), para montar a linha do tempo.
uso: python3 scripts/cortes.py video.mp4 [limiar=0.25]"""
import subprocess, sys, re
thr = sys.argv[2] if len(sys.argv) > 2 else "0.25"
out = subprocess.run(["ffmpeg", "-v", "error", "-i", sys.argv[1], "-vf", f"scale=320:-1,select='gt(scene,{thr})',metadata=print:file=-", "-an", "-f", "null", "-"], capture_output=True, text=True).stdout
for t in re.findall(r"pts_time:([\d.]+)", out): print(f"{float(t):8.2f}s  quadro {round(float(t)*30)}")
