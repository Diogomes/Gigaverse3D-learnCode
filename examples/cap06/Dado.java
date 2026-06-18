// Dado.java
// Metodos: parametros, retorno, static e SOBRECARGA (overload).
import java.util.Random;

public class Dado {
    // METODO com parametros (lados, semente) e RETORNO (int).
    // Usamos semente fixa para o resultado ser reproduzivel nesta demo.
    public static int rolar(int lados, long semente) {
        Random sorteio = new Random(semente);
        return sorteio.nextInt(lados) + 1;   // nextInt(6) da 0..5; +1 vira 1..6
    }

    // SOBRECARGA: mesmo nome, lista de parametros diferente. Dado de N lados.
    public static int rolar(int lados) {
        return rolar(lados, 42);             // reaproveita o metodo acima
    }

    // SOBRECARGA: sem parametros -> dado comum de 6 lados.
    public static int rolar() {
        return rolar(6);
    }

    public static void main(String[] args) {
        // O compilador escolhe a versao certa de "rolar" pelos argumentos passados.
        System.out.println("Dado de 6 lados: " + rolar());
        System.out.println("Dado de 20 lados: " + rolar(20));
        System.out.println("Dado de 6 com semente 7: " + rolar(6, 7));
    }
}
