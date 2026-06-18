import type { Capitulo } from '../src/types.js';

const cap20: Capitulo = {
  id: 20,
  titulo: 'Classes e métodos genéricos',
  conceitoEmFoco: {
    termo: 'Parâmetro de tipo',
    explicacao:
      'O <T> é um tipo "coringa": em vez de fixar String ou Integer, você escreve T e deixa ' +
      'a escolha do tipo real para a hora do uso. É como um molde de bolo que serve para ' +
      'qualquer massa — você decide o sabor (o tipo) só quando vai usar. Assim o mesmo código ' +
      'funciona com vários tipos, sem repetir nem perder a verificação do compilador.',
  },
  objetivos: [
    'Entender o que é um parâmetro de tipo <T>.',
    'Criar uma classe genérica que guarda qualquer tipo.',
    'Escrever um método genérico reutilizável.',
    'Usar tipos limitados (<T extends Comparable<T>>) para garantir capacidades.',
    'Conhecer o curinga ? para aceitar "qualquer tipo".',
  ],
  teoria: [
    {
      titulo: 'O que é um parâmetro de tipo',
      paragrafos: [
        'Sem genéricos, você precisaria de uma CaixaDeString, uma CaixaDeInteger, e assim por ' +
          'diante — código repetido. Com genéricos, escreve-se Caixa<T> uma única vez e o T é ' +
          'preenchido na hora do uso: Caixa<String> ou Caixa<Integer>.',
        'O T não é um tipo de verdade; é um espaço reservado. Quando você escreve Caixa<String>, ' +
          'o Java troca cada T por String para aquele uso. O ganho é grande: reaproveitamento de ' +
          'código com segurança de tipos (o compilador ainda checa tudo).',
      ],
    },
    {
      titulo: 'Métodos genéricos e tipos limitados',
      paragrafos: [
        'Um método também pode ter seu próprio parâmetro de tipo, declarado antes do tipo de ' +
          'retorno: public static <T> T meu(T x). Assim o mesmo método serve para vários tipos.',
        'Às vezes o T precisa ter alguma capacidade. Para comparar dois valores, eles precisam ' +
          'saber se comparar. Por isso usamos um tipo LIMITADO: <T extends Comparable<T>>. Isso ' +
          'diz "T pode ser qualquer tipo, desde que seja comparável", liberando o uso de ' +
          'compareTo dentro do método.',
      ],
    },
    {
      titulo: 'O curinga ?',
      paragrafos: [
        'Quando um método só precisa LER de uma estrutura genérica, sem se importar com o tipo ' +
          'exato, usa-se o curinga ?: Caixa<?> significa "uma Caixa de algum tipo, não importa ' +
          'qual". É mais flexível como parâmetro do que fixar Caixa<String>.',
        'A diferença para o T: o T dá um nome ao tipo (que você pode reutilizar no método); o ? é ' +
          'anônimo, indicado quando você não precisa nomear nem mexer no tipo, só observá-lo.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap20/Generico.java',
    descricao:
      'Uma classe genérica Caixa<T> que guarda e devolve qualquer tipo (demonstrada com String e ' +
      'com Integer) e um método genérico maior(a, b) com <T extends Comparable<T>> que devolve o ' +
      'maior de dois valores, testado com números e com Strings.',
    anotacoes: [
      { linha: 7, nota: 'Caixa<String>: o parâmetro de tipo T vira String só na hora do uso.' },
      { linha: 11, nota: 'A MESMA classe Caixa agora guarda Integer. Um único código serve a vários tipos.' },
      { linha: 25, nota: 'Método genérico com tipo limitado: <T extends Comparable<T>> exige que T saiba se comparar.' },
      { linha: 26, nota: 'Como T é Comparable, podemos chamar a.compareTo(b) com segurança. Devolve o maior.' },
      { linha: 30, nota: 'Curinga ?: aceita uma Caixa de QUALQUER tipo, só para ler o conteúdo.' },
      { linha: 36, nota: 'Declaração da classe genérica: <T> é o tipo coringa que quem usa a classe escolhe.' },
    ],
  },
  discussao: [
    'Genéricos evitam duplicação: um só Caixa<T> substitui dezenas de classes específicas, sem ' +
      'abrir mão da verificação de tipos em tempo de compilação.',
    'Tipos primitivos (int, double) não entram entre os <>; use as versões objeto (Integer, ' +
      'Double). Por isso usamos Caixa<Integer> e não Caixa<int>.',
    'O extends em <T extends Comparable<T>> não é herança de classe: é uma RESTRIÇÃO que diz ' +
      'quais capacidades o tipo precisa ter. Sem ela, o compilador não deixaria chamar compareTo.',
    'Pegadinha comum: tentar criar um objeto de T com new T() não funciona, porque o tipo real ' +
      'só é conhecido na hora do uso. Genéricos guardam e devolvem valores, mas não os fabricam.',
  ],
  desafio: {
    enunciado:
      'Crie um método genérico chamado primeiro que receba um array de T (T[]) e devolva o ' +
      'PRIMEIRO elemento (posição 0). No main, chame primeiro com um array de String e com um ' +
      'array de Integer, imprimindo cada resultado.',
    arquivoBase: 'examples/cap20/Desafio.java',
    dica: 'Declare o tipo antes do retorno: public static <T> T primeiro(T[] array) { return array[0]; }',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        String[] palavras = { "alfa", "beta", "gama" };\n' +
      '        Integer[] numeros = { 10, 20, 30 };\n' +
      '        System.out.println("Primeiro texto: " + primeiro(palavras));\n' +
      '        System.out.println("Primeiro numero: " + primeiro(numeros));\n' +
      '    }\n\n' +
      '    public static <T> T primeiro(T[] array) {\n' +
      '        return array[0];\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que representa o <T> em uma classe genérica?',
      opcoes: [
        'Um tipo fixo, sempre igual a String',
        'Um parâmetro de tipo: um coringa cujo tipo real é definido na hora do uso',
        'Uma variável comum de inteiro',
        'O nome obrigatório de um método',
      ],
      correta: 1,
      explicacao:
        'O T é um parâmetro de tipo (placeholder). Em Caixa<Integer>, cada T passa a valer Integer naquele uso.',
    },
    {
      pergunta: 'Para que serve o limite em <T extends Comparable<T>>?',
      opcoes: [
        'Fazer T herdar de Comparable como uma subclasse normal',
        'Impedir o uso de genéricos',
        'Garantir que T tenha a capacidade de se comparar (compareTo), liberando seu uso no método',
        'Converter T em texto automaticamente',
      ],
      correta: 2,
      explicacao:
        'O limite restringe T a tipos comparáveis, permitindo chamar compareTo com segurança dentro do método.',
    },
    {
      pergunta: 'O que significa Caixa<?> como tipo de um parâmetro?',
      opcoes: [
        'Uma Caixa vazia',
        'Uma Caixa de algum tipo, não importa qual (curinga)',
        'Uma Caixa que só aceita null',
        'Um erro de sintaxe',
      ],
      correta: 1,
      explicacao:
        'O ? é o curinga: aceita uma Caixa de qualquer tipo, útil quando só precisamos ler o conteúdo.',
    },
    {
      pergunta: 'Por que usamos Caixa<Integer> e não Caixa<int>?',
      opcoes: [
        'Porque int é mais lento',
        'Porque genéricos não aceitam tipos primitivos; usa-se a versão objeto (Integer)',
        'Porque int não existe em Java',
        'Não há diferença, ambos funcionam',
      ],
      correta: 1,
      explicacao:
        'Parâmetros de tipo só aceitam tipos de referência; por isso usamos os wrappers como Integer e Double.',
    },
  ],
  xp: 100,
};

export default cap20;
