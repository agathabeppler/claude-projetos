# Como sacar suas comissões (vídeo F da jornada do parceiro)

**Mudança de escopo (19/10, pedido da Agatha, repassado por outra sessão):** o vídeo "editar cadastro e dados bancários"
foi descartado. No funil novo, a conta bancária é cadastrada no primeiro saque. Pasta renomeada de
`2026-10-19-editar-cadastro-parceiro` para `2026-10-19-sacar-comissoes`.

## Fontes
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX (Painel do afiliado = só dinheiro: indicações,
  comissões, saques, dados bancários; "Sacar" → carteira ou conta; 1º saque cadastra a conta; depois valor + nota fiscal; até 7 dias).
- Desenho de telas (PROPOSTA de design 16–18/10, ainda NÃO está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR,
  telas `project/Painel.dc.html` e `project/Saque*.dc.html`.

## O que as telas mostram
- **Painel do afiliado**: cartões Contas ativas, Comissão total, Saques realizados, Saldo a liberar, **Saldo disponível** com botão **"Sacar"**;
  "Liberações futuras" (próxima liberação); "Histórico de saques" (data, valor, status, conta bancária, comprovante).
- **Modal "Usar o saldo de comissões"** (mostra "Saldo disponível: R$ …"), pergunta "O que você quer fazer com as comissões?":
  - "Usar como saldo na carteira da Clint" — "Para usar dentro da Clint."
  - "Sacar na sua conta bancária" — "Com nota fiscal, em até 7 dias."
  - Cancelar / Continuar
- **Carteira**: "Valor que vai para a carteira" › "Enviar para a carteira" › "Valor enviado para a carteira".
- **1º saque — "Cadastre sua conta bancária"**: Banco, Agência, Conta com dígito, Tipo de conta (Corrente/Poupança),
  CNPJ do titular, Razão social do titular ("Igual à da nota fiscal") › "Salvar e continuar".
- **"Sacar na conta bancária"**: "Valor que deseja sacar"; "Conta bancária para recebimento" (cartão da conta + link **"Trocar conta"**);
  "Nota fiscal" › "Enviar nota fiscal" (arquivo aparece em verde, com "Remover");
  caixa "A nota fiscal deve ser emitida com estas informações": CNPJ 36.569.594/0001-01 · Clint Hub Serviços Digitais LTDA ·
  Rua Santos Saraiva, 320, 2º andar · Descrição: Programa de Indicação de Parceiros - Clint (dados da Clint: podem aparecer como estão);
  "O saque é feito em até 7 dias após a confirmação." › "Confirmar saque" › "Saque solicitado — O valor cai na sua conta em até 7 dias."
- "Trocar conta" aqui é o link da tela de saque (trocar a conta bancária), não o modal de troca de conta Clint.

## Dados fictícios do parceiro (usar no vídeo)
Rafaela Silva Consultoria LTDA · CNPJ 12.345.678/0001-90 · Banco 077 – Banco Inter (fictício para o vídeo) · Ag 0001 · Conta 1234567-8 ·
Corrente · valor R$ 1.250,00 · arquivo "nota-fiscal-outubro.pdf". Não usar a conta de exemplo do design (260 – Nu, 82369994-2).

## Pergunta para a Agatha (decide o plano de produção)
As telas ainda são proposta. O vídeo deve **(a)** animar as telas do design agora (recriadas no Remotion, no estilo da marca)
ou **(b)** esperar a implementação para gravar a plataforma? Se o design mudar até o lançamento, (a) precisa de ajuste.
Outras dúvidas: existe valor mínimo de saque? A carteira não pede nota fiscal (confirmar)?

## Roteiro proposto (v1, 19/10) — aguardando aprovação A
Texto em entrada/roteiro_proposto.txt. TELA = tela do produto (animada a partir do design ou gravada, conforme resposta).

| # | Tipo | O que aparece | ~s |
|---|---|---|---|
| 1 | CENA | Gancho: moedas caindo num cartão "Saldo disponível", título "Saque suas [comissões]" | 5 |
| 2 | TELA | Painel do afiliado › zoom no Saldo disponível e no botão "Sacar" | 6 |
| 3 | TELA | Modal com as 2 opções (carteira × conta) | 7 |
| 4 | TELA | Seleciona "Sacar na sua conta bancária" › Continuar | 4 |
| 5 | TELA | "Cadastre sua conta bancária": campos preenchidos um a um (fictícios) › Salvar e continuar | 12 |
| 6 | TELA | Valor que deseja sacar | 4 |
| 7 | TELA | Enviar nota fiscal + zoom na caixa com os dados exigidos | 11 |
| 8 | TELA | Confirmar saque › "Saque solicitado" + selo "até 7 dias" | 7 |
| 9 | TELA | Saque seguinte: conta já preenchida, zoom em "Trocar conta" | 8 |
| 10 | TELA | Carteira: valor › "Enviar para a carteira" › "Valor enviado" | 7 |
| 11 | CENA | Final "Indicou, ganhou, sacou" (reaproveita Final de 2026-10-13-cadastro-parceiros) → vinheta | 5 |
Total ~75 s + vinheta.

## Aprovações
- A. Roteiro: pendente (e decisão animar design × gravar).
