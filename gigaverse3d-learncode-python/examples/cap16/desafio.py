# Cap. 16 - Desafio: uma função PURA que adia um Tempo em alguns segundos.
#
# A classe Tempo já está pronta. Sua missão é completar a função soma_segundos,
# que deve devolver um NOVO Tempo (sem alterar o original) com 'extra' segundos
# a mais. Aproveite a função normaliza() para resolver o "vai-um".


class Tempo:
    def __init__(self, hora, minuto, segundo):
        self.hora = hora
        self.minuto = minuto
        self.segundo = segundo


def imprime_tempo(t):
    print(f"{t.hora:02d}:{t.minuto:02d}:{t.segundo:02d}")


def normaliza(t):
    t.minuto += t.segundo // 60
    t.segundo = t.segundo % 60
    t.hora += t.minuto // 60
    t.minuto = t.minuto % 60


def soma_segundos(t, extra):
    # TODO: crie um NOVO Tempo copiando hora/minuto/segundo de t,
    # some 'extra' ao segundo desse novo objeto, chame normaliza() nele
    # e devolva o novo Tempo. NÃO altere t.
    pass


partida = Tempo(10, 30, 50)
chegada = soma_segundos(partida, 75)

print("partida =", end=" ")
imprime_tempo(partida)
# Quando soma_segundos estiver pronta, deve imprimir 10:32:05.
# print("chegada =", end=" ")
# imprime_tempo(chegada)
