# Mapa da Clint para gravações

Ponto de partida para achar telas no app (`https://app.useclint.com`). O app muda; se algo não estiver onde este mapa diz, explore com o navegador de gravação (`page.goto`, `page.get_by_text`, `page.get_by_role`) e **atualize este arquivo** com o caminho correto.

## Telas já gravadas com sucesso (vídeo "Ligações por WhatsApp", out/2026)

| O que mostrar | Como chegar | Seletores/textos úteis |
|---|---|---|
| Conversas (inbox) | menu lateral › ícone de conversas | lista: `.chat-item`; nome: `[data-cy="message-area-contact-name"]` |
| Painel do negócio ao lado da conversa | abrir uma conversa › painel "PRÓXIMO NEGÓCIO" à direita | botão de telefone na fileira de ícones do contato |
| Ligar pelo WhatsApp | painel do contato › ícone de telefone › "Chamar pelo WhatsApp" | `get_by_text("Chamar pelo WhatsApp")` |
| Painel de ligação | aparece flutuando depois de ligar | botões "Ligar", "Desligar", "Cancelar"; dá para arrastar |
| Histórico do contato | contato/negócio › aba "Histórico" | filtro "Todos"; itens "Chamada de WhatsApp realizada" |
| Configurações do WhatsApp Oficial | Conversas › Configurações (engrenagem) › Dispositivos › WhatsApp Oficial › número | aba "Chamadas por WhatsApp", chave "Usar chamadas do WhatsApp neste dispositivo" |
| Modelos de mensagem | Conversas › Configurações › Modelos de mensagem › "Criar modelo WhatsApp" | tipo do modelo: "Pedido de permissão de chamada" |
| Contatos | menu lateral › Contatos | botão de ligar na linha do contato |
| Negócio (deal) | `https://app.useclint.com/deal/<id>` | ícones de ação: telefone, agenda, e-mail, lembrete, tarefa, nota |
| Quadro de negócios (kanban) | menu lateral › Negócios | cartões: `[data-cy="kanban-card"]`; nome: `[data-cy="tbl-deal-item-name"]` |
| Filtros de conversas | Conversas › ícone de filtro | ex.: "Janela de chamada aberta" |
| Central de Ajuda | ícone "?" no rodapé do menu lateral › Central de Ajuda | busca por artigo |

## Contato de teste

Use sempre o mesmo contato de teste para ações (ligar, enviar modelo): **Rafaela Silva** (negócio `164a4d57-8ad7-4adc-9c95-6442bd03c24b`). Ele está na lista `KEEP` do `anon.js`, então aparece com o nome real; todos os outros clientes viram nomes fictícios automaticamente.

## Boas práticas de gravação

- Navegue até a tela no `preparar_<nome>` (fora da gravação) e grave só a ação.
- Ritmo humano: mova o cursor com `c.clicar(...)` (ele para ~0,5 s antes de clicar), espere a tela reagir (`c.pausa(0.8–1.5)`), digite com `c.digitar(...)`.
- Grave cada tomada ~20% mais longa que o trecho de fala: o `montar_telas.py` ajusta a velocidade para caber.
- Ações que custam dinheiro ou falam com clientes de verdade (ligar para alguém real, enviar mensagem a cliente, aprovar pagamento) **não** são feitas: use o contato de teste ou pare no último passo antes de confirmar.
