import type { Capitulo } from '../src/types.js';

const cap19: Capitulo = {
  id: 19,
  titulo: 'Os agrados (extra)',
  paradigma: 'funcional',
  conceitoEmFoco: {
    termo: 'List comprehension e generator',
    explicacao:
      'A COMPREHENSION é o jeito "pythônico"/funcional de transformar uma coleção em outra numa ' +
      'única linha, descrevendo O QUE você quer em vez de escrever um laço passo a passo. O ' +
      'GERADOR vai além: em vez de montar a lista inteira de uma vez, ele produz um valor por vez, ' +
      'sob demanda (preguiçoso). Isso economiza memória — você nunca guarda tudo junto, só o ' +
      'próximo valor quando ele é pedido.',
  },
  objetivos: [
    'Trocar um laço que preenche uma lista pela list comprehension equivalente.',
    'Escrever dict comprehension e set comprehension para montar dicionários e conjuntos.',
    'Usar a expressão condicional (x if cond else y) dentro de uma comprehension.',
    'Resumir uma coleção de testes com any() e all().',
    'Definir uma função geradora com yield e contar itens com Counter.',
  ],
  teoria: [
    {
      titulo: 'Comprehension: o laço em uma linha',
      paragrafos: [
        'Uma LIST COMPREHENSION descreve uma nova lista a partir de outra: [n * n for n in numeros ' +
          'if n % 2 == 0]. Leia da esquerda para a direita: "para cada n em numeros, SE for par, ' +
          'guarde n * n". As três peças são a transformação (n * n), a iteração (for n in numeros) ' +
          'e o filtro opcional (if). É o mesmo que um for com append(), mas mais curto e direto.',
        'A mesma ideia vale para outras coleções: trocando os colchetes por chaves você ganha uma ' +
          'DICT comprehension ({n: n * n for n in numeros}) ou uma SET comprehension ({n % 3 for n ' +
          'in numeros}). A dict monta pares chave: valor; a set descarta repetidos automaticamente.',
      ],
    },
    {
      titulo: 'Expressão condicional e any/all',
      paragrafos: [
        'A EXPRESSÃO CONDICIONAL x if cond else y escolhe entre dois valores numa única expressão: ' +
          '"par" if n % 2 == 0 else "impar". Não confunda com o if FILTRO da comprehension: o ' +
          'filtro decide se o item entra; a condicional decide QUAL valor o item vira. O filtro ' +
          'vem depois do for; a condicional vem antes (no lugar da transformação).',
        'any() devolve True se PELO MENOS UM item for verdadeiro; all() devolve True só se TODOS ' +
          'forem. Ambos resumem uma coleção de testes num único bool e fazem CURTO-CIRCUITO: any() ' +
          'para no primeiro True, all() para no primeiro False — não precisam ver o resto.',
      ],
    },
    {
      titulo: 'Geradores: um valor por vez',
      paragrafos: [
        'Uma FUNÇÃO GERADORA parece uma função normal, mas usa yield no lugar de return. Cada yield ' +
          'devolve um valor e PAUSA a função ali; quando o próximo valor é pedido, ela continua de ' +
          'onde parou. Por isso o gerador é preguiçoso: ele não calcula tudo de uma vez, só produz ' +
          'o próximo valor quando o for pede.',
        'Isso economiza memória: percorrer um gerador de um milhão de números nunca guarda o ' +
          'milhão na memória ao mesmo tempo. O preço é que um gerador só pode ser percorrido UMA ' +
          'vez — depois de esgotado, ele não recomeça. Para contar ocorrências sem laço, o Counter ' +
          '(do módulo collections) recebe uma coleção e devolve quantas vezes cada item aparece.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap19/agrados.py',
    descricao:
      'Compara um laço tradicional com a list comprehension equivalente, mostra dict e set ' +
      'comprehension, expressão condicional, any/all, uma função geradora com yield e a contagem ' +
      'com Counter. Tudo determinístico, sem input().',
    anotacoes: [
      {
        linha: 17,
        nota:
          'A list comprehension faz o mesmo que o laço das linhas 10-13, mas em uma linha: para ' +
          'cada n, o filtro if n % 2 == 0 deixa passar só os pares e n * n é o que entra na lista.',
      },
      {
        linha: 21,
        nota:
          'Dict comprehension: as chaves {} e o : separando chave de valor produzem um dicionário ' +
          '{numero: quadrado} direto, sem precisar criar o dict vazio e preencher item a item.',
      },
      {
        linha: 25,
        nota:
          'Set comprehension: também usa {}, mas sem o :. O resultado é um conjunto, então restos ' +
          'repetidos (0, 1 e 2 aparecem várias vezes) são descartados automaticamente.',
      },
      {
        linha: 33,
        nota:
          'any(n > 8 for n in numeros) recebe uma expressão geradora e devolve True assim que ' +
          'encontra o primeiro número maior que 8 — não precisa testar os demais (curto-circuito).',
      },
      {
        linha: 41,
        nota:
          'yield devolve um valor e PAUSA a função aqui. No próximo valor pedido pelo for, ela ' +
          'retoma da linha seguinte. É isso que torna o gerador preguiçoso: um valor por vez.',
      },
      {
        linha: 50,
        nota:
          'Counter(palavras) percorre a lista e conta sozinho quantas vezes cada item aparece, ' +
          'devolvendo algo como {"sol": 3, "lua": 2, "mar": 1} — uma contagem sem escrever laço.',
      },
    ],
  },
  discussao: [
    'A comprehension cria a lista INTEIRA na memória de uma vez. Para poucos itens é ótimo; para ' +
      'milhões, pode pesar. Quando você só vai percorrer os valores uma vez, troque os colchetes ' +
      'por parênteses e use uma expressão geradora — ela produz um por vez e gasta quase nada.',
    'O gerador é PREGUIÇOSO e descartável: só produz valor quando pedido e só pode ser percorrido ' +
      'UMA vez. Depois que um for o esgota, percorrer de novo não devolve nada — você teria que ' +
      'chamar a função geradora outra vez para obter um gerador novo.',
    'any() e all() fazem CURTO-CIRCUITO: any() para no primeiro True e all() no primeiro False. ' +
      'Cuidado com o caso vazio: any([]) é False e all([]) é True (não há nenhum item que falhe).',
    'Comprehension é para LEGIBILIDADE. Uma linha clara vence um laço de quatro linhas; mas uma ' +
      'comprehension aninhada, com vários for e if empilhados, costuma ficar ilegível — nesses ' +
      'casos, volte ao laço tradicional, que é mais fácil de ler.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap19/desafio.py. Complete a list comprehension que pega apenas os preços ' +
      'maiores que 100 e aplica 10% de desconto (preco * 0.9), e use all() para responder se ' +
      'todos os preços são positivos. Rode e confira a saída.',
    arquivoBase: 'examples/cap19/desafio.py',
    dica:
      'Na comprehension, o filtro vem depois do for: [preco * 0.9 for preco in precos if preco > ' +
      '100]. Para o all(), passe uma expressão geradora: all(preco > 0 for preco in precos).',
    solucao:
      'precos = [80, 120, 50, 200, 99, 150]\n' +
      'com_desconto = [preco * 0.9 for preco in precos if preco > 100]\n' +
      'print("Precos com desconto ->", com_desconto)\n' +
      'todos_positivos = all(preco > 0 for preco in precos)\n' +
      'print("Todos positivos? ->", todos_positivos)',
  },
  quiz: [
    {
      pergunta: 'O que faz [n * n for n in numeros if n % 2 == 0]?',
      opcoes: [
        'Eleva ao quadrado todos os números',
        'Eleva ao quadrado apenas os números pares',
        'Soma os números pares',
        'Dá erro: comprehension não aceita if',
      ],
      correta: 1,
      explicacao:
        'O if é o filtro: deixa passar só os pares (n % 2 == 0); n * n é a transformação aplicada ' +
        'a cada um deles. O resultado é a lista dos quadrados dos pares.',
    },
    {
      pergunta: 'Qual a principal diferença entre uma comprehension e uma expressão geradora?',
      opcoes: [
        'Não há diferença, são sinônimos',
        'A comprehension monta a coleção toda na memória; o gerador produz um valor por vez',
        'O gerador é mais rápido para todos os casos',
        'A comprehension só funciona com números',
      ],
      correta: 1,
      explicacao:
        'A comprehension cria a coleção inteira de uma vez; o gerador é preguiçoso, produz cada ' +
        'valor sob demanda e por isso economiza memória.',
    },
    {
      pergunta: 'O que a palavra-chave yield faz numa função geradora?',
      opcoes: [
        'Encerra a função como o return',
        'Devolve um valor e PAUSA a função, retomando depois de onde parou',
        'Imprime o valor na tela',
        'Cria uma lista com todos os valores',
      ],
      correta: 1,
      explicacao:
        'yield devolve um valor e pausa a execução; no próximo valor pedido, a função continua da ' +
        'linha seguinte. Isso é o que torna o gerador preguiçoso.',
    },
    {
      pergunta: 'Quanto vale all([]) (all sobre uma lista vazia)?',
      opcoes: ['False', 'True', 'Dá erro', 'None'],
      correta: 1,
      explicacao:
        'all([]) é True: como não há nenhum item que falhe o teste, a condição "todos passam" é ' +
        'considerada verdadeira. Já any([]) é False.',
    },
  ],
  xp: 100,
};

export default cap19;
