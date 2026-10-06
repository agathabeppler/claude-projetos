#!/bin/zsh
# Gera prévias de 25 s de cada trilha sob a narração, para a pessoa escolher ouvindo.
# uso: scripts/previas_trilha.sh video_mudo.mp4 narracao.(wav|mp4) pasta_saida trilha1.wav [trilha2.wav ...]
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
V="$1"; N="$2"; O="$3"; shift 3; mkdir -p "$O"
for m in "$@"; do n="$(basename "${m%.*}")"
  ffmpeg -v error -y -t 25 -i "$V" -i "$N" -i "$m" -filter_complex "[2:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:25,loudnorm=I=-31:TP=-3:LRA=11,afade=t=in:st=0:d=0.4,afade=t=out:st=23.5:d=1.5[m];[1:a]aresample=48000,aformat=channel_layouts=stereo,atrim=0:25,loudnorm=I=-15.3:TP=-1.5:LRA=11[v];[v][m]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.89[a]" -map 0:v -map "[a]" -c:v libx264 -crf 20 -c:a aac -b:a 256k -shortest "$O/previa_$n.mp4"
  echo "ok: $O/previa_$n.mp4"; done
