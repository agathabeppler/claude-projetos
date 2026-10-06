// Troca dados de clientes reais por dados fictícios estáveis (mesmo cliente real -> mesmo fictício em todas as gravações).
(() => {
  if (window.__anon) return; window.__anon = true;
  // Nomes que podem aparecer de verdade (contato de teste e atendentes do time). Defina window.__anonKeep antes, se precisar.
  const KEEP = window.__anonKeep || ['Rafaela Silva', 'Rafaela Beck'];
  const F = ['Juliana Martins','Patrícia Lima','Fernanda Rocha','Camila Nunes','Larissa Mendes','Beatriz Souza','Mariana Costa','Aline Barbosa','Isabela Duarte','Vanessa Teixeira','Priscila Araújo','Letícia Freitas','Gabriela Pinto','Renata Moraes','Carolina Dias','Tatiane Ramos','Bianca Cardoso','Daniela Vieira'];
  const M = ['Carlos Eduardo','Bruno Carvalho','Rodrigo Alves','Gustavo Pereira','Thiago Ribeiro','Lucas Fernandes','Renato Gomes','Felipe Moura','André Lopes','Diego Monteiro','Marcelo Antunes','Ricardo Nogueira','Fábio Correia','Eduardo Batista','Vinícius Castro','Paulo Henrique'];
  const MSG = ['Perfeito, pode me mandar a proposta?','Consigo falar amanhã às 10h, pode ser?','Obrigada pelo retorno! 😊','Qual o valor do plano anual?','Já fiz o pagamento, segue o comprovante','Bom dia! Ainda tem horário essa semana?','Vou alinhar com meu sócio e te retorno','Fechado então, vamos seguir 👍','Pode sim, me liga quando puder','Recebi o contrato, assino hoje ainda','Tem como parcelar no cartão?','Oi! Vi o anúncio e queria saber mais','Show, aguardo o link da reunião','Consegue me enviar o material por aqui?','Ótimo atendimento, obrigado!','Pode agendar para sexta de manhã','Ainda estou avaliando, te aviso','Funcionou certinho agora, valeu!','Qual o prazo de implantação?','Me manda o boleto por favor'];
  const ATT = ['female/4.jpg','male/9.jpg','female/14.jpg'];
  const FAKES = new Set([...F, ...M, ...MSG]);
  const h = s => { let x = 5381; for (const c of s) x = ((x << 5) + x + c.charCodeAt(0)) >>> 0; return x; };
  const used = new Map(), taken = new Set();
  const fakeName = real => {
    if (used.has(real)) return used.get(real);
    const all = [...F.map(n => [n, 'female']), ...M.map(n => [n, 'male'])];
    let i = h(real) % all.length; while (taken.has(all[i][0]) && taken.size < all.length) i = (i + 1) % all.length;
    taken.add(all[i][0]); used.set(real, all[i]); return all[i];
  };
  const usedM = new Map(), takenM = new Set();
  const fakeMsg = real => { if (usedM.has(real)) return usedM.get(real); let i = h('m' + real) % MSG.length; while (takenM.has(i) && takenM.size < MSG.length) i = (i + 1) % MSG.length; takenM.add(i); usedM.set(real, MSG[i]); return MSG[i]; };
  const avatar = (seed, g) => `https://file.clint.digital/avatars/${g}/${1 + h(seed) % 22}.jpg`;
  const setText = (node, v) => { if (node.nodeValue !== v) node.nodeValue = v; };
  // Qualquer celular brasileiro visível vira um número fictício.
  const PHONE = /(\+?55\s?)?\(?\d{2}\)?[\s-]?9\s?\d{4}[\s.-]?\d{4}/g, FAKE_PHONE = '(11) 98765-4321';
  const EMAIL = /[\w.+-]+@[\w-]+\.[\w.]+/g;
  const fakeEmail = e => { if (/@suaempresa\.com\.br$/.test(e)) return e; const [n] = fakeName('mail:' + e); return n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '.') + '@suaempresa.com.br'; };
  const TIME = /^(\d{1,2}:\d{2}|ontem|hoje|\d{1,2}\/\d{1,2}(\/\d{2,4})?|\d+)$/i;

  function chatItem(li) {
    const nameEl = li.querySelector('[data-cy="message-area-contact-name"]');
    if (!nameEl) return;
    const real = nameEl.dataset.anonReal || nameEl.textContent.trim();
    if (KEEP.includes(real)) return;
    nameEl.dataset.anonReal = real;
    const [fn, g] = fakeName(real);
    if (nameEl.textContent !== fn) nameEl.textContent = fn;
    const w = document.createTreeWalker(li, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      const t = n.nodeValue.trim();
      if (!t || nameEl.contains(n) || TIME.test(t) || n.parentElement.closest('.chakra-avatar__fallback')) continue;
      if (t.length > 2 && !FAKES.has(t)) setText(n, fakeMsg(real));
    }
    const imgs = [...li.querySelectorAll('img')];
    imgs.forEach((im, k) => {
      const big = im.getBoundingClientRect().width > 34 || k === 0;
      const want = big ? avatar(real, g) : 'https://file.clint.digital/avatars/' + ATT[h(real) % ATT.length];
      if (im.getAttribute('src') !== want) im.setAttribute('src', want);
    });
  }
  function kanbanCard(c) {
    const nameEl = c.querySelector('[data-cy="tbl-deal-item-name"]');
    if (!nameEl) return;
    const real = nameEl.dataset.anonReal || nameEl.textContent.trim();
    if (KEEP.includes(real)) return;
    nameEl.dataset.anonReal = real;
    const [fn, g] = fakeName(real);
    const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      const t = n.nodeValue.trim();
      if (!t) continue;
      if (nameEl.contains(n)) { setText(n, fn); continue; }
      if (!/[A-Za-zÀ-ú]{3,}/.test(t) || /^(R\$|\d)/.test(t) || TIME.test(t) || FAKES.has(t) || t === 'Indicação') continue;
      setText(n, t.length < 28 ? 'Indicação' : fakeMsg(real));
    }
    const im = c.querySelector('img');
    if (im) { const want = avatar(real, g); if (im.getAttribute('src') !== want) im.setAttribute('src', want); }
  }
  function textPass(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      const v = n.nodeValue;
      if (PHONE.test(v)) { PHONE.lastIndex = 0; setText(n, v.replace(PHONE, FAKE_PHONE)); }
      PHONE.lastIndex = 0;
      if (EMAIL.test(v)) {
        EMAIL.lastIndex = 0;
        const real = v.match(EMAIL)[0];
        if (!/@suaempresa\.com\.br$/.test(real)) {
          // nome do atendente que aparece junto do e-mail vira o nome fictício correspondente
          const prev = n.parentElement && n.parentElement.previousElementSibling;
          if (prev && !prev.textContent.includes('@') && prev.textContent.trim().length < 40 && prev.childElementCount === 0) prev.textContent = fakeName('mail:' + real)[0];
          setText(n, v.replace(EMAIL, fakeEmail));
        }
      }
      EMAIL.lastIndex = 0;
    }
    root.querySelectorAll && root.querySelectorAll('input').forEach(i => { if (PHONE.test(i.value)) { PHONE.lastIndex = 0; i.value = i.value.replace(PHONE, FAKE_PHONE); } PHONE.lastIndex = 0; });
  }
  window.__anonExtra = window.__anonExtra || [];
  let busy = false;
  let win = 0, cnt = 0;
  function run() {
    const now = performance.now(); if (now - win > 1000) { win = now; cnt = 0; }
    if (++cnt > 120) return;   // trava de segurança contra loop
    if (busy) return; busy = true;
    try {
      document.querySelectorAll('.chat-item').forEach(chatItem);
      document.querySelectorAll('[data-cy="kanban-card"]').forEach(kanbanCard);
      textPass(document.body);
      window.__anonExtra.forEach(f => { try { f({ fakeName, avatar, h, MSG, FAKES, KEEP }); } catch (e) {} });
    } finally { busy = false; }
  }
  window.__anonRun = run; window.__anonApi = { fakeName, avatar, h, MSG, FAKES, KEEP };
  const start = () => {
    run();
    new MutationObserver(run).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['src', 'value'] });
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
