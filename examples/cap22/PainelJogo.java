// PainelJogo.java
// Componentes GUI: parte 2 -> COMPONENTES COMPOSTOS.
//
// JavaFX nao roda aqui, entao montamos a MESMA ideia em console: uma tela
// composta por componentes menores (uma barra de menu, uma tabela de dados
// e umas "abas"). Cada parte e um metodo que devolve texto; a tela final e
// a soma das partes. Em JavaFX seria MenuBar + TableView + TabPane montados
// dentro de um layout -- a mesma logica de composicao.

import java.util.List;

public class PainelJogo {
    public static void main(String[] args) {
        List<Jogador> jogadores = List.of(
            new Jogador("Aurora", 12, 3450),
            new Jogador("Bardo", 7, 1280),
            new Jogador("Cinza", 21, 9870),
            new Jogador("Drako", 4, 560)
        );

        // A tela e COMPOSTA: cada componente vira uma fatia de texto.
        System.out.println(barraDeMenu(new String[] {"Jogo", "Ranking", "Ajuda"}));
        System.out.println(abas(new String[] {"Visao Geral", "Detalhes"}, 0));
        System.out.println(tabela(jogadores));
        System.out.println(rodape(jogadores));
    }

    // "MenuBar": uma linha com as opcoes separadas. Em JavaFX: new MenuBar(...).
    static String barraDeMenu(String[] opcoes) {
        return "[Menu] " + String.join("  |  ", opcoes);
    }

    // "TabPane": mostra as abas; a selecionada fica entre colchetes.
    static String abas(String[] nomes, int selecionada) {
        StringBuilder sb = new StringBuilder("Abas: ");
        for (int i = 0; i < nomes.length; i++) {
            sb.append(i == selecionada ? "[" + nomes[i] + "]" : " " + nomes[i] + " ");
            if (i < nomes.length - 1) sb.append(" ");
        }
        return sb.toString();
    }

    // "TableView": colunas alinhadas com String.format. Cada coluna tem largura fixa.
    static String tabela(List<Jogador> jogadores) {
        String formato = "%-10s | %5s | %8s";   // -10 alinha a esquerda; 5 e 8 a direita
        StringBuilder sb = new StringBuilder();
        sb.append(String.format(formato, "Nome", "Nivel", "Pontos")).append("\n");
        sb.append("-----------+-------+---------").append("\n");
        for (Jogador j : jogadores) {
            sb.append(String.format(formato, j.nome(), j.nivel(), j.pontos())).append("\n");
        }
        return sb.toString();
    }

    // Um "label" de rodape derivado dos dados (como um binding: muda se os dados mudam).
    static String rodape(List<Jogador> jogadores) {
        int total = 0;
        for (Jogador j : jogadores) total += j.pontos();
        return "Total de jogadores: " + jogadores.size() + "   |   Pontos somados: " + total;
    }
}

// record = classe de dados curta e imutavel. Vira a "linha" da tabela.
record Jogador(String nome, int nivel, int pontos) { }
