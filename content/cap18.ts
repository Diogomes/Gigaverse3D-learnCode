import type { Capitulo } from '../src/types.js';

const cap18: Capitulo = {
  id: 18,
  titulo: 'Recursão',
  conceitoEmFoco: {
    termo: 'Recursão',
    explicacao:
      'Recursão é quando um método chama a si mesmo para resolver uma versão menor do mesmo ' +
      'problema. A cada chamada o problema fica um pouco menor, sempre caminhando para um ' +
      'caso-base — uma situação simples que NÃO chama de novo e encerra a cadeia. É como abrir ' +
      'uma boneca russa: você abre uma, dentro tem outra menor, até chegar na menorzinha que ' +
      'não abre mais.',
  },
  objetivos: [
    'Entender que um método pode chamar a si mesmo.',
    'Distinguir o caso-base do caso recursivo.',
    'Acompanhar como as chamadas se empilham e voltam (pilha de chamadas).',
    'Resolver fatorial, Fibonacci e Torre de Hanói com recursão.',
    'Comparar recursão e iteração (laços) e saber quando cada uma ajuda.',
  ],
  teoria: [
    {
      titulo: 'Caso-base e caso recursivo',
      paragrafos: [
        'Toda recursão precisa de duas partes. O caso-base é a condição simples que devolve uma ' +
          'resposta direta, SEM chamar o método de novo — por exemplo, fatorial de 1 é 1. O caso ' +
          'recursivo é o que chama o próprio método com um valor menor, aproximando-se do caso-base.',
        'Se esquecer o caso-base (ou se ele nunca for alcançado), o método chama a si mesmo para ' +
          'sempre e o programa estoura com StackOverflowError. Por isso o caso recursivo precisa ' +
          'sempre "encolher" o problema em direção ao caso-base.',
      ],
    },
    {
      titulo: 'A pilha de chamadas',
      paragrafos: [
        'Cada vez que um método é chamado, o Java guarda esse momento numa estrutura chamada ' +
          'pilha de chamadas. Numa recursão, fatorial(5) chama fatorial(4), que chama fatorial(3)... ' +
          'as chamadas vão se EMPILHANDO, uma esperando a outra terminar.',
        'Quando o caso-base é atingido, as respostas voltam na ordem inversa: a última chamada ' +
          'devolve primeiro, depois a anterior, até a primeira. É esse "ir e voltar" que monta o ' +
          'resultado final. Entender a pilha ajuda a prever a ordem dos passos da Torre de Hanói.',
      ],
    },
    {
      titulo: 'Recursão vs iteração',
      paragrafos: [
        'Quase tudo que se faz com recursão também dá para fazer com um laço (iteração), e vice-versa. ' +
          'A recursão costuma deixar o código mais curto e parecido com a definição matemática do ' +
          'problema; a iteração costuma gastar menos memória, pois não empilha chamadas.',
        'Fibonacci recursivo é didático, mas recalcula os mesmos termos várias vezes — fica lento ' +
          'para n grande. Já a Torre de Hanói é um caso onde a recursão brilha: a solução iterativa ' +
          'seria bem mais complicada de escrever.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap18/Recursao.java',
    descricao:
      'Três clássicos da recursão num só programa: fatorial de 5, os 10 primeiros termos de ' +
      'Fibonacci e a Torre de Hanói com 3 discos imprimindo cada movimento no terminal.',
    anotacoes: [
      { linha: 23, nota: 'Caso-base do fatorial: quando n <= 1 a resposta é 1 e a recursão para.' },
      { linha: 26, nota: 'Caso recursivo: n * fatorial(n-1). O argumento diminui, caminhando para o caso-base.' },
      { linha: 31, nota: 'Fibonacci tem dois casos-base: fib(0)=0 e fib(1)=1 (cobertos por n < 2).' },
      { linha: 34, nota: 'Aqui o método chama a si mesmo DUAS vezes; por isso recalcula termos e fica lento.' },
      { linha: 39, nota: 'Caso-base da Hanói: um único disco vai direto da origem para o destino.' },
      { linha: 44, nota: 'Os três passos da Hanói: mover os de cima para o apoio, mover o maior, e trazer de volta.' },
    ],
  },
  discussao: [
    'Sempre escreva o caso-base PRIMEIRO ao pensar numa recursão: é ele que garante o fim.',
    'A pilha de chamadas tem limite: recursão muito profunda (ou sem caso-base) causa ' +
      'StackOverflowError. Cada chamada ocupa um espaço até retornar.',
    'Fibonacci recursivo "puro" repete cálculos — fib(5) recalcula fib(3) várias vezes. Para n ' +
      'grande, prefira iteração ou guarde resultados já calculados (memoização).',
    'Na Torre de Hanói, n discos exigem 2^n − 1 movimentos: 3 discos dão 7 passos, como na saída. ' +
      'A recursão expressa essa regra de forma muito natural.',
  ],
  desafio: {
    enunciado:
      'Crie um método recursivo somaAteN(int n) que devolve a soma de 1 até n ' +
      '(1 + 2 + ... + n). Use um caso-base (quando n vale 1, a soma é 1) e um caso recursivo ' +
      '(n + somaAteN(n - 1)). No main, imprima somaAteN(5) — deve dar 15.',
    arquivoBase: 'examples/cap18/Desafio.java',
    dica: 'O caso-base é if (n <= 1) return n;. O caso recursivo é return n + somaAteN(n - 1);.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Soma ate 5: " + somaAteN(5));\n' +
      '    }\n\n' +
      '    static int somaAteN(int n) {\n' +
      '        if (n <= 1) {\n' +
      '            return n;            // caso-base\n' +
      '        }\n' +
      '        return n + somaAteN(n - 1);   // caso recursivo\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que é o caso-base de uma recursão?',
      opcoes: [
        'A condição simples que devolve uma resposta sem chamar o método de novo',
        'A primeira linha do método main',
        'Um laço for que repete a chamada',
        'O nome do parâmetro recebido',
      ],
      correta: 0,
      explicacao:
        'O caso-base encerra a recursão: ele responde diretamente, sem chamar o método novamente.',
    },
    {
      pergunta: 'O que acontece se a recursão nunca alcança o caso-base?',
      opcoes: [
        'O programa fica mais rápido',
        'O resultado é sempre zero',
        'O método chama a si mesmo sem parar e ocorre StackOverflowError',
        'O Java ignora as chamadas extras',
      ],
      correta: 2,
      explicacao:
        'Sem chegar ao caso-base, as chamadas se empilham indefinidamente até estourar a pilha.',
    },
    {
      pergunta: 'No fatorial recursivo, qual é o caso recursivo?',
      opcoes: [
        'return 1;',
        'return n * fatorial(n - 1);',
        'return n + 1;',
        'return fatorial(n);',
      ],
      correta: 1,
      explicacao:
        'O caso recursivo chama o método com um valor MENOR (n - 1), aproximando-se do caso-base.',
    },
    {
      pergunta: 'Comparando recursão e iteração (laços), o que costuma ser verdade?',
      opcoes: [
        'Recursão sempre é mais rápida que laços',
        'Só dá para resolver problemas com recursão',
        'A iteração costuma usar menos memória, pois não empilha chamadas',
        'Laços não conseguem repetir tarefas',
      ],
      correta: 2,
      explicacao:
        'A iteração não acumula chamadas na pilha; a recursão costuma ser mais curta e expressiva.',
    },
  ],
  xp: 100,
};

export default cap18;
