# Cap. 12 - Tuplas
# Uma TUPLA é uma sequência IMUTÁVEL: depois de criada, não dá para
# trocar, adicionar nem remover itens. Usa parênteses (e vírgulas).
ponto = (10, 20)
print("A tupla ponto ->", ponto)

# Para acessar um item usamos o índice (base 0), igual às listas.
print("x =", ponto[0], "| y =", ponto[1])

# DESEMPACOTAMENTO: dá um nome a cada item de uma vez só.
x, y = ponto
print("Desempacotado: x =", x, "e y =", y)

# Truque clássico: trocar dois valores SEM variável auxiliar.
a, b = 1, 2
a, b = b, a
print("Depois da troca: a =", a, "e b =", b)


def min_max(numeros):
    # Uma função pode RETORNAR vários valores; na prática é uma tupla.
    return min(numeros), max(numeros)


notas = [7.5, 9.0, 4.0, 8.5, 6.0]
# O retorno (uma tupla) é desempacotado em duas variáveis na mesma linha.
menor, maior = min_max(notas)
print("Menor nota:", menor, "| Maior nota:", maior)

# zip() casa duas (ou mais) sequências, item a item, formando pares.
nomes = ["Ana", "Bruno", "Carla"]
for nome, nota in zip(nomes, notas):
    print(nome, "tirou", nota)
