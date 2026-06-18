# Cap. 13 - Desafio: complete a análise de frequência
# Objetivo: descobrir quantas palavras aparecem APENAS UMA VEZ no texto.

texto = """
sol sol lua lua lua estrela
cometa sol planeta lua estrela
estrela estrela vento
"""

palavras = texto.lower().split()

# Monte o histograma (dict) contando cada palavra.
frequencia = {}
for palavra in palavras:
    # TODO: incremente a contagem desta palavra usando frequencia.get(palavra, 0) + 1
    pass

# TODO: percorra os itens do dict (frequencia.items()) e CONTE quantas palavras
#       têm contagem igual a 1. Guarde esse total em uma variável.
#       Dica: comece com aparecem_uma_vez = 0 e use um if dentro do for.

# TODO: imprima quantas palavras aparecem exatamente uma vez.
