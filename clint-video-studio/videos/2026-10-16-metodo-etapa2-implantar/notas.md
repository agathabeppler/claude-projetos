# Método · Etapa 2 · Implantar (vídeo único da etapa)

Mesmo formato da Etapa 1: didático ("mini curso pra burro"), para agências/consultores, exemplo da Clínica Sorriso,
cada passo = o que é → como → "Resumindo:"; voz HeyGen speed 1,1 por blocos; trilha "Comida".
Fonte: seção Etapa 2 da LP (`referencias/metodo-aceleracao-comercial/lp-texto.txt`, linhas 203–471).

- Roteiro v1: `entrada/roteiro.txt` (907 palavras → ~5:20 + vinheta).
- Jargão traduzido: pipeline → funil de vendas; cadência → sequência de contatos; base quente → quem já conhece a clínica;
  daily/evolutiva/carrapato/roleplay/1:1 → reunião diária, semanal, acompanhamento de ligações, treino simulado, conversa individual.
- Ponto de atenção: a LP diferencia a Aura (fala com o parceiro dentro da Clint) do agente de atendimento (fala com o lead).

## Visual (proposta)
Passos 2 e 3 pedem a PLATAFORMA (Aura montando o funil, inbox, funil, agente). Duas opções:
A) gravação real no Mac (conta de demonstração, dados fictícios) — mais fiel;
B) telas animadas fictícias (chat da Aura, kanban, inbox) feitas em Remotion — dá para fazer na nuvem.

## Aprovações
- A. Roteiro: aprovado (16/10)
- Visual: a Agatha grava a plataforma (Aura etc.) no Mac e manda os MP4 — guia em `roteiro_gravacao.md` (G1–G6).

## Produção (16/10)
- Narração: 8 blocos HeyGen speed 1,1 (`entrada/n0..n7.wav`, sem a sigla "IA" na fala), unidos por `juntar_narracao.sh` → 5:15.
- Gravações da Agatha (uploads de 16/10; MP4 não vão para o Git, recriar a partir dos originais):
  - G1 tela inicial + Aura (19.20.08) com nomes trocados por fictícios: overlay `entrada/anon_overlay_g1.png`
    (Mariana Costa, Rafael Nunes… / Juliana Rocha… / "Boa noite, Paula", "PA", foto real trocada por avatar "JR").
  - Funil da Aura (23.53.32, dermatologia): só o recorte das etapas (Novo lead → … → Fechado), sem o título "Dermatologia".
  - Automação (20.04.15), criar agente (texto_agente_SDR, invertido = digitando), teste do agente (ultimo_teste_ia).
- Vídeo oficial da Aura (YouTube, BQY7hjlEPWE): conexões WhatsApp/Instagram (75–79 s), caixa de conversas (115 s),
  funil (79,7 s), simulação do agente no celular (88 s). Usados em tela cheia (já estão no visual da Clint).
- Código: `remotion/src/videos/2026-10-16-metodo-etapa2-implantar/` (comum.tsx, cenas.tsx, timeline.ts) · composição `Etapa2Implantar`.
