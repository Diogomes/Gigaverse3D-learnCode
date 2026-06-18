import type { Capitulo } from '../src/types.js';

const cap14: Capitulo = {
  id: 14,
  titulo: 'Arquivos',
  paradigma: 'procedural',
  conceitoEmFoco: {
    termo: 'Persistência',
    explicacao:
      'Tudo o que um programa guarda em variáveis vive na memória e some quando ele termina. ' +
      'PERSISTIR é gravar esses dados num ARQUIVO, no disco, para que sobrevivam ao fim do ' +
      'programa e possam ser lidos de volta numa próxima execução. É assim que um jogo lembra ' +
      'do seu progresso, um editor recupera o texto e um programa carrega suas configurações: ' +
      'os dados foram escritos em arquivo e depois relidos.',
  },
  objetivos: [
    'Abrir arquivos com open(), escolhendo o modo certo: "r" (ler), "w" (gravar), "a" (acrescentar).',
    'Gravar e ler dados, usando JSON para guardar estruturas como dicionários.',
    'Usar o bloco with para que o arquivo seja FECHADO automaticamente, mesmo se ocorrer um erro.',
    'Montar caminhos de arquivo de forma segura com os.path (e conhecer a alternativa pathlib).',
    'Capturar exceções com try/except, tratando casos como FileNotFoundError sem o programa quebrar.',
  ],
  teoria: [
    {
      titulo: 'Abrir, ler e gravar com with',
      paragrafos: [
        'A função open(caminho, modo) abre um arquivo e devolve um objeto que representa esse ' +
          'arquivo. O modo diz a intenção: "r" abre só para LER, "w" abre para GRAVAR (criando o ' +
          'arquivo ou apagando o conteúdo que já existia) e "a" abre para ACRESCENTAR no final, ' +
          'sem apagar o que já estava lá.',
        'Todo arquivo aberto precisa ser FECHADO para que os dados sejam realmente salvos e o ' +
          'sistema libere o recurso. Em vez de lembrar de chamar .close() na mão, usamos o bloco ' +
          'with open(...) as f: — ao sair do bloco, o Python fecha o arquivo sozinho, mesmo que ' +
          'aconteça um erro no meio. É o jeito recomendado e o que você verá na demo.',
      ],
    },
    {
      titulo: 'Guardar estruturas com JSON',
      paragrafos: [
        'Um arquivo guarda TEXTO (ou bytes). Mas e quando o dado é um dicionário, como o progresso ' +
          'de um jogo? O módulo json resolve isso: json.dump(dado, arquivo) SERIALIZA o dicionário ' +
          'em texto e grava; json.load(arquivo) faz o caminho inverso, lendo o texto e devolvendo o ' +
          'dicionário de volta. Assim você guarda e recupera estruturas inteiras sem trabalho manual.',
        'Para montar o CAMINHO do arquivo, evite colar pedaços com "/" na mão (cada sistema usa um ' +
          'separador). Use os.path.join("pasta", "arquivo.json"), que monta o caminho do jeito certo ' +
          'em qualquer sistema. O módulo pathlib oferece uma alternativa mais moderna, orientada a ' +
          'objetos, para a mesma tarefa.',
      ],
    },
    {
      titulo: 'Quando o arquivo não está lá: try/except',
      paragrafos: [
        'Tentar abrir um arquivo que não existe (no modo "r") lança a exceção FileNotFoundError, e ' +
          'sem tratamento o programa quebra na hora. Para lidar com isso colocamos a operação dentro ' +
          'de um bloco try: e, logo abaixo, except FileNotFoundError: com o plano B — por exemplo, ' +
          'avisar o jogador e começar um jogo novo.',
        'Esse padrão deixa o programa ROBUSTO: em vez de estourar com uma mensagem técnica, ele ' +
          'segue com uma resposta amigável. Capture sempre a exceção mais específica que você espera ' +
          '(FileNotFoundError), e não um except genérico que esconderia outros erros.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap14/arquivos.py',
    descricao:
      'Um "save game": grava um dicionário de progresso como JSON num arquivo temporário, lê de ' +
      'volta e o exibe, e demonstra try/except ao tentar abrir um arquivo inexistente. Ao final ' +
      'apaga o arquivo criado, para rodar sempre igual.',
    anotacoes: [
      {
        linha: 9,
        nota:
          'os.path.join monta o caminho de forma segura, e tempfile.gettempdir() aponta para a ' +
          'pasta de temporários do sistema — assim a demo não deixa lixo na pasta do projeto.',
      },
      {
        linha: 16,
        nota:
          'with open(...) abre o arquivo e o fecha sozinho ao fim do bloco. O modo "w" cria o ' +
          'arquivo (ou apaga o conteúdo antigo) e grava do zero.',
      },
      {
        linha: 17,
        nota:
          'json.dump(progresso, f) serializa o dicionário em texto JSON e grava no arquivo. É o ' +
          'que torna possível guardar uma estrutura inteira, não só uma frase solta.',
      },
      {
        linha: 22,
        nota:
          'json.load(f) faz o caminho inverso: lê o texto JSON do arquivo e o reconstrói como um ' +
          'dicionário Python, pronto para uso.',
      },
      {
        linha: 31,
        nota:
          'except FileNotFoundError captura o erro de abrir um arquivo que não existe. Em vez de ' +
          'quebrar, o programa mostra uma mensagem amigável e segue em frente.',
      },
    ],
  },
  discussao: [
    'Esquecer de fechar o arquivo pode deixar dados sem gravar e segurar o recurso à toa. Use ' +
      'sempre o bloco with: ele fecha o arquivo automaticamente, até quando ocorre um erro no meio.',
    'Cuidado com o modo "w": ele APAGA todo o conteúdo anterior antes de gravar. Se a intenção é ' +
      'somar ao que já existe (como um log), use "a" (append), que acrescenta no final.',
    'Abrir um arquivo inexistente em modo leitura lança FileNotFoundError. Não ignore: ou garanta ' +
      'que o arquivo existe, ou trate com try/except para o programa não quebrar.',
    'Caminho RELATIVO (ex.: "save.json") depende de ONDE você roda o programa, e pode "sumir". ' +
      'Para algo previsível, monte o caminho com os.path.join a partir de uma pasta conhecida.',
  ],
  desafio: {
    enunciado:
      'Abra examples/cap14/desafio.py. Ele já define uma mensagem e um caminho temporário. ' +
      'Complete os TODOs: grave a mensagem num arquivo (modo "w", com with), leia de volta e ' +
      'imprima o conteúdo, e por fim apague o arquivo com os.remove. Rode e confira a saída.',
    arquivoBase: 'examples/cap14/desafio.py',
    dica:
      'Para gravar texto puro use f.write(mensagem) dentro de um with open(caminho, "w"). Para ' +
      'ler, abra com "r" e use conteudo = f.read(); depois print(conteudo).',
    solucao:
      'with open(caminho, "w", encoding="utf-8") as f:\n' +
      '    f.write(mensagem)\n' +
      'with open(caminho, "r", encoding="utf-8") as f:\n' +
      '    conteudo = f.read()\n' +
      'print("Li do arquivo:", conteudo)\n' +
      'os.remove(caminho)',
  },
  quiz: [
    {
      pergunta: 'Qual a principal vantagem de usar o bloco with open(...) as f:?',
      opcoes: [
        'Deixa o arquivo mais rápido de ler',
        'Fecha o arquivo automaticamente ao sair do bloco, mesmo se houver erro',
        'Converte o conteúdo em JSON sozinho',
        'Cria a pasta caso ela não exista',
      ],
      correta: 1,
      explicacao:
        'O with garante que o arquivo seja fechado ao fim do bloco, inclusive quando ocorre uma ' +
        'exceção — você não precisa chamar .close() na mão.',
    },
    {
      pergunta: 'Você abre um arquivo que já tem conteúdo no modo "w" e grava algo. O que acontece?',
      opcoes: [
        'O novo texto é acrescentado no final',
        'O conteúdo antigo é apagado e substituído pelo novo',
        'O Python lança um erro porque o arquivo já existe',
        'Nada muda; "w" só serve para ler',
      ],
      correta: 1,
      explicacao:
        'O modo "w" apaga o conteúdo existente e grava do zero. Para acrescentar sem apagar, ' +
        'use o modo "a" (append).',
    },
    {
      pergunta: 'Qual exceção é lançada ao tentar abrir, em modo leitura, um arquivo que não existe?',
      opcoes: ['ValueError', 'FileNotFoundError', 'KeyError', 'TypeError'],
      correta: 1,
      explicacao:
        'Abrir um arquivo inexistente com "r" lança FileNotFoundError. Trate-a com try/except ' +
        'para o programa reagir sem quebrar.',
    },
    {
      pergunta: 'Para gravar um dicionário Python dentro de um arquivo como texto, você usa:',
      opcoes: [
        'json.dump(dicionario, arquivo)',
        'print(dicionario)',
        'open(dicionario)',
        'os.path.join(dicionario)',
      ],
      correta: 0,
      explicacao:
        'json.dump serializa o dicionário em texto JSON e o grava no arquivo. Para reler, usa-se ' +
        'json.load, que reconstrói o dicionário.',
    },
  ],
  xp: 100,
};

export default cap14;
