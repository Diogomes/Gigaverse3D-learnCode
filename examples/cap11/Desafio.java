// Desafio.java
// DESAFIO DO CAPITULO 11
//
// Sua missao: complete o metodo divideOuZero(int a, int b).
// Ele deve devolver a / b, MAS se b for zero, capture a ArithmeticException
// com try/catch e devolva 0 em vez de quebrar o programa.
//
// No main, ja existem duas chamadas: 10/2 (deve dar 5) e 7/0 (deve dar 0).

public class Desafio {
    public static void main(String[] args) {
        System.out.println("10 / 2 = " + divideOuZero(10, 2));
        System.out.println("7 / 0  = " + divideOuZero(7, 0));
    }

    static int divideOuZero(int a, int b) {
        // Complete aqui: use try/catch (ArithmeticException) e retorne 0 no erro.
        return a / b;
    }
}
