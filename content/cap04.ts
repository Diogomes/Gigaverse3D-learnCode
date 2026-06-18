import type { Capitulo } from '../src/types.js';

const cap04: Capitulo = {
  id: 4,
  titulo: 'Estruturas de controle: parte 1',
  conceitoEmFoco: {
    termo: 'Fluxo de controle',
    explicacao:
      'Por padrão, o programa executa as instruções de cima para baixo, uma após a outra. As ' +
      'estruturas de controle mudam esse fluxo: o if DECIDE se um bloco roda ou não; o while ' +
      'REPETE um bloco enquanto uma condição for verdadeira. Com elas, o programa deixa de ser ' +
      'uma lista fixa e passa a reagir aos dados.',
  },
  objetivos: [
    'Tomar decisões com if e if...else.',
    'Repetir instruções com o laço while.',
    'Usar um contador para controlar quantas vezes o laço roda.',
    'Acumular valores numa variável (somatório/total).',
    'Entender pré e pós-incremento (++).',
  ],
  teoria: [
    {
      titulo: 'Decidir: if e if...else',
      paragrafos: [
        'O if avalia uma condição (algo que dá true ou false). Se for true, o bloco entre ' +
          'chaves roda; senão, é pulado. Com else, você dá um caminho alternativo: "se isso, ' +
          'faça A; senão, faça B".',
        'A condição costuma usar operadores relacionais (media >= 7.0). O resultado é sempre ' +
          'um boolean.',
      ],
    },
    {
      titulo: 'Repetir: o laço while',
      paragrafos: [
        'O while repete um bloco ENQUANTO a condição continuar verdadeira. Para não repetir ' +
          'para sempre, algo dentro do laço precisa, cedo ou tarde, tornar a condição falsa — ' +
          'normalmente um contador que cresce a cada volta.',
        'Padrão clássico: um contador (i = 1) que avança com i++ a cada repetição, e a ' +
          'condição (i <= 10) que um dia deixa de valer, encerrando o laço.',
      ],
    },
    {
      titulo: 'Contadores e acumuladores',
      paragrafos: [
        'Contador: variável que conta repetições (i++). Acumulador: variável que vai somando ' +
          'valores (soma += nota). Os dois costumam aparecer juntos para calcular totais e médias.',
        'i++ é o pós-incremento: soma 1 a i. soma += x é o mesmo que soma = soma + x.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap04/Controle.java',
    descricao:
      'Lê um número e imprime sua tabuada com um laço while; depois calcula a média de notas ' +
      'usando um acumulador e decide aprovado/recuperação com if/else.',
    entradaSimulada: '5\n',
    anotacoes: [
      { linha: 13, nota: 'CONTADOR: começa em 1 e vai controlar quantas linhas da tabuada serão impressas.' },
      { linha: 14, nota: 'O while repete o bloco enquanto i <= 10 for verdadeiro.' },
      { linha: 16, nota: 'i++ (pós-incremento) soma 1 ao contador. Sem isso, o laço nunca terminaria!' },
      { linha: 24, nota: 'ACUMULADOR: soma += notas[j] acrescenta cada nota ao total.' },
      { linha: 27, nota: 'Casting (double): força a divisão a ser real (7.75) em vez de inteira (7).' },
      { linha: 30, nota: 'if/else decide a mensagem conforme a média. A condição devolve true ou false.' },
    ],
  },
  discussao: [
    'Laço infinito: se você esquecer de atualizar o contador (i++), a condição nunca fica ' +
      'falsa e o programa trava. O app tem um timeout de 10s justamente para isso.',
    'soma / notas.length sem casting daria divisão inteira. Por isso usamos (double) soma.',
    'A condição do if/while precisa resultar em boolean — não em número, como em algumas ' +
      'outras linguagens.',
    'Inicialize contadores e acumuladores ANTES do laço (i = 1, soma = 0).',
  ],
  desafio: {
    enunciado:
      'Usando um laço while, some todos os números PARES de 1 até 20 e mostre o total no final.',
    arquivoBase: 'examples/cap04/Desafio.java',
    dica: 'Um número é par quando (i % 2 == 0). Use um contador (i) e um acumulador (soma).',
    solucao:
      'while (i <= 20) {\n' +
      '    if (i % 2 == 0) {\n' +
      '        soma += i;\n' +
      '    }\n' +
      '    i++;\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que acontece se um laço while nunca tornar a condição falsa?',
      opcoes: [
        'O programa pula o laço',
        'Ocorre um laço infinito (o programa não termina)',
        'O Java corrige sozinho',
        'A condição vira true automaticamente',
      ],
      correta: 1,
      explicacao: 'Sem algo que torne a condição falsa, o while repete para sempre — um laço infinito.',
    },
    {
      pergunta: 'Qual é o resultado de int total = 7 / 2 (divisão inteira)?',
      opcoes: ['3', '3.5', '4', '1'],
      correta: 0,
      explicacao: 'Entre inteiros a divisão descarta a fração: 7 / 2 = 3. Para 3.5 use casting/double.',
    },
    {
      pergunta: 'O que faz a linha soma += nota;?',
      opcoes: [
        'Compara soma com nota',
        'Equivale a soma = soma + nota (acumula)',
        'Zera a variável soma',
        'Incrementa nota em 1',
      ],
      correta: 1,
      explicacao: '+= acumula: soma passa a valer o que era antes mais nota.',
    },
  ],
  xp: 100,
};

export default cap04;
