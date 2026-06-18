import type { Capitulo } from '../src/types.js';

const cap16: Capitulo = {
  id: 16,
  titulo: 'Coleções genéricas',
  conceitoEmFoco: {
    termo: 'Genéricos',
    explicacao:
      'Genéricos são as "etiquetas" que você cola numa coleção dizendo que tipo de coisa ela ' +
      'guarda. List<String> avisa ao compilador: "esta lista só tem Strings". Assim, se você ' +
      'tentar colocar um número onde só cabem textos, o erro aparece na hora de compilar — e não ' +
      'só depois, com o programa quebrando. Você também não precisa ficar fazendo casts (forçar ' +
      'um tipo) ao tirar itens de dentro, porque o compilador já sabe o que vai sair.',
  },
  objetivos: [
    'Entender o que são genéricos (o <Tipo> entre os sinais de menor e maior).',
    'Usar um Map<String,Integer> para associar uma chave a um valor.',
    'Usar um Set para guardar elementos únicos (sem repetição).',
    'Percorrer um Map com entrySet() e uma coleção com o for-each.',
    'Reconhecer o autoboxing entre int e Integer.',
  ],
  teoria: [
    {
      titulo: 'As coleções e os genéricos',
      paragrafos: [
        'O pacote java.util oferece estruturas prontas para guardar grupos de objetos. As ' +
          'principais são: List (lista ordenada, aceita repetidos), Set (conjunto sem ' +
          'repetições), Map (pares chave→valor) e Queue (fila). Em vez de criar tudo do zero, ' +
          'você reaproveita essas classes testadas.',
        'Os genéricos são os colchetes angulares com o tipo dentro: List<String>, ' +
          'Set<Integer>, Map<String,Integer>. Eles dizem ao compilador exatamente o que cabe na ' +
          'coleção. Resultado: erros aparecem cedo (na compilação) e você não precisa fazer ' +
          'casts ao retirar os itens.',
      ],
    },
    {
      titulo: 'Map: dicionário de chave e valor',
      paragrafos: [
        'Um Map<String,Integer> é como um dicionário: cada chave (String) aponta para um valor ' +
          '(Integer). put(chave, valor) guarda; get(chave) recupera. Se você usar uma chave que ' +
          'já existe, o valor antigo é substituído — não há chaves repetidas num Map.',
        'Para percorrer todos os pares, use entrySet(): ele devolve uma coleção de entradas, e ' +
          'cada entrada tem getKey() e getValue(). É a forma padrão de visitar tudo o que está ' +
          'guardado no Map.',
      ],
    },
    {
      titulo: 'Set, autoboxing e a classe Collections',
      paragrafos: [
        'Um Set guarda elementos únicos: se você adicionar o mesmo valor duas vezes, a segunda ' +
          'simplesmente é ignorada. Por isso ele é perfeito para listar coisas "sem repetição", ' +
          'como os tipos distintos de monstro num jogo.',
        'Autoboxing é a conversão automática entre os tipos primitivos (int, double) e suas ' +
          'classes (Integer, Double). Coleções só guardam objetos, então ao escrever ' +
          'niveis.put("Slime", 1) o int 1 vira Integer sozinho. A classe utilitária Collections ' +
          'traz ainda atalhos prontos como Collections.sort(lista) e Collections.max(lista).',
      ],
    },
  ],
  exemplo: {
    arquivo: 'examples/cap16/Catalogo.java',
    descricao:
      'Um catálogo de monstros: um Map<String,Integer> liga o nome de cada monstro ao seu nível, ' +
      'e um Set<String> guarda os tipos de monstro sem repetição. O exemplo adiciona, percorre o ' +
      'Map com entrySet() e mostra o Set descartando as duplicatas.',
    anotacoes: [
      { linha: 13, nota: 'Map<String,Integer>: o genérico fixa chave=String e valor=Integer. O compilador passa a cobrar esses tipos.' },
      { linha: 20, nota: 'Mesma chave "Goblin" de novo: o valor antigo (3) é substituído por 99. Map não tem chaves repetidas.' },
      { linha: 24, nota: 'entrySet() devolve os pares chave/valor; cada par tem getKey() e getValue() para percorrer o Map.' },
      { linha: 29, nota: 'get devolve um Integer e ele cai direto num int (autoboxing inverso, chamado de unboxing).' },
      { linha: 34, nota: 'Set<String>: um conjunto que só aceita elementos únicos.' },
      { linha: 42, nota: 'Tentamos adicionar 5 tipos, mas size() mostra 3: o Set descartou as duplicatas "Fogo" e "Gelo".' },
    ],
  },
  discussao: [
    'Sem genéricos, uma coleção guardaria Object e você teria de fazer cast ao retirar cada ' +
      'item — e um cast errado só estoura em tempo de execução. Com <Tipo>, o erro vem na ' +
      'compilação, bem mais cedo e mais seguro.',
    'A ordem de um HashMap e de um HashSet NÃO segue a ordem de inserção — repare que o catálogo ' +
      'sai embaralhado. Se precisar de ordem previsível, existem LinkedHashMap/LinkedHashSet ' +
      '(ordem de inserção) e TreeMap/TreeSet (ordem natural).',
    'Pegadinha comum: chamar get() com uma chave que não existe devolve null. Se você jogar esse ' +
      'null direto num int, o unboxing causa NullPointerException. Cheque com containsKey antes, ' +
      'quando houver dúvida.',
    'Coleções guardam objetos, não primitivos. O autoboxing esconde isso de você (1 vira ' +
      'Integer automaticamente), mas é bom saber que a conversão acontece nos bastidores.',
  ],
  desafio: {
    enunciado:
      'Use um Map<String,Integer> chamado inventario para guardar itens e quantidades. Adicione ' +
      '"Pocao" com 5 e "Espada" com 1. Depois percorra o Map com entrySet() e imprima cada item ' +
      'no formato "- Pocao: 5".',
    arquivoBase: 'examples/cap16/Desafio.java',
    dica:
      'Crie o Map com new HashMap<>(), use inventario.put("Pocao", 5) e, no for, use ' +
      'Map.Entry<String,Integer> com getKey() e getValue().',
    solucao:
      'import java.util.Map;\n' +
      'import java.util.HashMap;\n\n' +
      'public class Desafio {\n' +
      '    public static void main(String[] args) {\n' +
      '        Map<String, Integer> inventario = new HashMap<>();\n' +
      '        inventario.put("Pocao", 5);\n' +
      '        inventario.put("Espada", 1);\n' +
      '        for (Map.Entry<String, Integer> item : inventario.entrySet()) {\n' +
      '            System.out.println("- " + item.getKey() + ": " + item.getValue());\n' +
      '        }\n' +
      '    }\n' +
      '}',
  },
  quiz: [
    {
      pergunta: 'O que o <String> em List<String> informa ao compilador?',
      opcoes: [
        'Que a lista tem no máximo um elemento',
        'Que a lista só pode conter Strings',
        'Que a lista é ordenada alfabeticamente',
        'Que a lista não pode ser modificada',
      ],
      correta: 1,
      explicacao:
        'O genérico fixa o tipo dos elementos: List<String> só aceita Strings, e o erro aparece já na compilação.',
    },
    {
      pergunta: 'O que acontece ao adicionar um valor que já existe num Set?',
      opcoes: [
        'O programa lança uma exceção',
        'O valor é guardado duas vezes',
        'A duplicata é ignorada; o Set mantém só uma cópia',
        'O Set é esvaziado',
      ],
      correta: 2,
      explicacao: 'Set guarda elementos únicos; adicionar uma duplicata não tem efeito, o tamanho não cresce.',
    },
    {
      pergunta: 'Qual método usamos para percorrer todos os pares chave/valor de um Map?',
      opcoes: ['values()', 'entrySet()', 'toString()', 'add()'],
      correta: 1,
      explicacao: 'entrySet() devolve as entradas (pares), e cada uma oferece getKey() e getValue().',
    },
    {
      pergunta: 'O que é autoboxing?',
      opcoes: [
        'Converter um objeto em texto',
        'A conversão automática entre primitivo (int) e sua classe (Integer)',
        'Empacotar a coleção num arquivo',
        'Ordenar uma lista automaticamente',
      ],
      correta: 1,
      explicacao:
        'Como coleções guardam objetos, o int 1 vira Integer sozinho ao entrar; ao sair, o Integer pode voltar a int (unboxing).',
    },
  ],
  xp: 100,
};

export default cap16;
