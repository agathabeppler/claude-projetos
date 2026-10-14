#!/bin/bash
# Cortes para header de template de WhatsApp: 16:9 (1280x720) + vertical 9:16 _WA com fundo desfocado.
# uso: scripts/cortes_whatsapp.sh <entrada> <saida_base> <alvo_MB> <ini1> <fim1> [<ini2> <fim2>]
# Gera <saida_base>.mp4 (16:9, 1280x720) e <saida_base>_WA.mp4 (9:16, 720x1280, fundo desfocado).
# Fade de 0,3 s (vídeo e áudio) no início e fim de cada trecho; trechos emendados com concat.
set -e
IN="$1"; OUT="$2"; MB="$3"; shift 3
F=0.3
segs=(); n=0; total=0
filt=""; ins=()
while [ $# -ge 2 ]; do
  a=$1; b=$2; shift 2
  d=$(python3 -c "print(round($b-$a,3))")
  fo=$(python3 -c "print(round($d-$F,3))")
  ins+=(-ss $a -t $d -i "$IN")
  filt+="[$n:v]setpts=PTS-STARTPTS,fps=30,fade=t=in:st=0:d=$F,fade=t=out:st=$fo:d=$F[v$n];"
  filt+="[$n:a]asetpts=PTS-STARTPTS,afade=t=in:st=0:d=$F,afade=t=out:st=$fo:d=$F[a$n];"
  segs+=("[v$n][a$n]"); n=$((n+1)); total=$(python3 -c "print($total+$d)")
done
filt+="$(IFS=; echo "${segs[*]}")concat=n=$n:v=1:a=1[cv][ca];"
ABR=96
VBR=$(python3 -c "print(int($MB*8*1024*0.97/$total - $ABR))")
TMP=$(mktemp -d)

enc() { # $1 = filtro de vídeo final (de [cv] para [vout]); $2 = arquivo
  ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt$1" -map "[vout]" -map "[ca]" -c:a aac \
    -c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v ${VBR}k \
    -maxrate $((VBR*2))k -bufsize $((VBR*2))k -pass 1 -passlogfile "$TMP/p" -f mp4 /dev/null
  ffmpeg -v error -y "${ins[@]}" -filter_complex "$filt$1" -map "[vout]" -map "[ca]" \
    -c:v libx264 -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p -b:v ${VBR}k \
    -maxrate $((VBR*2))k -bufsize $((VBR*2))k -pass 2 -passlogfile "$TMP/p" \
    -c:a aac -b:a ${ABR}k -ar 48000 -ac 2 -movflags +faststart "$2"
}
enc "[cv]scale=1280:720:flags=lanczos[vout]" "$OUT.mp4"
enc "[cv]split[x][y];[x]scale=-2:1280,crop=720:1280,boxblur=30:3,eq=brightness=-0.08[bg];[y]scale=720:-2:flags=lanczos[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[vout]" "${OUT}_WA.mp4"
rm -rf "$TMP"
for f in "$OUT.mp4" "${OUT}_WA.mp4"; do
  ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$f" | awk -F, -v f="$(basename "$f")" '{printf "%s  %.1fs  %.2f MB\n", f, $1, $2/1048576}'
done
