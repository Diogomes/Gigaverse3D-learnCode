# Cap. 14 - Arquivos
# Persistência: gravar dados em arquivo para que sobrevivam ao fim do programa.
import json
import os
import tempfile

# Montamos um caminho TEMPORÁRIO do sistema, para não sujar o projeto.
# tempfile.gettempdir() devolve a pasta de temporários (ex.: /tmp).
caminho = os.path.join(tempfile.gettempdir(), "gigaverse_save.json")

# Um "save game": um dicionário simples com o progresso do jogador.
progresso = {"nome": "Diogo", "fase": 7}

# O bloco with abre o arquivo e o FECHA sozinho ao terminar, mesmo se der erro.
# O modo "w" (write) cria o arquivo (ou apaga o conteúdo antigo) e grava do zero.
with open(caminho, "w", encoding="utf-8") as f:
    json.dump(progresso, f)  # serializa o dicionário como texto JSON dentro do arquivo
print("Progresso gravado em arquivo temporário.")

# Agora lemos de volta. O modo "r" (read) abre apenas para leitura.
with open(caminho, "r", encoding="utf-8") as f:
    salvo = json.load(f)  # converte o texto JSON de volta em dicionário
print("Lido do arquivo ->", salvo["nome"], "está na fase", salvo["fase"])

# E se o arquivo NÃO existir? Tentamos abrir um caminho inexistente
# e capturamos a exceção com try/except, mostrando uma mensagem amigável.
inexistente = os.path.join(tempfile.gettempdir(), "nao_existe_gigaverse.json")
try:
    with open(inexistente, "r", encoding="utf-8") as f:
        f.read()
except FileNotFoundError:
    print("Nenhum save encontrado: comece um jogo novo!")

# Limpeza: apagamos o arquivo criado para a demo rodar sempre igual (idempotente).
os.remove(caminho)
print("Arquivo temporário removido. Tudo limpo.")
