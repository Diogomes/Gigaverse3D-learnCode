import type { Capitulo } from '../src/types.js';

const cap17: Capitulo = {
  id: 17,
  titulo: 'Classes e métodos',
  paradigma: 'oo',
  conceitoEmFoco: {
    termo: 'Método e self',
    explicacao:
      'Um MÉTODO é uma função que PERTENCE a um objeto: em vez de viver solta, ela mora dentro ' +
      'da classe e age sobre os dados daquele objeto. O segredo é o primeiro parâmetro, chamado ' +
      'por convenção de self: ele é o PRÓPRIO objeto que está executando o método naquele ' +
      'momento. Quando você escreve t1.em_segundos(), o Python entrega t1 como self. Por isso ' +
      'dentro do método você acessa os dados com self.hora, self.minuto — é o objeto falando de ' +
      'si mesmo.',
  },
  objetivos: [
    'Transformar funções soltas em MÉTODOS escritos dentro de uma classe.',
    'Entender o parâmetro self como o próprio objeto que executa o método.',
    'Usar __init__ (o construtor) para guardar dados ao criar o objeto.',
    'Definir __str__ para controlar como o objeto vira texto no print().',
    'Habilitar o operador + entre objetos com a sobrecarga __add__.',
  ],
  teoria: [
    {
      titulo: 'De função a método: o self',
      paragrafos: [
        'Até agora as funções viviam soltas no programa. Um MÉTODO é o mesmo conceito, mas escrito ' +
          'DENTRO de uma classe e ligado a um objeto. A diferença visível é o primeiro parâmetro: ' +
          'self. Ele representa o objeto que está executando o método naquele instante.',
        'O detalhe que confunde no começo: você NÃO passa self ao chamar. Em t1.em_segundos() o ' +
          'Python preenche self com t1 sozinho. Você só escreve self na DEFINIÇÃO do método; na ' +
          'CHAMADA, o objeto antes do ponto já vira o self.',
      ],
    },
    {
      titulo: '__init__: o construtor',
      paragrafos: [
        'O método __init__ é especial: o Python o executa AUTOMATICAMENTE toda vez que você cria ' +
          'um objeto. Em Tempo(1, 30, 45), o 1, o 30 e o 45 chegam como hora, minuto e segundo, e ' +
          'o __init__ guarda cada um dentro do objeto com self.hora = hora, e assim por diante.',
        'É no __init__ que o objeto nasce com seus dados (seus ATRIBUTOS). Depois disso, qualquer ' +
          'outro método pode lê-los através de self. Pense no __init__ como a "linha de montagem" ' +
          'que prepara o objeto antes de você usá-lo.',
      ],
    },
    {
      titulo: 'Métodos especiais: __str__ e __add__',
      paragrafos: [
        'Métodos com nome entre dois underscores são "mágicos": o Python os chama em situações ' +
          'específicas. __str__ é chamado quando o objeto precisa virar TEXTO — por exemplo dentro ' +
          'de print() ou str(). Defina-o e print(t1) mostra exatamente o que você quiser.',
        '__add__ é acionado pelo operador +. Quando você escreve t1 + t2, o Python traduz isso ' +
          'para t1.__add__(t2): self é t1 e o outro objeto chega como parâmetro. Isso se chama ' +
          'SOBRECARGA de operador: dar um significado próprio ao + para os SEUS objetos.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap17/metodos.py',
    descricao:
      'Define a classe Tempo com __init__, __str__ (formato hh:mm:ss) e __add__. Cria dois ' +
      'Tempos, imprime cada um e imprime a soma com o operador +.',
    anotacoes: [
      {
        linha: 9,
        nota:
          '__init__ é o construtor: roda sozinho quando fazemos Tempo(1, 30, 45). Recebe self (o ' +
          'objeto novo) e os três valores, que guarda em self.hora, self.minuto e self.segundo.',
      },
      {
        linha: 17,
        nota:
          '__str__ devolve o texto do objeto. O f-string com :02d formata cada número com dois ' +
          'dígitos, produzindo "01:30:45". É este texto que o print() vai mostrar.',
      },
      {
        linha: 21,
        nota:
          '__add__ define o que o + faz entre dois Tempos. self é o objeto da esquerda e outro é o ' +
          'da direita; devolvemos um NOVO Tempo com a soma, sem alterar os originais.',
      },
      {
        linha: 42,
        nota:
          'print("t1 =", t1) chama __str__ por baixo dos panos para transformar t1 em texto. Você ' +
          'não escreve t1.__str__() — o print() faz isso por você.',
      },
      {
        linha: 46,
        nota:
          't1 + t2 aciona o __add__ que definimos: o Python o traduz em t1.__add__(t2) e guarda o ' +
          'Tempo resultante em soma.',
      },
    ],
  },
  discussao: [
    'Todo método recebe self como PRIMEIRO parâmetro na definição, mas você NÃO o passa na ' +
      'chamada. t1.em_segundos() não leva argumentos: o Python entrega t1 como self sozinho. ' +
      'Esquecer o self na definição é um dos erros mais comuns de quem começa em orientação a objetos.',
    'O __init__ NÃO é "chamado por você": ele roda automaticamente quando você cria o objeto com ' +
      'Tempo(...). Não escreva t1.__init__() à mão — basta Tempo(1, 30, 45) e o construtor dispara.',
    '__str__ só é usado quando o objeto vira texto (print, str()). Se você esquecer de defini-lo, ' +
      'print(t1) mostra algo feio como <__main__.Tempo object at 0x...> — o endereço na memória, ' +
      'não os dados.',
    'O + entre objetos só funciona se a classe tiver __add__. Sem esse método, t1 + t2 levanta ' +
      'TypeError: unsupported operand type(s). Sobrecarregar operadores é opcional — só faça quando ' +
      'a "soma" tiver um significado claro.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap17/desafio.py. Complete a classe Ponto: escreva o __init__ para guardar ' +
      'x e y, o __str__ para devolver "(x, y)" e o __add__ para somar dois pontos coordenada a ' +
      'coordenada. Descomente as últimas linhas e rode para conferir.',
    arquivoBase: 'examples/cap17/desafio.py',
    dica:
      'No __init__ faça self.x = x e self.y = y. No __str__ use um f-string: f"({self.x}, ' +
      '{self.y})". No __add__ devolva Ponto(self.x + outro.x, self.y + outro.y).',
    solucao:
      'class Ponto:\n' +
      '    def __init__(self, x, y):\n' +
      '        self.x = x\n' +
      '        self.y = y\n' +
      '\n' +
      '    def __str__(self):\n' +
      '        return f"({self.x}, {self.y})"\n' +
      '\n' +
      '    def __add__(self, outro):\n' +
      '        return Ponto(self.x + outro.x, self.y + outro.y)\n' +
      '\n' +
      'p1 = Ponto(1, 2)\n' +
      'p2 = Ponto(3, 4)\n' +
      'print(p1)\n' +
      'print(p1 + p2)',
  },
  quiz: [
    {
      pergunta: 'No método def em_segundos(self):, quem é o self quando chamamos t1.em_segundos()?',
      opcoes: [
        'Um valor que precisamos passar entre os parênteses',
        'O próprio objeto t1, entregue automaticamente pelo Python',
        'A classe Tempo inteira',
        'Sempre o número 0',
      ],
      correta: 1,
      explicacao:
        'self é o objeto que executa o método. Em t1.em_segundos(), o Python preenche self com ' +
        't1 sozinho — você não passa nada entre os parênteses.',
    },
    {
      pergunta: 'Quando o método __init__ é executado?',
      opcoes: [
        'Toda vez que imprimimos o objeto',
        'Automaticamente, quando criamos o objeto com Tempo(...)',
        'Apenas se chamarmos t1.__init__() à mão',
        'Quando usamos o operador +',
      ],
      correta: 1,
      explicacao:
        '__init__ é o construtor: o Python o chama sozinho no momento em que o objeto é criado, ' +
        'para guardar os dados iniciais.',
    },
    {
      pergunta: 'Qual método o print(t1) usa para transformar o objeto em texto?',
      opcoes: ['__init__', '__add__', '__str__', '__print__'],
      correta: 2,
      explicacao:
        '__str__ define a representação em texto do objeto e é chamado por print() e str().',
    },
    {
      pergunta: 'O que permite que t1 + t2 funcione entre dois objetos Tempo?',
      opcoes: [
        'O método __add__ definido na classe',
        'O método __init__',
        'Nada: o + sempre funciona entre quaisquer objetos',
        'O parâmetro self',
      ],
      correta: 0,
      explicacao:
        'O + entre objetos chama __add__. Sem esse método, o Python levanta TypeError porque não ' +
        'sabe como somar dois Tempos.',
    },
  ],
  xp: 100,
};

export default cap17;
