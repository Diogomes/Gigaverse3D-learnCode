import type { Capitulo } from '../src/types.js';

const cap20: Capitulo = {
  id: 20,
  titulo: 'Depuração (apêndice)',
  paradigma: 'transversal',
  conceitoEmFoco: {
    termo: 'Depuração (debugging)',
    explicacao:
      'Depurar é encontrar e corrigir defeitos. Há três tipos de erro: de SINTAXE (o Python nem ' +
      'consegue ler o código), de EXECUÇÃO (roda e estoura no meio, mostrando um TRACEBACK) e ' +
      'SEMÂNTICO (roda sem erro, mas faz a coisa errada). A habilidade central é LER o traceback — ' +
      'de baixo para cima — para descobrir o tipo do erro e a linha onde ele aconteceu.',
  },
  objetivos: [
    'Distinguir erros de sintaxe, de execução e semânticos.',
    'Ler um traceback de baixo para cima: tipo do erro, arquivo e linha.',
    'Usar print() para inspecionar valores e tipos durante a investigação.',
    'Tratar erros previsíveis com try/except e validar suposições com assert.',
  ],
  teoria: [
    {
      titulo: 'Os três tipos de erro',
      paragrafos: [
        'SINTAXE: o código está "mal escrito" e o Python recusa antes de rodar — falta um parêntese, ' +
          'dois-pontos ou a indentação está errada. A mensagem é SyntaxError/IndentationError e aponta ' +
          'mais ou menos onde o leitor se perdeu.',
        'EXECUÇÃO (runtime): o programa começa a rodar e estoura no meio — dividir por zero, usar um nome ' +
          'que não existe, indexar fora da lista. Aí surge um TRACEBACK. SEMÂNTICO é o mais traiçoeiro: ' +
          'nenhum erro aparece, mas o resultado está errado — o programa faz o que você escreveu, não o que quis.',
      ],
    },
    {
      titulo: 'Ler o traceback de baixo para cima',
      paragrafos: [
        'O traceback é a "trilha" de chamadas até o ponto do erro. A ÚLTIMA linha é a mais importante: ela ' +
          'diz o TIPO do erro e uma mensagem (ex.: NameError: name \'numero\' is not defined). Logo acima, ' +
          'o Python mostra o arquivo e a LINHA exata onde aconteceu.',
        'Por isso a regra: leia DE BAIXO PARA CIMA. Primeiro entenda o tipo e a linha do erro; só depois, ' +
          'se precisar, suba a trilha para ver quem chamou quem. O app destaca a linha do erro extraída do ' +
          'traceback — use-a como ponto de partida da investigação.',
      ],
    },
    {
      titulo: 'Ferramentas: print, try/except e assert',
      paragrafos: [
        'O depurador mais simples é o print(): imprima valores e tipos (com repr(x) e type(x)) para ver o ' +
          'que o programa REALMENTE tem, em vez de adivinhar. É como acender a luz no ponto certo.',
        'Para erros previsíveis (uma lista pode vir vazia, uma entrada pode ser inválida), use try/except para ' +
          'tratar sem quebrar. E use assert condicao, "mensagem" para checar suposições: se a condição for ' +
          'falsa, o programa para na hora com a sua mensagem — flagrando o problema cedo, perto da causa.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap20/depuracao.py',
    descricao:
      'Mostra três ferramentas de depuração que rodam sem quebrar: print para inspecionar (valor e ' +
      'tipo), try/except para tratar divisão por zero e assert para validar uma suposição.',
    anotacoes: [
      {
        linha: 12,
        nota:
          'print de depuração: repr(numeros) mostra o valor "como código" e type(...).__name__ mostra o ' +
          'tipo. É a forma mais rápida de ver o que a função realmente recebeu.',
      },
      {
        linha: 13,
        nota:
          'Aqui mora o risco: se numeros for uma lista vazia, len(numeros) é 0 e a divisão estoura um ' +
          'ZeroDivisionError em tempo de execução.',
      },
      {
        linha: 18,
        nota:
          'try: tentamos rodar o trecho que pode falhar. Se tudo der certo, o except é ignorado.',
      },
      {
        linha: 20,
        nota:
          'except ZeroDivisionError: capturamos ESSE erro específico e devolvemos 0.0 em vez de deixar o ' +
          'programa quebrar. Trate o erro que você espera, não "qualquer erro".',
      },
      {
        linha: 27,
        nota:
          'assert valida uma suposição: se o percentual não estiver entre 0 e 100, o programa para na hora ' +
          'com a mensagem — pegando o problema perto da causa, não três funções depois.',
      },
    ],
  },
  discussao: [
    'A regra de ouro do traceback é ler de baixo para cima: a última linha tem o TIPO do erro e a ' +
      'mensagem; logo acima vem o arquivo e a linha. Comece sempre por aí — o resto da trilha é contexto.',
    'NameError quase sempre é nome digitado errado ou variável que não existe naquele escopo; TypeError é ' +
      'operação entre tipos incompatíveis; IndexError/KeyError é acesso a posição/chave que não existe. ' +
      'Reconhecer o tipo já encurta muito a caça.',
    'print é o depurador universal: na dúvida, imprima o valor e o tipo ANTES da linha que falha. Muitas ' +
      'vezes o bug é "eu achava que era um número, mas era uma string".',
    'try/except trata o erro que você ESPERA (lista vazia, arquivo ausente). Não use except sem tipo para ' +
      'engolir tudo — isso esconde bugs de verdade. assert, por outro lado, serve para o que NUNCA deveria ' +
      'acontecer: ele falha alto e cedo, te levando direto à causa.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap20/desafio.py: ele quebra com um traceback ao rodar. Rode com [r], leia o traceback ' +
      'de baixo para cima para achar o TIPO do erro e a LINHA, e conserte o bug para o programa imprimir a ' +
      'média corretamente (deve dar 18.0).',
    arquivoBase: 'examples/cap20/desafio.py',
    dica:
      'A última linha do traceback diz NameError: name \'numero\' is not defined. Dentro de media(), o ' +
      'parâmetro se chama numeros (com s), mas o código usa numero. Acerte o nome em len(...).',
    solucao:
      'def media(numeros):\n' +
      '    return sum(numeros) / len(numeros)\n' +
      '\n' +
      'print("Média:", media([4, 8, 15, 16, 23, 42]))',
  },
  quiz: [
    {
      pergunta: 'Um erro que faz o programa rodar e estourar NO MEIO, mostrando um traceback, é de que tipo?',
      opcoes: ['Sintaxe', 'Execução (runtime)', 'Semântico', 'Não é um erro'],
      correta: 1,
      explicacao:
        'Erro de execução acontece enquanto o programa roda (ex.: divisão por zero, NameError) e gera um ' +
        'traceback. Sintaxe impede até de rodar; semântico roda mas dá resultado errado.',
    },
    {
      pergunta: 'Em qual direção você deve LER um traceback para achar o erro?',
      opcoes: [
        'De cima para baixo',
        'De baixo para cima: a última linha traz o tipo e a mensagem do erro',
        'A ordem não importa',
        'Só o meio importa',
      ],
      correta: 1,
      explicacao:
        'A última linha do traceback diz o tipo do erro; logo acima, o arquivo e a linha. Por isso lê-se ' +
        'de baixo para cima.',
    },
    {
      pergunta: 'Para tratar uma possível divisão por zero sem o programa quebrar, você usa:',
      opcoes: ['assert', 'um print', 'try/except', 'um comentário'],
      correta: 2,
      explicacao:
        'try/except captura o erro esperado (ZeroDivisionError) e permite seguir com um valor alternativo, ' +
        'em vez de deixar o programa estourar.',
    },
    {
      pergunta: 'Um programa roda sem erro nenhum, mas dá o resultado ERRADO. Que tipo de erro é esse?',
      opcoes: ['Sintaxe', 'Execução', 'Semântico', 'Traceback'],
      correta: 2,
      explicacao:
        'Erro semântico: o código faz o que você escreveu, não o que você queria. É o mais difícil de ' +
        'achar, pois não há traceback — só o resultado incorreto.',
    },
  ],
  xp: 100,
};

export default cap20;
