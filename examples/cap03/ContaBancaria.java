// ContaBancaria.java
// Demonstra CLASSE vs OBJETO: a classe Conta e o "molde";
// criamos objetos (contas reais) a partir dela com a palavra new.

public class ContaBancaria {
    public static void main(String[] args) {
        // "new Conta(...)" constroi um OBJETO a partir da CLASSE Conta.
        Conta conta = new Conta(100.0);
        System.out.println("Saldo inicial: " + conta.getSaldo());

        conta.depositar(50.0);   // chama um METODO do objeto
        System.out.println("Apos depositar 50: " + conta.getSaldo());

        boolean ok = conta.sacar(30.0);
        System.out.println("Saque de 30 funcionou? " + ok);
        System.out.println("Saldo agora: " + conta.getSaldo());

        boolean falhou = conta.sacar(1000.0);   // saldo insuficiente
        System.out.println("Saque de 1000 funcionou? " + falhou);
        System.out.println("Saldo final: " + conta.getSaldo());
    }
}

// A CLASSE (molde). So uma classe public por arquivo, entao esta fica sem "public".
class Conta {
    private double saldo;   // ATRIBUTO privado: so a propria classe acessa diretamente

    // CONSTRUTOR: roda quando usamos "new"; define o estado inicial do objeto.
    public Conta(double saldoInicial) {
        if (saldoInicial > 0) {
            saldo = saldoInicial;
        }
    }

    // METODO public: deposita um valor (encapsula a regra "valor tem que ser positivo").
    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    // Devolve true se o saque deu certo; false se faltou saldo.
    public boolean sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
            return true;
        }
        return false;
    }

    // GET: forma controlada de LER um atributo privado.
    public double getSaldo() {
        return saldo;
    }
}
