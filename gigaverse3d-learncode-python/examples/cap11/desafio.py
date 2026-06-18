# Cap. 11 - Desafio: contador de letras
# Receba a palavra abaixo e conte quantas vezes cada LETRA aparece,
# guardando o resultado num dicionario chamado "contagem".
palavra = "abacaxi"

contagem = {}
for letra in palavra:
    # TODO: troque o 0 abaixo por  contagem.get(letra, 0) + 1
    #       para somar 1 a cada vez que a letra aparece.
    contagem[letra] = 0

# Mostra o resultado, uma letra por linha, com .items()
for letra, vezes in contagem.items():
    print(f"{letra}: {vezes}")
