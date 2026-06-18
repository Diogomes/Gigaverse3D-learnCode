# Cap. 11 - Dicionários
# Um dicionário (dict) guarda pares CHAVE -> VALOR. A busca é pela CHAVE,
# não por posição como na lista. Criamos com chaves {} e dois-pontos.
estoque = {"maca": 3, "banana": 5, "uva": 12}

# Acessar pela chave devolve o valor guardado nela.
print("Bananas em estoque:", estoque["banana"])

# Atribuir por uma chave NOVA insere o par; por uma chave existente, atualiza.
estoque["pera"] = 7          # insere
estoque["maca"] = 4          # atualiza
print("Estoque atual:", estoque)

# .get() acessa sem risco de erro: se a chave nao existe, devolve um padrao.
print("Kiwis em estoque:", estoque.get("kiwi", 0))

# --- Dict como COLETOR DE CONTADORES ---------------------------------
# Vamos contar quantas vezes cada palavra aparece numa frase.
frase = "o rato roeu a roupa do rei de roma o rato fugiu"
contagem = {}
for palavra in frase.split():           # split() quebra a frase em palavras
    # se a palavra ainda nao foi vista, comeca em 0; depois soma 1.
    contagem[palavra] = contagem.get(palavra, 0) + 1

print("\nFrequencia de palavras:")
# .items() percorre o dict entregando CHAVE e VALOR de cada par.
for palavra, vezes in contagem.items():
    print(f"  {palavra!r}: {vezes}")

# --- Dict para MEMOIZACAO --------------------------------------------
# Fibonacci ingenuo recalcula os mesmos valores varias vezes. Guardando
# cada resultado num dict (o "cache"), calculamos cada n uma unica vez.
cache = {}
def fib(n):
    if n < 2:
        return n
    if n in cache:                # ja calculei este n antes? reaproveita.
        return cache[n]
    resultado = fib(n - 1) + fib(n - 2)
    cache[n] = resultado          # memoriza para as proximas chamadas
    return resultado

print("\nFibonacci com memoizacao:")
for n in range(10):
    print(f"  fib({n}) = {fib(n)}")
print("Valores guardados no cache:", len(cache))
