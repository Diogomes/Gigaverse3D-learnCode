// Arena.java
// Simultaneidade (concorrencia): varios monstros agem "ao mesmo tempo".
// Cada monstro e uma TAREFA (Runnable) executada por uma thread diferente.

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Arena {
    public static void main(String[] args) throws InterruptedException {
        String[] monstros = { "Slime", "Goblin", "Dragao" };

        // Contador COMPARTILHADO entre as threads. AtomicInteger evita
        // condicoes de corrida ao somar de varias threads ao mesmo tempo.
        AtomicInteger danoTotal = new AtomicInteger(0);

        // ExecutorService gerencia um "pool" de threads para nos.
        ExecutorService pool = Executors.newFixedThreadPool(monstros.length);

        for (String nome : monstros) {
            // Runnable = a tarefa que uma thread vai rodar. Cada monstro ataca 3 vezes.
            Runnable tarefa = () -> {
                for (int i = 1; i <= 3; i++) {
                    int dano = nome.length() + i;   // dano "ficticio" so para o exemplo
                    danoTotal.addAndGet(dano);      // soma segura entre threads
                    System.out.println(nome + " ataca! (golpe " + i + ", dano " + dano + ")");
                    try {
                        Thread.sleep(20);           // pausa curta: deixa a saida se intercalar
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            };
            pool.submit(tarefa);                    // entrega a tarefa para o pool rodar
        }

        // shutdown(): nao aceita novas tarefas. awaitTermination(): ESPERA as threads terminarem.
        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);

        System.out.println("Batalha encerrada. Dano total: " + danoTotal.get());
    }
}
