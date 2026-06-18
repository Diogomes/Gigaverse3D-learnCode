import type { Capitulo } from '../src/types.js';

const cap11: Capitulo = {
  id: 11,
  titulo: 'Tratamento de exceções',
  conceitoEmFoco: {
    termo: 'Exceção',
    explicacao:
      'Uma exceção é um erro que acontece enquanto o programa está rodando (por exemplo, ' +
      'dividir por zero ou tentar transformar um texto em número). Por padrão ela interrompe ' +
      'tudo e encerra o programa. Mas você pode "pegar" essa exceção com try/catch e reagir a ' +
      'ela com calma, em vez de deixar o programa quebrar. É como ter uma rede de segurança: ' +
      'se algo der errado dentro do try, o catch entra em ação.',
  },
  objetivos: [
    'Entender o que é uma exceção e por que ela interrompe o fluxo.',
    'Usar try/catch/finally para capturar e tratar erros.',
    'Diferenciar exceções checked de unchecked.',
    'Conhecer throw/throws e a hierarquia de exceções.',
    'Tratar entradas inválidas do usuário sem quebrar o programa.',
  ],
  teoria: [
    {
      titulo: 'try, catch e finally',
      paragrafos: [
        'No bloco try você coloca o código "arriscado", que pode falhar. Se uma exceção for ' +
          'lançada ali, o Java pula imediatamente para o bloco catch correspondente, em vez de ' +
          'encerrar o programa. No catch você decide o que fazer: avisar o usuário, usar um valor ' +
          'padrão, tentar de novo, etc.',
        'O bloco finally é opcional e roda SEMPRE — tendo dado erro ou não. Ele é o lugar ideal ' +
          'para "limpar a bagunça": fechar arquivos, liberar recursos. Assim você garante que ' +
          'essa limpeza acontece mesmo que algo dê errado no meio do caminho.',
      ],
    },
    {
      titulo: 'Hierarquia, checked e unchecked',
      paragrafos: [
        'Toda exceção em Java é um objeto que descende de Throwable. Abaixo dele estão Error ' +
          '(problemas graves da JVM) e Exception (erros que o seu programa pode tratar). Como o ' +
          'catch pega uma classe e todas as suas filhas, capturar Exception pega quase tudo — mas ' +
          'o ideal é capturar a exceção mais específica que você espera.',
        'Exceções unchecked (filhas de RuntimeException, como ArithmeticException e ' +
          'InputMismatchException) não obrigam você a tratá-las — geralmente são bugs de lógica. ' +
          'Já as checked (como IOException) o compilador EXIGE que você trate com try/catch ou ' +
          'declare com throws no cabeçalho do método.',
      ],
    },
    {
      titulo: 'throw, throws e try-with-resources',
      paragrafos: [
        'A palavra throw (lançar) dispara uma exceção você mesmo: throw new ' +
          'IllegalArgumentException("idade negativa"). Já throws (no cabeçalho do método) avisa ' +
          'quem chama que aquele método pode lançar uma exceção checked, repassando a ' +
          'responsabilidade de tratá-la.',
        'O try-with-resources — try (Scanner sc = new Scanner(...)) { ... } — fecha o recurso ' +
          'automaticamente ao final, mesmo que ocorra uma exceção. É a forma moderna e segura de ' +
          'lidar com arquivos, conexões e outros recursos que precisam ser fechados.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap11/Calculadora.java',
    descricao:
      'Uma calculadora de divisão que lê dois números do teclado. Ela trata a ' +
      'ArithmeticException (divisão por zero) e a InputMismatchException (quando o usuário ' +
      'digita algo que não é número), continuando a rodar normalmente em vez de quebrar.',
    anotacoes: [
      { linha: 4, nota: 'Importamos InputMismatchException, lançada quando o Scanner espera um número e recebe texto.' },
      { linha: 17, nota: 'O bloco try protege o código arriscado: a divisão pode lançar uma exceção.' },
      { linha: 18, nota: 'Se divisor for 0, esta linha lança ArithmeticException e o fluxo pula direto para o catch.' },
      { linha: 20, nota: 'O catch captura a exceção e trata o erro com calma, sem encerrar o programa.' },
      { linha: 23, nota: 'O finally roda SEMPRE, tenha ocorrido erro ou não. Ótimo para finalizar/limpar.' },
      { linha: 37, nota: 'Aqui tratamos entrada inválida do usuário (texto onde esperávamos número) e usamos 0 como padrão.' },
    ],
    entradaSimulada: '20\n0\n',
  },
  discussao: [
    'Tratar exceções não é "esconder erros": é reagir a situações previsíveis (entrada ruim, ' +
      'arquivo ausente) de forma controlada, mantendo o programa estável.',
    'Capture a exceção mais específica possível. Um catch (Exception e) genérico pode esconder ' +
      'bugs que você nem imaginava — prefira ArithmeticException, IOException, etc.',
    'Pegadinha do Scanner: ao capturar a InputMismatchException, é preciso descartar o texto ' +
      'inválido (sc.next()) do buffer; senão o programa fica lendo o mesmo lixo repetidamente.',
    'O finally roda mesmo quando você dá return dentro do try ou do catch — por isso é o lugar ' +
      'certo para liberar recursos. Em recursos fecháveis, o try-with-resources faz isso por você.',
  ],
  desafio: {
    enunciado:
      'Complete o método divideOuZero(int a, int b). Ele deve devolver a / b, mas se b for zero ' +
      'use try/catch para capturar a ArithmeticException e devolver 0 em vez de quebrar. No main ' +
      'já existem as chamadas 10/2 (deve dar 5) e 7/0 (deve dar 0).',
    arquivoBase: 'examples/cap11/Desafio.java',
    dica: 'Coloque return a / b; dentro de um try e, no catch (ArithmeticException e), faça return 0;.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("10 / 2 = " + divideOuZero(10, 2));\n' +
      '        System.out.println("7 / 0  = " + divideOuZero(7, 0));\n' +
      '    }\n\n' +
      '    static int divideOuZero(int a, int b) {\n' +
      '        try {\n' +
      '            return a / b;\n' +
      '        } catch (ArithmeticException e) {\n' +
      '            return 0;\n' +
      '        }\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que acontece com o código dentro de um bloco try quando uma exceção é lançada?',
      opcoes: [
        'O programa sempre encerra imediatamente',
        'O fluxo pula para o bloco catch correspondente',
        'A linha que falhou é repetida automaticamente',
        'A exceção é ignorada e o try continua',
      ],
      correta: 1,
      explicacao: 'Ao ocorrer a exceção, o try é interrompido e o controle vai para o catch compatível com o tipo do erro.',
    },
    {
      pergunta: 'Quando o bloco finally é executado?',
      opcoes: [
        'Apenas quando ocorre uma exceção',
        'Apenas quando NÃO ocorre exceção',
        'Sempre, tendo ocorrido exceção ou não',
        'Somente se houver um return no try',
      ],
      correta: 2,
      explicacao: 'O finally roda em qualquer caso, sendo ideal para liberar recursos e fazer limpeza.',
    },
    {
      pergunta: 'Qual a diferença entre exceções checked e unchecked?',
      opcoes: [
        'Checked são erros da JVM; unchecked são do programador',
        'O compilador exige tratar as checked; as unchecked não são obrigatórias',
        'Unchecked não podem ser capturadas com catch',
        'Não há diferença prática entre elas',
      ],
      correta: 1,
      explicacao: 'Checked (ex.: IOException) precisam de try/catch ou throws; unchecked (ex.: ArithmeticException) não obrigam tratamento.',
    },
    {
      pergunta: 'Para que serve a palavra-chave throw?',
      opcoes: [
        'Para capturar uma exceção',
        'Para lançar (disparar) uma exceção você mesmo',
        'Para fechar um recurso automaticamente',
        'Para declarar que o método não lança exceções',
      ],
      correta: 1,
      explicacao: 'throw dispara uma exceção, por exemplo throw new IllegalArgumentException("..."); já throws apenas declara no cabeçalho.',
    },
  ],
  xp: 100,
};

export default cap11;
