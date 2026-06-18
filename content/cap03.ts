import type { Capitulo } from '../src/types.js';

const cap03: Capitulo = {
  id: 3,
  titulo: 'Introdução a classes, objetos, métodos e Strings',
  conceitoEmFoco: {
    termo: 'Classe vs. objeto',
    explicacao:
      'A CLASSE é a planta (o molde): ela descreve quais dados (atributos) e quais ações ' +
      '(métodos) algo terá. O OBJETO é a casa construída a partir dessa planta. De uma única ' +
      'classe Conta você pode criar muitos objetos conta (cada um com seu próprio saldo), ' +
      'usando a palavra-chave new.',
  },
  objetivos: [
    'Declarar uma classe com atributos e métodos.',
    'Entender a diferença entre classe (molde) e objeto (instância).',
    'Criar objetos com new e chamar seus métodos.',
    'Usar private/public e métodos get para encapsular dados.',
    'Escrever um construtor para inicializar o objeto.',
  ],
  teoria: [
    {
      titulo: 'Atributos e métodos',
      paragrafos: [
        'Uma classe junta DADOS e COMPORTAMENTO. Os dados são os atributos (variáveis dentro ' +
          'da classe, como saldo). O comportamento são os métodos (como depositar e sacar).',
        'Cada objeto criado a partir da classe tem sua própria cópia dos atributos. Duas contas ' +
          'diferentes têm saldos independentes.',
      ],
    },
    {
      titulo: 'Encapsulamento: private e get/set',
      paragrafos: [
        'Marcar um atributo como private esconde-o do mundo externo: ninguém mexe no saldo ' +
          'diretamente. Para ler ou alterar, passamos por métodos public (como getSaldo, ' +
          'depositar, sacar), que podem validar as regras.',
        'Isso é encapsulamento: a classe protege seus próprios dados e só permite mudanças ' +
          'através de "portas" controladas. Evita estados inválidos, como um saque maior que o saldo.',
      ],
    },
    {
      titulo: 'O construtor e o new',
      paragrafos: [
        'O construtor é um método especial com o mesmo nome da classe, sem tipo de retorno. ' +
          'Ele roda automaticamente quando você escreve new Conta(100.0) e serve para deixar o ' +
          'objeto num estado inicial válido.',
        'new reserva memória para o objeto, executa o construtor e devolve uma referência ' +
          '(um "endereço") que guardamos numa variável para usar o objeto depois.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap03/ContaBancaria.java',
    descricao:
      'Uma classe Conta (molde) e um programa que cria um objeto conta e movimenta o saldo. ' +
      'As duas classes estão no mesmo arquivo para facilitar a leitura.',
    anotacoes: [
      { linha: 8, nota: 'new constrói um OBJETO a partir da classe Conta. "conta" guarda a referência a esse objeto.' },
      { linha: 25, nota: 'Declaração da CLASSE Conta — o molde. Só uma classe public por arquivo, por isso esta vai sem public.' },
      { linha: 26, nota: 'Atributo PRIVADO: cada objeto tem o seu saldo, e ninguém de fora altera diretamente.' },
      { linha: 29, nota: 'CONSTRUTOR: roda no new e define o saldo inicial (validando que seja positivo).' },
      { linha: 36, nota: 'MÉTODO public: a "porta" controlada para depositar. Ele aplica a regra antes de mudar o saldo.' },
      { linha: 52, nota: 'Método GET: a forma segura de LER um atributo privado de fora da classe.' },
    ],
  },
  discussao: [
    'Classe é o molde; objeto é o que sai do molde. Você escreve a classe uma vez e cria ' +
      'quantos objetos quiser.',
    'private protege os dados. Se saldo fosse public, qualquer parte do programa poderia ' +
      'colocar um valor negativo ali, furando as regras.',
    'O construtor não tem tipo de retorno (nem void) e precisa ter o mesmo nome da classe.',
    'Variáveis de objeto guardam uma REFERÊNCIA, não o objeto em si. Por isso duas variáveis ' +
      'podem apontar para o mesmo objeto.',
  ],
  desafio: {
    enunciado:
      'Crie uma classe Personagem com um atributo privado vida (int) e os métodos ' +
      'receberDano(int dano) e curar(int pontos). No main, crie um objeto, cause dano, cure e ' +
      'imprima a vida em cada passo.',
    arquivoBase: 'examples/cap03/Desafio.java',
    dica: 'Siga o molde da classe Conta: atributo private + métodos public que alteram o atributo.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Personagem heroi = new Personagem(100);\n' +
      '        heroi.receberDano(30);\n' +
      '        System.out.println("Vida apos dano: " + heroi.getVida());\n' +
      '        heroi.curar(10);\n' +
      '        System.out.println("Vida apos cura: " + heroi.getVida());\n' +
      '    }\n' +
      '}\n\n' +
      'class Personagem {\n' +
      '    private int vida;\n' +
      '    public Personagem(int vida) { this.vida = vida; }\n' +
      '    public void receberDano(int dano) { vida -= dano; }\n' +
      '    public void curar(int pontos) { vida += pontos; }\n' +
      '    public int getVida() { return vida; }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Qual a relação entre classe e objeto?',
      opcoes: [
        'São a mesma coisa',
        'A classe é o molde; o objeto é criado a partir dela',
        'O objeto é o molde; a classe é criada a partir dele',
        'Classe é para números e objeto para texto',
      ],
      correta: 1,
      explicacao: 'A classe descreve a estrutura (molde); cada objeto é uma instância concreta criada com new.',
    },
    {
      pergunta: 'Por que marcamos o atributo saldo como private?',
      opcoes: [
        'Para deixar o código mais rápido',
        'Para que só a própria classe controle como ele muda (encapsulamento)',
        'Porque private ocupa menos memória',
        'É obrigatório em Java',
      ],
      correta: 1,
      explicacao: 'private esconde o dado e força o acesso por métodos que aplicam as regras de negócio.',
    },
    {
      pergunta: 'O que o construtor faz?',
      opcoes: [
        'Destrói o objeto',
        'Roda no new e inicializa o estado do objeto',
        'É chamado toda vez que um método executa',
        'Converte a classe em texto',
      ],
      correta: 1,
      explicacao: 'O construtor executa quando o objeto é criado (new) e o deixa num estado inicial válido.',
    },
  ],
  xp: 100,
};

export default cap03;
