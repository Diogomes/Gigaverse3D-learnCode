# Cap. 15 - Classes e objetos
# Uma CLASSE é um molde: um tipo novo que VOCÊ define.
# Um OBJETO (instância) é um exemplar concreto feito a partir desse molde.


# Definimos a classe Ponto. O __init__ é chamado quando criamos a instância;
# self é o próprio objeto, e guardamos x e y como ATRIBUTOS de instância.
class Ponto:
    def __init__(self, x, y):
        self.x = x
        self.y = y


# Retangulo tem como atributo um Ponto (o canto inferior esquerdo) e tamanhos.
class Retangulo:
    def __init__(self, canto, largura, altura):
        self.canto = canto
        self.largura = largura
        self.altura = altura


# Função que RECEBE um objeto e devolve um valor calculado a partir dele.
def area(ret):
    return ret.largura * ret.altura


# Função que recebe um objeto e RETORNA outro objeto (um Ponto novo).
def centro(ret):
    cx = ret.canto.x + ret.largura / 2
    cy = ret.canto.y + ret.altura / 2
    return Ponto(cx, cy)


# Função que MODIFICA o objeto recebido: objetos são mutáveis e passados por
# referência, então a alteração feita aqui vale lá fora também.
def mover(ponto, dx, dy):
    ponto.x = ponto.x + dx
    ponto.y = ponto.y + dy


# --- Criando instâncias (objetos) a partir das classes ---
origem = Ponto(0, 0)
print("Canto do retângulo:", origem.x, origem.y)

# O retângulo guarda o Ponto 'origem' dentro de si.
ret = Retangulo(origem, 4, 3)
print("Largura x Altura:", ret.largura, "x", ret.altura)

# Passamos o objeto para funções que o leem.
print("Área:", area(ret))

c = centro(ret)
print("Centro:", c.x, c.y)

# Cada instância tem seus PRÓPRIOS atributos: mexer em 'c' não afeta 'origem'.
mover(c, 1, 1)
print("Centro movido:", c.x, c.y)
print("Canto continua:", origem.x, origem.y)
