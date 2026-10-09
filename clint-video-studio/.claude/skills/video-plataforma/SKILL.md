---
name: video-plataforma
description: Produz um vídeo de apresentação da plataforma Clint para um segmento (educação, saúde, serviços…) no mesmo modelo do vídeo publicado no YouTube — uma história com personagem que atravessa a jornada inteira (agente de IA → funil → conversas → ligações → rotina → campanhas → indicadores → Aura → integrações → agentes de bastidores → app), fechando com a volta do personagem e a chamada "Quem vende usa." Use sempre que pedirem um vídeo "sobre a plataforma", institucional, de visão geral, por segmento ou para anúncio/site/YouTube.
---

# Vídeo da plataforma Clint

**Modelo obrigatório:** `referencias/video-plataforma-educacao.md` (vídeo do YouTube https://www.youtube.com/watch?v=-uz5VeGj1ns). Leia a transcrição inteira antes de escrever qualquer roteiro. Todo vídeo sobre a plataforma segue essa estrutura, esse tom e esse ritmo; o que muda é o segmento, o personagem e os exemplos.

A produção (narração, gravações, cenas, prévias, trilha, mixagem, checagens) é a mesma da skill `/video-lancamento`, etapas 0 e 2–9, com as regras do `CLAUDE.md`. Esta skill define o que é diferente: **o roteiro e o plano de cenas**.

## 1. O que perguntar (só o que não dá para deduzir)

- **Segmento** (educação, clínicas, imobiliárias, serviços…). Se não vier, pergunte; é a única pergunta obrigatória.
- **Onde vai ser usado** (YouTube/site = versão completa; anúncio = versão curta, ver seção 6).
- Algum recurso que **não** deve aparecer ou que deve ganhar destaque.

Não pergunte sobre voz, trilha, estilo ou duração da versão completa: use os padrões.

## 2. Estrutura do roteiro (siga esta ordem)

| # | Bloco | O que dizer | Duração | Tipo |
|---|---|---|---|---|
| 0 | **Abertura com o personagem** | Uma pessoa do segmento (nome fictício, ex.: Larissa) chama no WhatsApp. O agente de IA da Clint responde na hora, tira dúvidas e qualifica. | 40–100 s | CENA (conversa animada no celular) + TELA |
| 1 | **O funil se move sozinho** | "Quando a Larissa aceita o horário, o cartão dela passa para agendamento e a reunião cai para um consultor." Quem não tem perfil é descartado com motivo e vai para nutrição. | 15 s | TELA (kanban) |
| 2 | **Conversas + passagem para humano** | WhatsApp e Instagram num lugar só; o agente conversando em tempo real; o vendedor entra de onde o agente parou, com o histórico na tela. | 20 s | TELA |
| 3 | **Ligações** | Ligar do cartão (telefone ou WhatsApp) sem sair da Clint; a ligação fica no histórico. | 15 s | TELA + CENA |
| 4 | **Rotina do vendedor** | Atividades por etapa (ligar com script, mandar o WhatsApp, lembrete) e agenda integrada ao Google. | 25 s | TELA |
| 5 | **Campanhas ativas** | "E o primeiro contato também pode partir de você." Um gatilho do segmento (turma nova, agenda aberta…) → escolher quem avisar → WhatsApp, SMS ou ligação de voz. | 10–15 s | CENA |
| 6 | **Indicadores** | Resultado em tempo real: vendas por vendedor/produto/campanha, tempo de resposta, onde o funil trava. Fecha com "Assim você sabe exatamente onde agir." | 15–20 s | TELA |
| 7 | **Aura** | Perguntar (2 perguntas reais do segmento, entre aspas), ela responde com o motivo e sugere o que fazer; ela cria funil, automação, indicador; ajuda dentro da conversa. Fecha com o ganho para o time. | 40 s | CENA (chat da Aura) + TELA |
| 8 | **Integrações** | Meta e Google (anúncios caem no CRM), formulários, páginas de venda, plataformas do segmento, API/webhook, pagamento (Pix aberto / cartão recusado recebe mensagem na hora certa). | 25–30 s | CENA (logos orbitando/conectando) |
| 9 | **Agentes de bastidores** | "E lembra dos agentes?" Um mantém o CRM atualizado; um avisa Meta e Google o que virou venda; um separa quem está pronto de quem está pesquisando; um analisa conversas e mostra o que treinar. "Sem esperar por um desenvolvedor… Você mesmo pode criar." | 30 s | CENA |
| 10 | **App** | "E tudo isso cabe no bolso." Principais funções no celular, inclusive a Aura. | 8–10 s | CENA (celular) |
| 11 | **Volta do personagem** | Fora do horário (ex.: "Sábado, 9 da noite"), o personagem chama de novo; ninguém do time online; o agente responde e na segunda a reunião já está marcada. | 15–20 s | CENA (espelha a abertura) |
| 12 | **Assinatura + CTA** | "A Clint une CRM, WhatsApp e Instagram, agentes de IA e mais, numa plataforma só para o seu negócio de <segmento>. Crie sua conta e teste grátis por 7 dias ou fale com um especialista Clint. Quem vende usa." | 8–10 s | CENA de encerramento → vinheta |

Versão completa: **5–6 min**, ~150 palavras por minuto (≈ 800–900 palavras). Nenhum bloco passa de ~45 s, exceto a abertura.

## 3. Regras de texto (o "jeito" do vídeo)

1. **História, não lista de funções.** O personagem abre e fecha o vídeo. Todo recurso aparece como algo que acontece com ele ou com o time ("o cartão dela passa para…", "o vendedor entra e continua…").
2. **Vocabulário do segmento em tudo.** Educação: aluno, matrícula, turma, curso, consultor, boleto. Troque tudo para o segmento escolhido (ver tabela abaixo). Nunca deixe "lead" ou "cliente" genérico onde cabe a palavra do segmento.
3. **Falar com o dono do negócio: "você" e "seu time".** Frases curtas, faladas, sem jargão técnico.
4. **Recurso = ação concreta + resultado.** "O vendedor liga direto do cartão… Toda a ligação fica registrada no histórico." Não basta dizer "temos ligações".
5. **Exemplos reais entre aspas** nas perguntas para a Aura e nos gatilhos de campanha ("Quantas matrículas perdemos no boleto este mês?").
6. **Mate a objeção na mesma frase**: "sem sair da plataforma", "sem ficar perguntando a mesma coisa", "sem esperar por um desenvolvedor, sem bater cabeça com programação".
7. **Transições que costuram os blocos**, começando com "E…": "E a conversa não fica só no texto." · "E o primeiro contato também pode partir de você." · "E o resultado dessa campanha você acompanha…" · "E lembra dos agentes?" · "E tudo isso cabe no bolso."
8. **Feche blocos importantes com o ganho**, em uma frase: "Assim você sabe exatamente onde agir." · "O time deixa de repetir respostas e passa o dia com quem está decidindo."
9. **Só fale do que a Clint faz de verdade.** Os recursos citados no vídeo de referência são a lista segura. Recurso novo ou específico do segmento: confirme com a pessoa (ou no app, pela gravação) antes de pôr no roteiro.
10. **Assinatura fixa** no final: "…numa plataforma só para o seu negócio de <segmento>." + CTA de teste grátis de 7 dias / especialista + **"Quem vende usa."**

### Vocabulário por segmento (ponto de partida; confirme com a pessoa)

| Educação (referência) | Saúde / clínicas | Imobiliárias | Serviços / consultoria |
|---|---|---|---|
| aluno, interessado | paciente | comprador, locatário | cliente |
| matrícula | consulta / procedimento agendado | visita, proposta, contrato | contrato fechado |
| turma nova, curso | agenda aberta, novo procedimento | lançamento, imóvel novo | nova vaga na agenda, novo serviço |
| consultor | atendente, recepção | corretor | consultor, vendedor |
| ex-alunos | pacientes antigos | quem visitou e não fechou | clientes antigos |
| plataformas de curso | sistema da clínica | portais imobiliários | sistema próprio |

## 4. Plano de cenas (aprovação A)

Mostre o roteiro na tabela do item 2, já com o texto final de cada bloco, TELA/CENA e o que aparece. Regras visuais extras para este formato (além das do `CLAUDE.md`):
- **O personagem tem uma identidade visual fixa** (`ContactAvatar` com o mesmo nome, foto e cor) na abertura, no funil, nas conversas e na volta do final.
- **A volta do final espelha a abertura** (mesmo celular, mesma conversa, relógio mostrando o horário fora do expediente).
- Cada bloco abre com um título curto (≤ 6 palavras) com a palavra-chave em gradiente, para o vídeo funcionar sem som (ex.: "O funil anda [sozinho]").
- Telas gravadas com dados do segmento fictícios (nomes de cursos, procedimentos, imóveis) — prepare a conta de demonstração antes de gravar.

## 5. Aprovações extras deste formato

Por ser longo (5–6 min), além de A, B e C da `/video-lancamento`:
- Prévia da **abertura inteira** (bloco 0) e do **fechamento** (blocos 11–12) juntos, porque eles precisam conversar.
- Uma prévia a cada ~60 s ainda não vistos (agrupe blocos vizinhos).
- Se a narração for gerada por bloco, deixe ~0,4 s entre blocos e confira o ritmo na prévia (o vídeo de referência flui sem pausas longas).

## 6. Versões curtas (cortes do mesmo vídeo)

Depois do vídeo completo aprovado, ofereça cortes reaproveitando cenas e narração:
- **60–90 s (anúncio/site):** blocos 0 (resumido), 1, 2, 7, 11 e 12.
- **15–30 s (stories/reels, vertical 1080×1920 se pedirem):** gancho do bloco 0 → um recurso → bloco 12.
- **Um recurso por vez:** cada bloco (ex.: Aura, agentes de bastidores) vira um vídeo de ~30–45 s com abertura curta + bloco + CTA.

Registre em `notas.md` o segmento, o personagem, o vocabulário usado e os cortes entregues.
