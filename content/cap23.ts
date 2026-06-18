import type { Capitulo } from '../src/types.js';

const cap23: Capitulo = {
  id: 23,
  titulo: 'Simultaneidade (concorrência)',
  conceitoEmFoco: {
    termo: 'Thread',
    explicacao:
      'Uma thread é uma linha de execução. Normalmente o programa roda em uma única linha, ' +
      'fazendo uma coisa de cada vez. Com várias threads, o programa abre várias linhas que ' +
      'avançam "ao mesmo tempo" — como vários cozinheiros trabalhando juntos na mesma cozinha. ' +
      'Isso deixa o programa mais rápido em tarefas que podem acontecer em paralelo, mas exige ' +
      'cuidado quando elas mexem na mesma coisa ao mesmo tempo.',
  },
  objetivos: [
    'Entender o que é uma thread e por que usar várias.',
    'Definir uma tarefa com Runnable e executá-la em paralelo.',
    'Usar um ExecutorService para gerenciar um pool de threads.',
    'Reconhecer condições de corrida e por que a ordem da saída varia.',
    'Garantir que todas as threads terminem com shutdown + awaitTermination (ou join).',
  ],
  teoria: [
    {
      titulo: 'Thread: várias linhas de execução',
      paragrafos: [
        'Por padrão, um programa Java roda em uma só thread: ele executa uma instrução, depois a ' +
          'próxima, em fila. Uma thread é justamente essa "linha" que vai avançando pelo código.',
        'Quando criamos threads adicionais, várias linhas avançam aparentemente ao mesmo tempo. O ' +
          'sistema operacional reveza entre elas tão rápido que parece simultâneo (e em máquinas com ' +
          'vários núcleos pode ser de fato paralelo). Por isso a saída das threads sai INTERCALADA e ' +
          'a ordem pode mudar a cada execução.',
      ],
    },
    {
      titulo: 'Runnable e ExecutorService',
      paragrafos: [
        'Um Runnable é só uma tarefa: um bloco de código sem retorno, escrito como () -> { ... }. ' +
          'Ele descreve O QUE fazer, mas não quem vai fazer.',
        'Em vez de criar threads na mão, usamos um ExecutorService: um "gerente" que mantém um pool ' +
          'de threads prontas e distribui as tarefas (submit). No fim, chamamos shutdown() para não ' +
          'aceitar mais tarefas e awaitTermination() para ESPERAR todas terminarem. Sem essa espera, ' +
          'o programa poderia seguir antes de o trabalho acabar.',
        'Existe também o Callable, parecido com o Runnable, mas que DEVOLVE um resultado. Ao submetê-lo ' +
          'você recebe um Future, que é uma "promessa" do valor: chamar future.get() espera a tarefa ' +
          'terminar e entrega o resultado.',
      ],
    },
    {
      titulo: 'Condições de corrida e sincronização',
      paragrafos: [
        'Quando duas threads mexem na MESMA variável ao mesmo tempo, pode haver uma condição de ' +
          'corrida: uma sobrescreve a outra e o resultado fica errado. Imagine duas pessoas somando no ' +
          'mesmo papel ao mesmo tempo sem combinar.',
        'A solução é sincronizar o acesso. No exemplo usamos um AtomicInteger, que faz somas seguras ' +
          'entre threads. Outra forma é a palavra synchronized, que garante que só uma thread por vez ' +
          'entre num trecho crítico do código.',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap23/Arena.java',
    descricao:
      'Três monstros atacam em paralelo: cada um é um Runnable rodado por uma thread do ' +
      'ExecutorService. A saída sai intercalada (e pode mudar de ordem a cada execução), e o dano ' +
      'total é somado com segurança usando AtomicInteger. As threads terminam via shutdown + awaitTermination.',
    anotacoes: [
      { linha: 16, nota: 'Contador COMPARTILHADO. AtomicInteger soma com segurança quando várias threads escrevem ao mesmo tempo.' },
      { linha: 19, nota: 'ExecutorService: um "gerente" com um pool de threads que vai executar nossas tarefas.' },
      { linha: 23, nota: 'Runnable: a tarefa que uma thread vai rodar. Aqui, cada monstro ataca 3 vezes.' },
      { linha: 26, nota: 'addAndGet soma de forma atômica (sem condição de corrida), mesmo com várias threads ao mesmo tempo.' },
      { linha: 35, nota: 'submit entrega a tarefa ao pool; uma thread disponível a executa em paralelo com as outras.' },
      { linha: 40, nota: 'awaitTermination ESPERA as threads terminarem. Junto com shutdown(), garante o término antes de seguir.' },
    ],
  },
  discussao: [
    'A ordem das mensagens muda entre execuções porque o sistema reveza as threads como quiser — ' +
      'isso é normal e faz parte da concorrência, não é bug.',
    'Sempre garanta o término: shutdown() + awaitTermination() para ExecutorService, ou join() ' +
      'quando você cria Thread na mão. Sem isso, o programa pode encerrar antes do trabalho ou ficar pendurado.',
    'Cuidado com estado compartilhado: somar num int comum a partir de várias threads pode perder ' +
      'valores (condição de corrida). Use AtomicInteger ou synchronized para acessos seguros.',
    'Em JavaFX, tarefas demoradas (rede, arquivo) rodam em uma thread separada para não "congelar" a ' +
      'tela; o resultado depois volta à thread da interface. O conceito de thread é o mesmo deste exemplo.',
  ],
  desafio: {
    enunciado:
      'Crie duas tarefas Runnable e rode cada uma em sua própria Thread. A tarefa "Arqueiro" imprime ' +
      '"Arqueiro atira!" 3 vezes; a tarefa "Mago" imprime "Mago lanca magia!" 3 vezes. Use start() para ' +
      'rodar em paralelo e join() para esperar as duas terminarem. No fim, imprima "Combate concluido!".',
    arquivoBase: 'examples/cap23/Desafio.java',
    dica: 'Thread t1 = new Thread(r1); t1.start(); ... depois t1.join(); para esperar terminar antes de continuar.',
    solucao:
      'public class Desafio {\n' +
      '    public static void main(String[] args) throws InterruptedException {\n' +
      '        Runnable arqueiro = () -> {\n' +
      '            for (int i = 0; i < 3; i++) System.out.println("Arqueiro atira!");\n' +
      '        };\n' +
      '        Runnable mago = () -> {\n' +
      '            for (int i = 0; i < 3; i++) System.out.println("Mago lanca magia!");\n' +
      '        };\n' +
      '        Thread t1 = new Thread(arqueiro);\n' +
      '        Thread t2 = new Thread(mago);\n' +
      '        t1.start();\n' +
      '        t2.start();\n' +
      '        t1.join();\n' +
      '        t2.join();\n' +
      '        System.out.println("Combate concluido!");\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que é uma thread?',
      opcoes: [
        'Um tipo de variável numérica',
        'Uma linha de execução; com várias, o programa avança em vários pontos "ao mesmo tempo"',
        'Um arquivo de configuração',
        'Uma classe que guarda dados',
      ],
      correta: 1,
      explicacao: 'Thread é uma linha de execução. Várias threads avançam aparentemente ao mesmo tempo.',
    },
    {
      pergunta: 'Por que a ordem das mensagens pode mudar a cada execução do exemplo?',
      opcoes: [
        'Porque há um bug no código',
        'Porque o sistema reveza as threads livremente; a intercalação é parte da concorrência',
        'Porque o ExecutorService está mal configurado',
        'Porque o Java embaralha a saída de propósito',
      ],
      correta: 1,
      explicacao: 'O escalonador decide quando cada thread roda, então a ordem da saída varia naturalmente.',
    },
    {
      pergunta: 'Por que usar AtomicInteger em vez de um int comum para o dano total?',
      opcoes: [
        'Porque é mais rápido em qualquer caso',
        'Porque evita condição de corrida ao somar a partir de várias threads ao mesmo tempo',
        'Porque int não aceita números grandes',
        'Porque AtomicInteger imprime sozinho',
      ],
      correta: 1,
      explicacao: 'Várias threads somando num int comum podem perder valores; AtomicInteger faz a soma de forma atômica e segura.',
    },
    {
      pergunta: 'Para garantir que as threads do ExecutorService terminem antes de seguir, usamos:',
      opcoes: [
        'apenas submit()',
        'System.exit(0)',
        'shutdown() seguido de awaitTermination()',
        'Thread.sleep() no fim',
      ],
      correta: 2,
      explicacao: 'shutdown() para de aceitar tarefas e awaitTermination() espera as que estão rodando concluírem.',
    },
  ],
  xp: 100,
};

export default cap23;
