import type { Capitulo } from '../src/types.js';

const cap08: Capitulo = {
  id: 8,
  titulo: 'Classes e objetos: um exame mais profundo',
  conceitoEmFoco: {
    termo: 'Referência this',
    explicacao:
      'Dentro de um método ou construtor, this aponta para o PRÓPRIO objeto que está ' +
      'executando. Ele é útil principalmente quando um parâmetro tem o mesmo nome de um ' +
      'atributo: this.hora se refere ao atributo do objeto, enquanto hora (sem this) se refere ' +
      'ao parâmetro recebido. Sem o this, os dois nomes se confundiriam.',
  },
  objetivos: [
    'Usar this para distinguir atributos de parâmetros.',
    'Validar dados dentro do construtor.',
    'Formatar saída com String.format.',
    'Criar e usar um enum (conjunto fixo de valores nomeados).',
    'Reconhecer membros final (que não mudam).',
  ],
  teoria: [
    {
      titulo: 'this: "eu mesmo"',
      paragrafos: [
        'Quando o parâmetro do construtor se chama igual ao atributo (hora e hora), o Java ' +
          'precisa saber a quem você se refere. this.hora = hora; significa: "o atributo deste ' +
          'objeto recebe o valor do parâmetro".',
        'this também permite um objeto chamar seus próprios métodos e até passar a si mesmo como ' +
          'argumento para outro objeto.',
      ],
    },
    {
      titulo: 'Validação e final',
      paragrafos: [
        'O construtor é o lugar ideal para validar: se a hora vier fora de 0–23, guardamos 0. ' +
          'Assim o objeto nunca nasce num estado inválido.',
        'Um campo final só pode ser atribuído uma vez (no construtor) e depois não muda. É útil ' +
          'para valores constantes do objeto, como o símbolo de um naipe.',
      ],
    },
    {
      titulo: 'enum: valores nomeados',
      paragrafos: [
        'Um enum define um conjunto FIXO de valores possíveis (OUROS, ESPADAS, COPAS, PAUS). ' +
          'Em vez de usar números mágicos ou textos soltos, você usa nomes seguros que o ' +
          'compilador conhece.',
        'Em Java o enum é poderoso: pode ter atributos, construtor e métodos, como uma classe. ' +
          'No exemplo, cada naipe carrega o seu símbolo.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap08/Tempo.java',
    descricao:
      'Uma classe Hora que valida hora/minuto/segundo e formata como HH:MM:SS, além de um enum ' +
      'Naipe com símbolo associado a cada valor.',
    anotacoes: [
      { linha: 6, nota: 'Cria um objeto Hora válido. Os argumentos vão para o construtor.' },
      { linha: 20, nota: 'enum: define um conjunto fixo de valores. Aqui, os quatro naipes de um baralho.' },
      { linha: 23, nota: 'Campo final: depois de definido no construtor, o símbolo do naipe não muda mais.' },
      { linha: 35, nota: 'this.hora é o ATRIBUTO do objeto; hora (sem this) é o PARÂMETRO. O this desfaz a ambiguidade.' },
      { linha: 42, nota: 'String.format monta o texto formatado. %02d garante 2 dígitos com zero à esquerda (ex.: 05).' },
    ],
  },
  discussao: [
    'this é obrigatório quando parâmetro e atributo têm o mesmo nome; em outros casos é ' +
      'opcional, mas pode deixar o código mais claro.',
    'Validar no construtor garante objetos sempre consistentes — é melhor barrar dados ruins na ' +
      'entrada do que conviver com estados inválidos.',
    'enum não é "só um número": é um tipo seguro. O compilador impede valores fora do conjunto.',
    'final comunica intenção: "isto não deve mudar". Ajuda a evitar alterações acidentais.',
  ],
  desafio: {
    enunciado:
      'Crie uma classe Retangulo com atributos privados largura e altura. Use this no ' +
      'construtor e crie um método area() que devolve largura * altura. No main, crie um ' +
      'retângulo 3x4 e imprima a área (deve dar 12).',
    arquivoBase: 'examples/cap08/Desafio.java',
    dica: 'No construtor, use this.largura = largura; e this.altura = altura;. O método area() retorna o produto.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Retangulo r = new Retangulo(3, 4);\n' +
      '        System.out.println("Area: " + r.area());\n' +
      '    }\n' +
      '}\n\n' +
      'class Retangulo {\n' +
      '    private int largura;\n' +
      '    private int altura;\n' +
      '    public Retangulo(int largura, int altura) {\n' +
      '        this.largura = largura;\n' +
      '        this.altura = altura;\n' +
      '    }\n' +
      '    public int area() { return largura * altura; }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Para que serve a referência this dentro de um construtor?',
      opcoes: [
        'Criar um novo objeto',
        'Apontar para o próprio objeto, distinguindo atributo de parâmetro de mesmo nome',
        'Encerrar o programa',
        'Tornar o método static',
      ],
      correta: 1,
      explicacao: 'this refere-se ao objeto atual; this.x = x atribui ao atributo o valor do parâmetro homônimo.',
    },
    {
      pergunta: 'O que caracteriza um campo final?',
      opcoes: [
        'É sempre privado',
        'Só pode ser atribuído uma vez e depois não muda',
        'Pertence à classe, não ao objeto',
        'É o último campo declarado',
      ],
      correta: 1,
      explicacao: 'Um campo final recebe valor uma vez (em geral no construtor) e permanece constante.',
    },
    {
      pergunta: 'O que é um enum em Java?',
      opcoes: [
        'Um tipo com um conjunto fixo de valores nomeados',
        'Uma lista que cresce dinamicamente',
        'Um sinônimo de int',
        'Um método especial',
      ],
      correta: 0,
      explicacao: 'enum define um conjunto fechado de constantes nomeadas; em Java pode ter atributos e métodos.',
    },
  ],
  xp: 100,
};

export default cap08;
