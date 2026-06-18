// Desafio.java
// DESAFIO DO CAPITULO 24
//
// Sua missao: na classe TabelaItens (simulacao de uma tabela de banco em
// memoria), complete o metodo "atualizarPreco", que representa o SQL:
//   UPDATE itens SET preco = ? WHERE id = ?
//
// Ele deve procurar o item pelo id e trocar o preco. Como Item e um record
// (imutavel), voce precisa SUBSTITUIR a linha por um novo Item com o preco novo.
// Retorne true se encontrou o id, ou false se nao encontrou.
//
// No main, ja deixamos a chamada pronta: o item id=1 deve passar a custar 99.

import java.util.ArrayList;
import java.util.List;

public class Desafio {
    public static void main(String[] args) {
        TabelaItens tabela = new TabelaItens();
        tabela.inserir("Espada", 10);
        tabela.inserir("Escudo", 25);

        // UPDATE itens SET preco = 99 WHERE id = 1
        tabela.atualizarPreco(1, 99);

        tabela.listar();   // Espada deve aparecer com preco 99
    }
}

record Item(int id, String nome, int preco) {}

class TabelaItens {
    private final List<Item> linhas = new ArrayList<>();
    private int proximoId = 1;

    public void inserir(String nome, int preco) {
        linhas.add(new Item(proximoId, nome, preco));
        proximoId++;
    }

    public void listar() {
        for (Item i : linhas) {
            System.out.printf("id=%d | %s | preco=%d%n", i.id(), i.nome(), i.preco());
        }
    }

    // COMPLETE AQUI: UPDATE itens SET preco = ? WHERE id = ?
    public boolean atualizarPreco(int id, int novoPreco) {
        // Dica: percorra "linhas" com indice (for i), ache o item com id igual,
        // use linhas.set(i, new Item(...)) com o preco novo e retorne true.
        return false;
    }
}
