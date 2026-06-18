# Cap. 22 - Módulo extra: Programação Funcional
# Em Python, funções são VALORES (funções de primeira classe): dá para
# guardar em variável, passar como argumento e retornar de outra função.
import time
from functools import reduce, partial


# Um DECORADOR é uma função que RECEBE uma função e DEVOLVE outra função.
# Aqui, @cronometro embrulha a função para medir e imprimir o tempo dela.
def cronometro(funcao):
    def embrulho(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = funcao(*args, **kwargs)
        fim = time.perf_counter()
        print(f"[cronometro] {funcao.__name__} levou {fim - inicio:.6f}s")
        return resultado
    return embrulho


# Lista de jogadores: cada um é um dicionário com nome e pontos.
jogadores = [
    {"nome": "Ana", "pontos": 90},
    {"nome": "Bento", "pontos": 40},
    {"nome": "Caio", "pontos": 75},
    {"nome": "Dora", "pontos": 30},
    {"nome": "Eva", "pontos": 60},
]


@cronometro
def pipeline(dados, limite):
    # filter + lambda: mantém só quem tem pontos ACIMA do limite.
    acima = filter(lambda j: j["pontos"] > limite, dados)
    # map + lambda: transforma cada jogador apenas no seu número de pontos.
    pontos = map(lambda j: j["pontos"], acima)
    # reduce: dobra a lista de pontos até um único valor (a soma).
    return reduce(lambda acumulado, p: acumulado + p, pontos, 0)


# soma_acima é uma função criada a partir de pipeline, com limite já fixo.
# functools.partial "congela" o argumento limite=50.
soma_acima = partial(pipeline, limite=50)

print("== Pipeline funcional ==")
total = soma_acima(jogadores)
print("Soma dos pontos acima de 50:", total)

# sorted com key=lambda: ordena por pontos, do maior para o menor.
ranking = sorted(jogadores, key=lambda j: j["pontos"], reverse=True)
print("\n== Ranking (maior -> menor) ==")
for posicao, j in enumerate(ranking, start=1):
    print(f"{posicao}. {j['nome']} ({j['pontos']} pts)")

# CLOSURE: faz_multiplicador devolve uma função que "lembra" o fator
# do escopo onde foi criada, mesmo depois de faz_multiplicador terminar.
def faz_multiplicador(fator):
    def multiplica(x):
        return x * fator
    return multiplica


dobro = faz_multiplicador(2)
print("\n== Closure ==")
print("dobro(21) =", dobro(21))
