// Texto.java
// Strings, caracteres e expressoes regulares (regex).
// Validador de e-mail e de CPF (formato) usando Pattern/Matcher,
// alem de um contador de palavras de uma frase.

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Texto {
    // Padroes compilados uma unica vez (Pattern e imutavel e reutilizavel).
    // E-mail: algo@algo.dominio  (regex simples e didatica, nao cobre todos os casos).
    private static final Pattern EMAIL =
        Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[a-z]{2,}$");
    // CPF no FORMATO 000.000.000-00 (so checa o formato, nao os digitos verificadores).
    private static final Pattern CPF =
        Pattern.compile("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$");

    public static void main(String[] args) {
        // Valores fixos no codigo (sem teclado).
        String[] emails = { "ana.silva@email.com", "ana@@email", "joao@dio.io" };
        for (String e : emails) {
            System.out.println("E-mail " + e + " -> " + (valido(EMAIL, e) ? "VALIDO" : "invalido"));
        }

        String[] cpfs = { "123.456.789-09", "12345678909", "000.000.000-00" };
        for (String c : cpfs) {
            System.out.println("CPF " + c + " -> " + (valido(CPF, c) ? "formato OK" : "formato invalido"));
        }

        // Contador de palavras: split por um ou mais espacos em branco.
        String frase = "  Java   trata texto   com classe!  ";
        System.out.println("Frase: \"" + frase + "\"");
        System.out.println("Palavras: " + contarPalavras(frase));

        // String e IMUTAVEL: cada operacao gera uma NOVA String.
        String original = "Gigaverse";
        String maiuscula = original.toUpperCase();
        System.out.println("Original ainda: " + original + " | Nova: " + maiuscula);

        // StringBuilder: monta texto sem criar varias Strings intermediarias.
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 3; i++) {
            sb.append("[").append(i).append("]");
        }
        System.out.println("StringBuilder: " + sb.toString());

        // char e Character: trabalhando caractere a caractere.
        int letras = 0;
        for (char ch : "abc 123!".toCharArray()) {
            if (Character.isLetter(ch)) letras++;
        }
        System.out.println("Letras em 'abc 123!': " + letras);
    }

    // Reaproveita um Pattern: o Matcher faz a verificacao do texto contra o padrao.
    private static boolean valido(Pattern padrao, String texto) {
        Matcher m = padrao.matcher(texto);
        return m.matches();
    }

    private static int contarPalavras(String frase) {
        String limpa = frase.trim();
        if (limpa.isEmpty()) return 0;
        // \\s+ = um ou mais espacos em branco (espaco, tab, quebra de linha).
        String[] palavras = limpa.split("\\s+");
        return palavras.length;
    }
}
