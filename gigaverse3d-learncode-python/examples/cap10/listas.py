# Cap. 10 - Listas
# Uma LISTA guarda vários valores em ordem, dentro de colchetes [ ].
# Aqui ela é o nosso inventário de itens de uma mochila.
inventario = ["espada", "escudo", "poção"]
print("Inventário inicial:", inventario)

# len() diz quantos itens a lista tem.
print("Quantidade de itens:", len(inventario))

# O índice começa em 0: o primeiro item é inventario[0].
print("Primeiro item:", inventario[0])
print("Último item:  ", inventario[-1])

# Fatiar (slice) pega um pedaço da lista: do índice 0 até antes do 2.
print("Dois primeiros:", inventario[0:2])

# append() ADICIONA um item no fim da lista (altera a lista no lugar).
inventario.append("mapa")
print("Depois de pegar o mapa:", inventario)

# sort() ORDENA a lista no lugar e devolve None (não devolve uma lista nova).
inventario.sort()
print("Em ordem alfabética:    ", inventario)

# pop() remove e DEVOLVE o último item (ou o de um índice escolhido).
descartado = inventario.pop()
print("Descartei:", descartado, "-> sobrou:", inventario)

# remove() apaga a PRIMEIRA ocorrência de um valor específico.
inventario.remove("escudo")
print("Sem o escudo:", inventario)

# Percorrer a lista com for: o nome 'item' assume cada valor, um por vez.
print("Conteúdo final da mochila:")
for item in inventario:
    print(" -", item)

# ALIASING: 'copia' NÃO é uma nova lista; é outro nome para a MESMA lista.
copia = inventario
copia.append("tocha")
# Mexer em 'copia' também mexe em 'inventario', porque apontam para a mesma lista.
print("inventario após mexer na copia:", inventario)
