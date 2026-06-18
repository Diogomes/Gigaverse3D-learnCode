// Generico.java
// Classes e metodos genericos: o <T> e um tipo "coringa" definido na hora do uso.

public class Generico {
    public static void main(String[] args) {
        // A MESMA classe Caixa serve para qualquer tipo. Aqui guardamos um texto.
        Caixa<String> caixaTexto = new Caixa<>("Ola, mundo");
        System.out.println("Caixa de String: " + caixaTexto.obter());

        // Agora a mesma classe guarda um numero. O <Integer> define o tipo na hora do uso.
        Caixa<Integer> caixaNumero = new Caixa<>(42);
        System.out.println("Caixa de Integer: " + caixaNumero.obter());

        // Metodo generico maior(): funciona com qualquer tipo comparavel.
        System.out.println("Maior numero: " + maior(7, 3));
        System.out.println("Maior texto: " + maior("banana", "abacaxi"));

        // Curinga "?": "uma Caixa de algum tipo, nao importa qual".
        imprimirConteudo(caixaTexto);
        imprimirConteudo(caixaNumero);
    }

    // Metodo generico: o <T extends Comparable<T>> exige que T saiba se comparar.
    // Assim podemos chamar a.compareTo(b) com seguranca.
    public static <T extends Comparable<T>> T maior(T a, T b) {
        return (a.compareTo(b) >= 0) ? a : b;
    }

    // Curinga "?": aceita Caixa de QUALQUER tipo so para ler o conteudo.
    public static void imprimirConteudo(Caixa<?> caixa) {
        System.out.println("Conteudo da caixa: " + caixa.obter());
    }
}

// Classe generica: <T> e um tipo coringa. Quem usa a classe escolhe o tipo real.
class Caixa<T> {
    private T conteudo;                       // o tipo do atributo e definido na hora do uso

    public Caixa(T conteudo) {
        this.conteudo = conteudo;
    }

    public T obter() {                        // devolve exatamente o tipo guardado
        return this.conteudo;
    }

    public void guardar(T conteudo) {
        this.conteudo = conteudo;
    }
}
