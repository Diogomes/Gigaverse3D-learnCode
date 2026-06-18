import type { Capitulo } from '../src/types.js';

const cap15: Capitulo = {
  id: 15,
  titulo: 'Arquivos, fluxos e serialização de objetos',
  conceitoEmFoco: {
    termo: 'Persistência',
    explicacao:
      'A memória (RAM) é como um quadro-branco: tudo o que o programa guarda nela some quando ' +
      'ele termina. Persistência é gravar dados em um lugar permanente — o disco — para que eles ' +
      'sobrevivam ao fim do programa. É a diferença entre anotar algo num papel (fica) e só ' +
      'lembrar de cabeça (esquece ao dormir). Num jogo, é o "save": você fecha e, ao voltar, o ' +
      'progresso ainda está lá.',
  },
  objetivos: [
    'Entender por que dados na memória somem e o disco os preserva.',
    'Usar Path e Files (NIO) para apontar e manipular arquivos.',
    'Escrever texto em um arquivo com Files.writeString.',
    'Ler texto de volta com Files.readAllLines.',
    'Serializar um objeto: transformá-lo em texto para salvar e reconstruí-lo ao carregar.',
  ],
  teoria: [
    {
      titulo: 'Por que precisamos de arquivos',
      paragrafos: [
        'Tudo o que um programa cria — variáveis, objetos, listas — vive na memória RAM. A RAM é ' +
          'rápida, mas volátil: ao fechar o programa (ou desligar o computador), ela é limpa e os ' +
          'dados desaparecem. Se você quer que algo continue existindo depois, precisa gravá-lo ' +
          'em um meio permanente, como o disco (HD, SSD).',
        'Gravar dados no disco é o que chamamos de persistência. O formato mais simples de fazer ' +
          'isso é um arquivo de texto: uma sequência de caracteres salva com um nome, que você ' +
          'pode reabrir mais tarde para ler de volta exatamente o que escreveu.',
      ],
    },
    {
      titulo: 'NIO: Path e Files',
      paragrafos: [
        'O Java moderno usa o pacote NIO (java.nio.file). Um Path é apenas o "endereço" de um ' +
          'arquivo — onde ele fica e como se chama. Path.of("save.txt") aponta para um arquivo ' +
          'chamado save.txt no diretório atual (a pasta onde o programa está rodando).',
        'A classe Files reúne ações prontas sobre esses arquivos. Files.writeString(path, texto) ' +
          'cria o arquivo (ou sobrescreve) e grava o texto. Files.readAllLines(path) abre o ' +
          'arquivo e devolve uma lista com as linhas. Por baixo, esses métodos abrem e fecham um ' +
          'fluxo (stream) de bytes/caracteres entre o programa e o disco — mas o Files cuida ' +
          'desse trabalho chato para você.',
      ],
    },
    {
      titulo: 'Serializar: do objeto para o texto e de volta',
      paragrafos: [
        'Um arquivo de texto só guarda caracteres, não objetos. Então, para salvar um objeto, ' +
          'precisamos transformá-lo em texto — isso se chama serializar. No exemplo, um ' +
          'Personagem vira a linha "Kael;7;1540". Ao carregar, fazemos o caminho inverso ' +
          '(desserializar): lemos a linha, separamos pelos ";" e reconstruímos o objeto.',
        'O Java também tem uma serialização automática de objetos (Serializable + ' +
          'ObjectOutputStream), que grava o objeto inteiro em bytes. Mas escrever texto simples, ' +
          'como aqui, é mais fácil de entender, de ler com os olhos e de editar à mão.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap15/SaveGame.java',
    descricao:
      'Um "save game": cria um Personagem (nome, nível, xp), salva o progresso em save.txt com ' +
      'NIO, "esquece" o objeto e o recarrega do disco — provando que os dados sobreviveram.',
    anotacoes: [
      { linha: 13, nota: 'Path: o endereço do arquivo. Nome relativo simples = fica no diretório atual.' },
      { linha: 20, nota: 'Serializar: o objeto vira uma linha de texto (ex.: "Kael;7;1540") para caber no arquivo.' },
      { linha: 21, nota: 'Files.writeString grava o texto no disco. Aqui acontece a persistência de fato.' },
      { linha: 25, nota: 'Soltamos a referência do objeto: é como se o programa tivesse fechado e esquecido tudo.' },
      { linha: 28, nota: 'Files.readAllLines lê de volta as linhas do disco. Os dados estavam lá, salvos.' },
      { linha: 29, nota: 'Desserializar: a linha de texto vira de novo um objeto Personagem completo.' },
    ],
  },
  discussao: [
    'A persistência funciona porque o disco não é limpo ao fechar o programa, ao contrário da ' +
      'memória RAM. Escrever no disco é mais lento, mas é o preço de durar.',
    'Path só descreve o caminho; ele não cria nem abre nada sozinho. Quem age é a classe Files ' +
      '(writeString, readAllLines, etc.).',
    'Pegadinha comum: writeString sobrescreve o arquivo inteiro por padrão. Se você quiser ' +
      'ADICIONAR ao final em vez de apagar, precisa pedir explicitamente (StandardOpenOption.APPEND).',
    'Operações com arquivo podem falhar (disco cheio, sem permissão), então os métodos lançam ' +
      'IOException — por isso o main a declara com "throws IOException".',
  ],
  desafio: {
    enunciado:
      'Salve uma lista de pontuações (placar) em um arquivo "placar.txt", uma por linha, e ' +
      'depois leia tudo de volta para somar os pontos. Os valores são 100, 150 e 100; a soma ' +
      'impressa deve dar 350.',
    arquivoBase: 'examples/cap15/Desafio.java',
    dica:
      'Use Files.write(arquivo, pontos) para gravar a lista (cada item vira uma linha). Depois ' +
      'Files.readAllLines(arquivo) devolve as linhas; percorra somando Integer.parseInt(linha).',
    solucao:
      'import java.io.IOException;\n' +
      'import java.nio.file.Files;\n' +
      'import java.nio.file.Path;\n' +
      'import java.util.List;\n\n' +
      'public class Desafio {\n' +
      '    public static void main(String[] args) throws IOException {\n' +
      '        Path arquivo = Path.of("placar.txt");\n' +
      '        List<String> pontos = List.of("100", "150", "100");\n\n' +
      '        Files.write(arquivo, pontos);\n\n' +
      '        List<String> lidas = Files.readAllLines(arquivo);\n' +
      '        int soma = 0;\n' +
      '        for (String linha : lidas) {\n' +
      '            soma += Integer.parseInt(linha);\n' +
      '        }\n' +
      '        System.out.println("Soma: " + soma);\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'Por que dados guardados apenas na memória (RAM) somem quando o programa termina?',
      opcoes: [
        'Porque a RAM é volátil: é limpa ao encerrar; o disco é permanente',
        'Porque o Java apaga tudo de propósito',
        'Porque a RAM é mais lenta que o disco',
        'Porque arquivos não cabem na memória',
      ],
      correta: 0,
      explicacao:
        'A RAM perde seu conteúdo ao fechar o programa/desligar. Para persistir, gravamos no ' +
        'disco, que mantém os dados.',
    },
    {
      pergunta: 'No NIO, qual é o papel de um Path?',
      opcoes: [
        'Ler o conteúdo do arquivo',
        'Representar o endereço (caminho/nome) de um arquivo, sem abri-lo',
        'Apagar o arquivo automaticamente',
        'Converter objetos em texto',
      ],
      correta: 1,
      explicacao:
        'Path só descreve onde fica e como se chama o arquivo. As ações (ler, escrever) são ' +
        'feitas pela classe Files.',
    },
    {
      pergunta: 'O que significa "serializar" um objeto para salvá-lo em um arquivo de texto?',
      opcoes: [
        'Apagar seus atributos',
        'Transformá-lo em uma sequência de texto que pode ser gravada e depois reconstruída',
        'Copiá-lo para outra variável',
        'Torná-lo final',
      ],
      correta: 1,
      explicacao:
        'Serializar é converter o objeto em texto (ex.: "Kael;7;1540") para caber no arquivo; ' +
        'desserializar é o caminho de volta.',
    },
    {
      pergunta: 'Por padrão, o que Files.writeString faz se o arquivo já existir?',
      opcoes: [
        'Lança um erro e não escreve',
        'Adiciona o novo texto ao final',
        'Sobrescreve todo o conteúdo anterior',
        'Cria um arquivo com outro nome',
      ],
      correta: 2,
      explicacao:
        'Por padrão ele sobrescreve. Para adicionar ao final, é preciso usar ' +
        'StandardOpenOption.APPEND.',
    },
  ],
  xp: 100,
};

export default cap15;
