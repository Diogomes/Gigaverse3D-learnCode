// Desafio.java
// DESAFIO DO CAPITULO 25 (MVC e o papel do Controller)
//
// Sua missao: complete o padrao MVC para um "interruptor de luz".
//   - O MODEL (classe Luz) ja guarda o estado (ligada/desligada).
//   - A VIEW (classe LuzView) ja sabe imprimir o estado.
//   - Falta o CONTROLLER ligar tudo: ao receber o evento "clicar", ele deve
//     alternar o Model (chamar alternar()) e mandar a View redesenhar
//     (chamar mostrar com o estado atual).
//
// Complete o metodo aoClicar() do LuzController. No main, simule 3 cliques.
// Saida esperada (alternando): LIGADA, DESLIGADA, LIGADA.

public class Desafio {
    public static void main(String[] args) {
        Luz model = new Luz();
        LuzView view = new LuzView();
        LuzController controller = new LuzController(model, view);

        // Simule 3 cliques chamando controller.aoClicar() aqui:
        System.out.println("Complete o desafio!");
    }
}

// MODEL: so os dados.
class Luz {
    private boolean ligada;
    public void alternar() { this.ligada = !this.ligada; }
    public boolean estaLigada() { return this.ligada; }
}

// VIEW: so mostra.
class LuzView {
    public void mostrar(boolean ligada) {
        System.out.println("Luz: " + (ligada ? "LIGADA" : "DESLIGADA"));
    }
}

// CONTROLLER: ligue o evento ao Model e a View.
class LuzController {
    private final Luz model;
    private final LuzView view;

    public LuzController(Luz model, LuzView view) {
        this.model = model;
        this.view = view;
    }

    public void aoClicar() {
        // TODO: alterne o model e mande a view mostrar o estado atual.
    }
}
