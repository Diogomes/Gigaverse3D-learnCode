import type { Capitulo } from '../src/types.js';

const cap02: Capitulo = {
  id: 2,
  titulo: 'Aplicativos Java; entrada/saída e operadores',
  conceitoEmFoco: {
    termo: 'Variável e tipo primitivo',
    explicacao:
      'Uma variável é uma "caixa" nomeada na memória que guarda um valor. Em Java toda ' +
      'variável tem um TIPO, que diz o que ela pode guardar: int (inteiros), double (números ' +
      'com vírgula), boolean (true/false), char (um caractere). O tipo é declarado antes do ' +
      'nome: "int idade;" cria uma caixa chamada idade que só aceita inteiros.',
  },
  objetivos: [
    'Declarar variáveis com tipos primitivos (int, double, boolean).',
    'Ler dados do teclado com a classe Scanner.',
    'Usar operadores aritméticos (+, -, *, /, %) e entender precedência.',
    'Comparar valores com operadores relacionais e de igualdade.',
    'Formatar a saída com printf.',
  ],
  teoria: [
    {
      titulo: 'Tipos primitivos: a etiqueta da caixa',
      paragrafos: [
        'Antes de guardar algo numa variável, você diz QUE tipo de dado ela aceita. Os mais ' +
          'comuns são: int (números inteiros, como 7), double (números reais, como 3.14), ' +
          'boolean (apenas true ou false) e char (um único caractere, como \'A\').',
        'Escolher o tipo certo importa: 5 / 2 entre inteiros dá 2 (a parte fracionária é ' +
          'descartada!); já 5.0 / 2 dá 2.5. Isso pega muita gente desprevenida.',
      ],
    },
    {
      titulo: 'Lendo do teclado com Scanner',
      paragrafos: [
        'Para o programa conversar com o usuário, usamos a classe Scanner. Primeiro a ' +
          'importamos (import java.util.Scanner;), depois criamos um objeto ligado à entrada ' +
          'padrão: Scanner entrada = new Scanner(System.in);',
        'Os métodos nextInt(), nextDouble() e nextLine() leem, respectivamente, um inteiro, um ' +
          'número real e uma linha de texto digitada.',
      ],
    },
    {
      titulo: 'Operadores e precedência',
      paragrafos: [
        'Aritméticos: + - * / e % (resto da divisão). A multiplicação e a divisão acontecem ' +
          'antes da soma e da subtração, como na matemática. Use parênteses para deixar a ' +
          'ordem explícita.',
        'Relacionais (>, <, >=, <=) e de igualdade (==, !=) sempre resultam em um boolean: ' +
          'true ou false. Atenção: == compara, enquanto = atribui (guarda um valor).',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap02/Calculadora.java',
    descricao: 'Lê dois números do teclado e mostra a soma, a média e três comparações.',
    entradaSimulada: '8\n4\n',
    anotacoes: [
      { linha: 8, nota: 'Cria o Scanner ligado a System.in (o teclado). É a porta de entrada de dados.' },
      {
        linha: 11,
        nota:
          'Declara a variável "a" do tipo double e guarda nela o número lido por nextDouble(). ' +
          'Aqui está a ideia de "caixa com tipo".',
      },
      { linha: 16, nota: 'Operador aritmético +: soma os dois valores e guarda em "soma".' },
      { linha: 19, nota: 'printf formata a saída. %.2f mostra o número com 2 casas decimais; %n pula linha.' },
      {
        linha: 23,
        nota:
          'O operador == compara se os dois são iguais e devolve um boolean (true/false). ' +
          'Não confunda com = (atribuição).',
      },
    ],
  },
  discussao: [
    'Divisão inteira: 5 / 2 dá 2, não 2.5. Se quiser o resultado real, ao menos um dos ' +
      'lados precisa ser double (ex.: 5.0 / 2).',
    'Lembre-se de == para comparar e = para atribuir. Trocar um pelo outro é um erro clássico.',
    'No Brasil, o printf com %.2f pode mostrar o número com vírgula (ex.: 12,00) por causa do ' +
      'idioma do sistema — isso é normal e correto.',
    'Sempre que ler do teclado, garanta que o usuário digite o tipo esperado; nextDouble() ' +
      'quebra se vier texto no lugar de número (veremos como tratar isso no cap. 11).',
  ],
  desafio: {
    enunciado:
      'Edite Desafio.java para ler dois números e mostrar o PRODUTO (multiplicação) e qual ' +
      'deles é o maior.',
    arquivoBase: 'examples/cap02/Desafio.java',
    dica: 'Multiplicação é o operador *. Para o maior, use o operador condicional: (a > b) ? a : b.',
    solucao:
      'double produto = a * b;\n' +
      'double maior = (a > b) ? a : b;\n' +
      'System.out.println("Produto: " + produto);\n' +
      'System.out.println("Maior: " + maior);',
  },
  quiz: [
    {
      pergunta: 'Qual é o resultado de 7 / 2 quando ambos são int?',
      opcoes: ['3.5', '3', '4', 'Erro de compilação'],
      correta: 1,
      explicacao: 'Divisão entre inteiros descarta a parte fracionária: 7 / 2 = 3. Para obter 3.5, use 7.0 / 2.',
    },
    {
      pergunta: 'Qual operador COMPARA se dois valores são iguais?',
      opcoes: ['=', '==', ':=', 'equals'],
      correta: 1,
      explicacao: '== compara igualdade e devolve boolean. O = (sozinho) atribui um valor a uma variável.',
    },
    {
      pergunta: 'O que faz o operador % em Java?',
      opcoes: ['Porcentagem', 'Resto da divisão', 'Divisão exata', 'Potência'],
      correta: 1,
      explicacao: '% devolve o resto da divisão inteira. Ex.: 7 % 2 = 1.',
    },
    {
      pergunta: 'Qual classe usamos para ler dados digitados no teclado?',
      opcoes: ['Reader', 'Keyboard', 'Scanner', 'Input'],
      correta: 2,
      explicacao: 'Scanner (de java.util) lê a entrada padrão com métodos como nextInt() e nextDouble().',
    },
  ],
  xp: 100,
};

export default cap02;
