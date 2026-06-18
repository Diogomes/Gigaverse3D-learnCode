import type { Capitulo } from '../src/types.js';

const cap12: Capitulo = {
  id: 12,
  titulo: 'Componentes GUI: parte 1 (JavaFX)',
  conceitoEmFoco: {
    termo: 'Event-driven (orientado a eventos)',
    explicacao:
      'Num programa de console comum, o codigo roda de cima a baixo e termina. Numa GUI e ' +
      'diferente: o programa fica ESPERANDO o usuario. Quando ele clica num botao ou digita num ' +
      'campo, o sistema dispara um EVENTO e chama o "handler" (o pedacinho de codigo que voce ' +
      'registrou para aquela acao). E como uma campainha: voce nao fica olhando a porta o tempo ' +
      'todo; voce instala a campainha (o handler) e ela toca quando alguem chega (o evento).',
  },
  objetivos: [
    'Entender o que e programacao orientada a eventos (event-driven).',
    'Registrar handlers de evento usando lambdas (ex.: setOnAction(e -> ...)).',
    'Reconhecer os blocos de uma tela JavaFX: Stage, Scene, layouts e componentes.',
    'Identificar componentes basicos: Button, Label e TextField.',
    'Ter uma visao geral do FXML (separar a tela do codigo).',
  ],
  teoria: [
    {
      titulo: 'A GUI fica esperando voce',
      paragrafos: [
        'Num programa de terminal, voce comanda o fluxo: o codigo executa linha por linha e acaba. ' +
          'Numa interface grafica e o contrario: depois de montar a tela, o programa entra num ' +
          '"laco de eventos" e fica parado, esperando. Ele so reage quando algo acontece: um ' +
          'clique, uma tecla, o mouse passando por cima.',
        'Cada um desses acontecimentos e um EVENTO. Para cada evento que te interessa, voce ' +
          'registra um HANDLER: uma funcao que diz "quando isso acontecer, faca aquilo". Voce nao ' +
          'chama o handler; quem chama e o sistema, no momento certo. Isso e ser orientado a eventos.',
      ],
    },
    {
      titulo: 'Os blocos de uma tela JavaFX',
      paragrafos: [
        'No JavaFX, a janela e o Stage (o "palco"). Dentro dele vai uma Scene (a "cena"), e dentro ' +
          'da cena ficam os componentes, organizados por um layout (VBox empilha na vertical, HBox ' +
          'na horizontal, etc.). Os componentes mais comuns sao Button (botao), Label (texto fixo) ' +
          'e TextField (campo de digitacao).',
        'O codigo real seria algo assim:\n' +
          '  Button botao = new Button("Salvar");\n' +
          '  botao.setOnAction(e -> System.out.println("Salvou!"));\n' +
          '  VBox raiz = new VBox(botao);\n' +
          '  Scene cena = new Scene(raiz, 300, 200);\n' +
          '  stage.setScene(cena);\n' +
          '  stage.show();\n' +
          'Repare no setOnAction: la dentro vai o handler. Quando o usuario clica, o JavaFX chama ' +
          'esse lambda por voce. E exatamente essa ideia que o exemplo em console reproduz.',
      ],
    },
    {
      titulo: 'FXML: separar a tela do codigo (visao geral)',
      paragrafos: [
        'Montar a tela toda em Java pode ficar verboso. Por isso o JavaFX oferece o FXML: um ' +
          'arquivo de marcacao (parecido com HTML) que descreve QUAIS componentes existem e como ' +
          'estao arrumados. O codigo Java (o "controller") cuida so do comportamento: os handlers.',
        'A vantagem e separar aparencia de logica. Um designer pode mexer no FXML sem tocar no ' +
          'Java, e o programador foca nos handlers. Mesmo sem FXML, a ideia central nao muda: a ' +
          'tela tem componentes, e os componentes disparam eventos que os handlers tratam.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap12/Gui.java',
    descricao:
      'Como o JavaFX nao roda neste ambiente, este exemplo SIMULA em console uma GUI orientada a ' +
      'eventos: criamos "botoes" e um "campo", registramos handlers com lambdas e depois ' +
      'disparamos uma sequencia de eventos simulados, vendo cada handler reagir. O paralelo com ' +
      'button.setOnAction(e -> ...) do JavaFX esta marcado nos comentarios.',
    anotacoes: [
      { linha: 14, nota: 'Em JavaFX real: setOnAction registra o handler do clique. O JavaFX o chama quando o usuario clica.' },
      { linha: 30, nota: 'aoClicar(...) recebe um lambda: este e o HANDLER do botao Salvar. Equivale a setOnAction(e -> ...).' },
      { linha: 52, nota: 'O laco de eventos: a "GUI" percorre as acoes do usuario e, a cada uma, o handler correspondente reage.' },
      { linha: 67, nota: 'aoClicar guarda o handler. So guardar; quem o dispara e o metodo clicar().' },
      { linha: 70, nota: 'clicar() SIMULA o sistema disparando o evento de clique e chamando o handler registrado.' },
      { linha: 73, nota: 'handler.accept(...) e o momento em que o handler roda. Em JavaFX, e o framework que faz isso por voce.' },
    ],
  },
  discussao: [
    'O codigo de um handler nao roda "na ordem em que aparece no arquivo": ele so roda quando o ' +
      'evento dispara. Por isso a saida segue a SEQUENCIA dos eventos, nao a ordem em que voce ' +
      'registrou os handlers.',
    'Pegadinha comum: esquecer de registrar o handler. Sem setOnAction (ou, no exemplo, aoClicar), ' +
      'o clique acontece mas nada reage. No exemplo isso aparece como handler == null.',
    'No JavaFX, handlers demorados travam a tela, porque rodam na mesma thread que desenha a ' +
      'interface. A regra e: handler deve ser rapido; tarefa pesada vai para outra thread.',
    'Lambda e a forma curta de escrever um handler. e -> ... e, na pratica, um objeto que ' +
      'implementa uma interface funcional (no exemplo, Consumer; no JavaFX, EventHandler).',
  ],
  desafio: {
    enunciado:
      'Simule um botao "Incrementar" orientado a eventos. Crie um contador que comeca em 0; ' +
      'registre um handler com setOnAction(e -> ...) que soma 1 e imprime o novo valor; depois ' +
      'dispare 3 cliques. A saida deve mostrar 1, 2 e 3.',
    arquivoBase: 'examples/cap12/Desafio.java',
    dica:
      'Use um int[] contador = {0} (ou AtomicInteger) para poder alterar o valor dentro do lambda. ' +
      'No handler, faca contador[0]++ e imprima. Depois chame botao.clicar() tres vezes.',
    solucao:
      'import java.util.function.Consumer;\n\n' +
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        int[] contador = {0};\n' +
      '        BotaoSimples botao = new BotaoSimples();\n' +
      '        botao.setOnAction(e -> {\n' +
      '            contador[0]++;\n' +
      '            System.out.println("Contador: " + contador[0]);\n' +
      '        });\n' +
      '        botao.clicar();\n' +
      '        botao.clicar();\n' +
      '        botao.clicar();\n' +
      '    }\n' +
      '}\n\n' +
      'class BotaoSimples {\n' +
      '    private Consumer<String> handler;\n' +
      '    public void setOnAction(Consumer<String> handler) { this.handler = handler; }\n' +
      '    public void clicar() {\n' +
      '        if (handler != null) {\n' +
      '            handler.accept("clique");\n' +
      '        }\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que significa um programa ser "orientado a eventos" (event-driven)?',
      opcoes: [
        'O programa roda de cima a baixo e termina, sem esperar',
        'O programa fica esperando acoes do usuario e reage chamando handlers',
        'O programa so usa numeros aleatorios',
        'O programa nao pode ter botoes',
      ],
      correta: 1,
      explicacao:
        'Numa GUI o programa espera eventos (cliques, teclas) e, quando eles ocorrem, o sistema ' +
        'chama os handlers que voce registrou.',
    },
    {
      pergunta: 'No JavaFX, para que serve button.setOnAction(e -> ...)?',
      opcoes: [
        'Para desenhar o botao na tela',
        'Para registrar o handler que sera chamado quando o botao for clicado',
        'Para fechar a janela',
        'Para mudar a cor do botao',
      ],
      correta: 1,
      explicacao:
        'setOnAction registra o codigo (handler) que o JavaFX executa no momento do clique. Voce ' +
        'nao chama o handler; o framework chama por voce.',
    },
    {
      pergunta: 'Na hierarquia do JavaFX, qual e a relacao entre Stage e Scene?',
      opcoes: [
        'Sao a mesma coisa',
        'O Stage e a janela; a Scene e o conteudo que fica dentro dela',
        'A Scene contem varios Stages',
        'Stage e Scene sao tipos de botao',
      ],
      correta: 1,
      explicacao:
        'O Stage e o "palco" (a janela). Dentro dele vai uma Scene (a cena), e dentro da cena ' +
        'ficam os componentes organizados por layouts.',
    },
    {
      pergunta: 'Para que serve o FXML no JavaFX?',
      opcoes: [
        'Para acelerar os calculos do programa',
        'Para descrever a tela (quais componentes e como estao arrumados), separando-a da logica',
        'Para conectar ao banco de dados',
        'Para substituir a linguagem Java',
      ],
      correta: 1,
      explicacao:
        'FXML e um arquivo de marcacao que descreve a interface. O comportamento (os handlers) ' +
        'fica no controller em Java, separando aparencia de logica.',
    },
  ],
  xp: 100,
};

export default cap12;
