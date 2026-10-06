#!/bin/zsh
# Clint Video Studio — prepara o computador (uma vez). Não pede senha e não usa Homebrew:
# tudo fica em ~/.clint-video-studio. Pode rodar de novo quantas vezes quiser (só instala o que faltar).
set -e
cd "$(dirname "$0")"
R="$HOME/.clint-video-studio"; E="$R/env"; mkdir -p "$R/modelos"
passo() { echo "▸ $1"; }
ARCH=$([ "$(uname -m)" = arm64 ] && echo osx-arm64 || echo osx-64)
if [ ! -x "$R/bin/micromamba" ]; then passo "Baixando o gerenciador de ferramentas"; (cd "$R" && curl -Ls "https://micro.mamba.pm/api/micromamba/$ARCH/latest" | tar -xj bin/micromamba); fi
export MAMBA_ROOT_PREFIX="$R/mamba"
if [ ! -x "$E/bin/whisper-cli" ] || [ ! -x "$E/bin/ffmpeg" ] || [ ! -x "$E/bin/node" ]; then
  passo "Instalando vídeo (ffmpeg), animação (Node) e transcrição (whisper)"
  "$R/bin/micromamba" create -y -q -p "$E" -c conda-forge python=3.11 ffmpeg "nodejs>=20,<23" whisper.cpp >/dev/null
fi
source scripts/ambiente.sh
if ! python3 -c "import numpy, parselmouth, playwright, demucs, soundfile, PIL" 2>/dev/null; then
  passo "Instalando ferramentas de áudio e gravação de tela"
  python3 -m pip install -q --disable-pip-version-check numpy pillow praat-parselmouth playwright soundfile demucs
fi
if [ ! -d "$PLAYWRIGHT_BROWSERS_PATH" ] || [ -z "$(ls "$PLAYWRIGHT_BROWSERS_PATH" 2>/dev/null)" ]; then passo "Instalando o navegador de gravação"; python3 -m playwright install chromium >/dev/null; fi
if [ ! -s "$CLINT_WHISPER_MODEL" ]; then passo "Baixando o modelo de transcrição em português (~480 MB)"; curl -sL -o "$CLINT_WHISPER_MODEL" https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin; fi
if [ ! -d remotion/node_modules ]; then passo "Instalando o motor de animação"; (cd remotion && npm install --silent --no-fund --no-audit); fi
scripts/verificar.sh
