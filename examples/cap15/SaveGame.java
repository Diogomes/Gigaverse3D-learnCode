// SaveGame.java
// Persistencia: salvar o progresso de um personagem em disco e recarregar.
// Usamos NIO (java.nio.file.Path e Files) para escrever e ler um arquivo de texto.

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class SaveGame {
    public static void main(String[] args) throws IOException {
        // Path: o "endereco" do arquivo. Nome relativo = fica no diretorio atual.
        Path arquivo = Path.of("save.txt");

        // 1) Personagem com algum progresso (dados que so existem na memoria).
        Personagem heroi = new Personagem("Kael", 7, 1540);
        System.out.println("Antes de salvar: " + heroi);

        // 2) SALVAR: transformamos o objeto em texto e gravamos no disco.
        String conteudo = heroi.paraLinha();
        Files.writeString(arquivo, conteudo);   // escreve (cria/sobrescreve) o arquivo
        System.out.println("Progresso salvo em: " + arquivo.toAbsolutePath());

        // 3) Simulamos que o programa "fechou": esquecemos o objeto da memoria.
        heroi = null;

        // 4) RECARREGAR: lemos o texto do disco e reconstruimos o objeto.
        List<String> linhas = Files.readAllLines(arquivo);   // le todas as linhas
        Personagem recarregado = Personagem.deLinha(linhas.get(0));
        System.out.println("Depois de recarregar: " + recarregado);

        // 5) Prova de que os dados sobreviveram ao "fim" do programa.
        System.out.println("XP recuperado do disco: " + recarregado.xp());
    }
}

// Personagem sabe se converter para texto e voltar de texto (formato simples: nome;nivel;xp).
class Personagem {
    private final String nome;
    private final int nivel;
    private final int xp;

    public Personagem(String nome, int nivel, int xp) {
        this.nome = nome;
        this.nivel = nivel;
        this.xp = xp;
    }

    public int xp() { return this.xp; }

    // Serializa: objeto -> uma linha de texto.
    public String paraLinha() {
        return nome + ";" + nivel + ";" + xp;
    }

    // Desserializa: uma linha de texto -> objeto.
    public static Personagem deLinha(String linha) {
        String[] partes = linha.split(";");
        return new Personagem(partes[0], Integer.parseInt(partes[1]), Integer.parseInt(partes[2]));
    }

    @Override
    public String toString() {
        return nome + " (nivel " + nivel + ", " + xp + " xp)";
    }
}
