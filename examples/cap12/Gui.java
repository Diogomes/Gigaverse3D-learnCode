// Gui.java
// CAPITULO 12 - Componentes GUI: parte 1 (JavaFX)
//
// JavaFX nao esta disponivel neste ambiente, entao este exemplo SIMULA em console
// a ideia central de uma GUI: programacao ORIENTADA A EVENTOS (event-driven).
//
// Em uma GUI real, o programa nao "corre de cima a baixo": ele FICA ESPERANDO o
// usuario. Quando o usuario clica num botao, o sistema chama o "handler" (o codigo
// que voce registrou para aquele evento). Aqui, em vez de cliques de verdade, nos
// REGISTRAMOS handlers e depois DISPARAMOS uma sequencia de eventos simulados.
//
// Paralelo com o JavaFX real:
//   Button botao = new Button("Salvar");
//   botao.setOnAction(e -> System.out.println("Salvou!"));   // registra o handler
// Quando o usuario clica, o JavaFX chama esse e -> ... por voce.

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class Gui {
    public static void main(String[] args) {
        // "Janela" simulada com tres componentes.
        Botao botaoSalvar = new Botao("Salvar");
        Botao botaoLimpar = new Botao("Limpar");
        Campo campoNome = new Campo("Nome");

        // Registramos os HANDLERS (o que fazer quando o evento acontece).
        // Em JavaFX: botaoSalvar.setOnAction(e -> ...).
        botaoSalvar.aoClicar(evento -> {
            System.out.println("  [handler Salvar] Salvando o nome: " + campoNome.texto());
        });

        botaoLimpar.aoClicar(evento -> {
            campoNome.escrever("");
            System.out.println("  [handler Limpar] Campo limpo.");
        });

        campoNome.aoDigitar(texto -> {
            System.out.println("  [handler Campo] Voce digitou: \"" + texto + "\"");
        });

        // O LACO DE EVENTOS: a GUI fica "esperando" e despachando eventos.
        // Aqui simulamos a fila de acoes do usuario (sem teclado de verdade).
        List<Runnable> eventosSimulados = new ArrayList<>();
        eventosSimulados.add(() -> campoNome.escrever("Ada"));
        eventosSimulados.add(() -> botaoSalvar.clicar());
        eventosSimulados.add(() -> botaoLimpar.clicar());
        eventosSimulados.add(() -> botaoSalvar.clicar());

        System.out.println("== Laco de eventos iniciado (a GUI espera o usuario) ==");
        for (Runnable acaoDoUsuario : eventosSimulados) {
            acaoDoUsuario.run();   // o usuario "faz algo"; o handler reage logo abaixo
        }
        System.out.println("== Laco de eventos encerrado ==");
    }
}

// Um "botao" simulado. Ele guarda UM handler de clique e o dispara quando clicado.
class Botao {
    private final String rotulo;
    private Consumer<String> handler;   // o codigo a executar no clique

    public Botao(String rotulo) { this.rotulo = rotulo; }

    // Equivale a botao.setOnAction(e -> ...) do JavaFX.
    public void aoClicar(Consumer<String> handler) { this.handler = handler; }

    // Simula o sistema disparando o evento de clique.
    public void clicar() {
        System.out.println("[clique no botao \"" + rotulo + "\"]");
        if (handler != null) {
            handler.accept(rotulo);   // chama o handler registrado
        }
    }
}

// Um "campo de texto" simulado, com handler de digitacao.
class Campo {
    private final String nome;
    private String texto = "";
    private Consumer<String> handler;

    public Campo(String nome) { this.nome = nome; }

    public void aoDigitar(Consumer<String> handler) { this.handler = handler; }

    public String texto() { return texto; }

    // Simula o usuario digitando; dispara o handler de digitacao.
    public void escrever(String novoTexto) {
        this.texto = novoTexto;
        System.out.println("[campo \"" + nome + "\" recebeu texto]");
        if (handler != null) {
            handler.accept(novoTexto);
        }
    }
}
