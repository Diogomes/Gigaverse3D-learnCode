import type { Capitulo } from '../src/types.js';

const cap12: Capitulo = {
  id: 12,
  titulo: 'Tuplas',
  paradigma: 'estruturas',
  conceitoEmFoco: {
    termo: 'Tupla e desempacotamento',
    explicacao:
      'Uma TUPLA é uma sequência IMUTÁVEL: parecida com a lista, mas depois de criada você não ' +
      'pode trocar, adicionar nem remover itens. Em troca, ela ganha um superpoder de leitura: o ' +
      'DESEMPACOTAMENTO, que dá um nome a cada item de uma vez. É isso que faz a, b = b, a trocar ' +
      'os valores de duas variáveis numa linha só, sem precisar de uma variável auxiliar.',
  },
  objetivos: [
    'Criar tuplas com parênteses e acessar seus itens pelo índice.',
    'Entender a IMUTABILIDADE: por que não dá para alterar uma tupla depois de criada.',
    'Usar o desempacotamento para nomear vários itens de uma vez, incluindo o truque a, b = b, a.',
    'Escrever funções que retornam VÁRIOS valores (que, na verdade, são uma tupla).',
    'Combinar duas sequências em pares com zip().',
  ],
  teoria: [
    {
      titulo: 'O que é uma tupla',
      paragrafos: [
        'Uma tupla é uma coleção ordenada de valores, escrita entre parênteses e separada por ' +
          'vírgulas: ponto = (10, 20). Como a lista, ela mantém a ordem e é acessada por índice ' +
          '(base 0): ponto[0] é 10. A diferença está na vírgula, não nos parênteses — na verdade é ' +
          'a vírgula que cria a tupla, e os parênteses só agrupam.',
        'A grande característica da tupla é ser IMUTÁVEL: uma vez criada, seus itens são fixos. ' +
          'Tentar ponto[0] = 99 dá erro (TypeError). Por isso usamos tupla quando os dados não ' +
          'devem mudar — coordenadas, uma data (dia, mês, ano), um par de valores que andam juntos.',
      ],
    },
    {
      titulo: 'Desempacotamento',
      paragrafos: [
        'Desempacotar é distribuir os itens de uma tupla em variáveis de uma vez: x, y = ponto faz ' +
          'x receber o primeiro item e y o segundo. O número de nomes à esquerda precisa bater com ' +
          'o número de itens à direita, senão dá erro.',
        'Isso explica o truque a, b = b, a: o lado direito vira a tupla (b, a) e só DEPOIS é ' +
          'desempacotado na esquerda, trocando os valores sem variável auxiliar. É o mesmo ' +
          'mecanismo de a, b = 1, 2, que atribui dois valores numa linha só.',
      ],
    },
    {
      titulo: 'Retornar vários valores e zip()',
      paragrafos: [
        'Uma função pode "devolver vários valores" com return menor, maior. Na prática ela devolve ' +
          'UMA tupla, e quem chama costuma desempacotar: menor, maior = min_max(notas). É a forma ' +
          'natural de uma função entregar mais de um resultado.',
        'zip() casa duas (ou mais) sequências item a item, produzindo pares prontos para um for: ' +
          'for nome, nota in zip(nomes, notas). Cada par é uma tupla, desempacotada direto no for. ' +
          'Atenção: zip PARA no fim da menor sequência — itens sobrando na maior são ignorados.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap12/tuplas.py',
    descricao:
      'Cria uma tupla, mostra desempacotamento e a troca a, b = b, a, define min_max() que ' +
      'retorna (menor, maior) e usa zip() para parear nomes com notas. Tudo determinístico, sem input().',
    anotacoes: [
      {
        linha: 4,
        nota:
          'Cria uma tupla com dois itens. São os parênteses e as vírgulas que agrupam os valores; ' +
          'a partir daqui ponto é uma sequência imutável.',
      },
      {
        linha: 11,
        nota:
          'Desempacotamento: x recebe o primeiro item (10) e y o segundo (20), de uma vez. O ' +
          'número de nomes à esquerda bate com o de itens da tupla.',
      },
      {
        linha: 16,
        nota:
          'A troca sem variável auxiliar. O lado direito vira a tupla (b, a) e só depois é ' +
          'desempacotado em a e b, invertendo os valores.',
      },
      {
        linha: 22,
        nota:
          'return min(numeros), max(numeros) devolve VÁRIOS valores — que o Python empacota numa ' +
          'única tupla (menor, maior).',
      },
      {
        linha: 32,
        nota:
          'zip(nomes, notas) gera pares; o for desempacota cada par em nome e nota. Como notas tem ' +
          'mais itens que nomes, o zip para na 3ª dupla e ignora o resto.',
      },
    ],
  },
  discussao: [
    'Tupla é IMUTÁVEL: ponto[0] = 99 não funciona, dá TypeError. Se você precisa mudar itens ' +
      'depois, o certo é uma lista (colchetes), não uma tupla.',
    'Tupla de UM elemento precisa da vírgula: (5,) é uma tupla, mas (5) é só o número 5 entre ' +
      'parênteses. Lembre que quem cria a tupla é a vírgula, não os parênteses.',
    'Quando uma função faz return a, b, ela NÃO devolve dois valores soltos: devolve uma única ' +
      'tupla (a, b). Por isso dá para escrever resultado = f() e olhar resultado como tupla, ou ' +
      'desempacotar com x, y = f().',
    'zip() para no fim da MENOR sequência. Se uma lista tem 5 itens e a outra 3, o resultado tem ' +
      'só 3 pares — os itens extras da maior são silenciosamente descartados.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap12/desafio.py. Complete a função soma_e_media() para que ela calcule a ' +
      'média e RETORNE a tupla (total, media); depois desempacote o retorno e imprima soma e média.',
    arquivoBase: 'examples/cap12/desafio.py',
    dica:
      'A média é total / len(numeros). Para retornar dois valores escreva return total, media ' +
      '(isso já é uma tupla) e, ao chamar, desempacote com soma, media = soma_e_media(valores).',
    solucao:
      'def soma_e_media(numeros):\n' +
      '    total = sum(numeros)\n' +
      '    media = total / len(numeros)\n' +
      '    return total, media\n' +
      '\n' +
      'valores = [10, 20, 30, 40]\n' +
      'soma, media = soma_e_media(valores)\n' +
      'print("Soma:", soma, "| Média:", media)',
  },
  quiz: [
    {
      pergunta: 'Qual é a principal característica de uma tupla em relação a uma lista?',
      opcoes: [
        'Pode guardar tipos diferentes',
        'É imutável: seus itens não mudam depois de criada',
        'É acessada por índice',
        'Usa vírgulas para separar os itens',
      ],
      correta: 1,
      explicacao:
        'Tupla e lista guardam itens ordenados e acessados por índice; a diferença é que a tupla ' +
        'é IMUTÁVEL — depois de criada, não dá para trocar, adicionar ou remover itens.',
    },
    {
      pergunta: 'Depois de a, b = 1, 2 e da linha a, b = b, a, quanto valem a e b?',
      opcoes: ['a = 1, b = 2', 'a = 2, b = 1', 'Dá erro', 'a = 2, b = 2'],
      correta: 1,
      explicacao:
        'O lado direito vira a tupla (2, 1) e só depois é desempacotado: a recebe 2 e b recebe 1. ' +
        'É a troca de valores sem variável auxiliar.',
    },
    {
      pergunta: 'O que a função abaixo devolve?  def f(): return 1, 2',
      opcoes: ['Dois inteiros separados', 'Uma lista [1, 2]', 'Uma tupla (1, 2)', 'Apenas o 1'],
      correta: 2,
      explicacao:
        'return 1, 2 empacota os valores numa ÚNICA tupla (1, 2). Quem chama pode guardar a tupla ' +
        'inteira ou desempacotar com x, y = f().',
    },
    {
      pergunta: 'Em zip(["a", "b", "c"], [10, 20]), quantos pares são gerados?',
      opcoes: ['3', '2', '5', 'Dá erro'],
      correta: 1,
      explicacao:
        'zip para no fim da MENOR sequência. Como a segunda lista tem só 2 itens, saem 2 pares ' +
        '("a", 10) e ("b", 20); o "c" é ignorado.',
    },
  ],
  xp: 100,
};

export default cap12;
