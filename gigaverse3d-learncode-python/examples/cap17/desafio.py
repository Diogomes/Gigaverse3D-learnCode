# Cap. 17 - Desafio: a classe Ponto
# Complete a classe para representar um ponto (x, y) no plano.
# Troque cada linha "pass  # TODO" pelo código pedido no comentário acima dela.


class Ponto:
    # TODO: guarde x e y dentro do objeto (self.x = x e self.y = y).
    def __init__(self, x, y):
        pass  # TODO

    # TODO: devolva o texto "(x, y)". Dica: use um f-string com self.x e self.y.
    def __str__(self):
        return "(?, ?)"  # TODO

    # TODO: some dois pontos coordenada a coordenada e devolva um NOVO Ponto:
    #       return Ponto(self.x + outro.x, self.y + outro.y)
    def __add__(self, outro):
        return self  # TODO


# Estas linhas funcionam plenamente depois que você completar os TODO acima:
# p1 = Ponto(1, 2)
# p2 = Ponto(3, 4)
# print(p1)        # esperado: (1, 2)
# print(p1 + p2)   # esperado: (4, 6)
