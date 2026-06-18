import type { Capitulo } from '../src/types.js';

const cap14: Capitulo = {
  id: 14,
  titulo: 'Strings, caracteres e expressões regulares',
  conceitoEmFoco: {
    termo: 'Regex',
    explicacao:
      'Regex (expressão regular) é uma mini-linguagem de padrões para descrever a "forma" de um ' +
      'texto. Em vez de escrever vários ifs para checar cada caractere, você descreve a regra de ' +
      'uma vez: \\d significa "um dígito", \\d{3} significa "três dígitos", \\. significa "um ponto ' +
      'literal". É como um molde de bolo: o texto só passa se encaixar no formato do molde.',
  },
  objetivos: [
    'Entender que String é imutável (cada operação cria uma nova String).',
    'Usar métodos de String comuns: trim, toUpperCase, split, isEmpty.',
    'Trabalhar caractere a caractere com char e a classe Character.',
    'Validar formatos de texto com Pattern e Matcher (regex).',
    'Montar texto de forma eficiente com StringBuilder.',
  ],
  teoria: [
    {
      titulo: 'String é imutável',
      paragrafos: [
        'Uma String em Java nunca muda depois de criada. Quando você chama original.toUpperCase(), ' +
          'a String original continua igual e uma NOVA String é devolvida. Por isso é preciso guardar ' +
          'o resultado numa variável — senão ele se perde.',
        'Quando você precisa juntar muitos pedaços de texto (dentro de um laço, por exemplo), criar ' +
          'uma String nova a cada passo desperdiça memória. O StringBuilder existe para isso: ele é ' +
          'um texto "editável" que você vai montando com append e só no final transforma em String.',
      ],
    },
    {
      titulo: 'char e Character',
      paragrafos: [
        'Um char guarda UM único caractere, escrito entre aspas simples: \'a\', \'7\', \'!\'. Uma String é, ' +
          'por dentro, uma sequência de chars. O método toCharArray() devolve esse vetor de caracteres ' +
          'para você percorrer um por um.',
        'A classe Character traz utilitários para examinar um caractere: Character.isLetter(c) diz se é ' +
          'letra, isDigit(c) se é dígito, isWhitespace(c) se é espaço. São úteis para contar ou filtrar.',
      ],
    },
    {
      titulo: 'Regex com Pattern e Matcher',
      paragrafos: [
        'A regex é o padrão (o molde). Pattern.compile("...") transforma esse texto de padrão num ' +
          'objeto reutilizável. Depois, padrao.matcher(texto) cria um Matcher, e matcher.matches() ' +
          'responde se o texto inteiro encaixa no padrão.',
        'Símbolos comuns: \\d = dígito, \\w = letra/dígito/underscore, \\s = espaço em branco, + = "um ou ' +
          'mais", {3} = "exatamente 3", ^ e $ marcam início e fim. Como em Java a barra invertida é ' +
          'especial dentro de Strings, escrevemos \\\\d no código para representar \\d na regex.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap14/Texto.java',
    descricao:
      'Validador de e-mail e de CPF (formato 000.000.000-00) com Pattern/Matcher, um contador de ' +
      'palavras com split, e demonstrações de imutabilidade de String, StringBuilder e Character.',
    anotacoes: [
      { linha: 13, nota: 'Regex do e-mail compilada uma vez. \\\\w = letra/dígito/_; @ literal; \\\\. = ponto; [a-z]{2,} = domínio com 2+ letras.' },
      { linha: 16, nota: 'Regex do CPF: \\\\d{3} são 3 dígitos; \\\\. é um ponto literal; valida só o FORMATO 000.000.000-00.' },
      { linha: 57, nota: 'padrao.matcher(texto) cria o Matcher, que conecta o padrão (regex) ao texto a verificar.' },
      { linha: 58, nota: 'm.matches() devolve true só se o texto INTEIRO encaixa no padrão.' },
      { linha: 65, nota: 'split("\\\\s+") quebra a frase em palavras usando um ou mais espaços como separador.' },
      { linha: 37, nota: 'toUpperCase() devolve uma NOVA String; a original (linha 36) continua intacta — String é imutável.' },
    ],
  },
  discussao: [
    'A âncora ^ no início e $ no fim são importantes: sem elas, o Matcher poderia aceitar um texto ' +
      'que contém o padrão "no meio" de lixo. Com matches() o texto inteiro precisa casar.',
    'Validar CPF por formato (000.000.000-00) NÃO garante que o CPF é real — os dígitos ' +
      'verificadores não são checados. Formato e validade matemática são coisas diferentes.',
    'Pegadinha comum: esquecer que String é imutável e escrever apenas texto.toUpperCase(); sem ' +
      'guardar o retorno. O texto original não muda e o resultado é jogado fora.',
    'Compile o Pattern uma vez (como constante) quando for reusá-lo muitas vezes — recompilar a ' +
      'mesma regex a cada chamada é desperdício.',
  ],
  desafio: {
    enunciado:
      'Usando regex (Pattern/Matcher), crie um método validarTelefone(String) que aceite o FORMATO ' +
      '(00) 00000-0000: DDD entre parênteses, um espaço, 5 dígitos, hífen e 4 dígitos. No main, ' +
      'teste com "(11) 91234-5678" (deve ser válido) e "1191234" (deve ser inválido).',
    arquivoBase: 'examples/cap14/Desafio.java',
    dica:
      'Os parênteses são especiais em regex, então escape-os: \\\\( e \\\\). O padrão fica algo como ' +
      '"\\\\(\\\\d{2}\\\\) \\\\d{5}-\\\\d{4}". Use Pattern.compile(...).matcher(tel).matches().',
    solucao:
      'import java.util.regex.Pattern;\n' +
      'import java.util.regex.Matcher;\n\n' +
      'public class Desafio {\n' +
      '    private static final Pattern TELEFONE =\n' +
      '        Pattern.compile("^\\\\(\\\\d{2}\\\\) \\\\d{5}-\\\\d{4}$");\n\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println(validarTelefone("(11) 91234-5678")); // true\n' +
      '        System.out.println(validarTelefone("1191234"));         // false\n' +
      '    }\n\n' +
      '    public static boolean validarTelefone(String tel) {\n' +
      '        Matcher m = TELEFONE.matcher(tel);\n' +
      '        return m.matches();\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que significa que uma String é imutável?',
      opcoes: [
        'Ela não pode ser impressa',
        'Depois de criada, seu conteúdo não muda; operações geram uma nova String',
        'Ela só aceita letras maiúsculas',
        'Ela ocupa memória fixa de 1 caractere',
      ],
      correta: 1,
      explicacao: 'Métodos como toUpperCase() devolvem uma nova String; a original permanece inalterada.',
    },
    {
      pergunta: 'Na regex, o que representa \\d{3}?',
      opcoes: [
        'Três letras quaisquer',
        'Um dígito repetido infinitamente',
        'Exatamente três dígitos',
        'O caractere literal "d3"',
      ],
      correta: 2,
      explicacao: '\\d é um dígito e {3} significa exatamente três repetições — portanto, três dígitos.',
    },
    {
      pergunta: 'Qual a função de matcher.matches() ao validar texto com regex?',
      opcoes: [
        'Conta quantas palavras existem',
        'Devolve true só se o texto inteiro casa com o padrão',
        'Converte o texto em maiúsculas',
        'Remove os espaços do texto',
      ],
      correta: 1,
      explicacao: 'matches() exige que o texto INTEIRO encaixe no padrão, do início (^) ao fim ($).',
    },
    {
      pergunta: 'Por que usar StringBuilder ao juntar muito texto num laço?',
      opcoes: [
        'Porque String não tem o método length',
        'Para evitar criar várias Strings intermediárias, economizando memória',
        'Porque StringBuilder aceita acentos e String não',
        'Para deixar o texto imutável',
      ],
      correta: 1,
      explicacao: 'StringBuilder é editável; você vai acumulando com append e só no fim gera a String final.',
    },
  ],
  xp: 100,
};

export default cap14;
