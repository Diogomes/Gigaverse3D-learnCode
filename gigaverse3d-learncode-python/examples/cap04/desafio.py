# Desafio do Cap. 4 - design de interface (encapsular e generalizar)
# 1) Complete desenhar_quadrado(lado) REAPROVEITANDO desenhar_retangulo:
#    um quadrado é só um retângulo com altura igual à largura.
# 2) Crie a função triangulo(altura) que imprime um triângulo retângulo de '*':
#    a linha 1 tem 1 estrela, a linha 2 tem 2, ... até 'altura' estrelas.
# 3) Chame desenhar_quadrado(4) e triangulo(4) para ver os desenhos.


def linha(largura, caractere):
    return caractere * largura


def desenhar_retangulo(altura, largura, caractere="*"):
    for _ in range(altura):
        print(linha(largura, caractere))


def desenhar_quadrado(lado):
    # TODO: chame desenhar_retangulo passando 'lado' para altura E largura.
    pass


# TODO: defina triangulo(altura) que imprime linhas com 1, 2, ... 'altura' estrelas.
# Dica: use um laço e print(linha(i, "*")) com i indo de 1 até altura.


# TODO: chame desenhar_quadrado(4) e depois triangulo(4).
