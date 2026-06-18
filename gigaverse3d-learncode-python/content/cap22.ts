import type { Capitulo } from '../src/types.js';

const cap22: Capitulo = {
  id: 22,
  titulo: 'Módulo extra: Programação Funcional',
  paradigma: 'funcional',
  conceitoEmFoco: {
    termo: 'Funções de primeira classe',
    explicacao:
      'Em Python, uma FUNÇÃO é um valor como qualquer outro: assim como você guarda um número ' +
      'numa variável, você pode guardar uma função, passá-la como argumento para outra função e ' +
      'até devolvê-la como resultado. Isso é o que significa "função de primeira classe". A partir ' +
      'daí nascem as ideias do estilo funcional: descrever O QUE fazer com os dados (filtrar, ' +
      'transformar, reduzir) em vez de escrever, passo a passo, COMO percorrer tudo na mão.',
  },
  objetivos: [
    'Entender que, em Python, funções são valores que cabem em variáveis e argumentos.',
    'Escrever funções anônimas com lambda e usá-las em map(), filter() e sorted(key=...).',
    'Reduzir uma sequência a um único valor com functools.reduce().',
    'Reconhecer um closure: uma função que "lembra" variáveis do escopo onde nasceu.',
    'Ler e escrever um DECORADOR (@) e fixar argumentos com functools.partial.',
  ],
  teoria: [
    {
      titulo: 'lambda e funções de ordem superior',
      paragrafos: [
        'Uma lambda é uma função anônima de UMA expressão: lambda x: x * 2 é o mesmo que uma ' +
          'função que recebe x e devolve x * 2, só que sem nome e em uma linha. Ela é útil quando ' +
          'você precisa de uma função pequena só para passar adiante.',
        'Função de ORDEM SUPERIOR é aquela que recebe (ou devolve) outra função. map(f, dados) ' +
          'aplica f a cada item; filter(f, dados) mantém só os itens em que f dá True; e ' +
          'sorted(dados, key=f) ordena usando o valor que f extrai de cada item. Em todos, a ' +
          'função é só mais um argumento.',
      ],
    },
    {
      titulo: 'map, filter e reduce: o pipeline',
      paragrafos: [
        'O trio clássico do estilo funcional: filter SELECIONA itens, map TRANSFORMA cada item e ' +
          'reduce COMBINA tudo num único valor. Encadeados, eles formam um "pipeline": os dados ' +
          'entram, passam por cada etapa e saem como um resultado.',
        'Cuidado: em Python 3, map() e filter() são PREGUIÇOSOS — devolvem um iterador, não uma ' +
          'lista pronta. Eles só calculam quando alguém percorre o resultado. Para enxergar os ' +
          'valores, envolva em list(). Já o reduce mora em functools: from functools import reduce.',
      ],
    },
    {
      titulo: 'Closures e decoradores',
      paragrafos: [
        'Um CLOSURE acontece quando uma função interna usa uma variável da função externa e é ' +
          'devolvida para fora: ela carrega consigo a "lembrança" daquela variável. Por isso ' +
          'faz_multiplicador(2) devolve uma função que continua sabendo que o fator é 2.',
        'Um DECORADOR é uma aplicação direta disso: uma função que RECEBE uma função e DEVOLVE ' +
          'outra que a embrulha, acrescentando comportamento (medir tempo, registrar, validar). ' +
          'A sintaxe @cronometro acima de uma função é só um atalho para funcao = cronometro(funcao). ' +
          'E functools.partial cria uma nova função com alguns argumentos já "congelados".',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap22/funcional.py',
    descricao:
      'Monta um pipeline funcional sobre uma lista de jogadores: filtra quem tem muitos pontos, ' +
      'mapeia para os pontos e reduz para a soma. Mostra um decorador @cronometro, sorted(key=...), ' +
      'functools.partial e um closure.',
    anotacoes: [
      {
        linha: 10,
        nota:
          'cronometro é um DECORADOR: recebe uma função (funcao) e devolve outra (embrulho). O ' +
          'embrulho roda a função original, mede o tempo em volta e repassa o resultado.',
      },
      {
        linha: 33,
        nota:
          'filter + lambda: o lambda é a regra de seleção (pontos acima do limite). filter é ' +
          'preguiçoso — devolve um iterador, então só dá para "ver" os itens ao percorrê-lo.',
      },
      {
        linha: 37,
        nota:
          'reduce combina a sequência num único valor: começa em 0 e vai somando cada ponto. O ' +
          'terceiro argumento (0) é o valor inicial do acumulador.',
      },
      {
        linha: 42,
        nota:
          'partial cria soma_acima a partir de pipeline, já fixando limite=50. Chamar ' +
          'soma_acima(jogadores) é o mesmo que pipeline(jogadores, limite=50).',
      },
      {
        linha: 49,
        nota:
          'sorted com key=lambda: a lambda diz POR QUAL valor ordenar (os pontos). reverse=True ' +
          'inverte a ordem, do maior para o menor, sem alterar a lista original.',
      },
    ],
  },
  discussao: [
    'lambda é uma função anônima de UMA expressão só — não cabe um if/for completo nem várias ' +
      'linhas dentro dela. Se a lógica cresce, volte a usar def com nome: fica mais legível.',
    'map() e filter() devolvem ITERADORES preguiçosos, não listas. Se você imprimir o resultado ' +
      'direto verá algo como <map object ...>; e, depois de percorrê-lo uma vez, ele "esvazia". ' +
      'Envolva em list() quando quiser ver ou reutilizar os valores.',
    'Um decorador é uma função que RECEBE e DEVOLVE uma função. @cronometro é só açúcar para ' +
      'funcao = cronometro(funcao): a função "decorada" passa a ser a versão embrulhada.',
    'Closure captura a VARIÁVEL, não uma cópia do valor no momento. Se a variável capturada muda ' +
      'depois, a função vai enxergar o novo valor — um detalhe que pega muita gente em laços.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap22/desafio.py. Ele tem uma lista de produtos. Corrija o reduce para que ' +
      'ele realmente some os preços (em vez de somar 0) e ajuste o sorted para ordenar do mais ' +
      'barato para o mais caro. Rode e confira a saída.',
    arquivoBase: 'examples/cap22/desafio.py',
    dica:
      'No reduce, o lambda deve devolver acumulado + preco (não + 0). No sorted, a key deve ser ' +
      'lambda p: p["preco"] para ordenar pelo preço.',
    solucao:
      'total = reduce(lambda acumulado, preco: acumulado + preco, precos, 0)\n' +
      'ordenados = sorted(produtos, key=lambda p: p["preco"])',
  },
  quiz: [
    {
      pergunta: 'O que map(lambda x: x * 2, [1, 2, 3]) devolve em Python 3?',
      opcoes: [
        'A lista [2, 4, 6] pronta',
        'Um iterador preguiçoso (precisa de list() para ver os valores)',
        'O número 12',
        'Um erro de sintaxe',
      ],
      correta: 1,
      explicacao:
        'Em Python 3, map() é preguiçoso: devolve um iterador. Para enxergar [2, 4, 6] é preciso ' +
        'envolver em list(map(...)).',
    },
    {
      pergunta: 'O que é um decorador em Python?',
      opcoes: [
        'Um comentário especial que enfeita o código',
        'Uma função que recebe uma função e devolve outra função',
        'Um tipo de variável global',
        'Uma forma de importar módulos',
      ],
      correta: 1,
      explicacao:
        '@cronometro é apenas um atalho para funcao = cronometro(funcao): cronometro recebe a ' +
        'função e devolve uma versão embrulhada dela.',
    },
    {
      pergunta: 'Para que serve o terceiro argumento em reduce(soma, dados, 0)?',
      opcoes: [
        'É o número máximo de itens',
        'É o valor inicial do acumulador',
        'É o índice por onde começar',
        'Não tem efeito nenhum',
      ],
      correta: 1,
      explicacao:
        'O 0 é o valor inicial do acumulador. reduce começa nele e vai combinando cada item da ' +
        'sequência por cima.',
    },
    {
      pergunta: 'Em sorted(jogadores, key=lambda j: j["pontos"]), o que a lambda faz?',
      opcoes: [
        'Decide quem fica de fora da lista',
        'Diz qual valor de cada item usar como critério de ordenação',
        'Soma todos os pontos',
        'Transforma a lista em um iterador',
      ],
      correta: 1,
      explicacao:
        'A key recebe cada item e devolve o valor pelo qual ordenar — aqui, os pontos. sorted usa ' +
        'esse valor para comparar os itens.',
    },
  ],
  xp: 100,
};

export default cap22;
