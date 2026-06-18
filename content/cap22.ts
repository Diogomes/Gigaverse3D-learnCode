import type { Capitulo } from '../src/types.js';

const cap22: Capitulo = {
  id: 22,
  titulo: 'Componentes GUI: parte 2',
  conceitoEmFoco: {
    termo: 'Componentes compostos',
    explicacao:
      'Componentes ricos como menus, tabelas e abas não são "peças únicas": eles são MONTADOS ' +
      'a partir de componentes menores. Uma barra de menu é uma fila de itens; uma tabela é ' +
      'feita de colunas e linhas; um painel de abas guarda vários conteúdos e mostra um por vez. ' +
      'A ideia central é a COMPOSIÇÃO: você constrói uma tela inteira somando partes pequenas e ' +
      'reaproveitáveis, como montar um castelo com blocos.',
  },
  objetivos: [
    'Entender que telas complexas são compostas de componentes menores.',
    'Montar uma tabela de dados formatada (colunas alinhadas) com String.format.',
    'Simular um menu e abas em console, reconhecendo o papel de cada parte.',
    'Relacionar a demo de console com MenuBar, TableView e TabPane do JavaFX.',
    'Compreender a ideia de propriedades/bindings: um rótulo que reflete os dados.',
  ],
  teoria: [
    {
      titulo: 'Composição: telas feitas de blocos',
      paragrafos: [
        'Em uma interface gráfica, quase nada é uma peça só. Uma janela tem uma barra de menu no ' +
          'topo, talvez abas no meio e uma tabela mostrando dados. Cada uma dessas partes é um ' +
          'componente, e componentes podem conter outros componentes. Você compõe a tela juntando ' +
          'esses blocos dentro de um layout.',
        'No nosso exemplo de console fazemos exatamente isso: cada parte da tela (menu, abas, ' +
          'tabela, rodapé) é um método separado que devolve texto. A tela final é a soma desses ' +
          'pedaços. Trocar uma parte não quebra as outras — é a vantagem de compor.',
      ],
    },
    {
      titulo: 'A tabela: colunas alinhadas',
      paragrafos: [
        'Uma tabela é uma grade: linhas de dados e colunas com um significado (Nome, Nível, ' +
          'Pontos). Para alinhar tudo em texto usamos String.format com larguras fixas: "%-10s" ' +
          'reserva 10 espaços alinhando à ESQUERDA (bom para textos), e "%5s" reserva 5 espaços ' +
          'alinhando à DIREITA (bom para números). O resultado são colunas retinhas.',
        'Cada linha da tabela representa um objeto. Usamos um record (uma classe de dados curta ' +
          'e imutável) chamado Jogador para guardar nome, nível e pontos. A tabela só percorre a ' +
          'lista e formata cada Jogador como uma linha.',
      ],
    },
    {
      titulo: 'Como seria no JavaFX (referência)',
      paragrafos: [
        'No JavaFX real, a barra de menu seria um MenuBar com vários Menu, e cada Menu teria ' +
          'MenuItem (com handlers de clique). As abas seriam um TabPane contendo vários Tab, cada ' +
          'um com seu conteúdo. A tabela seria um TableView, onde você declara TableColumn (uma por ' +
          'coluna) e liga cada coluna a um campo do objeto.',
        'O TableView usa propriedades e bindings: você dá uma lista observável (ObservableList) e a ' +
          'tabela se atualiza sozinha quando os dados mudam. Sliders também usam isso: o valor do ' +
          'slider fica "amarrado" (bound) a outra propriedade, e mover o slider altera a outra na ' +
          'hora. No console imitamos a ideia com o rodapé, que é recalculado a partir dos dados.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap22/PainelJogo.java',
    descricao:
      'Uma tela de console COMPOSTA por componentes menores: uma barra de menu, abas, uma tabela ' +
      'de jogadores (Nome/Nivel/Pontos) alinhada com String.format e um rodapé derivado dos dados. ' +
      'É o equivalente em texto de montar MenuBar + TabPane + TableView no JavaFX.',
    anotacoes: [
      { linha: 14, nota: 'Os dados da tabela: uma lista de Jogador. Em JavaFX isto seria uma ObservableList ligada ao TableView.' },
      { linha: 22, nota: 'A tela é COMPOSTA: cada println adiciona um componente (menu, abas, tabela, rodapé).' },
      { linha: 29, nota: '"MenuBar": junta as opções numa linha. No JavaFX seria new MenuBar com vários Menu/MenuItem.' },
      { linha: 34, nota: '"TabPane": mostra as abas e marca a selecionada entre colchetes.' },
      { linha: 45, nota: 'O segredo da tabela: %-10s alinha à esquerda (texto) e %5s/%8s à direita (números). Colunas retas.' },
      { linha: 56, nota: 'Rodapé derivado dos dados — imita um binding: se os Jogadores mudarem, o total muda junto.' },
      { linha: 64, nota: 'record: classe de dados curta e imutável. Cada Jogador é uma LINHA da tabela.' },
    ],
  },
  discussao: [
    'Compor é a chave: uma tela difícil vira fácil quando você a quebra em componentes pequenos ' +
      'e monta cada um separadamente. Foi o que fizemos com menu, abas, tabela e rodapé.',
    'Pegadinha de tabela em texto: se você esquecer a largura fixa no String.format, as colunas ' +
      'ficam tortas assim que um nome for maior que o outro. A largura ("%-10s") é o que mantém o ' +
      'alinhamento.',
    'No JavaFX você não imprime texto: declara MenuBar, TabPane e TableView, e a biblioteca ' +
      'desenha tudo. Mas a lógica de COMPOR partes menores é exatamente a mesma da nossa demo.',
    'Propriedades/bindings evitam atualizar a tela "na mão": você liga o componente aos dados e ' +
      'ele se redesenha quando os dados mudam. Sliders e TableView são exemplos clássicos disso.',
  ],
  desafio: {
    enunciado:
      'Monte uma TABELA de itens de uma loja em console (um componente composto). Crie um método ' +
      'tabela(List<Item>) que imprima duas colunas alinhadas: Item (à esquerda, largura 12) e ' +
      'Preco (à direita, largura 6), usando String.format com "%-12s | %6s". No main, mostre 3 ' +
      'itens (ex.: Espada/150, Pocao/30, Escudo/90) com cabeçalho.',
    arquivoBase: 'examples/cap22/Desafio.java',
    dica:
      'Crie a lista com List.of(new Item("Espada", 150), ...). No método, primeiro imprima o ' +
      'cabeçalho com String.format("%-12s | %6s", "Item", "Preco") e depois um for que formata ' +
      'cada Item com o mesmo formato.',
    solucao:
      'import java.util.List;\n\n' +
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        List<Item> itens = List.of(\n' +
      '            new Item("Espada", 150),\n' +
      '            new Item("Pocao", 30),\n' +
      '            new Item("Escudo", 90)\n' +
      '        );\n' +
      '        tabela(itens);\n' +
      '    }\n\n' +
      '    static void tabela(List<Item> itens) {\n' +
      '        String formato = "%-12s | %6s";\n' +
      '        System.out.println(String.format(formato, "Item", "Preco"));\n' +
      '        for (Item i : itens) {\n' +
      '            System.out.println(String.format(formato, i.nome(), i.preco()));\n' +
      '        }\n' +
      '    }\n' +
      '}\n\n' +
      'record Item(String nome, int preco) { }',
  },
  quiz: [
    {
      pergunta: 'O que significa dizer que um componente de GUI é "composto"?',
      opcoes: [
        'Que ele é escrito em outra linguagem',
        'Que ele é montado a partir de componentes menores',
        'Que ele só pode ser usado uma vez',
        'Que ele não pode conter texto',
      ],
      correta: 1,
      explicacao:
        'Componentes compostos (menus, tabelas, abas) são construídos juntando peças menores — a ideia de composição.',
    },
    {
      pergunta: 'Na tabela em texto, para que serve o "%-10s" no String.format?',
      opcoes: [
        'Reservar 10 espaços alinhando o texto à esquerda',
        'Mostrar no máximo 10 jogadores',
        'Arredondar para 10 casas decimais',
        'Repetir o texto 10 vezes',
      ],
      correta: 0,
      explicacao:
        '%-10s reserva uma largura de 10 caracteres e alinha à esquerda; é isso que mantém as colunas retas.',
    },
    {
      pergunta: 'No JavaFX, qual componente corresponde à tabela de dados do exemplo?',
      opcoes: ['MenuBar', 'TabPane', 'TableView', 'Slider'],
      correta: 2,
      explicacao:
        'TableView mostra dados em linhas e colunas (TableColumn), normalmente ligado a uma ObservableList.',
    },
    {
      pergunta: 'Qual é a ideia de um binding (propriedade ligada)?',
      opcoes: [
        'Apagar a tela a cada segundo',
        'Quando os dados mudam, o componente se atualiza sozinho',
        'Impedir o usuário de clicar',
        'Transformar texto em imagem',
      ],
      correta: 1,
      explicacao:
        'Com binding o componente fica "amarrado" aos dados: alterou o dado, a tela reflete a mudança automaticamente.',
    },
  ],
  xp: 100,
};

export default cap22;
