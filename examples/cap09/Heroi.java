// Heroi.java
// Heranca: uma classe filha "e um tipo de" classe pai e reaproveita
// atributos e metodos. Aqui Guerreiro e Mago HERDAM de Personagem.

public class Heroi {
    public static void main(String[] args) {
        // Guerreiro e Mago sao tipos de Personagem: herdam nome e vida.
        Guerreiro conan = new Guerreiro("Conan", 120);
        Mago gandalf = new Mago("Gandalf", 80);

        // apresentar() vem da classe pai (Personagem) e e reaproveitado.
        conan.apresentar();
        gandalf.apresentar();

        // atacar() foi SOBRESCRITO em cada subclasse: cada uma ataca do seu jeito.
        conan.atacar();
        gandalf.atacar();

        // Cada subclasse tambem pode ter habilidades proprias.
        gandalf.recuperarMana();
    }
}

// Superclasse (classe pai): guarda o que e comum a todo personagem.
class Personagem {
    protected String nome;   // protected = visivel para as subclasses
    protected int vida;

    public Personagem(String nome, int vida) {
        this.nome = nome;
        this.vida = vida;
    }

    public void apresentar() {
        System.out.println(nome + " entra em campo com " + vida + " de vida.");
    }

    // Metodo generico; as subclasses vao sobrescrever com ataques especificos.
    public void atacar() {
        System.out.println(nome + " ataca de forma comum.");
    }
}

// Subclasse (classe filha): Guerreiro E UM Personagem.
class Guerreiro extends Personagem {
    public Guerreiro(String nome, int vida) {
        super(nome, vida);   // chama o construtor da superclasse
    }

    @Override
    public void atacar() {
        // Reaproveita o atributo "nome" herdado da superclasse.
        System.out.println(nome + " ataca com a ESPADA! (corte fisico)");
    }
}

// Outra subclasse: Mago tambem E UM Personagem, mas ataca diferente.
class Mago extends Personagem {
    private int mana;

    public Mago(String nome, int vida) {
        super(nome, vida);   // primeiro inicializa a parte herdada
        this.mana = 50;      // depois inicializa o que e so do Mago
    }

    @Override
    public void atacar() {
        System.out.println(nome + " lanca uma BOLA DE FOGO! (gasta 10 de mana)");
        this.mana -= 10;
    }

    // Habilidade exclusiva do Mago, que nao existe na superclasse.
    public void recuperarMana() {
        this.mana += 20;
        System.out.println(nome + " medita e recupera mana (agora: " + mana + ").");
    }
}
