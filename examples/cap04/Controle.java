// Controle.java
// Estruturas de controle parte 1: if/else e while, com contador e acumulador.
import java.util.Scanner;

public class Controle {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);

        System.out.print("Tabuada de qual numero? ");
        int n = entrada.nextInt();

        // Laco WHILE: repete enquanto a condicao for verdadeira.
        int i = 1;                  // contador comeca em 1
        while (i <= 10) {
            System.out.println(n + " x " + i + " = " + (n * i));
            i++;                    // pos-incremento: i passa a valer i + 1
        }

        // Media de notas usando um ACUMULADOR.
        int[] notas = {7, 8, 10, 6};
        int soma = 0;               // acumulador comeca em 0
        int j = 0;
        while (j < notas.length) {
            soma += notas[j];       // soma = soma + notas[j]
            j++;
        }
        double media = (double) soma / notas.length;   // casting evita divisao inteira

        // Decisao com if/else.
        if (media >= 7.0) {
            System.out.println("Media " + media + ": Aprovado!");
        } else {
            System.out.println("Media " + media + ": Recuperacao.");
        }

        entrada.close();
    }
}
