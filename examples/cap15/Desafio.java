// Desafio.java
// DESAFIO DO CAPITULO 15
//
// Sua missao: salve uma lista de pontuacoes (placar) em um arquivo de texto
// chamado "placar.txt" e depois leia de volta para somar todos os pontos.
//
// 1) Crie a lista de pontos (ja existe abaixo).
// 2) Use Files.write para gravar cada numero em uma linha do arquivo.
// 3) Use Files.readAllLines para ler de volta e somar tudo.
// A soma esperada e 350.

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Desafio {
    public static void main(String[] args) throws IOException {
        Path arquivo = Path.of("placar.txt");
        List<String> pontos = List.of("100", "150", "100");

        // 1) Grave a lista no arquivo (uma linha por pontuacao):
        // 2) Leia de volta e some os numeros:
        // 3) Imprima a soma (deve dar 350):

        System.out.println("Complete o desafio!");
    }
}
