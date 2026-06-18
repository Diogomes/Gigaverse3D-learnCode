import type { Capitulo } from '../src/types.js';

const cap15: Capitulo = {
  id: 15,
  titulo: 'Classes e objetos',
  paradigma: 'oo',
  conceitoEmFoco: {
    termo: 'Classe vs. objeto (instância)',
    explicacao:
      'Uma CLASSE é um TIPO novo que você define — um molde que descreve quais atributos um ' +
      'objeto desse tipo terá. Um OBJETO (ou instância) é um exemplar concreto feito a partir ' +
      'desse molde. A classe Ponto é a planta; cada Ponto(0, 0) que você cria é uma casa ' +
      'construída a partir dela. A planta é uma só; as casas podem ser muitas, cada uma com ' +
      'seus próprios valores.',
  },
  objetivos: [
    'Definir uma classe com a palavra class e um método __init__.',
    'Guardar atributos de instância usando self dentro do __init__.',
    'Criar objetos (instâncias) chamando a classe como se fosse uma função: Ponto(0, 0).',
    'Escrever funções que recebem objetos, leem seus atributos e até devolvem novos objetos.',
    'Entender que objetos são mutáveis e passados por referência.',
  ],
  teoria: [
    {
      titulo: 'Definindo uma classe',
      paragrafos: [
        'A palavra class cria um TIPO novo. Dentro dela, o método especial __init__ é chamado ' +
          'automaticamente toda vez que um objeto é criado — é onde você prepara o objeto recém-' +
          'nascido. O primeiro parâmetro, self, é o próprio objeto que está sendo construído.',
        'Atribuir self.x = x dentro do __init__ guarda um ATRIBUTO DE INSTÂNCIA: um valor que ' +
          'pertence àquele objeto específico. Cada instância tem sua própria cópia desses ' +
          'atributos, independente das outras.',
      ],
    },
    {
      titulo: 'Criando e usando objetos',
      paragrafos: [
        'Para criar um objeto, você chama a classe como se fosse uma função: ponto = Ponto(0, 0). ' +
          'Os argumentos vão para o __init__ (depois do self, que o Python preenche sozinho). O ' +
          'resultado é uma instância guardada na variável.',
        'Depois, acessa-se cada atributo com ponto.x e ponto.y. Funções comuns podem receber esses ' +
          'objetos como argumento, ler seus atributos para calcular algo e até construir e DEVOLVER ' +
          'um objeto novo como resultado.',
      ],
    },
    {
      titulo: 'Objetos são mutáveis e passados por referência',
      paragrafos: [
        'Diferente de um número, um objeto é MUTÁVEL: dá para mudar seus atributos depois de criado ' +
          '(ponto.x = 10). E quando você passa um objeto para uma função, passa uma REFERÊNCIA a ' +
          'ele, não uma cópia. Por isso, se a função altera um atributo, a mudança vale lá fora.',
        'Isso é poderoso, mas exige atenção: dois nomes podem apontar para o MESMO objeto. Mexer ' +
          'por um nome reflete no outro. Criar um Ponto novo (em vez de alterar o existente) é a ' +
          'forma de garantir que você não está bagunçando o objeto de outra pessoa.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap15/objetos.py',
    descricao:
      'Define as classes Ponto e Retangulo, cria instâncias e usa funções que calculam a área, ' +
      'devolvem o centro como um novo Ponto e movem um ponto, mostrando a mutabilidade.',
    anotacoes: [
      {
        linha: 8,
        nota:
          'class Ponto: cria um TIPO novo. O __init__ logo abaixo é executado quando criamos cada ' +
          'objeto; self é o próprio objeto que está nascendo.',
      },
      {
        linha: 10,
        nota:
          'self.x = x guarda um ATRIBUTO DE INSTÂNCIA. A partir daqui, todo Ponto criado terá seu ' +
          'próprio x (e, na linha seguinte, seu próprio y).',
      },
      {
        linha: 23,
        nota:
          'area(ret) RECEBE um objeto e lê seus atributos (ret.largura, ret.altura) para calcular ' +
          'um valor. A função não precisa estar dentro da classe para usar o objeto.',
      },
      {
        linha: 31,
        nota:
          'Aqui uma função RETORNA um objeto: Ponto(cx, cy) constrói e devolve um Ponto novinho, ' +
          'que quem chamou guarda em uma variável.',
      },
      {
        linha: 56,
        nota:
          'mover(c, 1, 1) altera os atributos de c. Como objetos são passados por referência, a ' +
          'mudança vale fora da função — mas origem continua intacto, pois é outro objeto.',
      },
    ],
  },
  discussao: [
    'A classe é o MOLDE; o objeto é o EXEMPLAR. Ponto é o tipo que você definiu uma vez; ' +
      'origem = Ponto(0, 0) e c = Ponto(2, 3) são dois objetos distintos feitos desse molde.',
    'Cada instância tem seus PRÓPRIOS atributos. Mudar origem.x não mexe no x de outro Ponto: ' +
      'eles são independentes, mesmo sendo do mesmo tipo.',
    'Objetos são MUTÁVEIS e passados por REFERÊNCIA. Se você passa um objeto para uma função e ' +
      'ela altera um atributo, a alteração aparece lá fora também — não foi feita uma cópia.',
    'Você precisa CRIAR a instância antes de usá-la: escrever Ponto.x dá erro; o certo é primeiro ' +
      'p = Ponto(0, 0) e depois p.x. A classe sozinha não tem valores de atributo prontos.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap15/desafio.py. Complete o __init__ da classe Circulo para guardar ' +
      'centro e raio em self, e a função perimetro() para devolver 2 * 3.14159 * raio. Rode e ' +
      'confira: deve imprimir um perímetro próximo de 31.4159.',
    arquivoBase: 'examples/cap15/desafio.py',
    dica:
      'No __init__, faça self.centro = centro e self.raio = raio. Em perimetro(circ), use o ' +
      'atributo do objeto recebido: return 2 * 3.14159 * circ.raio.',
    solucao:
      'class Circulo:\n' +
      '    def __init__(self, centro, raio):\n' +
      '        self.centro = centro\n' +
      '        self.raio = raio\n' +
      '\n' +
      'def perimetro(circ):\n' +
      '    return 2 * 3.14159 * circ.raio',
  },
  quiz: [
    {
      pergunta: 'Qual é a diferença entre uma classe e um objeto?',
      opcoes: [
        'São a mesma coisa, só nomes diferentes',
        'A classe é o molde (o tipo); o objeto é um exemplar concreto criado a partir dela',
        'O objeto é o molde; a classe é o exemplar',
        'A classe só existe em Java, não em Python',
      ],
      correta: 1,
      explicacao:
        'A classe define o tipo (a planta); cada objeto é uma instância concreta feita a partir ' +
        'desse molde, com seus próprios valores de atributo.',
    },
    {
      pergunta: 'Dentro do __init__, o que faz a linha self.x = x?',
      opcoes: [
        'Cria uma variável solta que some depois',
        'Guarda x como um atributo DAQUELE objeto (instância)',
        'Define o tipo da classe',
        'Imprime o valor de x na tela',
      ],
      correta: 1,
      explicacao:
        'self é o próprio objeto; self.x = x grava o valor como atributo de instância, que cada ' +
        'objeto carrega por conta própria.',
    },
    {
      pergunta: 'Como se cria um objeto a partir da classe Ponto?',
      opcoes: ['Ponto.new()', 'new Ponto()', 'Ponto(0, 0)', 'create Ponto'],
      correta: 2,
      explicacao:
        'Em Python, chama-se a classe como uma função: Ponto(0, 0). Os argumentos vão para o ' +
        '__init__ e o resultado é a nova instância.',
    },
    {
      pergunta:
        'Uma função recebe um objeto e altera um de seus atributos. O que acontece lá fora?',
      opcoes: [
        'Nada: a função recebeu uma cópia',
        'A alteração vale lá fora, pois objetos são passados por referência',
        'Dá erro de execução',
        'O objeto vira somente leitura dentro da função',
      ],
      correta: 1,
      explicacao:
        'Objetos são mutáveis e passados por referência: a função mexe no mesmo objeto, então a ' +
        'mudança aparece para quem chamou.',
    },
  ],
  xp: 100,
};

export default cap15;
