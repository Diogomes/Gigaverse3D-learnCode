# Cap. 22 - Desafio: Programação Funcional
# Objetivo: usar map/filter/reduce e um sorted com key=lambda.
from functools import reduce

produtos = [
    {"nome": "Espada", "preco": 120},
    {"nome": "Escudo", "preco": 80},
    {"nome": "Poção", "preco": 25},
    {"nome": "Elmo", "preco": 95},
]

# TODO 1: use filter + lambda para manter só os produtos com preco >= 80.
# TODO 2: use map + lambda para extrair apenas o preco de cada um.
# TODO 3: use reduce para somar esses preços num único valor.
caros = filter(lambda p: p["preco"] >= 80, produtos)
precos = map(lambda p: p["preco"], caros)
total = reduce(lambda acumulado, preco: acumulado + 0, precos, 0)  # TODO: troque o 0 por preco

print("Soma dos itens caros:", total)

# TODO 4: ordene os produtos do mais barato para o mais caro com sorted(key=...).
ordenados = sorted(produtos, key=lambda p: 0)  # TODO: troque o 0 por p["preco"]
for p in ordenados:
    print(p["nome"], "->", p["preco"])
