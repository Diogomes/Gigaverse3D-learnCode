import type { Capitulo } from '../src/types.js';

const cap07: Capitulo = {
  id: 7,
  titulo: 'Arrays e ArrayLists',
  conceitoEmFoco: {
    termo: 'Array',
    explicacao:
      'Um array é uma sequência de valores do MESMO tipo, guardados lado a lado e acessados ' +
      'por um índice que começa em 0. O primeiro elemento é o índice 0, o segundo é o 1, e ' +
      'assim por diante. O array tem tamanho FIXO. Quando você precisa de uma coleção que cresce ' +
      'e diminui sozinha, usa um ArrayList.',
  },
  objetivos: [
    'Declarar e inicializar arrays.',
    'Acessar elementos por índice (lembrando que começa em 0).',
    'Percorrer coleções com o for-each (for aprimorado).',
    'Usar ArrayList para listas de tamanho dinâmico.',
    'Adicionar, remover e consultar itens de um ArrayList.',
  ],
  teoria: [
    {
      titulo: 'Array: tamanho fixo, índice a partir de 0',
      paragrafos: [
        'int[] notas = {7, 8, 10}; cria um array com 3 inteiros. notas[0] é 7, notas[1] é 8 e ' +
          'notas[2] é 10. notas.length informa o tamanho (3).',
        'Acessar um índice que não existe (notas[3] aqui) provoca um erro em tempo de execução ' +
          '(ArrayIndexOutOfBoundsException). O último índice válido é sempre length - 1.',
      ],
    },
    {
      titulo: 'for-each: percorrer sem índice',
      paragrafos: [
        'Quando você só quer visitar cada elemento (sem precisar do número do índice), o ' +
          'for-each é mais limpo: for (String item : itens) { ... } lê "para cada item em itens".',
        'Se você precisar do índice (por exemplo, para imprimir a posição), o for tradicional ' +
          'com i ainda é a melhor escolha.',
      ],
    },
    {
      titulo: 'ArrayList: a coleção que cresce',
      paragrafos: [
        'ArrayList<String> é uma lista que só guarda Strings e ajusta o tamanho sozinha. ' +
          'add(x) insere, remove(x) tira, get(i) lê pela posição e size() diz quantos itens há.',
        'O <String> entre os sinais de menor/maior é o tipo dos elementos (genéricos, cap. 16): ' +
          'garante que a lista só aceite Strings, evitando erros.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap07/Inventario.java',
    descricao:
      'Um inventário de itens com ArrayList: adiciona três itens, lista com for-each, remove ' +
      'um e lista de novo com for tradicional mostrando o índice.',
    anotacoes: [
      { linha: 8, nota: 'Cria um ArrayList vazio de Strings. <> é o "diamante": o Java infere o tipo do lado esquerdo.' },
      { linha: 10, nota: 'add insere um item no fim da lista. A lista cresce automaticamente, sem tamanho fixo.' },
      { linha: 16, nota: 'for-each: percorre cada item sem precisar de índice. Lê-se "para cada item em itens".' },
      { linha: 20, nota: 'remove tira o item pelo valor ("Pocao"). O tamanho da lista diminui sozinho.' },
      { linha: 24, nota: 'for tradicional com índice: começa em 0 e vai até size()-1. get(i) lê o item da posição i.' },
    ],
  },
  discussao: [
    'Índices começam em 0! O primeiro elemento é [0] e o último é [length - 1]. Essa é uma das ' +
      'maiores fontes de confusão para iniciantes.',
    'Array tem tamanho fixo definido na criação; ArrayList ajusta o tamanho conforme você ' +
      'adiciona/remove.',
    'ArrayList só guarda objetos, então para números use os tipos "embrulhados" (Integer, ' +
      'Double) — o Java converte automaticamente (autoboxing).',
    'Acessar índice inexistente lança ArrayIndexOutOfBoundsException. Sempre respeite o length/size.',
  ],
  desafio: {
    enunciado:
      'Crie um ArrayList<Integer> com 10, 20, 30 e 40. Percorra com for-each somando tudo e ' +
      'imprima a soma e a média.',
    arquivoBase: 'examples/cap07/Desafio.java',
    dica: 'Use numeros.add(10), etc. A média é soma dividida por numeros.size() (use double para ter casas decimais).',
    solucao:
      'numeros.add(10);\n' +
      'numeros.add(20);\n' +
      'numeros.add(30);\n' +
      'numeros.add(40);\n' +
      'for (int n : numeros) {\n' +
      '    soma += n;\n' +
      '}\n' +
      'System.out.println("Soma: " + soma);\n' +
      'System.out.println("Media: " + ((double) soma / numeros.size()));',
  },
  quiz: [
    {
      pergunta: 'Qual é o índice do PRIMEIRO elemento de um array em Java?',
      opcoes: ['1', '0', '-1', 'depende do tipo'],
      correta: 1,
      explicacao: 'Arrays são indexados a partir de 0; o primeiro elemento é [0] e o último é [length - 1].',
    },
    {
      pergunta: 'Qual a principal diferença entre array e ArrayList?',
      opcoes: [
        'Array guarda texto; ArrayList guarda números',
        'O array tem tamanho fixo; o ArrayList cresce e diminui dinamicamente',
        'Não há diferença',
        'ArrayList só funciona com for-each',
      ],
      correta: 1,
      explicacao: 'O tamanho do array é definido na criação; o ArrayList ajusta o tamanho conforme add/remove.',
    },
    {
      pergunta: 'Para percorrer uma lista sem precisar do índice, qual estrutura é mais limpa?',
      opcoes: ['while', 'do...while', 'for-each (for aprimorado)', 'switch'],
      correta: 2,
      explicacao: 'O for-each visita cada elemento diretamente, sem você gerenciar um índice.',
    },
    {
      pergunta: 'O que acontece ao acessar notas[5] num array de tamanho 3?',
      opcoes: [
        'Retorna 0',
        'Retorna null',
        'Lança ArrayIndexOutOfBoundsException',
        'Cria a posição automaticamente',
      ],
      correta: 2,
      explicacao: 'Índice fora do intervalo válido lança ArrayIndexOutOfBoundsException em tempo de execução.',
    },
  ],
  xp: 100,
};

export default cap07;
