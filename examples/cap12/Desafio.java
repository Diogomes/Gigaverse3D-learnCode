// Desafio.java
// DESAFIO DO CAPITULO 12
//
// Sua missao: simule mais um "botao" orientado a eventos.
// 1) Crie um Contador que comeca em 0.
// 2) Registre um handler no botao "Incrementar" que soma 1 ao contador e imprime
//    o novo valor. Use setOnAction(e -> ...) no estilo do exemplo.
// 3) Dispare 3 cliques simulados. A saida deve mostrar 1, 2 e 3.

import java.util.function.Consumer;

public class Desafio {
    public static void main(String[] args) {
        // Dica: crie o BotaoSimples, registre o handler com setOnAction(...)
        // e chame clicar() tres vezes.
        System.out.println("Complete o desafio!");
    }
}

// "Botao" minimo orientado a eventos. Complete o handler no main.
class BotaoSimples {
    private Consumer<String> handler;

    public void setOnAction(Consumer<String> handler) { this.handler = handler; }

    public void clicar() {
        if (handler != null) {
            handler.accept("clique");
        }
    }
}
