# Método 01 · Cliente oculto (Etapa 1 · Vender)

Primeiro vídeo da série how-to do Método de Aceleração Comercial (ver `referencias/metodo-aceleracao-comercial/serie.md`).
Fonte: seção "01 Cliente oculto" da LP + material "Registro do cliente oculto".

- Formato: narração + tela, 2–3 min (~285 palavras de narração, ~1:50–2:00 + vinheta de 7,3 s).
- Roteiro: `entrada/roteiro.txt` (v2, versão curta).

## Plano de cenas (aprovação A)

| # | Trecho | Tipo | O que aparece |
|---|---|---|---|
| 1 | Abertura: "primeiro passo… slide mais importante da sua proposta" | CENA | Selo da série "Método de Aceleração Comercial · Etapa 1 · Vender" → título "01 · [Cliente oculto]"; um slide de proposta brilhando |
| 2 | "O erro mais comum… mostrando onde a venda vaza" | CENA | Balão "Como está a operação?" riscado → lupa sobre um funil com um vazamento pingando |
| 3 | "Use os canais reais… com o horário aparecendo" | CENA | Chips Anúncio, Site, Formulário, WhatsApp; flash de print com relógio 09:12 |
| 4 | "Agora, meça seis coisas" + itens 1 a 6 | CENA | Celular com conversa fictícia (lead "Rafaela Silva" escrevendo para uma empresa fictícia); cada item vira um card numerado que entra na palavra exata: cronômetro 09:12 → 11:47 (2h35), "visto" sem resposta, contador de mensagens, "Oi, ainda tem interesse?" que nunca chega, pergunta sem pergunta de volta, anúncio → página → formulário com erro |
| 5 | "Não confie na memória… é fato" | CENA | Balão de opinião × print com horário e selo "fato" |
| 6 | "Registro do cliente oculto… frase pronta" | TELA | Página pública do material (lp.useclint.com/…/registro-cliente-oculto.html): card do Canal 1 sendo preenchido com dados fictícios, tempo calculado, resumo gerado |
| 7 | "slide 'O que ouvimos'… nenhum concorrente consegue copiar" | CENA | A frase gerada voa para um slide "O que ouvimos" |
| 8 | "Com o cliente oculto feito… próximo vídeo" | CENA | Trilha da Etapa 1 com 5 passos; 01 marcado, 02 Diagnóstico acende → vinheta |

## Produção (16/10, sessão na nuvem)
- Narração: HeyGen "Voz IA 26 (clone)" voiceId 045f75696cf04e32bd1a42c507edace3, elevenlabs, pt, speed 1 → `entrada/narracao.wav` (114,6 s).
  Tempos por palavra vieram do próprio HeyGen: `entrada/narracao.palavras.txt` (sem whisper).
- Trilha: padrão "Comida" (GlowCity) para a série toda (escolha da Agatha), estendida em `entrada/trilha.wav`.
- Tela do Registro: prints 2x da página pública, preenchida com dados fictícios (WhatsApp 09:12 → 11:47, 7 mensagens, sem follow-up;
  formulário do site sem resposta), locale pt-BR. Em `remotion/public/videos/2026-10-16-metodo-01-cliente-oculto/r*.png`.
- Código: `remotion/src/videos/2026-10-16-metodo-01-cliente-oculto/` · composição `Metodo01ClienteOculto`.
- Cenas (s): Abertura 0–10,6 · Erro 10,6–26,5 · Canais 26,5–37,4 · Seis 37,4–82,3 · Memória 82,3–88,9 · TelaRegistro 88,9–101,9 · Slide 101,9–108,6 · Final 108,6–114,9.
- Final: `saida/Metodo 01 - Cliente oculto.mp4` (122,2 s com vinheta, -14,7 LUFS). Não vai para o Git.

- Narração v3 (16/10): HeyGen speed 1,2 direto (`entrada/narracao_v3.wav`, 84,8 s). A v2 (áudio esticado 1,2x com rubberband) ficou robotizada — NÃO esticar áudio.
  Cenas sincronizadas por mapa de âncoras (narração original → v3) em `cenas.tsx` (`criarMapa`, `src/videos/metodo-tempo.ts`).
  Final: 1:32 com vinheta, -14,9 LUFS.

## Aprovações
- A. Roteiro e plano: aprovado (16/10)
- Trilha: "Comida" para a série (16/10) → TROCADA (16/10): Agatha pediu algo menos "feliz", vibe escritório.
  Escolhida: "Minimal Tech Corporate Background" — LofiDog (Envato, id a76e0b66-9338-49a0-b7d0-85cd0cfc5bbf). Vale para a série toda.
  Aguardando o arquivo licenciado (a Agatha baixa pela conta do Envato; a prévia pública não pode ir para o final).
- Vídeo completo v1: ajustes pedidos (narração lenta → 1,2x; fala cortada no fim → corrigido no mixar_final.sh)
