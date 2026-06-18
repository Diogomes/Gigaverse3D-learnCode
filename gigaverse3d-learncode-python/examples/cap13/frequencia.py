# Cap. 13 - Estudo de caso: seleção de estrutura de dados
# Vamos analisar a frequência das palavras de um texto.
# A pergunta central: qual estrutura usar para cada tarefa?

# O texto fica EMBUTIDO no programa (uma string). Sem input, sem arquivo, sem random:
# a saída é sempre a mesma (determinística).
texto = """
o gato dorme o gato come o gato brinca
o rato corre o rato foge o rato dorme
gato e rato gato e rato fim
"""

# 1) NORMALIZAR: deixar tudo minúsculo e quebrar em uma LISTA de palavras.
# split() sem argumento separa por qualquer espaço/quebra de linha e ignora vazios.
palavras = texto.lower().split()
print("Total de palavras:", len(palavras))

# 2) HISTOGRAMA com DICT: a chave é a palavra, o valor é quantas vezes ela aparece.
# O dict é ideal aqui porque liga cada palavra (chave) à sua contagem (valor).
frequencia = {}
for palavra in palavras:
    # get(palavra, 0) devolve a contagem atual, ou 0 se a palavra ainda não existe.
    frequencia[palavra] = frequencia.get(palavra, 0) + 1

# 3) Palavras ÚNICAS com SET: um conjunto descarta duplicatas automaticamente.
# Perfeito para responder "quantas palavras DIFERENTES existem?".
unicas = set(palavras)
print("Palavras diferentes:", len(unicas))

# Checar pertencimento em um set é rápido (não percorre item a item como a lista).
print("Tem a palavra 'gato'?", "gato" in unicas)
print("Tem a palavra 'cachorro'?", "cachorro" in unicas)

# 4) MAIS FREQUENTES: ordenar os itens do dict pela contagem, do maior para o menor.
# sorted devolve uma LISTA; key escolhe POR QUE ordenar; reverse=True inverte a ordem.
ranking = sorted(frequencia.items(), key=lambda item: item[1], reverse=True)

print("As 3 palavras mais frequentes:")
for palavra, vezes in ranking[:3]:
    print("  ", palavra, "->", vezes)
