# Cap. 2 - Calculadora de IMC
# Lê o peso e a altura digitados e calcula o Índice de Massa Corporal.

# input() lê o que o usuário digita; float() converte o texto em número.
peso = float(input("Seu peso em kg (ex.: 70): "))
altura = float(input("Sua altura em m (ex.: 1.75): "))

# ** é potência: altura ** 2 é "altura ao quadrado".
# A divisão / sempre devolve um float em Python 3.
imc = peso / altura ** 2

# round() arredonda; aqui ficamos com 1 casa decimal só para a saída.
print("Seu IMC é", round(imc, 1))

# Comparações encadeadas classificam o resultado em faixas.
if imc < 18.5:
    print("Faixa: abaixo do peso")
elif imc < 25:
    print("Faixa: normal")
elif imc < 30:
    print("Faixa: sobrepeso")
else:
    print("Faixa: obesidade")
