import type { Capitulo } from '../src/types.js';

const cap08: Capitulo = {
  id: 8,
  titulo: 'Strings',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Índice e fatiamento',
    explicacao:
      'Uma string é uma SEQUÊNCIA de caracteres em ordem. Por isso cada caractere tem uma ' +
      'posição (um ÍNDICE) que começa em 0: s[0] é o primeiro, s[1] o segundo. Com colchetes e ' +
      'dois-pontos você pega um pedaço inteiro — o FATIAMENTO: s[1:4] devolve do índice 1 ao 3 ' +
      '(o 4 fica de fora). E há uma regra de ouro: strings são IMUTÁVEIS — você nunca altera os ' +
      'caracteres no lugar; quando precisa de algo diferente, cria uma NOVA string.',
  },
  objetivos: [
    'Entender que uma string é uma sequência indexada de caracteres.',
    'Medir uma string com len() e percorrê-la caractere a caractere com for.',
    'Pegar pedaços com fatiamento (slicing), incluindo índices negativos e o passo [::-1].',
    'Transformar texto com métodos como lower() e replace(), sabendo que devolvem uma nova string.',
    'Buscar conteúdo com o operador in e contar ocorrências percorrendo a string.',
  ],
  teoria: [
    {
      titulo: 'Índices e fatiamento',
      paragrafos: [
        'Como a string é uma sequência, cada caractere mora numa posição numerada a partir do ' +
          'ZERO. Em "Giga", o G está em 0, o i em 1, e assim por diante. s[0] lê o primeiro ' +
          'caractere; índices NEGATIVOS contam do fim para o começo, então s[-1] é sempre o último.',
        'O fatiamento s[a:b] recorta um trecho: começa em a e vai até b, mas SEM incluir b. Pense ' +
          'no b como "onde parar". Você pode omitir os limites (s[:3] do começo até antes do 3, ' +
          's[2:] do índice 2 ao fim) e até informar um passo: s[::-1] percorre de trás para frente, ' +
          'o que devolve a string invertida.',
      ],
    },
    {
      titulo: 'Imutabilidade e métodos',
      paragrafos: [
        'Strings são IMUTÁVEIS: depois de criadas, seus caracteres não mudam. Tentar fazer ' +
          's[0] = "X" dá erro. Isso parece uma limitação, mas evita surpresas — ninguém altera o ' +
          'seu texto pelas suas costas.',
        'Por isso os métodos de string (lower, upper, replace, strip...) NÃO mexem na original: ' +
          'eles devolvem uma NOVA string com o resultado. Se você quiser guardar a mudança, ' +
          'precisa atribuí-la a uma variável (ex.: frase = frase.lower()).',
      ],
    },
    {
      titulo: 'Percorrer e buscar',
      paragrafos: [
        'O for passa por uma string entregando um caractere de cada vez — perfeito para examinar ' +
          'letra a letra, como ao contar ocorrências. O operador in pergunta se um trecho aparece ' +
          'dentro do texto: "ver" in "Gigaverse" devolve True.',
        'Juntando as peças dá para resolver problemas reais: normalizar o texto com lower(), ' +
          'comparar com a versão invertida [::-1] para checar palíndromos, ou somar +1 a cada vez ' +
          'que a letra procurada aparece no laço.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap08/strings.py',
    descricao:
      'Explora índices, fatias e métodos de string e termina com duas demos: um verificador de ' +
      'palíndromo e um contador de letras.',
    anotacoes: [
      {
        linha: 9,
        nota:
          'len() devolve o número de caracteres da string. "Gigaverse" tem 9 — e, como a contagem ' +
          'de índices começa em 0, o último índice válido é 8 (len - 1).',
      },
      {
        linha: 12,
        nota:
          'palavra[0] pega o PRIMEIRO caractere, porque os índices começam em 0. Logo abaixo, ' +
          'palavra[-1] usa um índice negativo para pegar o último, contando do fim.',
      },
      {
        linha: 16,
        nota:
          'A fatia [0:4] pega os índices 0, 1, 2 e 3 — o 4 NÃO entra. Por isso o resultado é "Giga" ' +
          '(4 caracteres), e não 5.',
      },
      {
        linha: 18,
        nota:
          'O passo -1 em [::-1] percorre a string de trás para frente, devolvendo-a invertida. É o ' +
          'truque usado mais abaixo para checar palíndromos.',
      },
      {
        linha: 29,
        nota:
          'replace() devolve uma NOVA string com as trocas feitas; a variável frase continua ' +
          'intacta, porque strings são imutáveis. Para guardar a mudança, seria preciso reatribuir.',
      },
    ],
  },
  discussao: [
    'Strings são IMUTÁVEIS: métodos como lower() e replace() não alteram a original — eles ' +
      'devolvem uma string NOVA. Se você não guardar o retorno (ex.: frase = frase.lower()), a ' +
      'mudança se perde.',
    'Os índices começam em 0, não em 1. Em "Giga", o primeiro caractere é s[0] = "G"; s[1] já é ' +
      'o segundo. O último índice válido é len(s) - 1.',
    'Índices negativos contam do fim: s[-1] é o último caractere, s[-2] o penúltimo. Útil para ' +
      'pegar o final sem precisar calcular o tamanho.',
    'Na fatia s[a:b], o limite b NÃO é incluído. s[0:4] devolve 4 caracteres (índices 0 a 3). ' +
      'Pense no b como "pare aqui", não "inclua aqui".',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap08/desafio.py e complete a função contar_vogais: ela deve devolver ' +
      'quantas vogais (a, e, i, o, u) existem na string recebida. Rode e confira a saída.',
    arquivoBase: 'examples/cap08/desafio.py',
    dica:
      'Dentro do for, use o operador in para testar se a letra é vogal: if letra in "aeiou": ' +
      'total += 1. O lower() já garante que maiúsculas também contem.',
    solucao:
      'def contar_vogais(texto):\n' +
      '    total = 0\n' +
      '    for letra in texto.lower():\n' +
      '        if letra in "aeiou":\n' +
      '            total += 1\n' +
      '    return total',
  },
  quiz: [
    {
      pergunta: 'Em s = "Python", qual é o valor de s[0]?',
      opcoes: ['"P"', '"y"', '"n"', 'Erro: índices começam em 1'],
      correta: 0,
      explicacao: 'Os índices começam em 0, então s[0] é o primeiro caractere: "P".',
    },
    {
      pergunta: 'Para "Gigaverse", o que a fatia [0:4] devolve?',
      opcoes: ['"Gigav"', '"Giga"', '"igav"', '"Gigave"'],
      correta: 1,
      explicacao:
        'A fatia [0:4] pega os índices 0, 1, 2 e 3 — o limite 4 não entra. Resultado: "Giga".',
    },
    {
      pergunta: 'Depois de executar frase.lower() (sem reatribuir), o que acontece com frase?',
      opcoes: [
        'Fica toda em minúsculas',
        'Continua exatamente como estava',
        'Vira uma lista de caracteres',
        'Dá erro porque strings são imutáveis',
      ],
      correta: 1,
      explicacao:
        'Strings são imutáveis: lower() devolve uma NOVA string e não altera a original. Sem ' +
        'guardar o retorno, frase continua igual.',
    },
    {
      pergunta: 'Qual expressão devolve a string s invertida?',
      opcoes: ['s[::-1]', 's[-1]', 's.reverse()', 's[0:-1]'],
      correta: 0,
      explicacao:
        'O passo -1 em s[::-1] percorre a string de trás para frente, devolvendo-a invertida. ' +
        's[-1] pega só o último caractere.',
    },
  ],
  xp: 100,
};

export default cap08;
