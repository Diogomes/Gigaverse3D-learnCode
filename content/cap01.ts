import type { Capitulo } from '../src/types.js';

const cap01: Capitulo = {
  id: 1,
  titulo: 'Introdução aos computadores, à Internet e a Java',
  conceitoEmFoco: {
    termo: 'JVM e bytecode',
    explicacao:
      'Você escreve um arquivo .java (texto). O compilador javac transforma esse texto ' +
      'em bytecode (um arquivo .class) — um "código intermediário". A JVM (Java Virtual ' +
      'Machine) lê esse bytecode e o executa em QUALQUER sistema operacional. É a ideia do ' +
      '"escreva uma vez, rode em qualquer lugar".',
  },
  objetivos: [
    'Entender a diferença entre código-fonte (.java), bytecode (.class) e execução.',
    'Saber o que fazem o javac (compilador) e a java/JVM (execução).',
    'Reconhecer a anatomia de um programa Java: classe e método main.',
    'Imprimir texto no terminal com System.out.print e println.',
  ],
  teoria: [
    {
      titulo: 'Do texto à execução',
      paragrafos: [
        'Um computador só entende linguagem de máquina (0s e 1s). Nós, humanos, escrevemos ' +
          'em linguagem de alto nível (Java), que é muito mais legível.',
        'Em Java o caminho é: você escreve OlaGigaverse.java → o javac COMPILA para ' +
          'OlaGigaverse.class (bytecode) → a JVM EXECUTA esse bytecode e mostra a saída.',
        'Por isso o mesmo programa Java roda no Linux, Windows ou Mac sem mudar nada: o que ' +
          'muda é a JVM instalada em cada sistema, não o seu código.',
      ],
    },
    {
      titulo: 'JDK, JRE e JVM (sem decoreba)',
      paragrafos: [
        'JVM = a "máquina" que executa o bytecode. JRE = a JVM + bibliotecas para RODAR ' +
          'programas. JDK = o JRE + ferramentas para DESENVOLVER, incluindo o compilador javac.',
        'Resumo prático: para apenas rodar, basta a JRE; para compilar (como faremos aqui), ' +
          'você precisa do JDK. Este app usa o javac e o java do seu JDK.',
      ],
    },
    {
      titulo: 'Tudo vive dentro de uma classe',
      paragrafos: [
        'Em Java, não existe código "solto": todo programa fica dentro de uma classe. O ponto ' +
          'onde a execução começa é sempre o método chamado main.',
        'O nome do arquivo precisa ser igual ao nome da classe pública. Por isso a classe ' +
          'OlaGigaverse fica no arquivo OlaGigaverse.java.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap01/OlaGigaverse.java',
    descricao:
      'O clássico "primeiro programa": imprime algumas linhas no terminal e mostra a ' +
      'diferença entre print e println.',
    anotacoes: [
      {
        linha: 5,
        nota:
          'Declaração da CLASSE. "public" = visível a todos. O nome (OlaGigaverse) precisa ser ' +
          'idêntico ao nome do arquivo (.java).',
      },
      {
        linha: 7,
        nota:
          'O método MAIN: a JVM sempre começa por aqui. "static" = pertence à classe (não a um ' +
          'objeto); "void" = não devolve valor; "String[] args" = argumentos da linha de comando.',
      },
      {
        linha: 9,
        nota:
          'System.out.println escreve o texto entre aspas e PULA para a próxima linha. O texto ' +
          'entre aspas é uma String.',
      },
      {
        linha: 13,
        nota:
          'System.out.print (sem o "ln") escreve mas NÃO pula linha — por isso a próxima ' +
          'impressão continua na mesma linha.',
      },
    ],
  },
  discussao: [
    'O ; (ponto e vírgula) encerra cada instrução. Esquecê-lo é o erro de compilação mais ' +
      'comum de quem está começando.',
    'Maiúsculas e minúsculas importam: System é diferente de system. Java é "case sensitive".',
    'A diferença entre print e println parece pequena, mas controla o layout da sua saída: ' +
      'println adiciona uma quebra de linha ao final.',
    'Se você renomear a classe, precisa renomear o arquivo também — senão o javac reclama.',
  ],
  desafio: {
    enunciado:
      'Edite o arquivo Desafio.java para imprimir TRÊS linhas: (1) seu nome, (2) a frase ' +
      '"Estou aprendendo Java!" e (3) uma arte ASCII simples, como <(^_^)>.',
    arquivoBase: 'examples/cap01/Desafio.java',
    dica: 'Use System.out.println("...") uma vez para cada linha que você quer imprimir.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println("Diogo");\n' +
      '        System.out.println("Estou aprendendo Java!");\n' +
      '        System.out.println("<(^_^)>");\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que o javac produz a partir de um arquivo .java?',
      opcoes: [
        'Um executável .exe específico do Windows',
        'Um arquivo .class com bytecode, executado pela JVM',
        'Linguagem de máquina pronta para o processador',
        'Um arquivo de texto idêntico ao original',
      ],
      correta: 1,
      explicacao:
        'O javac compila o código-fonte em bytecode (.class). A JVM é quem executa esse ' +
        'bytecode, o que torna o Java portável entre sistemas.',
    },
    {
      pergunta: 'Por onde a JVM começa a executar um programa Java?',
      opcoes: [
        'Pela primeira linha do arquivo',
        'Pela primeira classe declarada',
        'Pelo método main',
        'Por qualquer método public',
      ],
      correta: 2,
      explicacao: 'A execução sempre começa pelo método main (public static void main).',
    },
    {
      pergunta: 'Qual a diferença entre System.out.print e System.out.println?',
      opcoes: [
        'Nenhuma, são sinônimos',
        'print pula linha; println não',
        'println pula linha ao final; print não',
        'print só funciona com números',
      ],
      correta: 2,
      explicacao: 'println adiciona uma quebra de linha ao final; print mantém o cursor na mesma linha.',
    },
    {
      pergunta: 'Por que o mesmo programa Java roda em Linux, Windows e Mac?',
      opcoes: [
        'Porque o javac gera código de máquina universal',
        'Porque cada sistema tem uma JVM que executa o mesmo bytecode',
        'Porque Java reescreve o código em cada sistema',
        'Porque o Java só roda em navegadores',
      ],
      correta: 1,
      explicacao:
        'O bytecode é o mesmo em todo lugar; o que muda é a JVM instalada em cada sistema operacional.',
    },
  ],
  xp: 100,
};

export default cap01;
