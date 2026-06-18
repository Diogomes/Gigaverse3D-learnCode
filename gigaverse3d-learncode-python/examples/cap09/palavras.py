# Cap. 9 - Estudo de caso: jogo de palavras
# A LISTA de palavras fica embutida aqui no proprio arquivo (sem ler arquivo externo).
palavras = ["gato", "abelha", "murcielago", "ceu", "rio", "educacao", "lapis", "fui"]


# Funcao que diz se uma palavra CONTEM uma certa letra.
# O operador "in" verifica se o caractere aparece dentro do texto.
def tem_letra(palavra, letra):
    return letra in palavra.lower()


# Funcao que diz se uma palavra contem TODAS as vogais (a, e, i, o, u).
def tem_todas_vogais(palavra):
    p = palavra.lower()
    for vogal in "aeiou":
        if vogal not in p:   # achou uma vogal faltando? entao nao tem todas
            return False
    return True


# (1) FILTRAGEM: percorrer a lista e selecionar so as palavras SEM a letra "e".
print("Palavras SEM a letra 'e':")
for palavra in palavras:
    if not tem_letra(palavra, "e"):
        print("  -", palavra)

# (2) FILTRAGEM: percorrer a lista e selecionar so as que tem TODAS as vogais.
print("Palavras com TODAS as vogais:")
for palavra in palavras:
    if tem_todas_vogais(palavra):
        print("  -", palavra)
