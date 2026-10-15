#!/bin/bash
# Corte quadrado 1080x1080 para header de template de WhatsApp, com encerramento de marca.
# uso: [VEL=1.05] scripts/cortes_whatsapp_quadrado.sh <entrada> <saida.mp4> <alvo_MB> <card.png> <ini1> <fim1> [<ini2> <fim2> ...]
# - Cada trecho [ini, fim] da entrada vira 1080x1080: vídeo inteiro centralizado sobre o próprio quadro ampliado e desfocado.
# - "fim" pode ser "fim_audio@fim_video": o vídeo para antes e congela o último quadro até o fim do áudio
#   (útil quando o original tem uma transição logo depois da última palavra).
# - VEL acelera os trechos (áudio com atempo, sem mudar o tom). Até ~1,1 soa natural.
# - Fade de 0,3 s (vídeo e áudio) no início e fim de cada trecho; trechos emendados com concat.
# - Termina com a vinheta da Clint a partir de 1,3 s (ampliada 1,35x e recortada com o logo centralizado na horizontal, um pouco acima do meio) e o <card.png>
#   (1080x1080, transparente) entrando junto com o logotipo, com a chamada para a ação.
# - H.264 High + AAC 96 kbps, 2 passadas mirando <alvo_MB>.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
VIN="$DIR/assets/vinheta-clint.mp4"; VIN_INI=1.3
VEL="${VEL:-1}"
IN="$1"; OUT="$2"; MB="$3"; CARD="$4"; shift 4
F=0.3
ins=(); filt=""; segs=""; n=0; total=0
py() { python3 -c "print($1)"; }
while [ $# -ge 2 ]; do
  a=$1; b=${2%@*}; bv=${2#*@}; shift 2
  d=$(py "round($b-$a,3)"); dv=$(py "round($bv-$a,3)")
  ds=$(py "round($d/$VEL,3)"); fo=$(py "round($ds-$F,3)"); pad=$(py "round(($d-$dv)/$VEL,3)")
  ins+=(-ss "$a" -t "$d" -i "$IN")
  filt+="[$n:v]trim=0:$dv,setpts=(PTS-STARTPTS)/$VEL,fps=30,tpad=stop_mode=clone:stop_duration=$pad,split[x$n][y$n];"
  filt+="[x$n]scale=-2:1080,crop=1080:1080,boxblur=30:3,eq=brightness=-0.10[bg$n];[y$n]scale=1080:-2:flags=lanczos[fg$n];"
  filt+="[bg$n][fg$n]overlay=(W-w)/2:(H-h)/2,setsar=1,trim=0:$ds,fade=t=in:st=0:d=$F,fade=t=out:st=$fo:d=$F[v$n];"
  filt+="[$n:a]asetpts=PTS-STARTPTS,aresample=48000,atempo=$VEL,atrim=0:$ds,afade=t=in:st=0:d=$F,afade=t=out:st=$fo:d=$F[a$n];"
  segs+="[v$n][a$n]"; n=$((n+1)); total=$(py "$total+$ds")
done
VD=$(py "round($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIN")-$VIN_INI,3)")
ins+=(-ss "$VIN_INI" -i "$VIN" -loop 1 -t "$VD" -i "$CARD")
c=$((n+1))
filt+="[$c:v]format=rgba,fade=t=in:st=0.8:d=0.5:alpha=1[card];"
filt+="[$n:v]fps=30,scale=-2:1458,crop=1080:1080:713:354,setsar=1,format=yuv420p[vb];[vb][card]overlay=shortest=1[v$n];"
filt+="[$n:a]aresample=48000,afade=t=in:st=0:d=0.15[a$n];"
segs+="[v$n][a$n]"; n=$((n+1)); total=$(py "$total+$VD")
filt+="${segs}concat=n=$n:v=1:a=1[vout][aout]"
ABR=96
VBR=$(py "int($MB*8*1024*0.96/$total - $ABR)")
TMP=$(mktemp -d)
X264=(-c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v ${VBR}k -maxrate $((VBR*2))k -bufsize $((VBR*2))k)
ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt" -map "[vout]" -map "[aout]" "${X264[@]}" -c:a aac -pass 1 -passlogfile "$TMP/p" -f mp4 /dev/null
ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt" -map "[vout]" -map "[aout]" "${X264[@]}" -pass 2 -passlogfile "$TMP/p" \
  -c:a aac -b:a ${ABR}k -ar 48000 -ac 2 -movflags +faststart "$OUT"
rm -rf "$TMP"
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT" | awk -F, -v f="$(basename "$OUT")" '{printf "%s  %.1fs  %.2f MB\n", f, $1, $2/1048576}'
