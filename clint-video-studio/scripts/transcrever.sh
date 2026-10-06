#!/bin/zsh
# Transcreve a narração com tempo por palavra.
# uso: scripts/transcrever.sh <video_ou_audio> <saida_sem_extensao>
# gera: <saida>.palavras.json, <saida>.palavras.txt ("tempo palavra" por linha) e <saida>.frases.srt
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
MODEL="$CLINT_WHISPER_MODEL"
TMP="$(mktemp -d)/a.wav"
ffmpeg -v error -y -i "$1" -ar 16000 -ac 1 "$TMP"
whisper-cli -m "$MODEL" -l pt -f "$TMP" -ml 1 -sow -oj -of "$2.palavras" >/dev/null 2>&1
whisper-cli -m "$MODEL" -l pt -f "$TMP" -osrt -of "$2.frases" >/dev/null 2>&1
python3 - "$2.palavras.json" > "$2.palavras.txt" <<'P'
import json, sys
for t in json.load(open(sys.argv[1]))["transcription"]:
    w = t["text"].strip()
    if w and not w.startswith("["): print(f'{t["offsets"]["from"]/1000:8.2f}  {w}')
P
echo "ok: $2.palavras.txt e $2.frases.srt"
