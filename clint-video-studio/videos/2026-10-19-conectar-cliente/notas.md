# Como conectar um cliente (parceiro acessa a conta do cliente)

Vídeo D da jornada do parceiro. Passo 2 da página do programa certificado e semana 4 do Método
(Etapa 2 · Implantar: o cliente entra pelo link de indicação).

## Escopo (ajuste de 19/10, pedido da Agatha)
- Antes: "Como acessar a conta do cliente e ajudar na implementação" (pasta 2026-10-19-acessar-conta-cliente, nunca criada).
- Agora: mostrar "Pedir acesso" na Central de Clientes, o status "Aguardando o cliente aprovar o acesso"
  com "Cancelar pedido", o "Acessar conta" e o modal novo "Trocar de conta" do menu principal.
- Contexto: o plano MAX grátis é só da agência; cada cliente usa a Clint na conta dele e o parceiro
  acessa pela Central. Clientes conectados também contam para os requisitos da certificação.
- Mensagem: cliente bem implementado fica, e a comissão é recorrente.
- NÃO aprofundar a saúde da conta (tem vídeo próprio). NÃO citar "Revogar" (esconder o botão nas telas).
- Na Central só aparecem clientes que entraram pelo link de indicação.

## Referências
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX
- Desenho de telas (16–18/10): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - `project/Central.dc.html`: abas Todos 4 / Ativos 3 / Aguardando 1 / Encerrados 0; colunas Cliente,
    Atividade recente, Status, Saúde da conta, Ações; clientes fictícios Escola Norte, Clínica Vida,
    Curso Sul (ativos) e Instituto Leste (aguardando, "Cancelar pedido").
  - `project/TrocarConta.dc.html`: "Você está em" (RT Aceleração, conta atual), busca, filtros por status,
    lista com "Acessar conta" (ativos) ou "Esperando o cliente aprovar" / "Sem acesso"; rodapé
    "Gerenciar na Central de Clientes" e "Pedir acesso a um cliente".
- O desenho não tem modal novo de "Pedir acesso"; o modal atual está no vídeo da Central
  (`remotion/public/videos/2026-10-13-central-clientes/pedir_acesso.png`).

## Pendências com a Agatha
- [x] Animar o design ou esperar? → **B: esperar a implementação e gravar as telas reais** (Agatha, 19/10).
  Até lá não grava nada. Quando as telas estiverem no ar, gravar com o navegador de gravação
  (Central, Pedir acesso, aba Aguardando, Acessar conta, Trocar de conta), escondendo/sem focar "Revogar".
- [ ] Quais tarefas de implementação mostrar dentro da conta do cliente?
- [ ] Aprovação A (roteiro e plano).
