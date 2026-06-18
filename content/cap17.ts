import type { Capitulo } from '../src/types.js';

const cap17: Capitulo = {
  id: 17,
  titulo: 'Java SE Lambdas e Streams',
  conceitoEmFoco: {
    termo: 'Stream',
    explicacao:
      'Imagine uma esteira de fábrica: os dados entram numa ponta e passam por estações que ' +
      'filtram, transformam e juntam tudo no fim. Uma Stream é essa esteira. Em vez de escrever ' +
      'um for e dizer COMO percorrer a lista, você encadeia operações (filter, map, reduce) e ' +
      'descreve O QUE quer — isso se chama estilo declarativo.',
  },
  objetivos: [
    'Entender o que é uma stream e por que ela é "declarativa".',
    'Escrever expressões lambda (funções curtas e anônimas).',
    'Usar Predicate (teste true/false) e Function (transformação) com map e filter.',
    'Encadear um pipeline: filter, map, reduce/sum e collect.',
    'Usar method references (Classe::metodo) como atalho de lambda.',
  ],
  teoria: [
    {
      titulo: 'Lambda: uma função curtinha',
      paragrafos: [
        'Uma lambda é uma função escrita em uma linha, sem nome. A sintaxe é parametro -> corpo. ' +
          'Por exemplo, j -> j.nivel() >= 10 recebe um jogador j e devolve true/false. É só uma ' +
          'maneira enxuta de descrever um pequeno comportamento que você passa adiante.',
        'Lambdas costumam virar Predicate (um teste que devolve true/false) ou Function (uma ' +
          'transformação de um valor em outro). Você não precisa decorar os nomes: basta saber ' +
          'que uma "recebe e responde sim/não" e a outra "recebe e devolve algo novo".',
      ],
    },
    {
      titulo: 'Stream: a esteira de dados',
      paragrafos: [
        'Você inicia a esteira com lista.stream(). Daí encadeia estações: filter(...) mantém só ' +
          'quem passa no teste, map(...) transforma cada item, e no fim collect(...) junta o ' +
          'resultado numa nova lista. Cada estação devolve outra stream, por isso dá para ligar ' +
          'tudo com pontos, como vagões de um trem.',
        'Operações como filter e map são "preguiçosas": nada acontece até chegar uma operação ' +
          'final (como collect, sum ou reduce). A operação final é quem "liga a esteira" e produz ' +
          'o resultado. A lista original não é alterada — a stream sempre gera algo novo.',
      ],
    },
    {
      titulo: 'reduce e method reference',
      paragrafos: [
        'reduce junta todos os itens da esteira num único valor, acumulando de dois em dois. ' +
          'Somar pontos é um reduce; por ser tão comum, existe o atalho mapToInt(...).sum(). ' +
          'Para o maior nível usamos reduce(0, Integer::max): começa em 0 e vai guardando o maior.',
        'Quando a lambda só chama um método já existente, dá para usar method reference: ' +
          'Jogador::nome é o mesmo que j -> j.nome(), só que mais curto e legível. É açúcar ' +
          'sintático: o compilador entende as duas formas igual.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap17/Estatisticas.java',
    descricao:
      'Processa uma lista de jogadores (nome, nível, pontos): filtra os veteranos (nível ≥ 10), ' +
      'mapeia para os nomes, soma os pontos com sum e acha o maior nível com reduce — tudo com ' +
      'streams e lambdas, sem nenhum for.',
    anotacoes: [
      { linha: 23, nota: 'Lambda virando um Predicate: recebe um jogador j e responde true/false (se é veterano).' },
      { linha: 26, nota: 'lista.stream() liga a esteira de dados; daqui em diante encadeamos as estações.' },
      { linha: 27, nota: 'filter mantém só os itens que passam no teste do Predicate.' },
      { linha: 32, nota: 'map transforma cada Jogador no seu nome. Jogador::nome é um method reference (atalho de lambda).' },
      { linha: 38, nota: 'mapToInt vira uma esteira de int; logo abaixo sum() faz o reduce que soma os pontos.' },
      { linha: 44, nota: 'reduce explícito: começa em 0 e vai acumulando o maior nível com Integer::max.' },
    ],
  },
  discussao: [
    'Streams deixam o código mais legível porque você lê a intenção ("filtre, mapeie, some") em ' +
      'vez de seguir índices de um for. Isso é o estilo declarativo.',
    'Pegadinha comum: a stream não muda a lista original; ela devolve um novo resultado. Se você ' +
      'não captura o retorno (ou não chama uma operação final como collect/sum), nada acontece.',
    'Outra pegadinha: uma stream só pode ser percorrida UMA vez. Se precisar usar de novo, chame ' +
      'lista.stream() outra vez, como fazemos para somar os pontos.',
    'Use method reference (Classe::metodo) quando a lambda só repassa para um método existente — ' +
      'fica mais curto. Quando há lógica própria (j -> j.nivel() >= 10), use a lambda normal.',
  ],
  desafio: {
    enunciado:
      'Usando stream e lambda, processe a lista de produtos do arquivo base. Filtre os produtos ' +
      'com preço <= 100, mapeie para o NOME de cada um e colete numa List<String>. Imprima a ' +
      'lista. O resultado esperado é [Espada, Pocao].',
    arquivoBase: 'examples/cap17/Desafio.java',
    dica:
      'Comece com produtos.stream(). Use .filter(p -> p.preco() <= 100), depois .map(Produto::nome) ' +
      'e termine com .collect(Collectors.toList()). Guarde numa List<String> e imprima.',
    solucao:
      'import java.util.List;\n' +
      'import java.util.stream.Collectors;\n\n' +
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        List<Produto> produtos = List.of(\n' +
      '            new Produto("Espada", 80),\n' +
      '            new Produto("Escudo", 150),\n' +
      '            new Produto("Pocao", 30),\n' +
      '            new Produto("Elmo", 120)\n' +
      '        );\n\n' +
      '        List<String> baratos = produtos.stream()\n' +
      '            .filter(p -> p.preco() <= 100)\n' +
      '            .map(Produto::nome)\n' +
      '            .collect(Collectors.toList());\n\n' +
      '        System.out.println(baratos);\n' +
      '    }\n' +
      '}\n\n' +
      'record Produto(String nome, int preco) { }',
  },
  quiz: [
    {
      pergunta: 'O que é uma stream em Java?',
      opcoes: [
        'Um tipo de número',
        'Uma esteira de dados onde você encadeia operações de forma declarativa',
        'Uma classe que substitui o int',
        'Um arquivo aberto no disco',
      ],
      correta: 1,
      explicacao:
        'A stream é uma sequência de dados sobre a qual você encadeia filter, map, reduce etc., ' +
        'descrevendo o que quer em vez de como percorrer.',
    },
    {
      pergunta: 'O que faz a operação filter num pipeline de stream?',
      opcoes: [
        'Transforma cada item em outro valor',
        'Soma todos os itens',
        'Mantém apenas os itens que passam no teste (Predicate)',
        'Ordena a lista',
      ],
      correta: 2,
      explicacao: 'filter recebe um Predicate (teste true/false) e deixa passar só os itens aprovados.',
    },
    {
      pergunta: 'O que significa o method reference Jogador::nome?',
      opcoes: [
        'Cria um novo Jogador',
        'É um atalho para a lambda j -> j.nome()',
        'Apaga o atributo nome',
        'Declara um método estático',
      ],
      correta: 1,
      explicacao:
        'Quando a lambda só chama um método existente, Classe::metodo é uma forma mais curta e ' +
        'legível de escrever a mesma coisa.',
    },
    {
      pergunta: 'O que reduce (ou sum) faz numa stream?',
      opcoes: [
        'Filtra itens repetidos',
        'Combina todos os itens da esteira num único valor',
        'Inverte a ordem da lista',
        'Copia a lista original',
      ],
      correta: 1,
      explicacao:
        'reduce acumula os itens de dois em dois até sobrar um valor; somar pontos com sum() é um ' +
        'caso especial de reduce.',
    },
  ],
  xp: 100,
};

export default cap17;
