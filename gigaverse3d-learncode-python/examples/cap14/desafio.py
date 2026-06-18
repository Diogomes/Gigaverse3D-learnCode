# Cap. 14 - Desafio: salvar e carregar uma anotação de texto
# Objetivo: gravar uma linha de texto num arquivo temporário e ler de volta.
import os
import tempfile

# Caminho temporário (não suja o projeto).
caminho = os.path.join(tempfile.gettempdir(), "gigaverse_nota.txt")

mensagem = "Cheguei ao capitulo 14!"

# TODO 1: abra o arquivo em modo escrita ("w") usando um bloco `with`
#         e grave a variável `mensagem` com f.write(...).
# Ex.:
# with open(caminho, "w", encoding="utf-8") as f:
#     f.write(mensagem)

# TODO 2: abra o MESMO arquivo em modo leitura ("r") com `with`,
#         leia o conteúdo com f.read() e imprima na tela.

# TODO 3: apague o arquivo com os.remove(caminho) para não deixar lixo.

print("Complete os TODOs acima para salvar e carregar a sua nota.")
