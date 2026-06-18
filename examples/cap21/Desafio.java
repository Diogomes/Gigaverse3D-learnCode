// Desafio.java
// DESAFIO DO CAPITULO 21
//
// Sua missao: complete a Fila<T> generica (FIFO) feita com nos encadeados.
// Diferente da pilha (LIFO), na fila quem entra PRIMEIRO sai PRIMEIRO.
//
// Implemente o metodo desenfileirar(): ele deve remover e devolver o valor
// do INICIO da fila e atualizar a referencia "inicio".
// No main, depois de completar, a saida deve ser: A, depois B, depois C.

public class Desafio {
    public static void main(String[] args) {
        Fila<String> fila = new Fila<>();
        fila.enfileirar("A");
        fila.enfileirar("B");
        fila.enfileirar("C");

        // Deve imprimir A, B, C nessa ordem (FIFO):
        System.out.println(fila.desenfileirar());
        System.out.println("Complete o desafio!");
    }
}

class Fila<T> {
    private static class No<T> {
        T valor;
        No<T> proximo;
        No(T valor) { this.valor = valor; }
    }

    private No<T> inicio;   // de onde sai (o mais antigo)
    private No<T> fim;      // onde entra (o mais novo)

    public void enfileirar(T valor) {
        No<T> novo = new No<>(valor);
        if (fim == null) {
            inicio = novo;
            fim = novo;
        } else {
            fim.proximo = novo;
            fim = novo;
        }
    }

    public T desenfileirar() {
        // TODO: se a fila estiver vazia (inicio == null), lance um erro.
        // Senao, guarde o valor de inicio, avance inicio para inicio.proximo,
        // (se inicio virar null, fim tambem deve virar null) e devolva o valor.
        return null;
    }
}
