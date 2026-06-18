import type { Capitulo } from '../src/types.js';

const cap19: Capitulo = {
  id: 19,
  titulo: 'Pesquisa, classificação e Big O',
  conceitoEmFoco: {
    termo: 'Notação Big O',
    explicacao:
      'Big O descreve como o TEMPO de um algoritmo cresce conforme a entrada aumenta — não em ' +
      'segundos, mas em "quantos passos". Pense numa lista telefônica: achar um nome folheando ' +
      'página por página piora muito quando a lista dobra (O(n)); já abrir no meio e ir cortando ' +
      'metade quase não piora (O(log n)). O(1) é instantâneo independente do tamanho; O(n) cresce ' +
      'na mesma proporção da entrada; O(n²) explode (dobrar a entrada quadruplica o trabalho).',
  },
  objetivos: [
    'Entender o que a notação Big O mede e por que ignoramos detalhes pequenos.',
    'Comparar busca linear (O(n)) com busca binária (O(log n)).',
    'Implementar o selection sort e contar suas comparações.',
    'Reconhecer por que o selection sort é O(n²).',
    'Conhecer de forma geral insertion sort e merge sort.',
  ],
  teoria: [
    {
      titulo: 'O que é Big O',
      paragrafos: [
        'Big O não cronometra o relógio — ele conta quantas operações o algoritmo faz em função do ' +
          'tamanho n da entrada. Computadores diferentes têm velocidades diferentes, mas o CRESCIMENTO ' +
          'do número de passos é o que realmente importa quando os dados ficam grandes.',
        'As classes mais comuns, da melhor para a pior: O(1) (tempo constante, não depende de n), ' +
          'O(log n) (corta o problema pela metade a cada passo), O(n) (percorre tudo uma vez), ' +
          'O(n log n) (bons algoritmos de ordenação) e O(n²) (dois laços encaixados sobre os mesmos dados).',
      ],
    },
    {
      titulo: 'Buscar: linear vs binária',
      paragrafos: [
        'A busca linear olha elemento por elemento até achar o alvo. No pior caso percorre todos os n ' +
          'elementos, então é O(n). Ela funciona em qualquer lista, ordenada ou não.',
        'A busca binária exige uma lista JÁ ORDENADA. Ela olha o meio e descarta metade da lista a cada ' +
          'passo. Por isso é O(log n): numa lista de 1.000.000 de itens, são cerca de 20 passos — não ' +
          'um milhão. O preço é precisar manter os dados ordenados.',
      ],
    },
    {
      titulo: 'Ordenar: selection, insertion e merge',
      paragrafos: [
        'O selection sort procura o menor elemento e o coloca na frente, repetindo para o resto. Como ' +
          'usa um laço dentro de outro sobre os mesmos dados, faz cerca de n²/2 comparações: é O(n²). ' +
          'O insertion sort vai inserindo cada elemento na posição certa entre os já ordenados — também ' +
          'O(n²) no pior caso, mas muito rápido em listas quase ordenadas.',
        'O merge sort divide a lista ao meio repetidamente, ordena as metades e depois as intercala (merge). ' +
          'Ele é O(n log n), bem melhor que O(n²) para listas grandes. A lição: para poucos dados qualquer ' +
          'algoritmo serve; para milhões, a classe Big O faz toda a diferença.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap19/Ordenacao.java',
    descricao:
      'Ordena um array pequeno com selection sort, imprimindo o array a cada passo e contando as ' +
      'comparações; depois faz uma busca binária no array ordenado, contando os passos. Os comentários ' +
      'relacionam tudo com Big O (selection sort O(n²), busca binária O(log n)).',
    anotacoes: [
      { linha: 19, nota: 'Laço externo do selection sort: define a posição que vamos preencher com o menor.' },
      { linha: 21, nota: 'Laço interno: um for dentro de outro. É essa estrutura que torna o algoritmo O(n²).' },
      { linha: 22, nota: 'A cada volta contamos uma comparação. No fim somam ~n²/2 comparações.' },
      { linha: 34, nota: 'Imprime o total de comparações: cresce como O(n²) com o tamanho do array.' },
      { linha: 46, nota: 'Busca binária: o laço continua enquanto sobrar trecho para examinar.' },
      { linha: 48, nota: 'Olha o MEIO e descarta metade a cada passo — por isso a busca binária é O(log n).' },
    ],
  },
  discussao: [
    'Big O olha o crescimento, não números exatos: O(2n) e O(n) são a mesma classe, porque ignoramos ' +
      'constantes e termos menores.',
    'Busca binária é muito mais rápida, mas só vale para dados ORDENADOS — e manter a ordenação tem seu ' +
      'custo. Por isso primeiro ordenamos, depois buscamos.',
    'Selection sort é fácil de entender, mas O(n²) fica lento rápido: 6 itens dão 15 comparações; 1.000 ' +
      'itens dariam cerca de 500.000. Para listas grandes, prefira algoritmos O(n log n) como o merge sort.',
    'Pegadinha comum: achar que "mais código = mais lento". O que pesa é a CLASSE Big O. Um O(log n) com ' +
      'várias linhas vence um O(n²) curtinho quando os dados crescem.',
  ],
  desafio: {
    enunciado:
      'Implemente a BUSCA LINEAR. Escreva o método buscaLinear(int[] v, int alvo) que percorre o array ' +
      'do início ao fim, conta as comparações e retorna o índice do alvo (ou -1 se não achar). No main, ' +
      'busque o número 7 no array {4, 7, 1, 9, 2} e imprima o índice e quantas comparações foram feitas.',
    arquivoBase: 'examples/cap19/Desafio.java',
    dica:
      'Use um for de 0 até v.length. Dentro dele incremente um contador e teste if (v[i] == alvo) { ... ' +
      'return i; }. Se o laço terminar sem achar, retorne -1. A busca linear é O(n).',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        int[] v = {4, 7, 1, 9, 2};\n' +
      '        int alvo = 7;\n' +
      '        int comparacoes = 0;\n' +
      '        int indice = -1;\n' +
      '        for (int i = 0; i < v.length; i++) {\n' +
      '            comparacoes++;\n' +
      '            if (v[i] == alvo) {\n' +
      '                indice = i;\n' +
      '                break;\n' +
      '            }\n' +
      '        }\n' +
      '        System.out.println("Indice: " + indice + " (em " + comparacoes + " comparacoes)");\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que a notação Big O descreve?',
      opcoes: [
        'O tempo exato em segundos do programa',
        'Como o número de passos cresce conforme a entrada aumenta',
        'A quantidade de memória RAM do computador',
        'O número de linhas do código-fonte',
      ],
      correta: 1,
      explicacao:
        'Big O mede o crescimento do trabalho (passos) em função do tamanho n da entrada, ignorando ' +
        'constantes e a velocidade da máquina.',
    },
    {
      pergunta: 'Qual a complexidade de uma busca binária em um array ordenado?',
      opcoes: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correta: 2,
      explicacao: 'A busca binária descarta metade dos elementos a cada passo, então é O(log n).',
    },
    {
      pergunta: 'Por que o selection sort é O(n²)?',
      opcoes: [
        'Porque usa recursão',
        'Porque tem um laço dentro de outro percorrendo os mesmos dados',
        'Porque ordena ao contrário',
        'Porque usa muita memória',
      ],
      correta: 1,
      explicacao:
        'O laço interno aninhado no externo faz cerca de n²/2 comparações, o que caracteriza O(n²).',
    },
    {
      pergunta: 'Qual condição a busca binária exige para funcionar?',
      opcoes: [
        'O array precisa estar ordenado',
        'O array precisa ter números pares',
        'O array precisa estar vazio',
        'Nenhuma condição especial',
      ],
      correta: 0,
      explicacao:
        'A busca binária só funciona em dados ORDENADOS, pois decide qual metade descartar comparando com o meio.',
    },
  ],
  xp: 100,
};

export default cap19;
