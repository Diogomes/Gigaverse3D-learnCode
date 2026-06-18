import type { Capitulo } from '../src/types.js';

const cap05: Capitulo = {
  id: 5,
  titulo: 'Condicionais e recursão',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Recursão',
    explicacao:
      'Recursão é quando uma função chama a SI MESMA para resolver uma versão menor do mesmo ' +
      'problema. Para não girar para sempre, toda recursão precisa de um CASO-BASE: uma situação ' +
      'simples em que a função responde direto, sem chamar de novo. As chamadas seguintes devem ' +
      'caminhar sempre em direção a esse caso-base — assim a pilha de chamadas eventualmente para.',
  },
  objetivos: [
    'Usar o operador módulo % para obter o resto de uma divisão (ex.: detectar par/ímpar).',
    'Montar expressões booleanas e escolher caminhos com if, elif e else.',
    'Entender condicionais encadeadas e aninhadas e a ordem em que são testadas.',
    'Escrever uma função recursiva identificando o caso-base e o caso recursivo.',
    'Reconhecer por que uma recursão sem caso-base nunca termina.',
  ],
  teoria: [
    {
      titulo: 'O resto e as expressões booleanas',
      paragrafos: [
        'O operador % (módulo) devolve o RESTO de uma divisão inteira: 10 % 2 é 0, e 7 % 2 é 1. ' +
          'Ele é a ferramenta clássica para perguntar "esse número é divisível por aquele?". Se ' +
          'n % 2 vale 0, então n é par; se vale 1, é ímpar.',
        'Uma expressão BOOLEANA é uma pergunta que só pode ser respondida com True (verdadeiro) ou ' +
          'False (falso). Comparações como n % 2 == 0, idade < 18 ou x != 0 produzem booleanos, e ' +
          'são exatamente elas que alimentam as condicionais.',
      ],
    },
    {
      titulo: 'if, elif e else',
      paragrafos: [
        'O if executa um bloco SÓ se a sua condição for verdadeira. O else é o plano B: roda quando ' +
          'nenhuma condição anterior deu certo. O elif ("else if") encadeia testes: o Python avalia ' +
          'um por um, de cima para baixo, e PARA no primeiro que for verdadeiro — ignorando o resto.',
        'O bloco de cada ramo é definido pela INDENTAÇÃO (os espaços após os dois-pontos). ' +
          'Condicionais também podem ser aninhadas: um if dentro de outro, criando decisões em ' +
          'camadas. Em geral, porém, um elif bem escrito é mais legível do que aninhar muitos ifs.',
      ],
    },
    {
      titulo: 'Recursão: caso-base e caso recursivo',
      paragrafos: [
        'Uma função recursiva resolve um problema em termos de uma versão menor dele mesmo. Ela ' +
          'tem duas partes. O CASO-BASE é a situação mais simples, respondida na hora, sem chamar ' +
          'a função de novo. O CASO RECURSIVO faz uma chamada a si mesma com um argumento "menor".',
        'Na contagem regressiva, o caso-base é n == 0 (paramos e gritamos "Fogo!"); o caso ' +
          'recursivo imprime n e chama contagem(n - 1). Como cada chamada diminui n, mais cedo ou ' +
          'mais tarde chegamos a 0 e a sequência de chamadas se desfaz. Sem caso-base, ela nunca ' +
          'terminaria.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap05/condicionais.py',
    descricao:
      'Mostra o operador % para par/ímpar, um classificador de faixa etária com if/elif/else e ' +
      'uma contagem regressiva recursiva com caso-base.',
    anotacoes: [
      {
        linha: 4,
        nota:
          'O operador % devolve o RESTO da divisão: 10 % 2 é 0. Resto zero ao dividir por 2 ' +
          'significa que o número é par.',
      },
      {
        linha: 11,
        nota:
          'n % 2 == 0 é uma expressão booleana (True ou False). Note os DOIS sinais de igual: == ' +
          'compara, enquanto um só = atribuiria um valor.',
      },
      {
        linha: 26,
        nota:
          'O elif só é testado se o if anterior (idade < 12) tiver dado False. O Python checa as ' +
          'faixas em ordem e para na primeira verdadeira.',
      },
      {
        linha: 45,
        nota:
          'Este é o CASO-BASE da recursão: quando n chega a 0, a função responde sem chamar a si ' +
          'mesma de novo. É ele que garante o fim.',
      },
      {
        linha: 49,
        nota:
          'CASO RECURSIVO: contagem chama a si mesma com n - 1, sempre um passo mais perto do ' +
          'caso-base. É essa redução que faz a recursão terminar.',
      },
    ],
  },
  discussao: [
    'Esqueça o caso-base (ou faça as chamadas NÃO se aproximarem dele) e a recursão vira infinita: ' +
      'o Python empilha chamadas até estourar com RecursionError. Toda função recursiva precisa de ' +
      'uma saída que não chame a si mesma.',
    'Não confunda == com =. Dentro de um if você COMPARA com == (e <, >, !=). O sinal único = é ' +
      'atribuição; usá-lo numa condição é erro comum e o Python reclama.',
    'A INDENTAÇÃO define qual código pertence a cada ramo do if/elif/else. Recuar a mais ou a ' +
      'menos muda o significado (ou gera IndentationError). Use 4 espaços e seja consistente.',
    'O % devolve o RESTO, não o quociente. 7 % 2 é 1 (o que sobra), enquanto 7 // 2 é 3 (a ' +
      'divisão inteira). São operadores diferentes para perguntas diferentes.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap05/desafio.py e complete a função recursiva soma_ate(n), que soma todos ' +
      'os inteiros de 1 até n (ex.: soma_ate(3) = 6). Escreva o caso-base e o caso recursivo, ' +
      'descomente os prints e rode para conferir.',
    arquivoBase: 'examples/cap05/desafio.py',
    dica:
      'O caso-base é quando n == 0: devolva 0. O caso recursivo devolve n + soma_ate(n - 1), ' +
      'reduzindo n a cada chamada até chegar ao caso-base.',
    solucao:
      'def soma_ate(n):\n' +
      '    if n == 0:\n' +
      '        return 0\n' +
      '    return n + soma_ate(n - 1)\n' +
      '\n' +
      'print("soma_ate(3) =", soma_ate(3))   # 6\n' +
      'print("soma_ate(5) =", soma_ate(5))   # 15',
  },
  quiz: [
    {
      pergunta: 'Qual é o resultado de 7 % 2 em Python?',
      opcoes: ['3', '1', '3.5', '0'],
      correta: 1,
      explicacao:
        'O operador % devolve o RESTO da divisão. 7 dividido por 2 dá 3 e sobra 1, então 7 % 2 é 1.',
    },
    {
      pergunta: 'Numa cadeia if / elif / elif / else, quantos blocos são executados?',
      opcoes: [
        'Todos os que forem verdadeiros',
        'Apenas o primeiro cuja condição for verdadeira (ou o else, se nenhum for)',
        'Sempre o else',
        'Nenhum, a menos que haja um for',
      ],
      correta: 1,
      explicacao:
        'O Python testa de cima para baixo e executa só o primeiro ramo verdadeiro; se nenhum for, ' +
        'cai no else. Os demais são ignorados.',
    },
    {
      pergunta: 'O que TODA função recursiva precisa ter para não rodar para sempre?',
      opcoes: [
        'Um laço while',
        'Um caso-base que não chama a função de novo',
        'Pelo menos dois parâmetros',
        'Uma variável global',
      ],
      correta: 1,
      explicacao:
        'O caso-base é a condição simples em que a função responde sem se chamar novamente. Sem ' +
        'ele, a recursão nunca termina (RecursionError).',
    },
    {
      pergunta: 'Dentro de um if, como se COMPARA se duas coisas são iguais?',
      opcoes: ['Com =', 'Com ==', 'Com :=', 'Com ==='],
      correta: 1,
      explicacao:
        'Em Python, == compara igualdade e devolve um booleano. O sinal único = é atribuição e não ' +
        'serve como condição.',
    },
  ],
  xp: 100,
};

export default cap05;
