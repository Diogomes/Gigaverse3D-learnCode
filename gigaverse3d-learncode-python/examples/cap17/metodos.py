# Cap. 17 - Classes e métodos
# Um MÉTODO é uma função que PERTENCE a um objeto. O primeiro parâmetro,
# por convenção chamado self, é o próprio objeto que está executando o método.


class Tempo:
    # __init__ é o CONSTRUTOR: roda automaticamente quando criamos o objeto.
    # Ele recebe self (o objeto recém-nascido) e guarda os dados dentro dele.
    def __init__(self, hora, minuto, segundo):
        self.hora = hora
        self.minuto = minuto
        self.segundo = segundo

    # __str__ define como o objeto vira TEXTO. É chamado por print() e str().
    # Aqui devolvemos "hh:mm:ss" com dois dígitos em cada campo.
    def __str__(self):
        return f"{self.hora:02d}:{self.minuto:02d}:{self.segundo:02d}"

    # __add__ habilita o operador +. Quando escrevemos t1 + t2, o Python
    # chama t1.__add__(t2): self é t1 e outro é t2.
    def __add__(self, outro):
        total = self.em_segundos() + outro.em_segundos()
        return Tempo.de_segundos(total)

    # Um método comum (auxiliar): converte este Tempo em segundos.
    def em_segundos(self):
        return self.hora * 3600 + self.minuto * 60 + self.segundo

    # Recebe um total de segundos e MONTA um novo Tempo (hora, minuto, segundo).
    @staticmethod
    def de_segundos(total):
        hora = total // 3600
        resto = total % 3600
        return Tempo(hora, resto // 60, resto % 60)


# Criamos dois objetos Tempo. Cada chamada de Tempo(...) dispara o __init__.
t1 = Tempo(1, 30, 45)
t2 = Tempo(0, 45, 30)

# print(objeto) chama __str__ por baixo dos panos para obter o texto.
print("t1 =", t1)
print("t2 =", t2)

# O + entre dois Tempos aciona __add__ e devolve um novo Tempo.
soma = t1 + t2
print("t1 + t2 =", soma)
