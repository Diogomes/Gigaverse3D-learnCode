# Cap. 21 - Análise de algoritmos (apêndice)
# Analisar um algoritmo é prever sua ORDEM DE CRESCIMENTO: como o número de
# passos cresce conforme a entrada n aumenta. Usamos a notação O(...).


# O(n) - LINEAR: o trabalho cresce proporcional a n (um laço sobre os dados).
def soma_laco(n):
    total = 0
    for i in range(1, n + 1):  # roda n vezes
        total += i
    return total


# O(1) - CONSTANTE: o trabalho NÃO depende de n (uma conta direta). Mesma
# resposta de soma_laco, mas em um único passo (fórmula de Gauss).
def soma_formula(n):
    return n * (n + 1) // 2


# O(n^2) - QUADRÁTICO: laço dentro de laço. Dobrar n quadruplica os passos.
def conta_pares(itens):
    pares = 0
    for a in itens:        # n vezes...
        for b in itens:    # ...vezes n = n*n comparações
            if a + b == 10:
                pares += 1
    return pares


# As duas somas dão o MESMO resultado; o que muda é o custo em passos.
for n in [10, 100, 1000]:
    print(f"n={n}: laço O(n) = {soma_laco(n)} | fórmula O(1) = {soma_formula(n)}")

print("pares (a+b==10) em [1..6]:", conta_pares(list(range(1, 7))))
