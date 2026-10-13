"""Gera quadros da Central de Clientes com dados fictícios (mesma fonte e posição da Clint).
uso: python3 anonimizar.py   (lê q/f_*.png, grava telas/*.png)"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONTS = '../../remotion/public/Poppins-{}.ttf'
F = lambda w, s: ImageFont.truetype(FONTS.format(w), s)
os.makedirs('telas', exist_ok=True)

# 12 clientes fictícios: nome, aprovado em, atividade (None = sem campanhas), agente publicado
CLI = [
    ('Clínica Bem Viver', '21/09/2026', '02/10/2026', False),
    ('Rafaela Silva', '21/09/2026', '28/09/2026', True),
    ('Studio Lume Estética', '02/10/2026', None, False),
    ('Maurício Andrade', '08/10/2026', '05/10/2026', False),
    ('Odonto Sorriso Pleno', '21/09/2026', '30/09/2026', False),
    ('Juliana Prado', '18/09/2026', '07/10/2026', True),
    ('Carlos Menezes Advocacia', '21/09/2026', '25/09/2026', False),
    ('Instituto Viva Mais', '21/09/2026', None, False),
    ('Ana Paula Rocha', '21/09/2026', '01/10/2026', False),
    ('Escola Passo Certo', '21/09/2026', None, False),
    ('Bruno Tavares Imóveis', '21/09/2026', '29/09/2026', False),
    ('Pet Center Amigo Fiel', '21/09/2026', '06/10/2026', True),
]
ini = lambda n: ''.join(w[0] for w in n.split() if w[0].isupper())[:2].upper()

C_NAME, C_DATE = (35, 40, 62), (80, 88, 98)
C_ACT, C_ACT_GRAY, C_L2 = (48, 46, 62), (154, 162, 172), (158, 162, 170)
C_GREEN, C_GDOT, C_DOT = (34, 150, 74), (27, 162, 77), (232, 232, 236)
C_INI_BG, C_INI = (243, 239, 254), (96, 52, 186)


def row(im, cy, c):
    """Reescreve uma linha da lista centrada em cy com o cliente c."""
    d = ImageDraw.Draw(im)
    px = im.load()
    bg = px[900, cy]
    nome, aprov, camp, agente = c
    d.rectangle((268, cy - 24, 1000, cy + 24), fill=bg)
    d.rounded_rectangle((274, cy - 16, 305, cy + 15), radius=6, fill=C_INI_BG)
    d.text((289.5, cy), ini(nome), font=F('Medium', 11), fill=C_INI, anchor='mm')
    d.text((318, cy - 10), nome, font=F('Regular', 12), fill=C_NAME, anchor='lm')
    d.text((318, cy + 10), f'Aprovado em {aprov}', font=F('Regular', 12), fill=C_DATE, anchor='lm')
    d.rectangle((1062, cy - 24, 1300, cy + 24), fill=px[1040, cy])
    if camp:
        d.text((1068, cy - 11), f'Última campanha em {camp}', font=F('Regular', 12), fill=C_ACT, anchor='lm')
    else:
        d.text((1068, cy - 11), 'Sem campanhas enviadas', font=F('Regular', 12), fill=C_ACT_GRAY, anchor='lm')
    if agente:
        d.ellipse((1068, cy + 8, 1074, cy + 14), fill=C_GDOT)
        d.text((1080, cy + 11), 'Agente de IA publicado', font=F('Regular', 12), fill=C_GREEN, anchor='lm')
    else:
        d.ellipse((1068, cy + 8, 1074, cy + 14), fill=C_DOT)
        d.text((1080, cy + 11), 'Sem agente publicado', font=F('Regular', 12), fill=C_L2, anchor='lm')


def abas(im):
    """Contadores das abas: Todos 12 · Ativos 9 · Aguardando 3 · Encerrados 0."""
    d = ImageDraw.Draw(im)
    px = im.load()
    for x0, x1, n in ((585, 602, '12'), (654, 670, '9'), (762, 774, '3')):
        d.rectangle((x0, 300, x1, 317), fill=px[x1 + 3, 302] if n != '12' else px[x0 - 30, 302])
        d.text((x0 + 1, 308.5), n, font=F('Regular', 11), fill=(152, 160, 172), anchor='lm')


def avatar(im, y0=862):
    """Troca a foto do usuário (canto inferior esquerdo) por um avatar de iniciais."""
    d = ImageDraw.Draw(im)
    d.rectangle((10, y0, 46, y0 + 34), fill=im.load()[60, y0 + 17])
    d.ellipse((12, y0 + 1, 44, y0 + 33), fill=(196, 182, 255))
    d.text((28, y0 + 17), 'AB', font=F('SemiBold', 12), fill=(255, 255, 255), anchor='mm')


def widget_lista(im, linhas_revogar):
    """Remove o widget do gravador (x 1655–1722, y 488–626) e redesenha o fundo e o 'Revogar'."""
    px = im.load()
    for y in range(486, 628):
        c = px[1636, y]
        for x in range(1640, 1724):
            px[x, y] = c
    d = ImageDraw.Draw(im)
    for cy in linhas_revogar:
        d.text((1647, cy), 'Revogar', font=F('Regular', 12), fill=(52, 51, 72), anchor='lm')


def widget_modal(im):
    """Widget do gravador sobre o fundo desfocado do modal: cobre com o cinza ao redor e desfoca."""
    box = (1650, 480, 1730, 632)
    viz = im.crop((1600, 480, 1650, 632)).resize((80, 152))
    im.paste(viz, box[:2])
    reg = im.crop(box).filter(ImageFilter.GaussianBlur(8))
    im.paste(reg, box[:2])


# ---- L0: lista no topo (gravação 6,6 s) ----
im = Image.open('q/f_6.6.png').convert('RGB')
widget_lista(im, (521, 578))
px = im.load()  # resto do cursor entre as linhas 2 e 3: copia o fundo 80 px à direita
for x in range(478, 512):
    for y in range(476, 508):
        px[x, y] = px[x + 80, y]
for i in range(9):
    row(im, 407 + 57 * i, CLI[i])
abas(im)
avatar(im)
im.save('telas/lista_topo.png')

# ---- L1: lista rolada com cursor no ⓘ (gravação 20,6 s) ----
for src, nome in (('q/f_20.6.png', 'lista_rolada_info.png'), ('frames/hi_31.png', 'lista_rolada.png')):
    im = Image.open(src).convert('RGB')
    for i in range(9):
        row(im, 411 + 57 * i, CLI[3 + i])
    abas(im)
    avatar(im)
    if 'hi_31' in src:  # cursor em cima do cabeçalho "ATIVIDADE RECENTE": redesenha o cabeçalho
        d = ImageDraw.Draw(im)
        d.rectangle((1060, 345, 1200, 390), fill=(255, 255, 255))
        x = 1068
        for ch in 'ATIVIDADE RECENTE':
            d.text((x, 357), ch, font=F('SemiBold', 8), fill=(60, 58, 74), anchor='lm')
            x += F('SemiBold', 8).getlength(ch) + 1.6
    im.save('telas/' + nome)

# ---- Modal de detalhes do cliente (gravação 23,0 s) — cliente "Odonto Sorriso Pleno" ----
im = Image.open('q/f_23.0.png').convert('RGB')
px = im.load()
d = ImageDraw.Draw(im)
nome = CLI[4][0]
d.rectangle((660, 104, 1000, 146), fill=(255, 255, 255))
d.rounded_rectangle((664, 108, 696, 140), radius=7, fill=(243, 242, 251))
d.text((680, 124), ini(nome), font=F('Medium', 11), fill=(70, 50, 170), anchor='mm')
d.text((709, 113), nome, font=F('Regular', 12), fill=(47, 46, 53), anchor='lm')
d.text((709, 134), f'Aprovado em {CLI[4][1]}', font=F('Regular', 12), fill=(78, 77, 84), anchor='lm')
for (x, y, n) in ((723, 231, '78'), (723, 330, '4'), (950, 330, '6'), (723, 430, '1'), (723, 551, '1'), (950, 551, '5'), (723, 668, '1')):
    bg = px[x - 4, y]
    d.rectangle((x - 1, y - 11, x + 26, y + 11), fill=bg)
    d.text((x, y + 0.5), n, font=F('SemiBold', 16), fill=(36, 35, 63), anchor='lm')
d.rectangle((948, 579, 1120, 596), fill=px[945, 587])
d.text((950, 587.5), 'Última em 30/09/2026', font=F('Regular', 12), fill=(150, 152, 160), anchor='lm')
im.save('telas/detalhes.png')

# ---- Modal "Pedir acesso" (gravação 12,0 s) ----
im = Image.open('q/f_12.0.png').convert('RGB')
widget_modal(im)
im.save('telas/pedir_acesso.png')
print('ok')
