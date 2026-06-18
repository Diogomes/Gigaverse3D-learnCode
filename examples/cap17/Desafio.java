// Desafio.java
// DESAFIO DO CAPITULO 17
//
// Sua missao: usando STREAM e LAMBDA, processe a lista de produtos abaixo.
// 1) Filtre os produtos com preco <= 100.
// 2) Mapeie para o NOME de cada produto.
// 3) Colete os nomes numa List<String> e imprima.
// Dica: produtos.stream().filter(...).map(...).collect(Collectors.toList())

import java.util.List;
import java.util.stream.Collectors;

public class Desafio {
    public static void main(String[] args) {
        List<Produto> produtos = List.of(
            new Produto("Espada", 80),
            new Produto("Escudo", 150),
            new Produto("Pocao", 30),
            new Produto("Elmo", 120)
        );

        // Monte aqui o pipeline de stream e imprima os nomes baratos:
        System.out.println("Complete o desafio!");
    }
}

record Produto(String nome, int preco) { }
