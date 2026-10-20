# Fui aprovado, e agora? (vídeo B da jornada do parceiro)

Escopo mudou em 19/10 (pedido da Agatha): o briefing "Tour pelo Painel do afiliado" foi descartado.
Este vídeo cobre a etapa 4 do funil novo (Aguardando 1º cliente), logo depois da aprovação da certificação.

Fontes:
- Funil novo do parceiro: https://claude.ai/artifact/Vx1iJ9Wz4BJWWeZUTpk5TX
- Desenho de telas (PROPOSTA de design, 16–18/10, ainda não está no ar): https://claude.ai/artifact/5mjsmSJPxuq3v1XBG6NkiR
  - `project/Aprovado.dc.html` (modal "Certificação aprovada")
  - `project/Certificado.dc.html` (página "Programa de parceiros · certificado")

## O que o vídeo mostra
- Modal "Certificação aprovada": LIBERADO PARA VOCÊ → Método de Aceleração Comercial (3 etapas em vídeo + materiais),
  Encontros semanais ao vivo, Plano MAX grátis com 5 usuários (só para a agência, enquanto tiver cliente pagando),
  "Tenha um cliente pagando em até 30 dias" (sem cliente pagando, a conta free é encerrada). Botões "Ir para o programa" e "Abrir o Método".
- Página do programa certificado: contador dos 30 dias no topo; card do próximo encontro (hot seat) com
  "Garantir minha vaga" e "Quero levar um problema" → "Qual é o problema? Em uma linha" → "Entrar na fila do hot seat";
  ciclo de 4 semanas (Hot seat, Case de parceiro, Convidado especial, Novidades da Clint); "Abrir o Método";
  Próximos passos 1–4 (Indique a Clint, Conecte o cliente, Acompanhe as comissões, Registre um case).
- Regra do funil: se no dia 30 o cliente estiver no teste de 14 dias, o prazo é prorrogado uma vez, até o fim do teste.

## O que NÃO entra
- Passo a passo de link de indicação, conexão de cliente (Central) e case: cada um tem vídeo próprio. Só apontar onde fica.
- Ensinar o Método (já tem 4 vídeos).

## Respostas da Agatha (19/10)
- Telas: ESPERAR a implementação e gravar as telas reais. Roteiro e narração podem ser feitos agora.
- Prorrogação do prazo (cliente em teste no dia 30): NÃO citar.
- Agente de IA que lembra o prazo e avisa 1 h antes do encontro (WhatsApp): PODE citar.

## Roteiro
- v1 (19/10): entrada/roteiro_v1.txt, ~100 s estimados.

## Narração (19/10)
- HeyGen "Voz IA 26 (clone)" voiceId 045f75696cf04e32bd1a42c507edace3 (o id do kit fba91... não existe nesta conta), elevenlabs, pt, speed 1
- v3 (20/10, ATUAL): entrada/narracao.wav — 100,4 s, sha256 c0443b2865c0fa76…
  = v1 sem o bloco 8 (corte 68,10–71,37 s do v1, em silêncio, fade 30 ms; pedido da Agatha "tira o bloco 8")
  + frase final trocada (pedido da Agatha): a frase antiga foi cortada em 94,25 s (silêncio) e no lugar entrou
  entrada/frase_final_v2.wav (gerada sozinha, mesma voz/motor/velocidade; sha256 c2f8f50d0b6f21b4…; volume -18,7 × -19,3 LUFS do resto).
  Frase nova: "Então comece hoje: abra o Método, participe do próximo encontro e faça a sua primeira indicação."
- A v2 intermediária (só sem o bloco 8, 101,6 s) ficou no histórico do Git (commit anterior), não na pasta.
- v1 guardada como entrada/narracao_v1_com_bloco8.wav (104,9 s, sha256 b85b8cf0c8415bad…) — NÃO usar.
- Texto: entrada/roteiro_aprovado.txt (sem o bloco 8 e com a frase final nova); v1 em entrada/roteiro_v1.txt.
- Início de cada bloco na v3 (s): 1) 0.0 · 2) 6.9 · 3) 12.2 Método (12.4) / encontros (18.3) / MAX (20.9) · 4) 25.3 prazo, "trinta dias" 28.0 · 5) 33.3 "Ir para o programa" 34.3, contador 38.5 · 6) 41.8 passos: indicar 44.8 / conectar 47.0 / comissões 49.8 / case 52.7 · 7) 57.9 encontro, temas 62.7–67.7 · 9) 68.1 hot seat, "Quero levar um problema" 79.0, "Entrar na fila" 82.5, fim 87.0 · 10) 87.1 WhatsApp · 11) 94.5 final ("abra o Método" 95.8, "participe" 96.8, "primeira indicação" 99.1), fim 100.2
  (blocos 9–10 = tempo do v1 − 3,27 s; bloco 11 = 94,25 + tempo da frase_final_v2.wav)
- Tempo por palavra: rodar scripts/transcrever.sh no Mac para gerar narracao.palavras.txt (whisper não está nesta sessão na nuvem).

## Próximos passos
- ESPERAR as telas (modal "Certificação aprovada" e página do programa certificado) irem ao ar.
- Depois: gravar as TELAS (blocos 2, 3, 5, 6, 7 e 9; o bloco 8 saiu) numa conta parceira certificada, criar as CENAS (1, 4, 10, 11), storyboard (B), prévias (C), trilha (5 opções), render e vinheta.
- Na gravação: o hot seat deve usar um problema fictício e não pode entrar na fila de verdade (ou desfazer depois); o card do encontro não pode mostrar nomes/avatares reais de parceiros.

## Aprovações
- A. Roteiro v1: aprovado (19/10). 20/10: Agatha pediu para tirar o bloco 8 ("Garantir minha vaga") → roteiro v2 em entrada/roteiro_aprovado.txt. Depois pediu para trocar a frase final ("garanta sua vaga" → "participe do próximo encontro"), porque o vídeo não mostra mais o botão da vaga.
