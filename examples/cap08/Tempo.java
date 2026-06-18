// Tempo.java
// Exame mais profundo de classes: a referencia "this", validacao e enum.

public class Tempo {
    public static void main(String[] args) {
        Hora h = new Hora(14, 30, 5);
        System.out.println("Hora valida: " + h.formatar());

        Hora invalida = new Hora(99, 70, 80);   // valores fora da faixa viram 0
        System.out.println("Hora invalida tratada: " + invalida.formatar());

        // enum: um tipo com um conjunto fixo de valores nomeados.
        for (Naipe naipe : Naipe.values()) {
            System.out.println("Naipe: " + naipe + " (" + naipe.simbolo() + ")");
        }
    }
}

// enum pode ter atributo e metodos, como uma classe.
enum Naipe {
    OUROS("♦"), ESPADAS("♠"), COPAS("♥"), PAUS("♣");

    private final String simbolo;          // final = nao muda depois de definido
    Naipe(String simbolo) { this.simbolo = simbolo; }
    public String simbolo() { return this.simbolo; }
}

class Hora {
    private int hora;
    private int minuto;
    private int segundo;

    public Hora(int hora, int minuto, int segundo) {
        // "this.hora" e o ATRIBUTO; "hora" (sem this) e o PARAMETRO de mesmo nome.
        this.hora = (hora >= 0 && hora < 24) ? hora : 0;
        this.minuto = (minuto >= 0 && minuto < 60) ? minuto : 0;
        this.segundo = (segundo >= 0 && segundo < 60) ? segundo : 0;
    }

    public String formatar() {
        // %02d = numero com 2 digitos, preenchendo com zero a esquerda.
        return String.format("%02d:%02d:%02d", this.hora, this.minuto, this.segundo);
    }
}
