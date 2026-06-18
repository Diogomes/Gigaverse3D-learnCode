import type { Capitulo } from '../src/types.js';

const cap09: Capitulo = {
  id: 9,
  titulo: 'POO: herança',
  conceitoEmFoco: {
    termo: 'Herança',
    explicacao:
      'Herança é quando uma classe (a filha) "é um tipo de" outra classe (a pai) e reaproveita ' +
      'os atributos e métodos dela. Pense numa palavra "Guerreiro é um Personagem": tudo que todo ' +
      'Personagem tem (nome, vida), o Guerreiro já ganha de graça, sem reescrever. Em Java usamos ' +
      'a palavra extends para dizer que uma classe estende (herda de) outra.',
  },
  objetivos: [
    'Entender a relação "é um tipo de" entre subclasse e superclasse.',
    'Usar extends para uma classe herdar atributos e métodos de outra.',
    'Chamar o construtor da superclasse com super(...).',
    'Sobrescrever um método herdado com @Override.',
    'Usar protected para expor atributos da pai às filhas.',
  ],
  teoria: [
    {
      titulo: 'Superclasse e subclasse',
      paragrafos: [
        'A superclasse (ou classe pai) reúne o que é comum. No exemplo, Personagem guarda nome e ' +
          'vida, que todo personagem tem. As subclasses (filhas) Guerreiro e Mago dizem "extends ' +
          'Personagem": cada uma já nasce com nome e vida, sem precisar declará-los de novo.',
        'A ideia central é "é um tipo de": Guerreiro é um Personagem, Mago é um Personagem. Quando ' +
          'essa frase faz sentido, a herança costuma ser uma boa escolha. Ela evita repetir código ' +
          'comum em várias classes.',
      ],
    },
    {
      titulo: 'super e protected',
      paragrafos: [
        'A subclasse não inicializa sozinha a parte herdada: ela chama super(...) para que o ' +
          'construtor da superclasse cuide disso. super(nome, vida) é a primeira coisa no ' +
          'construtor da filha e equivale a "monte primeiro a parte de Personagem".',
        'protected é um nível de acesso entre private e public: o atributo fica escondido do mundo ' +
          'externo, mas visível para as subclasses. Por isso Guerreiro e Mago conseguem usar nome ' +
          'diretamente, embora ele seja declarado na superclasse.',
      ],
    },
    {
      titulo: 'Sobrescrita com @Override',
      paragrafos: [
        'Sobrescrever (override) é dar uma nova versão, na filha, de um método que já existe na ' +
          'pai. Personagem tem atacar() genérico; Guerreiro e Mago redefinem atacar() com o golpe ' +
          'de cada um. Ao chamar conan.atacar(), roda a versão do Guerreiro.',
        'A anotação @Override não é obrigatória, mas é recomendada: ela avisa ao compilador "estou ' +
          'sobrescrevendo um método da pai". Se você errar o nome ou a assinatura, o compilador ' +
          'reclama, evitando bugs silenciosos.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap09/Heroi.java',
    descricao:
      'Uma classe base Personagem (nome e vida) com duas subclasses, Guerreiro e Mago. Cada uma ' +
      'usa super no construtor e sobrescreve atacar() com um golpe próprio; o Mago ainda tem uma ' +
      'habilidade exclusiva.',
    anotacoes: [
      { linha: 25, nota: 'Superclasse Personagem: reúne o que é comum a todo personagem.' },
      { linha: 26, nota: 'protected: o atributo fica visível para as subclasses (Guerreiro e Mago), mas escondido do mundo externo.' },
      { linha: 45, nota: 'extends Personagem: Guerreiro "é um tipo de" Personagem e herda nome, vida e os métodos.' },
      { linha: 47, nota: 'super(nome, vida) chama o construtor da superclasse para montar a parte herdada.' },
      { linha: 50, nota: '@Override: avisa que atacar() está sendo SOBRESCRITO. A versão da filha substitui a da pai.' },
      { linha: 73, nota: 'Habilidade exclusiva do Mago: subclasses podem ter métodos próprios além dos herdados.' },
    ],
  },
  discussao: [
    'Herança expressa "é um tipo de". Se a frase "X é um Y" soa estranha, talvez herança não seja ' +
      'o ideal — às vezes é melhor um atributo (composição) do que estender uma classe.',
    'super(...) deve ser a primeira instrução do construtor da filha. Se você não chamar, o Java ' +
      'tenta chamar o construtor sem argumentos da pai — e dá erro se ele não existir.',
    'Sobrescrita (override) é diferente de sobrecarga (overload): override redefine o MESMO método ' +
      'na filha; overload cria métodos de mesmo nome com parâmetros diferentes na mesma classe.',
    'Use @Override sempre que sobrescrever: ele transforma um erro de digitação em erro de ' +
      'compilação, em vez de um método novo criado por engano.',
  ],
  desafio: {
    enunciado:
      'A superclasse Animal já está pronta no arquivo. Crie uma subclasse Cachorro que estende ' +
      'Animal (extends), use super(nome) no construtor e sobrescreva emitirSom() com @Override ' +
      'para imprimir o nome seguido de "Au au!". No main, crie um Cachorro chamado "Rex" e chame ' +
      'emitirSom().',
    arquivoBase: 'examples/cap09/Desafio.java',
    dica: 'Declare "class Cachorro extends Animal". No construtor, chame super(nome). No método ' +
      'sobrescrito, use o atributo nome (herdado, protected) na impressão.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Cachorro rex = new Cachorro("Rex");\n' +
      '        rex.emitirSom();\n' +
      '    }\n' +
      '}\n\n' +
      'class Animal {\n' +
      '    protected String nome;\n' +
      '    public Animal(String nome) {\n' +
      '        this.nome = nome;\n' +
      '    }\n' +
      '    public void emitirSom() {\n' +
      '        System.out.println(nome + " faz um som generico.");\n' +
      '    }\n' +
      '}\n\n' +
      'class Cachorro extends Animal {\n' +
      '    public Cachorro(String nome) {\n' +
      '        super(nome);\n' +
      '    }\n' +
      '    @Override\n' +
      '    public void emitirSom() {\n' +
      '        System.out.println(nome + " faz: Au au!");\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que a palavra-chave extends indica em Java?',
      opcoes: [
        'Que a classe é abstrata',
        'Que a classe herda atributos e métodos de outra (é um tipo dela)',
        'Que a classe não pode ter objetos',
        'Que o método é estático',
      ],
      correta: 1,
      explicacao: 'extends estabelece a herança: a subclasse "é um tipo de" superclasse e reaproveita seus membros.',
    },
    {
      pergunta: 'Para que serve super(...) no construtor de uma subclasse?',
      opcoes: [
        'Encerrar o programa',
        'Criar um novo objeto da subclasse',
        'Chamar o construtor da superclasse para inicializar a parte herdada',
        'Tornar o atributo público',
      ],
      correta: 2,
      explicacao: 'super(...) invoca o construtor da classe pai, montando primeiro a parte herdada do objeto.',
    },
    {
      pergunta: 'O que significa sobrescrever (override) um método?',
      opcoes: [
        'Criar outro método com nome diferente',
        'Dar uma nova versão, na subclasse, de um método que já existe na superclasse',
        'Apagar o método da superclasse',
        'Chamar o método duas vezes',
      ],
      correta: 1,
      explicacao: 'Override redefine na filha um método herdado; ao chamá-lo no objeto da filha, roda a versão dela.',
    },
    {
      pergunta: 'Qual é o efeito do modificador protected em um atributo?',
      opcoes: [
        'Ele fica visível para as subclasses, mas escondido do código externo',
        'Ele só pode ser lido, nunca alterado',
        'Ele vira uma constante',
        'Ele pertence à classe, não ao objeto',
      ],
      correta: 0,
      explicacao: 'protected é um meio-termo entre private e public: as subclasses enxergam o atributo, o mundo externo não.',
    },
  ],
  xp: 100,
};

export default cap09;
