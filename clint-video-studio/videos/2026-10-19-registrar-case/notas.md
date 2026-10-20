# Como registrar um case de sucesso (Programa de Parceiros)

Vídeo how-to (H) da jornada do parceiro. Etapa 6 do funil (Recebendo indicações).
Pasta: `2026-10-19-registrar-case` (mesmo nome em `videos/`, `remotion/src/videos/` e `remotion/public/videos/`).

## Fontes
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX (etapa 6)
- Desenho de telas (PROPOSTA de design, 16–18/10, ainda não está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - `project/RegistrarCase.dc.html` (modal) e `project/Certificado.dc.html` (página do programa, "Próximos passos" › passo 4)

## O que o modal tem (design)
- Título "Registrar case de sucesso" · subtítulo "Com um case validado, você entra na lista de indicações da Clint."
- "Qual cliente?" (lista com busca; só clientes conectados na Central e com plano pago)
- "Como era antes" · "O que mudou com a Clint" (obrigatórios)
- "Um número que mostra o resultado (opcional)" · "Link de um vídeo do case (opcional)"
- Caixa "A Clint pode divulgar este case…" + aviso "Antes de divulgar, o time Clint fala com o cliente para pedir a autorização dele."
- "Enviar para validação" (só libera com cliente + antes + depois) › "Case enviado para validação · Avisamos pelo WhatsApp quando o case for validado."
- Validação (funil): o time confere se o cliente está pagando e se a conta mostra uso real.

## Decisões
- (19/10) Agatha: **esperar a implementação** para gravar as telas reais (não animar o design).
  → Agora: roteiro + cenas de conceito. As TELAS só são gravadas quando o modal estiver no ar.
  → Ao gravar, conferir se os textos do modal mudaram e ajustar o roteiro antes de gerar a narração.
- Dados de clientes sempre fictícios (ex.: "Escola Norte", "Clínica Vida").
- Não citar prazo de validação (o funil não define).

## Aprovações
- A. Roteiro: `entrada/roteiro_v1.txt` — **aprovado (20/10)**, sem a frase sobre "primeiro cliente pagando" (não citar).
- B. Storyboard das cenas animadas: `saida/storyboard.jpg` — aguardando aprovação.

## Montagem (Remotion: src/videos/2026-10-19-registrar-case/, composição "RegistrarCase")
- Cenas animadas prontas (tempos ESTIMADOS, sem narração ainda): 1 Abertura · 2 ListaIndicacoes · 10 Validacao · 11 Final.
- Blocos 3–9 = `TelaPendente` (marcador tracejado) até a gravação real existir.
- Tempos dentro de cada cena são relativos ao início do bloco; ao gerar a narração, só atualizar `B` em timeline.ts
  e conferir as palavras-chave (ex.: "mais ativos" ~5,6 s do bloco 2; "pagando"/"de verdade" ~2,6/3,9 s do bloco 10).
- Fictícios: Clínica Vida, Escola Norte, Rafaela Silva Consultoria, Agência Maré, Lucas Prado Digital, Studio Ponto.

## Falta (quando o modal estiver no ar)
1. Conferir os textos do modal real e ajustar o roteiro se mudou.
2. Gerar a narração (Voz IA 26) e transcrever; atualizar `B`.
3. Gravar as telas (passo 4 › modal › Enviar para validação) numa conta parceira com cliente pagante de teste — sem enviar case real.
4. Prévias C (abertura + trecho de tela mais complexo), trilha (5 opções), render, mixagem + vinheta, checagens.
