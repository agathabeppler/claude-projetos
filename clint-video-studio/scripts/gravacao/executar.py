"""Executa um trecho de código Playwright no navegador de gravação aberto (porta 9333). Útil para explorar telas e para baixar a trilha escolhida no Envato.
uso: echo 'await page.goto("https://app.envato.com")' | python3 scripts/gravacao/executar.py
(o código roda dentro de uma função async; variáveis disponíveis: page, asyncio)"""
import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.connect_over_cdp("http://localhost:9333")
        page = b.contexts[0].pages[0]
        code = sys.stdin.read()
        ns = {"page": page, "asyncio": asyncio}
        exec("async def __f():\n" + "\n".join("    "+l for l in code.splitlines()), ns)
        await ns["__f"]()
asyncio.run(main())
