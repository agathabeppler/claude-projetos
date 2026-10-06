#!/bin/zsh
# Renderiza uma composição do Remotion e exporta GIF em loop com paleta otimizada.
# uso: scripts/gif.sh <IdDaComposicao> <largura> <altura> saida.gif [fps=25]
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; FPS="${5:-25}"
(cd "$ROOT/remotion" && npx remotion render src/index.ts "$1" out/_gif.mov --codec=prores --prores-profile=4444 --log=error)
ffmpeg -v error -y -i "$ROOT/remotion/out/_gif.mov" -vf "fps=$FPS,scale=$2:$3:flags=lanczos,split[a][b];[a]palettegen=max_colors=256:stats_mode=full[p];[b][p]paletteuse=dither=sierra2_4a" -loop 0 "$4"
echo "ok: $4 ($(du -h "$4" | cut -f1))"
