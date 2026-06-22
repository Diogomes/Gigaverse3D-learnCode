# Cap. 20 - Depuração (apêndice)
# Há três tipos de erro:
#  1) SINTAXE: o Python nem consegue ler o código (ex.: faltou fechar um parêntese).
#  2) EM EXECUÇÃO (runtime): o código roda e estoura no meio (ex.: dividir por zero).
#     Aparece um TRACEBACK — leia-o DE BAIXO PARA CIMA: a última linha diz o tipo do erro.
#  3) SEMÂNTICO: roda sem erro, mas faz a coisa ERRADA. O mais difícil de achar.
# Abaixo, três ferramentas para depurar SEM o programa quebrar.


# Ferramenta 1: print para INSPECIONAR valor e tipo enquanto investiga.
def media(numeros):
    print("DEBUG media() recebeu:", repr(numeros), "| tipo:", type(numeros).__name__)
    return sum(numeros) / len(numeros)


# Ferramenta 2: try/except para CAPTURAR um erro de execução e seguir em frente.
def media_segura(numeros):
    try:
        return media(numeros)
    except ZeroDivisionError:
        # Lista vazia -> divisão por zero. Tratamos em vez de deixar quebrar.
        return 0.0


# Ferramenta 3: assert para flagrar CEDO um estado que nunca deveria ocorrer.
def aplicar_desconto(preco, percentual):
    assert 0 <= percentual <= 100, f"percentual fora de 0..100: {percentual}"
    return preco * (1 - percentual / 100)


print("média de [10, 20, 30] =", media_segura([10, 20, 30]))
print("média de [] (vazia)   =", media_segura([]))
print("preço de 80 com 25% off =", aplicar_desconto(80, 25))
