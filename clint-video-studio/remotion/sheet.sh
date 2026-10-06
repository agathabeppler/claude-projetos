#!/bin/zsh
# uso: ./sheet.sh saida.jpg f1 f2 ... (4 colunas)
out=$1; shift; args=(); for f in "$@"; do args+=(-i stills/f$f.png); done
n=$#; ffmpeg -v error -y "${args[@]}" -filter_complex "$(for i in $(seq 0 $((n-1))); do printf "[$i]scale=640:-1[s$i];"; done)$(for i in $(seq 0 $((n-1))); do printf "[s$i]"; done)xstack=inputs=${n}:layout=$(python3 -c "
n=$n;print('|'.join(f'{(i%3)*640}_{(i//3)*360}' for i in range(n)))")" $out
