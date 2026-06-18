import type { Capitulo } from '../src/types.js';

const cap05: Capitulo = {
  id: 5,
  titulo: 'Estruturas de controle: parte 2',
  conceitoEmFoco: {
    termo: 'Operadores lógicos',
    explicacao:
      'Operadores lógicos combinam condições: && (E) é verdadeiro só quando AS DUAS condições ' +
      'são verdadeiras; || (OU) é verdadeiro quando AO MENOS UMA é; ! (NÃO) inverte o valor. ' +
      'Eles também têm "curto-circuito": no &&, se a primeira parte já é falsa, a segunda nem ' +
      'é avaliada (o resultado já está decidido).',
  },
  objetivos: [
    'Combinar condições com &&, || e !.',
    'Escolher entre vários caminhos com switch.',
    'Repetir com for (contador embutido) e do...while.',
    'Usar break e continue para controlar o laço.',
    'Entender a avaliação em curto-circuito.',
  ],
  teoria: [
    {
      titulo: 'Combinando condições',
      paragrafos: [
        '&& (E): true só se ambos os lados forem true. Ex.: aprovado = nota >= 60 && faltas <= 5.',
        '|| (OU): true se pelo menos um lado for true. ! (NÃO): inverte (true vira false). ' +
          'Curto-circuito: em a && b, se a é false, b nem é checado; em a || b, se a é true, ' +
          'b nem é checado.',
      ],
    },
    {
      titulo: 'switch: escolher entre muitos casos',
      paragrafos: [
        'Quando você compara uma mesma variável com vários valores possíveis, o switch fica ' +
          'mais limpo que uma fila de if/else. Cada case trata um valor; default trata "qualquer ' +
          'outro".',
        'O break encerra o case. Sem ele, a execução "cai" para o próximo case (fall-through), ' +
          'o que às vezes é proposital (casos 10 e 9 levando ao mesmo conceito), mas costuma ser ' +
          'fonte de bugs.',
      ],
    },
    {
      titulo: 'for, do...while, break e continue',
      paragrafos: [
        'O for reúne as três partes do laço numa linha: inicialização; condição; incremento. ' +
          'É a forma preferida quando você sabe quantas vezes vai repetir.',
        'O do...while executa o bloco ao menos uma vez antes de testar a condição. break sai do ' +
          'laço imediatamente; continue pula para a próxima repetição.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap05/Notas.java',
    descricao:
      'Combina operadores lógicos, um switch que converte a nota num conceito (A–F) e um ' +
      'FizzBuzz com for.',
    anotacoes: [
      { linha: 10, nota: '&& (E lógico): só é true se a nota for >= 60 E as faltas <= 5. Os dois precisam valer.' },
      { linha: 15, nota: 'switch escolhe o caminho conforme nota/10. Aqui 84/10 = 8 (divisão inteira).' },
      { linha: 19, nota: 'break encerra o case. Sem ele, a execução cairia no próximo case (fall-through).' },
      { linha: 36, nota: 'for: inicialização (i=1); condição (i<=15); incremento (i++) — tudo numa linha.' },
    ],
  },
  discussao: [
    'Curto-circuito é útil e seguro: em (obj != null && obj.metodo()), se obj for null a ' +
      'segunda parte não roda, evitando erro.',
    'Esquecer o break num switch causa fall-through silencioso — um dos bugs mais difíceis de ' +
      'enxergar para iniciantes.',
    'for e while são equivalentes; o for só agrupa contador, condição e incremento num lugar só.',
    'Use continue com parcimônia: em excesso, dificulta entender o fluxo do laço.',
  ],
  desafio: {
    enunciado:
      'Use um for de 1 a 30. Para cada número imprima "Multiplo de 3 e 5" (se divisível por ' +
      'ambos), "Multiplo de 3", "Multiplo de 5" ou o próprio número.',
    arquivoBase: 'examples/cap05/Desafio.java',
    dica: 'Teste primeiro a condição mais específica: (i % 3 == 0 && i % 5 == 0). Depois as demais.',
    solucao:
      'for (int i = 1; i <= 30; i++) {\n' +
      '    if (i % 3 == 0 && i % 5 == 0) {\n' +
      '        System.out.println("Multiplo de 3 e 5");\n' +
      '    } else if (i % 3 == 0) {\n' +
      '        System.out.println("Multiplo de 3");\n' +
      '    } else if (i % 5 == 0) {\n' +
      '        System.out.println("Multiplo de 5");\n' +
      '    } else {\n' +
      '        System.out.println(i);\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Quando a expressão (a && b) é verdadeira?',
      opcoes: [
        'Quando pelo menos um for verdadeiro',
        'Somente quando a e b forem verdadeiros',
        'Quando ambos forem falsos',
        'Nunca',
      ],
      correta: 1,
      explicacao: '&& (E) só resulta em true quando os dois operandos são true.',
    },
    {
      pergunta: 'O que acontece num switch se você esquecer o break em um case?',
      opcoes: [
        'Erro de compilação',
        'O programa ignora o case',
        'A execução "cai" para o próximo case (fall-through)',
        'O switch reinicia',
      ],
      correta: 2,
      explicacao: 'Sem break, a execução continua nos cases seguintes até encontrar um break ou o fim.',
    },
    {
      pergunta: 'Quais são as três partes de um for, na ordem?',
      opcoes: [
        'condição; inicialização; incremento',
        'inicialização; condição; incremento',
        'incremento; condição; inicialização',
        'condição; incremento; corpo',
      ],
      correta: 1,
      explicacao: 'for (inicialização; condição; incremento) — exatamente nessa ordem.',
    },
    {
      pergunta: 'O que o operador ! faz?',
      opcoes: ['Soma 1', 'Inverte o valor booleano', 'Compara igualdade', 'Concatena texto'],
      correta: 1,
      explicacao: '! é o NÃO lógico: transforma true em false e vice-versa.',
    },
  ],
  xp: 100,
};

export default cap05;
