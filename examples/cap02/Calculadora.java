// Calculadora.java
// Le dois numeros e mostra soma, media e comparacoes.
import java.util.Scanner;

public class Calculadora {
    public static void main(String[] args) {
        // Scanner le dados digitados no terminal (entrada padrao).
        Scanner entrada = new Scanner(System.in);

        System.out.print("Digite o primeiro numero: ");
        double a = entrada.nextDouble();   // le um numero e guarda na variavel "a"

        System.out.print("Digite o segundo numero: ");
        double b = entrada.nextDouble();

        double soma = a + b;        // operador aritmetico de adicao
        double media = soma / 2;    // divisao

        System.out.printf("Soma: %.2f%n", soma);    // printf formata o numero
        System.out.printf("Media: %.2f%n", media);

        // Operadores relacionais e de igualdade devolvem boolean (true/false).
        System.out.println("a == b ? " + (a == b));
        System.out.println("a > b ? " + (a > b));
        System.out.println("a < b ? " + (a < b));

        entrada.close();
    }
}
