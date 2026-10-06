"""Abre o Chrome de gravação da Clint (perfil próprio, login salvo) e deixa-o aberto para o Claude controlar.
uso (em segundo plano):  python3 scripts/gravacao/navegador.py [url]
parar:                   python3 scripts/gravacao/navegador.py --parar
- 1920x1080 com escala 2x (gravações em 4K), tema escuro, pt-BR, porta de controle 9333.
- Na primeira vez a PESSOA faz login na janela que abrir (o Claude nunca digita senha). Depois o login fica salvo em
  ~/.cache/clint-video-studio/chrome-perfil."""
import asyncio, os, subprocess, sys
from playwright.async_api import async_playwright
PERFIL = os.path.expanduser("~/.cache/clint-video-studio/chrome-perfil")
if "--parar" in sys.argv:
    subprocess.run(["pkill", "-f", "chrome-perfil"]); print("navegador fechado"); sys.exit(0)
URL = next((a for a in sys.argv[1:] if a.startswith("http")), "https://app.useclint.com")
async def main():
    async with async_playwright() as p:
        ctx = await p.chromium.launch_persistent_context(
            PERFIL, headless=False, viewport={"width": 1920, "height": 1080}, device_scale_factor=2,
            locale="pt-BR", color_scheme="dark",
            args=["--remote-debugging-port=9333", "--window-size=1920,1180", "--hide-scrollbars",
                  "--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
        try:
            await ctx.grant_permissions(["microphone", "notifications"], origin="https://app.useclint.com")
        except Exception:
            pass
        page = ctx.pages[0] if ctx.pages else await ctx.new_page()
        await page.goto(URL)
        print("navegador pronto na porta 9333:", URL, flush=True)
        await asyncio.Event().wait()
asyncio.run(main())
