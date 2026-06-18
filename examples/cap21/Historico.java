// Historico.java
// Estruturas de dados genericas personalizadas: uma Pilha<T> feita do ZERO
// usando nos encadeados (lista ligada). Usamos a pilha como historico de "desfazer".

public class Historico {
    public static void main(String[] args) {
        // Uma pilha generica que guarda Strings (acoes do usuario).
        Pilha<String> desfazer = new Pilha<>();

        System.out.println("Pilha vazia? " + desfazer.isEmpty());

        // O usuario faz acoes; cada acao vai para o topo da pilha (push).
        desfazer.push("digitar 'Ola'");
        desfazer.push("colar imagem");
        desfazer.push("apagar paragrafo");

        System.out.println("Acoes registradas: " + desfazer.tamanho());
        System.out.println("Proxima a desfazer (peek): " + desfazer.peek());

        // Desfazer = pop. Sai sempre a ULTIMA acao que entrou (LIFO).
        System.out.println("\nDesfazendo na ordem inversa (LIFO):");
        while (!desfazer.isEmpty()) {
            System.out.println("  desfeito -> " + desfazer.pop());
        }

        System.out.println("\nPilha vazia? " + desfazer.isEmpty());

        // A mesma Pilha<T> funciona com qualquer tipo, por ser generica.
        Pilha<Integer> numeros = new Pilha<>();
        numeros.push(10);
        numeros.push(20);
        numeros.push(30);
        System.out.println("\nTopo da pilha de numeros: " + numeros.peek());
        System.out.println("Removido: " + numeros.pop() + " | novo topo: " + numeros.peek());
    }
}

// Pilha generica (LIFO) construida sobre uma lista ligada de nos.
// <T> e o tipo dos elementos guardados (String, Integer, etc.).
class Pilha<T> {
    // Classe interna auto-referencial: cada No guarda um valor e aponta para o proximo No.
    // E essa referencia "proximo" que encadeia os nos, sem precisar de indices contiguos.
    private static class No<T> {
        T valor;
        No<T> proximo;   // referencia ao proximo no (ou null se for o ultimo)

        No(T valor, No<T> proximo) {
            this.valor = valor;
            this.proximo = proximo;
        }
    }

    private No<T> topo;     // o topo da pilha e a cabeca da lista ligada
    private int tamanho;

    // push: cria um no novo que aponta para o antigo topo e vira o novo topo.
    public void push(T valor) {
        topo = new No<>(valor, topo);
        tamanho++;
    }

    // pop: remove e devolve o valor do topo (o ultimo que entrou).
    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Pilha vazia: nada para desfazer.");
        }
        T valor = topo.valor;
        topo = topo.proximo;    // o topo passa a ser o proximo no
        tamanho--;
        return valor;
    }

    // peek: espia o valor do topo sem remover.
    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Pilha vazia.");
        }
        return topo.valor;
    }

    public boolean isEmpty() {
        return topo == null;
    }

    public int tamanho() {
        return tamanho;
    }
}
