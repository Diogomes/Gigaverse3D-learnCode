# Cap. 18 - Desafio: Herança
# Temos uma classe Animal (o PAI). Crie uma classe Cachorro que HERDE de Animal.
#
# Tarefas:
#  1) Faça Cachorro(Animal) para herdar __init__ e apresentar().
#  2) SOBRESCREVA o método falar() para devolver "Au au!".
#  3) (Opcional) use super().__init__(nome) se quiser acrescentar atributos.


class Animal:
    def __init__(self, nome):
        self.nome = nome

    def falar(self):
        return "..."

    def apresentar(self):
        return self.nome + " diz: " + self.falar()


# TODO: defina aqui a classe Cachorro que herda de Animal e sobrescreve falar().
class Cachorro:  # <- troque por:  class Cachorro(Animal):
    pass


rex = Cachorro("Rex")
print(rex.apresentar())  # esperado: Rex diz: Au au!
