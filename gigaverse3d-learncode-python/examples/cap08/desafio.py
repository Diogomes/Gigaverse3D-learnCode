# Desafio do Cap. 8
# 1) Complete a funcao contar_vogais: ela deve devolver quantas
#    vogais (a, e, i, o, u) existem na string recebida.
#    Dica: percorra com for e use o operador in: if letra in "aeiou".
# 2) Use lower() para nao depender de maiusculas/minusculas.

def contar_vogais(texto):
    total = 0
    for letra in texto.lower():
        # TODO: se a letra for uma vogal, some 1 em total
        pass
    return total


print("Vogais em 'Gigaverse':", contar_vogais("Gigaverse"))
print("Vogais em 'PYTHON':", contar_vogais("PYTHON"))
