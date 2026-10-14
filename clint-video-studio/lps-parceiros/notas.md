# Vídeos das LPs do Programa de Parceiros

Roteiros aprovados: documento "Roteiros: vídeos de demonstração das LPs de parceiros"
(https://claude.ai/artifact/5J98a6hnYqKJ5oWvLKREyZ).

## Decisões

- Chamada final: botão "Quero ser parceiro Clint" + vinheta da Clint.
- Duração: até 90 s sem a vinheta; cada vídeo segue o ritmo da narração.
- Telas: gravadas na conta demo da Clint (pendente: acesso à conta demo neste ambiente).
- Narração: Voz IA 26 (HeyGen, conta do time), `elevenlabs`, `pt`, velocidade 1, gerada em 07/10/2026.
  Arquivos em `remotion/public/lps/lpN.wav` (originais, sem edição).

| LP | Narração | sha256 (início) |
|---|---|---|
| LP1 · Ferramenta ruim ou cara | 61,8 s | 0fcaeb8fb2b719c6 |
| LP2 · Gestão do time de vendas | 51,0 s | e04a27d9c564cabc |
| LP3 · Indicadores e origem do lead | 51,7 s | ccb62b0806e49658 |
| LP4 · WhatsApp API Oficial | 51,7 s | d05cfb0919e10427 |
| LP5 · Comparativo de CRMs | 70,7 s | da900a76c010fe66 |

## Blocos (segundos da narração)

| LP | Dor | Virada | Na prática (TELA) | Fechamento |
|---|---|---|---|---|
| LP1 | 0–14,3 | 15,3–28,6 | 29,5–49,2 | 50,3–61,5 |
| LP2 | 0–11,3 | 12,2–17,4 | 18,1–41,4 | 42,2–50,8 |
| LP3 | 0–13,5 | 14,5–19,5 | 20,3–43,3 (vendas → Meta/Google vira animação em 37,9) | 44,1–51,4 |
| LP4 | 0–11,4 | 12,4–18,8 | 19,8–39,8 | 40,7–51,4 |
| LP5 | 0–11,0 | 12,4–15,0 | 16,0–49,6 (perguntas 1–5) | 50,7–70,5 |

Os tempos por palavra usados nas cenas estão direto no código (`remotion/src/lps/lpN.tsx`).

## Gravações de tela a fazer (conta demo)

- LP1: funil com leads por etapa; conversa do WhatsApp dentro do card; arrastar card de etapa; automação de lead novo (mensagem + tarefa); importação de planilha.
- LP2: conversas por vendedor (número da empresa); distribuição de leads; análise de conversa com IA; Aura respondendo "quem demorou mais para responder esta semana?"; tarefas dos negócios.
- LP3: origem do lead no card; funil por origem; dashboards (conversão por canal/etapa/vendedor, custo por venda).
- LP4: conversas com vários atendentes no mesmo número; modelos de mensagem; lead de Click to WhatsApp com campanha; agente de IA respondendo.
- LP5: conversa no card (sem QR Code); funil visual; Aura criando uma automação a partir de um pedido.

## Status

- [x] Roteiros aprovados
- [x] Narrações (Voz IA 26)
- [ ] Cenas animadas (dor, virada, fechamento) → storyboard. Feitas: LP1 (conferida em quadros) e LP2. Faltam LP3, LP4, LP5.
      Código em `remotion/src/lps/` (composições LP1, LP2… no Remotion). As gravações entram no lugar dos blocos `TelaPendente`.
- [ ] Gravações de tela na conta demo
- [ ] Prévia de trechos
- [ ] Trilha (5 opções)
- [ ] Render + vinheta + checagens
