import type { Capitulo } from '../src/types.js';

const cap06: Capitulo = {
  id: 6,
  titulo: 'Funções com resultado',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Retorno (return) vs. efeito colateral (print)',
    explicacao:
      'Uma função pode fazer duas coisas bem diferentes com um cálculo. Ela pode DEVOLVER o ' +
      'valor com return — e aí quem chamou guarda esse valor e reutiliza onde quiser. Ou ela ' +
      'pode só IMPRIMIR na tela com print() — um "efeito colateral" que o olho vê mas o ' +
      'programa não consegue mais aproveitar. Devolver é diferente de mostrar: o return é o que ' +
      'torna uma função uma peça reutilizável de verdade.',
  },
  objetivos: [
    'Diferenciar uma função que RETORNA um valor de uma que só imprime na tela.',
    'Escrever funções frutíferas com return e reutilizar o valor devolvido.',
    'Compor funções, usando o resultado de uma como entrada de outra.',
    'Escrever uma função recursiva que retorna (fatorial) e funções booleanas.',
    'Usar assert para checar que um resultado é o esperado.',
  ],
  teoria: [
    {
      titulo: 'Funções frutíferas e o return',
      paragrafos: [
        'Uma função FRUTÍFERA é aquela que produz um valor e o devolve com a palavra return. ' +
          'Quando o Python encontra um return, ele para a função na hora e entrega o valor para ' +
          'quem fez a chamada. Esse valor pode ser guardado numa variável, somado, comparado, ' +
          'passado para outra função — exatamente como qualquer número ou texto.',
        'Cuidado: uma função que NÃO tem return (ou que só chama print) devolve, por padrão, o ' +
          'valor None. Então x = mostra(5) onde mostra() apenas imprime deixa x valendo None. A ' +
          'tela mostrou algo, mas o programa não recebeu nada de volta para reutilizar.',
      ],
    },
    {
      titulo: 'Desenvolvimento incremental e composição',
      paragrafos: [
        'Funções grandes assustam. A ideia do desenvolvimento INCREMENTAL é montar a função aos ' +
          'poucos: escreva um pedaço, teste, escreva o próximo. Em distancia(), por exemplo, ' +
          'primeiro calculamos dx e dy, depois aplicamos a raiz — e podemos checar cada etapa.',
        'COMPOSIÇÃO é encaixar funções: como cada uma devolve um valor, o resultado de uma vira ' +
          'a entrada da outra. par(fatorial(5)) primeiro calcula fatorial(5) = 120 e depois ' +
          'pergunta se 120 é par. Isso só funciona porque ambas RETORNAM valores.',
      ],
    },
    {
      titulo: 'Booleanas, recursão e assert',
      paragrafos: [
        'Uma função BOOLEANA devolve True ou False e costuma responder a uma pergunta: par(n) ' +
          'responde "n é par?". Já a RECURSÃO acontece quando uma função chama a si mesma com um ' +
          'problema menor; fatorial(n) retorna n * fatorial(n-1) até chegar ao caso base (n <= 1), ' +
          'que retorna 1 e encerra as chamadas. Sem caso base, a recursão nunca pararia.',
        'O assert é um teste embutido no código: assert condição significa "isto TEM que ser ' +
          'verdade". Se for, o programa segue como se nada fosse; se for falso, ele estoura na ' +
          'hora com um AssertionError. É uma forma rápida de confirmar que sua função devolve o ' +
          'que você espera.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap06/resultado.py',
    descricao:
      'Define distancia() e o fatorial recursivo (ambos com return), reutiliza os valores ' +
      'devolvidos, compõe funções e confirma o resultado com assert.',
    anotacoes: [
      {
        linha: 8,
        nota:
          'def distancia(x1, y1, x2, y2): cria uma função que recebe quatro coordenadas. Ela vai ' +
          'CALCULAR algo e devolver — note que não há print() aqui dentro.',
      },
      {
        linha: 11,
        nota:
          'return entrega o valor para quem chamou. Usamos math.sqrt() (do módulo math importado ' +
          'na linha 4) para a raiz quadrada. Quem chamar distancia() recebe esse número de volta.',
      },
      {
        linha: 18,
        nota:
          'Recursão: a função se chama de novo com n-1 e RETORNA o produto. Sem o caso base da ' +
          'linha 16 (return 1), as chamadas nunca parariam.',
      },
      {
        linha: 27,
        nota:
          'Aqui está a diferença-chave: como distancia() RETORNA, guardamos o valor em d. Nas ' +
          'linhas seguintes reutilizamos d (até calculamos d * 2). Se a função só imprimisse, não ' +
          'teríamos nada para guardar.',
      },
      {
        linha: 37,
        nota:
          'assert confirma que distancia(0,0,3,4) é mesmo 5.0 (triângulo 3-4-5). Se a conta ' +
          'estivesse errada, o programa estouraria aqui em vez de seguir.',
      },
    ],
  },
  discussao: [
    'A pegadinha mais comum: uma função que só faz print() devolve None. Logo, total = ' +
      'soma_e_mostra(2, 3) pode mostrar 5 na tela mas deixar total valendo None. Se você quer ' +
      'reutilizar o valor, a função precisa de um return.',
    'return NÃO é a mesma coisa que print. print joga texto na tela (para o humano ver); return ' +
      'entrega um valor ao programa (para ele continuar usando). Uma função pode ter os dois, mas ' +
      'são papéis distintos — não confunda "apareceu na tela" com "foi devolvido".',
    'Assim que o Python executa um return, a função termina imediatamente: qualquer linha depois ' +
      'dele, no mesmo bloco, nunca roda. Em fatorial(), o return 1 do caso base encerra aquela ' +
      'chamada antes de chegar na linha de baixo.',
    'O assert é seu amigo na hora de testar: assert valor == esperado falha alto e na hora se a ' +
      'conta saiu errada, em vez de deixar um bug passar silencioso (um erro semântico).',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap06/desafio.py. A função area_retangulo() hoje devolve None — por isso o ' +
      'print mostra None. Troque o return None por um return que DEVOLVA base * altura e rode de ' +
      'novo para ver a área correta.',
    arquivoBase: 'examples/cap06/desafio.py',
    dica:
      'O segredo é devolver, não imprimir: dentro da função escreva return base * altura. O ' +
      'print() lá embaixo já reutiliza o valor guardado em a.',
    solucao:
      'def area_retangulo(base, altura):\n' +
      '    return base * altura\n' +
      '\n' +
      '\n' +
      'a = area_retangulo(4, 5)\n' +
      'print("Área do retângulo 4x5:", a)',
  },
  quiz: [
    {
      pergunta: 'O que uma função que só executa print(), sem return, devolve para quem a chamou?',
      opcoes: ['O texto impresso', 'O número 0', 'None', 'Um erro de execução'],
      correta: 2,
      explicacao:
        'Sem return, a função devolve None por padrão. O texto aparece na tela, mas o valor ' +
        'guardado pela chamada é None.',
    },
    {
      pergunta: 'Qual é a principal diferença entre return e print?',
      opcoes: [
        'Nenhuma, fazem a mesma coisa',
        'return devolve um valor ao programa; print mostra texto na tela',
        'print é mais rápido que return',
        'return só funciona dentro de loops',
      ],
      correta: 1,
      explicacao:
        'return entrega um valor para o programa continuar usando; print apenas exibe algo para ' +
        'o humano ver. São papéis diferentes.',
    },
    {
      pergunta: 'Em uma função recursiva como fatorial(n), para que serve o caso base?',
      opcoes: [
        'Deixar o código mais bonito',
        'Imprimir o resultado',
        'Encerrar a recursão para que ela não se repita para sempre',
        'Importar o módulo math',
      ],
      correta: 2,
      explicacao:
        'O caso base (aqui, n <= 1 retorna 1) é a condição de parada. Sem ele, a função se ' +
        'chamaria indefinidamente.',
    },
    {
      pergunta: 'O que acontece quando um assert recebe uma condição falsa?',
      opcoes: [
        'Nada, o programa ignora',
        'O programa estoura com um AssertionError',
        'Ele converte a condição em True',
        'Ele imprime a condição na tela',
      ],
      correta: 1,
      explicacao:
        'Se a condição do assert for falsa, o programa para na hora com AssertionError — útil ' +
        'para flagrar resultados errados cedo.',
    },
  ],
  xp: 100,
};

export default cap06;
