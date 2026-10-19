# Como gerenciar vários links de indicação (Programa de Parceiros)

How-to curto (15–30 s + vinheta). Objetivo: criar, ativar e desativar links no modal "Gerenciar link de indicação"
e usar uma divisão diferente (comissão × desconto dos 30%) por canal. Cada divisão = um link próprio.
Formato: corte do vídeo `2026-10-13-cadastro-parceiros` (blocos 9c–9e da narração v2) + 2 frases novas.

## Status do vídeo base (19/10)
- Narração v2 do base existe (`videos/2026-10-13-cadastro-parceiros/entrada/narracao.wav`, 114,8 s).
- **Gravações de tela do base ainda NÃO existem** (nem `telas.mp4`, nem em outras branches). A TELA B (conta 2,
  já parceira) ainda precisa ser gravada no Mac → este corte depende dela.
- A tomada do base não mostra ativar/desativar nem a tabela com vários links → precisa de **1 tomada extra**.

## Tempos medidos no áudio do base (pausas, ffmpeg silencedetect)
- 9c: 76,05 "Para isso," · pausa 76,65–77,01 · 77,01 "clique em: Seu link de indicação, no canto superior direito." até 81,25
- 9d: 81,73–96,43 (exemplo 25 + 5 em ~89,3–93,4; "Criar novo link" ~95,2)
- 9e: 96,84–101,27 "Cada link guarda a sua própria divisão, e você pode ter quantos quiser." · 101,54–103,89 "É só clicar em Copiar e compartilhar."

## Avaliação: o corte sozinho basta?
Não. (1) Começa com "Para isso," — que se refere à frase anterior (divisão dos 30%) e fica solto;
(2) não fala de ativar/desativar, que é parte do objetivo; (3) não diz "um link por canal".
O corte puro 9c–9e teria 28,6 s.

## Proposta (aguardando aprovação A da Agatha)
Roteiro em `entrada/roteiro_proposto.txt`. ~30 s de fala + vinheta 7,3 s.

| # | Trecho | Origem | TELA/CENA | O que aparece |
|---|---|---|---|---|
| 1 | ~0–3,3 | NOVA: "Quer uma divisão diferente para cada canal? Crie vários links!" | CENA | 3 cartões de canal (ex.: Instagram 25/5, WhatsApp 20/10, YouTube 15/15) entrando palavra por palavra |
| 2 | ~3,6–7,9 | base 77,01–81,25 (sem "Para isso,") | TELA | Painel do afiliado › clique em "Seu link de indicação" (zoom no botão) |
| 3 | ~8,2–22,9 | base 81,73–96,43 | TELA | Modal: Quero receber 25 / oferecer 5 › "Criar novo link" |
| 4 | ~23,2–25,6 | base 101,54–103,89 | TELA | Clique em "Copiar" |
| 5 | ~25,9–30,4 | NOVA: "Cada link guarda a sua divisão. Na lista ao lado, você ativa ou desativa cada um quando quiser." | TELA | Tabela à direita com 2–3 links; desliga um e liga de novo (zoom no status) |

- Frases novas: HeyGen, mesma voz do base ("Voz IA 26 (clone)" voiceId 045f75696cf04e32bd1a42c507edace3, elevenlabs, pt, speed 1).
- Risco: emenda em "clique em:" pode soar como meio de frase. Se soar estranho, a frase 1 nova passa a incluir
  "Clique em Seu link de indicação, no canto superior direito" e o bloco 2 sai.
- Versão mais curta (~25 s), se preferir: tirar o exemplo "vinte e cinco… cinco de desconto" (o print mostra 25/5 na tela).

## Gravação (no Mac, junto da conta 2 do vídeo base)
- Reaproveitar a tomada da TELA B do base a partir de "Seu link de indicação" (base 75,94–104,47).
- Tomada extra `gerenciar_links`: modal aberto com 2–3 links na tabela (Sua comissão, Desconto, Link, copiar, status),
  desligar um link e ligar de novo. Anonimizar todos os `ref=...`. Desativar os links de teste no fim.

## Pastas (mesmo nome)
- `videos/2026-10-19-gerenciar-links/` (esta) · `remotion/src/videos/2026-10-19-gerenciar-links/` e
  `remotion/public/videos/2026-10-19-gerenciar-links/` serão criadas depois da aprovação (código + telas.mp4).

## Aprovações
- A. Roteiro/corte: pendente.
