# Painel do afiliado: comissões e indicações (vídeo E da jornada do parceiro)

Etapa 5 do funil novo do parceiro (**Ativo**: pelo menos um cliente pagando).
Objetivo: mostrar onde o parceiro vê quanto já ganhou, quanto vai entrar e de quais indicações vem cada comissão.
É a maior dúvida de suporte depois da primeira venda.

Pasta criada em 19/10 como `2026-10-19-indicacoes-comissoes` e renomeada no mesmo dia para `2026-10-19-painel-afiliado` (ajuste de escopo pedido pela Agatha).

## Fontes
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX
- Desenho de telas (PROPOSTA de design, 16–18/10, ainda não está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - Base deste vídeo: `project/Painel.dc.html`. Ponte para o saque: `project/Saque.dc.html` (o saque tem vídeo próprio).
- Vídeos anteriores: `videos/2026-10-13-cadastro-parceiros/notas.md` (regra dos 30%) e `videos/2026-10-13-central-clientes/notas.md`.

## O que a tela Painel.dc.html mostra (de cima para baixo)
1. Título "Painel do afiliado" + botão "Seu link de indicação" (topo direito).
2. Resumo financeiro, 5 números: **Contas ativas** · **Comissão total** · **Saques realizados** · **Saldo a liberar** · **Saldo disponível** (com o botão **Sacar**).
3. **Liberações futuras**: período (16/10/2026 – 16/02/2027, dá para alterar), "Próxima liberação · 21/10/2026" com valor, "Total previsto no período" e gráfico de barras por data (próxima liberação × liberações seguintes).
4. **Histórico de saques**: Data · Valor · Status ("Liberado") · Conta bancária · Comprovante; filtro por data e paginação.
5. **Extrato de indicações**: Usuário · Plano (Pro, Basic, Starter) · Data · Comissão · % (30%, 27%, 20%) · Ciclo (Anual) · Parcelas (1/1); algumas linhas têm "—" em ciclo e parcelas.
6. Card **Link de indicação** (divisão dos 30%, link atual, Copiar, Criar novo link, Gerenciar links, Editar cadastro) e card **Dados bancários** (mascarados).

O que o funil diz sobre esta etapa: o Painel mostra só o dinheiro (indicações, comissões, saques e dados bancários); o "Sacar" pergunta se o valor vai para a carteira da Clint ou para a conta bancária; no primeiro saque o parceiro cadastra a conta, nos próximos informa o valor e envia a nota fiscal; o saque cai em até 7 dias após a confirmação. Todo afiliado recebe comissão pelo link, certificado ou não.

**O que NÃO está nas telas nem no funil (não colocar no roteiro sem a Agatha confirmar):**
quando a comissão passa de "a liberar" para "disponível"; se a comissão é recorrente; por que o % muda (30/27/20); o que significa "—" em ciclo/parcelas; e status do indicado (cadastrou/testou/pagou): o extrato não tem coluna de status.

## Perguntas para a Agatha (19/10)
1. Animar as telas do design no Remotion agora (valores fictícios) ou esperar a implementação para gravar?
2. Regra de liberação: o vídeo pode só dizer "o que ainda vai ser liberado" ou devemos explicar quando/por que libera?
3. Status do indicado: sai do escopo (o extrato não tem status) ou existe em outra tela?
4. % diferente por linha (30%, 27%, 20%): explicar ou não citar?
5. "—" em ciclo e parcelas: o que significa? Citar ou evitar?

## Respostas da Agatha (20/10)
1. **Esperar a plataforma**: não animar o design; gravar a tela real quando a plataforma nova estiver no ar. VÍDEO EM ESPERA.
2. Regra de liberação (a liberar → disponível): esperar a plataforma nova para saber.
3. Status do indicado: esperar a plataforma nova para saber.
4. % diferente por linha: **explicar o motivo no vídeo**. O motivo ainda não foi informado (perguntado em 20/10). Hipótese a confirmar, NÃO usar sem confirmação: 27% = link com divisão 27% comissão + 3% desconto; 20% nas linhas do plano Starter.
5. "—" em ciclo/parcelas: Agatha perguntou onde. No design aparece só na linha "Gabriela Souza · Pro · 21/08/2026 · 30%". Aguardando resposta.

## Roteiro proposto (v1, aguardando aprovação A; será revisto quando a plataforma nova estiver no ar)
Ver `entrada/roteiro_v1.txt`. ~65–75 s + vinheta.

## Aprovações
- A. Roteiro: pendente
- B. Storyboard: pendente
- C. Prévias: pendente
- D. Vídeo final: pendente
