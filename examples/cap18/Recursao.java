// Recursao.java
// Recursao: um metodo que chama a si mesmo, sempre caminhando para um caso-base.

public class Recursao {
    public static void main(String[] args) {
        // 1) Fatorial recursivo: 5! = 5 * 4 * 3 * 2 * 1 = 120
        System.out.println("Fatorial de 5 = " + fatorial(5));

        // 2) Fibonacci recursivo: imprime os 10 primeiros termos.
        System.out.print("Fibonacci (10 termos): ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fib(i) + " ");
        }
        System.out.println();

        // 3) Torre de Hanoi com 3 discos, imprimindo cada movimento.
        System.out.println("Torre de Hanoi com 3 discos:");
        hanoi(3, 'A', 'C', 'B');   // mover de A para C usando B como apoio
    }

    // Fatorial: caso-base e n <= 1 (retorna 1); senao n * fatorial(n-1).
    static long fatorial(int n) {
        if (n <= 1) {
            return 1;              // caso-base: encerra a recursao
        }
        return n * fatorial(n - 1);   // caso recursivo: caminha para n menor
    }

    // Fibonacci: cada termo e a soma dos dois anteriores.
    static int fib(int n) {
        if (n < 2) {
            return n;             // casos-base: fib(0)=0 e fib(1)=1
        }
        return fib(n - 1) + fib(n - 2);   // dois casos recursivos
    }

    // Torre de Hanoi: mover n discos da origem para o destino, usando o apoio.
    static void hanoi(int n, char origem, char destino, char apoio) {
        if (n == 1) {
            // caso-base: um unico disco vai direto da origem para o destino.
            System.out.println("mova disco de " + origem + " para " + destino);
            return;
        }
        hanoi(n - 1, origem, apoio, destino);    // 1) tira os de cima para o apoio
        System.out.println("mova disco de " + origem + " para " + destino); // 2) move o maior
        hanoi(n - 1, apoio, destino, origem);    // 3) traz os de cima para o destino
    }
}
