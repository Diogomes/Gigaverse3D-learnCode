import type { Capitulo } from '../src/types.js';

const cap10: Capitulo = {
  id: 10,
  titulo: 'POO: polimorfismo e interfaces',
  conceitoEmFoco: {
    termo: 'Polimorfismo',
    explicacao:
      'Polimorfismo significa "muitas formas". Um mesmo comando — por exemplo area() — se ' +
      'comporta de um jeito diferente dependendo do tipo REAL do objeto. É como o comando ' +
      '"faça som": um cachorro late e um gato mia. Você dá a mesma ordem, mas cada objeto ' +
      'responde do seu jeito. Em Java, você trabalha com o tipo geral (Forma) e o programa ' +
      'escolhe sozinho, na hora de rodar, qual versão do método executar.',
  },
  objetivos: [
    'Definir uma interface como um "contrato" de métodos.',
    'Implementar a mesma interface em várias classes diferentes.',
    'Chamar um método polimorficamente sobre uma lista de objetos.',
    'Entender a vinculação dinâmica (a versão certa é escolhida em tempo de execução).',
    'Usar instanceof e casting para recuperar o tipo real quando necessário.',
  ],
  teoria: [
    {
      titulo: 'Interface: um contrato',
      paragrafos: [
        'Uma interface lista os métodos que uma classe PRECISA ter, sem dizer como eles ' +
          'funcionam. É só o contrato: "quem for uma Forma tem que saber calcular area() e ' +
          'dizer seu nome()". Cada classe assina esse contrato com a palavra implements.',
        'Como todas as Formas obedecem ao mesmo contrato, podemos guardá-las juntas (numa ' +
          'lista ou array do tipo Forma) e tratá-las de modo uniforme, mesmo sendo classes ' +
          'diferentes por dentro.',
      ],
    },
    {
      titulo: 'Classe abstract e métodos abstratos',
      paragrafos: [
        'Uma classe abstract é uma base comum que NÃO pode ser instanciada sozinha (não dá ' +
          'para fazer new FormaBase()). Ela existe para ser herdada. Pode ter métodos ' +
          'concretos (com corpo, compartilhados por todos) e métodos abstratos.',
        'Um método abstrato é declarado sem corpo: public abstract double area();. Ele ' +
          'OBRIGA cada subclasse a fornecer sua própria versão. Assim, nome() pode ser ' +
          'definido uma vez na base, enquanto area() é diferente em cada forma.',
      ],
    },
    {
      titulo: 'Vinculação dinâmica, instanceof e casting',
      paragrafos: [
        'Quando você escreve f.area() e f é do tipo Forma, o Java só decide qual area() ' +
          'rodar na hora da execução, olhando o objeto REAL guardado em f. Isso se chama ' +
          'vinculação dinâmica — é o motor por trás do polimorfismo.',
        'Às vezes você precisa do tipo específico. instanceof pergunta "este objeto é um ' +
          'Circulo?" e o casting (Circulo) o trata como tal, liberando métodos próprios ' +
          'daquela classe, como raio(). Sempre teste com instanceof antes de fazer o casting.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap10/Formas.java',
    descricao:
      'Uma interface Forma com area() e nome(), uma classe abstrata FormaBase e três formas ' +
      '(Circulo, Retangulo, Triangulo). O main percorre uma lista de Formas chamando area() ' +
      'polimorficamente e mostra cada área e o total.',
    anotacoes: [
      { linha: 7, nota: 'O array é do tipo Forma, mas guarda objetos de classes diferentes (Circulo, Retangulo, Triangulo).' },
      { linha: 16, nota: 'Polimorfismo em ação: f.area() chama a versão certa conforme o tipo real do objeto.' },
      { linha: 23, nota: 'instanceof verifica o tipo real do objeto antes de tratá-lo de forma específica.' },
      { linha: 24, nota: 'Casting: (Circulo) trata a Forma como Circulo, liberando métodos próprios como raio().' },
      { linha: 31, nota: 'Interface: o contrato. Quem implementa é obrigado a ter area() e nome().' },
      { linha: 37, nota: 'Classe abstract: base comum que não pode ser instanciada; implementa a interface.' },
      { linha: 39, nota: 'Método abstrato: sem corpo aqui. Cada subclasse é obrigada a fornecer sua própria area().' },
      { linha: 53, nota: 'Cada classe dá sua própria versão de area(). É isso que torna a chamada polimórfica.' },
    ],
  },
  discussao: [
    'O polimorfismo deixa o código aberto a extensões: para adicionar um Pentagono, basta ' +
      'criar a classe — o main que percorre a lista não muda nada.',
    'Pegadinha comum: ao declarar Forma f, você só enxerga os métodos do contrato (area, ' +
      'nome). Para usar raio() você precisa de instanceof + casting até o tipo real.',
    'Interface define O QUE deve existir; classe abstract pode também fornecer parte do COMO ' +
      '(métodos concretos compartilhados). Aqui nome() é concreto e area() é abstrato.',
    'A vinculação dinâmica acontece em tempo de execução: o compilador não sabe qual area() ' +
      'rodará, mas a JVM olha o objeto real e escolhe a versão correta.',
  ],
  desafio: {
    enunciado:
      'Crie uma interface Animal com o método som(). Implemente duas classes: Cachorro ' +
      '(devolve "Au au") e Gato (devolve "Miau"). No main, percorra um array de Animais e ' +
      'imprima o som() de cada um. A mesma chamada som() deve dar respostas diferentes.',
    arquivoBase: 'examples/cap10/Desafio.java',
    dica:
      'Declare interface Animal { String som(); }. Cada classe usa implements Animal e ' +
      'devolve seu próprio texto. No main, crie Animal[] bicho = { new Cachorro(), new Gato() } ' +
      'e percorra com for chamando a.som().',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Animal[] bichos = { new Cachorro(), new Gato() };\n' +
      '        for (Animal a : bichos) {\n' +
      '            System.out.println(a.som());\n' +
      '        }\n' +
      '    }\n' +
      '}\n\n' +
      'interface Animal {\n' +
      '    String som();\n' +
      '}\n\n' +
      'class Cachorro implements Animal {\n' +
      '    public String som() { return "Au au"; }\n' +
      '}\n\n' +
      'class Gato implements Animal {\n' +
      '    public String som() { return "Miau"; }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que é polimorfismo?',
      opcoes: [
        'Um objeto que muda de tipo durante a execução',
        'Um mesmo comando que se comporta diferente conforme o tipo real do objeto',
        'Uma classe que não pode ter atributos',
        'Um método que só pode ser chamado uma vez',
      ],
      correta: 1,
      explicacao:
        'Polimorfismo é a mesma chamada (ex.: area()) produzindo comportamentos diferentes de ' +
        'acordo com o tipo real do objeto.',
    },
    {
      pergunta: 'Qual a diferença entre uma interface e uma classe abstract?',
      opcoes: [
        'Não há diferença, são sinônimos',
        'A interface só pode ter um método',
        'A interface define apenas o contrato (o quê); a classe abstract pode fornecer também parte do como',
        'A classe abstract pode ser instanciada com new, a interface não',
      ],
      correta: 2,
      explicacao:
        'A interface lista métodos a cumprir. A classe abstract pode ter métodos concretos ' +
        'compartilhados, além dos abstratos. Nenhuma das duas pode ser instanciada diretamente.',
    },
    {
      pergunta: 'Para que servem instanceof e casting?',
      opcoes: [
        'Para criar novos objetos',
        'Para verificar o tipo real de um objeto e então tratá-lo como esse tipo específico',
        'Para deixar um método mais rápido',
        'Para transformar um número em texto',
      ],
      correta: 1,
      explicacao:
        'instanceof testa o tipo real; o casting (Tipo) trata a referência como aquele tipo, ' +
        'liberando seus métodos próprios. Teste com instanceof antes de fazer o casting.',
    },
    {
      pergunta: 'Na chamada f.area(), com f do tipo Forma, quem decide qual versão de area() roda?',
      opcoes: [
        'O compilador, antes de o programa rodar',
        'A JVM em tempo de execução, olhando o objeto real (vinculação dinâmica)',
        'Sempre roda a versão da interface',
        'O programador, escolhendo manualmente',
      ],
      correta: 1,
      explicacao:
        'É a vinculação dinâmica: na execução a JVM verifica o objeto real guardado em f e ' +
        'chama a versão correspondente de area().',
    },
  ],
  xp: 100,
};

export default cap10;
