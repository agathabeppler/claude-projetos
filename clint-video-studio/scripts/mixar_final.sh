#!/bin/zsh
# Junta vídeo (sem áudio) + narração + trilha e coloca a vinheta da Clint no final.
# uso: scripts/mixar_final.sh video_mudo.mp4 narracao.(wav|mp4) trilha.wav saida.mp4 [nivel_trilha_LUFS=-31]
# Narração em -15,3 LUFS, trilha bem baixa por baixo, fade da trilha no fim, depois a vinheta com o áudio dela.
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
V="$1"; N="$2"; T="$3"; OUT="$4"; LT="${5:--31}"
VIN="$(cd "$(dirname "$0")/.." && pwd)/assets/vinheta-clint.mp4"
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
FO=$(python3 -c "print(max(0,$D-1.8))")
ffmpeg -v error -y -i "$V" -i "$N" -i "$T" -i "$VIN" -filter_complex "[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-15.3:TP=-1.5:LRA=11[v];[2:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=${LT}:TP=-3:LRA=11,afade=t=in:st=0:d=0.3,afade=t=out:st=${FO}:d=1.8[m];[v][m]amix=inputs=2:normalize=0:duration=longest,atrim=0:${D},apad=whole_dur=${D},alimiter=limit=0.89[a0];[0:v]fps=30,format=yuv420p,setsar=1[v0];[3:v]fps=30,scale=1920:1080,format=yuv420p,setsar=1[v1];[3:a]aresample=48000,aformat=channel_layouts=stereo[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[vv][aa]" -map "[vv]" -map "[aa]" -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -c:a aac -b:a 256k -movflags +faststart "$OUT"
echo "ok: $OUT ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s)"
