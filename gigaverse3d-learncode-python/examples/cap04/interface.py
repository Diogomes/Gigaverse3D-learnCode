# Cap. 4 - Estudo de caso: design de interface
# No livro, este capítulo usa o módulo turtle para DESENHAR numa janela gráfica.
# turtle precisa de tela (tkinter), que não existe no terminal — então aqui
# desenhamos com TEXTO (ASCII). O que importa é o mesmo: como projetar boas
# funções, em etapas -> ENCAPSULAR, GENERALIZAR, dar uma boa INTERFACE e REFATORAR.


# 1) ENCAPSULAR: dar um nome a um pedacinho de código para reutilizá-lo.
def linha(largura, caractere):
    """Devolve uma string com 'largura' repetições de 'caractere'."""
    return caractere * largura


# 2) GENERALIZAR: parâmetros transformam um caso único em muitos. Em vez de uma
#    função que só faz um quadrado 4x4, esta desenha QUALQUER retângulo.
def desenhar_retangulo(altura, largura, caractere="*"):
    """Desenha um retângulo de altura x largura.

    'caractere' é opcional (faz parte da INTERFACE): quem chama escolhe o
    símbolo, ou deixa o padrão '*'.
    """
    for _ in range(altura):
        print(linha(largura, caractere))


# 3) COMPOR e REFATORAR: uma moldura oca reaproveita a ideia de 'linha' em vez
#    de reescrever os laços do zero.
def desenhar_moldura(altura, largura):
    """Desenha a borda de um retângulo (uma moldura oca de '#')."""
    print(linha(largura, "#"))
    for _ in range(altura - 2):
        print("#" + linha(largura - 2, " ") + "#")
    print(linha(largura, "#"))


# A partir daqui o programa EXECUTA, chamando as funções acima.
print("Quadrado 3x3 (padrão '*'):")
desenhar_retangulo(3, 3)

print("\nRetângulo 2x6 com '+':")
desenhar_retangulo(2, 6, "+")

print("\nMoldura 4x10:")
desenhar_moldura(4, 10)
