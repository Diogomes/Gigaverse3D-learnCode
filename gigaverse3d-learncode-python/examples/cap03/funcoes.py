# Cap. 3 - Funções
# Uma FUNÇÃO é um bloco de código com nome, definido com a palavra def.
# Definir NÃO executa: o corpo só roda quando a função é CHAMADA.

# A linha abaixo importa o módulo math, que traz ferramentas matemáticas prontas.
import math


# saudacao() recebe um parâmetro (nome) e DEVOLVE um texto com return.
def saudacao(nome):
    return "Olá, " + nome + "!"


# repetir() recebe dois parâmetros (texto e n) e devolve o texto repetido n vezes.
def repetir(texto, n):
    return texto * n


# area_circulo() usa math.pi para calcular a área e devolve um número.
def area_circulo(raio):
    return math.pi * raio * raio


# A partir daqui o programa de fato EXECUTA, chamando as funções acima.
# Aqui compomos funções: o resultado de saudacao() vira argumento de repetir().
mensagem = repetir(saudacao("Gigaverse"), 3)
print(mensagem)

# Também podemos guardar o retorno numa variável e reaproveitá-lo.
ola = saudacao("Diogo")
print(ola)
print("Tamanho da saudação:", len(ola), "caracteres")

# Chamando area_circulo() com argumentos diferentes, reaproveitamos a mesma lógica.
print("Área (raio 1) =", area_circulo(1))
print("Área (raio 2) =", area_circulo(2))
