# Cap. 7 - Iteração
# Raiz quadrada por aproximacao (metodo de Newton), usando um laco while.
# A ideia: comecamos com um "chute" e o melhoramos a cada passo, ate
# que ele pare de mudar de forma significativa (convergencia).

import math

numero = 2.0          # queremos a raiz quadrada deste numero
chute = numero / 2    # um primeiro palpite qualquer
tolerancia = 1e-10    # quao perto de zero a diferenca precisa chegar
passo = 0

# Repetimos ENQUANTO o chute ainda estiver longe da resposta.
# A cada volta atualizamos 'chute' com a formula de Newton.
while True:
    melhor = (chute + numero / chute) / 2   # nova aproximacao
    passo = passo + 1                        # atualiza o contador
    print("passo", passo, "->", melhor)

    # Comparamos floats com TOLERANCIA, nunca com == direto.
    if abs(melhor - chute) < tolerancia:
        break          # convergiu: saimos do laco

    chute = melhor     # reatribuicao: o chute passa a ser a melhor estimativa

print("Aproximacao final :", melhor)
print("math.sqrt(numero) :", math.sqrt(numero))
print("Diferenca         :", abs(melhor - math.sqrt(numero)))
