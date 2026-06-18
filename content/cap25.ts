import type { Capitulo } from '../src/types.js';

const cap25: Capitulo = {
  id: 25,
  titulo: 'JavaFX GUI: parte 1',
  conceitoEmFoco: {
    termo: 'MVC e controller',
    explicacao:
      'MVC separa o programa em tres papeis. O Modelo guarda os dados (e as regras), a Visao ' +
      'mostra a tela (em JavaFX, um arquivo FXML), e o Controller liga os dois: ele recebe os ' +
      'eventos da interface (como o clique de um botao), atualiza o Modelo e manda a Visao se ' +
      'redesenhar. Pense no Controller como um garcom: o cliente (usuario) faz um pedido, o ' +
      'garcom leva a cozinha (Modelo) e traz o prato de volta para a mesa (Visao). A cozinha nao ' +
      'fala com a mesa direto.',
  },
  objetivos: [
    'Separar um programa em Modelo, Visao e Controller.',
    'Entender o papel do Controller: receber eventos e orquestrar Model + View.',
    'Reconhecer como FXML e @FXML ligam a tela ao Controller no JavaFX real.',
    'Saber o que e binding de propriedades e por que ele simplifica a View.',
    'Entender por que separar dados, tela e logica deixa o codigo mais facil de manter.',
  ],
  teoria: [
    {
      titulo: 'Os tres papeis do MVC',
      paragrafos: [
        'No MVC, o MODELO so cuida dos dados e das regras (ex.: um contador que sabe incrementar ' +
          'e nunca fica negativo). Ele nao sabe nada sobre a tela. A VISAO so mostra: recebe um ' +
          'valor e exibe, sem decidir nada. O CONTROLLER e o intermediario: e ele quem recebe os ' +
          'eventos do usuario.',
        'Quando o usuario clica em "+", quem e avisado e o Controller. Ele faz duas coisas em ' +
          'ordem: 1) pede ao Modelo para mudar (model.incrementar()), e 2) manda a Visao ' +
          'redesenhar com o novo estado (view.mostrar(...)). Modelo e Visao nunca conversam ' +
          'direto: tudo passa pelo Controller.',
        'A vantagem: voce pode trocar a tela (Visao) sem mexer nas regras (Modelo), e testar as ' +
          'regras sem abrir nenhuma janela. Cada parte tem uma responsabilidade so.',
      ],
    },
    {
      titulo: 'Como isso aparece no JavaFX real',
      paragrafos: [
        'Em JavaFX, a Visao costuma ser um arquivo FXML: um XML que descreve a tela (botoes, ' +
          'rotulos, caixas). No FXML voce escreve fx:controller="MeuController" para dizer qual ' +
          'classe Java e o Controller daquela tela, e onAction="#aoClicar" para ligar um botao a ' +
          'um metodo do Controller.',
        'Dentro do Controller, a anotacao @FXML marca os campos e metodos que o FXML vai usar. ' +
          'Por exemplo, @FXML private Label lblValor; faz o JavaFX "injetar" naquele campo o ' +
          'rotulo declarado no FXML (ligados pelo fx:id). Assim o codigo Java consegue mexer no ' +
          'componente da tela.',
        'O CSS do JavaFX cuida da aparencia (cores, fontes, espacamentos) num arquivo separado, ' +
          'igual ao CSS da web. Isso mantem o visual fora da logica.',
      ],
    },
    {
      titulo: 'Binding: a View que se atualiza sozinha',
      paragrafos: [
        'No exemplo em console, o Controller chama view.mostrar(...) toda vez para redesenhar. Em ' +
          'JavaFX da para ir alem com BINDING de propriedades: voce "amarra" o texto de um rotulo ' +
          'ao valor do Modelo. Quando o Modelo muda, a tela atualiza sozinha, sem o Controller ' +
          'precisar chamar setText na mao.',
        'Exemplo: lblValor.textProperty().bind(model.valorProperty().asString()). A partir dai a ' +
          'Visao "segue" o Modelo automaticamente. O binding e um dos pontos fortes do JavaFX.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap25/AppMVC.java',
    descricao:
      'Um contador montado em MVC, rodavel em console (JavaFX nao esta disponivel aqui). O Model ' +
      'guarda o valor, a View so imprime e o Controller recebe "eventos" (cliques simulados), ' +
      'muda o Model e manda a View redesenhar. Os comentarios mostram como ficaria com FXML, ' +
      '@FXML e binding no JavaFX real.',
    anotacoes: [
      { linha: 18, nota: 'O Controller recebe o Model e a View no construtor: ele e quem conhece os dois e os liga.' },
      { linha: 24, nota: 'Cada chamada simula um EVENTO da interface. Em JavaFX, seria o clique de um botao chamando este metodo.' },
      { linha: 34, nota: 'MODEL: so dados e regras (ex.: nao deixar o valor ficar negativo). Nao sabe nada de tela.' },
      { linha: 44, nota: 'VIEW: so EXIBE. Recebe um valor e mostra, sem decidir nada. Em JavaFX seria o FXML.' },
      { linha: 70, nota: 'O CONTROLLER em acao: ao receber o evento, ele 1) muda o Model e 2) manda a View redesenhar.' },
      { linha: 102, nota: 'Referencia JavaFX: @FXML injeta no campo o componente declarado no FXML (ligados pelo fx:id).' },
    ],
  },
  discussao: [
    'O segredo do MVC e a separacao: o Model nao chama a View nem a View chama o Model. Quem ' +
      'orquestra e sempre o Controller. Isso evita o emaranhado em que tudo depende de tudo.',
    'Pegadinha comum: colocar regra de negocio na View (ou desenhar a tela dentro do Model). ' +
      'Se a sua View esta decidindo coisas, ela virou Controller disfarcado. Mantenha cada papel ' +
      'no seu lugar.',
    'No JavaFX real, esquecer o @FXML (ou errar o fx:id) faz o campo chegar como null e o clique ' +
      'estourar um NullPointerException. O nome no FXML e o nome no Java precisam bater.',
    'Binding reduz codigo repetitivo: em vez de o Controller chamar setText apos cada mudanca, a ' +
      'View segue o Model automaticamente. No nosso exemplo de console fazemos isso "na mao" ' +
      'chamando view.mostrar(...) para deixar o fluxo visivel.',
  ],
  desafio: {
    enunciado:
      'Complete o padrao MVC de um interruptor de luz. O Model (Luz) e a View (LuzView) ja ' +
      'estao prontos. Falta o Controller: no metodo aoClicar(), alterne o Model (model.alternar()) ' +
      'e mande a View mostrar o estado atual (view.mostrar(model.estaLigada())). No main, simule ' +
      '3 cliques. A saida deve alternar: LIGADA, DESLIGADA, LIGADA.',
    arquivoBase: 'examples/cap25/Desafio.java',
    dica:
      'No aoClicar(), primeiro chame model.alternar() e depois view.mostrar(model.estaLigada()). ' +
      'No main, chame controller.aoClicar() tres vezes.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Luz model = new Luz();\n' +
      '        LuzView view = new LuzView();\n' +
      '        LuzController controller = new LuzController(model, view);\n' +
      '        controller.aoClicar();\n' +
      '        controller.aoClicar();\n' +
      '        controller.aoClicar();\n' +
      '    }\n' +
      '}\n\n' +
      'class Luz {\n' +
      '    private boolean ligada;\n' +
      '    public void alternar() { this.ligada = !this.ligada; }\n' +
      '    public boolean estaLigada() { return this.ligada; }\n' +
      '}\n\n' +
      'class LuzView {\n' +
      '    public void mostrar(boolean ligada) {\n' +
      '        System.out.println("Luz: " + (ligada ? "LIGADA" : "DESLIGADA"));\n' +
      '    }\n' +
      '}\n\n' +
      'class LuzController {\n' +
      '    private final Luz model;\n' +
      '    private final LuzView view;\n' +
      '    public LuzController(Luz model, LuzView view) {\n' +
      '        this.model = model;\n' +
      '        this.view = view;\n' +
      '    }\n' +
      '    public void aoClicar() {\n' +
      '        model.alternar();\n' +
      '        view.mostrar(model.estaLigada());\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'No padrao MVC, qual e o papel do Controller?',
      opcoes: [
        'Guardar os dados do programa',
        'Desenhar a tela para o usuario',
        'Receber os eventos, atualizar o Modelo e mandar a Visao redesenhar',
        'Substituir o banco de dados',
      ],
      correta: 2,
      explicacao:
        'O Controller e o intermediario: reage aos eventos, muda o Model e pede para a View se atualizar.',
    },
    {
      pergunta: 'Para que serve a anotacao @FXML em um controller JavaFX?',
      opcoes: [
        'Tornar o metodo estatico',
        'Ligar campos/metodos do Java aos componentes declarados no arquivo FXML',
        'Definir a cor dos botoes',
        'Criar uma nova janela',
      ],
      correta: 1,
      explicacao:
        '@FXML marca os campos e metodos que o FXML usa; o JavaFX injeta neles os componentes da tela (pelo fx:id).',
    },
    {
      pergunta: 'No MVC, quem o Modelo deve conhecer diretamente?',
      opcoes: [
        'A Visao, para poder desenhar a tela',
        'O Controller, para mandar eventos',
        'Ninguem: ele so cuida dos dados e regras',
        'O arquivo FXML',
      ],
      correta: 2,
      explicacao:
        'O Model so cuida dos dados. Ele nao chama a View nem o Controller; quem orquestra tudo e o Controller.',
    },
    {
      pergunta: 'O que o binding de propriedades faz em JavaFX?',
      opcoes: [
        'Faz a Visao se atualizar sozinha quando o valor do Modelo muda',
        'Compila o codigo mais rapido',
        'Apaga os dados do Modelo',
        'Cria o arquivo CSS automaticamente',
      ],
      correta: 0,
      explicacao:
        'Com binding voce amarra um componente a uma propriedade do Model; quando ela muda, a tela atualiza sem setText manual.',
    },
  ],
  xp: 100,
};

export default cap25;
