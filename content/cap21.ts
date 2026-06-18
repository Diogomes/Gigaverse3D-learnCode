import type { Capitulo } from '../src/types.js';

const cap21: Capitulo = {
  id: 21,
  titulo: 'Estruturas de dados genéricas personalizadas',
  conceitoEmFoco: {
    termo: 'Lista ligada',
    explicacao:
      'Numa lista ligada os dados não ficam grudados em sequência na memória (como num array). ' +
      'Em vez disso, cada elemento é um "nó" que guarda o seu valor e uma referência apontando ' +
      'para o próximo nó. É como uma caça ao tesouro: cada pista (nó) diz onde encontrar a ' +
      'próxima. O último nó aponta para nada (null). Assim a estrutura cresce e encolhe só ' +
      'criando ou soltando nós, sem precisar de índices contíguos.',
  },
  objetivos: [
    'Entender o que é um nó e como ele aponta para o próximo (lista ligada).',
    'Criar uma classe interna auto-referencial (um No que tem um campo do tipo No).',
    'Implementar do zero uma Pilha<T> genérica com push, pop, peek e isEmpty.',
    'Reconhecer o comportamento LIFO (o último a entrar é o primeiro a sair).',
    'Ter uma visão geral de pilha, fila e árvore como variações de nós ligados.',
  ],
  teoria: [
    {
      titulo: 'Nós que apontam para nós',
      paragrafos: [
        'Um array guarda tudo lado a lado na memória, com índices 0, 1, 2... Uma lista ligada ' +
          'faz diferente: cada valor mora num "nó", e cada nó carrega uma referência para o ' +
          'próximo nó. Não há índice contíguo — você só consegue chegar ao terceiro nó passando ' +
          'pelo primeiro e pelo segundo.',
        'Para isso usamos uma classe auto-referencial: a classe No tem um campo do tipo No ' +
          '(chamado "proximo"). Parece estranho uma classe referenciar a si mesma, mas é ' +
          'exatamente isso que encadeia os elementos. O último nó tem proximo = null, marcando o fim.',
      ],
    },
    {
      titulo: 'Pilha (LIFO): empilhar e desempilhar',
      paragrafos: [
        'Uma pilha funciona como uma pilha de pratos: você só mexe no topo. push coloca um prato ' +
          'em cima; pop tira o de cima; peek apenas olha o de cima sem tirar. Por isso dizemos ' +
          'LIFO: Last In, First Out — o último que entrou é o primeiro a sair.',
        'Implementar a pilha com nós é simples e elegante: o "topo" é a cabeça da lista ligada. ' +
          'Para fazer push, criamos um nó novo cujo proximo é o topo antigo, e ele vira o novo ' +
          'topo. Para pop, devolvemos o valor do topo e fazemos o topo apontar para o próximo nó. ' +
          'Um botão "desfazer" é uma pilha: cada ação vai para o topo e o pop desfaz a mais recente.',
      ],
    },
    {
      titulo: 'Fila e árvore: a mesma ideia, outros formatos',
      paragrafos: [
        'A fila (FIFO) é como uma fila de banco: quem chega primeiro é atendido primeiro. Ela ' +
          'também usa nós ligados, mas remove pela frente e insere no fim — o oposto da pilha.',
        'A árvore leva a ideia adiante: em vez de cada nó apontar para um único próximo, ele ' +
          'aponta para vários filhos. É ótima para representar hierarquias (pastas, organogramas) ' +
          'e buscas rápidas. Todas essas estruturas nascem do mesmo princípio: nós que referenciam outros nós.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap21/Historico.java',
    descricao:
      'Uma Pilha<T> genérica construída do zero com nós encadeados (lista ligada). Ela é usada ' +
      'como histórico de "desfazer": cada ação entra com push e o pop desfaz a mais recente, ' +
      'demonstrando o comportamento LIFO. A mesma pilha também é reutilizada com Integer.',
    anotacoes: [
      { linha: 8, nota: 'Pilha<String>: a estrutura é genérica, então aqui ela guarda Strings (as ações do usuário).' },
      { linha: 23, nota: 'pop() retira sempre o topo. Como entrou "apagar paragrafo" por último, ele sai primeiro (LIFO).' },
      { linha: 43, nota: 'Classe interna auto-referencial: No<T> tem um campo proximo do tipo No<T>. É isso que encadeia os nós.' },
      { linha: 45, nota: 'A referência "proximo" liga um nó ao seguinte; no último nó ela é null, marcando o fim da lista.' },
      { linha: 58, nota: 'push: o nó novo aponta para o topo antigo e vira o novo topo — a cabeça da lista ligada.' },
      { linha: 68, nota: 'pop: o topo passa a ser o próximo nó. O nó removido fica sem ninguém apontando para ele.' },
    ],
  },
  discussao: [
    'A grande vantagem da lista ligada é crescer e encolher sem reservar tamanho fixo: cada push ' +
      'cria um nó, cada pop solta um. A desvantagem é que não dá para "pular" direto a um elemento ' +
      'pelo índice — é preciso seguir as referências.',
    'Esquecer de tratar a pilha vazia é um erro clássico: chamar pop ou peek sem elementos deve ' +
      'avisar (no exemplo, lançamos uma exceção) em vez de quebrar silenciosamente.',
    'O <T> torna a estrutura reutilizável: a mesma Pilha serve para String, Integer ou qualquer ' +
      'tipo, sem reescrever o código. Por isso falamos em estrutura GENÉRICA.',
    'O Java já oferece Deque/Stack e LinkedList prontos. Mesmo assim, construir uma à mão ensina ' +
      'como elas funcionam por dentro — conhecimento que você leva para filas e árvores.',
  ],
  desafio: {
    enunciado:
      'A classe Fila<T> (FIFO) já tem enfileirar pronto, mas falta o desenfileirar(). Complete-o: ' +
      'ele deve remover e devolver o valor do INÍCIO da fila, avançar a referência "inicio" para o ' +
      'próximo nó e, se a fila ficar vazia, zerar também o "fim". Depois de pronto, o main deve ' +
      'imprimir A, B e C nessa ordem (quem entrou primeiro sai primeiro).',
    arquivoBase: 'examples/cap21/Desafio.java',
    dica:
      'Se inicio for null, lance um erro (fila vazia). Senão: guarde T valor = inicio.valor; faça ' +
      'inicio = inicio.proximo; se inicio virar null, faça fim = null também; e retorne valor.',
    solucao:
      'public T desenfileirar() {\n' +
      '    if (inicio == null) {\n' +
      '        throw new RuntimeException("Fila vazia.");\n' +
      '    }\n' +
      '    T valor = inicio.valor;\n' +
      '    inicio = inicio.proximo;   // avanca para o proximo no\n' +
      '    if (inicio == null) {\n' +
      '        fim = null;            // a fila ficou vazia\n' +
      '    }\n' +
      '    return valor;\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que caracteriza uma lista ligada?',
      opcoes: [
        'Os dados ficam sempre em posições contíguas na memória, acessados por índice',
        'Cada nó guarda um valor e uma referência apontando para o próximo nó',
        'É um array que dobra de tamanho automaticamente',
        'É outro nome para um vetor de inteiros',
      ],
      correta: 1,
      explicacao:
        'Na lista ligada cada elemento é um nó que aponta para o próximo; não há índice contíguo, e o último nó aponta para null.',
    },
    {
      pergunta: 'Numa pilha (LIFO), o que o pop() devolve?',
      opcoes: [
        'O primeiro elemento que foi inserido',
        'Um elemento aleatório',
        'O último elemento que foi inserido (o do topo)',
        'Todos os elementos de uma vez',
      ],
      correta: 2,
      explicacao:
        'LIFO = Last In, First Out: o pop remove o topo, que é o elemento inserido mais recentemente.',
    },
    {
      pergunta: 'Por que a classe No é chamada de "auto-referencial"?',
      opcoes: [
        'Porque ela tem um campo cujo tipo é a própria classe No (a referência ao próximo)',
        'Porque ela se cria sozinha sem construtor',
        'Porque herda de si mesma',
        'Porque é uma classe estática',
      ],
      correta: 0,
      explicacao:
        'Um campo do tipo No dentro da classe No permite que um nó aponte para outro nó, encadeando a estrutura.',
    },
    {
      pergunta: 'Para que serve o <T> em Pilha<T>?',
      opcoes: [
        'Para limitar a pilha a no máximo T elementos',
        'Para tornar a pilha mais rápida',
        'Para a pilha funcionar com qualquer tipo (String, Integer, etc.) sem reescrever o código',
        'Para indicar que a pilha é temporária',
      ],
      correta: 2,
      explicacao:
        'O parâmetro de tipo <T> torna a estrutura genérica: o mesmo código serve para qualquer tipo de elemento.',
    },
  ],
  xp: 100,
};

export default cap21;
