# Central de Clientes (parceiro acompanha clientes indicados)

Gravação da Agatha: entrada/gravacao.mp4 (46,8 s, 1800x904, tema claro). AQUI a Agatha PEDIU para usar a gravação dela, trocando os dados por fictícios.

Mapa da gravação (s):
- 0–2 kanban de Negócios · 2–6 menu Mais › seção PARCEIRO › "Central de Clientes" (clique ~5)
- 6–8 Central de Clientes: certificado de parceiro, abas Todos 22 / Ativos 16 / Aguardando 6 / Encerrados 0, lista (Cliente/Aprovado em, Atividade recente, Status, Acessar conta, Revogar, ⓘ)
- 8 clique "Pedir acesso" › 9–14 modal "Pedir acesso a um cliente" (e-mail de um usuário da conta; admin aprova; cliente pode revogar)
- 15–17 rolagem da lista · 18–20 hover ⓘ "Detalhes do cliente"
- 20–23 modal detalhes (Marcelo): score 42 Estável, Usuários ativos 2, Origens 9, Canais 1 (WhatsApp Oficial), Agentes de IA 1, Campanhas 3, Integrações 0
- 27–30, 32–34, 36, 38–40 outros modais de detalhes · 41–46 lista
- Widget do gravador (canto direito ~x1660–1720, y490–620) e foto do usuário (canto inf. esq.) → cobrir/desfocar

Dados a trocar por fictícios: nomes, iniciais, datas "Aprovado em", datas de campanha, números dos modais, contadores das abas.
Método: sobreposição em Remotion nas posições fixas (linhas com passo de 57 px); durante a rolagem, desfocar a coluna de nomes.

## Respostas da Agatha
- Na Central aparecem SÓ os clientes que entraram pelo link de indicação.
- "42 · Estável · Medido hoje" = nota de saúde da conta do cliente.
- "Revogar" (parceiro sai da conta do cliente): NÃO citar no vídeo.

## Narração (aprovada junto com o roteiro, 13/10)
- HeyGen "Voz IA 26 (clone)" 045f75696cf04e32bd1a42c507edace3, elevenlabs, pt — entrada/narracao.wav (88,45 s), texto em entrada/roteiro_aprovado.txt

## Montagem (Remotion: src/central-clientes/, composição "CentralClientes")
- anonimizar.py gera public/central/*.png com dados fictícios (12 clientes fictícios; modal = "Odonto Sorriso Pleno", nota 78).
- Trecho em vídeo só no menu (gravação 0–5,2 s) com foto e widget cobertos; resto = quadros parados + zoom + cursor/clique próprios.
- Linha do tempo: Abertura 0–6,74 · TELA 6,74–77,44 (menu, lista, abas, colunas, detalhes, pedir acesso com e-mail digitado, acessar conta) · Oportunidades 77,44–84,37 · Final 84,37–88,45.
- public/central/gravacao.mp4 NÃO vai para o Git (dados reais); recriar com: ffmpeg -i entrada/gravacao.mp4 -an -c:v libx264 -g 1 -crf 16 -pix_fmt yuv420p -r 30 ../../remotion/public/central/gravacao.mp4
- Prévias: saida/previa_1_abertura_menu.mp4 e saida/previa_2_detalhes.mp4 (trilha "Comida" provisória).
