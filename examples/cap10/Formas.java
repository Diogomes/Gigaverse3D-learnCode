// Formas.java
// Polimorfismo: um mesmo comando (area()) se comporta diferente conforme o tipo real.

public class Formas {
    public static void main(String[] args) {
        // A lista guarda Formas; cada elemento e, na verdade, um Circulo, Retangulo ou Triangulo.
        Forma[] formas = {
            new Circulo(2.0),
            new Retangulo(3.0, 4.0),
            new Triangulo(6.0, 2.0),
        };

        double total = 0.0;
        for (Forma f : formas) {
            // Chamada polimorfica: o Java decide em tempo de execucao qual area() rodar.
            System.out.printf("%-12s area = %.2f%n", f.nome(), f.area());
            total += f.area();
        }
        System.out.printf("Area total: %.2f%n", total);

        // instanceof + casting: as vezes precisamos do tipo real para usar algo especifico.
        Forma alguma = formas[0];
        if (alguma instanceof Circulo) {
            Circulo c = (Circulo) alguma;   // casting: tratar a Forma como Circulo
            System.out.printf("O primeiro e um circulo de raio %.1f%n", c.raio());
        }
    }
}

// Interface: um "contrato". Quem implementa PRECISA ter area() e nome().
interface Forma {
    double area();
    String nome();
}

// Classe abstrata: serve de base comum, mas nao pode ser instanciada sozinha.
abstract class FormaBase implements Forma {
    // Metodo abstrato: nao tem corpo aqui; cada subclasse e obrigada a defini-lo.
    public abstract double area();

    // Metodo concreto (com corpo): herdado por todas as subclasses.
    public String nome() {
        return getClass().getSimpleName();
    }
}

class Circulo extends FormaBase {
    private final double raio;
    public Circulo(double raio) { this.raio = raio; }
    public double raio() { return this.raio; }

    @Override
    public double area() { return Math.PI * raio * raio; }
}

class Retangulo extends FormaBase {
    private final double largura;
    private final double altura;
    public Retangulo(double largura, double altura) {
        this.largura = largura;
        this.altura = altura;
    }

    @Override
    public double area() { return largura * altura; }
}

class Triangulo extends FormaBase {
    private final double base;
    private final double altura;
    public Triangulo(double base, double altura) {
        this.base = base;
        this.altura = altura;
    }

    @Override
    public double area() { return (base * altura) / 2.0; }
}
