---
name: gif-produto
description: Cria um GIF curto e em loop de uma interação de produto da Clint (ex.: clicar num botão do app e o celular tocar no WhatsApp), em qualquer tamanho pedido (ex.: 260x346). Use para e-mails, help center, landing pages e posts.
---

# GIF de produto Clint

Siga as regras do `CLAUDE.md` (estilo, privacidade, contatos fictícios).

1. **Entenda o pedido**: tamanho exato (largura × altura), o que acontece em ordem (ex.: "clica em Chamar pelo WhatsApp → celular tocando → chamada atendida") e se há uma imagem de referência. Se a pessoa mandar print da tela do app, recrie a interface fielmente (cores do tema escuro do app, ícones roxos, Poppins).
2. **Base**: copie `remotion/src/exemplos/ligacoes-whatsapp/CallGif.tsx` para `remotion/src/projeto/<Nome>Gif.tsx` e adapte. Ele mostra o padrão:
   - desenhar num canvas ~3,3× maior que o GIF final (ex.: 870×1158 para 260×346) e reduzir na exportação — o texto fica nítido;
   - cenas encadeadas por tempo (`T = {...}`), cursor com clique (pulso), transições com blur/mola;
   - **loop perfeito**: nos últimos ~0,4 s, faça um crossfade para o primeiro quadro.
3. Registre a composição em `remotion/src/Root.tsx` (fps 25, duração 4–6 s).
4. **Prévia** ✋: `COMP=<Id> node stills.mjs <quadros>` + `./sheet.sh` e mostre a folha antes de exportar.
5. **Exporte**: `scripts/gif.sh <Id> <largura> <altura> projetos/<p>/saida/<nome>.gif` (paleta otimizada, loop infinito). Ideal < 1,5 MB; se passar, reduza fps para 20 ou a duração.
6. Confira 3–4 quadros do GIF final em tamanho real e entregue (mostre no Finder).
