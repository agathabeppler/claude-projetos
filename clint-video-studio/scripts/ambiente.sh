# Carrega as ferramentas do Clint Video Studio. Use antes de qualquer comando:  source scripts/ambiente.sh
export CLINT_STUDIO_HOME="$HOME/.clint-video-studio"
export PATH="$CLINT_STUDIO_HOME/env/bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH="$CLINT_STUDIO_HOME/navegadores"
export CLINT_WHISPER_MODEL="$CLINT_STUDIO_HOME/modelos/ggml-small.bin"
export KMP_DUPLICATE_LIB_OK=TRUE
