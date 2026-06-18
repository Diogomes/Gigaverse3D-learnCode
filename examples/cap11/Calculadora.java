// Calculadora.java
// Tratamento de excecoes: try/catch/finally protegendo a divisao e a leitura.

import java.util.InputMismatchException;
import java.util.Scanner;

public class Calculadora {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("=== Divisao segura ===");
        System.out.print("Digite o numerador: ");
        int numerador = lerInteiro(sc);
        System.out.print("Digite o divisor: ");
        int divisor = lerInteiro(sc);

        try {
            int resultado = numerador / divisor;   // pode lancar ArithmeticException
            System.out.println("Resultado: " + resultado);
        } catch (ArithmeticException e) {
            // Capturamos o erro em vez de deixar o programa quebrar.
            System.out.println("Erro: nao da para dividir por zero!");
        } finally {
            // O finally roda SEMPRE, tendo dado erro ou nao.
            System.out.println("(divisao finalizada)");
        }

        System.out.println("O programa continua rodando normalmente. :)");
        sc.close();
    }

    // Le um inteiro com seguranca: se o usuario digitar algo que nao e numero,
    // tratamos a InputMismatchException e devolvemos 0.
    static int lerInteiro(Scanner sc) {
        try {
            return sc.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("  (entrada invalida; assumindo 0)");
            sc.next();              // descarta o texto invalido do buffer
            return 0;
        }
    }
}
