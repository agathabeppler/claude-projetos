"""Ferramentas de gravação de tela da Clint (usadas pelos roteiros de gravação).
Conecta no navegador aberto por navegador.py, injeta cursor visível + anonimização, e grava em 4K via screencast."""
import asyncio, base64, os, shutil, subprocess, tempfile, time
from playwright.async_api import async_playwright

AQUI = os.path.dirname(os.path.abspath(__file__))
CURSOR_JS = r"""
(() => {
  if (window.__fakeCursor) return;
  const c = document.createElement('div');
  c.id='__fc';
  c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" fill="white" stroke="black" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  Object.assign(c.style,{position:'fixed',left:'-50px',top:'-50px',zIndex:2147483647,pointerEvents:'none',transform:'translate(-3px,-2px)'});
  const add=()=>document.body && !document.getElementById('__fc') && document.body.appendChild(c);
  add(); setInterval(add,300);
  document.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';},true);
  window.__fakeCursor=true;
})();
"""

async def conectar(p, anonimizar=True, manter=None):
    """Conecta no Chrome de gravação (porta 9333) e prepara a página: cursor visível e dados anonimizados."""
    b = await p.chromium.connect_over_cdp("http://localhost:9333")
    ctx = b.contexts[0]
    page = ctx.pages[0]
    await ctx.add_init_script(CURSOR_JS)
    if anonimizar:
        keep = "" if manter is None else f"window.__anonKeep = {manter!r};"
        await ctx.add_init_script(keep + open(os.path.join(AQUI, "anon.js"), encoding="utf-8").read())
    await page.evaluate(CURSOR_JS)
    if anonimizar:
        await page.evaluate(open(os.path.join(AQUI, "anon.js"), encoding="utf-8").read())
    return page

class Gravacao:
    """async with Gravacao(page, 'saida/conversas.mp4'): ...  → grava o que acontecer dentro do bloco (4K, 30 fps)."""
    def __init__(self, page, saida):
        self.page, self.saida, self.frames = page, saida, []
        self.dir = tempfile.mkdtemp(prefix="grav_")
    async def __aenter__(self):
        self.cdp = await self.page.context.new_cdp_session(self.page)
        def on_frame(p):
            asyncio.ensure_future(self.cdp.send("Page.screencastFrameAck", {"sessionId": p["sessionId"]}))
            fn = f"{self.dir}/{len(self.frames):05d}.jpg"
            with open(fn, "wb") as f:
                f.write(base64.b64decode(p["data"]))
            self.frames.append((p["metadata"]["timestamp"], fn))
        self.cdp.on("Page.screencastFrame", on_frame)
        await self.cdp.send("Page.startScreencast", {"format": "jpeg", "quality": 92, "maxWidth": 3840, "maxHeight": 2160, "everyNthFrame": 1})
        self.t0 = time.time()
        await asyncio.sleep(0.4)
        return self
    async def __aexit__(self, *exc):
        await asyncio.sleep(0.5)
        await self.cdp.send("Page.stopScreencast")
        t_end = time.time()
        lst = f"{self.dir}/list.txt"
        with open(lst, "w") as f:
            for i, (ts, fn) in enumerate(self.frames):
                nxt = self.frames[i + 1][0] if i + 1 < len(self.frames) else t_end
                f.write(f"file '{fn}'\nduration {max(nxt - ts, 0.001):.4f}\n")
            f.write(f"file '{self.frames[-1][1]}'\n")
        os.makedirs(os.path.dirname(os.path.abspath(self.saida)), exist_ok=True)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst,
                        "-vf", "fps=30,scale=3840:2160:flags=lanczos,format=yuv420p", "-c:v", "libx264", "-crf", "16", "-preset", "medium", self.saida], check=True)
        shutil.rmtree(self.dir, ignore_errors=True)
        print(f"gravado: {self.saida} ({t_end - self.t0:.1f}s, {len(self.frames)} quadros)", flush=True)

async def mover(page, alvo, passos=40, pausa=0.5):
    """Move o cursor suavemente até o centro de um seletor/locator."""
    loc = page.locator(alvo) if isinstance(alvo, str) else alvo
    await loc.first.wait_for(state="visible", timeout=20000)
    b = await loc.first.bounding_box()
    await page.mouse.move(b["x"] + b["width"] / 2, b["y"] + b["height"] / 2, steps=passos)
    await asyncio.sleep(pausa)
    return b

async def clicar(page, alvo, passos=40, pausa=0.5, depois=0.8):
    """Move até o elemento, espera um instante (para o espectador ver) e clica."""
    b = await mover(page, alvo, passos, pausa)
    await page.mouse.click(b["x"] + b["width"] / 2, b["y"] + b["height"] / 2)
    await asyncio.sleep(depois)

async def digitar(page, texto, atraso=0.06, depois=0.6):
    await page.keyboard.type(texto, delay=int(atraso * 1000))
    await asyncio.sleep(depois)

async def pausa(seg):
    await asyncio.sleep(seg)
