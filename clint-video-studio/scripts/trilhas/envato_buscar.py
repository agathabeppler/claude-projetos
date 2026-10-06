"""Busca músicas no Envato pelo navegador de gravação (porta 9333) e salva título, autor, id e prévia (.m4a pública).
uso: python3 scripts/trilhas/envato_buscar.py "termos em inglês" saida.tsv [mais termos ...]
Ex.: python3 scripts/trilhas/envato_buscar.py "upbeat acoustic ukulele claps happy" "positive acoustic guitar whistle" projetos/<p>/trilhas/candidatas.tsv
Se o Envato pedir login, a PESSOA entra na janela do navegador (o Claude nunca digita senha)."""
import asyncio, sys, urllib.parse
from playwright.async_api import async_playwright
*termos, saida = sys.argv[1:]
JS = r"""() => {
  const html = document.documentElement.innerHTML;
  const rows = [...document.querySelectorAll('a[href*="/search/music/"]')]
    .map(a => ({t: a.textContent.trim().slice(0, 80), id: (a.getAttribute('href').match(/music\/([0-9a-f-]{36})/) || [])[1]}))
    .filter(r => r.t && r.id);
  const seen = new Set(), out = [];
  for (const r of rows) {
    if (seen.has(r.id)) continue; seen.add(r.id);
    let i = html.indexOf(r.id), url = null;
    while (i >= 0 && !url) { const m = html.slice(i, i + 6000).match(/https:\/\/public-assets\.content-platform\.envatousercontent\.com\/[^"'\s\\]+?\.m4a/); if (m) url = m[0]; i = html.indexOf(r.id, i + 1); }
    const card = document.querySelector('a[href*="' + r.id + '"]');
    const box = card && card.closest('div[class]')?.parentElement?.parentElement;
    const autor = ((box ? box.innerText : '').match(/(?:Por|By) ([^\n]+)/) || [])[1] || '';
    if (url) out.push([r.t, autor, r.id, url]);
  }
  return out;
}"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp("http://localhost:9333")
        page = b.contexts[0].pages[0]
        todos, vistos = [], set()
        for termo in termos:
            await page.goto("https://app.envato.com/search?itemType=music&term=" + urllib.parse.quote(termo))
            await page.wait_for_timeout(4000)
            for _ in range(3):
                await page.mouse.wheel(0, 4000); await page.wait_for_timeout(1200)
            if "sign_in" in page.url or "login" in page.url:
                print("LOGIN_NECESSARIO: peça para a pessoa entrar no Envato na janela aberta"); return
            for r in await page.evaluate(JS):
                if r[2] not in vistos: vistos.add(r[2]); todos.append(r)
        with open(saida, "w", encoding="utf-8") as f:
            for r in todos: f.write("\t".join(r) + "\n")
        print(f"{len(todos)} faixas salvas em {saida}")
asyncio.run(main())
