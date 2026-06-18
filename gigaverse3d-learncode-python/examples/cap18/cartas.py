# Cap. 18 - Herança
# Um mini jogo de cartas: a classe Mao HERDA de Baralho e reaproveita
# (ou sobrescreve) o que precisar. Usamos seed fixa para a saída ser igual sempre.
import random

random.seed(0)


class Carta:
    # Uma carta tem um naipe e um valor. __init__ é chamado ao criar o objeto.
    def __init__(self, naipe, valor):
        self.naipe = naipe
        self.valor = valor

    # __str__ define como a carta aparece quando a imprimimos com print().
    def __str__(self):
        return self.valor + " de " + self.naipe


class Baralho:
    # COMPOSIÇÃO: o Baralho CONTÉM uma lista de objetos Carta.
    def __init__(self):
        naipes = ["Ouros", "Espadas", "Copas", "Paus"]
        valores = ["A", "K", "Q", "J"]
        self.cartas = []
        for naipe in naipes:
            for valor in valores:
                self.cartas.append(Carta(naipe, valor))

    def embaralhar(self):
        random.shuffle(self.cartas)

    # Tira a carta do topo e a devolve (distribui).
    def distribuir(self):
        return self.cartas.pop()

    def __str__(self):
        return "Baralho com " + str(len(self.cartas)) + " cartas"


class Mao(Baralho):
    # Mao HERDA de Baralho: ganha cartas, distribuir() e embaralhar() de graça.
    def __init__(self, dono):
        # super() chama o __init__ da classe pai para reaproveitar a montagem...
        super().__init__()
        # ...mas uma mão começa VAZIA, então descartamos as 16 cartas iniciais.
        self.cartas = []
        self.dono = dono

    # Método NOVO, que o pai não tem: receber uma carta vinda de outro lugar.
    def receber(self, carta):
        self.cartas.append(carta)

    # SOBRESCREVE o __str__ do pai para mostrar o dono e as cartas na mão.
    def __str__(self):
        nomes = [str(c) for c in self.cartas]
        return "Mao de " + self.dono + ": " + ", ".join(nomes)


# --- Programa principal ---
baralho = Baralho()
baralho.embaralhar()
print(baralho)

mao = Mao("Diogo")
# Distribui 3 cartas do baralho para a mão.
for _ in range(3):
    carta = baralho.distribuir()
    mao.receber(carta)

print(mao)
print("Sobraram no", baralho)

# isinstance verifica o TIPO de um objeto, respeitando a herança.
print("mao e' uma Mao?    ", isinstance(mao, Mao))
print("mao e' um Baralho? ", isinstance(mao, Baralho))
print("baralho e' uma Mao?", isinstance(baralho, Mao))
