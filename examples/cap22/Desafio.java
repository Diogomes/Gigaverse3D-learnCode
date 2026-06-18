// Desafio.java
// DESAFIO DO CAPITULO 22
//
// Sua missao: monte uma TABELA de itens de uma loja em console (componente composto).
// Crie um metodo tabela(List<Item>) que imprima duas colunas alinhadas:
//   Item (alinhado a esquerda, largura 12) e Preco (alinhado a direita, largura 6).
// Use String.format com "%-12s | %6s". No main, mostre 3 itens.
// Saida esperada (cabecalho + 3 linhas), por exemplo:
//   Item         |  Preco
//   Espada       |    150
//   Pocao        |     30
//   Escudo       |     90

import java.util.List;

public class Desafio {
    public static void main(String[] args) {
        // Crie a lista de itens e chame tabela(...) aqui:
        System.out.println("Complete o desafio!");
    }

    // Escreva o metodo tabela(List<Item>) abaixo:
}

// record que representa uma linha da tabela:
record Item(String nome, int preco) { }
