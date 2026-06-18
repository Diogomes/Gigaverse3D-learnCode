import type { Capitulo } from '../src/types.js';

const cap07: Capitulo = {
  id: 7,
  titulo: 'Iteração',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Laço while e variável de atualização',
    explicacao:
      'Iterar é REPETIR um bloco de código enquanto uma condição for verdadeira. O laço while ' +
      'testa a condição, executa o bloco, volta e testa de novo — e assim por diante. Para que a ' +
      'repetição um dia termine, quase sempre existe uma VARIÁVEL DE ATUALIZAÇÃO: algo que muda a ' +
      'cada volta (como x = x + 1) até que a condição finalmente fique falsa.',
  },
  objetivos: [
    'Entender o que é iteração e quando repetir um bloco faz sentido.',
    'Escrever um laço while com uma condição clara de continuação.',
    'Atualizar variáveis a cada passo com reatribuição (ex.: x = x + 1).',
    'Usar break para sair do laço no momento certo.',
    'Reconhecer e evitar o laço infinito.',
  ],
  teoria: [
    {
      titulo: 'O laço while',
      paragrafos: [
        'O while repete um bloco ENQUANTO uma condição for verdadeira. A cada volta o Python avalia ' +
          'a condição: se for True, executa o bloco indentado e volta ao topo; se for False, pula o ' +
          'bloco e segue o programa. É a forma de repetir sem saber, de antemão, quantas voltas serão.',
        'O bloco do while é definido pela INDENTAÇÃO, como no if. Tudo que estiver recuado abaixo do ' +
          'while: faz parte da repetição; a primeira linha sem recuo já está fora do laço.',
      ],
    },
    {
      titulo: 'Reatribuição e a variável de atualização',
      paragrafos: [
        'REATRIBUIR é dar um novo valor a uma variável que já existe. A linha x = x + 1 não é uma ' +
          'equação matemática: ela calcula x + 1 com o valor atual de x e guarda o resultado de volta ' +
          'em x. Cada volta do laço, portanto, faz x avançar.',
        'Essa variável que muda a cada passo é o que aproxima o laço do fim. Sem ela — ou se você ' +
          'esquecer de atualizá-la — a condição nunca muda e o laço nunca para. Pensar "o que muda a ' +
          'cada volta?" é o primeiro passo para escrever um while correto.',
      ],
    },
    {
      titulo: 'Algoritmos iterativos e o break',
      paragrafos: [
        'Muitos cálculos não têm fórmula direta: a gente CHEGA na resposta por aproximações sucessivas, ' +
          'melhorando um pouco a cada passo até ela parar de mudar (isso se chama convergir). O método ' +
          'de Newton para raiz quadrada, na demo, é exatamente isso.',
        'O break interrompe o laço na hora, saindo dele imediatamente — útil quando a condição de parada ' +
          'fica clara só no meio da volta (ex.: "já convergiu" ou "o jogador acertou"). É comum o par ' +
          'while True: ... if condicao: break, que repete "para sempre" e decide a saída por dentro.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap07/raiz.py',
    descricao:
      'Calcula a raiz quadrada por aproximação (método de Newton) com um laço while, imprimindo ' +
      'cada passo até convergir, e compara com math.sqrt no final.',
    anotacoes: [
      {
        linha: 11,
        nota:
          'passo começa em 0: é a variável de atualização que conta quantas voltas o laço deu. Ela ' +
          'será incrementada dentro do while.',
      },
      {
        linha: 15,
        nota:
          'while True: repete "para sempre". A decisão de parar não está aqui na condição, e sim ' +
          'dentro do bloco, com um break — um padrão comum em algoritmos iterativos.',
      },
      {
        linha: 17,
        nota:
          'passo = passo + 1 é REATRIBUIÇÃO: pega o valor atual de passo, soma 1 e guarda de volta. ' +
          'É isso que faz o contador avançar a cada volta.',
      },
      {
        linha: 21,
        nota:
          'Comparamos floats com TOLERÂNCIA (abs(diferença) < 1e-10), nunca com == direto: por causa ' +
          'do arredondamento, dois floats quase iguais raramente são exatamente iguais.',
      },
      {
        linha: 24,
        nota:
          'chute = melhor atualiza a variável para a próxima volta. Esquecer esta linha congelaria o ' +
          'chute e criaria um laço infinito.',
      },
    ],
  },
  discussao: [
    'LAÇO INFINITO: se a condição do while nunca ficar falsa (e não houver break), o programa repete ' +
      'para sempre. Quase sempre o motivo é não atualizar a variável que deveria mudar a cada volta.',
    'ESQUECER DE ATUALIZAR a variável é o erro clássico: o famoso "x = x + 1" sumiu, então a condição ' +
      'testa sempre o mesmo valor e o laço nunca avança. Antes de rodar, pergunte: o que muda a cada volta?',
    'O break sai SÓ do laço em que está, e na mesma hora — o código depois do break (dentro do laço) ' +
      'nem chega a rodar naquela volta. Ele é a porta de saída, não um "pular para a próxima volta".',
    'Comparar floats com == é traiçoeiro: 0.1 + 0.2 não dá exatamente 0.3 para o computador. Em laços ' +
      'que convergem, pare quando a diferença ficar MENOR que uma tolerância pequena, não quando for igual.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap07/desafio.py. O número secreto está fixo (42). Dentro do while, leia o ' +
      'palpite com input(), e: se acertar, imprima "Acertou!" e use break; senão, diga se o segredo ' +
      'é MAIOR ou MENOR que o palpite. Rode e tente adivinhar.',
    arquivoBase: 'examples/cap07/desafio.py',
    dica:
      'Converta o palpite com int(input(...)). Use if palpite == segredo: print("Acertou!"); break. ' +
      'No elif, compare segredo > palpite para dizer "muito baixo" ou "muito alto".',
    solucao:
      'segredo = 42\n' +
      'print("Adivinhe o numero entre 1 e 100.")\n' +
      'while True:\n' +
      '    palpite = int(input("Seu palpite: "))\n' +
      '    if palpite == segredo:\n' +
      '        print("Acertou!")\n' +
      '        break\n' +
      '    elif palpite < segredo:\n' +
      '        print("Muito baixo.")\n' +
      '    else:\n' +
      '        print("Muito alto.")',
  },
  quiz: [
    {
      pergunta: 'Quando o laço "while condicao:" para de repetir?',
      opcoes: [
        'Sempre depois de 10 voltas',
        'Quando a condição se torna falsa (ou um break é executado)',
        'Quando a condição se torna verdadeira',
        'Nunca, ele é infinito',
      ],
      correta: 1,
      explicacao:
        'O while testa a condição antes de cada volta: enquanto for verdadeira, repete; quando ' +
        'ficar falsa (ou um break rodar), o laço termina.',
    },
    {
      pergunta: 'O que a linha x = x + 1 faz?',
      opcoes: [
        'Compara x com x + 1',
        'Cria uma equação que o Python resolve',
        'Pega o valor atual de x, soma 1 e guarda de volta em x',
        'Sempre dá erro, pois x não pode estar dos dois lados',
      ],
      correta: 2,
      explicacao:
        'É reatribuição: o lado direito é calculado com o valor atual de x e o resultado é guardado ' +
        'de volta em x. Por isso x avança a cada volta do laço.',
    },
    {
      pergunta: 'Qual é a causa mais comum de um laço infinito?',
      opcoes: [
        'Usar print() dentro do laço',
        'Esquecer de atualizar a variável que faz a condição mudar',
        'Indentar o bloco com 4 espaços',
        'Usar números float',
      ],
      correta: 1,
      explicacao:
        'Se nada muda a cada volta, a condição continua verdadeira para sempre. A variável de ' +
        'atualização (ex.: x = x + 1) é o que aproxima o laço do fim.',
    },
    {
      pergunta: 'Para parar um laço quando dois floats ficam quase iguais, o melhor é:',
      opcoes: [
        'Testar com a == b',
        'Testar com abs(a - b) < tolerancia',
        'Nunca parar o laço',
        'Converter ambos para texto e comparar',
      ],
      correta: 1,
      explicacao:
        'Por causa do arredondamento, floats quase iguais raramente são exatamente iguais. Comparar ' +
        'a diferença com uma tolerância pequena é a forma segura.',
    },
  ],
  xp: 100,
};

export default cap07;
