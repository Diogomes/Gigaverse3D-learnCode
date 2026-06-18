import type { Capitulo } from '../src/types.js';

const cap16: Capitulo = {
  id: 16,
  titulo: 'Classes e funções',
  paradigma: 'oo',
  conceitoEmFoco: {
    termo: 'Função pura vs. modificadora',
    explicacao:
      'Quando uma função opera sobre objetos, ela pode agir de duas maneiras. Uma função PURA ' +
      'não altera os argumentos que recebe: ela cria e DEVOLVE um objeto novo com o resultado, ' +
      'deixando os originais intactos. Uma função MODIFICADORA faz o contrário — ela muda os ' +
      'atributos do objeto recebido, ali mesmo, e em geral não devolve nada. As duas resolvem o ' +
      'mesmo problema, mas a pura é mais previsível: quem chamou sabe que seus objetos não mudaram.',
  },
  objetivos: [
    'Escrever funções que recebem objetos e operam sobre seus atributos.',
    'Reconhecer uma função PURA: cria e retorna um novo objeto sem mexer nos parâmetros.',
    'Reconhecer uma função MODIFICADORA: altera os atributos do objeto que recebeu.',
    'Perceber o efeito colateral da modificadora e por que ele pode surpreender quem chamou.',
    'Saber por que, na dúvida, preferir funções puras.',
  ],
  teoria: [
    {
      titulo: 'Funções que operam sobre objetos',
      paragrafos: [
        'Depois de criar uma classe, é comum escrever funções que recebem objetos dessa classe e ' +
          'fazem algo com eles. A função enxerga os atributos pelo ponto: dado um parâmetro t, ela ' +
          'lê e pode escrever t.hora, t.minuto, t.segundo. Aqui ainda são funções "soltas" (lá fora, ' +
          'não dentro da classe) — transformá-las em métodos é assunto do próximo capítulo.',
        'A grande pergunta de projeto é: o que a função faz com o objeto que recebeu? Ela devolve um ' +
          'resultado NOVO e não toca no original, ou ela ALTERA o original? Essa escolha muda o ' +
          'comportamento do seu programa, e é o coração deste capítulo.',
      ],
    },
    {
      titulo: 'Função pura',
      paragrafos: [
        'Uma função PURA não modifica os argumentos. Ela usa os dados recebidos só para LER, monta ' +
          'um objeto novo com o resultado e o devolve com return. Em soma_pura(t1, t2), criamos um ' +
          'Tempo novo a partir das somas e o retornamos — t1 e t2 saem da função exatamente como ' +
          'entraram.',
        'Isso torna a função fácil de entender e de testar: dada a mesma entrada, sai sempre a mesma ' +
          'saída, e nada "ao redor" muda sem aviso. Você pode chamar soma_pura(a, b) à vontade sem ' +
          'medo de estragar a e b.',
      ],
    },
    {
      titulo: 'Função modificadora',
      paragrafos: [
        'Uma função MODIFICADORA altera os atributos do objeto que recebeu. Em adiciona_em(t1, t2), ' +
          'somamos os valores de t2 DENTRO de t1: ao terminar, o próprio t1 passou a valer outra ' +
          'coisa. Em geral a modificadora não precisa de return, porque a mudança já aconteceu no ' +
          'objeto original.',
        'Modificadoras são úteis e às vezes mais eficientes (não criam um objeto a cada chamada), mas ' +
          'escondem uma armadilha: quem chamou a função fica com o objeto alterado, mesmo sem ter ' +
          'pedido isso de forma óbvia. Por isso a recomendação geral é preferir funções puras e só ' +
          'usar modificadoras quando houver um motivo claro.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap16/tempo.py',
    descricao:
      'Define a classe Tempo (hora, minuto, segundo) e soma dois tempos de duas formas: soma_pura, ' +
      'que devolve um novo Tempo, e adiciona_em, que altera o tempo recebido. Imprime antes/depois ' +
      'para evidenciar a diferença.',
    anotacoes: [
      {
        linha: 9,
        nota:
          'Dentro do __init__, self.hora = hora cria um ATRIBUTO no objeto: cada Tempo passa a ' +
          'carregar sua própria hora, minuto e segundo.',
      },
      {
        linha: 16,
        nota:
          'Montamos o texto "hh:mm:ss" à mão com uma f-string; o :02d preenche com zero à esquerda. ' +
          'Aqui evitamos de propósito o __str__ — formatar o objeto direto é assunto do cap. 17.',
      },
      {
        linha: 21,
        nota:
          'O "vai-um": t.segundo // 60 diz quantos minutos inteiros "transbordaram", e t.segundo % 60 ' +
          'guarda o que sobra. O mesmo vale para minutos virando horas nas linhas seguintes.',
      },
      {
        linha: 35,
        nota:
          'Esta é a marca da função PURA: ela cria "novo" e o DEVOLVE com return, sem nunca ter ' +
          'escrito em t1 ou t2. Os tempos originais continuam intactos.',
      },
      {
        linha: 40,
        nota:
          'Aqui está o oposto: a função MODIFICADORA escreve direto em t1.hora (e nas linhas abaixo). ' +
          'Ao terminar, o objeto que foi passado já está alterado — não há return.',
      },
    ],
  },
  discussao: [
    'A modificadora muda o objeto de QUEM CHAMOU. Depois de adiciona_em(a, b), o a lá fora não é ' +
      'mais o mesmo, mesmo que você não tenha atribuído nada a ele. Esse "efeito colateral" pega ' +
      'iniciantes de surpresa e é fonte clássica de bugs.',
    'Função pura é mais fácil de testar: como ela só depende da entrada e devolve uma saída nova, ' +
      'você compara o retorno com o esperado sem se preocupar com o que mudou "por fora".',
    'Cuidado com aliasing: se dois nomes apontam para o MESMO objeto (x = y), uma modificadora ' +
      'chamada em x também afeta y, porque é um único objeto com dois apelidos. Com função pura ' +
      'isso não acontece, pois ela cria um objeto separado.',
    'Não esqueça o "vai-um": somar segundo a segundo pode passar de 59. Sem normalizar, você ' +
      'imprimiria algo como 09:65:90, que não é um horário válido. // e % resolvem o transbordo.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap16/desafio.py. Complete a função PURA soma_segundos(t, extra), que deve ' +
      'devolver um NOVO Tempo com "extra" segundos a mais, sem alterar t. Rode e confira que ' +
      'partida continua 10:30:50 e chegada vira 10:32:05.',
    arquivoBase: 'examples/cap16/desafio.py',
    dica:
      'Crie novo = Tempo(t.hora, t.minuto, t.segundo), some novo.segundo += extra, chame ' +
      'normaliza(novo) e retorne novo com return. Não escreva nada em t.',
    solucao:
      'def soma_segundos(t, extra):\n' +
      '    novo = Tempo(t.hora, t.minuto, t.segundo)\n' +
      '    novo.segundo += extra\n' +
      '    normaliza(novo)\n' +
      '    return novo',
  },
  quiz: [
    {
      pergunta: 'O que caracteriza uma função PURA que opera sobre objetos?',
      opcoes: [
        'Ela altera os atributos do objeto recebido',
        'Ela não mexe nos argumentos e devolve um objeto novo',
        'Ela nunca usa return',
        'Ela só funciona com números',
      ],
      correta: 1,
      explicacao:
        'A função pura lê os argumentos, monta um resultado novo e o devolve, deixando os objetos ' +
        'originais intactos.',
    },
    {
      pergunta:
        'Depois de chamar a modificadora adiciona_em(a, b), o que acontece com o objeto a?',
      opcoes: [
        'Continua igual ao que era antes',
        'É apagado da memória',
        'Fica alterado: seus atributos mudaram',
        'Vira uma cópia de b',
      ],
      correta: 2,
      explicacao:
        'A modificadora escreve nos atributos de a. Por isso a, lá fora, sai diferente — esse é o ' +
        'efeito colateral.',
    },
    {
      pergunta: 'Por que costumamos PREFERIR funções puras?',
      opcoes: [
        'Porque são sempre mais rápidas',
        'Porque não exigem classes',
        'Porque são mais previsíveis e fáceis de testar (não mudam nada por fora)',
        'Porque o Python proíbe modificadoras',
      ],
      correta: 2,
      explicacao:
        'Sem efeitos colaterais, a mesma entrada dá a mesma saída e nada muda sem aviso, o que ' +
        'facilita entender e testar o código.',
    },
    {
      pergunta: 'Na soma de tempos, por que precisamos do // e do % ao normalizar?',
      opcoes: [
        'Para arredondar as horas',
        'Para tratar o "vai-um": passar segundos extras para minutos e minutos extras para horas',
        'Para converter o tempo em texto',
        'Para criar um novo objeto Tempo',
      ],
      correta: 1,
      explicacao:
        'segundo // 60 dá quantos minutos transbordaram e segundo % 60 guarda o resto; o mesmo vale ' +
        'de minuto para hora. Sem isso teríamos valores como 65 minutos.',
    },
  ],
  xp: 100,
};

export default cap16;
