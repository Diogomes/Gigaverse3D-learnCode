// Catalogo.java
// Colecoes genericas: Map<String,Integer> (nome -> nivel) e Set para tipos unicos.

import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;

public class Catalogo {
    public static void main(String[] args) {
        // Map<String,Integer>: a chave e o nome do monstro, o valor e o nivel.
        // O <String,Integer> diz ao compilador o tipo exato de chave e valor.
        Map<String, Integer> niveis = new HashMap<>();
        niveis.put("Goblin", 3);
        niveis.put("Dragao", 50);
        niveis.put("Slime", 1);
        niveis.put("Lich", 42);

        // Autoboxing: o int 99 vira automaticamente um Integer ao entrar no Map.
        niveis.put("Goblin", 99);   // mesma chave: o valor antigo (3) e substituido

        System.out.println("=== Catalogo de monstros (nome -> nivel) ===");
        // entrySet() devolve os pares chave/valor para percorrer o Map.
        for (Map.Entry<String, Integer> par : niveis.entrySet()) {
            System.out.println("- " + par.getKey() + ": nivel " + par.getValue());
        }

        // Buscar um valor pela chave (get devolve o Integer associado).
        int nivelDragao = niveis.get("Dragao");   // autoboxing inverso: Integer -> int
        System.out.println("\nO Dragao esta no nivel " + nivelDragao);
        System.out.println("Total de monstros catalogados: " + niveis.size());

        // Set<String>: guarda tipos de monstro SEM repeticao.
        Set<String> tipos = new HashSet<>();
        tipos.add("Fogo");
        tipos.add("Gelo");
        tipos.add("Fogo");      // duplicata: sera ignorada pelo Set
        tipos.add("Sombra");
        tipos.add("Gelo");      // duplicata: tambem ignorada

        System.out.println("\n=== Tipos unicos de monstro ===");
        System.out.println("Tentamos adicionar 5 tipos, mas o Set guardou " + tipos.size() + ".");
        for (String tipo : tipos) {
            System.out.println("- " + tipo);
        }

        // contains pergunta se um elemento ja esta no Set.
        System.out.println("\nTem o tipo Fogo? " + tipos.contains("Fogo"));
        System.out.println("Tem o tipo Luz? " + tipos.contains("Luz"));
    }
}
