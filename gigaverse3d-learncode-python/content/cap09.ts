import type { Capitulo } from '../src/types.js';

const cap09: Capitulo = {
  id: 9,
  titulo: 'Estudo de caso: jogo de palavras',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Filtragem com condições',
    explicacao:
      'FILTRAR é percorrer uma coleção e selecionar APENAS os itens que satisfazem um critério. ' +
      'O padrão é sempre o mesmo: um for passa por todos os elementos e, dentro dele, um if ' +
      'decide quem entra no resultado e quem é descartado. Quem reprovar no teste do if é ' +
      'simplesmente ignorado. É a base para buscar, separar e classificar dados.',
  },
  objetivos: [
    'Percorrer uma lista de palavras com um laço for.',
    'Selecionar itens que passam num critério usando if (filtragem).',
    'Usar o operador in para checar se um caractere existe dentro de um texto.',
    'Refatorar a verificação em funções com parâmetros (tem_letra, tem_todas_vogais).',
    'Testar mentalmente o resultado e entender por que cada palavra entrou ou saiu.',
  ],
  teoria: [
    {
      titulo: 'O padrão da filtragem',
      paragrafos: [
        'Filtrar é responder, item por item, à pergunta "este aqui serve?". Você caminha pela ' +
          'coleção inteira com um for e, a cada volta, um if aplica o critério. Se a condição for ' +
          'verdadeira, você faz algo com o item (aqui, imprimimos); se for falsa, segue em frente.',
        'Repare que filtrar é DIFERENTE de transformar. Filtrar mantém os itens como estão e só ' +
          'escolhe um subconjunto; transformar mudaria cada item (por exemplo, deixá-los em ' +
          'maiúsculas). Neste capítulo só selecionamos — não alteramos as palavras.',
      ],
    },
    {
      titulo: 'O operador in e o método lower',
      paragrafos: [
        'Em Python, letra in palavra devolve True se aquele caractere aparece dentro do texto. ' +
          'É a forma mais direta de perguntar "esta palavra contém a letra X?". O contrário, ' +
          'not in, devolve True quando o caractere NÃO está presente.',
        'Comparar texto é sensível a maiúsculas: "E" e "e" são caracteres diferentes para o ' +
          'computador. Por isso usamos .lower(), que devolve a palavra toda em minúsculas, ' +
          'antes de comparar. Assim "Gato" e "gato" passam a ser tratados do mesmo jeito.',
      ],
    },
    {
      titulo: 'Refatorar o critério em uma função',
      paragrafos: [
        'Quando o teste do if fica grande ou se repete, vale a pena dar um nome a ele. ' +
          'Criamos tem_letra(palavra, letra) e tem_todas_vogais(palavra): funções com ' +
          'parâmetros que devolvem True ou False. O for fica limpo, lendo quase como português: ' +
          '"se a palavra não tem a letra e, imprima".',
        'Funções que devolvem um booleano são ótimas para usar dentro de um if. Além de deixar o ' +
          'laço legível, você pode testar a função sozinha e reaproveitá-la em outros filtros.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap09/palavras.py',
    descricao:
      'A partir de uma lista de palavras embutida no arquivo, filtra as que NÃO têm a letra "e" ' +
      'e as que contêm TODAS as vogais, usando funções de apoio.',
    anotacoes: [
      {
        linha: 3,
        nota:
          'A lista de palavras é definida aqui, dentro do próprio arquivo. Cada palavra é uma ' +
          'string e a coleção toda fica entre colchetes [ ], separada por vírgulas.',
      },
      {
        linha: 9,
        nota:
          'letra in palavra.lower() pergunta se o caractere aparece na palavra (em minúsculas). ' +
          'O .lower() garante que a comparação não dependa de maiúsculas.',
      },
      {
        linha: 16,
        nota:
          'vogal not in p é True quando a vogal está FALTANDO. Se isso acontece com qualquer ' +
          'vogal, a função já devolve False — não precisa checar as outras.',
      },
      {
        linha: 23,
        nota:
          'Aqui começa a filtragem: o for percorre TODAS as palavras, uma de cada vez. O if logo ' +
          'abaixo decide quais delas vão para a saída.',
      },
      {
        linha: 24,
        nota:
          'not tem_letra(...) inverte o resultado: o if só entra para as palavras SEM a letra ' +
          '"e". Quem tem "e" é simplesmente ignorado.',
      },
    ],
  },
  discussao: [
    'Maiúsculas e acentos afetam a comparação. "Gato" e "gato" são textos diferentes para o ' +
      'Python; por isso normalizamos com .lower() antes de comparar. Já acentos são outro ' +
      'caractere ainda: "é" não é o mesmo que "e", então uma palavra como "café" passaria no ' +
      'filtro "sem a letra e" — vale ter isso em mente ao montar a lista.',
    'O operador in serve tanto para checar um caractere DENTRO de um texto ("e" in "gato") ' +
      'quanto um item DENTRO de uma lista. Não confunda os dois usos: o primeiro olha letras, o ' +
      'segundo olha elementos da coleção.',
    'Filtrar é diferente de transformar. Filtrar escolhe um subconjunto e mantém os itens ' +
      'intactos; transformar mudaria cada item. Se você imprimir palavra.upper() dentro do for, ' +
      'já não está só filtrando — está transformando a saída.',
    'Cuidado com o not e a lógica do "todas". Para "tem todas as vogais", basta UMA vogal ' +
      'faltar para a resposta ser False. É mais fácil procurar a primeira que falta e sair na ' +
      'hora do que tentar confirmar as cinco de uma vez.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap09/desafio.py. Complete a função comeca_com(palavra, letra) para que ' +
      'devolva True quando a palavra começa pela letra dada, e use-a no for para imprimir só as ' +
      'palavras que começam com "a".',
    arquivoBase: 'examples/cap09/desafio.py',
    dica:
      'Em comeca_com, devolva palavra.lower().startswith(letra). No for, escreva ' +
      'if comeca_com(palavra, "a"): e dentro dele um print(palavra).',
    solucao:
      'palavras = ["gato", "abelha", "arara", "ceu", "abacaxi", "rio"]\n\n\n' +
      'def comeca_com(palavra, letra):\n' +
      '    return palavra.lower().startswith(letra)\n\n\n' +
      'print("Palavras que comecam com \'a\':")\n' +
      'for palavra in palavras:\n' +
      '    if comeca_com(palavra, "a"):\n' +
      '        print("  -", palavra)',
  },
  quiz: [
    {
      pergunta: 'No padrão de filtragem, qual é o papel do if dentro do for?',
      opcoes: [
        'Repetir o laço mais vezes',
        'Decidir quais itens passam no critério e quais são ignorados',
        'Transformar cada item em maiúsculas',
        'Encerrar o programa',
      ],
      correta: 1,
      explicacao:
        'O for visita todos os itens; o if aplica o critério e seleciona apenas os que o ' +
        'satisfazem. Os demais são descartados.',
    },
    {
      pergunta: 'O que faz "e" in "gato"?',
      opcoes: [
        'Devolve True, pois toda palavra tem a letra e',
        'Devolve False, pois "gato" não contém a letra e',
        'Dá erro de sintaxe',
        'Soma as letras',
      ],
      correta: 1,
      explicacao: 'O operador in verifica se o caractere aparece no texto. "gato" não tem "e", logo False.',
    },
    {
      pergunta: 'Por que usamos .lower() antes de comparar as palavras?',
      opcoes: [
        'Para deixar o programa mais rápido',
        'Para que maiúsculas e minúsculas não atrapalhem a comparação',
        'Para remover os acentos',
        'Para transformar a lista em texto',
      ],
      correta: 1,
      explicacao:
        '"Gato" e "gato" são diferentes para o Python. .lower() coloca tudo em minúsculas para ' +
        'a comparação ser justa. (Ele não remove acentos.)',
    },
    {
      pergunta: 'Qual a diferença entre FILTRAR e TRANSFORMAR uma coleção?',
      opcoes: [
        'São a mesma coisa',
        'Filtrar muda cada item; transformar escolhe um subconjunto',
        'Filtrar escolhe um subconjunto; transformar muda cada item',
        'Só listas podem ser filtradas',
      ],
      correta: 2,
      explicacao:
        'Filtrar seleciona itens mantendo-os intactos. Transformar altera cada item (por ' +
        'exemplo, deixando-o em maiúsculas).',
    },
  ],
  xp: 100,
};

export default cap09;
