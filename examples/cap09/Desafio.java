// Desafio.java
// DESAFIO DO CAPITULO 9
//
// Sua missao: a classe Animal ja existe abaixo (superclasse).
// Crie uma subclasse Cachorro que ESTENDE Animal (extends), use super(nome)
// no construtor e SOBRESCREVA o metodo emitirSom() para imprimir "Au au!".
// No main, crie um Cachorro chamado "Rex" e chame emitirSom().

public class Desafio {
    public static void main(String[] args) {
        // Crie um Cachorro e chame emitirSom() aqui:
        System.out.println("Complete o desafio!");
    }
}

// Superclasse pronta (NAO precisa mudar):
class Animal {
    protected String nome;

    public Animal(String nome) {
        this.nome = nome;
    }

    public void emitirSom() {
        System.out.println(nome + " faz um som generico.");
    }
}

// Escreva sua classe Cachorro abaixo (extends Animal):
