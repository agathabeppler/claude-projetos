#!/bin/zsh
# Storyboard para aprovação: um quadro por cena, com o tempo e o rótulo, numa folha só.
# uso: scripts/storyboard.sh saida.jpg "1.5:Abertura" "8:Tela conversas" "14.2:Cena admin" ... [COMP=Video]
# (use o meio de cada cena/tela da timeline; 6 a 12 quadros por folha)
set -e
source "$(cd "$(dirname "$0")" && pwd)/ambiente.sh"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; OUT="$1"; shift
TMP="$(mktemp -d)"; secs=(); labels=()
for a in "$@"; do secs+=("${a%%:*}"); labels+=("${a#*:}"); done
(cd "$ROOT/remotion" && COMP="${COMP:-Video}" node storyboard.mjs "$TMP" "${secs[@]}" >/dev/null)
i=0; args=(); for s in "${secs[@]}"; do
  f="$TMP/q_$(printf %06d $(python3 -c "print(round($s*100))")).png"; l="${labels[$((i+1))]}"
  m=$(python3 -c "s=$s; print(f'{int(s//60)}:{s%60:04.1f}')")
  print -r -- "${i}  ·  ${m}  ·  ${l}" > "$TMP/t_$i.txt"
  ffmpeg -v error -y -i "$f" -vf "scale=640:-1,pad=640:400:0:40:white,drawtext=fontfile=/System/Library/Fonts/Supplemental/Arial.ttf:textfile=$TMP/t_$i.txt:x=12:y=11:fontsize=20:fontcolor=0x16142B" "$TMP/l_$i.png"
  args+=(-i "$TMP/l_$i.png"); i=$((i+1)); done
n=$i; cols=$(( n < 3 ? n : 3 ))
layout=$(python3 -c "n=$n;c=$cols;print('|'.join(f'{(k%c)*640}_{(k//c)*400}' for k in range(n)))")
if [ $n -eq 1 ]; then cp "$TMP/l_0.png" "$OUT"; else ffmpeg -v error -y "${args[@]}" -filter_complex "xstack=inputs=${n}:layout=${layout}:fill=white" "$OUT"; fi
rm -rf "$TMP"; echo "ok: $OUT ($n quadros)"
