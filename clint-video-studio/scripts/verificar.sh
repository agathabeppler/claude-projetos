#!/bin/zsh
# Confere se o computador está pronto. Saída "PRONTO" ou a lista do que falta (e código 1).
cd "$(dirname "$0")/.."; source scripts/ambiente.sh
falta=()
for b in ffmpeg ffprobe whisper-cli node npx python3; do [ -x "$CLINT_STUDIO_HOME/env/bin/$b" ] || falta+=("$b"); done
[ -s "$CLINT_WHISPER_MODEL" ] || falta+=("modelo de transcrição")
python3 -c "import numpy, parselmouth, playwright, demucs, soundfile, PIL" 2>/dev/null || falta+=("pacotes python")
[ -n "$(ls "$PLAYWRIGHT_BROWSERS_PATH" 2>/dev/null)" ] || falta+=("navegador de gravação")
[ -d remotion/node_modules ] || falta+=("motor de animação")
if [ ${#falta[@]} -eq 0 ]; then echo "PRONTO"; else echo "FALTA: ${(j:, :)falta}"; exit 1; fi
