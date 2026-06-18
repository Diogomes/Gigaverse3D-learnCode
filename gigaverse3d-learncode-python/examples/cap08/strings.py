# Cap. 8 - Strings
# Uma string e uma SEQUENCIA de caracteres. Da para medir, percorrer,
# pegar pedacos e transformar. So nao da para mudar no lugar: ela e IMUTAVEL.

palavra = "Gigaverse"

# len() conta quantos caracteres a string tem.
print("A palavra:", palavra)
print("Tamanho:", len(palavra))

# INDICE: cada caractere tem uma posicao. A contagem comeca em 0.
print("Primeiro caractere [0]:", palavra[0])
print("Ultimo caractere [-1]:", palavra[-1])

# FATIAMENTO (slicing): s[a:b] pega do indice a ate b-1 (b NAO entra).
print("Fatia [0:4]:", palavra[0:4])
print("Fatia do fim [-3:]:", palavra[-3:])
print("Invertida [::-1]:", palavra[::-1])

# TRAVESSIA: o for passa por um caractere de cada vez.
print("Letra a letra:", end=" ")
for letra in palavra:
    print(letra, end=" ")
print()

# Metodos devolvem uma NOVA string (a original nao muda, pois e imutavel).
frase = "Python E Demais"
print("Em minusculas:", frase.lower())
print("Trocando E por eh:", frase.replace("E", "eh"))

# O operador in pergunta se um pedaco existe dentro da string.
print("Tem 'ver' em Gigaverse?", "ver" in palavra)


# DEMO 1 - Verificador de palindromo.
# Palindromo: le igual de tras para frente (ex.: "arara").
# Normalizamos com lower() e comparamos com a versao invertida [::-1].
def eh_palindromo(texto):
    normal = texto.lower()
    return normal == normal[::-1]


print()
print("=== Palindromo ===")
for teste in ["arara", "Python", "Ana", "osso"]:
    print(teste, "->", eh_palindromo(teste))


# DEMO 2 - Contador de letras.
# Conta quantas vezes uma letra aparece percorrendo a string.
def contar_letra(texto, alvo):
    total = 0
    for letra in texto.lower():
        if letra == alvo.lower():
            total += 1
    return total


print()
print("=== Contador de letras ===")
amostra = "programacao em Python"
print("Frase:", amostra)
print("Quantos 'a':", contar_letra(amostra, "a"))
print("Quantos 'p':", contar_letra(amostra, "p"))
print("Quantos 'z':", contar_letra(amostra, "z"))
