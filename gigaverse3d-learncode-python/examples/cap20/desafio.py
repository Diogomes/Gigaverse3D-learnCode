# Desafio do Cap. 20 - depuração (ler o traceback)
# Este programa tem um BUG de execução: ele quebra com um traceback ao rodar.
# 1) RODE com [r] e leia o traceback DE BAIXO PARA CIMA: a última linha diz o
#    TIPO do erro; logo acima, o arquivo e a LINHA onde ele aconteceu.
# 2) Conserte o bug para o programa imprimir a média corretamente (deve dar 18.0).


def media(numeros):
    # BUG: o nome usado aqui está diferente do parâmetro 'numeros'.
    return sum(numeros) / len(numero)


print("Média:", media([4, 8, 15, 16, 23, 42]))
