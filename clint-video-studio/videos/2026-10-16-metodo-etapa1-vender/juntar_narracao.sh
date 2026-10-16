#!/bin/bash
# Junta os blocos de narração (entrada/n0.wav, n1.wav, ...) com 0,5 s de silêncio entre eles → entrada/narracao.wav
# e imprime o início (s) de cada bloco na narração final, para usar como O0, O1, ... nas cenas.
cd "$(dirname "$0")/entrada"
args=(); fc=""; t=0; i=0
for f in $(ls n[0-9]*.wav | sort -V); do
  echo "$f começa em $t s"
  args+=(-i "$f"); fc+="[$i:a]aresample=44100,aformat=channel_layouts=mono,apad=pad_dur=0.5[a$i];"
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"); t=$(python3 -c "print(round($t+$d+0.5,3))"); i=$((i+1))
done
for k in $(seq 0 $((i-1))); do fc+="[a$k]"; done
ffmpeg -nostdin -v error -y "${args[@]}" -filter_complex "${fc}concat=n=$i:v=0:a=1[o]" -map "[o]" -c:a pcm_s16le narracao.wav
echo "total: $(ffprobe -v error -show_entries format=duration -of csv=p=0 narracao.wav) s"
