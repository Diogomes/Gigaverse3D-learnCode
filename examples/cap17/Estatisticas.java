// Estatisticas.java
// Java SE Lambdas e Streams: processar uma lista de jogadores de forma declarativa.
// Uma Stream e uma "esteira de dados": voce encadeia operacoes (filter, map, reduce)
// e descreve O QUE quer, nao COMO percorrer a lista.

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Estatisticas {
    public static void main(String[] args) {
        List<Jogador> jogadores = List.of(
            new Jogador("Aria", 12, 340),
            new Jogador("Bolt", 7, 120),
            new Jogador("Cora", 15, 500),
            new Jogador("Drex", 4, 90),
            new Jogador("Echo", 10, 260)
        );

        int nivelMinimo = 10;

        // Predicate: uma funcao que recebe algo e devolve true/false (um teste).
        Predicate<Jogador> veterano = j -> j.nivel() >= nivelMinimo;

        // Pipeline de stream: filtrar -> mapear para nomes -> coletar numa lista.
        List<Jogador> esteira = jogadores.stream()
            .filter(veterano)                 // mantem so quem passa no teste
            .collect(Collectors.toList());

        // map transforma cada Jogador no seu nome (method reference Jogador::nome).
        List<String> nomesVeteranos = esteira.stream()
            .map(Jogador::nome)
            .collect(Collectors.toList());

        // reduce/sum: soma os pontos dos veteranos numa esteira de inteiros.
        int totalPontos = jogadores.stream()
            .filter(veterano)
            .mapToInt(Jogador::pontos)        // vira uma esteira de int
            .sum();

        // Outro reduce explicito: encontra o maior nivel (acumulando com Math::max).
        int maiorNivel = jogadores.stream()
            .map(Jogador::nivel)
            .reduce(0, Integer::max);

        System.out.println("Nivel minimo: " + nivelMinimo);
        System.out.println("Veteranos: " + nomesVeteranos);
        System.out.println("Total de pontos dos veteranos: " + totalPontos);
        System.out.println("Maior nivel da lista: " + maiorNivel);
    }
}

// record: jeito curto de declarar uma classe so de dados (gera construtor e getters).
record Jogador(String nome, int nivel, int pontos) { }
