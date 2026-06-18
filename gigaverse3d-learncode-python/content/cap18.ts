import type { Capitulo } from '../src/types.js';

const cap18: Capitulo = {
  id: 18,
  titulo: 'Herança',
  paradigma: 'oo',
  conceitoEmFoco: {
    termo: 'Herança',
    explicacao:
      'HERANÇA é quando uma classe FILHA deriva de outra (a classe PAI) e já nasce com tudo o ' +
      'que o pai tem: atributos e métodos. A filha reaproveita o que serve e pode SOBRESCREVER o ' +
      'que precisa mudar, redefinindo um método com o mesmo nome. A ideia é não repetir código: ' +
      'em vez de copiar, você diz "sou como o pai, MAS com estas diferenças". Escreve-se assim: ' +
      'class Filha(Pai):.',
  },
  objetivos: [
    'Criar uma classe filha que herda de outra com class Filha(Pai):.',
    'Reaproveitar atributos e métodos do pai sem reescrevê-los.',
    'Sobrescrever um método na filha e chamar o construtor do pai com super().__init__().',
    'Usar isinstance() para verificar o tipo de um objeto respeitando a herança.',
    'Distinguir herança de composição (uma classe que contém objetos de outra).',
  ],
  teoria: [
    {
      titulo: 'Classe pai e classe filha',
      paragrafos: [
        'Herança serve para reaproveitar código. Você define uma classe PAI com o comportamento ' +
          'comum e, depois, uma classe FILHA com class Filha(Pai):. A filha já começa com todos os ' +
          'métodos e atributos do pai, de graça — você só escreve o que é diferente. É a relação ' +
          '"é um(a)": uma Mão É UM tipo de coleção de cartas, então pode herdar de Baralho.',
        'Quando a filha tem o seu próprio __init__, o construtor do pai NÃO é chamado sozinho. ' +
          'Para reaproveitar a montagem feita pelo pai, use super().__init__(): super() é uma ' +
          'referência ao pai, e assim você executa o construtor dele antes de acrescentar o que é ' +
          'só da filha.',
      ],
    },
    {
      titulo: 'Sobrescrever métodos',
      paragrafos: [
        'SOBRESCREVER (override) é definir, na filha, um método com o MESMO nome de um do pai. A ' +
          'versão da filha "vence" e é a que roda para os objetos dela. No exemplo, Baralho tem um ' +
          '__str__ que conta as cartas; Mao redefine __str__ para mostrar o dono e as cartas — o ' +
          'mesmo nome, comportamento diferente.',
        'A filha também pode ACRESCENTAR métodos que o pai não tem (em Mao, o método receber()). ' +
          'Então uma filha pode: herdar igual, sobrescrever o que muda e adicionar o que é novo — ' +
          'tudo na mesma classe.',
      ],
    },
    {
      titulo: 'isinstance e composição',
      paragrafos: [
        'isinstance(objeto, Classe) devolve True se o objeto é daquela classe — e respeita a ' +
          'herança: como Mao herda de Baralho, uma Mao é instância de Mao E também de Baralho. Já ' +
          'um Baralho comum NÃO é uma Mao, porque a herança vale só de baixo para cima.',
        'COMPOSIÇÃO é diferente de herança: em vez de "ser um", é "ter um". O Baralho não herda de ' +
          'Carta — ele CONTÉM uma lista de Cartas dentro de si (self.cartas). Use herança para ' +
          'especializar um tipo; use composição para montar um objeto a partir de outros.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap18/cartas.py',
    descricao:
      'Um mini jogo de cartas: Carta (com __init__ e __str__), Baralho (que CONTÉM uma lista de ' +
      'Cartas e sabe embaralhar/distribuir) e Mao, que HERDA de Baralho, acrescenta receber() e ' +
      'sobrescreve __str__. Usa random.seed(0) para a saída ser sempre a mesma.',
    anotacoes: [
      {
        linha: 16,
        nota:
          '__str__ é um método especial: define o texto que aparece quando você faz print() do ' +
          'objeto. Aqui uma Carta vira algo como "A de Paus".',
      },
      {
        linha: 21,
        nota:
          'COMPOSIÇÃO em ação: o Baralho não herda de Carta — ele CONTÉM uma lista de objetos ' +
          'Carta em self.cartas. É a relação "tem um", não "é um".',
      },
      {
        linha: 41,
        nota:
          'class Mao(Baralho): é a HERANÇA. Mao nasce com tudo de Baralho (cartas, embaralhar, ' +
          'distribuir) sem reescrever nada.',
      },
      {
        linha: 45,
        nota:
          'super().__init__() chama o construtor do PAI (Baralho) para reaproveitar a montagem. ' +
          'Logo depois esvaziamos as cartas, porque uma mão começa vazia.',
      },
      {
        linha: 55,
        nota:
          'Aqui Mao SOBRESCREVE o __str__ herdado de Baralho: mesmo nome, comportamento diferente. ' +
          'A versão da filha é a que roda para objetos Mao.',
      },
    ],
  },
  discussao: [
    'A filha herda TUDO do pai — atributos e métodos — e pode sobrescrever o que quiser. Mao ' +
      'ganhou embaralhar() e distribuir() de graça, mas redefiniu __str__. Sobrescrever é só ' +
      'declarar um método com o mesmo nome: a versão da filha passa a valer.',
    'Se a filha tem o próprio __init__, o construtor do pai NÃO roda sozinho. Esquecer o ' +
      'super().__init__() é um erro clássico: os atributos montados pelo pai não existirão, e você ' +
      'toma um AttributeError ao tentar usá-los.',
    'isinstance respeita a herança: isinstance(mao, Baralho) é True porque Mao herda de Baralho. ' +
      'Mas o contrário não vale — um Baralho comum não é uma Mao. A relação só sobe na árvore.',
    'Herança não é a única forma de reaproveitar. COMPOSIÇÃO ("ter um") costuma ser mais simples: ' +
      'o Baralho CONTÉM Cartas em vez de herdar delas. Use herança quando a filha realmente "é um" ' +
      'tipo do pai; caso contrário, prefira composição.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap18/desafio.py. Há uma classe Animal (o pai). Faça a classe Cachorro HERDAR ' +
      'de Animal (class Cachorro(Animal):) e SOBRESCREVER o método falar() para devolver "Au au!". ' +
      'Rode e confira: deve sair "Rex diz: Au au!".',
    arquivoBase: 'examples/cap18/desafio.py',
    dica:
      'Troque class Cachorro: por class Cachorro(Animal): para herdar __init__ e apresentar(). ' +
      'Dentro dela, defina def falar(self): return "Au au!" — esse método sobrescreve o do pai.',
    solucao:
      'class Cachorro(Animal):\n' +
      '    def falar(self):\n' +
      '        return "Au au!"\n' +
      '\n' +
      'rex = Cachorro("Rex")\n' +
      'print(rex.apresentar())',
  },
  quiz: [
    {
      pergunta: 'Como se declara que a classe Mao herda da classe Baralho?',
      opcoes: ['class Mao: Baralho', 'class Mao(Baralho):', 'class Mao -> Baralho:', 'Mao = Baralho()'],
      correta: 1,
      explicacao:
        'A sintaxe da herança é class Filha(Pai):. Assim Mao recebe todos os atributos e métodos ' +
        'de Baralho.',
    },
    {
      pergunta: 'Para que serve super().__init__() dentro do __init__ da classe filha?',
      opcoes: [
        'Cria uma nova classe pai',
        'Chama o construtor do PAI para reaproveitar a montagem dele',
        'Apaga os atributos herdados',
        'Verifica o tipo do objeto',
      ],
      correta: 1,
      explicacao:
        'super() referencia o pai; super().__init__() executa o construtor dele. Sem isso, os ' +
        'atributos montados pelo pai não existiriam no objeto da filha.',
    },
    {
      pergunta: 'Se Mao herda de Baralho e mao = Mao(), o que isinstance(mao, Baralho) devolve?',
      opcoes: ['False', 'True', 'Dá erro', 'Depende das cartas'],
      correta: 1,
      explicacao:
        'isinstance respeita a herança: como Mao herda de Baralho, uma Mao também é instância de ' +
        'Baralho. Por isso o resultado é True.',
    },
    {
      pergunta: 'O Baralho guarda uma lista de Cartas dentro de si (self.cartas). Isso é um exemplo de:',
      opcoes: ['Herança', 'Composição (ter um)', 'Sobrescrita', 'Erro de sintaxe'],
      correta: 1,
      explicacao:
        'É composição: o Baralho CONTÉM Cartas ("tem um"), em vez de derivar de Carta. Herança ' +
        'seria a relação "é um".',
    },
  ],
  xp: 100,
};

export default cap18;
