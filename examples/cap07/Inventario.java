// Inventario.java
// Arrays e ArrayList: colecao de tamanho dinamico acessada por indice.
import java.util.ArrayList;

public class Inventario {
    public static void main(String[] args) {
        // ArrayList<String> = lista que so guarda Strings e cresce sozinha.
        ArrayList<String> itens = new ArrayList<>();

        itens.add("Espada");    // adiciona no fim da lista
        itens.add("Pocao");
        itens.add("Escudo");

        System.out.println("Inventario (" + itens.size() + " itens):");
        // for-each (for aprimorado): percorre cada item sem precisar de indice.
        for (String item : itens) {
            System.out.println("- " + item);
        }

        itens.remove("Pocao");   // remove pelo valor
        System.out.println("Apos usar a Pocao:");

        // for tradicional: usa indice (comeca em 0) e o tamanho atual da lista.
        for (int i = 0; i < itens.size(); i++) {
            System.out.println(i + ": " + itens.get(i));
        }
    }
}
