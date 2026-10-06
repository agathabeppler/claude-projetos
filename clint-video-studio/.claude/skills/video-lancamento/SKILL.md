---
name: video-lancamento
description: Produz um vídeo de lançamento/tutorial de uma funcionalidade da Clint no padrão da marca — narração (HeyGen), gravações de tela em cartão flutuante, animações motion clean sincronizadas palavra por palavra, trilha sonora e vinheta final. Use quando alguém do time trouxer uma ideia de vídeo de novidade, tutorial ou anúncio de produto.
---

# Vídeo de lançamento Clint

Siga as regras do `CLAUDE.md` da raiz (estilo, avatar nunca aparece, vinheta, trilha, privacidade, lições aprendidas). Fale com a pessoa em português simples.

## Aprovações por partes (obrigatório)

**Nunca renderize o vídeo inteiro antes das aprovações A, B e C.** O render completo leva 10–20 min. Cada prévia leva de segundos a 1 min, e um ajuste ali é barato.

| | Quando | O que mostrar | Ferramenta |
|---|---|---|---|
| **A. Roteiro e plano** | depois de escrever o roteiro, antes de gerar a narração | roteiro em blocos; para cada bloco: TELA ou CENA, o que vai aparecer e a duração estimada | texto no chat |
| **B. Storyboard** | depois de gravar as telas e escrever as cenas, antes de qualquer render | 1 quadro do meio de cada cena/tela (6–12 por folha, com tempo e rótulo) + 2–3 quadros das gravações de tela | `scripts/storyboard.sh` |
| **C. Prévia de trechos** | depois do storyboard aprovado | 10–20 s em 960×540 com narração e trilha: sempre a **abertura** e o **trecho mais complexo** | `scripts/previa.sh` |
| **D. Vídeo final** | só depois de A, B e C | render completo + vinheta + checagens | etapas 6–9 |

**Peça aprovações extras quando** (identifique sozinho):
- o vídeo passa de 90 s → prévia de mais um trecho a cada ~30 s que a pessoa ainda não viu;
- uma cena é de um tipo novo (sem nada parecido em `remotion/src/exemplos/`) → prévia dela;
- uma cena tem muitos elementos entrando palavra por palavra, cursor ou digitação → prévia dela (sincronia);
- uma gravação de tela pode mostrar dado de cliente → mostre quadros dela no storyboard e pergunte explicitamente;
- a pessoa pediu uma mudança → prévia só do trecho alterado antes de refazer o final.

**Como pedir.** Mostre o arquivo no chat (envie a imagem/vídeo) com uma mensagem curta, por exemplo: "Prévia 2 de 3: abertura e cena do pedido no WhatsApp (0:00–0:18). Está como você imaginou? Responda *aprovado* ou diga o que mudar." Registre cada aprovação em `notas.md`. Se a pessoa disser que pode gerar direto, pule B e C.

**Depois de aprovado:** ajustes no vídeo final re-renderizam só os trechos alterados (`--frames=a-b`) e emendam no vídeo pronto, sem refazer tudo.

## 0. Preparação (sem envolver a pessoa)

- Rode `scripts/verificar.sh`. Se faltar algo, avise em uma frase simples e rode `./setup.sh` em segundo plano (sem senha, ~10 min, só na primeira vez). Nunca peça para a pessoa rodar comandos.
- Crie a pasta do projeto: `projetos/AAAA-MM-DD-nome-curto/` com `entrada/`, `saida/` e `notas.md` (decisões, tempos, arquivos escolhidos).

## 1. Ideia → roteiro (aprovação A)

Pergunte só o que não dá para deduzir da ideia (qual funcionalidade, para quem, o que a pessoa precisa saber fazer). Não pergunte sobre voz, narração ou trilha: use os padrões do CLAUDE.md. Duração padrão: 60–120 s.
Escreva o roteiro em frases curtas e faladas (pt-BR), no padrão:
1. gancho de novidade (1 frase) · 2. o que é e por que importa · 3. passo a passo no produto · 4. regras/limites importantes · 5. benefício + chamada final ("Faça hoje…").
Marque em cada parágrafo se é **TELA** (mostrar o produto) ou **CENA** (explicar um conceito com animação) e descreva em uma linha o que vai aparecer. Mostre roteiro + plano (aprovação A) e só então gere a narração.

## 2. Narração (automática, sem perguntar)

- Gere com o conector do HeyGen, sempre na **Voz IA 26**: `create_speech` com `voiceId: "fba9170de62148e7b2db21ee0755dba2"`, `engine: "elevenlabs"`, `language: "pt"`, `speed: 1`. Escreva números e siglas como se fala (ex.: "barra vídeo lançamento", "dois minutos").
- Baixe o `.wav` para `projetos/<p>/entrada/narracao.wav` (para vídeos longos, gere por parágrafo e junte com ffmpeg `concat`, com ~0,4 s de pausa entre blocos).
- Transcreva com tempo por palavra: `scripts/transcrever.sh projetos/<p>/entrada/narracao.wav projetos/<p>/entrada/narracao` → `.palavras.txt` é a referência de sincronia de tudo.
- Só troque voz, motor ou velocidade se a pessoa pedir. Se ela mandar um áudio próprio, use exatamente esse arquivo.

## 3. Gravações de tela (o Claude grava sozinho)

**Decidir o que gravar.** Releia o roteiro com os tempos do `.palavras.txt`. Vira **TELA** toda frase que descreve algo que se vê ou se faz no produto: caminhos de menu ("vá em Conversas, Configurações…"), cliques ("clique em…", "escolha…"), botões, abas, chaves, campos, listas, filtros, painéis, "aparece…". Vira **CENA** (animação) o que é conceito, benefício, regra, comparação, número ou chamada final. Anote em `notas.md` a tabela: trecho (início–fim em s) · TELA/CENA · o que mostrar.

**Gravar.**
1. Abra o navegador de gravação em segundo plano: `source scripts/ambiente.sh && python3 scripts/gravacao/navegador.py` (porta 9333, 1920×1080 a 2× = 4K, perfil salvo). Se a página pedir login, diga à pessoa: "Abri uma janela da Clint. Faça login nela uma vez e me avise." Nunca digite senhas.
2. Use `scripts/gravacao/mapa-clint.md` para achar as telas; se algo mudou, explore o app (sem gravar) e atualize o mapa.
3. Escreva `projetos/<p>/gravacao.py` com uma função por trecho TELA: `preparar_<nome>(page, c)` (navega até a tela, fora da gravação) e `tomada_<nome>(page, c)` (a ação, com `c.clicar`, `c.mover`, `c.digitar`, `c.pausa`). Ritmo humano; cada tomada ~20% mais longa que a fala correspondente.
4. Grave: `source scripts/ambiente.sh && python3 scripts/gravacao/gravar.py projetos/<p>/gravacao.py projetos/<p>/entrada/telas` (dá para regravar só uma: acrescente o nome no fim). A anonimização (`anon.js`) troca nomes, mensagens, telefones e e-mails de clientes por fictícios automaticamente; confira 2–3 quadros de cada tomada mesmo assim.
5. Nunca faça ações reais com clientes (ligar, enviar mensagem, cobrar): use o contato de teste do mapa ou pare antes de confirmar.
6. Feche o navegador ao terminar: `python3 scripts/gravacao/navegador.py --parar`.

**Encaixar.** Escreva `projetos/<p>/plano_telas.json` (trechos: início/fim na narração + arquivo + pedaço da tomada) e rode `python3 scripts/montar_telas.py projetos/<p>/plano_telas.json remotion/public/telas.mp4`. Na `timeline.ts`, cada TELA pode ter `zoom` para destacar a informação que a fala cita (ex.: aproximar 2× no botão quando a narração o nomeia).

## 4. Linha do tempo + cenas

- Preencha `remotion/src/projeto/timeline.ts`: `DURACAO_S`, `TELAS` e `CENAS` (segundos da narração; sem sobreposição; cobrindo o vídeo todo).
- Crie as cenas em `remotion/src/projeto/cenas.tsx` usando os primitivos de `../ui` (`Scene`, `Pop`, `Words` com `[palavra]` em gradiente, `Cursor`, `Icon`, `IconTile`, `card()`, `Sparkle`, `Toggle`, `Skeleton`, `ContactAvatar`, `Logo`). O `Chip` (pílula com ícone) e o `Phone` (celular WhatsApp) estão no exemplo; copie de lá quando precisar.
- **Antes de criar, estude `remotion/src/exemplos/ligacoes-whatsapp/scenes.tsx`**: ele tem 11 cenas aprovadas (abertura com telefone tocando, comparação de cartões, perguntas, admin com chave, órbita de autorização, celular WhatsApp com opções, painel do gestor, valores, encerramento com botão → chamada conectada).
- Sincronia: dentro da cena, `const L = (s) => s - g0` e cada elemento usa `at={L(<tempo da palavra>)}` tirado do `.palavras.txt`. Títulos: no máximo ~6 palavras, a palavra-chave entre colchetes.
- Abertura: animação de novidade (nunca o avatar). Encerramento: animação da chamada final, escurecendo para emendar na vinheta.

## 5. Prévias (aprovações B e C)

- **B. Storyboard:** `COMP=Video scripts/storyboard.sh projetos/<p>/saida/storyboard.jpg "<s>:<rótulo>" ...` com o meio de cada cena/tela. Antes de mostrar, olhe você mesmo: textos cortados ou quebrados, elementos sobrepostos, telas com dado sensível. Corrija e só então envie.
- **C. Trechos:** `COMP=Video scripts/previa.sh <inicio_s> <fim_s> projetos/<p>/entrada/narracao.wav <trilha.wav> projetos/<p>/saida/previa_<n>.mp4` para a abertura e o trecho mais complexo (+ os gatilhos da tabela). Assista/inspecione antes de enviar.
- Ajuste conforme o retorno e mostre de novo só o que mudou.

## 6. Render

`cd remotion && npx remotion render src/index.ts Video ../projetos/<p>/saida/video_mudo.mp4 --crf=16 --muted`
Se travar: veja "Render travando" nas lições do CLAUDE.md.

## 7. Trilha (a pessoa escolhe entre 5 opções)

Faça isso **depois** das aprovações A–C e antes do render final (ou junto da prévia C, se preferir economizar uma rodada).
1. **Buscar no Envato** (navegador de gravação aberto): `python3 scripts/trilhas/envato_buscar.py <termos...> projetos/<p>/trilhas/candidatas.tsv`. Use os termos de `scripts/trilhas/referencia.json` e acrescente 1–2 termos ligados ao clima do vídeo (sempre acústico/caloroso; nunca corporate/ambient). A busca não exige login.
2. **Ranquear**: `python3 scripts/trilhas/ranquear.py projetos/<p>/trilhas/candidatas.tsv projetos/<p>/trilhas/previas`. Escolha **4 faixas novas** entre as mais próximas que sejam diferentes entre si (andamento, energia, instrumento principal). Evite faixas "infantis" ou com vocal.
3. **Prévias**: `scripts/previas_trilha.sh projetos/<p>/saida/video_mudo.mp4 <narracao> projetos/<p>/trilhas/escolha <as 4 prévias .m4a> "assets/trilha-padrao/Comida - GlowCity (Envato).mp3"` — dê nomes claros aos arquivos ("1 - Nome (autor)", …, "5 - Comida (trilha padrão)"). Se o vídeo final ainda não existir, use a prévia C.
4. **Perguntar**: envie as 5 prévias no chat e pergunte numa mensagem curta: "Qual trilha você prefere? 1, 2, 3, 4 ou 5 (a trilha padrão da Clint). Se não gostar de nenhuma das novas, fico com a 5." Sem resposta clara → use a 5.
5. **Se escolher uma nova**: peça confirmação antes de baixar ("Vou baixar e licenciar *<nome>* na sua conta do Envato, ok?"). Com o ok, abra a página da faixa no navegador de gravação (`https://app.envato.com/search/music/<id>`), peça para a pessoa entrar no Envato se aparecer o login (nunca digite senha), clique em baixar/licenciar com o nome do projeto = nome do vídeo (use `scripts/gravacao/executar.py`) e salve o arquivo em `projetos/<p>/trilhas/`. Anote em `notas.md` a faixa, o autor e o id.
6. **Estender** para a duração do vídeo: `python3 scripts/estender_trilha.py <arquivo> <duração_s> projetos/<p>/entrada/trilha.wav`.

## 8. Mixagem final + vinheta

`scripts/mixar_final.sh projetos/<p>/saida/video_mudo.mp4 <narracao> <trilha.wav> projetos/<p>/saida/<Nome do vídeo>.mp4`

## 9. Checagens antes de entregar

- Duração = narração + 7,3 s de vinheta.
- `scripts/transcrever.sh` no vídeo final: a fala está certa e começa no início?
- Se houve troca de voz: `scripts/checar_voz.py` do áudio final contra a narração ANTIGA → precisa dar ~0.
- Volume ~-15 LUFS (`ffmpeg -i X -af ebur128 -f null -`).
- Bordas: pixels das 4 bordas sem faixas brancas.
- 6–8 quadros espalhados numa folha (`ffmpeg ... tile`) para uma última olhada.

Entregue o arquivo final (mostre no Finder) e um resumo curto do que foi feito e do que a pessoa pode pedir para ajustar. Registre em `notas.md` as decisões (voz, trilha, arquivos escolhidos).
