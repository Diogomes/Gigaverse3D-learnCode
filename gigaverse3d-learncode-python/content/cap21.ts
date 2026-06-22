import type { Capitulo } from '../src/types.js';

const cap21: Capitulo = {
  id: 21,
  titulo: 'Análise de algoritmos (apêndice)',
  paradigma: 'transversal',
  conceitoEmFoco: {
    termo: 'Ordem de crescimento (Big O)',
    explicacao:
      'Analisar um algoritmo é prever como seu custo (número de passos) CRESCE quando a entrada n ' +
      'aumenta — sem cronômetro, olhando a estrutura do código. A notação O(...) resume esse ' +
      'crescimento: O(1) é constante (não depende de n), O(n) é linear (um laço sobre os dados) e ' +
      'O(n²) é quadrático (laço dentro de laço). Comparar ordens ajuda a escolher a solução que escala.',
  },
  objetivos: [
    'Entender "ordem de crescimento" como o custo em função do tamanho da entrada n.',
    'Reconhecer O(1), O(n) e O(n²) lendo a estrutura do código.',
    'Perceber que um laço simples é O(n) e um laço aninhado é O(n²).',
    'Trocar um algoritmo O(n) por um O(1) quando existe uma fórmula direta.',
  ],
  teoria: [
    {
      titulo: 'Por que não cronometrar',
      paragrafos: [
        'Medir o tempo no relógio depende da máquina, da linguagem e do que mais está rodando. A análise ' +
          'de algoritmos abstrai isso: conta quantos PASSOS o algoritmo faz em função do tamanho da entrada n, ' +
          'e olha como esse número cresce quando n fica grande.',
        'O foco é o crescimento, não o número exato. Por isso ignoramos constantes e detalhes: 3n e n/2 são ' +
          'ambos O(n). O que importa é a FORMA da curva — dobrar n dobra o custo? Quadruplica? Não muda nada?',
      ],
    },
    {
      titulo: 'As ordens mais comuns',
      paragrafos: [
        'O(1) CONSTANTE: o custo não depende de n. Uma conta direta, acessar um índice, somar dois números. ' +
          'Dobrar n não muda nada. O(n) LINEAR: um laço que percorre os n dados uma vez. Dobrar n dobra o custo.',
        'O(n²) QUADRÁTICO: um laço dentro de outro, cada um indo até n — são n×n passos. Dobrar n QUADRUPLICA ' +
          'o custo; isso fica caro rápido. Há outras (O(log n), O(n log n)…), mas reconhecer estas três já ' +
          'orienta a maioria das decisões do dia a dia.',
      ],
    },
    {
      titulo: 'Mesmo resultado, custos diferentes',
      paragrafos: [
        'Somar 1..n com um laço é O(n): n passos. Mas existe a fórmula de Gauss, n*(n+1)//2, que dá o MESMO ' +
          'resultado em UM passo — O(1). Dois algoritmos corretos podem ter custos muito diferentes.',
        'A lição prática: quando um laço só acumula algo que tem fórmula fechada, ou quando você compara cada ' +
          'item com todos os outros (O(n²)), vale procurar uma abordagem mais barata. Correto é o mínimo; ' +
          'eficiente é o que faz o programa escalar.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap21/analise.py',
    descricao:
      'Compara três ordens de crescimento: soma_laco (O(n)), soma_formula (O(1), mesmo resultado) e ' +
      'conta_pares (O(n²) com laço aninhado).',
    anotacoes: [
      {
        linha: 7,
        nota:
          'soma_laco é O(n): o for vai de 1 a n, então o número de passos cresce proporcional a n. ' +
          'Dobrar n dobra o trabalho.',
      },
      {
        linha: 16,
        nota:
          'soma_formula é O(1): uma única conta, sem laço. Dá o MESMO resultado de soma_laco, mas o custo ' +
          'não depende de n — é a fórmula de Gauss.',
      },
      {
        linha: 21,
        nota:
          'conta_pares é O(n²): um for dentro do outro, cada um percorrendo os itens. São n×n comparações — ' +
          'dobrar n quadruplica o custo.',
      },
      {
        linha: 32,
        nota:
          'Rodando para n = 10, 100, 1000, as duas somas dão sempre o MESMO valor. A diferença invisível ' +
          'aqui é quantos passos cada uma custou para chegar nele.',
      },
    ],
  },
  discussao: [
    'Big O descreve o crescimento, não o tempo exato. Por isso somem as constantes: um laço que faz 2n ou ' +
      '100 + n passos ainda é O(n). A pergunta certa é "como o custo reage quando n dobra?".',
    'Leia a estrutura para estimar a ordem: nenhum laço sobre os dados costuma ser O(1); um laço, O(n); um ' +
      'laço aninhado em outro, O(n²). É uma leitura visual rápida do código.',
    'O(n²) engana com n pequeno (parece instantâneo) e explode com n grande. Comparar todos os pares de uma ' +
      'lista de 10 são 100 passos; de 10.000, são 100 milhões. Desconfie de laços aninhados sobre dados grandes.',
    'Eficiência só importa depois da correção: primeiro faça certo, depois — se o n for grande — torne ' +
      'rápido. Trocar um O(n) por O(1) (como usar a fórmula de Gauss) é o tipo de ganho que vale buscar.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap21/desafio.py. soma_ate(n) soma 1..n com um laço — é O(n). Complete soma_formula(n) ' +
      'para devolver o MESMO resultado em O(1) (sem laço), usando a fórmula de Gauss n*(n+1)//2. Para n=100, ' +
      'as duas devem imprimir 5050.',
    arquivoBase: 'examples/cap21/desafio.py',
    dica:
      'Dentro de soma_formula, troque o pass por: return n * (n + 1) // 2. Use // (divisão inteira) para o ' +
      'resultado ser um número inteiro.',
    solucao:
      'def soma_formula(n):\n' +
      '    return n * (n + 1) // 2',
  },
  quiz: [
    {
      pergunta: 'O que a "ordem de crescimento" (Big O) descreve?',
      opcoes: [
        'O tempo exato em segundos',
        'Como o número de passos cresce conforme a entrada n aumenta',
        'A quantidade de linhas do programa',
        'O uso de memória do computador',
      ],
      correta: 1,
      explicacao:
        'Big O resume como o custo cresce com n, ignorando constantes e detalhes de máquina — foca na ' +
        'forma da curva.',
    },
    {
      pergunta: 'Um laço simples que percorre n itens uma vez tem qual ordem?',
      opcoes: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      correta: 1,
      explicacao: 'Um único laço sobre os n dados é O(n): dobrar n dobra o número de passos.',
    },
    {
      pergunta: 'Um laço dentro de outro, cada um indo até n, é tipicamente:',
      opcoes: ['O(1)', 'O(n)', 'O(n²)', 'O(n) também'],
      correta: 2,
      explicacao: 'Laço aninhado faz n×n passos → O(n²). Dobrar n quadruplica o custo.',
    },
    {
      pergunta: 'Somar 1..n: o laço é O(n). A fórmula n*(n+1)//2 dá o mesmo resultado em qual ordem?',
      opcoes: ['O(n)', 'O(n²)', 'O(1) — uma conta direta, sem laço', 'Depende de n'],
      correta: 2,
      explicacao:
        'A fórmula de Gauss calcula a soma em um único passo, independente de n: é O(1) — mesmo resultado, ' +
        'custo muito menor.',
    },
  ],
  xp: 100,
};

export default cap21;
