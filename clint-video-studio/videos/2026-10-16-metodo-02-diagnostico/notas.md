# Método 02 · Diagnóstico comercial (Etapa 1 · Vender)

Segundo vídeo da série (ver `referencias/metodo-aceleracao-comercial/serie.md`). Fonte: seção "02 Diagnóstico comercial" da LP
+ material "Banco de perguntas" (https://lp.useclint.com/metodo-aceleracao-comercial/materiais/banco-de-perguntas.html, público).

Padrões herdados do 01: narração Voz IA 26 (clone) acelerada 1,2x; trilha "Comida"; abertura com o selo da série;
fechamento com a trilha da Etapa 1 (02 concluído, 03 Preço acendendo). Vídeo é APOIO para quem está lendo o Método:
mostrar o passo acontecendo, sem repetir a página inteira.

- Roteiro v1: `entrada/roteiro.txt` (~340 palavras → ~1:50 com 1,2x + vinheta).

## Plano de cenas (aprovação A)

| # | Trecho | Tipo | O que aparece |
|---|---|---|---|
| 1 | Abertura: "Segundo passo… investigar, não apresentar" | CENA | Selo da série → "02 · [Diagnóstico comercial]"; "Investigar" ganha de "Apresentar" (slide de apresentação riscado, lupa) |
| 2 | "Você chega… sai com três coisas" | CENA | Print do cliente oculto entrando à esquerda → 3 cartões de saída: problema dimensionado, decisor, proposta marcada |
| 3 | "Adapte o vocabulário…" | CENA | Tabela de segmentos: Clínica → "no-show", Educação → "matrícula", Crédito → "lead = proposta" |
| 4 | Os quatro blocos | CENA | 4 cartões (1 Negócio e número · 2 Onde vaza · 3 O que já existe · 4 Dor e decisão); cada um abre com 2–3 perguntas de exemplo; no bloco 2, o print do cliente oculto volta ("compare"); no bloco 3, alerta "API oficial: só descubra, não peça migração" |
| 5 | "E não pergunte tudo…" | CENA | Lista longa de perguntas encolhendo para só as que dimensionam e precificam; "funil → etapa 2" |
| 6 | A pergunta do problema único | CENA | A pergunta grande em destaque; caderno anotando a resposta "entre aspas" → a mesma frase aparecendo num slide da proposta |
| 7 | Checklist de saída | CENA | 5 caixas sendo marcadas na palavra exata |
| 8 | "O Banco de perguntas está nos materiais…" | TELA | Página pública do Banco de perguntas: tabela de vocabulário → rolando pelos 4 blocos → destaque "A pergunta do problema único" |
| 9 | "No próximo vídeo: … preço" | CENA | Trilha da Etapa 1: 01 e 02 concluídos, 03 Preço acende → vinheta |

## Produção (16/10)
- Narração: Voz IA 26 (clone) → `entrada/narracao.wav` (125,9 s) → `entrada/narracao_rapida.wav` (rubberband 1,2x, 104,9 s).
  Tempos-chave em `entrada/narracao.palavras.txt` (narração original; no código L(s) = s / K - g0, K = 1,2).
- Tela: prints 2x do Banco de perguntas (topo, vocabulário, pergunta do problema único) em `remotion/public/videos/2026-10-16-metodo-02-diagnostico/`.
- Código: `remotion/src/videos/2026-10-16-metodo-02-diagnostico/` · composição `Metodo02Diagnostico`. Reaproveita Badge/Chip/Tile/MiniSlide do vídeo 01.
- Trilha "Comida". Final: `saida/Metodo 02 - Diagnostico comercial.mp4` (1:53 com vinheta, -14,9 LUFS).

## Aprovações
- A. Roteiro e plano: aprovado (16/10)
- Vídeo completo v1: aguardando
