#!/bin/zsh
# Prévia rápida de um TRECHO do vídeo (960x540, com narração e trilha) para aprovar ritmo, movimento e sincronia
# antes do render completo. Leva ~1 min para 15 s.
# uso: scripts/previa.sh INICIO_S FIM_S narracao.wav trilha.wav saida.mp4 [COMP=Video]
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; A="$1"; B="$2"; N="$3"; T="$4"; OUT="$5"
FA=$(python3 -c "print(round($A*30))"); FB=$(python3 -c "print(round($B*30)-1)"); D=$(python3 -c "print($B-$A)")
TMP="$(mktemp -d)"
(cd "$ROOT/remotion" && npx remotion render src/index.ts "${COMP:-Video}" "$TMP/v.mp4" --frames=$FA-$FB --scale=0.5 --crf=26 --muted --log=error)
ffmpeg -v error -y -i "$TMP/v.mp4" -ss "$A" -t "$D" -i "$N" -ss "$A" -t "$D" -i "$T" -filter_complex "[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-15.3:TP=-1.5[v];[2:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-31:TP=-3[m];[v][m]amix=inputs=2:normalize=0:duration=first[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 160k -shortest "$OUT"
rm -rf "$TMP"; echo "ok: $OUT (${D}s)"
