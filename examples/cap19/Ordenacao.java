// Ordenacao.java
// Pesquisa, classificacao e Big O.
// Ordena um array com selection sort (mostrando cada passo e CONTANDO comparacoes)
// e depois faz uma busca binaria no array ja ordenado, contando os passos.

import java.util.Arrays;

public class Ordenacao {
    public static void main(String[] args) {
        int[] numeros = {5, 2, 8, 1, 9, 3};
        System.out.println("Array original:   " + Arrays.toString(numeros));
        System.out.println();

        // --- SELECTION SORT (ordenacao por selecao) ---
        // A cada passo, achamos o MENOR elemento do trecho ainda nao ordenado
        // e o trazemos para a frente. Vamos contar quantas comparacoes fazemos.
        int comparacoes = 0;
        System.out.println("== Selection sort, passo a passo ==");
        for (int i = 0; i < numeros.length - 1; i++) {
            int indiceMenor = i;
            for (int j = i + 1; j < numeros.length; j++) {
                comparacoes++;                       // cada "if" abaixo e uma comparacao
                if (numeros[j] < numeros[indiceMenor]) {
                    indiceMenor = j;
                }
            }
            // troca o menor encontrado para a posicao i
            int troca = numeros[i];
            numeros[i] = numeros[indiceMenor];
            numeros[indiceMenor] = troca;
            System.out.println("Passo " + (i + 1) + ": " + Arrays.toString(numeros));
        }
        System.out.println("Array ordenado:   " + Arrays.toString(numeros));
        System.out.println("Comparacoes feitas: " + comparacoes + "  (selection sort cresce como O(n^2))");
        System.out.println();

        // --- BUSCA BINARIA ---
        // So funciona em array JA ORDENADO. A cada passo olhamos o meio e
        // descartamos METADE do que sobrou. Vamos procurar o numero 8.
        int alvo = 8;
        int passos = 0;
        int inicio = 0;
        int fim = numeros.length - 1;
        int achadoEm = -1;
        System.out.println("== Busca binaria pelo numero " + alvo + " ==");
        while (inicio <= fim) {
            passos++;
            int meio = (inicio + fim) / 2;
            System.out.println("Passo " + passos + ": olhando indice " + meio + " (valor " + numeros[meio] + ")");
            if (numeros[meio] == alvo) {
                achadoEm = meio;
                break;
            } else if (numeros[meio] < alvo) {
                inicio = meio + 1;                   // descarta a metade da esquerda
            } else {
                fim = meio - 1;                      // descarta a metade da direita
            }
        }
        if (achadoEm >= 0) {
            System.out.println("Encontrado no indice " + achadoEm + " em " + passos + " passo(s).");
        } else {
            System.out.println("Nao encontrado (em " + passos + " passos).");
        }
        System.out.println("Busca binaria cresce como O(log n): cada passo corta a metade.");
    }
}
