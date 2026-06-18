import type { Capitulo } from '../src/types.js';

const cap13: Capitulo = {
  id: 13,
  titulo: 'Imagens gráficas e Java 2D',
  conceitoEmFoco: {
    termo: 'Sistema de coordenadas',
    explicacao:
      'A tela do computador é uma grade de pontos (pixels). Cada ponto tem um endereço (x, y). ' +
      'A origem (0, 0) NÃO fica no meio nem embaixo: ela fica no canto SUPERIOR ESQUERDO. ' +
      'O X cresce para a DIREITA e o Y cresce para BAIXO (o contrário do gráfico de matemática). ' +
      'Então (0, 0) é o topo-esquerda e, quanto maior o Y, mais embaixo o ponto está.',
  },
  objetivos: [
    'Entender que a tela é uma grade onde (0,0) é o canto superior esquerdo.',
    'Saber que X cresce para a direita e Y cresce para baixo.',
    'Desenhar formas (retângulo, linha, círculo) endereçando pontos por (x, y).',
    'Relacionar a grade de caracteres com o Canvas/GraphicsContext do JavaFX.',
    'Conhecer as ideias de formas, cores, Paint e gradientes em Java 2D.',
  ],
  teoria: [
    {
      titulo: 'A tela é uma grade',
      paragrafos: [
        'Imagine a tela como uma folha quadriculada. Cada quadradinho é um pixel e tem um ' +
          'endereço formado por dois números: x (a coluna) e y (a linha). Para acender um ponto, ' +
          'você diz em qual (x, y) ele está.',
        'O detalhe que pega todo iniciante: a origem (0, 0) fica no canto SUPERIOR ESQUERDO, e o ' +
          'eixo Y aponta para BAIXO. Ou seja, aumentar o Y desce na tela. Isso é o oposto do ' +
          'gráfico de matemática, onde Y sobe. Por isso (0, 5) está MAIS EMBAIXO que (0, 1).',
        'No exemplo usamos uma matriz char[altura][largura]. Repare que indexamos como ' +
          'pixels[y][x]: a linha (Y) vem primeiro, depois a coluna (X). Trocar a ordem é um erro ' +
          'comuníssimo e costuma "virar" o desenho.',
      ],
    },
    {
      titulo: 'Formas, cores e Paint',
      paragrafos: [
        'Com endereços (x, y) dá para construir formas. Um retângulo preenchido é só "pintar" ' +
          'todos os pontos de um bloco a partir de um canto. Uma linha liga dois pontos. Um ' +
          'círculo marca os pontos que ficam a uma certa distância (o raio) de um centro.',
        'Cada ponto também tem uma cor. No nosso console a "cor" é um caractere (#, *, @); numa ' +
          'tela de verdade a cor é uma combinação de vermelho, verde e azul (RGB). Em Java 2D / ' +
          'JavaFX, o que define como preencher uma forma chama-se Paint: pode ser uma cor sólida ' +
          'ou um gradiente, que é uma transição suave entre duas ou mais cores.',
      ],
    },
    {
      titulo: 'Como seria no JavaFX (Canvas/GraphicsContext)',
      paragrafos: [
        'Numa GUI real, você desenharia num Canvas e pediria o seu "pincel", o GraphicsContext ' +
          '(gc). O mesmo sistema de coordenadas vale: gc.fillRect(2, 1, 10, 4) pinta um retângulo ' +
          'cujo canto superior esquerdo é (2, 1), com 10 de largura e 4 de altura.',
        'Você escolheria a cor antes de desenhar: gc.setFill(Color.RED); e poderia usar um ' +
          'gradiente como Paint, por exemplo new LinearGradient(...). Há também gc.strokeLine(x1, ' +
          'y1, x2, y2) para linhas e gc.fillOval(x, y, larg, alt) para elipses/círculos. Aqui o ' +
          'JavaFX não está disponível, então reproduzimos a MESMA lógica de coordenadas numa ' +
          'grade de caracteres que imprimimos no terminal.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap13/Tela.java',
    descricao:
      'Uma "tela" feita de uma matriz de caracteres. Desenhamos um retângulo, uma linha diagonal ' +
      'e um círculo, mostrando que a origem (0,0) é o topo-esquerda, X cresce para a direita e Y ' +
      'para baixo. A grade é impressa no terminal com réguas de X e Y.',
    anotacoes: [
      { linha: 12, nota: 'Cria a tela: 28 colunas (X) por 12 linhas (Y), tudo "apagado".' },
      { linha: 15, nota: 'Acende o ponto (0,0): o canto SUPERIOR ESQUERDO, a origem do sistema.' },
      { linha: 18, nota: 'Retângulo a partir do canto (2,1). É o equivalente ao fillRect(2,1,10,4) do JavaFX.' },
      { linha: 22, nota: 'Linha de (16,1) até (25,8): X aumenta (vai p/ direita) e Y aumenta (desce).' },
      { linha: 41, nota: 'A matriz é char[altura][largura]: a linha (Y) é a primeira dimensão.' },
      { linha: 52, nota: 'Indexamos pixels[y][x] — Y vem primeiro! Trocar a ordem inverte o desenho.' },
    ],
  },
  discussao: [
    'O erro mais comum é achar que (0,0) é o centro ou que o Y cresce para cima. Na tela, Y cresce ' +
      'para BAIXO e a origem é o canto superior esquerdo.',
    'Cuidado com a ordem dos índices: a matriz é pixels[y][x] (linha, coluna). Escrever [x][y] por ' +
      'engano costuma "girar" ou estourar os limites do desenho.',
    'Sempre verifique se o ponto está dentro da tela antes de pintar (0 <= x < largura e ' +
      '0 <= y < altura). Pintar fora dos limites gera erro de índice.',
    'No JavaFX a lógica é idêntica: gc.fillRect, gc.strokeLine e gc.fillOval usam o mesmo (x, y). ' +
      'Trocamos só o "pincel" (caractere por Color/Paint) — o sistema de coordenadas é o mesmo.',
  ],
  desafio: {
    enunciado:
      'Usando a mesma ideia de grade de caracteres, desenhe apenas a BORDA (as arestas, sem ' +
      'preencher o meio) de um retângulo. Crie uma matriz char[6][12] preenchida com ".", desenhe ' +
      'a borda de um retângulo no canto (1,1) com largura 8 e altura 4 usando "#", e imprima a ' +
      'grade linha por linha. Lembre: pixels[y][x], origem (0,0) no topo-esquerda.',
    arquivoBase: 'examples/cap13/Desafio.java',
    dica:
      'Um ponto está na borda quando é a primeira/última coluna (i == 0 ou i == largura-1) OU a ' +
      'primeira/última linha (j == 0 ou j == altura-1) do retângulo. Pinte só esses; deixe o ' +
      'miolo com ".". Use pixels[1 + j][1 + i] para posicionar no canto (1,1).',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        char[][] pixels = new char[6][12];\n' +
      '        for (int y = 0; y < 6; y++)\n' +
      '            for (int x = 0; x < 12; x++)\n' +
      '                pixels[y][x] = \'.\';\n' +
      '\n' +
      '        int larg = 8, alt = 4;\n' +
      '        for (int j = 0; j < alt; j++) {\n' +
      '            for (int i = 0; i < larg; i++) {\n' +
      '                boolean borda = (i == 0 || i == larg - 1 || j == 0 || j == alt - 1);\n' +
      '                if (borda) pixels[1 + j][1 + i] = \'#\';\n' +
      '            }\n' +
      '        }\n' +
      '\n' +
      '        for (int y = 0; y < 6; y++) {\n' +
      '            for (int x = 0; x < 12; x++) System.out.print(pixels[y][x]);\n' +
      '            System.out.println();\n' +
      '        }\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Onde fica a origem (0, 0) na tela de um computador?',
      opcoes: [
        'No centro da tela',
        'No canto inferior esquerdo',
        'No canto superior esquerdo',
        'No canto superior direito',
      ],
      correta: 2,
      explicacao: 'Na tela, (0,0) é o canto superior esquerdo; X cresce para a direita e Y para baixo.',
    },
    {
      pergunta: 'O que acontece quando o valor de Y aumenta?',
      opcoes: [
        'O ponto sobe na tela',
        'O ponto desce na tela',
        'O ponto vai para a esquerda',
        'Nada muda',
      ],
      correta: 1,
      explicacao: 'Diferente do gráfico de matemática, na tela o eixo Y aponta para baixo: maior Y = mais embaixo.',
    },
    {
      pergunta: 'Numa matriz char[altura][largura] usada como tela, como acessamos o ponto (x, y)?',
      opcoes: [
        'pixels[x][y]',
        'pixels[y][x]',
        'pixels[x + y]',
        'pixels[largura][altura]',
      ],
      correta: 1,
      explicacao: 'A linha (Y) é a primeira dimensão e a coluna (X) a segunda: pixels[y][x].',
    },
    {
      pergunta: 'No JavaFX, gc.fillRect(2, 1, 10, 4) desenha um retângulo com qual canto em (2,1)?',
      opcoes: [
        'O canto inferior direito',
        'O centro do retângulo',
        'O canto superior esquerdo',
        'Nenhum canto; (2,1) é o tamanho',
      ],
      correta: 2,
      explicacao: 'Os dois primeiros números são x,y do canto superior esquerdo; os outros são largura e altura.',
    },
  ],
  xp: 100,
};

export default cap13;
