#!/bin/bash
# Corte quadrado 1080x1080 para header de template de WhatsApp, com encerramento de marca.
# uso: scripts/cortes_whatsapp_quadrado.sh <entrada> <saida.mp4> <alvo_MB> <card.png> <ini1> <fim1> [<ini2> <fim2> ...]
# - Cada trecho [ini, fim] da entrada vira 1080x1080: vídeo inteiro centralizado sobre o próprio quadro ampliado e desfocado.
# - Fade de 0,3 s (vídeo e áudio) no início e fim de cada trecho; trechos emendados com concat.
# - Termina com a vinheta da Clint (assets/vinheta-clint.mp4, recorte central) e o <card.png> (1080x1080, transparente)
#   entrando aos 2 s da vinheta, com a chamada para a ação.
# - H.264 High + AAC 96 kbps, 2 passadas mirando <alvo_MB>.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
VIN="$DIR/assets/vinheta-clint.mp4"
IN="$1"; OUT="$2"; MB="$3"; CARD="$4"; shift 4
F=0.3
ins=(); filt=""; segs=""; n=0; total=0
while [ $# -ge 2 ]; do
  a=$1; b=$2; shift 2
  d=$(python3 -c "print(round($b-$a,3))"); fo=$(python3 -c "print(round($d-$F,3))")
  ins+=(-ss "$a" -t "$d" -i "$IN")
  filt+="[$n:v]setpts=PTS-STARTPTS,fps=30,split[x$n][y$n];"
  filt+="[x$n]scale=-2:1080,crop=1080:1080,boxblur=30:3,eq=brightness=-0.10[bg$n];[y$n]scale=1080:-2:flags=lanczos[fg$n];"
  filt+="[bg$n][fg$n]overlay=(W-w)/2:(H-h)/2,setsar=1,fade=t=in:st=0:d=$F,fade=t=out:st=$fo:d=$F[v$n];"
  filt+="[$n:a]asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:st=0:d=$F,afade=t=out:st=$fo:d=$F[a$n];"
  segs+="[v$n][a$n]"; n=$((n+1)); total=$(python3 -c "print($total+$d)")
done
VD=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIN")
ins+=(-i "$VIN" -loop 1 -t "$VD" -i "$CARD")
c=$((n+1))
filt+="[$c:v]format=rgba,fade=t=in:st=2.0:d=0.5:alpha=1[card];"
filt+="[$n:v]fps=30,crop=1080:1080:(iw-1080)/2:0,setsar=1,format=yuv420p,fade=t=in:st=0:d=$F[vb];[vb][card]overlay=shortest=1[v$n];"
filt+="[$n:a]aresample=48000,afade=t=in:st=0:d=$F[a$n];"
segs+="[v$n][a$n]"; n=$((n+1)); total=$(python3 -c "print($total+$VD)")
filt+="${segs}concat=n=$n:v=1:a=1[vout][aout]"
ABR=96
VBR=$(python3 -c "print(int($MB*8*1024*0.96/$total - $ABR))")
TMP=$(mktemp -d)
X264=(-c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v ${VBR}k -maxrate $((VBR*2))k -bufsize $((VBR*2))k)
ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt" -map "[vout]" -map "[aout]" "${X264[@]}" -c:a aac -pass 1 -passlogfile "$TMP/p" -f mp4 /dev/null
ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt" -map "[vout]" -map "[aout]" "${X264[@]}" -pass 2 -passlogfile "$TMP/p" \
  -c:a aac -b:a ${ABR}k -ar 48000 -ac 2 -movflags +faststart "$OUT"
rm -rf "$TMP"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT" | awk -F, -v f="$(basename "$OUT")" '{printf "%s  %.1fs  %.2f MB\n", f, $1, $2/1048576}'
