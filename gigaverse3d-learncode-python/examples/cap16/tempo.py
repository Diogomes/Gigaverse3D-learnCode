# Cap. 16 - Classes e funções
# Uma classe Tempo guarda hora, minuto e segundo. Vamos somar dois tempos
# de DUAS formas: uma função PURA e uma função MODIFICADORA.


class Tempo:
    # __init__ é chamado quando criamos um Tempo. Ele guarda os três atributos.
    def __init__(self, hora, minuto, segundo):
        self.hora = hora
        self.minuto = minuto
        self.segundo = segundo


# Função auxiliar: monta o texto "hh:mm:ss" sem usar __str__ (isso é o cap. 17).
def imprime_tempo(t):
    print(f"{t.hora:02d}:{t.minuto:02d}:{t.segundo:02d}")


# Normaliza o "vai-um": 90 segundos viram 1 minuto e 30 segundos, etc.
def normaliza(t):
    t.minuto += t.segundo // 60
    t.segundo = t.segundo % 60
    t.hora += t.minuto // 60
    t.minuto = t.minuto % 60


# FUNÇÃO PURA: cria e devolve um NOVO Tempo. Não toca em t1 nem em t2.
def soma_pura(t1, t2):
    novo = Tempo(
        t1.hora + t2.hora,
        t1.minuto + t2.minuto,
        t1.segundo + t2.segundo,
    )
    normaliza(novo)
    return novo


# FUNÇÃO MODIFICADORA: altera o próprio t1 (efeito colateral) e não devolve nada.
def adiciona_em(t1, t2):
    t1.hora += t2.hora
    t1.minuto += t2.minuto
    t1.segundo += t2.segundo
    normaliza(t1)


# --- Demonstração ---------------------------------------------------------
a = Tempo(9, 45, 50)
b = Tempo(1, 20, 40)

print("== Antes ==")
print("a =", end=" ")
imprime_tempo(a)
print("b =", end=" ")
imprime_tempo(b)

# A versão PURA devolve um novo objeto e deixa a e b intactos.
c = soma_pura(a, b)
print("\n== soma_pura(a, b) -> c ==")
print("c =", end=" ")
imprime_tempo(c)
print("a continua", end=" ")
imprime_tempo(a)
print("b continua", end=" ")
imprime_tempo(b)

# A versão MODIFICADORA muda o próprio a. Repare que a NÃO é mais o mesmo.
adiciona_em(a, b)
print("\n== adiciona_em(a, b) ==")
print("a agora", end=" ")
imprime_tempo(a)
print("b continua", end=" ")
imprime_tempo(b)
