import type { Capitulo } from '../src/types.js';

const cap04: Capitulo = {
  id: 4,
  titulo: 'Estudo de caso: interface (turtle)',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Design de interface (encapsular e generalizar)',
    explicacao:
      'Projetar uma função é decidir COMO ela será usada: que nome tem, que parâmetros recebe e o ' +
      'que devolve — isso é a sua INTERFACE. Constrói-se em etapas: primeiro ENCAPSULAR (dar nome a ' +
      'um bloco repetido), depois GENERALIZAR (trocar valores fixos por parâmetros) e, por fim, ' +
      'REFATORAR (reaproveitar e limpar). O livro usa o módulo turtle para desenhar; como o terminal ' +
      'não tem janela gráfica, desenhamos com texto (ASCII) — os conceitos de projeto são idênticos.',
  },
  objetivos: [
    'Encapsular um trecho repetido dentro de uma função com nome claro.',
    'Generalizar uma função específica adicionando parâmetros.',
    'Usar um parâmetro opcional (com valor padrão) para desenhar uma boa interface.',
    'Documentar uma função com docstring (o texto entre aspas triplas logo abaixo do def).',
    'Refatorar reaproveitando uma função dentro de outra, em vez de duplicar código.',
  ],
  teoria: [
    {
      titulo: 'Por que o terminal e não a turtle',
      paragrafos: [
        'No livro, este capítulo desenha quadrados e polígonos com o módulo turtle, que abre uma janela ' +
          'e move uma "tartaruga" pela tela. Essa janela depende de ambiente gráfico (tkinter), que não ' +
          'existe num terminal puro — então o exemplo executável aqui desenha com TEXTO (ASCII).',
        'A lição do capítulo, porém, não é sobre desenhar: é sobre PROJETAR FUNÇÕES. Encapsular, ' +
          'generalizar e refatorar valem para qualquer código — gráfico ou não. Tudo o que você ' +
          'aprender aqui se aplica igualzinho quando for usar a turtle de verdade no seu computador.',
      ],
    },
    {
      titulo: 'Encapsular e generalizar',
      paragrafos: [
        'ENCAPSULAR é pegar um trecho que você repetiria e guardá-lo numa função com nome. Em vez de ' +
          'copiar o mesmo laço várias vezes, você o nomeia uma vez (ex.: linha(...)) e o chama quando precisar.',
        'GENERALIZAR é trocar valores fixos por PARÂMETROS. Uma função que só desenha um quadrado 4x4 é ' +
          'limitada; ao receber altura e largura, ela passa a desenhar qualquer retângulo. Parâmetros ' +
          'transformam um caso único em uma família inteira de casos.',
      ],
    },
    {
      titulo: 'Interface, valores padrão e docstrings',
      paragrafos: [
        'A INTERFACE de uma função é o "contrato" de uso: o nome, os parâmetros e o retorno. Um parâmetro ' +
          'opcional, com valor padrão (como caractere="*"), deixa a função simples no caso comum e flexível ' +
          'quando preciso — quem chama só informa o que quer mudar.',
        'A DOCSTRING é um texto entre """aspas triplas""" logo abaixo do def. Ela explica o que a função faz ' +
          'em uma ou duas frases. Boas docstrings descrevem a interface (o que entra, o que sai), não cada ' +
          'linha do corpo. Refatorar é o passo final: ao notar repetição, extraia uma função e reaproveite-a.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap04/interface.py',
    descricao:
      'Desenha retângulos e uma moldura em ASCII, mostrando a progressão de projeto: encapsular ' +
      '(linha), generalizar (desenhar_retangulo com parâmetros) e refatorar/compor (desenhar_moldura).',
    anotacoes: [
      {
        linha: 9,
        nota:
          'ENCAPSULAR: linha(largura, caractere) dá nome a um pedacinho reutilizável — montar uma faixa ' +
          'de caracteres. Em vez de repetir caractere * largura por todo lado, chamamos linha(...).',
      },
      {
        linha: 10,
        nota:
          'A DOCSTRING (entre aspas triplas, logo abaixo do def) descreve o que a função faz. É a ' +
          'documentação da interface, não um comentário do corpo.',
      },
      {
        linha: 16,
        nota:
          'GENERALIZAR: altura e largura são parâmetros, então a mesma função desenha qualquer retângulo. ' +
          'caractere="*" é opcional — faz parte da INTERFACE: quem chama escolhe o símbolo ou usa o padrão.',
      },
      {
        linha: 23,
        nota:
          'O corpo reaproveita linha(...): cada volta do laço imprime uma faixa. Reutilizar em vez de ' +
          'reescrever é o coração do design de interface.',
      },
      {
        linha: 28,
        nota:
          'REFATORAR/COMPOR: desenhar_moldura também usa linha(...). Uma função apoiada na outra — você ' +
          'constrói desenhos maiores a partir de peças pequenas e bem nomeadas.',
      },
      {
        linha: 38,
        nota:
          'Só aqui o programa EXECUTA: chamamos desenhar_retangulo(3, 3) usando o padrão "*". Definir as ' +
          'funções acima não desenhou nada — chamar é que faz acontecer.',
      },
    ],
  },
  discussao: [
    'Encapsular vem primeiro: quando você se pega copiando o mesmo trecho, é sinal de que ali cabe uma ' +
      'função. Dar um nome ao bloco já deixa o programa mais legível, antes mesmo de generalizar.',
    'Generalizar é poderoso, mas com moderação: adicione parâmetros que realmente variam. Encher uma ' +
      'função de opções que ninguém usa só complica a interface — o equilíbrio é o bom design.',
    'Um valor padrão (caractere="*") torna a função fácil no caso comum e flexível quando necessário. ' +
      'Parâmetros opcionais devem vir DEPOIS dos obrigatórios na definição.',
    'A docstring documenta a INTERFACE: o que a função recebe e o que devolve/faz. Você a lê depois com ' +
      'help(funcao). Não precisa narrar cada linha — descreva o contrato, não a implementação.',
    'turtle de verdade: no seu computador, com tkinter instalado, os mesmos princípios valem. Você teria ' +
      'funções como quadrado(t, tamanho) e polígono(t, n, tamanho), encapsulando e generalizando os desenhos.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap04/desafio.py. (1) Complete desenhar_quadrado(lado) reaproveitando ' +
      'desenhar_retangulo (um quadrado é um retângulo com altura = largura). (2) Crie triangulo(altura) ' +
      'que imprime 1, 2, ... até "altura" estrelas por linha. (3) Chame desenhar_quadrado(4) e triangulo(4).',
    arquivoBase: 'examples/cap04/desafio.py',
    dica:
      'Em desenhar_quadrado, troque o pass por desenhar_retangulo(lado, lado). Para o triângulo, use um ' +
      'laço: for i in range(1, altura + 1): print(linha(i, "*")). No fim, chame as duas funções.',
    solucao:
      'def desenhar_quadrado(lado):\n' +
      '    desenhar_retangulo(lado, lado)\n' +
      '\n' +
      'def triangulo(altura):\n' +
      '    for i in range(1, altura + 1):\n' +
      '        print(linha(i, "*"))\n' +
      '\n' +
      'desenhar_quadrado(4)\n' +
      'triangulo(4)',
  },
  quiz: [
    {
      pergunta: 'O que significa ENCAPSULAR um trecho de código?',
      opcoes: [
        'Apagar o código repetido',
        'Dar a ele um nome dentro de uma função, para reutilizá-lo',
        'Transformá-lo em comentário',
        'Movê-lo para outro arquivo',
      ],
      correta: 1,
      explicacao:
        'Encapsular é guardar um bloco numa função com nome, para chamá-lo quando precisar em vez de ' +
        'repetir o trecho.',
    },
    {
      pergunta: 'Como você GENERALIZA uma função que só desenha um quadrado 4x4?',
      opcoes: [
        'Copiando-a várias vezes',
        'Adicionando parâmetros (como altura e largura) para ela atender vários casos',
        'Removendo o return',
        'Importando o módulo turtle',
      ],
      correta: 1,
      explicacao:
        'Generalizar é trocar valores fixos por parâmetros: com altura e largura, a mesma função ' +
        'desenha qualquer retângulo.',
    },
    {
      pergunta: 'Para que serve o parâmetro opcional caractere="*" em desenhar_retangulo?',
      opcoes: [
        'É obrigatório informar sempre',
        'Permite escolher o símbolo, mas usa "*" como padrão se nada for passado',
        'Define a cor da janela',
        'Faz a função não desenhar nada',
      ],
      correta: 1,
      explicacao:
        'Um valor padrão deixa a função simples no caso comum (usa "*") e flexível quando se quer outro ' +
        'símbolo. Isso é projetar uma boa interface.',
    },
    {
      pergunta: 'O que é a docstring de uma função?',
      opcoes: [
        'Um comentário com #',
        'O texto entre aspas triplas logo abaixo do def, que descreve a função',
        'O nome da função',
        'A lista de parâmetros',
      ],
      correta: 1,
      explicacao:
        'A docstring (entre """...""") documenta o que a função faz e como usá-la; você a vê com ' +
        'help(funcao).',
    },
  ],
  xp: 100,
};

export default cap04;
