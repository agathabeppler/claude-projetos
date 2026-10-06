# Clint Video Studio

Pasta de produção de vídeos de lançamento e GIFs de produto da Clint. Quem abre esta pasta normalmente é alguém do time (marketing, produto, CS) com uma ideia de vídeo, não necessariamente dev. Fale em português, explique em linguagem simples e mostre prévias antes de renderizar o vídeo inteiro.

- Para um vídeo de novidade/tutorial, use a skill `/video-lancamento`.
- Para um GIF curto de produto, use a skill `/gif-produto`.

## Primeira coisa em toda sessão: preparar o computador (sem envolver a pessoa)

Quem usa esta pasta não é técnico. **Nunca peça para a pessoa rodar comandos, abrir o Terminal ou instalar nada.**
1. Rode `scripts/verificar.sh`. Se responder `PRONTO`, siga.
2. Se faltar algo, avise em uma frase simples ("Estou preparando seu computador para fazer vídeos. Leva uns 10 minutos e só acontece na primeira vez.") e rode `./setup.sh` você mesmo, em segundo plano. Ele não pede senha nem usa Homebrew: instala tudo em `~/.clint-video-studio`.
3. Antes de qualquer comando de vídeo/áudio/gravação, carregue o ambiente: `source scripts/ambiente.sh && ...` (os scripts `.sh` já fazem isso sozinhos).

O que só a pessoa pode fazer (peça apenas quando for necessário, com instrução de um clique):
- **Login na Clint** na janela do navegador de gravação, na primeira gravação (você nunca digita senha). O login fica salvo.
- **Conectar o HeyGen** no Claude (Configurações › Conectores › HeyGen › Conectar), se o conector não estiver disponível.

## Padrões automáticos (NÃO pergunte; só mude se a pessoa pedir)

- **O Claude faz tudo**: roteiro, narração, animações, trilha, mixagem e entrega. Não pergunte quem grava a narração, qual voz usar ou se a pessoa já tem áudio.
- **Narração sempre gerada pelo HeyGen com a voz "Voz IA 26"**: `create_speech` com `voiceId: "fba9170de62148e7b2db21ee0755dba2"`, `engine: "elevenlabs"`, `language: "pt"`. Gere o roteiro inteiro numa chamada (para vídeos longos, um bloco por parágrafo e junte com ffmpeg). Se a pessoa pedir outra voz, ritmo ou entonação, aí sim ajuste.
- **Trilha: a pessoa escolhe entre 5 opções** (esta é a única pergunta fora das aprovações). O Claude busca no Envato faixas com o perfil da trilha aprovada pelo time, ranqueia por semelhança e mostra prévias de 25 s de **4 trilhas novas + a trilha padrão "Comida" (GlowCity)**, que está sempre em `assets/trilha-padrao/`. Se a pessoa não gostar de nenhuma nova (ou não souber escolher), use a "Comida". Detalhes na skill `/video-lancamento`, etapa 7.
- **Gravações de tela da Clint**: o Claude grava sozinho (ver skill `/video-lancamento`, etapa 3). Não peça gravações à pessoa.
- **Formato padrão**: 1920×1080, 30 fps, ~60–120 s, vinheta no final.
- **Aprovação por partes**: roteiro → storyboard → prévia de trechos → só então o vídeo inteiro. Identifique sozinho quando precisa de prévias extras (ver skill `/video-lancamento`). Essas são as únicas pausas para a pessoa.

## Regras da marca (valem para todo vídeo)

1. **Estilo visual claro e "motion clean"**: fundo branco com manchas pastel animadas (lilás, rosa, pêssego), cartões brancos flutuantes com sombra suave, títulos revelados palavra por palavra, cursor animado, destaque em gradiente roxo→rosa. Gravações de tela entram num cartão flutuante sobre o mesmo fundo. Tudo isso já está pronto em `remotion/src/ui.tsx` e `remotion/src/theme.ts`; não invente outro estilo.
2. **O avatar de IA (apresentadora do HeyGen) nunca aparece**, nem no início nem no fim. Do vídeo do avatar usa-se só a voz; onde ele estaria falando, crie uma animação que ilustre o que está sendo dito.
3. **Todo vídeo termina com a vinheta da Clint** (`assets/vinheta-clint.mp4`, 7,3 s, com áudio), em corte seco depois da última fala. O `scripts/mixar_final.sh` já faz isso.
4. **Trilha**: acústica, calorosa, leve e com personalidade. Nada de "música de elevador" (corporate/SaaS/ambient eletrônico genérico). Sempre use arquivos originais licenciados (nunca uma versão extraída de outro vídeo).
5. **Animações explicam, não enfeitam**: cada cena ilustra a frase que está sendo dita, e cada elemento entra na palavra exata da narração.
6. **Privacidade**: nada de dados reais de clientes. Use contatos fictícios (ex.: "Rafaela Silva", "Maurício") e desfoque listas reais nas gravações.

## Lições aprendidas (não repita estes erros)

- **Áudio escolhido pela pessoa é sagrado**: se ela mandar ou escolher um arquivo de áudio específico, use exatamente esse arquivo (confira por checksum). Nunca "melhore" um take por conta própria. Se ela disser "a primeira opção" e houver ambiguidade, confirme qual arquivo.
- **Duas vozes ao mesmo tempo é o pior defeito possível.** Ao trocar uma narração, a voz antiga precisa sumir por completo. Subtração simples deixa resto audível; use `scripts/separar_musica.py` e confirme com `scripts/checar_voz.py` (precisa dar ~0). Correlação de forma de onda NÃO detecta esse vazamento.
- **Trocou a voz, mudou o ritmo**: alinhe a narração antiga com a nova (`scripts/alinhar_narracao.py`), reajuste as telas (`scripts/retime_video.py`) e passe os tempos das cenas pelo mesmo mapa.
- **Render travando** (timeout no Remotion): o vídeo de telas precisa ser all-intra (`-g 1`; o `retime_video.py` já gera assim). Se o Mac estiver sobrecarregado, feche Chrome de testes/Adobe, use `--concurrency=1` ou renderize só os trechos que mudaram e emende em quadros-chave.
- **Bordas brancas** em vídeos do avatar/gravação: meça os pixels das bordas antes de entregar.
- Antes de entregar, sempre: transcreva o início do vídeo final, confira a duração, a sincronia (palavras × cenas) e o volume (~-15 LUFS).

## Estrutura

```
CLAUDE.md                  estas regras
setup.sh                   prepara o computador (o Claude roda sozinho; sem senha)
.claude/skills/            /video-lancamento e /gif-produto
remotion/                  template de animação (React/Remotion)
  src/ui.tsx, theme.ts     sistema visual da Clint (não alterar sem motivo)
  src/projeto/             timeline.ts + cenas.tsx do vídeo em produção
  src/exemplos/            vídeo "Ligações por WhatsApp" completo + GIF, como referência
  stills.mjs, storyboard.mjs  quadros de prévia
scripts/                   transcrição, alinhamento, retime, trilha, mixagem, GIF, checagens
  gravacao/                navegador de gravação, gravador 4K, anonimização, mapa da Clint
  ambiente.sh, verificar.sh  carregar/conferir as ferramentas
assets/                    vinheta e logo
projetos/<data-nome>/      entradas e saídas de cada vídeo (não vai para o Git)
```
