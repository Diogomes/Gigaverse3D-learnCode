import type { Capitulo } from '../src/types.js';

const cap13: Capitulo = {
  id: 13,
  titulo: 'Estudo de caso: seleção de estrutura de dados',
  paradigma: 'estruturas',
  conceitoEmFoco: {
    termo: 'Escolher a estrutura certa',
    explicacao:
      'Lista, dict, set e tupla não são intercambiáveis: cada uma resolve bem um tipo de ' +
      'pergunta. Lista guarda itens em ORDEM e aceita repetições. dict liga uma CHAVE a um ' +
      'VALOR (ótimo para contar). set guarda itens ÚNICOS, sem ordem, e responde "pertence?" ' +
      'muito rápido. tupla é uma sequência FIXA. Escolher a estrutura certa torna o código mais ' +
      'simples e, muitas vezes, mais rápido — porque cada operação tem um custo diferente em cada uma.',
  },
  objetivos: [
    'Reconhecer para que serve cada estrutura: lista, dict, set e tupla.',
    'Montar um histograma de frequência de palavras usando um dict.',
    'Usar um set para contar palavras únicas e testar pertencimento.',
    'Ranquear as palavras mais comuns com sorted(..., key=..., reverse=True).',
    'Ter uma noção informal de eficiência: quando o set vence a lista.',
  ],
  teoria: [
    {
      titulo: 'Cada estrutura responde uma pergunta',
      paragrafos: [
        'Antes de programar, vale perguntar O QUE você precisa guardar. Se a ORDEM importa e há ' +
          'repetições, use uma LISTA. Se você quer associar um rótulo a um número (palavra → ' +
          'contagem), use um DICT. Se só importa "quais itens DIFERENTES existem", use um SET. Se ' +
          'o conjunto nunca muda (um par de coordenadas, por exemplo), uma TUPLA expressa isso.',
        'A estrutura certa muitas vezes faz o código quase se escrever sozinho. Contar palavras ' +
          'com um dict é natural; tentar a mesma contagem só com listas dá muito mais trabalho.',
      ],
    },
    {
      titulo: 'Histograma com dict',
      paragrafos: [
        'Um histograma de frequência é só um dict em que a chave é a palavra e o valor é quantas ' +
          'vezes ela apareceu. Percorremos a lista de palavras e, para cada uma, somamos 1 na sua ' +
          'contagem. O truque é o método get: frequencia.get(palavra, 0) devolve a contagem atual ' +
          'ou 0 se a palavra ainda não está no dict — evitando um erro de chave inexistente.',
        'Para descobrir quantas palavras DIFERENTES há, não precisamos do dict: set(palavras) joga ' +
          'tudo num conjunto e as duplicatas somem sozinhas. len() desse set é a resposta.',
      ],
    },
    {
      titulo: 'Ranquear com sorted e key',
      paragrafos: [
        'Para achar as palavras mais comuns, ordenamos os PARES (palavra, contagem) do dict. ' +
          'frequencia.items() entrega esses pares; sorted os coloca em ordem. O parâmetro key diz ' +
          'POR QUAL valor ordenar — aqui, pela contagem (o segundo item do par, item[1]). E ' +
          'reverse=True inverte para o MAIOR vir primeiro. Depois, uma fatia [:3] pega o top 3.',
        'Repare que sorted nunca altera o dict: ele devolve uma LISTA nova já ordenada. Trocar de ' +
          'estrutura no meio do caminho (de dict para lista) é comum e perfeitamente normal.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap13/frequencia.py',
    descricao:
      'A partir de um texto embutido, normaliza as palavras, monta um histograma com dict, conta ' +
      'palavras únicas com set e imprime as 3 palavras mais frequentes. Saída determinística.',
    anotacoes: [
      {
        linha: 15,
        nota:
          'lower() deixa tudo minúsculo (para "O" e "o" contarem juntos) e split() quebra o texto ' +
          'numa LISTA de palavras, separando por qualquer espaço ou quebra de linha.',
      },
      {
        linha: 23,
        nota:
          'O coração do histograma: frequencia.get(palavra, 0) pega a contagem atual (ou 0 se for ' +
          'a primeira vez) e soma 1. O dict liga cada palavra à sua contagem.',
      },
      {
        linha: 27,
        nota:
          'set(palavras) cria um conjunto: as repetições desaparecem sozinhas. Por isso len(unicas) ' +
          'já é o número de palavras DIFERENTES, sem precisar contar à mão.',
      },
      {
        linha: 31,
        nota:
          '"gato" in unicas testa pertencimento. Em um set isso é rápido mesmo com muitos itens, ' +
          'porque não é preciso percorrer um a um como faríamos numa lista grande.',
      },
      {
        linha: 36,
        nota:
          'sorted ordena os pares (palavra, contagem). key=lambda item: item[1] manda ordenar pela ' +
          'contagem, e reverse=True coloca a maior primeiro. O resultado é uma LISTA nova.',
      },
    ],
  },
  discussao: [
    'O set NÃO tem ordem nem guarda duplicatas. Ele é ótimo para "quais itens existem" e para ' +
      'testar pertencimento, mas se você precisa manter a ordem ou contar repetições, ele não ' +
      'serve — aí o caso é lista (ordem) ou dict (contagem).',
    'Checar "x in colecao" num SET é muito mais rápido do que numa LISTA grande: a lista percorre ' +
      'item por item, enquanto o set vai quase direto. Para muitas verificações de pertencimento, ' +
      'converter a lista em set antes compensa.',
    'Para contar ocorrências, o dict é o caminho natural: chave é o item, valor é a contagem. ' +
      'Tentar contar só com listas (procurando e atualizando posições) é trabalhoso e mais lento.',
    'sorted(..., key=..., reverse=True) é o padrão para ranquear: key escolhe POR QUE ordenar e ' +
      'reverse=True faz o maior vir primeiro. Esquecer o reverse devolve a ordem crescente — o ' +
      'top da lista seria, então, o MENOS frequente.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap13/desafio.py. Ele já tem um texto e o início do histograma. Complete o ' +
      'laço para contar cada palavra e depois descubra quantas palavras aparecem APENAS UMA VEZ.',
    arquivoBase: 'examples/cap13/desafio.py',
    dica:
      'No laço, use frequencia[palavra] = frequencia.get(palavra, 0) + 1. Depois, percorra ' +
      'frequencia.items() e, para cada par (palavra, vezes), se vezes == 1 some 1 num contador.',
    solucao:
      'frequencia = {}\n' +
      'for palavra in palavras:\n' +
      '    frequencia[palavra] = frequencia.get(palavra, 0) + 1\n' +
      '\n' +
      'aparecem_uma_vez = 0\n' +
      'for palavra, vezes in frequencia.items():\n' +
      '    if vezes == 1:\n' +
      '        aparecem_uma_vez += 1\n' +
      '\n' +
      'print("Palavras que aparecem só uma vez:", aparecem_uma_vez)',
  },
  quiz: [
    {
      pergunta: 'Você precisa contar quantas vezes cada palavra aparece. Qual estrutura é a mais natural?',
      opcoes: ['Lista', 'dict (chave = palavra, valor = contagem)', 'set', 'tupla'],
      correta: 1,
      explicacao:
        'O dict liga cada palavra (chave) à sua contagem (valor), o que torna a contagem direta. ' +
        'Lista e set não associam um número a cada item.',
    },
    {
      pergunta: 'O que set(palavras) faz com palavras repetidas?',
      opcoes: [
        'Mantém todas, em ordem',
        'Descarta as duplicatas, deixando só itens únicos',
        'Soma quantas vezes cada uma aparece',
        'Dá erro',
      ],
      correta: 1,
      explicacao:
        'Um set guarda apenas itens únicos e não tem ordem. Por isso len(set(palavras)) é o número ' +
        'de palavras diferentes.',
    },
    {
      pergunta: 'Para ranquear do MAIS frequente ao menos frequente, o que falta em sorted(frequencia.items(), key=lambda i: i[1])?',
      opcoes: ['Nada, já está certo', 'reverse=True', 'reverse=False', 'key=i[0]'],
      correta: 1,
      explicacao:
        'Sem reverse=True a ordem é crescente, então o menos frequente viria primeiro. reverse=True ' +
        'coloca a maior contagem no topo.',
    },
    {
      pergunta: 'Por que testar "x in colecao" pode ser mais rápido num set do que numa lista grande?',
      opcoes: [
        'O set guarda os itens em ordem alfabética',
        'A lista percorre item por item; o set vai quase direto ao item',
        'Sets são sempre menores que listas',
        'Não há diferença de velocidade',
      ],
      correta: 1,
      explicacao:
        'Numa lista o Python checa um elemento de cada vez. No set a busca de pertencimento é quase ' +
        'imediata, o que pesa quando há muitos itens ou muitas verificações.',
    },
  ],
  xp: 100,
};

export default cap13;
