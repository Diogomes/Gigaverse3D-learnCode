import type { Capitulo } from '../src/types.js';

const cap01: Capitulo = {
  id: 1,
  titulo: 'A jornada do programa',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Interpretador e REPL',
    explicacao:
      'O Python é uma linguagem INTERPRETADA: existe um programa (o interpretador) que lê o ' +
      'seu código e executa, linha por linha, na hora — sem uma etapa separada de compilação. ' +
      'No modo interativo (o REPL: Read-Eval-Print Loop) você digita uma expressão, ele AVALIA ' +
      'e mostra o resultado imediatamente. É como conversar com a linguagem.',
  },
  objetivos: [
    'Entender o que é um programa e o papel do interpretador Python.',
    'Diferenciar linguagem interpretada de compilada.',
    'Escrever a primeira saída com print().',
    'Usar o Python como calculadora e respeitar a precedência dos operadores.',
    'Reconhecer os três tipos de erro: sintaxe, execução e semântico.',
  ],
  teoria: [
    {
      titulo: 'O que é um programa',
      paragrafos: [
        'Um programa é uma sequência de instruções que descreve um cálculo. Pode ser uma conta ' +
          'matemática, mas também pode ser procurar um texto, desenhar na tela ou responder a ' +
          'algo que você digita. No fundo, quase tudo se resume a: entrada, processamento e saída.',
        'O Python entende essas instruções porque um programa chamado INTERPRETADOR as lê e ' +
          'executa. Você escreve em uma linguagem próxima do português/inglês, e o interpretador ' +
          'traduz isso para o que a máquina entende — tudo na hora em que você roda.',
      ],
    },
    {
      titulo: 'Interpretado vs. compilado',
      paragrafos: [
        'Em linguagens compiladas (como Java ou C), há um passo extra: um compilador transforma ' +
          'todo o código em um formato executável ANTES de rodar. No Python, esse passo some: o ' +
          'interpretador lê e executa direto, o que torna o ciclo "escrever → testar" mais rápido.',
        'Isso também explica o REPL: como o Python já lê e executa na hora, ele pode avaliar uma ' +
          'expressão por vez. Digite 2 + 2 e ele responde 4 imediatamente.',
      ],
    },
    {
      titulo: 'Três tipos de erro',
      paragrafos: [
        'Erro de SINTAXE: você escreveu algo que o Python não consegue nem ler (ex.: esqueceu de ' +
          'fechar um parêntese). Ele se recusa a rodar e aponta onde travou.',
        'Erro de EXECUÇÃO (exceção): o código roda, mas estoura no meio (ex.: dividir por zero). ' +
          'Erro SEMÂNTICO: roda até o fim sem reclamar, mas faz a coisa errada — o resultado não é ' +
          'o que você queria. Esse é o mais traiçoeiro, porque o computador não avisa.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap01/ola.py',
    descricao: 'Imprime uma saudação, usa o Python como calculadora e mostra o tipo de cada valor.',
    anotacoes: [
      {
        linha: 3,
        nota:
          'print() é uma função: o texto entre aspas (uma string) vai para dentro dos parênteses ' +
          'e aparece na tela. Esta é a sua primeira "saída".',
      },
      {
        linha: 7,
        nota:
          'O Python calcula 3 * 4 primeiro (= 12) e só depois soma 2, dando 14. Multiplicação e ' +
          'divisão têm precedência sobre soma e subtração.',
      },
      {
        linha: 8,
        nota: 'Os parênteses forçam a soma primeiro: (2 + 3) = 5, depois 5 * 4 = 20.',
      },
      {
        linha: 11,
        nota:
          'type() revela o tipo de um valor. 42 é <class \'int\'> (inteiro); logo abaixo, 3.14 é ' +
          'float e "oi" é str (texto).',
      },
    ],
  },
  discussao: [
    'No Python a INDENTAÇÃO (os espaços no começo da linha) faz parte da linguagem. Aqui o ' +
      'código é todo "no nível zero", mas a partir do cap. 3 a indentação vai definir blocos — ' +
      'misturar espaços e tabs causa erro. Combine espaços (o padrão são 4) e seja consistente.',
    'Toda string precisa de aspas: print("oi") imprime a palavra oi; já print(oi) tentaria usar ' +
      'uma variável chamada oi e, se ela não existir, dá erro de execução (NameError).',
    'O caractere # inicia um COMENTÁRIO: tudo depois dele na linha é ignorado pelo interpretador. ' +
      'Comentários são para humanos, não mudam o que o programa faz.',
    'Esqueceu de fechar um parêntese? Isso é um erro de sintaxe — o Python nem começa a rodar e ' +
      'aponta a linha. Ler essa mensagem com calma economiza muito tempo.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap01/desafio.py, troque ??? pelo seu nome e acrescente uma linha que ' +
      'calcule e imprima a sua idade em MESES (anos × 12). Rode e confira a saída.',
    arquivoBase: 'examples/cap01/desafio.py',
    dica:
      'Defina idade_anos com o seu número de anos e use print() com uma multiplicação: ' +
      'print("Tenho", idade_anos * 12, "meses").',
    solucao:
      'print("Olá, eu sou Diogo")\n' +
      'idade_anos = 30\n' +
      'print("Tenho", idade_anos * 12, "meses de idade")',
  },
  quiz: [
    {
      pergunta: 'O Python é uma linguagem principalmente:',
      opcoes: ['Compilada', 'Interpretada', 'Montada à mão', 'Apenas visual'],
      correta: 1,
      explicacao:
        'O interpretador lê e executa o código na hora, sem uma etapa separada de compilação ' +
        'como em Java ou C.',
    },
    {
      pergunta: 'Qual é o resultado de 2 + 3 * 4 em Python?',
      opcoes: ['20', '14', '24', '9'],
      correta: 1,
      explicacao: 'A multiplicação vem antes da soma: 3 * 4 = 12, depois 12 + 2 = 14.',
    },
    {
      pergunta: 'Um programa que roda até o fim sem erro, mas dá o resultado errado, tem um erro de:',
      opcoes: ['Sintaxe', 'Execução', 'Semântico', 'Compilação'],
      correta: 2,
      explicacao:
        'Erro semântico: o código é válido e executa, mas faz algo diferente do que você queria. ' +
        'O computador não avisa — por isso é o mais difícil de achar.',
    },
    {
      pergunta: 'O que o caractere # faz numa linha de código Python?',
      opcoes: [
        'Cria um título',
        'Inicia um comentário (o resto da linha é ignorado)',
        'Multiplica valores',
        'Importa um módulo',
      ],
      correta: 1,
      explicacao: 'Tudo após o # naquela linha é comentário: serve para humanos e não é executado.',
    },
  ],
  xp: 100,
};

export default cap01;
