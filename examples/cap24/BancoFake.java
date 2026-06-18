// BancoFake.java
// Acesso a bancos de dados com JDBC -- SIMULACAO EM MEMORIA.
//
// ATENCAO: este programa NAO usa um banco de dados de verdade. Ele simula,
// usando uma List em memoria, as 4 operacoes do SQL (INSERT, SELECT, UPDATE,
// DELETE). O objetivo e ENSINAR como o JDBC funciona conceitualmente, sem
// precisar de um driver (como o sqlite-jdbc), que nao esta disponivel aqui.
//
// Em cada operacao deixamos, em comentario, COMO SERIA o codigo JDBC REAL.

import java.util.ArrayList;
import java.util.List;

public class BancoFake {
    public static void main(String[] args) {
        // No JDBC real, aqui voce abriria a conexao:
        //   Connection con = DriverManager.getConnection("jdbc:sqlite:jogos.db");
        TabelaJogadores tabela = new TabelaJogadores();

        // ---- INSERT ----
        // SQL real: INSERT INTO jogadores (nome, pontos) VALUES (?, ?)
        // JDBC real:
        //   PreparedStatement ps = con.prepareStatement(
        //       "INSERT INTO jogadores (nome, pontos) VALUES (?, ?)");
        //   ps.setString(1, "Ana"); ps.setInt(2, 50); ps.executeUpdate();
        tabela.inserir("Ana", 50);
        tabela.inserir("Bruno", 30);
        tabela.inserir("Carla", 80);
        System.out.println("Apos INSERT:");
        tabela.selecionarTodos();

        // ---- UPDATE (dentro de uma transacao) ----
        // SQL real: UPDATE jogadores SET pontos = ? WHERE id = ?
        // JDBC real (transacao):
        //   con.setAutoCommit(false);
        //   try { ps.executeUpdate(); con.commit(); }
        //   catch (SQLException e) { con.rollback(); }
        System.out.println("\nTransacao: somando 100 pontos ao jogador id=1...");
        tabela.iniciarTransacao();
        boolean ok = tabela.atualizarPontos(1, 150);
        if (ok) {
            tabela.commit();
            System.out.println("commit() -> mudanca confirmada.");
        } else {
            tabela.rollback();
            System.out.println("rollback() -> mudanca desfeita.");
        }

        // ---- SELECT com filtro ----
        // SQL real: SELECT * FROM jogadores WHERE pontos >= ?
        // JDBC real:
        //   ResultSet rs = ps.executeQuery();
        //   while (rs.next()) { rs.getInt("id"); rs.getString("nome"); ... }
        System.out.println("\nSELECT com filtro (pontos >= 50):");
        tabela.selecionarPorPontosMinimos(50);

        // ---- DELETE ----
        // SQL real: DELETE FROM jogadores WHERE id = ?
        System.out.println("\nApos DELETE do jogador id=2:");
        tabela.deletar(2);
        tabela.selecionarTodos();

        // No JDBC real, no fim, voce fecharia tudo (idealmente com try-with-resources):
        //   rs.close(); ps.close(); con.close();
        System.out.println("\n(Conexao 'fechada' -- simulacao encerrada.)");
    }
}

// Cada linha da "tabela" e um jogador. Um record e perfeito para isso:
// imutavel e com campos nomeados, como uma coluna por atributo.
record Jogador(int id, String nome, int pontos) {}

// Esta classe ESPELHA conceitualmente uma tabela de banco acessada via JDBC.
// Os metodos representam os comandos SQL; a List faz o papel da tabela.
class TabelaJogadores {
    private final List<Jogador> linhas = new ArrayList<>();
    private int proximoId = 1;

    // Estado de transacao simulado: guarda uma "foto" das linhas ao iniciar.
    private List<Jogador> backup = null;

    // INSERT INTO jogadores ...
    public void inserir(String nome, int pontos) {
        linhas.add(new Jogador(proximoId, nome, pontos));
        proximoId++;
    }

    // SELECT * FROM jogadores  (percorre o "ResultSet" linha a linha)
    public void selecionarTodos() {
        for (Jogador j : linhas) {
            // No JDBC real seria: rs.getInt("id"), rs.getString("nome"), rs.getInt("pontos")
            System.out.printf("  id=%d | nome=%-6s | pontos=%d%n", j.id(), j.nome(), j.pontos());
        }
    }

    // SELECT * FROM jogadores WHERE pontos >= ?
    public void selecionarPorPontosMinimos(int minimo) {
        for (Jogador j : linhas) {
            if (j.pontos() >= minimo) {
                System.out.printf("  id=%d | nome=%-6s | pontos=%d%n", j.id(), j.nome(), j.pontos());
            }
        }
    }

    // UPDATE jogadores SET pontos = ? WHERE id = ?  (devolve true se achou a linha)
    public boolean atualizarPontos(int id, int novosPontos) {
        for (int i = 0; i < linhas.size(); i++) {
            Jogador j = linhas.get(i);
            if (j.id() == id) {
                linhas.set(i, new Jogador(j.id(), j.nome(), novosPontos));
                return true;   // "1 linha afetada"
            }
        }
        return false;          // "0 linhas afetadas"
    }

    // DELETE FROM jogadores WHERE id = ?
    public void deletar(int id) {
        linhas.removeIf(j -> j.id() == id);
    }

    // setAutoCommit(false): a partir daqui as mudancas ficam "pendentes".
    public void iniciarTransacao() {
        backup = new ArrayList<>(linhas);   // foto para poder desfazer
    }

    // commit(): confirma as mudancas (descarta a foto de backup).
    public void commit() {
        backup = null;
    }

    // rollback(): desfaz tudo desde o inicio da transacao (volta para a foto).
    public void rollback() {
        if (backup != null) {
            linhas.clear();
            linhas.addAll(backup);
            backup = null;
        }
    }
}
