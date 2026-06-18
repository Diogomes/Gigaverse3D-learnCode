import type { Capitulo } from '../src/types.js';

const cap06: Capitulo = {
  id: 6,
  titulo: 'Métodos: um exame mais profundo',
  conceitoEmFoco: {
    termo: 'Método',
    explicacao:
      'Um método é um bloco de código nomeado que funciona como uma "máquina": recebe entradas ' +
      '(os parâmetros), faz alguma coisa e pode devolver um resultado (o retorno). Você o ' +
      'escreve uma vez e o reutiliza chamando seu nome. Isso evita repetição e organiza o ' +
      'programa em peças com responsabilidades claras.',
  },
  objetivos: [
    'Declarar métodos com parâmetros e valor de retorno.',
    'Diferenciar parâmetro (na declaração) de argumento (na chamada).',
    'Entender o escopo das variáveis (onde elas existem).',
    'Usar métodos static.',
    'Criar métodos sobrecarregados (mesmo nome, parâmetros diferentes).',
  ],
  teoria: [
    {
      titulo: 'Entrada, processamento, saída',
      paragrafos: [
        'A assinatura de um método tem: modificadores (public static), tipo de retorno (int, ' +
          'void...), nome e lista de parâmetros. Ex.: public static int rolar(int lados).',
        'Parâmetros são as "entradas" declaradas (int lados). Argumentos são os valores reais ' +
          'que você passa ao chamar (rolar(20) — aqui 20 é o argumento). O return devolve o ' +
          'resultado a quem chamou.',
      ],
    },
    {
      titulo: 'static e escopo',
      paragrafos: [
        'Um método static pertence à CLASSE, não a um objeto: pode ser chamado sem criar nada ' +
          'com new (como Math.sqrt). Por isso o main é static.',
        'Variáveis declaradas dentro de um método só existem ali (escopo local). Cada chamada ' +
          'tem suas próprias variáveis, independentes das outras.',
      ],
    },
    {
      titulo: 'Sobrecarga (overload)',
      paragrafos: [
        'Você pode ter vários métodos com o MESMO nome, desde que a lista de parâmetros seja ' +
          'diferente (em quantidade ou tipo). O compilador escolhe qual chamar olhando os ' +
          'argumentos.',
        'Exemplo: rolar(), rolar(int lados) e rolar(int lados, long semente) convivem. É comum ' +
          'uma versão simples chamar a mais completa, reaproveitando código.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap06/Dado.java',
    descricao:
      'Um "dado de RPG" com o método rolar sobrecarregado em três versões. Usa semente fixa ' +
      'para o resultado ser sempre o mesmo nesta demonstração.',
    anotacoes: [
      { linha: 8, nota: 'Assinatura completa: static, retorno int, nome rolar e dois parâmetros (lados, semente).' },
      { linha: 10, nota: 'return devolve o valor calculado a quem chamou o método. nextInt(lados) dá 0..lados-1; +1 desloca para 1..lados.' },
      { linha: 14, nota: 'SOBRECARGA: mesmo nome rolar, mas só um parâmetro. Ela chama a versão de cima reaproveitando a lógica.' },
      { linha: 19, nota: 'Outra SOBRECARGA: sem parâmetros. O compilador diferencia pelos argumentos da chamada.' },
      { linha: 25, nota: 'Aqui passamos os ARGUMENTOS. rolar() escolhe a versão sem parâmetros; rolar(20) a de um parâmetro.' },
    ],
  },
  discussao: [
    'Parâmetro x argumento: parâmetro é o nome na declaração; argumento é o valor concreto na ' +
      'chamada. São dois lados da mesma "conexão".',
    'Em Java, tipos primitivos são passados por VALOR (uma cópia). Alterar o parâmetro dentro ' +
      'do método não muda a variável original de fora.',
    'Métodos void não usam return para devolver valor (mas podem usar return; sozinho para sair ' +
      'mais cedo).',
    'Sobrecarga se diferencia pelos PARÂMETROS, nunca só pelo tipo de retorno. Dois métodos que ' +
      'só diferem no retorno não compilam.',
  ],
  desafio: {
    enunciado:
      'Crie um método static sobrecarregado chamado soma: soma(int a, int b) devolve a + b; ' +
      'soma(int a, int b, int c) devolve a + b + c. Chame os dois no main e imprima.',
    arquivoBase: 'examples/cap06/Desafio.java',
    dica: 'Declare os dois métodos com o mesmo nome e quantidades diferentes de parâmetros.',
    solucao:
      'public class Desafio {\n' +
      '    public static int soma(int a, int b) { return a + b; }\n' +
      '    public static int soma(int a, int b, int c) { return a + b + c; }\n' +
      '    public static void main(String[] args) {\n' +
      '        System.out.println(soma(2, 3));\n' +
      '        System.out.println(soma(2, 3, 4));\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Qual a diferença entre parâmetro e argumento?',
      opcoes: [
        'São sinônimos exatos',
        'Parâmetro é o nome na declaração; argumento é o valor passado na chamada',
        'Argumento é o nome na declaração; parâmetro é o valor passado',
        'Parâmetro só existe em métodos static',
      ],
      correta: 1,
      explicacao: 'Parâmetro aparece na assinatura do método; argumento é o valor concreto que você passa ao chamá-lo.',
    },
    {
      pergunta: 'O que significa um método ser static?',
      opcoes: [
        'Ele nunca muda de valor',
        'Pertence à classe e pode ser chamado sem criar um objeto',
        'É mais rápido que os outros',
        'Só pode ser chamado uma vez',
      ],
      correta: 1,
      explicacao: 'Métodos static pertencem à classe; por isso o main é static e roda sem new.',
    },
    {
      pergunta: 'O que caracteriza a sobrecarga de métodos?',
      opcoes: [
        'Mesmo nome e mesma lista de parâmetros',
        'Nomes diferentes para o mesmo comportamento',
        'Mesmo nome, mas lista de parâmetros diferente',
        'Métodos que só diferem no tipo de retorno',
      ],
      correta: 2,
      explicacao: 'Sobrecarga = mesmo nome com parâmetros diferentes. Só o tipo de retorno não basta.',
    },
  ],
  xp: 100,
};

export default cap06;
