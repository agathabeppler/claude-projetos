"""Executa um roteiro de gravação e salva uma tomada (.mp4 4K) por função.
uso: python3 scripts/gravacao/gravar.py projetos/<p>/gravacao.py projetos/<p>/entrada/telas [nome_da_tomada ...]

O roteiro (gravacao.py) define funções  async def tomada_<nome>(page, c):  onde `c` é o módulo clint.py
(c.clicar, c.mover, c.digitar, c.pausa). Opcional:  async def preparar_<nome>(page, c):  roda ANTES de gravar
(navegar até a tela, abrir o contato certo...). Opcional: MANTER = ['Nome real permitido', ...]."""
import asyncio, importlib.util, os, sys
from playwright.async_api import async_playwright
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import clint as c

roteiro, saida = sys.argv[1], sys.argv[2]
so = set(sys.argv[3:])
spec = importlib.util.spec_from_file_location("roteiro", roteiro)
mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
tomadas = [n[len("tomada_"):] for n in dir(mod) if n.startswith("tomada_")]
tomadas.sort(key=lambda n: getattr(mod, "tomada_" + n).__code__.co_firstlineno)

async def main():
    async with async_playwright() as p:
        page = await c.conectar(p, manter=getattr(mod, "MANTER", None))
        for n in tomadas:
            if so and n not in so:
                continue
            prep = getattr(mod, "preparar_" + n, None)
            if prep:
                await prep(page, c)
                await asyncio.sleep(1.0)
            async with c.Gravacao(page, os.path.join(saida, f"{n}.mp4")):
                await getattr(mod, "tomada_" + n)(page, c)
asyncio.run(main())
