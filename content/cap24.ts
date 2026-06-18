import type { Capitulo } from '../src/types.js';

const cap24: Capitulo = {
  id: 24,
  titulo: 'Acesso a bancos de dados com JDBC',
  conceitoEmFoco: {
    termo: 'JDBC',
    explicacao:
      'JDBC (Java Database Connectivity) e a ponte padrao entre um programa Java e um banco de ' +
      'dados relacional. Pense numa tomada universal: o banco fala "SQL" e o Java fala "objetos"; ' +
      'o JDBC e o adaptador no meio. Voce abre uma Connection (conexao), envia comandos SQL e ' +
      'recebe os resultados de volta como dados que o Java entende.',
  },
  objetivos: [
    'Entender o papel do JDBC como ponte entre Java e um banco relacional.',
    'Reconhecer as 4 operacoes do SQL: SELECT, INSERT, UPDATE e DELETE.',
    'Saber para que servem Connection, PreparedStatement e ResultSet.',
    'Entender transacoes: commit confirma, rollback desfaz.',
    'Simular um CRUD em memoria que espelha a API do JDBC.',
  ],
  teoria: [
    {
      titulo: 'O que e um banco relacional e o SQL',
      paragrafos: [
        'Um banco de dados relacional guarda informacoes em TABELAS: cada tabela tem colunas ' +
          '(como id, nome, pontos) e linhas (cada linha e um registro). E parecido com uma ' +
          'planilha, mas com regras e muito mais poder de busca.',
        'Para conversar com o banco usamos a linguagem SQL. As 4 operacoes basicas formam o que ' +
          'chamamos de CRUD: INSERT (criar uma linha), SELECT (ler/buscar linhas), UPDATE ' +
          '(alterar uma linha) e DELETE (apagar uma linha).',
        'Exemplos de SQL: "INSERT INTO jogadores (nome, pontos) VALUES (\'Ana\', 50)", ' +
          '"SELECT * FROM jogadores WHERE pontos >= 50", "UPDATE jogadores SET pontos = 150 ' +
          'WHERE id = 1", "DELETE FROM jogadores WHERE id = 2".',
      ],
    },
    {
      titulo: 'As pecas do JDBC: Connection, PreparedStatement e ResultSet',
      paragrafos: [
        'Connection e a conexao aberta com o banco. No codigo real ela nasce de ' +
          'DriverManager.getConnection("jdbc:sqlite:jogos.db", usuario, senha). E como ligar a ' +
          'tomada antes de usar o aparelho.',
        'PreparedStatement representa um comando SQL pronto para executar, com lugares marcados ' +
          'por "?" para os valores. Voce preenche com ps.setString(1, "Ana") e ps.setInt(2, 50). ' +
          'Isso e mais seguro do que colar texto direto na consulta (evita o ataque chamado SQL ' +
          'injection) e e mais rapido quando repetido.',
        'Para buscar dados usamos executeQuery(), que devolve um ResultSet -- uma especie de ' +
          'cursor que percorre as linhas do resultado. Voce avanca com rs.next() e le cada coluna ' +
          'com rs.getInt("id"), rs.getString("nome"), etc. Para INSERT/UPDATE/DELETE usamos ' +
          'executeUpdate(), que devolve quantas linhas foram afetadas.',
      ],
    },
    {
      titulo: 'Transacoes: tudo ou nada',
      paragrafos: [
        'As vezes uma operacao envolve varios comandos que so fazem sentido juntos (ex.: tirar ' +
          'pontos de um jogador E dar para outro). Uma transacao agrupa esses comandos: ou todos ' +
          'dao certo, ou nenhum vale.',
        'Com con.setAutoCommit(false) voce assume o controle. Se tudo correr bem, con.commit() ' +
          'confirma as mudancas de vez. Se algo falhar, con.rollback() desfaz tudo, voltando o ' +
          'banco ao estado anterior. E a rede de seguranca contra deixar dados pela metade.',
        'Como aqui nao ha driver JDBC nem banco real, o exemplo SIMULA tudo isso em memoria: uma ' +
          'lista faz o papel da tabela, e guardamos uma "foto" das linhas para conseguir desfazer ' +
          '(rollback) ou confirmar (commit).',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap24/BancoFake.java',
    descricao:
      'Uma SIMULACAO em memoria do acesso JDBC: a classe TabelaJogadores guarda jogadores numa ' +
      'List e oferece metodos que espelham INSERT, SELECT, UPDATE e DELETE, alem de commit e ' +
      'rollback. Nos comentarios fica o codigo JDBC REAL equivalente. Nao usa banco de verdade.',
    anotacoes: [
      { linha: 18, nota: 'A tabela em memoria faz o papel da Connection: no JDBC real, aqui voce abriria DriverManager.getConnection(...).' },
      { linha: 71, nota: 'Cada linha da tabela e um Jogador. O record da campos nomeados (id, nome, pontos), como as colunas de uma tabela.' },
      { linha: 83, nota: 'inserir() espelha o INSERT. No JDBC real seria um PreparedStatement com VALUES (?, ?) e executeUpdate().' },
      { linha: 92, nota: 'O for sobre as linhas imita o ResultSet: no JDBC real seria while (rs.next()) lendo rs.getInt/rs.getString.' },
      { linha: 106, nota: 'atualizarPontos() espelha o UPDATE ... WHERE id = ?. Retornar true/false imita o "linhas afetadas".' },
      { linha: 128, nota: 'commit() confirma a transacao; o metodo rollback() (logo abaixo) restaura a foto e desfaz tudo.' },
    ],
  },
  discussao: [
    'O exemplo que RODA aqui e uma simulacao em memoria. O JDBC de verdade precisa de um driver ' +
      '(por exemplo o sqlite-jdbc, um .jar de terceiros) que nao esta disponivel neste ambiente ' +
      'de JDK puro -- por isso espelhamos a API em vez de conectar a um banco real.',
    'Sempre prefira PreparedStatement com "?" a montar SQL concatenando texto. Concatenar abre a ' +
      'porta para SQL injection (alguem injeta comandos pelo campo de entrada); o "?" trata o ' +
      'valor como dado, nunca como comando.',
    'No JDBC real, conexoes, statements e result sets precisam ser FECHADOS. O jeito moderno e o ' +
      'try-with-resources: try (Connection con = ...; PreparedStatement ps = ...) { ... }, que ' +
      'fecha tudo sozinho mesmo se der erro.',
    'Esqueceu o commit() depois de setAutoCommit(false)? As mudancas podem se perder. E se houve ' +
      'erro no meio, chame rollback() para nao deixar o banco num estado inconsistente.',
  ],
  desafio: {
    enunciado:
      'No arquivo Desafio.java, complete o metodo atualizarPreco(id, novoPreco) da classe ' +
      'TabelaItens. Ele representa o SQL "UPDATE itens SET preco = ? WHERE id = ?": procure o ' +
      'item pelo id e troque o preco. Como Item e um record (imutavel), substitua a linha por um ' +
      'novo Item com o preco novo. Retorne true se achou o id, false se nao. Ao rodar, o item ' +
      'id=1 (Espada) deve passar a custar 99.',
    arquivoBase: 'examples/cap24/Desafio.java',
    dica:
      'Percorra "linhas" com indice: for (int i = 0; i < linhas.size(); i++). Se ' +
      'linhas.get(i).id() == id, faca linhas.set(i, new Item(id, linhas.get(i).nome(), ' +
      'novoPreco)) e return true. No fim do loop, return false.',
    solucao:
      'public boolean atualizarPreco(int id, int novoPreco) {\n' +
      '    for (int i = 0; i < linhas.size(); i++) {\n' +
      '        Item atual = linhas.get(i);\n' +
      '        if (atual.id() == id) {\n' +
      '            linhas.set(i, new Item(atual.id(), atual.nome(), novoPreco));\n' +
      '            return true;\n' +
      '        }\n' +
      '    }\n' +
      '    return false;\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que e o JDBC?',
      opcoes: [
        'Um banco de dados pronto que vem dentro do Java',
        'A ponte/API padrao entre um programa Java e um banco de dados relacional',
        'Uma linguagem que substitui o SQL',
        'Um tipo de variavel para guardar tabelas',
      ],
      correta: 1,
      explicacao:
        'JDBC (Java Database Connectivity) e a API padrao que conecta o Java a bancos relacionais; ' +
        'o banco ainda fala SQL, e o JDBC faz a ponte.',
    },
    {
      pergunta: 'Qual das opcoes lista corretamente as 4 operacoes do CRUD em SQL?',
      opcoes: [
        'OPEN, READ, WRITE, CLOSE',
        'GET, POST, PUT, DELETE',
        'INSERT, SELECT, UPDATE, DELETE',
        'CREATE, ALTER, DROP, TRUNCATE',
      ],
      correta: 2,
      explicacao:
        'CRUD = Create/Read/Update/Delete, que em SQL viram INSERT, SELECT, UPDATE e DELETE.',
    },
    {
      pergunta: 'Por que usar PreparedStatement com "?" em vez de concatenar texto no SQL?',
      opcoes: [
        'Porque e a unica forma de fazer SELECT',
        'Para evitar SQL injection e tratar os valores como dados, com mais seguranca',
        'Porque o "?" deixa a consulta mais bonita',
        'Porque concatenar texto nao compila em Java',
      ],
      correta: 1,
      explicacao:
        'O "?" e preenchido com setString/setInt e trata o valor como dado, nao como comando, ' +
        'protegendo contra SQL injection.',
    },
    {
      pergunta: 'Numa transacao, o que faz o rollback()?',
      opcoes: [
        'Confirma todas as mudancas de uma vez',
        'Abre uma nova conexao com o banco',
        'Desfaz as mudancas feitas desde o inicio da transacao',
        'Apaga a tabela inteira',
      ],
      correta: 2,
      explicacao:
        'rollback() volta o banco ao estado anterior a transacao; commit() e o oposto, confirma ' +
        'as mudancas.',
    },
  ],
  xp: 100,
};

export default cap24;
