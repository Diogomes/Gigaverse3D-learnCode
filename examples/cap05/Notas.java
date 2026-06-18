// Notas.java
// Estruturas de controle parte 2: switch, for e operadores logicos (&&, ||, !).

public class Notas {
    public static void main(String[] args) {
        int nota = 84;
        int faltas = 3;

        // Operadores logicos: && (E) exige que AS DUAS condicoes sejam verdadeiras.
        boolean aprovadoPorFrequencia = nota >= 60 && faltas <= 5;
        System.out.println("Passou em nota E frequencia? " + aprovadoPorFrequencia);

        // SWITCH escolhe um caminho conforme o valor (aqui, a faixa da nota).
        char conceito;
        switch (nota / 10) {     // 84 / 10 = 8 (divisao inteira)
            case 10:
            case 9:
                conceito = 'A';
                break;           // break impede "cair" no proximo case
            case 8:
                conceito = 'B';
                break;
            case 7:
                conceito = 'C';
                break;
            case 6:
                conceito = 'D';
                break;
            default:
                conceito = 'F';
        }
        System.out.println("Nota " + nota + " => conceito " + conceito);

        // FizzBuzz com FOR (inicializacao; condicao; incremento) tudo em uma linha.
        System.out.println("FizzBuzz de 1 a 15:");
        for (int i = 1; i <= 15; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
