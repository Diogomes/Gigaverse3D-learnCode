import type { Capitulo } from '../src/types.js';

const cap02: Capitulo = {
  id: 2,
  titulo: 'Variáveis, expressões e instruções',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Tipagem dinâmica',
    explicacao:
      'No Python a VARIÁVEL não tem tipo fixo: o tipo pertence ao VALOR, não ao nome. Uma ' +
      'variável é só um apelido que aponta para um valor. Por isso x = 5 (um int) e, na linha ' +
      'seguinte, x = "oi" (uma str) é perfeitamente válido — o nome x passa a apontar para outro ' +
      'valor, de outro tipo. A função type() mostra o tipo do valor que a variável guarda AGORA.',
  },
  objetivos: [
    'Criar variáveis com atribuição (=) e reaproveitar valores guardados.',
    'Reconhecer os tipos básicos: int, float, str e bool.',
    'Distinguir uma EXPRESSÃO (que produz um valor) de uma INSTRUÇÃO (que executa uma ação).',
    'Aplicar a ordem de operações, incluindo ** (potência), / e // (divisão).',
    'Usar type() para inspecionar tipos e comentários (#) para documentar o código.',
  ],
  teoria: [
    {
      titulo: 'Variáveis e atribuição',
      paragrafos: [
        'Uma variável é um nome que guarda um valor para você usar depois. A atribuição usa o ' +
          'sinal =, que NÃO é "igual" da matemática: ele quer dizer "guarde o valor da direita no ' +
          'nome da esquerda". Em peso = 70, o nome peso passa a apontar para o valor 70.',
        'Como o Python tem tipagem dinâmica, o mesmo nome pode apontar para valores de tipos ' +
          'diferentes ao longo do programa. Você não declara o tipo: ele é descoberto a partir do ' +
          'valor. Por isso x = 5 e depois x = "oi" funciona sem reclamação.',
      ],
    },
    {
      titulo: 'Os tipos básicos',
      paragrafos: [
        'int é número inteiro (42, -7). float é número com casas decimais (3.14, 1.75) — repare ' +
          'que em Python o separador decimal é o PONTO, nunca a vírgula. str é texto entre aspas ' +
          '("oi"). bool é o tipo lógico, com apenas dois valores: True e False.',
        'type(valor) revela o tipo. type(5) é <class \'int\'>; type(1.75) é float; type("oi") é ' +
          'str. Conhecer o tipo importa porque ele decide o que cada operação faz: 2 + 2 soma, ' +
          'mas "2" + "2" junta os textos e dá "22".',
      ],
    },
    {
      titulo: 'Expressão vs. instrução',
      paragrafos: [
        'Uma EXPRESSÃO é qualquer combinação de valores e operadores que o Python AVALIA até virar ' +
          'um único valor: 2 + 3, peso / altura ** 2 ou type(42). Toda expressão "tem resultado".',
        'Uma INSTRUÇÃO é uma ordem que o Python EXECUTA, e que pode não produzir valor algum: a ' +
          'atribuição peso = 70 e a chamada print("oi") são instruções. Em peso = 70, o lado ' +
          'direito é uma expressão (70) e a linha inteira é uma instrução de atribuição.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap02/imc.py',
    descricao:
      'Lê peso e altura com input(), calcula o IMC (peso / altura ao quadrado) e classifica o ' +
      'resultado em faixas. Mostra atribuição, conversão de tipo e a precedência de **.',
    entradaSimulada: '70\n1.75\n',
    anotacoes: [
      {
        linha: 5,
        nota:
          'input() devolve sempre uma str (texto), mesmo que você digite números. float() ' +
          'converte esse texto em número com casas decimais, para podermos fazer contas.',
      },
      {
        linha: 10,
        nota:
          'Aqui a precedência manda: ** (potência) acontece ANTES da divisão, então altura ** 2 ' +
          'é calculado primeiro e só depois peso é dividido pelo resultado. Em Python 3 a / ' +
          'sempre devolve um float.',
      },
      {
        linha: 13,
        nota:
          'round(imc, 1) arredonda o IMC para 1 casa decimal. É uma expressão (produz um valor) ' +
          'usada dentro da instrução print().',
      },
      {
        linha: 16,
        nota:
          'imc < 18.5 é uma expressão do tipo bool: vale True ou False. O if executa o bloco ' +
          'indentado abaixo apenas quando o resultado é True.',
      },
      {
        linha: 18,
        nota:
          'elif ("else if") só é testado se o if anterior deu False. Como já sabemos que imc não ' +
          'é menor que 18.5, basta checar imc < 25 para a faixa "normal".',
      },
    ],
  },
  discussao: [
    'Potência é **, não ^. Em Python, altura ** 2 eleva ao quadrado; o ^ existe, mas faz outra ' +
      'coisa (operação bit a bit) e quase nunca é o que um iniciante quer.',
    'A divisão / SEMPRE devolve um float em Python 3: 10 / 2 dá 5.0, não 5. Se você quer só a ' +
      'parte inteira da divisão, use //: 7 // 2 dá 3.',
    'Número decimal usa PONTO, não vírgula: escreva 1.75, nunca 1,75. Com a vírgula o Python ' +
      'entende dois valores separados, e a conta não sai como você espera.',
    'input() devolve texto. Esquecer o float() (ou o int()) e tentar fazer conta com o texto ' +
      'causa erro — ou pior, "soma" que na verdade gruda os caracteres. Converta antes de calcular.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap02/desafio.py. Ele lê uma temperatura em Celsius; complete a linha do ' +
      'cálculo para converter em Fahrenheit usando F = C * 9 / 5 + 32 e rode para conferir.',
    arquivoBase: 'examples/cap02/desafio.py',
    dica:
      'Não precisa de parênteses: pela precedência, C * 9 / 5 é resolvido antes do + 32. ' +
      'Escreva fahrenheit = celsius * 9 / 5 + 32.',
    solucao:
      'celsius = float(input("Temperatura em Celsius: "))\n' +
      'fahrenheit = celsius * 9 / 5 + 32\n' +
      'print(celsius, "C equivale a", fahrenheit, "F")',
  },
  quiz: [
    {
      pergunta: 'Depois de x = 5 e, na linha seguinte, x = "oi", o que type(x) revela?',
      opcoes: ['int', 'str', 'Dá erro: o tipo de x já foi fixado', 'float'],
      correta: 1,
      explicacao:
        'O tipo pertence ao valor, não ao nome. Como x agora aponta para "oi", seu tipo é str. ' +
        'Isso é a tipagem dinâmica em ação.',
    },
    {
      pergunta: 'Qual é o resultado de 2 ** 3 + 1 em Python?',
      opcoes: ['16', '9', '7', '12'],
      correta: 1,
      explicacao:
        'A potência ** vem antes da soma: 2 ** 3 = 8, depois 8 + 1 = 9.',
    },
    {
      pergunta: 'Qual destas é uma INSTRUÇÃO (e não apenas uma expressão)?',
      opcoes: ['2 + 3', 'peso = 70', 'altura ** 2', 'type(42)'],
      correta: 1,
      explicacao:
        'peso = 70 é uma atribuição: executa uma ação (guardar o valor). As outras são expressões ' +
        'que apenas produzem um valor.',
    },
    {
      pergunta: 'Quanto vale 7 / 2 em Python 3?',
      opcoes: ['3', '3.5', '4', '"3.5"'],
      correta: 1,
      explicacao:
        'A divisão / sempre devolve float em Python 3, então 7 / 2 é 3.5. Para a divisão inteira ' +
        '(que daria 3) usaríamos //.',
    },
  ],
  xp: 100,
};

export default cap02;
