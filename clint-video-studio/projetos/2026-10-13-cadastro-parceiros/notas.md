# Cadastro no Programa de Parceiros (quem já é cliente)

Gravação enviada pela Agatha: entrada/gravacao_original.mp4 (29 s, 1280x720, sem áudio).

Fluxo (confirmado pela gravação):
1. LP useclint.com/parceiros/seja-um-parceiro › "Quero ser parceiro" (0:01–0:04)
2. Menu abre: "Já sou cliente — Entrar na minha conta Clint" (0:04–0:08)
3. Abre a conta em app.useclint.com/partner-program › "Painel do afiliado" (0:09–0:13)
4. Botão "Fazer cadastro" (canto superior direito) (0:13–0:15)
5. Pop-up "Seja um afiliado Clint" / "Faça seu cadastro": logo, Nome da empresa (Exibição), Instagram da empresa ou expert principal, Segmento da empresa (0:15–0:27)
6. Etapa 1 do pop-up: logo da empresa (upload, opcional?), Nome, Instagram, Segmento › "Continuar"
7. Etapa 2 "Dados bancários": Banco (lista), Conta, Agência, Nome (ou Razão social), CNPJ (formato 00.000.000/0000-00), aceite dos termos de uso e política de privacidade › "Concluir cadastro"
8. Depois de "Concluir cadastro" (print entrada/referencia_painel_pos_cadastro.png): Painel do afiliado liberado. Botão rosa "Seu link de indicação" (canto superior direito) copia o link. Também aparecem "Certificado de parceiro", "Treinamento: Método de Aceleração Comercial" e o card "Link de indicação" (divisão dos 30% entre comissão e desconto, link + "Copiar", "Criar novo link").

Regra: as gravações da Agatha são só REFERÊNCIA. O Claude grava as telas (precisa de login → rodar localmente no Mac; nuvem não tem login).

Cuidados na montagem:
- cortar a barra de controle da gravação (canto inferior esquerdo) e as abas/URL do navegador
- desfocar o aviso vermelho "Seu plano atual expirou"
- cobrir os textos digitados de teste com dados fictícios ("Rafaela Silva Consultoria", "@rafaelasilva.consultoria")

Pedido da Agatha (roteiro v4): deixar MUITO claro que o parceiro escolhe como dividir os 30% (comissão dele × desconto do indicado). Virou cena própria (9b) + tela do card "Link de indicação" (9c).
- "Seu link de indicação" (topo direito) abre o modal "Gerenciar link de indicação" (entrada/referencia_gerenciar_link.png): à esquerda divisão dos 30% (Quero receber X% / oferecer Y%), link + "Copiar", "Criar novo link", "Editar cadastro"; à direita tabela de links (Sua comissão, Desconto, Link, copiar, status on/off). Cada divisão = um link próprio.
- Na gravação: anonimizar os links (ref=...) e usar no máx. 2-3 linhas na tabela.

## Narração (v2, 13/10) — LOGO É OBRIGATÓRIO (correção da Agatha)
- HeyGen "Voz IA 26 (clone)" voiceId 045f75696cf04e32bd1a42c507edace3 (o id do kit fba91... não existe nesta conta HeyGen), elevenlabs, pt, speed 1
- entrada/narracao.wav — 114,8 s (v1 com "logo opcional" guardada como narracao_v1_logo_opcional.wav, NÃO usar). Texto: entrada/roteiro_aprovado.txt
- Início de cada bloco (s): 1) 0.0 · 2) 7.1 · 3) 13.3 LP / Quero ser parceiro (16.6) · 4) 18.3 Já sou cliente (19.1) · 5) 23.6 Painel (24.3) / Fazer cadastro (30.3) · 6) 32.0 dados empresa, logo obrigatório (35.4–36.9), Continuar (44.0) · 7) 45.3 dados bancários · 8) 55.5 termos → Concluir cadastro (58.1) · 9) 59.7 Pronto · 9b) 64.1 CENA 30% (comissão 71.8 / desconto 73.7) · 9c) 75.9 Seu link de indicação (78.1) · 9d) 81.7 Quero receber/oferecer, 25+5 (89.3–93.4), Criar novo link (95.2) · 9e) 96.7 Copiar (102.3) · 9f) 104.5 CENA comissão · 10) 110.2 CENA final, fim 114.5

## Gravação em 2 contas (aprovado pela Agatha)
- Conta 1 (ainda NÃO parceira): LP › Quero ser parceiro › Já sou cliente › Painel do afiliado › Fazer cadastro › etapa 1 › Continuar › etapa 2 › termos › Concluir cadastro (blocos 3–9). Só dá para concluir UMA vez: gravar tomadas 3–8 parando antes do clique final, e o clique em "Concluir cadastro" por último.
- Conta 2 (já parceira): Painel › cartão "Link de indicação" (divisão dos 30% NA PLATAFORMA, 64,09–75,94: mostrar o texto rosa "Você tem 30% para distribuir como quiser", campo "Quero receber" em 71,8 s e "oferecer" em 73,7 s; pode mexer nos campos, ex. 27→25 / 3→5) › Seu link de indicação › Gerenciar link › 25/5 › Criar novo link › Copiar (blocos 9c–9e). Anonimizar ref=... e desativar o link de teste depois.
- Dois perfis de navegador separados (um login por conta), feito no Mac.

## Aprovações
- A. Roteiro: aprovado (13/10). Narração v2 (logo obrigatório): aprovada (13/10).

## Status (13/10, sessão na nuvem)
- Cenas animadas prontas em remotion/src/projeto/cenas.tsx: Abertura (0–7,1), SemContaNova (7,1–13,33), Divisao30 (64,09–75,94), Comissao (104,47–110,2), Final (110,2–fim). Linha do tempo em remotion/src/projeto/timeline.ts.
- Prévias feitas: saida/previa_1_abertura.mp4 e saida/previa_2_divisao30.mp4 (com trilha padrão "Comida" provisória).
- remotion/public/telas.mp4 atual é PROVISÓRIO (fundo escuro com rótulos). Substituir pela gravação real via montar_telas.py.
- FALTA (no Mac): gravar conta 1 e conta 2 (gravacao.py), montar telas.mp4 (plano_telas.json com os trechos TELA A 13,33–64,09 e TELA B 75,94–104,47), zooms na timeline, storyboard das telas, escolha da trilha (5 opções), render, mixagem + vinheta, checagens.
- Trilha: se a Agatha não escolher, usar a padrão "Comida" (já estendida em entrada/trilha_comida.wav só nesta sessão; refazer no Mac com estender_trilha.py).

## Mudanças (13/10, depois das prévias)
- Prévias da abertura e da divisão: aprovadas. MAS a divisão dos 30% deve ser mostrada DENTRO DA PLATAFORMA (pedido da Agatha).
  → cena animada Divisao30 removida; 64,09–75,94 virou TELA (conta 2). TELA B agora é 64,09–104,47.
  → cenas animadas restantes: Abertura, SemContaNova, Comissao, Final.
