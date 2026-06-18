# Cap. 5 - Condicionais e recursão
# O operador % (módulo) devolve o RESTO de uma divisão inteira.
# Se o resto da divisão por 2 for zero, o número é par.
print("10 % 2 =", 10 % 2)   # 0 -> 10 é par
print("7 % 2  =", 7 % 2)    # 1 -> 7 é ímpar


# Um classificador par/ímpar: a expressão (n % 2 == 0) é booleana,
# vale True ou False, e decide qual ramo do if/else executa.
def par_ou_impar(n):
    if n % 2 == 0:
        return "par"
    else:
        return "ímpar"


print("8 é", par_ou_impar(8))
print("3 é", par_ou_impar(3))


# Condicional encadeada: if / elif / else testa as faixas em ordem.
# O Python para no PRIMEIRO teste verdadeiro e ignora o resto.
def faixa_etaria(idade):
    if idade < 12:
        return "criança"
    elif idade < 18:
        return "adolescente"
    elif idade < 60:
        return "adulto"
    else:
        return "idoso"


print("Idade 8  ->", faixa_etaria(8))
print("Idade 15 ->", faixa_etaria(15))
print("Idade 40 ->", faixa_etaria(40))
print("Idade 70 ->", faixa_etaria(70))


# RECURSÃO: uma função que chama a si mesma.
# Caso-base: quando n chega a 0, paramos (e NÃO chamamos de novo).
# Caso recursivo: imprimimos n e chamamos contagem(n - 1),
# caminhando sempre em direção ao caso-base.
def contagem(n):
    if n == 0:
        print("Fogo!")
    else:
        print(n)
        contagem(n - 1)


print("Contagem regressiva a partir de 5:")
contagem(5)
