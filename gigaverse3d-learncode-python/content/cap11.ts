import type { Capitulo } from '../src/types.js';

const cap11: Capitulo = {
  id: 11,
  titulo: 'Dicionários',
  paradigma: 'estruturas',
  conceitoEmFoco: {
    termo: 'Dicionário',
    explicacao:
      'Um DICIONÁRIO (dict) guarda pares CHAVE → VALOR. Ao contrário da lista, que você acessa ' +
      'por POSIÇÃO (lista[0]), o dicionário você acessa pela CHAVE: estoque["banana"]. A chave ' +
      'funciona como uma etiqueta que aponta direto para o valor, e essa busca é RÁPIDA mesmo ' +
      'quando o dicionário é enorme — o Python não precisa percorrer item por item. Por isso o ' +
      'dict é a estrutura ideal quando você quer associar coisas: nome → telefone, palavra → ' +
      'quantidade, número → resultado já calculado.',
  },
  objetivos: [
    'Criar um dicionário com {} e pares chave: valor.',
    'Acessar e atribuir valores pela chave, inserindo ou atualizando pares.',
    'Usar um dict como coletor de CONTADORES (contar frequências).',
    'Percorrer um dicionário com .items(), recebendo chave e valor de cada par.',
    'Aplicar dicionários em MEMOIZAÇÃO, guardando resultados já calculados.',
  ],
  teoria: [
    {
      titulo: 'Chave → valor, não posição',
      paragrafos: [
        'Um dicionário associa CHAVES a VALORES. Você cria com chaves {} e separa cada chave do ' +
          'seu valor com dois-pontos: estoque = {"maca": 3, "banana": 5}. Para ler, use a chave ' +
          'entre colchetes: estoque["banana"] devolve 5. A chave é a "etiqueta"; o valor é o que ' +
          'está guardado debaixo dela.',
        'Atribuir por uma chave NOVA insere um par: estoque["pera"] = 7. Atribuir por uma chave ' +
          'que JÁ existe atualiza o valor: estoque["maca"] = 4. É o mesmo operador =, e o que ' +
          'decide entre inserir ou atualizar é simplesmente a chave já existir ou não.',
      ],
    },
    {
      titulo: 'Acesso seguro e percorrer o dict',
      paragrafos: [
        'Acessar uma chave que NÃO existe com colchetes estoura um KeyError. Para evitar isso, use ' +
          '.get(chave, padrao): se a chave existe ele devolve o valor, senão devolve o padrão que ' +
          'você indicou — sem erro. estoque.get("kiwi", 0) devolve 0 quando não há kiwi.',
        'Para percorrer um dicionário, .items() entrega CHAVE e VALOR de cada par de uma vez: ' +
          'for palavra, vezes in contagem.items(). A partir do Python 3.7 a ordem em que você ' +
          'percorre é a ordem em que os pares foram INSERIDOS.',
      ],
    },
    {
      titulo: 'Contadores e memoização',
      paragrafos: [
        'O truque do CONTADOR: para somar 1 a cada aparição, faça contagem[x] = contagem.get(x, 0) ' +
          '+ 1. Se x ainda não foi visto, .get devolve 0 e o par começa em 1; se já existe, soma ' +
          'em cima do valor atual. Em poucas linhas você conta a frequência de qualquer coisa.',
        'MEMOIZAÇÃO é guardar num dict (o "cache") os resultados já calculados, para não refazer o ' +
          'mesmo trabalho. No Fibonacci, antes de calcular fib(n) checamos se n já está no cache; ' +
          'se estiver, devolvemos o valor guardado. Trocamos um pouco de MEMÓRIA por muito TEMPO.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap11/dicionarios.py',
    descricao:
      'Cria um dict de estoque, insere e atualiza por chave, conta a frequência das palavras de ' +
      'uma frase e calcula Fibonacci com memoização. Tudo determinístico, sem input().',
    anotacoes: [
      {
        linha: 4,
        nota:
          'Um dicionário nasce entre chaves {}, com cada par no formato chave: valor. Aqui as ' +
          'chaves são strings ("maca") e os valores são inteiros (a quantidade em estoque).',
      },
      {
        linha: 15,
        nota:
          '.get("kiwi", 0) acessa SEM risco: como não existe a chave "kiwi", ele devolve o padrão ' +
          '0 em vez de estourar um KeyError, que é o que aconteceria com estoque["kiwi"].',
      },
      {
        linha: 23,
        nota:
          'O truque do contador: contagem.get(palavra, 0) começa em 0 na primeira vez que a ' +
          'palavra aparece e, somando + 1, acumula a cada nova aparição.',
      },
      {
        linha: 27,
        nota:
          '.items() percorre o dicionário entregando os DOIS valores de cada par ao mesmo tempo: ' +
          'palavra recebe a chave e vezes recebe o valor.',
      },
      {
        linha: 37,
        nota:
          'O coração da memoização: antes de recalcular, "n in cache" checa se já temos o ' +
          'resultado guardado. Se sim, devolvemos na linha seguinte sem refazer a conta.',
      },
    ],
  },
  discussao: [
    'Acessar uma chave que não existe com colchetes (estoque["kiwi"]) dá KeyError e derruba o ' +
      'programa. Quando não tem certeza de que a chave existe, use .get() (com um padrão) ou ' +
      'cheque antes com "chave in dicionario".',
    'A CHAVE precisa ser de um tipo IMUTÁVEL: str, int, float, bool ou tupla servem. Uma lista ' +
      'NÃO pode ser chave (ela é mutável) e tentar usá-la dá TypeError: unhashable type. O VALOR, ' +
      'esse sim, pode ser qualquer coisa, inclusive uma lista ou outro dict.',
    'A partir do Python 3.7 o dicionário PRESERVA a ordem de inserção: ao percorrer, os pares ' +
      'saem na ordem em que entraram. Mas a ideia central continua sendo a busca por chave, não ' +
      'por posição — não existe estoque[0] como numa lista.',
    'Memoização TROCA TEMPO POR MEMÓRIA: o cache acelera muito porque evita recalcular, mas cada ' +
      'resultado guardado ocupa espaço. Para problemas pequenos compensa de longe; só vale lembrar ' +
      'que o dict cresce conforme você guarda mais valores.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap11/desafio.py. Ele percorre a palavra "abacaxi" letra por letra, mas a ' +
      'contagem está travada em 0. Complete a linha para contar quantas vezes cada LETRA aparece.',
    arquivoBase: 'examples/cap11/desafio.py',
    dica:
      'Use o mesmo truque do contador da demo: contagem.get(letra, 0) + 1. Assim cada letra nova ' +
      'começa em 1 e as repetidas vão somando.',
    solucao:
      'contagem = {}\n' +
      'for letra in palavra:\n' +
      '    contagem[letra] = contagem.get(letra, 0) + 1\n' +
      'for letra, vezes in contagem.items():\n' +
      '    print(f"{letra}: {vezes}")',
  },
  quiz: [
    {
      pergunta: 'Num dicionário, você acessa um valor principalmente pela:',
      opcoes: ['Posição (índice numérico)', 'Chave', 'Ordem alfabética', 'Quantidade de itens'],
      correta: 1,
      explicacao:
        'O dict associa chave → valor; você busca pela chave (estoque["banana"]), não por posição ' +
        'como numa lista. Por isso a busca é rápida mesmo em dicionários grandes.',
    },
    {
      pergunta: 'O que acontece ao acessar estoque["kiwi"] se a chave "kiwi" não existe?',
      opcoes: ['Devolve 0', 'Devolve None', 'Dá KeyError', 'Cria a chave automaticamente'],
      correta: 2,
      explicacao:
        'Colchetes com chave inexistente estouram KeyError. Para evitar, use .get("kiwi", 0), que ' +
        'devolve um padrão em vez de erro.',
    },
    {
      pergunta: 'Qual destes NÃO pode ser usado como chave de um dicionário?',
      opcoes: ['Uma string', 'Um inteiro', 'Uma lista', 'Uma tupla'],
      correta: 2,
      explicacao:
        'A chave precisa ser imutável. Lista é mutável, então dá TypeError (unhashable). String, ' +
        'inteiro e tupla são imutáveis e servem como chave.',
    },
    {
      pergunta: 'Na memoização do Fibonacci, para que serve o dict "cache"?',
      opcoes: [
        'Para guardar resultados já calculados e não refazer a conta',
        'Para ordenar os números de Fibonacci',
        'Para converter os valores em texto',
        'Para limitar o valor máximo de n',
      ],
      correta: 0,
      explicacao:
        'O cache guarda cada fib(n) já calculado. Antes de recalcular, checamos "n in cache"; se ' +
        'já estiver lá, reaproveitamos. É trocar memória por tempo.',
    },
  ],
  xp: 100,
};

export default cap11;
