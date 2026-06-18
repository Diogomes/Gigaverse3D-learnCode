# Cap. 6 - Funções com resultado
# Uma função FRUTÍFERA usa return para DEVOLVER um valor.
# Quem chamou pode guardar esse valor e reutilizar — diferente de só imprimir.
import math


# distancia() recebe dois pontos e RETORNA a distância entre eles.
def distancia(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    return math.sqrt(dx * dx + dy * dy)


# fatorial() é recursiva: chama a si mesma com um caso menor e RETORNA o produto.
def fatorial(n):
    if n <= 1:        # caso base: para a recursão
        return 1
    return n * fatorial(n - 1)


# par() é uma função BOOLEANA: devolve True ou False.
def par(n):
    return n % 2 == 0


# Como distancia() retorna um valor, podemos guardá-lo numa variável e reusar.
d = distancia(0, 0, 3, 4)
print("Distância de (0,0) a (3,4):", d)
print("O dobro dessa distância:", d * 2)

# Composição: o resultado de uma função vira a entrada da outra.
print("5! =", fatorial(5))
print("5! é par?", par(fatorial(5)))

# assert checa uma verdade que DEVE valer; se for falsa, o programa estoura.
# Aqui confirmamos que nossa conta bate (triângulo 3-4-5).
assert distancia(0, 0, 3, 4) == 5.0
print("Tudo certo: o assert passou!")
