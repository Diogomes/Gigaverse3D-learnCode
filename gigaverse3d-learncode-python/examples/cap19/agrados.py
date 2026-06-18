# Cap. 19 - Os agrados (extra)
# O jeito "pythônico"/funcional de transformar dados em UMA linha,
# sem laço explícito. Comprehension cria a coleção pronta; o gerador
# produz valores sob demanda (preguiçoso), economizando memória.
from collections import Counter

numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 1) O jeito tradicional: um laço explícito que vai preenchendo a lista.
quadrados_pares_loop = []
for n in numeros:
    if n % 2 == 0:
        quadrados_pares_loop.append(n * n)
print("Com laco tradicional ->", quadrados_pares_loop)

# 2) A MESMA coisa com LIST COMPREHENSION: filtro (if) + transformação (n*n).
quadrados_pares = [n * n for n in numeros if n % 2 == 0]
print("Com list comprehension ->", quadrados_pares)

# 3) DICT COMPREHENSION: monta um dicionario {numero: quadrado} de uma vez.
mapa_quadrados = {n: n * n for n in numeros}
print("Dict comprehension ->", mapa_quadrados)

# 4) SET COMPREHENSION: conjunto (sem repetidos) com os restos da divisao por 3.
restos = {n % 3 for n in numeros}
print("Set comprehension ->", restos)

# 5) EXPRESSAO CONDICIONAL (x if cond else y) dentro de uma comprehension.
rotulos = ["par" if n % 2 == 0 else "impar" for n in numeros]
print("Expressao condicional ->", rotulos)

# 6) any() e all() resumem uma lista de testes em um unico bool.
print("Existe algum maior que 8? ->", any(n > 8 for n in numeros))
print("Todos sao positivos?      ->", all(n > 0 for n in numeros))


# 7) FUNCAO GERADORA: yield devolve um valor por vez, sob demanda.
def conta_ate(n):
    atual = 1
    while atual <= n:
        yield atual
        atual += 1


# O for consome o gerador um valor de cada vez (preguiçoso).
print("Gerador conta_ate(5) ->", [valor for valor in conta_ate(5)])

# 8) Counter conta as ocorrencias de cada item de forma automatica.
palavras = ["sol", "lua", "sol", "mar", "lua", "sol"]
contagem = Counter(palavras)
print("Contagem com Counter ->", dict(contagem))
print("Mais comum ->", contagem.most_common(1))
