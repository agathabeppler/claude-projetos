# Saúde da conta do cliente (vídeo G da jornada do parceiro)

Objetivo: ensinar o parceiro a ler a saúde da conta do cliente na Central de Clientes e a agir quando a nota cai
(chance de upsell ou risco de cancelamento). Ligar ao funil: cliente saudável continua pagando, o que mantém a
conta free do parceiro e a comissão.

## Fontes (19/10)
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX
- Desenho de telas (PROPOSTA de design, 16–18/10, ainda não está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - `Central.dc.html`: coluna "SAÚDE DA CONTA" + botão "Ver saúde" (substitui o ícone ⓘ do vídeo de 13/10).
  - `SaudeConta.dc.html`: modal com a nota, a barra 0–100, "Faltam X pontos para 100", 4 grupos de indicadores e
    "Ver recomendações" (abre "O que fazer para chegar a 100" no mesmo modal; não existe arquivo `SaudeContaRecs` separado).
  - `SaudeContaAtivacao.dc.html`: conta nova "Em ativação", "Dia 17 de 45", "A nota aparece quando a conta completar 45 dias".
- Vídeo anterior: `videos/2026-10-13-central-clientes/notas.md`.

## O que as telas mostram (dados fictícios do design)
- Central: Escola Norte "42 · Estável · Medido hoje"; Curso Sul "61 · Saudável · Medido hoje";
  Clínica Vida "– · Em ativação · Nota a partir de 45 dias"; Instituto Leste "Aguardando" (saúde disponível depois que o cliente aprovar).
- Indicadores do modal: PESSOAS E ESTRUTURA (usuários ativos, origens) · CONVERSAS (canais conectados) ·
  AUTOMAÇÃO (agente de IA, campanhas de WhatsApp) · CONEXÕES (integrações ativas).
- Recomendações da Escola Norte: colocar o time de vendas na conta; publicar agente de IA também no Instagram;
  manter campanhas de WhatsApp em dia.
- Funil: conta free (plano MAX, 5 usuários) vale enquanto houver ao menos 1 cliente pagando; se o último cancelar,
  30 dias para recuperar. Comissão no Painel do afiliado.

## Regras
- NÃO citar "Revogar" (aparece na tela da Central; cobrir/cortar no vídeo).
- Dados sempre fictícios. Não inventar faixas de nota nem critérios: perguntar à Agatha.

## Perguntas em aberto para a Agatha (19/10)
1. Faixas da nota: além de "Estável" e "Saudável", quais estados existem e qual intervalo de cada um?
2. Ação recomendada pelo time em cada faixa (upsell × risco de cancelamento).
3. Animar as telas do design agora ou esperar a implementação para gravar a tela real?
4. Frequência da medição ("Medido hoje").

## Decisões
- (aguardando respostas)
