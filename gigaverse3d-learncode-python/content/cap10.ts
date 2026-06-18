import type { Capitulo } from '../src/types.js';

const cap10: Capitulo = {
  id: 10,
  titulo: 'Listas',
  paradigma: 'estruturas',
  conceitoEmFoco: {
    termo: 'Lista',
    explicacao:
      'Uma LISTA é uma sequência de valores guardados em ordem, escrita entre colchetes: ' +
      '["a", "b", "c"]. O que a torna especial é ser MUTÁVEL: dá para adicionar, trocar e ' +
      'remover itens DEPOIS de criada, sem precisar de uma lista nova. Isso a diferencia da ' +
      'string, que é imutável — em "oi" você não consegue trocar uma letra no lugar. Por isso a ' +
      'lista é a estrutura que você usa sempre que precisa de uma coleção que cresce e muda.',
  },
  objetivos: [
    'Criar uma lista com colchetes e descobrir seu tamanho com len().',
    'Acessar itens por índice (começando em 0) e pegar pedaços com fatiamento.',
    'Alterar a lista com os métodos append(), sort(), pop() e remove().',
    'Percorrer todos os itens de uma lista usando um laço for.',
    'Reconhecer o aliasing: duas variáveis podem apontar para a MESMA lista.',
  ],
  teoria: [
    {
      titulo: 'O que é uma lista',
      paragrafos: [
        'Uma lista junta vários valores em um único nome, mantendo a ORDEM em que você os colocou. ' +
          'Escreva os itens entre colchetes e separados por vírgula: itens = ["espada", "escudo"]. ' +
          'Podem ser textos, números ou uma mistura — a lista não se importa com o tipo de cada um.',
        'Para saber quantos itens há, use len(lista). Para pegar um item, use o ÍNDICE entre ' +
          'colchetes, lembrando que ele começa em 0: lista[0] é o primeiro. Índices negativos ' +
          'contam de trás para frente, então lista[-1] é o último item.',
      ],
    },
    {
      titulo: 'Mutável: a lista muda no lugar',
      paragrafos: [
        'A lista é MUTÁVEL: vários métodos a alteram DIRETAMENTE, sem criar uma cópia. append("x") ' +
          'acrescenta um item no fim; sort() reordena os itens; pop() remove e devolve o último; e ' +
          'remove("x") apaga a primeira ocorrência daquele valor. Compare com a string, que é ' +
          'IMUTÁVEL: lá qualquer "mudança" gera um texto novo, sem alterar o original.',
        'Cuidado com o retorno: métodos que mudam a lista no lugar costumam devolver None. ' +
          'sort() é o exemplo clássico — ele ordena a lista, mas NÃO devolve uma lista nova. ' +
          'Escrever lista = lista.sort() é um erro comum: guarda None e perde a sua lista.',
      ],
    },
    {
      titulo: 'Percorrer e o aliasing',
      paragrafos: [
        'Para visitar cada item, use um for: "for item in lista:" faz a variável item assumir, uma ' +
          'a uma, cada posição da lista, na ordem. É a forma natural de somar, contar ou imprimir ' +
          'tudo o que está dentro dela.',
        'Atribuir b = a NÃO copia a lista: b vira apenas outro NOME para a mesma lista (isso é o ' +
          'ALIASING). Mexer em b mexe em a, porque os dois apontam para o mesmo objeto na memória. ' +
          'Isso também vale quando você passa uma lista para uma função: a função recebe a lista ' +
          'real, então alterá-la lá dentro altera a de fora. Para uma cópia de verdade, use a[:].',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap10/listas.py',
    descricao:
      'Mantém um inventário de itens: cria a lista, consulta por índice e fatia, adiciona com ' +
      'append, ordena com sort, remove com pop/remove, percorre com for e demonstra o aliasing.',
    anotacoes: [
      {
        linha: 4,
        nota:
          'Uma lista nasce entre colchetes, com os itens separados por vírgula. Aqui são três ' +
          'strings, guardadas na ordem em que foram escritas.',
      },
      {
        linha: 18,
        nota:
          'append() acrescenta um item no FIM da lista, alterando-a no lugar. A lista passa de 3 ' +
          'para 4 itens; não surge uma lista nova.',
      },
      {
        linha: 22,
        nota:
          'sort() reordena a própria lista (em ordem alfabética, aqui) e devolve None. Por isso ' +
          'chamamos sozinho, sem guardar o resultado: a mudança já aconteceu na lista.',
      },
      {
        linha: 26,
        nota:
          'pop() remove e DEVOLVE o último item; por isso guardamos em "descartado". Já remove() ' +
          '(linha 30) apaga pela primeira ocorrência de um VALOR, e não devolve nada útil.',
      },
      {
        linha: 39,
        nota:
          'Aliasing: copia = inventario não cria outra lista. As duas variáveis apontam para a ' +
          'MESMA lista, então o append da linha 40 aparece também em inventario.',
      },
    ],
  },
  discussao: [
    'O índice começa em 0, não em 1: o primeiro item é lista[0] e o último é lista[len-1] (ou, ' +
      'mais fácil, lista[-1]). Pedir um índice que não existe causa erro de execução (IndexError).',
    'sort() altera a lista no LUGAR e devolve None. Nunca escreva lista = lista.sort() — você ' +
      'guardaria None e perderia a lista. Chame só lista.sort() e use a própria lista depois.',
    'Aliasing pega muita gente: b = a faz as DUAS variáveis apontarem para a mesma lista, então ' +
      'mexer em uma reflete na outra. Se você quer mesmo uma cópia independente, use b = a[:].',
    'Lista é MUTÁVEL; string é IMUTÁVEL. Você troca itens de uma lista no lugar, mas não consegue ' +
      'trocar uma letra de uma string — qualquer alteração de texto produz uma string nova.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap10/desafio.py. Ele tem uma lista de compras com TODOs: adicione "ovos" ' +
      'com append, ordene com sort, remova "leite" com remove e imprima cada item com um for.',
    arquivoBase: 'examples/cap10/desafio.py',
    dica:
      'Cada passo é uma linha. Lembre que sort() não devolve nada: chame compras.sort() sozinho. ' +
      'No for, faça "for item in compras:" e dentro use print("-", item).',
    solucao:
      'compras = ["pão", "leite", "café"]\n' +
      'print("Lista inicial:", compras)\n' +
      'compras.append("ovos")\n' +
      'compras.sort()\n' +
      'compras.remove("leite")\n' +
      'for item in compras:\n' +
      '    print("-", item)\n' +
      'print("Total de itens:", len(compras))',
  },
  quiz: [
    {
      pergunta: 'Em lista = ["a", "b", "c"], o que lista[0] devolve?',
      opcoes: ['"a"', '"b"', '"c"', 'Dá erro: índice não existe'],
      correta: 0,
      explicacao:
        'O índice começa em 0, então lista[0] é o PRIMEIRO item, "a". O último seria lista[2] ou ' +
        'lista[-1].',
    },
    {
      pergunta: 'Qual é o resultado de "x = [3, 1, 2].sort()"? Quanto vale x?',
      opcoes: ['[1, 2, 3]', 'None', '[3, 1, 2]', 'Dá erro de sintaxe'],
      correta: 1,
      explicacao:
        'sort() ordena a lista no lugar e devolve None. Por isso x recebe None — guardar o ' +
        'retorno de sort() é justamente o erro a evitar.',
    },
    {
      pergunta: 'Depois de a = [1, 2]; b = a; b.append(3), quanto vale a?',
      opcoes: ['[1, 2]', '[1, 2, 3]', '[3]', 'None'],
      correta: 1,
      explicacao:
        'Aliasing: b = a não copia a lista. a e b apontam para a MESMA lista, então o append em ' +
        'b também aparece em a, que vira [1, 2, 3].',
    },
    {
      pergunta: 'Qual destas afirmações é VERDADEIRA?',
      opcoes: [
        'String é mutável e lista é imutável',
        'Lista é mutável e string é imutável',
        'As duas são imutáveis',
        'As duas são mutáveis',
      ],
      correta: 1,
      explicacao:
        'A lista pode ser alterada no lugar (append, sort, pop...). A string é imutável: qualquer ' +
        'mudança de texto gera uma string nova, sem alterar a original.',
    },
  ],
  xp: 100,
};

export default cap10;
