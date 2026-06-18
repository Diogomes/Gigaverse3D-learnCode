import type { Capitulo } from '../src/types.js';

const cap03: Capitulo = {
  id: 3,
  titulo: 'Funções',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Função',
    explicacao:
      'Uma FUNÇÃO é um bloco de código reutilizável, definido com a palavra def e com um nome. ' +
      'Ela recebe valores de entrada (os argumentos) e pode devolver um resultado com return. ' +
      'Em vez de repetir as mesmas linhas, você dá um nome ao bloco uma vez e o CHAMA quantas ' +
      'vezes quiser — escrevendo menos e organizando o programa em peças com responsabilidades claras.',
  },
  objetivos: [
    'Definir uma função com def e chamá-la passando argumentos.',
    'Distinguir parâmetros (na definição) de argumentos (na chamada).',
    'Entender o fluxo de execução: definir não roda, chamar é que executa.',
    'Devolver um valor com return e reconhecer que sem return a função devolve None.',
    'Importar um módulo (import math) e compor funções, usando o retorno de uma como entrada de outra.',
  ],
  teoria: [
    {
      titulo: 'Definir e chamar',
      paragrafos: [
        'Definir uma função é dar um nome a um bloco de instruções: você escreve def nome(...) e, ' +
          'indentado abaixo, o corpo da função. Esse corpo NÃO roda quando o Python lê a definição — ' +
          'ele apenas guarda a receita para uso futuro.',
        'O corpo só executa quando você CHAMA a função, escrevendo o nome dela seguido de parênteses, ' +
          'como saudacao("Diogo"). É aí que o Python entra no bloco, faz o trabalho e (se houver return) ' +
          'devolve um valor que substitui a chamada na expressão.',
      ],
    },
    {
      titulo: 'Parâmetros, argumentos e return',
      paragrafos: [
        'Na definição def repetir(texto, n), texto e n são PARÂMETROS: nomes que vão receber valores. ' +
          'Na chamada repetir("oi", 3), os valores "oi" e 3 são os ARGUMENTOS, encaixados em ordem nos ' +
          'parâmetros. Dentro da função, esses nomes valem como variáveis locais.',
        'O return encerra a função e devolve um valor para quem a chamou. Uma função sem return ainda ' +
          'funciona, mas devolve None (o "nada" do Python). Por isso há diferença entre uma função que ' +
          'IMPRIME na tela e uma que DEVOLVE um valor que você pode guardar e reaproveitar.',
      ],
    },
    {
      titulo: 'Escopo local e composição',
      paragrafos: [
        'As variáveis criadas dentro de uma função vivem só ali: é o ESCOPO LOCAL. Quando a função ' +
          'termina, elas somem. Isso é bom — cada função cuida das suas coisas sem bagunçar o resto do programa.',
        'Como uma função pode devolver um valor, ela pode alimentar outra: repetir(saudacao("Gigaverse"), 3) ' +
          'primeiro resolve saudacao(...) e usa o resultado como argumento de repetir(...). Isso é COMPOR ' +
          'funções. O módulo math, trazido com import math, oferece prontos valores como math.pi para usar nas suas.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap03/funcoes.py',
    descricao:
      'Define três funções (saudacao, repetir e area_circulo), chama-as e mostra a composição ' +
      'de uma função alimentando outra, além de usar math.pi.',
    anotacoes: [
      {
        linha: 10,
        nota:
          'def saudacao(nome): DEFINE a função. nome é um parâmetro. Os dois-pontos abrem o corpo, ' +
          'que vem indentado na linha seguinte — nada roda ainda aqui.',
      },
      {
        linha: 11,
        nota:
          'return devolve o texto montado para quem chamou. É a indentação (4 espaços) que diz ao ' +
          'Python que esta linha pertence ao corpo de saudacao.',
      },
      {
        linha: 16,
        nota:
          'repetir(texto, n) tem dois parâmetros. texto * n repete a string n vezes — útil porque ' +
          'devolvemos o resultado em vez de só imprimir.',
      },
      {
        linha: 21,
        nota:
          'math.pi vem do módulo math, importado lá em cima. area_circulo devolve um número (float) ' +
          'que pode ser guardado ou impresso.',
      },
      {
        linha: 26,
        nota:
          'Composição: saudacao("Gigaverse") roda primeiro e seu retorno vira o argumento texto de ' +
          'repetir(..., 3). O resultado é guardado em mensagem.',
      },
    ],
  },
  discussao: [
    'A INDENTAÇÃO define o corpo da função: as linhas alinhadas (4 espaços) abaixo do def é que ' +
      'pertencem a ela. Se você desindentar uma linha, ela "sai" da função — e misturar espaços com ' +
      'tabs causa erro.',
    'Definir uma função NÃO a executa. Escrever def saudacao(...) só guarda a receita; nada aparece ' +
      'na tela até você CHAMAR saudacao("..."). Esquecer os parênteses na chamada também não executa: ' +
      'saudacao sozinho é só uma referência à função.',
    'Uma função sem return devolve None. Se você fizer x = print("oi"), x vira None, porque print ' +
      'mostra na tela mas não DEVOLVE um valor. Imprimir e retornar são coisas diferentes.',
    'O que é criado dentro da função é local: uma variável definida no corpo não existe fora dele. ' +
      'Tentar usá-la depois que a função termina dá NameError.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap03/desafio.py. Complete a função dobro(n) para devolver n * 2, crie a função ' +
      'quadrado(n) que devolva n * n e, por fim, imprima o quadrado do dobro de 3 compondo as duas.',
    arquivoBase: 'examples/cap03/desafio.py',
    dica:
      'Dentro de dobro, troque o pass por return n * 2. Defina quadrado com def quadrado(n): e return ' +
      'n * n. Depois componha: print(quadrado(dobro(3))) — o dobro de 3 é 6, e 6 ao quadrado é 36.',
    solucao:
      'def dobro(n):\n' +
      '    return n * 2\n' +
      '\n' +
      'def quadrado(n):\n' +
      '    return n * n\n' +
      '\n' +
      'print(quadrado(dobro(3)))',
  },
  quiz: [
    {
      pergunta: 'O que acontece quando o Python LÊ a linha "def saudacao(nome):"?',
      opcoes: [
        'Executa o corpo da função imediatamente',
        'Apenas define a função; o corpo só roda quando ela for chamada',
        'Mostra o nome na tela',
        'Importa o módulo saudacao',
      ],
      correta: 1,
      explicacao:
        'Definir uma função só guarda a receita. O corpo dela só executa quando você a CHAMA, como ' +
        'em saudacao("Diogo").',
    },
    {
      pergunta: 'Em def repetir(texto, n), texto e n são chamados de:',
      opcoes: ['Argumentos', 'Parâmetros', 'Retornos', 'Módulos'],
      correta: 1,
      explicacao:
        'Na DEFINIÇÃO são parâmetros. Os valores passados na CHAMADA, como em repetir("oi", 3), é ' +
        'que são os argumentos.',
    },
    {
      pergunta: 'Uma função que não tem nenhum return devolve:',
      opcoes: ['0', 'Uma string vazia', 'None', 'Um erro'],
      correta: 2,
      explicacao:
        'Sem return, a função devolve None. Por isso imprimir (print) é diferente de devolver um ' +
        'valor que você pode guardar.',
    },
    {
      pergunta: 'Em repetir(saudacao("Gigaverse"), 3), o que o Python resolve PRIMEIRO?',
      opcoes: [
        'A chamada repetir(...)',
        'A chamada saudacao("Gigaverse"), cujo retorno vira argumento de repetir',
        'O número 3',
        'Nada, pois dá erro de sintaxe',
      ],
      correta: 1,
      explicacao:
        'Para chamar repetir, o Python precisa antes calcular seus argumentos: saudacao("Gigaverse") ' +
        'roda primeiro e seu retorno é passado para repetir. Isso é compor funções.',
    },
  ],
  xp: 100,
};

export default cap03;
