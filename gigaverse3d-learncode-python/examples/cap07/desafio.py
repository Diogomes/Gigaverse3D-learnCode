# Desafio do Cap. 7 - Adivinhe o numero
# O segredo esta fixo abaixo. O jogador tenta adivinhar usando input().
# Use um laco while para continuar pedindo palpites ate acertar.
#
# Tarefas:
# 1) Dentro do while, leia um palpite com input() e converta com int().
# 2) Se o palpite for igual ao segredo, imprima "Acertou!" e use break.
# 3) Caso contrario, diga se o segredo e MAIOR ou MENOR que o palpite.
# 4) (Extra) Conte quantas tentativas o jogador levou para acertar.

segredo = 42

print("Adivinhe o numero entre 1 e 100.")

while True:
    palpite = int(input("Seu palpite: "))

    # Complete a logica abaixo:
    # - se acertou, avise e saia do laco com break
    # - senao, diga se o segredo e maior ou menor
