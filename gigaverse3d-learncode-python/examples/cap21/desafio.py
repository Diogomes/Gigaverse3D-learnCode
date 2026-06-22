# Desafio do Cap. 21 - análise de algoritmos (de O(n) para O(1))
# A função soma_ate(n) abaixo soma 1..n com um laço: é O(n) (n passos).
# 1) Complete soma_formula(n) para devolver o MESMO resultado em O(1) — tempo
#    constante, SEM laço — usando a fórmula de Gauss: n * (n + 1) // 2.
# 2) As duas devem imprimir o mesmo valor para n = 100 (que é 5050).


def soma_ate(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total


def soma_formula(n):
    # TODO: troque o pass por: return n * (n + 1) // 2
    pass


print("soma_ate(100)     =", soma_ate(100))
print("soma_formula(100) =", soma_formula(100))
