// AppMVC.java
// JavaFX GUI parte 1: o padrao MVC e o papel do CONTROLLER.
//
// JavaFX nao esta disponivel aqui, entao demonstramos o MESMO padrao em
// console, em Java puro. Sao tres papeis bem separados:
//   MODEL      -> guarda os dados (a classe Contador).
//   VIEW       -> so mostra o estado na tela (a classe ContadorView).
//   CONTROLLER -> liga os dois: recebe "eventos", muda o Model e manda a View redesenhar.
//
// Em JavaFX real, a View seria um arquivo FXML, os campos teriam @FXML e o
// Controller seria a classe ligada ao FXML. Veja os comentarios no fim.

public class AppMVC {
    public static void main(String[] args) {
        // Montagem (em JavaFX isso acontece quando o FXML e carregado):
        Contador model = new Contador();                 // MODEL: os dados
        ContadorView view = new ContadorView();          // VIEW: so imprime
        ContadorController controller = new ContadorController(model, view);

        controller.aoIniciar();   // desenha o estado inicial

        // Simulamos "eventos" da interface. Em JavaFX cada um destes seria um
        // clique de botao chamando o metodo do Controller (via onAction).
        controller.aoClicarIncrementar();   // evento: clicou em [ + ]
        controller.aoClicarIncrementar();   // evento: clicou em [ + ]
        controller.aoClicarIncrementar();   // evento: clicou em [ + ]
        controller.aoClicarDecrementar();   // evento: clicou em [ - ]
        controller.aoClicarResetar();       // evento: clicou em [Resetar]
        controller.aoClicarIncrementar();   // evento: clicou em [ + ]
    }
}

// ===== MODEL: apenas DADOS e regras. Nao sabe nada de tela. =====
class Contador {
    private int valor;

    public void incrementar() { this.valor++; }
    public void decrementar() { if (this.valor > 0) this.valor--; }  // nao deixa negativo
    public void resetar()     { this.valor = 0; }
    public int getValor()     { return this.valor; }
}

// ===== VIEW: apenas EXIBE. Nao decide nada, so recebe o valor e mostra. =====
class ContadorView {
    public void mostrar(int valor) {
        System.out.println("+-----------------------+");
        System.out.println("|   Contador: " + String.format("%-9d", valor) + " |");
        System.out.println("|   [ - ] [Resetar] [ + ]  ");
        System.out.println("+-----------------------+");
    }
}

// ===== CONTROLLER: o cerebro. Liga eventos -> Model -> View. =====
class ContadorController {
    private final Contador model;       // referencia ao Model
    private final ContadorView view;    // referencia a View

    public ContadorController(Contador model, ContadorView view) {
        this.model = model;
        this.view = view;
    }

    // Em JavaFX seria chamado em initialize() depois do FXML carregar.
    public void aoIniciar() {
        System.out.println(">> Tela aberta");
        view.mostrar(model.getValor());
    }

    // Cada metodo abaixo seria ligado a um botao no FXML (onAction="#aoClicar...").
    public void aoClicarIncrementar() {
        System.out.println(">> Evento: clicou em [ + ]");
        model.incrementar();                 // 1) muda o Model
        view.mostrar(model.getValor());      // 2) manda a View redesenhar
    }

    public void aoClicarDecrementar() {
        System.out.println(">> Evento: clicou em [ - ]");
        model.decrementar();
        view.mostrar(model.getValor());
    }

    public void aoClicarResetar() {
        System.out.println(">> Evento: clicou em [Resetar]");
        model.resetar();
        view.mostrar(model.getValor());
    }
}

// -------------------------------------------------------------------------
// COMO SERIA EM JAVAFX REAL (so referencia, nao roda aqui):
//
// 1) View em FXML (contador.fxml):
//      <VBox fx:controller="ContadorController">
//          <Label fx:id="lblValor" text="0"/>
//          <Button text="-"       onAction="#aoClicarDecrementar"/>
//          <Button text="Resetar" onAction="#aoClicarResetar"/>
//          <Button text="+"       onAction="#aoClicarIncrementar"/>
//      </VBox>
//
// 2) Controller em Java, ligado ao FXML pelos nomes:
//      public class ContadorController {
//          @FXML private Label lblValor;          // @FXML injeta o no do FXML
//          private Contador model = new Contador();
//          @FXML public void aoClicarIncrementar() {
//              model.incrementar();
//              lblValor.setText(String.valueOf(model.getValor()));   // atualiza a View
//          }
//      }
//
// 3) CSS deixa a aparencia separada da logica (ex.: .button { -fx-font-size: 16; }).
//
// 4) Com BINDING de propriedade, nem precisamos chamar setText na mao:
//      lblValor.textProperty().bind(model.valorProperty().asString());
//    Assim a View "segue" o Model automaticamente quando ele muda.
// -------------------------------------------------------------------------
