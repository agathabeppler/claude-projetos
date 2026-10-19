# Como criar seu link de indicação (Programa de Parceiros) — vídeo C

How-to curto (~35 s + vinheta 7,3 s). **Escopo mudou em 19/10** (pedido da Agatha, via sessão orquestradora):
não é mais um corte do vídeo de cadastro; é um vídeo completo e curto sobre o link de indicação, na jornada nova.
Pasta antes chamada `2026-10-19-gerenciar-links` (renomeada). A proposta de corte anterior foi descartada.

## Fontes
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX (o modal "Gerenciar link de indicação"
  é o existente com visual novo; abre pelo menu lateral "Links de indicação", pelo Painel e pelo botão
  "Copiar link de indicação" da página do Programa de parceiros).
- Desenho de telas (PROPOSTA de design, 16–18/10, ainda não está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - `project/LinkIndicacao.dc.html` — modal "Gerenciar link de indicação":
    esquerda: "Link de indicação" · campos "Sua comissão" (%) e "Desconto do indicado" (%) — mudar um ajusta o outro (soma 30) ·
    aviso "Você tem 30% para dividir como quiser entre a sua comissão e o desconto do cliente indicado." ·
    "Link atual · X% de comissão e Y% de desconto" + "Copiar" · botão "Criar novo link com X% e Y%" · "Editar cadastro".
    direita: tabela SUA COMISSÃO · DESCONTO · LINK PLANOS · copiar · STATUS (chave ativo/desativado) · ações; paginação.
    Ao criar: o link novo entra no topo da tabela com a etiqueta "Novo" e passa a ser o "Link atual".
  - `project/Painel.dc.html` — Painel do afiliado (só financeiro): botão rosa "Seu link de indicação" no topo direito
    e card "Link de indicação" (mesmos campos, "Link atual" + "Copiar", "Criar novo link", "Gerenciar links", "Editar cadastro").
- A tabela NÃO tem nome de canal: "um link por canal" é uma dica da narração; na tela, etiquetas animadas
  (ex.: "Instagram", "WhatsApp") ao lado das linhas, como ilustração.

## Reaproveitamento do vídeo de cadastro
- Cena `Divisao30` (30% → comissão × desconto): existe no histórico (commit 2edd862,
  `remotion/src/projeto/cenas.tsx`), foi tirada do vídeo de cadastro. Combina com o bloco 1 (ajustar os rótulos para
  "Sua comissão" / "Desconto do indicado", como no design).
- Cena `Comissao` (`remotion/src/videos/2026-10-13-cadastro-parceiros/cenas.tsx`) → base do bloco 7.
- A narração do cadastro NÃO serve: usa os rótulos antigos ("Quero receber" / "oferecer"). Narração nova inteira.

## Proposta (aguardando aprovação A da Agatha)
Roteiro em `entrada/roteiro_proposto.txt`.

| # | ~Tempo | TELA/CENA | O que aparece |
|---|---|---|---|
| 1 | 0–7 | CENA (Divisao30 adaptada) | 30% se dividindo em "Sua comissão" e "Desconto do indicado" |
| 2 | 7–10,5 | TELA Painel | clique em "Seu link de indicação" (zoom no botão) |
| 3 | 10,5–16 | TELA modal | comissão 27 → 25; desconto vai sozinho de 3 → 5 (zoom nos campos) |
| 4 | 16–20 | TELA modal | clique em "Criar novo link com 25% e 5%" |
| 5 | 20–24,5 | TELA modal | link novo com "Novo" na tabela e no "Link atual"; clique em "Copiar" |
| 6 | 24,5–31,5 | TELA tabela | etiquetas Instagram/WhatsApp nas linhas; desliga a chave de um link |
| 7 | 31,5–35,5 | CENA (Comissao adaptada) | indicado fecha → comissão | + vinheta |

- Narração: HeyGen, "Voz IA 26 (clone)" voiceId 045f75696cf04e32bd1a42c507edace3 (o id do kit fba91... não existe nesta conta), elevenlabs, pt, speed 1.
- Anonimizar todos os `ref=...` (no design há ids de exemplo; trocar por um código fictício).
- Se precisar de 30 s certinhos: tirar o bloco 7 ou encurtar o 1.

## Pergunta em aberto
As telas são proposta de design. Animar/gravar o protótipo do design agora, ou esperar a implementação e gravar a tela real?

## Aprovações
- A. Roteiro: pendente. Decisão telas (design × real): pendente.
