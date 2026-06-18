# Cap. 15 - Desafio: a classe Circulo
#
# 1) No __init__ de Circulo, guarde 'centro' e 'raio' como atributos (use self).
# 2) Complete a função perimetro() para devolver 2 * 3.14159 * o raio.
# 3) Rode e confira: deve imprimir um perímetro próximo de 31.4159.


class Ponto:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Circulo:
    def __init__(self, centro, raio):
        # TODO: guarde 'centro' e 'raio' em self (ex.: self.centro = centro).
        self.centro = None   # troque None pelo valor recebido em 'centro'
        self.raio = 0        # troque 0 pelo valor recebido em 'raio'


def perimetro(circ):
    # TODO: devolva o perímetro: 2 * 3.14159 * o raio do círculo.
    return 0


# Quando estiver pronto, isto deve imprimir um perímetro próximo de 31.4159.
c = Circulo(Ponto(0, 0), 5)
print("Perímetro:", perimetro(c))
